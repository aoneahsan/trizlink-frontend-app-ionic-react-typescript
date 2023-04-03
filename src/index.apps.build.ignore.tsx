// Core Imports
import React from 'react';

// Package Imports
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = container && createRoot(container);
if (root) {
	root.render(
		<React.StrictMode>
			<h1>okay</h1>
		</React.StrictMode>
	);
}
