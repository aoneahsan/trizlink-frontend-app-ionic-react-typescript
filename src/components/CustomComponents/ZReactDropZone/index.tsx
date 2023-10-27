/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import ReactDropzone, {
  DropEvent,
  DropzoneState,
  FileError,
  FileRejection
} from 'react-dropzone';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */
interface ZReactDropZoneInterface {
  children: (state: DropzoneState) => JSX.Element;
  multiple?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  preventDropOnDocument?: boolean;
  maxSize?: number;
  minSize?: number;
  maxFiles?: number;
  onDrop?: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void;
  onDropRejected?: (fileRejections: FileRejection[], event: DropEvent) => void;
  onError?: (err: Error) => void;
  onFileDialogCancel?: () => void;
  onFileDialogOpen?: () => void;
  validator?: <T extends File>(file: T) => FileError | FileError[] | null;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZReactDropZone: React.FC<ZReactDropZoneInterface> = props => {
  return <ReactDropzone {...props}>{props.children}</ReactDropzone>;
};

export default ZReactDropZone;
