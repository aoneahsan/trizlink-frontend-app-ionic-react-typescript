// Core Imports
import React from 'react';
// Packages Imports
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

// Custom Imports
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';
import { zCreateElementTestingSelector } from '@/utils/helpers';

// Styles

import { type ZEditorThemeEnum } from '@/types/components/ZEditor.type';
// Component Type
interface ZEditorType {
  className?: string;
  name?: string;
  width?: string;
  height?: string;
  placeholder?: string;
  fontSize?: string | number;
  value?: string;
  theme?: ZEditorThemeEnum;
  style?: Record<string, unknown>;
  onChange?: (value: string, event?: unknown) => void;

  testingselector?: string;
  testinglistselector?: string;
}

const ZEditor: React.FC<ZEditorType> = props => {
  const _testinglistselector =
    props.testinglistselector !== undefined
      ? {
          ...zCreateElementTestingSelector({
            _value: props.testinglistselector,
            _key: zCreateElementTestingSelectorKeyEnum.listSelector
          })
        }
      : {};

  const _testingSelector =
    props.testingselector !== undefined
      ? {
          ...zCreateElementTestingSelector({
            _value: props.testingselector
          })
        }
      : {};

  return (
    <AceEditor
      {...props}
      {..._testingSelector}
      {..._testinglistselector}
      // theme={props.theme || ZEditorThemeEnum.monokai}
      mode='javascript'
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2
      }}
    />
  );
};

export default ZEditor;
