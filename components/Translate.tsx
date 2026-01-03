
import React, { useState, useEffect, useRef } from 'react';
import { geminiService } from '../services/geminiService';

interface TranslateProps {
  children: React.ReactNode;
  targetLanguage: string;
  className?: string;
}

const Translate: React.FC<TranslateProps> = ({ children, targetLanguage, className = "" }) => {
  const [translatedText, setTranslatedText] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState(false);
  const isMounted = useRef(true);

  const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(getTextContent).join('');
    if (React.isValidElement(node)) return getTextContent((node.props as any).children);
    return '';
  };

  const rawText = getTextContent(children);
  // Normalize developer keys like "Ops_Dashboard" to "Ops Dashboard" for the AI
  const normalizedText = rawText.replace(/_/g, ' ').trim();

  useEffect(() => {
    isMounted.current = true;
    
    const translateText = async () => {
      if (!targetLanguage || targetLanguage.toLowerCase() === 'english' || !normalizedText) {
        setTranslatedText(rawText);
        setIsTranslating(false);
        return;
      }

      const cacheKey = `trans_v6_${targetLanguage.toLowerCase()}:${normalizedText}`;
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
        if (isMounted.current) setTranslatedText(rawText);
      } finally {
        if (isMounted.current) setIsTranslating(false);
      }
    };

    translateText();

    return () => { isMounted.current = false; };
  }, [normalizedText, targetLanguage, rawText]);

  // Initial render shows raw text to prevent layout shift
  const displayContent = translatedText || rawText;

  return (
    <span className={`${className} transition-all duration-300 ${isTranslating ? 'opacity-40 blur-[1px]' : 'opacity-100 blur-0'}`}>
      {displayContent}
    </span>
  );
};

export default Translate;
