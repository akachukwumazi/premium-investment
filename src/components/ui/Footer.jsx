"use client";
import React from "react";
import { motion } from "framer-motion";
import SubTopic from "./SubTopic";
import Logo from "../Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";

const PElement = function ({ children, variant }) {
  return (
    <p
      className={`font-normal text-[14px] md:text-[24px] text-center md:text-start ${variant} leading-[150%] tracking-[-2%]`}
    >
      {children}
    </p>
  );
};

const Footer = () => {
  const pathname = usePathname();
  if (pathname.includes("auth") || pathname.includes("dashboard")) return null;
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full flex flex-col h-max items-center justify-center px-6 py-12 bg-premium-white"
    >
      <div className="flex flex-col md:flex-row w-full gap-6 border-b-2 border-premium-accent-light pb-10">
        <div className="flex flex-col md:flex-[1_1_30%] gap-4 md:items-start items-center w-full">
          <SubTopic styleVariant="flex items-center gap-2">
            <Logo />
            <h2 className="text-premium-black font-bold text-[20px] md:text-[20px] leading-[140%] tracking-[-2%] ">
              PREMIUM INVEST
            </h2>
          </SubTopic>
          <PElement variant={"tracking-[1px] md:w-[70%] text-xl"}>
            Your trusted global partner in socially responsible investments,
            wealth creation, and long-term financial growth
          </PElement>
        </div>

        <div className="flex-[1_1_70%] flex flex-col text-center items-center md:grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Column 1 */}
          <div>
            <h3 className="font-bold text-premium-black mb-3">Quick Links</h3>
            <div className="flex flex-col gap-2 text-premium-black items-center">
              <Link href="/" className="hover:text-premium-blue transition">
                Home
              </Link>
              <Link
                href="/"
                className="hover:text-premium-blue transition"
              >
                Solutions
              </Link>
              <Link
                href="/"
                className="hover:text-premium-blue transition"
              >
                Insights
              </Link>
              <Link
                href="/contact"
                className="hover:text-premium-blue transition"
              >
                Contact
              </Link>
              <Link
                href="/About-us"
                className="hover:text-premium-blue transition"
              >
                About Us
              </Link>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-bold text-premium-black mb-3">Resources</h3>
            <div className="flex flex-col gap-2 text-premium-black items-center">
              <Link href="/faq" className="hover:text-premium-blue transition">
                FAQ
              </Link>
              <Link href="/blog" className="hover:text-premium-blue transition">
                Blog
              </Link>
              <Link
                href="/careers"
                className="hover:text-premium-blue transition"
              >
                Careers
              </Link>
              <Link
                href="/support"
                className="hover:text-premium-blue transition"
              >
                Support
              </Link>
              <Link
                href="/investor-relations"
                className="hover:text-premium-blue transition"
              >
                Investor Relations
              </Link>
            </div>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-bold text-premium-black mb-3">Services</h3>
            <div className="flex flex-col gap-2 text-premium-black">
              <Link
                href="/investment"
                className="hover:text-premium-blue transition"
              >
                Investment Plans
              </Link>
              <Link
                href="/loans"
                className="hover:text-premium-blue transition"
              >
                Loan Services
              </Link>
              <Link
                href="/escrow"
                className="hover:text-premium-blue transition"
              >
                Escrow Services
              </Link>
              <Link
                href="/advisory"
                className="hover:text-premium-blue transition"
              >
                Financial Advisory
              </Link>
              <Link
                href="/crypto"
                className="hover:text-premium-blue transition"
              >
                Crypto Solutions
              </Link>
            </div>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-bold text-premium-black mb-3">Legal</h3>
            <div className="flex flex-col gap-2 text-premium-black">
              <Link
                href="/privacy-policy"
                className="hover:text-premium-blue transition"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-premium-blue transition"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/cookies"
                className="hover:text-premium-blue transition"
              >
                Cookie Policy
              </Link>
              <Link
                href="/disclaimer"
                className="hover:text-premium-blue transition"
              >
                Disclaimer
              </Link>
              <Link
                href="/security"
                className="hover:text-premium-blue transition"
              >
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-between py-6 gap-4 flex-col md:flex-row text-center">
        <div className="flex  gap-2.5 flex-col md:flex-row">
            <Link href="/privacy-policy"
            className="hover:text-premium-blue transition font-bold md:border-r-2 pr-2"
            >Privacy Policy</Link>
            <Link href="/terms"
            className="hover:text-premium-blue transition font-bold md:border-r-2 pr-2"
            >Terms & Conditions</Link>
            <Link href="/cookies"
            className="hover:text-premium-blue transition font-bold "
            >Cookie Policy</Link>
        </div>
        <p className="">© Premium invest 2025</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
