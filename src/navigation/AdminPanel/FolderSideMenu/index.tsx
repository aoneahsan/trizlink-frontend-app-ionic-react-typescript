/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { menuController } from '@ionic/core/components';
import { ItemReorderEventDetail } from '@ionic/react';
import { IonReorderGroupCustomEvent } from '@ionic/core';
import { appsOutline, closeOutline, ellipsisVertical } from 'ionicons/icons';
import { useParams } from 'react-router';
import classNames from 'classnames';
import { useSetRecoilState } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonIcon,
  ZIonItem,
  ZIonLabel,
  ZIonList,
  ZIonMenu,
  ZIonText,
  ZIonReorder,
  ZIonReorderGroup,
  ZIonButton,
  ZIonHeader,
  ZIonTitle,
  ZIonContent,
  ZIonFooter
} from '@/components/ZIonComponents';
import ZUtilityButtonGroup from '@/components/AdminPanelComponents/UtilityButtonGroup';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import ZaionsAddNewFolder from '@/components/InPageComponents/ZaionsModals/AddNewFolder';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { PAGE_MENU_SIDE } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import { replaceRouteParams } from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { LinkFolderType } from '@/types/AdminPanel/linksType';
import { folderState, FormMode } from '@/types/AdminPanel/index.type';

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
interface AdminPanelFoldersSidebarMenuInterface {
  menuSide?: PAGE_MENU_SIDE;
  contentId?: string;
  foldersData?: LinkFolderType[];
  state?: folderState;
  showSaveReorderButton?: boolean;
  handleReorderFn?: (
    event: IonReorderGroupCustomEvent<ItemReorderEventDetail>
  ) => void;
  menuId?: string;
  folderActionHandlerFn?: React.MouseEventHandler<HTMLIonButtonElement>;
  saveReorderButtonFn?: React.MouseEventHandler<HTMLIonButtonElement>;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const AdminPanelFoldersSidebarMenu: React.FC<
  AdminPanelFoldersSidebarMenuInterface
> = ({
  menuSide,
  contentId,
  foldersData,
  state,
  showSaveReorderButton,
  menuId,
  handleReorderFn,
  folderActionHandlerFn,
  saveReorderButtonFn
}) => {
  // #region custom hooks.
  const { zNavigatePushRoute } = useZNavigate();
  const { isLgScale, isMdScale } = useZMediaQueryScale();
  // #endregion

  const setFolderFormState = useSetRecoilState(FolderFormState);

  const { workspaceId } = useParams<{
    workspaceId: string;
  }>();

  const { presentZIonModal: presentFolderModal } = useZIonModal(
    ZaionsAddNewFolder,
    {
      state: state,
      workspaceId
    }
  );

  return (
    <ZIonMenu
      contentId={contentId}
      side={menuSide || 'end'}
      menuId={menuId}>
      {/* Header */}
      <ZIonHeader className='flex px-3 py-2 border-b shadow-none ion-align-items-center ion-no-padding ion-justify-content-between'>
        <ZIonTitle
          className={classNames({
            'block font-semibold ion-no-padding': true,
            'text-xl': isLgScale,
            'text-lg': !isLgScale
          })}>
          Short links folders
        </ZIonTitle>

        <ZIonIcon
          icon={closeOutline}
          className='w-6 h-6 pt-[1px] cursor-pointer'
          onClick={async () => {
            await menuController.close(
              CONSTANTS.MENU_IDS.ADMIN_PAGE_SHORT_LINKS_FOLDERS_MENU_ID
            );
          }}
        />
      </ZIonHeader>

      {/* Content */}
      <ZIonContent style={{ '--padding-top': '7px' }}>
        <div className='flex flex-col h-full gap-1'>
          <div className='max-h-[66%] min-h-max'>
            <ZCustomScrollable
              className='w-full h-full'
              scrollY={true}>
              <ZIonList
                lines='none'
                className='w-full py-0'>
                <ZIonItem
                  minHeight='2rem'
                  className='cursor-pointer ms-2'
                  onClick={() => {
                    zNavigatePushRoute(
                      replaceRouteParams(
                        ZaionsRoutes.AdminPanel.ShortLinks.Main,
                        [
                          CONSTANTS.RouteParams.workspace.workspaceId,
                          CONSTANTS.RouteParams
                            .folderIdToGetShortLinksOrLinkInBio
                        ],
                        [workspaceId, 'all']
                      )
                    );
                  }}>
                  <ZIonText>Default</ZIonText>
                </ZIonItem>

                {foldersData && foldersData.length ? (
                  <ZIonReorderGroup
                    disabled={false}
                    onIonItemReorder={handleReorderFn}>
                    {foldersData.map(el => (
                      <ZIonItem
                        key={el.id}
                        data-folder-id={el.id}
                        minHeight='2.3rem'
                        className={`cursor-pointer zaions-short-link-folder-${
                          state || ''
                        }`}>
                        <ZIonLabel
                          className='my-0'
                          onClick={() => {
                            zNavigatePushRoute(
                              replaceRouteParams(
                                ZaionsRoutes.AdminPanel.ShortLinks.Main,
                                [
                                  CONSTANTS.RouteParams.workspace.workspaceId,
                                  CONSTANTS.RouteParams
                                    .folderIdToGetShortLinksOrLinkInBio
                                ],
                                [workspaceId, el.id!]
                              )
                            );
                          }}>
                          {el.title}
                        </ZIonLabel>
                        <ZIonButton
                          fill='clear'
                          color='dark'
                          size='small'
                          value={el.id}
                          onClick={event => {
                            folderActionHandlerFn &&
                              folderActionHandlerFn(event);
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
                    ))}
                  </ZIonReorderGroup>
                ) : (
                  ''
                )}
              </ZIonList>
            </ZCustomScrollable>
          </div>

          <div className='px-1 mx-3 mb-1'>
            <ZIonButton
              className='mt-3 mb-2 ion-text-capitalize ion-no-margin ion-no-padding'
              minHeight='1.9rem'
              fill='outline'
              expand='block'
              onClick={() => {
                setFolderFormState(oldVal => ({
                  ...oldVal,
                  id: '',
                  name: '',
                  formMode: FormMode.ADD
                }));
                presentFolderModal({
                  _cssClass: 'link-in-bio-folder-modal'
                });
              }}>
              New Folder
            </ZIonButton>

            {!isMdScale ? <ZUtilityButtonGroup /> : null}
          </div>
        </div>
      </ZIonContent>

      <ZIonFooter className='py-1'>
        {showSaveReorderButton && (
          <ZIonButton
            className='ion-margin-horizontal ion-no-padding'
            expand='block'
            color='tertiary'
            minHeight='1.9rem'
            onClick={event => {
              saveReorderButtonFn && void saveReorderButtonFn(event);
            }}>
            save reorder
          </ZIonButton>
        )}
      </ZIonFooter>
    </ZIonMenu>
  );
};

export default AdminPanelFoldersSidebarMenu;
