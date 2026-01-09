import React, { useState, useEffect, useMemo } from 'react';
import { geminiService } from '../services/geminiService';

interface Props {
  children?: React.ReactNode;
  target: string;
}

/**
 * Neural Intercept Translation Component
 * Bridges UI text to ANY global language using Gemini 3 Flash.
 */
export const Translate: React.FC<Props> = ({ children, target }) => {
  // Extract text content from React children efficiently
  const sourceText = useMemo(() => {
    return React.Children.toArray(children)
      .map(child => {
        if (typeof child === 'string' || typeof child === 'number') return String(child);
        return '';
      })
      .join(' ')
      .trim();
  }, [children]);

  // Clean up technical keys (e.g., "RESOURCE_CORE" -> "Resource Core")
  const humanReadableSource = useMemo(() => {
    if (!sourceText) return "";
    if (!sourceText.includes('_')) return sourceText;
    return sourceText
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }, [sourceText]);

  const [translated, setTranslated] = useState<string>(humanReadableSource || sourceText);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!humanReadableSource || !target || target === 'English') {
      setTranslated(humanReadableSource || sourceText);
      return;
    }

    const runTranslation = async () => {
      const cacheKey = `csp_v5_trans_${target.toLowerCase()}_${humanReadableSource}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        setTranslated(cached);
        return;
      }

      setLoading(true);
      try {
        const result = await geminiService.translate(humanReadableSource, target);
        if (result) {
          localStorage.setItem(cacheKey, result);
          setTranslated(result);
        } else {
          setTranslated(humanReadableSource);
        }
      } catch (e) {
        console.error("[TRANSLATION_FAILOVER]:", e);
        setTranslated(humanReadableSource);
      } finally {
        setLoading(false);
      }
    };

    runTranslation();
  }, [humanReadableSource, target, sourceText]);

  return (
    <span 
      className={`transition-all duration-500 ${loading ? 'opacity-40 blur-[1px] animate-pulse' : 'opacity-100 blur-0'}`}
      title={humanReadableSource !== translated ? humanReadableSource : undefined}
    >
      {translated}
    </span>
  );
};

export default Translate;