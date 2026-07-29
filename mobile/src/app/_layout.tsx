import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider, useAuth } from '@/context/AuthContext';
import { DialogProvider } from '@/context/DialogContext';
import { SettingsProvider, useSettings } from '@/context/SettingsContext';

SplashScreen.hideAsync();

/**
 * Redirects between the auth screen and the protected tabs based on session.
 * This is the standard expo-router auth-guard pattern.
 */
function useProtectedRoute() {
  const { student } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === 'login';

    if (!student && !inAuthGroup) {
      router.replace('/login');
    } else if (student && inAuthGroup) {
      router.replace('/(tabs)/today');
    }
  }, [student, segments, router]);
}

function RootNavigator() {
  useProtectedRoute();
  const { colors, isDark } = useSettings();

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.screenBg },
        }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="meal/[id]" />
        <Stack.Screen
          name="rating"
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SettingsProvider>
          <DialogProvider>
            <AuthProvider>
              <RootNavigator />
            </AuthProvider>
          </DialogProvider>
        </SettingsProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
