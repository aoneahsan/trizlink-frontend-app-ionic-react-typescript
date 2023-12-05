/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { pencilOutline, trashOutline } from 'ionicons/icons';
import { useRecoilState } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonIcon,
  ZIonList,
  ZIonText
} from '@/components/ZIonComponents';
import ZaionsAddNewFolder from '@/components/InPageComponents/ZaionsModals/AddNewFolder';
import ZCan from '@/components/Can';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import {
  useZIonAlert,
  useZIonErrorAlert,
  useZIonModal
} from '@/ZaionsHooks/zionic-hooks';
import {
  useZGetRQCacheData,
  useZRQDeleteRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import { showSuccessNotification } from '@/utils/notification';
import {
  API_URL_ENUM,
  extractInnerDataOptionsEnum,
  ZWSTypeEum
} from '@/utils/enums';
import { extractInnerData } from '@/utils/helpers';
import {
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { folderState, FormMode } from '@/types/AdminPanel/index.type';
import { type LinkFolderType } from '@/types/AdminPanel/linksType';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { FolderFormState } from '@/ZaionsStore/FormStates/folderFormState.recoil';

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
const FolderActionsPopoverContent: React.FC<{
  workspaceId?: string;
  shareWSMemberId?: string;
  wsShareId?: string;
  state: folderState;
}> = ({ workspaceId, shareWSMemberId, wsShareId, state }) => {
  /**
   * hook to present folder form modal
   */
  const { presentZIonModal: presentFolderModal } = useZIonModal(
    ZaionsAddNewFolder,
    { workspaceId, shareWSMemberId, wsShareId, state }
  );

  // Custom hooks.
  const { presentZIonAlert } = useZIonAlert();
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();

  /**
   * recoil state which will hold the single folder data (for updating). when user click on edit button in action popover the data of that folder will storing in this state and present as initial value in the update folder form. here we are delete it folder by getting the id from folderFormState
   *
   */
  const [folderFormState, setFolderFormState] = useRecoilState(FolderFormState);

  /**
   * delete short link folder api.
   */
  const { mutateAsync: deleteFolderMutate } = useZRQDeleteRequest({
    _url: API_URL_ENUM.folders_get_update_delete
  });

  /**
   * deleteFolderAccount will show the confirm alert before deleting short link folder.
   */
  const deleteFolderAccount = async (): Promise<void> => {
    try {
      if (folderFormState?.id !== null && folderFormState?.id !== undefined) {
        await presentZIonAlert({
          header: `Delete Folder "${folderFormState?.name ?? ''}"`,
          subHeader: 'Remove folder from user account.',
          message: 'Are you sure you want to delete this folder?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Delete',
              role: 'danger',
              handler: () => {
                void removeFolderAccount();
              }
            }
          ]
        });
      } else {
        await presentZIonErrorAlert();
      }
    } catch (error) {
      console.error(error);
    }
  };
  /**
   * removeFolderAccount will hit delete short link folder api
   */
  const removeFolderAccount = async (): Promise<void> => {
    try {
      if (folderFormState?.id !== null && folderFormState?.id !== undefined) {
        // hitting the delete api
        const _response = await deleteFolderMutate({
          itemIds:
            workspaceId !== undefined &&
            workspaceId !== null &&
            workspaceId?.trim()?.length > 0
              ? [ZWSTypeEum.personalWorkspace, workspaceId, folderFormState?.id]
              : wsShareId !== undefined &&
                wsShareId !== null &&
                wsShareId?.trim()?.length > 0 &&
                shareWSMemberId !== undefined &&
                shareWSMemberId !== null &&
                shareWSMemberId?.trim()?.length > 0
              ? [
                  ZWSTypeEum.shareWorkspace,
                  shareWSMemberId,
                  folderFormState?.id
                ]
              : [],
          urlDynamicParts: [
            CONSTANTS.RouteParams.workspace.type,
            CONSTANTS.RouteParams.workspace.workspaceId,
            CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
          ]
        });

        if (_response !== undefined && _response !== null) {
          const _data = extractInnerData<{ success: boolean }>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data !== undefined && _data !== null && _data?.success) {
            let _oldFoldersData: LinkFolderType[] = [];

            if (
              workspaceId !== undefined &&
              workspaceId !== null &&
              workspaceId?.trim()?.length > 0
            ) {
              _oldFoldersData =
                (getRQCDataHandler<LinkFolderType[]>({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN,
                    workspaceId,
                    state
                  ]
                }) as LinkFolderType[]) ?? [];
            } else if (
              wsShareId !== undefined &&
              wsShareId !== null &&
              wsShareId?.trim()?.length > 0 &&
              shareWSMemberId !== undefined &&
              shareWSMemberId !== null &&
              shareWSMemberId?.trim()?.length > 0
            ) {
              _oldFoldersData =
                (getRQCDataHandler<LinkFolderType[]>({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.SWS_MAIN,
                    wsShareId,
                    shareWSMemberId,
                    state
                  ]
                }) as LinkFolderType[]) ?? [];
            }

            // getting all the folders from RQ cache.
            const _oldRQCacheFoldersData =
              extractInnerData<LinkFolderType[]>(
                _oldFoldersData,
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) ?? [];

            // removing deleted folder from cache.
            const _updatedFolders = _oldRQCacheFoldersData?.filter(
              el => el?.id !== folderFormState?.id
            );

            // Updating data in RQ cache.
            if (
              workspaceId !== undefined &&
              workspaceId !== null &&
              workspaceId?.trim()?.length > 0
            ) {
              await updateRQCDataHandler<LinkFolderType[] | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN,
                  workspaceId,
                  state
                ],
                data: _updatedFolders,
                id: '',
                extractType: ZRQGetRequestExtractEnum.extractItems,
                updateHoleData: true
              });
            } else if (
              wsShareId !== undefined &&
              wsShareId !== null &&
              wsShareId?.trim()?.length > 0 &&
              shareWSMemberId !== undefined &&
              shareWSMemberId !== null &&
              shareWSMemberId?.trim()?.length > 0
            ) {
              await updateRQCDataHandler<LinkFolderType[] | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.SWS_MAIN,
                  wsShareId,
                  shareWSMemberId,
                  state
                ],
                data: _updatedFolders,
                id: '',
                extractType: ZRQGetRequestExtractEnum.extractItems,
                updateHoleData: true
              });
            }

            // setting the folderFormState to initial state because the value of this recoil state is used as the initial values of the short link folder form, when we click on the delete button in popover it will store the value or that folder in this recoil state. because we need it in here for example the id to delete the folder.
            setFolderFormState(oldVal => ({
              ...oldVal,
              id: '',
              name: '',
              formMode: FormMode.ADD
            }));

            // show success message after deleting
            showSuccessNotification('Folder deleted successfully.');
          }
        }
      } else {
        await presentZIonErrorAlert();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ZIonList lines='none'>
      <ZCan
        shareWSId={wsShareId}
        permissionType={
          wsShareId !== undefined &&
          wsShareId !== null &&
          wsShareId?.trim()?.length > 0
            ? permissionsTypeEnum.shareWSMemberPermissions
            : permissionsTypeEnum.loggedInUserPermissions
        }
        havePermissions={
          wsShareId !== undefined &&
          wsShareId !== null &&
          wsShareId?.trim()?.length > 0
            ? state === folderState.shortlink
              ? [shareWSPermissionEnum.update_sws_sl_folder]
              : state === folderState.linkInBio
              ? [shareWSPermissionEnum.update_sws_lib_folder]
              : []
            : workspaceId !== undefined &&
              workspaceId !== null &&
              workspaceId?.trim()?.length > 0
            ? state === folderState.shortlink
              ? [permissionsEnum.update_sl_folder]
              : state === folderState.linkInBio
              ? [permissionsEnum.update_lib_folder]
              : []
            : []
        }>
        <ZIonButton
          fill='clear'
          className='ion-no-padding ion-text-capitalize'
          expand='block'
          testingselector={`${CONSTANTS.testingSelectors.folder.editBtn}-${state}`}
          testinglistselector={`${CONSTANTS.testingSelectors.folder.editBtn}-${state}-${folderFormState.id}`}
          onClick={() => {
            presentFolderModal({
              _cssClass: 'folder-modal-size'
            });
          }}>
          <ZIonIcon
            icon={pencilOutline}
            className='me-2'
          />
          <ZIonText>Rename</ZIonText>
        </ZIonButton>
      </ZCan>

      <ZCan
        shareWSId={wsShareId}
        permissionType={
          wsShareId !== undefined &&
          wsShareId !== null &&
          wsShareId?.trim()?.length > 0
            ? permissionsTypeEnum.shareWSMemberPermissions
            : permissionsTypeEnum.loggedInUserPermissions
        }
        havePermissions={
          wsShareId !== undefined &&
          wsShareId !== null &&
          wsShareId?.trim()?.length > 0
            ? state === folderState.shortlink
              ? [shareWSPermissionEnum.delete_sws_sl_folder]
              : state === folderState.linkInBio
              ? [shareWSPermissionEnum.delete_sws_lib_folder]
              : []
            : workspaceId !== undefined &&
              workspaceId !== null &&
              workspaceId?.trim()?.length > 0
            ? state === folderState.shortlink
              ? [permissionsEnum.delete_sl_folder]
              : state === folderState.linkInBio
              ? [permissionsEnum.delete_lib_folder]
              : []
            : []
        }>
        <ZIonButton
          fill='clear'
          className='ion-no-padding ion-text-capitalize'
          expand='block'
          testingselector={`${CONSTANTS.testingSelectors.folder.deleteBtn}-${state}`}
          testinglistselector={`${CONSTANTS.testingSelectors.folder.deleteBtn}-${state}-${folderFormState.id}`}
          onClick={() => {
            void deleteFolderAccount();
          }}>
          <ZIonIcon
            icon={trashOutline}
            className='me-2'
            color='danger'
          />
          <ZIonText color='danger'>Delete</ZIonText>
        </ZIonButton>
      </ZCan>
    </ZIonList>
  );
};

export default FolderActionsPopoverContent;
