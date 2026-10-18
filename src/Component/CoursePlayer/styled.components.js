import styled, { keyframes } from "styled-components";

// Shared course-page colors keep all three headers visually consistent.
const headerGradient = "linear-gradient(110deg, #3730a3 0%, #3158a6 55%, #0e7490 100%)";
const accentGradient = (theme) => theme.type === "dark"
  ? "linear-gradient(110deg, #a5b4fc, #67e8f9)"
  : "linear-gradient(110deg, #4338ca, #0e7490)";
const accentColor = (theme) => theme.type === "dark" ? "#a5b4fc" : "#4338ca";

/* ── Animations ─────────────────────────────── */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const loadingAnimation = keyframes`
  0%   { transform: scaleX(0); transform-origin: left; }
  50%  { transform: scaleX(1); transform-origin: left; }
  100% { transform: scaleX(0); transform-origin: right; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.5; }
`;

/* ── Root App Container ──────────────────────── */
export const AppContainer = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  height: 100%;
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  transition: background 0.3s ease, color 0.3s ease;
`;

/* ── Top Bar ─────────────────────────────────── */
export const TopBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background: ${headerGradient};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: 0 24px;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: ${({ theme }) => theme.shadow};
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.backgroundCard};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.color};
  border-radius: 10px;
  padding: 7px 16px;
  font-size: 13px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  svg {
    font-size: 14px;
  }

  &:hover {
    background: ${({ theme }) => accentGradient(theme)};
    color: #fff;
    border-color: transparent;
    transform: translateX(-2px);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  }
`;

export const TopBarTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.2px;
`;

export const TopBarBadge = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  white-space: nowrap;
  letter-spacing: 0.3px;
`;

/* ── Main Page Layout ────────────────────────── */
export const Container = styled.div`
  display: flex;
  height: 100%;
  gap: 0px;
  width: 100%;

  @media (max-width: 768px) {
    height: auto;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

/* ── Left (Video) Panel ──────────────────────── */
export const LeftContainer = styled.div`
  width: ${(props) => (props.fullview ? "100%" : "70%")};
  min-width: 0;
  box-sizing: border-box;
  padding: 20px 24px;
  animation: ${fadeIn} 0.4s ease;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0px;
    position: static;
    flex-shrink: 0;
  }
`;

/* ── Video Frame Wrapper ─────────────────────── */
export const VideoWrapper = styled.div`
  min-width: 0;
  ${({ $preview }) => $preview && "height: 500px;"}
  @media (max-width: 768px) {
    ${({ $preview, $video }) => $preview && ($video
      ? "height: clamp(300px, 75vw, 500px);"
      : "height: 65vh;")}
  }
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  border: ${({ theme }) => theme.frameborder};
  box-shadow: ${({ theme }) => theme.shadow};
  background: #000;

  iframe, img {
    display: block;
    width: 100%;
    border: none;
  }

  @media (max-width: 768px) {
    border-radius: 0;
  }
`;

/* ── Now Playing Info ────────────────────────── */
export const PreviewFrame = styled.section`
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid rgba(139, 92, 246, 0.4);
  background: #201b38;
  box-shadow: 0 16px 40px rgba(76, 29, 149, 0.18);
  ${VideoWrapper} { border: 0; border-radius: 0; box-shadow: none; }
  @media (max-width: 768px) { border-radius: 0 0 14px 14px; }
`;

export const PreviewFilename = styled.div`
  flex: 1;
  min-width: 0;
  color: #f5f3ff;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.5;
  overflow-wrap: anywhere;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  border-left: 3px solid #a5b4fc;
  padding-left: 12px;
`;

export const PreviewActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 12px;
  background: ${headerGradient};
  border-bottom: 1px solid rgba(196, 181, 253, 0.25);
  box-shadow: inset 0 2px 0 #a5b4fc;
  @media (max-width: 480px) { padding: 5px 8px; gap: 6px; }
`;

