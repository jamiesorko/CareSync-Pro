
import React, { useState, useEffect } from 'react';
import { geminiService } from '../services/geminiService';

interface Props {
  /* Fix: Made children optional to satisfy TSX usage where children are passed between tags */
  children?: React.ReactNode;
  /* Fix: Allow any for target to handle cases where language prop is dynamically typed */
  target: string | any;
}

/**
 * Neural Translation Component
 * Bridges any UI text to any target language using Gemini Flash.
 */
/* Fix: Removed React.FC to better handle children in React 18 */
export const Translate = ({ children, target }: Props) => {
  const sourceText = typeof children === 'string' ? children : String(children || '');
  const [translated, setTranslated] = useState<string>(sourceText);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sourceText || target === 'English') {
      setTranslated(sourceText);
      return;
    }

    const runTranslation = async () => {
      const cacheKey = `cs_v4_trans_${target}_${sourceText}`;
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
