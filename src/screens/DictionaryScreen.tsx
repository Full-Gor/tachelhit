import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, borderRadius, spacing, fonts } from '../utils/theme';
import { useApp } from '../context/AppContext';
import EntryCard from '../components/EntryCard';
import AmazighHeader from '../components/AmazighHeader';

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
    return entries.slice(0, 30); // Afficher les premiers par défaut
  }, [searchQuery, selectedCategory, entries, searchEntries, getEntriesByCategory]);

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(prev => prev === categoryId ? null : categoryId);
    setSearchQuery('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AmazighHeader
        title="Amawal"
        subtitle="Dictionnaire Tachelhit"
      />

      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un mot..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              setSelectedCategory(null);
            }}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearSearch}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Catégories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.categoriesList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === item.id && styles.categoryButtonActive,
              ]}
              onPress={() => handleCategoryPress(item.id)}
            >
              <Text style={styles.categoryIcon}>{item.icon}</Text>
              <Text style={[
                styles.categoryName,
                selectedCategory === item.id && styles.categoryNameActive,
              ]}>
                {item.name.fr}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Résultats */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {displayedEntries.length} résultat{displayedEntries.length !== 1 ? 's' : ''}
          {selectedCategory && ` dans "${categories.find(c => c.id === selectedCategory)?.name.fr}"`}
        </Text>
      </View>

      {/* Liste des entrées */}
      <FlatList
        data={displayedEntries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EntryCard entry={item} showCategory={!selectedCategory} />
        )}
        contentContainerStyle={styles.entriesList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📚</Text>
            <Text style={styles.emptyText}>
              {searchQuery
                ? `Aucun résultat pour "${searchQuery}"`
                : 'Sélectionnez une catégorie ou recherchez un mot'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    padding: spacing.md,
    paddingBottom: spacing.sm,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: fonts.sizes.md,
    color: colors.text,
    paddingVertical: spacing.md,
  },
  clearSearch: {
    fontSize: fonts.sizes.lg,
    color: colors.textSecondary,
    padding: spacing.xs,
  },
  categoriesContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  categoriesList: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.round,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: spacing.xs,
  },
  categoryName: {
    fontSize: fonts.sizes.sm,
    color: colors.text,
    fontWeight: '500',
  },
  categoryNameActive: {
    color: colors.textLight,
  },
  resultsHeader: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resultsCount: {
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
  },
  entriesList: {
    paddingVertical: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyText: {
    fontSize: fonts.sizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
