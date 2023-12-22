"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [user, setUser] = useState({ email: "" });
  const router = useRouter();
  const onForgot = async () => {
    try {
      const response = await axios.post("/api/users/forgotpassword", user);
      console.log(response);
      toast.success("A Link is sent to your email!");
      router.push(`/profile`);
    } catch (error) {
      console.log("Something is wrong!", error);
      toast.error("Something is Wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-800 p-5">
      <div className="h-[450px] w-[400px] text-lg bg-grey-400 flex flex-col bg-slate-900 items-center text-white justify-center rounded-lg">
        <h1 className="text-3xl pb-10">Forget Password</h1>
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
        <button
          className="bg-sky-400 px-6 py-2 rounded-md my-2"
          onClick={onForgot}
        >
          Submit
        </button>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
