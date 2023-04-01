/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import ReactQuill from 'react-quill';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { DeltaStatic, Sources } from 'quill/index';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
import 'react-quill/dist/quill.snow.css';

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */
interface ZTextEditorInterface {
  value?: ReactQuill.Value;
  defaultValue?: ReactQuill.Value;
  bounds?: string | HTMLElement;
  className?: string;
  children?: React.ReactElement<
    unknown,
    string | React.JSXElementConstructor<unknown>
  >;
  formats?: string[];
  style?: React.CSSProperties;
  id?: string;
  placeholder?: string;
  onChange?: (
    value: string,
    delta: DeltaStatic,
    source: Sources,
    editor: ReactQuill.UnprivilegedEditor
  ) => void;
  onBlur?: (
    previousSelection: ReactQuill.Range,
    source: Sources,
    editor: ReactQuill.UnprivilegedEditor
  ) => void;
  onChangeSelection?: (
    selection: ReactQuill.Range,
    source: Sources,
    editor: ReactQuill.UnprivilegedEditor
  ) => void;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZTextEditor: React.FC<ZTextEditorInterface> = (props) => {
  return <ReactQuill theme='snow' {...props} style={{ ...props.style }} />;
};

export default ZTextEditor;
