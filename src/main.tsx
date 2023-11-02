import React from 'react';
import { createRoot } from 'react-dom/client';
import AppEntryPoint from './AppEntryPoint';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  // TODO: Must re-add the "React.StrictMode back"
  <>
    <AppEntryPoint />
  </>
);
