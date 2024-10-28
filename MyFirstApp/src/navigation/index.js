import React from 'react';
import { useAuth } from '../hooks/useAuth';
import UserStack from './UserStack'; // Ensure the naming is consistent
import AuthStack from './AuthStack';

export default function RootNavigation() {
  const { user } = useAuth();

  return user ? <UserStack /> : <AuthStack />;
}
