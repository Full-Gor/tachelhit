import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from 'expo-speech';
import { colors, borderRadius, spacing, fonts, shadows } from '../utils/theme';
import { useApp, Language } from '../context/AppContext';
import { LanguageButton } from '../components/LanguageSelector';
import LanguageSelector from '../components/LanguageSelector';
import TifinaghKeyboard from '../components/TifinaghKeyboard';

// Composant bouton 3D avec effet pressé
function Button3D({
  children,
  onPress,
  colors: buttonColors,
  style = {}
}: {
  children: React.ReactNode;
  onPress: () => void;
  colors: string[];
  style?: any;
}) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
      style={[
        {
          borderRadius: 25,
          transform: [{ translateY: isPressed ? 2 : 0 }],
        },
        style,
      ]}
    >
      <View
        style={{
          backgroundColor: buttonColors[1],
          borderRadius: 25,
          paddingBottom: isPressed ? 0 : 4,
        }}
      >
        <View
          style={{
            backgroundColor: buttonColors[0],
            borderRadius: 25,
            paddingVertical: 14,
            paddingHorizontal: 28,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.2)',
            borderBottomColor: 'rgba(0,0,0,0.2)',
          }}
        >
          {children}
        </View>
      </View>
    </Pressable>
  );
}

// Composant carte glassmorphique
function GlassCard({ children, style = {} }: { children: React.ReactNode; style?: any }) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.glass,
          borderRadius: borderRadius.xl,
          borderWidth: 1,
          borderColor: colors.glassBorder,
          padding: spacing.lg,
          ...shadows.glass,
        },
        style,
      ]}
    >
      {/* Effet de lumière en haut */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 20,
          right: 20,
          height: 1,
          backgroundColor: colors.glassHighlight,
          borderRadius: 1,
        }}
      />
      {children}
    </View>
  );
}

