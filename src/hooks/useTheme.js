import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let initialTheme = 'light';
    if (savedTheme) {
      initialTheme = savedTheme;
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
      initialTheme = 'dark';
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    const favicon = document.getElementById('favicon');
    if (favicon) {
      favicon.href = initialTheme === 'light' ? '/lightmodefavicon.ico' : '/darkmodefavicon.ico';
    }
  }, []);

  const toggleTheme = (e) => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    const applyTheme = (t) => {
      setTheme(t);
      localStorage.setItem('theme', t);
      document.documentElement.setAttribute('data-theme', t);
      if (t === 'light') document.documentElement.removeAttribute('data-theme');
      
      const favicon = document.getElementById('favicon');
      if (favicon) {
        favicon.href = t === 'light' ? '/lightmodefavicon.ico' : '/darkmodefavicon.ico';
      }
    };

    if (!document.startViewTransition) {
      applyTheme(newTheme);
      return;
    }

    // Zomato style circular wipe animation
    const x = e?.clientX ?? window.innerWidth / 2;
    const y = e?.clientY ?? window.innerHeight / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      applyTheme(newTheme);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];
      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 500,
          easing: 'ease-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  return { theme, toggleTheme };
};
