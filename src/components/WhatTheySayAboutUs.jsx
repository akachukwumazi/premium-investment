"use client";

import Image from "next/image";
import { useState } from "react";

const firstPicture = "/profile-5.jpg";
const secondPicture = "/profile-4.jpg";
const thirdPicture = "/profile-3.jpg";

const testimonials = [
  {
    name: "Adeaze M",
    location: "Lagos, Nigeria",
    message:
      "I always thought investing was complicated and risky until I discovered Prime Chain. They made everything so easy to understand. Within months, I saw real progress in my crypto portfolio. I finally feel in control of my financial future!",
    avatar: firstPicture,
  },
  {
    name: "Mark R",
    location: "London, United Kingdom",
    message:
      "Working with Prime Chain has been a game-changer for our startup. Their escrow services gave us peace of mind during a critical international property transaction. It was smooth, transparent, and professional from start to finish.",
    avatar: thirdPicture,
  },
  {
    name: "Sophia L",
    location: "Dubai, UAE",
    message:
      "I needed quick access to funding for my agribusiness, and Prime Chain’s loan process was fast, fair, and flexible. No hidden fees, no stress — just real support when I needed it.",
    avatar: secondPicture,
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full py-20 bg-white text-center">
      {/* Header */}
      <p className="text-sm text-blue-600 mb-2">What They Say About Us</p>

      <h2 className="text-4xl font-bold mb-4">
        Real Stories. Real Impact.
        <br />
        Real Results.
      </h2>

      <p className="max-w-3xl mx-auto text-gray-500 mb-12">
        At Prime Chain, we’re proud of the trust our clients place in us and the
        results we’ve helped them achieve. From first-time investors to seasoned
        entrepreneurs, our community spans individuals and businesses across the
        globe.
      </p>

      {/* Cards */}
      <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-black text-white rounded-xl p-6 max-w-sm flex flex-col"
          >
            {/* Message */}
            <p className="text-sm leading-relaxed mb-6">
              “{item.message}”
            </p>

            {/* Profile — pinned to bottom */}
            <div className="flex items-center gap-3 border border-white/20 rounded-lg p-3 mt-auto">
              <Image
                src={item.avatar}
                alt={item.name}
                width={40}
                height={40}
                className="rounded-md object-cover"
              />
              <div className="text-left">
                <p className="font-semibold text-sm">{item.name}</p>
                <p className="text-xs text-gray-400">{item.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-4 mt-10">
        <button
          aria-label="Previous"
          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"
        >
          ←
        </button>
        <button
          aria-label="Next"
          className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center"
        >
          →
        </button>
      </div>
    </section>
  );
}
    