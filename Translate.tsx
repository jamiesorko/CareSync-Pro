
import React, { useState, useEffect } from 'react';
import { gemini } from './gemini';

export const Translate = ({ children, target }: { children: string, target: string }) => {
  const [text, setText] = useState(children);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (target === 'English') {
      setText(children);
      return;
    }
    const run = async () => {
      setLoading(true);
      const cached = localStorage.getItem(`t_${target}_${children}`);
      if (cached) {
        setText(cached);
      } else {
        const t = await gemini.translate(children, target);
        if (t) {
          localStorage.setItem(`t_${target}_${children}`, t);
          setText(t);
        }
      }
      setLoading(false);
    };
    run();
  }, [children, target]);

  return <span className={loading ? 'opacity-30 blur-sm transition-all' : ''}>{text}</span>;
};
