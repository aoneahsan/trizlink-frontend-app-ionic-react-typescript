/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
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
import { type workspaceInterface } from '@/types/AdminPanel/workspace';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import CONSTANTS from '@/utils/constants';
import { API_URL_ENUM } from '@/utils/enums';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import classNames from 'classnames';
import { notificationsOutline } from 'ionicons/icons';
import React from 'react';
import { useParams } from 'react-router';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

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

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZWSNotificationSettings: React.FC = () => {
  const { workspaceId } = useParams<{ workspaceId?: string }>();

  // #region Custom hooks.
  const { isSmScale, isLgScale, isMdScale } = useZMediaQueryScale();
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

  return (
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
        <ZIonTitle
          className={classNames({
            'block font-bold ion-no-padding': true,
            'text-2xl': isLgScale,
            'text-xl': !isLgScale,
            'ion-text-center': !isSmScale
          })}>
          Workspace notifications settings
        </ZIonTitle>

        <ZIonItem
          className='mt-2'
          lines='none'>
          <ZUserAvatarButton
            userAvatar={selectedWorkspace?.workspaceImage}
            userAvatarUi={{
              name: selectedWorkspace?.workspaceName
            }}
            style={{
              height: isMdScale ? '2.5rem' : '2rem',
              width: isMdScale ? '2.5rem' : '2rem'
            }}
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
          <ZIonItem
            className='mx-2'
            style={{ '--padding-start': '10px', '--padding-end': '0px' }}>
            <ZIonIcon icon={notificationsOutline} />

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
            className='mx-2'
            style={{ '--padding-start': '10px', '--padding-end': '0px' }}>
            <ZIonText>Allow push notification</ZIonText>

            <ZIonText slot='end'>
              <ZRCSwitch />
            </ZIonText>
          </ZIonItem>
        </ZIonList>
      </ZIonCol>
    </ZIonRow>
  );
};

export default ZWSNotificationSettings;
