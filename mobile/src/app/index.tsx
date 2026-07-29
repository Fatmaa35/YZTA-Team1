import { Redirect } from 'expo-router';

import { useAuth } from '@/context/AuthContext';

/** Entry route — sends the user to the tabs or the login screen. */
export default function Index() {
  const { student } = useAuth();
  return <Redirect href={student ? '/(tabs)/today' : '/login'} />;
}
