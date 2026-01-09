"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  CheckCircle,
  AlertCircle,
  Clock,
  Search,
  Edit2,
} from "lucide-react";
import Link from "next/link";
import { useApi } from "@/hooks/useApi";

export default function VerifyEmailPage() {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { apiRequest } = useApi();
const [userEmail, setUserEmail] = useState("");

useEffect(() => {
  const email = localStorage.getItem("userEmail");
  if (email) setUserEmail(email);
}, []);


  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResendEmail = async () => {
    if (!canResend || isResending) return;

    try {
      setIsResending(true);

      // 🔹 REAL async request (example)
      await apiRequest(
       "https://premium-invest-server-0aff.onrender.com/api/auth/resend-verification",
       "POST",
       { email: userEmail },
      );

      console.log("Resending verification email to:", userEmail);

      setEmailSent(true);
      setCountdown(60);
      setCanResend(false);

      setTimeout(() => {
        setEmailSent(false);
      }, 5000);
    } catch (error) {
      console.error("Failed to resend email:", error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-md mb-8">
        <Link href="/" className="flex items-center justify-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            <span className="text-blue-600">Verify</span>Email
          </h1>
        </Link>
      </header>

      <main className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse-slow">
            <Mail className="w-10 h-10 text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 text-center mb-3">
          Check Your Email
        </h2>

        <p className="text-gray-600 text-center mb-6 leading-relaxed">
          We've sent a verification email to the address you provided. Please
          click the link inside to activate your account.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 flex items-center justify-center gap-3">
          <Mail className="w-5 h-5 text-blue-500" />
          <span className="text-gray-800 font-medium text-lg">{userEmail}</span>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-gray-800">
              Didn't receive the email?
            </h3>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <Search className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span>
                Check your <strong>Spam</strong> or <strong>Junk</strong> folder
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span>Make sure the email address above is correct</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span>Allow a few minutes for the email to arrive</span>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <button
            onClick={handleResendEmail}
            disabled={!canResend || isResending}
            className={`w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
              canResend && !isResending
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:-translate-y-0.5"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isResending ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              <>
                <Mail className="w-5 h-5" />
                Resend Verification Email
              </>
            )}
          </button>

          {!canResend && (
            <div className="text-center mt-3 text-gray-500 text-sm flex items-center justify-center gap-1">
              <Clock className="w-4 h-4" />
              <span>
                You can resend in <strong>{countdown}</strong> seconds
              </span>
            </div>
          )}
        </div>

        {emailSent && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-4 flex items-center gap-3 animate-fade-in">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span>Verification email sent again! Check your inbox.</span>
          </div>
        )}

        <div className="text-center">
          <Link
            href="/update-email"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            Need to change your email address?
          </Link>
        </div>
      </main>

      <footer className="w-full max-w-md mt-8 text-center text-gray-500 text-sm">
        <p className="mb-2">
          Need help?{" "}
          <Link href="/support" className="text-blue-600 hover:underline">
            Contact Support
          </Link>
          {" • "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </p>
        <p>© {new Date().getFullYear()} Your App. All rights reserved.</p>
      </footer>

      <style jsx global>{`
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s infinite ease-in-out;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
