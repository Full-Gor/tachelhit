import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
} from 'react-native';
import { colors, shadows } from '../utils/theme';
import { DictionaryEntry, useApp } from '../context/AppContext';

interface EntryCardProps {
  entry: DictionaryEntry;
  showCategory?: boolean;
}

export default function EntryCard({ entry, showCategory = false }: EntryCardProps) {
  const { isFavorite, addFavorite, removeFavorite, categories } = useApp();
  const favorite = isFavorite(entry.id);
  const [pressed, setPressed] = useState(false);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(entry.id);
    } else {
      addFavorite(entry.id);
    }
  };

  const category = categories.find(c => c.id === entry.category);

  return (
    <View style={{
      backgroundColor: colors.glass,
      borderRadius: 20,
      padding: 16,
      marginHorizontal: 20,
      marginVertical: 8,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      ...shadows.glass,
    }}>
      {/* Highlight effect */}
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: colors.glassHighlight,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }} />

      {/* Header */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
      }}>
        <View style={{ flex: 1 }}>
          <Text style={{
            fontSize: 26,
            color: colors.primary,
            fontWeight: 'bold',
            marginBottom: 4,
          }}>
            {entry.tifinagh}
          </Text>
          <Text style={{
            fontSize: 17,
            color: colors.tertiary,
            fontStyle: 'italic',
          }}>
            {entry.latin}
          </Text>
        </View>
        <Pressable
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          onPress={toggleFavorite}
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: favorite ? 'rgba(212, 160, 23, 0.2)' : colors.glassMedium,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ scale: pressed ? 0.9 : 1 }],
          }}
        >
          <Text style={{
            fontSize: 24,
            color: favorite ? colors.tertiary : colors.textMuted,
          }}>
            {favorite ? '★' : '☆'}
          </Text>
        </Pressable>
      </View>

      {/* Translations */}
      <View style={{
        borderTopWidth: 1,
        borderTopColor: colors.glassBorder,
        paddingTop: 12,
      }}>
        {[
          { flag: '🇫🇷', text: entry.french },
          { flag: '🇸🇦', text: entry.arabic },
          { flag: '🇬🇧', text: entry.english },
        ].map((item, index) => (
          <View key={index} style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 4,
          }}>
            <Text style={{ fontSize: 18, marginRight: 10 }}>{item.flag}</Text>
            <Text style={{
              fontSize: 15,
              color: colors.textPrimary,
              flex: 1,
            }}>
              {item.text}
            </Text>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: colors.glassBorder,
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Text style={{ fontSize: 16, marginRight: 6 }}>🔊</Text>
          <Text style={{
            fontSize: 13,
            color: colors.buttonGreen,
            fontStyle: 'italic',
          }}>
            {entry.phonetic}
          </Text>
        </View>
        {showCategory && category && (
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.glassMedium,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
          }}>
            <Text style={{ fontSize: 14, marginRight: 4 }}>{category.icon}</Text>
            <Text style={{
              fontSize: 11,
              color: colors.textSecondary,
            }}>
              {category.name.fr}
            </Text>
          </View>
        )}
      </View>

      {/* Souss Note */}
      {entry.souss_note && (
        <View style={{
          marginTop: 12,
          padding: 12,
          backgroundColor: 'rgba(212, 160, 23, 0.1)',
          borderRadius: 12,
          borderLeftWidth: 3,
          borderLeftColor: colors.tertiary,
        }}>
          <Text style={{
            fontSize: 12,
            color: colors.tertiary,
            fontWeight: 'bold',
            marginBottom: 4,
          }}>
            📍 Souss:
          </Text>
          <Text style={{
            fontSize: 13,
            color: colors.textSecondary,
            fontStyle: 'italic',
            lineHeight: 18,
          }}>
            {entry.souss_note}
          </Text>
        </View>
      )}
    </View>
  );
}
