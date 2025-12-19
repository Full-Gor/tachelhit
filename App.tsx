import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';

import { AppProvider } from './src/context/AppContext';
import { colors } from './src/utils/theme';

import TranslateScreen from './src/screens/TranslateScreen';
import DictionaryScreen from './src/screens/DictionaryScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import LearnScreen from './src/screens/LearnScreen';

const Tab = createBottomTabNavigator();

function TabIcon({ label, icon, focused }: { label: string; icon: string; focused: boolean }) {
  return (
    <View style={styles.tabIcon}>
      <Text style={[styles.tabEmoji, focused && styles.tabEmojiActive]}>{icon}</Text>
      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>{label}</Text>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: styles.tabBar,
              tabBarShowLabel: false,
            }}
          >
            <Tab.Screen
              name="Translate"
              component={TranslateScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <TabIcon label="Traduire" icon="🔄" focused={focused} />
                ),
              }}
            />
            <Tab.Screen
              name="Dictionary"
              component={DictionaryScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <TabIcon label="Amawal" icon="📚" focused={focused} />
                ),
              }}
            />
            <Tab.Screen
              name="Favorites"
              component={FavoritesScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <TabIcon label="Favoris" icon="⭐" focused={focused} />
                ),
              }}
            />
            <Tab.Screen
              name="Learn"
              component={LearnScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <TabIcon label="Almad" icon="📖" focused={focused} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="light" />
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopWidth: 2,
    borderTopColor: colors.primary,
    height: 70,
    paddingBottom: 8,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabEmoji: {
    fontSize: 24,
    opacity: 0.6,
  },
  tabEmojiActive: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});
