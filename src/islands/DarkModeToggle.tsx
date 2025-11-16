import React, { useState, useEffect } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only run on client side
    setMounted(true);

    // Check initial dark mode preference
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedMode ? JSON.parse(savedMode) : prefersDark;

    setIsDark(shouldBeDark);

    // Apply initial theme
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
      document.body.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.colorScheme = 'light';
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);

    // Save to localStorage
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));

    // Apply theme
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.colorScheme = 'light';
    }

    // Dispatch custom event for any listeners
    window.dispatchEvent(
      new CustomEvent('darkModeChange', { detail: { isDark: newDarkMode } })
    );
  };

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg hover:bg-eventflow-black-dark transition-colors duration-300"
        aria-label="Dark mode toggle"
      >
        <svg className="h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg hover:bg-eventflow-black-dark transition-colors duration-300 group"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light Mode' : 'Dark Mode'}
    >
      {isDark ? (
        // Sun icon for light mode
        <svg
          className="h-5 w-5 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm0 10a3 3 0 100-6 3 3 0 000 6zm0-2a1 1 0 100-2 1 1 0 000 2zm5.32-5.32a1 1 0 011.414 0l1.414 1.414a1 1 0 01-1.414 1.414l-1.414-1.414a1 1 0 010-1.414zM7.34 7.34a1 1 0 00-1.414 0L4.51 9.17a1 1 0 101.414 1.414l1.414-1.414a1 1 0 000-1.414zm9.9 2.66a1 1 0 01-1.414 0 1 1 0 000-1.414l1.414-1.415a1 1 0 011.414 1.415l-1.414 1.414zM7.34 12.66a1 1 0 001.414 0l1.414-1.414a1 1 0 10-1.414-1.414L7.34 11.25a1 1 0 000 1.414zm-2.66-2.66a1 1 0 00-1.414 1.414l1.414 1.415a1 1 0 101.414-1.415l-1.414-1.414zM3 10a1 1 0 011-1h2a1 1 0 110 2H4a1 1 0 01-1-1zm14 0a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm-12 5a1 1 0 011-1h2a1 1 0 110 2H5a1 1 0 01-1-1zm12-4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zM5 8a1 1 0 01-1 1H2a1 1 0 110-2h2a1 1 0 011 1z"
            clipRule="evenodd"
          ></path>
        </svg>
      ) : (
        // Moon icon for dark mode
        <svg
          className="h-5 w-5 text-gray-300 group-hover:text-eventflow-primary transition-colors duration-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
      )}
    </button>
  );
}
