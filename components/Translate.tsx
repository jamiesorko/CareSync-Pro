
import React, { useState, useEffect, useMemo } from 'react';
import { translationService } from '../services/translationService';

interface Props {
  children?: React.ReactNode;
  target: string;
}

/**
 * Universal Neural Intercept Component
 * Wraps any UI text to bridge it to any of the 7,000+ world languages.
 */
export const Translate: React.FC<Props> = ({ children, target }) => {
  // 1. Safely extract text from any React structure
  const sourceText = useMemo(() => {
    return React.Children.toArray(children)
      .map(child => (typeof child === 'string' || typeof child === 'number' ? String(child) : ''))
      .join(' ')
      .trim();
  }, [children]);

  // 2. Normalize technical keys (e.g., "OPS_DASHBOARD" -> "Ops Dashboard")
  const normalizedText = useMemo(() => {
    if (!sourceText.includes('_')) return sourceText;
    return sourceText
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }, [sourceText]);

  const [displayText, setDisplayText] = useState(normalizedText || sourceText);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!normalizedText || target === 'English') {
      setDisplayText(normalizedText || sourceText);
      return;
    }

    const performTranslation = async () => {
      const cacheKey = `csp_v6_cache_${target.toLowerCase()}_${normalizedText}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        setDisplayText(cached);
        return;
      }

      setLoading(true);
      try {
        const result = await translationService.translate(normalizedText, target);
        if (result) {
          localStorage.setItem(cacheKey, result);
          setDisplayText(result);
        }
      } catch (e) {
        setDisplayText(normalizedText);
      } finally {
        setLoading(false);
      }
    };

    performTranslation();
  }, [normalizedText, target, sourceText]);

  return (
    <span 
      className={`transition-all duration-300 ${loading ? 'opacity-40 blur-[1px] animate-pulse' : 'opacity-100'}`}
      title={normalizedText !== displayText ? normalizedText : undefined}
    >
      {displayText}
    </span>
  );
};

export default Translate;
