"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Logo from "../Logo";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogOutModal from "@/components/LogOutModal";

const NavigationLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    imgSrc: <Icon icon="mdi:view-dashboard-outline" width={24} height={24} />,
  },
  {
    name: "Investments",
    imgSrc: <Icon icon="mdi:briefcase-outline" width={24} height={24} />,
    hasChildren: [
      {
        name: "Crypto",
        href: "/dashboard/investments/crypto",
        imgSrc: <Icon icon="mdi:currency-btc" width={24} height={24} />,
      },
      {
        name: "Loans",
        href: "/dashboard/investments/loan",
        imgSrc: (
          <Icon icon="carbon:global-loan-and-trial" width={24} height={24} />
        ),
      },
      {
        name: "Real Estate",
        href: "/dashboard/investments/real-estate",
        imgSrc: (
          <Icon icon="ic:twotone-real-estate-agent" width={24} height={24} />
        ),
      },
      {
        name: "Stocks & Bonds",
        href: "/dashboard/investments/stocks",
        imgSrc: <Icon icon="mdi:chart-line" width={24} height={24} />,
      },
    ],
  },
  {
    name: "Fund account",
    href: "/dashboard/fund-account",
    imgSrc: <Icon icon="mdi:bank-transfer-in" width={30} height={30} />,
  },
  {
    name: "Withdraw",
    href: "/dashboard/withdraw",
    imgSrc: <Icon icon="mdi:cash-minus" width={30} height={30} />,
  },
  {
    name: "Activities",
    href: "/dashboard/activities",
    imgSrc: (
      <Icon icon="mdi:chart-timeline-variant-shimmer" width={30} height={30} />
    ),
  },
];

const Preferences = [
  {
    name: "Settings",
    href: "/dashboard/settings/profile",
    imgSrc: (
      <Icon icon="material-symbols:settings-outline" width="24" height="24" />
    ),
  },
  {
    name: "Log out",
    imgSrc: <Icon icon="mdi:log-out" width={24} height={24} />,
  },
];

