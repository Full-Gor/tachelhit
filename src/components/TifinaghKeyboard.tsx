import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { colors, borderRadius, spacing, fonts } from '../utils/theme';

interface TifinaghKeyboardProps {
  onCharacterPress: (char: string) => void;
  onBackspace: () => void;
  onSpace: () => void;
  visible: boolean;
}

const TIFINAGH_CHARACTERS = [
  ['ⴰ', 'ⴱ', 'ⴳ', 'ⴷ', 'ⴹ', 'ⴻ', 'ⴼ', 'ⴽ', 'ⵀ', 'ⵃ'],
  ['ⵄ', 'ⵅ', 'ⵇ', 'ⵉ', 'ⵊ', 'ⵍ', 'ⵎ', 'ⵏ', 'ⵓ', 'ⵔ'],
  ['ⵕ', 'ⵖ', 'ⵙ', 'ⵚ', 'ⵛ', 'ⵜ', 'ⵟ', 'ⵡ', 'ⵢ', 'ⵣ'],
  ['ⵥ', 'ⵯ'],
];

export default function TifinaghKeyboard({
  onCharacterPress,
  onBackspace,
  onSpace,
  visible,
}: TifinaghKeyboardProps) {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ⵜⵉⴼⵉⵏⴰⵖ</Text>
      </View>
      <ScrollView horizontal={false}>
        {TIFINAGH_CHARACTERS.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((char) => (
              <TouchableOpacity
                key={char}
                style={styles.key}
                onPress={() => onCharacterPress(char)}
                activeOpacity={0.7}
              >
                <Text style={styles.keyText}>{char}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.key, styles.specialKey]}
            onPress={onBackspace}
            activeOpacity={0.7}
          >
            <Text style={styles.specialKeyText}>⌫</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.key, styles.spaceKey]}
            onPress={onSpace}
            activeOpacity={0.7}
          >
            <Text style={styles.specialKeyText}>espace</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderTopWidth: 2,
    borderTopColor: colors.primary,
    paddingBottom: spacing.md,
  },
  header: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  headerText: {
    color: colors.textLight,
    fontSize: fonts.sizes.lg,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: spacing.xs,
    flexWrap: 'wrap',
  },
  key: {
    width: 36,
    height: 44,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  keyText: {
    fontSize: 22,
    color: colors.primary,
    fontWeight: '500',
  },
  specialKey: {
    width: 60,
    backgroundColor: colors.accent,
  },
  spaceKey: {
    width: 150,
    backgroundColor: colors.secondary,
  },
  specialKeyText: {
    fontSize: fonts.sizes.md,
    color: colors.textLight,
    fontWeight: 'bold',
  },
});
