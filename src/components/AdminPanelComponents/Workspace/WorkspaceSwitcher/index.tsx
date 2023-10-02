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
import { caretDown } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZUserAvatarButton from '@/components/WorkspacesComponents/UserButton';
import {
  ZIonButton,
  ZIonIcon,
  ZIonLabel,
  ZIonSkeletonText,
  ZIonText
} from '@/components/ZIonComponents';
import ZWorkspacesListPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/ListPopover';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';

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
import { workspaceInterface } from '@/types/AdminPanel/workspace';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useParams } from 'react-router';

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
 * Workspace switcher
 * About: (button with will open workspaces popover where you can switch around workspaces.)
 * @type {*}
 * */

const ZWorkspaceSwitcher: React.FC<{ workspaceId?: string }> = () => {
  const { isLgScale } = useZMediaQueryScale();
  const { workspaceId } = useParams<{ workspaceId?: string }>();
  // #region popovers.
  const { presentZIonPopover: presentZWorkspacesListPopover } = useZIonPopover(
    ZWorkspacesListPopover,
    {
      workspaceId: workspaceId
    }
  );
  // #endregion

  // #region APIs.
  // Get workspaces data from backend.
  const { isFetching: isWorkspacesDataFetching } = useZRQGetRequest<
    workspaceInterface[]
  >({
    _url: API_URL_ENUM.workspace_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN]
  });

  const { isFetching: isSharedWorkspacesDataFetching } = useZRQGetRequest<
    workspaceInterface[]
  >({
    _url: API_URL_ENUM.ws_share_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MAIN]
  });

  // get workspace data api.
  const { data: currentWorkspaceData, isFetching: isCurrentWorkspaceFetching } =
    useZRQGetRequest<workspaceInterface>({
      _url: API_URL_ENUM.workspace_update_delete,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.GET,
        workspaceId || ''
      ],
      _authenticated: true,
      _itemsIds: [workspaceId || ''],
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
      _shouldFetchWhenIdPassed: !workspaceId ? true : false,
      _extractType: ZRQGetRequestExtractEnum.extractItem
    });
  // #endregion

  const isZFetching = isCurrentWorkspaceFetching && isWorkspacesDataFetching;

  if (isZFetching) return <ZWorkspaceSwitcherSkeleton />;

  return (
    <ZIonButton
      fill='outline'
      color='tertiary'
      height={isLgScale ? '2.3rem' : '1.9rem'}
      size={!isLgScale ? 'small' : 'default'}
      testingselector={CONSTANTS.testingSelectors.topBar.workspaceSwitcherBtn}
      onClick={(event: unknown) => {
        presentZWorkspacesListPopover({
          _event: event as Event,
          _cssClass: 'z-workspaces-list-popover-size',
          _dismissOnSelect: false
        });
      }}
      className={classNames({
        'ion-text-capitalize my-0 ion-no-margin zaions__bg_white mt-[2px]':
          true,
        'me-2 ms-2': false,
        'me-0 ms-1 ion-no-padding': false
      })}
      style={{
        '--border-width': '1px'
        // border: '1px solid',
      }}>
      <ZUserAvatarButton
        userAvatar={currentWorkspaceData?.workspaceImage}
        userAvatarUi={{
          name: currentWorkspaceData?.workspaceName
        }}
        className={classNames({
          'me-2': true,
          'w-[20px!important] h-[20px!important]': !isLgScale,
          'w-[30px!important] h-[30px!important]': isLgScale
        })}
      />
      <div
        className={classNames({
          'overflow-hidden line-clamp-1 ion-text-start': true,
          'w-[3rem]': isLgScale,
          'w-auto': !isLgScale
        })}>
        <ZIonLabel>{currentWorkspaceData?.workspaceName}</ZIonLabel>
      </div>
      <ZIonIcon
        icon={caretDown}
        size='small'
        className='ms-2 w-[.8rem] mb-[3px] h-[.8rem]'
      />
    </ZIonButton>
  );
};

// Skeleton
const ZWorkspaceSwitcherSkeleton: React.FC = () => {
  const { isLgScale } = useZMediaQueryScale();

  return (
    <ZIonButton
      fill='outline'
      color='tertiary'
      height={isLgScale ? '2.3rem' : '1.9rem'}
      size={!isLgScale ? 'small' : 'default'}
      className={classNames({
        'ion-text-capitalize my-0 ion-no-margin zaions__bg_white mt-[2px]':
          true,
        'me-2 ms-2': false,
        'me-0 ms-1 ion-no-padding': false
      })}
      style={{
        '--border-width': '1px'
      }}>
      <ZIonSkeletonText
        className={classNames({
          'me-2 rounded-full': true,
          'w-[20px!important] h-[20px!important]': !isLgScale,
          'w-[30px!important] h-[30px!important]': isLgScale
        })}
      />

      <ZIonSkeletonText
        width='3rem'
        height='.8rem'
      />

      <ZIonSkeletonText
        className='ms-2'
        width='.8rem'
        height='.8rem'
      />
    </ZIonButton>
  );
};

export default ZWorkspaceSwitcher;
