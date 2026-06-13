import { Facebook, Instagram, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="relative mt-20">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-6 -mb-16 relative z-10">
        <div className="bg-gradient-to-r from-brand-500 to-brand-600 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-warm-lg">
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-2">Stay Fresh with Us 🥗</h3>
            <p className="text-brand-100 text-sm">Get weekly deals, recipes & new arrivals straight to your inbox.</p>
          </div>
          <div className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 md:w-64 px-5 py-3 rounded-l-full bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 border border-white/30 focus:outline-none focus:ring-2 ring-white/50 text-sm"
            />
            <button className="px-6 py-3 rounded-r-full bg-white text-brand-600 font-bold text-sm hover:bg-brand-50 transition-colors flex items-center gap-2">
              Subscribe <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-gradient-to-b from-gray-900 to-black pt-28 pb-8 text-gray-400">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-extrabold text-white mb-4">
              <span className="bg-gradient-to-r from-brand-400 to-brand-500 bg-clip-text text-transparent">EcoBazzar</span>
            </h2>
            <p className="text-sm leading-relaxed mb-6">
              Your neighborhood online grocery store. Fresh organic produce & daily essentials delivered to your doorstep.
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-500 hover:border-brand-500 hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-500 hover:border-brand-500 hover:text-white transition-all">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "Shop", href: "/products" },
                { label: "Sell on EcoBazzar", href: "/seller" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-brand-400 transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold mb-4">Categories</h3>
            <ul className="space-y-3 text-sm">
              {["Vegetables", "Fresh Fruits", "Dairy Products", "Bakery & Breads", "Instant Food"].map((cat) => (
                <li key={cat}>
                  <a href={`/category/${encodeURIComponent(cat)}`} className="hover:text-brand-400 transition-colors">{cat}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="text-sm space-y-3">
              <li className="flex items-center gap-3"><MapPin size={16} className="text-brand-400 shrink-0" /> Chitrakoot, India</li>
              <li className="flex items-center gap-3"><Phone size={16} className="text-brand-400 shrink-0" /> +91 98765 43210</li>
              <li className="flex items-center gap-3"><Mail size={16} className="text-brand-400 shrink-0" /> support@ecobazzar.com</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} EcoBazzar. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-brand-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
