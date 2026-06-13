import React, { useState } from "react";
import { Mail, MessageCircle, MapPin, Clock, Send, Facebook, Instagram, Twitter } from "lucide-react";
import { Success, Error } from "../Utils/toastUtils.js";

export default function ContactUs() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Success("Your message has been sent successfully!");
      e.target.reset();
    }, 1500);
  };

  return (
    <div style={{ background: 'var(--surface-cream)' }}>
      {/* Hero */}
      <div
        className="relative h-64 md:h-80 bg-cover bg-center flex items-center justify-center text-white text-center"
        style={{ backgroundImage: "url('https://c8.alamy.com/comp/2BXK8YJ/vector-cartoon-stick-figure-drawing-conceptual-illustration-of-local-farmer-selling-food-fruit-and-vegetable-on-market-2BXK8YJ.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Contact Us</h1>
          <p className="text-lg">We're here to help you with anything you need.</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <div className="space-y-6">
            {[
              { icon: <Mail className="text-brand-500" />, title: "Email", text: "support@ecobazzar.com" },
              { icon: <MessageCircle className="text-brand-500" />, title: "WhatsApp", text: "+91 7887263984" },
              { icon: <MapPin className="text-brand-500" />, title: "Address", text: "123 Grocery Lane, Fresh Market, Delhi" },
              { icon: <Clock className="text-brand-500" />, title: "Business Hours", text: "Mon - Sun: 9:00 AM - 9:00 PM" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="mt-1 shrink-0">{item.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{item.text}</p>
                </div>
              </div>
            ))}
            <div className="flex space-x-4 pt-4">
              <Facebook className="text-blue-600 hover:scale-110 transition" />
              <Instagram className="text-pink-500 hover:scale-110 transition" />
              <Twitter className="text-sky-500 hover:scale-110 transition" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white dark:bg-surface-dark-gray p-8 rounded-3xl shadow-glass border border-gray-100 dark:border-gray-800 space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium">Your Name</label>
              <input type="text" name="name" placeholder="John Doe" required className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-400 dark:text-white text-sm" />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input type="email" name="email" placeholder="john@example.com" required className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-400 dark:text-white text-sm" />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Message</label>
              <textarea name="message" rows="4" placeholder="Your message here..." required className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-400 dark:text-white text-sm" />
            </div>
            <button type="submit" disabled={loading} className="flex items-center gap-2 justify-center w-full bg-gradient-to-r from-brand-500 to-brand-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:shadow-warm-lg transition disabled:opacity-50">
              {loading ? <span className="animate-pulse">Sending...</span> : <><Send size={16} /> Send Message</>}
            </button>
          </form>
        </div>

        {/* Map */}
        <div className="mt-16">
          <h3 className="text-xl font-bold mb-4 text-brand-600 dark:text-brand-400">📍 Find Us Here</h3>
          <iframe className="rounded-3xl w-full h-64 border border-gray-200 dark:border-gray-800" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d561.8399831624046!2d80.3460619!3d25.4934011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1718806200000" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>

      {/* WhatsApp Float */}
      <a href="https://wa.me/917887263984" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-brand-500 hover:bg-brand-600 text-white p-4 rounded-full shadow-warm-lg z-50 transition-transform hover:scale-110" aria-label="Chat on WhatsApp">
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
