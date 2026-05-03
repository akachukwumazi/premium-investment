'use client';

import { useState } from 'react';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion'; // <- import framer motion

const formSchema = yup.object().shape({
  name: yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  subject: yup.string().min(5, 'Subject must be at least 5 characters').required('Subject is required'),
  message: yup.string().min(10, 'Message must be at least 10 characters').required('Message is required'),
});

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      await formSchema.validate(formData, { abortEarly: false });
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      const newErrors = {};
      if (err.inner) {
        err.inner.forEach((e) => {
          if (!newErrors[e.path]) newErrors[e.path] = e.message;
        });
      }
      setErrors(newErrors);
      toast.error('Please fix the errors in the form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Motion variants
  const container = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.form
      onSubmit={handleOnSubmit}
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* Name */}
      <motion.div variants={item}>
        <label className="block text-gray-700 mb-2">Name *</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleOnChange}
          type="text"
          placeholder="John Doe"
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        />
        {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
      </motion.div>

      {/* Email */}
      <motion.div variants={item}>
        <label className="block text-gray-700 mb-2">Email *</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleOnChange}
          type="email"
          placeholder="john@example.com"
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        />
        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
      </motion.div>

      {/* Subject */}
      <motion.div variants={item}>
        <label className="block text-gray-700 mb-2">Subject *</label>
        <input
          name="subject"
          value={formData.subject}
          onChange={handleOnChange}
          type="text"
          placeholder="How can we help you?"
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.subject ? 'border-red-500' : 'border-gray-300'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        />
        {errors.subject && <p className="mt-2 text-sm text-red-600">{errors.subject}</p>}
      </motion.div>

      {/* Message */}
      <motion.div variants={item}>
        <label className="block text-gray-700 mb-2">Message *</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleOnChange}
          rows={6}
          placeholder="Tell us about your inquiry..."
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
        />
        {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
      </motion.div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        variants={item}
        className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </motion.button>
    </motion.form>
  );
}