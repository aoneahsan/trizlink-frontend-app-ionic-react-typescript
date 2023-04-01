/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect } from 'react';
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
  wifiOutline,
} from 'ionicons/icons';
import { useRecoilState } from 'recoil';

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
  ZIonItem,
  ZIonLabel,
  ZIonRange,
  ZIonRouterLink,
  ZIonRow,
  ZIonText,
  ZIonTitle,
} from '@/components/ZIonComponents';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';
import LinkInBioLinkField from '@/components/LinkInBioComponents/Form/LinkField';
import LinkInBioTitleField from '@/components/LinkInBioComponents/Form/TitleField';
import LinkInBioDescriptionField from '@/components/LinkInBioComponents/Form/DescriptionField';
import LinkInBioUploadField from '@/components/LinkInBioComponents/Form/UploadField';
import LinkInBioDateTimeField from '@/components/LinkInBioComponents/Form/DateTimeField';
import LinkInBioEnableField from '@/components/LinkInBioComponents/Form/DateTimeField/enableField';
import LinkInBioSearchField from '@/components/LinkInBioComponents/Form/SearchField';
import LinkInBioTimezoneField from '@/components/LinkInBioComponents/Form/TimezoneField';
import ZRoundedButton from '@/components/CustomComponents/ZRoundedButton';
import ZTextEditor from '@/components/CustomComponents/ZTextEditor';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import ZaionsColorPiker from '@/components/InPageComponents/ZaionsColorPiker';

