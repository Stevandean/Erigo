"use client";

import { FC, FormEvent, useState } from "react";
import Link from "next/link";

import { Auth } from "@/interfaces/auth";
import { isAxiosError, useAxios } from "@/hooks/useAxios";
import { useRouter } from "next/navigation";
import { errorToast, successToast } from "@/lib/toastNotify";

const ContainerLogin: FC = () => {
  const [data, setData] = useState<Auth>({
    email: "",
    password: "",
  });

  const axios = useAxios();
  const router = useRouter();

  // const handleSUbmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const sendData = { ...data };

  //   try {
  //     const { data } = await axios.post("auth/login", sendData);
  //     successToast(data.message);
  //     localStorage.setItem("access_token", data.authorization.token);

  //     setTimeout(() => {
  //       router.push("/");
  //     }, 1500);
  //   } catch (err) {
  //     if (isAxiosError(err)) {
  //       errorToast(err.response?.data?.message || "An error occurred");
  //     } else {
  //       errorToast("An unexpected error occurred");
  //     }
  //   }
  // };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sendData = { ...data };

    try {
      const { data } = await axios.post("auth/login", sendData);
      successToast(data.message);

      // Menyimpan token ke sessionStorage
      sessionStorage.setItem("access_token", data.authorization.token);

      // Menyimpan waktu kadaluwarsa di localStorage
      const expirationTime = new Date().getTime() + 2 * 7 * 24 * 60 * 60 * 1000; // 2 minggu dalam milidetik
      localStorage.setItem("token_expiration", expirationTime.toString());

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err) {
      if (isAxiosError(err)) {
        errorToast(err.response?.data?.message || "An error occurred");
      } else {
        errorToast("An unexpected error occurred");
      }
    }
  };

  // Fungsi untuk memeriksa dan menghapus token jika sudah kadaluarsa
  const checkTokenExpiration = () => {
    const expirationTime = localStorage.getItem("token_expiration");
    if (expirationTime) {
      const now = new Date().getTime();
      if (now > parseInt(expirationTime)) {
        sessionStorage.removeItem("access_token");
        localStorage.removeItem("token_expiration");
      }
    }
  };

  // Memeriksa token kadaluarsa setiap kali aplikasi dimuat
  checkTokenExpiration();

  return (
    <main className="bg-[#F9FAFB] min-h-screen flex items-center justify-center">
      <section className="bg-white max-w-lg mx-auto rounded-2xl p-[50px] w-5/6 xl:w-full">
        <div className="flex items-center justify-center">
          <h1 className="text-black text-4xl font-extrabold">ERIGO</h1>
        </div>

        <div className="mt-[20px] flex items-center justify-center">
          <h2 className="text-black text-xl font-bold">
            Login to your account
          </h2>
        </div>

        <form className="mt-[20px]" onSubmit={handleSubmit}>
          <div className="flex flex-col items-start mb-[20px]">
            <label htmlFor="email" className="font-medium text-sm mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="border border-black rounded-lg w-full h-[35px] px-3"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col items-start mb-[20px]">
            <div className="flex items-center justify-between mb-2 w-full">
              <label htmlFor="password" className="font-medium text-sm">
                Password
              </label>
              <Link
                href="#"
                className="font-medium text-sm text-blue-500 hover:text-blue-600 transition-all duration-250 ease-linear"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              className="border border-black rounded-lg w-full h-[35px] px-3"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>

          <div className="flex flex-col items-start mb-[20px]">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-250 ease-linear text-white h-[35px] rounded-lg font-semibold flex items-center justify-center"
            >
              Login
            </button>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p className="font-medium text-sm text-[#757575]">
              Don't have account?{" "}
              <Link
                href="/auth/register"
                className="text-blue-500 hover:text-blue-600 transition-all duration-250 ease-linear"
              >
                Create Account
              </Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ContainerLogin;
