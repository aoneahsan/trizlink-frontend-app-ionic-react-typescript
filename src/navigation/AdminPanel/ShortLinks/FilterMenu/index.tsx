/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { menuController } from '@ionic/core/components';
import {
  closeOutline,
  cloudDownloadOutline,
  cloudUploadOutline
} from 'ionicons/icons';
import { Formik } from 'formik';
import { ItemReorderEventDetail } from '@ionic/react';
import { useParams } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
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
import {
  ShortLinksDomainsFiltersPopover,
  ShortLinksTagsFiltersPopover,
  ShortLinksTimeRangeFilterPopover
} from '@/components/InPageComponents/ZaionsPopovers/ShortLinks/FiltersPopovers';
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
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import { extractInnerData, zStringify } from '@/utils/helpers';
import { reportCustomError } from '@/utils/customErrorType';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { ShortLinksTableColumns } from '@/utils/constants/columns';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  ZUserSettingInterface,
  ZUserSettingTypeEnum
} from '@/types/AdminPanel/index.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import {
  TimeFilterEnum,
  ZShortLinkListPageTableColumnsIds
} from '@/types/AdminPanel/linksType';
import { ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';

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
    workspaceId: string;
    shareWSMemberId: string;
    wsShareId: string;
  }>();

  // #region compState.
  const [compState, setCompState] = useState<{
    shortLinkColumn?: {
      id?: string;
      name: string;
      isVisible: boolean;
      orderNumber: number;
    }[];
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
  const [shortLinksFilterOptions, setShortLinksFilterOptions] = useRecoilState(
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
  // 	NewShortLinkSelectTypeOption
  // );
  // #endregion

  // #region APIs.
  // owned workspace short link filter and short link other settings create api.
  const { mutateAsync: updateUserSettingsAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.user_setting_delete_update_get,
    _loaderMessage: MESSAGES.SHORT_LINKS.FILTERING
  });

  // share workspace short link filter and short link other settings create api.
  const { mutateAsync: swsUpdateUserSettingsAsyncMutate } = useZRQUpdateRequest(
    {
      _url: API_URL_ENUM.sws_user_setting_delete_update_get,
      _loaderMessage: MESSAGES.SHORT_LINKS.FILTERING
    }
  );

  // owned workspace short link filter and short link other settings update api.
  const { mutateAsync: createUserSettingsAsyncMutate } = useZRQCreateRequest({
    _url: API_URL_ENUM.user_setting_list_create,
    _loaderMessage: MESSAGES.SHORT_LINKS.FILTERING,
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _itemsIds: [workspaceId]
  });

  // share workspace short link filter and short link other settings update api.
  const { mutateAsync: swsCreateUserSettingsAsyncMutate } = useZRQCreateRequest(
    {
      _url: API_URL_ENUM.sws_user_setting_list_create,
      _loaderMessage: MESSAGES.SHORT_LINKS.FILTERING,
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
      _itemsIds: [shareWSMemberId]
    }
  );

  // owned workspace short link filter and short link other settings get api.
  const { data: getUserSetting, isFetching: isUserSettingFetching } =
    useZRQGetRequest<ZUserSettingInterface>({
      _url: API_URL_ENUM.user_setting_delete_update_get,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET,
        workspaceId,
        ZUserSettingTypeEnum.shortLinkListPageTable
      ],
      _itemsIds: [workspaceId, ZUserSettingTypeEnum.shortLinkListPageTable],
      _urlDynamicParts: [
        CONSTANTS.RouteParams.workspace.workspaceId,
        CONSTANTS.RouteParams.settings.type
      ],
      _extractType: ZRQGetRequestExtractEnum.extractItem,
      _shouldFetchWhenIdPassed: workspaceId ? false : true,
      _showLoader: false
    });

  // share workspace short link filter and short link other settings get api.
  const { data: swsGetUserSetting, isFetching: isSWSUserSettingFetching } =
    useZRQGetRequest<ZUserSettingInterface>({
      _url: API_URL_ENUM.sws_user_setting_delete_update_get,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.SWS_GET,
        wsShareId,
        ZUserSettingTypeEnum.shortLinkListPageTable
      ],
      _itemsIds: [shareWSMemberId, ZUserSettingTypeEnum.shortLinkListPageTable],
      _urlDynamicParts: [
        CONSTANTS.RouteParams.workspace.shareWSMemberId,
        CONSTANTS.RouteParams.settings.type
      ],
      _shouldFetchWhenIdPassed: wsShareId ? false : true,
      _extractType: ZRQGetRequestExtractEnum.extractItem,
      _showLoader: false
    });
  // #endregion

  useEffect(() => {
    try {
      if (
        workspaceId &&
        getUserSetting?.type &&
        getUserSetting?.settings?.columns
      ) {
        setCompState(_oldValue => ({
          ..._oldValue,
          shortLinkColumn: getUserSetting?.settings?.columns,
          filters: swsGetUserSetting?.settings?.filters
        }));
      } else if (wsShareId && swsGetUserSetting?.type) {
        setCompState(_oldValues => ({
          ..._oldValues,
          shortLinkColumn: swsGetUserSetting?.settings?.columns,
          filters: swsGetUserSetting?.settings?.filters
        }));
      }
    } catch (error) {
      reportCustomError(error);
    }
  }, [getUserSetting, workspaceId, swsGetUserSetting, wsShareId]);

  // #region Popovers.
  const { presentZIonPopover: presentShortLinkTimeFilterModal } =
    useZIonPopover(ShortLinksTimeRangeFilterPopover);

  const { presentZIonPopover: presentShortLinkTagsFilterModal } =
    useZIonPopover(ShortLinksTagsFiltersPopover);

  const { presentZIonPopover: presentShortLinkDomainsFilterModal } =
    useZIonPopover(ShortLinksDomainsFiltersPopover);
  // #endregion

  // #region Functions.
  const handleCarouselCardReorder = (
    event: CustomEvent<ItemReorderEventDetail>
  ) => {
    event.detail.complete();

    setTimeout(() => {
      const _shortLinksListColumnsEls = document.querySelectorAll(
        `.zaions-short-link-list-table-column`
      );
      const _shortLinksColumnIds: string[] = [
        ZShortLinkListPageTableColumnsIds.id
      ];
      for (let i = 0; i < _shortLinksListColumnsEls.length; i++) {
        const _block = _shortLinksListColumnsEls[i];
        _shortLinksColumnIds.push(_block.getAttribute('data-id') as string);
      }

      if (_shortLinksColumnIds) {
        setCompState(oldValues => ({
          ...oldValues,
          columnOrderIds: _shortLinksColumnIds
        }));
      }
    }, 100);
  };

  const FormikSubmitHandler = async (_data: string) => {
    try {
      if (_data) {
        let __response;

        if (workspaceId) {
          if (
            getUserSetting?.type === ZUserSettingTypeEnum.shortLinkListPageTable
          ) {
            __response = await updateUserSettingsAsyncMutate({
              itemIds: [
                workspaceId,
                ZUserSettingTypeEnum.shortLinkListPageTable
              ],
              urlDynamicParts: [
                CONSTANTS.RouteParams.workspace.workspaceId,
                CONSTANTS.RouteParams.settings.type
              ],
              requestData: _data
            });
          } else {
            __response = await createUserSettingsAsyncMutate(_data);
          }
        } else if (wsShareId && shareWSMemberId) {
          if (
            swsGetUserSetting?.type ===
            ZUserSettingTypeEnum.shortLinkListPageTable
          ) {
            __response = await swsUpdateUserSettingsAsyncMutate({
              itemIds: [
                shareWSMemberId,
                ZUserSettingTypeEnum.shortLinkListPageTable
              ],
              urlDynamicParts: [
                CONSTANTS.RouteParams.workspace.shareWSMemberId,
                CONSTANTS.RouteParams.settings.type
              ],
              requestData: _data
            });
          } else {
            __response = await swsCreateUserSettingsAsyncMutate(_data);
          }
        }

        if (__response) {
          // extract Data from _response.
          const __data = extractInnerData<ZUserSettingInterface>(
            __response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          // if we have data then show success message.
          if (__data && __data.id) {
            if (workspaceId) {
              await updateRQCDataHandler<ZUserSettingInterface | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET,
                  workspaceId,
                  ZUserSettingTypeEnum.shortLinkListPageTable
                ],
                data: __data,
                id: '',
                extractType: ZRQGetRequestExtractEnum.extractItem,
                updateHoleData: true
              });
            } else if (wsShareId && shareWSMemberId) {
              await updateRQCDataHandler<ZUserSettingInterface | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.SWS_GET,
                  wsShareId,
                  ZUserSettingTypeEnum.shortLinkListPageTable
                ],
                data: __data,
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
      contentId={CONSTANTS.MENU_IDS.AD_SL_LIST_PAGE}
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
          onClick={async () => {
            await menuController.close(CONSTANTS.MENU_IDS.SL_FILTERS_MENU_ID);
          }}
        />
      </ZIonHeader>

      {/* Content */}
      <ZIonContent className='ion-padding-top'>
        {/* Columns visibility accordion */}
        <Formik
          initialValues={{
            columns: compState?.shortLinkColumn || ShortLinksTableColumns,
            // columns: ShortLinksTableColumns,

            filters: {
              tags: compState?.filters?.tags || [],
              domains: compState?.filters?.domains || [],
              time: compState?.filters?.time || TimeFilterEnum.allTime
            }
          }}
          enableReinitialize={true}
          onSubmit={async values => {
            try {
              const _domains = Array.from(
                values.filters.domains as ZaionsRSelectOptions[],
                ({ value }) => value!
              );

              const _tags = Array.from(
                values.filters.tags as ZaionsRSelectOptions[],
                ({ value }) => value!
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
                        CONSTANTS.testingSelectors.shortLink.formPage
                          .geoLocation.countrySelector
                      }
                      onChange={_value => {
                        setFieldValue(
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

                    {/* Tags filter */}
                    <ZaionsRSelect
                      isMulti={true}
                      name='filters.tags'
                      className='mt-2'
                      testingselector={
                        CONSTANTS.testingSelectors.shortLink.formPage
                          .geoLocation.countrySelector
                      }
                      onChange={_value => {
                        setFieldValue('filters.tags', _value, true);
                      }}
                      options={
                        _shortLinksFieldsDataTagsSelector
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
                        CONSTANTS.testingSelectors.shortLink.formPage
                          .geoLocation.countrySelector
                      }
                      onChange={_value => {
                        setFieldValue('filters.domains', _value, true);
                      }}
                      options={
                        _shortLinksFieldsDataDomainsSelector
                          ? _shortLinksFieldsDataDomainsSelector?.map(el => {
                              return {
                                value: el,
                                label: el
                              };
                            })
                          : []
                      }
                    />

                    {/* <ZIonButton
											expand='block'
											className='mt-2 ion-no-margin ion-no-padding'
											fill='outline'
											color='tertiary'
											testingselector={
												CONSTANTS.testingSelectors.shortLink.listPage
													.tagsFilterBtn
											}
											style={
												!isLgScale
													? {
															minHeight: '2rem',
													  }
													: {}
											}
											onClick={(event: unknown) => {
												presentShortLinkTagsFilterModal({
													_event: event as Event,
													_dismissOnSelect: false,
													_cssClass: 'short-link-tags-filter-modal-size',
												});
											}}
										>
											<ZIonIcon
												slot='start'
												icon={pricetagOutline}
												className={classNames({
													'w-4 h-4': !isLgScale,
												})}
											/>
											<ZIonText
												className={classNames({
													'mt-1 ms-1': true,
													'text-xs': !isLgScale,
												})}
											>
												{shortLinksFilterOptions.tags
													? shortLinksFilterOptions.tags?.length === 1
														? shortLinksFilterOptions.tags[0]
														: shortLinksFilterOptions.tags?.length > 1
														? `${shortLinksFilterOptions.tags?.length} tags`
														: 'No values'
													: 'No values'}
											</ZIonText>
										</ZIonButton>

										<ZIonButton
											expand='block'
											className='mt-2 ion-no-margin ion-no-padding'
											fill='outline'
											color='tertiary'
											testingselector={
												CONSTANTS.testingSelectors.shortLink.listPage
													.domainFilterBtn
											}
											style={
												!isLgScale
													? {
															minHeight: '2rem',
													  }
													: {}
											}
											onClick={(event: unknown) => {
												presentShortLinkDomainsFilterModal({
													_event: event as Event,
													_dismissOnSelect: false,
													_cssClass: 'short-link-tags-filter-modal-size',
												});
											}}
										>
											<ZIonIcon
												slot='start'
												icon={businessOutline}
												className={classNames({
													'w-4 h-4': !isLgScale,
												})}
											/>
											<ZIonText
												className={classNames({
													'mt-1 ms-1': true,
													'text-xs': !isLgScale,
												})}
											>
												{shortLinksFilterOptions.domains
													? shortLinksFilterOptions.domains?.length === 1
														? shortLinksFilterOptions.domains[0]
														: shortLinksFilterOptions.domains?.length > 1
														? `${shortLinksFilterOptions.domains?.length} domains`
														: 'No values'
													: 'No values'}
											</ZIonText>
										</ZIonButton> */}

                    <ZIonButton
                      expand='block'
                      className='mt-3'
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
                                style={{
                                  '--padding-bottom': '.1rem',
                                  '--padding-top': '.1rem',
                                  '--padding-start': '2px'
                                }}>
                                <ZIonReorder
                                  slot='start'
                                  className='me-3'
                                />
                                <ZIonText className='text-sm'>
                                  {el.name}
                                </ZIonText>

                                <ZIonText slot='end'>
                                  <ZRCSwitch
                                    // checked={
                                    // 	compState?.shortLinkColumn &&
                                    // 	compState.shortLinkColumn[index]
                                    // 		.isVisible === false
                                    // 		? false
                                    // 		: el.isVisible
                                    // }
                                    checked={el.isVisible}
                                    onChange={_value => {
                                      setFieldValue(
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
            className={classNames({
              'ion-no-margin mt-2': true,
              'w-1/2': isLgScale,
              'w-full': !isLgScale
            })}
            // fill='outline'
            color='tertiary'>
            <ZIonIcon
              slot='start'
              icon={cloudDownloadOutline}
            />
            <ZIonText className='mt-1 ms-1'>Export data's</ZIonText>
          </ZIonButton>

          <ZIonButton
            className={classNames({
              'ion-no-margin mt-2': true,
              'w-1/2': isLgScale,
              'w-full': !isLgScale
            })}
            // fill='outline'
            color='tertiary'>
            <ZIonIcon
              slot='start'
              icon={cloudUploadOutline}
            />
            <ZIonText className='mt-1 ms-1'>Bulk imports</ZIonText>
          </ZIonButton>
        </div>
      </ZIonFooter>
    </ZIonMenu>
  );
};

export default ZShortLinksFilterMenu;
