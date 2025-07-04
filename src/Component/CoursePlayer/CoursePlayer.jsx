/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Container,
  LeftContainer,
  LoadingDiv,
  RightContainer,
  SubFolderDiv,
  VideoLoad,
} from "./styled.components";
import { isMobile } from "react-device-detect";
import { useTheme } from "styled-components";
import { useSelector } from "react-redux";
import { FourSquare, OrbitProgress } from "react-loading-indicators";
import { cleanFileName, sortName } from "../../utils/helper";
import { fetchApiData } from "../../data/SubFolderSlice/api";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import axios from "axios";
import ContentList from "../ContentList/ContentList";

const VideoPlayer = () => {
  const theme = useTheme();
  const [currentVideo, setCurrentVideo] = useState(null);
  const [subFolders, setSubFolders] = useState([]);
  const [videos, setVideos] = useState([]);
  const [currentSubFolder, setCurrentSubFolder] = useState(null);
  const [storeSubFolderVideo, setSubFolderVideo] = useState([]);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoOnload, setVideoOnload] = useState(false);
  const [htmltext, setHtml] = useState("");
  const navigate = useNavigate();

  const { loading, data, error } = useSelector((s) => s.subFolderData);
  const { course, user } = useSelector((s) => s.currentCourse);
  const API_URL = String(process.env.REACT_APP_USER_API_URL);

  useEffect(() => {
    if (isEmpty(course)) {
      navigate("/");
    } else {
      const subFolders =
        data &&
        data.filter(
          (file) => file.mimeType === "application/vnd.google-apps.folder"
        );
      const videos =
        data && data.filter((file) => file.mimeType === "video/mp4");
      setSubFolders(sortName(subFolders));
      setVideos(videos);
    }
  }, [data, course]);

  const handleVideoSelect = async (video, subfolder) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setHtml(undefined);
    if (video?.mimeType === "video/mp4") {
      if (video?.name !== currentVideo?.name) {
        try {
          await fetch(`${API_URL}/users/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              courses: {
                id: course.id,
                current_video: video,
                current_folder: currentSubFolder || subfolder,
                courseName: course.name,
              },
            }),
          });
        } catch (error) {
          console.error("Error updating play_video_id:", error);
        }
        setCurrentVideo(video);
        setVideoOnload(true);
      }
    } else if (
      ["application/octet-stream", "text/javascript", "text/x-url"].includes(
        video.mimeType
      )
    ) {
      setVideoOnload(true);
      setCurrentVideo({});
      try {
        const res = await axios.get(
          `https://www.googleapis.com/drive/v3/files/${video.id}?alt=media&key=${course.apikey}`
        );
        setHtml(res.data);
      } catch (error) {
        setVideoOnload(false);
        const link = document.createElement("a");
        link.href = `https://drive.google.com/file/d/${video.id}/view?usp=sharing`;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } else {
    }
  };

  const handleSubFolderSelect = async (subFolder) => {
    if (subFolder === currentSubFolder) {
      setCurrentSubFolder(null);
    } else {
      setVideos([]);
      setVideoLoading(true);
      setCurrentSubFolder(subFolder);
      const data = storeSubFolderVideo.find((e) => e.id === subFolder.id);
      if (data) {
        setVideos([...data.data]);
        setVideoLoading(false);
      } else {
        const subFolderVideos = await fetchApiData({
          payload: {
            FOLDER_ID: subFolder.id,
            API_KEY: course?.apikey,
          },
        });
        const modifiedContent = subFolderVideos.filter(
          (e) => e.mimeType !== "application/octet-stream"
        );
        setVideos(sortName(modifiedContent));
        setVideoLoading(false);
        setSubFolderVideo([
          ...storeSubFolderVideo,
          { id: subFolder.id, data: sortName(modifiedContent) },
        ]);
      }
    }
  };

  useEffect(() => {
    if (user?.user) {
      // eslint-disable-next-line eqeqeq
      const data = user.courses.find((e) => e?.id == course?.id);
      if (data) {
        handleVideoSelect(data?.current_video, data?.current_folder);
        setCurrentSubFolder(data?.current_folder);
      }
    }
  }, [course?.name]);
  if (loading) {
    return (
      <LoadingDiv>
        <FourSquare color="#32cd32" size="large" text="" textColor="#3a36a5" />
      </LoadingDiv>
    );
  }
  if (error) {
    return <div>Error ...</div>;
  }
  return (
    <Container>
      <LeftContainer>
        {currentVideo || htmltext ? (
          <div style={{ marginTop: !isMobile && "32px" }}>
            {videoOnload && (
              <VideoLoad>
                <OrbitProgress
                  variant="dotted"
                  color="#32cd32"
                  size="medium"
                  text=""
                  textColor=""
                />
              </VideoLoad>
            )}
            <div style={{ display: videoOnload && "none" }}>
              <iframe
                {...(htmltext
                  ? {
                      srcDoc: `<html><body><pre>${htmltext}</pre></body></html>`,
                    }
                  : {
                      src: `https://drive.google.com/file/d/${currentVideo?.id}/preview`,
                    })}
                title={currentVideo.name}
                onLoad={() => setVideoOnload(false)}
                height={isMobile ? "350px" : "500px"}
                style={{
                  width: "100%",
                  border: isMobile ? "" : "3px solid green",
                  color: theme.color,
                  background: theme.type === "dark" ? theme.color : "#f8f6f5",
                }}
                allow="autoplay"
                allowFullScreen
                webkitallowfullscreen={isMobile ? "true" : "false"}
                mozallowfullscreen={isMobile ? "true" : "false"}
              />
            </div>
          </div>
        ) : (
          <img
            src={course?.img}
            alt="img"
            width={"100%"}
            height={isMobile ? "350px" : "500px"}
            style={{
              border: "3px solid green",
            }}
          />
        )}
        <SubFolderDiv>
          <h2>{course?.name}</h2>
          {currentSubFolder &&
            currentVideo &&
            currentVideo.mimeType === "video/mp4" && (
              <>
                <div style={{ textAlign: "left" }}>Currently Playing</div>
                {currentVideo?.mimeType === "video/mp4" && (
                  <b style={{ marginTop: "10px" }}>
                    {currentSubFolder?.name &&
                      ` ${cleanFileName(
                        currentSubFolder?.name
                      )} > ${cleanFileName(currentVideo?.name)}`}
                  </b>
                )}
              </>
            )}
        </SubFolderDiv>
        {/* <RemainingCourseDiv>
          <h3>Remaining Courses</h3>
          <RemainingCourse>
            {Courses.filter((e) => e.id !== course.id)
              .slice(0, 16)
              .map((course) => (
                <div>
                  <img
                    src={course.img}
                    alt={course.name ? `${course.name} image` : "image"}
                    width={"100%"}
                    height={"150px"}
                  ></img>
                  <div style={{ height: "50px" }}>{course.name}</div>
                  <StartCourseButton
                    to="/course"
                    availability={course.availability}
                    onClick={(e) => {
                      if (course.availability) {
                        setCurrentSubFolder({});
                        setCurrentVideo({});
                        dispatch(storeCourse(course));
                        dispatch(
                          fetchDataRequest({
                            FOLDER_ID: course.folderid,
                            API_KEY: course.apikey
                          })
                        );
                      } else {
                        e.preventDefault();
                        alert("course unavailable");
                      }
                    }}
                  >
                    Start Course
                  </StartCourseButton>
                </div>
              ))}
          </RemainingCourse>
        </RemainingCourseDiv> */}
      </LeftContainer>

      <RightContainer>
        <h3 style={{ marginTop: "2px" }}>Contents</h3>
        {subFolders &&
          subFolders.map((subFolder, index) => (
            <ContentList
              key={index}
              handleSubFolderSelect={handleSubFolderSelect}
              subFolder={subFolder}
              currentSubFolder={currentSubFolder}
              cleanFileName={cleanFileName}
              videoLoading={videoLoading}
              setHtml={setHtml}
              videos={videos}
              currentVideo={currentVideo}
              handleVideoSelect={handleVideoSelect}
            />
          ))}
      </RightContainer>
    </Container>
  );
};

export default VideoPlayer;
