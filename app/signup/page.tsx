import type { Metadata } from 'next';
import AuthClient from '../sign-in/AuthClient';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create a free Fermor account to save your calculator configurations.',
};

export default function SignupPage() {
  return <AuthClient isLoginMode={false} />;
}
