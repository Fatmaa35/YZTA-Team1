import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GradientBackground from '@/components/GradientBackground';
import Logo from '@/components/Logo';
import Segmented from '@/components/Segmented';
import { Radius, Space } from '@/constants/tablodot-theme';
import { useAuth } from '@/context/AuthContext';
import { useDialog } from '@/context/DialogContext';
import { useSettings } from '@/context/SettingsContext';
import { Student } from '@/data/mockData';
import { Language, TranslationKey, translations } from '@/i18n/translations';
import { ThemeMode } from '@/constants/tablodot-theme';
import {
  addSensitivity,
  getProfile,
  getSensitivities,
  removeSensitivity,
} from '@/services/profileService';

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { colors, t, mode, setMode, language, setLanguage } = useSettings();
  const { confirm, alert } = useDialog();

  const [student, setStudent] = useState<Student | null>(null);
  const [sensitivities, setSensitivities] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');

  /** Seed items are allergen ids (localizable); custom items are shown verbatim. */
  function sensitivityLabel(item: string): string {
    const key = `allergen.${item}`;
    const dict = translations[language] as Record<string, string>;
    return dict[key] ?? item;
  }

  useEffect(() => {
    getProfile().then(setStudent);
    getSensitivities().then(setSensitivities);
  }, []);

  async function handleAdd() {
    const trimmed = newItem.trim();
    if (!trimmed) return;
    const exists = sensitivities.some(
      (s) => sensitivityLabel(s).toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      alert(t('profile.alreadyTitle'), `"${trimmed}"`, t('common.ok'));
      return;
    }
    setSensitivities((prev) => [...prev, trimmed]);
    setNewItem('');
    addSensitivity(trimmed).catch(() => {});
  }

  function handleRemove(name: string) {
    setSensitivities((prev) => prev.filter((s) => s !== name));
    removeSensitivity(name).catch(() => {});
  }

  async function handleLogout() {
    // Confirm before signing out; only sign out if the user approves.
    const ok = await confirm({
      title: t('profile.logoutConfirmTitle'),
      message: t('profile.logoutConfirmBody'),
      confirmText: t('profile.logout'),
      cancelText: t('profile.cancel'),
      destructive: true,
    });
    if (ok) signOut(); // auth guard redirects to /login
  }

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <Text style={[styles.screenTitle, { color: colors.text }]}>
            {t('profile.title')}
          </Text>

          {/* Header card with an accent gradient strip */}
          {student && (
            <View style={[styles.headerCard, { backgroundColor: colors.card }]}>
              <LinearGradient
                colors={[colors.primary, colors.nutrition]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.avatarRing}>
                <Image
                  source={{ uri: student.avatar }}
                  style={styles.avatar}
                  contentFit="cover"
                />
              </LinearGradient>
              <View style={styles.headerInfo}>
                <Text style={[styles.name, { color: colors.text }]}>
                  {student.fullName}
                </Text>
                <View style={styles.metaRow}>
                  <Ionicons name="id-card-outline" size={14} color={colors.textSecondary} />
                  <Text style={[styles.meta, { color: colors.textSecondary }]}>
                    {t('profile.studentNo')}: {student.studentNo}
                  </Text>
                </View>
                <View style={styles.metaRow}>
                  <Ionicons name="school-outline" size={14} color={colors.textSecondary} />
                  <Text style={[styles.meta, { color: colors.textSecondary }]}>
                    {t(student.departmentKey as TranslationKey)}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Preferences: theme + language */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('profile.preferences')}
          </Text>
          <View style={[styles.card, styles.cardPadded, { backgroundColor: colors.card }]}>
            <View style={styles.prefRow}>
              <View style={styles.prefLabel}>
                <Ionicons name="contrast-outline" size={18} color={colors.text} />
                <Text style={[styles.prefText, { color: colors.text }]}>
                  {t('profile.theme')}
                </Text>
              </View>
              <Segmented<ThemeMode>
                value={mode}
                onChange={setMode}
                options={[
                  { value: 'dark', label: t('profile.themeDark'), icon: 'moon' },
                  { value: 'light', label: t('profile.themeLight'), icon: 'sunny' },
                ]}
              />
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.prefRow}>
              <View style={styles.prefLabel}>
                <Ionicons name="language-outline" size={18} color={colors.text} />
                <Text style={[styles.prefText, { color: colors.text }]}>
                  {t('profile.language')}
                </Text>
              </View>
              <Segmented<Language>
                value={language}
                onChange={setLanguage}
                options={[
                  { value: 'tr', label: 'TR' },
                  { value: 'en', label: 'EN' },
                ]}
              />
            </View>
          </View>

          {/* Sensitivities */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('profile.sensitivities')}
          </Text>
          <View style={[styles.card, styles.cardPaddedH, { backgroundColor: colors.card }]}>
            {sensitivities.length === 0 ? (
              <Text style={[styles.empty, { color: colors.textMuted }]}>
                {t('profile.emptySensitivities')}
              </Text>
            ) : (
              sensitivities.map((item, index) => (
                <View
                  key={item}
                  style={[
                    styles.sensitivityRow,
                    index < sensitivities.length - 1 && {
                      borderBottomWidth: 0.5,
                      borderBottomColor: colors.border,
                    },
                  ]}>
                  <View style={styles.sensitivityLeft}>
                    <View style={[styles.dot, { backgroundColor: colors.primary }]} />
                    <Text style={[styles.sensitivityText, { color: colors.text }]}>
                      {sensitivityLabel(item)}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => handleRemove(item)}
                    hitSlop={8}
                    style={[styles.removeBtn, { backgroundColor: colors.chip }]}>
                    <Ionicons name="close" size={16} color={colors.textSecondary} />
                  </Pressable>
                </View>
              ))
            )}
          </View>

          {/* Add new */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('profile.addNew')}
          </Text>
          <View style={styles.addRow}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.inputBg,
                  borderColor: colors.border,
                  color: colors.text,
                },
              ]}
              placeholder={t('profile.addPlaceholder')}
              placeholderTextColor={colors.textMuted}
              value={newItem}
              onChangeText={setNewItem}
              onSubmitEditing={handleAdd}
              returnKeyType="done"
            />
            <Pressable
              onPress={handleAdd}
              style={[styles.addBtn, { backgroundColor: colors.primary }]}>
              <Text style={[styles.addBtnText, { color: colors.textOnAccent }]}>
                {t('profile.add')}
              </Text>
            </Pressable>
          </View>

          {/* Logout */}
          <Pressable
            onPress={handleLogout}
            style={[styles.logout, { borderColor: colors.danger }]}>
            <Ionicons name="log-out-outline" size={18} color={colors.danger} />
            <Text style={[styles.logoutText, { color: colors.danger }]}>
              {t('profile.logout')}
            </Text>
          </Pressable>

          {/* Small theme-aware logo under logout */}
          <View style={styles.footerLogo}>
            <Logo variant="auto" size={96} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    paddingHorizontal: Space.xl,
    paddingBottom: Space.xxl,
    gap: Space.md,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.5,
    marginTop: Space.sm,
    marginBottom: Space.sm,
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.lg,
    borderRadius: Radius.xl,
    padding: Space.lg,
  },
  avatarRing: {
    width: 76,
    height: 76,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: Radius.pill,
  },
  headerInfo: {
    flex: 1,
    gap: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  meta: {
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: Space.sm,
  },
  card: {
    borderRadius: Radius.lg,
  },
  cardPadded: {
    padding: Space.lg,
    gap: Space.md,
  },
  cardPaddedH: {
    paddingHorizontal: Space.lg,
  },
  prefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  prefLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.sm,
  },
  prefText: {
    fontSize: 15,
    fontWeight: '600',
  },
  divider: {
    height: 0.5,
  },
  empty: {
    fontSize: 14,
    paddingVertical: Space.lg,
  },
  sensitivityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Space.md,
  },
  sensitivityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  sensitivityText: {
    fontSize: 15,
  },
  removeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addRow: {
    flexDirection: 'row',
    gap: Space.md,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: Radius.md,
    paddingHorizontal: Space.lg,
    paddingVertical: Space.md,
    fontSize: 14,
    minHeight: 48,
  },
  addBtn: {
    borderRadius: Radius.md,
    paddingHorizontal: Space.lg,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    fontWeight: '800',
    fontSize: 14,
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Space.sm,
    borderWidth: 1,
    borderRadius: Radius.pill,
    paddingVertical: Space.md,
    marginTop: Space.lg,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
  },
  footerLogo: {
    alignItems: 'center',
    marginTop: Space.sm,
    opacity: 0.9,
  },
});
