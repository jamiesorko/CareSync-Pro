
import React, { useState, useEffect } from 'react';
import { translationService } from '../services/translationService';
import { useTranslation } from '../contexts/TranslationContext';

/**
 * useTranslate Hook
 * Returns a translated version of the input string based on current global language or an override.
 */
// Fixed: Added targetOverride parameter to handle explicit language overrides
export const useTranslate = (text: string, targetOverride?: string) => {
  const { language: contextLanguage } = useTranslation();
  const language = targetOverride || contextLanguage;
  const [translated, setTranslated] = useState(text);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!text || (language && language.toLowerCase() === 'english')) {
      setTranslated(text);
      return;
    }

    const run = async () => {
      const cacheKey = `cs_v6_${language}_${text}`;
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
 * Wraps hardcoded UI strings for automatic translation.
 */
// Fixed: Added target prop to match usage in feature components
export const Translate: React.FC<{ children?: React.ReactNode; target?: string }> = ({ children, target }) => {
  const sourceText = typeof children === 'string' ? children : String(children || '');
  const { translated, loading } = useTranslate(sourceText, target);

  return (
    <span className={loading ? 'opacity-40 animate-pulse transition-opacity' : 'transition-opacity duration-300'}>
      {translated}
    </span>
  );
};

export default Translate;
