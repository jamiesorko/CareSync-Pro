import React, { useState, useEffect, useMemo } from 'react';
import { translationService } from '../services/translationService';
import { useTranslation } from '../contexts/TranslationContext';

export const stringifyNode = (node: any): string => {
  if (node === null || node === undefined) return "";
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(stringifyNode).join("");
  if (typeof node === 'object' && node.props && node.props.children) {
    return stringifyNode(node.props.children);
  }
  return String(node);
};

export const useTranslate = (text: any, target?: string) => {
  const { language: contextLanguage } = useTranslation();
  const language = target || contextLanguage;
  const source = useMemo(() => stringifyNode(text).trim(), [text]);
  
  const [translated, setTranslated] = useState(source);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!source || !language || language.toLowerCase() === 'english') {
      setTranslated(source);
      return;
    }

    const runTranslation = async () => {
      const cacheKey = `csp_v25.1_${language}_${source}`;
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
      className={`${loading ? 'opacity-40 animate-pulse' : 'transition-opacity duration-300'} inline-block`}
    >
      {translated}
    </span>
  );
};

export default Translate;