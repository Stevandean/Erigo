import { FC } from "react";
import Link from "next/link";

import { FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";

const ContainerMaintenance: FC = () => {
  return (
    <main className="min-h-screen bg-red-500 flex flex-col items-center justify-center mx-auto">
      <nav>
        <a
          href="#"
          className="text-black text-4xl font-extrabold flex items-center justify-center"
        >
          ERIGO
        </a>
      </nav>

      <div className="mt-[10px] flex items-center justify-center">
        <h2 className="text-black text-xl font-bold">We'll back.</h2>
      </div>

      <div className="mt-[10px] flex items-center justify-center">
        <h2 className="text-black text-sm font-medium">
          We're busy updating this page for you
        </h2>
      </div>

      <div className="mt-[10px] flex items-center justify-center">
        <h2 className="text-black text-sm font-medium">please check soon.</h2>
      </div>

      <div id="countdown" className="countdown">
        <ul className="flex justify-center space-x-3 pt-6">
          <li className="flex flex-col justify-center items-center font-medium border border-black rounded-md p-3 text-sm w-16">
            <span className="flex justify-center items-center" id="days">
              00
            </span>
            Days
          </li>

          <li className="flex flex-col justify-center items-center font-medium border border-black rounded-md p-3 text-sm w-16">
            <span className="flex justify-center items-center" id="hours">
              00
            </span>
            Hours
          </li>

          <li className="flex flex-col justify-center items-center font-medium border border-black rounded-md p-3 text-sm w-16">
            <span className="flex justify-center items-center" id="minutes">
              00
            </span>
            Minutes
          </li>

          <li className="flex flex-col justify-center items-center font-medium border border-black rounded-md p-3 text-sm w-16">
            <span className="flex justify-center items-center" id="seconds">
              00
            </span>
            Seconds
          </li>
        </ul>
      </div>

      <div className="social_links flex justify-center space-x-3 pt-6">
        <Link href="https://instagram.com/erigostore" target="_blank">
          <FaInstagram />
        </Link>
        <Link href="https://www.tiktok.com/@erigo.store" target="_blank">
          <FaTiktok />
        </Link>
        <Link href="https://twitter.com/erigostore" target="_blank">
          <FaTwitter />
        </Link>
        <Link
          href="https://www.youtube.com/c/ErigoOfficial/videos"
          target="_blank"
        >
          <FaYoutube />
        </Link>
      </div>
    </main>
  );
};

export default ContainerMaintenance;
