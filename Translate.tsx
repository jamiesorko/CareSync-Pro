
import React, { useState, useEffect } from 'react';
import { gemini } from './gemini';

/**
 * useTranslate Hook (Root version)
 * Returns a translated version of the input string based on a target language.
 */
export const useTranslate = (text: string, target?: string) => {
  const [translated, setTranslated] = useState(text);
  const [loading, setLoading] = useState(false);

  // Normalize string for translation (e.g. "DASHBOARD_CORE" -> "Dashboard Core")
  const normalize = (val: string) => val.replace(/_/g, ' ').toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  useEffect(() => {
    if (!text) return;
    if (target === 'English' || !target) {
      setTranslated(text);
      return;
    }
    const run = async () => {
      setLoading(true);
      const input = normalize(text);
      const cacheKey = `t_${target}_${input}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        setTranslated(cached);
      } else {
        try {
          const t = await gemini.translate(input, target);
          if (t) {
            localStorage.setItem(cacheKey, t);
            setTranslated(t);
          }
        } catch (e) {
          console.error("Translation error", e);
          setTranslated(input);
        }
      }
      setLoading(false);
    };
    run();
  }, [text, target]);

  return { translated, loading };
};

/* Fix: Added target prop and updated internal logic to use useTranslate hook correctly. */
export const Translate = ({ children, target }: { children?: React.ReactNode, target: string | any }) => {
  const sourceText = typeof children === 'string' ? children : String(children || '');
  const { translated, loading } = useTranslate(sourceText, target);

  return <span className={loading ? 'opacity-30 blur-sm transition-all' : ''}>{translated}</span>;
};

export default Translate;
