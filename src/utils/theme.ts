// Thème Glassmorphisme Dark - Inspiré des maquettes UI/UX
export const colors = {
  // Fond sombre avec dégradé
  backgroundDark: '#0d0d1a',
  backgroundMid: '#1a1a2e',
  backgroundLight: '#16213e',

  // Couleurs principales Amazigh
  primary: '#c41e3a',
  primaryLight: '#e63950',
  secondary: '#1e5631',
  tertiary: '#d4a017',

  // Glassmorphisme
  glass: 'rgba(255, 255, 255, 0.06)',
  glassMedium: 'rgba(255, 255, 255, 0.1)',
  glassBorder: 'rgba(255, 255, 255, 0.12)',
  glassHighlight: 'rgba(255, 255, 255, 0.2)',

  // Boutons colorés (style maquette)
  buttonBlue: '#4a90d9',
  buttonBlueLight: '#6ba3e3',
  buttonPurple: '#8b5cf6',
  buttonPurpleLight: '#a78bfa',
  buttonOrange: '#f59e0b',
  buttonOrangeLight: '#fbbf24',
  buttonPink: '#ec4899',
  buttonPinkLight: '#f472b6',
  buttonGreen: '#10b981',
  buttonGreenLight: '#34d399',
  buttonCyan: '#06b6d4',
  buttonCyanLight: '#22d3ee',

  // Texte
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textMuted: 'rgba(255, 255, 255, 0.4)',
  textLight: '#ffffff',

  // Neumorphisme sombre
  neuDark: '#0a0a14',
  neuLight: '#24243a',

  // États
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',

  // Legacy (pour compatibilité)
  background: '#0d0d1a',
  surface: 'rgba(255, 255, 255, 0.06)',
  card: 'rgba(255, 255, 255, 0.08)',
  text: '#ffffff',
  border: 'rgba(255, 255, 255, 0.12)',
  tifinagh: '#c41e3a',
  accent: '#d4a017',
  accentLight: '#f59e0b',
  borderDark: 'rgba(255, 255, 255, 0.2)',
};

export const shadows = {
  glass: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  neuInset: {
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  }),
};

export const fonts = {
  family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  sizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 24,
    title: 28,
    hero: 36,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 50,
  round: 999,
};

// Motifs berbères du Sud (pour décoration)
export const amazighPatterns = {
  diamond: '◇',
  cross: '✦',
  zigzag: '⦚',
  triangle: '△',
  circle: '◯',
};