export const PreviewAction = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  padding: 0;
  border-radius: 11px;
  border: 1px solid rgba(221, 214, 254, 0.25);
  background: rgba(255, 255, 255, 0.08);
  color: #ede9fe;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
  svg { font-size: 14px; }
  &:hover { background: rgba(167, 139, 250, 0.3); border-color: #c7d2fe; color: #fff; }
  &:focus-visible { outline: 2px solid #67e8f9; outline-offset: 2px; }
`;

export const NowPlayingBar = styled.div`
  margin-top: 16px;
  padding: 14px 18px;
  background: ${({ theme }) => theme.backgroundCard};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  animation: ${fadeIn} 0.3s ease;

  @media (max-width: 768px) {
    border-radius: 0;
    margin-top: 0;
    border-left: none;
    border-right: none;
  }
`;

export const NowPlayingLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: ${({ theme }) => accentGradient(theme)};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const NowPlayingTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.color};
  letter-spacing: -0.2px;
  line-height: 1.4;
`;

/* ── Course Title Below Video ────────────────── */
export const CourseTitleSection = styled.div`
  margin-top: 16px;
  padding: 0 4px;

  h2 {
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.5px;
    margin: 0;
    background: ${({ theme }) => accentGradient(theme)};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.3;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

/* ── Right (Contents) Panel ──────────────────── */
export const RightContainer = styled.div`
  width: 30%;
  border-left: 1px solid ${({ theme }) => theme.border};
  display: ${(props) => props.fullview && "none"};
  overflow-y: auto;
  max-height: 100vh;
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.backgroundSecondary};

  @media (max-width: 768px) {
    width: 100%;
    position: static;
    max-height: none;
    overflow: visible;
    flex-shrink: 0;
    border-left: none;
    border-top: 1px solid ${({ theme }) => theme.border};
  }
`;

/* ── Course Content Header (Udemy Style) ─────── */
export const CourseContentHeader = styled.div`
  padding: 12px 16px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  position: sticky;
  top: 0;
  background: ${headerGradient};
  z-index: 10;
  backdrop-filter: blur(8px);

  @media (max-width: 768px) {
    position: static;
    z-index: auto;
  }
`;

export const ContentsHeader = styled.div`
  padding: 18px 20px 14px;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: -0.3px;
  color: ${({ theme }) => theme.color};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.backgroundSecondary};
  z-index: 10;
`;

export const HeaderTitle = styled.h3`
  margin: 0;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -0.3px;
  color: #fff;
`;

export const HeaderMetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
  gap: 8px;
  flex-wrap: wrap;
`;

export const HeaderStats = styled.div`
  font-size: 12px;
  color: #ede9fe;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: normal;
`;

export const ExpandAllButton = styled.button`
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 4px 8px;
  margin: 2px 0;
  font-size: 12.5px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
  white-space: normal;
  font-family: inherit;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.22);
  }
`;

/* ── Subfolder / Folder Accordion ────────────── */
export const SubFolderDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Folder = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.border};
  transition: background 0.2s;

  &:last-child {
    border-bottom: none;
  }
`;

export const FolderHeader = styled.div`
  background: ${({ theme, isOpen }) =>
    isOpen ? theme.backgroundCard : theme.backgroundSecondary};
  cursor: pointer;
  padding: 13px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.color};
  transition: background 0.2s, color 0.2s;
  border-bottom: ${(props) =>
    (props.view === "true" || props.isOpen) &&
    `1px solid ${props.theme?.border || "rgba(0,0,0,0.08)"}`};
  line-height: 1.4;
  user-select: none;

  &:hover {
    background: ${({ theme }) => theme.backgroundCard};
    color: ${({ theme }) => accentColor(theme)};

    .folder-meta {
      color: ${({ theme }) => theme.color};
    }
  }

  i, svg {
    font-size: 11px;
    color: ${({ theme }) => accentColor(theme)};
    flex-shrink: 0;
    transition: transform 0.2s;
  }
