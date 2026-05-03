// "use client";

// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "./firebase";

// const provider = new GoogleAuthProvider();

// export async function signInWithGoogle() {
//   try {
//     const result = await signInWithPopup(auth, provider);
//     const user = result.user;
//     const token = await user.getIdToken();

//     console.log("User:", user);
//     console.log("Token:", token);

//     return { user, token };
//   } catch (error) {
//     console.error("Google sign-in error:", error);
//   }
// }

"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "react-toastify";

const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  try {
    // 1️⃣ Sign in with Firebase popup
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // 2️⃣ Get Firebase ID token
    const idToken = await user.getIdToken();

    // 3️⃣ Send token to backend
    const res = await fetch(
      "https://premium-invest-server-0aff.onrender.com/api/auth/google",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
        credentials: "include", // for cookies
      }
    );

    const data = await res.json();

    if (data.success) {
      toast.success("Google login successful! 🎉");

      // Optional: save user info locally
      localStorage.setItem("userEmail", data.data.email);
      localStorage.setItem("userName", data.data.fullName);

      // Redirect or update UI
      window.location.href = "/dashboard"; // change to your dashboard route
    } else {
      toast.error(data.message || "Google login failed!");
    }
  } catch (error) {
    console.error("Google sign-in error:", error);
    toast.error("Google login failed. Please try again.");
  }
}
