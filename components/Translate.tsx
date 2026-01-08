
import React, { useState, useEffect } from 'react';
import { gemini } from '../services/gemini';

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
      // Normalize slugs like "OPS_DASHBOARD" -> "Ops Dashboard"
      const normalized = children.replace(/_/g, ' ').toLowerCase()
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      const cacheKey = `csp_v4_${target}_${normalized}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        setTranslated(cached);
        return;
      }

      setLoading(true);
      try {
        const result = await gemini.translate(normalized, target);
        if (result) {
          localStorage.setItem(cacheKey, result);
          setTranslated(result);
        }
      } catch (e) {
        setTranslated(normalized);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [children, target]);

  return (
    <span className={`${loading ? 'opacity-40 blur-[1px]' : 'opacity-100'} transition-all duration-300`}>
      {translated}
    </span>
  );
};
