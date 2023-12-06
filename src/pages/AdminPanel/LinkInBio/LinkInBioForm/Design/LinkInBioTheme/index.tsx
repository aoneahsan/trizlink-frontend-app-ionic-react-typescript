/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { lazy, Suspense } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import { addOutline, arrowUp } from 'ionicons/icons';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCol,
  ZIonGrid,
  ZIonIcon,
  ZIonRow,
  ZIonSkeletonText,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';
import { ZFallbackIonSpinner2 } from '@/components/CustomComponents/FallbackSpinner';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM, ZWSTypeEum } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import {
  _getQueryKey,
  formatReactSelectOption,
  generatePredefinedThemeBackgroundValue,
  isZNonEmptyString,
  isZNonEmptyStrings
} from '@/utils/helpers';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  type LinkInBioBgGradientColorsInterface,
  LinkInBioButtonTypeEnum,
  type LinkInBioPredefinedThemeType,
  LinkInBioThemeBackgroundEnum,
  type LinkInBioThemeBackgroundType,
  type LinkInBioType
} from '@/types/AdminPanel/linkInBioType';
import { type ZGenericObject } from '@/types/zaionsAppSettings.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { type ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { LinkInBioFontFamilyRState } from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioFontFamilyState';

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */
import classes from '../styles.module.css';
const ZaionsRSelect = lazy(
  () => import('@/components/CustomComponents/ZaionsRSelect')
);
const ZDragAndDrop = lazy(
  () => import('@/components/CustomComponents/ZDragAndDrop')
);
const ZRCSwitch = lazy(() => import('@/components/CustomComponents/ZRCSwitch'));
const ZaionsColorPiker = lazy(
  () => import('@/components/InPageComponents/ZaionsColorPiker')
);

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZLinkInBioThemeSection: React.FC = () => {
  console.count('log count of ZLinkInBioThemeSection');
  const { values, setFieldValue } = useFormikContext<LinkInBioType>();

  // #region Recoil state.
  const linkInBioFontFamilyState = useRecoilValue(LinkInBioFontFamilyRState);

  // const [linkInBioPredefinedThemesState, setLinkInBioPredefinedThemesState] =
  // useRecoilState(LinkInBioPredefinedThemeRState);
  // #endregion

  // current Link-in-bio id.
  const { linkInBioId, workspaceId, shareWSMemberId, wsShareId } = useParams<{
    linkInBioId?: string;
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  // #region APIS.
  const {
    data: LinkInBioPreDefinedThemesData,
    isFetching: isLinkInBioPreDefinedThemesDataFetching
  } = useZRQGetRequest<LinkInBioPredefinedThemeType[]>({
    _url: API_URL_ENUM.linkInBioPreDefinedThemes_create_list,
    _key: _getQueryKey({
      keys: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_PRE_DEFINED_THEMES.MAIN
      ],
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
      additionalKeys: [workspaceId, shareWSMemberId]
    }),
    _urlDynamicParts: [
      CONSTANTS.RouteParams.workspace.type,
      CONSTANTS.RouteParams.workspace.workspaceId
    ],
    _shouldFetchWhenIdPassed: !(
      isZNonEmptyStrings([workspaceId, linkInBioId]) ||
      isZNonEmptyStrings([wsShareId, shareWSMemberId, linkInBioId])
    ),
    _extractType: ZRQGetRequestExtractEnum.extractItems
  });

  // fetching link-in-bio with the linkInBioId data from backend.
  const { isFetching: isSelectedLinkInBioFetching } =
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
        isZNonEmptyStrings([workspaceId, linkInBioId]) ||
        isZNonEmptyStrings([wsShareId, shareWSMemberId, linkInBioId])
      ),
      _extractType: ZRQGetRequestExtractEnum.extractItem
    });
  // #endregion

  const isZFetching = isSelectedLinkInBioFetching;

  const bgDirectionIcon = {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    transform: `rotate(${values?.theme?.background?.bgGradientColors?.direction}deg)`
  };

  const bgButtonDirectionIcon = {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    transform: `rotate(${values?.theme?.button?.background?.bgGradientColors?.direction}deg)`
  };

  return (
    <>
      {/* 🎨 Pre-defined start */}
      <ZIonCol
        sizeXl='11'
        sizeLg='12'
        sizeMd='12'
        sizeSm='12'
        sizeXs='12'
        className='mt-3 ion-margin-start '>
        <ZIonTitle className='text-lg font-bold ion-no-padding'>
          🎨 Pre-defined
        </ZIonTitle>
        <ZIonRow
          className={classNames(classes['row-gap-1-point-6-rem'], {
            'ion-margin-top pt-2 ion-padding-bottom mb-2 gap-y-2 border-bottom__violet':
              true
          })}>
          {!isLinkInBioPreDefinedThemesDataFetching &&
            LinkInBioPreDefinedThemesData?.map((el, i) => {
              const ZIonButtonStyle = {
                ...generatePredefinedThemeBackgroundValue(
                  el.background as LinkInBioThemeBackgroundType
                )
              };

              return (
                <ZIonCol
                  size='max-content'
                  key={i}>
                  <ZIonButton
                    size='large'
                    testingselector={
                      CONSTANTS.testingSelectors.linkInBio.formPage.design.theme
                        .preDefinedThemeBlock
                    }
                    testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.theme.preDefinedThemeBlock}-${el.id}`}
                    className={classNames(classes['zaions-pd-color-block'], {
                      'me-3': true
                    })}
                    style={ZIonButtonStyle}
                    onClick={() => {
                      const _bg = el.background as LinkInBioThemeBackgroundType;

                      const _bgGradient =
                        _bg.bgGradientColors as LinkInBioBgGradientColorsInterface;

                      void setFieldValue(
                        'theme.background',
                        {
                          bgType: _bg?.bgType,
                          bgSolidColor: _bg?.bgSolidColor,
                          bgGradientColors: {
                            startColor: _bgGradient?.startColor,
                            endColor: _bgGradient?.endColor,
                            direction: _bgGradient?.direction ?? 0
                          },
                          bgImageUrl: _bg?.bgImageUrl,
                          enableBgImage: _bg?.enableBgImage
                        },
                        true
                      );
                    }}
                  />
                </ZIonCol>
              );
            })}

          {isLinkInBioPreDefinedThemesDataFetching
            ? [...Array(14)].map((_, i) => (
                <ZIonCol
                  size='max-content'
                  key={i}>
                  <ZIonSkeletonText
                    width='3.6rem'
                    height='4.7rem'
                    className='rounded-sm me-3'
                  />
                </ZIonCol>
              ))
            : null}
        </ZIonRow>
      </ZIonCol>
      {/* 🎨 Pre-defined end */}

      {/* 🖌️ Background */}
      <ZIonCol
        sizeXl='11'
        sizeLg='12'
        sizeMd='12'
        sizeSm='12'
        sizeXs='12'
        className='mt-2 ion-margin-start border-bottom__violet'>
        <ZIonTitle className='text-lg font-bold ion-no-padding'>
          🖌️ Background
        </ZIonTitle>

        <ZIonGrid
          className='flex ion-align-items-start ion-padding-bottom'
          testingselector={
            CONSTANTS.testingSelectors.linkInBio.formPage.design.theme.bg
              .container
          }>
          <Suspense fallback={<ZFallbackIonSpinner2 />}>
            {/* If bgType solidColor show this input */}
            {values?.theme?.background?.bgType ===
              LinkInBioThemeBackgroundEnum.solidColor && (
              <ZaionsColorPiker
                showSkeleton={isZFetching}
                name='theme.background.bgSolidColor'
                value={values.theme.background.bgSolidColor as string}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                setFieldValueFn={setFieldValue}
                testingselector={
                  CONSTANTS.testingSelectors.linkInBio.formPage.design.theme.bg
                    .bgSolidColorInput
                }
              />
            )}
          </Suspense>

          {/* If bgType solidColor show blow inputs */}
          <Suspense fallback={<ZFallbackIonSpinner2 />}>
            {values?.theme?.background?.bgType ===
              LinkInBioThemeBackgroundEnum.gradient && (
              <>
                {/* start color */}
                <ZaionsColorPiker
                  name='theme.background.bgGradientColors.startColor'
                  showSkeleton={isZFetching}
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  setFieldValueFn={setFieldValue}
                  value={
                    values?.theme.background?.bgGradientColors
                      ?.startColor as string
                  }
                  testingselector={
                    CONSTANTS.testingSelectors.linkInBio.formPage.design.theme
                      .bg.gColors.startColorInput
                  }
                />

                {/* direction */}
                <ZIonButton
                  shape='round'
                  className='mt-3 direction-button ion-margin-horizontal ion-no-padding w-[2.5rem]'
                  color='secondary'
                  height='2.5rem'
                  testingselector={
                    CONSTANTS.testingSelectors.linkInBio.formPage.design.theme
                      .bg.gColors.directionBtn
                  }
                  onClick={() => {
                    let _newDirection =
                      +(values?.theme?.background?.bgGradientColors
                        ?.direction as string) +
                      +CONSTANTS.LINK_In_BIO.FORM.DIRECTION_PRE_CLICKED;
                    _newDirection = _newDirection >= 359 ? 0 : _newDirection;
                    void setFieldValue(
                      'theme.background.bgGradientColors.direction',
                      _newDirection,
                      false
                    );
                  }}>
                  <ZIonIcon
                    icon={arrowUp}
                    className='direction-icon'
                    style={bgDirectionIcon}
                  />
                </ZIonButton>

                {/* end color */}
                <ZaionsColorPiker
                  name='theme.background.bgGradientColors.endColor'
                  showSkeleton={isZFetching}
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  setFieldValueFn={setFieldValue}
                  showCloseIcon={true}
                  testingselector={
                    CONSTANTS.testingSelectors.linkInBio.formPage.design.theme
                      .bg.gColors.endColorInput
                  }
                  value={
                    values?.theme?.background?.bgGradientColors
                      ?.endColor as string
                  }
                  closeIconOnChangeFn={() => {
                    void setFieldValue(
                      'theme.background.bgType',
                      LinkInBioThemeBackgroundEnum.solidColor,
                      false
                    );
                  }}
                />
              </>
            )}
          </Suspense>

          {/* Add gradient btn */}
          {values?.theme?.background?.bgType ===
            LinkInBioThemeBackgroundEnum.solidColor && (
            <ZIonButton
              className='mt-3 ion-text-capitalize ms-4'
              height='40px'
              testingselector={
                CONSTANTS.testingSelectors.linkInBio.formPage.design.theme.bg
                  .addGradientBtn
              }
              onClick={() => {
                void setFieldValue(
                  'theme.background.bgType',
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
        </ZIonGrid>
      </ZIonCol>
      {/* 🖌️ Background */}

      {/* 🖍️ Button color & 🎫 Button type start */}
      <ZIonCol
        sizeXl='11'
        sizeLg='12'
        sizeMd='12'
        sizeSm='12'
        sizeXs='12'
        className='mt-3 ion-margin-start border-bottom__violet'>
        {/* 🖍️ Button color */}
        <ZIonTitle className='font-bold text-[16px] ion-no-padding'>
          🖍️ Button color
        </ZIonTitle>

        <ZIonGrid
          className='flex ion-align-items-start ion-padding-bottom border-bottom__violet'
          testingselector={
            CONSTANTS.testingSelectors.linkInBio.formPage.design.theme.button
              .container
          }>
          {/* If bgType solidColor show this input */}
          <Suspense fallback={<ZFallbackIonSpinner2 />}>
            {values?.theme?.button?.background?.bgType ===
              LinkInBioThemeBackgroundEnum.solidColor && (
              <ZaionsColorPiker
                showSkeleton={isZFetching}
                name='theme.button.background.bgSolidColor'
                value={
                  values?.theme?.button?.background?.bgSolidColor as string
                }
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                setFieldValueFn={setFieldValue}
                testingselector={
                  CONSTANTS.testingSelectors.linkInBio.formPage.design.theme
                    .button.bgSolidColorInput
                }
              />
            )}
          </Suspense>

          {/* If bgType solidColor show blow inputs */}

          {values?.theme?.button?.background?.bgType ===
            LinkInBioThemeBackgroundEnum.gradient && (
            <>
              <Suspense fallback={<ZFallbackIonSpinner2 />}>
                {/* Start color */}
                <ZaionsColorPiker
                  name='theme.button.background.bgGradientColors.startColor'
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  setFieldValueFn={setFieldValue}
                  showSkeleton={isZFetching}
                  testingselector={
                    CONSTANTS.testingSelectors.linkInBio.formPage.design.theme
                      .button.gColors.startColorInput
                  }
                  value={
                    values?.theme?.button?.background?.bgGradientColors
                      ?.startColor as string
                  }
                />
              </Suspense>

              {/* direction */}
              <ZIonButton
                shape='round'
                className='mt-3 direction-button ion-margin-horizontal ion-no-padding w-[2.5rem]'
                height='2.5rem'
                color='secondary'
                testingselector={
                  CONSTANTS.testingSelectors.linkInBio.formPage.design.theme
                    .button.gColors.directionBtn
                }
                onClick={() => {
                  let _newDirection =
                    +(values?.theme?.button?.background?.bgGradientColors
                      ?.direction as string) +
                    +CONSTANTS.LINK_In_BIO.FORM.DIRECTION_PRE_CLICKED;
                  _newDirection = _newDirection >= 359 ? 0 : _newDirection;
                  void setFieldValue(
                    'theme.button.background.bgGradientColors.direction',
                    _newDirection,
                    false
                  );
                }}>
                <ZIonIcon
                  icon={arrowUp}
                  className='direction-icon'
                  style={bgButtonDirectionIcon}
                />
              </ZIonButton>

              {/* end color */}

              <Suspense fallback={<ZFallbackIonSpinner2 />}>
                <ZaionsColorPiker
                  name='theme.button.background.bgGradientColors.endColor'
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  setFieldValueFn={setFieldValue}
                  showCloseIcon={true}
                  showSkeleton={isZFetching}
                  value={
                    values?.theme?.button?.background?.bgGradientColors
                      ?.endColor as string
                  }
                  testingselector={
                    CONSTANTS.testingSelectors.linkInBio.formPage.design.theme
                      .button.gColors.endColorInput
                  }
                  closeIconOnChangeFn={() => {
                    void setFieldValue(
                      'theme.button.background.bgType',
                      LinkInBioThemeBackgroundEnum.solidColor,
                      false
                    );
                  }}
                />
              </Suspense>
            </>
          )}

          {/* Add gradient btn */}
          {values?.theme?.button?.background?.bgType ===
            LinkInBioThemeBackgroundEnum.solidColor && (
            <ZIonButton
              className='mt-3 ion-text-capitalize ms-4'
              height='40px'
              testingselector={
                CONSTANTS.testingSelectors.linkInBio.formPage.design.theme
                  .button.addGradientBtn
              }
              onClick={() => {
                void setFieldValue(
                  'theme.button.background.bgType',
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
        </ZIonGrid>

        {/* 🎫 Button type */}
        <ZIonTitle className='font-bold text-[16px] ion-margin-top ion-no-padding z_ff__b612'>
          🎫 Button type
        </ZIonTitle>
        <ZIonRow
          className={classNames(classes['row-gap-1-point-6-rem'], {
            'ion-padding-vertical': true
          })}>
          {/* Filled's */}
          <ZIonCol size='4'>
            <ZIonButton
              color='medium'
              className={classNames(classes['zaions-button-type'], {
                'zaions-button-type-button-active z-ion-border-radius-0': true, // from index.css
                'zaions-border-primary':
                  values?.theme?.button?.type ===
                  LinkInBioButtonTypeEnum.inlineSquare
              })}
              testingselector={
                CONSTANTS.testingSelectors.linkInBio.formPage.design.theme
                  .button.btnType.inlineSquare
              }
              onClick={() => {
                void setFieldValue(
                  'theme.button.type',
                  LinkInBioButtonTypeEnum.inlineSquare,
                  false
                );
              }}
            />
          </ZIonCol>

          <ZIonCol size='4'>
            <ZIonButton
              color='medium'
              className={classNames(classes['zaions-button-type'], {
                'z-ion-border-radius-1rem': true,
                'zaions-border-primary':
                  values?.theme?.button?.type ===
                  LinkInBioButtonTypeEnum.inlineRound
              })}
              testingselector={
                CONSTANTS.testingSelectors.linkInBio.formPage.design.theme
                  .button.btnType.inlineRound
              }
              onClick={() => {
                void setFieldValue(
                  'theme.button.type',
                  LinkInBioButtonTypeEnum.inlineRound,
                  false
                );
              }}
            />
          </ZIonCol>

          <ZIonCol size='4'>
            <ZIonButton
              color='medium'
              shape='round'
              testingselector={
                CONSTANTS.testingSelectors.linkInBio.formPage.design.theme
                  .button.btnType.inlineCircle
              }
              className={classNames(classes['zaions-button-type'], {
                'zaions-border-primary':
                  values?.theme?.button?.type ===
                  LinkInBioButtonTypeEnum.inlineCircle
              })}
              onClick={() => {
                void setFieldValue(
                  'theme.button.type',
                  LinkInBioButtonTypeEnum.inlineCircle,
                  false
                );
              }}
            />
          </ZIonCol>

          {/* Outline's */}
          <ZIonCol size='4'>
            <ZIonButton
              fill='outline'
              testingselector={
                CONSTANTS.testingSelectors.linkInBio.formPage.design.theme
                  .button.btnType.inlineSquareOutline
              }
              className={classNames(classes['zaions-button-type'], {
                'z-ion-border-radius-0': true,
                'zaions-border-primary':
                  values?.theme?.button?.type ===
                  LinkInBioButtonTypeEnum.inlineSquareOutline
              })}
              color={
                values?.theme?.button?.type ===
                LinkInBioButtonTypeEnum.inlineSquareOutline
                  ? 'primary'
                  : 'medium'
              }
              onClick={() => {
                void setFieldValue(
                  'theme.button.type',
                  LinkInBioButtonTypeEnum.inlineSquareOutline,
                  false
                );
              }}
            />
          </ZIonCol>

          <ZIonCol size='4'>
            <ZIonButton
              fill='outline'
              testingselector={
                CONSTANTS.testingSelectors.linkInBio.formPage.design.theme
                  .button.btnType.inlineRoundOutline
              }
              className={classNames(classes['zaions-button-type'], {
                'z-ion-border-radius-1rem': true,
                'zaions-border-primary':
                  values?.theme?.button?.type ===
                  LinkInBioButtonTypeEnum.inlineRoundOutline
              })}
              color={
                values?.theme?.button?.type ===
                LinkInBioButtonTypeEnum.inlineRoundOutline
                  ? 'primary'
                  : 'medium'
              }
              onClick={() => {
                void setFieldValue(
                  'theme.button.type',
                  LinkInBioButtonTypeEnum.inlineRoundOutline,
                  false
                );
              }}
            />
          </ZIonCol>

          <ZIonCol size='4'>
            <ZIonButton
              shape='round'
              fill='outline'
              testingselector={
                CONSTANTS.testingSelectors.linkInBio.formPage.design.theme
                  .button.btnType.inlineCircleOutline
              }
              className={classNames(classes['zaions-button-type'], {
                'zaions-border-primary':
                  values?.theme?.button?.type ===
                  LinkInBioButtonTypeEnum.inlineCircleOutline
              })}
              color={
                values?.theme?.button?.type ===
                LinkInBioButtonTypeEnum.inlineCircleOutline
                  ? 'primary'
                  : 'medium'
              }
              onClick={() => {
                void setFieldValue(
                  'theme.button.type',
                  LinkInBioButtonTypeEnum.inlineCircleOutline,
                  false
                );
              }}
            />
          </ZIonCol>

          {/* Shadow's */}
          <ZIonCol size='4'>
            <ZIonButton
              color='medium'
              testingselector={
                CONSTANTS.testingSelectors.linkInBio.formPage.design.theme
                  .button.btnType.inlineSquareShadow
              }
              className={classNames(
                classes['zaions-button-type'],
                classes['zaions-button-type-shadow'],
                {
                  'z-ion-border-radius-0': true,
                  'zaions-border-transparent':
                    values?.theme?.button?.type !==
                    LinkInBioButtonTypeEnum.inlineSquareShadow,
                  'zaions-border-primary':
                    values?.theme?.button?.type ===
                    LinkInBioButtonTypeEnum.inlineSquareShadow
                }
              )}
              onClick={() => {
                void setFieldValue(
                  'theme.button.type',
                  LinkInBioButtonTypeEnum.inlineSquareShadow,
                  false
                );
              }}
            />
          </ZIonCol>

          <ZIonCol size='4'>
            <ZIonButton
              color='medium'
              testingselector={
                CONSTANTS.testingSelectors.linkInBio.formPage.design.theme
                  .button.btnType.inlineRoundShadow
              }
              className={classNames(
                classes['zaions-button-type'],
                classes['zaions-button-type-shadow'],
                {
                  'z-ion-border-radius-1rem': true,
                  'zaions-border-transparent':
                    values?.theme?.button?.type !==
                    LinkInBioButtonTypeEnum.inlineRoundShadow,
                  'zaions-border-primary':
                    values?.theme?.button?.type ===
                    LinkInBioButtonTypeEnum.inlineRoundShadow
                }
              )}
              onClick={() => {
                void setFieldValue(
                  'theme.button.type',
                  LinkInBioButtonTypeEnum.inlineRoundShadow,
                  false
                );
              }}
            />
          </ZIonCol>

          <ZIonCol size='4'>
            <ZIonButton
              color='medium'
              shape='round'
              testingselector={
                CONSTANTS.testingSelectors.linkInBio.formPage.design.theme
                  .button.btnType.inlineCircleShadow
              }
              className={classNames(
                classes['zaions-button-type'],
                classes['zaions-button-type-shadow'],
                {
                  'zaions-border-primary':
                    values?.theme?.button?.type ===
                    LinkInBioButtonTypeEnum.inlineCircleShadow,
                  'zaions-border-transparent':
                    values?.theme?.button?.type !==
                    LinkInBioButtonTypeEnum.inlineCircleShadow
                }
              )}
              onClick={() => {
                void setFieldValue(
                  'theme.button.type',
                  LinkInBioButtonTypeEnum.inlineCircleShadow,
                  false
                );
              }}
            />
          </ZIonCol>

          {/* Shadow Color */}
          <ZIonCol
            size='12'
            className='mt-3'
            testingselector={
              CONSTANTS.testingSelectors.linkInBio.formPage.design.theme.button
                .btnType.shadowColorInputContainer
            }>
            <Suspense fallback={<ZFallbackIonSpinner2 />}>
              {values?.theme?.button?.type != null &&
                [
                  LinkInBioButtonTypeEnum.inlineSquareShadow,
                  LinkInBioButtonTypeEnum.inlineRoundShadow,
                  LinkInBioButtonTypeEnum.inlineCircleShadow
                ].includes(values?.theme?.button?.type) && (
                  <ZaionsColorPiker
                    showSkeleton={isZFetching}
                    name='theme.button.shadowColor'
                    value={values?.theme?.button?.shadowColor as string}
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    setFieldValueFn={setFieldValue}
                    testingselector={
                      CONSTANTS.testingSelectors.linkInBio.formPage.design.theme
                        .button.btnType.shadowColorInput
                    }
                  />
                )}
            </Suspense>
          </ZIonCol>
        </ZIonRow>
      </ZIonCol>
      {/* 🖍️ Button color & 🎫 Button type end */}

      {/* 📝 Font start */}
      <ZIonCol
        sizeXl='11'
        sizeLg='12'
        sizeMd='12'
        sizeSm='12'
        sizeXs='12'
        className='mt-3 ion-margin-start border-bottom__violet'>
        <ZIonTitle className='font-bold mb-3 pb-1 text-[16px] ion-no-padding'>
          📝 Font
        </ZIonTitle>

        <div className='flex ion-align-items-center ion-padding-bottom'>
          <Suspense fallback={<ZFallbackIonSpinner2 />}>
            <ZaionsRSelect
              className='w-full z_ff__roboto'
              name='theme.font'
              testingselector={
                CONSTANTS.testingSelectors.linkInBio.formPage.design.theme
                  .fontSelector
              }
              options={linkInBioFontFamilyState?.map(el => {
                return {
                  value: el.fontName,
                  label: el.fontName
                };
              })}
              onChange={_value => {
                void setFieldValue(
                  'theme.font',
                  (_value as ZaionsRSelectOptions)?.value,
                  false
                );
              }}
              value={
                formatReactSelectOption(
                  values?.theme?.font as string,
                  linkInBioFontFamilyState as unknown as ZGenericObject[],
                  'fontName',
                  'fontName'
                ) ?? []
              }
            />
          </Suspense>
        </div>
      </ZIonCol>
      {/* 📝 Font end */}

      {/* 🖼️ Background image start */}
      <ZIonCol
        sizeXl='11'
        sizeLg='12'
        sizeMd='12'
        sizeSm='12'
        sizeXs='12'
        className='mt-3 mb-5 ion-margin-start'
        testingselector={
          CONSTANTS.testingSelectors.linkInBio.formPage.design.theme.bgImage
            .container
        }>
        <ZIonRow>
          <ZIonCol>
            <ZIonTitle className='font-bold text-[16px] ion-no-padding'>
              🖼️ Background image
            </ZIonTitle>
          </ZIonCol>
          <ZIonCol className='flex ion-justify-content-end'>
            <Suspense fallback={<ZFallbackIonSpinner2 />}>
              <ZRCSwitch
                checked={values?.theme?.background?.enableBgImage}
                testingselector={
                  CONSTANTS.testingSelectors.linkInBio.formPage.design.theme
                    .bgImage.toggler
                }
                onChange={value => {
                  void setFieldValue(
                    'theme.background.enableBgImage',
                    value,
                    false
                  );
                  if (value) {
                    void setFieldValue(
                      'theme.background.bgType',
                      LinkInBioThemeBackgroundEnum.image,
                      false
                    );
                  } else {
                    void setFieldValue(
                      'theme.background.bgType',
                      LinkInBioThemeBackgroundEnum.solidColor,
                      false
                    );
                  }
                }}
              />
            </Suspense>
          </ZIonCol>
        </ZIonRow>

        {values?.theme?.background?.enableBgImage === true && (
          <div className='flex mt-4 ion-align-items-center ion-padding-bottom'>
            <Suspense fallback={<ZFallbackIonSpinner2 />}>
              <ZDragAndDrop
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                setFieldValue={setFieldValue}
                fieldName='theme.background.bgImageUrl'
                imageUrl={values.theme?.background?.bgImageUrl}
                testingselector={
                  CONSTANTS.testingSelectors.linkInBio.formPage.design.theme
                    .bgImage.upload
                }
              />
            </Suspense>
          </div>
        )}
      </ZIonCol>
      {/* 🖼️ Background image end */}
    </>
  );
};

export default ZLinkInBioThemeSection;
