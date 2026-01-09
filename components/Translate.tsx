
import React, { useState, useEffect, useMemo } from 'react';
import { translationService } from '../services/translationService';

interface Props {
  children?: React.ReactNode;
  target: string;
}

export const useTranslate = (text: string, target: string) => {
  const [translated, setTranslated] = useState(text);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!text || target.toLowerCase() === 'english') {
      setTranslated(text);
      return;
    }

    const run = async () => {
      const cacheKey = `cs_v10_${target}_${text}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setTranslated(cached);
        return;
      }

      setLoading(true);
      const res = await translationService.translate(text, target);
      localStorage.setItem(cacheKey, res);
      setTranslated(res);
      setLoading(false);
    };
    run();
  }, [text, target]);

  return { translated, loading };
};

export const Translate: React.FC<Props> = ({ children, target }) => {
  const sourceText = typeof children === 'string' ? children : String(children || '');
  const { translated, loading } = useTranslate(sourceText, target);

  return (
    <span className={loading ? 'opacity-40 animate-pulse' : 'transition-opacity'}>
      {translated}
    </span>
  );
};

export default Translate;
