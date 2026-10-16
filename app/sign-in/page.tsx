import type { Metadata } from 'next';
import AuthClient from './AuthClient';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Fermor account to access your saved calculator configurations.',
};

export default function LoginPage() {
  return <AuthClient isLoginMode={true} />;
}
