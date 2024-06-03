"use client";

import { FC, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import styles from "./Navbar.module.css";
import { headerNavLinks } from "@/data/headerNavLinks";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pathname = usePathname();
  const { user } = useAuth();

  console.log(user);

  // Navbar fixed position if scrolling
  useEffect(() => {
    window.onscroll = () => {
      const header = document.querySelector("header");
      const fixNav = header?.offsetTop ?? 0;

      if (window.pageYOffset > fixNav) {
        header?.classList.add(styles.navbarFixed);
      } else {
        header?.classList.remove(styles.navbarFixed);
      }
    };
  }, []);

  // Hamburger menu handler8
  const hamburgerHandler = () => {
    const hamburger = document.querySelector("#hamburger");
    const navMenu = document.querySelector("#navMenu");

    setIsOpen(!isOpen);

    if (isOpen) {
      hamburger?.classList.remove(styles.hamburgerActive);
      navMenu?.classList.add("hidden");
    } else {
      hamburger?.classList.add(styles.hamburgerActive);
      navMenu?.classList.remove("hidden");
    }
  };

  // isMenuActive handler
  const isMenuActive = (path: string) => {
    const isHomePage = pathname === "/" && path === "/";

    if (isHomePage) {
      return true;
    }

    return pathname !== "/" && path !== "/" && pathname.includes(path);
  };

  return (
    <header className="bg-transparent shadow-lg absolute top-0 left-0 w-full flex items-center z-10">
      <div className="container">
        <div className="mx-auto">
          <div className="flex items-center justify-between relative">
            <div>
              <Link href="/" legacyBehavior>
                <a
                  className="inline-flex items-center gap-2 font-black text-2xl lg:text-3xl py-3 uppercase"
                  aria-label="logo"
                >
                  {/* <img
                    src="/apple-touch-icon.png"
                    alt="Brand Logo"
                    className="w-8 h-8 object-cover object-center"
                  /> */}
                  Erigo
                </a>
              </Link>
            </div>
            <div className="flex items-center ">
              <button
                id="hamburger"
                name="hamburger"
                type="button"
                className="right-4 block absolute lg:hidden"
                onClick={hamburgerHandler}
              >
                <span
                  className={`${styles.hamburgerLine} origin-top-left transition duration-300 ease-in-out`}
                ></span>
                <span
                  className={`${styles.hamburgerLine} transition duration-300 ease-in-out`}
                ></span>
                <span
                  className={`${styles.hamburgerLine} origin-bottom-left transition duration-300 ease-in-out`}
                ></span>
              </button>
              <nav
                id="navMenu"
                className="hidden absolute py-5 bg-white shadow-lg rounded-lg max-w-[250px] w-full right-4 top-full lg:block lg:static lg:bg-transparent lg:max-w-full lg:shadow-none lg:rounded-none"
              >
                <ul className="block lg:flex items-center">
                  {headerNavLinks?.map((a, i) => (
                    <li className="group" key={i}>
                      <Link href={a.path} legacyBehavior>
                        <a
                          className={cn(
                            isMenuActive(a.path) ? "text-navy" : "text-gray",
                            "font-bold text-xl py-2 mx-8 lg:mx-2 flex group-hover:text-navy transition duration-300 ease-in-out"
                          )}
                        >
                          {a.title}
                        </a>
                      </Link>
                    </li>
                  ))}
                  {/* {!session ? (
                    <>
                      <li className="group">
                        <Link href="/login" legacyBehavior>
                          <a
                            className={cn(
                              isMenuActive("/login")
                                ? "text-teal-500"
                                : "text-black",
                              "font-secondary font-semibold text-base py-2 mx-8 lg:mx-2 flex group-hover:text-teal-500 transition duration-300 ease-in-out"
                            )}
                          >
                            Masuk
                          </a>
                        </Link>
                      </li>
                      <li className="group">
                        <Link href="/register" legacyBehavior>
                          <a
                            className={cn(
                              isMenuActive("/register")
                                ? "text-teal-500"
                                : "text-black",
                              "font-secondary font-semibold text-base py-2 mx-8 lg:mx-2 flex group-hover:text-teal-500 transition duration-300 ease-in-out"
                            )}
                          >
                            Daftar
                          </a>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li></li>
                  )} */}
                  <li className="mx-2 hidden xl:block">|</li>

                  {user ? (
                    <>
                      <li className="mx-2">
                        <Link
                          id="cartBtn"
                          className="flex items-center"
                          href="/shopping-cart"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          <span className="flex absolute -mt-5 ml-4">
                            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                          </span>
                        </Link>
                      </li>
                      <li className="mx-2">
                        <Link href="/profile-settings" id="profileBtn">
                          <img
                            className="overflow-clip w-9 h-9 object-cover rounded-full"
                            src="./assets/img/products_2.png"
                            alt=""
                          />
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="mx-2">
                        <Link href="/auth/login" id="loginBtn">
                          Login
                        </Link>
                      </li>
                      <li className="mx-2">
                        <Link
                          href="/auth/register"
                          id="registerBtn"
                          className="bg-navy px-3 py-1.5 rounded-lg text-white"
                        >
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
