import './wdyr';

import React from 'react';
import { createRoot } from 'react-dom/client';
import AppEntryPoint from './AppEntryPoint';

// import { defineCustomElements } from '@ionic/pwa-elements/loader';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = container !== null && createRoot(container);
if (root !== false) {
  root.render(
    // TODO: Must re-add the "React.StrictMode back"
    <>
      <AppEntryPoint />
    </>
  );
}

// Call the element loader after the app has been rendered the first time
// defineCustomElements(window)
// .then()
// .catch((err) => console.error(err));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.info))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
