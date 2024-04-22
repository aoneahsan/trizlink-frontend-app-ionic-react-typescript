/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { type ItemReorderEventDetail } from '@ionic/react';
import { useRecoilState } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import AdminPanelFoldersSidebarMenu from '@/navigation/AdminPanel/FolderSideMenu';

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
import { API_URL_ENUM, PAGE_MENU_SIDE, ZWSTypeEum } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';
import { zStringify } from '@/utils/helpers';

import { folderState } from '@/types/AdminPanel/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { LinkInBioFolderRState } from '@/ZaionsStore/UserDashboard/LinkInBio/linkInBioFoldersState.recoil';
import FolderActionsPopoverContent from '@/components/InPageComponents/ZaionsPopovers/FoldersActionPopover';
import { useParams } from 'react-router';
import { LinkFolderType } from '@/types/AdminPanel/linksType';

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

const AdminPanelLinkInBioFolderSideMenu: React.FC = () => {
  // getting current workspace id Or wsShareId & shareWSMemberId form params. if workspaceId then this will be owned-workspace else if wsShareId & shareWSMemberId then this will be share-workspace
  const { workspaceId, shareWSMemberId, wsShareId } = useParams<{
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  // #region compState.
  const [compState, setCompState] = useState<{
    linkInBioFoldersReorder: {
      Ids?: string[];
      isEnable?: boolean;
    };
  }>({
    linkInBioFoldersReorder: {
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
      state: folderState.linkInBio
    }
  );
  // #endregion

  // #region APIS.
  const { data: libFoldersData } = useZRQGetRequest<LinkFolderType[]>({
    _url: API_URL_ENUM.folders_list,
    _key:
      workspaceId !== undefined &&
      workspaceId !== null &&
      workspaceId?.trim()?.length > 0
        ? [
            CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN,
            workspaceId,
            folderState.linkInBio
          ]
        : wsShareId !== undefined &&
            wsShareId !== null &&
            wsShareId?.trim()?.length > 0 &&
            shareWSMemberId !== undefined &&
            shareWSMemberId !== null &&
            shareWSMemberId?.trim()?.length > 0
          ? [
              CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.SWS_MAIN,
              wsShareId,
              shareWSMemberId,
              folderState.linkInBio
            ]
          : [CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN],
    _itemsIds:
      workspaceId !== undefined &&
      workspaceId !== null &&
      workspaceId?.trim()?.length > 0
        ? [ZWSTypeEum.personalWorkspace, workspaceId, folderState.linkInBio]
        : wsShareId !== undefined &&
            wsShareId !== null &&
            wsShareId?.trim()?.length > 0 &&
            shareWSMemberId !== undefined &&
            shareWSMemberId !== null &&
            shareWSMemberId?.trim()?.length > 0
          ? [ZWSTypeEum.shareWorkspace, shareWSMemberId, folderState.linkInBio]
          : [],
    _shouldFetchWhenIdPassed: !(
      ((wsShareId?.trim()?.length ?? 0) === 0 &&
        (shareWSMemberId?.trim()?.length ?? 0) === 0) ||
      (workspaceId?.trim()?.length ?? 0) === 0
    ),
    _urlDynamicParts: [
      CONSTANTS.RouteParams.workspace.type,
      CONSTANTS.RouteParams.workspace.workspaceId,
      CONSTANTS.RouteParams.workspace.modal
    ]
  });

  // Update shortLinks folders reorder API
  const { mutateAsync: UpdateShortLinksFoldersReorder } = useZRQUpdateRequest({
    _url: API_URL_ENUM.linkInBioBlocks_reorder,
    _queriesKeysToInvalidate: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN]
  });
  // #endregion

  // #region Functions.
  // folder reorder handler
  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>): void => {
    event.detail.complete();

    setTimeout(() => {
      const _shortLinksFoldersEls = document.querySelectorAll(
        `.zaions-folder-${folderState.linkInBio}`
      );
      const _shortLinksFoldersIds: string[] = [];
      for (let i = 0; i < _shortLinksFoldersEls.length; i++) {
        const _block = _shortLinksFoldersEls[i];
        _shortLinksFoldersIds.push(
          _block.getAttribute('data-folder-id') as string
        );
      }

      if (_shortLinksFoldersIds?.length !== 0) {
        setCompState(_ => ({
          linkInBioFoldersReorder: {
            Ids: _shortLinksFoldersIds,
            isEnable: _shortLinksFoldersIds.length > 1
          }
        }));
      }
    }, 100);
  };

  // Getting short-links folders data from backend
  // const { data: _foldersData } = useZRQGetRequest<LinkFolderType[]>({
  // _url: API_URL_ENUM.LinkInBio_folders_create_list,
  // _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN,
  // workspaceId,
  // folderState.linkInBio,],
  // });

  // useEffect(() => {
  // try {
  // if (_foldersData) {
  // setLinkInBioFolderState(_foldersData);
  // }
  // } catch (error) {
  // reportCustomError(error);
  // }
  // }, [_foldersData]);

  const shortLinksFoldersReorderHandler = async (): Promise<void> => {
    try {
      // The update api...
      const _result = await UpdateShortLinksFoldersReorder({
        requestData: zStringify({
          folders: compState.linkInBioFoldersReorder.Ids
        }),
        itemIds: [],
        urlDynamicParts: []
      });

      // if _result of the UpdateShortLinksFoldersReorder api is success this showing success notification else not success then error notification.
      await validateRequestResponse({
        resultObj: _result
      });

      // hiding the reorder button by assigning isEnable to false
      setCompState(oldValues => ({
        ...oldValues,
        linkInBioFoldersReorder: {
          Ids: oldValues.linkInBioFoldersReorder.Ids,
          isEnable: false
        }
      }));
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  return (
    <AdminPanelFoldersSidebarMenu
      menuSide={PAGE_MENU_SIDE.START}
      showSaveReorderButton={compState.linkInBioFoldersReorder.isEnable}
      handleReorderFn={handleReorder}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      saveReorderButtonFn={shortLinksFoldersReorderHandler}
      state={folderState.linkInBio}
      menuId={CONSTANTS.MENU_IDS.ADMIN_PAGE_LINKS_IN_BIO_FOLDERS_MENU_ID}
      contentId={CONSTANTS.PAGE_IDS.AD_LIB_LIST_PAGE}
      foldersData={libFoldersData ?? []}
      folderActionHandlerFn={(event: unknown) => {
        presentFolderActionIonPopover({
          _event: event as Event,
          _cssClass: 'zaions_present_folder_Action_popover_width'
        });
      }}
    />
  );
};

export default AdminPanelLinkInBioFolderSideMenu;
