/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { lazy, Suspense, useEffect, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import VALIDATOR from 'validator';
import { refresh, settingsOutline } from 'ionicons/icons';
import { Formik, useFormikContext } from 'formik';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { useParams } from 'react-router';
import { AxiosError } from 'axios';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import { type RefresherEventDetail } from '@ionic/react';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonCol,
  ZIonText,
  ZIonIcon,
  ZIonRow,
  ZIonGrid,
  ZIonTitle,
  ZIonContent,
  ZIonFooter,
  ZIonSkeletonText,
  ZIonButton,
  ZIonRefresher,
  ZIonRefresherContent,
  ZIonSpinner
} from '@/components/ZIonComponents';
import ZIonPage from '@/components/ZIonPage';
import { ZFallbackIonSpinner2 } from '@/components/CustomComponents/FallbackSpinner';
import ZCan from '@/components/Can';

import {
  useZGetRQCacheData,
  useZInvalidateReactQueries,
  useZRQCreateRequest,
  useZRQGetRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import MESSAGES from '@/utils/messages';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import {
  areAllObjectsFilled,
  extractInnerData,
  formatApiRequestErrorForFormikFormField,
  zGenerateShortLink,
  replaceRouteParams,
  validateField,
  zStringify,
  isZNonEmptyString,
  _getQueryKey,
  isZNonEmptyStrings
} from '@/utils/helpers';
import {
  API_URL_ENUM,
  extractInnerDataOptionsEnum,
  VALIDATION_RULE,
  ZWSTypeEum
} from '@/utils/enums';
import {
  reportCustomError,
  throwZCustomErrorRequestFailed
} from '@/utils/customErrorType';
import { showSuccessNotification } from '@/utils/notification';
import CONSTANTS from '@/utils/constants';
import { ENVS } from '@/utils/envKeys';
import {
  permissionCheckModeEnum,
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { NewShortLinkFormState } from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkFormState.recoil';
import { ZDashboardRState } from '@/ZaionsStore/UserDashboard/ZDashboard';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  type LinkFolderType,
  type LinkTargetType,
  type PixelAccountType,
  type ShortLinkType,
  type UTMTagTemplateType
} from '@/types/AdminPanel/linksType';
import {
  AdminPanelSidebarMenuPageEnum,
  folderState,
  FormMode,
  messengerPlatformsBlockEnum,
  type UTMTagInfoInterface,
  type ABTestingRotatorInterface,
  type GeoLocationRotatorInterface,
  type LinkExpirationInfoInterface,
  type PasswordInterface,
  planFeaturesEnum
} from '@/types/AdminPanel/index.type';
import {
  type FormikSetErrorsType,
  type resetFormType
} from '@/types/ZaionsFormik.type';

import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { type ZLinkMutateApiType } from '@/types/ZaionsApis.type';
import { type ZGenericObject } from '@/types/zaionsAppSettings.type';
import { type workspaceInterface } from '@/types/AdminPanel/workspace';
import { zAxiosApiRequestContentType } from '@/types/CustomHooks/zapi-hooks.type';
import { ZUserCurrentLimitsRStateAtom } from '@/ZaionsStore/UserAccount/index.recoil';
import { errorCodes } from '@/utils/constants/apiConstants';
import ZReachedLimitModal from '@/components/InPageComponents/ZaionsModals/UpgradeModals/ReachedLimit';

const AddNotes = lazy(() => import('@/components/UserDashboard/AddNotes'));
// const EmbedWidget = lazy(
//   () => import('@/components/UserDashboard/EmbedWidget')
// );
// const DeepLinking = lazy(
//   () => import('@/components/UserDashboard/DeepLinking')
// );
// const LinkCloaking = lazy(
//   () => import('@/components/UserDashboard/LinkCloaking')
// );
const Tags = lazy(() => import('@/components/UserDashboard/Tags'));
const RotatorABTesting = lazy(
  () => import('@/components/UserDashboard/RotatorABTesting')
);
const GeoLocation = lazy(
  () => import('@/components/UserDashboard/GeoLocation')
);
const LinkExpiration = lazy(
  () => import('@/components/UserDashboard/LinkExpiration')
);
const LinkPassword = lazy(() => import('@/components/UserDashboard/Password'));
const LinkFavIcon = lazy(() => import('@/components/UserDashboard/Favicon'));
const ZaionsShortUrlOptionFields = lazy(
  () =>
    import(
      '@/components/UserDashboard/shortLinkFormComponents/shortUrlLinkOptionFields'
    )
);
const ZaionsCustomYourLink = lazy(
  () => import('@/components/UserDashboard/shortUrlCustomYourLink')
);
const LinksPixelsAccount = lazy(
  () => import('@/components/UserDashboard/LinksPixelsAccount')
);
const UTMTagTemplates = lazy(
  () => import('@/components/UserDashboard/UTMTagTemplates')
);
const DomainName = lazy(() => import('@/components/UserDashboard/DomainName'));

const AdminPanelSidebarMenu = lazy(
  () => import('@/components/AdminPanelComponents/Sidebar/ExpendableMenu')
);
const NewLinkFolder = lazy(
  () => import('@/components/UserDashboard/NewLinkFolder')
);
const ZShortLinkModal = lazy(
  () => import('@/components/InPageComponents/ZaionsModals/ShortLinkModal')
);

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
const AdminCreateNewLinkPages: React.FC = () => {
  // getting link-in-bio and workspace ids from url with the help of useParams.
  const { editLinkId, workspaceId, shareWSMemberId, wsShareId } = useParams<{
    editLinkId?: string;
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  // #region Component state.
  // state to manage showAdvanceOptions
  const [showAdvanceOptions, setShowAdvanceOptions] = useState(false);
  const [compState, setCompState] = useState<{
    shortUrl?: string;
    isProcessing: boolean;
  }>({
    isProcessing: true
  });
  // #endregion

  // #region Recoils.
  //
  const [newShortLinkFormState, setNewShortLinkFormState] = useRecoilState(
    NewShortLinkFormState
  );
  // Recoil state that control the dashboard.
  const setZUserCurrentLimitsRState = useSetRecoilState(
    ZUserCurrentLimitsRStateAtom
  );
  const ZDashboardState = useRecoilValue(ZDashboardRState);
  // #endregion

  // #region Custom hooks
  const { is2XlScale, isLgScale, isMdScale } = useZMediaQueryScale(); //
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  const { zInvalidateReactQueries } = useZInvalidateReactQueries();
  // #endregion

  // #region APIs.
  // If share-workspace then this api will fetch role & permission of current member in this share-workspace.
  const {
    isFetching: isGetMemberRolePermissionsFetching,
    isError: isGetMemberRolePermissionsError
  } = useZRQGetRequest<{
    memberRole?: string;
    memberPermissions?: string[];
  }>({
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MEMBER_ROLE_AND_PERMISSIONS,
      wsShareId ?? ''
    ],
    _url: API_URL_ENUM.ws_share_member_role_permissions,
    _shouldFetchWhenIdPassed: !(
      wsShareId !== undefined &&
      (wsShareId?.trim()?.length ?? 0) > 0 &&
      shareWSMemberId !== undefined &&
      (shareWSMemberId?.trim()?.length ?? 0) > 0
    ),
    _itemsIds: [shareWSMemberId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _extractType: ZRQGetRequestExtractEnum.extractItem,
    _showLoader: false
  });

  // If share-workspace then this api will fetch share-workspace data.
  const { isFetching: isSWSFetching, isError: isSWSError } =
    useZRQGetRequest<workspaceInterface>({
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.SHARE_WS_INFO,
        wsShareId ?? ''
      ],
      _url: API_URL_ENUM.ws_share_info_data,
      _shouldFetchWhenIdPassed: !(
        wsShareId !== undefined &&
        (wsShareId?.trim()?.length ?? 0) > 0 &&
        shareWSMemberId !== undefined &&
        (shareWSMemberId?.trim()?.length ?? 0) > 0
      ),
      _itemsIds: [shareWSMemberId ?? ''],
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
      _extractType: ZRQGetRequestExtractEnum.extractItem,
      _showLoader: false
    });

  // create short link api.
  const { mutateAsync: createShortLink } = useZRQCreateRequest({
    _url: API_URL_ENUM.shortLinks_create_list,
    _itemsIds: _getQueryKey({
      keys: [
        isZNonEmptyString(workspaceId)
          ? ZWSTypeEum.personalWorkspace
          : isZNonEmptyString(wsShareId) && isZNonEmptyString(shareWSMemberId)
          ? ZWSTypeEum.shareWorkspace
          : ''
      ],
      additionalKeys: [workspaceId, shareWSMemberId]
    }),
    _urlDynamicParts: [
      CONSTANTS.RouteParams.workspace.type,
      CONSTANTS.RouteParams.workspace.workspaceId
    ],
    _showAlertOnError: false
  });

  // If owned-workspace then this api will update short link.
  const { mutateAsync: updateShortLink } = useZRQUpdateRequest({
    _url: API_URL_ENUM.shortLinks_update_delete
  });

  // Request for getting short links data.
  const { isFetching: isShortLinksFetching, isError: isShortLinksError } =
    useZRQGetRequest<{
      items: ShortLinkType[];
      itemsCount: string;
    }>({
      _url: API_URL_ENUM.shortLinks_list,
      _key: _getQueryKey({
        keys: [
          isZNonEmptyString(workspaceId)
            ? CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.MAIN
            : isZNonEmptyString(wsShareId) && isZNonEmptyString(shareWSMemberId)
            ? CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.SWS_MAIN
            : ''
        ],
        additionalKeys: [workspaceId, wsShareId, shareWSMemberId]
      }),
      _itemsIds: _getQueryKey({
        keys: [
          isZNonEmptyString(workspaceId)
            ? ZWSTypeEum.personalWorkspace
            : isZNonEmptyString(wsShareId) && isZNonEmptyString(shareWSMemberId)
            ? ZWSTypeEum.shareWorkspace
            : ''
        ],
        additionalKeys: [workspaceId, shareWSMemberId]
      }),
      _urlDynamicParts: [
        CONSTANTS.RouteParams.workspace.type,
        CONSTANTS.RouteParams.workspace.workspaceId
      ],
      _shouldFetchWhenIdPassed: !(
        isZNonEmptyString(workspaceId) ||
        isZNonEmptyStrings([wsShareId, shareWSMemberId])
      ),
      _showLoader: false,
      _extractType: ZRQGetRequestExtractEnum.extractData
    });

  // get short link data api.
  const {
    data: selectedShortLink,
    isFetching: isSelectedShortLinkFetching,
    isError: isSelectedShortLinkError
  } = useZRQGetRequest<ShortLinkType>({
    _url: API_URL_ENUM.shortLinks_update_delete,
    _key: _getQueryKey({
      keys: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.GET],
      additionalKeys: [workspaceId, wsShareId, shareWSMemberId, editLinkId]
    }),
    _itemsIds: _getQueryKey({
      keys: [
        isZNonEmptyString(workspaceId)
          ? ZWSTypeEum.personalWorkspace
          : isZNonEmptyString(wsShareId) && isZNonEmptyString(shareWSMemberId)
          ? ZWSTypeEum.shareWorkspace
          : ''
      ],
      additionalKeys: [workspaceId, shareWSMemberId, editLinkId]
    }),
    _urlDynamicParts: [
      CONSTANTS.RouteParams.workspace.type,
      CONSTANTS.RouteParams.workspace.workspaceId,
      CONSTANTS.RouteParams.shortLink.shortLinkId
    ],
    _shouldFetchWhenIdPassed: !(
      isZNonEmptyStrings([workspaceId, editLinkId]) ||
      isZNonEmptyStrings([wsShareId, shareWSMemberId, editLinkId])
    ),
    _extractType: ZRQGetRequestExtractEnum.extractItem,
    _showLoader: false
  });

  // fetch workspace-short-links data.
  const {
    data: shortLinksFoldersData,
    isFetching: isShortLinksFoldersDataFetching,
    isError: isShortLinksFoldersDataError
  } = useZRQGetRequest<LinkFolderType[]>({
    _url: API_URL_ENUM.ShortLink_folders_create_list,
    _key: _getQueryKey({
      keys: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN],
      additionalKeys: [
        workspaceId,
        wsShareId,
        shareWSMemberId,
        folderState.shortlink
      ]
    }),
    _itemsIds: _getQueryKey({
      keys: [
        isZNonEmptyString(workspaceId)
          ? ZWSTypeEum.personalWorkspace
          : isZNonEmptyString(wsShareId) && isZNonEmptyString(shareWSMemberId)
          ? ZWSTypeEum.shareWorkspace
          : ''
      ],
      additionalKeys: [workspaceId, shareWSMemberId]
    }),
    _urlDynamicParts: [
      CONSTANTS.RouteParams.workspace.type,
      CONSTANTS.RouteParams.workspace.workspaceId
    ],
    _shouldFetchWhenIdPassed: !(
      isZNonEmptyString(workspaceId) ||
      isZNonEmptyStrings([wsShareId, shareWSMemberId])
    ),
    _showLoader: false
  });

  // If owned-workspace then this api will fetch owned-workspace-pixels data.
  const {
    isFetching: isPixelAccountsDataFetching,
    isError: isPixelAccountsDataError
  } = useZRQGetRequest<PixelAccountType[]>({
    _url: API_URL_ENUM.userPixelAccounts_create_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN,
      workspaceId ?? ''
    ],
    _shouldFetchWhenIdPassed: !((workspaceId?.trim()?.length ?? 0) > 0),
    _showLoader: false,
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _itemsIds: [workspaceId ?? '']
  });

  // If share-workspace then this api will fetch share-workspace-pixels data.
  const {
    isFetching: isSWSPixelAccountsDataFetching,
    isError: isSWSPixelAccountsDataError
  } = useZRQGetRequest<PixelAccountType[]>({
    _url: API_URL_ENUM.sws_pixel_account_create_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.SWS_MAIN,
      wsShareId ?? ''
    ],
    _shouldFetchWhenIdPassed: !(
      (wsShareId?.trim()?.length ?? 0) > 0 &&
      (shareWSMemberId?.trim()?.length ?? 0) > 0
    ),
    _showLoader: false,
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _itemsIds: [shareWSMemberId ?? '']
  });

  // If owned workspace then this api will fetch current owned workspace utm tags data.
  const { isFetching: isUTMTagsDataFetching, isError: isUTMTagsDataError } =
    useZRQGetRequest<UTMTagTemplateType[]>({
      _url: API_URL_ENUM.userAccountUtmTags_create_list,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN,
        workspaceId ?? ''
      ],
      _shouldFetchWhenIdPassed: !((workspaceId?.trim()?.length ?? 0) > 0),
      _itemsIds: [workspaceId ?? ''],
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
      _showLoader: false
    });

  // If share workspace then this api will fetch current share workspace utm tags data.
  const {
    isFetching: isSWSUTMTagsDataFetching,
    isError: isSWSUTMTagsDataError
  } = useZRQGetRequest<UTMTagTemplateType[]>({
    _url: API_URL_ENUM.sws_utm_tag_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.SWS_MAIN],
    _shouldFetchWhenIdPassed: !(
      (wsShareId?.trim()?.length ?? 0) > 0 &&
      (shareWSMemberId?.trim()?.length ?? 0) > 0
    ),
    _itemsIds: [shareWSMemberId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _showLoader: false
  });

  // Upload single file api.
  const { mutateAsync: uploadSingleFile } = useZRQCreateRequest<{
    data: {
      file: unknown;
      fileName: unknown;
      filePath: '';
      fileUrl: '';
    };
  }>({
    _url: API_URL_ENUM.uploadSingleFile,
    _authenticated: true,
    _contentType: zAxiosApiRequestContentType.FormData,
    _loaderMessage: MESSAGES.GENERAL.FILE.UPLOADING_FILE_API
  });

  // Delete file api.
  const { mutateAsync: deleteSingleFile } = useZRQUpdateRequest({
    _url: API_URL_ENUM.deleteSingleFile,
    _loaderMessage: MESSAGES.GENERAL.FILE.UPLOADING_FILE_API
  });
  // #endregion

  // #region UseEffect.
  // after getting data store in recoil state.
  useEffect(() => {
    try {
      if (
        selectedShortLink?.id !== null &&
        selectedShortLink?.id !== undefined &&
        (editLinkId?.trim()?.length ?? 0) > 0
      ) {
        setNewShortLinkFormState(oldVal => ({
          ...oldVal,
          type: selectedShortLink?.type,
          formMode: FormMode.EDIT
        }));
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line
  }, [selectedShortLink]);

  useEffect(() => {
    try {
      if (
        (wsShareId?.trim()?.length ?? 0) > 0 &&
        !isSWSFetching &&
        !isSWSError &&
        !isShortLinksFoldersDataFetching &&
        !isShortLinksFoldersDataError &&
        !isSelectedShortLinkFetching &&
        !isSelectedShortLinkError &&
        !isSWSPixelAccountsDataFetching &&
        !isSWSPixelAccountsDataError &&
        !isGetMemberRolePermissionsFetching &&
        !isGetMemberRolePermissionsError &&
        !isSWSUTMTagsDataFetching &&
        !isSWSUTMTagsDataError
      ) {
        setCompState(oldValues => ({
          ...oldValues,
          isProcessing: false
        }));
      }
    } catch (error) {
      reportCustomError(error);
    }
  }, [
    wsShareId,
    isSWSFetching,
    isSWSError,
    isShortLinksFoldersDataFetching,
    isShortLinksFoldersDataError,
    isSelectedShortLinkFetching,
    isSelectedShortLinkError,
    isGetMemberRolePermissionsFetching,
    isGetMemberRolePermissionsError,
    isSWSPixelAccountsDataFetching,
    isSWSPixelAccountsDataError,
    isSWSUTMTagsDataFetching,
    isSWSUTMTagsDataError
  ]);

  useEffect(() => {
    try {
      if (
        (workspaceId?.trim()?.length ?? 0) > 0 &&
        !isShortLinksFetching &&
        !isShortLinksError &&
        !isSelectedShortLinkFetching &&
        !isSelectedShortLinkError &&
        !isShortLinksFoldersDataError &&
        !isShortLinksFoldersDataFetching &&
        !isPixelAccountsDataFetching &&
        !isPixelAccountsDataError &&
        !isUTMTagsDataFetching &&
        !isUTMTagsDataError
      ) {
        setCompState(oldValues => ({
          ...oldValues,
          isProcessing: false
        }));
      }
    } catch (error) {
      reportCustomError(error);
    }
  }, [
    workspaceId,
    isShortLinksFetching,
    isShortLinksError,
    isSelectedShortLinkFetching,
    isSelectedShortLinkError,
    isShortLinksFoldersDataError,
    isShortLinksFoldersDataFetching,
    isPixelAccountsDataFetching,
    isPixelAccountsDataError,
    isUTMTagsDataFetching,
    isUTMTagsDataError
  ]);
  // #endregion

  // #region popovers & modals.
  const { presentZIonModal: presentZShortLinkModal } = useZIonModal(
    ZShortLinkModal,
    {
      workspaceId,
      shortUrl: compState?.shortUrl,
      shareWSMemberId,
      wsShareId
    }
  );

  const { presentZIonModal: presentZReachedLimitModal } =
    useZIonModal(ZReachedLimitModal);
  // #endregion

  // #region Functions.
  // Formik submit handler.
  const invalidedQueries = async (): Promise<void> => {
    try {
      if ((workspaceId?.trim()?.length ?? 0) > 0) {
        if ((editLinkId?.trim()?.length ?? 0) > 0) {
          await zInvalidateReactQueries([
            CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.GET,
            workspaceId ?? '',
            editLinkId ?? ''
          ]);
        }

        // Pixel.
        await zInvalidateReactQueries([
          CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN,
          workspaceId ?? ''
        ]);

        // Utm tag.
        await zInvalidateReactQueries([
          CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN,
          workspaceId ?? ''
        ]);

        // Folder.
        await zInvalidateReactQueries([
          CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN,
          workspaceId ?? '',
          folderState.shortlink
        ]);
      } else if ((wsShareId?.trim()?.length ?? 0) > 0) {
        await zInvalidateReactQueries([
          CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS
            .MEMBER_ROLE_AND_PERMISSIONS,
          wsShareId ?? ''
        ]);

        await zInvalidateReactQueries([
          CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.SHARE_WS_INFO,
          wsShareId ?? ''
        ]);

        if ((editLinkId?.trim()?.length ?? 0) > 0) {
          await zInvalidateReactQueries([
            CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.SWS_GET,
            wsShareId ?? '',
            editLinkId ?? ''
          ]);
        }

        // Share workspace Pixel.
        await zInvalidateReactQueries([
          CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.SWS_MAIN,
          wsShareId ?? ''
        ]);

        // Share workspace Utm tag.
        await zInvalidateReactQueries([
          CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.SWS_MAIN
        ]);

        // Share workspace folder
        await zInvalidateReactQueries([
          CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.SWS_MAIN,
          wsShareId ?? '',
          folderState.shortlink
        ]);
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  const handleRefresh = async (
    event: CustomEvent<RefresherEventDetail>
  ): Promise<void> => {
    try {
      await invalidedQueries();
      event.detail.complete();
    } catch (error) {
      reportCustomError(error);
    }
  };

  const uploadFileToBackend = async (
    file: File
  ): Promise<{
    fileUrl: string | undefined;
    filePath: string | undefined;
  }> => {
    const formData = new FormData();
    formData.append('file', file);

    // Uploading image to backend
    const result = await uploadSingleFile(formData);

    return { fileUrl: result?.data?.fileUrl, filePath: result?.data?.filePath };
  };

  const FormikSubmissionHandler = async (
    _values: string,
    resetForm: resetFormType,
    setErrors: FormikSetErrorsType
  ): Promise<void> => {
    try {
      if ((editLinkId?.trim()?.length ?? 0) === 0) {
        // Making an api call creating new short link
        const _response = await createShortLink(_values);

        if ((_response as ZLinkMutateApiType<ShortLinkType>)?.success) {
          // if we have a successful response then...
          // extract Data from _response.
          const _data = extractInnerData<ShortLinkType>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          // if we have data then update cache and show success message.
          if (_data?.id !== null && _data?.id !== undefined) {
            const _generatedShortLink = zGenerateShortLink({
              domain: _data.shortUrlDomain,
              urlPath: _data.shortUrlPath
            });

            setCompState(oldValues => ({
              ...oldValues,
              shortUrl: _generatedShortLink
            }));
            const _oldShortLinks =
              extractInnerData<ShortLinkType[]>(
                (getRQCDataHandler<ShortLinkType[]>({
                  key: _getQueryKey({
                    keys: [
                      isZNonEmptyString(workspaceId)
                        ? CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.MAIN
                        : isZNonEmptyString(wsShareId) &&
                          isZNonEmptyString(shareWSMemberId)
                        ? CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS
                            .SWS_MAIN
                        : ''
                    ],
                    additionalKeys: [workspaceId, wsShareId, shareWSMemberId]
                  })
                }) as ShortLinkType[]) ?? [],
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) ?? [];

            // added shortLink to all shortLinks data in cache.
            const _updatedShortLinks = [..._oldShortLinks, _data];

            // Updating all shortLinks data in RQ cache.
            await updateRQCDataHandler<ShortLinkType[] | undefined>({
              key: _getQueryKey({
                keys: [
                  isZNonEmptyString(workspaceId)
                    ? CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.MAIN
                    : isZNonEmptyString(wsShareId) &&
                      isZNonEmptyString(shareWSMemberId)
                    ? CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.SWS_MAIN
                    : ''
                ],
                additionalKeys: [workspaceId, wsShareId, shareWSMemberId]
              }),
              data: _updatedShortLinks,
              id: '',
              extractType: ZRQGetRequestExtractEnum.extractItems,
              updateHoleData: true
            });

            // Updating short link in UserCurrentLimits.
            setZUserCurrentLimitsRState(oldValues => ({
              ...oldValues,
              [planFeaturesEnum.shortLinks]: _updatedShortLinks?.length
            }));

            showSuccessNotification(MESSAGES.SHORT_LINKS.CREATED);
          }
        } else {
          throw new Error(
            (_response as ZLinkMutateApiType<ShortLinkType>).message ??
              'something went wrong please try again! :('
          );
        }
      } else if ((editLinkId?.trim()?.length ?? 0) > 0) {
        const _response = await updateShortLink({
          requestData: _values,
          itemIds: _getQueryKey({
            keys: [
              isZNonEmptyString(workspaceId)
                ? ZWSTypeEum.personalWorkspace
                : isZNonEmptyString(wsShareId) &&
                  isZNonEmptyString(shareWSMemberId)
                ? ZWSTypeEum.shareWorkspace
                : ''
            ],
            additionalKeys: [workspaceId, shareWSMemberId, editLinkId]
          }),
          urlDynamicParts: [
            CONSTANTS.RouteParams.workspace.type,
            CONSTANTS.RouteParams.workspace.workspaceId,
            CONSTANTS.RouteParams.shortLink.shortLinkId
          ]
        });

        if (_response !== undefined && _response !== null) {
          // extract Data from _response.
          const _data = extractInnerData<ShortLinkType>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          // if we have data then show success message.
          if (_data?.id !== undefined && _data?.id !== null) {
            const _generatedShortLink = zGenerateShortLink({
              domain: _data.shortUrlDomain,
              urlPath: _data.shortUrlPath
            });

            setCompState(oldValues => ({
              ...oldValues,
              shortUrl: _generatedShortLink
            }));

            // Updating data all shortLinks in RQ cache.
            if ((workspaceId?.trim()?.length ?? 0) > 0) {
              await updateRQCDataHandler<ShortLinkType | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.MAIN,
                  workspaceId ?? ''
                ],
                data: { ..._data },
                id: editLinkId ?? ''
              });

              // Updating current short link in cache in RQ cache.
              await updateRQCDataHandler<ShortLinkType | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.GET,
                  workspaceId ?? '',
                  editLinkId ?? ''
                ],
                data: { ..._data },
                id: '',
                extractType: ZRQGetRequestExtractEnum.extractItem,
                updateHoleData: true
              });
            } else if (
              (wsShareId?.trim()?.length ?? 0) > 0 &&
              (shareWSMemberId?.trim()?.length ?? 0) > 0
            ) {
              await updateRQCDataHandler<ShortLinkType | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.SWS_MAIN,
                  wsShareId ?? ''
                ],
                data: { ..._data },
                id: editLinkId ?? ''
              });

              // Updating current short link in cache in RQ cache.
              await updateRQCDataHandler<ShortLinkType | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.SWS_GET,
                  wsShareId ?? '',
                  editLinkId ?? ''
                ],
                data: { ..._data },
                id: '',
                extractType: ZRQGetRequestExtractEnum.extractItem,
                updateHoleData: true
              });
            }

            showSuccessNotification(MESSAGES.SHORT_LINKS.UPDATED);
          } else {
            throw new Error(
              (_response as ZLinkMutateApiType<ShortLinkType>).message ??
                'something went wrong please try again! :('
            );
          }
        }
      } else {
        throwZCustomErrorRequestFailed(MESSAGES.GENERAL.INVALID_REQUEST);
      }

      resetForm();

      setShowAdvanceOptions(false);

      presentZShortLinkModal({
        _cssClass: 'short-link-modal'
      });

      // zNavigatePushRoute(
      // replaceRouteParams(
      // ZaionsRoutes.AdminPanel.ShortLinks.Main,
      // [
      // CONSTANTS.RouteParams.workspace.workspaceId,
      // CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio,
      // ],
      // [workspaceId,
      // CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE]
      // )
      // );
    } catch (error) {
      if (error instanceof AxiosError) {
        const _apiErrorsCode = error.response?.status;

        if (_apiErrorsCode === errorCodes.reachedLimit) {
          // const _apiErrorsMessage = (
          //   error.response?.data as { errors: { item: string[] } }
          // )?.errors?.item[0];

          // showErrorNotification(_apiErrorsMessage);

          presentZReachedLimitModal({
            _cssClass: 'reached-limit-modal-size'
          });

          // zNavigatePushRoute(
          //   createRedirectRoute({
          //     url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
          //     params: [
          //       CONSTANTS.RouteParams.workspace.workspaceId,
          //       CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
          //     ],
          //     values: [
          //       workspaceId ?? shareWSMemberId ?? '',
          //       CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
          //     ]
          //   })
          // );
        }
        const _apiErrors = (error.response?.data as { errors: ZGenericObject })
          ?.errors;

        const _errors = formatApiRequestErrorForFormikFormField(
          ['title'],
          ['title'],
          _apiErrors
        );
        setErrors(_errors);
      }
      reportCustomError(error);
    }
  };
  // #endregion

  // is fetching.

  const isZFetching = isSelectedShortLinkFetching || isShortLinksFetching;

  const formikInitialValues = {
    target: {
      url:
        (selectedShortLink?.target as LinkTargetType)?.url ??
        (newShortLinkFormState?.target as LinkTargetType)?.url ??
        'https://',
      phoneNumber:
        (selectedShortLink?.target as LinkTargetType)?.phoneNumber ?? '',
      username: (selectedShortLink?.target as LinkTargetType)?.username ?? '',
      email: (selectedShortLink?.target as LinkTargetType)?.email ?? '',
      accountId: (selectedShortLink?.target as LinkTargetType)?.accountId ?? '',
      subject: (selectedShortLink?.target as LinkTargetType)?.subject ?? '',
      message: (selectedShortLink?.target as LinkTargetType)?.message ?? ''
    },
    title: selectedShortLink?.title ?? '',
    linkDescription: selectedShortLink?.description ?? '',
    featureImg: {
      featureImgPath: selectedShortLink?.featureImg?.featureImgPath ?? '',
      featureImgUrl: selectedShortLink?.featureImg?.featureImgUrl ?? '',
      featureImgFile: selectedShortLink?.featureImg?.featureImgFile ?? null
    },
    password: {
      value: (selectedShortLink?.password as PasswordInterface)?.password ?? '',
      enabled:
        (selectedShortLink?.password as PasswordInterface)?.enabled ?? false
    },
    folderId:
      selectedShortLink?.folderId ?? CONSTANTS.DEFAULT_VALUES.DEFAULT_FOLDER,
    linkNote: selectedShortLink?.notes ?? '',
    tags:
      selectedShortLink?.tags !== undefined && selectedShortLink?.tags !== null
        ? (selectedShortLink?.tags as string[])
        : [],
    linkExpiration: {
      enabled:
        (selectedShortLink?.linkExpirationInfo as LinkExpirationInfoInterface)
          ?.enabled ?? false,
      expirationDate:
        (selectedShortLink?.linkExpirationInfo as LinkExpirationInfoInterface)
          ?.expirationDate ?? '',
      timezone:
        (selectedShortLink?.linkExpirationInfo as LinkExpirationInfoInterface)
          ?.timezone ?? CONSTANTS.DEFAULT_VALUES.TIMEZONE_DEFAULT,
      redirectionLink:
        (selectedShortLink?.linkExpirationInfo as LinkExpirationInfoInterface)
          ?.redirectionLink ?? 'https://'
    },
    rotatorABTesting:
      (selectedShortLink?.abTestingRotatorLinks as ABTestingRotatorInterface[]) ??
      [],
    geoLocation:
      (selectedShortLink?.geoLocationRotatorLinks as GeoLocationRotatorInterface[]) ??
      [],

    //
    shortUrlDomain:
      selectedShortLink?.shortUrlDomain ?? ENVS.defaultShortUrlDomain,
    shortUrlPath: selectedShortLink?.shortUrlPath ?? '',
    isShortUrlPathValid: true,
    //

    linkPixelsAccount:
      (selectedShortLink?.pixelIds !== undefined &&
        (JSON.parse(selectedShortLink?.pixelIds as string) as string[])) ??
      [],
    UTMTags: {
      templateId:
        (selectedShortLink?.utmTagInfo as UTMTagInfoInterface)?.templateId ??
        '',
      utmCampaign:
        (selectedShortLink?.utmTagInfo as UTMTagInfoInterface)?.utmCampaign ??
        '',
      utmMedium:
        (selectedShortLink?.utmTagInfo as UTMTagInfoInterface)?.utmMedium ?? '',
      utmSource:
        (selectedShortLink?.utmTagInfo as UTMTagInfoInterface)?.utmSource ?? '',
      utmTerm:
        (selectedShortLink?.utmTagInfo as UTMTagInfoInterface)?.utmTerm ?? '',
      utmContent:
        (selectedShortLink?.utmTagInfo as UTMTagInfoInterface)?.utmContent ?? ''
    },
    // favicon: {
    //   featureImgPath:
    //     selectedShortLink?.favicon?.featureImgPath ??
    //     '',
    //   featureImgUrl:
    //     selectedShortLink?.favicon?.featureImgUrl ??
    //     '',
    //   featureImgFile:
    //     selectedShortLink?.favicon?.featureImgFile ??
    //     null
    // }
    favicon: selectedShortLink?.favicon ?? ''
    // complete page fields here
  };

  return (
    <ZIonPage pageTitle='Create New Page'>
      {compState?.isProcessing ? (
        <ZIonContent>
          <div className='flex flex-col w-full h-full pt-4 ion-align-items-center ion-justify-content-center'>
            <ZIonSpinner className='w-10 h-10' />

            {(workspaceId?.trim()?.length ?? 0) > 0
              ? isSelectedShortLinkFetching
                ? 'Fetching current short link data'
                : isPixelAccountsDataFetching
                ? 'Fetching workspace pixels'
                : isUTMTagsDataFetching
                ? 'Fetching workspace utm tags'
                : isShortLinksFoldersDataFetching
                ? 'Fetching workspace short links folders'
                : null
              : (shareWSMemberId?.trim()?.length ?? 0) > 0 &&
                (wsShareId?.trim()?.length ?? 0) > 0
              ? isGetMemberRolePermissionsFetching
                ? 'Getting & setting your permissions in this workspace'
                : isSWSFetching
                ? 'Setting share workspace data'
                : isSelectedShortLinkFetching
                ? 'Fetching share workspace short links'
                : isSWSPixelAccountsDataFetching
                ? 'Fetching share workspace pixels'
                : isSWSUTMTagsDataFetching
                ? 'Fetching share workspace utm tags'
                : isShortLinksFoldersDataFetching
                ? 'Fetching share workspace short links folders'
                : null
              : null}
          </div>
        </ZIonContent>
      ) : (
        <ZCan
          returnPermissionDeniedView={true}
          checkMode={permissionCheckModeEnum.any}
          shareWSId={wsShareId}
          permissionType={
            (shareWSMemberId?.trim()?.length ?? 0) > 0 &&
            (wsShareId?.trim()?.length ?? 0) > 0
              ? permissionsTypeEnum.shareWSMemberPermissions
              : permissionsTypeEnum.loggedInUserPermissions
          }
          havePermissions={
            (shareWSMemberId?.trim()?.length ?? 0) > 0 &&
            (wsShareId?.trim()?.length ?? 0) > 0
              ? [
                  shareWSPermissionEnum.create_sws_shortLink,
                  shareWSPermissionEnum.update_sws_shortLink
                ]
              : [
                  permissionsEnum.create_shortLink,
                  permissionsEnum.update_shortLink
                ]
          }>
          <Formik
            // #region Initial values
            initialValues={formikInitialValues}
            enableReinitialize={true}
            // #endregion

            // #region Handling validation & errors
            validate={values => {
              const errors: {
                target: {
                  url?: string;
                  phoneNumber?: string;
                  username?: string;
                  email?: string;
                  accountId?: string;
                  subject?: string;
                  message?: string;
                };
                title?: string;
                password: {
                  value?: string;
                };
                linkExpiration: {
                  redirectionLink?: string;
                };
                rotatorABTesting: Array<{
                  redirectionLink?: string;
                  percentage?: string;
                }>;
                geoLocation: Array<{
                  redirectionLink?: string;
                  country?: string;
                }>;
                shortUrlPath?: string;
              } = {
                target: {},
                linkExpiration: {},
                rotatorABTesting: [],
                geoLocation: [],
                password: {}
              };

              // Url Validations Start
              if (
                newShortLinkFormState?.type === messengerPlatformsBlockEnum.link
              ) {
                validateField(
                  'url',
                  values.target,
                  errors.target,
                  VALIDATION_RULE.url
                );
              } else if (
                newShortLinkFormState.type ===
                messengerPlatformsBlockEnum.messenger
              ) {
                if (!values?.target?.url.startsWith('https://m/me/')) {
                  errors.target.url =
                    'Please enter a valid messenger URL! like (https://m/me/yourUserName)';
                }
              } else {
                delete errors.target.url;
              }
              // Url Validations End

              // Phone Number Validation Start
              if (
                newShortLinkFormState.type ===
                  messengerPlatformsBlockEnum.call ||
                newShortLinkFormState.type ===
                  messengerPlatformsBlockEnum.whatsapp ||
                newShortLinkFormState.type === messengerPlatformsBlockEnum.sms
              ) {
                validateField(
                  'phoneNumber',
                  values.target,
                  errors.target,
                  VALIDATION_RULE.phoneNumber
                );
                if (
                  values?.target?.phoneNumber !== undefined &&
                  !isPossiblePhoneNumber(values?.target?.phoneNumber)
                ) {
                  errors.target.phoneNumber = 'Not a valid phone number.';
                }
              } else {
                delete errors.target.phoneNumber;
              }

              // Phone Number Validation End

              // Username Validation Start
              if (
                newShortLinkFormState?.type ===
                  messengerPlatformsBlockEnum.telegram ||
                newShortLinkFormState?.type ===
                  messengerPlatformsBlockEnum.skype
              ) {
                validateField(
                  'username',
                  values.target,
                  errors.target,
                  VALIDATION_RULE.username
                );
              } else {
                delete errors.target.username;
              }
              // Username Validation End

              // Email Validation Start
              if (
                newShortLinkFormState?.type ===
                messengerPlatformsBlockEnum.email
              ) {
                validateField(
                  'email',
                  values.target,
                  errors.target,
                  VALIDATION_RULE.email
                );
              } else {
                delete errors.target.email;
              }
              // Email Validation End

              // AccountId Validation Start
              if (
                newShortLinkFormState?.type ===
                  messengerPlatformsBlockEnum.wechat ||
                newShortLinkFormState?.type ===
                  messengerPlatformsBlockEnum.viber ||
                newShortLinkFormState?.type === messengerPlatformsBlockEnum.line
              ) {
                validateField(
                  'accountId',
                  values.target,
                  errors.target,
                  VALIDATION_RULE.accountId
                );
              } else {
                delete errors.target.accountId;
              }
              // AccountId Validation End

              // Subject Validation Start
              if (
                newShortLinkFormState?.type ===
                messengerPlatformsBlockEnum.email
              ) {
                validateField(
                  'subject',
                  values.target,
                  errors.target,
                  VALIDATION_RULE.subject
                );
              } else {
                delete errors.target.subject;
              }
              // Subject Validation End

              // Message Validation Start
              if (
                newShortLinkFormState?.type ===
                  messengerPlatformsBlockEnum.email ||
                newShortLinkFormState?.type ===
                  messengerPlatformsBlockEnum.sms ||
                newShortLinkFormState?.type ===
                  messengerPlatformsBlockEnum.viber ||
                newShortLinkFormState?.type ===
                  messengerPlatformsBlockEnum.whatsapp
              ) {
                validateField(
                  'message',
                  values.target,
                  errors.target,
                  VALIDATION_RULE.message
                );
              } else {
                delete errors.target.message;
              }
              // message Validation End

              // Link Title Validation Starts
              validateField('title', values, errors, VALIDATION_RULE.linkTitle);
              // Link Title Validation End

              // Password Validation Start
              if (values?.password?.enabled) {
                validateField(
                  'password',
                  values?.password,
                  errors?.password,
                  VALIDATION_RULE.password
                );
              }
              // Password Validation End

              // Link Expiration Validation Start
              if (values?.linkExpiration?.enabled) {
                validateField(
                  'redirectionLink',
                  values?.linkExpiration,
                  errors?.linkExpiration,
                  VALIDATION_RULE.url
                );
              }
              // Link Expiration Validation End

              // Rotator AB Testing Field Validation Start
              if (values?.rotatorABTesting?.length > 0) {
                errors.rotatorABTesting = values.rotatorABTesting.map(
                  el => ({})
                );
                values.rotatorABTesting.forEach(
                  (el: ABTestingRotatorInterface, index) => {
                    if (
                      el.redirectionLink?.trim()?.length === 0 ||
                      el.redirectionLink === undefined ||
                      el.redirectionLink === null
                    ) {
                      errors.rotatorABTesting[index].redirectionLink =
                        MESSAGES.FORM_VALIDATIONS.LINK.ROTATOR_AB_TESTING.REQUIRED_REDIRECTION_LINK;
                    } else if (!VALIDATOR.isURL(el.redirectionLink)) {
                      errors.rotatorABTesting[index].redirectionLink =
                        MESSAGES.FORM_VALIDATIONS.LINK.ROTATOR_AB_TESTING.INVALID_REDIRECTION_LINK;
                    }
                    if (
                      el.percentage === undefined ||
                      el.percentage === null ||
                      isNaN(el.percentage)
                    ) {
                      errors.rotatorABTesting[index].percentage =
                        MESSAGES.FORM_VALIDATIONS.LINK.ROTATOR_AB_TESTING.REQUIRED_PERCENTAGE;
                    }
                  }
                );
              }
              // Rotator AB Testing Field Validation End

              // Rotator Geo Location Field Validation Start
              if (values?.geoLocation?.length > 0) {
                errors.geoLocation = values.geoLocation.map(el => ({}));
                values.geoLocation.forEach(
                  (el: GeoLocationRotatorInterface, index) => {
                    if (
                      el.redirectionLink?.trim()?.length === 0 ||
                      el.redirectionLink === undefined ||
                      el.redirectionLink === null
                    ) {
                      errors.geoLocation[index].redirectionLink =
                        MESSAGES.FORM_VALIDATIONS.LINK.GEOLOCATION.REQUIRED_REDIRECTION_LINK;
                    } else if (!VALIDATOR.isURL(el.redirectionLink)) {
                      errors.geoLocation[index].redirectionLink =
                        MESSAGES.FORM_VALIDATIONS.LINK.GEOLOCATION.INVALID_REDIRECTION_LINK;
                    }
                    if (
                      el.redirectionLink?.length === 0 ||
                      el.country === undefined ||
                      el.country === null
                    ) {
                      errors.geoLocation[index].country =
                        MESSAGES.FORM_VALIDATIONS.LINK.GEOLOCATION.REQUIRED_COUNTRY;
                    }
                  }
                );
              }

              //
              if (
                String(values?.shortUrlPath)?.trim()?.length > 0 &&
                String(values?.shortUrlPath)?.trim()?.length < 6
              ) {
                errors.shortUrlPath = 'Path must be exact 6 character long';
              }

              let _total = 0;

              Array.from(
                values?.rotatorABTesting,
                ({ percentage }) => (_total = _total + (percentage ?? 0))
              );

              // Rotator Geo Location Field Validation End
              // check for errors if there are any return errors object otherwise return []
              if (
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                errors.target?.url?.trim() ??
                errors.target?.accountId?.trim() ??
                errors.target?.email?.trim() ??
                errors.target?.message?.trim() ??
                errors.target?.username?.trim() ??
                errors.target?.phoneNumber?.trim() ??
                errors.target?.subject?.trim() ??
                errors.linkExpiration?.redirectionLink?.trim() ??
                errors.title?.trim() ??
                errors.shortUrlPath?.trim() ??
                errors.password?.value?.trim() ??
                // values.isShortUrlPathValid ??
                !areAllObjectsFilled(
                  (errors.rotatorABTesting as object[]) ?? []
                ) ??
                !areAllObjectsFilled((errors.geoLocation as object[]) ?? []) ??
                _total > 100
              ) {
                return errors;
              } else {
                return [];
              }
              // return errors;
            }}
            // #endregion

            // #region submit function.
            onSubmit={async (
              values,
              { resetForm, setErrors, setFieldValue }
            ) => {
              let _fileUrl = values?.featureImg?.featureImgUrl;
              let _filePath = values?.featureImg?.featureImgPath;

              if (
                (isZNonEmptyString(workspaceId) ||
                  isZNonEmptyStrings([wsShareId, shareWSMemberId])) &&
                values?.featureImg?.featureImgUrl.trim().length > 0 &&
                values?.featureImg?.featureImgUrl !==
                  selectedShortLink?.featureImg?.featureImgUrl
              ) {
                if (
                  (isZNonEmptyString(workspaceId) ||
                    isZNonEmptyStrings([wsShareId, shareWSMemberId])) &&
                  selectedShortLink?.featureImg?.featureImgPath !== undefined &&
                  selectedShortLink?.featureImg?.featureImgPath?.trim()
                    ?.length > 0
                ) {
                  await deleteSingleFile({
                    requestData: zStringify({
                      filePath: selectedShortLink?.featureImg?.featureImgPath
                    }),
                    itemIds: [],
                    urlDynamicParts: []
                  });
                }

                if (
                  values?.featureImg?.featureImgFile !== null &&
                  values?.featureImg?.featureImgFile !== undefined
                ) {
                  const { filePath, fileUrl } = await uploadFileToBackend(
                    values.featureImg.featureImgFile
                  );

                  _fileUrl = fileUrl ?? _fileUrl;
                  _filePath = filePath ?? _filePath;
                }
              }

              const _zStringifyData = zStringify({
                type: newShortLinkFormState.type,
                target: zStringify({
                  url: values.target.url,
                  accountId: values.target.accountId,
                  email: values.target.email,
                  message: values.target.message,
                  phoneNumber: values.target.phoneNumber,
                  subject: values.target.subject,
                  username: values.target.username
                }),
                title: values.title,
                featureImg: zStringify({
                  featureImgFile: values.featureImg?.featureImgFile,
                  featureImgUrl: _fileUrl,
                  featureImgPath: _filePath
                }),
                description: values.linkDescription,
                pixelIds: zStringify(values.linkPixelsAccount),
                utmTagInfo: zStringify(values.UTMTags),
                shortUrlDomain: values.shortUrlDomain,
                shortUrlPath: values.shortUrlPath,
                folderId: values.folderId,
                notes: values.linkNote,
                tags: zStringify(values.tags),
                abTestingRotatorLinks: zStringify(values.rotatorABTesting),
                geoLocationRotatorLinks: zStringify(values.geoLocation),
                linkExpirationInfo: zStringify({
                  redirectionLink: values.linkExpiration.redirectionLink,
                  expirationDate: values.linkExpiration.expirationDate,
                  timezone: values.linkExpiration.timezone,
                  enabled: values.linkExpiration.enabled
                }),
                password: zStringify({
                  password: values.password.value,
                  enabled: values.password.enabled
                }),
                createdAt: Date.now().toString(),
                favicon: values.favicon
              });

              await FormikSubmissionHandler(
                _zStringifyData,
                resetForm,
                setErrors
              );
            }}
            // #endregion
          >
            {/* Content */}
            {({ isSubmitting, isValid, submitForm }) => {
              return (
                <ZIonContent color='light'>
                  {/* IonRefresher */}
                  <ZIonRefresher
                    onIonRefresh={event => {
                      void handleRefresh(event);
                    }}>
                    <ZIonRefresherContent />
                  </ZIonRefresher>

                  {/* Grid-1 */}
                  <ZIonGrid className='h-full ion-no-padding'>
                    <ZIonRow className='h-full'>
                      {/* Side bar */}
                      <Suspense
                        fallback={
                          <ZIonCol
                            size='.8'
                            className='h-full zaions__medium_bg zaions-transition'>
                            <ZFallbackIonSpinner2 />
                          </ZIonCol>
                        }>
                        <AdminPanelSidebarMenu
                          activePage={AdminPanelSidebarMenuPageEnum.shortLink}
                        />
                      </Suspense>

                      {/* Right-col */}
                      <ZIonCol
                        className='w-full h-screen overflow-y-scroll zaions_pretty_scrollbar zaions-transition'
                        sizeXl={
                          ZDashboardState?.dashboardMainSidebarIsCollabes
                            .isExpand
                            ? is2XlScale
                              ? '10.5'
                              : '10'
                            : is2XlScale
                            ? '11.4'
                            : '11.2'
                        }
                        sizeLg={
                          ZDashboardState?.dashboardMainSidebarIsCollabes
                            .isExpand
                            ? is2XlScale
                              ? '10.5'
                              : '10'
                            : is2XlScale
                            ? '11.4'
                            : '11.2'
                        }
                        sizeMd='12'
                        sizeSm='12'
                        sizeXs='12'>
                        {/* Grid-1 -> Grid-1 top-bar */}
                        {isZFetching ? <ZTopBarSkeleton /> : <ZTopBar />}
                        {/* <ZAdminPanelTopBar workspaceId={workspaceId} /> */}

                        {/* Short link Grid-1 -> Grid-2 */}
                        <Suspense
                          fallback={
                            <ZIonGrid className='mx-3 mt-2'>
                              <ZFallbackIonSpinner2 />
                            </ZIonGrid>
                          }>
                          <ZaionsShortUrlOptionFields />
                        </Suspense>

                        {/* Custom your link Grid-1 -> Grid-3 */}
                        <ZIonGrid
                          className={classNames({
                            'my-1': true,
                            'ms-3 mr-4': isMdScale,
                            'mx-2': !isMdScale
                          })}>
                          <ZIonRow
                            className={classNames({
                              'gap-4': isLgScale,
                              'gap-0': !isLgScale
                            })}>
                            {/* Custom Your Link */}
                            <Suspense
                              fallback={
                                <ZIonCol
                                  sizeXl='5.8'
                                  sizeLg='5.8'
                                  sizeMd='12'
                                  sizeSm='12'
                                  sizeXs='12'
                                  className='py-1 rounded zaions__bg_white'>
                                  <ZFallbackIonSpinner2 />
                                </ZIonCol>
                              }>
                              <ZaionsCustomYourLink
                                showSkeleton={isZFetching}
                              />
                            </Suspense>

                            {/* Pixel Account, Utm Tags, Custom Domain */}
                            <ZIonCol
                              sizeXl='5.9'
                              sizeLg='5.8'
                              sizeMd='12'
                              sizeSm='12'
                              sizeXs='12'
                              className={classNames({
                                'mt-4': !isLgScale
                              })}>
                              {/* Pixels */}
                              <ZCan
                                shareWSId={wsShareId}
                                permissionType={
                                  (shareWSMemberId?.trim()?.length ?? 0) > 0 &&
                                  (wsShareId?.trim()?.length ?? 0) > 0
                                    ? permissionsTypeEnum.shareWSMemberPermissions
                                    : permissionsTypeEnum.loggedInUserPermissions
                                }
                                havePermissions={
                                  (shareWSMemberId?.trim()?.length ?? 0) > 0 &&
                                  (wsShareId?.trim()?.length ?? 0) > 0
                                    ? [shareWSPermissionEnum.viewAny_sws_pixel]
                                    : [permissionsEnum.viewAny_pixel]
                                }>
                                <Suspense
                                  fallback={
                                    <ZIonRow className='pt-1 border-bottom zaions__bg_white'>
                                      <ZFallbackIonSpinner2 />
                                    </ZIonRow>
                                  }>
                                  <LinksPixelsAccount
                                    showSkeleton={
                                      (workspaceId?.trim()?.length ?? 0) > 0
                                        ? isPixelAccountsDataFetching
                                        : (shareWSMemberId?.trim()?.length ??
                                            0) > 0 &&
                                          (wsShareId?.trim()?.length ?? 0) > 0
                                        ? isSWSPixelAccountsDataFetching
                                        : undefined
                                    }
                                  />
                                </Suspense>
                              </ZCan>

                              {/* UTMTags */}
                              <ZCan
                                shareWSId={wsShareId}
                                permissionType={
                                  (shareWSMemberId?.trim()?.length ?? 0) > 0 &&
                                  (wsShareId?.trim()?.length ?? 0) > 0
                                    ? permissionsTypeEnum.shareWSMemberPermissions
                                    : permissionsTypeEnum.loggedInUserPermissions
                                }
                                havePermissions={
                                  (shareWSMemberId?.trim()?.length ?? 0) > 0 &&
                                  (wsShareId?.trim()?.length ?? 0) > 0
                                    ? [shareWSPermissionEnum.viewAny_sws_utmTag]
                                    : [permissionsEnum.viewAny_utmTag]
                                }>
                                <Suspense
                                  fallback={
                                    <ZIonRow className='pt-1 border-bottom zaions__bg_white'>
                                      <ZFallbackIonSpinner2 />
                                    </ZIonRow>
                                  }>
                                  <UTMTagTemplates
                                    showSkeleton={
                                      (workspaceId?.trim()?.length ?? 0) > 0
                                        ? isUTMTagsDataFetching
                                        : (wsShareId?.trim()?.length ?? 0) >
                                            0 &&
                                          (shareWSMemberId?.trim()?.length ??
                                            0) > 0
                                        ? isSWSUTMTagsDataFetching
                                        : undefined
                                    }
                                  />
                                </Suspense>
                              </ZCan>

                              {/* Choose Domain Name */}
                              <DomainName
                                showSkeleton={isZFetching}
                                isEditMode={isZNonEmptyString(editLinkId)}
                              />
                            </ZIonCol>
                          </ZIonRow>
                        </ZIonGrid>

                        {/* Advance Options Grid-1 -> Grid-4 */}
                        <ZIonGrid className='mr-3 ms-3'>
                          {/* Row-1 */}
                          <Suspense fallback={<ZFallbackIonSpinner2 />}>
                            <ZIonRow>
                              {/* Col-1 */}
                              <ZIonCol>
                                {/* advance options toggler button */}
                                <ZIonButton
                                  expand='block'
                                  // size={isMdScale ? 'large' : 'default'}
                                  testingselector={
                                    CONSTANTS.testingSelectors.shortLink
                                      .formPage.advanceOptionsBtn
                                  }
                                  onClick={() => {
                                    setShowAdvanceOptions(oldVal => !oldVal);
                                  }}
                                  className={classNames({
                                    'ion-text-capitalize': true,
                                    'mx-0': !isMdScale
                                  })}>
                                  <ZIonText className='flex py-2 text-lg ion-no-margin ion-align-items-center'>
                                    Advance Options
                                  </ZIonText>
                                  <ZIonIcon
                                    slot='end'
                                    icon={settingsOutline}
                                    className='w-6 h-6 ms-auto me-1'
                                  />
                                </ZIonButton>

                                {/* advance options row */}
                                {showAdvanceOptions && (
                                  <ZIonRow
                                    className='gap-3 ion-margin-top'
                                    testingselector={
                                      CONSTANTS.testingSelectors.shortLink
                                        .formPage.advanceOptionsContent
                                    }>
                                    <Suspense
                                      fallback={<ZFallbackIonSpinner2 />}>
                                      {/* Folder */}
                                      <ZCan
                                        returnPermissionDeniedView={true}
                                        shareWSId={wsShareId}
                                        permissionType={
                                          (shareWSMemberId?.trim()?.length ??
                                            0) > 0 &&
                                          (wsShareId?.trim()?.length ?? 0) > 0
                                            ? permissionsTypeEnum.shareWSMemberPermissions
                                            : permissionsTypeEnum.loggedInUserPermissions
                                        }
                                        havePermissions={
                                          (shareWSMemberId?.trim()?.length ??
                                            0) > 0 &&
                                          (wsShareId?.trim()?.length ?? 0) > 0
                                            ? [
                                                shareWSPermissionEnum.viewAny_sws_sl_folder
                                              ]
                                            : [
                                                permissionsEnum.viewAny_sl_folder
                                              ]
                                        }>
                                        <NewLinkFolder
                                          _state={folderState.shortlink}
                                          showSkeleton={
                                            isZNonEmptyString(workspaceId) ||
                                            isZNonEmptyStrings([
                                              wsShareId,
                                              shareWSMemberId
                                            ])
                                              ? isShortLinksFoldersDataFetching
                                              : undefined
                                          }
                                          _foldersData={
                                            (isZNonEmptyString(workspaceId) ||
                                              isZNonEmptyStrings([
                                                wsShareId,
                                                shareWSMemberId
                                              ])) &&
                                            shortLinksFoldersData !== null &&
                                            shortLinksFoldersData !== undefined
                                              ? shortLinksFoldersData
                                              : []
                                          }
                                        />
                                      </ZCan>

                                      {/* Add Notes */}
                                      <AddNotes showSkeleton={isZFetching} />

                                      {/* Commented embed widget, link cloaking, and deep links until we properly integrate them. Approve by Sir Ahsan */}
                                      {/* Add Embed Widget */}
                                      {/* <ZCan
                                        returnPermissionDeniedView={true}
                                        shareWSId={wsShareId}
                                        permissionType={
                                          (shareWSMemberId?.trim()?.length ??
                                            0) > 0 &&
                                          (wsShareId?.trim()?.length ?? 0) > 0
                                            ? permissionsTypeEnum.shareWSMemberPermissions
                                            : permissionsTypeEnum.loggedInUserPermissions
                                        }
                                        havePermissions={
                                          (shareWSMemberId?.trim()?.length ??
                                            0) > 0 &&
                                          (wsShareId?.trim()?.length ?? 0) > 0
                                            ? [
                                                shareWSPermissionEnum.viewAny_sws_embededWidget
                                              ]
                                            : [
                                                permissionsEnum.viewAny_embededWidget
                                              ]
                                        }>
                                        <EmbedWidget />
                                      </ZCan> */}

                                      {/* Deep Linking */}
                                      {/* <DeepLinking /> */}

                                      {/* Link Cloaking */}
                                      {/* <LinkCloaking /> */}

                                      {/* Tags */}
                                      <Tags />

                                      {/* Rotator - AB Testing */}
                                      <RotatorABTesting />

                                      {/* Geo Location */}
                                      <GeoLocation />

                                      {/* Link Expiration */}
                                      <LinkExpiration />

                                      {/* Link Password */}
                                      <LinkPassword />

                                      {/* Link Favicon */}
                                      <LinkFavIcon />

                                      {/* GDPR Popup */}
                                      {/* <GdprPopup /> */}
                                    </Suspense>
                                  </ZIonRow>
                                )}
                              </ZIonCol>
                            </ZIonRow>
                          </Suspense>
                        </ZIonGrid>

                        {/* Footer */}
                        <ZIonFooter>
                          {/* Gird */}
                          <ZIonGrid className='mx-4 mt-3'>
                            {/* Row */}
                            <ZIonRow>
                              {/* Col-1 */}
                              <ZIonCol>
                                {/* get my link button */}
                                <ZIonButton
                                  expand='full'
                                  onClick={() => {
                                    void submitForm();
                                  }}
                                  disabled={isSubmitting || !isValid}>
                                  {editLinkId !== undefined
                                    ? 'Get my updated link'
                                    : 'Get my new link'}
                                </ZIonButton>
                              </ZIonCol>
                            </ZIonRow>
                          </ZIonGrid>
                        </ZIonFooter>
                      </ZIonCol>
                    </ZIonRow>
                  </ZIonGrid>
                </ZIonContent>
              );
            }}
          </Formik>
        </ZCan>
      )}
    </ZIonPage>
  );
};

