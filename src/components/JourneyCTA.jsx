"use client";

import Link from "next/link";

export default function JourneyCTA() {
  return (
    <section className="w-full bg-white">
      {/* Video */}
      <div className="max-w-6xl mx-auto px-6 pt-20">
        <div className="relative overflow-hidden rounded-2xl aspect-video">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="Prime Chain Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative mt-[-120px]">
        <div className="bg-slate-50 pt-40 pb-24 clip-cta">
          <div className="max-w-3xl mx-auto text-center px-6">
            <p className="text-sm text-blue-600 mb-3">
              Start Your Journey Today
            </p>

            <h2 className="text-4xl font-bold mb-4">
              Invest with Purpose. Grow
              <br />
              with Confidence
            </h2>

            <p className="text-gray-500 mb-8">
              Join a growing community of forward-thinking investors transforming
              their financial future, one smart decision at a time.
            </p>

            {/* LINK INSTEAD OF BUTTON */}
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Custom Shape */}
      <style jsx>{`
        .clip-cta {
          clip-path: polygon(
            0 0,
            100% 0,
            100% 85%,
            50% 100%,
            0 85%
          );
        }
      `}</style>
    </section>
  );
}
