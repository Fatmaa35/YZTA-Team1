/**
 * Cross-platform dialogs & toast.
 *
 * React Native Web does NOT implement `Alert` (it's a no-op), so confirmation
 * prompts and success toasts silently fail on web. This provider renders a
 * themed Modal for confirm/alert and a lightweight toast that work identically
 * on web, iOS and Android.
 */

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { Radius, Space } from '@/constants/tablodot-theme';
import { useSettings } from '@/context/SettingsContext';

interface ConfirmOptions {
  title: string;
  message?: string;
  confirmText: string;
  cancelText: string;
  destructive?: boolean;
}

interface DialogState extends ConfirmOptions {
  mode: 'confirm' | 'alert';
}

interface DialogContextValue {
  confirm: (opts: ConfirmOptions) => Promise<boolean>;
  alert: (title: string, message?: string, okText?: string) => Promise<void>;
  toast: (message: string) => void;
}

const DialogContext = createContext<DialogContextValue | undefined>(undefined);

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const { colors } = useSettings();
  const [dialog, setDialog] = useState<DialogState | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const resolveRef = useRef<((value: boolean) => void) | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const close = useCallback((result: boolean) => {
    setDialog(null);
    resolveRef.current?.(result);
    resolveRef.current = null;
  }, []);

  const confirm = useCallback((opts: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
      setDialog({ ...opts, mode: 'confirm' });
    });
  }, []);

  const alert = useCallback(
    (title: string, message?: string, okText = 'OK') => {
      return new Promise<void>((resolve) => {
        resolveRef.current = () => resolve();
        setDialog({
          title,
          message,
          confirmText: okText,
          cancelText: '',
          mode: 'alert',
        });
      });
    },
    []
  );

  const toast = useCallback((message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMsg(message);
    toastTimer.current = setTimeout(() => setToastMsg(null), 2400);
  }, []);

  return (
    <DialogContext.Provider value={{ confirm, alert, toast }}>
      <View style={styles.root}>
        {children}

        {toastMsg && (
          <View pointerEvents="none" style={styles.toastWrap}>
            <View style={[styles.toast, { backgroundColor: colors.cardSolid, borderColor: colors.border }]}>
              <Text style={[styles.toastText, { color: colors.text }]}>{toastMsg}</Text>
            </View>
          </View>
        )}
      </View>

      <Modal
        visible={!!dialog}
        transparent
        animationType="fade"
        onRequestClose={() => close(false)}>
        <Pressable style={styles.backdrop} onPress={() => close(false)}>
          <Pressable
            style={[styles.card, { backgroundColor: colors.cardSolid }]}
            onPress={(e) => e.stopPropagation()}>
            <Text style={[styles.title, { color: colors.text }]}>{dialog?.title}</Text>
            {!!dialog?.message && (
              <Text style={[styles.message, { color: colors.textSecondary }]}>
                {dialog.message}
              </Text>
            )}
            <View style={styles.buttons}>
              {dialog?.mode === 'confirm' && (
                <Pressable
                  onPress={() => close(false)}
                  style={[styles.btn, { backgroundColor: colors.chip }]}>
                  <Text style={[styles.btnText, { color: colors.text }]}>
                    {dialog?.cancelText}
                  </Text>
                </Pressable>
              )}
              <Pressable
                onPress={() => close(true)}
                style={[
                  styles.btn,
                  {
                    backgroundColor: dialog?.destructive ? colors.danger : colors.primary,
                  },
                ]}>
                <Text
                  style={[
                    styles.btnText,
                    { color: dialog?.destructive ? '#FFFFFF' : colors.textOnAccent },
                  ]}>
                  {dialog?.confirmText}
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </DialogContext.Provider>
  );
}

export function useDialog(): DialogContextValue {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error('useDialog must be used within a DialogProvider');
  return ctx;
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    padding: Space.xl,
  },
  card: {
    borderRadius: Radius.lg,
    padding: Space.xl,
    gap: Space.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
  },
  buttons: {
    flexDirection: 'row',
    gap: Space.md,
    marginTop: Space.sm,
  },
  btn: {
    flex: 1,
    borderRadius: Radius.pill,
    paddingVertical: Space.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 15,
    fontWeight: '700',
  },
  toastWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 100,
    alignItems: 'center',
    paddingHorizontal: Space.xl,
  },
  toast: {
    borderRadius: Radius.pill,
    borderWidth: 1,
    paddingVertical: Space.md,
    paddingHorizontal: Space.xl,
    maxWidth: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  toastText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
