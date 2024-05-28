"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { cn } from "@/lib/utils";

import { FaThLarge, FaFolder, FaBox, FaUser } from "react-icons/fa";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar: FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-navy duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between xl:justify-center between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/admin">
          <h1 className="text-2xl font-bold text-white mt-5">ERIGO</h1>
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-white">MENU</h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <Link
                  href="/admin"
                  className={cn(
                    pathname === "/admin"
                      ? "text-black dark:text-white bg-white dark:bg-blue-900"
                      : "text-white hover:text-gray dark:hover:text-white",
                    "group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-white dark:hover:bg-blue-900"
                  )}
                >
                  <FaThLarge />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/categories"
                  className={cn(
                    pathname === "/admin/categories" ||
                      pathname.includes("/admin/categories")
                      ? "text-black dark:text-white bg-white dark:bg-blue-900"
                      : "text-white hover:text-gray dark:hover:text-white",
                    "group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-white dark:hover:bg-blue-900"
                  )}
                >
                  <FaFolder />
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/product"
                  className={cn(
                    pathname === "/admin/product" ||
                      pathname.includes("/admin/product")
                      ? "text-black dark:text-white bg-white dark:bg-blue-900"
                      : "text-white hover:text-gray dark:hover:text-white",
                    "group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-white dark:hover:bg-blue-900"
                  )}
                >
                  <FaBox />
                  Product
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/user"
                  className={cn(
                    pathname === "/admin/user" ||
                      pathname.includes("/admin/user")
                      ? "text-black dark:text-white bg-white dark:bg-blue-900"
                      : "text-white hover:text-gray dark:hover:text-white",
                    "group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-white dark:hover:bg-blue-900"
                  )}
                >
                  <FaUser />
                  User
                </Link>
              </li>

              <SidebarLinkGroup activeCondition={pathname === "/admin/testing"}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={cn(
                          pathname === "/admin/testing"
                            ? "text-black dark:text-white bg-white dark:bg-blue-900"
                            : "text-white hover:text-gray",
                          "group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-white dark:hover:bg-blue-900"
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="22"
                          height="18"
                          viewBox="0 0 22 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
                            fill=""
                          />
                          <path
                            d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
                            fill=""
                          />
                          <path
                            d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
                            fill=""
                          />
                        </svg>
                        testing
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>

                      {/* Sub menu */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/admin/testing"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out text-white hover:text-gray hover:bg-white dark:hover:bg-meta-4 ${
                                pathname === "/admin/testing" && "text-white"
                              }`}
                            >
                              testing
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* Sub menu end */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
