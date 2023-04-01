/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useCallback, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { Formik } from 'formik';
import { pencilOutline } from 'ionicons/icons';
import { useRecoilState } from 'recoil';
import routeQueryString from 'qs';
import { AxiosError } from 'axios';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZaionsIonPage from '@/components/ZaionsIonPage';
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
  ZIonText,
} from '@/components/ZIonComponents';
import ZIonSegment from '@/components/ZIonComponents/ZIonSegment';
import ZIonSegmentButton from '@/components/ZIonComponents/ZIonSegmentButton';
import LinkInBioDesignPage from '@/pages/AdminPanel/LinkInBio/LinkInBioForm/Design';
import LinkInBioShareSettings from '@/pages/AdminPanel/LinkInBio/LinkInBioForm/ShareSettings';
import LinkInBioPageAnalytics from '@/pages/AdminPanel/LinkInBio/LinkInBioForm/PageAnalytics';

import {
  useZRQGetRequest,
  useZRQUpdateRequest,
} from '@/ZaionsHooks/zreactquery-hooks';
import { useZValidateRequestResponse } from '@/ZaionsHooks/zapi-hooks';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import {
  createRedirectRoute,
  replaceParams,
  zJsonParse,
  zStringify,
} from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import CONSTANTS from '@/utils/constants';
import { API_URL_ENUM } from '@/utils/enums';
import { showErrorNotification } from '@/utils/notification';
import { reportCustomError } from '@/utils/customErrorType';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  LinkInBioButtonTypeEnum,
  LinkInBIoSettingType,
  LinkInBioThemeBackgroundEnum,
  LinkInBioThemeFontEnum,
  LinkInBioThemeType,
  LinkInBioType,
  ZLinkInBioPageEnum,
  ZLinkInBioRHSComponentEnum,
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
  NewLinkInBioFormState,
} from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioFormState.recoil';

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
import classes from './styles.module.css';
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

  // getting search param from url with the help of 'qs' package
  const routeQSearchParams = routeQueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  // Recoil state of managing current page. for example design, share settings etc.
  const [linkInBioFromPageState, setLinkInBioFromPageState] = useRecoilState(
    LinkInBioFromPageRState
  );

  // Recoil state link-in-bio form state (for editing or creating link-in-bio)
  const [linkInBioFormState, setLinkInBioFormState] = useRecoilState(
    NewLinkInBioFormState
  );

  const parseLinkInBioSettingData = zJsonParse(
    String(linkInBioFormState?.settings)
  ) as LinkInBIoSettingType;

  // useZNavigate for redirection
  const { zNavigatePushRoute } = useZNavigate();

  // validate the request. this hook will show success notification if the request->success is true and show error notification if request->success is false.
  const { validateRequestResponse } = useZValidateRequestResponse();

  // getting link-in-bio id from route (url), when user refresh the page the id from route will be get and link-in-bio of that id will be fetch from backend and store in NewLinkInBioFormState recoil state.
  const { editLinkInBioId } = useParams<{
    editLinkInBioId: string;
  }>();

  // fetching link-in-bio with the editLinkInBioId data from backend.
  const { data: selectedLinkInBio, refetch: refetchSelectedLinkInBio } =
    useZRQGetRequest<LinkInBioType>({
      _url: API_URL_ENUM.linkInBio_update_delete,
      _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.GET],
      _authenticated: true,
      _itemsIds: [editLinkInBioId],
      _urlDynamicParts: [':linkInBioId'],
      _shouldFetchWhenIdPassed: !editLinkInBioId ? true : false,
      _extractType: ZRQGetRequestExtractEnum.extractItem,
    });

  // Update Link-in-bio API
  const { mutateAsync: UpdateLinkInBio } = useZRQUpdateRequest({
    _url: API_URL_ENUM.linkInBio_update_delete,
    _queriesKeysToInvalidate: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.GET,
    ],
  });

  const linkInBioGetRequestFn = useCallback(async () => {
    await refetchSelectedLinkInBio();
    // eslint-disable-next-line
  }, []);

  // Refetching if the editLinkInBioId changes and if the editLinkInBioId is undefined it will redirect user to link-in-bio page.
  useEffect(() => {
    try {
      if (editLinkInBioId) {
        void linkInBioGetRequestFn();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        zNavigatePushRoute(ZaionsRoutes.AdminPanel.ZaionsDashboard.ZLinkInBio);
        showErrorNotification(error.message);
      } else {
        reportCustomError(error);
      }
    }
    // eslint-disable-next-line
  }, [editLinkInBioId]);

  // Storing link-in-bio data in recoil state.
  useEffect(() => {
    try {
      if (selectedLinkInBio && selectedLinkInBio?.id && editLinkInBioId) {
        setLinkInBioFormState((oldVal) => ({
          ...oldVal,
          ...selectedLinkInBio,
          theme: zJsonParse(
            String(selectedLinkInBio.theme)
          ) as LinkInBioThemeType,
          formMode: FormMode.EDIT,
        }));
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line
  }, [selectedLinkInBio]);

  // storing the current page info in setLinkInBioFromPageState recoil state, so we can show the appropriate content.
  useEffect(() => {
    try {
      if (routeQSearchParams && routeQSearchParams.page) {
        setLinkInBioFromPageState((oldValues) => ({
          ...oldValues,
          page: ZLinkInBioPageEnum[
            routeQSearchParams.page as ZLinkInBioPageEnum
          ],
        }));
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line
  }, [routeQSearchParams.page]);

  // formik submit function
  const formikSubmitHandler = async (reqDataStr: string) => {
    try {
      if (reqDataStr) {
        // The update api...
        const _result = await UpdateLinkInBio({
          itemIds: [editLinkInBioId],
          urlDynamicParts: [':linkInBioId'],
          requestData: reqDataStr,
        });

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
    <ZaionsIonPage pageTitle='Link In Bio Form Page'>
      <Formik
        initialValues={{
          designPageCurrentTab:
            (routeQSearchParams as { step: ZLinkInBioRHSComponentEnum })
              ?.step || ZLinkInBioRHSComponentEnum.theme,
          LinkInBioBlock: LinkInBioBlockEnum.default, // REMOVE THIS
          title: linkInBioFormState?.title || '',
          linkInBioTitle: linkInBioFormState?.linkInBioTitle || '',
          enableTitleInput: false,
          theme: {
            background: {
              bgType:
                linkInBioFormState?.theme?.background?.bgType ||
                LinkInBioThemeBackgroundEnum.solidColor,
              bgSolidColor:
                linkInBioFormState?.theme?.background?.bgSolidColor || '',
              bgGradientColors: {
                startColor:
                  linkInBioFormState?.theme?.background?.bgGradientColors
                    ?.startColor || '',
                endColor:
                  linkInBioFormState?.theme?.background?.bgGradientColors
                    ?.endColor || '',
                direction:
                  linkInBioFormState?.theme?.background?.bgGradientColors
                    ?.direction || 0,
              },
              enableBgImage:
                linkInBioFormState?.theme?.background?.enableBgImage || false,
              bgImageUrl:
                linkInBioFormState?.theme?.background?.bgImageUrl || '',
            },
            button: {
              background: {
                bgType:
                  linkInBioFormState?.theme?.button?.background?.bgType ||
                  LinkInBioThemeBackgroundEnum.solidColor,
                bgSolidColor:
                  linkInBioFormState?.theme?.button?.background?.bgSolidColor ||
                  '',
                bgGradientColors: {
                  startColor:
                    linkInBioFormState?.theme?.button?.background
                      ?.bgGradientColors?.startColor || '',
                  endColor:
                    linkInBioFormState?.theme?.button?.background
                      ?.bgGradientColors?.endColor || '',
                  direction:
                    linkInBioFormState?.theme?.button?.background
                      ?.bgGradientColors?.direction || 0,
                },
                bgImageUrl:
                  linkInBioFormState?.theme?.button?.background?.bgImageUrl ||
                  '',
              },
              type:
                linkInBioFormState?.theme?.button?.type ||
                LinkInBioButtonTypeEnum.inlineSquare,
              shadowColor:
                linkInBioFormState?.theme?.button?.shadowColor ||
                CONSTANTS.LINK_In_BIO.INITIAL_VALUES.BUTTON_SHADOW_COLOR,
            },
            font:
              linkInBioFormState?.theme?.font || LinkInBioThemeFontEnum.lato,
          },
          settings: {
            headerCode: parseLinkInBioSettingData?.headerCode || '',
            bodyCode: parseLinkInBioSettingData?.bodyCode || '',
          },
        }}
        //
        enableReinitialize
        // Submit function
        onSubmit={(values) => {
          const stringifyValue = zStringify({
            linkInBioTitle: values.linkInBioTitle,
            theme: zStringify(values.theme),
            settings: zStringify(values.settings),
          });
          setLinkInBioFormState((oldVal) => ({
            ...oldVal,
            theme: values.theme,
            formMode: FormMode.EDIT,
          }));
          void formikSubmitHandler(stringifyValue);
        }}
      >
        {({ values, setFieldValue, handleChange, handleBlur }) => {
          // zConsole({
          //   message: 'link in bio values',
          //   data: values,
          // });
          return (
            <>
              <ZIonHeader className='ion-padding-horizontal'>
                <ZIonGrid className='ion-no-padding'>
                  <ZIonRow>
                    <ZIonCol className='d-flex align-items-center' size='3'>
                      <ZIonButton
                        className='ion-text-capitalize ion-no-margin'
                        color='secondary'
                        routerLink={replaceParams(
                          ZaionsRoutes.AdminPanel.ZaionsDashboard.ZLinkInBio,
                          CONSTANTS.RouteParams
                            .folderIdToGetShortLinksOrLinkInBio,
                          ''
                        )}
                      >
                        <ZIonText className='ion-no-padding zaions__fs_16'>
                          Home
                        </ZIonText>
                      </ZIonButton>
                      <div className='ms-2'>
                        {values.enableTitleInput && (
                          <ZIonItem
                            className={classNames({
                              'ion-no-padding ion-no-margin me-2 border': true,
                            })}
                            lines='none'
                            style={{
                              '--min-height': '46px',
                              '--inner-padding-end': '0',
                            }}
                          >
                            <ZIonInput
                              name='linkInBioTitle'
                              value={values.linkInBioTitle}
                              onIonChange={handleChange}
                              onIonBlur={handleBlur}
                              className={classNames(
                                classes['link-in-bio-title-field'],
                                {
                                  'zaions__fs_18 m-2': true,
                                }
                              )}
                            />
                            <ZIonButton
                              className='ion-text-capitalize ion-no-margin zaions__h100'
                              expand='full'
                              size='large'
                              onClick={() => {
                                setFieldValue('enableTitleInput', false, false);
                              }}
                            >
                              <ZIonText className='zaions__fs_12'>
                                save
                              </ZIonText>
                            </ZIonButton>
                          </ZIonItem>
                        )}
                        {!values.enableTitleInput && (
                          <ZIonText
                            className='zaions__fs_18 d-flex zaions__cursor_pointer ms-2'
                            onClick={() => {
                              setFieldValue('enableTitleInput', true, false);
                            }}
                          >
                            <ZIonText className='me-2'>
                              {values.linkInBioTitle}
                            </ZIonText>
                            <ZIonIcon
                              icon={pencilOutline}
                              className='mt-1'
                              color='primary'
                            />
                          </ZIonText>
                        )}
                      </div>
                    </ZIonCol>

                    <ZIonCol size='6'>
                      <ZIonSegment value={linkInBioFromPageState.page}>
                        <ZIonSegmentButton
                          value='design'
                          className='ion-text-capitalize'
                          onClick={() => {
                            zNavigatePushRoute(
                              createRedirectRoute({
                                url: ZaionsRoutes.AdminPanel
                                  .ZaionsAdminEditLinkInBioRoute,
                                params: [
                                  CONSTANTS.RouteParams.editLinkInBioIdParam,
                                ],
                                values: [editLinkInBioId],
                                routeSearchParams: {
                                  page: ZLinkInBioPageEnum.design,
                                  step: ZLinkInBioRHSComponentEnum.theme,
                                },
                              })
                            );
                          }}
                        >
                          <ZIonLabel className='fw-bold letter-spacing-0px'>
                            Design
                          </ZIonLabel>
                        </ZIonSegmentButton>

                        <ZIonSegmentButton
                          value='shareSettings'
                          className='ion-text-capitalize'
                          onClick={() => {
                            zNavigatePushRoute(
                              createRedirectRoute({
                                url: ZaionsRoutes.AdminPanel
                                  .ZaionsAdminEditLinkInBioRoute,
                                params: [
                                  CONSTANTS.RouteParams.editLinkInBioIdParam,
                                ],
                                values: [editLinkInBioId],
                                routeSearchParams: {
                                  page: ZLinkInBioPageEnum.shareSettings,
                                },
                              })
                            );
                          }}
                        >
                          <ZIonLabel className='fw-bold letter-spacing-0px'>
                            Share settings
                          </ZIonLabel>
                        </ZIonSegmentButton>

                        <ZIonSegmentButton
                          value='pageAnalytics'
                          className='ion-text-capitalize'
                          onClick={() => {
                            zNavigatePushRoute(
                              createRedirectRoute({
                                url: ZaionsRoutes.AdminPanel
                                  .ZaionsAdminEditLinkInBioRoute,
                                params: [
                                  CONSTANTS.RouteParams.editLinkInBioIdParam,
                                ],
                                values: [editLinkInBioId],
                                routeSearchParams: {
                                  page: ZLinkInBioPageEnum.pageAnalytics,
                                },
                              })
                            );
                          }}
                        >
                          <ZIonLabel className='fw-bold letter-spacing-0px'>
                            Page Analytics
                          </ZIonLabel>
                        </ZIonSegmentButton>

                        <ZIonSegmentButton
                          value='lead'
                          className='ion-text-capitalize'
                          onClick={() => {
                            zNavigatePushRoute(
                              createRedirectRoute({
                                url: ZaionsRoutes.AdminPanel
                                  .ZaionsAdminEditLinkInBioRoute,
                                params: [
                                  CONSTANTS.RouteParams.editLinkInBioIdParam,
                                ],
                                values: [editLinkInBioId],
                                routeSearchParams: {
                                  page: ZLinkInBioPageEnum.lead,
                                },
                              })
                            );
                          }}
                        >
                          <ZIonLabel className='fw-bold letter-spacing-0px'>
                            Lead
                          </ZIonLabel>
                        </ZIonSegmentButton>

                        <ZIonSegmentButton
                          value='block-analytics'
                          className='ion-text-capitalize'
                        >
                          <ZIonLabel className='fw-bold letter-spacing-0px'>
                            Block Analytics
                          </ZIonLabel>
                        </ZIonSegmentButton>
                      </ZIonSegment>
                    </ZIonCol>

                    <ZIonCol className='d-flex ion-align-items-center ion-justify-content-end'>
                      <ZIonButton
                        className='ion-text-lowercase ion-no-margin me-4'
                        color='danger'
                      >
                        <ZIonText className='ion-no-padding zaions__fs_16'>
                          errors
                        </ZIonText>
                      </ZIonButton>
                      <ZIonButton className='ion-text-capitalize ion-no-margin'>
                        <ZIonText className='ion-no-padding zaions__fs_16'>
                          Upgrade
                        </ZIonText>
                      </ZIonButton>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonHeader>

              {/* Design  */}
              {linkInBioFromPageState.page === ZLinkInBioPageEnum.design && (
                <LinkInBioDesignPage />
              )}

              {/* Share Settings */}
              {linkInBioFromPageState.page ===
                ZLinkInBioPageEnum.shareSettings && <LinkInBioShareSettings />}

              {linkInBioFromPageState.page ===
                ZLinkInBioPageEnum.pageAnalytics && <LinkInBioPageAnalytics />}
            </>
          );
        }}
      </Formik>
    </ZaionsIonPage>
  );
};

export default ZaionsLinkInBioForm;
