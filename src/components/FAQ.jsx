// components/FAQ.jsx
'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'How long does it take to get a response?',
      answer: 'We typically respond within 24 hours during business days (Monday-Friday).',
    },
    {
      question: 'Do you offer phone support?',
      answer: 'Yes, phone support is available during business hours at +1 (555) 123-4567.',
    },
    {
      question: 'What are your business hours?',
      answer: 'Our office hours are Monday through Friday, 9:00 AM to 6:00 PM PST.',
    },
    {
      question: 'Can I schedule a meeting?',
      answer: 'Absolutely! Please contact us with your preferred dates and times.',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100"
            >
              <span className="font-semibold text-gray-800">{faq.question}</span>
              <span className="text-gray-500">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            
            {openIndex === index && (
              <div className="px-6 py-4 bg-white">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t text-center">
        <p className="text-gray-600 mb-4">Still have questions?</p>
        <a
          href="mailto:support@example.com"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}