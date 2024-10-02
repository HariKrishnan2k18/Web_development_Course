import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Folder,
  FolderContent,
  FolderHeader,
  LeftContainer,
  RightContainer,
  SubFolderDiv,
  VideoTitle
} from "./styled.components";
import { isMobile } from "react-device-detect";
import PlayIcon from "../../Assets/Logo/play-button.svg";
import FileIcon from "../../Assets/Logo/file-button.svg";

const FOLDER_ID = "1-1Q8yNbknFn-CMzFik1xp1bI5r9GaNMX";
const API_KEY = "AIzaSyDoNuBE0rTDp_IIRaklAaibErtalhb3mN4";

const sortName = (arr) =>
  arr.sort(
    (a, b) => Number(a.name.split(".")[0]) - Number(b.name.split(".")[0])
  );

const getFolderDetails = async (folderId, apiKey) => {
  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents&key=${apiKey}&fields=files(id,name,mimeType)`;
  const response = await axios.get(url);
  return response.data.files;
};

const VideoPlayer = ({ title }) => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [subFolders, setSubFolders] = useState([]);
  const [videos, setVideos] = useState([]);
  const [currentSubFolder, setCurrentSubFolder] = useState(null);
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const folderDetails = await getFolderDetails(FOLDER_ID, API_KEY);
        const subFolders = folderDetails.filter(
          (file) => file.mimeType === "application/vnd.google-apps.folder"
        );
        const videos = folderDetails.filter(
          (file) => file.mimeType === "video/mp4"
        );
        setSubFolders(sortName(subFolders));
        setVideos(videos);
      } catch (error) {
        console.error("Error fetching folder details:", error);
      }
    };

    fetchFolders();
  }, []);

  const handleVideoSelect = (video) => {
    setCurrentVideo(video);
    if (isMobile) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  const handleSubFolderSelect = async (subFolder) => {
    if (subFolder === currentSubFolder) {
      setCurrentSubFolder(null);
    } else {
      setVideos([]);
      setCurrentSubFolder(subFolder);
      const subFolderVideos = await getFolderDetails(subFolder.id, API_KEY);
      setVideos(sortName(subFolderVideos));
    }
  };

  return (
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
            src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg?tx=w_1024,q_auto"
            alt="img"
            width={"100%"}
            height={isMobile ? "350px" : "500px"}
          ></img>
        )}
        <SubFolderDiv>
          <h2>{title}</h2>
          {currentSubFolder && currentVideo && (
            <>
              <div style={{ textAlign: "left" }}>Currently Playing</div>
              <b
                style={{ marginTop: "10px" }}
              >{` ${currentSubFolder.name.replace(
                /^\d+\.\s/,
                ""
              )} > ${currentVideo.name.replace(/^\d+\.\s|\.mp4$/g, "")}`}</b>
            </>
          )}
        </SubFolderDiv>
      </LeftContainer>

      <RightContainer>
        <h3 style={{ marginTop: "2px" }}>Contents</h3>
        {subFolders.map((subFolder) => (
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
                  <i class="fa fa-chevron-up" style={{ fontSize: "13px" }}></i>
                )}
              </span>
              <span>{subFolder.name.split(". ")[1]}</span>
            </FolderHeader>
            {currentSubFolder === subFolder && (
              <FolderContent>
                {videos.map((video) => (
                  <>
                    {video.mimeType === "video/mp4" ? (
                      <VideoTitle
                        key={video.id}
                        onClick={() => handleVideoSelect(video)}
                      >
                        <span>
                          <img src={PlayIcon} alt="^" width={"20px"}></img>
                        </span>
                        <span>
                          {video.name.replace(/^\d+\.\s|\.mp4$/g, "")}
                        </span>
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
                          <img src={FileIcon} alt="^" width={"20px"}></img>
                        </span>
                        <span>
                          {/* {video.name.replace(
                              /^\d+\.\s|\.html$|\.srt$|\.vtt$/g,
                              ""
                            )} */}
                          {video.name.replace(/^\d+\.\s/, "")}
                        </span>
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
  );
};

export default VideoPlayer;
