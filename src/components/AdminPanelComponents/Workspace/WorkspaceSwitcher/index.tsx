/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useCallback, useState } from 'react';

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
import ZUserAvatarButton from '@/components/WorkspacesComponents/userButton';
import {
  ZIonButton,
  ZIonIcon,
  ZIonLabel,
  ZIonModal,
  ZIonSkeletonText
} from '@/components/ZIonComponents';
import ZWorkspacesListPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/ListPopover';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

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

const ZWorkspaceSwitcher: React.FC<{
  workspaceId?: string;
  shareWSMemberId?: string;
  wsShareId?: string;
}> = ({ workspaceId, shareWSMemberId, wsShareId }) => {
  const [isSheetModalOpen, setIsSheetModalOpen] = useState(false);
  const { isLgScale, isMdScale } = useZMediaQueryScale();
  const { zNavigatePushRoute } = useZNavigate();
  // const { workspaceId } = useParams<{ workspaceId?: string }>();
  // #region popovers.
  const { presentZIonPopover: presentZWorkspacesListPopover } = useZIonPopover(
    ZWorkspacesListPopover,
    {
      workspaceId,
      shareWSMemberId,
      wsShareId
    }
  );
  // #endregion

  // #region APIs.
  // get workspace data api.
  const { data: currentWorkspaceData, isFetching: isCurrentWorkspaceFetching } =
    useZRQGetRequest<workspaceInterface>({
      _url: API_URL_ENUM.workspace_update_delete,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.GET,
        workspaceId ?? ''
      ],
      _authenticated: true,
      _itemsIds: [workspaceId ?? ''],
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
      _shouldFetchWhenIdPassed: !(
        workspaceId != null && workspaceId?.length > 0
      ),
      _extractType: ZRQGetRequestExtractEnum.extractItem
    });

  // get workspace data api.
  const { data: getShareWSInfoData, isFetching: isGetShareWSInfoDataFetching } =
    useZRQGetRequest<workspaceInterface>({
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.SHARE_WS_INFO,
        wsShareId ?? ''
      ],
      _url: API_URL_ENUM.ws_share_info_data,
      _shouldFetchWhenIdPassed: !(
        shareWSMemberId != null && shareWSMemberId?.length > 0
      ),
      _itemsIds: [shareWSMemberId ?? ''],
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
      _extractType: ZRQGetRequestExtractEnum.extractItem,
      _showLoader: false
    });

  // Get workspaces data from backend.
  const { isFetching: isWorkspacesDataFetching } = useZRQGetRequest<
    workspaceInterface[]
  >({
    _url: API_URL_ENUM.workspace_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN]
  });

  // #endregion

  // #region Functions
  const closeSheetModal = useCallback(() => {
    setIsSheetModalOpen(() => false);
  }, []);
  // #endregion

  // #region comp constants
  let isZFetching = isWorkspacesDataFetching;

  if (workspaceId !== undefined && workspaceId !== null) {
    isZFetching = isZFetching && isCurrentWorkspaceFetching;
  } else if (wsShareId !== undefined && wsShareId !== null) {
    isZFetching = isZFetching && isGetShareWSInfoDataFetching;
  }

  if (isZFetching) return <ZWorkspaceSwitcherSkeleton />;

  const _style = {
    '--border-width': '1px'
  };
  // #endregion

  return (
    <>
      <ZIonButton
        fill='outline'
        color='tertiary'
        height={isLgScale ? '2.3rem' : '1.9rem'}
        size={!isLgScale ? 'small' : 'default'}
        testingselector={CONSTANTS.testingSelectors.topBar.workspaceSwitcherBtn}
        onClick={(event: unknown) => {
          if (isMdScale) {
            presentZWorkspacesListPopover({
              _event: event as Event,
              _cssClass: 'z-workspaces-list-popover-size',
              _dismissOnSelect: false
            });
          } else {
            setIsSheetModalOpen(() => true);
          }
        }}
        className={classNames({
          'ion-text-capitalize my-0 ion-no-margin zaions__bg_white mt-[2px]':
            true,
          'me-2 ms-2': false,
          'me-0 ms-1 ion-no-padding': false
        })}
        style={_style}>
        <ZUserAvatarButton
          userAvatar={
            workspaceId !== undefined && workspaceId !== null
              ? currentWorkspaceData?.workspaceImage
              : wsShareId !== undefined && wsShareId !== null
                ? getShareWSInfoData?.workspaceImage
                : ''
          }
          userAvatarUi={
            workspaceId !== undefined && workspaceId !== null
              ? {
                  name: currentWorkspaceData?.workspaceName
                }
              : wsShareId !== undefined && wsShareId !== null
                ? {
                    name: getShareWSInfoData?.workspaceName
                  }
                : undefined
          }
          className={classNames({
            'me-2': isLgScale,
            'w-[20px!important] h-[20px!important]': !isLgScale,
            'w-[30px!important] h-[30px!important]': isLgScale
          })}
        />
        {isLgScale ? (
          <div
            className={classNames({
              'overflow-hidden line-clamp-1 ion-text-start': true,
              'w-[3rem]': isLgScale,
              'w-auto': !isLgScale
            })}>
            <ZIonLabel>
              {workspaceId !== undefined && workspaceId !== null
                ? currentWorkspaceData?.workspaceName
                : wsShareId !== undefined && wsShareId !== null
                  ? getShareWSInfoData?.workspaceName
                  : null}
            </ZIonLabel>
          </div>
        ) : null}
        <ZIonIcon
          icon={caretDown}
          size='small'
          className='ms-2 w-[.8rem] mb-[3px] h-[.8rem]'
        />
      </ZIonButton>

      {/* Sheet Modal shown below Md screen */}
      <ZIonModal
        isOpen={isSheetModalOpen}
        initialBreakpoint={1}
        breakpoints={[0, 1]}
        className='z-ion-height-auto'
        onDidDismiss={() => {
          closeSheetModal();
        }}>
        <ZWorkspacesListPopover
          workspaceId={workspaceId ?? ''}
          shareWSMemberId={shareWSMemberId}
          wsShareId={wsShareId}
          zNavigatePushRoute={zNavigatePushRoute}
          dismissZIonPopover={closeSheetModal}
        />
      </ZIonModal>
    </>
  );
};

// Skeleton
const ZWorkspaceSwitcherSkeleton: React.FC = () => {
  const { isLgScale } = useZMediaQueryScale();

  // #region comp constants
  const _style = {
    '--border-width': '1px'
  };
  // #endregion

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
      style={_style}>
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
