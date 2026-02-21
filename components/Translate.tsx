import React, { useState, useEffect, useMemo } from 'react';
import { translationService } from '../services/translationService';
import { useTranslation } from '../contexts/TranslationContext';

export const normalizeText = (val: any): string => {
  if (val === null || val === undefined) return "";
  
  // Handle arrays or React elements passed as children
  if (Array.isArray(val)) {
    return val.map(v => normalizeText(v)).join("");
  }
  
  if (typeof val === 'object' && val.props && val.props.children) {
    return normalizeText(val.props.children);
  }

  const str = String(val).trim();
  return str;
};

export const useTranslate = (text: any, target?: string) => {
  const { language: contextLanguage } = useTranslation();
  const language = target || contextLanguage;
  const source = useMemo(() => normalizeText(text), [text]);
  
  const [translated, setTranslated] = useState(source);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!source || !language || language.toLowerCase() === 'english') {
      setTranslated(source);
      return;
    }

    const runTranslation = async () => {
      // Bumping to v24 to clear any old English-digit cached results
      const cacheKey = `csp_v24_${language}_${source}`;
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