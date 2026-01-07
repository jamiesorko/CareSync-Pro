
import React, { useState, useEffect, useRef } from 'react';
import { geminiService } from '../services/geminiService';

interface Props {
  children: string;
  targetLanguage: string;
  className?: string;
}

const Translate: React.FC<Props> = ({ children, targetLanguage, className = "" }) => {
  const [translatedText, setTranslatedText] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState(false);
  const isMounted = useRef(true);

  // Normalize slugs like "DASHBOARD_CORE" or "OPS_DASHBOARD"
  const normalizedText = children ? children.replace(/_/g, ' ').toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') : "";

  useEffect(() => {
    isMounted.current = true;
    const translateText = async () => {
      if (!targetLanguage || targetLanguage.toLowerCase() === 'english' || !normalizedText) {
        setTranslatedText(normalizedText || children);
        setIsTranslating(false);
        return;
      }

      const cacheKey = `csp_trans_${targetLanguage.toLowerCase()}:${normalizedText}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        setTranslatedText(cached);
        setIsTranslating(false);
        return;
      }

      setIsTranslating(true);
      try {
        const result = await geminiService.translate(normalizedText, targetLanguage);
        if (isMounted.current && result) {
          localStorage.setItem(cacheKey, result);
          setTranslatedText(result);
        }
      } catch (err) {
        if (isMounted.current) setTranslatedText(normalizedText || children);
      } finally {
        if (isMounted.current) setIsTranslating(false);
      }
    };

    translateText();
    return () => { isMounted.current = false; };
  }, [normalizedText, targetLanguage, children]);

  return (
    <span className={`${className} transition-all duration-300 ${isTranslating ? 'opacity-40 blur-[1px]' : 'opacity-100 blur-0'}`}>
      {translatedText || normalizedText || children}
    </span>
  );
};

export default Translate;
