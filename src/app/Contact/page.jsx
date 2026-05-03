"use client";

import React from 'react';
import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/ContactInfo';
import MapSection from '@/components/MapSection';
import FAQ from '@/components/FAQ';


export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 p">
      <div className=" text-black py-20 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Have questions? We&apos;re here to help. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h2>
              <ContactForm />
            </div>
          </div>

          <div>
            <ContactInfo />
          </div>
        </div>

        <div className="mt-16">
          <MapSection />
        </div>

        <div className="mt-16">
          <FAQ />
        </div>
      </div>
    </div>
  );
}