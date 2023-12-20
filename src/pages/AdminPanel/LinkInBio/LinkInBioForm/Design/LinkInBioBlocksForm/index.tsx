/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { Suspense, useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import routeQueryString from 'qs';
import { Formik } from 'formik';
import {
  addOutline,
  arrowUp,
  cardOutline,
  cashOutline,
  chevronBackOutline,
  copyOutline,
  eyeOffOutline,
  eyeOutline,
  imageOutline,
  linkOutline,
  lockClosedOutline,
  removeOutline,
  reorderFourOutline,
  trashBinOutline,
  wifiOutline
} from 'ionicons/icons';
import { useRecoilState, useSetRecoilState } from 'recoil';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { type OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCol,
  ZIonDatetimeButton,
  ZIonIcon,
  ZIonImg,
  ZIonLabel,
  ZIonRange,
  ZIonRouterLink,
  ZIonRow,
  ZIonSkeletonText,
  ZIonSpinner,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';
import LinkInBioLinkField from '@/components/LinkInBioComponents/Form/LinkField';
import LinkInBioTitleField from '@/components/LinkInBioComponents/Form/TitleField';
import LinkInBioDescriptionField from '@/components/LinkInBioComponents/Form/DescriptionField';
import LinkInBioUploadField from '@/components/LinkInBioComponents/Form/UploadField';
import LinkInBioEnableField from '@/components/LinkInBioComponents/Form/DateTimeField/enableField';
import LinkInBioSearchField from '@/components/LinkInBioComponents/Form/SearchField';
import LinkInBioTimezoneField from '@/components/LinkInBioComponents/Form/TimezoneField';
import ZRoundedButton from '@/components/CustomComponents/ZRoundedButton';
import ZRichTextEditor from '@/components/CustomComponents/ZTextEditor';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import ZaionsColorPiker from '@/components/InPageComponents/ZaionsColorPiker';
import ZCustomDeleteComponent from '@/components/CustomComponents/ZCustomDeleteComponent';
import ZLinkInBioAddBlockModal from '@/components/InPageComponents/ZaionsModals/LinkInBio/AddBlockModal';
import LinkInBioCarouselCardField from '@/components/LinkInBioComponents/Form/CarouselCardField';
import LinkInBioQAndACardField from '@/components/LinkInBioComponents/Form/QAndACardField';
import LinkInBioMusicPlatformCardField from '@/components/LinkInBioComponents/Form/MusicPlatformField';
import LinkInBioMessengerPlatformCardField from '@/components/LinkInBioComponents/Form/MessengerPlatformField';
import LinkInBioSocialPlatformCardField from '@/components/LinkInBioComponents/Form/socialPlatformField';
import LinkInBioIconField from '@/components/LinkInBioComponents/Form/IconField';
import LinkInBioVCardField from '@/components/LinkInBioComponents/Form/VCardField';
import LinkInBioIframeField from '@/components/LinkInBioComponents/Form/Iframe';
import LinkInBioFormField from '@/components/LinkInBioComponents/Form/FormField';
import ZRGAutoCompleteInput from '@/components/CustomComponents/GoogleMaps/ZRGAutoCompleteInput';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import {
  useZUpdateRQCacheData,
  useZRQDeleteRequest,
  useZRQGetRequest,
  useZRQUpdateRequest,
  useZGetRQCacheData,
  useZRQCreateRequest
} from '@/ZaionsHooks/zreactquery-hooks';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import { useZValidateRequestResponse } from '@/ZaionsHooks/zapi-hooks';
import CONSTANTS, { TIMEZONES } from '@/utils/constants';
import {
  _getQueryKey,
  createRedirectRoute,
  extractInnerData,
  formatReactSelectOption,
  isValidUrl,
  isZNonEmptyString,
  isZNonEmptyStrings,
  zStringify
} from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import {
  API_URL_ENUM,
  ZWSTypeEum,
  extractInnerDataOptionsEnum
} from '@/utils/enums';
import { reportCustomError } from '@/utils/customErrorType';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  LinkInBioButtonTypeEnum,
  LinkInBioThemeBackgroundEnum,
  ZLinkInBioPageEnum,
  ZLinkInBioRHSComponentEnum
} from '@/types/AdminPanel/linkInBioType';
import {
  LinkInBioBlockAnimationEnum,
  linkInBioBlockCardItemEnum,
  LinkInBioBlockEnum,
  type LinkInBioBlockFromType,
  LinkInBioCardStyleEnum,
  LinkInBioCardViewEnum,
  SeparatorTypeEnum
} from '@/types/AdminPanel/linkInBioType/blockTypes';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { type ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
import {
  reloadBlockingTypeEnum,
  type ZGenericObject
} from '@/types/zaionsAppSettings.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { LinkInBioBlocksRState } from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioBlocksState';

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
import classes from '../styles.module.css';

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */
import {
  album_style,
  borderDashed,
  borderDotted,
  borderSolid,
  card_style_1,
  card_style_2,
  carousel_view,
  circle_style,
  jelloAnimation,
  list_view,
  pulseAnimation,
  shakeAnimation,
  square_style,
  strip_style,
  swingAnimation,
  tadaAnimation,
  thumb_style_1,
  thumb_style_2,
  wobbleAnimation,
  zoomAnimation
} from '@/assets/images';
import { zAxiosApiRequestContentType } from '@/types/CustomHooks/zapi-hooks.type';
import LinkInBioDateTimeField from '@/components/LinkInBioComponents/Form/DateTimeField';
import { zGetPageMetadata } from '@/utils/helpers/apiHelpers';
import { reloadBlockingRStateAtom } from '@/ZaionsStore/AppRStates';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZLinkInBioBlocksForm: React.FC = () => {
  const location = useLocation();

  // current Link-in-bio id.
  const { linkInBioId, workspaceId, shareWSMemberId, wsShareId } = useParams<{
    linkInBioId?: string;
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  // #region Custom hooks.
  const { zNavigatePushRoute } = useZNavigate();
  // validate the request. this hook will show success notification if the request->success is true and show error notification if request->success is false.
  const { validateRequestResponse } = useZValidateRequestResponse();
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  // #endregion

  // #region Recoil states.
  // recoil state of single block data.
  // state for storing data of block. because when we go to edit page (blockFrom page) of any block or create a new block and redirect to blockFrom page we need data of that block, initial data or updated data we need it in blockFrom page for editing that block, so we store the data of block in setLinkInBioSelectedBlockFromState then we will initialized this to the initial value of the blockFrom page formik initial value. with the id of the current block.
  // const [linkInBioSelectedBlockFromState, setLinkInBioSelectedBlockFromState] =
  // useRecoilState(LinkInBioSelectedBlockFromRState);

  // Recoil state of blocks of preview panel.
  const [linkInBioBlocksState, setLinkInBioBlocksState] = useRecoilState(
    LinkInBioBlocksRState
  );

  // const [linkInBioBlockState, setLinkInBioBlockState] = useRecoilState(
  // LinkInBioBlocksRState
  // );

  const setReloadBlockingRState = useSetRecoilState(reloadBlockingRStateAtom);
  // #endregion

  // getting search param from url with the help of 'qs' package.
  const routeQSearchParams = routeQueryString.parse(location.search, {
    ignoreQueryPrefix: true
  });

  const _blockId = (routeQSearchParams as { blockId: string | undefined })
    ?.blockId;

  // #region API.
  // Update Link-in-bio block API.
  const { mutateAsync: UpdateLinkInBioBlock } = useZRQUpdateRequest({
    _url: API_URL_ENUM.linkInBioBlock_delete_update_get
  });

  // fetching link-in-bio block data with the help of linkInBioId and id from backend.
  const { data: linkInBioBlockData, isFetching: isLinkInBioBlockDataFetching } =
    useZRQGetRequest<LinkInBioBlockFromType>({
      _url: API_URL_ENUM.linkInBioBlock_delete_update_get,
      _key: _getQueryKey({
        keys: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_BLOCK.GET],
        additionalKeys: [
          workspaceId,
          wsShareId,
          shareWSMemberId,
          linkInBioId,
          _blockId
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
        additionalKeys: [workspaceId, shareWSMemberId, linkInBioId, _blockId]
      }),
      _urlDynamicParts: [
        CONSTANTS.RouteParams.workspace.type,
        CONSTANTS.RouteParams.workspace.workspaceId,
        CONSTANTS.RouteParams.linkInBio.linkInBioId,
        CONSTANTS.RouteParams.linkInBio.libBlockId
      ],
      _shouldFetchWhenIdPassed: !(
        isZNonEmptyStrings([workspaceId, _blockId]) ||
        isZNonEmptyStrings([wsShareId, shareWSMemberId, _blockId])
      ),
      _extractType: ZRQGetRequestExtractEnum.extractItem
    });
  // delete link-in-bio block api where use went to delete the block on preview panel and click on the delete button in ActionSheet (useZIonActionSheet) the deleteBlockHandler will execute with will hit this api and delete the block.
  const { mutateAsync: deleteLinkInBioBlockMutate } = useZRQDeleteRequest({
    _url: API_URL_ENUM.linkInBioBlock_delete_update_get
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

  // custom hook for presenting modal (the add block modal)
  const { presentZIonModal: presentZLinkInBioAddBlockModal } = useZIonModal(
    ZLinkInBioAddBlockModal,
    {
      _blockType: linkInBioBlockData?.blockType, // passing values.LinkInBioBlock as blockType to ZLinkInBioAddBlockModal component.
      _blockContent: linkInBioBlockData?.blockContent,
      linkInBioId,
      modalHeading: 'Clone block 😊',
      modalSubHeading: `Would you like clone this ${linkInBioBlockData?.blockType} block in your page?`,
      workspaceId
    }
  );

  // #region Functions.
  // formik submit function.
  const formikSubmitHandler = async (_reqDataStr: string): Promise<void> => {
    try {
      if (isZNonEmptyString(_reqDataStr)) {
        // The update api...
        const _response = await UpdateLinkInBioBlock({
          itemIds: _getQueryKey({
            keys: [
              isZNonEmptyString(workspaceId)
                ? ZWSTypeEum.personalWorkspace
                : isZNonEmptyString(wsShareId) &&
                  isZNonEmptyString(shareWSMemberId)
                ? ZWSTypeEum.shareWorkspace
                : ''
            ],
            additionalKeys: [
              workspaceId,
              shareWSMemberId,
              linkInBioId,
              _blockId
            ]
          }),
          urlDynamicParts: [
            CONSTANTS.RouteParams.workspace.type,
            CONSTANTS.RouteParams.workspace.workspaceId,
            CONSTANTS.RouteParams.linkInBio.linkInBioId,
            CONSTANTS.RouteParams.linkInBio.libBlockId
          ],
          requestData: _reqDataStr
        });

        if (_response !== undefined && _response !== null) {
          // if __response of the updateLinkInBioBlock api is success this showing success notification else not success then error notification.
          await validateRequestResponse({
            resultObj: _response
          });

          // extracting data from result.
          const _extractItemFromResult =
            extractInnerData<LinkInBioBlockFromType>(
              _response,
              extractInnerDataOptionsEnum.createRequestResponseItem
            );

          const _updatedLinkInBioBlocksState: LinkInBioBlockFromType[] =
            linkInBioBlocksState.map(el => {
              if (
                el.id === _extractItemFromResult?.id &&
                _extractItemFromResult !== undefined
              ) {
                return _extractItemFromResult;
              } else {
                return el;
              }
            });

          setLinkInBioBlocksState(_updatedLinkInBioBlocksState);

          if (
            _extractItemFromResult?.id !== undefined &&
            _extractItemFromResult?.id !== null
          ) {
            // Updating single block in all blocks data in RQ cache.
            await updateRQCDataHandler({
              key: _getQueryKey({
                keys: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_BLOCK.MAIN
                ],
                additionalKeys: [
                  workspaceId,
                  wsShareId,
                  shareWSMemberId,
                  linkInBioId
                ]
              }),
              data: _extractItemFromResult,
              id: _extractItemFromResult?.id
            });

            // Updating single block data in RQ cache.
            await updateRQCDataHandler<LinkInBioBlockFromType | undefined>({
              key: _getQueryKey({
                keys: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_BLOCK.GET
                ],
                additionalKeys: [
                  workspaceId,
                  wsShareId,
                  shareWSMemberId,
                  linkInBioId,
                  _blockId
                ]
              }),
              data: _extractItemFromResult,
              id: '',
              extractType: ZRQGetRequestExtractEnum.extractItem,
              updateHoleData: true
            });
          }
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  // delete block function.
  const deleteBlockHandler = async (
    detail: OverlayEventDetail<unknown>
  ): Promise<void> => {
    try {
      if (detail?.role === 'destructive' && _blockId !== undefined) {
        // const _updateLinkInBioBlockState = linkInBioBlockState.filter(
        // (el) => el.id !== _blockId
        // );

        const _response = await deleteLinkInBioBlockMutate({
          itemIds: _getQueryKey({
            keys: [
              isZNonEmptyString(workspaceId)
                ? ZWSTypeEum.personalWorkspace
                : isZNonEmptyString(wsShareId) &&
                  isZNonEmptyString(shareWSMemberId)
                ? ZWSTypeEum.shareWorkspace
                : ''
            ],
            additionalKeys: [
              workspaceId,
              shareWSMemberId,
              linkInBioId,
              _blockId
            ]
          }),
          urlDynamicParts: [
            CONSTANTS.RouteParams.workspace.type,
            CONSTANTS.RouteParams.workspace.workspaceId,
            CONSTANTS.RouteParams.linkInBio.linkInBioId,
            CONSTANTS.RouteParams.linkInBio.libBlockId
          ]
        });

        if (_response !== undefined && _response !== null) {
          // getting all the LinkInBioBlocks from RQ cache.
          const _oldLinkInBioBlocks =
            extractInnerData<LinkInBioBlockFromType[]>(
              getRQCDataHandler<LinkInBioBlockFromType[]>({
                key: _getQueryKey({
                  keys: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_BLOCK.MAIN
                  ],
                  additionalKeys: [
                    workspaceId,
                    wsShareId,
                    shareWSMemberId,
                    linkInBioId
                  ]
                })
              }) as LinkInBioBlockFromType[],
              extractInnerDataOptionsEnum.createRequestResponseItems
            ) ?? [];

          // removing deleted LinkInBioBlocks from cache.
          const _updatedLinkInBioBlocks = _oldLinkInBioBlocks.filter(
            el => el.id !== _blockId
          );

          // Updating data in RQ cache.
          await updateRQCDataHandler<LinkInBioBlockFromType[] | undefined>({
            key: _getQueryKey({
              keys: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_BLOCK.MAIN],
              additionalKeys: [
                workspaceId,
                wsShareId,
                shareWSMemberId,
                linkInBioId
              ]
            }),
            data: _updatedLinkInBioBlocks,
            id: '',
            extractType: ZRQGetRequestExtractEnum.extractItems,
            updateHoleData: true
          });

          // setLinkInBioBlockState(_updateLinkInBioBlockState);
          // if _response of the updateLinkInBio api is success this showing success notification else not success then error notification.
          await validateRequestResponse({
            resultObj: _response
          });

          // Redirect to block
          zNavigatePushRoute(
            createRedirectRoute({
              url: isZNonEmptyString(workspaceId)
                ? ZaionsRoutes.AdminPanel.LinkInBio.Edit
                : isZNonEmptyString(wsShareId) &&
                  isZNonEmptyString(shareWSMemberId)
                ? ZaionsRoutes.AdminPanel.ShareWS.Link_in_bio.Main
                : '',
              params: [
                CONSTANTS.RouteParams.workspace.workspaceId,
                CONSTANTS.RouteParams.linkInBio.linkInBioId
              ],
              values: _getQueryKey({
                keys: [],
                additionalKeys: [workspaceId, shareWSMemberId, linkInBioId]
              }),
              routeSearchParams: {
                page: ZLinkInBioPageEnum.design,
                step: ZLinkInBioRHSComponentEnum.blocks
              }
            })
          );
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  const isZFetching = isLinkInBioBlockDataFetching;

  const formikInitialValues = useMemo(
    () => ({
      target: {
        url: linkInBioBlockData?.blockContent?.target?.url ?? '',

        email: linkInBioBlockData?.blockContent?.target?.email ?? '',

        phoneNumber:
          linkInBioBlockData?.blockContent?.target?.phoneNumber ?? '',

        username: linkInBioBlockData?.blockContent?.target?.username ?? '',

        accountId: linkInBioBlockData?.blockContent?.target?.accountId ?? '',

        subject: linkInBioBlockData?.blockContent?.target?.subject ?? '',
        message: linkInBioBlockData?.blockContent?.target?.message ?? '',
        type:
          linkInBioBlockData?.blockContent?.target?.type ??
          linkInBioBlockCardItemEnum.whatsapp
      },
      vcard: {
        firstName: linkInBioBlockData?.blockContent?.vcard?.firstName ?? '',
        lastName: linkInBioBlockData?.blockContent?.vcard?.lastName ?? '',
        mobile: linkInBioBlockData?.blockContent?.vcard?.mobile ?? '',
        phone: linkInBioBlockData?.blockContent?.vcard?.phone ?? '',
        fax: linkInBioBlockData?.blockContent?.vcard?.fax ?? '',
        email: linkInBioBlockData?.blockContent?.vcard?.email ?? '',
        company: linkInBioBlockData?.blockContent?.vcard?.company ?? '',
        job: linkInBioBlockData?.blockContent?.vcard?.job ?? '',
        street: linkInBioBlockData?.blockContent?.vcard?.street ?? '',
        city: linkInBioBlockData?.blockContent?.vcard?.city ?? '',
        zip: linkInBioBlockData?.blockContent?.vcard?.zip ?? 0,
        state: linkInBioBlockData?.blockContent?.vcard?.state ?? '',
        country: linkInBioBlockData?.blockContent?.vcard?.country ?? '',
        website: linkInBioBlockData?.blockContent?.vcard?.website ?? ''
      },
      title: linkInBioBlockData?.blockContent?.title ?? '',
      icon: linkInBioBlockData?.blockContent?.icon ?? '',
      text: isZNonEmptyString(linkInBioBlockData?.blockContent?.text)
        ? linkInBioBlockData?.blockContent?.text
        : 'text',
      description: linkInBioBlockData?.blockContent?.description ?? '',
      titleIsEnable: linkInBioBlockData?.blockContent?.titleIsEnable ?? false,
      descriptionIsEnable:
        linkInBioBlockData?.blockContent?.descriptionIsEnable ?? false,
      pictureIsEnable:
        linkInBioBlockData?.blockContent?.pictureIsEnable ?? false,
      priceIsEnable: linkInBioBlockData?.blockContent?.priceIsEnable ?? false,
      cardIsEnable: linkInBioBlockData?.blockContent?.cardIsEnable ?? false,
      cardNumber: linkInBioBlockData?.blockContent?.cardNumber ?? 0,
      searchString: linkInBioBlockData?.blockContent?.searchString ?? '',
      spacing: linkInBioBlockData?.blockContent?.spacing ?? 0,
      customHeight: linkInBioBlockData?.blockContent?.customHeight ?? 0,
      date: linkInBioBlockData?.blockContent?.date ?? new Date().toString(),
      timezone: linkInBioBlockData?.blockContent?.timezone ?? '',
      imageUrl: linkInBioBlockData?.blockContent?.imageUrl ?? '',
      imagePath: linkInBioBlockData?.blockContent?.imagePath ?? '',
      imageFile: linkInBioBlockData?.blockContent?.imageFile ?? null,
      avatarShadow: linkInBioBlockData?.blockContent?.avatarShadow ?? false,
      cardMode: linkInBioBlockData?.blockContent?.cardMode ?? false,
      iframe: linkInBioBlockData?.blockContent?.iframe ?? '',
      separatorType:
        linkInBioBlockData?.blockContent?.separatorType ??
        SeparatorTypeEnum.solid,
      separatorColor: linkInBioBlockData?.blockContent?.separatorColor ?? '',
      separatorMargin: linkInBioBlockData?.blockContent?.separatorMargin ?? 0,
      margin: linkInBioBlockData?.blockContent?.margin ?? 0,

      map: {
        formattedAddress: 'okay',
        lat: 10,
        lng: 10,
        userEnteredAddress: ''
      },

      customAppearance: {
        isEnabled:
          linkInBioBlockData?.blockContent?.customAppearance?.isEnabled ??
          false,
        background: {
          bgType:
            linkInBioBlockData?.blockContent?.customAppearance?.background
              ?.bgType ?? LinkInBioThemeBackgroundEnum.solidColor,
          bgSolidColor:
            linkInBioBlockData?.blockContent?.customAppearance?.background
              ?.bgSolidColor ?? CONSTANTS.LINK_In_BIO.INITIAL_VALUES.BG_COLOR,
          bgGradientColors: {
            startColor:
              linkInBioBlockData?.blockContent?.customAppearance?.background
                ?.bgGradientColors?.startColor ?? '',
            endColor:
              linkInBioBlockData?.blockContent?.customAppearance?.background
                ?.bgGradientColors?.endColor ?? '',
            direction:
              linkInBioBlockData?.blockContent?.customAppearance?.background
                ?.bgGradientColors?.direction ?? 0
          }
        },
        color: linkInBioBlockData?.blockContent?.customAppearance?.color ?? '',
        buttonType:
          linkInBioBlockData?.blockContent?.customAppearance?.buttonType ??
          LinkInBioButtonTypeEnum.inlineSquare,
        shadowColor:
          linkInBioBlockData?.blockContent?.customAppearance?.shadowColor ??
          CONSTANTS.LINK_In_BIO.INITIAL_VALUES.BUTTON_SHADOW_COLOR
      },

      animation: {
        isEnabled:
          linkInBioBlockData?.blockContent?.animation?.isEnabled ?? false,
        type: linkInBioBlockData?.blockContent?.animation?.type
      },

      style:
        linkInBioBlockData?.blockContent?.style ??
        LinkInBioCardStyleEnum.square,

      view:
        linkInBioBlockData?.blockContent?.view ??
        LinkInBioCardViewEnum.carousel,

      cardItems: linkInBioBlockData?.blockContent?.cardItems ?? [],

      form: {
        formFields: linkInBioBlockData?.blockContent?.form?.formFields ?? [],
        isTermEnabled:
          linkInBioBlockData?.blockContent?.form?.isTermEnabled ?? false,
        submitButtonText:
          linkInBioBlockData?.blockContent?.form?.submitButtonText ?? 'Submit',
        termText:
          linkInBioBlockData?.blockContent?.form?.termText ??
          'I Agree to Terms & Conditions',
        termLink: linkInBioBlockData?.blockContent?.form?.termLink
      },

      schedule: {
        isEnabled:
          linkInBioBlockData?.blockContent?.schedule?.isEnabled ?? false,
        // startAt: linkInBioBlockData?.blockContent?.schedule?.startAt ?? '',
        startAt:
          linkInBioBlockData?.blockContent?.schedule?.startAt ??
          new Date().toISOString(),
        endAt:
          linkInBioBlockData?.blockContent?.schedule?.endAt ??
          new Date().toISOString(),
        timezone: linkInBioBlockData?.blockContent?.schedule?.timezone ?? ''
      },

      isActive: Boolean(linkInBioBlockData?.isActive)
    }),
    [linkInBioBlockData]
  );

  return (
    <Formik
      // #region initial values
      initialValues={formikInitialValues}
      enableReinitialize={true}
      // #endregion

      // #region submit handler
      onSubmit={async values => {
        if (
          isZNonEmptyString(values?.imageUrl) &&
          values?.imageFile !== null &&
          values?.imageFile !== undefined &&
          values?.imageUrl !== linkInBioBlockData?.blockContent?.imageUrl
        ) {
          const formData = new FormData();
          formData.append('file', values?.imageFile);

          if (isZNonEmptyString(linkInBioBlockData?.blockContent?.imagePath)) {
            // Deleting the file from storage
            await deleteSingleFile({
              requestData: zStringify({
                filePath: linkInBioBlockData?.blockContent?.imagePath
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

            values.imageUrl = _data.fileUrl;
            values.imagePath = _data.filePath;

            // delete values.imageFile;
          }
        }

        const stringifyValue = zStringify({
          blockType: linkInBioBlockData?.blockType,
          blockContent: zStringify(values),
          isActive: values.isActive
        });
        void formikSubmitHandler(stringifyValue);
      }}
      // #endregion
    >
      {({ values, dirty, handleChange, setFieldValue, submitForm }) => {
        const directionIconStyle = {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          transform: `rotate(${values?.customAppearance?.background?.bgGradientColors?.direction}deg)`
        };

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          if (dirty) {
            setReloadBlockingRState(_oldValues => ({
              ..._oldValues,
              isBlock: true,
              pageUrl: location.pathname,
              type: reloadBlockingTypeEnum.libBlockFormSection
            }));
          } else if (!dirty) {
            setReloadBlockingRState(_oldValues => ({
              ..._oldValues,
              isBlock: false,
              type: null
            }));
          }
        }, [dirty]);

        return (
          <>
            {/* {dirty && (
              <ZIonButton
                minHeight='2.5rem'
                className='fixed z-30 transition-all bottom-2 left-6 animated bounceInLeft z-animation-delay-0 z-animation-iteration-1'
                testingselector={
                  CONSTANTS.testingSelectors.linkInBio.formPage.design
                    .TopTitleBar.saveBtn
                }
                onClick={() => {
                  void submitForm();
                }}>
                <ZIonText className='me-2'>Save</ZIonText>
                <ZIonIcon icon={saveOutline} />
              </ZIonButton>
            )} */}
            <ZIonCol
              sizeXl='11'
              sizeLg='12'
              sizeMd='12'
              sizeSm='12'
              sizeXs='12'
              className='ion-margin-start ion-padding-vertical ion-margin-top border-bottom__violet'>
              <ZIonRow>
                <ZIonCol
                  className='flex ion-align-items-center'
                  testingselector={
                    CONSTANTS.testingSelectors.linkInBio.formPage.design
                      .blockForm.titleCol
                  }>
                  <ZIonButton
                    fill='clear'
                    size='small'
                    className='mb-1 ion-no-padding me-2'
                    color='dark'
                    testingselector={
                      CONSTANTS.testingSelectors.linkInBio.formPage.design
                        .blockForm.goToBlockPageBtn
                    }
                    onClick={() => {
                      zNavigatePushRoute(
                        createRedirectRoute({
                          url: isZNonEmptyString(workspaceId)
                            ? ZaionsRoutes.AdminPanel.LinkInBio.Edit
                            : isZNonEmptyString(wsShareId) &&
                              isZNonEmptyString(shareWSMemberId)
                            ? ZaionsRoutes.AdminPanel.ShareWS.Link_in_bio.Main
                            : '',
                          params: [
                            CONSTANTS.RouteParams.workspace.workspaceId,
                            CONSTANTS.RouteParams.linkInBio.linkInBioId
                          ],
                          values: _getQueryKey({
                            keys: [],
                            additionalKeys: [
                              workspaceId,
                              shareWSMemberId,
                              linkInBioId
                            ]
                          }),
                          routeSearchParams: {
                            page: ZLinkInBioPageEnum.design,
                            step: ZLinkInBioRHSComponentEnum.blocks
                          }
                        })
                      );
                    }}>
                    <ZIonIcon
                      icon={chevronBackOutline}
                      className='w-6 h-6'
                    />
                  </ZIonButton>

                  {isZFetching && (
                    <ZIonText>
                      <ZIonSkeletonText
                        width='7rem'
                        height='1.1rem'
                        className='rounded-sm'
                      />
                    </ZIonText>
                  )}
                  {/*  */}
                  {!isZFetching && (
                    <ZIonText
                      className='text-xl'
                      testingselector={
                        CONSTANTS.testingSelectors.linkInBio.formPage.design
                          .blockForm.title
                      }>
                      {linkInBioBlockData?.blockType ===
                      LinkInBioBlockEnum.button
                        ? 'Button'
                        : linkInBioBlockData?.blockType ===
                          LinkInBioBlockEnum.text
                        ? 'Text'
                        : linkInBioBlockData?.blockType ===
                          LinkInBioBlockEnum.countdown
                        ? 'Countdown'
                        : linkInBioBlockData?.blockType ===
                          LinkInBioBlockEnum.card
                        ? 'Card'
                        : linkInBioBlockData?.blockType ===
                          LinkInBioBlockEnum.carousel
                        ? 'Carousel'
                        : linkInBioBlockData?.blockType ===
                          LinkInBioBlockEnum.RSS
                        ? 'RSS'
                        : linkInBioBlockData?.blockType ===
                          LinkInBioBlockEnum.audio
                        ? 'Audio'
                        : linkInBioBlockData?.blockType ===
                          LinkInBioBlockEnum.video
                        ? 'Video'
                        : linkInBioBlockData?.blockType ===
                          LinkInBioBlockEnum.calendar
                        ? 'Calendar'
                        : linkInBioBlockData?.blockType ===
                          LinkInBioBlockEnum.shopify
                        ? 'Shopify'
                        : linkInBioBlockData?.blockType ===
                          LinkInBioBlockEnum.magento
                        ? 'Magento'
                        : linkInBioBlockData?.blockType ===
                          LinkInBioBlockEnum.wordpress
                        ? 'Wordpress'
                        : linkInBioBlockData?.blockType ===
                          LinkInBioBlockEnum.map
                        ? 'Maps'
                        : linkInBioBlockData?.blockType ===
                          LinkInBioBlockEnum.music
                        ? 'Music'
                        : linkInBioBlockData?.blockType ===
                          LinkInBioBlockEnum.QAndA
                        ? 'Q&A'
                        : linkInBioBlockData?.blockType ===
                          LinkInBioBlockEnum.form
                        ? 'Forms'
                        : linkInBioBlockData?.blockType ===
                          LinkInBioBlockEnum.social
                        ? 'Social'
                        : linkInBioBlockData?.blockType ===
                          LinkInBioBlockEnum.Iframe
                        ? 'Iframe'
                        : linkInBioBlockData?.blockType ===
                          LinkInBioBlockEnum.avatar
                        ? 'Avatar'
                        : linkInBioBlockData?.blockType ===
                          LinkInBioBlockEnum.VCard
                        ? 'Vcard'
                        : linkInBioBlockData?.blockType ===
                          LinkInBioBlockEnum.messenger
                        ? 'Messenger'
                        : linkInBioBlockData?.blockType ===
                          LinkInBioBlockEnum.spacing
                        ? 'Spacing'
                        : linkInBioBlockData?.blockType ===
                          LinkInBioBlockEnum.separator
                        ? 'Separator'
                        : ''}{' '}
                      block
                      <ZIonRouterLink className='ps-2'>(help)</ZIonRouterLink>
                    </ZIonText>
                  )}
                </ZIonCol>

                <ZIonCol
                  className='flex ion-align-items-center ion-justify-content-end'
                  testingselector={
                    CONSTANTS.testingSelectors.linkInBio.formPage.design
                      .blockForm.actionsCol
                  }>
                  {dirty && (
                    <ZIonButton
                      className='ion-no-margin me-3 ion-text-capitalize'
                      testingselector={
                        CONSTANTS.testingSelectors.linkInBio.formPage.design
                          .blockForm.saveBtn
                      }
                      onClick={() => {
                        void submitForm();
                      }}>
                      Save
                    </ZIonButton>
                  )}

                  {isZFetching &&
                    [...Array(3)].map((_, i) => (
                      <ZIonButton
                        fill='clear'
                        className='mt-1 ion-no-padding me-3 ion-no-margin'
                        color='light'
                        size='small'
                        key={i}>
                        <ZIonSkeletonText
                          width='2rem'
                          height='1.5rem'
                          animated={true}
                        />
                      </ZIonButton>
                    ))}

                  {!isZFetching && (
                    <>
                      {/* isActive button */}
                      <ZIonButton
                        fill='clear'
                        className='ion-no-padding me-3 ion-no-margin'
                        color='light'
                        size='small'
                        testingselector={
                          CONSTANTS.testingSelectors.linkInBio.formPage.design
                            .blockForm.isActiveBtn
                        }
                        onClick={() => {
                          void setFieldValue(
                            'isActive',
                            !(values.isActive as boolean),
                            false
                          );
                        }}>
                        <ZIonIcon
                          icon={values.isActive ? eyeOutline : eyeOffOutline}
                          className='mt-2 w-7 h-7'
                          color='dark'
                        />
                      </ZIonButton>

                      {/* duplicate button */}
                      <ZIonButton
                        fill='clear'
                        className='ion-no-padding me-3 ion-no-margin z-ion-background-hover-opacity'
                        color='light'
                        testingselector={
                          CONSTANTS.testingSelectors.linkInBio.formPage.design
                            .blockForm.duplicateBtn
                        }
                        onClick={() => {
                          presentZLinkInBioAddBlockModal({
                            _cssClass: 'lib-block-modal-size'
                          });
                        }}>
                        <ZIonIcon
                          icon={copyOutline}
                          className='w-6 h-6 mt-2'
                          color='dark'
                        />
                      </ZIonButton>

                      {/* Delete button */}
                      <ZCustomDeleteComponent
                        deleteFn={deleteBlockHandler}
                        className='ion-no-padding ion-no-margin'
                        iconColor='danger'
                        iconName={trashBinOutline}
                        iconClassName='mt-2'
                        testingselector={
                          CONSTANTS.testingSelectors.linkInBio.formPage.design
                            .blockForm.deleteBtn
                        }
                      />
                    </>
                  )}
                </ZIonCol>
              </ZIonRow>
            </ZIonCol>

            <ZIonCol
              sizeXl='11'
              sizeLg='12'
              sizeMd='12'
              sizeSm='12'
              sizeXs='12'
              className='ion-padding-top ion-margin-start border-bottom__violet'
              testingselector={
                CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm
                  .fields.container
              }>
              {!isZFetching && (
                <ZIonTitle
                  className='text-lg font-bold ion-no-padding'
                  testingselector={
                    CONSTANTS.testingSelectors.linkInBio.formPage.design
                      .blockForm.fields.title
                  }>
                  {linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.button ||
                  linkInBioBlockData?.blockType === LinkInBioBlockEnum.VCard
                    ? '👉 Button'
                    : linkInBioBlockData?.blockType === LinkInBioBlockEnum.text
                    ? '✒️ Text'
                    : linkInBioBlockData?.blockType ===
                      LinkInBioBlockEnum.countdown
                    ? '⏱ Countdown'
                    : linkInBioBlockData?.blockType ===
                        LinkInBioBlockEnum.card ||
                      linkInBioBlockData?.blockType ===
                        LinkInBioBlockEnum.carousel
                    ? '👉 Card'
                    : linkInBioBlockData?.blockType === LinkInBioBlockEnum.RSS
                    ? '👉 RSS'
                    : linkInBioBlockData?.blockType === LinkInBioBlockEnum.audio
                    ? '🔊 Audio player'
                    : linkInBioBlockData?.blockType === LinkInBioBlockEnum.video
                    ? '🎬 Video'
                    : linkInBioBlockData?.blockType ===
                      LinkInBioBlockEnum.calendar
                    ? '📆 Calendar'
                    : linkInBioBlockData?.blockType ===
                      LinkInBioBlockEnum.shopify
                    ? '👉 Shopify'
                    : linkInBioBlockData?.blockType ===
                      LinkInBioBlockEnum.magento
                    ? '👉 Magento'
                    : linkInBioBlockData?.blockType ===
                      LinkInBioBlockEnum.wordpress
                    ? '🖥 Wordpress'
                    : linkInBioBlockData?.blockType === LinkInBioBlockEnum.map
                    ? '🗺️ Maps'
                    : linkInBioBlockData?.blockType === LinkInBioBlockEnum.music
                    ? '🎵 Add music platforms'
                    : linkInBioBlockData?.blockType === LinkInBioBlockEnum.QAndA
                    ? '💬 Add Question - Answer'
                    : linkInBioBlockData?.blockType === LinkInBioBlockEnum.form
                    ? '📝 Forms'
                    : linkInBioBlockData?.blockType ===
                      LinkInBioBlockEnum.social
                    ? '🧳 Add Social platforms'
                    : linkInBioBlockData?.blockType ===
                      LinkInBioBlockEnum.Iframe
                    ? '💻 Iframe (Typeform, Acast, etc.)'
                    : linkInBioBlockData?.blockType ===
                      LinkInBioBlockEnum.avatar
                    ? '👋 Avatar'
                    : ''}
                </ZIonTitle>
              )}

              {isZFetching && (
                <ZIonTitle className='text-lg font-bold ion-no-padding'>
                  <ZIonSkeletonText
                    height='1.1rem'
                    width='8rem'
                    className='rounded-sm'
                    animated={true}
                  />
                </ZIonTitle>
              )}

              <ZIonRow className='mb-3'>
                {isZFetching &&
                  [...Array(5)].map((_, i) => {
                    return (
                      <ZIonCol
                        size='12'
                        className='mt-3'
                        key={i}>
                        <ZIonSkeletonText
                          height='2.2rem'
                          width='95%'
                          className='rounded-md'
                          animated={true}
                        />
                      </ZIonCol>
                    );
                  })}

                {/* Carousel card field */}
                {linkInBioBlockData?.blockType ===
                  LinkInBioBlockEnum.carousel && (
                  <ZIonCol
                    size='12'
                    className='mt-2'>
                    <LinkInBioCarouselCardField />
                  </ZIonCol>
                )}

                {/* Q and A card field */}
                {linkInBioBlockData?.blockType === LinkInBioBlockEnum.QAndA && (
                  <ZIonCol
                    size='12'
                    className='mt-2'>
                    <LinkInBioQAndACardField />
                  </ZIonCol>
                )}

                {linkInBioBlockData?.blockType === LinkInBioBlockEnum.music && (
                  <ZIonCol
                    size='12'
                    className='mt-2'>
                    <LinkInBioMusicPlatformCardField />
                  </ZIonCol>
                )}

                {linkInBioBlockData?.blockType ===
                  LinkInBioBlockEnum.messenger && (
                  <ZIonCol size='12'>
                    <LinkInBioMessengerPlatformCardField />
                  </ZIonCol>
                )}

                {linkInBioBlockData?.blockType ===
                  LinkInBioBlockEnum.social && (
                  <ZIonCol size='12'>
                    <LinkInBioSocialPlatformCardField />
                  </ZIonCol>
                )}

                {/* Link Component */}
                {(linkInBioBlockData?.blockType === LinkInBioBlockEnum.button ||
                  linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.countdown ||
                  linkInBioBlockData?.blockType === LinkInBioBlockEnum.card ||
                  linkInBioBlockData?.blockType === LinkInBioBlockEnum.audio ||
                  linkInBioBlockData?.blockType === LinkInBioBlockEnum.video ||
                  linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.calendar ||
                  linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.avatar) && (
                  <ZIonCol
                    size='12'
                    className='mt-2'>
                    <LinkInBioLinkField
                      name='target.url'
                      value={values.target.url}
                      onIonChange={handleChange}
                      RefreshBtnClickFn={() => {
                        if (isValidUrl(values.target.url)) {
                          void (async () => {
                            const _result = await zGetPageMetadata(
                              values.target.url
                            );

                            if (isZNonEmptyString(_result?.title)) {
                              console.log({ c: _result });

                              void setFieldValue(
                                'title',
                                _result?.title,
                                false
                              );
                            }
                          })();
                        }
                      }}
                      testingselector={
                        CONSTANTS.testingSelectors.linkInBio.formPage.design
                          .blockForm.fields.linkInput
                      }
                    />
                  </ZIonCol>
                )}

                {/* Iframe component */}
                {linkInBioBlockData?.blockType ===
                  LinkInBioBlockEnum.Iframe && (
                  <LinkInBioIframeField
                    testingselector={
                      CONSTANTS.testingSelectors.linkInBio.formPage.design
                        .blockForm.fields.iFrameInput
                    }
                  />
                )}

                {/* Title Component */}
                {(linkInBioBlockData?.blockType === LinkInBioBlockEnum.button ||
                  linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.countdown ||
                  linkInBioBlockData?.blockType === LinkInBioBlockEnum.card ||
                  linkInBioBlockData?.blockType === LinkInBioBlockEnum.audio ||
                  linkInBioBlockData?.blockType === LinkInBioBlockEnum.video ||
                  linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.calendar ||
                  linkInBioBlockData?.blockType === LinkInBioBlockEnum.avatar ||
                  linkInBioBlockData?.blockType === LinkInBioBlockEnum.map ||
                  linkInBioBlockData?.blockType === LinkInBioBlockEnum.VCard ||
                  linkInBioBlockData?.blockType === LinkInBioBlockEnum.Iframe ||
                  linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.form) && (
                  <ZIonCol
                    size='12'
                    className='mt-3'>
                    <LinkInBioTitleField
                      name='title'
                      value={values.title}
                      onIonChange={handleChange}
                      placeholder={
                        linkInBioBlockData?.blockType ===
                        LinkInBioBlockEnum.form
                          ? 'Form Name'
                          : 'Your Title'
                      }
                      testingselector={
                        CONSTANTS.testingSelectors.linkInBio.formPage.design
                          .blockForm.fields.title
                      }
                    />
                  </ZIonCol>
                )}

                {/* Form Component */}
                {linkInBioBlockData?.blockType === LinkInBioBlockEnum.form && (
                  <ZIonCol
                    size='12'
                    className='mt-2'>
                    <LinkInBioFormField />
                  </ZIonCol>
                )}

                {/* ✅ Submit button */}
                {linkInBioBlockData?.blockType === LinkInBioBlockEnum.form && (
                  <ZIonCol
                    size='12'
                    className='mt-4 border-bottom__violet'>
                    <ZIonTitle className='font-bold text-[16px] ion-no-padding '>
                      ✅ Submit button
                    </ZIonTitle>
                    <div className='mt-3 mb-5'>
                      <LinkInBioTitleField
                        name='form.submitButtonText'
                        value={values.form?.submitButtonText}
                        onIonChange={handleChange}
                        placeholder='Submit button text'
                        showImageInSlot={false}
                        testingselector={
                          CONSTANTS.testingSelectors.linkInBio.formPage.design
                            .blockForm.fields.submitButtonText
                        }
                      />
                    </div>
                  </ZIonCol>
                )}

                {/* Icon Component */}
                {linkInBioBlockData?.blockType === LinkInBioBlockEnum.VCard && (
                  <ZIonCol
                    size='12'
                    className='mt-2'>
                    <LinkInBioIconField
                      name='icon'
                      value={values.icon}
                      onIonChange={handleChange}
                      testingselector={
                        CONSTANTS.testingSelectors.linkInBio.formPage.design
                          .blockForm.fields.iconInput
                      }
                    />
                  </ZIonCol>
                )}

                {/* Description Component */}
                {(linkInBioBlockData?.blockType ===
                  LinkInBioBlockEnum.countdown ||
                  linkInBioBlockData?.blockType === LinkInBioBlockEnum.card ||
                  linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.avatar) && (
                  <ZIonCol
                    size='12'
                    className='mt-2'>
                    <LinkInBioDescriptionField
                      name='description'
                      showIconInSlot={false}
                      value={values.description}
                      onIonChange={handleChange}
                      testingselector={
                        CONSTANTS.testingSelectors.linkInBio.formPage.design
                          .blockForm.fields.descriptionInput
                      }
                    />
                  </ZIonCol>
                )}

                {/* Text area */}
                {linkInBioBlockData?.blockType === LinkInBioBlockEnum.text && (
                  <ZIonCol
                    size='12'
                    className='mt-2 mb-4'>
                    <ZRichTextEditor
                      testingselector={
                        CONSTANTS.testingSelectors.linkInBio.formPage.design
                          .blockForm.fields.textEditor
                      }
                      onChange={editorContentStr => {
                        void setFieldValue('text', editorContentStr, false);
                      }}
                      initialValue={values.text}
                    />
                  </ZIonCol>
                )}

                {/* Upload Component */}
                {(linkInBioBlockData?.blockType ===
                  LinkInBioBlockEnum.countdown ||
                  linkInBioBlockData?.blockType === LinkInBioBlockEnum.card ||
                  linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.avatar) && (
                  <ZIonCol
                    size='12'
                    className='mt-4'>
                    <LinkInBioUploadField
                      dropdownHeight='6rem'
                      imageUrl={values.imageUrl}
                      testingselector={
                        CONSTANTS.testingSelectors.linkInBio.formPage.design
                          .blockForm.fields.upload
                      }
                      onDrop={event => {
                        if (event[0] !== undefined && event[0] !== null) {
                          void setFieldValue('imageFile', event[0], false);

                          const reader = new FileReader();

                          reader.onload = ({ target }) => {
                            void setFieldValue(
                              'imageUrl',
                              target?.result as string,
                              false
                            );
                          };

                          reader.readAsDataURL(event[0]);
                        }
                      }}
                    />
                  </ZIonCol>
                )}

                {/* DateTime Component */}
                {linkInBioBlockData?.blockType ===
                  LinkInBioBlockEnum.countdown && (
                  <ZIonCol
                    size='12'
                    className='pt-2 mt-4'>
                    {/* <LinkInBioDateTimeField
                      name='date'
                      value={values.date}
                      onIonChange={handleChange}
                      id={`${linkInBioBlockData?.blockType}-${linkInBioBlockData?.id}`}
                      testingselector={
                        CONSTANTS.testingSelectors.linkInBio.formPage.design
                          .blockForm.fields.dateTimeInput
                      }
                    /> */}

                    <Suspense
                      fallback={
                        <div className='flex w-full ion-align-items-center ion-justify-content-center'>
                          <ZIonSpinner className='w-7 h-7' />
                        </div>
                      }>
                      <LinkInBioDateTimeField
                        name='date'
                        value={values.date}
                        onIonChange={handleChange}
                        id={`${linkInBioBlockData?.blockType}-${linkInBioBlockData?.id}`}
                        testingselector={
                          CONSTANTS.testingSelectors.linkInBio.formPage.design
                            .blockForm.fields.dateTimeInput
                        }
                      />
                    </Suspense>
                  </ZIonCol>
                )}

                {/* Timezone */}
                {linkInBioBlockData?.blockType ===
                  LinkInBioBlockEnum.countdown && (
                  <ZIonCol
                    size='12'
                    className='pt-2 mt-4'>
                    <LinkInBioTimezoneField
                      name='timezone'
                      testingselector={
                        CONSTANTS.testingSelectors.linkInBio.formPage.design
                          .blockForm.fields.timezoneInput
                      }
                      onChange={_value => {
                        void setFieldValue(
                          'timezone',
                          (_value as ZaionsRSelectOptions)?.value,
                          false
                        );
                      }}
                      value={
                        formatReactSelectOption(
                          values?.timezone,
                          TIMEZONES as ZGenericObject[],
                          'value',
                          'label'
                        ) ?? []
                      }
                    />
                  </ZIonCol>
                )}

                {/** ** Search *****/}
                {/* {(linkInBioBlockData?.blockType ===
                  LinkInBioBlockEnum.RSS ||
                  linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.shopify ||
                  linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.magento ||
                  linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.wordpress ||
                  linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.map) && (
                  <ZIonCol size='12' className='pt-2 mt-4'>
                    <LinkInBioSearchField
                      placeholder={
                        linkInBioBlockData?.blockType ===
                        LinkInBioBlockEnum.RSS
                          ? 'RSS Feed'
                          : linkInBioBlockData?.blockType ===
                            LinkInBioBlockEnum.shopify
                          ? 'Shopify link'
                          : linkInBioBlockData?.blockType ===
                            LinkInBioBlockEnum.magento
                          ? 'Magento link'
                          : linkInBioBlockData?.blockType ===
                            LinkInBioBlockEnum.wordpress
                          ? 'Wordpress link'
                          : linkInBioBlockData?.blockType ===
                            LinkInBioBlockEnum.map
                          ? 'Search an address'
                          : ''
                      }
                      searchIcon={
                        linkInBioBlockData?.blockType ===
                        LinkInBioBlockEnum.RSS
                          ? wifiOutline
                          : linkInBioBlockData?.blockType ===
                              LinkInBioBlockEnum.shopify ||
                            linkInBioBlockData?.blockType ===
                              LinkInBioBlockEnum.magento ||
                            linkInBioBlockData?.blockType ===
                              LinkInBioBlockEnum.wordpress
                          ? linkOutline
                          : ''
                      }
                    />
                  </ZIonCol>
                )} */}

                {/* RSS Feed */}
                {linkInBioBlockData?.blockType === LinkInBioBlockEnum.RSS && (
                  <ZIonCol
                    size='12'
                    className='pt-2 mt-4'>
                    <LinkInBioSearchField
                      placeholder='RSS Feed'
                      searchIcon={wifiOutline}
                      value={values?.searchString}
                      onIonChange={({ detail }) => {
                        void setFieldValue('searchString', detail.value, false);
                      }}
                      testingselector={
                        CONSTANTS.testingSelectors.linkInBio.formPage.design
                          .blockForm.fields.rssInput
                      }
                    />
                  </ZIonCol>
                )}

                {/* Shopify */}
                {linkInBioBlockData?.blockType ===
                  LinkInBioBlockEnum.shopify && (
                  <ZIonCol
                    size='12'
                    className='pt-2 mt-4'>
                    <LinkInBioSearchField
                      placeholder='Shopify link'
                      searchIcon={linkOutline}
                      value={values?.searchString}
                      onIonChange={({ detail }) => {
                        void setFieldValue('searchString', detail.value, false);
                      }}
                      testingselector={
                        CONSTANTS.testingSelectors.linkInBio.formPage.design
                          .blockForm.fields.shopifyInput
                      }
                    />
                  </ZIonCol>
                )}

                {/* Magneto */}
                {linkInBioBlockData?.blockType ===
                  LinkInBioBlockEnum.magento && (
                  <ZIonCol
                    size='12'
                    className='pt-2 mt-4'>
                    <LinkInBioSearchField
                      placeholder='Magento link'
                      searchIcon={linkOutline}
                      value={values?.searchString}
                      onIonChange={({ detail }) => {
                        void setFieldValue('searchString', detail.value, false);
                      }}
                      testingselector={
                        CONSTANTS.testingSelectors.linkInBio.formPage.design
                          .blockForm.fields.magnetoInput
                      }
                    />
                  </ZIonCol>
                )}

                {/* Wordpress */}
                {linkInBioBlockData?.blockType ===
                  LinkInBioBlockEnum.wordpress && (
                  <ZIonCol
                    size='12'
                    className='pt-2 mt-4'>
                    <LinkInBioSearchField
                      placeholder='Wordpress link'
                      searchIcon={linkOutline}
                      value={values?.searchString}
                      testingselector={
                        CONSTANTS.testingSelectors.linkInBio.formPage.design
                          .blockForm.fields.wordpressInput
                      }
                      onIonChange={({ detail }) => {
                        void setFieldValue('searchString', detail.value, false);
                      }}
                    />
                  </ZIonCol>
                )}

                {/* Maps */}
                {linkInBioBlockData?.blockType === LinkInBioBlockEnum.map && (
                  <ZIonCol
                    size='12'
                    className='mb-2'>
                    <ZRGAutoCompleteInput
                      defaultValue={values?.map?.userEnteredAddress}
                      inputName='map.userEnteredAddress'
                      testingselector={
                        CONSTANTS.testingSelectors.linkInBio.formPage.design
                          .blockForm.fields.map
                      }
                      onLocationSelectHandler={(
                        place: google.maps.places.PlaceResult
                      ) => {
                        void setFieldValue(
                          'map.formattedAddress',
                          'Making a string',
                          true
                        );
                        const _lat = place.geometry?.location?.lat() ?? 0;
                        const _lng = place.geometry?.location?.lng() ?? 0;
                        void setFieldValue('map.lat', _lat, true);
                        void setFieldValue('map.lng', _lng, true);
                      }}
                    />
                  </ZIonCol>
                )}

                {/* <input
                  onChange={({ target }) => {
                    setFieldValue(
                      'map.formattedAddress',
                      'Making a string',
                      true
                    );
                  }}
                  value={values.map.lat}
                /> */}

                {/* Title enable */}
                {(linkInBioBlockData?.blockType === LinkInBioBlockEnum.RSS ||
                  linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.shopify ||
                  linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.magento ||
                  linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.wordpress) && (
                  <ZIonCol
                    size='12'
                    className='mt-4'>
                    <LinkInBioEnableField
                      checked={values.titleIsEnable}
                      testingselector={
                        CONSTANTS.testingSelectors.linkInBio.formPage.design
                          .blockForm.fields.titleEnable
                      }
                      onChange={value => {
                        void setFieldValue('titleIsEnable', value, false);
                      }}
                    />
                  </ZIonCol>
                )}

                {/* Description enable */}
                {(linkInBioBlockData?.blockType === LinkInBioBlockEnum.RSS ||
                  linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.shopify ||
                  linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.magento ||
                  linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.wordpress) && (
                  <ZIonCol
                    size='12'
                    className='mt-3'>
                    <LinkInBioEnableField
                      title='Description'
                      checked={values.descriptionIsEnable}
                      icon={reorderFourOutline}
                      testingselector={
                        CONSTANTS.testingSelectors.linkInBio.formPage.design
                          .blockForm.fields.descriptionEnable
                      }
                      onChange={value => {
                        void setFieldValue('descriptionIsEnable', value, false);
                      }}
                    />
                  </ZIonCol>
                )}

                {/* Picture enable */}
                {(linkInBioBlockData?.blockType === LinkInBioBlockEnum.RSS ||
                  linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.shopify ||
                  linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.magento ||
                  linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.wordpress) && (
                  <ZIonCol
                    size='12'
                    className='mt-3'>
                    <LinkInBioEnableField
                      title='Photo'
                      icon={imageOutline}
                      checked={values.pictureIsEnable}
                      testingselector={
                        CONSTANTS.testingSelectors.linkInBio.formPage.design
                          .blockForm.fields.pictureEnable
                      }
                      onChange={value => {
                        void setFieldValue('pictureIsEnable', value, false);
                      }}
                    />
                  </ZIonCol>
                )}

                {/* Card enable */}
                {(linkInBioBlockData?.blockType ===
                  LinkInBioBlockEnum.calendar ||
                  linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.Iframe) && (
                  <ZIonCol
                    size='12'
                    className='mt-3'>
                    <LinkInBioEnableField
                      title='Card mode'
                      icon={cardOutline}
                      checked={values.cardIsEnable}
                      testingselector={
                        CONSTANTS.testingSelectors.linkInBio.formPage.design
                          .blockForm.fields.cardEnable
                      }
                      onChange={value => {
                        void setFieldValue('cardIsEnable', value, false);
                      }}
                    />
                  </ZIonCol>
                )}

                {/* Price enable */}
                {linkInBioBlockData?.blockType ===
                  LinkInBioBlockEnum.shopify && (
                  <ZIonCol
                    size='12'
                    className='mt-3'>
                    <LinkInBioEnableField
                      title='Price'
                      icon={cashOutline}
                      checked={values.priceIsEnable}
                      testingselector={
                        CONSTANTS.testingSelectors.linkInBio.formPage.design
                          .blockForm.fields.priceEnable
                      }
                      onChange={value => {
                        void setFieldValue('priceIsEnable', value, false);
                      }}
                    />
                  </ZIonCol>
                )}

                {/* Terms checkbox */}
                {linkInBioBlockData?.blockType === LinkInBioBlockEnum.form && (
                  <ZIonCol
                    size='12'
                    className='mt-3'>
                    <LinkInBioEnableField
                      title='Terms checkbox'
                      icon={lockClosedOutline}
                      checked={values.form?.isTermEnabled}
                      testingselector={
                        CONSTANTS.testingSelectors.linkInBio.formPage.design
                          .blockForm.fields.term.toggler
                      }
                      onChange={value => {
                        void setFieldValue('form.isTermEnabled', value, false);
                      }}
                    />
                    {values.form?.isTermEnabled && (
                      <div className='mt-2 mb-2'>
                        <LinkInBioTitleField
                          name='form.termText'
                          value={values.form?.termText}
                          onIonChange={handleChange}
                          placeholder='Text'
                          testingselector={
                            CONSTANTS.testingSelectors.linkInBio.formPage.design
                              .blockForm.fields.term.text
                          }
                        />

                        <LinkInBioLinkField
                          name='form.termLink'
                          value={values.form?.termLink}
                          onIonChange={handleChange}
                          placeholder='Link to your T&C'
                          className='pt-2 mt-3'
                          showRefreshBtn={false}
                          testingselector={
                            CONSTANTS.testingSelectors.linkInBio.formPage.design
                              .blockForm.fields.term.link
                          }
                        />
                      </div>
                    )}
                  </ZIonCol>
                )}

                {/* ➖ Type  */}
                {linkInBioBlockData?.blockType ===
                  LinkInBioBlockEnum.separator && (
                  <ZIonCol size='12'>
                    <ZIonTitle className='font-bold text-[16px] ion-no-padding'>
                      ➖ Type
                    </ZIonTitle>
                    <div className='mt-2 mb-2'>
                      {/* Solid */}
                      <ZRoundedButton
                        testingselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.separatorType.button}-${SeparatorTypeEnum.solid}`}
                        className='me-2'
                        color={
                          values.separatorType === SeparatorTypeEnum.solid
                            ? 'primary'
                            : 'medium'
                        }
                        onClick={() => {
                          void setFieldValue(
                            'separatorType',
                            SeparatorTypeEnum.solid,
                            false
                          );
                        }}>
                        <ZIonImg
                          src={borderSolid}
                          className={classNames({
                            'w-[22px]': true
                          })}
                        />
                      </ZRoundedButton>

                      {/* Dashed */}
                      <ZRoundedButton
                        testingselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.separatorType.button}-${SeparatorTypeEnum.dashed}`}
                        className='me-2'
                        color={
                          values.separatorType === SeparatorTypeEnum.dashed
                            ? 'primary'
                            : 'medium'
                        }
                        onClick={() => {
                          void setFieldValue(
                            'separatorType',
                            SeparatorTypeEnum.dashed,
                            false
                          );
                        }}>
                        <ZIonImg
                          src={borderDashed}
                          className='w-[22px]'
                        />
                      </ZRoundedButton>

                      {/* Dotted */}
                      <ZRoundedButton
                        testingselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.separatorType.button}-${SeparatorTypeEnum.dotted}`}
                        className='me-2'
                        color={
                          values.separatorType === SeparatorTypeEnum.dotted
                            ? 'primary'
                            : 'medium'
                        }
                        onClick={() => {
                          void setFieldValue(
                            'separatorType',
                            SeparatorTypeEnum.dotted,
                            false
                          );
                        }}>
                        <ZIonImg
                          src={borderDotted}
                          className='w-[22px]'
                        />
                      </ZRoundedButton>
                    </div>
                  </ZIonCol>
                )}

                {/* 🎨 Color  */}
                {linkInBioBlockData?.blockType ===
                  LinkInBioBlockEnum.separator && (
                  <ZIonCol
                    size='12'
                    className='pt-2 mt-4'>
                    <ZIonTitle className='font-bold text-[16px] ion-no-padding'>
                      🎨 Color
                    </ZIonTitle>
                    <div className='mb-2'>
                      <ZaionsColorPiker
                        name='separatorColor'
                        value={values.separatorColor}
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        setFieldValueFn={setFieldValue}
                        testingselector={
                          CONSTANTS.testingSelectors.linkInBio.formPage.design
                            .blockForm.fields.separatorType.colorInput
                        }
                      />
                    </div>
                  </ZIonCol>
                )}

                {/* ☄️ Spacing  */}
                {linkInBioBlockData?.blockType ===
                  LinkInBioBlockEnum.spacing && (
                  <ZIonCol size='12'>
                    <ZIonTitle className='font-bold text-[16px] ion-no-padding'>
                      ☄️ Spacing:{' '}
                      <ZIonText color='primary'>{values.spacing}</ZIonText>
                    </ZIonTitle>
                    <div className='mb-2'>
                      <ZIonRange
                        max={200}
                        ticks={false}
                        snaps={true}
                        pin={true}
                        pinFormatter={(value: number) => value}
                        onIonChange={({ target }) => {
                          void setFieldValue('spacing', target.value, false);
                        }}
                        testingselector={
                          CONSTANTS.testingSelectors.linkInBio.formPage.design
                            .blockForm.fields.spacing
                        }>
                        <ZIonIcon
                          slot='start'
                          icon={removeOutline}
                        />
                        <ZIonIcon
                          slot='end'
                          icon={addOutline}
                        />
                      </ZIonRange>
                    </div>
                  </ZIonCol>
                )}
              </ZIonRow>
            </ZIonCol>

            {/* 📄 vCard */}
            {linkInBioBlockData?.blockType === LinkInBioBlockEnum.VCard && (
              <LinkInBioVCardField />
            )}

            {/* 📏 Margin  */}
            {linkInBioBlockData?.blockType === LinkInBioBlockEnum.separator && (
              <ZIonCol
                sizeXl='11'
                sizeLg='12'
                sizeMd='12'
                sizeSm='12'
                sizeXs='12'
                className='ion-padding-vertical ion-margin-start border-bottom__violet'>
                <ZIonTitle className='font-bold text-[16px] ion-no-padding'>
                  📏 Margin:
                  <ZIonText
                    color='primary'
                    className='ps-1'>
                    {values.separatorMargin}
                  </ZIonText>
                </ZIonTitle>
                <div className='mb-2'>
                  <ZIonRange
                    max={40}
                    ticks={false}
                    snaps={true}
                    pin={true}
                    pinFormatter={(value: number) => value}
                    onIonChange={({ target }) => {
                      void setFieldValue(
                        'separatorMargin',
                        target.value,
                        false
                      );
                    }}>
                    <ZIonIcon
                      slot='start'
                      icon={removeOutline}
                    />
                    <ZIonIcon
                      slot='end'
                      icon={addOutline}
                    />
                  </ZIonRange>
                </div>
              </ZIonCol>
            )}

            {/* 🎨 Custom appearance */}
            {(linkInBioBlockData?.blockType === LinkInBioBlockEnum.button ||
              linkInBioBlockData?.blockType === LinkInBioBlockEnum.VCard ||
              linkInBioBlockData?.blockType === LinkInBioBlockEnum.form) && (
              <ZIonCol
                size='11'
                className='ion-padding-vertical ion-margin-start border-bottom__violet'>
                <ZIonRow>
                  <ZIonCol>
                    <ZIonTitle className='font-bold text-[16px] ion-no-padding'>
                      🎨 Custom appearance{' '}
                      <ZIonRouterLink>(help)</ZIonRouterLink>
                    </ZIonTitle>
                  </ZIonCol>

                  <ZIonCol className='ion-text-end'>
                    <ZRCSwitch
                      checked={values.customAppearance.isEnabled}
                      onChange={_value => {
                        void setFieldValue(
                          'customAppearance.isEnabled',
                          _value,
                          false
                        );
                      }}
                    />
                  </ZIonCol>

                  {/* 🖍️ Button color */}
                  {values.customAppearance.isEnabled && (
                    <ZIonCol
                      className='mt-2 mb-2'
                      size='12'>
                      <div className='flex ion-align-items-start ion-padding-bottom'>
                        {values?.customAppearance?.background?.bgType ===
                          LinkInBioThemeBackgroundEnum.solidColor && (
                          <ZaionsColorPiker
                            name='customAppearance.background.bgSolidColor'
                            value={
                              values?.customAppearance?.background?.bgSolidColor
                            }
                            // eslint-disable-next-line @typescript-eslint/no-misused-promises
                            setFieldValueFn={setFieldValue}
                          />
                        )}

                        {values?.customAppearance?.background?.bgType ===
                          LinkInBioThemeBackgroundEnum.gradient && (
                          <>
                            <ZaionsColorPiker
                              name='customAppearance.background.bgGradientColors.startColor'
                              value={
                                values?.customAppearance?.background
                                  ?.bgGradientColors?.startColor
                              }
                              // eslint-disable-next-line @typescript-eslint/no-misused-promises
                              setFieldValueFn={setFieldValue}
                            />
                            <ZIonButton
                              shape='round'
                              className='mt-3 direction-button ion-margin-horizontal w-[2.5rem] ion-no-padding'
                              height='2.5rem'
                              color='secondary'
                              onClick={() => {
                                let _newDirection =
                                  +(values?.customAppearance?.background
                                    ?.bgGradientColors?.direction as string) +
                                  +CONSTANTS.LINK_In_BIO.FORM
                                    .DIRECTION_PRE_CLICKED;
                                _newDirection =
                                  _newDirection >= 359 ? 0 : _newDirection;
                                void setFieldValue(
                                  'customAppearance.background.bgGradientColors.direction',
                                  _newDirection,
                                  false
                                );
                              }}>
                              <ZIonIcon
                                icon={arrowUp}
                                className='direction-icon'
                                style={directionIconStyle}
                              />
                            </ZIonButton>
                            <ZaionsColorPiker
                              name='customAppearance.background.bgGradientColors.endColor'
                              value={
                                values?.customAppearance?.background
                                  ?.bgGradientColors?.endColor
                              }
                              // eslint-disable-next-line @typescript-eslint/no-misused-promises
                              setFieldValueFn={setFieldValue}
                              showCloseIcon={true}
                              closeIconOnChangeFn={() => {
                                void setFieldValue(
                                  'customAppearance.background.bgType',
                                  LinkInBioThemeBackgroundEnum.solidColor,
                                  false
                                );
                              }}
                            />
                          </>
                        )}
                        {values?.customAppearance?.background?.bgType ===
                          LinkInBioThemeBackgroundEnum.solidColor && (
                          <ZIonButton
                            className='mt-3 ion-text-capitalize ms-4'
                            shape='round'
                            onClick={() => {
                              void setFieldValue(
                                'customAppearance.background.bgType',
                                LinkInBioThemeBackgroundEnum.gradient,
                                false
                              );
                            }}>
                            <ZIonIcon
                              icon={addOutline}
                              className='pe-2'
                            />
                            <ZIonText>Add gradient</ZIonText>
                          </ZIonButton>
                        )}
                      </div>

                      <ZIonTitle className='font-bold text-[16px] mt-1 ion-no-padding'>
                        🎫 Button type
                      </ZIonTitle>
                      <ZIonRow
                        className={classNames(
                          classes['row-gap-1-point-6-rem'],
                          {
                            'ion-padding-top': true
                          }
                        )}>
                        {/* Filled's */}
                        <ZIonCol size='4'>
                          <ZIonButton
                            className={classNames(
                              classes['zaions-button-type'],
                              {
                                'zaions-button-type-button-active z-ion-border-radius-0':
                                  true, // from index.css
                                'zaions-border-primary':
                                  values?.customAppearance?.buttonType ===
                                  LinkInBioButtonTypeEnum.inlineSquare
                              }
                            )}
                            color='medium'
                            onClick={() => {
                              void setFieldValue(
                                'customAppearance.buttonType',
                                LinkInBioButtonTypeEnum.inlineSquare,
                                false
                              );
                            }}
                          />
                        </ZIonCol>

                        <ZIonCol size='4'>
                          <ZIonButton
                            className={classNames(
                              classes['zaions-button-type'],
                              {
                                'z-ion-border-radius-point-7rem': true,
                                'zaions-border-primary':
                                  values?.customAppearance?.buttonType ===
                                  LinkInBioButtonTypeEnum.inlineRound
                              }
                            )}
                            color='medium'
                            onClick={() => {
                              void setFieldValue(
                                'customAppearance.buttonType',
                                LinkInBioButtonTypeEnum.inlineRound,
                                false
                              );
                            }}
                          />
                        </ZIonCol>

                        <ZIonCol size='4'>
                          <ZIonButton
                            className={classNames(
                              classes['zaions-button-type'],
                              {
                                'zaions-border-primary':
                                  values?.customAppearance?.buttonType ===
                                  LinkInBioButtonTypeEnum.inlineCircle
                              }
                            )}
                            color='medium'
                            shape='round'
                            onClick={() => {
                              void setFieldValue(
                                'customAppearance.buttonType',
                                LinkInBioButtonTypeEnum.inlineCircle,
                                false
                              );
                            }}
                          />
                        </ZIonCol>

                        {/* Outline's */}
                        <ZIonCol size='4'>
                          <ZIonButton
                            className={classNames(
                              classes['zaions-button-type'],
                              {
                                'z-ion-border-radius-0': true,
                                'zaions-border-primary':
                                  values?.customAppearance?.buttonType ===
                                  LinkInBioButtonTypeEnum.inlineSquareOutline
                              }
                            )}
                            color={
                              values?.customAppearance?.buttonType ===
                              LinkInBioButtonTypeEnum.inlineSquareOutline
                                ? 'primary'
                                : 'medium'
                            }
                            fill='outline'
                            onClick={() => {
                              void setFieldValue(
                                'customAppearance.buttonType',
                                LinkInBioButtonTypeEnum.inlineSquareOutline,
                                false
                              );
                            }}
                          />
                        </ZIonCol>

                        <ZIonCol size='4'>
                          <ZIonButton
                            className={classNames(
                              classes['zaions-button-type'],
                              {
                                'z-ion-border-radius-point-7rem': true,
                                'zaions-border-primary':
                                  values?.customAppearance?.buttonType ===
                                  LinkInBioButtonTypeEnum.inlineRoundOutline
                              }
                            )}
                            color={
                              values?.customAppearance?.buttonType ===
                              LinkInBioButtonTypeEnum.inlineRoundOutline
                                ? 'primary'
                                : 'medium'
                            }
                            fill='outline'
                            onClick={() => {
                              void setFieldValue(
                                'customAppearance.buttonType',
                                LinkInBioButtonTypeEnum.inlineRoundOutline,
                                false
                              );
                            }}
                          />
                        </ZIonCol>

                        <ZIonCol size='4'>
                          <ZIonButton
                            className={classNames(
                              classes['zaions-button-type'],
                              {
                                'zaions-border-primary':
                                  values?.customAppearance?.buttonType ===
                                  LinkInBioButtonTypeEnum.inlineCircleOutline
                              }
                            )}
                            color={
                              values?.customAppearance?.buttonType ===
                              LinkInBioButtonTypeEnum.inlineCircleOutline
                                ? 'primary'
                                : 'medium'
                            }
                            shape='round'
                            fill='outline'
                            onClick={() => {
                              void setFieldValue(
                                'customAppearance.buttonType',
                                LinkInBioButtonTypeEnum.inlineCircleOutline,
                                false
                              );
                            }}
                          />
                        </ZIonCol>

                        {/* Shadow's */}
                        <ZIonCol size='4'>
                          <ZIonButton
                            className={classNames(
                              classes['zaions-button-type'],
                              classes['zaions-button-type-shadow'],
                              {
                                'z-ion-border-radius-0': true,
                                'zaions-border-transparent':
                                  values?.customAppearance?.buttonType !==
                                  LinkInBioButtonTypeEnum.inlineSquareShadow,
                                'zaions-border-primary':
                                  values?.customAppearance?.buttonType ===
                                  LinkInBioButtonTypeEnum.inlineSquareShadow
                              }
                            )}
                            color='medium'
                            onClick={() => {
                              void setFieldValue(
                                'customAppearance.buttonType',
                                LinkInBioButtonTypeEnum.inlineSquareShadow,
                                false
                              );
                            }}
                          />
                        </ZIonCol>

                        <ZIonCol size='4'>
                          <ZIonButton
                            className={classNames(
                              classes['zaions-button-type'],
                              classes['zaions-button-type-shadow'],
                              {
                                'z-ion-border-radius-point-7rem': true,
                                'zaions-border-transparent':
                                  values?.customAppearance?.buttonType !==
                                  LinkInBioButtonTypeEnum.inlineRoundShadow,
                                'zaions-border-primary':
                                  values?.customAppearance?.buttonType ===
                                  LinkInBioButtonTypeEnum.inlineRoundShadow
                              }
                            )}
                            color='medium'
                            onClick={() => {
                              void setFieldValue(
                                'customAppearance.buttonType',
                                LinkInBioButtonTypeEnum.inlineRoundShadow,
                                false
                              );
                            }}
                          />
                        </ZIonCol>

                        <ZIonCol size='4'>
                          <ZIonButton
                            className={classNames(
                              classes['zaions-button-type'],
                              classes['zaions-button-type-shadow'],
                              {
                                'zaions-border-primary':
                                  values?.customAppearance?.buttonType ===
                                  LinkInBioButtonTypeEnum.inlineCircleShadow,
                                'zaions-border-transparent':
                                  values?.customAppearance?.buttonType !==
                                  LinkInBioButtonTypeEnum.inlineCircleShadow
                              }
                            )}
                            color='medium'
                            shape='round'
                            onClick={() => {
                              void setFieldValue(
                                'customAppearance.buttonType',
                                LinkInBioButtonTypeEnum.inlineCircleShadow,
                                false
                              );
                            }}
                          />
                        </ZIonCol>

                        {/* Shadow Color */}
                        <ZIonCol
                          size='12'
                          className='mt-3'>
                          {values?.customAppearance?.buttonType !== undefined &&
                            [
                              LinkInBioButtonTypeEnum.inlineSquareShadow,
                              LinkInBioButtonTypeEnum.inlineRoundShadow,
                              LinkInBioButtonTypeEnum.inlineCircleShadow
                            ].includes(
                              values?.customAppearance?.buttonType
                            ) && (
                              <ZaionsColorPiker
                                name='customAppearance.shadowColor'
                                value={values?.customAppearance?.shadowColor}
                                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                setFieldValueFn={setFieldValue}
                              />
                            )}
                        </ZIonCol>
                      </ZIonRow>
                    </ZIonCol>
                  )}
                </ZIonRow>
              </ZIonCol>
            )}

            {/* 🗃️ Card number */}
            {(linkInBioBlockData?.blockType === LinkInBioBlockEnum.RSS ||
              linkInBioBlockData?.blockType === LinkInBioBlockEnum.shopify ||
              linkInBioBlockData?.blockType === LinkInBioBlockEnum.magento ||
              linkInBioBlockData?.blockType ===
                LinkInBioBlockEnum.wordpress) && (
              <ZIonCol
                size='11'
                className='ion-padding-vertical ion-margin-start border-bottom__violet'>
                <ZIonTitle className='font-bold text-[16px] ion-no-padding'>
                  🗃️ Card number: <ZIonText color='primary'>10</ZIonText>
                </ZIonTitle>
                <div className='mb-2'>
                  <ZIonRange
                    max={25}
                    ticks={true}
                    snaps={true}
                    pin={true}
                    pinFormatter={(value: number) => value}>
                    <ZIonIcon
                      slot='start'
                      icon={removeOutline}
                    />
                    <ZIonIcon
                      slot='end'
                      icon={addOutline}
                    />
                  </ZIonRange>
                </div>
              </ZIonCol>
            )}

            {/* ✨ Style */}
            {(linkInBioBlockData?.blockType === LinkInBioBlockEnum.countdown ||
              linkInBioBlockData?.blockType === LinkInBioBlockEnum.card ||
              linkInBioBlockData?.blockType === LinkInBioBlockEnum.carousel ||
              linkInBioBlockData?.blockType === LinkInBioBlockEnum.RSS ||
              linkInBioBlockData?.blockType === LinkInBioBlockEnum.shopify ||
              linkInBioBlockData?.blockType === LinkInBioBlockEnum.wordpress ||
              linkInBioBlockData?.blockType === LinkInBioBlockEnum.magento ||
              linkInBioBlockData?.blockType === LinkInBioBlockEnum.avatar) && (
              <ZIonCol
                sizeXl='11'
                sizeLg='12'
                sizeMd='12'
                sizeSm='12'
                sizeXs='12'
                className='pb-2 ion-padding-top ion-margin-start border-bottom__violet'>
                <ZIonTitle className='mb-3 font-bold text-[16px] ion-no-padding'>
                  ✨ Style
                </ZIonTitle>
                <div className='mb-2 ion-padding-bottom'>
                  {linkInBioBlockData?.blockType !==
                    LinkInBioBlockEnum.avatar && (
                    <>
                      <ZRoundedButton
                        className='me-2'
                        color={
                          values.style === LinkInBioCardStyleEnum.horizontal
                            ? 'primary'
                            : 'medium'
                        }
                        onClick={() => {
                          void setFieldValue(
                            'style',
                            LinkInBioCardStyleEnum.horizontal,
                            false
                          );
                        }}>
                        <ZIonImg
                          src={card_style_1}
                          className='w-[22px]'
                        />
                      </ZRoundedButton>

                      <ZRoundedButton
                        className='me-2'
                        color={
                          values.style === LinkInBioCardStyleEnum.vertical
                            ? 'primary'
                            : 'medium'
                        }
                        onClick={() => {
                          void setFieldValue(
                            'style',
                            LinkInBioCardStyleEnum.vertical,
                            false
                          );
                        }}>
                        <ZIonImg
                          src={card_style_2}
                          className='w-[22px]'
                        />
                      </ZRoundedButton>
                    </>
                  )}

                  {(linkInBioBlockData?.blockType === LinkInBioBlockEnum.card ||
                    linkInBioBlockData?.blockType ===
                      LinkInBioBlockEnum.carousel ||
                    linkInBioBlockData?.blockType === LinkInBioBlockEnum.RSS ||
                    linkInBioBlockData?.blockType ===
                      LinkInBioBlockEnum.shopify ||
                    linkInBioBlockData?.blockType ===
                      LinkInBioBlockEnum.magento ||
                    linkInBioBlockData?.blockType ===
                      LinkInBioBlockEnum.wordpress) && (
                    <>
                      <ZRoundedButton
                        className='me-2'
                        color={
                          values.style === LinkInBioCardStyleEnum.thumbRound
                            ? 'primary'
                            : 'medium'
                        }
                        onClick={() => {
                          void setFieldValue(
                            'style',
                            LinkInBioCardStyleEnum.thumbRound,
                            false
                          );
                        }}>
                        <ZIonImg
                          src={thumb_style_1}
                          className='w-[22px]'
                        />
                      </ZRoundedButton>

                      <ZRoundedButton
                        className='me-2'
                        color={
                          values.style === LinkInBioCardStyleEnum.thumbCircle
                            ? 'primary'
                            : 'medium'
                        }
                        onClick={() => {
                          void setFieldValue(
                            'style',
                            LinkInBioCardStyleEnum.thumbCircle,
                            false
                          );
                        }}>
                        <ZIonImg
                          src={thumb_style_2}
                          className='w-[22px]'
                        />
                      </ZRoundedButton>

                      <ZRoundedButton
                        className='me-2'
                        color={
                          values.style === LinkInBioCardStyleEnum.thumbStrip
                            ? 'primary'
                            : 'medium'
                        }
                        onClick={() => {
                          void setFieldValue(
                            'style',
                            LinkInBioCardStyleEnum.thumbStrip,
                            false
                          );
                        }}>
                        <ZIonImg
                          src={strip_style}
                          className='w-[22px]'
                        />
                      </ZRoundedButton>
                    </>
                  )}

                  {/*  */}
                  {linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.avatar && (
                    <>
                      <ZRoundedButton
                        className='me-2'
                        color={
                          values.style === LinkInBioCardStyleEnum.circle
                            ? 'primary'
                            : 'medium'
                        }
                        onClick={() => {
                          void setFieldValue(
                            'style',
                            LinkInBioCardStyleEnum.circle,
                            false
                          );
                        }}>
                        <ZIonImg
                          src={circle_style}
                          className='w-[22px]'
                        />
                      </ZRoundedButton>

                      <ZRoundedButton
                        className='me-2'
                        color={
                          values.style === LinkInBioCardStyleEnum.square
                            ? 'primary'
                            : 'medium'
                        }
                        onClick={() => {
                          void setFieldValue(
                            'style',
                            LinkInBioCardStyleEnum.square,
                            false
                          );
                        }}>
                        <ZIonImg
                          src={square_style}
                          className='w-[22px]'
                        />
                      </ZRoundedButton>

                      <ZRoundedButton
                        className='me-2'
                        color={
                          values.style === LinkInBioCardStyleEnum.album
                            ? 'primary'
                            : 'medium'
                        }
                        onClick={() => {
                          void setFieldValue(
                            'style',
                            LinkInBioCardStyleEnum.album,
                            false
                          );
                        }}>
                        <ZIonImg
                          src={album_style}
                          className='w-[22px]'
                        />
                      </ZRoundedButton>
                    </>
                  )}
                </div>
              </ZIonCol>
            )}

            {/* 👓 View */}
            {(linkInBioBlockData?.blockType === LinkInBioBlockEnum.magento ||
              linkInBioBlockData?.blockType === LinkInBioBlockEnum.wordpress ||
              linkInBioBlockData?.blockType === LinkInBioBlockEnum.shopify ||
              linkInBioBlockData?.blockType === LinkInBioBlockEnum.RSS ||
              linkInBioBlockData?.blockType ===
                LinkInBioBlockEnum.carousel) && (
              <ZIonCol
                sizeXl='11'
                sizeLg='12'
                sizeMd='12'
                sizeSm='12'
                sizeXs='12'
                className='ion-padding-vertical ion-margin-start border-bottom__violet'>
                <ZIonTitle className='mb-3 font-bold text-[16px] ion-no-padding'>
                  👓 View
                </ZIonTitle>
                <div className='mb-2 ion-padding-bottom'>
                  <ZRoundedButton
                    className='me-2'
                    color={
                      values.view === LinkInBioCardViewEnum.carousel
                        ? 'primary'
                        : 'medium'
                    }
                    onClick={() => {
                      void setFieldValue(
                        'view',
                        LinkInBioCardViewEnum.carousel,
                        false
                      );
                    }}>
                    <ZIonImg
                      src={carousel_view}
                      className='w-[22px]'
                    />
                  </ZRoundedButton>

                  <ZRoundedButton
                    className='me-2'
                    color={
                      values.view === LinkInBioCardViewEnum.list
                        ? 'primary'
                        : 'medium'
                    }
                    onClick={() => {
                      void setFieldValue(
                        'view',
                        LinkInBioCardViewEnum.list,
                        false
                      );
                    }}>
                    <ZIonImg
                      src={list_view}
                      className='w-[22px]'
                    />
                  </ZRoundedButton>

                  {/* <ZRoundedButton
                    className='me-2'
                    color={
                      values.view === LinkInBioCardViewEnum.mixed
                        ? 'primary'
                        : 'medium'
                    }
                    onClick={() => {
                      void setFieldValue(
                        'view',
                        LinkInBioCardViewEnum.mixed,
                        false
                      );
                    }}>
                    <ZIonImg
                      src={mixed_view}
                      className='w-[22px]'
                    />
                  </ZRoundedButton> */}
                </div>
              </ZIonCol>
            )}

            {/* 🎈 Animation */}
            {(linkInBioBlockData?.blockType === LinkInBioBlockEnum.button ||
              linkInBioBlockData?.blockType === LinkInBioBlockEnum.text ||
              linkInBioBlockData?.blockType === LinkInBioBlockEnum.countdown ||
              linkInBioBlockData?.blockType === LinkInBioBlockEnum.card ||
              linkInBioBlockData?.blockType === LinkInBioBlockEnum.carousel ||
              linkInBioBlockData?.blockType === LinkInBioBlockEnum.music ||
              linkInBioBlockData?.blockType === LinkInBioBlockEnum.QAndA ||
              linkInBioBlockData?.blockType === LinkInBioBlockEnum.messenger ||
              linkInBioBlockData?.blockType === LinkInBioBlockEnum.form ||
              linkInBioBlockData?.blockType === LinkInBioBlockEnum.social ||
              linkInBioBlockData?.blockType === LinkInBioBlockEnum.VCard) && (
              <ZIonCol
                sizeXl='11'
                sizeLg='12'
                sizeMd='12'
                sizeSm='12'
                sizeXs='12'
                className='ion-padding-top ion-margin-start border-bottom__violet'>
                <ZIonRow className='ion-padding-bottom'>
                  <ZIonCol>
                    <ZIonTitle className='font-bold text-[16px] ion-no-padding'>
                      🎈 Animation <ZIonRouterLink>(help)</ZIonRouterLink>
                    </ZIonTitle>
                  </ZIonCol>

                  <ZIonCol className='ion-text-end'>
                    <ZRCSwitch
                      checked={values.animation.isEnabled}
                      onChange={_value => {
                        void setFieldValue(
                          'animation.isEnabled',
                          _value,
                          false
                        );
                      }}
                    />
                  </ZIonCol>

                  {values.animation.isEnabled && (
                    <ZIonCol
                      size='12'
                      className='my-3'>
                      <ZRoundedButton
                        className='me-2'
                        color={
                          values.animation.type ===
                          LinkInBioBlockAnimationEnum.tada
                            ? 'primary'
                            : 'medium'
                        }
                        onClick={() => {
                          void setFieldValue(
                            'animation.type',
                            LinkInBioBlockAnimationEnum.tada,
                            false
                          );
                        }}>
                        <ZIonImg
                          src={tadaAnimation}
                          className='w-[22px]'
                        />
                      </ZRoundedButton>

                      <ZRoundedButton
                        className='me-2'
                        color={
                          values.animation.type ===
                          LinkInBioBlockAnimationEnum.shake
                            ? 'primary'
                            : 'medium'
                        }
                        onClick={() => {
                          void setFieldValue(
                            'animation.type',
                            LinkInBioBlockAnimationEnum.shake,
                            false
                          );
                        }}>
                        <ZIonImg
                          src={shakeAnimation}
                          className='w-[22px]'
                        />
                      </ZRoundedButton>

                      <ZRoundedButton
                        className='me-2'
                        color={
                          values.animation.type ===
                          LinkInBioBlockAnimationEnum.swing
                            ? 'primary'
                            : 'medium'
                        }
                        onClick={() => {
                          void setFieldValue(
                            'animation.type',
                            LinkInBioBlockAnimationEnum.swing,
                            false
                          );
                        }}>
                        <ZIonImg
                          src={swingAnimation}
                          className='w-[22px]'
                        />
                      </ZRoundedButton>

                      <ZRoundedButton
                        className='me-2'
                        color={
                          values.animation.type ===
                          LinkInBioBlockAnimationEnum.wobble
                            ? 'primary'
                            : 'medium'
                        }
                        onClick={() => {
                          void setFieldValue(
                            'animation.type',
                            LinkInBioBlockAnimationEnum.wobble,
                            false
                          );
                        }}>
                        <ZIonImg
                          src={wobbleAnimation}
                          className='w-[22px]'
                        />
                      </ZRoundedButton>

                      <ZRoundedButton
                        className='me-2'
                        color={
                          values.animation.type ===
                          LinkInBioBlockAnimationEnum.jello
                            ? 'primary'
                            : 'medium'
                        }
                        onClick={() => {
                          void setFieldValue(
                            'animation.type',
                            LinkInBioBlockAnimationEnum.jello,
                            false
                          );
                        }}>
                        <ZIonImg
                          src={jelloAnimation}
                          className='w-[22px]'
                        />
                      </ZRoundedButton>

                      <ZRoundedButton
                        className='me-2'
                        color={
                          values.animation.type ===
                          LinkInBioBlockAnimationEnum.pulse
                            ? 'primary'
                            : 'medium'
                        }
                        onClick={() => {
                          void setFieldValue(
                            'animation.type',
                            LinkInBioBlockAnimationEnum.pulse,
                            false
                          );
                        }}>
                        <ZIonImg
                          src={pulseAnimation}
                          className='w-[22px]'
                        />
                      </ZRoundedButton>

                      <ZRoundedButton
                        className='me-2'
                        color={
                          values.animation.type ===
                          LinkInBioBlockAnimationEnum.zoom
                            ? 'primary'
                            : 'medium'
                        }
                        onClick={() => {
                          void setFieldValue(
                            'animation.type',
                            LinkInBioBlockAnimationEnum.zoom,
                            false
                          );
                        }}>
                        <ZIonImg
                          src={zoomAnimation}
                          className='w-[22px]'
                        />
                      </ZRoundedButton>
                    </ZIonCol>
                  )}
                </ZIonRow>
              </ZIonCol>
            )}

            {/* ⏱ Schedule */}
            <ZIonCol
              sizeXl='11'
              sizeLg='12'
              sizeMd='12'
              sizeSm='12'
              sizeXs='12'
              className='mb-2 ion-padding-top ion-margin-horizontal'>
              <ZIonRow className='ion-margin-bottom'>
                <ZIonCol>
                  <ZIonTitle className='font-bold text-[16px] ion-no-padding'>
                    ⏱ Schedule <ZIonRouterLink>(help)</ZIonRouterLink>
                  </ZIonTitle>
                </ZIonCol>

                <ZIonCol className='ion-text-end'>
                  <ZRCSwitch
                    checked={values.schedule.isEnabled}
                    onChange={_value => {
                      void setFieldValue('schedule.isEnabled', _value, false);
                    }}
                  />
                </ZIonCol>

                {values.schedule.isEnabled && (
                  <ZIonCol
                    size='12'
                    className='mt-3'>
                    <ZIonRow>
                      <ZIonCol
                        size='5.9'
                        className='me-2'>
                        {/* <ZIonItem className='ion-no-padding ion-no-margin'> */}
                        <ZIonLabel className='font-bold ms-2'>
                          Start at:
                        </ZIonLabel>
                        <ZIonDatetimeButton
                          name='schedule.startAt'
                          className='mt-2 ion-justify-content-start zaions-datetime-btn'
                          onIonChange={({ target }) => {
                            void setFieldValue(
                              'schedule.startAt',
                              target.value,
                              false
                            );
                          }}
                          id='startAt'
                          value={dayjs(values.schedule.startAt).format(
                            CONSTANTS.DateTime.iso8601DateTime
                          )}
                          min={new Date().toISOString()}
                        />
                      </ZIonCol>

                      <ZIonCol size='5.9'>
                        <ZIonLabel className='font-bold ms-2'>
                          End at:
                        </ZIonLabel>
                        <ZIonDatetimeButton
                          className='mt-2 ion-justify-content-start zaions-datetime-btn'
                          name='schedule.endAt'
                          onIonChange={({ target }) => {
                            void setFieldValue(
                              'schedule.endAt',
                              target.value,
                              false
                            );
                          }}
                          id='endAt'
                          value={dayjs(values.schedule.endAt).format(
                            CONSTANTS.DateTime.iso8601DateTime
                          )}
                          min={dayjs(
                            dayjs(values.schedule.startAt)
                              .add(1, 'hour')
                              .toISOString()
                          ).format(CONSTANTS.DateTime.iso8601DateTime)}
                        />
                      </ZIonCol>
                    </ZIonRow>
                  </ZIonCol>
                )}
              </ZIonRow>
            </ZIonCol>
          </>
        );
      }}
    </Formik>
  );
};

export default ZLinkInBioBlocksForm;
