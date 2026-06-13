import React, { useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import { Autoplay, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { ArrowRight, Truck, Shield, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const heroSlides = [
  {
    title: 'Fresh Groceries, Delivered in Minutes',
    subtitle: 'ORGANIC & NATURAL',
    description: 'Discover farm-fresh produce, artisan dairy, and premium pantry staples — all delivered to your doorstep.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop',
    cta: 'Start Shopping',
    badge: '🥬 100+ Products',
  },
  {
    title: 'Organic & Pesticide Free Living',
    subtitle: 'HEALTHY LIVING',
    description: 'Support local farmers with our certified organic collection. Pure taste, zero chemicals.',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=2072&auto=format&fit=crop',
    cta: 'Explore Organic',
    badge: '🌿 Farm to Table',
  },
  {
    title: 'Big Savings Every Day',
    subtitle: 'BEST PRICES',
    description: 'Get up to 40% off on your monthly grocery list. Quality products, unbeatable prices.',
    image: 'https://images.unsplash.com/photo-1543168256-418811576931?q=80&w=2070&auto=format&fit=crop',
    cta: 'View Offers',
    badge: '🔥 40% OFF',
  },
];

const stats = [
  { icon: <Truck size={20} />, label: '30 min delivery', color: 'text-brand-600 bg-brand-50 dark:bg-brand-950/30' },
  { icon: <Shield size={20} />, label: 'Quality assured', color: 'text-accent-600 bg-accent-50 dark:bg-accent-950/30' },
  { icon: <Leaf size={20} />, label: '100% organic', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30' },
];

export default function GroceryHeroSwiper() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const slide = heroSlides[activeIndex];

  return (
    <section className="relative overflow-hidden">
      {/* Swiper handles only the background images */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        onSlideChange={handleSlideChange}
        className="w-full"
      >
        {heroSlides.map((s, index) => (
          <SwiperSlide key={index}>
            <div className="relative min-h-[85vh] flex items-center">
              {/* Background decorations */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-50/50 dark:from-brand-950/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-surface-cream dark:from-surface-dark to-transparent pointer-events-none" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content overlay — rendered OUTSIDE the Swiper so it's a single layer, never duplicated */}
      <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 lg:py-0">

          {/* Left: Text Content — AnimatePresence ensures clean enter/exit */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 pointer-events-auto"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 dark:bg-brand-950/40 text-brand-700 dark:text-brand-400 text-xs font-bold tracking-widest uppercase mb-6">
                {slide.subtitle}
              </span>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-[1.08] mb-6 tracking-tight">
                {slide.title.split(' ').map((word, i) => (
                  <span key={i}>
                    {i === 1 ? (
                      <span className="bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent">{word} </span>
                    ) : (
                      word + ' '
                    )}
                  </span>
                ))}
              </h1>

              <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-lg leading-relaxed">
                {slide.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Button size="lg" className="h-14 px-8 group" onClick={() => navigate('/products')}>
                  {slide.cta}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-8">
                  Learn More
                </Button>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-3">
                {stats.map((stat, i) => (
                  <div key={i} className={cn(
                    "flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-gray-100 dark:border-gray-800",
                    stat.color
                  )}>
                    {stat.icon}
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right: Image — also driven by activeIndex, outside Swiper */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative hidden lg:block pointer-events-auto"
            >
              <div className="relative">
                {/* Main image */}
                <div className="w-full aspect-square rounded-[3rem] overflow-hidden shadow-glass-lg border border-white/20">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 shadow-card px-5 py-3 rounded-2xl border border-gray-100 dark:border-gray-700"
                >
                  <span className="text-sm font-bold">{slide.badge}</span>
                </motion.div>

                {/* Decorative circles */}
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-brand-200/40 dark:bg-brand-800/20 rounded-full blur-xl" />
                <div className="absolute -top-8 right-12 w-16 h-16 bg-accent-200/40 dark:bg-accent-800/20 rounded-full blur-xl" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
