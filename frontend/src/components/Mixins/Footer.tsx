import { FC } from "react";
import Link from "next/link";

import {
  InstagramIcon,
  TiktokIcon,
  TwitterIcon,
  Youtubeicon,
} from "../Common/CustomIcons";

const Footer: FC = () => {
  const year = new Date().getFullYear();

  const primaryLink = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about-us" },
    { title: "Product", url: "/product" },
    { title: "Payment", url: "/payment" },
  ];

  const secondaryLink = [
    { title: "Erigo Tour", url: "/erigo-tour" },
    { title: "Exchanges & Returns", url: "/exchanges&returns" },
    { title: "Payment Information", url: "/payment-information" },
    { title: "How To Track Your Order", url: "/track-order" },
    { title: "How To Use Discount Code", url: "/use-discound" },
    { title: "FAQ", url: "/faq" },
  ];

  const tertiaryLink = [
    { title: "Contact Us", url: "/contact" },
    { title: "FAQ", url: "/faq" },
  ];

  const legalLink = [
    { title: "Terms of Service", url: "/terms-of-service" },
    { title: "Privacy Policy", url: "/privacy-policy" },
  ];

  const socialLink = [
    {
      title: "Instagram",
      icon: <InstagramIcon />,
      url: "http://instagram.com/erigostore",
    },
    {
      title: "Tiktok",
      icon: <TiktokIcon />,
      url: "https://www.tiktok.com/@erigo.store",
    },
    {
      title: "Twitter",
      icon: <TwitterIcon />,
      url: "https://twitter.com/erigostore",
    },
    {
      title: "Youtube",
      icon: <Youtubeicon />,
      url: "https://www.youtube.com/c/ErigoOfficial/videos",
    },
  ];

  return (
    <footer className="relative bg-navy text-white pt-5 xl:pt-16 pb-3 xl:pb-6">
      <div className="container mx-auto xl:px-20">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-3/12 px-4">
            <h4 className="text-4xl font-extrabold uppercase">erigo</h4>
            <div className="mt-6 lg:mb-0 mb-6 flex space-x-2">
              {socialLink?.map((f, i) => (
                <a
                  href={f.url}
                  target="_blank"
                  className="text-white hover:text-navy active:text-gray-600 transition duration-100"
                  rel="noreferrer"
                  key={i}
                >
                  {f.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-9/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-3/12 px-4 ml-auto">
                <span className="block uppercase text-2xl font-extrabold mb-2">
                  COMPANY
                </span>
                <ul className="list-unstyled">
                  {primaryLink?.map((f,i) => (
                    <li key={i}>
                      <a className="block pb-2 text-sm" href={f.url}>
                        {f.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-2xl font-extrabold mb-2">
                  information
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a className="block pb-2 text-sm" href="./maintenance.php">
                      Erigo Tour
                    </a>
                  </li>
                  <li>
                    <a className="block pb-2 text-sm" href="./maintenance.php">
                      Exchanges & Returns
                    </a>
                  </li>
                  <li>
                    <a
                      className="block pb-2 text-sm"
                      href="./payment_information.php"
                    >
                      Payment Information
                    </a>
                  </li>
                  <li>
                    <a className="block pb-2 text-sm" href="./maintenance.php">
                      How To Track YOur Order
                    </a>
                  </li>
                  <li>
                    <a className="block pb-2 text-sm" href="./maintenance.php">
                      How To Use Discount Code
                    </a>
                  </li>
                  <li>
                    <a className="block pb-2 text-sm" href="./maintenance.php">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-5/12 px-4 ml-auto">
                <span className="block uppercase text-2xl font-extrabold mb-2">
                  contact
                </span>
                <ul className="list-unstyled">
                  <li>
                    <div className="pb-2 text-sm flex space-x-3">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 50 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M42.1875 28.1859L25 14.8453L7.8125 28.1859V22.75L25 9.40625L42.1875 22.7469V28.1859ZM37.8906 27.7016V40.5937H29.2969V32H20.7031V40.5937H12.1094V27.7031L25 18.0359L37.8906 27.7016Z"
                          fill="white"
                        />
                      </svg>
                      <span>
                        Jl. Niaga No.3, Ciptomulyo, Kec. Sukun, <br />
                        Kota Malang, Jawa Timur 65148
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="pb-2 text-sm flex items-center space-x-3">
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 50 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M39.5525 35.3027C38.95 37.0082 36.555 38.4192 34.645 38.8318C33.3375 39.1094 31.6325 39.329 25.8875 36.9482C19.435 34.2749 10.475 24.7524 10.475 18.4155C10.475 15.1896 12.335 11.4331 15.5875 11.4331C17.1525 11.4331 17.4975 11.4636 18.0125 12.699C18.615 14.1544 20.085 17.7403 20.26 18.1079C20.9825 19.6159 19.525 20.4986 18.4675 21.8115C18.13 22.2066 17.7475 22.6339 18.175 23.3691C18.6 24.0894 20.07 26.4851 22.23 28.4082C25.02 30.894 27.2825 31.6875 28.0925 32.0251C28.695 32.2752 29.415 32.217 29.855 31.7468C30.4125 31.1442 31.105 30.1442 31.81 29.1589C32.3075 28.4537 32.94 28.3656 33.6025 28.6157C34.05 28.7708 39.7375 31.4121 39.9775 31.8347C40.155 32.1423 40.155 33.5972 39.5525 35.3027ZM25.005 0H24.9925C11.21 0 0 11.2134 0 25C0 30.4667 1.76252 35.5383 4.76002 39.6521L1.64501 48.9417L11.2525 45.8716C15.205 48.4874 19.9225 50 25.005 50C38.7875 50 50 38.7866 50 25C50 11.2134 38.7875 0 25.005 0Z"
                          fill="white"
                        />
                      </svg>
                      <span>+62 811-9757-222</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-3 xl:my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center justify-center xl:justify-start">
          <div className="w-full px-4 mx-auto">
            <div className="text-sm py-1 flex justify-center xl:justify-start">
              Copyright © 2024 ERIGO. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
