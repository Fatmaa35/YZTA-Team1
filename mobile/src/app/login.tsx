import { useState } from 'react';
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
import Logo from '@/components/Logo';
import PrimaryButton from '@/components/PrimaryButton';
import { Radius, Space } from '@/constants/tablodot-theme';
import { useAuth } from '@/context/AuthContext';
import { useDialog } from '@/context/DialogContext';
import { useSettings } from '@/context/SettingsContext';

export default function LoginScreen() {
  const { signIn, isLoading } = useAuth();
  const { colors, t } = useSettings();
  const { alert } = useDialog();
  const [studentNo, setStudentNo] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      // The auth guard in the root layout redirects to the tabs on success.
      await signIn(studentNo, password);
    } catch (err) {
      await alert(t('login.failedTitle'), (err as Error).message, t('common.ok'));
    }
  }

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.flex}>
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled">
            <View style={styles.logoWrap}>
              <Logo variant="auto" size={220} />
            </View>

            <View style={styles.form}>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBg,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
                placeholder={t('login.studentNo')}
                placeholderTextColor={colors.textMuted}
                keyboardType="number-pad"
                value={studentNo}
                onChangeText={setStudentNo}
                autoCapitalize="none"
              />
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBg,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
                placeholder={t('login.password')}
                placeholderTextColor={colors.textMuted}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <Pressable
                onPress={() =>
                  alert(t('login.forgotTitle'), t('login.forgotBody'), t('common.ok'))
                }
                style={styles.forgotWrap}>
                <Text style={[styles.forgot, { color: colors.textSecondary }]}>
                  {t('login.forgot')}
                </Text>
              </Pressable>

              <PrimaryButton
                label={t('login.submit')}
                onPress={handleLogin}
                loading={isLoading}
                style={styles.loginBtn}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  flex: { flex: 1 },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Space.xl,
    gap: Space.xl,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: Space.sm,
  },
  form: {
    gap: Space.lg,
  },
  input: {
    borderWidth: 1,
    borderRadius: Radius.md,
    paddingHorizontal: Space.lg,
    paddingVertical: Space.md,
    fontSize: 15,
    minHeight: 52,
  },
  forgotWrap: {
    alignSelf: 'flex-end',
    marginTop: -Space.sm,
  },
  forgot: {
    fontSize: 13,
  },
  loginBtn: {
    marginTop: Space.lg,
  },
});
