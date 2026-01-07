
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
  // but keep normal sentences intact.
  const normalize = (val: string) => {
    if (!val) return "";
    if (val.includes('_')) {
      return val.replace(/_/g, ' ').toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    return val;
  };

  const textToTranslate = normalize(children);

  useEffect(() => {
    isMounted.current = true;
    const translateText = async () => {
      if (!targetLanguage || targetLanguage.toLowerCase() === 'english' || !textToTranslate) {
        setTranslatedText(textToTranslate || children);
        setIsTranslating(false);
        return;
      }

      const cacheKey = `csp_neural_v3_${targetLanguage.toLowerCase()}:${textToTranslate}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        setTranslatedText(cached);
        setIsTranslating(false);
        return;
      }

      setIsTranslating(true);
      try {
        const result = await geminiService.translate(textToTranslate, targetLanguage);
        if (isMounted.current && result) {
          localStorage.setItem(cacheKey, result);
          setTranslatedText(result);
        }
      } catch (err) {
        if (isMounted.current) setTranslatedText(textToTranslate || children);
      } finally {
        if (isMounted.current) setIsTranslating(false);
      }
    };

    translateText();
    return () => { isMounted.current = false; };
  }, [textToTranslate, targetLanguage, children]);

  return (
    <span className={`${className} transition-all duration-300 ${isTranslating ? 'opacity-30 blur-[2px]' : 'opacity-100 blur-0'}`}>
      {translatedText || textToTranslate || children}
    </span>
  );
};

export default Translate;
