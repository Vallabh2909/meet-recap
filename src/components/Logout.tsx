"use client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
const Logout = () => {
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
  return (
    <button
      onClick={onLogout}
      className="text-gray-800 bg-blue-900 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
    >
      Log out
    </button>
  );
};

export default Logout;
