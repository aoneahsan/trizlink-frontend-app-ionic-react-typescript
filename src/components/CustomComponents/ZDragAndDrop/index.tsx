// Core Imports
import React from 'react';

// Packages Imports
import classNames from 'classnames';
import { fileTrayOutline } from 'ionicons/icons';
import { type OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

// Custom Imports
import {
  ZIonGrid,
  ZIonIcon,
  ZIonImg,
  ZIonText
} from '@/components/ZIonComponents';
import ZaionsFileUploadModal from '@/components/InPageComponents/ZaionsModals/FileUploadModal';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';

// Types
import { ZIonModalActionEnum } from '@/types/ZaionsApis.type';
import { type FormikSetFieldValueEventVoidType } from '@/types/ZaionsFormik.type';
import { zJsonParse } from '@/utils/helpers';

// Images
import { upload_send } from '@/assets/images';

// Styles
import classes from './styles.module.css';

// Component Type
interface ZDragAndDropType {
  className?: string;
  style?: Record<string, unknown>;
  fieldName?: string;
  imageUrl?: string;
  title?: string;
  testingselector?: string;
  testinglistselector?: string;
  setFieldValue?: FormikSetFieldValueEventVoidType;
}

const ZDragAndDrop: React.FC<ZDragAndDropType> = ({
  className,
  style,
  fieldName = '',
  imageUrl,
  title = 'Click to upload Picture or a GIF',
  testinglistselector,
  testingselector,
  setFieldValue
}) => {
  const { presentZIonModal: presentZFileUploadModal } = useZIonModal(
    ZaionsFileUploadModal
  );

  // const [compState, setCompState] = useState<{
  //   filePath?: string;
  // }>({});

  // #region comp constants
  const _zIonImgStyle = { width: '4rem' };
  // #endregion

  return (
    <ZIonGrid
      style={style}
      testingselector={testingselector}
      testinglistselector={testinglistselector}
      className={classNames(classes['zaions-drag-and-drop'], className, {
        'flex flex-col ion-align-items-center ion-justify-content-center': true
      })}
      onClick={() => {
        presentZFileUploadModal({
          _cssClass: 'file-upload-modal-size',
          _onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
            if (ev.detail.role === ZIonModalActionEnum.success) {
              // Getting file data from fileUploadModal and parse it.
              const fileData = zJsonParse(String(ev.detail.data)) as {
                fileUrl: string;
                filePath: string;
              };

              // Storing the filePath in component state.
              // setCompState((oldState) => ({
              //   ...oldState,
              //   filePath: fileData.filePath,
              // }));

              // setting the url in the recoil state which will be pass in props.
              setFieldValue !== undefined &&
                setFieldValue(fieldName, fileData.fileUrl, false);
            }
          }
        });
      }}>
      {imageUrl !== undefined && imageUrl?.trim()?.length > 0 && (
        <ZIonImg
          src={imageUrl}
          testingselector={`${testingselector}-image`}
          testinglistselector={`${testinglistselector}-image`}
          className='w-full h-full'
        />
      )}
      {imageUrl === undefined && (
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
        className={classNames(classes['zaions-drag-and-drop__overlay'], {
          'flex flex-col ion-align-items-center ion-justify-content-center':
            true
        })}>
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
  );
};

export default ZDragAndDrop;
