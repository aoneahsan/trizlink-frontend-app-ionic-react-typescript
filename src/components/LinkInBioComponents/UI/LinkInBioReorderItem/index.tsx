/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';
import { useLocation, useParams } from 'react-router';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import routeQueryString from 'qs';
import { appsOutline, createOutline } from 'ionicons/icons';
import { useFormikContext } from 'formik';
import { type OverlayEventDetail } from '@ionic/core';
import { useRecoilState } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCol,
  ZIonIcon,
  ZIonItem,
  ZIonReorder,
  ZIonText
} from '@/components/ZIonComponents';
import ZLinkInBioAvatarBlock from '@/components/LinkInBioComponents/UI/AvatarBlock';
import ZLinkInBioButtonBlock from '@/components/LinkInBioComponents/UI/ButtonBlock';
import ZLinkInBioTextBlock from '@/components/LinkInBioComponents/UI/TextBlock';
import ZLinkInBioRSSBlock from '@/components/LinkInBioComponents/UI/ZLinkInBioRSSBlock';
import ZLinkInBioCalendarBlock from '@/components/LinkInBioComponents/UI/CalendarBlock';
import ZCountdown from '@/components/CustomComponents/ZCountDown';
import ZVideoBlock from '@/components/LinkInBioComponents/UI/VideoBlock';
import ZAudioBlock from '@/components/LinkInBioComponents/UI/AudioBlock';

import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import {
  useZGetRQCacheData,
  useZRQDeleteRequest,
  useZRQGetRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';
import { useZValidateRequestResponse } from '@/ZaionsHooks/zapi-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { reportCustomError } from '@/utils/customErrorType';
import {
  _getQueryKey,
  createRedirectRoute,
  extractInnerData,
  generatePredefinedThemeBackgroundValue,
  isZNonEmptyString,
  isZNonEmptyStrings
} from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import CONSTANTS, { PRODUCT_NAME } from '@/utils/constants';
import {
  API_URL_ENUM,
  ZWSTypeEum,
  extractInnerDataOptionsEnum
} from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  LinkInBioButtonTypeEnum,
  type LinkInBioThemeBackgroundType,
  type LinkInBioType,
  ZLinkInBioPageEnum,
  ZLinkInBioRHSComponentEnum
} from '@/types/AdminPanel/linkInBioType';
import {
  LinkInBioBlockEnum,
  type LinkInBioBlockFromType
} from '@/types/AdminPanel/linkInBioType/blockTypes';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { LinkInBioBlocksRState } from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioBlocksState';
import ZCarouselBlock from '../ZCarouselBlock';
import ZCustomDeleteComponent from '@/components/CustomComponents/ZCustomDeleteComponent';
import ZLinkInBioMusicBlock from '../MusicBlock';
import ZLinkInBioSocialBlock from '../SocialBlock';
import ZLinkInBioSeparatorBlock from '../SeparatorBlock';
import ZLinkInBioMessengerBlock from '../MessengerBlock';
import ZLinkInBioQAndABlock from '../QAndABlock';
import ZLinkInBioVCardBlock from '../VCardBlock';
import ZLinkInBioFormBlock from '../FromBlock';
import ZLinkInBioMapBlock from '../MapBlock';
import classNames from 'classnames';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import ZCustomCard from '@/components/CustomComponents/ZCustomCard';
import { ZMediaEnum } from '@/types/zaionsAppSettings.type';

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

