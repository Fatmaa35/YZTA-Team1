import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GradientBackground from '@/components/GradientBackground';
import WeekPickerModal from '@/components/WeekPickerModal';
import { Radius, Space } from '@/constants/tablodot-theme';
import { useSettings } from '@/context/SettingsContext';
import { WeeklyMealItem, WeekMenu } from '@/data/mockData';
import { getMonthWeeks } from '@/services/mealService';
import type { TranslationKey } from '@/i18n/translations';

export default function WeeklyScreen() {
  const router = useRouter();
  const { colors, t } = useSettings();

  const [weeks, setWeeks] = useState<WeekMenu[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pickerVisible, setPickerVisible] = useState(false);

  useEffect(() => {
    getMonthWeeks().then((all) => {
      setWeeks(all);
      setSelectedId(all[0]?.id ?? null);
    });
  }, []);

  const selectedWeek = weeks.find((w) => w.id === selectedId) ?? null;

  function renderCard({ item }: { item: WeeklyMealItem }) {
    return (
      <Pressable
        onPress={() => router.push({ pathname: '/meal/[id]', params: { id: item.id } })}
        style={({ pressed }) => [
          styles.card,
          { backgroundColor: colors.card },
          pressed && { opacity: 0.7 },
        ]}>
        <Image source={{ uri: item.image }} style={styles.cardImage} contentFit="cover" />
        <View style={styles.cardInfo}>
          <Text style={[styles.day, { color: colors.primary }]}>
            {t(`day.${item.dayId}` as TranslationKey)}
          </Text>
          <Text style={[styles.mealName, { color: colors.text }]} numberOfLines={1}>
            {t(item.nameKey as TranslationKey)}
          </Text>
          <Text style={[styles.calories, { color: colors.textSecondary }]}>
            {item.nutrition.calories} {t('weekly.calorieUnit')}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
      </Pressable>
    );
  }

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <Text style={[styles.screenTitle, { color: colors.text }]}>
          {t('weekly.title')}
        </Text>

        <Pressable
          onPress={() => setPickerVisible(true)}
          style={[
            styles.datePicker,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}>
          <Text style={[styles.dateText, { color: colors.text }]}>
            {selectedWeek?.label ?? ''}
          </Text>
          <Ionicons name="calendar-outline" size={20} color={colors.text} />
        </Pressable>

        <FlatList
          data={selectedWeek?.items ?? []}
          keyExtractor={(item) => item.id}
          renderItem={renderCard}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />

        <WeekPickerModal
          visible={pickerVisible}
          weeks={weeks}
          selectedId={selectedId}
          onSelect={(id) => {
            setSelectedId(id);
            setPickerVisible(false);
          }}
          onClose={() => setPickerVisible(false)}
        />
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  screenTitle: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.5,
    marginTop: Space.sm,
    marginBottom: Space.lg,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Space.md,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: Radius.md,
    paddingHorizontal: Space.xl,
    paddingVertical: Space.md,
    marginBottom: Space.lg,
  },
  dateText: {
    fontSize: 15,
    fontWeight: '700',
  },
  list: {
    paddingHorizontal: Space.lg,
    paddingBottom: Space.xxl,
    gap: Space.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.md,
    borderRadius: Radius.lg,
    padding: Space.md,
  },
  cardImage: {
    width: 64,
    height: 64,
    borderRadius: Radius.md,
  },
  cardInfo: {
    flex: 1,
    gap: 2,
  },
  day: {
    fontSize: 13,
    fontWeight: '700',
  },
  mealName: {
    fontSize: 15,
    fontWeight: '600',
  },
  calories: {
    fontSize: 12,
  },
});
