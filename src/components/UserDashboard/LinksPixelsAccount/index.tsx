// Core Imports
import React, { useEffect } from 'react';

// Packages Import
import { apertureOutline } from 'ionicons/icons';
import { useSetRecoilState } from 'recoil';
import { useFormikContext } from 'formik';

// Custom Imports
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonIcon,
  ZIonRouterLink,
  ZIonImg,
  ZIonSkeletonText,
  ZIonButton
} from '@/components/ZIonComponents';
import ZaionsRSelect from '@/components/CustomComponents/ZaionsRSelect';
import { formatReactSelectOptionsArray } from '@/utils/helpers';
import ZaionsAddPixelAccount from '@/components/InPageComponents/ZaionsModals/AddPixelsAccount';

// Global Constants
import { API_URL_ENUM } from '@/utils/enums';
import CONSTANTS, { Platforms } from '@/utils/constants';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';

// Images

// Recoil States
import { PixelAccountsRStateAtom } from '@/ZaionsStore/UserDashboard/PixelAccountsState/index.recoil';

// Types
import {
  type PixelAccountType,
  type PixelPlatformsEnum,
  type ZaionsShortUrlOptionFieldsValuesInterface
} from '@/types/AdminPanel/linksType';
import { type ZGenericObject } from '@/types/zaionsAppSettings.type';
import { useParams } from 'react-router';
import ZCan from '@/components/Can';
import {
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

// Styles

const selectOptionComponent = (_el: PixelAccountType): JSX.Element => {
  return (
    <div
      className='flex ion-align-items-center'
      key={_el.id}>
      <ZIonImg
        src={Platforms[_el.platform as PixelPlatformsEnum]}
        style={{ width: '30px' }}
        className='pe-3'
      />
      {_el.title}
    </div>
  );
};

const LinkPixelsAccount: React.FC<{ showSkeleton?: boolean }> = ({
  showSkeleton = false
}) => {
  // getting link-in-bio and workspace ids from url with the help of useParams.
  const { workspaceId, shareWSMemberId, wsShareId } = useParams<{
    editLinkId?: string;
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  const {
    values: { linkPixelsAccount },
    setFieldValue
  } = useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

  // #region Recoils states.
  const setPixelAccountsState = useSetRecoilState(PixelAccountsRStateAtom);
  // #endregion

  // #region Popovers & Modals.
  const { presentZIonModal: presentZAddPixelAccount } = useZIonModal(
    ZaionsAddPixelAccount,
    { workspaceId, shareWSMemberId, wsShareId }
  );
  // #endregion

  // #region APIS
  const { data: getMemberRolePermissions } = useZRQGetRequest<{
    memberRole?: string;
    memberPermissions?: string[];
  }>({
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MEMBER_ROLE_AND_PERMISSIONS,
      wsShareId ?? ''
    ],
    _url: API_URL_ENUM.ws_share_member_role_permissions,
    _shouldFetchWhenIdPassed: !(
      shareWSMemberId !== undefined &&
      (shareWSMemberId?.trim()?.length ?? 0) > 0
    ),
    _itemsIds: [shareWSMemberId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _extractType: ZRQGetRequestExtractEnum.extractItem,
    _showLoader: false
  });

  const { data: pixelAccountsData } = useZRQGetRequest<PixelAccountType[]>({
    _url: API_URL_ENUM.userPixelAccounts_create_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN,
      workspaceId ?? ''
    ],
    _shouldFetchWhenIdPassed: !(
      workspaceId !== undefined && (workspaceId?.trim()?.length ?? 0) > 0
    ),
    _showLoader: false,
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _itemsIds: [workspaceId ?? '']
  });

  const { data: swsPixelAccountsData } = useZRQGetRequest<PixelAccountType[]>({
    _url: API_URL_ENUM.sws_pixel_account_create_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.SWS_MAIN,
      wsShareId ?? ''
    ],
    _shouldFetchWhenIdPassed: !(
      wsShareId !== undefined && (wsShareId?.trim()?.length ?? 0) > 0
    ),
    _showLoader: false,
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _itemsIds: [shareWSMemberId ?? '']
  });
  // #endregion

  // #region UseEffects.
  useEffect(() => {
    if (workspaceId !== undefined && pixelAccountsData !== undefined) {
      setPixelAccountsState(pixelAccountsData ?? []);
    } else if (wsShareId !== undefined && swsPixelAccountsData !== undefined) {
      setPixelAccountsState(swsPixelAccountsData ?? []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pixelAccountsData, swsPixelAccountsData]);
  // #endregion

  if (showSkeleton) {
    return <LinkPixelsAccountSkeleton />;
  }

  return (
    <ZCan
      shareWSId={wsShareId}
      permissionType={
        wsShareId !== undefined
          ? permissionsTypeEnum.shareWSMemberPermissions
          : permissionsTypeEnum.loggedInUserPermissions
      }
      havePermissions={
        wsShareId !== undefined
          ? [shareWSPermissionEnum.viewAny_sws_pixel]
          : [permissionsEnum.viewAny_pixel]
      }>
      {/* Row-1 */}
      <ZIonRow className='pt-1 border-bottom zaions__bg_white'>
        {/* Col-1 */}
        <ZIonCol className='flex px-2 py-2 ion-align-items-center'>
          {/* Icon */}
          <ZIonIcon
            icon={apertureOutline}
            size='large'
          />

          {/* Text */}
          <ZIonText className='font-bold ms-2 ion-no-margin'>
            Add Pixels ID
            <ZIonRouterLink
              className='ms-1'
              routerLink={ZaionsRoutes.HomeRoute}>
              (help)
            </ZIonRouterLink>
          </ZIonText>
        </ZIonCol>
      </ZIonRow>

      {/* Row-2 */}
      <ZIonRow className='pb-1 zaions__bg_white'>
        {/* Col-1 */}
        <ZIonCol>
          {/* Select */}
          <ZaionsRSelect
            disabled={
              !(
                (workspaceId !== undefined &&
                  (workspaceId?.trim()?.length ?? 0) > 0) ||
                (wsShareId !== undefined &&
                  [
                    shareWSPermissionEnum.create_sws_pixel,
                    shareWSPermissionEnum.update_sws_pixel
                  ].some(el =>
                    getMemberRolePermissions?.memberPermissions?.includes(el)
                  ))
              )
            }
            className='pt-0 pb-0 ion-padding'
            isMulti
            name='linkPixelsAccount'
            testingselector={
              CONSTANTS.testingSelectors.shortLink.formPage.pixelAccount
                .pixelsSelector
            }
            options={
              workspaceId !== undefined &&
              (workspaceId?.trim()?.length ?? 0) > 0
                ? pixelAccountsData !== undefined
                  ? pixelAccountsData?.map(el => {
                      return { value: el.id, label: selectOptionComponent(el) };
                    }) ?? []
                  : []
                : wsShareId !== undefined &&
                  (wsShareId?.trim()?.length ?? 0) > 0
                ? swsPixelAccountsData !== undefined
                  ? swsPixelAccountsData?.map(el => {
                      return { value: el.id, label: selectOptionComponent(el) };
                    }) ?? []
                  : []
                : []
            }
            onChange={_values => {
              if (
                (workspaceId?.length ?? 0) > 0 ||
                ((wsShareId?.length ?? 0) > 0 &&
                  [
                    shareWSPermissionEnum.create_sws_pixel,
                    shareWSPermissionEnum.update_sws_pixel
                  ].some(el =>
                    getMemberRolePermissions?.memberPermissions?.includes(el)
                  ))
              ) {
                void setFieldValue(
                  'linkPixelsAccount',
                  _values.map(el => el.value) as string[],
                  false
                );
              }
            }}
            value={
              formatReactSelectOptionsArray(
                linkPixelsAccount,
                (workspaceId?.length ?? 0) > 0
                  ? ((pixelAccountsData ?? {}) as ZGenericObject[])
                  : (wsShareId?.length ?? 0) > 0
                  ? ((swsPixelAccountsData ?? {}) as ZGenericObject[])
                  : [],
                'id',
                'title'
              ) ?? []
            }
          />

          {/* add a pixel button */}
          <ZCan
            shareWSId={wsShareId}
            permissionType={
              wsShareId !== undefined
                ? permissionsTypeEnum.shareWSMemberPermissions
                : permissionsTypeEnum.loggedInUserPermissions
            }
            havePermissions={
              (workspaceId?.length ?? 0) > 0
                ? [permissionsEnum.create_pixel]
                : (wsShareId?.length ?? 0) > 0
                ? [shareWSPermissionEnum.create_sws_pixel]
                : []
            }>
            <ZIonButton
              fill='clear'
              className='ion-text-capitalize ion-no-padding ps-1 ion-no-margin ion-margin-start'
              size='small'
              testingselector={
                CONSTANTS.testingSelectors.shortLink.formPage.pixelAccount
                  .createBtn
              }
              onClick={() => {
                presentZAddPixelAccount({
                  _cssClass: 'pixel-account-modal-size'
                });
              }}>
              Add a new pixel
            </ZIonButton>
          </ZCan>
        </ZIonCol>
      </ZIonRow>
    </ZCan>
  );
};

const LinkPixelsAccountSkeleton = React.memo(() => {
  return (
    <>
      {/* Row-1 */}
      <ZIonRow className='pt-1 border-bottom zaions__bg_white'>
        {/* Col-1 */}
        <ZIonCol className='flex px-2 py-2 ion-align-items-center'>
          {/* Icon */}
          <ZIonIcon
            icon={apertureOutline}
            size='large'
          />

          {/* Text */}
          <ZIonText className='font-bold ms-2 ion-no-margin'>
            Add Pixels ID
            <ZIonRouterLink
              className='ms-1'
              routerLink={ZaionsRoutes.HomeRoute}>
              (help)
            </ZIonRouterLink>
          </ZIonText>
        </ZIonCol>
      </ZIonRow>

      {/* Row-2 */}
      <ZIonRow className='pb-1 zaions__bg_white'>
        {/* Col-1 */}
        <ZIonCol>
          {/* Select */}
          <ZIonSkeletonText
            animated={true}
            width='95%'
            height='30px'
            className='mx-auto'
          />

          {/* add a pixel button */}
          <ZIonButton
            fill='clear'
            className='ion-text-capitalize ion-no-padding ps-1 ion-no-margin ion-margin-start'
            size='small'>
            <ZIonSkeletonText
              animated={true}
              width='100px'
              height='17px'
            />
          </ZIonButton>
        </ZIonCol>
      </ZIonRow>
    </>
  );
});
LinkPixelsAccountSkeleton.displayName = 'LinkPixelsAccountSkeleton';

export default React.memo(LinkPixelsAccount);
