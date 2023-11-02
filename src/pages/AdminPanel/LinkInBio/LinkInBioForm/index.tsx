/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { lazy, Suspense, useCallback, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { Formik } from 'formik';
import { createOutline } from 'ionicons/icons';
import { useRecoilState, useSetRecoilState } from 'recoil';
import routeQueryString from 'qs';
import { AxiosError } from 'axios';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZIonPage from '@/components/ZIonPage';
import {
  ZIonButton,
  ZIonCol,
  ZIonGrid,
  ZIonHeader,
  ZIonIcon,
  ZIonInput,
  ZIonItem,
  ZIonLabel,
  ZIonRow,
  ZIonSkeletonText,
  ZIonText,
  ZIonTitle,
  ZIonSegment,
  ZIonSegmentButton
} from '@/components/ZIonComponents';
import ZFallbackIonSpinner from '@/components/CustomComponents/FallbackSpinner';

import {
  useZRQGetRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';
import { useZValidateRequestResponse } from '@/ZaionsHooks/zapi-hooks';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import {
  createRedirectRoute,
  extractInnerData,
  replaceRouteParams,
  zStringify
} from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import CONSTANTS from '@/utils/constants';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { showErrorNotification } from '@/utils/notification';
import { reportCustomError } from '@/utils/customErrorType';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  LinkInBioButtonTypeEnum,
  LinkInBioThemeBackgroundEnum,
  LinkInBioThemeFontEnum,
  type LinkInBioType,
  ZLinkInBioPageEnum,
  ZLinkInBioRHSComponentEnum
} from '@/types/AdminPanel/linkInBioType';
import { LinkInBioBlockEnum } from '@/types/AdminPanel/linkInBioType/blockTypes';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { FormMode } from '@/types/AdminPanel/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import {
  LinkInBioFromPageRState,
  NewLinkInBioFormState
} from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioFormState.recoil';

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
import classes from './styles.module.css';
import ZCan from '@/components/Can';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';

const LinkInBioDesignPage = lazy(
  () => import('@/pages/AdminPanel/LinkInBio/LinkInBioForm/Design')
);
const LinkInBioShareSettings = lazy(
  () => import('@/pages/AdminPanel/LinkInBio/LinkInBioForm/ShareSettings')
);
const LinkInBioPageAnalytics = lazy(
  () => import('@/pages/AdminPanel/LinkInBio/LinkInBioForm/PageAnalytics')
);
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

