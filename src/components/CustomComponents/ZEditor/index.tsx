// Core Imports
import React from 'react';

// Packages Imports
import AceEditor from 'react-ace';

// Custom Imports

// Styles

// Component Type
type ZEditorType = {
  className?: string;
  name?: string;
  width?: string;
  height?: string;
  placeholder?: string;
  fontSize?: string | number;
  value?: string;
  style?: {
    [key: string]: unknown;
  };
  onChange?: (value: string, event?: unknown) => void;
};

const ZEditor: React.FC<ZEditorType> = (props) => {
  return <AceEditor {...props} />;
};

export default ZEditor;
