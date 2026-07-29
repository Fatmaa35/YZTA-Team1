/**
 * Rounded chip with an icon + label used for allergen tags.
 */

import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Radius, Space } from '@/constants/tablodot-theme';
import { useSettings } from '@/context/SettingsContext';

interface Props {
  label: string;
  icon: string;
}

export default function AllergenChip({ label, icon }: Props) {
  const { colors } = useSettings();
  return (
    <View style={[styles.chip, { backgroundColor: colors.chip }]}>
      <Ionicons name={icon as any} size={18} color={colors.text} />
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.sm,
    borderRadius: Radius.md,
    paddingVertical: Space.sm,
    paddingHorizontal: Space.md,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
});