const ZaionsLinkInBioForm: React.FC = () => {
  const location = useLocation();

  // getting link-in-bio id from route (url), when user refresh the page the id from route will be get and link-in-bio of that id will be fetch from backend and store in NewLinkInBioFormState recoil state.
  const { linkInBioId, workspaceId } = useParams<{
    linkInBioId: string;
    workspaceId: string;
  }>();

  // #region Recoil states.
  // getting search param from url with the help of 'qs' package
  const routeQSearchParams = routeQueryString.parse(location.search, {
    ignoreQueryPrefix: true
  });

  // Recoil state of managing current page. for example design, share settings etc.
  const [linkInBioFromPageState, setLinkInBioFromPageState] = useRecoilState(
    LinkInBioFromPageRState
  );

  // Recoil state link-in-bio form state (for editing or creating link-in-bio)
  const setLinkInBioFormState = useSetRecoilState(NewLinkInBioFormState);
  // #endregion

  // #region Custom hooks.
  // useZNavigate for redirection
  const { zNavigatePushRoute } = useZNavigate();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();

  // validate the request. this hook will show success notification if the request->success is true and show error notification if request->success is false.
  const { validateRequestResponse } = useZValidateRequestResponse();
  // #endregion

  // #region APIS
  // fetching link-in-bio with the linkInBioId data from backend.
  const {
    data: selectedLinkInBio,
    refetch: refetchSelectedLinkInBio,
    isFetching: isSelectedLinkInBioFetching
  } = useZRQGetRequest<LinkInBioType>({
    _url: API_URL_ENUM.linkInBio_update_delete,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.GET,
      workspaceId,
      linkInBioId
    ],
    _authenticated: true,
    _itemsIds: [linkInBioId, workspaceId],
    _urlDynamicParts: [
      CONSTANTS.RouteParams.linkInBio.linkInBioId,
      CONSTANTS.RouteParams.workspace.workspaceId
    ],
    _shouldFetchWhenIdPassed: !(
      linkInBioId !== undefined && linkInBioId?.trim()?.length > 0
    ),
    _extractType: ZRQGetRequestExtractEnum.extractItem
  });

  // Update Link-in-bio API
  const { mutateAsync: UpdateLinkInBio } = useZRQUpdateRequest({
    _url: API_URL_ENUM.linkInBio_update_delete,
    _queriesKeysToInvalidate: []
  });
  // #endregion

  const linkInBioGetRequestFn = useCallback(async () => {
    await refetchSelectedLinkInBio();
    // eslint-disable-next-line
  }, []);

  // Refetching if the linkInBioId changes and if the linkInBioId is undefined it will redirect user to link-in-bio page.
  useEffect(() => {
    try {
      if (linkInBioId?.trim()?.length > 0) {
        void linkInBioGetRequestFn();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        zNavigatePushRoute(
          replaceRouteParams(
            ZaionsRoutes.AdminPanel.LinkInBio.Main,
            [
              CONSTANTS.RouteParams.workspace.workspaceId,
              CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
            ],
            [workspaceId, CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE]
          )
        );
        showErrorNotification(error.message);
      } else {
        reportCustomError(error);
      }
    }
    // eslint-disable-next-line
  }, [linkInBioId]);

  // Storing link-in-bio data in recoil state.
  useEffect(() => {
    try {
      if (
        selectedLinkInBio?.id !== undefined &&
        linkInBioId?.trim()?.length > 0
      ) {
        setLinkInBioFormState(oldVal => ({
          ...oldVal,
          formMode: FormMode.EDIT
        }));

        //
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line
  }, [selectedLinkInBio]);

  // storing the current page info in setLinkInBioFromPageState recoil state, so we can show the appropriate content.
  useEffect(() => {
    try {
      if (routeQSearchParams?.page !== undefined) {
        setLinkInBioFromPageState(oldValues => ({
          ...oldValues,
          page: ZLinkInBioPageEnum[
            routeQSearchParams.page as ZLinkInBioPageEnum
          ]
        }));
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line
  }, [routeQSearchParams.page]);

  // formik submit function
  const formikSubmitHandler = async (_reqDataStr: string): Promise<void> => {
    try {
      if (_reqDataStr?.trim()?.length > 0) {
        // The update api...
        const _response = await UpdateLinkInBio({
          itemIds: [workspaceId, linkInBioId],
          urlDynamicParts: [
            CONSTANTS.RouteParams.workspace.workspaceId,
            CONSTANTS.RouteParams.linkInBio.linkInBioId
          ],
          requestData: _reqDataStr
        });

        if (_response !== undefined) {
          // if __response of the updateLinkInBio api is success this showing success notification else not success then error notification.
          await validateRequestResponse({
            resultObj: _response
          });

          // extracting data from result.
          const _extractItemFromResult = extractInnerData<LinkInBioType>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_extractItemFromResult?.id !== undefined) {
            // Updating single link-in-bio in all link-in-bios data in RQ cache.
            await updateRQCDataHandler({
              key: [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN,
                workspaceId
              ],
              data: _extractItemFromResult,
              id: _extractItemFromResult?.id
            });

            // Updating single link-in-bio data in RQ cache.
            await updateRQCDataHandler<LinkInBioType | undefined>({
              key: [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.GET,
                workspaceId,
                linkInBioId
              ],
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

  const isZFetching = isSelectedLinkInBioFetching;

  return (
    <ZIonPage pageTitle='Link In Bio Form Page'>
      <ZCan
        havePermissions={[permissionsEnum.update_linkInBio]}
        returnPermissionDeniedView={true}>
        <Suspense fallback={<ZFallbackIonSpinner />}>
          <Formik
            // #region initial values
            initialValues={{
              designPageCurrentTab:
                (routeQSearchParams as { step: ZLinkInBioRHSComponentEnum })
                  ?.step ?? ZLinkInBioRHSComponentEnum.theme,
              LinkInBioBlock: LinkInBioBlockEnum.default, // REMOVE THIS
              title: selectedLinkInBio?.title ?? '',
              linkInBioTitle: selectedLinkInBio?.linkInBioTitle ?? '',
              enableTitleInput: false,
              theme: {
                background: {
                  bgType:
                    selectedLinkInBio?.theme?.background?.bgType ??
                    LinkInBioThemeBackgroundEnum.solidColor,
                  bgSolidColor:
                    selectedLinkInBio?.theme?.background?.bgSolidColor ?? '',
                  bgGradientColors: {
                    startColor:
                      selectedLinkInBio?.theme?.background?.bgGradientColors
                        ?.startColor ?? '',
                    endColor:
                      selectedLinkInBio?.theme?.background?.bgGradientColors
                        ?.endColor ?? '',
                    direction:
                      selectedLinkInBio?.theme?.background?.bgGradientColors
                        ?.direction ?? 0
                  },
                  enableBgImage:
                    selectedLinkInBio?.theme?.background?.enableBgImage ??
                    false,
                  bgImageUrl:
                    selectedLinkInBio?.theme?.background?.bgImageUrl ?? ''
                },
                button: {
                  background: {
                    bgType:
                      selectedLinkInBio?.theme?.button?.background?.bgType ??
                      LinkInBioThemeBackgroundEnum.solidColor,
                    bgSolidColor:
                      selectedLinkInBio?.theme?.button?.background
                        ?.bgSolidColor ?? '',
                    bgGradientColors: {
                      startColor:
                        selectedLinkInBio?.theme?.button?.background
                          ?.bgGradientColors?.startColor ?? '',
                      endColor:
                        selectedLinkInBio?.theme?.button?.background
                          ?.bgGradientColors?.endColor ?? '',
                      direction:
                        selectedLinkInBio?.theme?.button?.background
                          ?.bgGradientColors?.direction ?? 0
                    },
                    bgImageUrl:
                      selectedLinkInBio?.theme?.button?.background
                        ?.bgImageUrl ?? ''
                  },
                  type:
                    selectedLinkInBio?.theme?.button?.type ??
                    LinkInBioButtonTypeEnum.inlineSquare,
                  shadowColor:
                    selectedLinkInBio?.theme?.button?.shadowColor ??
                    CONSTANTS.LINK_In_BIO.INITIAL_VALUES.BUTTON_SHADOW_COLOR
                },
                font:
                  selectedLinkInBio?.theme?.font ?? LinkInBioThemeFontEnum.lato
              },
              settings: {
                headerCode: selectedLinkInBio?.settings?.headerCode ?? '',
                bodyCode: selectedLinkInBio?.settings?.bodyCode ?? ''
              }
            }}
            //
            enableReinitialize
            // #endregion

            // #region Submit function
            onSubmit={values => {
              const stringifyValue = zStringify({
                linkInBioTitle: values.linkInBioTitle,
                theme: zStringify(values.theme),
                settings: zStringify(values.settings),
                folderId: 1
              });
              setLinkInBioFormState(oldValues => ({
                ...oldValues,
                theme: { ...values.theme },
                formMode: FormMode.EDIT
              }));
              void formikSubmitHandler(stringifyValue);
            }}
            // #endregion
          >
            {({ values, setFieldValue, handleChange, handleBlur }) => {
              return (
                <>
                  {!isZFetching ? (
                    <ZIonHeader className='ion-padding-horizontal'>
                      <ZIonGrid className='ion-no-padding'>
                        <ZIonRow>
                          <ZIonCol
                            className='flex ion-align-items-center'
                            size='3'>
                            {/* Home btn */}
                            <ZIonButton
                              className='ion-text-capitalize ion-no-margin'
                              color='secondary'
                              testingselector={
                                CONSTANTS.testingSelectors.linkInBio.formPage
                                  .topBar.homeBtn
                              }
                              routerLink={replaceRouteParams(
                                ZaionsRoutes.AdminPanel.LinkInBio.Main,
                                [
                                  CONSTANTS.RouteParams.workspace.workspaceId,
                                  CONSTANTS.RouteParams
                                    .folderIdToGetShortLinksOrLinkInBio
                                ],
                                [
                                  workspaceId,
                                  CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                                ]
                              )}>
                              <ZIonText className='ion-no-padding text-[16px]'>
                                Home
                              </ZIonText>
                            </ZIonButton>

                            {/* Title */}
                            <ZIonGrid
                              className='ms-2 w-[71%]'
                              testingselector={
                                CONSTANTS.testingSelectors.linkInBio.formPage
                                  .topBar.titleContainer
                              }>
                              {values.enableTitleInput && (
                                <ZIonItem
                                  lines='none'
                                  minHeight='40px'
                                  testingselector={
                                    CONSTANTS.testingSelectors.linkInBio
                                      .formPage.topBar.titleIonItem
                                  }
                                  className={classNames({
                                    'ion-no-padding ion-no-margin me-2': true
                                  })}
                                  style={{
                                    '--inner-padding-end': '0'
                                  }}>
                                  <ZIonInput
                                    label=''
                                    minHeight='40px'
                                    name='linkInBioTitle'
                                    onIonChange={handleChange}
                                    onIonBlur={handleBlur}
                                    value={values.linkInBioTitle}
                                    testingselector={
                                      CONSTANTS.testingSelectors.linkInBio
                                        .formPage.topBar.titleInput
                                    }
                                    className={classNames(
                                      classes['link-in-bio-title-field'],
                                      {
                                        'text-[18px]': true
                                      }
                                    )}
                                  />
                                  <ZIonButton
                                    className='ion-text-capitalize ion-no-margin'
                                    height='40px'
                                    expand='full'
                                    testingselector={
                                      CONSTANTS.testingSelectors.linkInBio
                                        .formPage.topBar.titleSaveBtn
                                    }
                                    onClick={() => {
                                      void setFieldValue(
                                        'enableTitleInput',
                                        false,
                                        false
                                      );
                                    }}>
                                    <ZIonText className='text-sm'>
                                      save
                                    </ZIonText>
                                  </ZIonButton>
                                </ZIonItem>
                              )}
                              {!values.enableTitleInput && (
                                <ZIonGrid
                                  className='flex w-full text-[18px] cursor-pointer ms-2'
                                  testingselector={
                                    CONSTANTS.testingSelectors.linkInBio
                                      .formPage.topBar.titleTextContainer
                                  }
                                  onClick={() => {
                                    void setFieldValue(
                                      'enableTitleInput',
                                      true,
                                      false
                                    );
                                  }}>
                                  <ZIonTitle
                                    className='overflow-hidden me-1 w-min max-w-max ion-no-padding text-md'
                                    testingselector={
                                      CONSTANTS.testingSelectors.linkInBio
                                        .formPage.topBar.titleText
                                    }>
                                    {values.linkInBioTitle}
                                  </ZIonTitle>
                                  <ZIonIcon
                                    icon={createOutline}
                                    className='w-6 h-6 mt-1'
                                    color='dark'
                                  />
                                </ZIonGrid>
                              )}
                            </ZIonGrid>
                          </ZIonCol>

                          <ZIonCol size='6'>
                            {/* Segment */}
                            <ZIonSegment value={linkInBioFromPageState.page}>
                              {/* Design */}
                              <ZIonSegmentButton
                                value='design'
                                className='ion-text-capitalize'
                                testingselector={
                                  CONSTANTS.testingSelectors.linkInBio.formPage
                                    .topBar.tab.design
                                }
                                onClick={() => {
                                  zNavigatePushRoute(
                                    createRedirectRoute({
                                      url: ZaionsRoutes.AdminPanel.LinkInBio
                                        .Edit,
                                      params: [
                                        CONSTANTS.RouteParams.workspace
                                          .workspaceId,
                                        CONSTANTS.RouteParams.linkInBio
                                          .linkInBioId
                                      ],
                                      values: [workspaceId, linkInBioId],
                                      routeSearchParams: {
                                        page: ZLinkInBioPageEnum.design,
                                        step: ZLinkInBioRHSComponentEnum.theme
                                      }
                                    })
                                  );
                                }}>
                                <ZIonLabel className='font-bold tracking-normal'>
                                  Design
                                </ZIonLabel>
                              </ZIonSegmentButton>

                              {/* Share settings */}
                              <ZIonSegmentButton
                                value='shareSettings'
                                className='ion-text-capitalize'
                                testingselector={
                                  CONSTANTS.testingSelectors.linkInBio.formPage
                                    .topBar.tab.shareSettings
                                }
                                onClick={() => {
                                  zNavigatePushRoute(
                                    createRedirectRoute({
                                      url: ZaionsRoutes.AdminPanel.LinkInBio
                                        .Edit,
                                      params: [
                                        CONSTANTS.RouteParams.workspace
                                          .workspaceId,
                                        CONSTANTS.RouteParams.linkInBio
                                          .linkInBioId
                                      ],
                                      values: [workspaceId, linkInBioId],
                                      routeSearchParams: {
                                        page: ZLinkInBioPageEnum.shareSettings
                                      }
                                    })
                                  );
                                }}>
                                <ZIonLabel className='font-bold tracking-normal'>
                                  Share settings
                                </ZIonLabel>
                              </ZIonSegmentButton>

                              {/* Page analytics */}
                              <ZIonSegmentButton
                                value='pageAnalytics'
                                className='ion-text-capitalize'
                                testingselector={
                                  CONSTANTS.testingSelectors.linkInBio.formPage
                                    .topBar.tab.pageAnalytics
                                }
                                onClick={() => {
                                  zNavigatePushRoute(
                                    createRedirectRoute({
                                      url: ZaionsRoutes.AdminPanel.LinkInBio
                                        .Edit,
                                      params: [
                                        CONSTANTS.RouteParams.workspace
                                          .workspaceId,
                                        CONSTANTS.RouteParams.linkInBio
                                          .linkInBioId
                                      ],
                                      values: [workspaceId, linkInBioId],
                                      routeSearchParams: {
                                        page: ZLinkInBioPageEnum.pageAnalytics
                                      }
                                    })
                                  );
                                }}>
                                <ZIonLabel className='font-bold tracking-normal'>
                                  Page Analytics
                                </ZIonLabel>
                              </ZIonSegmentButton>

                              {/* Lead */}
                              <ZIonSegmentButton
                                value='lead'
                                className='ion-text-capitalize'
                                testingselector={
                                  CONSTANTS.testingSelectors.linkInBio.formPage
                                    .topBar.tab.lead
                                }
                                onClick={() => {
                                  zNavigatePushRoute(
                                    createRedirectRoute({
                                      url: ZaionsRoutes.AdminPanel.LinkInBio
                                        .Edit,
                                      params: [
                                        CONSTANTS.RouteParams.workspace
                                          .workspaceId,
                                        CONSTANTS.RouteParams.linkInBio
                                          .linkInBioId
                                      ],
                                      values: [workspaceId, linkInBioId],
                                      routeSearchParams: {
                                        page: ZLinkInBioPageEnum.lead
                                      }
                                    })
                                  );
                                }}>
                                <ZIonLabel className='font-bold tracking-normal'>
                                  Lead
                                </ZIonLabel>
                              </ZIonSegmentButton>

                              {/* Block analytics */}
                              <ZIonSegmentButton
                                value='block-analytics'
                                className='ion-text-capitalize'
                                testingselector={
                                  CONSTANTS.testingSelectors.linkInBio.formPage
                                    .topBar.tab.blockAnalytics
                                }>
                                <ZIonLabel className='font-bold tracking-normal'>
                                  Block Analytics
                                </ZIonLabel>
                              </ZIonSegmentButton>
                            </ZIonSegment>
                          </ZIonCol>

                          <ZIonCol className='flex ion-align-items-center ion-justify-content-end'>
                            {/* Errors btn */}
                            <ZIonButton
                              className='ion-text-lowercase ion-no-margin me-4'
                              color='danger'
                              testingselector={
                                CONSTANTS.testingSelectors.linkInBio.formPage
                                  .topBar.errorsBtn
                              }>
                              <ZIonText className='ion-no-padding text-[16px]'>
                                errors
                              </ZIonText>
                            </ZIonButton>

                            {/* Upgrade btn */}
                            <ZIonButton
                              className='ion-text-capitalize ion-no-margin'
                              testingselector={
                                CONSTANTS.testingSelectors.linkInBio.formPage
                                  .topBar.upgradeBtn
                              }>
                              <ZIonText className='ion-no-padding text-[16px]'>
                                Upgrade
                              </ZIonText>
                            </ZIonButton>
                          </ZIonCol>
                        </ZIonRow>
                      </ZIonGrid>
                    </ZIonHeader>
                  ) : (
                    <ZHeaderSkeleton />
                  )}

                  {/* Design  */}
                  {linkInBioFromPageState.page ===
                    ZLinkInBioPageEnum.design && <LinkInBioDesignPage />}

                  {/* Share Settings */}
                  {linkInBioFromPageState.page ===
                    ZLinkInBioPageEnum.shareSettings && (
                    <LinkInBioShareSettings />
                  )}

                  {/* Page Analytics */}
                  {linkInBioFromPageState.page ===
                    ZLinkInBioPageEnum.pageAnalytics && (
                    <LinkInBioPageAnalytics />
                  )}
                </>
              );
            }}
          </Formik>
        </Suspense>
      </ZCan>
    </ZIonPage>
  );
};

const ZHeaderSkeleton: React.FC = React.memo(() => {
  return (
    <ZIonHeader className='ion-padding-horizontal'>
      <ZIonGrid className='ion-no-padding'>
        <ZIonRow>
          <ZIonCol
            className='flex ion-align-items-center'
            size='3'>
            <ZIonButton
              className='ion-text-capitalize ion-no-margin'
              color='secondary'>
              <ZIonText className='ion-no-padding text-[16px]'>
                <ZIonSkeletonText
                  width='45px'
                  height='20px'
                  animated={true}
                />
              </ZIonText>
            </ZIonButton>

            <div className='ms-2 w-[71%]'>
              <div className='flex w-full text-[18px] cursor-pointer ms-2'>
                <ZIonTitle className='overflow-hidden me-1 w-min max-w-max ion-no-padding text-md'>
                  <ZIonSkeletonText
                    width='100px'
                    height='25px'
                  />
                </ZIonTitle>
                <ZIonTitle className='overflow-hidden me-1 w-min max-w-max ion-no-padding text-md'>
                  <ZIonSkeletonText
                    width='1.5rem'
                    height='1.5rem'
                  />
                </ZIonTitle>
              </div>
            </div>
          </ZIonCol>

          <ZIonCol size='6'>
            <ZIonSegment disabled={true}>
              <ZIonSegmentButton
                value='design'
                className='ion-text-capitalize'>
                <ZIonLabel className='font-bold tracking-normal'>
                  <ZIonSkeletonText
                    width='50px'
                    height='20px'
                    animated={true}
                  />
                </ZIonLabel>
              </ZIonSegmentButton>

              <ZIonSegmentButton
                value='shareSettings'
                className='ion-text-capitalize'>
                <ZIonLabel className='font-bold tracking-normal'>
                  <ZIonSkeletonText
                    width='85px'
                    height='20px'
                    animated={true}
                  />
                </ZIonLabel>
              </ZIonSegmentButton>

              <ZIonSegmentButton
                value='pageAnalytics'
                className='ion-text-capitalize'>
                <ZIonLabel className='font-bold tracking-normal'>
                  <ZIonSkeletonText
                    width='95px'
                    height='20px'
                    animated={true}
                  />
                </ZIonLabel>
              </ZIonSegmentButton>

              <ZIonSegmentButton
                value='lead'
                className='ion-text-capitalize'>
                <ZIonLabel className='font-bold tracking-normal'>
                  <ZIonSkeletonText
                    width='40px'
                    height='20px'
                    animated={true}
                  />
                </ZIonLabel>
              </ZIonSegmentButton>

              <ZIonSegmentButton
                value='block-analytics'
                className='ion-text-capitalize'>
                <ZIonLabel className='font-bold tracking-normal'>
                  <ZIonSkeletonText
                    width='100px'
                    height='20px'
                    animated={true}
                  />
                </ZIonLabel>
              </ZIonSegmentButton>
            </ZIonSegment>
          </ZIonCol>

          <ZIonCol className='flex ion-align-items-center ion-justify-content-end'>
            <ZIonButton
              className='ion-text-lowercase ion-no-margin me-4'
              color='danger'>
              <ZIonText className='ion-no-padding text-[16px]'>
                <ZIonSkeletonText
                  width='45px'
                  height='20px'
                  animated={true}
                />
              </ZIonText>
            </ZIonButton>
            <ZIonButton className='ion-text-capitalize ion-no-margin'>
              <ZIonText className='ion-no-padding text-[16px]'>
                <ZIonSkeletonText
                  width='65px'
                  height='20px'
                  animated={true}
                />
              </ZIonText>
            </ZIonButton>
          </ZIonCol>
        </ZIonRow>
      </ZIonGrid>
    </ZIonHeader>
  );
});
ZHeaderSkeleton.displayName = 'ZHeaderSkeleton';

export default ZaionsLinkInBioForm;
