/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { ItemReorderEventDetail } from '@ionic/react';
import { useRecoilState } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import AdminPanelFoldersSidebarMenu from '@/navigation/AdminPanel/FolderSideMenu';
import FolderActionsPopoverContent from '@/components/InPageComponents/ZaionsPopovers/FoldersActionPopover';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import {
  useZRQGetRequest,
  useZRQUpdateRequest
} from '@/ZaionsHooks/zreactquery-hooks';
import { useZValidateRequestResponse } from '@/ZaionsHooks/zapi-hooks';
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { API_URL_ENUM, PAGE_MENU_SIDE } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';
import { zStringify } from '@/utils/helpers';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { LinkFolderType } from '@/types/AdminPanel/linksType';
import { folderState } from '@/types/AdminPanel/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { ShortLinksFolderRStateAtom } from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinksFoldersState.recoil';
import { useParams } from 'react-router';

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

const AdminPanelShortLinksFolderSideMenu: React.FC = () => {
  // getting current workspace id Or wsShareId & shareWSMemberId form params. if workspaceId then this will be owned-workspace else if wsShareId & shareWSMemberId then this will be share-workspace
  const { workspaceId, shareWSMemberId, wsShareId } = useParams<{
    workspaceId: string;
    shareWSMemberId: string;
    wsShareId: string;
  }>();

  // #region compState.
  const [compState, setCompState] = useState<{
    shortLinksFoldersReorder: {
      Ids?: string[];
      isEnable?: boolean;
    };
  }>({
    shortLinksFoldersReorder: {
      isEnable: false
    }
  });
  // #endregion

  // #region custom hooks.
  const { validateRequestResponse } = useZValidateRequestResponse();
  // #endregion

  // #region popovers & modals.
  const { presentZIonPopover: presentFolderActionIonPopover } = useZIonPopover(
    FolderActionsPopoverContent,
    {
      workspaceId,
      shareWSMemberId,
      wsShareId,
      state: folderState.shortlink
    }
  );
  // #endregion

  // #region APIS.
  // If owned-workspace then this api will fetch owned-workspace-short-links-folder data.
  const {
    data: shortLinksFoldersData,
    isFetching: isShortLinksFoldersDataFetching
  } = useZRQGetRequest<LinkFolderType[]>({
    _url: API_URL_ENUM.ShortLink_folders_create_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN,
      workspaceId,
      folderState.shortlink
    ],
    _itemsIds: [workspaceId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _shouldFetchWhenIdPassed: workspaceId ? false : true,
    _showLoader: false
  });

  // If share-workspace then this api will fetch share-workspace-short-links-folders data.
  const {
    data: swsShortLinksFoldersData,
    isFetching: isSWSShortLinksFoldersDataFetching,
    isError: isSWSShortLinksFoldersDataError
  } = useZRQGetRequest<LinkFolderType[]>({
    _url: API_URL_ENUM.ws_share_folder_sl_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.SWS_MAIN,
      wsShareId,
      folderState.shortlink
    ],
    _itemsIds: [shareWSMemberId],
    _shouldFetchWhenIdPassed: shareWSMemberId ? false : true,
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _showLoader: false
  });

  // If owned-workspace then this api will used to update the owned-workspace-short-links-folders reorders.
  const { mutateAsync: UpdateShortLinksFoldersReorder } = useZRQUpdateRequest({
    _url: API_URL_ENUM.ShortLinks_folders_reorder,
    _queriesKeysToInvalidate: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN]
  });

  // If share-workspace then this api will used to update the share-workspace-short-links-folders reorders.
  const { mutateAsync: UpdateSWSShortLinksFoldersReorder } =
    useZRQUpdateRequest({
      _url: API_URL_ENUM.ws_share_folder_reorder,
      _queriesKeysToInvalidate: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.SWS_MAIN,
        wsShareId,
        folderState.shortlink
      ]
    });
  // #endregion

  // #region Functions.
  // folder reorder handler
  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    event.detail.complete();

    setTimeout(() => {
      const _shortLinksFoldersEls = document.querySelectorAll(
        `.zaions-short-link-folder-${folderState.shortlink}`
      );
      const _shortLinksFoldersIds: string[] = [];
      for (let i = 0; i < _shortLinksFoldersEls.length; i++) {
        const _block = _shortLinksFoldersEls[i];
        _shortLinksFoldersIds.push(
          _block.getAttribute('data-folder-id') as string
        );
      }

      if (_shortLinksFoldersIds) {
        setCompState(_ => ({
          shortLinksFoldersReorder: {
            Ids: _shortLinksFoldersIds,
            isEnable: _shortLinksFoldersIds.length > 1
          }
        }));
      }
    }, 100);
  };

  const shortLinksFoldersReorderHandler = async () => {
    try {
      let _result;
      if (workspaceId) {
        // The update api...
        _result = await UpdateShortLinksFoldersReorder({
          requestData: zStringify({
            folders: compState.shortLinksFoldersReorder.Ids
          }),
          itemIds: [],
          urlDynamicParts: []
        });
      } else if (wsShareId) {
        // The update api...
        _result = await UpdateSWSShortLinksFoldersReorder({
          requestData: zStringify({
            folders: compState.shortLinksFoldersReorder.Ids
          }),
          itemIds: [],
          urlDynamicParts: []
        });
      }

      if (_result) {
        // if _result of the UpdateShortLinksFoldersReorder api is success this showing success notification else not success then error notification.
        await validateRequestResponse({
          resultObj: _result
        });

        // hiding the reorder button by assigning isEnable to false
        setCompState(oldValues => ({
          ...oldValues,
          shortLinksFoldersReorder: {
            Ids: oldValues.shortLinksFoldersReorder.Ids,
            isEnable: false
          }
        }));
      }
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  return (
    <AdminPanelFoldersSidebarMenu
      menuSide={PAGE_MENU_SIDE.START}
      showSaveReorderButton={compState.shortLinksFoldersReorder.isEnable}
      handleReorderFn={handleReorder}
      saveReorderButtonFn={shortLinksFoldersReorderHandler}
      state={folderState.shortlink}
      menuId={CONSTANTS.MENU_IDS.ADMIN_PAGE_SHORT_LINKS_FOLDERS_MENU_ID}
      contentId={CONSTANTS.MENU_IDS.AD_SL_LIST_PAGE}
      foldersData={
        workspaceId && shortLinksFoldersData?.length
          ? shortLinksFoldersData
          : wsShareId && swsShortLinksFoldersData?.length
          ? swsShortLinksFoldersData
          : []
      }
      folderActionHandlerFn={(event: unknown) => {
        presentFolderActionIonPopover({
          _event: event as Event,
          _cssClass: 'zaions_present_folder_Action_popover_width'
        });
      }}
    />
  );
};

export default AdminPanelShortLinksFolderSideMenu;
