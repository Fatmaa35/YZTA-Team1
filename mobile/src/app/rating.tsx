import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GradientBackground from '@/components/GradientBackground';
import PrimaryButton from '@/components/PrimaryButton';
import StarRating from '@/components/StarRating';
import ThumbToggle from '@/components/ThumbToggle';
import { Radius, Space } from '@/constants/tablodot-theme';
import { useDialog } from '@/context/DialogContext';
import { useSettings } from '@/context/SettingsContext';
import { Meal } from '@/data/mockData';
import type { TranslationKey } from '@/i18n/translations';
import { getMealById, getTodayMeal, submitRating } from '@/services/mealService';

export default function RatingScreen() {
  const router = useRouter();
  const { colors, t } = useSettings();
  const { toast, alert } = useDialog();
  const { mealId } = useLocalSearchParams<{ mealId?: string }>();

  const [meal, setMeal] = useState<Meal | null>(null);
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState('');
  const [taste, setTaste] = useState<boolean | null>(null);
  const [temperature, setTemperature] = useState<boolean | null>(null);
  const [portion, setPortion] = useState<boolean | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = mealId ? getMealById(mealId) : getTodayMeal();
    Promise.resolve(load).then((m) => setMeal(m));
  }, [mealId]);

  async function handleSubmit() {
    if (stars === 0) {
      await alert(t('rating.missingTitle'), t('rating.missingBody'), t('common.ok'));
      return;
    }
    setSubmitting(true);
    try {
      await submitRating({
        mealId: mealId ?? meal?.id ?? 'unknown',
        stars,
        comment,
        taste,
        temperature,
        portion,
      });
      // Toast feedback, then return to the previous (Today) screen.
      toast(t('rating.sentToast'));
      router.back();
    } catch {
      await alert(t('rating.errorTitle'), t('rating.errorBody'), t('common.ok'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={10} style={styles.back}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            {t('rating.title')}
          </Text>
          <View style={styles.back} />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.flex}>
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            {meal && (
              <>
                <Image
                  source={{ uri: meal.image }}
                  style={styles.thumb}
                  contentFit="cover"
                />
                <Text style={[styles.mealName, { color: colors.text }]}>
                  {t(meal.nameKey as TranslationKey)}
                </Text>
              </>
            )}

            <StarRating value={stars} onChange={setStars} />

            <TextInput
              style={[
                styles.textArea,
                {
                  backgroundColor: colors.inputBg,
                  borderColor: colors.border,
                  color: colors.text,
                },
              ]}
              placeholder={t('rating.commentPlaceholder')}
              placeholderTextColor={colors.textMuted}
              multiline
              textAlignVertical="top"
              value={comment}
              onChangeText={setComment}
            />

            <View style={styles.thumbRow}>
              <ThumbToggle label={t('rating.taste')} value={taste} onChange={setTaste} />
              <ThumbToggle
                label={t('rating.temperature')}
                value={temperature}
                onChange={setTemperature}
              />
              <ThumbToggle
                label={t('rating.portion')}
                value={portion}
                onChange={setPortion}
              />
            </View>

            <PrimaryButton
              label={t('rating.submit')}
              onPress={handleSubmit}
              loading={submitting}
              style={styles.submit}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Space.lg,
    paddingVertical: Space.md,
  },
  back: { width: 32 },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  content: {
    paddingHorizontal: Space.xl,
    paddingBottom: Space.xxl,
    alignItems: 'center',
    gap: Space.lg,
  },
  thumb: {
    width: 96,
    height: 96,
    borderRadius: Radius.pill,
    marginTop: Space.sm,
  },
  mealName: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  textArea: {
    alignSelf: 'stretch',
    minHeight: 140,
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: Space.lg,
    fontSize: 15,
  },
  thumbRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    marginTop: Space.sm,
  },
  submit: {
    alignSelf: 'stretch',
    marginTop: Space.md,
  },
});
