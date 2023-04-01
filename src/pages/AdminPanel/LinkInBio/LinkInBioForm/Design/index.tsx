/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { useFormikContext } from 'formik';
import classNames from 'classnames';
import { useRecoilState } from 'recoil';
import { ItemReorderEventDetail } from '@ionic/react';
import {
  albumsOutline,
  colorPaletteOutline,
  heartOutline,
  settingsOutline,
} from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCol,
  ZIonContent,
  ZIonFooter,
  ZIonGrid,
  ZIonIcon,
  ZIonList,
  ZIonReorderGroup,
  ZIonRouterLink,
  ZIonRow,
  ZIonText,
} from '@/components/ZIonComponents';
import ZRScrollbars from '@/components/CustomComponents/ZRScrollBar';
import ZLinkInBioBlocksSection from '@/pages/AdminPanel/LinkInBio/LinkInBioForm/Design/LinkInBioBlocks';
import ZLinkInBioBlocksForm from '@/pages/AdminPanel/LinkInBio/LinkInBioForm/Design/LinkInBioBlocksForm';
import ZLinkInBioPoweredBySection from '@/pages/AdminPanel/LinkInBio/LinkInBioForm/Design/LinkInBioPoweredBy';
import ZLinkInBioSettingsSection from '@/pages/AdminPanel/LinkInBio/LinkInBioForm/Design/LinkInBioSettings';
import ZLinkInBioThemeSection from '@/pages/AdminPanel/LinkInBio/LinkInBioForm/Design/LinkInBioTheme';
import ZLinkInBioReorderItem from '@/components/LinkInBioComponents/UI/LinkInBioReorderItem';
import {
  useZRQGetRequest,
  useZRQUpdateRequest,
} from '@/ZaionsHooks/zreactquery-hooks';
import { useZValidateRequestResponse } from '@/ZaionsHooks/zapi-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS, { PRODUCT_NAME } from '@/utils/constants';
import {
  createRedirectRoute,
  generatePredefinedThemeBackgroundValue,
  zStringify,
} from '@/utils/helpers';
import { useParams } from 'react-router';
import { API_URL_ENUM } from '@/utils/enums';
import { reportCustomError } from '@/utils/customErrorType';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  LinkInBioThemeBackgroundType,
  LinkInBioType,
  ZLinkInBioPageEnum,
  ZLinkInBioRHSComponentEnum,
} from '@/types/AdminPanel/linkInBioType';
import { LinkInBioBlockFromType } from '@/types/AdminPanel/linkInBioType/blockTypes';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { LinkInBioBlocksRState } from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioBlocksState';

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

