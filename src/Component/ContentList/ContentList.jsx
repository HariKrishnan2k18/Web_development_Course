import React from "react";
import {
  Folder,
  FolderContent,
  FolderHeader,
  LoadingContainer,
  LoadingLine,
  VideoTitle,
} from "../CoursePlayer/styled.components";
import PlayIconWhite from "../../Assets/Logo/play-button.svg";
import FileIconWhite from "../../Assets/Logo/file-button.svg";
import PlayIconYellow from "../../Assets/Logo/play-button-yellow.svg";
import FileIconYellow from "../../Assets/Logo/file-button-yellow.svg";
import { useTheme } from "styled-components";

const ImageTheme = {
  light: {
    play: PlayIconWhite,
    file: FileIconWhite,
  },
  dark: {
    play: PlayIconYellow,
    file: FileIconYellow,
  },
};

function ContentList({
  handleSubFolderSelect,
  subFolder,
  currentSubFolder,
  cleanFileName,
  videoLoading,
  setHtml,
  videos,
  currentVideo,
  handleVideoSelect,
}) {
  const theme = useTheme();

  return (
    <Folder>
      <FolderHeader
        onClick={() => handleSubFolderSelect(subFolder)}
        view={currentSubFolder === subFolder ? "true" : "false"}
        data-testid={`${subFolder?.id}`}
      >
        <i
          className={
            currentSubFolder === subFolder
              ? "fa fa-chevron-down"
              : "fa fa-chevron-up"
          }
          style={{ fontSize: "13px" }}
        />
        <span>{subFolder?.name && cleanFileName(subFolder.name)}</span>
      </FolderHeader>
      {currentSubFolder === subFolder && (
        <FolderContent>
          {videoLoading && (
            <LoadingContainer>
              <LoadingLine />
            </LoadingContainer>
          )}
          {videos.map((video, index) => (
            <React.Fragment key={index}>
              {[
                "video/mp4",
                "application/octet-stream",
                "text/javascript",
                "text/x-url",
              ].includes(video.mimeType) ? (
                <VideoTitle
                  key={video.id}
                  highlight={(currentVideo?.id === video?.id)?.toString()}
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
            </React.Fragment>
          ))}
        </FolderContent>
      )}
    </Folder>
  );
}

export default ContentList;
