
import React, { useState, useEffect, useMemo } from 'react';
import { translationService } from '../services/translationService';
import { useTranslation } from '../contexts/TranslationContext';

export const normalizeText = (val: any): string => {
  if (val === null || val === undefined) return "";
  
  // Cast numbers to strings to force Gemini to format them regionally
  if (typeof val === 'number') return val.toString();
  
  const str = String(val).trim();
  if (!str) return "";
  
  // Handle technical keys like "FLEET_VELOCITY"
  if (str.includes('_') || (str === str.toUpperCase() && str.length > 2 && !str.includes(' '))) {
    return str.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  
  return str;
};

// Added useTranslate hook to support dynamic translations for placeholders and logic, fixing exported member errors
export const useTranslate = (text: string, target?: string) => {
  const { language: contextLanguage } = useTranslation();
  const language = target || contextLanguage;
  const source = useMemo(() => normalizeText(text), [text]);
  
  const [translated, setTranslated] = useState(source);

  useEffect(() => {
    if (!source || !language || language.toLowerCase() === 'english') {
      setTranslated(source);
      return;
    }

    const runTranslation = async () => {
      const cacheKey = `csp_v14_${language}_${source}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        setTranslated(cached);
        return;
      }

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
      }
    };

    runTranslation();
  }, [source, language]);

  return { translated };
};

export const Translate: React.FC<{ children?: React.ReactNode; target?: string }> = ({ children, target }) => {
  const { language: contextLanguage } = useTranslation();
  const language = target || contextLanguage;
  const source = useMemo(() => normalizeText(children), [children]);
  
  const [translated, setTranslated] = useState(source);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!source || !language || language.toLowerCase() === 'english') {
      setTranslated(source);
      return;
    }

    const runTranslation = async () => {
      const cacheKey = `csp_v14_${language}_${source}`;
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

  return (
    <span 
      key={`${language}-${source}`} 
      className={`${loading ? 'opacity-40 animate-pulse' : 'transition-opacity duration-300'} inline whitespace-nowrap`}
    >
      {translated}
    </span>
  );
};

export default Translate;
