import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, borderRadius, spacing, fonts } from '../utils/theme';
import { useApp } from '../context/AppContext';
import EntryCard from '../components/EntryCard';
import AmazighHeader from '../components/AmazighHeader';

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
    <SafeAreaView style={styles.container} edges={['top']}>
      <AmazighHeader
        title="Imuzar"
        subtitle="Favoris & Historique"
      />

      <FlatList
        data={[]}
        keyExtractor={() => 'main'}
        renderItem={null}
        ListHeaderComponent={
          <>
            {/* Section Favoris */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>★ Mes Favoris</Text>
                <Text style={styles.sectionCount}>{favoriteEntries.length}</Text>
              </View>

              {favoriteEntries.length > 0 ? (
                favoriteEntries.map(entry => (
                  <EntryCard key={entry.id} entry={entry} showCategory />
                ))
              ) : (
                <View style={styles.emptySection}>
                  <Text style={styles.emptyIcon}>☆</Text>
                  <Text style={styles.emptyText}>
                    Aucun favori pour l'instant.{'\n'}
                    Appuyez sur ★ dans le dictionnaire pour ajouter des favoris.
                  </Text>
                </View>
              )}
            </View>

            {/* Section Historique */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>🕐 Historique</Text>
                {history.length > 0 && (
                  <TouchableOpacity onPress={handleClearHistory}>
                    <Text style={styles.clearButton}>Effacer</Text>
                  </TouchableOpacity>
                )}
              </View>

              {history.length > 0 ? (
                history.map(item => (
                  <View key={item.id} style={styles.historyItem}>
                    <View style={styles.historyContent}>
                      <Text style={styles.historySource}>{item.sourceText}</Text>
                      <Text style={styles.historyArrow}>→</Text>
                      <Text style={styles.historyTranslation}>{item.translatedText}</Text>
                    </View>
                    <Text style={styles.historyDate}>{formatDate(item.timestamp)}</Text>
                  </View>
                ))
              ) : (
                <View style={styles.emptySection}>
                  <Text style={styles.emptyIcon}>📝</Text>
                  <Text style={styles.emptyText}>
                    Aucune traduction dans l'historique.{'\n'}
                    Vos traductions apparaîtront ici.
                  </Text>
                </View>
              )}
            </View>
          </>
        }
        contentContainerStyle={styles.content}
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
    paddingBottom: spacing.xxl,
  },
  section: {
    marginTop: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: fonts.sizes.xl,
    fontWeight: 'bold',
    color: colors.text,
  },
  sectionCount: {
    fontSize: fonts.sizes.md,
    color: colors.primary,
    fontWeight: 'bold',
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    borderWidth: 1,
    borderColor: colors.primary,
    overflow: 'hidden',
  },
  clearButton: {
    fontSize: fonts.sizes.md,
    color: colors.error,
    fontWeight: '600',
  },
  emptySection: {
    alignItems: 'center',
    padding: spacing.xl,
    marginHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: spacing.md,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: fonts.sizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  historyItem: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  historyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  historySource: {
    fontSize: fonts.sizes.md,
    color: colors.text,
    fontWeight: '500',
  },
  historyArrow: {
    fontSize: fonts.sizes.md,
    color: colors.primary,
    marginHorizontal: spacing.sm,
  },
  historyTranslation: {
    fontSize: fonts.sizes.md,
    color: colors.secondary,
    fontWeight: '500',
  },
  historyDate: {
    fontSize: fonts.sizes.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
