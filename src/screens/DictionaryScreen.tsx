import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Animated,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, shadows } from '../utils/theme';
import { useApp } from '../context/AppContext';
import EntryCard from '../components/EntryCard';

// Composant Bouton 3D avec effet de pression
function Button3D({
  children,
  onPress,
  color = colors.buttonBlue,
  colorLight = colors.buttonBlueLight,
  style = {},
  active = false,
}: {
  children: React.ReactNode;
  onPress: () => void;
  color?: string;
  colorLight?: string;
  style?: object;
  active?: boolean;
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
      style={[
        {
          backgroundColor: active ? color : colors.glass,
          borderRadius: 20,
          paddingVertical: 10,
          paddingHorizontal: 16,
          marginRight: 10,
          borderWidth: 1,
          borderColor: active ? colorLight : colors.glassBorder,
          transform: [{ translateY: pressed ? 2 : 0 }],
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

export default function DictionaryScreen() {
  const { entries, categories, searchEntries, getEntriesByCategory } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const displayedEntries = useMemo(() => {
    if (searchQuery.trim()) {
      return searchEntries(searchQuery);
    }
    if (selectedCategory) {
      return getEntriesByCategory(selectedCategory);
    }
    return entries.slice(0, 30);
  }, [searchQuery, selectedCategory, entries, searchEntries, getEntriesByCategory]);

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(prev => prev === categoryId ? null : categoryId);
    setSearchQuery('');
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.backgroundDark,
    }}>
      {/* Orbes décoratives */}
      <View style={{
        position: 'absolute',
        top: -100,
        left: -100,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: colors.buttonPurple,
        opacity: 0.15,
      }} />
      <View style={{
        position: 'absolute',
        bottom: 100,
        right: -80,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: colors.buttonCyan,
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
            ⴰⵎⴰⵡⴰⵍ
          </Text>
          <Text style={{
            fontSize: 14,
            color: colors.textSecondary,
            textAlign: 'center',
            marginTop: 4,
          }}>
            Dictionnaire Tachelhit
          </Text>
        </View>

        {/* Barre de recherche neumorphique */}
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <GlassCard style={{ padding: 0 }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
            }}>
              <Text style={{ fontSize: 20, marginRight: 12 }}>
                <Text style={{ color: colors.textSecondary }}>&#x1F50D;</Text>
              </Text>
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: colors.textPrimary,
                  paddingVertical: 16,
                }}
                placeholder="Rechercher un mot..."
                placeholderTextColor={colors.textMuted}
                value={searchQuery}
                onChangeText={(text) => {
                  setSearchQuery(text);
                  setSelectedCategory(null);
                }}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearchQuery('')}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: colors.glassMedium,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{
                    color: colors.textSecondary,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>×</Text>
                </TouchableOpacity>
              )}
            </View>
          </GlassCard>
        </View>

        {/* Catégories - Défilement horizontal */}
        <View style={{ marginBottom: 12 }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            renderItem={({ item }) => (
              <Button3D
                onPress={() => handleCategoryPress(item.id)}
                color={colors.buttonPurple}
                colorLight={colors.buttonPurpleLight}
                active={selectedCategory === item.id}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, marginRight: 6 }}>{item.icon}</Text>
                  <Text style={{
                    fontSize: 13,
                    color: colors.textPrimary,
                    fontWeight: selectedCategory === item.id ? 'bold' : '500',
                  }}>
                    {item.name.fr}
                  </Text>
                </View>
              </Button3D>
            )}
          />
        </View>

        {/* Compteur de résultats */}
        <View style={{
          paddingHorizontal: 20,
          marginBottom: 8,
        }}>
          <Text style={{
            fontSize: 13,
            color: colors.textMuted,
          }}>
            {displayedEntries.length} résultat{displayedEntries.length !== 1 ? 's' : ''}
            {selectedCategory && ` • ${categories.find(c => c.id === selectedCategory)?.name.fr}`}
          </Text>
        </View>

        {/* Liste des entrées */}
        <FlatList
          data={displayedEntries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EntryCard entry={item} showCategory={!selectedCategory} />
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 40,
              marginHorizontal: 20,
            }}>
              <GlassCard style={{ padding: 30, alignItems: 'center' }}>
                <Text style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }}>📚</Text>
                <Text style={{
                  fontSize: 15,
                  color: colors.textSecondary,
                  textAlign: 'center',
                  lineHeight: 22,
                }}>
                  {searchQuery
                    ? `Aucun résultat pour "${searchQuery}"`
                    : 'Sélectionnez une catégorie\nou recherchez un mot'}
                </Text>
              </GlassCard>
            </View>
          }
        />
      </SafeAreaView>
    </View>
  );
}
