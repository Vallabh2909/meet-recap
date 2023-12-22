"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
const ResetPasswordPage = () => {
  const [user, setUser] = useState({ password: "", confirmPassword: "" });
  const [Disabled, setDisabled] = useState(true);
  const [token, setToken] = useState("");
  const [isChanged, setisChanged] = useState(false);
  const router = useRouter();
  const onForgot = async () => {
    try {
      const response = await axios.post("/api/users/forgotpassword/reset", {
        user: user,
        token: token,
      });
      console.log(response);
      toast.success("Password Changed Sucessfully!");
      router.push(`/login`);
    } catch (error) {
      console.log("Something is wrong!", error);
      toast.error("Something is Wrong");
    }
  };
  useEffect(() => {
    if (user.password === user.confirmPassword) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user.password, user.confirmPassword]);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-800 p-5">
      {!isChanged && (
        <div className="h-[450px] w-[400px] text-lg bg-grey-400 flex flex-col bg-slate-900 items-center text-white justify-center rounded-lg">
          <h1 className="text-3xl pb-10">Forget Password</h1>
          <label htmlFor="password">New Password</label>
          <input
            className="px-4 py-2 my-2 rounded-lg text-black bg-slate-100"
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            placeholder="password"
          />
          <label htmlFor="password">Confirm New Password</label>
          <input
            className="px-4 py-2 my-2 rounded-lg text-black bg-slate-100"
            type="password"
            id="confirmpassword"
            value={user.confirmPassword}
            onChange={(e) => {
              setUser({ ...user, confirmPassword: e.target.value });
            }}
            placeholder="Confirm Password"
          />
          <button
            className="bg-sky-400 px-6 py-2 rounded-md my-2"
            onClick={onForgot}
            disabled={Disabled}
          >
            Submit
          </button>
          <Link href="/login">Login</Link>
        </div>
      )}
      {isChanged && <h1>Password Changed Successfully!</h1>}
    </div>
  );
};

export default ResetPasswordPage;
