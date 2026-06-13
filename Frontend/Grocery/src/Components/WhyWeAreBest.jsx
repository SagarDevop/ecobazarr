import React from "react";
import { Truck, Leaf, Tag, Heart, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: <Truck size={24} />, title: "30-Min Delivery", desc: "Lightning-fast delivery to your doorstep", color: "from-brand-400 to-brand-500" },
  { icon: <Leaf size={24} />, title: "100% Organic", desc: "Farm-fresh, pesticide-free produce", color: "from-emerald-400 to-emerald-500" },
  { icon: <Tag size={24} />, title: "Best Prices", desc: "Quality groceries at unbeatable rates", color: "from-accent-400 to-accent-500" },
  { icon: <Heart size={24} />, title: "10K+ Happy Customers", desc: "Loved and trusted by thousands", color: "from-rose-400 to-rose-500" },
  { icon: <Shield size={24} />, title: "Quality Guaranteed", desc: "Strict quality checks on every product", color: "from-violet-400 to-violet-500" },
  { icon: <Clock size={24} />, title: "24/7 Support", desc: "We're always here to help you", color: "from-sky-400 to-sky-500" },
];

export default function WhyWeAreBest() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-600 dark:text-brand-400 font-bold tracking-[0.2em] text-xs uppercase">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-3 tracking-tight">
            Why We Are the <span className="bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent">Best</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto">
            We go above and beyond to bring you the freshest groceries with the most convenient shopping experience.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group p-8 rounded-3xl bg-white dark:bg-surface-dark-gray border border-gray-100 dark:border-gray-800 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feat.color} flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{feat.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
