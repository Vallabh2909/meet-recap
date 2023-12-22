"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

const SettingsPage = () => {
  const [user, setUser]: any = useState({
    email: "",
    username: "",
    password: "",
  });
  const router = useRouter();
  const onChange = async (type: string) => {
    try {
      if (type === "EMAIL") {
        const response = await axios.post("/api/users/change", {
          type: "EMAIL",
          data: user.email,
          id: user._id,
        });
        console.log(response);
      } else if (type === "USERNAME") {
        const response = await axios.post("/api/users/change", {
          type: "USERNAME",
          data: user.username,
          id: user._id,
        });
        console.log(response);
      } else if (type === "PASSWORD") {
        const response = await axios.post("/api/users/change", {
          type: "PASSWORD",
          data: user.password,
          id: user._id,
        });
        console.log(response);
      }
      toast.success("Changed Succesfully");
      // router.push("/profile");
    } catch (error) {
      console.log("Something went wrong " + error);
      toast.error(`Email already exists`);
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
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 items-center bg-gradient-to-r from-transparent to-neutral-700 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Change Credentials
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2 flex flex-row gap-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={user.email}
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                  placeholder="Email"
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  onClick={() => onChange("EMAIL")}
                  className="flex w-1/2 justify-center rounded-md bg-indigo-600 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Change
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Username
              </label>
              <div className="mt-2 flex flex-row gap-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={user.username}
                  onChange={(e) => {
                    setUser({ ...user, username: e.target.value });
                  }}
                  placeholder="Username"
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  onClick={() => onChange("USERNAME")}
                  className="flex w-1/2 justify-center rounded-md bg-indigo-600 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Change
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Password
              </label>
              <div className="mt-2 flex flex-row gap-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                  placeholder="Enter your old Password"
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  onClick={() => onChange("PASSWORD")}
                  className="flex w-1/2 justify-center rounded-md bg-indigo-600 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Change
                </button>
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              href="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign Up!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
