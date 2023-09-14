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

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonButtons,
  ZIonCol,
  ZIonIcon,
  ZIonRow,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import CONSTANTS from '@/utils/constants';
import ZaionsAddPixelAccount from '@/components/InPageComponents/ZaionsModals/AddPixelsAccount';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import {
  useZInvalidateReactQueries,
  useZRQDeleteRequest,
  useZRQGetRequest
} from '@/ZaionsHooks/zreactquery-hooks';
import { PixelAccountType } from '@/types/AdminPanel/linksType';
import { API_URL_ENUM } from '@/utils/enums';
import {
  calendar,
  filterOutline,
  pricetagOutline,
  refresh
} from 'ionicons/icons';
import ZCan from '@/components/Can';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
import { ZFallbackIonSpinner2 } from '@/components/CustomComponents/FallbackSpinner';
import ZPixelsTable from '@/components/InPageComponents/ZaionsTable/pixelAccountTable';
import { reportCustomError } from '@/utils/customErrorType';
import { FormMode } from '@/types/AdminPanel/index.type';

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

const ZWSSettingPixelListPage: React.FC = () => {
  // getting current workspace id form params.
  const { workspaceId } = useParams<{
    workspaceId: string;
  }>();

  // #region Custom hooks.
  const { isSmScale, isLgScale, isMdScale } = useZMediaQueryScale();

  const { zInvalidateReactQueries } = useZInvalidateReactQueries();
  // #endregion

  // #region APIs
  const { data: pixelAccountsData } = useZRQGetRequest<PixelAccountType[]>({
    _url: API_URL_ENUM.userPixelAccounts_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN]
  });

  const { mutate: deletePixelAccountMutate } = useZRQDeleteRequest(
    API_URL_ENUM.userPixelAccounts_update_delete
  );
  // #endregion

  // #region Modals & popovers
  const { presentZIonModal: presentZAddPixelAccount } = useZIonModal(
    ZaionsAddPixelAccount,
    { formMode: FormMode.ADD }
  );
  // #endregion

  // #region Functions.
  const invalidedQueries = async () => {
    try {
      await zInvalidateReactQueries([
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN
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
          sizeXl='6'
          sizeLg='6'
          sizeMd='6'
          sizeSm='6'
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
            Pixels
          </ZIonTitle>

          <ZIonText
            className={classNames({
              'block mt-2': true,
              'text-sm': !isLgScale,
              'ion-text-center': !isSmScale
            })}>
            Add team pixels & manage your pixels
          </ZIonText>
        </ZIonCol>

        <ZIonCol
          sizeXl='6'
          sizeLg='6'
          sizeMd='6'
          sizeSm='6'
          sizeXs='12'
          className='ion-text-end'>
          <ZIonButton
            color='primary'
            fill='solid'
            height={isLgScale ? '39px' : '20px'}
            expand={!isSmScale ? 'block' : undefined}
            testingselector={
              CONSTANTS.testingSelectors.WSSettings.teamListPage.createTeamBtn
            }
            className={classNames({
              'my-2': true,
              'text-xs': !isLgScale,
              'ion-no-margin': !isSmScale
            })}
            onClick={() => {
              presentZAddPixelAccount({
                _cssClass: 'pixel-account-modal-size'
              });
            }}>
            Create new pixel
          </ZIonButton>

          {!isMdScale ? (
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
          ) : null}
        </ZIonCol>
      </ZIonRow>

      {/* total teams count and filters buttons */}
      <ZIonRow className='mt-1 border rounded-lg zaions__light_bg ion-align-items-center ion-padding'>
        <ZIonCol className='flex ps-1 ion-align-items-center'>
          <ZIonText
            className={classNames({
              'text-2xl': true,
              'text-xl': !isLgScale,
              'ion-text-center w-full': !isSmScale
            })}>
            <ZIonText
              className='font-bold total_links pe-1'
              testingselector={
                CONSTANTS.testingSelectors.WSSettings.teamListPage.teamsCount
              }>
              {pixelAccountsData?.length || 0}
            </ZIonText>
            Pixels
          </ZIonText>
        </ZIonCol>

        <ZIonCol
          sizeXl='10'
          sizeLg='10'
          sizeMd='10'
          sizeSm='10'
          sizeXs='12'
          className={classNames({
            flex: true,
            'justify-content-end': isMdScale,
            'justify-content-between': !isMdScale
          })}>
          <ZIonButtons
            className={classNames({
              'w-full': true,
              'ion-justify-content-between flex': !isMdScale,
              'flex-col gap-2 mt-2': !isSmScale,
              'ion-justify-content-end gap-3': isMdScale,
              block: !isMdScale
            })}>
            <ZIonButton
              fill='outline'
              color='primary'
              expand={!isSmScale ? 'block' : undefined}
              height={isLgScale ? '39px' : '20px'}
              onClick={async () => {
                // Open the menu by menu-id
                await menuController.enable(
                  true,
                  CONSTANTS.MENU_IDS.P_FILTERS_MENU_ID
                );
                await menuController.open(CONSTANTS.MENU_IDS.P_FILTERS_MENU_ID);
              }}
              className={classNames({
                'my-2 normal-case': true,
                'text-xs': !isLgScale,
                'w-full': !isSmScale
              })}
              testingselector={
                CONSTANTS.testingSelectors.WSSettings.teamListPage.timeFilterBtn
              }>
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
              expand={!isSmScale ? 'block' : undefined}
              height={isLgScale ? '39px' : '20px'}
              className={classNames({
                'my-2 normal-case': true,
                'text-xs': !isLgScale,
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
                  'w-4 h-4': !isLgScale
                })}
              />
              Refetch
            </ZIonButton>
          </ZIonButtons>
        </ZIonCol>
      </ZIonRow>

      <ZCan havePermissions={[permissionsEnum.view_pixel]}>
        <Suspense
          fallback={
            <ZIonRow className='h-full'>
              <ZFallbackIonSpinner2 />
            </ZIonRow>
          }>
          <ZPixelsTable />
        </Suspense>
      </ZCan>
    </>
  );
};

export default ZWSSettingPixelListPage;
