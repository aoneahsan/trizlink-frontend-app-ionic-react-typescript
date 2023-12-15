/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { useParams } from 'react-router';
import classNames from 'classnames';
import {
  closeOutline,
  cloudDownloadOutline,
  cloudUploadOutline
} from 'ionicons/icons';
import {
  type ItemReorderEventDetail,
  menuController
} from '@ionic/core/components';

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

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
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
import CONSTANTS from '@/utils/constants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { TimeFilterEnum } from '@/types/AdminPanel/linksType';
import { Formik } from 'formik';
import ZaionsRSelect from '@/components/CustomComponents/ZaionsRSelect';
import { type ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  LinkInBiosFieldsDataRStateSelector,
  LinkInBiosFilterOptionsRStateAtom
} from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioState.recoil';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';
import { ZLIBListPageTableColumnsIds } from '@/types/AdminPanel/linkInBioType';
import { LinkInBioTableColumns } from '@/utils/constants/columns';
import {
  API_URL_ENUM,
  ZWSTypeEum,
  extractInnerDataOptionsEnum
} from '@/utils/enums';
import MESSAGES from '@/utils/messages';
import {
  type ZUserSettingInterface,
  ZUserSettingTypeEnum
} from '@/types/AdminPanel/index.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { extractInnerData, zStringify } from '@/utils/helpers';
import { reportCustomError } from '@/utils/customErrorType';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

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

