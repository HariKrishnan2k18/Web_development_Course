import axios from "axios";

export const fetchApiData = async ({ payload }) => {
  const folderId = payload.FOLDER_ID;
  const apiKey = payload.API_KEY;
  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents&key=${apiKey}&fields=files(id,name,mimeType)`;
  const response = await axios.get(url);
  return response.data;
};
