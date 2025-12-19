import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, borderRadius, spacing, fonts } from '../utils/theme';
import { useApp, Language } from '../context/AppContext';
import { LanguageButton } from '../components/LanguageSelector';
import LanguageSelector from '../components/LanguageSelector';
import TifinaghKeyboard from '../components/TifinaghKeyboard';
import AmazighHeader from '../components/AmazighHeader';

export default function TranslateScreen() {
  const {
    sourceLang,
    targetLang,
    setSourceLang,
    setTargetLang,
    swapLanguages,
    currentScript,
    toggleScript,
    translate,
    addToHistory,
  } = useApp();

  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [showSourceLangPicker, setShowSourceLangPicker] = useState(false);
  const [showTargetLangPicker, setShowTargetLangPicker] = useState(false);
  const [showTifinaghKeyboard, setShowTifinaghKeyboard] = useState(false);

  const handleTranslate = useCallback(() => {
    if (!sourceText.trim()) {
      setTranslatedText('');
      return;
    }
    const result = translate(sourceText, sourceLang, targetLang);
    setTranslatedText(result || 'Traduction non trouvée dans le dictionnaire');

    if (result) {
      addToHistory({
        sourceText,
        translatedText: result,
        sourceLang,
        targetLang,
      });
    }
  }, [sourceText, sourceLang, targetLang, translate, addToHistory]);

  const handleSwap = () => {
    const tempText = sourceText;
    setSourceText(translatedText !== 'Traduction non trouvée dans le dictionnaire' ? translatedText : '');
    setTranslatedText(tempText ? translate(translatedText, targetLang, sourceLang) : '');
    swapLanguages();
  };

  const handleTifinaghChar = (char: string) => {
    setSourceText(prev => prev + char);
  };

  const handleBackspace = () => {
    setSourceText(prev => prev.slice(0, -1));
  };

  const handleSpace = () => {
    setSourceText(prev => prev + ' ');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AmazighHeader
        title="ⵜⴰⵛⵍⵃⵉⵜ"
        subtitle="Traducteur Tachelhit du Souss"
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <ScrollView style={styles.scrollView}>
          {/* Sélecteur de langues */}
          <View style={styles.languageBar}>
            <LanguageButton
              lang={sourceLang}
              onPress={() => setShowSourceLangPicker(true)}
            />
            <TouchableOpacity style={styles.swapButton} onPress={handleSwap}>
              <Text style={styles.swapIcon}>⇄</Text>
            </TouchableOpacity>
            <LanguageButton
              lang={targetLang}
              onPress={() => setShowTargetLangPicker(true)}
            />
          </View>

          {/* Toggle Script pour Tachelhit */}
          {(sourceLang === 'tachelhit' || targetLang === 'tachelhit') && (
            <View style={styles.scriptToggle}>
              <TouchableOpacity
                style={[
                  styles.scriptButton,
                  currentScript === 'tifinagh' && styles.scriptButtonActive,
                ]}
                onPress={() => currentScript !== 'tifinagh' && toggleScript()}
              >
                <Text style={[
                  styles.scriptText,
                  currentScript === 'tifinagh' && styles.scriptTextActive,
                ]}>
                  ⵜⵉⴼⵉⵏⴰⵖ
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.scriptButton,
                  currentScript === 'latin' && styles.scriptButtonActive,
                ]}
                onPress={() => currentScript !== 'latin' && toggleScript()}
              >
                <Text style={[
                  styles.scriptText,
                  currentScript === 'latin' && styles.scriptTextActive,
                ]}>
                  Latin
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Zone de texte source */}
          <View style={styles.inputContainer}>
            <View style={styles.inputHeader}>
              <Text style={styles.inputLabel}>Texte à traduire</Text>
              {sourceLang === 'tachelhit' && (
                <TouchableOpacity
                  style={styles.keyboardToggle}
                  onPress={() => setShowTifinaghKeyboard(!showTifinaghKeyboard)}
                >
                  <Text style={styles.keyboardToggleText}>
                    {showTifinaghKeyboard ? '⌨️ ABC' : 'ⵜⵉⴼ ⵣ'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <TextInput
              style={[
                styles.textInput,
                sourceLang === 'tachelhit' && styles.tifinaghInput,
              ]}
              placeholder="Entrez votre texte..."
              placeholderTextColor={colors.textSecondary}
              value={sourceText}
              onChangeText={setSourceText}
              multiline
              textAlignVertical="top"
            />
            {sourceText.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {
                  setSourceText('');
                  setTranslatedText('');
                }}
              >
                <Text style={styles.clearButtonText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Bouton traduire */}
          <TouchableOpacity style={styles.translateButton} onPress={handleTranslate}>
            <Text style={styles.translateButtonText}>Traduire</Text>
            <Text style={styles.translateButtonIcon}>→</Text>
          </TouchableOpacity>

          {/* Zone de traduction */}
          <View style={styles.outputContainer}>
            <Text style={styles.outputLabel}>Traduction</Text>
            <View style={styles.outputBox}>
              <Text style={[
                styles.outputText,
                targetLang === 'tachelhit' && styles.tifinaghOutput,
                targetLang === 'arabic' && styles.arabicOutput,
              ]}>
                {translatedText || 'La traduction apparaîtra ici...'}
              </Text>
            </View>
          </View>

          {/* Note informative */}
          <View style={styles.infoBox}>
            <Text style={styles.infoIcon}>ℹ️</Text>
            <Text style={styles.infoText}>
              Ce traducteur utilise un dictionnaire local du Tachelhit du Souss.
              Explorez le dictionnaire pour découvrir plus de mots et expressions.
            </Text>
          </View>
        </ScrollView>

        {/* Clavier Tifinagh */}
        <TifinaghKeyboard
          visible={showTifinaghKeyboard && sourceLang === 'tachelhit'}
          onCharacterPress={handleTifinaghChar}
          onBackspace={handleBackspace}
          onSpace={handleSpace}
        />
      </KeyboardAvoidingView>

      {/* Modals de sélection de langue */}
      <LanguageSelector
        visible={showSourceLangPicker}
        onClose={() => setShowSourceLangPicker(false)}
        onSelect={setSourceLang}
        currentLang={sourceLang}
        excludeLang={targetLang}
      />
      <LanguageSelector
        visible={showTargetLangPicker}
        onClose={() => setShowTargetLangPicker(false)}
        onSelect={setTargetLang}
        currentLang={targetLang}
        excludeLang={sourceLang}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: spacing.md,
  },
  languageBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  swapButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.round,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  swapIcon: {
    fontSize: 24,
    color: colors.textLight,
    fontWeight: 'bold',
  },
  scriptToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  scriptButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  scriptButtonActive: {
    backgroundColor: colors.primary,
  },
  scriptText: {
    fontSize: fonts.sizes.md,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  scriptTextActive: {
    color: colors.textLight,
  },
  inputContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  inputLabel: {
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  keyboardToggle: {
    backgroundColor: colors.tertiary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  keyboardToggleText: {
    fontSize: fonts.sizes.sm,
    color: colors.text,
    fontWeight: 'bold',
  },
  textInput: {
    fontSize: fonts.sizes.lg,
    color: colors.text,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  tifinaghInput: {
    fontSize: fonts.sizes.xl,
  },
  clearButton: {
    position: 'absolute',
    right: spacing.md,
    top: spacing.md,
    padding: spacing.xs,
  },
  clearButtonText: {
    fontSize: fonts.sizes.lg,
    color: colors.textSecondary,
  },
  translateButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  translateButtonText: {
    fontSize: fonts.sizes.lg,
    color: colors.textLight,
    fontWeight: 'bold',
    marginRight: spacing.sm,
  },
  translateButtonIcon: {
    fontSize: fonts.sizes.xl,
    color: colors.textLight,
  },
  outputContainer: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  outputLabel: {
    fontSize: fonts.sizes.sm,
    color: colors.secondary,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  outputBox: {
    minHeight: 80,
  },
  outputText: {
    fontSize: fonts.sizes.lg,
    color: colors.text,
    lineHeight: 28,
  },
  tifinaghOutput: {
    fontSize: fonts.sizes.xxl,
    color: colors.primary,
  },
  arabicOutput: {
    textAlign: 'left',
    fontSize: fonts.sizes.xl,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.tertiary,
  },
  infoIcon: {
    fontSize: 18,
    marginRight: spacing.sm,
  },
  infoText: {
    flex: 1,
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
