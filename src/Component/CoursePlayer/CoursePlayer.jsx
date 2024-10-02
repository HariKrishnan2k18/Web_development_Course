import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  LeftContainer,
  RightContainer,
  SubFolderDiv,
  SubFolderFiles
} from "./styled.components";
import { isMobile } from "react-device-detect";

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

const VideoPlayer = () => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [subFolders, setSubFolders] = useState([]);
  const [subFolderFiles, setSubFolderFiles] = useState([]);
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
    setCurrentSubFolder(subFolder);
    const subFolderVideos = await getFolderDetails(subFolder.id, API_KEY);
    const sortvideo = subFolderVideos.filter(
      (file) => file.mimeType === "video/mp4"
    );
    const files = subFolderVideos.filter(
      (file) => file.mimeType !== "video/mp4"
    );
    setSubFolderFiles(sortName(files));
    setVideos(sortName(sortvideo));
  };
  return (
    <Container>
      <LeftContainer>
        {currentVideo ? (
          <iframe
            src={`https://drive.google.com/file/d/${currentVideo.id}/preview`}
            title={currentVideo.name}
            width={"100%"}
            height={isMobile ? "350px" : "500px"}
            style={{ border: "none" }}
            allow="autoplay"
          />
        ) : (
          <img
            src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg?tx=w_1024,q_auto"
            alt="img"
            width={"100%"}
            height={isMobile ? "350px" : "500px"}
          ></img>
        )}
        {subFolderFiles && (
          <SubFolderDiv>
            <span>Files</span>
            <SubFolderFiles>
              <>
                {subFolderFiles.map((files) => (
                  <div
                    key={files.id}
                    onClick={() =>
                      window.open(
                        `https://drive.google.com/file/d/${files.id}/view?usp=sharing`,
                        "_blank"
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {files.name}
                  </div>
                ))}
              </>
            </SubFolderFiles>
          </SubFolderDiv>
        )}
      </LeftContainer>

      <RightContainer>
        <h3>Contents</h3>
        {subFolders.map((subFolder) => (
          <div key={subFolder.id}>
            <h4
              onClick={() => handleSubFolderSelect(subFolder)}
              style={{ cursor: "pointer" }}
            >
              {subFolder.name}
            </h4>
            {currentSubFolder === subFolder && (
              <ul>
                {videos.map((video) => (
                  <li
                    key={video.id}
                    onClick={() => handleVideoSelect(video)}
                    style={{ cursor: "pointer" }}
                  >
                    {video.name.replace(/^\d+\.\s|\.mp4$/g, "")}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </RightContainer>
    </Container>
  );
};

export default VideoPlayer;
