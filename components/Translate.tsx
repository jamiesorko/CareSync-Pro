import React, { useState, useEffect, useMemo } from 'react';
import { translationService } from '../services/translationService';
import { useTranslation } from '../contexts/TranslationContext';

export const normalizeText = (val: any): string => {
  if (val === null || val === undefined) return "";
  
  // Cast everything to string for the AI to process
  const str = String(val).trim();
  if (!str) return "";
  
  // Convert snake_case or technical keys to readable text before sending
  if (str.includes('_') || (str === str.toUpperCase() && str.length > 2 && !str.includes(' '))) {
    // If it looks like it contains a number, it's likely data, not a key.
    if (/[0-9]/.test(str)) return str;
    
    return str.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  
  return str;
};

export const useTranslate = (text: any, target?: string) => {
  const { language: contextLanguage } = useTranslation();
  const language = target || contextLanguage;
  const source = useMemo(() => normalizeText(text), [text]);
  
  const [translated, setTranslated] = useState(source);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Return original if English or empty
    if (!source || !language || language.toLowerCase() === 'english') {
      setTranslated(source);
      return;
    }

    const runTranslation = async () => {
      const cacheKey = `csp_v22_${language}_${source}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        setTranslated(cached);
        return;
      }

      setLoading(true);
      try {
        const res = await translationService.translate(source, language);
        if (res && res !== source) {
          localStorage.setItem(cacheKey, res);
          setTranslated(res);
        } else {
          setTranslated(source);
        }
      } catch (e) {
        setTranslated(source);
      } finally {
        setLoading(false);
      }
    };

    runTranslation();
  }, [source, language]);

  return { translated, loading };
};

export const Translate: React.FC<{ children?: React.ReactNode; target?: string }> = ({ children, target }) => {
  const { language: contextLanguage } = useTranslation();
  const language = target || contextLanguage;
  const { translated, loading } = useTranslate(children, target);

  // The 'key' ensures a fresh mount when the translation state or language changes.
  return (
    <span 
      key={`${language}-${translated}`} 
      className={`${loading ? 'opacity-40 animate-pulse' : 'transition-opacity duration-300'} inline-block min-w-[1ch]`}
    >
      {translated}
    </span>
  );
};

export default Translate;