const Sidebar = ({ isCollapsed, setCollapsed, isNavOpen, setOpenNav }) => {
  const pathname = usePathname();
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isOpen, setIsOpen] = useState(pathname.includes("investments"));

  useEffect(() => {
    if (pathname.includes("investments")) {
      setIsOpen(true);
      setCollapsed(false);
    }
  }, [pathname, setCollapsed]);

  useEffect(() => {
    if (isCollapsed) setIsOpen(false);
  }, [isCollapsed]);

  const handleInvestmentClick = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      if (newState) setCollapsed(false);
      return newState;
    });
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -250, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`flex hidden md:flex flex-col h-screen border-r border-gray-300 bg-white shadow-sm ${
          isCollapsed ? "w-24" : ""
        }`}
      >
        <div
          className={`w-64 h-[7em] flex items-center gap-4 border-b border-gray-300 pl-4 ${
            isCollapsed ? "w-24" : ""
          }`}
        >
          <Logo />
          <h1
            className={`text-2xl font-bold w-max ${
              isCollapsed ? "hidden" : ""
            }`}
          >
            PREMIUM
          </h1>
        </div>

        <nav
          className={`flex flex-col gap-4 px-4 h-110  scrollbar-hide overflow-y-auto pt-5 ${
            isCollapsed ? "w-24" : "w-64"
          }`}
        >
          {NavigationLinks.map(({ name, href, hasChildren, imgSrc }, index) => {
            const isInvestmentActive =
              hasChildren?.some((child) => child.href === pathname) &&
              isCollapsed &&
              !isOpen;

            return (
              <React.Fragment key={index}>
                {hasChildren ? (
                  <div>
                    <button
                      onClick={handleInvestmentClick}
                      className={`font-bold text-gray-600 text-2xl flex items-center gap-2 py-4 px-4 rounded hover:bg-premium-accent/60 hover:text-white active:scale-95 transition-all duration-300 w-full ${
                        isInvestmentActive ? "bg-premium-accent text-white" : ""
                      }`}
                    >
                      {imgSrc}
                      {!isCollapsed && (
                        <>
                          {name}
                          <Icon
                            icon={
                              isOpen ? "mdi:chevron-up" : "mdi:chevron-down"
                            }
                            className="ml-auto"
                          />
                        </>
                      )}
                    </button>

                    <div
                      className={`ml-4 gap-1 flex flex-col mt-2 transition-all duration-300 ${
                        isOpen ? "block" : "hidden"
                      }`}
                    >
                      {hasChildren.map(({ href, name, imgSrc }, childIndex) => (
                        <Link
                          key={childIndex}
                          href={href}
                          className={`py-2 px-4 font-bold text-gray-600 rounded hover:bg-premium-accent/60 hover:text-white active:scale-95 transition-all duration-300 flex items-center gap-1 text-xl ${
                            href === pathname
                              ? "bg-premium-accent text-white"
                              : ""
                          }`}
                        >
                          {imgSrc}
                          {name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div
                    className={`py-4 px-4 font-bold text-gray-600 rounded hover:bg-premium-accent/60 hover:text-white active:scale-95 transition-all duration-300 flex items-center gap-2 text-2xl ${
                      href === pathname ? "bg-premium-accent text-white" : ""
                    }`}
                  >
                    <Link href={href} className="flex items-center gap-2">
                      {imgSrc}
                      {isCollapsed ? "" : name}
                    </Link>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </nav>
        <div className="flex flex-col gap-4 mt-8 px-4">
          <p className="text-gray-600 text-xl font-semibold">
            {isCollapsed ? "" : "Preferences"}
          </p>
          <div className="flex w-full flex-col gap-2 mt-5">
            {Preferences.map(({ name, href, imgSrc }, index) =>
              href ? (
                <Link
                  key={index}
                  href={href}
                  className={`py-3 px-4 font-bold text-gray-600 rounded hover:bg-premium-accent/60 hover:text-white 
                  active:scale-95 transition-all duration-300 flex items-center gap-2 text-xl ${
                    pathname.includes("settings")
                      ? "bg-premium-accent text-white"
                      : ""
                  }`}
                >
                  {imgSrc}
                  {isCollapsed ? "" : name}
                </Link>
              ) : (
                <button
                  key={index}
                  onClick={() => setIsLoggedOut(!isLoggedOut)}
                  className="py-3 px-4 w-full text-left font-bold text-gray-600 rounded 
                  hover:bg-red-500/60 hover:text-white active:scale-95 transition-all duration-300 
                  flex items-center gap-2 text-xl"
                >
                  {imgSrc}
                  {isCollapsed ? "" : name}
                </button>
              )
            )}
          </div>
        </div>
        <LogOutModal
          isLoggedOut={isLoggedOut}
          onCancel={(e) => setIsLoggedOut(false)}
        />
      </motion.aside>

      {/* Mobile Navigation Overlay */}
      {isNavOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => {
            setCollapsed(true), setOpenNav(!isNavOpen);
          }}
        />
      )}

      {/* Mobile Sidebar - SLIDES IN FROM RIGHT */}
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: isNavOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed right-0 top-0 h-screen w-80 bg-white shadow-2xl z-50 flex flex-col  `}
      >
        <div className="w-full h-[7em] flex items-center justify-between border-b border-gray-300 px-4">
          <div className="flex items-center gap-4">
            <Logo />
            <h1 className="text-2xl font-bold">PREMIUM</h1>
          </div>
          <button
            onClick={() => {
              setCollapsed(true), setOpenNav(!isNavOpen);
            }}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Icon icon="mdi:close" width={28} height={28} />
          </button>
        </div>

        <nav className="flex flex-col gap-4 px-4 flex-1 scrollbar-hide overflow-y-auto pt-5">
          {NavigationLinks.map(({ name, href, hasChildren, imgSrc }, index) => {
            const isInvestmentActive = hasChildren?.some(
              (child) => child.href === pathname
            );

            return (
              <React.Fragment key={index}>
                {hasChildren ? (
                  <div>
                    <button
                      onClick={handleInvestmentClick}
                      className={`font-bold text-gray-600 text-xl flex items-center gap-2 py-3 px-4 rounded hover:bg-premium-accent/60 hover:text-white active:scale-95 transition-all duration-300 w-full ${
                        isInvestmentActive ? "bg-premium-accent text-white" : ""
                      }`}
                    >
                      {imgSrc}
                      {name}
                      <Icon
                        icon={isOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
                        className="ml-auto"
                      />
                    </button>

                    <motion.div
                      initial={false}
                      animate={{ height: isOpen ? "auto" : 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-4 gap-1 flex flex-col mt-2">
                        {hasChildren.map(
                          ({ href, name, imgSrc }, childIndex) => (
                            <Link
                              key={childIndex}
                              href={href}
                              className={`py-2 px-4 font-bold text-gray-600 rounded hover:bg-premium-accent/60 hover:text-white active:scale-95 transition-all duration-300 flex items-center gap-2 text-lg ${
                                href === pathname
                                  ? "bg-premium-accent text-white"
                                  : ""
                              }`}
                              onClick={() => {
                                setCollapsed(true), setOpenNav(!isNavOpen);
                              }}
                            >
                              {imgSrc}
                              {name}
                            </Link>
                          )
                        )}
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <Link
                    href={href}
                    className={`py-3 px-4 font-bold text-gray-600 rounded hover:bg-premium-accent/60 hover:text-white active:scale-95 transition-all duration-300 flex items-center gap-2 text-xl ${
                      href === pathname ? "bg-premium-accent text-white" : ""
                    }`}
                    onClick={() => {
                      setCollapsed(true), setOpenNav(!isNavOpen);
                    }}
                  >
                    {imgSrc}
                    {name}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        <div className="flex flex-col gap-4 px-4 pb-6 border-t border-gray-300 pt-4">
          <p className="text-gray-600 text-lg font-semibold">Preferences</p>
          <div className="flex w-full flex-col gap-2">
            {Preferences.map(({ name, href, imgSrc }, index) =>
              href ? (
                <Link
                  key={index}
                  href={href}
                  className={`py-3 px-4 font-bold text-gray-600 rounded hover:bg-premium-accent/60 hover:text-white 
                  active:scale-95 transition-all duration-300 flex items-center gap-2 text-lg ${
                    pathname.includes("settings")
                      ? "bg-premium-accent text-white"
                      : ""
                  }`}
                  onClick={() => {
                    setCollapsed(true), setOpenNav(!isNavOpen);
                  }}
                >
                  {imgSrc}
                  {name}
                </Link>
              ) : (
                <button
                  key={index}
                  onClick={() => setIsLoggedOut(!isLoggedOut)}
                  className="py-3 px-4 w-full text-left font-bold text-gray-600 rounded 
                  hover:bg-red-500/60 hover:text-white active:scale-95 transition-all duration-300 
                  flex items-center gap-2 text-lg"
                  
                >
                  {imgSrc}
                  {name}
                </button>
              )
            )}
          </div>
        </div>

        <LogOutModal
          isLoggedOut={isLoggedOut}
          onCancel={(e) => setIsLoggedOut(false)}
        />
      </motion.aside>
    </>
  );
};

export default Sidebar;
