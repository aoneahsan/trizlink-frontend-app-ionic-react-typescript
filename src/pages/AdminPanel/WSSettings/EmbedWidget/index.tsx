/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { Suspense } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { useParams } from 'react-router';
import classNames from 'classnames';
import { menuController } from '@ionic/core/components';
import { filterOutline, refresh } from 'ionicons/icons';

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
import ZCan from '@/components/Can';
import { ZFallbackIonSpinner2 } from '@/components/CustomComponents/FallbackSpinner';
import EmbedWidgetsTable from '@/components/InPageComponents/ZaionsTable/embedWidgetsTable';
import ZaionsEmbedWidgetsModal from '@/components/InPageComponents/ZaionsModals/AddEmbedWidgets';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import { useZInvalidateReactQueries } from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
import { reportCustomError } from '@/utils/customErrorType';
import CONSTANTS from '@/utils/constants';
import { API_URL_ENUM } from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { FormMode } from '@/types/AdminPanel/index.type';

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

const ZWSSettingEmbedWidgetListPage: React.FC = () => {
  // getting current workspace id form params.
  const { workspaceId } = useParams<{
    workspaceId: string;
  }>();

  // #region Custom hooks.
  const { isSmScale, isLgScale } = useZMediaQueryScale();

  const { zInvalidateReactQueries } = useZInvalidateReactQueries();
  // #endregion

  // #region APIs
  // #endregion

  // #region Modals & popovers
  const { presentZIonModal: presentZEmbedWidgetsFormModal } = useZIonModal(
    ZaionsEmbedWidgetsModal,
    {
      formMode: FormMode.ADD
    }
  );
  // #endregion

  // #region Functions.
  const invalidedQueries = async () => {
    try {
      await zInvalidateReactQueries([
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN
      ]);
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  return (
    <>
      {/* filter, refresh, create buttons */}
      <ZIonRow className='border rounded-lg zaions__light_bg ion-align-items-center ion-padding'>
        <ZIonCol
          sizeXl='6'
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
              'ion-text-center': !isLgScale
            })}>
            Embed widgets
          </ZIonTitle>

          <ZIonText
            className={classNames({
              'block mt-2': true,
              'text-sm': !isLgScale,
              'ion-text-center': !isLgScale
            })}>
            Add embed widgets & manage your embed widgets
          </ZIonText>
        </ZIonCol>

        <ZIonCol
          sizeXl='6'
          sizeLg='7'
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'
          className={classNames({
            'ion-text-end': true,
            'ion-justify-content-between flex gap-1': !isLgScale && isSmScale,
            'w-full': !isSmScale
          })}>
          {/* Filter */}
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
                CONSTANTS.MENU_IDS.UTMTag_FILTERS_MENU_ID
              );
              await menuController.open(
                CONSTANTS.MENU_IDS.UTMTag_FILTERS_MENU_ID
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
            Filter
          </ZIonButton>

          {/* Refetch data button */}
          <ZIonButton
            color='primary'
            fill='outline'
            minHeight={isLgScale ? '39px' : '2rem'}
            expand={!isLgScale ? 'block' : undefined}
            className={classNames({
              'my-2': true,
              'me-2': isLgScale,
              'text-xs ion-no-margin ion-no-padding w-[33.33%]':
                !isLgScale && isSmScale,
              'w-full': !isSmScale
            })}
            onClick={() => {
              void invalidedQueries();
            }}
            testingselector={
              CONSTANTS.testingSelectors.WSSettings.teamListPage.refetchBtn
            }>
            <ZIonIcon
              slot='start'
              icon={refresh}
              className={classNames({
                'me-1': true,
                'w-4 h-4': !isLgScale,
                'ion-no-margin': !isSmScale
              })}
            />
            Refetch
          </ZIonButton>
          <ZCan havePermissions={[permissionsEnum.create_embededWidget]}>
            {/* Create new embeded widget */}
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
                presentZEmbedWidgetsFormModal({
                  _cssClass: 'utm-tags-modal-size'
                });
              }}>
              Create new embed widget
            </ZIonButton>
          </ZCan>

          {/* {!isMdScale ? (
            <ZIonButton
              expand={!isLgScale ? 'block' : undefined}
              minHeight={isLgScale ? '39px' : '2rem'}
              className={classNames({
                'my-2': true,
                'text-xs ion-no-margin ion-no-padding w-[33.33%]':
                  !isLgScale && isSmScale,
                'w-full': !isSmScale
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

      <ZCan havePermissions={[permissionsEnum.view_embededWidget]}>
        <Suspense
          fallback={
            <ZIonRow className='h-full'>
              <ZFallbackIonSpinner2 />
            </ZIonRow>
          }>
          <EmbedWidgetsTable />
        </Suspense>
      </ZCan>
    </>
  );
};

export default ZWSSettingEmbedWidgetListPage;
