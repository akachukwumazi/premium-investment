"use client";
import Sidebar from "@/components/ui/Sidebar";
import Topbar from "@/components/ui/Topbar";
import { useState } from "react";

export default function DashboardShell({ children }) {
     const [collapsed, setCollapsed] = useState(false);
     const [navOpen, setOpenNav] = useState(false);
  return (
    <div
      className="flex h-screen overflow-hidden bg-white"
    >
      <aside className="bg-gray-100">
        <Sidebar isCollapsed={collapsed} setOpenNav={setOpenNav}  isNavOpen={navOpen}   setCollapsed={setCollapsed}/>
      </aside>

      <div className="flex-1 h-screen flex flex-col overflow-hidden">
        <Topbar isCollapsed={collapsed} onNavClick={() => {setOpenNav(!navOpen)}} onToggle={() => { setCollapsed(!collapsed)} }/>
        <main className="py-4 md:px-6 px-2 h-[calc(100vh-7em)]  overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
