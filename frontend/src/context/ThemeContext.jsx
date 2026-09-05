import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Default mode is DARK as required
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('medikiosk_theme');
    return saved ? saved : 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
      document.body.className = 'bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-white transition-colors duration-200';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
      document.body.className = 'bg-slate-50 text-slate-900 antialiased selection:bg-cyan-600 selection:text-white transition-colors duration-200';
    }
    localStorage.setItem('medikiosk_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
