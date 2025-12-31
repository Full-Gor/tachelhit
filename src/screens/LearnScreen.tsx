import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, shadows } from '../utils/theme';
import { useApp } from '../context/AppContext';

interface AlphabetLetter {
  char: string;
  latin: string;
  name: string;
  phonetic: string;
}

// Composant Bouton 3D avec effet de pression
function Button3D({
  children,
  onPress,
  color = colors.buttonBlue,
  colorLight = colors.buttonBlueLight,
  style = {},
}: {
  children: React.ReactNode;
  onPress: () => void;
  color?: string;
  colorLight?: string;
  style?: object;
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
      style={[
        {
          backgroundColor: color,
          borderRadius: 16,
          padding: 16,
          borderWidth: 1,
          borderColor: colorLight,
          transform: [{ translateY: pressed ? 4 : 0 }],
          ...shadows.button,
          shadowOpacity: pressed ? 0.1 : 0.3,
        },
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}

// Carte Glass
function GlassCard({ children, style = {} }: { children: React.ReactNode; style?: object }) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.glass,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: colors.glassBorder,
          ...shadows.glass,
        },
        style,
      ]}
    >
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          backgroundColor: colors.glassHighlight,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      />
      {children}
    </View>
  );
}

// Carte lettre
function LetterCard({
  letter,
  onPress
}: {
  letter: AlphabetLetter;
  onPress: () => void;
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
      style={{
        width: 60,
        height: 72,
        margin: 4,
        backgroundColor: colors.glass,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.glassBorder,
        transform: [{ translateY: pressed ? 3 : 0 }],
        ...shadows.button,
        shadowOpacity: pressed ? 0.1 : 0.3,
      }}
    >
      <Text style={{
        fontSize: 28,
        color: colors.primary,
        fontWeight: 'bold',
      }}>
        {letter.char}
      </Text>
      <Text style={{
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 2,
      }}>
        {letter.latin}
      </Text>
    </Pressable>
  );
}

