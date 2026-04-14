import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Zap, Shield } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex-1 flex flex-col"
    >
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 sm:py-32 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-8 border border-zinc-200 dark:border-zinc-800">
          <span className="w-2 h-2 rounded-full bg-zinc-900 dark:bg-zinc-100 animate-pulse" />
          YieldLab v2.0 is live
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 text-zinc-900 dark:text-zinc-50">
          Visualize your wealth trajectory with precision.
        </h1>
        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl">
          A professional, minimalist interest calculator designed to instantly model compound vs. simple growth over time. No clutter, just data.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link 
            to="/calculator" 
            className="inline-flex items-center justify-center gap-2 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 px-8 py-4 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            Launch Calculator
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                <Zap className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
              </div>
              <h3 className="text-lg font-semibold">Real-time Computation</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                Adjust parameters and instantly see the impact on your trajectory. Powered by optimized React state management.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
              </div>
              <h3 className="text-lg font-semibold">Interactive Visualization</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                Compare simple and compound interest side-by-side with our responsive, high-contrast charting engine.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                <Shield className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
              </div>
              <h3 className="text-lg font-semibold">Privacy First</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                100% browser-side execution. Your financial data never leaves your device or touches a server.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