import {
  useZRQDeleteRequest,
  useZRQGetRequest,
  useZRQUpdateRequest,
} from '@/ZaionsHooks/zreactquery-hooks';
import { useZValidateRequestResponse } from '@/ZaionsHooks/zapi-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS, { TIMEZONES } from '@/utils/constants';
import {
  createRedirectRoute,
  extractInnerData,
  formatReactSelectOption,
  zConsole,
  zJsonParse,
  zStringify,
} from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { reportCustomError } from '@/utils/customErrorType';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  LinkInBioButtonTypeEnum,
  LinkInBioThemeBackgroundEnum,
  ZLinkInBioPageEnum,
  ZLinkInBioRHSComponentEnum,
} from '@/types/AdminPanel/linkInBioType';
import {
  LinkInBioBlockAnimationEnum,
  linkInBioBlockCardItemEnum,
  LinkInBioBlockEnum,
  LinkInBioBlockFromType,
  LinkInBioCardStyleEnum,
  LinkInBioCardViewEnum,
  LinkInBioSingleBlockContentType,
  SeparatorTypeEnum,
} from '@/types/AdminPanel/linkInBioType/blockTypes';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import {
  LinkInBioBlocksRState,
  LinkInBioSelectedBlockFromRState,
} from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioBlocksState';

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
  borderDashed,
  borderDotted,
  borderSolid,
  card_style_1,
  card_style_2,
  carousel_view,
  jelloAnimation,
  list_view,
  mixed_view,
  pulseAnimation,
  shakeAnimation,
  strip_style,
  swingAnimation,
  tadaAnimation,
  thumb_style_1,
  thumb_style_2,
  wobbleAnimation,
  zoomAnimation,
} from '@/assets/images';
import dayjs from 'dayjs';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import ZCustomDeleteComponent from '@/components/CustomComponents/ZCustomDeleteComponent';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import ZLinkInBioAddBlockModal from '@/components/InPageComponents/ZaionsModals/LinkInBioAddBlockModal';
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
import classNames from 'classnames';

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

  // recoil state of single block data.
  // state for storing data of block. because when we go to edit page (blockFrom page) of any block or create a new block and redirect to blockFrom page we need data of that block, initial data or updated data we need it in blockFrom page for editing that block, so we store the data of block in setLinkInBioSelectedBlockFromState then we will initialized this to the initial value of the blockFrom page formik initial value. with the id of the current block.
  const [linkInBioSelectedBlockFromState, setLinkInBioSelectedBlockFromState] =
    useRecoilState(LinkInBioSelectedBlockFromRState);

  const parseLinkInBioSelectedBlockData =
    zJsonParse<LinkInBioSingleBlockContentType>(
      String(linkInBioSelectedBlockFromState.blockContent)
    );

  // Recoil state of blocks of preview panel.
  const [linkInBioBlocksState, setLinkInBioBlocksState] = useRecoilState(
    LinkInBioBlocksRState
  );

  // validate the request. this hook will show success notification if the request->success is true and show error notification if request->success is false.
  const { validateRequestResponse } = useZValidateRequestResponse();

  // current Link-in-bio id.
  const { editLinkInBioId } = useParams<{
    editLinkInBioId: string;
  }>();

  // getting search param from url with the help of 'qs' package.
  const routeQSearchParams = routeQueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const _blockId = (routeQSearchParams as { blockId: string }).blockId;

  const { zNavigatePushRoute } = useZNavigate();

  const [linkInBioBlockState, setLinkInBioBlockState] = useRecoilState(
    LinkInBioBlocksRState
  );

  // Update Link-in-bio block API.
  const { mutateAsync: UpdateLinkInBioBlock } = useZRQUpdateRequest({
    _url: API_URL_ENUM.linkInBioBlock_delete_update_get,
    _queriesKeysToInvalidate: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_BLOCK.GET,
      _blockId,
    ],
    // [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_BLOCK.MAIN]
  });

  // fetching link-in-bio block data with the help of editLinkInBioId and id from backend.
  const { data: linkInBioBlockData } = useZRQGetRequest<LinkInBioBlockFromType>(
    {
      _url: API_URL_ENUM.linkInBioBlock_delete_update_get,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_BLOCK.GET,
        _blockId,
      ],
      _itemsIds: [editLinkInBioId, _blockId],
      _urlDynamicParts: [':linkInBioId', ':blockId'],
      _shouldFetchWhenIdPassed: _blockId ? false : true,
      _extractType: ZRQGetRequestExtractEnum.extractItem,
    }
  );

  // delete link-in-bio block api where use went to delete the block on preview panel and click on the delete button in ActionSheet (useZIonActionSheet) the deleteBlockHandler will execute with will hit this api and delete the block.
  const { mutateAsync: deleteLinkInBioBlockMutate } = useZRQDeleteRequest(
    API_URL_ENUM.linkInBioBlock_delete_update_get,
    [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_BLOCK.MAIN]
  );

  // custom hook for presenting modal (the add block modal)
  const { presentZIonModal: presentZLinkInBioAddBlockModal } = useZIonModal(
    ZLinkInBioAddBlockModal,
    {
      _blockType: linkInBioSelectedBlockFromState.blockType, // passing values.LinkInBioBlock as blockType to ZLinkInBioAddBlockModal component.
      _blockContent: parseLinkInBioSelectedBlockData,
      editLinkInBioId,
      modalHeading: 'Clone block 😊',
      modalSubHeading: `Would you like clone this ${linkInBioSelectedBlockFromState.blockType} block in your page?`,
    }
  );

  useEffect(() => {
    try {
      if (linkInBioBlockData) {
        // after creating block store the default data in setLinkInBioSelectedBlockFromState and redirecting to blockFrom page for editing.
        setLinkInBioSelectedBlockFromState(linkInBioBlockData);
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line
  }, [linkInBioBlockData]);

  // formik submit function.
  const formikSubmitHandler = async (reqDataStr: string) => {
    try {
      if (reqDataStr) {
        zConsole({
          message: 'checking the reExecution og the formikSubmitHandler',
          data: reqDataStr,
        });
        // The update api...
        const _result = await UpdateLinkInBioBlock({
          itemIds: [editLinkInBioId, _blockId],
          urlDynamicParts: [':linkInBioId', ':blockId'],
          requestData: reqDataStr,
        });

        // if _result of the updateLinkInBioBlock api is success this showing success notification else not success then error notification.
        await validateRequestResponse({
          resultObj: _result,
        });

        // extracting data from result.
        const _extractItemFromResult = extractInnerData<LinkInBioBlockFromType>(
          _result,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );

        const _updatedLinkInBioBlocksState: LinkInBioBlockFromType[] =
          linkInBioBlocksState.map((el) => {
            if (el.id === _extractItemFromResult?.id) {
              return _extractItemFromResult as LinkInBioBlockFromType;
            } else {
              return el;
            }
          });

        setLinkInBioBlocksState(_updatedLinkInBioBlocksState);
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  // delete block function.
  const deleteBlockHandler = async (detail: OverlayEventDetail<unknown>) => {
    try {
      if (detail && detail.role === 'destructive' && _blockId) {
        const _updateLinkInBioBlockState = linkInBioBlockState.filter(
          (el) => el.id !== _blockId
        );

        const _result = await deleteLinkInBioBlockMutate({
          itemIds: [editLinkInBioId, _blockId],
          urlDynamicParts: [':linkInBioId', ':blockId'],
        });

        // Redirect to block
        zNavigatePushRoute(
          createRedirectRoute({
            url: ZaionsRoutes.AdminPanel.ZaionsAdminEditLinkInBioRoute,
            params: [CONSTANTS.RouteParams.editLinkInBioIdParam],
            values: [editLinkInBioId],
            routeSearchParams: {
              page: ZLinkInBioPageEnum.design,
              step: ZLinkInBioRHSComponentEnum.blocks,
            },
          })
        );

        setLinkInBioBlockState(_updateLinkInBioBlockState);
        // if _result of the updateLinkInBio api is success this showing success notification else not success then error notification.
        await validateRequestResponse({
          resultObj: _result,
        });
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  return (
    <Formik
      initialValues={{
        target: {
          url: parseLinkInBioSelectedBlockData?.target?.url || '',

          email: parseLinkInBioSelectedBlockData?.target?.email || '',

          phoneNumber:
            parseLinkInBioSelectedBlockData?.target?.phoneNumber || '',

          username: parseLinkInBioSelectedBlockData?.target?.username || '',

          accountId: parseLinkInBioSelectedBlockData?.target?.accountId || '',

          subject: parseLinkInBioSelectedBlockData?.target?.subject || '',
          message: parseLinkInBioSelectedBlockData?.target?.message || '',
          type:
            parseLinkInBioSelectedBlockData?.target?.type ||
            linkInBioBlockCardItemEnum.whatsapp,
        },
        vcard: {
          firstName: parseLinkInBioSelectedBlockData?.vcard?.firstName || '',
          lastName: parseLinkInBioSelectedBlockData?.vcard?.lastName || '',
          mobile: parseLinkInBioSelectedBlockData?.vcard?.mobile || '',
          phone: parseLinkInBioSelectedBlockData?.vcard?.phone || '',
          fax: parseLinkInBioSelectedBlockData?.vcard?.fax || '',
          email: parseLinkInBioSelectedBlockData?.vcard?.email || '',
          company: parseLinkInBioSelectedBlockData?.vcard?.company || '',
          job: parseLinkInBioSelectedBlockData?.vcard?.job || '',
          street: parseLinkInBioSelectedBlockData?.vcard?.street || '',
          city: parseLinkInBioSelectedBlockData?.vcard?.city || '',
          zip: parseLinkInBioSelectedBlockData?.vcard?.zip || 0,
          state: parseLinkInBioSelectedBlockData?.vcard?.state || '',
          country: parseLinkInBioSelectedBlockData?.vcard?.country || '',
          website: parseLinkInBioSelectedBlockData?.vcard?.website || '',
        },
        title: parseLinkInBioSelectedBlockData?.title || '',
        icon: parseLinkInBioSelectedBlockData?.icon || '',
        text: parseLinkInBioSelectedBlockData?.text || '',
        description: parseLinkInBioSelectedBlockData?.description || '',
        titleIsEnable: parseLinkInBioSelectedBlockData?.titleIsEnable || false,
        descriptionIsEnable:
          parseLinkInBioSelectedBlockData?.descriptionIsEnable || false,
        pictureIsEnable:
          parseLinkInBioSelectedBlockData?.pictureIsEnable || false,
        priceIsEnable: parseLinkInBioSelectedBlockData?.priceIsEnable || false,
        cardIsEnable: parseLinkInBioSelectedBlockData?.cardIsEnable || false,
        cardNumber: parseLinkInBioSelectedBlockData?.cardNumber || 0,
        searchString: parseLinkInBioSelectedBlockData?.searchString || '',
        spacing: parseLinkInBioSelectedBlockData?.spacing || 0,
        customHeight: parseLinkInBioSelectedBlockData?.customHeight || 0,
        date: parseLinkInBioSelectedBlockData?.date || '',
        timezone: parseLinkInBioSelectedBlockData?.timezone || '',
        imageUrl: parseLinkInBioSelectedBlockData?.imageUrl || '',
        avatarShadow: parseLinkInBioSelectedBlockData?.avatarShadow || false,
        cardMode: parseLinkInBioSelectedBlockData?.cardMode || false,
        iframe: parseLinkInBioSelectedBlockData?.iframe || '',
        separatorType:
          parseLinkInBioSelectedBlockData?.separatorType ||
          SeparatorTypeEnum.solid,
        separatorColor: parseLinkInBioSelectedBlockData?.separatorColor || '',
        separatorMargin: parseLinkInBioSelectedBlockData?.separatorMargin || 0,
        margin: parseLinkInBioSelectedBlockData?.margin || 0,

        map: {
          formattedAddress: 'okay',
          lat: 10,
          lng: 10,
          userEnteredAddress: 'working',
        },

        customAppearance: {
          isEnabled:
            parseLinkInBioSelectedBlockData?.customAppearance?.isEnabled ||
            false,
          background: {
            bgType:
              parseLinkInBioSelectedBlockData?.customAppearance?.background
                ?.bgType || LinkInBioThemeBackgroundEnum.solidColor,
            bgSolidColor:
              parseLinkInBioSelectedBlockData?.customAppearance?.background
                ?.bgSolidColor || CONSTANTS.LINK_In_BIO.INITIAL_VALUES.BG_COLOR,
            bgGradientColors: {
              startColor:
                parseLinkInBioSelectedBlockData?.customAppearance?.background
                  ?.bgGradientColors?.startColor || '',
              endColor:
                parseLinkInBioSelectedBlockData?.customAppearance?.background
                  ?.bgGradientColors?.endColor || '',
              direction:
                parseLinkInBioSelectedBlockData?.customAppearance?.background
                  ?.bgGradientColors?.direction || 0,
            },
          },
          color: parseLinkInBioSelectedBlockData?.customAppearance?.color || '',
          buttonType:
            parseLinkInBioSelectedBlockData?.customAppearance?.buttonType ||
            LinkInBioButtonTypeEnum.inlineSquare,
          shadowColor:
            parseLinkInBioSelectedBlockData?.customAppearance?.shadowColor ||
            CONSTANTS.LINK_In_BIO.INITIAL_VALUES.BUTTON_SHADOW_COLOR,
        },

        animation: {
          isEnabled:
            parseLinkInBioSelectedBlockData?.animation?.isEnabled || false,
          type: parseLinkInBioSelectedBlockData?.animation?.type,
        },

        style:
          parseLinkInBioSelectedBlockData?.style ||
          LinkInBioCardStyleEnum.square,

        view:
          parseLinkInBioSelectedBlockData?.view ||
          LinkInBioCardViewEnum.carousel,

        cardItems: parseLinkInBioSelectedBlockData?.cardItems || [],

        form: {
          formFields: parseLinkInBioSelectedBlockData?.form?.formFields || [],
          isTermEnabled:
            parseLinkInBioSelectedBlockData?.form?.isTermEnabled || false,
          submitButtonText:
            parseLinkInBioSelectedBlockData?.form?.submitButtonText || 'Submit',
          termText:
            parseLinkInBioSelectedBlockData?.form?.termText ||
            'I Agree to Terms & Conditions',
          termLink: parseLinkInBioSelectedBlockData?.form?.termLink,
        },

        schedule: {
          isEnabled:
            parseLinkInBioSelectedBlockData?.schedule?.isEnabled || false,
          // startAt: parseLinkInBioSelectedBlockData?.schedule?.startAt || '',
          startAt:
            parseLinkInBioSelectedBlockData?.schedule?.startAt ||
            new Date().toISOString(),
          endAt:
            parseLinkInBioSelectedBlockData?.schedule?.endAt ||
            new Date().toISOString(),
          timezone: parseLinkInBioSelectedBlockData?.schedule?.timezone || '',
        },

        isActive: linkInBioSelectedBlockFromState.isActive,
      }}
      enableReinitialize
      onSubmit={(values) => {
        const stringifyValue = zStringify({
          blockType: linkInBioSelectedBlockFromState.blockType,
          blockContent: zStringify(values),
          isActive: values.isActive,
        });
        void formikSubmitHandler(stringifyValue);
      }}
    >
      {({ values, dirty, handleChange, setFieldValue, submitForm }) => {
        return (
          <>
            <ZIonCol
              sizeXl='11'
              sizeLg='12'
              sizeMd='12'
              sizeSm='12'
              sizeXs='12'
              className='ion-margin-start ion-padding-vertical ion-margin-top border-bottom__violet'
            >
              <ZIonRow>
                <ZIonCol className='d-flex ion-align-items-center'>
                  <ZIonButton
                    fill='clear'
                    size='small'
                    className='ion-no-padding me-2 mb-1'
                    color='dark'
                    onClick={() => {
                      zNavigatePushRoute(
                        createRedirectRoute({
                          url: ZaionsRoutes.AdminPanel
                            .ZaionsAdminEditLinkInBioRoute,
                          params: [CONSTANTS.RouteParams.editLinkInBioIdParam],
                          values: [editLinkInBioId],
                          routeSearchParams: {
                            page: ZLinkInBioPageEnum.design,
                            step: ZLinkInBioRHSComponentEnum.blocks,
                          },
                        })
                      );
                    }}
                  >
                    <ZIonIcon icon={chevronBackOutline} />
                  </ZIonButton>
                  <ZIonText className='zaions__fs_18'>
                    {linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.button
                      ? 'Button'
                      : linkInBioSelectedBlockFromState.blockType ===
                        LinkInBioBlockEnum.text
                      ? 'Text'
                      : linkInBioSelectedBlockFromState.blockType ===
                        LinkInBioBlockEnum.countdown
                      ? 'Countdown'
                      : linkInBioSelectedBlockFromState.blockType ===
                        LinkInBioBlockEnum.card
                      ? 'Card'
                      : linkInBioSelectedBlockFromState.blockType ===
                        LinkInBioBlockEnum.carousel
                      ? 'Carousel'
                      : linkInBioSelectedBlockFromState.blockType ===
                        LinkInBioBlockEnum.RSS
                      ? 'RSS'
                      : linkInBioSelectedBlockFromState.blockType ===
                        LinkInBioBlockEnum.audio
                      ? 'Audio'
                      : linkInBioSelectedBlockFromState.blockType ===
                        LinkInBioBlockEnum.video
                      ? 'Video'
                      : linkInBioSelectedBlockFromState.blockType ===
                        LinkInBioBlockEnum.calendar
                      ? 'Calendar'
                      : linkInBioSelectedBlockFromState.blockType ===
                        LinkInBioBlockEnum.shopify
                      ? 'Shopify'
                      : linkInBioSelectedBlockFromState.blockType ===
                        LinkInBioBlockEnum.magento
                      ? 'Magento'
                      : linkInBioSelectedBlockFromState.blockType ===
                        LinkInBioBlockEnum.wordpress
                      ? 'Wordpress'
                      : linkInBioSelectedBlockFromState.blockType ===
                        LinkInBioBlockEnum.map
                      ? 'Maps'
                      : linkInBioSelectedBlockFromState.blockType ===
                        LinkInBioBlockEnum.music
                      ? 'Music'
                      : linkInBioSelectedBlockFromState.blockType ===
                        LinkInBioBlockEnum.QAndA
                      ? 'Q&A'
                      : linkInBioSelectedBlockFromState.blockType ===
                        LinkInBioBlockEnum.form
                      ? 'Forms'
                      : linkInBioSelectedBlockFromState.blockType ===
                        LinkInBioBlockEnum.social
                      ? 'Social'
                      : linkInBioSelectedBlockFromState.blockType ===
                        LinkInBioBlockEnum.Iframe
                      ? 'Iframe'
                      : linkInBioSelectedBlockFromState.blockType ===
                        LinkInBioBlockEnum.avatar
                      ? 'Avatar'
                      : linkInBioSelectedBlockFromState.blockType ===
                        LinkInBioBlockEnum.VCard
                      ? 'Vcard'
                      : linkInBioSelectedBlockFromState.blockType ===
                        LinkInBioBlockEnum.messenger
                      ? 'Messenger'
                      : linkInBioSelectedBlockFromState.blockType ===
                        LinkInBioBlockEnum.spacing
                      ? 'Spacing'
                      : linkInBioSelectedBlockFromState.blockType ===
                        LinkInBioBlockEnum.separator
                      ? 'Separator'
                      : ''}{' '}
                    block
                    <ZIonRouterLink className='ps-2'>(help)</ZIonRouterLink>
                  </ZIonText>
                </ZIonCol>

                <ZIonCol className='d-flex ion-align-items-center ion-justify-content-end'>
                  {dirty && (
                    <ZIonButton
                      className='ion-no-margin me-3 ion-text-capitalize'
                      onClick={() => {
                        void submitForm();
                      }}
                    >
                      Save
                    </ZIonButton>
                  )}

                  <ZIonButton
                    fill='clear'
                    className='ion-no-padding me-3 ion-no-margin'
                    color='light'
                    size='small'
                    style={{
                      '--background-hover-opacity': '0',
                    }}
                    onClick={() => {
                      setFieldValue('isActive', !values.isActive, false);
                    }}
                  >
                    <ZIonTitle className='ion-no-padding'>
                      <h4 className='ion-no-margin'>
                        <ZIonIcon
                          icon={values.isActive ? eyeOutline : eyeOffOutline}
                          className='mt-2'
                          color='dark'
                        />
                      </h4>
                    </ZIonTitle>
                  </ZIonButton>

                  <ZIonButton
                    fill='clear'
                    className='ion-no-padding me-3 ion-no-margin'
                    color='light'
                    size='small'
                    style={{
                      '--background-hover-opacity': '0',
                    }}
                    onClick={() => {
                      presentZLinkInBioAddBlockModal({
                        _cssClass: 'lib-block-modal-size',
                      });
                    }}
                  >
                    <ZIonTitle className='ion-no-padding'>
                      <h4 className='ion-no-margin'>
                        <ZIonIcon
                          icon={copyOutline}
                          className='mt-2'
                          color='dark'
                        />
                      </h4>
                    </ZIonTitle>
                  </ZIonButton>

                  <ZCustomDeleteComponent
                    deleteFn={deleteBlockHandler}
                    className='ion-no-padding ion-no-margin'
                    iconColor='danger'
                    iconName={trashBinOutline}
                    iconClassName='mt-2'
                  />
                </ZIonCol>
              </ZIonRow>
            </ZIonCol>

            <ZIonCol
              sizeXl='11'
              sizeLg='12'
              sizeMd='12'
              sizeSm='12'
              sizeXs='12'
              className='ion-padding-vertical ion-margin-top ion-margin-start border-bottom__violet'
            >
              <ZIonTitle className='fw-bold zaions__fs_16 ion-no-padding'>
                {linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.button ||
                linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.VCard
                  ? '👉 Button'
                  : linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.text
                  ? '✒️ Text'
                  : linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.countdown
                  ? '⏱ Countdown'
                  : linkInBioSelectedBlockFromState.blockType ===
                      LinkInBioBlockEnum.card ||
                    linkInBioSelectedBlockFromState.blockType ===
                      LinkInBioBlockEnum.carousel
                  ? '👉 Card'
                  : linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.RSS
                  ? '👉 RSS'
                  : linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.audio
                  ? '🔊 Audio player'
                  : linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.video
                  ? '🎬 Video'
                  : linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.calendar
                  ? '📆 Calendar'
                  : linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.shopify
                  ? '👉 Shopify'
                  : linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.magento
                  ? '👉 Magento'
                  : linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.wordpress
                  ? '🖥 Wordpress'
                  : linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.map
                  ? '🗺️ Maps'
                  : linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.music
                  ? '🎵 Add music platforms'
                  : linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.QAndA
                  ? '💬 Add Question - Answer'
                  : linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.form
                  ? '📝 Forms'
                  : linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.social
                  ? '🧳 Add Social platforms'
                  : linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.Iframe
                  ? '💻 Iframe (Typeform, Acast, etc.)'
                  : linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.avatar
                  ? '👋 Avatar'
                  : ''}
              </ZIonTitle>

              <ZIonRow className='ion-padding-bottom'>
                {/* Carousel card field */}
                {linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.carousel && (
                  <ZIonCol size='12' className='mt-3'>
                    <LinkInBioCarouselCardField />
                  </ZIonCol>
                )}

                {/* Q and A card field */}
                {linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.QAndA && (
                  <ZIonCol size='12' className='mt-3'>
                    <LinkInBioQAndACardField />
                  </ZIonCol>
                )}

                {linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.music && (
                  <ZIonCol size='12' className='mt-3'>
                    <LinkInBioMusicPlatformCardField />
                  </ZIonCol>
                )}

                {linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.messenger && (
                  <ZIonCol size='12'>
                    <LinkInBioMessengerPlatformCardField />
                  </ZIonCol>
                )}

                {linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.social && (
                  <ZIonCol size='12'>
                    <LinkInBioSocialPlatformCardField />
                  </ZIonCol>
                )}

                {/* Link Component */}
                {(linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.button ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.countdown ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.card ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.audio ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.video ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.calendar ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.avatar) && (
                  <ZIonCol size='12' className='mt-3'>
                    <LinkInBioLinkField
                      name='target.url'
                      value={values.target.url}
                      onIonChange={handleChange}
                    />
                  </ZIonCol>
                )}

                {/* Iframe component */}
                {linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.Iframe && <LinkInBioIframeField />}

                {/* Title Component */}
                {(linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.button ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.countdown ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.card ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.audio ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.video ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.calendar ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.avatar ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.map ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.VCard ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.Iframe ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.form) && (
                  <ZIonCol size='12' className='mt-4 pt-2'>
                    <LinkInBioTitleField
                      name='title'
                      value={values.title}
                      onIonChange={handleChange}
                      placeholder={
                        linkInBioSelectedBlockFromState.blockType ===
                        LinkInBioBlockEnum.form
                          ? 'Form Name'
                          : 'Your Title'
                      }
                    />
                  </ZIonCol>
                )}

                {/* Form Component */}
                {linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.form && (
                  <ZIonCol size='12' className='mt-4 pt-3 mb-2'>
                    <LinkInBioFormField />
                  </ZIonCol>
                )}

                {/* ✅ Submit button */}
                {linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.form && (
                  <ZIonCol size='12' className='mt-3 border-bottom__violet'>
                    <ZIonTitle className='fw-bold zaions__fs_16 ion-no-padding ms-3'>
                      ✅ Submit button
                    </ZIonTitle>
                    <div className='mb-5 mt-2'>
                      <LinkInBioTitleField
                        name='form.submitButtonText'
                        value={values.form?.submitButtonText}
                        onIonChange={handleChange}
                        placeholder='Submit button text'
                        showImageInSlot={true}
                      />
                    </div>
                  </ZIonCol>
                )}

                {/* Icon Component */}
                {linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.VCard && (
                  <ZIonCol size='12' className='mt-4 pt-2'>
                    <LinkInBioIconField
                      name='icon'
                      value={values.icon}
                      onIonChange={handleChange}
                    />
                  </ZIonCol>
                )}

                {/* Description Component */}
                {(linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.countdown ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.card ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.avatar) && (
                  <ZIonCol size='12' className='mt-4 pt-2'>
                    <LinkInBioDescriptionField
                      name='description'
                      value={values.description}
                      onIonChange={handleChange}
                    />
                  </ZIonCol>
                )}

                {/* Text area */}
                {linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.text && (
                  <ZIonCol size='12' className='mt-4 pt-2 mb-4'>
                    <ZTextEditor
                      value={values.text}
                      onChange={(_value) => {
                        setFieldValue('text', _value, false);
                      }}
                    />
                  </ZIonCol>
                )}

                {/* Upload Component */}
                {(linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.countdown ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.card ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.avatar ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.music) && (
                  <ZIonCol size='12' className='mt-4 pt-2'>
                    <LinkInBioUploadField />
                  </ZIonCol>
                )}

                {/* DateTime Component */}
                {linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.countdown && (
                  <ZIonCol size='12' className='mt-4 pt-2'>
                    <LinkInBioDateTimeField
                      name='date'
                      value={values.date}
                      onIonChange={handleChange}
                    />
                  </ZIonCol>
                )}

                {/* Timezone */}
                {linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.countdown && (
                  <ZIonCol size='12' className='mt-4 pt-2'>
                    <LinkInBioTimezoneField
                      name='timezone'
                      onChange={(_value) => {
                        setFieldValue(
                          'timezone',
                          (_value as ZaionsRSelectOptions)?.value,
                          false
                        );
                      }}
                      value={
                        formatReactSelectOption(
                          values?.timezone,
                          TIMEZONES as ZGenericObject[],
                          'label',
                          'value'
                        ) || []
                      }
                    />
                  </ZIonCol>
                )}

                {/**** Search *****/}
                {/* {(linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.RSS ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.shopify ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.magento ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.wordpress ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.map) && (
                  <ZIonCol size='12' className='mt-4 pt-2'>
                    <LinkInBioSearchField
                      placeholder={
                        linkInBioSelectedBlockFromState.blockType ===
                        LinkInBioBlockEnum.RSS
                          ? 'RSS Feed'
                          : linkInBioSelectedBlockFromState.blockType ===
                            LinkInBioBlockEnum.shopify
                          ? 'Shopify link'
                          : linkInBioSelectedBlockFromState.blockType ===
                            LinkInBioBlockEnum.magento
                          ? 'Magento link'
                          : linkInBioSelectedBlockFromState.blockType ===
                            LinkInBioBlockEnum.wordpress
                          ? 'Wordpress link'
                          : linkInBioSelectedBlockFromState.blockType ===
                            LinkInBioBlockEnum.map
                          ? 'Search an address'
                          : ''
                      }
                      searchIcon={
                        linkInBioSelectedBlockFromState.blockType ===
                        LinkInBioBlockEnum.RSS
                          ? wifiOutline
                          : linkInBioSelectedBlockFromState.blockType ===
                              LinkInBioBlockEnum.shopify ||
                            linkInBioSelectedBlockFromState.blockType ===
                              LinkInBioBlockEnum.magento ||
                            linkInBioSelectedBlockFromState.blockType ===
                              LinkInBioBlockEnum.wordpress
                          ? linkOutline
                          : ''
                      }
                    />
                  </ZIonCol>
                )} */}

                {/* RSS Feed */}
                {linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.RSS && (
                  <ZIonCol size='12' className='mt-4 pt-2'>
                    <LinkInBioSearchField
                      placeholder='RSS Feed'
                      searchIcon={wifiOutline}
                      onIonChange={({ detail }) => {
                        setFieldValue('searchString', detail.value, false);
                      }}
                      value={values?.searchString}
                    />
                  </ZIonCol>
                )}

                {/* Shopify */}
                {linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.shopify && (
                  <ZIonCol size='12' className='mt-4 pt-2'>
                    <LinkInBioSearchField
                      placeholder='Shopify link'
                      searchIcon={linkOutline}
                      onIonChange={({ detail }) => {
                        setFieldValue('searchString', detail.value, false);
                      }}
                      value={values?.searchString}
                    />
                  </ZIonCol>
                )}

                {/* Magento */}
                {linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.magento && (
                  <ZIonCol size='12' className='mt-4 pt-2'>
                    <LinkInBioSearchField
                      placeholder='Magento link'
                      searchIcon={linkOutline}
                      onIonChange={({ detail }) => {
                        setFieldValue('searchString', detail.value, false);
                      }}
                      value={values?.searchString}
                    />
                  </ZIonCol>
                )}

                {/* Wordpress */}
                {linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.wordpress && (
                  <ZIonCol size='12' className='mt-4 pt-2'>
                    <LinkInBioSearchField
                      placeholder='Wordpress link'
                      searchIcon={linkOutline}
                      onIonChange={({ detail }) => {
                        setFieldValue('searchString', detail.value, false);
                      }}
                      value={values?.searchString}
                    />
                  </ZIonCol>
                )}

                {/* Maps */}
                {linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.map && (
                  <ZIonCol size='12' className='mt-4 mt-1'>
                    <ZIonItem className='ion-item-start-no-padding'>
                      <ZRGAutoCompleteInput
                        onLocationSelectHandler={(
                          place: google.maps.places.PlaceResult
                        ) => {
                          setFieldValue(
                            'map.formattedAddress',
                            'Making a string',
                            true
                          );
                          const _lat = place.geometry?.location?.lat() || 0;
                          const _lng = place.geometry?.location?.lng() || 0;
                          console.log({
                            place,
                            userEnteredAddress: values.map.userEnteredAddress,
                            values,
                            map: values.map,
                            _lat,
                            _lng,
                          });
                          setFieldValue('map.lat', _lat, true);
                          setFieldValue('map.lng', _lng, true);
                        }}
                        inputStyles={{ width: '100%', border: 'none' }}
                        className={classNames(
                          classes['map-auto-complete-input']
                        )}
                        defaultValue={values?.map?.userEnteredAddress}
                        inputName='map.userEnteredAddress'
                      />
                    </ZIonItem>
                  </ZIonCol>
                )}

                {/* <input
                  onChange={({ target }) => {
                    setFieldValue(
                      'map.formattedAddress',
                      'Making a string',
                      true
                    );

                    console.log({
                      map: values.map,
                    });
                  }}
                  value={values.map.lat}
                /> */}

                {/* Title enable */}
                {(linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.RSS ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.shopify ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.magento ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.wordpress) && (
                  <ZIonCol size='12' className='mt-4 mt-1'>
                    <LinkInBioEnableField
                      onChange={(value) => {
                        setFieldValue('titleIsEnable', value, false);
                      }}
                      checked={values.titleIsEnable}
                    />
                  </ZIonCol>
                )}

                {/* Description enable */}
                {(linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.RSS ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.shopify ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.magento ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.wordpress) && (
                  <ZIonCol size='12' className='mt-3'>
                    <LinkInBioEnableField
                      title='Description'
                      icon={reorderFourOutline}
                      onChange={(value) => {
                        setFieldValue('descriptionIsEnable', value, false);
                      }}
                      checked={values.descriptionIsEnable}
                    />
                  </ZIonCol>
                )}

                {/* Picture enable */}
                {(linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.RSS ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.shopify ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.magento ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.wordpress) && (
                  <ZIonCol size='12' className='mt-3'>
                    <LinkInBioEnableField
                      title='Photo'
                      icon={imageOutline}
                      onChange={(value) => {
                        setFieldValue('pictureIsEnable', value, false);
                      }}
                      checked={values.pictureIsEnable}
                    />
                  </ZIonCol>
                )}

                {/* Card enable */}
                {(linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.calendar ||
                  linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.Iframe) && (
                  <ZIonCol size='12' className='mt-3'>
                    <LinkInBioEnableField
                      title='Card mode'
                      icon={cardOutline}
                      onChange={(value) => {
                        setFieldValue('cardIsEnable', value, false);
                      }}
                      checked={values.cardIsEnable}
                    />
                  </ZIonCol>
                )}

                {/* Price enable */}
                {linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.shopify && (
                  <ZIonCol size='12' className='mt-3'>
                    <LinkInBioEnableField
                      title='Price'
                      icon={cashOutline}
                      onChange={(value) => {
                        setFieldValue('priceIsEnable', value, false);
                      }}
                      checked={values.priceIsEnable}
                    />
                  </ZIonCol>
                )}

                {/* Terms checkbox */}
                {linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.form && (
                  <ZIonCol size='12' className='mt-3'>
                    <LinkInBioEnableField
                      title='Terms checkbox'
                      icon={lockClosedOutline}
                      checked={values.form?.isTermEnabled}
                      onChange={(value) => {
                        setFieldValue('form.isTermEnabled', value, false);
                      }}
                    />
                    {values.form?.isTermEnabled && (
                      <div className='mt-2 mb-2'>
                        <LinkInBioTitleField
                          name='form.termText'
                          value={values.form?.termText}
                          onIonChange={handleChange}
                          placeholder='Text'
                        />

                        <LinkInBioLinkField
                          name='form.termLink'
                          value={values.form?.termLink}
                          onIonChange={handleChange}
                          placeholder='Link to your T&C'
                          className='mt-3 pt-2'
                          showRefreshBtn={false}
                        />
                      </div>
                    )}
                  </ZIonCol>
                )}

                {/* ➖ Type  */}
                {linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.separator && (
                  <ZIonCol size='12'>
                    <ZIonTitle className='fw-bold zaions__fs_16 ion-no-padding'>
                      ➖ Type
                    </ZIonTitle>
                    <div className='mb-2 mt-2'>
                      {/* Solid */}
                      <ZRoundedButton
                        className='me-2'
                        color={
                          values.separatorType === SeparatorTypeEnum.solid
                            ? 'primary'
                            : 'medium'
                        }
                        onClick={() => {
                          setFieldValue(
                            'separatorType',
                            SeparatorTypeEnum.solid,
                            false
                          );
                        }}
                      >
                        <ZIonImg
                          src={borderSolid}
                          style={{
                            width: '22px',
                          }}
                        />
                      </ZRoundedButton>

                      {/* Dashed */}
                      <ZRoundedButton
                        className='me-2'
                        color={
                          values.separatorType === SeparatorTypeEnum.dashed
                            ? 'primary'
                            : 'medium'
                        }
                        onClick={() => {
                          setFieldValue(
                            'separatorType',
                            SeparatorTypeEnum.dashed,
                            false
                          );
                        }}
                      >
                        <ZIonImg
                          src={borderDashed}
                          style={{
                            width: '22px',
                          }}
                        />
                      </ZRoundedButton>

                      {/* Dotted */}
                      <ZRoundedButton
                        className='me-2'
                        color={
                          values.separatorType === SeparatorTypeEnum.dotted
                            ? 'primary'
                            : 'medium'
                        }
                        onClick={() => {
                          setFieldValue(
                            'separatorType',
                            SeparatorTypeEnum.dotted,
                            false
                          );
                        }}
                      >
                        <ZIonImg
                          src={borderDotted}
                          style={{
                            width: '22px',
                          }}
                        />
                      </ZRoundedButton>
                    </div>
                  </ZIonCol>
                )}

                {/* 🎨 Color  */}
                {linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.separator && (
                  <ZIonCol size='12' className='mt-4 pt-2'>
                    <ZIonTitle className='fw-bold zaions__fs_16 ion-no-padding'>
                      🎨 Color
                    </ZIonTitle>
                    <div className='mb-2'>
                      <ZaionsColorPiker
                        name='separatorColor'
                        value={values.separatorColor}
                        setFieldValueFn={setFieldValue}
                      />
                    </div>
                  </ZIonCol>
                )}

                {/* ☄️ Spacing  */}
                {linkInBioSelectedBlockFromState.blockType ===
                  LinkInBioBlockEnum.spacing && (
                  <ZIonCol size='12'>
                    <ZIonTitle className='fw-bold zaions__fs_16 ion-no-padding'>
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
                          setFieldValue('spacing', target.value, false);
                        }}
                      >
                        <ZIonIcon slot='start' icon={removeOutline} />
                        <ZIonIcon slot='end' icon={addOutline} />
                      </ZIonRange>
                    </div>
                  </ZIonCol>
                )}
              </ZIonRow>
            </ZIonCol>

            {/* 📄 vCard */}
            {linkInBioSelectedBlockFromState.blockType ===
              LinkInBioBlockEnum.VCard && <LinkInBioVCardField />}

            {/* 📏 Margin  */}
            {linkInBioSelectedBlockFromState.blockType ===
              LinkInBioBlockEnum.separator && (
              <ZIonCol
                sizeXl='11'
                sizeLg='12'
                sizeMd='12'
                sizeSm='12'
                sizeXs='12'
                className='ion-padding-vertical ion-margin-top ion-margin-start border-bottom__violet'
              >
                <ZIonTitle className='fw-bold zaions__fs_16 ion-no-padding'>
                  📏 Margin:{' '}
                  <ZIonText color='primary'>{values.separatorMargin}</ZIonText>
                </ZIonTitle>
                <div className='mb-2'>
                  <ZIonRange
                    max={40}
                    ticks={false}
                    snaps={true}
                    pin={true}
                    pinFormatter={(value: number) => value}
                    onIonChange={({ target }) => {
                      setFieldValue('separatorMargin', target.value, false);
                    }}
                  >
                    <ZIonIcon slot='start' icon={removeOutline} />
                    <ZIonIcon slot='end' icon={addOutline} />
                  </ZIonRange>
                </div>
              </ZIonCol>
            )}

            {/* 🎨 Custom appearance */}
            {(linkInBioSelectedBlockFromState.blockType ===
              LinkInBioBlockEnum.button ||
              linkInBioSelectedBlockFromState.blockType ===
                LinkInBioBlockEnum.VCard ||
              linkInBioSelectedBlockFromState.blockType ===
                LinkInBioBlockEnum.form) && (
              <ZIonCol
                size='11'
                className='ion-padding-vertical ion-margin-top ion-margin-start border-bottom__violet'
              >
                <ZIonRow>
                  <ZIonCol>
                    <ZIonTitle className='fw-bold zaions__fs_16 ion-no-padding'>
                      🎨 Custom appearance{' '}
                      <ZIonRouterLink>(help)</ZIonRouterLink>
                    </ZIonTitle>
                  </ZIonCol>

                  <ZIonCol className='ion-text-end'>
                    <ZRCSwitch
                      checked={values.customAppearance.isEnabled}
                      onChange={(_value) => {
                        setFieldValue(
                          'customAppearance.isEnabled',
                          _value,
                          false
                        );
                      }}
                    />
                  </ZIonCol>

                  {/* 🖍️ Button color */}
                  {values.customAppearance.isEnabled && (
                    <ZIonCol className='mb-2 mt-3' size='12'>
                      <div className='d-flex ion-align-items-center ion-padding-bottom'>
                        {values?.customAppearance?.background?.bgType ===
                          LinkInBioThemeBackgroundEnum.solidColor && (
                          <ZaionsColorPiker
                            name='customAppearance.background.bgSolidColor'
                            value={
                              values?.customAppearance?.background?.bgSolidColor
                            }
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
                              setFieldValueFn={setFieldValue}
                            />
                            <ZIonButton
                              shape='round'
                              className='direction-button ion-margin-horizontal mt-3'
                              color='secondary'
                              style={{
                                '--padding-top': '1.3rem',
                                '--padding-bottom': '1.3rem',
                                '--padding-start': '.7rem',
                                '--padding-end': '.7rem',
                              }}
                              onClick={() => {
                                let _newDirection =
                                  +(values?.customAppearance?.background
                                    ?.bgGradientColors?.direction as string) +
                                  +CONSTANTS.LINK_In_BIO.FORM
                                    .DIRECTION_PRE_CLICKED;
                                _newDirection =
                                  _newDirection >= 359 ? 0 : _newDirection;
                                setFieldValue(
                                  'customAppearance.background.bgGradientColors.direction',
                                  _newDirection,
                                  false
                                );
                              }}
                            >
                              <ZIonIcon
                                icon={arrowUp}
                                className='direction-icon'
                                style={{
                                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                                  transform: `rotate(${values?.customAppearance?.background?.bgGradientColors?.direction}deg)`,
                                }}
                              />
                            </ZIonButton>
                            <ZaionsColorPiker
                              name='customAppearance.background.bgGradientColors.endColor'
                              value={
                                values?.customAppearance?.background
                                  ?.bgGradientColors?.endColor
                              }
                              setFieldValueFn={setFieldValue}
                              showCloseIcon={true}
                              closeIconOnChangeFn={() => {
                                setFieldValue(
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
                            className='ion-text-capitalize mt-3 ms-4'
                            shape='round'
                            onClick={() => {
                              setFieldValue(
                                'customAppearance.background.bgType',
                                LinkInBioThemeBackgroundEnum.gradient,
                                false
                              );
                            }}
                          >
                            <ZIonIcon icon={addOutline} className='pe-2' />
                            <ZIonText>Add gradient</ZIonText>
                          </ZIonButton>
                        )}
                      </div>

                      <ZIonTitle className='fw-bold zaions__fs_16 ion-margin-top ion-no-padding'>
                        🎫 Button type
                      </ZIonTitle>
                      <ZIonRow
                        className={classNames(
                          classes['row-gap-1-point-6-rem'],
                          {
                            'ion-padding-vertical': true,
                          }
                        )}
                      >
                        {/* Filled's */}
                        <ZIonCol size='4'>
                          <ZIonButton
                            className={classNames(
                              classes['zaions-button-type'],
                              {
                                'zaions-button-type-button-active': true, // from index.css
                                'zaions-border-primary':
                                  values?.customAppearance?.buttonType ===
                                  LinkInBioButtonTypeEnum.inlineSquare,
                              }
                            )}
                            color='medium'
                            style={{
                              '--border-radius': '0',
                            }}
                            onClick={() => {
                              setFieldValue(
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
                                'zaions-border-primary':
                                  values?.customAppearance?.buttonType ===
                                  LinkInBioButtonTypeEnum.inlineRound,
                              }
                            )}
                            color='medium'
                            style={{
                              '--border-radius': '10px',
                            }}
                            onClick={() => {
                              setFieldValue(
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
                                  LinkInBioButtonTypeEnum.inlineCircle,
                              }
                            )}
                            color='medium'
                            shape='round'
                            onClick={() => {
                              setFieldValue(
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
                                'zaions-border-primary':
                                  values?.customAppearance?.buttonType ===
                                  LinkInBioButtonTypeEnum.inlineSquareOutline,
                              }
                            )}
                            color={
                              values?.customAppearance?.buttonType ===
                              LinkInBioButtonTypeEnum.inlineSquareOutline
                                ? 'primary'
                                : 'medium'
                            }
                            style={{
                              '--border-radius': '0',
                            }}
                            fill='outline'
                            onClick={() => {
                              setFieldValue(
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
                                'zaions-border-primary':
                                  values?.customAppearance?.buttonType ===
                                  LinkInBioButtonTypeEnum.inlineRoundOutline,
                              }
                            )}
                            color={
                              values?.customAppearance?.buttonType ===
                              LinkInBioButtonTypeEnum.inlineRoundOutline
                                ? 'primary'
                                : 'medium'
                            }
                            style={{
                              '--border-radius': '10px',
                            }}
                            fill='outline'
                            onClick={() => {
                              setFieldValue(
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
                                  LinkInBioButtonTypeEnum.inlineCircleOutline,
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
                              setFieldValue(
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
                                'zaions-border-transparent':
                                  values?.customAppearance?.buttonType !==
                                  LinkInBioButtonTypeEnum.inlineSquareShadow,
                                'zaions-border-primary':
                                  values?.customAppearance?.buttonType ===
                                  LinkInBioButtonTypeEnum.inlineSquareShadow,
                              }
                            )}
                            color='medium'
                            style={{
                              '--border-radius': '0',
                            }}
                            onClick={() => {
                              setFieldValue(
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
                                'zaions-border-transparent':
                                  values?.customAppearance?.buttonType !==
                                  LinkInBioButtonTypeEnum.inlineRoundShadow,
                                'zaions-border-primary':
                                  values?.customAppearance?.buttonType ===
                                  LinkInBioButtonTypeEnum.inlineRoundShadow,
                              }
                            )}
                            color='medium'
                            style={{
                              '--border-radius': '10px',
                            }}
                            onClick={() => {
                              setFieldValue(
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
                                  LinkInBioButtonTypeEnum.inlineCircleShadow,
                              }
                            )}
                            color='medium'
                            shape='round'
                            onClick={() => {
                              setFieldValue(
                                'customAppearance.buttonType',
                                LinkInBioButtonTypeEnum.inlineCircleShadow,
                                false
                              );
                            }}
                          />
                        </ZIonCol>

                        {/* Shadow Color */}
                        <ZIonCol size='12' className='mt-3'>
                          {values?.customAppearance?.buttonType &&
                            [
                              LinkInBioButtonTypeEnum.inlineSquareShadow,
                              LinkInBioButtonTypeEnum.inlineRoundShadow,
                              LinkInBioButtonTypeEnum.inlineCircleShadow,
                            ].includes(
                              values?.customAppearance?.buttonType
                            ) && (
                              <ZaionsColorPiker
                                name='customAppearance.shadowColor'
                                value={values?.customAppearance?.shadowColor}
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
            {(linkInBioSelectedBlockFromState.blockType ===
              LinkInBioBlockEnum.RSS ||
              linkInBioSelectedBlockFromState.blockType ===
                LinkInBioBlockEnum.shopify ||
              linkInBioSelectedBlockFromState.blockType ===
                LinkInBioBlockEnum.magento ||
              linkInBioSelectedBlockFromState.blockType ===
                LinkInBioBlockEnum.wordpress) && (
              <ZIonCol
                size='11'
                className='ion-padding-vertical ion-margin-top ion-margin-start border-bottom__violet'
              >
                <ZIonTitle className='fw-bold zaions__fs_16 ion-no-padding'>
                  🗃️ Card number: <ZIonText color='primary'>10</ZIonText>
                </ZIonTitle>
                <div className='mb-2'>
                  <ZIonRange
                    max={25}
                    ticks={true}
                    snaps={true}
                    pin={true}
                    pinFormatter={(value: number) => value}
                  >
                    <ZIonIcon slot='start' icon={removeOutline} />
                    <ZIonIcon slot='end' icon={addOutline} />
                  </ZIonRange>
                </div>
              </ZIonCol>
            )}

            {/* ✨ Style */}
            {(linkInBioSelectedBlockFromState.blockType ===
              LinkInBioBlockEnum.countdown ||
              linkInBioSelectedBlockFromState.blockType ===
                LinkInBioBlockEnum.card ||
              linkInBioSelectedBlockFromState.blockType ===
                LinkInBioBlockEnum.carousel ||
              linkInBioSelectedBlockFromState.blockType ===
                LinkInBioBlockEnum.RSS ||
              linkInBioSelectedBlockFromState.blockType ===
                LinkInBioBlockEnum.shopify ||
              linkInBioSelectedBlockFromState.blockType ===
                LinkInBioBlockEnum.wordpress ||
              linkInBioSelectedBlockFromState.blockType ===
                LinkInBioBlockEnum.magento ||
              linkInBioSelectedBlockFromState.blockType ===
                LinkInBioBlockEnum.avatar) && (
              <ZIonCol
                sizeXl='11'
                sizeLg='12'
                sizeMd='12'
                sizeSm='12'
                sizeXs='12'
                className='ion-padding-vertical ion-margin-top ion-margin-start border-bottom__violet'
              >
                <ZIonTitle className='fw-bold zaions__fs_16 ion-no-padding mb-3'>
                  ✨ Style
                </ZIonTitle>
                <div className='ion-padding-bottom mb-2'>
                  {linkInBioSelectedBlockFromState.blockType !==
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
                          setFieldValue(
                            'style',
                            LinkInBioCardStyleEnum.horizontal,
                            false
                          );
                        }}
                      >
                        <ZIonImg
                          src={card_style_1}
                          style={{
                            width: '22px',
                          }}
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
                          setFieldValue(
                            'style',
                            LinkInBioCardStyleEnum.vertical,
                            false
                          );
                        }}
                      >
                        <ZIonImg
                          src={card_style_2}
                          style={{
                            width: '22px',
                          }}
                        />
                      </ZRoundedButton>
                    </>
                  )}

                  {(linkInBioSelectedBlockFromState.blockType ===
                    LinkInBioBlockEnum.card ||
                    linkInBioSelectedBlockFromState.blockType ===
                      LinkInBioBlockEnum.carousel ||
                    linkInBioSelectedBlockFromState.blockType ===
                      LinkInBioBlockEnum.RSS ||
                    linkInBioSelectedBlockFromState.blockType ===
                      LinkInBioBlockEnum.shopify ||
                    linkInBioSelectedBlockFromState.blockType ===
                      LinkInBioBlockEnum.magento ||
                    linkInBioSelectedBlockFromState.blockType ===
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
                          setFieldValue(
                            'style',
                            LinkInBioCardStyleEnum.thumbRound,
                            false
                          );
                        }}
                      >
                        <ZIonImg
                          src={thumb_style_1}
                          style={{
                            width: '22px',
                          }}
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
                          setFieldValue(
                            'style',
                            LinkInBioCardStyleEnum.thumbCircle,
                            false
                          );
                        }}
                      >
                        <ZIonImg
                          src={thumb_style_2}
                          style={{
                            width: '22px',
                          }}
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
                          setFieldValue(
                            'style',
                            LinkInBioCardStyleEnum.thumbStrip,
                            false
                          );
                        }}
                      >
                        <ZIonImg
                          src={strip_style}
                          style={{
                            width: '22px',
                          }}
                        />
                      </ZRoundedButton>
                    </>
                  )}
                  {linkInBioSelectedBlockFromState.blockType ===
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
                          setFieldValue(
                            'style',
                            LinkInBioCardStyleEnum.circle,
                            false
                          );
                        }}
                      >
                        <ZIonImg
                          src={strip_style}
                          style={{
                            width: '22px',
                          }}
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
                          setFieldValue(
                            'style',
                            LinkInBioCardStyleEnum.square,
                            false
                          );
                        }}
                      >
                        <ZIonImg
                          src={strip_style}
                          style={{
                            width: '22px',
                          }}
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
                          setFieldValue(
                            'style',
                            LinkInBioCardStyleEnum.album,
                            false
                          );
                        }}
                      >
                        <ZIonImg
                          src={strip_style}
                          style={{
                            width: '22px',
                          }}
                        />
                      </ZRoundedButton>
                    </>
                  )}
                </div>
              </ZIonCol>
            )}

            {/* 👓 View */}
            {(linkInBioSelectedBlockFromState.blockType ===
              LinkInBioBlockEnum.magento ||
              linkInBioSelectedBlockFromState.blockType ===
                LinkInBioBlockEnum.wordpress ||
              linkInBioSelectedBlockFromState.blockType ===
                LinkInBioBlockEnum.shopify ||
              linkInBioSelectedBlockFromState.blockType ===
                LinkInBioBlockEnum.RSS ||
              linkInBioSelectedBlockFromState.blockType ===
                LinkInBioBlockEnum.carousel) && (
              <ZIonCol
                sizeXl='11'
                sizeLg='12'
                sizeMd='12'
                sizeSm='12'
                sizeXs='12'
                className='ion-padding-vertical ion-margin-top ion-margin-start border-bottom__violet'
              >
                <ZIonTitle className='fw-bold zaions__fs_16 ion-no-padding mb-3'>
                  👓 View
                </ZIonTitle>
                <div className='ion-padding-bottom mb-2'>
                  <ZRoundedButton
                    className='me-2'
                    color={
                      values.view === LinkInBioCardViewEnum.carousel
                        ? 'primary'
                        : 'medium'
                    }
                    onClick={() => {
                      setFieldValue(
                        'view',
                        LinkInBioCardViewEnum.carousel,
                        false
                      );
                    }}
                  >
                    <ZIonImg
                      src={carousel_view}
                      style={{
                        width: '22px',
                      }}
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
                      setFieldValue('view', LinkInBioCardViewEnum.list, false);
                    }}
                  >
                    <ZIonImg
                      src={list_view}
                      style={{
                        width: '22px',
                      }}
                    />
                  </ZRoundedButton>

                  <ZRoundedButton
                    className='me-2'
                    color={
                      values.view === LinkInBioCardViewEnum.mixed
                        ? 'primary'
                        : 'medium'
                    }
                    onClick={() => {
                      setFieldValue('view', LinkInBioCardViewEnum.mixed, false);
                    }}
                  >
                    <ZIonImg
                      src={mixed_view}
                      style={{
                        width: '22px',
                      }}
                    />
                  </ZRoundedButton>
                </div>
              </ZIonCol>
            )}

            {/* 🎈 Animation */}
            {(linkInBioSelectedBlockFromState.blockType ===
              LinkInBioBlockEnum.button ||
              linkInBioSelectedBlockFromState.blockType ===
                LinkInBioBlockEnum.text ||
              linkInBioSelectedBlockFromState.blockType ===
                LinkInBioBlockEnum.countdown ||
              linkInBioSelectedBlockFromState.blockType ===
                LinkInBioBlockEnum.card ||
              linkInBioSelectedBlockFromState.blockType ===
                LinkInBioBlockEnum.carousel ||
              linkInBioSelectedBlockFromState.blockType ===
                LinkInBioBlockEnum.music ||
              linkInBioSelectedBlockFromState.blockType ===
                LinkInBioBlockEnum.QAndA ||
              linkInBioSelectedBlockFromState.blockType ===
                LinkInBioBlockEnum.messenger ||
              linkInBioSelectedBlockFromState.blockType ===
                LinkInBioBlockEnum.form ||
              linkInBioSelectedBlockFromState.blockType ===
                LinkInBioBlockEnum.social ||
              linkInBioSelectedBlockFromState.blockType ===
                LinkInBioBlockEnum.VCard) && (
              <ZIonCol
                sizeXl='11'
                sizeLg='12'
                sizeMd='12'
                sizeSm='12'
                sizeXs='12'
                className='ion-padding-vertical ion-margin-top ion-margin-start border-bottom__violet'
              >
                <ZIonRow className='ion-padding-bottom mb-2'>
                  <ZIonCol>
                    <ZIonTitle className='fw-bold zaions__fs_16 ion-no-padding'>
                      🎈 Animation <ZIonRouterLink>(help)</ZIonRouterLink>
                    </ZIonTitle>
                  </ZIonCol>

                  <ZIonCol className='ion-text-end'>
                    <ZRCSwitch
                      checked={values.animation.isEnabled}
                      onChange={(_value) => {
                        setFieldValue('animation.isEnabled', _value, false);
                      }}
                    />
                  </ZIonCol>

                  {values.animation.isEnabled && (
                    <ZIonCol size='12' className='mt-3'>
                      <ZRoundedButton
                        className='me-2'
                        color={
                          values.animation.type ===
                          LinkInBioBlockAnimationEnum.tada
                            ? 'primary'
                            : 'medium'
                        }
                        onClick={() => {
                          setFieldValue(
                            'animation.type',
                            LinkInBioBlockAnimationEnum.tada,
                            false
                          );
                        }}
                      >
                        <ZIonImg
                          src={tadaAnimation}
                          style={{
                            width: '22px',
                          }}
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
                          setFieldValue(
                            'animation.type',
                            LinkInBioBlockAnimationEnum.shake,
                            false
                          );
                        }}
                      >
                        <ZIonImg
                          src={shakeAnimation}
                          style={{
                            width: '22px',
                          }}
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
                          setFieldValue(
                            'animation.type',
                            LinkInBioBlockAnimationEnum.swing,
                            false
                          );
                        }}
                      >
                        <ZIonImg
                          src={swingAnimation}
                          style={{
                            width: '22px',
                          }}
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
                          setFieldValue(
                            'animation.type',
                            LinkInBioBlockAnimationEnum.wobble,
                            false
                          );
                        }}
                      >
                        <ZIonImg
                          src={wobbleAnimation}
                          style={{
                            width: '22px',
                          }}
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
                          setFieldValue(
                            'animation.type',
                            LinkInBioBlockAnimationEnum.jello,
                            false
                          );
                        }}
                      >
                        <ZIonImg
                          src={jelloAnimation}
                          style={{
                            width: '22px',
                          }}
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
                          setFieldValue(
                            'animation.type',
                            LinkInBioBlockAnimationEnum.pulse,
                            false
                          );
                        }}
                      >
                        <ZIonImg
                          src={pulseAnimation}
                          style={{
                            width: '22px',
                          }}
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
                          setFieldValue(
                            'animation.type',
                            LinkInBioBlockAnimationEnum.zoom,
                            false
                          );
                        }}
                      >
                        <ZIonImg
                          src={zoomAnimation}
                          style={{
                            width: '22px',
                          }}
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
              className='ion-padding-vertical ion-margin-top ion-margin-horizontal'
            >
              <ZIonRow className='ion-margin-bottom'>
                <ZIonCol>
                  <ZIonTitle className='fw-bold zaions__fs_16 ion-no-padding'>
                    ⏱ Schedule <ZIonRouterLink>(help)</ZIonRouterLink>
                  </ZIonTitle>
                </ZIonCol>

                <ZIonCol className='ion-text-end'>
                  <ZRCSwitch
                    checked={values.schedule.isEnabled}
                    onChange={(_value) => {
                      setFieldValue('schedule.isEnabled', _value, false);
                    }}
                  />
                </ZIonCol>

                {values.schedule.isEnabled && (
                  <ZIonCol size='12' className='mt-3'>
                    <ZIonRow>
                      <ZIonCol size='5.9' className='me-2'>
                        {/* <ZIonItem className='ion-no-padding ion-no-margin'> */}
                        <ZIonLabel className='ms-2 fw-bold'>
                          Start at:
                        </ZIonLabel>
                        <ZIonDatetimeButton
                          name='schedule.startAt'
                          className='ion-justify-content-start mt-2 zaions-datetime-btn'
                          onIonChange={({ target }) => {
                            setFieldValue(
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
                        <ZIonLabel className='ms-2 fw-bold'>End at:</ZIonLabel>
                        <ZIonDatetimeButton
                          className='ion-justify-content-start mt-2 zaions-datetime-btn'
                          name='schedule.endAt'
                          onIonChange={({ target }) => {
                            setFieldValue(
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