interface ZLinkInBioReorderItemInterface {
  element: LinkInBioBlockFromType;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZLinkInBioReorderItem: React.FC<ZLinkInBioReorderItemInterface> = ({
  element
}) => {
  const location = useLocation();

  // IonActionSheet present went user went to delete a block.

  // validate the request. this hook will show success notification if the request->success is true and show error notification if request->success is false.
  const { validateRequestResponse } = useZValidateRequestResponse();

  // For redirection.
  const { zNavigatePushRoute } = useZNavigate();

  // getting search param from url with the help of 'qs' package.
  const routeQSearchParams = routeQueryString.parse(location.search, {
    ignoreQueryPrefix: true
  });

  const [linkInBioBlockState, setLinkInBioBlockState] = useRecoilState(
    LinkInBioBlocksRState
  );

  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();

  // link-in-bio id get from route(url).
  const { linkInBioId, workspaceId, wsShareId, shareWSMemberId } = useParams<{
    linkInBioId?: string;
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  // fetching link-in-bio with the linkInBioId data from backend.
  const { data: selectedLinkInBio } = useZRQGetRequest<LinkInBioType>({
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
      isZNonEmptyStrings([workspaceId, linkInBioId]) ||
      isZNonEmptyStrings([wsShareId, shareWSMemberId, linkInBioId])
    ),
    _extractType: ZRQGetRequestExtractEnum.extractItem
  });

  const { setFieldValue } = useFormikContext<LinkInBioType>();

  // delete link-in-bio block api where use went to delete the block on preview panel and click on the delete button in ActionSheet (useZIonActionSheet) the deleteBlockHandler will execute with will hit this api and delete the block.
  const { mutateAsync: deleteLinkInBioBlockMutate } = useZRQDeleteRequest({
    _url: API_URL_ENUM.linkInBioBlock_delete_update_get
  });

  // delete block function.
  const deleteBlockHandler = async (
    detail: OverlayEventDetail<unknown>
  ): Promise<void> => {
    try {
      if (
        detail?.role === 'destructive' &&
        element?.id !== null &&
        element?.id !== undefined
      ) {
        const _updateLinkInBioBlockState = linkInBioBlockState.filter(
          el => el.id !== element.id
        );

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
              element.id
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
            el => el.id !== element.id
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

          setLinkInBioBlockState(_updateLinkInBioBlockState);

          if (
            element.id === (routeQSearchParams as { blockId: string })?.blockId
          ) {
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
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  // Edit block function this will execute when user went to edit the block and click on the pencil button present in every block side by side of delete button, this will navigate the user to block form page where from route the the blockID will be get and the data of that id will fetch from backend and placed as initial value.
  const blockEditHandler = (): void => {
    try {
      void setFieldValue('LinkInBioBlock', element?.blockType, false);

      zNavigatePushRoute(
        createRedirectRoute({
          url: isZNonEmptyString(workspaceId)
            ? ZaionsRoutes.AdminPanel.LinkInBio.Edit
            : isZNonEmptyString(wsShareId) && isZNonEmptyString(shareWSMemberId)
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
            step: ZLinkInBioRHSComponentEnum.blockForm,
            blockId: element?.id ?? ''
          }
        })
      );
    } catch (error) {
      reportCustomError(error);
    }
  };

  // ----- Buttons Types ----- //
  // Outlines.
  const currentBlockCustomAppearanceButtonOutlineType =
    element.blockContent?.customAppearance?.buttonType != null &&
    [
      LinkInBioButtonTypeEnum.inlineSquareOutline,
      LinkInBioButtonTypeEnum.inlineRoundOutline,
      LinkInBioButtonTypeEnum.inlineCircleOutline
    ].includes(element.blockContent?.customAppearance.buttonType);

  const linkInBioThemeButtonOutlineType =
    selectedLinkInBio?.theme?.button?.type != null &&
    [
      LinkInBioButtonTypeEnum.inlineSquareOutline,
      LinkInBioButtonTypeEnum.inlineRoundOutline,
      LinkInBioButtonTypeEnum.inlineCircleOutline
    ].includes(selectedLinkInBio?.theme?.button?.type);

  // Square
  const currentBlockCustomAppearanceButtonSquareType =
    element.blockContent?.customAppearance?.buttonType != null &&
    [
      LinkInBioButtonTypeEnum.inlineSquare,
      LinkInBioButtonTypeEnum.inlineSquareOutline,
      LinkInBioButtonTypeEnum.inlineSquareShadow
    ].includes(element.blockContent?.customAppearance.buttonType);

  const linkInBioThemeButtonSquareType =
    selectedLinkInBio?.theme?.button?.type != null &&
    [
      LinkInBioButtonTypeEnum.inlineSquare,
      LinkInBioButtonTypeEnum.inlineSquareOutline,
      LinkInBioButtonTypeEnum.inlineSquareShadow
    ].includes(selectedLinkInBio?.theme?.button?.type);

  // Circle
  const currentBlockCustomAppearanceButtonCircleType =
    element.blockContent?.customAppearance?.buttonType != null &&
    [
      LinkInBioButtonTypeEnum.inlineCircle,
      LinkInBioButtonTypeEnum.inlineCircleOutline,
      LinkInBioButtonTypeEnum.inlineCircleShadow
    ].includes(element.blockContent?.customAppearance.buttonType);

  const linkInBioThemeButtonCircleType =
    selectedLinkInBio?.theme?.button?.type != null &&
    [
      LinkInBioButtonTypeEnum.inlineCircle,
      LinkInBioButtonTypeEnum.inlineCircleOutline,
      LinkInBioButtonTypeEnum.inlineCircleShadow
    ].includes(selectedLinkInBio?.theme?.button?.type);

  // Shadow
  const currentBlockCustomAppearanceButtonShadowType =
    element.blockContent?.customAppearance?.buttonType != null &&
    [
      LinkInBioButtonTypeEnum.inlineSquareShadow,
      LinkInBioButtonTypeEnum.inlineRoundShadow,
      LinkInBioButtonTypeEnum.inlineCircleShadow
    ].includes(element.blockContent?.customAppearance.buttonType);

  const linkInBioThemeButtonShadowType =
    selectedLinkInBio?.theme?.button?.type != null &&
    [
      LinkInBioButtonTypeEnum.inlineSquareShadow,
      LinkInBioButtonTypeEnum.inlineRoundShadow,
      LinkInBioButtonTypeEnum.inlineCircleShadow
    ].includes(selectedLinkInBio?.theme?.button?.type);

  // ----- Buttons style ----- //

  const _buttonOutlineStyle = {
    '--background': 'transparent',
    '--border-color': '#fff',
    '--border-width': '1px',
    '--border-style': 'solid',
    '--box-shadow': 'none'
  };

  const _buttonStyle =
    element.blockContent?.customAppearance?.isEnabled === true
      ? currentBlockCustomAppearanceButtonOutlineType
        ? _buttonOutlineStyle
        : generatePredefinedThemeBackgroundValue(
            element.blockContent?.customAppearance
              .background as LinkInBioThemeBackgroundType
          )
      : linkInBioThemeButtonOutlineType
      ? _buttonOutlineStyle
      : generatePredefinedThemeBackgroundValue(
          selectedLinkInBio?.theme?.button
            ?.background as LinkInBioThemeBackgroundType
        );

  // ----- Buttons Fill value ----- //
  const _buttonFillValue =
    element.blockContent?.customAppearance?.isEnabled === true
      ? currentBlockCustomAppearanceButtonOutlineType
        ? 'outline'
        : 'default'
      : linkInBioThemeButtonOutlineType
      ? 'outline'
      : 'default';

  // #region Comp Constants
  const zIonItemStyle = {
    opacity: element.isActive ?? false ? '1' : '0.4'
  };

  const zCustomDeleteComponentData = { id: element?.id as string };

  const zLinkInBioButtonBlockStyle = {
    ..._buttonStyle,
    '--box-shadow':
      element.blockContent?.customAppearance?.isEnabled === true
        ? currentBlockCustomAppearanceButtonShadowType
          ? `6px 6px ${
              element.blockContent?.customAppearance?.shadowColor ??
              CONSTANTS.LINK_In_BIO.INITIAL_VALUES.BUTTON_SHADOW_COLOR
            }`
          : ''
        : linkInBioThemeButtonShadowType
        ? `6px 6px ${
            selectedLinkInBio?.theme?.button?.shadowColor ??
            CONSTANTS.LINK_In_BIO.INITIAL_VALUES.BUTTON_SHADOW_COLOR
          }`
        : ''
  };

  const zIonColStyle = {
    height: `${element.blockContent?.spacing as number}px`
  };
  // #endregion

  return (
    <ZIonItem
      className={classNames({
        'my-4 zaions-linkInBio-block z-ion-bg-transparent': true,
        zaions__light_bg_opacity_point_2:
          element.id === (routeQSearchParams as { blockId: string }).blockId
      })}
      style={zIonItemStyle}
      data-block-id={element.id}>
      <ZCustomDeleteComponent
        deleteFn={deleteBlockHandler}
        data={zCustomDeleteComponentData}
        className='ion-no-padding me-1'
        slot='start'
        iconColor='light'
      />

      <ZIonButton
        className='ion-no-padding me-0 ms-3'
        slot='start'
        fill='clear'
        size='large'
        onClick={() => {
          blockEditHandler();
        }}>
        <ZIonText>
          <ZIonIcon
            icon={createOutline}
            color='light'
            className='w-6 h-6 me-2'
          />
        </ZIonText>
      </ZIonButton>

      {/* <div
        className={classNames(
          element.blockContent?.animation?.isEnabled === true
            ? element.blockContent?.animation?.type
            : undefined,
          {
            'animated ':
              element.blockContent?.animation?.isEnabled === true &&
              isZNonEmptyString(element.blockContent?.animation?.type)
          }
        )}> */}
      {element?.blockType === LinkInBioBlockEnum.avatar ? (
        <ZLinkInBioAvatarBlock />
      ) : element?.blockType === LinkInBioBlockEnum.text ? (
        <ZLinkInBioTextBlock
          // eslint-disable-next-line react/no-children-prop
          children={element.blockContent?.text ?? 'text'}
          fontFamily={selectedLinkInBio?.theme?.font}
          animationType={
            element.blockContent?.animation?.isEnabled === true
              ? element.blockContent?.animation?.type
              : undefined
          }
        />
      ) : element?.blockType === LinkInBioBlockEnum.card ? (
        <ZCustomCard
          mediaType={ZMediaEnum.image}
          title={element.blockContent?.title}
          description={element.blockContent?.description}
          image={element.blockContent?.imageUrl}
          type={element.blockContent?.style}
        />
      ) : element?.blockType === LinkInBioBlockEnum.button ? (
        <ZLinkInBioButtonBlock
          fontFamily={selectedLinkInBio?.theme?.font}
          style={zLinkInBioButtonBlockStyle}
          title={element.blockContent?.title ?? 'button'}
          url={element.blockContent?.target?.url}
          // TODO: make this a option in frontend, so user will be able to select whether to open the link in new tab or not - (will be theme and block wise)
          target='_blank'
          animationType={
            element.blockContent?.animation?.isEnabled === true
              ? element.blockContent?.animation?.type
              : undefined
          }
          fill={_buttonFillValue}
          className={classNames({
            // inlineSquare
            inlineSquare:
              element.blockContent?.customAppearance?.isEnabled === true
                ? currentBlockCustomAppearanceButtonSquareType
                : linkInBioThemeButtonSquareType,
            // inlineRound
            inlineRound:
              element.blockContent?.customAppearance?.isEnabled === true
                ? element.blockContent?.customAppearance?.buttonType != null &&
                  [
                    LinkInBioButtonTypeEnum.inlineRound,
                    LinkInBioButtonTypeEnum.inlineRoundOutline,
                    LinkInBioButtonTypeEnum.inlineRoundShadow
                  ].includes(element.blockContent?.customAppearance.buttonType)
                : selectedLinkInBio?.theme?.button?.type != null &&
                  [
                    LinkInBioButtonTypeEnum.inlineRound,
                    LinkInBioButtonTypeEnum.inlineRoundOutline,
                    LinkInBioButtonTypeEnum.inlineRoundShadow
                  ].includes(selectedLinkInBio?.theme?.button?.type),

            // inlineCircle
            'border-radius__100vmax':
              element.blockContent?.customAppearance?.isEnabled === true
                ? currentBlockCustomAppearanceButtonCircleType
                : linkInBioThemeButtonCircleType
          })}
        />
      ) : element?.blockType === LinkInBioBlockEnum.RSS ? (
        <ZLinkInBioRSSBlock
          data={element.blockContent?.cardItems}
          cardStyle={element.blockContent?.style}
        />
      ) : element?.blockType === LinkInBioBlockEnum.calendar ? (
        <ZLinkInBioCalendarBlock fontFamily={selectedLinkInBio?.theme?.font} />
      ) : element?.blockType === LinkInBioBlockEnum.countdown ? (
        <>
          {element.blockContent?.imageUrl !== undefined &&
          element.blockContent?.imageUrl?.trim()?.length > 0 ? (
            <ZCustomCard
              mediaType={ZMediaEnum.countDown}
              title={element.blockContent?.title}
              description={element.blockContent?.description}
              mediaLink={element.blockContent?.imageUrl}
              type={element.blockContent?.style}
              countDownTime={element.blockContent?.date}
              animationType={
                element.blockContent?.animation?.isEnabled === true
                  ? element.blockContent?.animation?.type
                  : undefined
              }
            />
          ) : (
            <div
              className={classNames(
                element.blockContent?.animation?.isEnabled === true
                  ? element.blockContent?.animation?.type
                  : undefined,
                {
                  'w-full h-full': true,
                  'animated ':
                    element.blockContent?.animation?.isEnabled === true &&
                    isZNonEmptyString(element.blockContent?.animation?.type)
                }
              )}>
              <ZCountdown countDownTime={element.blockContent?.date} />
            </div>
          )}
        </>
      ) : element?.blockType === LinkInBioBlockEnum.video ? (
        <ZVideoBlock
          videoLink={element.blockContent?.target?.url}
          title={element.blockContent?.title}
        />
      ) : element?.blockType === LinkInBioBlockEnum.audio ? (
        <ZAudioBlock
          audioLink={element.blockContent?.target?.url}
          title={element.blockContent?.title}
        />
      ) : element?.blockType === LinkInBioBlockEnum.carousel ? (
        <ZCarouselBlock
          data={element.blockContent?.cardItems}
          cardStyle={element.blockContent?.style}
        />
      ) : element?.blockType === LinkInBioBlockEnum.music ? (
        <ZLinkInBioMusicBlock
          fontFamily={selectedLinkInBio?.theme?.font}
          musicBlockData={element.blockContent?.cardItems}
        />
      ) : element?.blockType === LinkInBioBlockEnum.social ? (
        <ZLinkInBioSocialBlock
          socialBlockData={element.blockContent?.cardItems}
        />
      ) : element?.blockType === LinkInBioBlockEnum.spacing ? (
        <ZIonCol style={zIonColStyle} />
      ) : element?.blockType === LinkInBioBlockEnum.separator ? (
        <ZLinkInBioSeparatorBlock
          _borderColor={element.blockContent?.separatorColor}
          _borderStyle={element.blockContent?.separatorType}
          _marginVertical={element.blockContent?.separatorMargin}
        />
      ) : element?.blockType === LinkInBioBlockEnum.messenger ? (
        <ZLinkInBioMessengerBlock
          messengerBlockData={element.blockContent?.cardItems}
          fontFamily={selectedLinkInBio?.theme?.font}
        />
      ) : element?.blockType === LinkInBioBlockEnum.QAndA ? (
        <ZLinkInBioQAndABlock
          QAndABlockData={element.blockContent?.cardItems}
          fontFamily={selectedLinkInBio?.theme?.font}
        />
      ) : element?.blockType === LinkInBioBlockEnum.VCard ? (
        <ZLinkInBioVCardBlock
          VCardBlockData={element.blockContent?.vcard}
          title={element.blockContent?.title}
          // icon={element.blockContent?.icon}
        />
      ) : element?.blockType === LinkInBioBlockEnum.form ? (
        <ZLinkInBioFormBlock
          fromBlockData={element.blockContent?.form}
          fontFamily={selectedLinkInBio?.theme?.font}
        />
      ) : element?.blockType === LinkInBioBlockEnum.map ? (
        <ZLinkInBioMapBlock
          mapId={`${PRODUCT_NAME}-map-block-${element.id ?? ''}`}
          latitude={element.blockContent?.map?.lat}
          longitude={element.blockContent?.map?.lng}
        />
      ) : (
        ''
      )}
      {/* </div> */}

      <ZIonReorder
        slot='end'
        className='ms-3'>
        <ZIonIcon
          icon={appsOutline}
          color='light'
          className='w-6 h-6'
        />
      </ZIonReorder>
    </ZIonItem>
  );
};

export default ZLinkInBioReorderItem;
