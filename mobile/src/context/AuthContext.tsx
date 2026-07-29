/**
 * Auth context — holds the mock session and drives route protection.
 *
 * Screens call `signIn` / `signOut`; the root layout redirects based on `student`.
 * When Supabase lands, back this with `supabase.auth.onAuthStateChange`.
 */

import { createContext, useContext, useMemo, useState } from 'react';

import { Student } from '@/data/mockData';
import * as authService from '@/services/authService';

interface AuthContextValue {
  student: Student | null;
  isLoading: boolean;
  signIn: (studentNo: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const value = useMemo<AuthContextValue>(
    () => ({
      student,
      isLoading,
      async signIn(studentNo, password) {
        setIsLoading(true);
        try {
          const { student: loggedIn } = await authService.login(studentNo, password);
          setStudent(loggedIn);
        } finally {
          setIsLoading(false);
        }
      },
      async signOut() {
        await authService.logout();
        setStudent(null);
      },
    }),
    [student, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
