
import React, { useEffect, useState } from 'react';
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

// Fixed: Added useTranslate hook for programmatic translation which was missing in exports
export const useTranslate = (source: string, target?: string) => {
  const { language, t } = useTranslation();
  const lang = target || language;
  const [translated, setTranslated] = useState(source);

  useEffect(() => {
    if (!source || lang.toLowerCase() === 'english') {
      setTranslated(source);
      return;
    }

    const dictValue = t(source);
    if (dictValue !== source) {
      setTranslated(dictValue);
    } else {
      translationService.translateSingle(source, lang).then(setTranslated);
    }
  }, [source, lang, t]);

  return { translated };
};

export const Translate: React.FC<{ children?: React.ReactNode; target?: string }> = ({ children, target }) => {
  const { language, t } = useTranslation();
  // Fixed: Use provided target language or fallback to context language
  const lang = target || language;
  const source = stringifyNode(children).trim();
  const [localTranslation, setLocalTranslation] = useState(source);

  useEffect(() => {
    if (!source || lang.toLowerCase() === 'english') {
      setLocalTranslation(source);
      return;
    }

    const dictValue = t(source);
    if (dictValue !== source) {
      setLocalTranslation(dictValue);
    } else {
      // If not in global dictionary yet, fetch it specifically
      translationService.translateSingle(source, lang).then(setLocalTranslation);
    }
  }, [source, lang, t]);

  return <span>{localTranslation}</span>;
};

export default Translate;
