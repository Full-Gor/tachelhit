import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import { colors, borderRadius, spacing, fonts } from '../utils/theme';
import { Language } from '../context/AppContext';

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (lang: Language) => void;
  currentLang: Language;
  excludeLang?: Language;
}

const LANGUAGES: { id: Language; name: string; nativeName: string; flag: string }[] = [
  { id: 'tachelhit', name: 'Tachelhit', nativeName: 'ⵜⴰⵛⵍⵃⵉⵜ', flag: '🇲🇦' },
  { id: 'french', name: 'Français', nativeName: 'Français', flag: '🇫🇷' },
  { id: 'arabic', name: 'Arabe', nativeName: 'العربية', flag: '🇸🇦' },
  { id: 'english', name: 'Anglais', nativeName: 'English', flag: '🇬🇧' },
];

export default function LanguageSelector({
  visible,
  onClose,
  onSelect,
  currentLang,
  excludeLang,
}: LanguageSelectorProps) {
  const filteredLanguages = excludeLang
    ? LANGUAGES.filter(l => l.id !== excludeLang)
    : LANGUAGES;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Choisir la langue</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={filteredLanguages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.langItem,
                  currentLang === item.id && styles.langItemSelected,
                ]}
                onPress={() => {
                  onSelect(item.id);
                  onClose();
                }}
              >
                <Text style={styles.flag}>{item.flag}</Text>
                <View style={styles.langInfo}>
                  <Text style={styles.langName}>{item.name}</Text>
                  <Text style={styles.langNative}>{item.nativeName}</Text>
                </View>
                {currentLang === item.id && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}

export function LanguageButton({
  lang,
  onPress,
}: {
  lang: Language;
  onPress: () => void;
}) {
  const langData = LANGUAGES.find(l => l.id === lang);

  return (
    <TouchableOpacity style={styles.langButton} onPress={onPress}>
      <Text style={styles.langButtonFlag}>{langData?.flag}</Text>
      <Text style={styles.langButtonText}>{langData?.name}</Text>
      <Text style={styles.langButtonArrow}>▼</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.background,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    maxHeight: '60%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerText: {
    fontSize: fonts.sizes.xl,
    fontWeight: 'bold',
    color: colors.text,
  },
  closeButton: {
    fontSize: fonts.sizes.xl,
    color: colors.textSecondary,
  },
  langItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  langItemSelected: {
    backgroundColor: colors.card,
  },
  flag: {
    fontSize: 28,
    marginRight: spacing.md,
  },
  langInfo: {
    flex: 1,
  },
  langName: {
    fontSize: fonts.sizes.lg,
    color: colors.text,
    fontWeight: '600',
  },
  langNative: {
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  checkmark: {
    fontSize: fonts.sizes.xl,
    color: colors.primary,
    fontWeight: 'bold',
  },
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  langButtonFlag: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  langButtonText: {
    fontSize: fonts.sizes.md,
    color: colors.text,
    fontWeight: '500',
  },
  langButtonArrow: {
    fontSize: fonts.sizes.xs,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
});
