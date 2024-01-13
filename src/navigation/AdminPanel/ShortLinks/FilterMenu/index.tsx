/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { type ItemReorderEventDetail } from '@ionic/core';
import { menuController } from '@ionic/core/components';
import {
  closeOutline,
  cloudDownloadOutline,
  cloudUploadOutline
} from 'ionicons/icons';
import { Formik } from 'formik';
import { useParams } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import classNames from 'classnames';

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
  ZIonFooter,
  ZIonHeader,
  ZIonIcon,
  ZIonItem,
  ZIonMenu,
  ZIonReorder,
  ZIonReorderGroup,
  ZIonRow,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';
import ZaionsRSelect from '@/components/CustomComponents/ZaionsRSelect';

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
import {
  API_URL_ENUM,
  ZWSTypeEum,
  extractInnerDataOptionsEnum
} from '@/utils/enums';
import { ShortLinksTableColumns } from '@/utils/constants/columns';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  type ZUserSettingInterface,
  ZUserSettingTypeEnum
} from '@/types/AdminPanel/index.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import {
  TimeFilterEnum,
  ZShortLinkListPageTableColumnsIds
} from '@/types/AdminPanel/linksType';
import { type ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import {
  ShortLinksFieldsDataRStateSelector,
  ShortLinksFilterOptionsRStateAtom
} from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkState.recoil';
import MESSAGES from '@/utils/messages';

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

const ZShortLinksFilterMenu: React.FC = () => {
  // getting current workspace id Or wsShareId & shareWSMemberId form params. if workspaceId then this will be owned-workspace else if wsShareId & shareWSMemberId then this will be share-workspace
  const { workspaceId, shareWSMemberId, wsShareId } = useParams<{
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  // #region compState.
  const [compState, setCompState] = useState<{
    shortLinkColumn?: Array<{
      id?: string;
      name: string;
      isVisible: boolean;
      orderNumber: number;
    }>;
    columnOrderIds: string[];
    filters?: {
      tags?: string[];
      domains?: string[];
      time?: TimeFilterEnum;
    };
  }>({
    columnOrderIds: [],
    filters: {
      tags: [],
      domains: [],
      time: TimeFilterEnum.allTime
    }
  });
  // #endregion

  // #region custom hooks.
  const { isLgScale } = useZMediaQueryScale();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  // #endregion

  // #region Recoils.
  // Recoil state for storing filter options for short-links.
  const setShortLinksFilterOptions = useSetRecoilState(
    ShortLinksFilterOptionsRStateAtom
  );
  // For getting all tags data
  const { tags: _shortLinksFieldsDataTagsSelector } = useRecoilValue(
    ShortLinksFieldsDataRStateSelector
  );

  // For getting all domains data
  const { domains: _shortLinksFieldsDataDomainsSelector } = useRecoilValue(
    ShortLinksFieldsDataRStateSelector
  );
  // Recoil state for shortLinks.
  // const shortLinksStateAtom = useRecoilValue(ShortLinksRStateAtom);
  // //
  // const setNewShortLinkFormState = useSetRecoilState(NewShortLinkFormState);

  // const setNewShortLinkTypeOptionDataAtom = useSetRecoilState(
  // NewShortLinkSelectTypeOption
  // );
  // #endregion

  // #region APIs.
  // Update short link other settings create api.
  const { mutateAsync: updateUserSettingsAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.user_setting_delete_update_get,
    _loaderMessage: MESSAGES.SHORT_LINKS.FILTERING
  });

  // Create short link other settings update api.
  const { mutateAsync: createUserSettingsAsyncMutate } = useZRQCreateRequest({
    _url: API_URL_ENUM.user_setting_list_create,
    _loaderMessage: MESSAGES.SHORT_LINKS.FILTERING,
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

  // Get short link other settings get api.
  const { data: getShortLinkFiltersData } =
    useZRQGetRequest<ZUserSettingInterface>({
      _url: API_URL_ENUM.user_setting_delete_update_get,
      _key:
        workspaceId !== undefined &&
        workspaceId !== null &&
        workspaceId?.trim()?.length > 0
          ? [
              CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET,
              workspaceId,
              ZUserSettingTypeEnum.shortLinkListPageTable
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
              ZUserSettingTypeEnum.shortLinkListPageTable
            ]
          : [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET],
      _itemsIds:
        workspaceId !== undefined &&
        workspaceId !== null &&
        workspaceId?.trim()?.length > 0
          ? [
              ZWSTypeEum.personalWorkspace,
              workspaceId,
              ZUserSettingTypeEnum.shortLinkListPageTable
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
              ZUserSettingTypeEnum.shortLinkListPageTable
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
        getShortLinkFiltersData?.type !== null &&
        getShortLinkFiltersData?.settings?.columns !== undefined
      ) {
        setCompState(_oldValue => ({
          ..._oldValue,
          shortLinkColumn: getShortLinkFiltersData?.settings?.columns,
          filters: getShortLinkFiltersData?.settings?.filters
        }));
      }
    } catch (error) {
      reportCustomError(error);
    }
  }, [getShortLinkFiltersData]);

  // #region Functions.
  const handleCarouselCardReorder = (
    event: CustomEvent<ItemReorderEventDetail>
  ): void => {
    event.detail.complete();

    setTimeout(() => {
      const _shortLinksListColumnsEls = document.querySelectorAll(
        '.zaions-short-link-list-table-column'
      );
      const _shortLinksColumnIds: string[] = [
        ZShortLinkListPageTableColumnsIds.id
      ];
      for (let i = 0; i < _shortLinksListColumnsEls.length; i++) {
        const _block = _shortLinksListColumnsEls[i];
        // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
        _shortLinksColumnIds.push(_block.getAttribute('data-id') as string);
      }

      if (_shortLinksColumnIds?.length > 0) {
        setCompState(oldValues => ({
          ...oldValues,
          columnOrderIds: _shortLinksColumnIds
        }));
      }
    }, 100);
  };

  const FormikSubmitHandler = async (_value: string): Promise<void> => {
    try {
      if (_value?.trim()?.length > 0) {
        let _response;

        if (
          getShortLinkFiltersData?.type ===
          ZUserSettingTypeEnum.shortLinkListPageTable
        ) {
          _response = await updateUserSettingsAsyncMutate({
            itemIds:
              workspaceId !== undefined &&
              workspaceId !== null &&
              workspaceId?.trim()?.length > 0
                ? [
                    ZWSTypeEum.personalWorkspace,
                    workspaceId,
                    ZUserSettingTypeEnum.shortLinkListPageTable
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
                    ZUserSettingTypeEnum.shortLinkListPageTable
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
          _response = await createUserSettingsAsyncMutate(_value);
        }

        if (_response !== undefined && _response !== null) {
          // extract Data from _response.
          const _data = extractInnerData<ZUserSettingInterface>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          // if we have data then show success message.
          if (_data?.id !== undefined && _data?.id !== null) {
            if (
              workspaceId !== undefined &&
              workspaceId !== null &&
              workspaceId?.trim()?.length > 0
            ) {
              await updateRQCDataHandler<ZUserSettingInterface | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET,
                  workspaceId,
                  ZUserSettingTypeEnum.shortLinkListPageTable
                ],
                data: _data,
                id: '',
                extractType: ZRQGetRequestExtractEnum.extractItem,
                updateHoleData: true
              });
            } else if (
              wsShareId !== undefined &&
              wsShareId !== null &&
              wsShareId?.trim()?.length > 0 &&
              shareWSMemberId !== undefined &&
              shareWSMemberId !== null &&
              shareWSMemberId?.trim()?.length > 0
            ) {
              await updateRQCDataHandler<ZUserSettingInterface | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.SWS_GET,
                  wsShareId,
                  shareWSMemberId,
                  ZUserSettingTypeEnum.shortLinkListPageTable
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
    columns: compState?.shortLinkColumn ?? ShortLinksTableColumns,
    // columns: ShortLinksTableColumns,

    filters: {
      tags: compState?.filters?.tags ?? [],
      domains: compState?.filters?.domains ?? [],
      time: compState?.filters?.time ?? TimeFilterEnum.allTime
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
      testingselector={CONSTANTS.testingSelectors.shortLink.filterMenu.mainMenu}
      contentId={CONSTANTS.PAGE_IDS.AD_SL_LIST_PAGE}
      menuId={CONSTANTS.MENU_IDS.SL_FILTERS_MENU_ID}
      style={
        isLgScale
          ? {
              '--width': '27%'
            }
          : {}
      }>
      {/* Header */}
      <ZIonHeader className='flex py-2 border-b shadow-none ps-3 pe-2 ion-align-items-center ion-no-padding ion-justify-content-between'>
        <ZIonTitle
          className={classNames({
            'block font-semibold ion-no-padding': true,
            'text-xl': isLgScale,
            'text-lg': !isLgScale
          })}>
          Filter short links & table UI
        </ZIonTitle>

        <ZIonIcon
          icon={closeOutline}
          className='w-6 h-6 pt-[2px] cursor-pointer'
          testingselector={
            CONSTANTS.testingSelectors.shortLink.filterMenu.menuCloseBtn
          }
          onClick={() => {
            void menuController.close(CONSTANTS.MENU_IDS.SL_FILTERS_MENU_ID);
          }}
        />
      </ZIonHeader>

      {/* Content */}
      <ZIonContent className='ion-padding-top'>
        {/* Columns visibility accordion */}
        <Formik
          initialValues={formikInitialValues}
          enableReinitialize={true}
          onSubmit={async values => {
            try {
              const _domains = Array.from(
                values.filters.domains as ZaionsRSelectOptions[],
                ({ value }) => value ?? ''
              );

              const _tags = Array.from(
                values.filters.tags as ZaionsRSelectOptions[],
                ({ value }) => value ?? ''
              );

              setShortLinksFilterOptions(oldVales => ({
                ...oldVales,
                domains: [..._domains],
                tags: { ..._tags }
              }));

              const zStringifyData = zStringify({
                type: ZUserSettingTypeEnum.shortLinkListPageTable,
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
          {({ values, setFieldValue, submitForm }) => {
            return (
              <ZIonRow>
                {/*  */}
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
                    Filter Short links.
                  </ZIonText>

                  <div className='px-3'>
                    <ZaionsRSelect
                      name='filters.time'
                      className='mt-2'
                      testingselector={
                        CONSTANTS.testingSelectors.shortLink.filterMenu
                          .timeSelector
                      }
                      onChange={_value => {
                        void setFieldValue(
                          'filters.time',
                          (_value as ZaionsRSelectOptions).value,
                          true
                        );
                      }}
                      value={CONSTANTS.ZTimeSelectData?.find(
                        el =>
                          (el.value as TimeFilterEnum) ===
                          (values.filters.time as unknown as TimeFilterEnum)
                      )}
                      options={CONSTANTS.ZTimeSelectData}
                    />

                    {/* Tags filter */}
                    <ZaionsRSelect
                      isMulti={true}
                      name='filters.tags'
                      className='mt-2'
                      testingselector={
                        CONSTANTS.testingSelectors.shortLink.filterMenu
                          .tagsSelector
                      }
                      onChange={_value => {
                        void setFieldValue('filters.tags', _value, true);
                      }}
                      options={
                        _shortLinksFieldsDataTagsSelector?.length > 0
                          ? _shortLinksFieldsDataTagsSelector.map(el => {
                              return {
                                value: el,
                                label: el
                              };
                            })
                          : []
                      }
                    />

                    {/* Domain filter */}
                    <ZaionsRSelect
                      isMulti={true}
                      name='filters.domains'
                      className='mt-2'
                      testingselector={
                        CONSTANTS.testingSelectors.shortLink.filterMenu
                          .domainsSelector
                      }
                      onChange={_value => {
                        void setFieldValue('filters.domains', _value, true);
                      }}
                      options={
                        _shortLinksFieldsDataDomainsSelector?.length > 0
                          ? _shortLinksFieldsDataDomainsSelector?.map(el => {
                              return {
                                value: el,
                                label: el
                              };
                            })
                          : []
                      }
                    />

                    <ZIonButton
                      expand='block'
                      className='mt-3'
                      testingselector={
                        CONSTANTS.testingSelectors.shortLink.filterMenu
                          .filterSlBtn
                      }
                      onClick={() => {
                        void submitForm();
                      }}>
                      Save
                    </ZIonButton>
                  </div>
                </ZIonCol>

                {/*  */}
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
                        className='px-2 py-2 mx-1 zaions__light_bg'
                        slot='content'>
                        <ZIonReorderGroup
                          onIonItemReorder={handleCarouselCardReorder}
                          disabled={false}>
                          {values.columns.map((el, index) => {
                            return (
                              <ZIonItem
                                key={index}
                                lines='full'
                                minHeight='2rem'
                                color='light'
                                className='zaions-short-link-list-table-column'
                                data-id={el?.id}
                                style={libListTableColumnStyle}
                                testingselector={`${CONSTANTS.testingSelectors.shortLink.filterMenu.reorderItem}-${el.name}`}>
                                <ZIonReorder
                                  slot='start'
                                  className='me-3'
                                  testingselector={`${CONSTANTS.testingSelectors.shortLink.filterMenu.reorderItem}-${el.name}-reorder`}
                                />
                                <ZIonText
                                  className='text-sm'
                                  testingselector={`${CONSTANTS.testingSelectors.shortLink.filterMenu.reorderItem}-${el.name}-name`}>
                                  {el.name}
                                </ZIonText>

                                <ZIonText slot='end'>
                                  <ZRCSwitch
                                    checked={el.isVisible}
                                    testingselector={`${CONSTANTS.testingSelectors.shortLink.filterMenu.reorderItem}-${el.name}-switch`}
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
                      CONSTANTS.testingSelectors.shortLink.filterMenu
                        .reorderSaveBtn
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

      <ZIonFooter>
        <div
          className={classNames({
            'mt-1 mb-2 px-3 flex gap-1': true,
            'flex-col': !isLgScale
          })}>
          <ZIonButton
            testingselector={
              CONSTANTS.testingSelectors.shortLink.filterMenu.exportBtn
            }
            className={classNames({
              'ion-no-margin mt-2': true,
              'w-1/2': isLgScale,
              'w-full': !isLgScale
            })}
            color='tertiary'>
            <ZIonIcon
              testingselector={`${CONSTANTS.testingSelectors.shortLink.filterMenu.exportBtn}-icon`}
              slot='start'
              icon={cloudDownloadOutline}
            />
            <ZIonText
              className='mt-1 ms-1'
              testingselector={`${CONSTANTS.testingSelectors.shortLink.filterMenu.exportBtn}-text`}>
              Export data&apos;s
            </ZIonText>
          </ZIonButton>

          <ZIonButton
            testingselector={
              CONSTANTS.testingSelectors.shortLink.filterMenu.bulkImportBtn
            }
            className={classNames({
              'ion-no-margin mt-2': true,
              'w-1/2': isLgScale,
              'w-full': !isLgScale
            })}
            // fill='outline'
            color='tertiary'>
            <ZIonIcon
              testingselector={`${CONSTANTS.testingSelectors.shortLink.filterMenu.bulkImportBtn}-icon`}
              slot='start'
              icon={cloudUploadOutline}
            />
            <ZIonText
              className='mt-1 ms-1'
              testingselector={`${CONSTANTS.testingSelectors.shortLink.filterMenu.bulkImportBtn}-text`}>
              Bulk imports
            </ZIonText>
          </ZIonButton>
        </div>
      </ZIonFooter>
    </ZIonMenu>
  );
};

export default ZShortLinksFilterMenu;