// Top bar
const ZTopBar: React.FC = () => {
  // getting link-in-bio and workspace ids from url with the help of useParams.
  const { editLinkId, workspaceId, shareWSMemberId, wsShareId } = useParams<{
    editLinkId?: string;
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  // #region custom hooks
  const { isXlScale, isLgScale, isMdScale, isSmScale } = useZMediaQueryScale();
  const { zInvalidateReactQueries } = useZInvalidateReactQueries();
  // #endregion

  // Formik Context.
  const { resetForm, submitForm, isSubmitting, isValid } = useFormikContext();

  // #region Recoils.
  //
  const [newShortLinkFormState] = useRecoilState(NewShortLinkFormState);
  // #endregion

  return (
    <ZIonGrid className='px-3 py-2 zaions__bg_white'>
      {/* Row */}
      <ZIonRow className='ion-align-items-center'>
        {/* Col-1 */}
        <ZIonCol
          sizeXl=''
          sizeLg=''
          sizeMd=''
          sizeSm='12'
          sizeXs='12'
          className={classNames({
            flex: true,
            'flex-col-reverse ion-align-items-center':
              (!isMdScale && isSmScale) || (!isMdScale && !isSmScale)
          })}>
          {/* Home button */}
          {isMdScale && (
            <ZIonButton
              size={
                (!isMdScale && isSmScale) || (!isMdScale && !isSmScale)
                  ? 'small'
                  : 'default'
              }
              className={classNames({
                'ion-text-capitalize': true,
                'w-full':
                  (!isMdScale && isSmScale) || (!isMdScale && !isSmScale)
              })}
              routerLink={
                (workspaceId?.trim()?.length ?? 0) > 0
                  ? replaceRouteParams(
                      ZaionsRoutes.AdminPanel.ShortLinks.Main,
                      [
                        CONSTANTS.RouteParams.workspace.workspaceId,
                        CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                      ],
                      [workspaceId ?? '', CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE]
                    )
                  : (wsShareId?.trim()?.length ?? 0) > 0
                  ? replaceRouteParams(
                      ZaionsRoutes.AdminPanel.ShareWS.Short_link.Main,
                      [
                        CONSTANTS.RouteParams.workspace.wsShareId,
                        CONSTANTS.RouteParams.workspace.shareWSMemberId,
                        CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                      ],
                      [
                        wsShareId ?? '',
                        shareWSMemberId ?? '',
                        CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                      ]
                    )
                  : ''
              }
              onClick={() => {
                resetForm();
              }}>
              Home
            </ZIonButton>
          )}

          {/* Title */}
          <ZIonTitle
            color='medium'
            className={classNames({
              'text-xl': isXlScale || isLgScale,
              'text-lg': isMdScale && !isSmScale,
              'text-md ion-no-padding ps-2': !isMdScale && isSmScale,
              'text-sm ion-no-padding ps-2': !isMdScale && !isSmScale
            })}>
            {(editLinkId?.trim()?.length ?? 0) > 0
              ? 'Update Link'
              : 'Create a New link'}
          </ZIonTitle>
        </ZIonCol>

        {/* Col-2 */}
        {isLgScale && (
          <ZIonCol
            sizeXl=''
            sizeLg=''
            sizeMd=''
            sizeSm='12'
            sizeXs='12'
            className='ion-text-center'>
            <ZIonText
              color='medium'
              className={classNames({
                'font-bold': true,
                'text-2xl': isXlScale || isLgScale,
                'text-xl': isMdScale && !isLgScale,
                'text-lg': !isMdScale && isSmScale,
                'text-md': !isMdScale && !isSmScale
              })}>
              Link settings
            </ZIonText>
          </ZIonCol>
        )}

        {/* Col-3 */}
        <ZIonCol
          sizeXl=''
          sizeLg=''
          sizeMd=''
          sizeSm='12'
          sizeXs='12'
          className={classNames({
            'ion-text-end': isMdScale,
            'flex ion-align-items-center': !isMdScale && isSmScale,
            'flex-col': !isSmScale
          })}>
          {!isMdScale && (
            <ZIonButton
              minHeight={
                (!isMdScale && isSmScale) || (!isMdScale && !isSmScale)
                  ? '1.3rem'
                  : '2rem'
              }
              className={classNames({
                'w-[33.33%]': !isMdScale && isSmScale,
                'w-full': !isSmScale
              })}
              routerLink={replaceRouteParams(
                ZaionsRoutes.AdminPanel.ShortLinks.Main,
                [
                  CONSTANTS.RouteParams.workspace.workspaceId,
                  CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                ],
                [workspaceId ?? '', CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE]
              )}
              onClick={() => {
                resetForm();
              }}>
              Home
            </ZIonButton>
          )}

          <ZIonButton
            fill='outline'
            onClick={() => {
              void (async () => {
                try {
                  if ((workspaceId?.trim()?.length ?? 0) > 0) {
                    if (
                      (editLinkId?.trim()?.length ?? 0) > 0 &&
                      newShortLinkFormState?.formMode === FormMode.EDIT
                    ) {
                      await zInvalidateReactQueries([
                        CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.GET,
                        workspaceId ?? '',
                        editLinkId ?? ''
                      ]);
                    }

                    // Pixel.
                    await zInvalidateReactQueries([
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN,
                      workspaceId ?? ''
                    ]);

                    // Utm tag.
                    await zInvalidateReactQueries([
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN,
                      workspaceId ?? ''
                    ]);

                    // Folder.
                    await zInvalidateReactQueries([
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN,
                      workspaceId ?? '',
                      folderState.shortlink
                    ]);
                  } else if ((wsShareId?.trim()?.length ?? 0) > 0) {
                    await zInvalidateReactQueries([
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS
                        .MEMBER_ROLE_AND_PERMISSIONS,
                      wsShareId ?? ''
                    ]);

                    await zInvalidateReactQueries([
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.SHARE_WS_INFO,
                      wsShareId ?? ''
                    ]);

                    if (
                      (editLinkId?.trim()?.length ?? 0) > 0 &&
                      newShortLinkFormState?.formMode === FormMode.EDIT
                    ) {
                      await zInvalidateReactQueries([
                        CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.SWS_GET,
                        wsShareId ?? '',
                        editLinkId ?? ''
                      ]);
                    }

                    // Share workspace Pixel.
                    await zInvalidateReactQueries([
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.SWS_MAIN,
                      wsShareId ?? ''
                    ]);

                    // Share workspace Utm tag.
                    await zInvalidateReactQueries([
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.SWS_MAIN
                    ]);

                    // Share workspace folder
                    await zInvalidateReactQueries([
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.SWS_MAIN,
                      wsShareId ?? '',
                      folderState.shortlink
                    ]);
                  }
                } catch (error) {
                  reportCustomError(error);
                }
              })();
            }}
            size={
              (!isMdScale && isSmScale) || (!isMdScale && !isSmScale)
                ? 'small'
                : 'default'
            }
            className={classNames({
              'w-[33.33%]': !isMdScale && isSmScale,
              'w-full': !isSmScale
            })}
            expand={
              (!isMdScale && isSmScale) || (!isMdScale && !isSmScale)
                ? 'block'
                : undefined
            }>
            <ZIonIcon
              slot='start'
              icon={refresh}
            />
            Refetch
          </ZIonButton>

          {/* get my link button */}
          <ZIonButton
            onClick={() => {
              void submitForm();
            }}
            disabled={isSubmitting || !isValid}
            className={classNames({
              'w-[33.33%]': !isMdScale && isSmScale,
              'w-full mt-2': !isSmScale
            })}
            expand={
              (!isMdScale && isSmScale) || (!isMdScale && !isSmScale)
                ? 'block'
                : undefined
            }
            size={
              (!isMdScale && isSmScale) || (!isMdScale && !isSmScale)
                ? undefined
                : 'default'
            }
            minHeight={
              (!isMdScale && isSmScale) || (!isMdScale && !isSmScale)
                ? '1.3rem'
                : undefined
            }>
            {(editLinkId?.trim()?.length ?? 0) > 0
              ? 'Get my updated link'
              : 'Get my new link'}
          </ZIonButton>
        </ZIonCol>
      </ZIonRow>
    </ZIonGrid>
  );
};

// Tob bar skeleton
const ZTopBarSkeleton: React.FC = () => {
  // #region custom hooks
  const { isMdScale, isSmScale } = useZMediaQueryScale();
  // #endregion

  return (
    <ZIonGrid className='px-3 py-2 zaions__bg_white'>
      {/* Row */}
      <ZIonRow className='ion-align-items-center'>
        {/* Col-1 */}
        <ZIonCol
          sizeXl=''
          sizeLg=''
          sizeMd=''
          sizeSm='12'
          sizeXs='12'
          className={classNames({
            flex: true,
            'flex-col-reverse ion-align-items-center':
              (!isMdScale && isSmScale) || (!isMdScale && !isSmScale)
          })}>
          {/* Home button */}
          <ZIonButton
            size={
              (!isMdScale && isSmScale) || (!isMdScale && !isSmScale)
                ? 'small'
                : 'default'
            }
            className={classNames({
              'ion-text-capitalize': true,
              'w-full': (!isMdScale && isSmScale) || (!isMdScale && !isSmScale)
            })}>
            <ZIonSkeletonText
              animated={true}
              width={isMdScale ? '40px' : !isMdScale ? '100%' : '40px'}
              height='17px'
            />
          </ZIonButton>

          {/* Title */}
          <ZIonTitle color='medium'>
            <ZIonSkeletonText
              animated={true}
              width='120px'
              height='17px'
            />
          </ZIonTitle>
        </ZIonCol>

        {/* Col-2 */}
        {isMdScale && (
          <ZIonCol
            sizeXl=''
            sizeLg=''
            sizeMd=''
            sizeSm='12'
            sizeXs='12'
            className='flex ion-text-center ion-align-items-center ion-justify-content-center'>
            <ZIonText
              color='medium'
              className='text-2xl font-bold'>
              <ZIonSkeletonText
                animated={true}
                width='150px'
                height='30px'
              />
            </ZIonText>
          </ZIonCol>
        )}

        {/* Col-3 */}
        <ZIonCol
          sizeXl=''
          sizeLg=''
          sizeMd=''
          sizeSm='12'
          sizeXs='12'
          className={classNames({
            'ion-text-end': isMdScale
          })}>
          {/* get my link button */}
          <ZIonButton
            className={classNames({
              'ion-text-capitalize': true,
              'mx-0 mt-2':
                (!isMdScale && isSmScale) || (!isMdScale && !isSmScale)
            })}
            expand={
              (!isMdScale && isSmScale) || (!isMdScale && !isSmScale)
                ? 'block'
                : undefined
            }
            size={
              (!isMdScale && isSmScale) || (!isMdScale && !isSmScale)
                ? 'small'
                : 'default'
            }>
            <ZIonSkeletonText
              animated={true}
              width={isMdScale ? '140px' : !isMdScale ? '100%' : '140px'}
              height='17px'
            />
          </ZIonButton>
        </ZIonCol>
      </ZIonRow>
    </ZIonGrid>
  );
};

export default AdminCreateNewLinkPages;
