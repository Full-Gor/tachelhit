import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors, borderRadius, spacing, fonts } from '../utils/theme';
import { DictionaryEntry, useApp } from '../context/AppContext';

interface EntryCardProps {
  entry: DictionaryEntry;
  showCategory?: boolean;
}

export default function EntryCard({ entry, showCategory = false }: EntryCardProps) {
  const { isFavorite, addFavorite, removeFavorite, currentScript, categories } = useApp();
  const favorite = isFavorite(entry.id);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(entry.id);
    } else {
      addFavorite(entry.id);
    }
  };

  const category = categories.find(c => c.id === entry.category);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.tachelhitContainer}>
          <Text style={styles.tifinagh}>{entry.tifinagh}</Text>
          <Text style={styles.latin}>{entry.latin}</Text>
        </View>
        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
          <Text style={styles.favoriteIcon}>{favorite ? '★' : '☆'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.translations}>
        <View style={styles.translationRow}>
          <Text style={styles.flag}>🇫🇷</Text>
          <Text style={styles.translationText}>{entry.french}</Text>
        </View>
        <View style={styles.translationRow}>
          <Text style={styles.flag}>🇸🇦</Text>
          <Text style={[styles.translationText, styles.arabic]}>{entry.arabic}</Text>
        </View>
        <View style={styles.translationRow}>
          <Text style={styles.flag}>🇬🇧</Text>
          <Text style={styles.translationText}>{entry.english}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.phoneticContainer}>
          <Text style={styles.phoneticLabel}>🔊</Text>
          <Text style={styles.phonetic}>{entry.phonetic}</Text>
        </View>
        {showCategory && category && (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={styles.categoryText}>{category.name.fr}</Text>
          </View>
        )}
      </View>

      {entry.souss_note && (
        <View style={styles.noteContainer}>
          <Text style={styles.noteLabel}>📍 Souss:</Text>
          <Text style={styles.noteText}>{entry.souss_note}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  tachelhitContainer: {
    flex: 1,
  },
  tifinagh: {
    fontSize: fonts.sizes.xxl,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  latin: {
    fontSize: fonts.sizes.lg,
    color: colors.accent,
    fontStyle: 'italic',
  },
  favoriteButton: {
    padding: spacing.sm,
  },
  favoriteIcon: {
    fontSize: 28,
    color: colors.tertiary,
  },
  translations: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    marginTop: spacing.xs,
  },
  translationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xs,
  },
  flag: {
    fontSize: 18,
    marginRight: spacing.sm,
  },
  translationText: {
    fontSize: fonts.sizes.md,
    color: colors.text,
    flex: 1,
  },
  arabic: {
    textAlign: 'left',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  phoneticContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneticLabel: {
    fontSize: 16,
    marginRight: spacing.xs,
  },
  phonetic: {
    fontSize: fonts.sizes.sm,
    color: colors.secondary,
    fontStyle: 'italic',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    borderWidth: 1,
    borderColor: colors.borderDark,
  },
  categoryIcon: {
    fontSize: 14,
    marginRight: spacing.xs,
  },
  categoryText: {
    fontSize: fonts.sizes.xs,
    color: colors.textSecondary,
  },
  noteContainer: {
    marginTop: spacing.sm,
    padding: spacing.sm,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.tertiary,
  },
  noteLabel: {
    fontSize: fonts.sizes.sm,
    color: colors.accent,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  noteText: {
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});
