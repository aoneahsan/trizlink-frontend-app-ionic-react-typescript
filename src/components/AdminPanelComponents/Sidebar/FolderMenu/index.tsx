/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';
/**
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { appsOutline, ellipsisVertical } from 'ionicons/icons';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useParams } from 'react-router';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCol,
  ZIonIcon,
  ZIonItem,
  ZIonLabel,
  ZIonList,
  ZIonReorder,
  ZIonReorderGroup,
  ZIonSkeletonText,
  ZIonText
} from '@/components/ZIonComponents';
import { ZDashboardRState } from '@/ZaionsStore/UserDashboard/ZDashboard';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import ZCan from '@/components/Can';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import { createRedirectRoute, replaceParams } from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  AdminPanelSidebarMenuPageEnum,
  FormMode,
  ZDashboardFolderMenuInterface
} from '@/types/AdminPanel/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { FolderFormState } from '@/ZaionsStore/FormStates/folderFormState.recoil';
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

const ZDashboardFolderMenu: React.FC<ZDashboardFolderMenuInterface> = ({
  type,
  foldersData,
  showFoldersSaveReorderButton,
  showSkeleton = false,
  handleFoldersReorder,
  addNewFolderButtonOnClickHandler,
  foldersSaveReorderButtonOnClickHandler,
  folderActionsButtonOnClickHandler
}) => {
  // Custom Hooks
  const { zNavigatePushRoute } = useZNavigate();

  // getting current workspace id form params.
  const { workspaceId } = useParams<{
    workspaceId: string;
  }>();

  const ZDashboardState = useRecoilValue(ZDashboardRState);

  //
  const setFolderFormState = useSetRecoilState(FolderFormState);

  // Request for getting short links folders.
  // const { data: shortLinksFoldersData } = useZRQGetRequest<LinkFolderType[]>({
  // 	_url: API_URL_ENUM.folders_create_list,
  // 	// _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN],
  // 	_key: ['make'],
  // });

  return (
    <ZIonCol
      className='border-e-[1px] zaions-transition h-full'
      // size={
      // 	ZDashboardState.dashboardMainSidebarIsCollabes.isExpand ? '2' : '2.4'
      // }
    >
      <ZCustomScrollable
        className='w-full h-full ion-padding-top ion-padding'
        scrollY={true}>
        <ZIonList lines='none'>
          <ZIonItem className='p-0 mb-2 text-xl font-bold cursor-pointer'>
            🔗 All{' '}
            {type === AdminPanelSidebarMenuPageEnum.shortLink
              ? 'links'
              : type === AdminPanelSidebarMenuPageEnum.linkInBio
              ? 'Link In Bios'
              : ''}
          </ZIonItem>
          <ZIonItem>
            <ZIonList
              lines='none'
              className='w-full'>
              <ZIonItem className='ion-no-padding'>
                <ZIonText
                  color='primary'
                  className='block text-xl font-bold'>
                  📂 Folders
                </ZIonText>
              </ZIonItem>

              <ZCan havePermissions={[permissionsEnum.view_folder]}>
                <ZIonItem
                  className='cursor-pointer'
                  testingselector={`${CONSTANTS.testingSelectors.folder.singleFolder}-default-${type}`}
                  style={{
                    '--inner-padding-end': '0px',
                    '--padding-start': '0px'
                  }}
                  onClick={() => {
                    switch (type) {
                      case AdminPanelSidebarMenuPageEnum.shortLink:
                        zNavigatePushRoute(
                          createRedirectRoute({
                            url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
                            params: [
                              CONSTANTS.RouteParams.workspace.workspaceId,
                              CONSTANTS.RouteParams
                                .folderIdToGetShortLinksOrLinkInBio
                            ],
                            values: [workspaceId, 'all']
                          })
                        );
                        break;

                      case AdminPanelSidebarMenuPageEnum.linkInBio:
                        zNavigatePushRoute(
                          createRedirectRoute({
                            url: ZaionsRoutes.AdminPanel.LinkInBio.Main,
                            params: [
                              CONSTANTS.RouteParams.workspace.workspaceId,
                              CONSTANTS.RouteParams
                                .folderIdToGetShortLinksOrLinkInBio
                            ],
                            values: [workspaceId, 'all']
                          })
                        );
                        break;
                    }
                  }}>
                  <ZIonLabel>Default</ZIonLabel>
                  <ZIonIcon
                    slot='start'
                    icon={appsOutline}
                    className='w-4 h-4 me-3'
                  />
                </ZIonItem>
              </ZCan>

              {!showSkeleton && foldersData && foldersData.length ? (
                <ZIonReorderGroup
                  disabled={false}
                  onIonItemReorder={handleFoldersReorder}>
                  {foldersData.map(el => (
                    <ZCan
                      havePermissions={[permissionsEnum.view_folder]}
                      key={el.id}>
                      <ZIonItem
                        data-folder-id={el.id}
                        style={{
                          '--inner-padding-end': '0px',
                          '--padding-start': '0px'
                        }}
                        className={classNames({
                          'cursor-pointer': true,
                          'zaions-short-link-folder':
                            type === AdminPanelSidebarMenuPageEnum.shortLink,
                          'zaions-link-in-bio-folder':
                            type === AdminPanelSidebarMenuPageEnum.linkInBio
                        })}>
                        <ZIonLabel
                          testingselector={`${CONSTANTS.testingSelectors.folder.singleFolder}-${type}`}
                          testinglistselector={`${CONSTANTS.testingSelectors.folder.singleFolder}-${type}-${el.id}`}
                          onClick={() => {
                            if (el.id) {
                              switch (type) {
                                case AdminPanelSidebarMenuPageEnum.shortLink:
                                  zNavigatePushRoute(
                                    createRedirectRoute({
                                      url: ZaionsRoutes.AdminPanel.ShortLinks
                                        .Main,
                                      params: [
                                        CONSTANTS.RouteParams.workspace
                                          .workspaceId,
                                        CONSTANTS.RouteParams
                                          .folderIdToGetShortLinksOrLinkInBio
                                      ],
                                      values: [workspaceId, el.id]
                                    })
                                  );
                                  break;

                                case AdminPanelSidebarMenuPageEnum.linkInBio:
                                  zNavigatePushRoute(
                                    createRedirectRoute({
                                      url: ZaionsRoutes.AdminPanel.LinkInBio
                                        .Main,
                                      params: [
                                        CONSTANTS.RouteParams.workspace
                                          .workspaceId,
                                        CONSTANTS.RouteParams
                                          .folderIdToGetShortLinksOrLinkInBio
                                      ],
                                      values: [workspaceId, el.id]
                                    })
                                  );
                                  break;
                              }
                            }
                          }}>
                          {el.title}
                        </ZIonLabel>
                        <ZIonButton
                          fill='clear'
                          color='dark'
                          size='small'
                          value={el.id}
                          testingselector={`${CONSTANTS.testingSelectors.folder.actionPopoverBtn}-${type}`}
                          testinglistselector={`${CONSTANTS.testingSelectors.folder.actionPopoverBtn}-${type}-${el.id}`}
                          onClick={event => {
                            folderActionsButtonOnClickHandler &&
                              folderActionsButtonOnClickHandler(event);

                            setFolderFormState(oldVal => ({
                              ...oldVal,
                              id: el.id,
                              name: el.title,
                              formMode: FormMode.EDIT
                            }));
                          }}
                          className='ion-no-padding ms-auto'>
                          <ZIonIcon icon={ellipsisVertical} />
                        </ZIonButton>
                        <ZIonReorder
                          slot='start'
                          className='me-3'>
                          <ZIonIcon icon={appsOutline} />
                        </ZIonReorder>
                      </ZIonItem>
                    </ZCan>
                  ))}
                </ZIonReorderGroup>
              ) : null}

              {showSkeleton &&
                [1, 2, 3].map(el => (
                  <ZIonItem
                    key={el}
                    className={classNames({
                      'cursor-pointer ': true,
                      'zaions-short-link-folder':
                        type === AdminPanelSidebarMenuPageEnum.shortLink,
                      'zaions-link-in-bio-folder':
                        type === AdminPanelSidebarMenuPageEnum.linkInBio
                    })}>
                    <ZIonText
                      slot='start'
                      className='me-3'>
                      <ZIonSkeletonText
                        height='1rem'
                        width='1rem'
                        animated={true}
                      />
                    </ZIonText>
                    <ZIonLabel>
                      <ZIonSkeletonText
                        height='1rem'
                        width='7rem'
                        animated={true}
                      />
                    </ZIonLabel>
                    <ZIonButton
                      fill='clear'
                      color='dark'
                      size='small'
                      className='ion-no-padding ms-auto'>
                      <ZIonSkeletonText
                        height='1rem'
                        width='1rem'
                        animated={true}
                      />
                    </ZIonButton>
                  </ZIonItem>
                ))}
            </ZIonList>
          </ZIonItem>
        </ZIonList>

        <ZCan havePermissions={[permissionsEnum.create_folder]}>
          <ZIonButton
            className='ion-text-capitalize ion-margin-horizontal'
            fill='outline'
            expand='block'
            onClick={addNewFolderButtonOnClickHandler}
            testingselector={`${CONSTANTS.testingSelectors.folder.create}-${type}`}>
            New Folder
          </ZIonButton>
        </ZCan>

        {showFoldersSaveReorderButton && (
          <ZIonButton
            className='absolute bottom-0 ion-text-capitalize ion-margin-horizontal'
            expand='block'
            testingselector={`${CONSTANTS.testingSelectors.folder.reorderBtn}-${type}`}
            onClick={foldersSaveReorderButtonOnClickHandler}
            style={{ width: '78%' }}>
            save reorder
          </ZIonButton>
        )}
      </ZCustomScrollable>
    </ZIonCol>
  );
};

export default ZDashboardFolderMenu;
