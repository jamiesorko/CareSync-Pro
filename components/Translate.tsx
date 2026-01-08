
import React, { useState, useEffect } from 'react';
import { geminiService } from '../services/geminiService';

interface Props {
  /* Fix: Change children type from string to React.ReactNode to allow standard JSX children usage and prevent 'single child' errors */
  children: React.ReactNode;
  target: string;
}

/* Fix: Removed React.FC and typed children as React.ReactNode to satisfy JSX requirement for multiple/single nodes */
export const Translate = ({ children, target }: Props) => {
  const sourceText = typeof children === 'string' ? children : String(children || '');
  const [translated, setTranslated] = useState<string>(sourceText);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    /* Fix: Handle children as a string for translation processing */
    const text = typeof children === 'string' ? children : String(children || '');
    if (!text || target === 'English') {
      setTranslated(text);
      return;
    }

    const run = async () => {
      const cacheKey = `cs_trans_${target}_${text}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        setTranslated(cached);
        return;
      }

      setLoading(true);
      try {
        const result = await geminiService.translate(text, target);
        if (result) {
          localStorage.setItem(cacheKey, result);
          setTranslated(result);
        }
      } catch (e) {
        setTranslated(text);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [children, target]);

  return (
    <span className={loading ? 'opacity-40 animate-pulse' : ''}>
      {translated}
    </span>
  );
};

// Added default export to fix "Module has no default export" errors in various components
export default Translate;
