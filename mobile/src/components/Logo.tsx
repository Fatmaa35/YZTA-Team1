/**
 * Theme-aware TabloDot logo.
 * Dark theme → white logo; light theme → black ("duman") logo, so it always
 * has contrast against the background.
 */

import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { useSettings } from '@/context/SettingsContext';

const WHITE_LOGO = require('@/assets/images/logo-white.png');
const BLACK_LOGO = require('@/assets/images/logo-black.png');

interface Props {
  size?: number;
  /** Force a variant regardless of theme (e.g. on the always-dark login gradient). */
  variant?: 'auto' | 'white' | 'black';
}

export default function Logo({ size = 120, variant = 'auto' }: Props) {
  const { isDark } = useSettings();
  const useWhite = variant === 'white' || (variant === 'auto' && isDark);
  return (
    <Image
      source={useWhite ? WHITE_LOGO : BLACK_LOGO}
      style={[styles.logo, { width: size, height: size }]}
      contentFit="contain"
    />
  );
}

const styles = StyleSheet.create({
  logo: {},
});
