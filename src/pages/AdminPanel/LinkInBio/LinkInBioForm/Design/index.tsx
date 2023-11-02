/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { lazy, Suspense, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { useFormikContext } from 'formik';
import classNames from 'classnames';
import { type ItemReorderEventDetail } from '@ionic/react';
import {
  albumsOutline,
  colorPaletteOutline,
  heartOutline,
  settingsOutline
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
  ZIonSkeletonText,
  ZIonText
} from '@/components/ZIonComponents';
import ZRScrollbars from '@/components/CustomComponents/ZRScrollBar';
import { ZFallbackIonSpinner2 } from '@/components/CustomComponents/FallbackSpinner';

import {
  useZRQGetRequest,
  useZRQUpdateRequest
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
  zStringify
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
  type LinkInBioThemeBackgroundType,
  type LinkInBioType,
  ZLinkInBioPageEnum,
  ZLinkInBioRHSComponentEnum
} from '@/types/AdminPanel/linkInBioType';
import { type LinkInBioBlockFromType } from '@/types/AdminPanel/linkInBioType/blockTypes';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
import classes from './styles.module.css';

const ZLinkInBioBlocksSection = lazy(
  () =>
    import('@/pages/AdminPanel/LinkInBio/LinkInBioForm/Design/LinkInBioBlocks')
);
const ZLinkInBioBlocksForm = lazy(
  () =>
    import(
      '@/pages/AdminPanel/LinkInBio/LinkInBioForm/Design/LinkInBioBlocksForm'
    )
);
const ZLinkInBioPoweredBySection = lazy(
  () =>
    import(
      '@/pages/AdminPanel/LinkInBio/LinkInBioForm/Design/LinkInBioPoweredBy'
    )
);
const ZLinkInBioSettingsSection = lazy(
  () =>
    import(
      '@/pages/AdminPanel/LinkInBio/LinkInBioForm/Design/LinkInBioSettings'
    )
);
const ZLinkInBioThemeSection = lazy(
  () =>
    import('@/pages/AdminPanel/LinkInBio/LinkInBioForm/Design/LinkInBioTheme')
);
const ZLinkInBioReorderItem = lazy(
  () => import('@/components/LinkInBioComponents/UI/LinkInBioReorderItem')
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

const LinkInBioDesignPage: React.FC = () => {
  const { values, dirty, submitForm } = useFormikContext<LinkInBioType>();

  // #region Component states
  const [compState, setCompState] = useState<{
    linkInBioBlocksReorder: {
      Ids?: string[];
      isEnable?: boolean;
    };
  }>({
    linkInBioBlocksReorder: {
      isEnable: false
    }
  });
  // #endregion

  // getting link-in-bio id from route (url), when user refresh the page the id from route will be get and link-in-bio of that id will be fetch from backend and store in NewLinkInBioFormState recoil state.
  const { linkInBioId, workspaceId } = useParams<{
    linkInBioId: string;
    workspaceId: string;
  }>();

  // #region Custom hooks.
  // validate the request. this hook will show success notification if the request->success is true and show error notification if request->success is false.
  const { validateRequestResponse } = useZValidateRequestResponse();
  // #endregion

  // #region APIS
  // Update Link-in-bio blocks reorder API
  const { mutateAsync: UpdateLinkInBioBlocksReorder } = useZRQUpdateRequest({
    _url: API_URL_ENUM.linkInBioBlocks_reorder,
    _queriesKeysToInvalidate: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_BLOCK.MAIN,
      workspaceId,
      linkInBioId
    ]
  });

  // fetching link-in-bio - blocks with the linkInBioId data from backend.
  const {
    data: selectedLinkInBioBlocks,
    isFetching: isSelectedLinkInBioBlocksFetching
  } = useZRQGetRequest<LinkInBioBlockFromType[]>({
    _url: API_URL_ENUM.linkInBioBlock_create_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_BLOCK.MAIN,
      workspaceId,
      linkInBioId
    ],
    _itemsIds: [workspaceId, linkInBioId],
    _urlDynamicParts: [
      CONSTANTS.RouteParams.workspace.workspaceId,
      CONSTANTS.RouteParams.linkInBio.linkInBioId
    ],
    _shouldFetchWhenIdPassed: !(
      linkInBioId !== undefined && linkInBioId?.trim()?.length > 0
    ),
    _extractType: ZRQGetRequestExtractEnum.extractItems
  });
  // #endregion

  // #region Functions.
  // handle reorder function (preview panel)
  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>): void => {
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

      if (_linkInBioBlocksIds.length > 0) {
        setCompState(_ => ({
          linkInBioBlocksReorder: {
            Ids: _linkInBioBlocksIds,
            isEnable: true
          }
        }));
      }
    }, 100);
  };

  // blocks reorder function
  const linkInBioBlocksReOrderHandler = async (): Promise<void> => {
    try {
      // The update api...
      const _result = await UpdateLinkInBioBlocksReorder({
        itemIds: [workspaceId, linkInBioId],
        urlDynamicParts: [
          CONSTANTS.RouteParams.workspace.workspaceId,
          CONSTANTS.RouteParams.linkInBio.linkInBioId
        ],
        requestData: zStringify({
          items: compState.linkInBioBlocksReorder.Ids
        })
      });

      // if _result of the UpdateLinkInBioBlocksReorder api is success this showing success notification else not success then error notification.
      await validateRequestResponse({
        resultObj: _result
      });

      // hiding the reorder button by assigning isEnable to false
      setCompState(oldValues => ({
        ...oldValues,
        linkInBioBlocksReorder: {
          Ids: oldValues.linkInBioBlocksReorder.Ids,
          isEnable: false
        }
      }));
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  const isZFetching = isSelectedLinkInBioBlocksFetching;

  return (
    <Suspense fallback={<ZFallbackIonSpinner2 />}>
      <ZIonContent>
        <ZIonGrid
          className='overflow-hidden ion-no-padding ion-margin-horizontal'
          style={{ height: 'calc(112% - 70px)' }}>
          <ZIonRow className='h-full'>
            <ZIonCol
              sizeXl='6.4'
              sizeLg='6.1'
              sizeMd='6'
              sizeSm='12'
              sizeXs='12'
              className='h-full'>
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
                      className='ion-padding-vertical ion-margin-top ion-margin-start'>
                      <ZIonRow
                        className='ion-align-items-center'
                        testingselector={
                          CONSTANTS.testingSelectors.linkInBio.formPage.design
                            .TopTitleBar.container
                        }>
                        <ZIonCol
                          testingselector={
                            CONSTANTS.testingSelectors.linkInBio.formPage.design
                              .TopTitleBar.titleCol
                          }
                          className={classNames({
                            'ion-text-center': true,
                            'ion-text-left':
                              (dirty &&
                                values.designPageCurrentTab ===
                                  ZLinkInBioRHSComponentEnum.theme) ||
                              (dirty &&
                                values.designPageCurrentTab ===
                                  ZLinkInBioRHSComponentEnum.settings)
                          })}>
                          <ZIonText
                            className='text-2xl font-bold'
                            testingselector={
                              CONSTANTS.testingSelectors.linkInBio.formPage
                                .design.TopTitleBar.title
                            }>
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
                          <ZIonCol
                            className='ion-text-end'
                            testingselector={
                              CONSTANTS.testingSelectors.linkInBio.formPage
                                .design.TopTitleBar.saveBtnCol
                            }>
                            <ZIonButton
                              testingselector={
                                CONSTANTS.testingSelectors.linkInBio.formPage
                                  .design.TopTitleBar.saveBtn
                              }
                              onClick={() => {
                                void submitForm();
                              }}>
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
              sizeXs='12'>
              <ZRScrollbars style={{ width: '100%', height: '100%' }}>
                <ZIonContent>
                  <ZIonRow className='h-full ion-justify-content-center ion-align-items-center'>
                    {!isZFetching && (
                      <ZIonCol
                        size='11'
                        style={{
                          ...generatePredefinedThemeBackgroundValue(
                            values.theme
                              .background as LinkInBioThemeBackgroundType
                          )
                        }}
                        className={classNames(classes.zaions__view_panel, {
                          'h-[85%] ion-padding-start rounded': true
                        })}>
                        <ZRScrollbars style={{ width: '100%', height: '100%' }}>
                          <ZIonRow className='my-2 ion-padding-end ion-padding-bottom'>
                            <ZIonList
                              lines='none'
                              className='w-full h-full bg-transparent'>
                              <ZIonReorderGroup
                                onIonItemReorder={handleReorder}
                                disabled={false}>
                                {/* RHS review panel blocks. */}
                                {selectedLinkInBioBlocks?.map((el, index) => {
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
                    )}

                    {/* Skeleton */}
                    {isZFetching && (
                      <ZIonCol
                        size='11'
                        className={classNames(classes.zaions__view_panel, {
                          'h-[85%] rounded': true
                        })}>
                        <ZIonSkeletonText
                          width='100%'
                          height='100%'
                          animated={true}
                        />
                      </ZIonCol>
                    )}
                  </ZIonRow>

                  {compState?.linkInBioBlocksReorder?.isEnable === true && (
                    <ZIonButton
                      slot='fixed'
                      className={classNames(
                        classes['review-panel-save-reorder-btn'],
                        {
                          'ion-text-capitalize ion-no-margin': true
                        }
                      )}
                      color='secondary'
                      expand='full'
                      size='large'
                      onClick={() => {
                        void linkInBioBlocksReOrderHandler();
                      }}>
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

            <ZIonCol
              size='6'
              className='flex ion-justify-content-between'>
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
                testingselector={
                  CONSTANTS.testingSelectors.linkInBio.formPage.design
                    .bottomTabs.theme
                }
                routerLink={createRedirectRoute({
                  url: ZaionsRoutes.AdminPanel.LinkInBio.Edit,
                  params: [
                    CONSTANTS.RouteParams.workspace.workspaceId,
                    CONSTANTS.RouteParams.linkInBio.linkInBioId
                  ],
                  values: [workspaceId, linkInBioId],
                  routeSearchParams: {
                    page: ZLinkInBioPageEnum.design,
                    step: ZLinkInBioRHSComponentEnum.theme
                  }
                })}>
                <ZIonText className='me-2'>Theme</ZIonText>
                <ZIonIcon icon={colorPaletteOutline} />
              </ZIonButton>

              {/* Blocks button */}
              <ZIonButton
                title='Blocks'
                className='ion-text-capitalize'
                testingselector={
                  CONSTANTS.testingSelectors.linkInBio.formPage.design
                    .bottomTabs.blocks
                }
                fill={
                  values.designPageCurrentTab ===
                    ZLinkInBioRHSComponentEnum.blocks ||
                  values.designPageCurrentTab ===
                    ZLinkInBioRHSComponentEnum.blockForm
                    ? 'solid'
                    : 'outline'
                }
                routerLink={createRedirectRoute({
                  url: ZaionsRoutes.AdminPanel.LinkInBio.Edit,
                  params: [
                    CONSTANTS.RouteParams.workspace.workspaceId,
                    CONSTANTS.RouteParams.linkInBio.linkInBioId
                  ],
                  values: [workspaceId, linkInBioId],
                  routeSearchParams: {
                    page: ZLinkInBioPageEnum.design,
                    step: ZLinkInBioRHSComponentEnum.blocks
                  }
                })}>
                <ZIonText className='me-2'>Blocks</ZIonText>
                <ZIonIcon icon={albumsOutline} />
              </ZIonButton>

              {/* Setting button */}
              <ZIonButton
                title='Setting'
                className='ion-text-capitalize'
                testingselector={
                  CONSTANTS.testingSelectors.linkInBio.formPage.design
                    .bottomTabs.settings
                }
                fill={
                  values.designPageCurrentTab ===
                  ZLinkInBioRHSComponentEnum.settings
                    ? 'solid'
                    : 'outline'
                }
                routerLink={createRedirectRoute({
                  url: ZaionsRoutes.AdminPanel.LinkInBio.Edit,
                  params: [
                    CONSTANTS.RouteParams.workspace.workspaceId,
                    CONSTANTS.RouteParams.linkInBio.linkInBioId
                  ],
                  values: [workspaceId, linkInBioId],
                  routeSearchParams: {
                    page: ZLinkInBioPageEnum.design,
                    step: ZLinkInBioRHSComponentEnum.settings
                  }
                })}>
                <ZIonText className='me-2'>Setting</ZIonText>
                <ZIonIcon icon={settingsOutline} />
              </ZIonButton>

              {/* Powered by button */}
              <ZIonButton
                title={`Powered by ${PRODUCT_NAME} `}
                className='ion-text-capitalize'
                testingselector={
                  CONSTANTS.testingSelectors.linkInBio.formPage.design
                    .bottomTabs.poweredBy
                }
                fill={
                  values.designPageCurrentTab ===
                  ZLinkInBioRHSComponentEnum.poweredBy
                    ? 'solid'
                    : 'outline'
                }
                routerLink={createRedirectRoute({
                  url: ZaionsRoutes.AdminPanel.LinkInBio.Edit,
                  params: [
                    CONSTANTS.RouteParams.workspace.workspaceId,
                    CONSTANTS.RouteParams.linkInBio.linkInBioId
                  ],
                  values: [workspaceId, linkInBioId],
                  routeSearchParams: {
                    page: ZLinkInBioPageEnum.design,
                    step: ZLinkInBioRHSComponentEnum.poweredBy
                  }
                })}>
                <ZIonText className='me-2'>Powered by {PRODUCT_NAME}</ZIonText>
                <ZIonIcon icon={heartOutline} />
              </ZIonButton>
            </ZIonCol>

            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>
      </ZIonFooter>
    </Suspense>
  );
};

export default LinkInBioDesignPage;
