
import React, { useState, useEffect } from 'react';
import { gemini } from './gemini';

/* Fix: Typed children as React.ReactNode to allow flexible JSX content and fix 'single child' TypeScript errors */
export const Translate = ({ children, target }: { children: React.ReactNode, target: string }) => {
  const sourceText = typeof children === 'string' ? children : String(children || '');
  const [text, setText] = useState(sourceText);
  const [loading, setLoading] = useState(false);

  // Normalize string for translation (e.g. "DASHBOARD_CORE" -> "Dashboard Core")
  const normalize = (val: string) => val.replace(/_/g, ' ').toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  useEffect(() => {
    /* Fix: Safely convert ReactNode children to string for translation logic */
    const currentSource = typeof children === 'string' ? children : String(children || '');
    
    if (!currentSource) return;
    if (target === 'English') {
      setText(currentSource);
      return;
    }
    const run = async () => {
      setLoading(true);
      const input = normalize(currentSource);
      const cacheKey = `t_${target}_${input}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        setText(cached);
      } else {
        try {
          const t = await gemini.translate(input, target);
          if (t) {
            localStorage.setItem(cacheKey, t);
            setText(t);
          }
        } catch (e) {
          console.error("Translation error", e);
          setText(input);
        }
      }
      setLoading(false);
    };
    run();
  }, [children, target]);

  return <span className={loading ? 'opacity-30 blur-sm transition-all' : ''}>{text}</span>;
};
