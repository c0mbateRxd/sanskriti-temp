import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi' | 'kn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, data?: any) => string;
}

const translations = {
  en: {
    hero_title: 'Sanskriti AI',
    hero_subtitle: 'Explore the Soul of India Through Artificial Intelligence',
    search_placeholder: 'Search for states, dances, or arts...',
    explore_states: 'Explore States',
    trending: 'Trending Narratives',
    my_progress: 'My Discovery Progress',
    explored: 'Explored',
    badges: 'Achievements',
    chatbot_greeting: 'Namaste! I am your Sanskriti Guide. How can I help you explore India today?',
    dance: 'Dance Form',
    textile: 'Textile / Weaving',
    art: 'Art & Craft',
    description: 'Description',
    tags: 'Tags',
    marketplace: 'Marketplace',
    trending_crafts: 'Trending Crafts',
    artisan_direct: 'Artist Direct',
    add_to_bag: 'Add to Bag'
  },
  hi: {
    hero_title: 'संस्कृति AI',
    hero_subtitle: 'आर्टिफिशियल इंटेलिजेंस के माध्यम से भारत की आत्मा का अन्वेषण करें',
    search_placeholder: 'राज्यों, नृत्यों या कलाओं की खोज करें...',
    explore_states: 'राज्यों का अन्वेषण करें',
    trending: 'ट्रेंडिंग कथाएं',
    my_progress: 'मेरी खोज प्रगति',
    explored: 'खोजा गया',
    badges: 'उपलब्धियां',
    chatbot_greeting: 'नमस्ते! मैं आपका संस्कृति गाइड हूँ। आज मैं आपको भारत का पता लगाने में कैसे मदद कर सकता हूँ?',
    dance: 'नृत्य शैली',
    textile: 'कपड़ा / बुनाई',
    art: 'कला और शिल्प',
    description: 'विवरण',
    tags: 'टैग',
    marketplace: 'बाज़ार',
    trending_crafts: 'ट्रेंडिंग शिल्प',
    artisan_direct: 'सीधे कलाकार',
    add_to_bag: 'झोला में डालें'
  },
  kn: {
    hero_title: 'ಸಂಸ್ಕೃತಿ AI',
    hero_subtitle: 'ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆಯ ಮೂಲಕ ಭಾರತದ ಆತ್ಮವನ್ನು ಅನ್ವೇಷಿಸಿ',
    search_placeholder: 'ರಾಜ್ಯಗಳು, ನೃತ್ಯಗಳು ಅಥವಾ ಕಲೆಗಳಿಗಾಗಿ ಹುಡುಕಿ...',
    explore_states: 'ರಾಜ್ಯಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
    trending: 'ಟ್ರೆಂಡಿಂಗ್ ನಿರೂಪಣೆಗಳು',
    my_progress: 'ನನ್ನ ಸಂಶೋಧನೆಯ ಪ್ರಗತಿ',
    explored: 'ಅನ್ವೇಷಿಸಲಾಗಿದೆ',
    badges: 'ಸಾಧನೆಗಳು',
    chatbot_greeting: 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಸಂಸ್ಕೃತಿ ಮಾರ್ಗದರ್ಶಿ. ಇಂದು ಭಾರತವನ್ನು ಅನ್ವೇಷಿಸಲು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?',
    dance: 'ನೃತ್ಯ ಪ್ರಕಾರ',
    textile: 'ಜವಳಿ / ನೇಯ್ಗೆ',
    art: 'ಕಲೆ ಮತ್ತು ಕರಕುಶಲ',
    description: 'ವಿವರಣೆ',
    tags: 'ಟ್ಯಾಗ್‌ಗಳು',
    marketplace: 'ಸಂತೆ',
    trending_crafts: 'ಟ್ರೆಂಡಿಂಗ್ ಕರಕುಶಲ',
    artisan_direct: 'ನೇರ ಕಲಾವಿದರಿಂದ',
    add_to_bag: 'ಬ್ಯಾಕ್‌ಗೆ ಸೇರಿಸಿ'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('sanskriti-lang');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('sanskriti-lang', language);
  }, [language]);

  const t = (key: string) => {
    return (translations[language] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
