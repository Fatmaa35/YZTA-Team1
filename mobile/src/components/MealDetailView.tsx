/**
 * Shared meal detail layout: hero image, title, nutrition macros, description and
 * allergen chips. Used by the Today tab (with the rating CTA) and by the weekly
 * meal detail screen (without it) via the `onRate` prop.
 */

import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import AllergenChip from '@/components/AllergenChip';
import NutritionBox from '@/components/NutritionBox';
import PrimaryButton from '@/components/PrimaryButton';
import { Radius, Space } from '@/constants/tablodot-theme';
import { useSettings } from '@/context/SettingsContext';
import { Meal } from '@/data/mockData';
import type { TranslationKey } from '@/i18n/translations';

interface Props {
  meal: Meal;
  /** When provided, a "Değerlendir" button is shown at the bottom. */
  onRate?: () => void;
}

export default function MealDetailView({ meal, onRate }: Props) {
  const { colors, t } = useSettings();

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <Image source={{ uri: meal.image }} style={styles.hero} contentFit="cover" />

      <Text style={[styles.title, { color: colors.text }]}>
        {t(meal.nameKey as TranslationKey)}
      </Text>

      <View style={styles.nutritionRow}>
        <NutritionBox label={t('nutrition.calories')} value={meal.nutrition.calories} />
        <NutritionBox label={t('nutrition.carbs')} value={meal.nutrition.carbs} />
        <NutritionBox label={t('nutrition.protein')} value={meal.nutrition.protein} />
        <NutritionBox label={t('nutrition.fat')} value={meal.nutrition.fat} />
      </View>

      <Text style={[styles.description, { color: colors.textSecondary }]}>
        {t('meal.description')}
      </Text>

      <Text style={[styles.sectionLabel, { color: colors.text }]}>
        {t('meal.allergensTitle')}
      </Text>
      <View style={styles.allergenRow}>
        {meal.allergens.map((a) => (
          <AllergenChip
            key={a.id}
            label={t(`allergen.${a.id}` as TranslationKey)}
            icon={a.icon}
          />
        ))}
      </View>

      {onRate && (
        <PrimaryButton label={t('meal.rate')} onPress={onRate} style={styles.rateBtn} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Space.xl,
    paddingBottom: Space.xxl,
    gap: Space.lg,
  },
  hero: {
    width: '100%',
    height: 220,
    borderRadius: Radius.lg,
    marginTop: Space.sm,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
  },
  nutritionRow: {
    flexDirection: 'row',
    gap: Space.sm,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '700',
  },
  allergenRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Space.sm,
  },
  rateBtn: {
    marginTop: Space.md,
  },
});
