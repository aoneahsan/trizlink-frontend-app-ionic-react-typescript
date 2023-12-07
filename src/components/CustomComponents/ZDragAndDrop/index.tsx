// Core Imports
import React from 'react';

// Packages Imports
import classNames from 'classnames';
import { fileTrayOutline } from 'ionicons/icons';
import ReactDropzone, {
  type DropEvent,
  type FileRejection
} from 'react-dropzone';

// Custom Imports
import {
  ZIonGrid,
  ZIonIcon,
  ZIonImg,
  ZIonText
} from '@/components/ZIonComponents';

// Types

// Images
import { upload_send } from '@/assets/images';

// Styles
import classes from './styles.module.css';

// Component Type
export interface ZDragAndDropType {
  className?: string;
  style?: Record<string, unknown>;
  imageUrl?: string;
  title?: string;
  testingselector?: string;
  testinglistselector?: string;
  multiple?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
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
}

const ZDragAndDrop: React.FC<ZDragAndDropType> = ({
  className,
  style,
  imageUrl,
  title = 'Click to upload Picture or a GIF',
  testinglistselector,
  testingselector,
  multiple = false,
  autoFocus,
  disabled = false,
  maxSize,
  minSize,
  maxFiles,
  onDrop,
  onDropRejected,
  onError
}) => {
  // const [compState, setCompState] = useState<{
  //   filePath?: string;
  // }>({});

  // #region comp constants
  const _zIonImgStyle = { width: '4rem' };
  // #endregion

  return (
    <ReactDropzone
      multiple={multiple}
      autoFocus={autoFocus}
      disabled={disabled}
      maxSize={maxSize}
      minSize={minSize}
      maxFiles={maxFiles}
      onDrop={onDrop}
      onDropRejected={onDropRejected}
      onError={onError}>
      {({ getRootProps, getInputProps, isDragActive, acceptedFiles }) => {
        return (
          <div
            {...getRootProps()}
            className='w-full'>
            <input {...getInputProps()} />
            <ZIonGrid
              style={style}
              testingselector={testingselector}
              testinglistselector={testinglistselector}
              className={classNames(
                classes['zaions-drag-and-drop'],
                className,
                {
                  'flex flex-col ion-align-items-center ion-justify-content-center':
                    true
                }
              )}>
              {imageUrl !== undefined && imageUrl?.trim()?.length > 0 && (
                <ZIonImg
                  src={imageUrl}
                  testingselector={`${testingselector}-image`}
                  testinglistselector={`${testinglistselector}-image`}
                  className='w-full h-full'
                />
              )}
              {imageUrl?.trim()?.length === 0 && (
                <>
                  <ZIonText className='ion-no-margin'>
                    <ZIonIcon
                      icon={fileTrayOutline}
                      color='primary'
                      className='w-8 h-8'
                      testingselector={`${testingselector}-cd-icon`}
                      testinglistselector={`${testinglistselector}-cd-icon`}
                    />
                  </ZIonText>
                  <ZIonText
                    color='primary'
                    testingselector={`${testingselector}-cd-icon`}
                    testinglistselector={`${testinglistselector}-cd-icon`}>
                    {title}
                  </ZIonText>
                </>
              )}

              <div
                className={classNames(
                  classes['zaions-drag-and-drop__overlay'],
                  {
                    'flex flex-col ion-align-items-center ion-justify-content-center':
                      true,
                    'd-none':
                      imageUrl !== undefined && imageUrl?.trim()?.length > 0
                  }
                )}>
                <ZIonText className='ion-no-margin'>
                  <ZIonImg
                    src={upload_send}
                    alt='send icon'
                    testingselector={`${testingselector}-od-icon`} // od -> overlay-div
                    testinglistselector={`${testinglistselector}-od-icon`}
                    style={_zIonImgStyle}
                  />
                </ZIonText>
                <ZIonText
                  color='light'
                  className='mt-2 font-bold'
                  testingselector={`${testingselector}-od-text`} // od -> overlay-div
                  testinglistselector={`${testinglistselector}-od-text`}>
                  Upload a new Picture
                </ZIonText>
              </div>
            </ZIonGrid>
          </div>
        );
      }}
    </ReactDropzone>
  );
};

export default ZDragAndDrop;
