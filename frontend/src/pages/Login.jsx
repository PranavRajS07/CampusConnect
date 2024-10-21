import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target;

    const user = {
      email: email.value,
      password: password.value,
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        user
      );
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/");
        toast.success("Logged in successfully");
      } else {
        toast.error("User does not exist");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again!");
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

      {/* Overlay to darken background */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-6 sm:pt-0"
      >
        {/* Title */}
        <div className="mt-12 md:mt-0">
          <h3 className="text-4xl font-bold text-white">
            CampusConnect: A student forum website
          </h3>
        </div>

        {/* Login Card */}
        <div className="w-[90%] md:w-full bg-white/70 dark:bg-[#1E212A] border px-6 py-4 mt-6 overflow-hidden shadow-md sm:max-w-md rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                className="border border-white bg-transparent text-white/80 hover:text-white focus:text-white mt-2 w-full h-10 px-3 rounded outline-none shadow-sm transition duration-300"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="border border-white bg-transparent text-white/80 hover:text-white focus:text-white mt-2 w-full h-10 px-3 rounded outline-none shadow-sm transition duration-300"
              />
            </div>

            {/* Login Button */}
            <div className="mt-8 flex flex-col items-center justify-center ">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-purple-700 border border-transparent rounded-md active:bg-gray-900"
              >
                Login
              </button>
              <a
                className="text-sm text-white underline hover:text-gray-200 pt-2"
                href="/register"
              >
                Don't have an account? Register
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
