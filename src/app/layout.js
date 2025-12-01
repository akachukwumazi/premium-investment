import "./globals.css";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import { ToastContainer } from "react-toastify"; 

export const metadata = {
  title: "Premium Invest",
  description: "Empowering your financial future",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Nav />
        {children}
        <ToastContainer />
        <Footer />
      </body>
    </html>
  );
}
