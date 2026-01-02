import React, { useState, useEffect, useRef } from 'react';
import { geminiService } from '../services/geminiService';

interface TranslateProps {
  children: React.ReactNode;
  targetLanguage: string;
  className?: string;
}

const Translate: React.FC<TranslateProps> = ({ children, targetLanguage, className }) => {
  // Helper to extract clean text from React children
  const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(getTextContent).join('');
    if (React.isValidElement(node)) return getTextContent((node.props as any).children);
    return '';
  };

  const rawText = getTextContent(children);
  // Replaces underscores with spaces (e.g. Care_Hub -> Care Hub) for the AI
  const normalizedText = rawText.replace(/_/g, ' ').trim();
  
  const [translatedText, setTranslatedText] = useState<string>(rawText);
  const [isTranslating, setIsTranslating] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    
    // Safety check: English to English, empty language, or empty text
    const isEnglish = !targetLanguage || targetLanguage.toLowerCase() === 'english';
    if (isEnglish || !normalizedText) {
      setTranslatedText(rawText);
      setIsTranslating(false);
      return;
    }

    const cacheKey = `caresync_v4_trans_${targetLanguage.toLowerCase()}:${normalizedText}`;
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
        console.error("[TRANSLATION_ERROR]:", err);
        // On error, revert to the normalized English text
        if (isMounted.current) setTranslatedText(normalizedText);
      } finally {
        if (isMounted.current) setIsTranslating(false);
      }
    };

    performTranslation();

    return () => { isMounted.current = false; };
  }, [normalizedText, targetLanguage, rawText]);

  return (
    <span className={`${className} transition-all duration-700 ${isTranslating ? 'opacity-30 blur-[2px]' : 'opacity-100 blur-0'}`}>
      {translatedText}
    </span>
  );
};

export default Translate;