"use client";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import bg from "../../../../public/bg.jpg";
const ProfilePage = () => {
  const [user, setUser]: any = useState({ email: "", username: "", _id: "" });
  const router = useRouter();
  const onLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response);
      toast.success("Logged Out Successfully");
      router.push("/");
    } catch (error) {
      console.log("Something went wrong " + error);
      toast.error("Error Logging out");
    }
  };
  useEffect(() => {
    async function getUserDetails() {
      try {
        const response = await axios.get(`/api/users/me`);
        console.log(response);
        setUser(response.data);
      } catch (error) {
        console.log("Error fetching user details", error);
      }
    }
    getUserDetails();
  }, []);
  return (
    <>
      <div
        className="flex flex-col items-center justify-center min-h-screen text-white"
        style={{
          backgroundImage: `url(${bg.src})`,
          minHeight: "fitContent",
          height: "100vh",
        }}
      >
        <div className="backdrop-blur-3xl h-[500px] w-[500px] rounded-3xl">
          <h1 className="text-3xl text-center pt-20 pb-10">Profile</h1>
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="email">Email</label>
            <input
              className="px-4 py-2 my-2 rounded-lg text-black bg-slate-100"
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
              placeholder="email"
            />
            <label htmlFor="username">Username</label>
            <input
              className="px-4 py-2 my-2 rounded-lg text-black bg-slate-100"
              type="email"
              id="email"
              value={user.username}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
              placeholder="username"
            />
            <label htmlFor="username">ID</label>
            <input
              className="px-4 py-2 my-2 rounded-lg text-black bg-slate-100"
              type="email"
              id="email"
              value={user._id}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
              placeholder="username"
            />
            <button
              onClick={onLogout}
              className="flex flex-row justify-end bg-sky-500 p-3 rounded-md "
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfilePage;
