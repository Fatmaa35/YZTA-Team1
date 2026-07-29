/**
 * Single yellow nutrition tile (Kalori / Karbonhidrat / Protein / Yağ).
 */

import { StyleSheet, Text, View } from 'react-native';

import { Radius, Space } from '@/constants/tablodot-theme';
import { useSettings } from '@/context/SettingsContext';

interface Props {
  label: string;
  value: number | string;
}

export default function NutritionBox({ label, value }: Props) {
  const { colors } = useSettings();
  return (
    <View style={[styles.box, { backgroundColor: colors.nutrition }]}>
      <Text style={[styles.label, { color: colors.textOnAccent }]} numberOfLines={1}>
        {label}
      </Text>
      <Text style={[styles.value, { color: colors.textOnAccent }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    borderRadius: Radius.md,
    paddingVertical: Space.sm,
    paddingHorizontal: Space.xs,
    alignItems: 'center',
    gap: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
  },
  value: {
    fontSize: 16,
    fontWeight: '800',
  },
});
