/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { closeOutline } from 'ionicons/icons';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonContent,
  ZIonFooter,
  ZIonGrid,
  ZIonIcon,
  ZIonImg,
  ZIonText
} from '@/components/ZIonComponents';
import ZInviteTab from './InviteTab';
import ZMembersTab from './MembersTab';
import ZPermissionsTab from './PermissionsTab';
import ZNotificationTab from './NotificationTab';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';

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
import {
  type WSRolesNameEnum,
  WorkspaceSharingTabEnum
} from '@/types/AdminPanel/workspace';
import { FormMode } from '@/types/AdminPanel/index.type';

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
import { ProductFavicon } from '@/assets/images';
import SupportOnPatreon from '@/components/SupportOnPatreon';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZWorkspacesSharingModal: React.FC<{
  dismissZIonModal: (data?: string, role?: string | undefined) => void;
  Tab: WorkspaceSharingTabEnum;
  workspaceId?: string;
  shareWSMemberId?: string;
  wsShareId?: string;
  formMode?: FormMode;
  email: string;
  id?: string;
  role: WSRolesNameEnum;
}> = ({
  dismissZIonModal,
  formMode = FormMode.ADD,
  Tab,
  id,
  email,
  role,
  workspaceId,
  shareWSMemberId,
  wsShareId
}) => {
  // Component state
  const [compState] = useState<{
    activeTab: WorkspaceSharingTabEnum;
  }>({
    activeTab: Tab
  });

  // #region custom hook.
  const { isSmScale } = useZMediaQueryScale();
  // #endregion

  return (
    <>
      <SupportOnPatreon />
      <ZIonContent>
        <div className='flex mt-2 ion-align-items-start ion-justify-content-end pe-2'>
          <ZIonIcon
            icon={closeOutline}
            className={classNames({
              'cursor-pointer': true,
              'w-7 h-7': isSmScale,
              'w-6 h-6': !isSmScale
            })}
            onClick={() => {
              dismissZIonModal();
            }}
          />
        </div>
        <ZCustomScrollable
          scrollY={true}
          className='w-full h-[95%]'>
          <ZIonGrid className='pb-3'>
            <div className='flex flex-col mb-3 ion-text-center ion-justify-content-center'>
              <div className='flex mx-auto mb-0 rounded-full w-max h-max ion-align-items-center ion-justify-content-center'>
                <ZIonImg
                  src={ProductFavicon}
                  className={classNames({
                    'mx-auto': true,
                    'w-[4rem] h-[4rem]': isSmScale,
                    'w-[3rem] h-[3rem]': !isSmScale
                  })}
                />
              </div>
              <ZIonText
                color='dark'
                className={classNames({
                  'block mt-3 font-normal ion-text-center': true,
                  'text-2xl': isSmScale,
                  'text-xl': !isSmScale
                })}>
                Invite a member
              </ZIonText>
            </div>

            {compState.activeTab === WorkspaceSharingTabEnum.invite ? (
              <ZInviteTab
                workspaceId={workspaceId}
                wsShareId={wsShareId}
                shareWSMemberId={shareWSMemberId}
                dismissZIonModal={dismissZIonModal}
                formMode={formMode}
                email={email}
                role={role}
                memberId={id}
              />
            ) : compState.activeTab === WorkspaceSharingTabEnum.members ? (
              <ZMembersTab />
            ) : compState.activeTab === WorkspaceSharingTabEnum.permissions ? (
              <ZPermissionsTab />
            ) : compState.activeTab ===
              WorkspaceSharingTabEnum.notifications ? (
              <ZNotificationTab />
            ) : (
              ''
            )}
          </ZIonGrid>
        </ZCustomScrollable>
      </ZIonContent>

      <ZIonFooter className='py-1 ion-text-end'>
        <ZIonButton
          className='me-4'
          fill='outline'
          onClick={() => {
            dismissZIonModal();
          }}>
          Cancel
        </ZIonButton>
        {/* <div
          className={classNames({
            'inline-block': true,
            'cursor-not-allowed': !isValid
          })}>
          <ZIonButton
            className='me-4'
            disabled={!isValid}
            color='tertiary'
            onClick={() => {
              if (isValid) {
                void submitForm();
              }
            }}>
            Save
          </ZIonButton>
        </div> */}
      </ZIonFooter>
    </>
  );
};

export default ZWorkspacesSharingModal;
