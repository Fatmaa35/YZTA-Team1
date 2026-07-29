/**
 * Selectable 5-star rating row.
 */

import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { Space } from '@/constants/tablodot-theme';
import { useSettings } from '@/context/SettingsContext';

interface Props {
  value: number;
  onChange: (value: number) => void;
  size?: number;
}

export default function StarRating({ value, onChange, size = 34 }: Props) {
  const { colors } = useSettings();
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= value;
        return (
          <Pressable
            key={star}
            onPress={() => onChange(star)}
            hitSlop={6}
            accessibilityRole="button"
            accessibilityLabel={`${star}`}>
            <Ionicons
              name={filled ? 'star' : 'star-outline'}
              size={size}
              color={filled ? colors.star : colors.textMuted}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Space.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
