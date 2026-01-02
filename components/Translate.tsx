
import React, { useState, useEffect, useRef } from 'react';
import { geminiService } from '../services/geminiService';

interface TranslateProps {
  children: React.ReactNode;
  targetLanguage: string;
  className?: string;
}

const Translate: React.FC<TranslateProps> = ({ children, targetLanguage, className = "" }) => {
  const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(getTextContent).join('');
    if (React.isValidElement(node)) return getTextContent((node.props as any).children);
    return '';
  };

  const rawText = getTextContent(children);
  const normalizedText = rawText.replace(/_/g, ' ').trim();
  
  const [translatedText, setTranslatedText] = useState<string>(rawText);
  const [isTranslating, setIsTranslating] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    
    if (!targetLanguage || targetLanguage.toLowerCase() === 'english' || !normalizedText) {
      setTranslatedText(rawText);
      setIsTranslating(false);
      return;
    }

    const cacheKey = `trans_v5_${targetLanguage.toLowerCase()}:${normalizedText}`;
    const cached = localStorage.getItem(cacheKey);
    
    if (cached) {
      setTranslatedText(cached);
      setIsTranslating(false);
      return;
    }

    const performTranslation = async () => {
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

    performTranslation();

    return () => { isMounted.current = false; };
  }, [normalizedText, targetLanguage, rawText]);

  return (
    <span className={`${className} transition-all duration-500 ${isTranslating ? 'opacity-30 blur-[2px]' : 'opacity-100 blur-0'}`}>
      {translatedText}
    </span>
  );
};

export default Translate;
