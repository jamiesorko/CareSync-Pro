
import React, { useState, useEffect } from 'react';
import { gemini } from './gemini';

export const Translate = ({ children, target }: { children: string, target: string }) => {
  const [text, setText] = useState(children);
  const [loading, setLoading] = useState(false);

  // Normalize string for translation (e.g. "DASHBOARD_CORE" -> "Dashboard Core")
  const normalize = (val: string) => val.replace(/_/g, ' ').toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  useEffect(() => {
    if (!children) return;
    if (target === 'English') {
      setText(children);
      return;
    }
    const run = async () => {
      setLoading(true);
      const input = normalize(children);
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
