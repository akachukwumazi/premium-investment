"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "../Logo";
import Link from "next/link";
import { Icon } from "@iconify/react";
import SubmitButton from "../Button";
import { comingSoonToast } from "./ComingSoonToast";

const Nav = () => {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState({
    solutions: false,
    insights: false,
  });
  const [openNav, setOpenNav] = useState(false);

  if (pathname.includes("auth") || pathname.includes("dashboard")) return null;

  const nav_data = [
    { name: "Home", href: "/" },
    {
      name: "Solutions",
      href: null,
      hasChildren: [
        { name: "Investment Plans", href: "/" },
        { name: "Savings Plans", href: "/" },
        { name: "Retirement Plans", href: "/" },
      ],
    },
    {
      name: "Insights",
      href: null,
      hasChildren: [
        { name: "Market Trends", href: "/" },
        { name: "Investment Tips", href: "/" },
        { name: "Economic Analysis", href: "/" },
      ],
    },
    { name: "Contact", href: "/Contact" },
    { name: "About us", href: "/About-us" },
  ];

  // const handleDropdownDisplay = (tab) => {
  //   setShowDropdown((prev) => ({
  //     ...prev,
  //     [tab]: !prev[tab],
  //   }));
  // };

  return (
    <>
      <header className="fixed top-4 left-1/2 backdrop-blur-[3px] -translate-x-1/2 z-20 w-[95%] max-w-[1250px] flex items-center justify-between rounded-full bg-white/90 backdrop-blur- px-6 py-4 lg:py-6 py-3 shadow-lg transition-all duration-300">

        <div className="flex items-center gap-3">
          <Logo />
          <p className="font-bold text-xs lg:text-2xl">PREMIUM INVEST</p>
        </div>

        
        <div
          onClick={() => setOpenNav(false)}
          className={`fixed lg:static flex justify-end inset-0 bg-black/40 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none z-50 h-screen lg:h-full w-[120%] lg:w-fit  right-0 -top-4 bottom-0 transition-all duration-300 ${
            openNav
              ? "-translate-x-[10%] lg:translate-x-0"
              : "translate-x-full lg:translate-x-0"
          }`}
        >
          <nav
            onClick={(e) => e.stopPropagation()}
            className={`flex flex-col items-center w-[70vw] h-screen bg-white
             md:w-auto md:h-auto md:bg-transparent
              lg:flex lg:flex-row lg:items-center lg:gap-6
              pt-10 lg:pt-0 px-6 lg:px-0  
              gap-8 lg:gap-10
              transition-all duration-300`}
          >

            <div className="flex justify-between lg:hidden w-full px-2  items-center">
              <div className="flex items-center gap-3">
                <Logo />
                <p className="font-bold text-xs lg:text-2xl">PREMIUM INVEST</p>
              </div>
              <svg
                onClick={() => setOpenNav(false)}
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="cursor-pointer"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>


            {nav_data.map(({ name, href, hasChildren }) => (
              <React.Fragment key={name}>
                {hasChildren ? (
                  <div className="group relative items-center flex flex-col lg:items-center">
                    <button className="flex items-center gap-2 text-lg font-semibold hover:text-blue-600 transition-colors duration-200">
                      {name}
                      <Icon icon="mdi:chevron-down" width={24} height={24} />
                    </button>
                    <div className="flex flex-col lg:w-[200px] px-2 right-7.5 lg:-right-6 lg:absolute bg-transparent hidden lg:flex static lg:bg-white  lg:top-[110%] lg:scale-0  lg:group-hover:scale-100 group-hover:flex transition-all justify-center origin-top lg:shadow-lg lg:rounded-md overflow-hidden z-50 w-full gap-2 lg:gap-0 lg:border-gray-200">
                      {hasChildren.map(({ name, href }) => (
                        <Link
                          href={href}
                          key={name}
                          className="hover:bg-gray-100  border-b lg:hover:bg-accent lg:p-4 lg:shadow-md font-semibold"
                          onClick={comingSoonToast}
                        >
                          {name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={href}
                    className={`flex items-center gap-2 text-lg font-semibold hover:text-blue-600 ${
                      pathname === href ? "text-blue-600" : "text-black"
                    }`}
                  >
                    {name}
                  </Link>
                )}
              </React.Fragment>
            ))}

            {/* Mobile Get Started Button */}
            <Link
              href="/Auth/Register"
              className="bg-[#CEA744] text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-all duration-300 lg:hidden block mt-6"
            >
              Get Started
            </Link>
          </nav>
        </div>

        {/* Right side (desktop only) */}
        <div className="hidden lg:flex gap-10 items-center">
          <Link href={"/auth/login"} className="font-semibold text-lg">Login</Link>
          <SubmitButton name="Get Started" className="rounded-full" />
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lg:hidden z-30 cursor-pointer"
          onClick={() => setOpenNav(true)}
        >
          <line x1="3" y1="5" x2="21" y2="5" />
          <line x1="7" y1="9" x2="21" y2="9" />
          <line x1="3" y1="13" x2="21" y2="13" />
          <line x1="7" y1="17" x2="21" y2="17" />
        </svg>
      </header>
    </>
  );
};

export default Nav;
