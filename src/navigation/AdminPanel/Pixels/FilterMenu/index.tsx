/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { closeOutline } from 'ionicons/icons';
import {
  type ItemReorderEventDetail,
  menuController
} from '@ionic/core/components';
import { Formik } from 'formik';
import { useSetRecoilState } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonAccordion,
  ZIonAccordionGroup,
  ZIonButton,
  ZIonCol,
  ZIonContent,
  ZIonDatetimeButton,
  ZIonHeader,
  ZIonIcon,
  ZIonItem,
  ZIonLabel,
  ZIonMenu,
  ZIonReorder,
  ZIonReorderGroup,
  ZIonRow,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';
import ZaionsRSelect from '@/components/CustomComponents/ZaionsRSelect';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import CONSTANTS from '@/utils/constants';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import {
  useZRQCreateRequest,
  useZRQGetRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { extractInnerData, zStringify } from '@/utils/helpers';
import { reportCustomError } from '@/utils/customErrorType';
import { PixelTableColumns } from '@/utils/constants/columns';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import MESSAGES from '@/utils/messages';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import {
  type PixelPlatformsEnum,
  TimeFilterEnum
} from '@/types/AdminPanel/linksType';
import { type ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
import {
  ZPixelsListPageTableColumnsIds,
  type ZUserSettingInterface,
  ZUserSettingTypeEnum
} from '@/types/AdminPanel/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { PixelsFilterOptionsRStateAtom } from '@/ZaionsStore/UserDashboard/PixelAccountsState/index.recoil';
import ZCan from '@/components/Can';
import {
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';

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

const ZPixelsFilterMenu: React.FC = () => {
  // getting current workspace id OR wsShareId && shareWSMemberId form params.
  const { workspaceId, wsShareId, shareWSMemberId } = useParams<{
    workspaceId: string;
    shareWSMemberId: string;
    wsShareId: string;
  }>();

  // #region compState.
  const [compState, setCompState] = useState<{
    pixelsColumn?: Array<{
      id?: string;
      name: string;
      isVisible: boolean;
    }>;
    columnOrderIds: string[];
  }>({
    columnOrderIds: [],
    pixelsColumn: PixelTableColumns
  });
  // #endregion

  // #region custom hooks.
  const { isLgScale } = useZMediaQueryScale();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  // #endregion

  // #region Recoil.
  // Recoil state for storing filter options for Pixel.
  const setPixelsFilterOptions = useSetRecoilState(
    PixelsFilterOptionsRStateAtom
  );
  // #endregion

  // #region APIs.
  // If owned-workspace then this api will update owned-workspace pixel settings & filters data.
  const { mutateAsync: updatePixelFilersAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.user_setting_delete_update_get,
    _loaderMessage: MESSAGES.PIXEL_ACCOUNT.FILTERING
  });

  // If share-workspace then this api will update share-workspace pixel settings & filters data.
  const { mutateAsync: updateSWSPixelFilersAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.sws_user_setting_delete_update_get,
    _loaderMessage: MESSAGES.PIXEL_ACCOUNT.FILTERING
  });

  // If owned-workspace then this api will create owned-workspace pixel settings & filters data.
  const { mutateAsync: createPixelFilersAsyncMutate } = useZRQCreateRequest({
    _url: API_URL_ENUM.user_setting_list_create,
    _loaderMessage: MESSAGES.PIXEL_ACCOUNT.FILTERING,
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _itemsIds: [workspaceId]
  });

  // If share-workspace then this api will create share-workspace pixel settings & filters data.
  const { mutateAsync: createSWSPixelFilersAsyncMutate } = useZRQCreateRequest({
    _url: API_URL_ENUM.sws_user_setting_list_create,
    _loaderMessage: MESSAGES.PIXEL_ACCOUNT.FILTERING,
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _itemsIds: [shareWSMemberId]
  });

  // If owned-workspace then this api will fetch owned-workspace pixel settings & filters data.
  const { data: getPixelFiltersData } = useZRQGetRequest<ZUserSettingInterface>(
    {
      _url: API_URL_ENUM.user_setting_delete_update_get,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET,
        workspaceId,
        ZUserSettingTypeEnum.pixelListPageTable
      ],
      _itemsIds: [workspaceId, ZUserSettingTypeEnum.pixelListPageTable],
      _urlDynamicParts: [
        CONSTANTS.RouteParams.workspace.workspaceId,
        CONSTANTS.RouteParams.settings.type
      ],
      _extractType: ZRQGetRequestExtractEnum.extractItem,
      _shouldFetchWhenIdPassed: !(
        workspaceId !== undefined && workspaceId?.trim()?.length > 0
      )
    }
  );

  // If share-workspace then this api will fetch share-workspace pixel settings & filters data.
  const { data: getSWSPixelFiltersData } =
    useZRQGetRequest<ZUserSettingInterface>({
      _url: API_URL_ENUM.sws_user_setting_delete_update_get,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.SWS_GET,
        wsShareId,
        ZUserSettingTypeEnum.pixelListPageTable
      ],
      _itemsIds: [shareWSMemberId, ZUserSettingTypeEnum.pixelListPageTable],
      _urlDynamicParts: [
        CONSTANTS.RouteParams.workspace.shareWSMemberId,
        CONSTANTS.RouteParams.settings.type
      ],
      _extractType: ZRQGetRequestExtractEnum.extractItem,
      _shouldFetchWhenIdPassed: !(
        wsShareId !== undefined &&
        wsShareId?.trim()?.length > 0 &&
        shareWSMemberId !== undefined &&
        shareWSMemberId?.trim()?.length > 0
      )
    });
  // #endregion

  useEffect(() => {
    try {
      if (
        (getPixelFiltersData?.type !== null &&
          getPixelFiltersData?.settings?.columns !== undefined) ??
        (getSWSPixelFiltersData?.type != null &&
          getSWSPixelFiltersData?.settings?.columns !== undefined)
      ) {
        setCompState(_oldValue => ({
          ..._oldValue,
          pixelsColumn:
            workspaceId !== undefined
              ? getPixelFiltersData?.settings?.columns
              : wsShareId !== undefined && shareWSMemberId !== undefined
              ? getSWSPixelFiltersData?.settings?.columns
              : _oldValue.pixelsColumn
        }));
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPixelFiltersData, getSWSPixelFiltersData]);

  // #region Functions.
  const handleCarouselCardReorder = (
    event: CustomEvent<ItemReorderEventDetail>
  ): void => {
    const reorderedItems = event.detail.complete(compState.pixelsColumn);
    const pixelsColumnIds: string[] = [ZPixelsListPageTableColumnsIds.id];

    for (let i = 0; i < reorderedItems.length; i++) {
      const _block = reorderedItems[i] as {
        id?: string;
        name: string;
        isVisible: boolean;
      };
      pixelsColumnIds.push(_block?.id ?? '');
    }

    //
    setCompState(oldValues => ({
      ...oldValues,
      // pixelsColumn: reorderedItems,
      columnOrderIds: pixelsColumnIds
    }));
  };

  const FormikSubmitHandler = async (_value: string): Promise<void> => {
    try {
      if (_value?.trim()?.length > 0) {
        let _response;

        if (
          getPixelFiltersData?.type ===
            ZUserSettingTypeEnum.pixelListPageTable ||
          getSWSPixelFiltersData?.type ===
            ZUserSettingTypeEnum.pixelListPageTable
        ) {
          if (workspaceId !== undefined) {
            _response = await updatePixelFilersAsyncMutate({
              itemIds: [workspaceId, ZUserSettingTypeEnum.pixelListPageTable],
              urlDynamicParts: [
                CONSTANTS.RouteParams.workspace.workspaceId,
                CONSTANTS.RouteParams.settings.type
              ],
              requestData: _value
            });
          } else if (wsShareId !== undefined && shareWSMemberId !== undefined) {
            _response = await updateSWSPixelFilersAsyncMutate({
              itemIds: [
                shareWSMemberId,
                ZUserSettingTypeEnum.pixelListPageTable
              ],
              urlDynamicParts: [
                CONSTANTS.RouteParams.workspace.shareWSMemberId,
                CONSTANTS.RouteParams.settings.type
              ],
              requestData: _value
            });
          }
        } else {
          if (workspaceId !== undefined) {
            _response = await createPixelFilersAsyncMutate(_value);
          } else if (wsShareId !== undefined && shareWSMemberId !== undefined) {
            _response = await createSWSPixelFilersAsyncMutate(_value);
          }
        }

        if (_response !== undefined) {
          // extract Data from _response.
          const _data = extractInnerData<ZUserSettingInterface>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          // if we have data then show success message.
          if (_data?.id !== null && _data?.id !== undefined) {
            if (workspaceId !== undefined) {
              await updateRQCDataHandler<ZUserSettingInterface | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET,
                  workspaceId,
                  ZUserSettingTypeEnum.pixelListPageTable
                ],
                data: _data,
                id: '',
                extractType: ZRQGetRequestExtractEnum.extractItem,
                updateHoleData: true
              });
            } else if (
              wsShareId !== undefined &&
              shareWSMemberId !== undefined
            ) {
              await updateRQCDataHandler<ZUserSettingInterface | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.SWS_GET,
                  wsShareId,
                  ZUserSettingTypeEnum.pixelListPageTable
                ],
                data: _data,
                id: '',
                extractType: ZRQGetRequestExtractEnum.extractItem,
                updateHoleData: true
              });
            }
          }
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  return (
    <ZIonMenu
      side='end'
      contentId={CONSTANTS.MENU_IDS.ADMIN_PANEL_WS_SETTING_PAGE_ID}
      menuId={CONSTANTS.MENU_IDS.P_FILTERS_MENU_ID}
      style={
        isLgScale
          ? {
              '--width': '27%'
            }
          : {}
      }>
      <ZCan
        shareWSId={wsShareId}
        permissionType={
          wsShareId !== undefined && shareWSMemberId !== undefined
            ? permissionsTypeEnum.shareWSMemberPermissions
            : permissionsTypeEnum.loggedInUserPermissions
        }
        havePermissions={
          workspaceId !== undefined
            ? [permissionsEnum.viewAny_pixel]
            : wsShareId !== undefined && shareWSMemberId !== undefined
            ? [shareWSPermissionEnum.viewAny_sws_pixel]
            : []
        }>
        {/* Header */}
        <ZIonHeader className='flex px-3 border-b shadow-none ion-align-items-center ion-padding ion-justify-content-between'>
          <ZIonTitle
            className={classNames({
              'block font-semibold ion-no-padding': true,
              'text-xl': isLgScale,
              'text-lg': !isLgScale
            })}>
            Filter pixels & table UI
          </ZIonTitle>

          <ZIonIcon
            icon={closeOutline}
            className='w-6 h-6 cursor-pointer'
            testingselector={
              CONSTANTS.testingSelectors.pixels.listPage.filterSidebar
                .closeMenuBtn
            }
            onClick={() => {
              void (async () => {
                // Close the menu by menu-id
                await menuController.close(
                  CONSTANTS.MENU_IDS.P_FILTERS_MENU_ID
                );
              })();
            }}
          />
        </ZIonHeader>

        {/* Content */}
        <ZIonContent className='ion-padding-top'>
          <Formik
            initialValues={{
              columns: compState?.pixelsColumn,

              filters: {
                time:
                  getPixelFiltersData?.settings?.filters?.time ??
                  getSWSPixelFiltersData?.settings?.filters?.time ??
                  TimeFilterEnum.allTime,
                startDate:
                  getPixelFiltersData?.settings?.filters?.startDate ??
                  getSWSPixelFiltersData?.settings?.filters?.startDate ??
                  new Date().toISOString(),
                endDate:
                  getPixelFiltersData?.settings?.filters?.endDate ??
                  getSWSPixelFiltersData?.settings?.filters?.endDate ??
                  new Date().toISOString(),
                platform: ''
              }
            }}
            enableReinitialize={true}
            onSubmit={async values => {
              try {
                setPixelsFilterOptions(oldValues => ({
                  ...oldValues,
                  timeFilter: {
                    ...oldValues.timeFilter,
                    daysToSubtract: values?.filters?.time,
                    startedAt: values?.filters?.startDate,
                    endAt: values?.filters?.endDate
                  },
                  platform: values?.filters?.platform as PixelPlatformsEnum
                }));

                const zStringifyData = zStringify({
                  type: ZUserSettingTypeEnum.pixelListPageTable,
                  settings: zStringify({
                    columns: values.columns,
                    columnOrderIds: compState.columnOrderIds,
                    filters: values?.filters
                  })
                });

                await FormikSubmitHandler(zStringifyData);
              } catch (error) {
                reportCustomError(error);
              }
            }}>
            {({ values, setFieldValue, handleChange, submitForm }) => {
              return (
                <ZIonRow>
                  <ZIonCol
                    size='12'
                    className='pb-3 border-b'>
                    <ZIonText
                      className={classNames({
                        'block mx-3 mb-2 text-md tracking-widest font-semibold':
                          true,
                        'text-sm': !isLgScale
                      })}
                      color='dark'>
                      Filter Pixels.
                    </ZIonText>

                    <div className='px-3'>
                      <ZaionsRSelect
                        name='filters.time'
                        className='mt-2'
                        testingselector={
                          CONSTANTS.testingSelectors.pixels.listPage
                            .filterSidebar.timeFilterInput
                        }
                        onChange={_value => {
                          void setFieldValue(
                            'filters.time',
                            (_value as ZaionsRSelectOptions).value,
                            true
                          );
                        }}
                        value={CONSTANTS.ZTimeSelectData?.find(
                          el => el.value === values.filters.time
                        )}
                        options={CONSTANTS.ZTimeSelectData}
                      />

                      {values?.filters?.time === TimeFilterEnum.customRange ? (
                        <>
                          <ZIonLabel
                            className='block mt-3 text-xs'
                            color='medium'>
                            Start time
                          </ZIonLabel>
                          <ZIonDatetimeButton
                            name='filters.startDate'
                            value={values?.filters?.startDate}
                            onIonChange={handleChange}
                            id='filter_start_time'
                            className='w-full zaions-datetime-btn ion-no-margin'
                            testingselector={
                              CONSTANTS.testingSelectors.pixels.listPage
                                .filterSidebar.startInput
                            }
                          />

                          <ZIonLabel
                            className='block mt-3 text-xs'
                            color='medium'>
                            End time
                          </ZIonLabel>
                          <ZIonDatetimeButton
                            name='filters.endDate'
                            value={values?.filters?.endDate}
                            onIonChange={handleChange}
                            min={values?.filters?.startDate}
                            id='filter_end_time'
                            className='w-full zaions-datetime-btn ion-no-margin'
                            testingselector={
                              CONSTANTS.testingSelectors.pixels.listPage
                                .filterSidebar.endInput
                            }
                          />
                        </>
                      ) : null}

                      {/*  */}
                      <ZIonLabel
                        className='block mt-3 text-xs'
                        color='medium'>
                        Platform
                      </ZIonLabel>
                      <ZaionsRSelect
                        name='filters.platform'
                        placeholder='Select platform...'
                        testingselector={
                          CONSTANTS.testingSelectors.pixels.listPage
                            .filterSidebar.platformSelect
                        }
                        onChange={_value => {
                          void setFieldValue(
                            'filters.platform',
                            (_value as ZaionsRSelectOptions).value,
                            true
                          );
                        }}
                        value={CONSTANTS?.ZPlatformOptions?.find(
                          el => el.value === values.filters.platform
                        )}
                        options={[
                          {
                            label: 'Select platform...',
                            value: undefined
                          },
                          ...CONSTANTS?.ZPlatformOptions
                        ]}
                      />

                      <ZIonButton
                        expand='block'
                        className='mt-3'
                        testingselector={
                          CONSTANTS.testingSelectors.pixels.listPage
                            .filterSidebar.saveBtn1
                        }
                        onClick={() => {
                          void submitForm();
                        }}>
                        Save
                      </ZIonButton>
                    </div>
                  </ZIonCol>

                  {/* Table UI */}
                  <ZIonCol
                    size='12'
                    className='pb-3 mt-2 border-b'>
                    <ZIonText
                      className={classNames({
                        'block mx-3 mb-2 text-md tracking-widest font-semibold':
                          true,
                        'text-sm mt-2': !isLgScale
                      })}
                      color='dark'>
                      Table UI.
                    </ZIonText>

                    <ZIonAccordionGroup>
                      <ZIonAccordion>
                        <ZIonItem
                          minHeight='2.2rem'
                          slot='header'
                          lines='none'
                          className='ps-1 h-[2.2rem] flex overflow-hidden rounded-lg cursor-pointer ion-activatable w-[104.6%]'
                          testingselector={
                            CONSTANTS.testingSelectors.pixels.listPage
                              .filterSidebar.columnAccordionHead
                          }
                          style={{
                            '--inner-padding-end': '.3rem'
                          }}>
                          <ZIonText
                            className={classNames({
                              'text-sm ion-no-margin font-semibold': true
                            })}
                            color='dark'>
                            Columns visibility & reorder:
                          </ZIonText>
                        </ZIonItem>

                        <div
                          className='mx-1 zaions__light_bg'
                          slot='content'>
                          <ZIonReorderGroup
                            onIonItemReorder={handleCarouselCardReorder}
                            disabled={false}>
                            {values?.columns?.map((el, index) => {
                              return (
                                <ZIonItem
                                  key={index}
                                  lines='full'
                                  minHeight='2rem'
                                  color='light'
                                  className='zaions-short-link-list-table-column '
                                  data-id={el?.id}
                                  testinglistselector={
                                    CONSTANTS.testingSelectors.pixels.listPage
                                      .filterSidebar.reorderItem
                                  }
                                  testingselector={`${CONSTANTS.testingSelectors.pixels.listPage.filterSidebar.reorderItem}-${el.id}`}
                                  style={{
                                    '--padding-bottom': '.1rem',
                                    '--padding-top': '.1rem',
                                    '--padding-start': '2px'
                                  }}>
                                  <ZIonReorder
                                    slot='start'
                                    className='me-3 ps-2'
                                  />
                                  <ZIonText
                                    className='text-sm'
                                    testinglistselector={
                                      CONSTANTS.testingSelectors.pixels.listPage
                                        .filterSidebar.reorderTitle
                                    }
                                    testingselector={`${CONSTANTS.testingSelectors.pixels.listPage.filterSidebar.reorderTitle}-${el.id}`}>
                                    {el.name}
                                  </ZIonText>

                                  <ZIonText slot='end'>
                                    <ZRCSwitch
                                      testinglistselector={
                                        CONSTANTS.testingSelectors.pixels
                                          .listPage.filterSidebar.reorderToggler
                                      }
                                      testingselector={`${CONSTANTS.testingSelectors.pixels.listPage.filterSidebar.reorderToggler}-${el.id}`}
                                      checked={el.isVisible}
                                      onChange={_value => {
                                        void setFieldValue(
                                          `columns.${index}.isVisible`,
                                          _value,
                                          false
                                        );
                                      }}
                                    />
                                  </ZIonText>
                                </ZIonItem>
                              );
                            })}
                          </ZIonReorderGroup>
                        </div>
                      </ZIonAccordion>
                    </ZIonAccordionGroup>

                    <ZIonButton
                      expand='block'
                      className='mx-3 mt-2'
                      testingselector={
                        CONSTANTS.testingSelectors.pixels.listPage.filterSidebar
                          .saveBtn2
                      }
                      onClick={() => {
                        void submitForm();
                      }}>
                      Save
                    </ZIonButton>
                  </ZIonCol>
                </ZIonRow>
              );
            }}
          </Formik>
        </ZIonContent>
      </ZCan>
    </ZIonMenu>
  );
};

export default ZPixelsFilterMenu;
