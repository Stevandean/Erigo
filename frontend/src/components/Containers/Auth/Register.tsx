"use client";

import { FC, FormEvent, useState } from "react";
import Link from "next/link";

import { User } from "@/interfaces/user";
import { isAxiosError, useAxios } from "@/hooks/useAxios";
import { useRouter } from "next/navigation";
import { errorToast, successToast } from "@/lib/toastNotify";

const ContainerRegister: FC = () => {
  const [data, setData] = useState<User>({
    name: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    role: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const axios = useAxios();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data.password !== confirmPassword) {
      errorToast("Your password isn't same, please try again!");
    } else {
      const sendData = { ...data };

      try {
        const { data } = await axios.post("auth/register", sendData);

        successToast(data.message);

        setTimeout(() => {
          router.push("/auth/login");
        }, 1500);
      } catch (err) {
        if (isAxiosError(err)) {
          errorToast(err.response?.data?.message || "An error occurred");
        } else {
          errorToast("An unexpected error occurred");
        }
      }
    }
  };

  return (
    <main className="bg-[#F9FAFB] min-h-screen flex items-center justify-center">
      <section className="bg-white max-w-lg mx-auto rounded-2xl p-[50px] w-5/6 xl:w-full">
        <div className="flex items-center justify-center">
          <h1 className="text-black text-4xl font-extrabold">ERIGO</h1>
        </div>
        <div className="mt-[20px] flex items-center justify-center">
          <h2 className="text-black text-xl font-bold">Create your account</h2>
        </div>
        <form className="mt-[20px]" onSubmit={handleSubmit}>
          <div className="flex flex-col items-start mb-[15px]">
            <label htmlFor="name" className="font-medium text-xs mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="border border-black rounded-lg w-full h-[30px]"
              value={data.name}
              onChange={(e) =>
                setData({
                  ...data,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col items-start mb-[15px]">
            <label htmlFor="address" className="font-medium text-xs mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              className="border border-black rounded-lg w-full h-[50px]"
              value={data.address}
              onChange={(e) =>
                setData({
                  ...data,
                  address: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col items-start mb-[15px]">
            <label htmlFor="phone" className="font-medium text-xs mb-2">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="border border-black rounded-lg w-full h-[30px]"
              value={data.phone}
              onChange={(e) =>
                setData({
                  ...data,
                  phone: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col items-start mb-[15px]">
            <label htmlFor="email" className="font-medium text-xs mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="border border-black rounded-lg w-full h-[30px]"
              value={data.email}
              onChange={(e) =>
                setData({
                  ...data,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col items-start mb-[15px]">
            <label htmlFor="password" className="font-medium text-xs mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="border border-black rounded-lg w-full h-[30px]"
              value={data.password}
              onChange={(e) =>
                setData({
                  ...data,
                  password: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col items-start mb-[15px]">
            <label
              htmlFor="confirm_password"
              className="font-medium text-xs mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              className="border border-black rounded-lg w-full h-[30px]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start mb-[20px]">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-250 ease-linear text-white h-[35px] mt-[5px] rounded-lg font-semibold flex items-center justify-center"
            >
              create your account
            </button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="font-medium text-sm text-[#757575]">
              Already have account?{" "}
              <Link
                href="/auth/login"
                className="text-blue-500 hover:text-blue-600 transition-all duration-250 ease-linear"
              >
                login
              </Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ContainerRegister;
