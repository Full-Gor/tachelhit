import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../utils/theme';

interface AmazighHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AmazighHeader({ title, subtitle }: AmazighHeaderProps) {
  return (
    <View style={{
      paddingVertical: 20,
      paddingHorizontal: 20,
      alignItems: 'center',
    }}>
      {/* Pattern top */}
      <View style={{ marginBottom: 10 }}>
        <Text style={{
          color: colors.tertiary,
          fontSize: 12,
          letterSpacing: 6,
          opacity: 0.6,
        }}>
          ◇ ✦ ◇ ✦ ◇ ✦ ◇ ✦ ◇
        </Text>
      </View>

      <Text style={{
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.textPrimary,
        textAlign: 'center',
      }}>
        {title}
      </Text>

      {subtitle && (
        <Text style={{
          fontSize: 14,
          color: colors.textSecondary,
          marginTop: 6,
          textAlign: 'center',
        }}>
          {subtitle}
        </Text>
      )}

      {/* Pattern bottom */}
      <View style={{ marginTop: 10 }}>
        <Text style={{
          color: colors.tertiary,
          fontSize: 12,
          letterSpacing: 6,
          opacity: 0.6,
        }}>
          △ ◯ △ ◯ △ ◯ △ ◯ △
        </Text>
      </View>
    </View>
  );
}