export default function LearnScreen() {
  const { alphabet } = useApp();
  const [selectedLetter, setSelectedLetter] = useState<AlphabetLetter | null>(null);

  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.backgroundDark,
    }}>
      {/* Orbes décoratives */}
      <View style={{
        position: 'absolute',
        top: -80,
        right: -60,
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: colors.buttonGreen,
        opacity: 0.12,
      }} />
      <View style={{
        position: 'absolute',
        bottom: 100,
        left: -100,
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: colors.buttonBlue,
        opacity: 0.1,
      }} />

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        {/* Header */}
        <View style={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 12,
        }}>
          <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: colors.textPrimary,
            textAlign: 'center',
          }}>
            ⴰⵍⵎⴰⴷ
          </Text>
          <Text style={{
            fontSize: 14,
            color: colors.textSecondary,
            textAlign: 'center',
            marginTop: 4,
          }}>
            Apprendre le Tifinagh
          </Text>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        >
          {/* Introduction */}
          <GlassCard style={{
            padding: 24,
            marginBottom: 24,
            backgroundColor: 'rgba(196, 30, 58, 0.2)',
            borderColor: 'rgba(196, 30, 58, 0.3)',
          }}>
            <Text style={{
              fontSize: 26,
              fontWeight: 'bold',
              color: colors.textPrimary,
              textAlign: 'center',
              marginBottom: 12,
            }}>
              ⵜⵉⴼⵉⵏⴰⵖ - Tifinagh
            </Text>
            <Text style={{
              fontSize: 15,
              color: colors.textSecondary,
              lineHeight: 24,
              textAlign: 'center',
            }}>
              Le Tifinagh est l'alphabet traditionnel des Amazighs (Berbères).
              Cette écriture millénaire est aujourd'hui utilisée pour écrire le
              Tachelhit et les autres langues amazighes au Maroc.
            </Text>
          </GlassCard>

          {/* Section Alphabet */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: colors.textPrimary,
              marginBottom: 4,
            }}>
              L'Alphabet Tifinagh
            </Text>
            <Text style={{
              fontSize: 13,
              color: colors.textMuted,
              marginBottom: 16,
            }}>
              Appuyez sur une lettre pour voir sa prononciation
            </Text>

            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
              {alphabet.map((letter, index) => (
                <LetterCard
                  key={index}
                  letter={letter}
                  onPress={() => setSelectedLetter(letter)}
                />
              ))}
            </View>
          </View>

          {/* Règles de prononciation */}
          <GlassCard style={{
            padding: 20,
            marginBottom: 24,
            borderLeftWidth: 4,
            borderLeftColor: colors.tertiary,
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: colors.textPrimary,
              marginBottom: 16,
            }}>
              📢 Prononciation du Souss
            </Text>

            {[
              { char: 'ⵖ (gh)', desc: 'Son "r" grasseyé, comme le "r" parisien' },
              { char: 'ⵅ (x/kh)', desc: 'Son guttural, comme "ch" allemand dans "Bach"' },
              { char: 'ⵄ (ɛ)', desc: 'Le "ayn" arabe, son pharyngal' },
              { char: 'ⵟ, ⴹ, ⵚ, ⵥ', desc: 'Consonnes emphatiques (langue en arrière)' },
            ].map((rule, index) => (
              <View key={index} style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginBottom: 12,
              }}>
                <Text style={{
                  fontSize: 16,
                  color: colors.primary,
                  fontWeight: 'bold',
                  width: 100,
                }}>
                  {rule.char}
                </Text>
                <Text style={{
                  flex: 1,
                  fontSize: 14,
                  color: colors.textSecondary,
                  lineHeight: 20,
                }}>
                  {rule.desc}
                </Text>
              </View>
            ))}
          </GlassCard>

          {/* Particularités du Souss */}
          <GlassCard style={{
            padding: 20,
            marginBottom: 24,
            backgroundColor: 'rgba(30, 86, 49, 0.2)',
            borderColor: 'rgba(30, 86, 49, 0.3)',
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: colors.textPrimary,
              marginBottom: 12,
            }}>
              📍 Le Tachelhit du Souss
            </Text>

            <Text style={{
              fontSize: 14,
              color: colors.textSecondary,
              lineHeight: 22,
              marginBottom: 16,
            }}>
              Le Tachelhit (ⵜⴰⵛⵍⵃⵉⵜ) est la langue amazighe parlée dans la région
              du Souss-Massa au sud-ouest du Maroc, notamment autour d'Agadir,
              Taroudant et Tiznit.
            </Text>

            <View style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderRadius: 12,
              padding: 16,
            }}>
              <Text style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: colors.textPrimary,
                marginBottom: 10,
              }}>
                Particularités régionales :
              </Text>
              {[
                'Vocabulaire lié à l\'arganier et l\'agriculture',
                'Expressions et proverbes uniques',
                'Prononciation douce des consonnes',
                'Riche tradition orale et poétique',
              ].map((item, index) => (
                <Text key={index} style={{
                  fontSize: 13,
                  color: colors.textSecondary,
                  marginBottom: 6,
                }}>
                  • {item}
                </Text>
              ))}
            </View>
          </GlassCard>

          {/* Nombres */}
          <GlassCard style={{ padding: 20 }}>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: colors.textPrimary,
              textAlign: 'center',
              marginBottom: 16,
            }}>
              🔢 Les Nombres
            </Text>
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
              {[
                { num: 'ⵢⴰⵏ', val: '1', latin: 'yan' },
                { num: 'ⵙⵉⵏ', val: '2', latin: 'sin' },
                { num: 'ⴽⵔⴰⴹ', val: '3', latin: 'krad' },
                { num: 'ⴽⴽⵓⵣ', val: '4', latin: 'kkuz' },
                { num: 'ⵙⵎⵎⵓⵙ', val: '5', latin: 'smmus' },
                { num: 'ⵙⴹⵉⵙ', val: '6', latin: 'sdis' },
                { num: 'ⵙⴰ', val: '7', latin: 'sa' },
                { num: 'ⵜⴰⵎ', val: '8', latin: 'tam' },
                { num: 'ⵜⵥⴰ', val: '9', latin: 'tza' },
                { num: 'ⵎⵔⴰⵡ', val: '10', latin: 'mraw' },
              ].map((item, index) => (
                <View key={index} style={{
                  width: 60,
                  alignItems: 'center',
                  margin: 8,
                  padding: 10,
                  backgroundColor: colors.glassMedium,
                  borderRadius: 12,
                }}>
                  <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: colors.primary,
                  }}>
                    {item.val}
                  </Text>
                  <Text style={{
                    fontSize: 16,
                    color: colors.textPrimary,
                    marginTop: 2,
                  }}>
                    {item.num}
                  </Text>
                  <Text style={{
                    fontSize: 11,
                    color: colors.textMuted,
                    marginTop: 2,
                  }}>
                    {item.latin}
                  </Text>
                </View>
              ))}
            </View>
          </GlassCard>
        </ScrollView>

        {/* Modal détail lettre */}
        <Modal
          visible={selectedLetter !== null}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedLetter(null)}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.8)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            activeOpacity={1}
            onPress={() => setSelectedLetter(null)}
          >
            <GlassCard style={{
              padding: 32,
              alignItems: 'center',
              minWidth: 220,
              borderWidth: 2,
              borderColor: colors.primary,
            }}>
              <Text style={{
                fontSize: 80,
                color: colors.primary,
                fontWeight: 'bold',
              }}>
                {selectedLetter?.char}
              </Text>
              <Text style={{
                fontSize: 28,
                color: colors.tertiary,
                marginTop: 8,
              }}>
                {selectedLetter?.latin}
              </Text>

              <View style={{
                marginTop: 20,
                alignItems: 'center',
              }}>
                <Text style={{
                  fontSize: 14,
                  color: colors.textMuted,
                }}>
                  Nom:
                </Text>
                <Text style={{
                  fontSize: 16,
                  color: colors.textPrimary,
                  fontWeight: '600',
                }}>
                  {selectedLetter?.name}
                </Text>
              </View>

              <View style={{
                marginTop: 12,
                alignItems: 'center',
              }}>
                <Text style={{
                  fontSize: 14,
                  color: colors.textMuted,
                }}>
                  Prononciation:
                </Text>
                <Text style={{
                  fontSize: 16,
                  color: colors.textPrimary,
                  fontWeight: '600',
                }}>
                  {selectedLetter?.phonetic}
                </Text>
              </View>

              <Button3D
                onPress={() => setSelectedLetter(null)}
                color={colors.primary}
                colorLight={colors.primaryLight}
                style={{ marginTop: 24, paddingHorizontal: 32 }}
              >
                <Text style={{
                  fontSize: 15,
                  color: colors.textPrimary,
                  fontWeight: 'bold',
                }}>
                  Fermer
                </Text>
              </Button3D>
            </GlassCard>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    </View>
  );
}
