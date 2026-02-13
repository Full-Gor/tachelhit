import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dictionary from '../data/dictionary.json';

export type Language = 'tachelhit' | 'french' | 'arabic' | 'english';
export type Script = 'latin' | 'tifinagh';

export interface DictionaryEntry {
  id: string;
  latin: string;
  tifinagh: string;
  french: string;
  arabic: string;
  english: string;
  phonetic: string;
  category: string;
  souss_note?: string;
}

export interface HistoryItem {
  id: string;
  sourceText: string;
  translatedText: string;
  sourceLang: Language;
  targetLang: Language;
  timestamp: number;
}

interface AppContextType {
  // Langues
  sourceLang: Language;
  targetLang: Language;
  setSourceLang: (lang: Language) => void;
  setTargetLang: (lang: Language) => void;
  swapLanguages: () => void;

  // Script
  currentScript: Script;
  toggleScript: () => void;

  // Dictionnaire
  entries: DictionaryEntry[];
  categories: typeof dictionary.categories;
  alphabet: typeof dictionary.alphabet.tifinagh;
  searchEntries: (query: string) => DictionaryEntry[];
  getEntriesByCategory: (categoryId: string) => DictionaryEntry[];

  // Favoris
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;

  // Historique
  history: HistoryItem[];
  addToHistory: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;

  // Traduction
  translate: (text: string, from: Language, to: Language) => string;
  translateFull: (text: string, from: Language, to: Language) => { translation: string; phonetic: string; latin: string; tifinagh: string } | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const FAVORITES_KEY = '@tachelhit_favorites';
const HISTORY_KEY = '@tachelhit_history';

export function AppProvider({ children }: { children: ReactNode }) {
  const [sourceLang, setSourceLang] = useState<Language>('french');
  const [targetLang, setTargetLang] = useState<Language>('tachelhit');
  const [currentScript, setCurrentScript] = useState<Script>('tifinagh');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const entries = dictionary.entries as DictionaryEntry[];
  const categories = dictionary.categories;
  const alphabet = dictionary.alphabet.tifinagh;

  // Charger les favoris et l'historique au démarrage
  useEffect(() => {
    loadFavorites();
    loadHistory();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const loadHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem(HISTORY_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const saveFavorites = async (newFavorites: string[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const saveHistory = async (newHistory: HistoryItem[]) => {
    try {
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  };

  const swapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
  };

  const toggleScript = () => {
    setCurrentScript(prev => prev === 'latin' ? 'tifinagh' : 'latin');
  };

  const searchEntries = (query: string): DictionaryEntry[] => {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return [];

    return entries.filter(entry =>
      entry.latin.toLowerCase().includes(lowerQuery) ||
      entry.tifinagh.includes(query) ||
      entry.french.toLowerCase().includes(lowerQuery) ||
      entry.arabic.includes(query) ||
      entry.english.toLowerCase().includes(lowerQuery)
    );
  };

  const getEntriesByCategory = (categoryId: string): DictionaryEntry[] => {
    return entries.filter(entry => entry.category === categoryId);
  };

  const addFavorite = (id: string) => {
    const newFavorites = [...favorites, id];
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const removeFavorite = (id: string) => {
    const newFavorites = favorites.filter(f => f !== id);
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const addToHistory = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    const newHistory = [newItem, ...history.slice(0, 49)]; // Garder les 50 derniers
    setHistory(newHistory);
    saveHistory(newHistory);
  };

  const clearHistory = () => {
    setHistory([]);
    saveHistory([]);
  };

  const findBestMatch = (text: string, from: Language): DictionaryEntry | null => {
    const lowerText = text.toLowerCase().trim();
    if (!lowerText) return null;

    // 1. Correspondance exacte
    const exactMatch = entries.find(entry => {
      if (from === 'tachelhit') {
        return entry.latin.toLowerCase() === lowerText || entry.tifinagh === text;
      }
      const val = entry[from as keyof DictionaryEntry]?.toString().toLowerCase() || '';
      return val === lowerText;
    });
    if (exactMatch) return exactMatch;

    // 2. Le champ contient le texte recherché (ex: "comment vas-tu" dans "comment vas-tu ? (masc.)")
    const containsMatch = entries.find(entry => {
      if (from === 'tachelhit') {
        return entry.latin.toLowerCase().includes(lowerText) || entry.tifinagh.includes(text);
      }
      const val = entry[from as keyof DictionaryEntry]?.toString().toLowerCase() || '';
      return val.includes(lowerText);
    });
    if (containsMatch) return containsMatch;

    // 3. Le texte contient un des mots du champ (ex: "fruit" dans "fruits & légumes")
    const reverseMatch = entries.find(entry => {
      if (from === 'tachelhit') return false;
      const val = entry[from as keyof DictionaryEntry]?.toString().toLowerCase() || '';
      // Vérifier chaque alternative séparée par " / "
      const alternatives = val.split(' / ');
      return alternatives.some(alt => alt.trim().startsWith(lowerText) || lowerText.startsWith(alt.trim()));
    });
    if (reverseMatch) return reverseMatch;

    return null;
  };

  const translate = (text: string, from: Language, to: Language): string => {
    const match = findBestMatch(text, from);
    if (!match) return '';

    if (to === 'tachelhit') {
      return currentScript === 'tifinagh' ? match.tifinagh : match.latin;
    }
    return match[to as keyof DictionaryEntry]?.toString() || '';
  };

  const translateFull = (text: string, from: Language, to: Language) => {
    const match = findBestMatch(text, from);
    if (!match) return null;

    let translation: string;
    if (to === 'tachelhit') {
      translation = currentScript === 'tifinagh' ? match.tifinagh : match.latin;
    } else {
      translation = match[to as keyof DictionaryEntry]?.toString() || '';
    }

    return {
      translation,
      phonetic: match.phonetic,
      latin: match.latin,
      tifinagh: match.tifinagh,
    };
  };

  return (
    <AppContext.Provider value={{
      sourceLang,
      targetLang,
      setSourceLang,
      setTargetLang,
      swapLanguages,
      currentScript,
      toggleScript,
      entries,
      categories,
      alphabet,
      searchEntries,
      getEntriesByCategory,
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      history,
      addToHistory,
      clearHistory,
      translate,
      translateFull,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
