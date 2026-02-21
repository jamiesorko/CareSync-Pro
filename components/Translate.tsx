import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from '../contexts/TranslationContext';
import { translationService } from '../services/translationService';

export const stringifyNode = (node: any): string => {
  if (node === null || node === undefined) return "";
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(stringifyNode).join("");
  if (typeof node === 'object' && node.props && node.props.children) {
    return stringifyNode(node.props.children);
  }
  return String(node);
};

/**
 * Hook for programmatic localization (Attributes, Alerts, Prompts)
 */
export const useTranslate = (text: string) => {
  const { language, t, translateBatch } = useTranslation();
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    if (!text || language.toLowerCase() === 'english') {
      setTranslated(text);
      return;
    }

    const val = t(text);
    if (val !== text) {
      setTranslated(val);
    } else {
      // If missing from global dict, fetch specifically
      translationService.translateSingle(text, language).then(setTranslated);
    }
  }, [text, language, t]);

  return translated;
};

export const Translate: React.FC<{ children?: React.ReactNode; target?: string }> = ({ children }) => {
  const { language, t } = useTranslation();
  const source = useMemo(() => stringifyNode(children).trim(), [children]);
  const [localTranslation, setLocalTranslation] = useState(source);

  useEffect(() => {
    if (!source || language.toLowerCase() === 'english') {
      setLocalTranslation(source);
      return;
    }

    const dictValue = t(source);
    if (dictValue !== source) {
      setLocalTranslation(dictValue);
    } else {
      translationService.translateSingle(source, language).then(setLocalTranslation);
    }
  }, [source, language, t]);

  return <>{localTranslation}</>;
};

export default Translate;