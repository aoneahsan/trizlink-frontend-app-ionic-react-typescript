/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { Suspense, useMemo, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import VALIDATOR from 'validator';
import { settingsOutline } from 'ionicons/icons';
import { Formik } from 'formik';
import classNames from 'classnames';
import { useParams } from 'react-router';
import { type RefresherEventDetail } from '@ionic/core';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import AddNotes from '@/components/UserDashboard/AddNotes';
import Tags from '@/components/UserDashboard/Tags';
import RotatorABTesting from '@/components/UserDashboard/RotatorABTesting';
import GeoLocation from '@/components/UserDashboard/GeoLocation';
import LinkExpiration from '@/components/UserDashboard/LinkExpiration';
import LinkPassword from '@/components/UserDashboard/Password';
import LinkFavIcon from '@/components/UserDashboard/Favicon';
import {
  ZIonCol,
  ZIonText,
  ZIonIcon,
  ZIonRow,
  ZIonGrid,
  ZIonContent,
  ZIonFooter,
  ZIonButton,
  ZIonRefresher,
  ZIonRefresherContent
} from '@/components/ZIonComponents';
import ZaionsCustomYourLink from '@/components/UserDashboard/shortUrlCustomYourLink';
import NewLinkFolder from '@/components/UserDashboard/NewLinkFolder';
import LinksPixelsAccount from '@/components/UserDashboard/LinksPixelsAccount';
import UTMTagTemplates from '@/components/UserDashboard/UTMTagTemplates';
import DomainName from '@/components/UserDashboard/DomainName';
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
import MESSAGES from '@/utils/messages';
import {
  _getQueryKey,
  areAllObjectsFilled,
  extractInnerData,
  isZNonEmptyString,
  isZNonEmptyStrings,
  validateField,
  zStringify
} from '@/utils/helpers';
import {
  API_URL_ENUM,
  extractInnerDataOptionsEnum,
  VALIDATION_RULE,
  ZWSTypeEum
} from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';
import { showSuccessNotification } from '@/utils/notification';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  type ABTestingRotatorInterface,
  type GeoLocationRotatorInterface,
  folderState,
  AdminPanelSidebarMenuPageEnum
} from '@/types/AdminPanel/index.type';
import { type LinkInBioType } from '@/types/AdminPanel/linkInBioType';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { ZFallbackIonSpinner2 } from '@/components/CustomComponents/FallbackSpinner';
import AdminPanelSidebarMenu from '@/components/AdminPanelComponents/Sidebar/ExpendableMenu';
import { useRecoilValue } from 'recoil';
import { ZDashboardRState } from '@/ZaionsStore/UserDashboard/ZDashboard';
import ZCan from '@/components/Can';
import {
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';
import {
  type LinkFolderType,
  type PixelAccountType,
  type UTMTagTemplateType
} from '@/types/AdminPanel/linksType';
import { zAxiosApiRequestContentType } from '@/types/CustomHooks/zapi-hooks.type';
import { ENVS } from '@/utils/envKeys';

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

const LinkInBioShareSettings: React.FC = () => {
  const [showAdvanceOptions, setShowAdvanceOptions] = useState(false);

  const { linkInBioId, workspaceId, shareWSMemberId, wsShareId } = useParams<{
    linkInBioId?: string;
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  // #region Custom hooks.
  const { isLgScale, isMdScale, is2XlScale } = useZMediaQueryScale();
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  const { zInvalidateReactQueries } = useZInvalidateReactQueries();

  // #endregion

  // #region Recoils
  // Recoil state that control the dashboard.
  const ZDashboardState = useRecoilValue(ZDashboardRState);
  // #endregion

  // #region APIS
  // fetching link-in-bio with the linkInBioId data from backend.
  const { data: selectedLinkInBio, isFetching: isSelectedLinkInBioFetching } =
    useZRQGetRequest<LinkInBioType>({
      _url: API_URL_ENUM.linkInBio_update_delete,
      _key: _getQueryKey({
        keys: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.GET],
        additionalKeys: [workspaceId, wsShareId, shareWSMemberId, linkInBioId]
      }),
      _itemsIds: _getQueryKey({
        keys: [
          isZNonEmptyString(workspaceId)
            ? ZWSTypeEum.personalWorkspace
            : isZNonEmptyString(wsShareId) && isZNonEmptyString(shareWSMemberId)
            ? ZWSTypeEum.shareWorkspace
            : ''
        ],
        additionalKeys: [workspaceId, shareWSMemberId, linkInBioId]
      }),
      _urlDynamicParts: [
        CONSTANTS.RouteParams.workspace.type,
        CONSTANTS.RouteParams.workspace.workspaceId,
        CONSTANTS.RouteParams.linkInBio.linkInBioId
      ],
      _shouldFetchWhenIdPassed: !(
        isZNonEmptyStrings([wsShareId, shareWSMemberId, linkInBioId]) ||
        isZNonEmptyStrings([workspaceId, linkInBioId])
      ),
      _extractType: ZRQGetRequestExtractEnum.extractItem
    });

  // Update Link-in-bio API.
  const { mutateAsync: UpdateLinkInBio } = useZRQUpdateRequest({
    _url: API_URL_ENUM.linkInBio_update_delete
  });

  // If owned-workspace then this api will fetch owned-workspace-pixels data.
  const { isFetching: isPixelAccountsDataFetching } = useZRQGetRequest<
    PixelAccountType[]
  >({
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
  const { isFetching: isSWSPixelAccountsDataFetching } = useZRQGetRequest<
    PixelAccountType[]
  >({
    _url: API_URL_ENUM.sws_pixel_account_create_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.SWS_MAIN,
      shareWSMemberId ?? '',
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
  const { isFetching: isUTMTagsDataFetching } = useZRQGetRequest<
    UTMTagTemplateType[]
  >({
    _url: API_URL_ENUM.userAccountUtmTags_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN, workspaceId ?? ''],
    _shouldFetchWhenIdPassed: !((workspaceId?.trim()?.length ?? 0) > 0),
    _itemsIds: [workspaceId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _showLoader: false
  });

  // If share workspace then this api will fetch current share workspace utm tags data.
  const { isFetching: isSWSUTMTagsDataFetching } = useZRQGetRequest<
    UTMTagTemplateType[]
  >({
    _url: API_URL_ENUM.sws_utm_tag_create_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.SWS_MAIN,
      shareWSMemberId ?? '',
      wsShareId ?? ''
    ],
    _shouldFetchWhenIdPassed: !(
      (wsShareId?.trim()?.length ?? 0) > 0 &&
      (shareWSMemberId?.trim()?.length ?? 0) > 0
    ),
    _itemsIds: [shareWSMemberId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _showLoader: false
  });

  // If workspace-link-in-bio folders data.
  const { data: libLinksFoldersData, isFetching: isLibFoldersDataFetching } =
    useZRQGetRequest<LinkFolderType[]>({
      _url: API_URL_ENUM.folders_list,
      _showLoader: false,
      _key: _getQueryKey({
        keys: [
          CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN,
          folderState.linkInBio
        ],
        additionalKeys: [workspaceId, wsShareId, shareWSMemberId, linkInBioId]
      }),
      _itemsIds: _getQueryKey({
        keys: [
          isZNonEmptyString(workspaceId)
            ? ZWSTypeEum.personalWorkspace
            : isZNonEmptyString(wsShareId) && isZNonEmptyString(shareWSMemberId)
            ? ZWSTypeEum.shareWorkspace
            : '',
          folderState.linkInBio
        ],
        additionalKeys: [workspaceId, shareWSMemberId]
      }),
      _urlDynamicParts: [
        CONSTANTS.RouteParams.workspace.type,
        CONSTANTS.RouteParams.workspace.modal,
        CONSTANTS.RouteParams.workspace.workspaceId
      ],
      _shouldFetchWhenIdPassed: !(
        isZNonEmptyStrings([workspaceId, linkInBioId]) ||
        isZNonEmptyStrings([wsShareId, shareWSMemberId, linkInBioId])
      )
    });

  // Single file upload.
  const { mutateAsync: uploadSingleFile } = useZRQCreateRequest({
    _url: API_URL_ENUM.uploadSingleFile,
    _authenticated: true,
    _contentType: zAxiosApiRequestContentType.FormData
  });

  // Delete file api.
  const { mutateAsync: deleteSingleFile } = useZRQUpdateRequest({
    _url: API_URL_ENUM.deleteSingleFile
  });
  // #endregion

  // #region Functions.
  // Formik submit handler.
  const FormikSubmissionHandler = async (
    _reqDataStr: string
  ): Promise<void> => {
    try {
      if (_reqDataStr?.trim()?.length > 0) {
        // The update api...
        const _response = await UpdateLinkInBio({
          itemIds: _getQueryKey({
            keys: [
              isZNonEmptyString(workspaceId)
                ? ZWSTypeEum.personalWorkspace
                : isZNonEmptyString(wsShareId) &&
                  isZNonEmptyString(shareWSMemberId)
                ? ZWSTypeEum.shareWorkspace
                : ''
            ],
            additionalKeys: [workspaceId, shareWSMemberId, linkInBioId]
          }),
          urlDynamicParts: [
            CONSTANTS.RouteParams.workspace.type,
            CONSTANTS.RouteParams.workspace.workspaceId,
            CONSTANTS.RouteParams.linkInBio.linkInBioId
          ],
          requestData: _reqDataStr
        });

        if (_response !== undefined && _response !== null) {
          // extract Data from _response.
          const _data = extractInnerData<LinkInBioType>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          // if we have data then show success message.
          if (_data?.id !== undefined && _data?.id !== null) {
            const _oldLinkInBios =
              extractInnerData<LinkInBioType[]>(
                getRQCDataHandler<LinkInBioType[]>({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN,
                    workspaceId ?? ''
                  ]
                }) ?? [],
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) ?? [];

            // Updating single link-in-bio data in RQ cache.
            await updateRQCDataHandler<LinkInBioType | undefined>({
              key: _getQueryKey({
                keys: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.GET],
                additionalKeys: [
                  workspaceId,
                  wsShareId,
                  shareWSMemberId,
                  linkInBioId
                ]
              }),
              data: _data,
              id: '',
              extractType: ZRQGetRequestExtractEnum.extractItem,
              updateHoleData: true
            });

            if (_oldLinkInBios?.length > 0) {
              await updateRQCDataHandler({
                key: _getQueryKey({
                  keys: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN],
                  additionalKeys: [workspaceId, wsShareId, shareWSMemberId]
                }),
                data: _data,
                id: _data?.id
              });
            }
            // Updating current link in bio data in RQ cache.
          }
        }

        showSuccessNotification(MESSAGES.LINK_IN_BIO.UPDATED);

        // if __response of the updateLinkInBio api is success this showing success notification else not success then error notification.
        // await validateRequestResponse({
        // resultObj: __response,
        // successNotificationType: notificationTypeEnum.sideNotification,
        // });
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  const invalidedQueries = async (): Promise<void> => {
    try {
      await zInvalidateReactQueries(
        _getQueryKey({
          keys: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.GET],
          additionalKeys: [workspaceId, wsShareId, shareWSMemberId, linkInBioId]
        })
      );

      await zInvalidateReactQueries(
        _getQueryKey({
          keys: [
            CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN,
            folderState.linkInBio
          ],
          additionalKeys: [workspaceId, wsShareId, shareWSMemberId, linkInBioId]
        })
      );

      if (
        workspaceId !== undefined &&
        workspaceId !== null &&
        workspaceId?.trim()?.length > 0
      ) {
        await zInvalidateReactQueries([
          CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN,
          workspaceId
        ]);

        //
        await zInvalidateReactQueries([
          CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN,
          workspaceId
        ]);
      }

      if (
        shareWSMemberId !== undefined &&
        shareWSMemberId !== null &&
        shareWSMemberId?.trim()?.length > 0 &&
        wsShareId !== undefined &&
        wsShareId !== null &&
        wsShareId?.trim()?.length > 0
      ) {
        //
        await zInvalidateReactQueries([
          CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.SWS_MAIN,
          shareWSMemberId ?? '',
          wsShareId ?? ''
        ]);

        await zInvalidateReactQueries([
          CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.SWS_MAIN,
          shareWSMemberId ?? '',
          wsShareId ?? ''
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
  // #endregion

  const isZFetching = isSelectedLinkInBioFetching;

  const formikInitialValues = useMemo(
    () => ({
      title: selectedLinkInBio?.title ?? '',
      linkDescription: selectedLinkInBio?.description ?? '',
      // featureImg: selectedLinkInBio?.featureImg ?? '',
      featureImg: {
        featureImgPath: selectedLinkInBio?.featureImg?.featureImgPath ?? '',
        featureImgUrl: selectedLinkInBio?.featureImg?.featureImgUrl ?? '',
        featureImgFile: selectedLinkInBio?.featureImg?.featureImgFile ?? null
      },
      password: {
        value: selectedLinkInBio?.password?.value ?? '',
        enabled: selectedLinkInBio?.password?.enabled ?? false
      },
      folderId: isZNonEmptyString(String(selectedLinkInBio?.folderId))
        ? selectedLinkInBio?.folderId
        : CONSTANTS.DEFAULT_VALUES.DEFAULT_FOLDER,
      linkNote: selectedLinkInBio?.notes ?? '',
      tags:
        selectedLinkInBio?.tags !== null &&
        selectedLinkInBio?.tags !== undefined
          ? selectedLinkInBio.tags
          : [],
      linkExpiration: {
        enabled: selectedLinkInBio?.linkExpirationInfo?.enabled ?? false,
        expirationDate:
          selectedLinkInBio?.linkExpirationInfo?.expirationDate ?? '',
        timezone: selectedLinkInBio?.linkExpirationInfo?.timezone ?? '',
        redirectionLink:
          selectedLinkInBio?.linkExpirationInfo?.redirectionLink ?? ''
      },
      rotatorABTesting: selectedLinkInBio?.abTestingRotatorLinks ?? [],
      geoLocation: selectedLinkInBio?.geoLocationRotatorLinks ?? [],
      shortUrl: {
        domain: selectedLinkInBio?.shortUrl?.domain ?? '',
        url: selectedLinkInBio?.shortUrl?.url ?? ''
      },
      linkPixelsAccount: selectedLinkInBio?.pixelIds ?? [],
      UTMTags: {
        templateId: selectedLinkInBio?.utmTagInfo?.templateId ?? '',
        utmCampaign: selectedLinkInBio?.utmTagInfo?.utmCampaign ?? '',
        utmMedium: selectedLinkInBio?.utmTagInfo?.utmMedium ?? '',
        utmSource: selectedLinkInBio?.utmTagInfo?.utmSource ?? '',
        utmTerm: selectedLinkInBio?.utmTagInfo?.utmTerm ?? '',
        utmContent: selectedLinkInBio?.utmTagInfo?.utmContent ?? ''
      },
      // favicon: selectedLinkInBio?.favicon ?? '',
      // faviconPath: selectedLinkInBio?.faviconPath ?? '',
      favicon: {
        path: selectedLinkInBio?.favicon?.path ?? '',
        url: selectedLinkInBio?.favicon?.url ?? '',
        file: selectedLinkInBio?.favicon?.file ?? null
      },

      //
      shortUrlDomain:
        selectedLinkInBio?.shortUrlDomain ?? ENVS.defaultShortUrlDomain,
      shortUrlPath: selectedLinkInBio?.shortUrlPath ?? ''

      // complete page fields here
    }),
    [selectedLinkInBio]
  );

  return (
    <Formik
      // #region ( Initial Values Start  )
      initialValues={formikInitialValues}
      enableReinitialize={true}
      // #endregion ( Initial Values End  )

      // #region ( Handling Validation & Errors Start  )
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
        } = {
          target: {},
          linkExpiration: {},
          rotatorABTesting: [],
          geoLocation: [],
          password: {}
        };

        // Link Title Validation Starts
        validateField('title', values, errors, VALIDATION_RULE.linkTitle);
        // Link Title Validation End

        // Password Validation Start
        if (values.password.enabled) {
          validateField(
            'value',
            values?.password,
            errors?.password,
            VALIDATION_RULE.password
          );
        }
        // Password Validation End

        // Link Expiration Validation Start
        if (values.linkExpiration.enabled) {
          validateField(
            'redirectionLink',
            values?.linkExpiration,
            errors?.linkExpiration,
            VALIDATION_RULE.url
          );
        }
        //  Link Expiration Validation End

        // Rotator AB Testing Field Validation Start
        if (values.rotatorABTesting.length > 0) {
          errors.rotatorABTesting = values.rotatorABTesting.map(() => ({}));
          values.rotatorABTesting.forEach(
            (el: ABTestingRotatorInterface, index) => {
              if (
                el.redirectionLink === undefined ||
                el.redirectionLink === null ||
                el.redirectionLink?.trim()?.length === 0
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
                el.percentage === 0 ||
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
        if (values.geoLocation.length > 0) {
          errors.geoLocation = values.geoLocation.map(el => ({}));
          values.geoLocation.forEach(
            (el: GeoLocationRotatorInterface, index) => {
              if (
                el.redirectionLink === undefined ||
                el.redirectionLink === null ||
                el.redirectionLink?.trim()?.length === 0
              ) {
                errors.geoLocation[index].redirectionLink =
                  MESSAGES.FORM_VALIDATIONS.LINK.GEOLOCATION.REQUIRED_REDIRECTION_LINK;
              } else if (!VALIDATOR.isURL(el.redirectionLink)) {
                errors.geoLocation[index].redirectionLink =
                  MESSAGES.FORM_VALIDATIONS.LINK.GEOLOCATION.INVALID_REDIRECTION_LINK;
              }
              if (
                el.country === undefined ||
                el.country === null ||
                el.country?.length === 0
              ) {
                errors.geoLocation[index].country =
                  MESSAGES.FORM_VALIDATIONS.LINK.GEOLOCATION.REQUIRED_COUNTRY;
              }
            }
          );
        }
        // Rotator Geo Location Field Validation End

        // check for errors if there are any return errors object otherwise return []

        let _total = 0;

        Array.from(
          values?.rotatorABTesting,
          ({ percentage }) => (_total = _total + (percentage ?? 0))
        );

        if (
          isZNonEmptyString(errors.target?.url) ||
          isZNonEmptyString(errors.target?.accountId) ||
          isZNonEmptyString(errors.target?.email) ||
          isZNonEmptyString(errors.target?.message) ||
          isZNonEmptyString(errors.target?.username) ||
          isZNonEmptyString(errors.target?.phoneNumber) ||
          isZNonEmptyString(errors.target?.subject) ||
          isZNonEmptyString(errors.linkExpiration?.redirectionLink) ||
          isZNonEmptyString(errors.title) ||
          isZNonEmptyString(errors.password?.value) ||
          !areAllObjectsFilled((errors.rotatorABTesting as object[]) ?? []) ||
          !areAllObjectsFilled((errors.geoLocation as object[]) ?? []) ||
          _total > 100
        ) {
          return errors;
        } else {
          return [];
        }
      }}
      // #endregion ( Handling Validation & Errors End  )

      onSubmit={async (values, { resetForm }) => {
        // For feature image
        if (
          isZNonEmptyString(values?.featureImg?.featureImgUrl) &&
          values?.featureImg?.featureImgFile !== null &&
          values?.featureImg?.featureImgFile !== undefined
        ) {
          const formData = new FormData();
          formData.append('file', values?.featureImg?.featureImgFile);

          if (isZNonEmptyString(selectedLinkInBio?.featureImg?.featureImgUrl)) {
            // Deleting the file from storage
            await deleteSingleFile({
              requestData: zStringify({
                filePath: selectedLinkInBio?.featureImg.featureImgPath
              }),
              itemIds: [],
              urlDynamicParts: []
            });
          }

          const result = await uploadSingleFile(formData);

          if (result !== undefined || result !== null) {
            const _data = (
              result as {
                data: {
                  file: object;
                  fileName: object;
                  filePath: string;
                  fileUrl: string;
                };
              }
            )?.data;

            values.featureImg.featureImgUrl = _data.fileUrl;
            values.featureImg.featureImgPath = _data.filePath;
          }
        }

        // For favicon
        if (
          isZNonEmptyString(values.favicon?.url) &&
          values.favicon?.file !== null
        ) {
          const formData = new FormData();
          formData.append('file', values.favicon?.file);

          if (isZNonEmptyString(selectedLinkInBio?.favicon?.path)) {
            // Deleting the file from storage
            await deleteSingleFile({
              requestData: zStringify({
                filePath: selectedLinkInBio?.favicon?.path
              }),
              itemIds: [],
              urlDynamicParts: []
            });
          }

          const result = await uploadSingleFile(formData);

          if (result !== undefined || result !== null) {
            const _data = (
              result as {
                data: {
                  file: object;
                  fileName: object;
                  filePath: string;
                  fileUrl: string;
                };
              }
            )?.data;

            values.favicon.url = _data.fileUrl;
            values.favicon.path = _data.filePath;
          }
        }

        await FormikSubmissionHandler(
          zStringify({
            ...selectedLinkInBio,
            theme: zStringify(selectedLinkInBio?.theme),
            settings: zStringify(selectedLinkInBio?.settings),
            title: values.title,
            featureImg: zStringify({
              featureImgUrl: values?.featureImg.featureImgUrl,
              featureImgPath: values?.featureImg.featureImgPath
            }),
            password: zStringify({
              value: values.password.value,
              enabled: values.password.enabled
            }),
            linkExpirationInfo: zStringify({
              redirectionLink: values.linkExpiration.redirectionLink,
              expirationDate: values.linkExpiration.expirationDate,
              timezone: values.linkExpiration.timezone,
              enabled: values.linkExpiration.enabled
            }),
            abTestingRotatorLinks: zStringify(values.rotatorABTesting),
            geoLocationRotatorLinks: zStringify(values.geoLocation),
            description: values.linkDescription,
            folderId: values.folderId,
            notes: values.linkNote,
            pixelIds: zStringify(values.linkPixelsAccount),
            tags: zStringify(values.tags),
            utmTagInfo: zStringify(values.UTMTags),
            createdAt: Date.now().toString(),
            shortUrl: zStringify(values.shortUrl),
            // favicon: values.favicon
            favicon: zStringify({
              url: values?.favicon.url,
              path: values?.favicon.path
            })
          })
        );
      }}>
      {({ isSubmitting, isValid, dirty, submitForm }) => {
        return (
          <>
            <ZIonContent color='light'>
              {/* IonRefresher */}
              <ZIonRefresher
                onIonRefresh={event => {
                  void handleRefresh(event);
                }}>
                <ZIonRefresherContent />
              </ZIonRefresher>

              {/*  */}
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
                      activePage={AdminPanelSidebarMenuPageEnum.linkInBio}
                    />
                  </Suspense>

                  {/* Right-col */}
                  <ZIonCol
                    className='relative w-full h-full pt-2 overflow-y-scroll zaions_pretty_scrollbar zaions-transition'
                    sizeXl={
                      ZDashboardState?.dashboardMainSidebarIsCollabes.isExpand
                        ? is2XlScale
                          ? '10.5'
                          : '10'
                        : is2XlScale
                        ? '11.4'
                        : '11.2'
                    }
                    sizeLg={
                      ZDashboardState?.dashboardMainSidebarIsCollabes.isExpand
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
                          <ZaionsCustomYourLink showSkeleton={isZFetching} />
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
                                    : (shareWSMemberId?.trim()?.length ?? 0) >
                                        0 &&
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
                                    : (wsShareId?.trim()?.length ?? 0) > 0 &&
                                      (shareWSMemberId?.trim()?.length ?? 0) > 0
                                    ? isSWSUTMTagsDataFetching
                                    : undefined
                                }
                              />
                            </Suspense>
                          </ZCan>

                          {/* Choose Domain Name */}
                          <DomainName
                            showSkeleton={isZFetching}
                            isEditMode={true}
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
                                CONSTANTS.testingSelectors.shortLink.formPage
                                  .advanceOptionsBtn
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
                                className='gap-3 ion-margin-top mb-[4rem]'
                                testingselector={
                                  CONSTANTS.testingSelectors.shortLink.formPage
                                    .advanceOptionsContent
                                }>
                                <Suspense fallback={<ZFallbackIonSpinner2 />}>
                                  {/* Folder */}
                                  <ZCan
                                    returnPermissionDeniedView={true}
                                    shareWSId={wsShareId}
                                    permissionType={
                                      (shareWSMemberId?.trim()?.length ?? 0) >
                                        0 &&
                                      (wsShareId?.trim()?.length ?? 0) > 0
                                        ? permissionsTypeEnum.shareWSMemberPermissions
                                        : permissionsTypeEnum.loggedInUserPermissions
                                    }
                                    havePermissions={
                                      (shareWSMemberId?.trim()?.length ?? 0) >
                                        0 &&
                                      (wsShareId?.trim()?.length ?? 0) > 0
                                        ? [
                                            shareWSPermissionEnum.viewAny_sws_sl_folder
                                          ]
                                        : [permissionsEnum.viewAny_sl_folder]
                                    }>
                                    <NewLinkFolder
                                      _state={folderState.shortlink}
                                      showSkeleton={isLibFoldersDataFetching}
                                      _foldersData={libLinksFoldersData ?? []}
                                    />
                                  </ZCan>

                                  {/* Add Notes */}
                                  <AddNotes showSkeleton={isZFetching} />

                                  {/* Add Embed Widget */}
                                  {/* <ZCan
                                    returnPermissionDeniedView={true}
                                    shareWSId={wsShareId}
                                    permissionType={
                                      (shareWSMemberId?.trim()?.length ?? 0) >
                                        0 &&
                                      (wsShareId?.trim()?.length ?? 0) > 0
                                        ? permissionsTypeEnum.shareWSMemberPermissions
                                        : permissionsTypeEnum.loggedInUserPermissions
                                    }
                                    havePermissions={
                                      (shareWSMemberId?.trim()?.length ?? 0) >
                                        0 &&
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

                    <ZIonFooter className='fixed bottom-0 w-[-webkit-fill-available]'>
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
                              Get my updated link
                            </ZIonButton>
                          </ZIonCol>
                        </ZIonRow>
                      </ZIonGrid>
                    </ZIonFooter>
                  </ZIonCol>
                </ZIonRow>
              </ZIonGrid>

              {/*  */}
              {/* <div className='w-full h-full'>
                {/* Custom your link Grid * /}
                <ZIonGrid
                  className={classNames({
                    'my-5': true,
                    'ms-3': isMdScale,
                    'mx-2': !isMdScale
                  })}>
                  <ZIonRow
                    className={classNames({
                      'gap-4': isLgScale,
                      'gap-0': !isLgScale
                    })}>
                    {/* Custom Your Link * /}
                    <ZaionsCustomYourLink showSkeleton={isZFetching} />

                    {/* Pixel Account, Utm Tags, Custom Domain * /}
                    <ZIonCol
                      sizeXl='5.9'
                      sizeLg='5.8'
                      sizeMd='5.9'
                      sizeSm='12'
                      sizeXs='12'>
                      {/* Pixels * /}
                      <LinksPixelsAccount showSkeleton={isZFetching} />

                      {/* UTMTags * /}
                      <UTMTagTemplates showSkeleton={isZFetching} />

                      {/* Choose Domain Name * /}
                      <DomainName showSkeleton={isZFetching} />
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>

                {/* Advance Options * /}
                <ZIonGrid className='ms-3 me-1'>
                  <ZIonRow>
                    <ZIonCol>
                      <ZIonButton
                        // size='large'
                        // size={isMdScale ? 'large' : 'default'}
                        expand='block'
                        disabled={isZFetching}
                        onClick={() => {
                          if (!isZFetching) {
                            setShowAdvanceOptions(oldVal => !oldVal);
                          }
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
                      {showAdvanceOptions && (
                        <ZIonRow className='gap-5 ion-margin-top'>
                          {/* Folder * /}
              <NewLinkFolder
                _foldersData={[]}
                _state={folderState.linkInBio}
              />

              {/* Add Notes * /}
                          <AddNotes />

                          {/* Tags * /}
              <Tags />

              {/* Rotator - AB Testing * /}
                          <RotatorABTesting />

                          {/* Geo Location * /}
                          <GeoLocation />

                          {/* Link Expiration * /}
                          <LinkExpiration />

                          {/* Link Password * /}
                          <LinkPassword />

                          {/* Link Favicon * /}
                          <LinkFavIcon />

                          {/* GDPR Popup * /}
                          <GDPRPopup />
                        </ZIonRow>
                      )}
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </div> */}
            </ZIonContent>
          </>
        );
      }}
    </Formik>
  );
};

export default LinkInBioShareSettings;
