/**
 * Utility to determine API base URL based on environment.
 * - When running locally (localhost / 127.0.0.1): points to localhost backend.
 * - When running in production / deployed domain: points to Vercel backend.
 */

export const LOCAL_API_URL =
  process.env.REACT_APP_LOCAL_API_URL || "http://localhost:8000";

export const PROD_API_URL =
  process.env.REACT_APP_PROD_API_URL ||
  "https://web-development-course-backend.vercel.app";

/**
 * Checks if the current app is running in a local environment.
 * @returns {boolean}
 */
export const isLocal = () => {
  if (typeof window !== "undefined" && window.location) {
    const { hostname } = window.location;
    return (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "[::1]" ||
      hostname.endsWith(".local")
    );
  }
  return process.env.NODE_ENV === "development";
};

/**
 * Returns the appropriate API base URL dynamically.
 * @returns {string}
 */
export const getApiUrl = () => {
  return isLocal() ? LOCAL_API_URL : PROD_API_URL;
};

export const API_URL = getApiUrl();

export default getApiUrl;
