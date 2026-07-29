import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GradientBackground from '@/components/GradientBackground';
import MealDetailView from '@/components/MealDetailView';
import { useSettings } from '@/context/SettingsContext';
import { Meal } from '@/data/mockData';
import { getTodayMeal } from '@/services/mealService';

export default function TodayScreen() {
  const router = useRouter();
  const { colors } = useSettings();
  const [meal, setMeal] = useState<Meal | null>(null);

  useEffect(() => {
    // Swappable for a real API call — shape stays identical.
    getTodayMeal().then(setMeal);
  }, []);

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safe} edges={['top']}>
        {!meal ? (
          <View style={styles.loading}>
            <ActivityIndicator color={colors.primary} size="large" />
          </View>
        ) : (
          <MealDetailView
            meal={meal}
            onRate={() =>
              router.push({ pathname: '/rating', params: { mealId: meal.id } })
            }
          />
        )}
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
