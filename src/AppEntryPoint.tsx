// Core Imports
import React from 'react';

// Packages Import - we will only import these packages here which we need to configure at app starting/entry point, not the provider components of packages, that will go in "AppHOCWrapper" component
// import { Amplify } from 'aws-amplify';
// import AWS_APP_CONFIG from './aws-exports';

// App Main Component Import
import AppHOCWrapper from './AppHOCWrapper';

// style
import './theme/fonts.css'; // All the fonts
import './index.css'; // All custom css
import './theme/animations.css'; // All animations

// Configuring AWS
// (Amplify as { configure: (config: unknown) => void }).configure(AWS_APP_CONFIG);

const AppEntryPoint: React.FC = () => {
  return <AppHOCWrapper />;
};

export default AppEntryPoint;
// this is used to configure any third party packages like amplify
