import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, Pressable } from 'react-native';

import { AppProvider } from './src/context/AppContext';
import { colors, shadows } from './src/utils/theme';

import TranslateScreen from './src/screens/TranslateScreen';
import DictionaryScreen from './src/screens/DictionaryScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import LearnScreen from './src/screens/LearnScreen';

const Tab = createBottomTabNavigator();

function TabIcon({ label, icon, focused }: { label: string; icon: string; focused: boolean }) {
  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 8,
    }}>
      <View style={{
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: focused ? colors.primary : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        ...(focused ? {
          ...shadows.glow(colors.primary),
        } : {}),
      }}>
        <Text style={{
          fontSize: 22,
          opacity: focused ? 1 : 0.5,
        }}>
          {icon}
        </Text>
      </View>
      <Text style={{
        fontSize: 10,
        color: focused ? colors.textPrimary : colors.textMuted,
        marginTop: 4,
        fontWeight: focused ? '600' : '400',
      }}>
        {label}
      </Text>
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
              tabBarStyle: {
                backgroundColor: colors.backgroundMid,
                borderTopWidth: 1,
                borderTopColor: colors.glassBorder,
                height: 80,
                paddingBottom: 12,
                paddingTop: 4,
                ...shadows.glass,
              },
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
