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
  VideoTitle
} from "./styled.components";
import { isMobile } from "react-device-detect";
import PlayIconWhite from "../../Assets/Logo/play-button.svg";
import FileIconWhite from "../../Assets/Logo/file-button.svg";
import PlayIconYellow from "../../Assets/Logo/play-button-yellow.svg";
import FileIconYellow from "../../Assets/Logo/file-button-yellow.svg";
import { useTheme } from "styled-components";
import { useSelector } from "react-redux";
import { FourSquare } from "react-loading-indicators";
import { cleanFileName, sortName } from "../../utils/helper";
import { fetchApiData } from "../../data/SubFolderSlice/api";

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

  const { loading, data, error } = useSelector((s) => s.subFolderData);

  const { course } = useSelector((s) => s.currentCourse);

  useEffect(() => {
    const subFolders =
      data &&
      data.filter(
        (file) => file.mimeType === "application/vnd.google-apps.folder"
      );
    const videos = data && data.filter((file) => file.mimeType === "video/mp4");
    setSubFolders(sortName(subFolders));
    setVideos(videos);
  }, [data]);

  const handleVideoSelect = (video) => {
    setCurrentVideo(video);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
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
          {currentVideo ? (
            <div style={{ marginTop: "32px" }}>
              <iframe
                src={`https://drive.google.com/file/d/${currentVideo.id}/preview`}
                title={currentVideo.name}
                width={"100%"}
                height={isMobile ? "350px" : "500px"}
                style={{ border: "none" }}
                allow="autoplay"
                allowFullScreen
                webkitallowfullscreen
                mozallowfullscreen
              />
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
            {currentSubFolder && currentVideo && (
              <>
                <div style={{ textAlign: "left" }}>Currently Playing</div>
                <b style={{ marginTop: "10px" }}>{` ${cleanFileName(
                  currentSubFolder.name
                )} > ${cleanFileName(currentVideo.name)}`}</b>
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
                  <span>{cleanFileName(subFolder.name)}</span>
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
                        {video.mimeType === "video/mp4" ? (
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
                            <span>{cleanFileName(video.name)}</span>
                          </VideoTitle>
                        ) : (
                          <VideoTitle
                            key={video.id}
                            onClick={() =>
                              window.open(
                                `https://drive.google.com/file/d/${video.id}/view?usp=sharing`,
                                "_blank"
                              )
                            }
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
