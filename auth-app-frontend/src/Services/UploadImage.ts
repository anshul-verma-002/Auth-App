import axios from "axios";
import useAuth from "../Auth/Store";

export const uploadProfileImage = async (file: File) => {
  const token = useAuth.getState().accessToken;

  const formData = new FormData();

  formData.append("image", file);

  const response = await axios.post(
    "https://auth-app-ecfg.onrender.com/api/v1/users/upload-image",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};
