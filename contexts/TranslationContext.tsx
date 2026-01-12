
import React, { createContext, useContext, useState } from 'react';

interface TranslationContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode, initialLanguage: string }> = ({ children, initialLanguage }) => {
  const [language, setLanguage] = useState(initialLanguage);

  return (
    <TranslationContext.Provider value={{ language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) throw new Error("useTranslation must be used within TranslationProvider");
  return context;
};
