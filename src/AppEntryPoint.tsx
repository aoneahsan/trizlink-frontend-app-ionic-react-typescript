// Core Imports
import React from 'react';

// App Main Component Import
import AppHOCWrapper from './AppHOCWrapper';

// style
import './theme/fonts.css'; // All the fonts
import './index.css'; // All custom css
import './theme/animations.css'; // All animations

const AppEntryPoint: React.FC = () => {
  return <AppHOCWrapper />;
};

export default AppEntryPoint;
