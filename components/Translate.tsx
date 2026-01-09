import React, { useState, useEffect, useMemo } from 'react';
import { translationService } from '../services/translationService';

interface Props {
  children?: React.ReactNode;
  target: string;
}

/**
 * Universal Neural Intercept Component
 * Wraps any UI text to bridge it to any language vector defined in the selector.
 */
export const Translate: React.FC<Props> = ({ children, target }) => {
  // 1. Recursively extract text from any React structure (arrays, nested spans, etc)
  const extractText = (node: React.ReactNode): string => {
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(extractText).join(' ');
    if (React.isValidElement(node) && node.props.children) return extractText(node.props.children);
    return '';
  };

  const sourceText = useMemo(() => extractText(children).trim(), [children]);

  // 2. Normalize technical keys (e.g., "OPS_DASHBOARD" -> "Ops Dashboard")
  const normalizedText = useMemo(() => {
    if (!sourceText || !sourceText.includes('_')) return sourceText;
    return sourceText
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }, [sourceText]);

  const [displayText, setDisplayText] = useState(normalizedText || sourceText);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!normalizedText || !target || target === 'English') {
      setDisplayText(normalizedText || sourceText);
      return;
    }

    const performTranslation = async () => {
      const cacheKey = `caresync_v7_trans_${target.toLowerCase()}_${normalizedText}`;
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
  }, [normalizedText, target]);

  return (
    <span 
      className={`transition-all duration-300 ${loading ? 'opacity-40 blur-[2px] animate-pulse' : 'opacity-100'}`}
      title={normalizedText !== displayText ? normalizedText : undefined}
    >
      {displayText}
    </span>
  );
};

export default Translate;