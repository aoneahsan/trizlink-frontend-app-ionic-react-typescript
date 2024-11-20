import React from 'react';
import { createRoot } from 'react-dom/client';
import AppEntryPoint from './AppEntryPoint';
import { setupIonicReact } from '@ionic/react';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

setupIonicReact({
  mode: 'md'
});

// Call the element loader after the app has been rendered the first time
defineCustomElements(window);

const container = document.getElementById('root');
const root = container !== null && createRoot(container);
if (root !== false) {
  root.render(
    <React.StrictMode>
      <AppEntryPoint />
    </React.StrictMode>
  );
}
