/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { closeOutline } from 'ionicons/icons';
import { ItemReorderEventDetail, menuController } from '@ionic/core/components';

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
import CONSTANTS from '@/utils/constants';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { Formik } from 'formik';
import { TimeFilterEnum } from '@/types/AdminPanel/linksType';
import { ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
import { extractInnerData, zStringify } from '@/utils/helpers';
import {
  ZUserSettingInterface,
  ZUserSettingTypeEnum
} from '@/types/AdminPanel/index.type';
import { reportCustomError } from '@/utils/customErrorType';
import { PixelTableColumns } from '@/utils/constants/columns';
import ZaionsRSelect from '@/components/CustomComponents/ZaionsRSelect';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';
import {
  useZRQCreateRequest,
  useZRQGetRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

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

const ZPixelsFilterMenu: React.FC = () => {
  // #region compState.
  const [compState, setCompState] = useState<{
    pixelsColumn: {
      id?: string;
      name: string;
      isVisible: boolean;
    }[];
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

  // #region APIs.
  //
  const { mutateAsync: updatePixelFilersAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.user_setting_delete_update
  });

  const { mutateAsync: createPixelFilersAsyncMutate } = useZRQCreateRequest({
    _url: API_URL_ENUM.user_setting_list_create
  });

  const { data: getPixelFiltersData, isFetching: isPixelFiltersDataFetching } =
    useZRQGetRequest<ZUserSettingInterface>({
      _url: API_URL_ENUM.user_setting_get,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET,
        ZUserSettingTypeEnum.pixelListPageTable
      ],
      _itemsIds: [ZUserSettingTypeEnum.pixelListPageTable],
      _urlDynamicParts: [CONSTANTS.RouteParams.settings.type],
      _extractType: ZRQGetRequestExtractEnum.extractItem
    });
  // #endregion
  console.log({ getPixelFiltersData: getPixelFiltersData?.settings?.columns });

  useEffect(() => {
    try {
      if (getPixelFiltersData?.type && getPixelFiltersData?.settings?.columns) {
        setCompState(_oldValue => ({
          ..._oldValue,
          pixelsColumn: getPixelFiltersData?.settings?.columns
        }));
      }
    } catch (error) {
      reportCustomError(error);
    }
  }, [getPixelFiltersData]);

  // #region Functions.
  const handleCarouselCardReorder = (
    event: CustomEvent<ItemReorderEventDetail>
  ) => {
    const reorderedItems = event.detail.complete(PixelTableColumns);
    setCompState(oldValues => ({
      ...oldValues,
      pixelsColumn: reorderedItems
    }));
    console.log({
      log: 'reorder',
      reorderedItems
    });
  };

  const FormikSubmitHandler = async (_data: string) => {
    try {
      if (_data) {
        let __response;

        if (
          getPixelFiltersData?.type === ZUserSettingTypeEnum.pixelListPageTable
        ) {
          __response = await updatePixelFilersAsyncMutate({
            itemIds: [ZUserSettingTypeEnum.pixelListPageTable],
            urlDynamicParts: [CONSTANTS.RouteParams.settings.type],
            requestData: _data
          });
        } else {
          __response = await createPixelFilersAsyncMutate(_data);
        }

        if (__response) {
          // extract Data from _response.
          const __data = extractInnerData<ZUserSettingInterface>(
            __response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          // if we have data then show success message.
          if (__data && __data.id) {
            await updateRQCDataHandler<ZUserSettingInterface | undefined>({
              key: [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET,
                ZUserSettingTypeEnum.pixelListPageTable
              ],
              data: __data,
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
          onClick={async () => {
            // Close the menu by menu-id
            await menuController.close(CONSTANTS.MENU_IDS.P_FILTERS_MENU_ID);
          }}
        />
      </ZIonHeader>

      {/* Content */}
      <ZIonContent className='ion-padding-top'>
        <Formik
          initialValues={{
            columns: compState?.pixelsColumn,
            // columns: ShortLinksTableColumns,

            filters: {
              tags: [],
              domains: [],
              time: TimeFilterEnum.allTime
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

              // setShortLinksFilterOptions(oldVales => ({
              //   ...oldVales,
              //   domains: [..._domains],
              //   tags: { ..._tags }
              // }));

              const zStringifyData = zStringify({
                type: ZUserSettingTypeEnum.pixelListPageTable,
                settings: zStringify({
                  columns: values.columns,
                  columnOrderIds: compState.columnOrderIds
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
                  className='pb-3 border-b mt-2'>
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
                        className='mx-1 zaions__light_bg'
                        slot='content'>
                        <ZIonReorderGroup
                          onIonItemReorder={handleCarouselCardReorder}
                          disabled={false}>
                          {values?.columns.map((el, index) => {
                            return (
                              <ZIonItem
                                key={index}
                                lines='full'
                                minHeight='2rem'
                                color='light'
                                className='zaions-short-link-list-table-column '
                                data-id={el?.id}
                                style={{
                                  '--padding-bottom': '.1rem',
                                  '--padding-top': '.1rem',
                                  '--padding-start': '2px'
                                }}>
                                <ZIonReorder
                                  slot='start'
                                  className='me-3 ps-2'
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
    </ZIonMenu>
  );
};

export default ZPixelsFilterMenu;
