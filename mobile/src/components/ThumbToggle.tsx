/**
 * Beğendim / Beğenmedim (thumbs up/down) toggle used for Lezzet, Sıcaklık, Porsiyon.
 * `value` is true (up), false (down), or null (nothing chosen yet).
 */

import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Radius, Space } from '@/constants/tablodot-theme';
import { useSettings } from '@/context/SettingsContext';

interface Props {
  label: string;
  value: boolean | null;
  onChange: (value: boolean) => void;
}

export default function ThumbToggle({ label, value, onChange }: Props) {
  const { colors } = useSettings();
  return (
    <View style={styles.wrapper}>
      <View style={styles.buttons}>
        <Pressable
          onPress={() => onChange(true)}
          style={[
            styles.btn,
            { backgroundColor: value === true ? colors.success : colors.chip },
          ]}>
          <Ionicons
            name="thumbs-up"
            size={20}
            color={value === true ? '#FFFFFF' : colors.text}
          />
        </Pressable>
        <Pressable
          onPress={() => onChange(false)}
          style={[
            styles.btn,
            { backgroundColor: value === false ? colors.danger : colors.chip },
          ]}>
          <Ionicons
            name="thumbs-down"
            size={20}
            color={value === false ? '#FFFFFF' : colors.text}
          />
        </Pressable>
      </View>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: Space.sm,
  },
  buttons: {
    flexDirection: 'row',
    gap: Space.xs,
  },
  btn: {
    width: 44,
    height: 44,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
});
