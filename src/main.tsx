import React from 'react';
import { createRoot } from 'react-dom/client';
import AppEntryPoint from './AppEntryPoint';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AppEntryPoint />
  </React.StrictMode>
);