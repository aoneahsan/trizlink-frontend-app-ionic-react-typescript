/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { arrowBackCircleOutline, notificationsOutline } from 'ionicons/icons';
import { useParams } from 'react-router';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';
import ZUserAvatarButton from '@/components/WorkspacesComponents/UserButton';
import {
  ZIonCol,
  ZIonIcon,
  ZIonItem,
  ZIonLabel,
  ZIonList,
  ZIonRow,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import { API_URL_ENUM } from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { type workspaceInterface } from '@/types/AdminPanel/workspace';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import SupportTrizlinkOnPatreon from '@/components/SupportTrizlinkOnPatreon';

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

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZSingleWSNotificationSettings: React.FC = () => {
  const { workspaceId } = useParams<{ workspaceId?: string }>();

  // #region Custom hooks.
  const { isSmScale, isLgScale, isMdScale } = useZMediaQueryScale();
  const { zNavigatePushRoute } = useZNavigate();
  // #endregion

  // #region APIS.
  const { data: selectedWorkspace } = useZRQGetRequest<workspaceInterface>({
    _url: API_URL_ENUM.workspace_update_delete,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.GET, workspaceId ?? ''],
    _authenticated: true,
    _itemsIds: [workspaceId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _shouldFetchWhenIdPassed: !(
      workspaceId !== undefined && workspaceId?.trim()?.length > 0
    ),
    _extractType: ZRQGetRequestExtractEnum.extractItem
  });
  // #endregion

  const _userAvatarUi = {
    name: selectedWorkspace?.workspaceName
  };

  return (
    <>
      <SupportTrizlinkOnPatreon />
      <ZIonRow
        className={classNames({
          'ion-align-items-center': true,
          'ion-padding': isLgScale,
          'p-2': !isMdScale
        })}>
        <ZIonCol
          sizeXl='12'
          sizeLg='12'
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'
          className={classNames({
            'mb-2': !isSmScale
          })}>
          <div className='flex w-full gap-3 mb-3'>
            <ZIonIcon
              icon={arrowBackCircleOutline}
              className='w-7 h-7 mt-[3px] cursor-pointer'
              color='primary'
              onClick={() => {
                zNavigatePushRoute(
                  ZaionsRoutes.AdminPanel.Setting.UserAccount
                    .WSNotificationSettings
                );
              }}
            />
            <ZIonTitle
              className={classNames({
                'block font-bold ion-no-padding': true,
                'text-2xl': isLgScale,
                'text-xl': !isLgScale,
                'ion-text-center': !isSmScale
              })}>
              Workspace notifications settings
            </ZIonTitle>
          </div>

          <ZIonItem
            className='mt-2'
            lines='none'>
            <ZUserAvatarButton
              userAvatar={selectedWorkspace?.workspaceImage}
              userAvatarUi={_userAvatarUi}
              className={classNames({
                'w-[2.5rem] h-[2.5rem]': isMdScale,
                'w-[2rem] h-[2rem]': !isMdScale
              })}
            />
            <ZIonLabel className='ms-2'>
              <ZIonText
                className={classNames({
                  'block font-semibold': true,
                  'text-md': isLgScale,
                  'text-sm': !isLgScale
                })}>
                {selectedWorkspace?.workspaceName}
              </ZIonText>
              <ZIonText
                className='block text-xs'
                color='medium'>
                Owner by:
                <ZIonText
                  className='font-semibold ms-1'
                  color='dark'>
                  {selectedWorkspace?.user?.username}
                </ZIonText>
              </ZIonText>
            </ZIonLabel>
          </ZIonItem>

          {/*  */}
          <ZIonList
            className='mt-2 border rounded-lg'
            lines='full'>
            <ZIonItem className='mx-2 ion-padding-start-1rem ion-padding-end-0'>
              <ZIonIcon
                icon={notificationsOutline}
                className='me-3 w-7 h-7'
              />

              <ZIonLabel>
                <ZIonText className='block'>
                  Workspace notification on your profile
                </ZIonText>
                <ZIonText className='block'>
                  Don&apos;t miss updates about your workspace
                  <ZIonText className='font-semibold ms-1'>
                    {selectedWorkspace?.workspaceName}
                  </ZIonText>
                </ZIonText>
              </ZIonLabel>

              <ZIonText slot='end'>
                <ZRCSwitch />
              </ZIonText>
            </ZIonItem>

            <ZIonItem
              lines='none'
              className='mx-2 ion-padding-start-1rem ion-padding-end-0'>
              <ZIonText>Allow push notification</ZIonText>

              <ZIonText slot='end'>
                <ZRCSwitch />
              </ZIonText>
            </ZIonItem>
          </ZIonList>
        </ZIonCol>
      </ZIonRow>
    </>
  );
};

export default ZSingleWSNotificationSettings;
