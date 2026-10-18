import axios from "axios";

const API_URL = String(process.env.REACT_APP_USER_API_URL);
export const fetchFileContent = async (fileId, { signal } = {}) => {
  const response = await axios.get(
    `${API_URL}/coursedetails/files/${encodeURIComponent(fileId)}/content`,
    { signal }
  );
  return response.data;
};

export const fetchApiData = async ({ payload }) => {
  // const folderId = payload.FOLDER_ID;
  // const apiKey = payload.API_KEY;
  // const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents&key=${apiKey}&fields=files(id,name,mimeType)`;

  // const response = await axios.get(url);
  // return response.data.files;

  const response = axios
    .post(`${API_URL}/coursedetails`, {
      folderId: payload.FOLDER_ID,
    })
    .then((res) => res.data);
  return response;
};
