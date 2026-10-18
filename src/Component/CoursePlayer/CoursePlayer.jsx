/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  LeftContainer,
  LoadingDiv,
  RightContainer,
  SubFolderDiv,
  VideoWrapper,
  NowPlayingBar,
  NowPlayingLabel,
  NowPlayingTitle,
  CourseTitleSection,
  BackButton,
  CourseContentHeader,
  HeaderTitle,
  HeaderMetaRow,
  HeaderStats,
  ExpandAllButton,
} from "./styled.components";
import { isMobile } from "react-device-detect";
import { useTheme } from "styled-components";
import { useSelector } from "react-redux";
import { FourSquare } from "react-loading-indicators";
import {
  cleanFileName,
  sortName,
  formatTotalCourseDuration,
} from "../../utils/helper";
import { fetchApiData } from "../../data/SubFolderSlice/api";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import ContentList from "../ContentList/ContentList";
import CourseFilePreview from "./CourseFilePreview";
import { FaArrowLeft } from "react-icons/fa";

const VideoPlayer = () => {
  const theme = useTheme();
  const [currentVideo, setCurrentVideo] = useState(null);
  const [subFolders, setSubFolders] = useState([]);
  const [expandedFolderIds, setExpandedFolderIds] = useState([]);
  const [folderVideosMap, setFolderVideosMap] = useState({});
  const [folderLoadingMap, setFolderLoadingMap] = useState({});
  const [currentSubFolder, setCurrentSubFolder] = useState(null);
  const navigate = useNavigate();

  const prefetchingRef = useRef(false);
  const restoredCourseRef = useRef(null);

  const { loading, data, error } = useSelector((s) => s.subFolderData);
  const { course, user } = useSelector((s) => s.currentCourse);
  const API_URL = String(process.env.REACT_APP_USER_API_URL);

  // Initialize folders when course data arrives
  useEffect(() => {
    if (isEmpty(course)) {
      navigate("/");
    } else if (Array.isArray(data)) {
      const folders = data.filter(
        (file) => file.mimeType === "application/vnd.google-apps.folder"
      );
      const sorted = sortName(folders);
      setSubFolders(sorted);

      // Default expand the first folder if none expanded yet
      if (sorted.length > 0 && expandedFolderIds.length === 0) {
        setExpandedFolderIds([sorted[0].id]);
        fetchFolderVideos(sorted[0].id);
      }
    }
  }, [data, course]);

  // Fetch videos for a specific folder
  const fetchFolderVideos = async (folderId) => {
    if (folderVideosMap[folderId]) return folderVideosMap[folderId];

    setFolderLoadingMap((prev) => ({ ...prev, [folderId]: true }));
    try {
      const res = await fetchApiData({
        payload: {
          FOLDER_ID: folderId,
          API_KEY: course?.apikey,
        },
      });
      const sortedVideos = sortName(res || []);
      setFolderVideosMap((prev) => ({
        ...prev,
        [folderId]: sortedVideos,
      }));
      return sortedVideos;
    } catch (err) {
      console.error("Error loading folder videos:", folderId, err);
      return [];
    } finally {
      setFolderLoadingMap((prev) => ({ ...prev, [folderId]: false }));
    }
  };

  // Prefetch remaining folders in background so timings and counts populate smoothly
  useEffect(() => {
    if (subFolders.length > 0 && !prefetchingRef.current) {
      prefetchingRef.current = true;
      let cancelled = false;

      const prefetch = async () => {
        for (const sf of subFolders) {
          if (cancelled) break;
          if (!folderVideosMap[sf.id]) {
            try {
              const res = await fetchApiData({
                payload: {
                  FOLDER_ID: sf.id,
                  API_KEY: course?.apikey,
                },
              });
              if (!cancelled && res) {
                setFolderVideosMap((prev) => ({
                  ...prev,
                  [sf.id]: sortName(res),
                }));
              }
            } catch (e) {
              // ignore prefetch failure
            }
          }
        }
      };

      prefetch();
      return () => {
        cancelled = true;
      };
    }
  }, [subFolders]);

  // Videos and supporting files share the same viewing area.
  const handleVideoSelect = async (video, subfolder) => {
    if (!video?.id) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    const activeFolder = subfolder || currentSubFolder;
    if (activeFolder) {
      setCurrentSubFolder(activeFolder);
      // Ensure the folder containing this video stays expanded
      setExpandedFolderIds((prev) =>
        prev.includes(activeFolder.id) ? prev : [...prev, activeFolder.id]
      );
    }

    if (video.id === currentVideo?.id) return;
    setCurrentVideo(video);

    // Viewing a resource must not replace the learner's last video progress.
    if (video.mimeType?.startsWith("video/")) {
      try {
        if (user?.id) {
          await fetch(`${API_URL}/users/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              courses: {
                id: course.id,
                current_video: video,
                current_folder: activeFolder,
                courseName: course.name,
              },
            }),
          });
        }
      } catch (err) {
        console.error("Error updating play_video_id:", err);
      }
    }
  };

  // Toggle individual section accordion
  const handleToggleFolder = (folder) => {
    const isOpen = expandedFolderIds.includes(folder.id);
    if (isOpen) {
      setExpandedFolderIds((prev) => prev.filter((id) => id !== folder.id));
    } else {
      setExpandedFolderIds((prev) => [...prev, folder.id]);
      if (!folderVideosMap[folder.id]) {
        fetchFolderVideos(folder.id);
      }
    }
  };

  // Check if all sections are expanded
  const allExpanded =
    subFolders.length > 0 &&
    subFolders.every((f) => expandedFolderIds.includes(f.id));

  // Toggle "Expand all sections" / "Collapse all sections"
  const handleToggleAllSections = async () => {
    if (allExpanded) {
      setExpandedFolderIds([]);
    } else {
      const allIds = subFolders.map((f) => f.id);
      setExpandedFolderIds(allIds);

      // Fetch any un-fetched folders in parallel
      const missing = subFolders.filter((f) => !folderVideosMap[f.id]);
      if (missing.length > 0) {
        setFolderLoadingMap((prev) => {
          const next = { ...prev };
          missing.forEach((f) => (next[f.id] = true));
          return next;
        });

        await Promise.all(
          missing.map(async (f) => {
            try {
              const res = await fetchApiData({
                payload: {
                  FOLDER_ID: f.id,
                  API_KEY: course?.apikey,
                },
              });
              setFolderVideosMap((prev) => ({
                ...prev,
                [f.id]: sortName(res || []),
              }));
            } catch (e) {
              console.error("Error fetching folder in expand-all:", f.name, e);
            } finally {
              setFolderLoadingMap((prev) => ({
                ...prev,
                [f.id]: false,
              }));
            }
          })
        );
      }
    }
  };

  // Restore saved course progress if user had one
  useEffect(() => {
    if (
      !loading && !error && user?.user && course?.id &&
      restoredCourseRef.current !== course.id
    ) {
      restoredCourseRef.current = course.id;
      // eslint-disable-next-line eqeqeq
      const data = user.courses?.find((e) => e?.id == course?.id);
      if (data?.current_video) {
        handleVideoSelect(data?.current_video, data?.current_folder);
        if (data?.current_folder) {
          setCurrentSubFolder(data.current_folder);
          setExpandedFolderIds((prev) =>
            prev.includes(data.current_folder.id)
              ? prev
              : [...prev, data.current_folder.id]
          );
          fetchFolderVideos(data.current_folder.id);
        }
      }
    }
  }, [loading, error, course?.id, user]);

  const isVideoSelected = currentVideo?.mimeType?.startsWith("video/");

  // Compute total lectures and total course length
  const totalLecturesCount = Object.values(folderVideosMap).reduce(
    (acc, list) =>
      acc +
      (Array.isArray(list)
        ? list.filter((file) => file.mimeType === "video/mp4").length
        : 0),
    0
  );
  const totalDurationText = formatTotalCourseDuration(folderVideosMap);

  if (loading) {
    return (
      <LoadingDiv>
        <FourSquare color="#8b5cf6" size="large" text="" textColor="#ec4899" />
      </LoadingDiv>
    );
  }
  if (error) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
          flexDirection: "column",
          gap: "16px",
          color: theme.colorMuted,
          fontFamily: "Inter, sans-serif",
        }}
      >
        <span style={{ fontSize: "48px" }}>⚠️</span>
        <span style={{ fontSize: "16px", fontWeight: 600 }}>
          Failed to load course content
        </span>
        <BackButton onClick={() => navigate("/")}>
          <FaArrowLeft /> Back to Courses
        </BackButton>
      </div>
    );
  }

  return (
    <>
      <Container>
        {/* ── Left: Video Panel ── */}
        <LeftContainer>
          {currentVideo?.id ? (
            <CourseFilePreview key={currentVideo.id} file={currentVideo} />
          ) : (
            <VideoWrapper>
              <img
                src={`data:image/jpeg;base64,${course.image}`}
                alt={course.name}
                style={{
                  height: isMobile ? "220px" : "500px",
                  objectFit: "cover",
                }}
              />
            </VideoWrapper>
          )}

          {/* Course title (desktop) */}
          <CourseTitleSection>
            <h2>{course?.name}</h2>
          </CourseTitleSection>

          {/* Now Playing bar */}
          {currentSubFolder && currentVideo && (
            <NowPlayingBar>
              <NowPlayingLabel>{isVideoSelected ? "▶ Now Playing" : "Now Viewing"}</NowPlayingLabel>
              <NowPlayingTitle>
                {currentSubFolder?.name &&
                  `${cleanFileName(currentSubFolder.name)} › ${cleanFileName(
                    currentVideo?.name
                  )}`}
              </NowPlayingTitle>
            </NowPlayingBar>
          )}

          <SubFolderDiv />
        </LeftContainer>

        {/* ── Right: Contents Panel (Udemy Style) ── */}
        <RightContainer>
          <CourseContentHeader>
            <HeaderTitle>Course content</HeaderTitle>
            <HeaderMetaRow>
              <HeaderStats>
                {subFolders.length}{" "}
                {subFolders.length === 1 ? "section" : "sections"}
                {totalLecturesCount > 0 && ` • ${totalLecturesCount} lectures`}
                {totalDurationText && ` • ${totalDurationText}`}
              </HeaderStats>
              {subFolders.length > 0 && (
                <ExpandAllButton onClick={handleToggleAllSections}>
                  {allExpanded ? "Collapse all sections" : "Expand all sections"}
                </ExpandAllButton>
              )}
            </HeaderMetaRow>
          </CourseContentHeader>

          {subFolders &&
            subFolders.map((subFolder, index) => (
              <ContentList
                key={subFolder.id || index}
                subFolder={subFolder}
                isOpen={expandedFolderIds.includes(subFolder.id)}
                onToggle={() => handleToggleFolder(subFolder)}
                videos={folderVideosMap[subFolder.id] || []}
                isLoading={!!folderLoadingMap[subFolder.id]}
                currentVideo={currentVideo}
                handleVideoSelect={handleVideoSelect}
                cleanFileName={cleanFileName}
              />
            ))}
        </RightContainer>
      </Container>
    </>
  );
};

export default VideoPlayer;
