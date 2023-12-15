/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
  addOutline,
  chevronDownOutline,
  discOutline,
  eyeOutline,
  happyOutline,
  locationOutline,
  sparklesOutline
} from 'ionicons/icons';
import { useRecoilState } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonButtons,
  ZIonCol,
  ZIonContent,
  ZIonFooter,
  ZIonHeader,
  ZIonIcon,
  ZIonImg,
  ZIonModal,
  ZIonRow,
  ZIonSegment,
  ZIonSegmentButton,
  ZIonText,
  ZIonTextareaShort
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { getPlatformIcon } from '@/utils/helpers';
import { gifIcon, imageIcon, mediaIcon, thumbnailIcon } from '@/assets/images';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { WorkspaceComposeModalRStateAtom } from '@/ZaionsStore/UserDashboard/Workspace/ZCompose/index.recoil';
import { workspacePagesDomeData } from '@/data/UserDashboard/Workspace/index.data';

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

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZWorkspaceComposeModal: React.FC = () => {
  // Recoil state to manage ZWorkspaceComposeModal.
  const [workspaceComposeModalStateAtom, setWorkspaceComposeModalStateAtom] =
    useRecoilState(WorkspaceComposeModalRStateAtom);

  const ZIonSegmentButtonStyle = {
    '--padding-end': '9px',
    '--padding-start': '9px'
  };
  return (
    <ZIonModal
      isOpen={workspaceComposeModalStateAtom.isOpen}
      className='workspace-compose-modal-size'
      onDidDismiss={() => {
        setWorkspaceComposeModalStateAtom(oldValues => ({
          ...oldValues,
          isOpen: false
        }));
      }}>
      {/*  */}
      <ZIonHeader className='px-2 pt-2'>
        {/* Add label */}
        <div className=''>
          <ZIonButton
            className='normal-case'
            fill='outline'
            size='small'>
            <ZIonIcon icon={addOutline} />
            Add labels
          </ZIonButton>
        </div>

        <ZIonSegment
          scrollable={true}
          // value={values.pageId}
          className='mx-2 zaions_pretty_scrollbar'>
          {workspacePagesDomeData.map((el, index) => (
            <ZIonSegmentButton
              key={index}
              className='px-1 normal-case'
              value={String(index)}
              style={ZIonSegmentButtonStyle}>
              <ZIonIcon
                icon={getPlatformIcon(el.type)}
                className='mb-2 w-7 h-7'
              />
              <ZIonText className='pb-2 text-xs'>{el.pageName}</ZIonText>
            </ZIonSegmentButton>
          ))}
        </ZIonSegment>
      </ZIonHeader>

      {/*  */}
      <ZIonContent>
        <ZIonRow className='mt-2 ion-align-items-center ion-justify-content-center'>
          <ZIonCol size='11.5'>
            <ZIonTextareaShort placeholder='Write something... or type :balloon to inset a 🎈' />
          </ZIonCol>

          {/*  */}
          <ZIonCol
            size='11.5'
            className='mt-2'>
            <ZIonButton className='normal-case'>
              <ZIonIcon
                icon={sparklesOutline}
                className='pe-1'
              />{' '}
              Generate with AI
            </ZIonButton>
          </ZIonCol>

          {/*  */}
          <ZIonCol
            size='11.5'
            className='mt-2'>
            <ZIonRow className='ion-align-items-center'>
              <ZIonCol>
                <ZIonButtons>
                  <ZIonButton className='m-0'>
                    <ZIonImg src={imageIcon} />
                  </ZIonButton>
                  <ZIonButton className='m-0'>
                    <ZIonImg src={gifIcon} />
                  </ZIonButton>
                  <ZIonButton className='m-0'>
                    <ZIonImg src={mediaIcon} />
                  </ZIonButton>
                  <ZIonButton className='m-0'>
                    <ZIonImg src={thumbnailIcon} />
                  </ZIonButton>
                </ZIonButtons>
              </ZIonCol>

              <ZIonCol className='flex ion-justify-content-end'>
                <ZIonButtons>
                  <ZIonButton className='m-0'>
                    <ZIonIcon
                      icon={locationOutline}
                      className='w-7 h-7'
                    />
                  </ZIonButton>

                  <ZIonButton className='m-0'>
                    <ZIonIcon
                      icon={discOutline}
                      className='w-7 h-7'
                    />
                  </ZIonButton>

                  <ZIonButton className='m-0'>
                    <ZIonIcon
                      icon={happyOutline}
                      className='w-7 h-7'
                    />
                  </ZIonButton>
                </ZIonButtons>
              </ZIonCol>
            </ZIonRow>
          </ZIonCol>
        </ZIonRow>
      </ZIonContent>

      {/*  */}
      <ZIonFooter>
        <ZIonRow>
          <ZIonCol></ZIonCol>

          <ZIonCol className='flex ion-align-items-center ion-justify-content-end'>
            <ZIonButton
              className='me-3'
              fill='clear'
              size='small'
              color='dark'>
              <ZIonIcon
                icon={eyeOutline}
                className='w-6 h-6'
              />
            </ZIonButton>

            <ZIonButtons>
              <ZIonButton
                className='m-0 normal-case z-ion-border-radius-0'
                color='primary'
                fill='solid'>
                Save
              </ZIonButton>
              <ZIonButton
                className='m-0 normal-case z-ion-border-radius-0'
                color='primary'
                fill='solid'>
                <ZIonIcon icon={chevronDownOutline} />
              </ZIonButton>
            </ZIonButtons>
          </ZIonCol>
        </ZIonRow>
      </ZIonFooter>
    </ZIonModal>
  );
};

export default ZWorkspaceComposeModal;
