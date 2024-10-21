import axios from "axios";
import React from "react";
import upload from "../utils/upload";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [profileImage, setProfileImage] = React.useState(
    "https://t4.ftcdn.net/jpg/00/84/67/19/360_F_84671939_jxymoYZO8Oeacc3JRBDE8bSXBWj0ZfA9.jpg"
  );
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password_confirmation, setPassword_confirmation] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password_confirmation) {
      toast.error("Password and Confirm Password do not match");
      return;
    }

    const user = { name, email, password, profileImage };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/signup`,
        user
      );
      if (res.status === 201) {
        toast.success("User created successfully");
        setTimeout(() => navigate("/login", { replace: true }), 1500);
      } else if (res.status === 400) toast.error("Something went wrong");
      else toast.error("User already exists");
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);
      toast.error("Something went wrong");
    }
  };

  const handleFile1 = async (e) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      data.append("upload_preset", "fiverr");

      try {
        const url = await upload(data);
        setProfileImage(url);
        toast.success("File Uploaded");
      } catch (err) {
        console.error("Error uploading file:", err);
        toast.error("File upload failed");
      }
    }
  };

  return (
    <div className="relative h-screen w-screen">
      <Toaster />
      
      {/* Background Video */}
      <video autoPlay loop muted controls className="absolute inset-0 w-full h-full object-cover">
        <source src="/videos/Amritavideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-6 sm:pt-0">
        {/* Title */}
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-white">CampusConnect: A Student Forum Website</h3>
          </a>
        </div>

        {/* Registration Card */}
        <div className="w-[80%] md:w-full bg-white/70 dark:bg-[#1E212A] border rounded-md px-6 py-4 mt-6 overflow-hidden shadow-md sm:max-w-md">
          <form onSubmit={handleSubmit}>
            <label className="mx-auto flex flex-col items-center justify-center w-32 h-32 rounded-full border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 hover:bg-gray-100 dark:text-white">
              <img className="rounded-full" src={profileImage} alt="" />
              <input onChange={handleFile1} id="dropzone-file" type="file" className="hidden" />
            </label>
            <div className="mt-4">
              <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
              <input onChange={(e) => setName(e.target.value)} type="text" name="name" className="border border-white bg-transparent text-white/80 hover:text-white focus:text-white mt-2 w-full h-10 px-3 rounded outline-none shadow-sm transition duration-300" />
            </div>
            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
              <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" className="border border-white bg-transparent text-white/80 hover:text-white focus:text-white mt-2 w-full h-10 px-3 rounded outline-none shadow-sm transition duration-300" />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
              <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" className="border border-white bg-transparent text-white/80 hover:text-white focus:text-white mt-2 w-full h-10 px-3 rounded outline-none shadow-sm transition duration-300" />
            </div>
            <div className="mt-4">
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-white">Confirm Password</label>
              <input onChange={(e) => setPassword_confirmation(e.target.value)} type="password" name="password_confirmation" className="border border-white bg-transparent text-white/80 hover:text-white focus:text-white mt-2 w-full h-10 px-3 rounded outline-none shadow-sm transition duration-300" />
            </div>
            <div className="flex flex-col items-center justify-center mt-4">
              <button type="submit" className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-purple-700 border border-transparent rounded-md active:bg-gray-900">
                Register
              </button>
              <a className="text-sm text-white underline hover:text-gray-200 pt-2" href="/login">Already have an account? Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
