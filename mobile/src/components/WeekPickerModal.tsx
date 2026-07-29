/**
 * Mini calendar that lists the weeks of the (temp) current month. Tapping a week
 * selects it; the weekly screen then lists that week's menu.
 */

import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { Radius, Space } from '@/constants/tablodot-theme';
import { useSettings } from '@/context/SettingsContext';
import { WeekMenu } from '@/data/mockData';

interface Props {
  visible: boolean;
  weeks: WeekMenu[];
  selectedId: string | null;
  onSelect: (weekId: string) => void;
  onClose: () => void;
}

const WEEKDAY_LABELS = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu'];

export default function WeekPickerModal({
  visible,
  weeks,
  selectedId,
  onSelect,
  onClose,
}: Props) {
  const { colors, t } = useSettings();
  const monthLabel = weeks[0]?.monthLabel ?? '';

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable
          style={[styles.sheet, { backgroundColor: colors.cardSolid }]}
          onPress={(e) => e.stopPropagation()}>
          <View style={styles.headerRow}>
            <Text style={[styles.month, { color: colors.text }]}>{monthLabel}</Text>
            <Pressable onPress={onClose} hitSlop={8}>
              <Ionicons name="close" size={22} color={colors.textSecondary} />
            </Pressable>
          </View>

          <Text style={[styles.hint, { color: colors.textSecondary }]}>
            {t('weekly.pickWeek')}
          </Text>

          {/* Weekday header */}
          <View style={styles.weekdayHeader}>
            {WEEKDAY_LABELS.map((d) => (
              <Text
                key={d}
                style={[styles.weekdayLabel, { color: colors.textMuted }]}>
                {d}
              </Text>
            ))}
          </View>

          {weeks.map((week, index) => {
            const selected = week.id === selectedId;
            // Mon–Fri date numbers for this week.
            const days = Array.from({ length: 5 }, (_, i) => week.range.start + i);
            return (
              <Pressable
                key={week.id}
                onPress={() => onSelect(week.id)}
                style={[
                  styles.weekRow,
                  { borderColor: colors.border },
                  selected && { backgroundColor: colors.primary, borderColor: colors.primary },
                ]}>
                <View style={styles.daysRow}>
                  {days.map((d) => (
                    <Text
                      key={d}
                      style={[
                        styles.dayNum,
                        { color: selected ? colors.textOnAccent : colors.text },
                      ]}>
                      {d}
                    </Text>
                  ))}
                </View>
                <Text
                  style={[
                    styles.weekLabel,
                    { color: selected ? colors.textOnAccent : colors.textSecondary },
                  ]}>
                  {t('weekly.week')} {index + 1}
                </Text>
              </Pressable>
            );
          })}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: Space.xl,
  },
  sheet: {
    borderRadius: Radius.lg,
    padding: Space.lg,
    gap: Space.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  month: {
    fontSize: 18,
    fontWeight: '800',
  },
  hint: {
    fontSize: 13,
    marginTop: -Space.xs,
  },
  weekdayHeader: {
    flexDirection: 'row',
    paddingHorizontal: Space.sm,
  },
  weekdayLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
  },
  weekRow: {
    borderWidth: 1,
    borderRadius: Radius.md,
    paddingVertical: Space.md,
    paddingHorizontal: Space.sm,
    gap: 4,
  },
  daysRow: {
    flexDirection: 'row',
  },
  dayNum: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
  },
  weekLabel: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
  },
});
