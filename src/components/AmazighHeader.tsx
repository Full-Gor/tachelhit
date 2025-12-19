import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fonts } from '../utils/theme';

interface AmazighHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AmazighHeader({ title, subtitle }: AmazighHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.patternTop}>
        <Text style={styles.pattern}>◇ ✦ ◇ ✦ ◇ ✦ ◇ ✦ ◇ ✦ ◇</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      <View style={styles.patternBottom}>
        <Text style={styles.pattern}>△ ◯ △ ◯ △ ◯ △ ◯ △ ◯ △</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
  },
  patternTop: {
    marginBottom: spacing.sm,
  },
  patternBottom: {
    marginTop: spacing.sm,
  },
  pattern: {
    color: colors.tertiary,
    fontSize: fonts.sizes.sm,
    letterSpacing: 4,
  },
  title: {
    fontSize: fonts.sizes.title,
    fontWeight: 'bold',
    color: colors.textLight,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fonts.sizes.md,
    color: colors.tertiary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
});
