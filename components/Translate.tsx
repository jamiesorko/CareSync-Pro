
import React, { useState, useEffect } from 'react';
import { translationService } from '../services/translationService';
import { useTranslation } from '../contexts/TranslationContext';

/**
 * useTranslate Hook
 * For translating dynamic strings like placeholders or tooltips.
 */
// Added targetLanguage parameter to allow explicit language targeting
export const useTranslate = (text: string, targetLanguage?: string) => {
  const { language: contextLanguage } = useTranslation();
  const language = targetLanguage || contextLanguage;
  const [translated, setTranslated] = useState(text);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!text || language.toLowerCase() === 'english') {
      setTranslated(text);
      return;
    }

    const run = async () => {
      const cacheKey = `cs_v5_${language}_${text}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setTranslated(cached);
        return;
      }

      setLoading(true);
      const res = await translationService.translate(text, language);
      localStorage.setItem(cacheKey, res);
      setTranslated(res);
      setLoading(false);
    };
    run();
  }, [text, language]);

  return { translated, loading };
};

/**
 * Translate Component
 * Wraps UI strings for automatic neural translation based on global context.
 */
// Added target prop to Translate component interface
export const Translate: React.FC<{ children?: React.ReactNode, target?: string }> = ({ children, target }) => {
  const sourceText = typeof children === 'string' ? children : String(children || '');
  const { translated, loading } = useTranslate(sourceText, target);

  return (
    <span className={loading ? 'opacity-40 animate-pulse' : 'transition-opacity duration-300'}>
      {translated}
    </span>
  );
};

export default Translate;