`;

export const FolderHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex: 1;

  span {
    white-space: normal;
    word-break: break-word;
    line-height: 1.35;
  }
`;

export const FolderMeta = styled.span`
  font-size: 11.5px;
  font-weight: 500;
  color: ${({ theme }) => theme.colorMuted};
  white-space: nowrap;
  flex-shrink: 0;
  letter-spacing: -0.1px;
  transition: color 0.2s;
`;

export const FolderContent = styled.div`
  margin: 0;
  padding: 4px 0;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.backgroundCard};
`;

/* ── Video Title Item (Udemy Style) ──────────── */
export const VideoTitle = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 20px 9px 24px;
  font-size: 12.5px;
  line-height: 1.4;
  color: ${(props) =>
    props.highlight === "true" ? accentColor(props.theme || {}) : props.theme?.color || "inherit"};
  font-weight: ${(props) => (props.highlight === "true" ? "700" : "400")};
  background: ${(props) =>
    props.highlight === "true"
      ? "rgba(79,70,229,0.08)"
      : "transparent"};
  border-left: ${(props) =>
    props.highlight === "true"
      ? "3px solid #6366f1"
      : "3px solid transparent"};
  transition: all 0.15s ease;

  &:hover {
    background: rgba(139, 92, 246, 0.06);
    color: ${({ theme }) => accentColor(theme)};

    .video-timing {
      color: ${({ theme }) => accentColor(theme)};
    }
  }
`;

export const VideoLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  flex: 1;

  .play-icon {
    font-size: 14px;
    flex-shrink: 0;
    color: ${(props) =>
      props.highlight === "true" ? accentColor(props.theme || {}) : props.theme?.colorMuted || accentColor(props.theme || {})};
  }

  span.title-text {
    white-space: normal;
    word-break: break-word;
    line-height: 1.35;
  }
`;

export const VideoRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

export const PreviewBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => accentColor(theme)};
  text-decoration: underline;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const VideoDuration = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colorMuted};
  font-variant-numeric: tabular-nums;
  min-width: 36px;
  text-align: right;
  letter-spacing: -0.1px;
  transition: color 0.2s;
`;

/* ── Loading Bar ─────────────────────────────── */
export const LoadingContainer = styled.div`
  width: 100%;
  height: 3px;
  background-color: ${({ theme }) => theme.border};
  overflow: hidden;
  position: relative;
`;

export const LoadingLine = styled.div`
  width: 100%;
  height: 100%;
  background: ${headerGradient};
  transform-origin: left;
  animation: ${loadingAnimation} 1.6s infinite ease-in-out;
`;

/* ── Full-page Loading ───────────────────────── */
export const LoadingDiv = styled.div`
  width: 100%;
  top: 35%;
  left: 45%;
  position: fixed;
  @media (max-width: 768px) {
    top: 40%;
    left: 35%;
  }
`;

/* ── Video Loading Skeleton ──────────────────── */
export const VideoLoad = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  border: ${({ theme }) => theme.frameborder};
  background: ${({ theme }) => theme.frameloadingbackground};
  animation: ${pulse} 1.5s ease infinite;

  @media (max-width: 768px) {
    height: 220px;
    border-radius: 0;
  }
`;

/* ── Remaining Courses Grid ──────────────────── */
export const RemainingCourse = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  align-items: center;
  text-align: center;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 16px;
    margin: 0px;
    padding-bottom: 10px;
    background: ${({ theme }) => theme.backgroundCard};
    overflow: hidden;
    transition: transform 0.25s, box-shadow 0.25s;
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${({ theme }) => theme.cardShadow};
    }
    > a {
      width: 80%;
    }
  }
`;

export const RemainingCourseDiv = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

// Drive owns the cross-origin player controls; mask only its duplicate pop-out corner.
export const DrivePopoutCover = styled.div`
  @media (max-width: 768px), (pointer: coarse) { display: none; }
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 56px;
  background: #000;
  z-index: 2;
`;
