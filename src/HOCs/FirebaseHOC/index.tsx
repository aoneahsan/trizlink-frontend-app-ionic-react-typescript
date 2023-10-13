// Core Imports
import React from 'react';

// Packages Imports
import { initializeApp } from 'firebase/app';
import {} from 'firebase/remote-config';

// Types
interface IFirebaseHOCProps {
  children: React.ReactNode;
}

// Functional Component
const FirebaseHOC: React.FC<IFirebaseHOCProps> = ({ children }) => {
  return <>{children}</>;
};
