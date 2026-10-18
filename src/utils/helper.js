export const cleanFileName = (str) =>
  str ? str.replace(/^[^a-zA-Z]+|\.mp4$/g, "") : "";

export const cleanVideoTitle = (name) => {
  if (!name) return "";
  return name.replace(/\.(mp4|html|url|pdf)$/i, "").trim();
};

export const sortName = (arr) => {
  if (!Array.isArray(arr)) return [];
  function getLeadingNumbers(fileName) {
    const match = (fileName || "").match(/^\d+/);
    return match ? match[0] : "";
  }
  return [...arr].sort(
    (a, b) => getLeadingNumbers(a.name) - getLeadingNumbers(b.name)
  );
};

export const getVideoDuration = (video) => {
  if (!video) return "";
  if (video.duration) return video.duration;
  if (video.videoMediaMetadata?.durationMillis) {
    const totalSec = Math.round(
      Number(video.videoMediaMetadata.durationMillis) / 1000
    );
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }
  const match = (video.name || "").match(/[\(\[]?(\d{1,2}):(\d{2})[\)\]]?/);
  if (match) {
    return `${match[1]}:${match[2]}`;
  }
  // Do not display a made-up duration.  It is more accurate to leave this
  // blank until Drive has supplied metadata than to disagree with the player.
  return "";
};

export const durationToSeconds = (durationStr) => {
  if (!durationStr || typeof durationStr !== "string") return 0;
  const parts = durationStr.split(":").map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return 0;
};

export const formatSectionDuration = (videos) => {
  if (!videos || videos.length === 0) return "";
  const totalSec = videos.reduce(
    (acc, v) => acc + durationToSeconds(getVideoDuration(v)),
    0
  );
  if (totalSec === 0) return "";
  const hours = Math.floor(totalSec / 3600);
  const mins = Math.round((totalSec % 3600) / 60);
  if (hours > 0) {
    return `${hours}hr ${mins}min`;
  }
  return `${mins}min`;
};

export const formatTotalCourseDuration = (folderVideosMap) => {
  let totalSec = 0;
  if (!folderVideosMap || typeof folderVideosMap !== "object") return "";
  Object.values(folderVideosMap).forEach((videos) => {
    if (Array.isArray(videos)) {
      videos.forEach((v) => {
        totalSec += durationToSeconds(getVideoDuration(v));
      });
    }
  });
  if (totalSec === 0) return "";
  const hours = Math.floor(totalSec / 3600);
  const mins = Math.round((totalSec % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${mins}m total length`;
  }
  return `${mins}m total length`;
};
