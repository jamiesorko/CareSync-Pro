
import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { translationService } from '../services/translationService';

interface Props {
  children?: React.ReactNode;
  target: string;
}

/**
 * Normalizes technical keys (DASHBOARD_CORE -> Dashboard Core)
 */
const normalizeText = (text: string): string => {
  if (!text) return '';
  if (!text.includes('_')) return text;
  return text
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Hook for translating raw strings (placeholders, alerts, etc.)
 */
export const useTranslate = (text: string, target: string) => {
  const normalized = useMemo(() => normalizeText(text), [text]);
  const [translated, setTranslated] = useState(normalized);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!normalized || !target || target.toLowerCase() === 'english') {
      setTranslated(normalized);
      return;
    }

    const run = async () => {
      const cacheKey = `cs_v9_trans_${target.toLowerCase()}_${normalized.toLowerCase()}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setTranslated(cached);
        return;
      }

      setLoading(true);
      try {
        const result = await translationService.translate(normalized, target);
        if (result) {
          localStorage.setItem(cacheKey, result);
          setTranslated(result);
        }
      } catch (e) {
        setTranslated(normalized);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [normalized, target]);

  return { translated, loading };
};

/**
 * Component for translating React sub-trees
 */
export const Translate: React.FC<Props> = ({ children, target }) => {
  const extractText = (node: React.ReactNode): string => {
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(extractText).join(' ');
    if (React.isValidElement(node) && node.props.children) return extractText(node.props.children);
    return '';
  };

  const sourceText = useMemo(() => extractText(children).trim(), [children]);
  const { translated, loading } = useTranslate(sourceText, target);

  return (
    <span className={`transition-opacity duration-300 ${loading ? 'opacity-40 animate-pulse' : 'opacity-100'}`}>
      {translated}
    </span>
  );
};

export default Translate;
