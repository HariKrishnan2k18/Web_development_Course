/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Container,
  Folder,
  FolderContent,
  FolderHeader,
  LeftContainer,
  LoadingContainer,
  LoadingDiv,
  LoadingLine,
  RightContainer,
  SubFolderDiv,
  VideoLoad,
  VideoTitle
} from "./styled.components";
import { isMobile } from "react-device-detect";
import PlayIconWhite from "../../Assets/Logo/play-button.svg";
import FileIconWhite from "../../Assets/Logo/file-button.svg";
import PlayIconYellow from "../../Assets/Logo/play-button-yellow.svg";
import FileIconYellow from "../../Assets/Logo/file-button-yellow.svg";
import { useTheme } from "styled-components";
import { useSelector } from "react-redux";
import { FourSquare, OrbitProgress } from "react-loading-indicators";
import { cleanFileName, sortName } from "../../utils/helper";
import { fetchApiData } from "../../data/SubFolderSlice/api";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import axios from "axios";

const ImageTheme = {
  light: {
    play: PlayIconWhite,
    file: FileIconWhite
  },
  dark: {
    play: PlayIconYellow,
    file: FileIconYellow
  }
};

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

  const { course } = useSelector((s) => s.currentCourse);

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

  const handleVideoSelect = async (video) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setHtml(undefined);
    if (video.mimeType === "video/mp4") {
      if (video?.name !== currentVideo?.name) {
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
            API_KEY: course?.apikey
          }
        });
        setVideos(sortName(subFolderVideos));
        setVideoLoading(false);
        setSubFolderVideo([
          ...storeSubFolderVideo,
          { id: subFolder.id, data: sortName(subFolderVideos) }
        ]);
      }
    }
  };
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
    <>
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
                  src={
                    currentVideo?.id &&
                    `https://drive.google.com/file/d/${currentVideo.id}/preview`
                  }
                  srcDoc={
                    htmltext &&
                    `<html><body><pre>${htmltext}</pre></body></html>`
                  }
                  title={currentVideo.name}
                  width={"100%"}
                  onLoad={() => setVideoOnload(false)}
                  height={isMobile ? "350px" : "500px"}
                  style={{
                    border: currentVideo.id ? "none" : "2px solid black",
                    color: theme.color,
                    background: theme.type === "dark" ? theme.color : "#f8f6f5"
                  }}
                  allow="autoplay"
                  allowFullScreen
                  webkitallowfullscreen={isMobile}
                  mozallowfullscreen={isMobile}
                />
              </div>
            </div>
          ) : (
            <img
              src={course?.img}
              alt="img"
              width={"100%"}
              height={isMobile ? "350px" : "500px"}
            ></img>
          )}
          <SubFolderDiv>
            <h2>{course?.name}</h2>
            {currentSubFolder &&
              currentVideo &&
              currentVideo.mimeType === "video/mp4" && (
                <>
                  <div style={{ textAlign: "left" }}>Currently Playing</div>
                  {currentVideo.mimeType === "video/mp4" && (
                    <b style={{ marginTop: "10px" }}>{` ${cleanFileName(
                      currentSubFolder.name
                    )} > ${cleanFileName(currentVideo.name)}`}</b>
                  )}
                </>
              )}
          </SubFolderDiv>
        </LeftContainer>

        <RightContainer>
          <h3 style={{ marginTop: "2px" }}>Contents</h3>
          {subFolders &&
            subFolders.map((subFolder) => (
              <Folder key={subFolder.id}>
                <FolderHeader
                  onClick={() => handleSubFolderSelect(subFolder)}
                  view={currentSubFolder === subFolder}
                >
                  <span>
                    {currentSubFolder === subFolder ? (
                      <i
                        class="fa fa-chevron-down"
                        style={{ fontSize: "13px" }}
                      ></i>
                    ) : (
                      <i
                        class="fa fa-chevron-up"
                        style={{ fontSize: "13px" }}
                      ></i>
                    )}
                  </span>
                  <span>
                    {subFolder?.name && cleanFileName(subFolder.name)}
                  </span>
                </FolderHeader>
                {currentSubFolder === subFolder && (
                  <FolderContent>
                    {videoLoading && (
                      <LoadingContainer>
                        <LoadingLine />
                      </LoadingContainer>
                    )}
                    {videos.map((video) => (
                      <>
                        {[
                          "video/mp4",
                          "application/octet-stream",
                          "text/javascript",
                          "text/x-url"
                        ].includes(video.mimeType) ? (
                          <VideoTitle
                            key={video.id}
                            onClick={() => handleVideoSelect(video)}
                          >
                            <span>
                              <img
                                src={ImageTheme[theme.type].play}
                                alt="^"
                                width={"20px"}
                              ></img>
                            </span>
                            <span>{video?.name}</span>
                          </VideoTitle>
                        ) : (
                          <VideoTitle
                            key={video.id}
                            onClick={() => {
                              setHtml(true);
                              window.open(
                                `https://drive.google.com/file/d/${video.id}/view?usp=sharing`,
                                "_blank"
                              );
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <span>
                              <img
                                src={ImageTheme[theme.type].file}
                                alt="^"
                                width={"20px"}
                              ></img>
                            </span>
                            <span>{cleanFileName(video.name)}</span>
                          </VideoTitle>
                        )}
                      </>
                    ))}
                  </FolderContent>
                )}
              </Folder>
            ))}
        </RightContainer>
      </Container>
    </>
  );
};

export default VideoPlayer;
