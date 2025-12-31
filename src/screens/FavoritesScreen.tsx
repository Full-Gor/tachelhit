import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, shadows } from '../utils/theme';
import { useApp } from '../context/AppContext';
import EntryCard from '../components/EntryCard';

// Composant Bouton 3D
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
  const [pressed, setPressed] = React.useState(false);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
      style={[
        {
          backgroundColor: color,
          borderRadius: 12,
          paddingVertical: 10,
          paddingHorizontal: 16,
          borderWidth: 1,
          borderColor: colorLight,
          transform: [{ translateY: pressed ? 3 : 0 }],
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

export default function FavoritesScreen() {
  const { favorites, entries, history, clearHistory } = useApp();

  const favoriteEntries = entries.filter(entry => favorites.includes(entry.id));

  const handleClearHistory = () => {
    Alert.alert(
      'Effacer l\'historique',
      'Voulez-vous vraiment supprimer tout l\'historique des traductions ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Effacer', style: 'destructive', onPress: clearHistory },
      ]
    );
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.backgroundDark,
    }}>
      {/* Orbes décoratives */}
      <View style={{
        position: 'absolute',
        top: 50,
        right: -80,
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: colors.buttonOrange,
        opacity: 0.12,
      }} />
      <View style={{
        position: 'absolute',
        bottom: -50,
        left: -60,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: colors.buttonPink,
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
            ⵉⵎⵓⵣⴰⵔ
          </Text>
          <Text style={{
            fontSize: 14,
            color: colors.textSecondary,
            textAlign: 'center',
            marginTop: 4,
          }}>
            Favoris & Historique
          </Text>
        </View>

        <FlatList
          data={[]}
          keyExtractor={() => 'main'}
          renderItem={null}
          ListHeaderComponent={
            <>
              {/* Section Favoris */}
              <View style={{ marginTop: 16, paddingHorizontal: 20 }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 22, marginRight: 8 }}>★</Text>
                    <Text style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: colors.textPrimary,
                    }}>
                      Mes Favoris
                    </Text>
                  </View>
                  <View style={{
                    backgroundColor: colors.primary,
                    paddingHorizontal: 14,
                    paddingVertical: 6,
                    borderRadius: 20,
                  }}>
                    <Text style={{
                      fontSize: 14,
                      color: colors.textPrimary,
                      fontWeight: 'bold',
                    }}>
                      {favoriteEntries.length}
                    </Text>
                  </View>
                </View>

                {favoriteEntries.length > 0 ? (
                  <View style={{ marginHorizontal: -20 }}>
                    {favoriteEntries.map(entry => (
                      <EntryCard key={entry.id} entry={entry} showCategory />
                    ))}
                  </View>
                ) : (
                  <GlassCard style={{ padding: 30, alignItems: 'center' }}>
                    <Text style={{ fontSize: 48, marginBottom: 16, opacity: 0.4 }}>☆</Text>
                    <Text style={{
                      fontSize: 15,
                      color: colors.textSecondary,
                      textAlign: 'center',
                      lineHeight: 22,
                    }}>
                      Aucun favori pour l'instant.{'\n'}
                      Appuyez sur ★ dans le dictionnaire{'\n'}pour ajouter des favoris.
                    </Text>
                  </GlassCard>
                )}
              </View>

              {/* Section Historique */}
              <View style={{ marginTop: 32, paddingHorizontal: 20 }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 22, marginRight: 8 }}>🕐</Text>
                    <Text style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: colors.textPrimary,
                    }}>
                      Historique
                    </Text>
                  </View>
                  {history.length > 0 && (
                    <Button3D
                      onPress={handleClearHistory}
                      color={colors.error}
                      colorLight="#ff6b6b"
                      style={{ paddingVertical: 8, paddingHorizontal: 14 }}
                    >
                      <Text style={{
                        fontSize: 13,
                        color: colors.textPrimary,
                        fontWeight: '600',
                      }}>
                        Effacer
                      </Text>
                    </Button3D>
                  )}
                </View>

                {history.length > 0 ? (
                  history.map(item => (
                    <GlassCard
                      key={item.id}
                      style={{
                        marginBottom: 10,
                        padding: 16,
                      }}
                    >
                      <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                      }}>
                        <Text style={{
                          fontSize: 15,
                          color: colors.textPrimary,
                          fontWeight: '500',
                        }}>
                          {item.sourceText}
                        </Text>
                        <Text style={{
                          fontSize: 15,
                          color: colors.primary,
                          marginHorizontal: 10,
                        }}>
                          →
                        </Text>
                        <Text style={{
                          fontSize: 15,
                          color: colors.buttonGreen,
                          fontWeight: '500',
                        }}>
                          {item.translatedText}
                        </Text>
                      </View>
                      <Text style={{
                        fontSize: 11,
                        color: colors.textMuted,
                        marginTop: 8,
                      }}>
                        {formatDate(item.timestamp)}
                      </Text>
                    </GlassCard>
                  ))
                ) : (
                  <GlassCard style={{ padding: 30, alignItems: 'center' }}>
                    <Text style={{ fontSize: 48, marginBottom: 16, opacity: 0.4 }}>📝</Text>
                    <Text style={{
                      fontSize: 15,
                      color: colors.textSecondary,
                      textAlign: 'center',
                      lineHeight: 22,
                    }}>
                      Aucune traduction dans l'historique.{'\n'}
                      Vos traductions apparaîtront ici.
                    </Text>
                  </GlassCard>
                )}
              </View>
            </>
          }
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </SafeAreaView>
    </View>
  );
}