const LinkInBioDesignPage: React.FC = () => {
  const { values, dirty, submitForm } = useFormikContext<LinkInBioType>();

  const [compState, setCompState] = useState<{
    linkInBioBlocksReorder: {
      Ids?: string[];
      isEnable?: boolean;
    };
  }>({
    linkInBioBlocksReorder: {
      isEnable: false,
    },
  });

  // getting link-in-bio id from route (url), when user refresh the page the id from route will be get and link-in-bio of that id will be fetch from backend and store in NewLinkInBioFormState recoil state.
  const { editLinkInBioId } = useParams<{
    editLinkInBioId: string;
  }>();

  // validate the request. this hook will show success notification if the request->success is true and show error notification if request->success is false.
  const { validateRequestResponse } = useZValidateRequestResponse();

  // Update Link-in-bio blocks reorder API
  const { mutateAsync: UpdateLinkInBioBlocksReorder } = useZRQUpdateRequest({
    _url: API_URL_ENUM.linInBioBlocks_reorder,
    _queriesKeysToInvalidate: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_BLOCK.MAIN,
    ],
  });

  // fetching link-in-bio - blocks with the editLinkInBioId data from backend.
  const { data: selectedLinkInBioBlocks } = useZRQGetRequest<
    LinkInBioBlockFromType[]
  >({
    _url: API_URL_ENUM.linkInBioBlock_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_BLOCK.MAIN],
    _authenticated: true,
    _itemsIds: [editLinkInBioId],
    _urlDynamicParts: [':linkInBioId'],
    _shouldFetchWhenIdPassed: !editLinkInBioId ? true : false,
    _extractType: ZRQGetRequestExtractEnum.extractItems,
  });

  // Recoil state of blocks of preview panel.
  const [linkInBioBlocksState, setLinkInBioBlocksState] = useRecoilState(
    LinkInBioBlocksRState
  );

  // handle reorder function (preview panel)
  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    // eslint-disable-next-line
    event.detail.complete();

    setTimeout(() => {
      const _linkInBioBlocksEls = document.querySelectorAll(
        '.zaions-linkInBio-block'
      );
      const _linkInBioBlocksIds: string[] = [];
      for (let i = 0; i < _linkInBioBlocksEls.length; i++) {
        const _block = _linkInBioBlocksEls[i];
        _linkInBioBlocksIds.push(
          _block.getAttribute('data-block-id') as string
        );
      }

      if (_linkInBioBlocksIds.length) {
        setCompState((_) => ({
          linkInBioBlocksReorder: {
            Ids: _linkInBioBlocksIds,
            isEnable: true,
          },
        }));
      }
    }, 100);
  };

  // Storing link-in-bio - blocks data in recoil state.
  useEffect(() => {
    try {
      if (selectedLinkInBioBlocks) {
        setLinkInBioBlocksState(selectedLinkInBioBlocks);
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line
  }, [selectedLinkInBioBlocks]);

  // blocks reorder function
  const linkInBioBlocksReOrderHandler = async () => {
    try {
      // The update api...
      const _result = await UpdateLinkInBioBlocksReorder({
        itemIds: [editLinkInBioId],
        urlDynamicParts: [':linkInBioId'],
        requestData: zStringify({
          items: compState.linkInBioBlocksReorder.Ids,
        }),
      });

      // if _result of the UpdateLinkInBioBlocksReorder api is success this showing success notification else not success then error notification.
      await validateRequestResponse({
        resultObj: _result,
      });

      // hiding the reorder button by assigning isEnable to false
      setCompState((oldValues) => ({
        ...oldValues,
        linkInBioBlocksReorder: {
          Ids: oldValues.linkInBioBlocksReorder.Ids,
          isEnable: false,
        },
      }));
    } catch (error) {
      reportCustomError(error);
    }
  };

  return (
    <>
      <ZIonContent>
        <ZIonGrid
          className='ion-no-padding ion-margin-horizontal overflow__hidden'
          style={{ height: 'calc(112% - 70px)' }}
        >
          <ZIonRow className='zaions__h100'>
            <ZIonCol
              sizeXl='6.4'
              sizeLg='6.1'
              sizeMd='6'
              sizeSm='12'
              sizeXs='12'
              className='zaions__h100'
            >
              <ZRScrollbars style={{ width: '100%', height: '100%' }}>
                <ZIonRow className='ion-padding-horizontal ion-margin-horizontal'>
                  {values.designPageCurrentTab !==
                    ZLinkInBioRHSComponentEnum.blockForm && (
                    <ZIonCol
                      sizeXl='11'
                      sizeLg='12'
                      sizeMd='12'
                      sizeSm='12'
                      sizeXs='12'
                      className='ion-padding-vertical ion-margin-top ion-margin-start'
                    >
                      <ZIonRow className='ion-align-items-center'>
                        <ZIonCol
                          className={classNames({
                            'ion-text-center': true,
                            'ion-text-left':
                              (dirty &&
                                values.designPageCurrentTab ===
                                  ZLinkInBioRHSComponentEnum.theme) ||
                              (dirty &&
                                values.designPageCurrentTab ===
                                  ZLinkInBioRHSComponentEnum.settings),
                          })}
                        >
                          <ZIonText className='zaions__fs_18'>
                            {values.designPageCurrentTab ===
                            ZLinkInBioRHSComponentEnum.theme
                              ? 'Link In Bio Theme'
                              : values.designPageCurrentTab ===
                                ZLinkInBioRHSComponentEnum.blocks
                              ? '🧙‍♂️ Drag & Drop new block'
                              : values.designPageCurrentTab ===
                                ZLinkInBioRHSComponentEnum.settings
                              ? 'Page settings'
                              : values.designPageCurrentTab ===
                                ZLinkInBioRHSComponentEnum.poweredBy
                              ? `Powered by ${PRODUCT_NAME} `
                              : ''}
                            <ZIonRouterLink className='ps-1'>
                              (help)
                            </ZIonRouterLink>
                          </ZIonText>
                        </ZIonCol>
                        {(dirty &&
                          values.designPageCurrentTab ===
                            ZLinkInBioRHSComponentEnum.theme) ||
                        (dirty &&
                          values.designPageCurrentTab ===
                            ZLinkInBioRHSComponentEnum.settings) ? (
                          <ZIonCol className='ion-text-end'>
                            <ZIonButton
                              onClick={() => {
                                void submitForm();
                              }}
                            >
                              Save
                            </ZIonButton>
                          </ZIonCol>
                        ) : (
                          ''
                        )}
                      </ZIonRow>
                    </ZIonCol>
                  )}

                  {values.designPageCurrentTab ===
                  ZLinkInBioRHSComponentEnum.theme ? (
                    <ZLinkInBioThemeSection />
                  ) : values.designPageCurrentTab ===
                    ZLinkInBioRHSComponentEnum.blocks ? (
                    <ZLinkInBioBlocksSection />
                  ) : values.designPageCurrentTab ===
                    ZLinkInBioRHSComponentEnum.settings ? (
                    <ZLinkInBioSettingsSection />
                  ) : values.designPageCurrentTab ===
                    ZLinkInBioRHSComponentEnum.poweredBy ? (
                    <ZLinkInBioPoweredBySection />
                  ) : values.designPageCurrentTab ===
                    ZLinkInBioRHSComponentEnum.blockForm ? (
                    <ZLinkInBioBlocksForm />
                  ) : (
                    ''
                  )}
                </ZIonRow>
              </ZRScrollbars>
            </ZIonCol>

            <ZIonCol
              sizeXl='5.6'
              sizeLg='5.9'
              sizeMd='6'
              sizeSm='12'
              sizeXs='12'
              className='zaions-ion-bg-color-light '
            >
              <ZRScrollbars style={{ width: '100%', height: '100%' }}>
                <ZIonContent>
                  <ZIonRow className='ion-justify-content-center ion-align-items-center zaions__h100'>
                    <ZIonCol
                      size='11'
                      style={{
                        ...generatePredefinedThemeBackgroundValue(
                          values.theme
                            .background as LinkInBioThemeBackgroundType
                        ),
                      }}
                      className={classNames(classes['zaions__view_panel'], {
                        'zaions__h85 ion-padding-start rounded': true,
                      })}
                    >
                      <ZRScrollbars style={{ width: '100%', height: '100%' }}>
                        <ZIonRow className='my-2 ion-padding-end ion-padding-bottom'>
                          <ZIonList
                            lines='none'
                            className='zaions__w100 zaions__h100 zaions__bg_transparent'
                          >
                            <ZIonReorderGroup
                              onIonItemReorder={handleReorder}
                              disabled={false}
                            >
                              {/* RHS review panel blocks. */}
                              {linkInBioBlocksState.map((el, index) => {
                                return (
                                  <ZLinkInBioReorderItem
                                    element={el}
                                    key={index}
                                  />
                                );
                              })}
                            </ZIonReorderGroup>
                          </ZIonList>
                        </ZIonRow>
                      </ZRScrollbars>
                    </ZIonCol>
                  </ZIonRow>

                  {compState?.linkInBioBlocksReorder?.isEnable && (
                    <ZIonButton
                      slot='fixed'
                      className={classNames(
                        classes['review-panel-save-reorder-btn'],
                        {
                          'ion-text-capitalize ion-no-margin': true,
                        }
                      )}
                      color='secondary'
                      expand='full'
                      size='large'
                      onClick={() => {
                        void linkInBioBlocksReOrderHandler();
                      }}
                    >
                      save reorder
                    </ZIonButton>
                  )}
                </ZIonContent>
              </ZRScrollbars>
            </ZIonCol>
          </ZIonRow>
        </ZIonGrid>
      </ZIonContent>

      <ZIonFooter className='zaions__primary_set'>
        <ZIonGrid>
          <ZIonRow>
            <ZIonCol></ZIonCol>

            <ZIonCol size='6' className='d-flex justify-content-between'>
              {/* Theme button */}
              <ZIonButton
                title='Theme'
                className='ion-text-capitalize'
                fill={
                  values.designPageCurrentTab ===
                  ZLinkInBioRHSComponentEnum.theme
                    ? 'solid'
                    : 'outline'
                }
                routerLink={createRedirectRoute({
                  url: ZaionsRoutes.AdminPanel.ZaionsAdminEditLinkInBioRoute,
                  params: [CONSTANTS.RouteParams.editLinkInBioIdParam],
                  values: [editLinkInBioId],
                  routeSearchParams: {
                    page: ZLinkInBioPageEnum.design,
                    step: ZLinkInBioRHSComponentEnum.theme,
                  },
                })}
              >
                <ZIonText className='me-2'>Theme</ZIonText>
                <ZIonIcon icon={colorPaletteOutline} />
              </ZIonButton>

              {/* Blocks button */}
              <ZIonButton
                title='Blocks'
                className='ion-text-capitalize'
                fill={
                  values.designPageCurrentTab ===
                    ZLinkInBioRHSComponentEnum.blocks ||
                  values.designPageCurrentTab ===
                    ZLinkInBioRHSComponentEnum.blockForm
                    ? 'solid'
                    : 'outline'
                }
                routerLink={createRedirectRoute({
                  url: ZaionsRoutes.AdminPanel.ZaionsAdminEditLinkInBioRoute,
                  params: [CONSTANTS.RouteParams.editLinkInBioIdParam],
                  values: [editLinkInBioId],
                  routeSearchParams: {
                    page: ZLinkInBioPageEnum.design,
                    step: ZLinkInBioRHSComponentEnum.blocks,
                  },
                })}
              >
                <ZIonText className='me-2'>Blocks</ZIonText>
                <ZIonIcon icon={albumsOutline} />
              </ZIonButton>

              {/* Setting button */}
              <ZIonButton
                title='Setting'
                className='ion-text-capitalize'
                fill={
                  values.designPageCurrentTab ===
                  ZLinkInBioRHSComponentEnum.settings
                    ? 'solid'
                    : 'outline'
                }
                routerLink={createRedirectRoute({
                  url: ZaionsRoutes.AdminPanel.ZaionsAdminEditLinkInBioRoute,
                  params: [CONSTANTS.RouteParams.editLinkInBioIdParam],
                  values: [editLinkInBioId],
                  routeSearchParams: {
                    page: ZLinkInBioPageEnum.design,
                    step: ZLinkInBioRHSComponentEnum.settings,
                  },
                })}
              >
                <ZIonText className='me-2'>Setting</ZIonText>
                <ZIonIcon icon={settingsOutline} />
              </ZIonButton>

              {/* Powered by button */}
              <ZIonButton
                title={`Powered by ${PRODUCT_NAME} `}
                className='ion-text-capitalize'
                fill={
                  values.designPageCurrentTab ===
                  ZLinkInBioRHSComponentEnum.poweredBy
                    ? 'solid'
                    : 'outline'
                }
                routerLink={createRedirectRoute({
                  url: ZaionsRoutes.AdminPanel.ZaionsAdminEditLinkInBioRoute,
                  params: [CONSTANTS.RouteParams.editLinkInBioIdParam],
                  values: [editLinkInBioId],
                  routeSearchParams: {
                    page: ZLinkInBioPageEnum.design,
                    step: ZLinkInBioRHSComponentEnum.poweredBy,
                  },
                })}
              >
                <ZIonText className='me-2'>Powered by {PRODUCT_NAME}</ZIonText>
                <ZIonIcon icon={heartOutline} />
              </ZIonButton>
            </ZIonCol>

            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>
      </ZIonFooter>
    </>
  );
};

export default LinkInBioDesignPage;
