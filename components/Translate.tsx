
import React, { useState, useEffect, useRef } from 'react';
import { geminiService } from '../services/geminiService';

interface TranslateProps {
  children: React.ReactNode;
  targetLanguage: string;
  className?: string;
}

const Translate: React.FC<TranslateProps> = ({ children, targetLanguage, className }) => {
  // Safe extraction of text from children
  const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(getTextContent).join('');
    // Fix: cast node.props to any as React.isValidElement only guarantees it's a ReactElement but props may be unknown in some TS configurations.
    if (React.isValidElement(node)) return getTextContent((node.props as any).children);
    return '';
  };

  const initialText = getTextContent(children);
  const [translatedText, setTranslatedText] = useState<string>(initialText);
  const [isTranslating, setIsTranslating] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const textToTranslate = getTextContent(children).trim();

    if (!targetLanguage || targetLanguage.toLowerCase() === 'english' || !textToTranslate) {
      setTranslatedText(textToTranslate || initialText);
      return;
    }

    const cacheKey = `caresync_v4_trans_${targetLanguage.toLowerCase()}:${textToTranslate}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setTranslatedText(cached);
      return;
    }

    setIsTranslating(true);
    const performTranslation = async () => {
      try {
        const result = await geminiService.translate(textToTranslate, targetLanguage);
        if (isMounted.current) {
          const finalResult = result || textToTranslate;
          localStorage.setItem(cacheKey, finalResult);
          setTranslatedText(finalResult);
        }
      } catch (err) {
        if (isMounted.current) setTranslatedText(textToTranslate);
      } finally {
        if (isMounted.current) setIsTranslating(false);
      }
    };

    performTranslation();

    return () => { isMounted.current = false; };
  }, [children, targetLanguage, initialText]);

  return (
    <span className={`${className} transition-all duration-700 ${isTranslating ? 'opacity-30 blur-[1px]' : 'opacity-100 blur-0'}`}>
      {translatedText}
    </span>
  );
};

export default Translate;
