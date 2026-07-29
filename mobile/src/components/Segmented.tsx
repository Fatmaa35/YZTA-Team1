/**
 * Small two/three-option segmented control used for theme & language switches.
 */

import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Radius, Space } from '@/constants/tablodot-theme';
import { useSettings } from '@/context/SettingsContext';

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
  icon?: string;
}

interface Props<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export default function Segmented<T extends string>({
  options,
  value,
  onChange,
}: Props<T>) {
  const { colors } = useSettings();
  return (
    <View style={[styles.track, { backgroundColor: colors.chip }]}>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            style={[
              styles.segment,
              active && { backgroundColor: colors.primary },
            ]}>
            {opt.icon && (
              <Ionicons
                name={opt.icon as any}
                size={15}
                color={active ? colors.textOnAccent : colors.textSecondary}
              />
            )}
            <Text
              style={[
                styles.label,
                { color: active ? colors.textOnAccent : colors.textSecondary },
              ]}>
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    borderRadius: Radius.pill,
    padding: 3,
    gap: 3,
  },
  segment: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: Space.sm,
    paddingHorizontal: Space.md,
    borderRadius: Radius.pill,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
  },
});
