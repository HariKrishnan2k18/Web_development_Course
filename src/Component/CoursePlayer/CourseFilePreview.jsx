import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useTheme } from "styled-components";
import { OrbitProgress } from "react-loading-indicators";
import { FaRedoAlt, FaExternalLinkAlt } from "react-icons/fa";
import { fetchFileContent } from "../../data/SubFolderSlice/api";
import { API_URL } from "../../utils/apiUrl";
import { BackButton, DrivePopoutCover, VideoLoad, VideoWrapper, PreviewFrame, PreviewFilename, PreviewActions, PreviewAction } from "./styled.components";

const isHtml = (file) =>
  /^(text\/html|application\/xhtml\+xml)$/i.test(file.mimeType || "") ||
  /\.x?html?$/i.test(file.name || "");

const isText = (file) => isHtml(file) ||
  (file.mimeType || "").startsWith("text/") ||
  /^(application\/(javascript|json|xml|internet-shortcut))$/i.test(file.mimeType || "") ||
  /\.(txt|text|md|csv|tsv|js|mjs|jsx|ts|tsx|json|css|xml|url|log|yaml|yml)$/i.test(file.name || "");

const escapeHtml = (text) => text.replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[character]));

export default function CourseFilePreview({ file }) {
  const theme = useTheme();
  const [compactViewport, setCompactViewport] = useState(() => window.innerWidth <= 768);
  const mobilePlayback = isMobile || compactViewport;

  useEffect(() => {
    const updateViewport = () => setCompactViewport(window.innerWidth <= 768);
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);
  const [attempt, setAttempt] = useState(0);
  const [preview, setPreview] = useState(null);
  const [useDrive, setUseDrive] = useState(false);
  const video = file.mimeType?.startsWith("video/");
  const nativeVideo = video && mobilePlayback && !useDrive;
  const textPreview = isText(file) && !useDrive;
  const previewKey = `${file.id}-${attempt}-${textPreview}-${nativeVideo}`;
  const current = preview?.key === previewKey ? preview : null;


  useEffect(() => {
    setUseDrive(false);
  }, [file.id]);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    setPreview({ key: previewKey, loading: true });
    if (textPreview) {
      fetchFileContent(file.id, { signal: controller.signal })
        .then((result) => {
          if (!active) return;
          if (typeof result?.content !== "string") {
            throw new Error("Invalid file content");
          }
          const srcDoc = isHtml({ name: file.name, mimeType: result.mimeType || file.mimeType })
            ? result.content
            : `<!doctype html><html><head><meta charset="utf-8"></head><body style="margin:24px;background:white;color:#1a1a2e"><pre style="white-space:pre-wrap;overflow-wrap:anywhere">${escapeHtml(result.content)}</pre></body></html>`;
          setPreview({ key: previewKey, loading: true, srcDoc });
        })
        .catch(() => {
          if (active) setPreview({ key: previewKey, loading: false, error: true });
        });
    }
    return () => {
      active = false;
      controller.abort();
    };
  }, [file.id, file.name, file.mimeType, previewKey, textPreview]);

  const finishLoading = () => setPreview((previous) =>
    previous?.key === previewKey ? { ...previous, loading: false } : previous
  );
  const retry = () => setAttempt((value) => value + 1);

  return (
    <PreviewFrame>
      <PreviewActions>
        <PreviewFilename>{file.name || "Course file preview"}</PreviewFilename>
        <PreviewAction type="button" onClick={retry} aria-label={video ? "Reload player" : "Reload preview"} title={video ? "Reload player" : "Reload preview"}>
          <FaRedoAlt aria-hidden="true" />
        </PreviewAction>
        <PreviewAction as="a" href={`https://drive.google.com/file/d/${encodeURIComponent(file.id)}/view`} target="_blank" rel="noopener noreferrer" aria-label="Open in new tab" title="Open in new tab">
          <FaExternalLinkAlt aria-hidden="true" />
        </PreviewAction>
      </PreviewActions>
      <VideoWrapper $preview $video={video} aria-busy={current?.loading !== false}>
        {(!current || current.loading) && (
          <VideoLoad style={{ position: "absolute", inset: 0, height: "100%", zIndex: 1, pointerEvents: "none" }}>
            <OrbitProgress variant="dotted" color="#8b5cf6" size="medium" text="" textColor="" />
          </VideoLoad>
        )}
        {current?.error ? (
          <div role="alert" style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: 24, boxSizing: "border-box", background: theme.backgroundCard, color: theme.color }}>
            <p>We couldn’t load this file’s preview. Try again{textPreview ? " or use the Drive preview" : ""}.</p>
            {(textPreview || nativeVideo) && (
              <BackButton onClick={() => setUseDrive(true)}>Use Drive preview</BackButton>
            )}
          </div>
        ) : nativeVideo ? (
          <video
            key={previewKey}
            title={file.name || "Course video"}
            src={`${API_URL}/coursedetails/files/${encodeURIComponent(file.id)}/video`}
            controls
            playsInline
            preload="metadata"
            onLoadedMetadata={finishLoading}
            onCanPlay={finishLoading}
            onError={() => setPreview({ key: previewKey, loading: false, error: true })}
            style={{ display: "block", width: "100%", height: "100%", objectFit: "contain", background: "#000" }}
          />
        ) : (!textPreview || current?.srcDoc !== undefined) && (
          <iframe
            key={previewKey}
            title={file.name || "Course file preview"}
            {...(textPreview
              ? { srcDoc: current.srcDoc, sandbox: "allow-scripts" }
              : { src: `https://drive.google.com/file/d/${encodeURIComponent(file.id)}/preview${video && !mobilePlayback ? "?autoplay=1" : ""}` })}
            onLoad={finishLoading}
            style={{ width: "100%", height: "100%", border: "none", background: "#fff" }}
            allow={video ? "autoplay; encrypted-media; fullscreen" : "fullscreen"}
            allowFullScreen
          />
        )}
        {video && !isMobile && !current?.error && <DrivePopoutCover aria-hidden="true" />}
      </VideoWrapper>
    </PreviewFrame>
  );
}
