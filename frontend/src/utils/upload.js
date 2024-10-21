import axios from "axios";
const Url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`
const upload = async (data) => {
  try {
    const res = await axios.post(
      Url,
      data,
      {
        withCredentials: false,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const { url } = res.data;
    console.log(url);
    return url;
  } catch (err) {
    console.log(err);
  }
  console.log(data);
};

export default upload;
