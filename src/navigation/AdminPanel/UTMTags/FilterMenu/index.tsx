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
import {
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
import CONSTANTS from '@/utils/constants';
import { extractInnerData, zStringify } from '@/utils/helpers';
import { reportCustomError } from '@/utils/customErrorType';
import { UtmTagTableColumns } from '@/utils/constants/columns';
import {
  API_URL_ENUM,
  ZWSTypeEum,
  extractInnerDataOptionsEnum
} from '@/utils/enums';
import MESSAGES from '@/utils/messages';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { TimeFilterEnum } from '@/types/AdminPanel/linksType';
import { type ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
import {
  ZUTMTagsListPageTableColumnsIds,
  type ZUserSettingInterface,
  ZUserSettingTypeEnum
} from '@/types/AdminPanel/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { UTMTagsFilterOptionsRStateAtom } from '@/ZaionsStore/UserDashboard/UTMTagTemplatesState';
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

const ZUTMTagsFilterMenu: React.FC = () => {
  // getting current workspace id OR wsShareId && shareWSMemberId form params.
  const { workspaceId, wsShareId, shareWSMemberId } = useParams<{
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  // #region compState.
  const [compState, setCompState] = useState<{
    utmTagsColumn?: Array<{
      id?: string;
      name: string;
      isVisible: boolean;
    }>;
    columnOrderIds: string[];
  }>({
    columnOrderIds: [],
    utmTagsColumn: UtmTagTableColumns
  });
  // #endregion

  // #region custom hooks.
  const { isLgScale } = useZMediaQueryScale();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  // #endregion

  // #region Recoil.
  // Recoil state for storing filter options for utm tags.
  const setUtmTagsFilterOptions = useSetRecoilState(
    UTMTagsFilterOptionsRStateAtom
  );
  // #endregion

  // #region APIs.
  // Update utm tags settings & filters data.
  const { mutateAsync: updateUtmTagsFilersAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.user_setting_delete_update_get,
    _loaderMessage: MESSAGES.UTM_TAGS_TEMPLATE.FILTERING
  });

  // Create utm tags settings & filters data.
  const { mutateAsync: createUtmTagsFilersAsyncMutate } = useZRQCreateRequest({
    _url: API_URL_ENUM.user_setting_list_create,
    _loaderMessage: MESSAGES.UTM_TAGS_TEMPLATE.FILTERING,
    _urlDynamicParts: [
      CONSTANTS.RouteParams.workspace.type,
      CONSTANTS.RouteParams.workspace.workspaceId
    ],
    _itemsIds:
      workspaceId !== undefined &&
      workspaceId !== null &&
      workspaceId?.trim()?.length > 0
        ? [ZWSTypeEum.personalWorkspace, workspaceId]
        : wsShareId !== undefined &&
          wsShareId !== null &&
          wsShareId?.trim()?.length > 0 &&
          shareWSMemberId !== undefined &&
          shareWSMemberId !== null &&
          shareWSMemberId?.trim()?.length > 0
        ? [ZWSTypeEum.shareWorkspace, shareWSMemberId]
        : []
  });

  // Get utm tags settings & filters data.
  const { data: getUtmTagsFiltersData } =
    useZRQGetRequest<ZUserSettingInterface>({
      _url: API_URL_ENUM.user_setting_delete_update_get,
      _key:
        workspaceId !== undefined &&
        workspaceId !== null &&
        workspaceId?.trim()?.length > 0
          ? [
              CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET,
              workspaceId,
              ZUserSettingTypeEnum.UTMTagListPageTable
            ]
          : wsShareId !== undefined &&
            wsShareId !== null &&
            wsShareId?.trim()?.length > 0 &&
            shareWSMemberId !== undefined &&
            shareWSMemberId !== null &&
            shareWSMemberId?.trim()?.length > 0
          ? [
              CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.SWS_GET,
              wsShareId,
              shareWSMemberId,
              ZUserSettingTypeEnum.UTMTagListPageTable
            ]
          : [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET],
      _itemsIds:
        workspaceId !== undefined &&
        workspaceId !== null &&
        workspaceId?.trim()?.length > 0
          ? [
              ZWSTypeEum.personalWorkspace,
              workspaceId,
              ZUserSettingTypeEnum.UTMTagListPageTable
            ]
          : wsShareId !== undefined &&
            wsShareId !== null &&
            wsShareId?.trim()?.length > 0 &&
            shareWSMemberId !== undefined &&
            shareWSMemberId !== null &&
            shareWSMemberId?.trim()?.length > 0
          ? [
              ZWSTypeEum.shareWorkspace,
              shareWSMemberId,
              ZUserSettingTypeEnum.UTMTagListPageTable
            ]
          : [],
      _urlDynamicParts: [
        CONSTANTS.RouteParams.workspace.type,
        CONSTANTS.RouteParams.workspace.workspaceId,
        CONSTANTS.RouteParams.settings.type
      ],
      _extractType: ZRQGetRequestExtractEnum.extractItem,
      _shouldFetchWhenIdPassed: !(
        ((wsShareId?.trim()?.length ?? 0) === 0 &&
          (shareWSMemberId?.trim()?.length ?? 0) === 0) ||
        (workspaceId?.trim()?.length ?? 0) === 0
      ),
      _showLoader: false
    });
  // #endregion

  useEffect(() => {
    try {
      if (
        getUtmTagsFiltersData?.type !== null &&
        getUtmTagsFiltersData?.settings?.columns !== undefined
      ) {
        setCompState(_oldValue => ({
          ..._oldValue,
          utmTagsColumn: getUtmTagsFiltersData?.settings?.columns
        }));
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUtmTagsFiltersData]);

  // #region Functions.
  const handleCarouselCardReorder = (
    event: CustomEvent<ItemReorderEventDetail>
  ): void => {
    const reorderedItems = event.detail.complete(compState.utmTagsColumn);
    const utmTagsColumnIds: string[] = [ZUTMTagsListPageTableColumnsIds.id];

    for (let i = 0; i < reorderedItems.length; i++) {
      const _block = reorderedItems[i] as {
        id?: string;
        name: string;
        isVisible: boolean;
      };
      utmTagsColumnIds.push(_block?.id ?? '');
    }

    //
    setCompState(oldValues => ({
      ...oldValues,
      // utmTagsColumn: reorderedItems,
      columnOrderIds: utmTagsColumnIds
    }));
  };

  const FormikSubmitHandler = async (_value: string): Promise<void> => {
    try {
      if (_value?.trim()?.length > 0) {
        let _response;

        if (
          getUtmTagsFiltersData?.type ===
          ZUserSettingTypeEnum.UTMTagListPageTable
        ) {
          _response = await updateUtmTagsFilersAsyncMutate({
            itemIds:
              workspaceId !== undefined &&
              workspaceId !== null &&
              workspaceId?.trim()?.length > 0
                ? [
                    ZWSTypeEum.personalWorkspace,
                    workspaceId,
                    ZUserSettingTypeEnum.UTMTagListPageTable
                  ]
                : wsShareId !== undefined &&
                  wsShareId !== null &&
                  wsShareId?.trim()?.length > 0 &&
                  shareWSMemberId !== undefined &&
                  shareWSMemberId !== null &&
                  shareWSMemberId?.trim()?.length > 0
                ? [
                    ZWSTypeEum.shareWorkspace,
                    shareWSMemberId,
                    ZUserSettingTypeEnum.UTMTagListPageTable
                  ]
                : [],
            urlDynamicParts: [
              CONSTANTS.RouteParams.workspace.type,
              CONSTANTS.RouteParams.workspace.workspaceId,
              CONSTANTS.RouteParams.settings.type
            ],
            requestData: _value
          });
        } else {
          _response = await createUtmTagsFilersAsyncMutate(_value);
        }

        if (_response !== undefined && _response !== null) {
          // extract Data from _response.
          const _data = extractInnerData<ZUserSettingInterface>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          // if we have data then show success message.
          if (_data?.id !== undefined && _data?.id !== null) {
            if ((workspaceId?.trim()?.length ?? 0) > 0) {
              await updateRQCDataHandler<ZUserSettingInterface | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET,
                  workspaceId ?? '',
                  ZUserSettingTypeEnum.UTMTagListPageTable
                ],
                data: _data,
                id: '',
                extractType: ZRQGetRequestExtractEnum.extractItem,
                updateHoleData: true
              });
            } else if (
              (wsShareId?.trim()?.length ?? 0) > 0 &&
              (shareWSMemberId?.trim()?.length ?? 0) > 0
            ) {
              await updateRQCDataHandler<ZUserSettingInterface | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.SWS_GET,
                  wsShareId ?? '',
                  ZUserSettingTypeEnum.UTMTagListPageTable
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

  const formikInitialValues = {
    columns: compState?.utmTagsColumn,

    filters: {
      time:
        getUtmTagsFiltersData?.settings?.filters?.time ??
        TimeFilterEnum.allTime,
      startDate:
        getUtmTagsFiltersData?.settings?.filters?.startDate ??
        new Date().toISOString(),
      endDate:
        getUtmTagsFiltersData?.settings?.filters?.endDate ??
        new Date().toISOString()
    }
  };

  const zIonItemStyle = {
    '--inner-padding-end': '.3rem'
  };

  const libListTableColumnStyle = {
    '--padding-bottom': '.1rem',
    '--padding-top': '.1rem',
    '--padding-start': '2px'
  };

  return (
    <ZIonMenu
      side='end'
      contentId={CONSTANTS.PAGE_IDS.ADMIN_PANEL_WS_SETTING_PAGE_ID}
      menuId={CONSTANTS.MENU_IDS.UTMTag_FILTERS_MENU_ID}
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
          (wsShareId?.trim()?.length ?? 0) > 0 &&
          (shareWSMemberId?.trim()?.length ?? 0) > 0
            ? permissionsTypeEnum.shareWSMemberPermissions
            : permissionsTypeEnum.loggedInUserPermissions
        }
        havePermissions={
          (workspaceId?.trim()?.length ?? 0) > 0
            ? [permissionsEnum.viewAny_utmTag]
            : (wsShareId?.trim()?.length ?? 0) > 0 &&
              (shareWSMemberId?.trim()?.length ?? 0) > 0
            ? [shareWSPermissionEnum.viewAny_sws_utmTag]
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
            Filter UTM tags & table UI
          </ZIonTitle>

          <ZIonIcon
            icon={closeOutline}
            className='w-6 h-6 cursor-pointer'
            testingselector={
              CONSTANTS.testingSelectors.utmTags.listPage.filterSidebar
                .closeMenuBtn
            }
            onClick={() => {
              // Close the menu by menu-id
              void menuController.close(
                CONSTANTS.MENU_IDS.UTMTag_FILTERS_MENU_ID
              );
            }}
          />
        </ZIonHeader>

        {/* Content */}
        <ZIonContent className='ion-padding-top'>
          <Formik
            initialValues={formikInitialValues}
            enableReinitialize={true}
            onSubmit={async values => {
              try {
                setUtmTagsFilterOptions(oldValues => ({
                  ...oldValues,
                  timeFilter: {
                    ...oldValues.timeFilter,
                    daysToSubtract: values?.filters?.time,
                    startedAt: values?.filters?.startDate,
                    endAt: values?.filters?.endDate
                  }
                }));

                const zStringifyData = zStringify({
                  type: ZUserSettingTypeEnum.UTMTagListPageTable,
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
                      Filter UTM tags.
                    </ZIonText>

                    <div className='px-3'>
                      <ZaionsRSelect
                        name='filters.time'
                        className='mt-2'
                        testingselector={
                          CONSTANTS.testingSelectors.utmTags.listPage
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
                            id='utmTag_filter_start_time'
                            className='w-full zaions-datetime-btn ion-no-margin'
                            testingselector={
                              CONSTANTS.testingSelectors.utmTags.listPage
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
                            id='utmTag_filter_end_time'
                            className='w-full zaions-datetime-btn ion-no-margin'
                            testingselector={
                              CONSTANTS.testingSelectors.utmTags.listPage
                                .filterSidebar.endInput
                            }
                          />
                        </>
                      ) : null}

                      <ZIonButton
                        expand='block'
                        className='mt-3'
                        testingselector={
                          CONSTANTS.testingSelectors.utmTags.listPage
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
                            CONSTANTS.testingSelectors.utmTags.listPage
                              .filterSidebar.columnAccordionHead
                          }
                          style={zIonItemStyle}>
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
                                    CONSTANTS.testingSelectors.utmTags.listPage
                                      .filterSidebar.reorderItem
                                  }
                                  testingselector={`${CONSTANTS.testingSelectors.utmTags.listPage.filterSidebar.reorderItem}-${el.id}`}
                                  style={libListTableColumnStyle}>
                                  <ZIonReorder
                                    slot='start'
                                    className='me-3 ps-2'
                                  />
                                  <ZIonText
                                    className='text-sm'
                                    testinglistselector={
                                      CONSTANTS.testingSelectors.utmTags
                                        .listPage.filterSidebar.reorderTitle
                                    }
                                    testingselector={`${CONSTANTS.testingSelectors.utmTags.listPage.filterSidebar.reorderTitle}-${el.id}`}>
                                    {el.name}
                                  </ZIonText>

                                  <ZIonText slot='end'>
                                    <ZRCSwitch
                                      testinglistselector={
                                        CONSTANTS.testingSelectors.utmTags
                                          .listPage.filterSidebar.reorderToggler
                                      }
                                      testingselector={`${CONSTANTS.testingSelectors.utmTags.listPage.filterSidebar.reorderToggler}-${el.id}`}
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
                        CONSTANTS.testingSelectors.utmTags.listPage
                          .filterSidebar.saveBtn2
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

export default ZUTMTagsFilterMenu;