// Composant slider/toggle neumorphique
function NeumorphicToggle({
  options,
  selected,
  onSelect
}: {
  options: { key: string; label: string }[];
  selected: string;
  onSelect: (key: string) => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: colors.neuDark,
        borderRadius: borderRadius.pill,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      {options.map((option) => (
        <TouchableOpacity
          key={option.key}
          onPress={() => onSelect(option.key)}
          style={{
            flex: 1,
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: borderRadius.pill,
            backgroundColor: selected === option.key ? colors.primary : 'transparent',
            alignItems: 'center',
            ...(selected === option.key ? shadows.button : {}),
          }}
        >
          <Text
            style={{
              color: selected === option.key ? colors.textPrimary : colors.textSecondary,
              fontSize: fonts.sizes.md,
              fontWeight: selected === option.key ? '700' : '500',
            }}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// Icône SVG Soleil
function SunIcon({ size = 24, color = colors.tertiary }: { size?: number; color?: string }) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: size * 0.8, color }}>☀️</Text>
    </View>
  );
}

// Icône SVG Lune
function MoonIcon({ size = 24, color = colors.textMuted }: { size?: number; color?: string }) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: size * 0.8, color }}>🌙</Text>
    </View>
  );
}

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
    translateFull,
    addToHistory,
  } = useApp();

  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [phoneticText, setPhoneticText] = useState('');
  const [latinText, setLatinText] = useState('');
  const [tifinaghText, setTifinaghText] = useState('');
  const [showSourceLangPicker, setShowSourceLangPicker] = useState(false);
  const [showTargetLangPicker, setShowTargetLangPicker] = useState(false);
  const [showTifinaghKeyboard, setShowTifinaghKeyboard] = useState(false);

  const handleTranslate = useCallback(() => {
    if (!sourceText.trim()) {
      setTranslatedText('');
      setPhoneticText('');
      setLatinText('');
      setTifinaghText('');
      return;
    }
    const result = translateFull(sourceText, sourceLang, targetLang);
    if (result) {
      setTranslatedText(result.translation);
      setPhoneticText(result.phonetic);
      setLatinText(result.latin);
      setTifinaghText(result.tifinagh);
      addToHistory({
        sourceText,
        translatedText: result.translation,
        sourceLang,
        targetLang,
      });
    } else {
      setTranslatedText('Traduction non trouvée');
      setPhoneticText('');
      setLatinText('');
      setTifinaghText('');
    }
  }, [sourceText, sourceLang, targetLang, translateFull, addToHistory]);

  const speakTranslation = () => {
    if (!latinText) return;
    // Utilise le latin comme approximation de prononciation
    Speech.speak(latinText, { language: 'fr-FR', rate: 0.7 });
  };

  const handleSwap = () => {
    setSourceText(translatedText !== 'Traduction non trouvée' ? translatedText : '');
    setTranslatedText('');
    setPhoneticText('');
    setLatinText('');
    setTifinaghText('');
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
    <View style={{ flex: 1, backgroundColor: colors.backgroundDark }}>
      {/* Background gradient */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: colors.backgroundDark,
        }}
      >
        {/* Orbe de lumière décoratif */}
        <View
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: 150,
            backgroundColor: colors.primary,
            opacity: 0.1,
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 100,
            left: -50,
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: colors.buttonPurple,
            opacity: 0.08,
          }}
        />
      </View>

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        {/* Header Dashboard */}
        <View
          style={{
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.xl,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text
                style={{
                  fontSize: fonts.sizes.hero,
                  fontWeight: '700',
                  color: colors.textPrimary,
                  letterSpacing: -1,
                }}
              >
                ⵜⴰⵛⵍⵃⵉⵜ
              </Text>
              <Text
                style={{
                  fontSize: fonts.sizes.md,
                  color: colors.textSecondary,
                  marginTop: 4,
                }}
              >
                Traducteur • Souss
              </Text>
            </View>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: colors.glass,
                borderWidth: 1,
                borderColor: colors.glassBorder,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 24 }}>🔍</Text>
            </View>
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl }}
          >
            {/* Boutons de catégorie style maquette */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: spacing.xl,
              }}
            >
              <Button3D
                colors={[colors.buttonBlue, colors.buttonBlueLight]}
                onPress={() => setShowSourceLangPicker(true)}
                style={{ flex: 1, marginRight: 8 }}
              >
                <Text style={{ color: '#fff', fontWeight: '600', fontSize: fonts.sizes.md }}>
                  {sourceLang === 'tachelhit' ? 'ⵜⴰⵛⵍⵃⵉⵜ' : sourceLang === 'french' ? 'Français' : sourceLang === 'arabic' ? 'العربية' : 'English'}
                </Text>
              </Button3D>

              <Button3D
                colors={[colors.buttonPurple, colors.buttonPurpleLight]}
                onPress={() => setShowTargetLangPicker(true)}
                style={{ flex: 1, marginLeft: 8 }}
              >
                <Text style={{ color: '#fff', fontWeight: '600', fontSize: fonts.sizes.md }}>
                  {targetLang === 'tachelhit' ? 'ⵜⴰⵛⵍⵃⵉⵜ' : targetLang === 'french' ? 'Français' : targetLang === 'arabic' ? 'العربية' : 'English'}
                </Text>
              </Button3D>
            </View>

            {/* Boutons secondaires */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: spacing.xl,
              }}
            >
              <Button3D
                colors={[colors.buttonOrange, colors.buttonOrangeLight]}
                onPress={handleSwap}
                style={{ flex: 1, marginRight: 8 }}
              >
                <Text style={{ color: '#fff', fontWeight: '600', fontSize: fonts.sizes.sm }}>
                  ⇄ Inverser
                </Text>
              </Button3D>

              <Button3D
                colors={[colors.buttonPink, colors.buttonPinkLight]}
                onPress={() => setShowTifinaghKeyboard(!showTifinaghKeyboard)}
                style={{ flex: 1, marginLeft: 8 }}
              >
                <Text style={{ color: '#fff', fontWeight: '600', fontSize: fonts.sizes.sm }}>
                  ⵣ Tifinagh
                </Text>
              </Button3D>
            </View>

            {/* Toggle Script */}
            {(sourceLang === 'tachelhit' || targetLang === 'tachelhit') && (
              <View style={{ marginBottom: spacing.xl }}>
                <NeumorphicToggle
                  options={[
                    { key: 'tifinagh', label: 'ⵜⵉⴼⵉⵏⴰⵖ' },
                    { key: 'latin', label: 'Latin' },
                  ]}
                  selected={currentScript}
                  onSelect={(key) => {
                    if (key !== currentScript) toggleScript();
                  }}
                />
              </View>
            )}

            {/* Carte d'entrée glassmorphique */}
            <GlassCard style={{ marginBottom: spacing.lg }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: spacing.md,
                }}
              >
                <Text style={{ color: colors.textSecondary, fontSize: fonts.sizes.sm, fontWeight: '600' }}>
                  Texte à traduire
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <SunIcon size={20} />
                  <View
                    style={{
                      width: 44,
                      height: 24,
                      backgroundColor: colors.neuDark,
                      borderRadius: 12,
                      marginHorizontal: 8,
                      justifyContent: 'center',
                      paddingHorizontal: 2,
                    }}
                  >
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: colors.textMuted,
                        borderRadius: 10,
                        alignSelf: 'flex-end',
                      }}
                    />
                  </View>
                  <MoonIcon size={18} />
                </View>
              </View>

              <View
                style={{
                  backgroundColor: colors.neuDark,
                  borderRadius: borderRadius.lg,
                  padding: spacing.md,
                  minHeight: 120,
                  shadowColor: '#000',
                  shadowOffset: { width: 4, height: 4 },
                  shadowOpacity: 0.5,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              >
                <TextInput
                  style={{
                    fontSize: sourceLang === 'tachelhit' ? fonts.sizes.xl : fonts.sizes.lg,
                    color: colors.textPrimary,
                    minHeight: 100,
                    textAlignVertical: 'top',
                  }}
                  placeholder="Entrez votre texte..."
                  placeholderTextColor={colors.textMuted}
                  value={sourceText}
                  onChangeText={setSourceText}
                  multiline
                />
              </View>

              {sourceText.length > 0 && (
                <TouchableOpacity
                  onPress={() => {
                    setSourceText('');
                    setTranslatedText('');
                    setPhoneticText('');
                    setLatinText('');
                    setTifinaghText('');
                  }}
                  style={{
                    position: 'absolute',
                    right: spacing.lg,
                    top: spacing.lg + 40,
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: colors.error,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>✕</Text>
                </TouchableOpacity>
              )}
            </GlassCard>

            {/* Bouton Traduire */}
            <View style={{ marginBottom: spacing.lg }}>
              <Button3D
                colors={[colors.primary, colors.primaryLight]}
                onPress={handleTranslate}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: '#fff', fontWeight: '700', fontSize: fonts.sizes.lg, marginRight: 8 }}>
                    Traduire
                  </Text>
                  <Text style={{ color: '#fff', fontSize: fonts.sizes.xl }}>→</Text>
                </View>
              </Button3D>
            </View>

            {/* Carte de sortie glassmorphique */}
            <GlassCard style={{ borderColor: colors.buttonGreen, borderWidth: 2 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
                <Text
                  style={{
                    color: colors.buttonGreen,
                    fontSize: fonts.sizes.sm,
                    fontWeight: '600',
                  }}
                >
                  Traduction
                </Text>
                {translatedText && translatedText !== 'Traduction non trouvée' && (
                  <TouchableOpacity
                    onPress={speakTranslation}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      backgroundColor: colors.primary,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 18 }}>🔊</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View
                style={{
                  minHeight: 80,
                }}
              >
                <Text
                  style={{
                    fontSize: targetLang === 'tachelhit' ? fonts.sizes.xxl : fonts.sizes.lg,
                    color: translatedText && translatedText !== 'Traduction non trouvée'
                      ? colors.textPrimary
                      : colors.textMuted,
                    lineHeight: 32,
                  }}
                >
                  {translatedText || 'La traduction apparaîtra ici...'}
                </Text>

                {/* Phonétique */}
                {phoneticText && translatedText !== 'Traduction non trouvée' && (
                  <Text
                    style={{
                      fontSize: fonts.sizes.md,
                      color: colors.tertiary,
                      marginTop: spacing.sm,
                      fontStyle: 'italic',
                    }}
                  >
                    🗣️ {phoneticText}
                  </Text>
                )}

                {/* Tifinagh si on affiche en latin, ou Latin si on affiche en tifinagh */}
                {targetLang === 'tachelhit' && translatedText !== 'Traduction non trouvée' && (
                  <Text
                    style={{
                      fontSize: fonts.sizes.md,
                      color: colors.textSecondary,
                      marginTop: spacing.xs,
                    }}
                  >
                    {currentScript === 'latin' ? `ⵜⵉⴼⵉⵏⴰⵖ: ${tifinaghText}` : `Latin: ${latinText}`}
                  </Text>
                )}
              </View>
            </GlassCard>

            {/* Jauge de progression style maquette */}
            <GlassCard style={{ marginTop: spacing.lg }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm }}>
                <Text style={{ color: colors.textSecondary, fontSize: fonts.sizes.sm }}>Précision</Text>
                <Text style={{ color: colors.buttonGreen, fontSize: fonts.sizes.sm, fontWeight: '600' }}>
                  {translatedText && translatedText !== 'Traduction non trouvée' ? '100%' : '0%'}
                </Text>
              </View>
              <View
                style={{
                  height: 8,
                  backgroundColor: colors.neuDark,
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    width: translatedText && translatedText !== 'Traduction non trouvée' ? '100%' : '0%',
                    height: '100%',
                    backgroundColor: colors.buttonGreen,
                    borderRadius: 4,
                  }}
                />
              </View>

              {/* Knob/curseur style maquette */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: spacing.xl,
                }}
              >
                <View style={{ alignItems: 'center' }}>
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      backgroundColor: colors.neuDark,
                      alignItems: 'center',
                      justifyContent: 'center',
                      shadowColor: '#000',
                      shadowOffset: { width: 4, height: 4 },
                      shadowOpacity: 0.5,
                      shadowRadius: 8,
                      elevation: 6,
                    }}
                  >
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: colors.glassMedium,
                        borderWidth: 2,
                        borderColor: colors.glassBorder,
                      }}
                    />
                  </View>
                  <Text style={{ color: colors.textMuted, fontSize: fonts.sizes.xs, marginTop: 8 }}>Vitesse</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      backgroundColor: colors.neuDark,
                      alignItems: 'center',
                      justifyContent: 'center',
                      shadowColor: '#000',
                      shadowOffset: { width: 4, height: 4 },
                      shadowOpacity: 0.5,
                      shadowRadius: 8,
                      elevation: 6,
                    }}
                  >
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: colors.glassMedium,
                        borderWidth: 2,
                        borderColor: colors.glassBorder,
                      }}
                    />
                  </View>
                  <Text style={{ color: colors.textMuted, fontSize: fonts.sizes.xs, marginTop: 8 }}>Qualité</Text>
                </View>
              </View>
            </GlassCard>
          </ScrollView>

          {/* Clavier Tifinagh */}
          <TifinaghKeyboard
            visible={showTifinaghKeyboard && sourceLang === 'tachelhit'}
            onCharacterPress={handleTifinaghChar}
            onBackspace={handleBackspace}
            onSpace={handleSpace}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>

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
    </View>
  );
}
