// Core Imports
import React from 'react';

// Package Imports
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = container !== null && createRoot(container);
if (root !== false) {
  root.render(
    <React.StrictMode>
      <h1>okay</h1>
    </React.StrictMode>
  );
}
