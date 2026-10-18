import React from "react";
import {
  Folder,
  FolderContent,
  FolderHeader,
  FolderHeaderLeft,
  FolderMeta,
  LoadingContainer,
  LoadingLine,
  VideoTitle,
  VideoLeft,
  VideoRight,
  PreviewBadge,
  VideoDuration,
} from "../CoursePlayer/styled.components";
import {
  cleanVideoTitle,
  getVideoDuration,
  formatSectionDuration,
} from "../../utils/helper";
import {
  FaChevronDown,
  FaChevronUp,
  FaPlayCircle,
  FaFileAlt,
  FaPlay,
} from "react-icons/fa";

function ContentList({
  subFolder,
  isOpen,
  onToggle,
  videos = [],
  isLoading,
  currentVideo,
  handleVideoSelect,
  cleanFileName,
}) {
  const isVideoFile = (mimeType) => mimeType?.startsWith("video/");

  // Supporting files (PDFs, links, and code files) appear in a section but
  // are not video lectures and must not inflate the lesson count or length.
  const videoLessons = videos.filter((video) => video.mimeType === "video/mp4");
  const durationMeta =
    videoLessons.length > 0
      ? `${videoLessons.length} ${
          videoLessons.length === 1 ? "lecture" : "lectures"
        } • ${formatSectionDuration(videoLessons)}`
      : "";

  return (
    <Folder>
      <FolderHeader
        onClick={onToggle}
        isOpen={isOpen}
        data-testid={`${subFolder?.id}`}
      >
        <FolderHeaderLeft>
          {isOpen ? <FaChevronDown /> : <FaChevronUp />}
          <span>{subFolder?.name && cleanFileName(subFolder.name)}</span>
        </FolderHeaderLeft>
        <FolderMeta className="folder-meta">
          {isLoading ? "Loading..." : durationMeta}
        </FolderMeta>
      </FolderHeader>

      {isOpen && (
        <FolderContent>
          {isLoading && (
            <LoadingContainer>
              <LoadingLine />
            </LoadingContainer>
          )}

          {videos.map((video, index) => {
            const isVideo = isVideoFile(video.mimeType);
            const isCurrentPlaying = currentVideo?.id === video?.id;
            const timing = getVideoDuration(video);
            const cleanTitle = cleanVideoTitle(video.name);

            if (isVideo) {
              return (
                <VideoTitle
                  key={video.id || index}
                  highlight={isCurrentPlaying ? "true" : "false"}
                  onClick={() => handleVideoSelect(video, subFolder)}
                >
                  <VideoLeft highlight={isCurrentPlaying ? "true" : "false"}>
                    <FaPlayCircle className="play-icon" />
                    <span className="title-text">{cleanTitle}</span>
                  </VideoLeft>

                  <VideoRight>
                    {isCurrentPlaying && (
                      <PreviewBadge
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVideoSelect(video, subFolder);
                        }}
                      >
                        <FaPlay style={{ fontSize: "9px" }} /> Preview
                      </PreviewBadge>
                    )}
                    <VideoDuration className="video-timing">
                      {timing}
                    </VideoDuration>
                  </VideoRight>
                </VideoTitle>
              );
            }

            return (
              <VideoTitle
                key={video.id || index}
                highlight={isCurrentPlaying ? "true" : "false"}
                onClick={() => handleVideoSelect(video, subFolder)}
                style={{ cursor: "pointer" }}
              >
                <VideoLeft highlight={isCurrentPlaying ? "true" : "false"}>
                  <FaFileAlt className="play-icon" style={{ opacity: 0.7 }} />
                  <span className="title-text">{cleanTitle}</span>
                </VideoLeft>

                <VideoRight>
                  <VideoDuration className="video-timing">
                    {isCurrentPlaying ? "Viewing" : ""}
                  </VideoDuration>
                </VideoRight>
              </VideoTitle>
            );
          })}
        </FolderContent>
      )}
    </Folder>
  );
}

export default ContentList;