const ZLinkInBioFilterMenu: React.FC = () => {
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
  // For getting all tags data
  const { tags: _linkInBioFieldsDataTagsSelector } = useRecoilValue(
    LinkInBiosFieldsDataRStateSelector
  );

  // Recoil state for storing filter options for short-links.
  const setLibFilterOptions = useSetRecoilState(
    LinkInBiosFilterOptionsRStateAtom
  );
  // #endregion

  // #region Apis
  //  workspace short link filter and short link other settings get api.
  const { data: getLinkInBioFiltersData } =
    useZRQGetRequest<ZUserSettingInterface>({
      _url: API_URL_ENUM.user_setting_delete_update_get,
      _key:
        workspaceId !== undefined &&
        workspaceId !== null &&
        workspaceId?.trim()?.length > 0
          ? [
              CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET,
              workspaceId,
              ZUserSettingTypeEnum.libListPageTable
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
              ZUserSettingTypeEnum.libListPageTable
            ]
          : [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET],
      _itemsIds:
        workspaceId !== undefined &&
        workspaceId !== null &&
        workspaceId?.trim()?.length > 0
          ? [
              ZWSTypeEum.personalWorkspace,
              workspaceId,
              ZUserSettingTypeEnum.libListPageTable
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
              ZUserSettingTypeEnum.libListPageTable
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

  const { mutateAsync: createLibFiltersAsyncMutate } = useZRQCreateRequest({
    _url: API_URL_ENUM.user_setting_list_create,
    _loaderMessage: MESSAGES.LINK_IN_BIO.FILTERING,
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

  // owned workspace short link filter and short link other settings create api.
  const { mutateAsync: updateLibFiltersAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.user_setting_delete_update_get,
    _loaderMessage: MESSAGES.SHORT_LINKS.FILTERING
  });
  // #endregion

  // #region Functions.
  const handleCarouselCardReorder = (
    event: CustomEvent<ItemReorderEventDetail>
  ): void => {
    event.detail.complete();

    setTimeout(() => {
      const _libListColumnsEls = document.querySelectorAll(
        '.zaions-lib-list-table-column'
      );
      const _libColumnIds: string[] = [ZLIBListPageTableColumnsIds.id];
      for (let i = 0; i < _libListColumnsEls.length; i++) {
        const _block = _libListColumnsEls[i];
        _libColumnIds.push(_block.getAttribute('data-id') as string);
      }

      if (_libColumnIds?.length > 0) {
        setCompState(oldValues => ({
          ...oldValues,
          columnOrderIds: _libColumnIds
        }));
      }
    }, 100);
  };

  const FormikSubmitHandler = async (_value: string): Promise<void> => {
    try {
      if (_value?.trim()?.length > 0) {
        let _response;

        if (
          getLinkInBioFiltersData?.type ===
          ZUserSettingTypeEnum.libListPageTable
        ) {
          _response = await updateLibFiltersAsyncMutate({
            itemIds:
              workspaceId !== undefined &&
              workspaceId !== null &&
              workspaceId?.trim()?.length > 0
                ? [
                    ZWSTypeEum.personalWorkspace,
                    workspaceId,
                    ZUserSettingTypeEnum.libListPageTable
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
                    ZUserSettingTypeEnum.libListPageTable
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
          _response = await createLibFiltersAsyncMutate(_value);
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
                  ZUserSettingTypeEnum.libListPageTable
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
  //   #endregion

  useEffect(() => {
    try {
      if (
        getLinkInBioFiltersData?.type !== null &&
        getLinkInBioFiltersData?.settings?.columns !== undefined
      ) {
        setCompState(_oldValue => ({
          ..._oldValue,
          shortLinkColumn: getLinkInBioFiltersData?.settings?.columns,
          filters: getLinkInBioFiltersData?.settings?.filters
        }));
      }
    } catch (error) {
      reportCustomError(error);
    }
  }, [getLinkInBioFiltersData]);

  const formikInitialValues = {
    columns: compState?.shortLinkColumn ?? LinkInBioTableColumns,
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
      contentId={CONSTANTS.PAGE_IDS.AD_LIB_LIST_PAGE}
      menuId={CONSTANTS.MENU_IDS.LIB_FILTERS_MENU_ID}
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
          Filter link-in-bio & table UI
        </ZIonTitle>

        <ZIonIcon
          icon={closeOutline}
          className='w-6 h-6 pt-[2px] cursor-pointer'
          onClick={() => {
            void menuController.close(CONSTANTS.MENU_IDS.LIB_FILTERS_MENU_ID);
          }}
        />
      </ZIonHeader>

      {/* Content */}
      <ZIonContent className='ion-padding-top'>
        <Formik
          initialValues={formikInitialValues}
          enableReinitialize={true}
          onSubmit={async values => {
            const _tags = Array.from(
              values.filters.tags as ZaionsRSelectOptions[],
              ({ value }) => value ?? ''
            );

            setLibFilterOptions(oldVales => ({
              ...oldVales,
              tags: { ..._tags }
            }));

            const zStringifyData = zStringify({
              type: ZUserSettingTypeEnum.libListPageTable,
              settings: zStringify({
                columns: values.columns,
                columnOrderIds: compState.columnOrderIds,
                filters: values?.filters
              })
            });

            await FormikSubmitHandler(zStringifyData);
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
                    Filter Link-in-bio.
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
                        CONSTANTS.testingSelectors.shortLink.formPage
                          .geoLocation.countrySelector
                      }
                      onChange={_value => {
                        void setFieldValue('filters.tags', _value, true);
                      }}
                      options={
                        _linkInBioFieldsDataTagsSelector?.length > 0
                          ? _linkInBioFieldsDataTagsSelector.map(el => {
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
                          {values?.columns?.map((el, index) => {
                            return (
                              <ZIonItem
                                key={index}
                                lines='full'
                                minHeight='2rem'
                                color='light'
                                className='zaions-lib-list-table-column'
                                data-id={el?.id}
                                style={libListTableColumnStyle}>
                                <ZIonReorder
                                  slot='start'
                                  className='me-3'
                                />
                                <ZIonText className='text-sm'>
                                  {el.name}
                                </ZIonText>

                                <ZIonText slot='end'>
                                  <ZRCSwitch
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
            <ZIonText className='mt-1 ms-1'>Export data&apos;s</ZIonText>
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

export default ZLinkInBioFilterMenu;
