
import React, { useState, useEffect } from 'react';
import { geminiService } from '../services/geminiService';

interface Props {
  children: string;
  target: string;
}

export const Translate: React.FC<Props> = ({ children, target }) => {
  const [translated, setTranslated] = useState(children);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!children || target === 'English') {
      setTranslated(children);
      return;
    }

    const run = async () => {
      const cacheKey = `cs_trans_${target}_${children}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        setTranslated(cached);
        return;
      }

      setLoading(true);
      try {
        const result = await geminiService.translate(children, target);
        if (result) {
          localStorage.setItem(cacheKey, result);
          setTranslated(result);
        }
      } catch (e) {
        setTranslated(children);
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
