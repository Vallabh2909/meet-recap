"use client";
import Image from "next/image";
import { use, useState } from "react";
import axios, { AxiosResponse, AxiosError, AxiosProgressEvent } from "axios";
import Dropzone from "@/components/dropzone";
export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [dis, setdis] = useState<boolean>(true);
  const [isUploaded, setIsUploaded] = useState<string>(
    "p-3 rounded-lg bg-gray-900"
  );
  const [summary, setSummary] = useState("");
  const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
    const percentage = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total!
    );
    setProgress(percentage);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploaded("p-3 rounded-lg bg-gray-900 hidden");
    if (!file) return;

    try {
      const data = new FormData();
      data.append("file", file);

      const response: AxiosResponse = await axios.post(
        "/api/users/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: onUploadProgress!,
        }
      );
      if (progress === 100) {
        setProgress(0);
      }
      setSummary(response.data.summary.message.content);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    setdis(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen flex-col bg-gray-800">
      <form onSubmit={onSubmit} className=" flex flex-col items-center gap-3">
        {!file && (
          <div className="flex items-center justify-center w-[400px]">
            <label
              htmlFor="dropzone-file"
              className="flex items-center justify-center  h-64 w-80 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  MP4,WAV,MP3 only (MAX. 100 MB)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                name="file"
                onChange={handleFileChange}
              />
            </label>
          </div>
        )}
        {file && (
          <div className="mt-4 rounded-lg border-2 border-gray-200 flex flex-col">
            <div className="flex flex-row">
              <h2 className=" p-2 text-gray-500 dark:text-gray-400 text-center">
                {file.name}
              </h2>
              <button
                className="m-2"
                onClick={() => {
                  setFile(null);
                  setdis(true);
                  setSummary("");
                  setIsUploaded("p-3 rounded-lg bg-gray-900");
                }}
              >
                <Image
                  className="h-6 w-6 p-1 color rounded-md bg-red-400"
                  src="/dustbin.png"
                  height={50}
                  width={50}
                  alt="delete"
                />
              </button>
            </div>
            {progress > 0 && (
              <div className="h-[50px] w-[200px]">
                <div className="p-2">
                  <div className="bg-gray-900 h-2 rounded-full flex flex-row justify-start items-center">
                    <div
                      className="bg-neutral-100 h-2 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                {/* <div className="p-2">{progress}%</div> */}
              </div>
            )}
          </div>
        )}
        <button className={isUploaded} type="submit" disabled={dis}>
          Upload
        </button>
      </form>
      <p className="w-2/3 text-justify">{summary}</p>
    </div>
  );
}
