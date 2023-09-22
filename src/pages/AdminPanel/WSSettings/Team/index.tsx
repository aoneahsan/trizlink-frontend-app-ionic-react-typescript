/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { lazy, Suspense } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { useParams } from 'react-router';
import { filterOutline, refresh } from 'ionicons/icons';
import { menuController } from '@ionic/core/components';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCol,
  ZIonIcon,
  ZIonRow,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';
import ZWorkspacesSharingModal from '@/components/InPageComponents/ZaionsModals/Workspace/SharingModal';
import ZCan from '@/components/Can';
import { ZFallbackIonSpinner2 } from '@/components/CustomComponents/FallbackSpinner';

const ZMembersListTable = lazy(
  () =>
    import(
      '@/components/InPageComponents/ZaionsTable/Workspace/Team/MembersListTable'
    )
);

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import {
  useZInvalidateReactQueries,
  useZRQGetRequest
} from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
import { API_URL_ENUM } from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  WorkspaceSharingTabEnum,
  WSTeamMembersInterface
} from '@/types/AdminPanel/workspace';

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
 * About: (Workspace team list page)
 * @type {*}
 * */

const ZWSSettingTeamsListPage: React.FC = () => {
  // getting current workspace id form params.
  const { workspaceId } = useParams<{
    workspaceId: string;
  }>();

  // #region Custom hooks.
  const { isSmScale, isLgScale } = useZMediaQueryScale();
  const { zInvalidateReactQueries } = useZInvalidateReactQueries();
  // #endregion

  // #region Popovers & Modals.
  const { presentZIonModal: presentWorkspaceSharingModal } = useZIonModal(
    ZWorkspacesSharingModal,
    {
      Tab: WorkspaceSharingTabEnum.invite,
      workspaceId: workspaceId
    }
  );
  // #endregion

  // #region APIS
  const { data: wsTeamMembersData } = useZRQGetRequest<
    WSTeamMembersInterface[]
  >({
    _url: API_URL_ENUM.ws_team_member_getAllInvite_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS, workspaceId],
    _itemsIds: [workspaceId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId]
  });
  // #endregion

  // #region Functions.
  const invalidedQueries = async () => {
    try {
      // Invalidating RQ members cache.
      await zInvalidateReactQueries([
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
        workspaceId
      ]);
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  return (
    <>
      <ZIonRow className='border rounded-lg zaions__light_bg ion-align-items-center ion-padding'>
        <ZIonCol
          sizeXl='5'
          sizeLg='5'
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
            Members
          </ZIonTitle>

          <ZIonText
            className={classNames({
              'block mt-2': true,
              'text-sm': !isLgScale,
              'ion-text-center': !isSmScale
            })}>
            Add members & manage your members
          </ZIonText>
        </ZIonCol>

        <ZIonCol
          sizeXl='7'
          sizeLg='7'
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'
          className={classNames({
            'ion-text-end': true,
            'ion-justify-content-between flex gap-1': !isLgScale && isSmScale,
            'w-full': !isSmScale
          })}>
          {wsTeamMembersData && wsTeamMembersData?.length > 0 && (
            <ZIonButton
              fill='outline'
              color='primary'
              minHeight={isLgScale ? '39px' : '2rem'}
              expand={!isLgScale ? 'block' : undefined}
              testingselector={
                CONSTANTS.testingSelectors.WSSettings.teamListPage.timeFilterBtn
              }
              className={classNames({
                'my-2': true,
                'me-2': isLgScale,
                'text-xs ion-no-margin ion-no-padding w-[33.33%]':
                  !isLgScale && isSmScale,
                'w-full': !isSmScale,
                'ion-no-margin': !isSmScale
              })}
              onClick={async () => {
                // Open the menu by menu-id
                await menuController.enable(
                  true,
                  CONSTANTS.MENU_IDS.MEMBER_FILTERS_MENU_ID
                );
                await menuController.open(
                  CONSTANTS.MENU_IDS.MEMBER_FILTERS_MENU_ID
                );
              }}>
              <ZIonIcon
                slot='start'
                icon={filterOutline}
                className={classNames({
                  'me-1': true,
                  'w-4 h-4': !isLgScale
                })}
              />
              Filters
            </ZIonButton>
          )}

          {/* Refetch data button */}
          <ZIonButton
            fill='outline'
            color='primary'
            minHeight={isLgScale ? '39px' : '2rem'}
            expand={!isLgScale ? 'block' : undefined}
            testingselector={
              CONSTANTS.testingSelectors.WSSettings.teamListPage.refetchBtn
            }
            className={classNames({
              'my-2': true,
              'me-2': isLgScale,
              'text-xs ion-no-margin ion-no-padding w-[33.33%]':
                !isLgScale && isSmScale,
              'w-full': !isSmScale,
              'ion-no-margin': !isSmScale
            })}
            onClick={() => {
              void invalidedQueries();
            }}>
            <ZIonIcon
              slot='start'
              icon={refresh}
              className={classNames({
                'me-1': true,
                'w-4 h-4': !isLgScale
              })}
            />
            Refetch
          </ZIonButton>

          <ZCan havePermissions={[permissionsEnum.invite_WSTeamMember]}>
            <ZIonButton
              color='primary'
              fill='solid'
              minHeight={isLgScale ? '39px' : '2rem'}
              expand={!isLgScale ? 'block' : undefined}
              testingselector={
                CONSTANTS.testingSelectors.WSSettings.teamListPage.createTeamBtn
              }
              className={classNames({
                'my-2': true,
                'text-xs ion-no-margin ion-no-padding w-[33.33%]':
                  !isLgScale && isSmScale,
                'w-full': !isSmScale
              })}
              onClick={() => {
                // if (!isWorkspacesDataFetching)
                presentWorkspaceSharingModal({
                  _cssClass: 'workspace-sharing-modal-size'
                });
              }}>
              Invite member
            </ZIonButton>
          </ZCan>

          {/* {!isMdScale ? (
            <ZIonButton
              expand={!isSmScale ? 'block' : undefined}
              height={isLgScale ? '39px' : '20px'}
              className={classNames({
                'my-2': true,
                'text-xs': !isLgScale,
                'ion-no-margin': !isSmScale
              })}
              onClick={async () => {
                // Open the menu by menu-id
                await menuController.enable(
                  true,
                  CONSTANTS.MENU_IDS.WS_SETTINGS_PAGE_MENU_ID
                );
                await menuController.open(
                  CONSTANTS.MENU_IDS.WS_SETTINGS_PAGE_MENU_ID
                );
              }}>
              Open menu
            </ZIonButton>
          ) : null} */}
        </ZIonCol>
      </ZIonRow>

      {/* Teams Table */}
      <ZCan havePermissions={[permissionsEnum.viewAny_WSTeamMember]}>
        <Suspense
          fallback={
            <ZIonRow className='h-full'>
              <ZFallbackIonSpinner2 />
            </ZIonRow>
          }>
          <ZMembersListTable />
        </Suspense>
      </ZCan>
    </>
  );
};

export default ZWSSettingTeamsListPage;
