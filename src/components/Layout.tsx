import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Moon, Sun, TrendingUp, Github } from 'lucide-react';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800 flex flex-col">
      <ScrollToTop />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <TrendingUp className="w-6 h-6" />
            <span className="font-bold text-lg tracking-tight">YieldLab</span>
          </Link>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <Link 
              to="/calculator" 
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors hidden sm:block"
            >
              Calculator
            </Link>
            <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/jishantukripal/yieldlab"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
                aria-label="Star on GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:h-16 sm:py-0 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-400 text-center sm:text-left">
          <p>YieldLab © {new Date().getFullYear()} - All rights reserved.</p>
          <div className="flex items-center justify-center gap-2">
            <span>Built by</span>
            <a 
              href="https://jishantukripal.com/projects" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-zinc-900 dark:text-zinc-100 hover:underline"
            >
              JK Builds
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
