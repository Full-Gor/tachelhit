import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, borderRadius, spacing, fonts } from '../utils/theme';
import { useApp } from '../context/AppContext';
import AmazighHeader from '../components/AmazighHeader';

interface AlphabetLetter {
  char: string;
  latin: string;
  name: string;
  phonetic: string;
}

export default function LearnScreen() {
  const { alphabet } = useApp();
  const [selectedLetter, setSelectedLetter] = useState<AlphabetLetter | null>(null);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AmazighHeader
        title="Almad"
        subtitle="Apprendre le Tifinagh"
      />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Introduction */}
        <View style={styles.introCard}>
          <Text style={styles.introTitle}>ⵜⵉⴼⵉⵏⴰⵖ - Tifinagh</Text>
          <Text style={styles.introText}>
            Le Tifinagh est l'alphabet traditionnel des Amazighs (Berbères).
            Cette écriture millénaire est aujourd'hui utilisée pour écrire le
            Tachelhit et les autres langues amazighes au Maroc.
          </Text>
        </View>

        {/* Grille de l'alphabet */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>L'Alphabet Tifinagh</Text>
          <Text style={styles.sectionSubtitle}>
            Appuyez sur une lettre pour voir sa prononciation
          </Text>
        </View>

        <View style={styles.alphabetGrid}>
          {alphabet.map((letter, index) => (
            <TouchableOpacity
              key={index}
              style={styles.letterCard}
              onPress={() => setSelectedLetter(letter)}
              activeOpacity={0.7}
            >
              <Text style={styles.letterChar}>{letter.char}</Text>
              <Text style={styles.letterLatin}>{letter.latin}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Règles de prononciation */}
        <View style={styles.rulesCard}>
          <Text style={styles.rulesTitle}>📢 Prononciation du Souss</Text>

          <View style={styles.ruleItem}>
            <Text style={styles.ruleHighlight}>ⵖ (gh)</Text>
            <Text style={styles.ruleText}>
              Son "r" grasseyé, comme le "r" parisien
            </Text>
          </View>

          <View style={styles.ruleItem}>
            <Text style={styles.ruleHighlight}>ⵅ (x/kh)</Text>
            <Text style={styles.ruleText}>
              Son guttural, comme "ch" allemand dans "Bach"
            </Text>
          </View>

          <View style={styles.ruleItem}>
            <Text style={styles.ruleHighlight}>ⵄ (ɛ)</Text>
            <Text style={styles.ruleText}>
              Le "ayn" arabe, son pharyngal
            </Text>
          </View>

          <View style={styles.ruleItem}>
            <Text style={styles.ruleHighlight}>ⵟ, ⴹ, ⵚ, ⵥ</Text>
            <Text style={styles.ruleText}>
              Consonnes emphatiques (prononcées avec la langue en arrière)
            </Text>
          </View>
        </View>

        {/* Particularités du Souss */}
        <View style={styles.soussCard}>
          <Text style={styles.soussTitle}>📍 Le Tachelhit du Souss</Text>

          <Text style={styles.soussText}>
            Le Tachelhit (ⵜⴰⵛⵍⵃⵉⵜ) est la langue amazighe parlée dans la région
            du Souss-Massa au sud-ouest du Maroc, notamment autour d'Agadir,
            Taroudant et Tiznit.
          </Text>

          <View style={styles.soussFeature}>
            <Text style={styles.featureTitle}>Particularités régionales :</Text>
            <Text style={styles.featureItem}>• Vocabulaire lié à l'arganier et l'agriculture</Text>
            <Text style={styles.featureItem}>• Expressions et proverbes uniques</Text>
            <Text style={styles.featureItem}>• Prononciation douce des consonnes</Text>
            <Text style={styles.featureItem}>• Riche tradition orale et poétique</Text>
          </View>
        </View>

        {/* Nombres */}
        <View style={styles.numbersCard}>
          <Text style={styles.numbersTitle}>🔢 Les Nombres</Text>
          <View style={styles.numbersGrid}>
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
              <View key={index} style={styles.numberItem}>
                <Text style={styles.numberValue}>{item.val}</Text>
                <Text style={styles.numberTifinagh}>{item.num}</Text>
                <Text style={styles.numberLatin}>{item.latin}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Modal détail lettre */}
      <Modal
        visible={selectedLetter !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedLetter(null)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedLetter(null)}
        >
          <View style={styles.letterModal}>
            <Text style={styles.modalChar}>{selectedLetter?.char}</Text>
            <Text style={styles.modalLatin}>{selectedLetter?.latin}</Text>
            <View style={styles.modalInfo}>
              <Text style={styles.modalLabel}>Nom:</Text>
              <Text style={styles.modalValue}>{selectedLetter?.name}</Text>
            </View>
            <View style={styles.modalInfo}>
              <Text style={styles.modalLabel}>Prononciation:</Text>
              <Text style={styles.modalValue}>{selectedLetter?.phonetic}</Text>
            </View>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setSelectedLetter(null)}
            >
              <Text style={styles.modalCloseText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
  contentContainer: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  introCard: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  introTitle: {
    fontSize: fonts.sizes.xxl,
    fontWeight: 'bold',
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  introText: {
    fontSize: fonts.sizes.md,
    color: colors.textLight,
    lineHeight: 24,
    textAlign: 'center',
    opacity: 0.9,
  },
  sectionHeader: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fonts.sizes.xl,
    fontWeight: 'bold',
    color: colors.text,
  },
  sectionSubtitle: {
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  alphabetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  letterCard: {
    width: 60,
    height: 70,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  letterChar: {
    fontSize: 28,
    color: colors.primary,
    fontWeight: 'bold',
  },
  letterLatin: {
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  rulesCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.tertiary,
  },
  rulesTitle: {
    fontSize: fonts.sizes.lg,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  ruleHighlight: {
    fontSize: fonts.sizes.lg,
    color: colors.primary,
    fontWeight: 'bold',
    width: 80,
  },
  ruleText: {
    flex: 1,
    fontSize: fonts.sizes.md,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  soussCard: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  soussTitle: {
    fontSize: fonts.sizes.lg,
    fontWeight: 'bold',
    color: colors.textLight,
    marginBottom: spacing.sm,
  },
  soussText: {
    fontSize: fonts.sizes.md,
    color: colors.textLight,
    lineHeight: 24,
    opacity: 0.9,
    marginBottom: spacing.md,
  },
  soussFeature: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  featureTitle: {
    fontSize: fonts.sizes.md,
    fontWeight: 'bold',
    color: colors.textLight,
    marginBottom: spacing.sm,
  },
  featureItem: {
    fontSize: fonts.sizes.sm,
    color: colors.textLight,
    opacity: 0.9,
    marginBottom: 4,
  },
  numbersCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  numbersTitle: {
    fontSize: fonts.sizes.lg,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  numbersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  numberItem: {
    width: 60,
    alignItems: 'center',
    margin: spacing.sm,
    padding: spacing.sm,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
  },
  numberValue: {
    fontSize: fonts.sizes.lg,
    fontWeight: 'bold',
    color: colors.primary,
  },
  numberTifinagh: {
    fontSize: fonts.sizes.lg,
    color: colors.text,
    marginTop: 2,
  },
  numberLatin: {
    fontSize: fonts.sizes.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterModal: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    minWidth: 200,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  modalChar: {
    fontSize: 72,
    color: colors.primary,
    fontWeight: 'bold',
  },
  modalLatin: {
    fontSize: fonts.sizes.xxl,
    color: colors.accent,
    marginTop: spacing.xs,
  },
  modalInfo: {
    flexDirection: 'row',
    marginTop: spacing.md,
    alignItems: 'center',
  },
  modalLabel: {
    fontSize: fonts.sizes.md,
    color: colors.textSecondary,
    marginRight: spacing.sm,
  },
  modalValue: {
    fontSize: fonts.sizes.md,
    color: colors.text,
    fontWeight: '600',
  },
  modalClose: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
  },
  modalCloseText: {
    color: colors.textLight,
    fontSize: fonts.sizes.md,
    fontWeight: 'bold',
  },
});
