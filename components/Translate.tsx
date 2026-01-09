
import React, { useState, useEffect } from 'react';
import { geminiService } from '../services/geminiService';

interface Props {
  children?: React.ReactNode;
  target: string;
}

/**
 * Modular Translation Component
 * Bridges any UI text to any target language using Gemini Flash.
 */
export const Translate: React.FC<Props> = ({ children, target }) => {
  // Extract text from ReactNode safely
  const sourceText = React.Children.toArray(children).map(child => {
    if (typeof child === 'string' || typeof child === 'number') return String(child);
    return '';
  }).join(' ').trim();

  const [translated, setTranslated] = useState<string>(sourceText);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sourceText || target === 'English') {
      setTranslated(sourceText);
      return;
    }

    const runTranslation = async () => {
      const cacheKey = `cs_v5_trans_${target}_${sourceText}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        setTranslated(cached);
        return;
      }

      setLoading(true);
      try {
        const result = await geminiService.translate(sourceText, target);
        if (result) {
          localStorage.setItem(cacheKey, result);
          setTranslated(result);
        }
      } catch (e) {
        setTranslated(sourceText);
      } finally {
        setLoading(false);
      }
    };

    runTranslation();
  }, [sourceText, target]);

  return (
    <span className={loading ? 'opacity-40 animate-pulse blur-[1px]' : 'transition-all duration-500'}>
      {translated}
    </span>
  );
};

export default Translate;
