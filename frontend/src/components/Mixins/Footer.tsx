import { FC } from "react";
import { FaHome, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

import {
  InstagramIcon,
  TiktokIcon,
  TwitterIcon,
  YoutubeIcon,
} from "../Common/CustomIcons";

const Footer: FC = () => {
  const year = new Date().getFullYear();

  const primaryLink = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about-us" },
    { title: "Product", url: "/product" },
  ];

  const secondaryLink = [
    { title: "Erigo Tour", url: "/erigo-tour" },
    { title: "Exchanges & Returns", url: "/exchanges-returns" },
    { title: "Payment Information", url: "/payment-information" },
    { title: "How To Track Your Order", url: "/track-order" },
    { title: "How To Use Discount Code", url: "/use-discound" },
    { title: "FAQ", url: "/faq" },
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
      icon: <YoutubeIcon />,
      url: "https://www.youtube.com/c/ErigoOfficial/videos",
    },
  ];

  const contactLink = [
    {
      icon: <FaHome className="text-xl" />,
      value: `Jl. Niaga No.3, Ciptomulyo, Kec. Sukun, <br />
      Kota Malang, Jawa Timur 65148`,
    },
    {
      icon: <FaWhatsapp className="text-xl" />,
      value: "+62 811-9757-222",
    },
  ];

  return (
    <footer className="relative bg-navy text-white pt-5 xl:pt-16 pb-3 xl:pb-6">
      <div className="container mx-auto xl:px-20">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-3/12 lg:px-4">
            <h4 className="text-3xl lg:text-4xl font-extrabold uppercase">
              erigo
            </h4>
            <div className="mt-6 lg:mb-0 mb-6 flex space-x-2">
              {socialLink?.map((f, i) => (
                <Link
                  href={f.url}
                  target="_blank"
                  className="text-white hover:text-navy active:text-gray-600 transition duration-100"
                  rel="noreferrer"
                  key={i}
                >
                  {f.icon}
                </Link>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-9/12 lg:px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-3/12 lg:px-4 ml-auto">
                <span className="block uppercase text-2xl font-extrabold mb-2">
                  COMPANY
                </span>
                <ul className="list-unstyled">
                  {primaryLink?.map((f, i) => (
                    <li key={i}>
                      <Link className="block pb-2 text-sm" href={f.url}>
                        {f.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full lg:w-4/12 lg:px-4 ml-auto">
                <span className="block uppercase text-2xl font-extrabold mb-2">
                  information
                </span>
                <ul className="list-unstyled">
                  {secondaryLink?.map((f, i) => (
                    <li key={i}>
                      <Link className="block pb-2 text-sm" href={f.url}>
                        {f.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full lg:w-5/12 lg:px-4 ml-auto">
                <span className="block uppercase text-2xl font-extrabold mb-2">
                  contact
                </span>
                <ul className="list-unstyled">
                  {contactLink?.map((f, i) => (
                    <li>
                      <div className="pb-2 text-sm flex space-x-3">
                        {f.icon}
                        <span
                          dangerouslySetInnerHTML={{ __html: f.value }}
                        ></span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-3 xl:my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center justify-center xl:justify-start">
          <div className="w-full lg:px-4 mx-auto">
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
