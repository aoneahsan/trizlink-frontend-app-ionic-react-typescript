// Core Imports
import React, { useState } from 'react';

// Packages Imports
import {
  IonCheckbox,
  IonChip,
  IonList,
  IonReorder,
  IonReorderGroup,
  ItemReorderEventDetail,
  RefresherEventDetail,
} from '@ionic/react';
import {
  menuOutline,
  appsOutline,
  businessOutline,
  calendar,
  pricetagOutline,
  search,
  ellipsisVertical,
  trashOutline,
  pencilOutline,
  filterOutline,
  refresh,
} from 'ionicons/icons';
import { Dropdown } from 'react-bootstrap';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { Formik } from 'formik';
import dayjs from 'dayjs';

// Custom Imports
import ZaionsCreateShortLinkUrlInput from '@/components/InPageComponents/ZaionsCreateShortLinkUrlInput';
import ZaionsShortLinkTable from '@/components/InPageComponents/ZaionsTable/ShortLinkListTable';
import {
  ZIonCol,
  ZIonText,
  ZIonIcon,
  ZIonItem,
  ZIonLabel,
  ZIonInput,
  ZIonRow,
  ZIonList,
  ZIonGrid,
  ZIonTitle,
  ZIonContent,
  ZIonMenuToggle,
  ZIonDatetimeButton,
  ZIonButton,
} from '@/components/ZIonComponents';

import ZRCheckbox from '@/components/CustomComponents/ZRCheckbox';
import ZaionsAddNewFolder from '@/components/InPageComponents/ZaionsModals/AddNewFolder';
import ZIonRefresher from '@/components/ZIonComponents/ZIonRefresher';
import ZIonRefresherContent from '@/components/ZIonComponents/ZIonRefresherContent';
import ZRScrollbars from '@/components/CustomComponents/ZRScrollBar';
import ZaionsIonPage from '@/components/ZaionsIonPage';

// Types
import { LinkFolderType, TimeFilterEnum } from '@/types/AdminPanel/linksType';
import {
  folderState,
  FormMode,
  messengerPlatformsBlockEnum,
} from '@/types/AdminPanel/index.type';

// Recoil States
import { NewShortLinkFormState } from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkFormState.recoil';

// Global Contents
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Styles
import classes from './styles.module.css';
import {
  useZInvalidateReactQueries,
  useZRQDeleteRequest,
  useZRQGetRequest,
  useZRQUpdateRequest,
} from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM } from '@/utils/enums';
import {
  useZIonAlert,
  useZIonErrorAlert,
  useZIonLoading,
  useZIonModal,
  useZIonPopover,
} from '@/ZaionsHooks/zionic-hooks';
import { FolderFormState } from '@/ZaionsStore/FormStates/folderFormState.recoil';
import { showSuccessNotification } from '@/utils/notification';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { replaceParams, zStringify } from '@/utils/helpers';
import { reportCustomError } from '@/utils/customErrorType';
import {
  ShortLinksFieldsDataSelector,
  ShortLinksFilterOptionsRState,
  ShortLinksRState,
} from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkState.recoil';
import { useZValidateRequestResponse } from '@/ZaionsHooks/zapi-hooks';

const ShortLinksTimeRangeFilterPopover = () => {
  const [shortLinksFilterOptions, setShortLinksFilterOptions] = useRecoilState(
    ShortLinksFilterOptionsRState
  );

  const timeRangeFilterSubmission = (
    _value: TimeFilterEnum,
    _startedAt?: string,
    _endAt?: string
  ) => {
    try {
      setShortLinksFilterOptions((oldValues) => ({
        ...oldValues,
        timeFilter: {
          ...oldValues.timeFilter,
          daysToSubtract: _value,
          startedAt: _startedAt ? _startedAt : oldValues.timeFilter.startedAt,
          endAt: _endAt ? _endAt : oldValues.timeFilter.startedAt,
        },
      }));
    } catch (error) {
      reportCustomError(error);
    }
  };

  return (
    <ZRScrollbars
      style={{
        width:
          shortLinksFilterOptions.timeFilter.daysToSubtract ===
          TimeFilterEnum.customRange
            ? 450
            : 200,
        height: 300,
      }}
    >
      <div className='d-flex'>
        <div className='ion-padding-horizontal'>
          <ZIonButton
            color={'secondary'}
            expand='block'
            className='mx-2 my-3'
            onClick={() => timeRangeFilterSubmission(TimeFilterEnum.allTime)}
            fill={
              shortLinksFilterOptions.timeFilter.daysToSubtract ===
              TimeFilterEnum.allTime
                ? 'solid'
                : 'outline'
            }
          >
            All Time
          </ZIonButton>

          <ZIonButton
            color={'secondary'}
            expand='block'
            className='mx-2 my-3'
            onClick={() => timeRangeFilterSubmission(TimeFilterEnum.today)}
            fill={
              shortLinksFilterOptions.timeFilter.daysToSubtract ===
              TimeFilterEnum.today
                ? 'solid'
                : 'outline'
            }
          >
            Today
          </ZIonButton>

          <ZIonButton
            color={'secondary'}
            expand='block'
            className='mx-2 my-3'
            onClick={() =>
              timeRangeFilterSubmission(TimeFilterEnum.lastSevenDays)
            }
            fill={
              shortLinksFilterOptions.timeFilter.daysToSubtract ===
              TimeFilterEnum.lastSevenDays
                ? 'solid'
                : 'outline'
            }
          >
            Last 7 days
          </ZIonButton>

          <ZIonButton
            color={'secondary'}
            expand='block'
            fill={
              shortLinksFilterOptions.timeFilter.daysToSubtract ===
              TimeFilterEnum.last30days
                ? 'solid'
                : 'outline'
            }
            className='mx-2 my-3'
            onClick={() => timeRangeFilterSubmission(TimeFilterEnum.last30days)}
          >
            Last 30 days
          </ZIonButton>

          <ZIonButton
            color={'secondary'}
            expand='block'
            fill={
              shortLinksFilterOptions.timeFilter.daysToSubtract ===
              TimeFilterEnum.thisMonth
                ? 'solid'
                : 'outline'
            }
            className='mx-2 my-3'
            onClick={() => timeRangeFilterSubmission(TimeFilterEnum.thisMonth)}
          >
            This month
          </ZIonButton>

          <ZIonButton
            color={'secondary'}
            expand='block'
            fill={
              shortLinksFilterOptions.timeFilter.daysToSubtract ===
              TimeFilterEnum.lastMonth
                ? 'solid'
                : 'outline'
            }
            className='mx-2 my-3'
            onClick={() => timeRangeFilterSubmission(TimeFilterEnum.lastMonth)}
          >
            Last month
          </ZIonButton>

          <ZIonButton
            color={'secondary'}
            expand='block'
            fill={
              shortLinksFilterOptions.timeFilter.daysToSubtract ===
              TimeFilterEnum.customRange
                ? 'solid'
                : 'outline'
            }
            className='mx-2 my-3'
            onClick={() =>
              timeRangeFilterSubmission(TimeFilterEnum.customRange)
            }
          >
            Custom Range
          </ZIonButton>
        </div>

        {shortLinksFilterOptions.timeFilter.daysToSubtract ===
          TimeFilterEnum.customRange && (
          <div className='mt-2'>
            <div className='me-2'>
              <ZIonLabel className='ms-2 fw-bold'>Start at:</ZIonLabel>
              <ZIonDatetimeButton
                className='ion-justify-content-start mt-2 mx-2 my-3'
                onIonChange={({ target }) => {
                  if (target.value) {
                    timeRangeFilterSubmission(
                      TimeFilterEnum.customRange,
                      target.value as string
                    );
                  }
                }}
                value={dayjs(
                  shortLinksFilterOptions.timeFilter.startedAt as string
                ).format(CONSTANTS.DateTime.iso8601DateTime)}
                id='all-time-filter-custom-date-start-time'
                preferWheel={false}
              />
            </div>

            <div className='me-2 mt-4'>
              <ZIonLabel className='ms-2 fw-bold'>End at:</ZIonLabel>
              <ZIonDatetimeButton
                className='ion-justify-content-start mt-2 mx-2 my-3'
                onIonChange={({ target }) => {
                  if (target.value) {
                    timeRangeFilterSubmission(
                      TimeFilterEnum.customRange,
                      undefined,
                      target.value as string
                    );
                  }
                }}
                value={dayjs(
                  shortLinksFilterOptions.timeFilter.endAt as string
                ).format(CONSTANTS.DateTime.iso8601DateTime)}
                id='all-time-filter-custom-date-end-time'
                preferWheel={false}
              />
            </div>
          </div>
        )}
      </div>
    </ZRScrollbars>
  );
};

const ShortLinksTagsFiltersPopover = () => {
  // For getting all tags data
  const { tags: _shortLinksFieldsDataTagsSelector } = useRecoilValue(
    ShortLinksFieldsDataSelector
  );

  // For getting filter.
  const [shortLinksFilterOptions, setShortLinksFilterOptions] = useRecoilState(
    ShortLinksFilterOptionsRState
  );

  // function for generating initialValue for formik below.
  const generateInitialValueOfTagsFormik = (
    allTags: string[],
    filteredTags: string[] = []
  ): {
    _filteredTags?: {
      [key: string]: boolean;
    };
    _allTags?: boolean;
  } => {
    try {
      const _filteredTags: {
        [key: string]: boolean;
      } = {};
      let _allTags = true;
      if (allTags.length) {
        allTags.forEach((tag, i) => {
          if (filteredTags.includes(tag)) {
            _filteredTags[tag] = true;
          } else {
            _filteredTags[tag] = false;
            _allTags = false;
          }
        });
      }
      return { _filteredTags, _allTags };
    } catch (error) {
      reportCustomError(error);
      return {};
    }
  };

  return (
    <ZRScrollbars style={{ width: 300, height: 300 }}>
      <Formik
        initialValues={generateInitialValueOfTagsFormik(
          _shortLinksFieldsDataTagsSelector,
          shortLinksFilterOptions.tags as string[]
        )}
        onSubmit={(values) => {
          try {
            if (values._filteredTags) {
              const _tags: string[] = [];
              for (const [key, value] of Object.entries(values._filteredTags)) {
                if (value === true) {
                  _tags.push(key);
                }
              }

              setShortLinksFilterOptions((oldVales) => ({
                ...oldVales,
                tags: [..._tags],
              }));
            }
          } catch (error) {
            reportCustomError(error);
          }
        }}
        enableReinitialize
      >
        {({ values, submitForm, handleBlur, setFieldValue }) => {
          return (
            <>
              <ZIonButton
                expand='block'
                className='m-0 ion-text-capitalize'
                onClick={() => void submitForm()}
              >
                <ZIonIcon icon={filterOutline} className='me-1' />
                <ZIonText>filter</ZIonText>
              </ZIonButton>
              <ZIonItem className='ion-no-padding'>
                <ZIonText className='ms-3 fw-bold zaions__fs_14'>
                  All Tags
                </ZIonText>
                {/* <IonCheckbox
									slot='end'
									checked={values._allTags}
									onIonChange={({ target }) => {
										setFieldValue('_allTags', target.checked, false);
										_shortLinksFieldsDataTagsSelector.forEach((el) => {
											setFieldValue(
												`_filteredTags.${el}`,
												target.checked,
												false
											);
										});
									}}
									onIonBlur={handleBlur}
								/> */}
                <ZRCheckbox
                  checkedValue={values._allTags}
                  handleChange={(checked) => {
                    setFieldValue('_allTags', checked, false);
                    _shortLinksFieldsDataTagsSelector.forEach((el) => {
                      setFieldValue(`_filteredTags.${el}`, checked, false);
                    });
                  }}
                  className='ms-auto'
                />
              </ZIonItem>
              <IonList lines='none'>
                {_shortLinksFieldsDataTagsSelector.map((el, i) => {
                  return (
                    <ZIonItem key={i}>
                      <IonChip className='zaions__fs_14 m-0'>{el}</IonChip>
                      <IonCheckbox
                        slot='end'
                        checked={
                          values._filteredTags && values._filteredTags[el]
                        }
                        name={el}
                        onIonChange={({ target }) => {
                          if (!target.checked && values._allTags) {
                            setFieldValue('_allTags', false, false);
                          }
                          setFieldValue(
                            `_filteredTags.${el}`,
                            target.checked,
                            false
                          );
                        }}
                        onIonBlur={handleBlur}
                      />
                    </ZIonItem>
                  );
                })}
              </IonList>
            </>
          );
        }}
      </Formik>
    </ZRScrollbars>
  );
};

const ShortLinksDomainsFiltersPopover = () => {
  // For getting all domains data
  const { domains: _shortLinksFieldsDataDomainsSelector } = useRecoilValue(
    ShortLinksFieldsDataSelector
  );

  // For getting filter.
  const [shortLinksFilterOptions, setShortLinksFilterOptions] = useRecoilState(
    ShortLinksFilterOptionsRState
  );

  // function for generating initialValue for formik below.
  const generateInitialValueOfDomainsFormik = (
    allDomains: string[],
    filteredDomains: string[] = []
  ): {
    _filteredDomains?: {
      [key: string]: boolean;
    };
    _allDomains?: boolean;
  } => {
    try {
      const _filteredDomains: {
        [key: string]: boolean;
      } = {};
      let _allDomains = true;
      if (allDomains.length) {
        allDomains.forEach((domain, i) => {
          const _domain = domain.replace('.', '_');
          if (filteredDomains.includes(_domain)) {
            _filteredDomains[_domain] = true;
          } else {
            _filteredDomains[_domain] = false;
            _allDomains = false;
          }
        });
      }
      return { _filteredDomains, _allDomains };
    } catch (error) {
      reportCustomError(error);
      return {};
    }
  };

  return (
    <ZRScrollbars style={{ width: 300, height: 300 }}>
      <Formik
        initialValues={generateInitialValueOfDomainsFormik(
          _shortLinksFieldsDataDomainsSelector,
          shortLinksFilterOptions.domains as string[]
        )}
        onSubmit={(values) => {
          try {
            if (values._filteredDomains) {
              const _domains: string[] = [];
              for (const [key, value] of Object.entries(
                values._filteredDomains
              )) {
                if (value === true) {
                  const _key = key.replace('_', '.');
                  _domains.push(_key);
                }
              }

              setShortLinksFilterOptions((oldVales) => ({
                ...oldVales,
                domains: [..._domains],
              }));
            }
          } catch (error) {
            reportCustomError(error);
          }
        }}
        enableReinitialize
      >
        {({ values, submitForm, handleBlur, setFieldValue }) => (
          <>
            <ZIonButton
              expand='block'
              className='m-0 ion-text-capitalize'
              onClick={() => void submitForm()}
            >
              <ZIonIcon icon={filterOutline} className='me-1' />
              <ZIonText>filter</ZIonText>
            </ZIonButton>
            <ZIonItem className='ion-no-padding'>
              <ZIonText className='ms-3 fw-bold zaions__fs_14'>
                All Domains
              </ZIonText>
              {/* <IonCheckbox
								slot='end'
								checked={values._allDomains}
								onIonChange={({ target }) => {
									setFieldValue('_allDomains', target.checked, false);
								}}
								onIonBlur={handleBlur}
							/> */}
              <ZRCheckbox
                checkedValue={values._allDomains}
                handleChange={(checked) => {
                  setFieldValue('_allDomains', checked, false);
                  _shortLinksFieldsDataDomainsSelector.forEach((el) => {
                    const domain = el.replace('.', '_');
                    setFieldValue(`_filteredDomains.${domain}`, checked, false);
                  });
                }}
                className='ms-auto'
              />
            </ZIonItem>
            <IonList lines='none'>
              {_shortLinksFieldsDataDomainsSelector.map((_domain, i) => {
                const domain = _domain.replace('.', '_');
                return (
                  <ZIonItem key={i}>
                    <IonChip className='zaions__fs_14 m-0'>{_domain}</IonChip>
                    <IonCheckbox
                      slot='end'
                      checked={
                        values._filteredDomains &&
                        values._filteredDomains[domain]
                      }
                      name={domain}
                      onIonChange={({ target }) => {
                        if (!target.checked && values._allDomains) {
                          setFieldValue('_allDomains', false, false);
                        }
                        setFieldValue(
                          `_filteredDomains.${domain}`,
                          target.checked,
                          false
                        );
                      }}
                      onIonBlur={handleBlur}
                    />
                  </ZIonItem>
                );
              })}
            </IonList>
          </>
        )}
      </Formik>
    </ZRScrollbars>
  );
};

const SearchQueryInputComponent = () => {
  const setShortLinksFilterOptions = useSetRecoilState(
    ShortLinksFilterOptionsRState
  );
  return (
    <Formik
      initialValues={{
        searchValue: '',
      }}
      onSubmit={(values) => {
        try {
          if (values.searchValue) {
            setShortLinksFilterOptions((oldValues) => ({
              ...oldValues,
              searchQuery: values.searchValue,
            }));
          } else {
            setShortLinksFilterOptions((oldValues) => ({
              ...oldValues,
              searchQuery: null,
            }));
          }
        } catch (error) {
          reportCustomError(error);
        }
      }}
    >
      {({ submitForm, handleChange }) => (
        <ZIonItem className='border' style={{ '--inner-padding-end': '0px' }}>
          <ZIonLabel color='primary' className='pe-1 my-0'>
            <ZIonTitle className='ion-no-padding'>
              <ZIonIcon icon={search} className='mt-2'></ZIonIcon>
            </ZIonTitle>
          </ZIonLabel>
          <ZIonInput
            clearInput={true}
            type='text'
            name='searchValue'
            onIonChange={handleChange}
            placeholder='Search link by title, domain...'
          ></ZIonInput>
          <ZIonButton
            onClick={() => void submitForm()}
            className='ion-no-margin ion-text-capitalize'
            style={{
              height: '100%',
            }}
            slot='end'
          >
            <ZIonIcon icon={filterOutline} className='me-2' />{' '}
            <ZIonText>Filter</ZIonText>
          </ZIonButton>
        </ZIonItem>
      )}
    </Formik>
  );
};

const FolderActionsPopoverContent: React.FC = () => {
  /**
   * hook to present folder form modal
   */
  const { presentZIonModal: presentFolderModal } =
    useZIonModal(ZaionsAddNewFolder);

  // Custom hooks.
  const { presentZIonAlert } = useZIonAlert();
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();

  /**
   * recoil state which will hold the single folder data (for updating). when user click on edit button in action popover the data of that folder will storing in this state and present as initial value in the update folder form. here we are delete it folder by getting the id from folderFormState
   *
   */
  const [folderFormState, setFolderFormState] = useRecoilState(FolderFormState);

  /**
   * delete short link folder api.
   */
  const { mutateAsync: deleteFolderMutate } = useZRQDeleteRequest(
    API_URL_ENUM.userAccountFolders_update_delete,
    [CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN]
  );

  /**
   * deleteFolderAccount will show the confirm alert before deleting short link folder.
   */
  const deleteFolderAccount = async () => {
    try {
      if (folderFormState && folderFormState.id) {
        await presentZIonAlert({
          header: `Delete Folder "${
            folderFormState.name ? folderFormState.name : ''
          }"`,
          subHeader: 'Remove folder from user account.',
          message: 'Are you sure you want to delete this folder?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'Delete',
              role: 'danger',
              handler: () => {
                void removeFolderAccount();
              },
            },
          ],
        });
      } else {
        await presentZIonErrorAlert();
      }
    } catch (error) {
      console.error(error);
    }
  };
  /**
   * removeFolderAccount will hit delete short link folder api
   */
  const removeFolderAccount = async () => {
    await presentZIonLoader('Deleting Api Key...');
    try {
      if (folderFormState.id) {
        // hitting the delete api
        await deleteFolderMutate({
          itemIds: [folderFormState.id],
          urlDynamicParts: [':folderId'],
        });

        // setting the folderFormState to initial state because the value of this recoil state is used as the initial values of the short link folder form, when we click on the delete button in popover it will store the value or that folder in this recoil state. because we need it in here for example the id to delete the folder.
        setFolderFormState((oldVal) => ({
          ...oldVal,
          id: '',
          name: '',
          formMode: FormMode.ADD,
        }));

        // show success message after deleting
        showSuccessNotification(`Folder deleted successfully.`);
      } else {
        await presentZIonErrorAlert();
      }
      await dismissZIonLoader();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ZIonList lines='none'>
        <ZIonButton
          fill='clear'
          className='ion-no-padding ion-text-capitalize'
          expand='block'
          onClick={() => {
            presentFolderModal({
              _cssClass: 'folder-modal-size',
            });
          }}
        >
          <ZIonIcon icon={pencilOutline} className={'me-2'} />{' '}
          <ZIonText>Rename</ZIonText>
        </ZIonButton>
        <ZIonButton
          fill='clear'
          className='ion-no-padding ion-text-capitalize'
          expand='block'
          onClick={() => {
            void deleteFolderAccount();
          }}
        >
          <ZIonIcon icon={trashOutline} className={'me-2'} color='danger' />{' '}
          <ZIonText color='danger'>Delete</ZIonText>
        </ZIonButton>
      </ZIonList>
    </>
  );
};

const AdminLinksIndexPage: React.FC = () => {
  const [compState, setCompState] = useState<{
    shortLinksFoldersReorder: {
      Ids?: string[];
      isEnable?: boolean;
    };
  }>({
    shortLinksFoldersReorder: {
      isEnable: false,
    },
  });

  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    event.detail.complete();

    setTimeout(() => {
      const _shortLinksFoldersEls = document.querySelectorAll(
        '.zaions-short-link-folder'
      );
      const _shortLinksFoldersIds: string[] = [];
      for (let i = 0; i < _shortLinksFoldersEls.length; i++) {
        const _block = _shortLinksFoldersEls[i];
        _shortLinksFoldersIds.push(
          _block.getAttribute('data-folder-id') as string
        );
      }

      if (_shortLinksFoldersIds.length) {
        setCompState((_) => ({
          shortLinksFoldersReorder: {
            Ids: _shortLinksFoldersIds,
            isEnable: _shortLinksFoldersIds.length > 1,
          },
        }));
      }
    }, 100);
  };
  const { zNavigatePushRoute } = useZNavigate();
  const shortLinksFilterOptions = useRecoilValue(ShortLinksFilterOptionsRState);

  const setNewShortLinkFormState = useSetRecoilState(NewShortLinkFormState);

  const setFolderFormState = useSetRecoilState(FolderFormState);

  const { data: _foldersData } = useZRQGetRequest<LinkFolderType[]>({
    _url: API_URL_ENUM.userAccountFolders_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN],
  });

  const { zInvalidateReactQueries } = useZInvalidateReactQueries();

  const { presentZIonPopover: presentFolderActionIonPopover } = useZIonPopover(
    FolderActionsPopoverContent
  );
  const { presentZIonPopover: presentShortLinkTimeFilterModal } =
    useZIonPopover(ShortLinksTimeRangeFilterPopover);

  const { presentZIonPopover: presentShortLinkTagsFilterModal } =
    useZIonPopover(ShortLinksTagsFiltersPopover);

  const { presentZIonPopover: presentShortLinkDomainsFilterModal } =
    useZIonPopover(ShortLinksDomainsFiltersPopover);

  const _shortLinksData = useRecoilValue(ShortLinksRState);

  const { presentZIonModal: presentFolderModal } = useZIonModal(
    ZaionsAddNewFolder,
    {
      state: folderState.ShortLink,
    }
  );

  const { validateRequestResponse } = useZValidateRequestResponse();

  // Update shortLinks folders reorder API
  const { mutateAsync: UpdateShortLinksFoldersReorder } = useZRQUpdateRequest({
    _url: API_URL_ENUM.ShortLinks_folders_reorder,
    _queriesKeysToInvalidate: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN],
  });

  const invalidedShortLinksQuery = async () => {
    try {
      await zInvalidateReactQueries([
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.MAIN,
      ]);
    } catch (error) {
      reportCustomError(error);
    }
  };

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    try {
      await invalidedShortLinksQuery();
      event.detail.complete();
    } catch (error) {
      reportCustomError(error);
    }
  };

  const shortLinksFoldersReOrderHandler = async () => {
    try {
      // The update api...
      const _result = await UpdateShortLinksFoldersReorder({
        requestData: zStringify({
          folders: compState.shortLinksFoldersReorder.Ids,
        }),
        itemIds: [],
        urlDynamicParts: [],
      });

      // if _result of the UpdateShortLinksFoldersReorder api is success this showing success notification else not success then error notification.
      await validateRequestResponse({
        resultObj: _result,
      });

      // hiding the reorder button by assigning isEnable to false
      setCompState((oldValues) => ({
        ...oldValues,
        shortLinksFoldersReorder: {
          Ids: oldValues.shortLinksFoldersReorder.Ids,
          isEnable: false,
        },
      }));
    } catch (error) {
      reportCustomError(error);
    }
  };

  return (
    <ZaionsIonPage pageTitle='Short Links Page'>
      <ZIonContent>
        <ZIonRefresher onIonRefresh={(event) => void handleRefresh(event)}>
          <ZIonRefresherContent />
        </ZIonRefresher>
        <ZIonGrid className='ion-no-padding zaions_h100'>
          <ZIonRow className='zaions_h100'>
            <ZIonCol size='2.6' className='ion-padding border-end'>
              <div className='ion-padding-top'>
                <ZIonList lines='none'>
                  <ZIonItem className='zaions__cursor_pointer mb-2'>
                    <h5 className='fw-bold m-0 p-0'>🔗 All links</h5>
                  </ZIonItem>
                  <ZIonItem>
                    <ZIonList lines='none' className='zaions__w100'>
                      <ZIonItem className='ion-no-padding'>
                        <ZIonText color={'primary'} className='fw-bold'>
                          <h5 className='fw-bold d-block m-0 p-0'>
                            📂 Folders
                          </h5>
                        </ZIonText>
                      </ZIonItem>
                      <ZIonItem
                        className='zaions__cursor_pointer ms-2'
                        onClick={() => {
                          zNavigatePushRoute(
                            replaceParams(
                              ZaionsRoutes.AdminPanel
                                .ZaionsAdminLinkIndexPageRoute,
                              CONSTANTS.RouteParams
                                .folderIdToGetShortLinksOrLinkInBio,
                              'all'
                            )
                          );
                        }}
                      >
                        <ZIonLabel>Default</ZIonLabel>
                        <IonReorder slot='start' className='me-3'>
                          <ZIonIcon icon={appsOutline}></ZIonIcon>
                        </IonReorder>
                      </ZIonItem>
                      {_foldersData && _foldersData.length ? (
                        <IonReorderGroup
                          disabled={false}
                          onIonItemReorder={handleReorder}
                        >
                          {_foldersData.map((el) => (
                            <ZIonItem
                              className='zaions__cursor_pointer zaions-short-link-folder'
                              key={el.id}
                              data-folder-id={el.id}
                            >
                              <ZIonLabel
                                onClick={() => {
                                  zNavigatePushRoute(
                                    replaceParams(
                                      ZaionsRoutes.AdminPanel
                                        .ZaionsAdminLinkIndexPageRoute,
                                      CONSTANTS.RouteParams
                                        .folderIdToGetShortLinksOrLinkInBio,
                                      el.id as string
                                    )
                                  );
                                }}
                              >
                                {el.title}
                              </ZIonLabel>
                              <ZIonButton
                                fill='clear'
                                color='dark'
                                size='small'
                                value={el.id}
                                onClick={(event: unknown) => {
                                  presentFolderActionIonPopover({
                                    _event: event as Event,
                                    _cssClass: classNames(
                                      classes.zaions_present_folder_Action_popover_width
                                    ),
                                  });
                                  setFolderFormState((oldVal) => ({
                                    ...oldVal,
                                    id: el.id,
                                    name: el.title,
                                    formMode: FormMode.EDIT,
                                  }));
                                }}
                                className='ion-no-padding ms-auto'
                              >
                                <ZIonIcon icon={ellipsisVertical} />
                              </ZIonButton>
                              <IonReorder slot='start' className='me-3'>
                                <ZIonIcon icon={appsOutline}></ZIonIcon>
                              </IonReorder>
                            </ZIonItem>
                          ))}
                        </IonReorderGroup>
                      ) : (
                        ''
                      )}
                    </ZIonList>
                  </ZIonItem>
                </ZIonList>
                <ZIonButton
                  className='ion-text-capitalize ion-margin-horizontal'
                  fill='outline'
                  expand='block'
                  onClick={() => {
                    setFolderFormState((oldVal) => ({
                      ...oldVal,
                      id: '',
                      name: '',
                      formMode: FormMode.ADD,
                    }));
                    presentFolderModal({
                      _cssClass: 'link-in-bio-folder-modal',
                    });
                  }}
                >
                  New Folder
                </ZIonButton>

                {compState?.shortLinksFoldersReorder?.isEnable && (
                  <ZIonButton
                    className='ion-text-capitalize ion-margin-horizontal position-absolute bottom-0'
                    expand='block'
                    onClick={() => {
                      void shortLinksFoldersReOrderHandler();
                    }}
                    style={{ width: '78%' }}
                  >
                    save reorder
                  </ZIonButton>
                )}
              </div>
            </ZIonCol>
            <ZIonCol size='9.4'>
              <ZIonGrid className='py-4 zaions__bg_white'>
                <ZIonRow className='px-3'>
                  <ZIonCol>
                    <ZIonText>
                      <h4 className='fw-bold zaions__color_gray2'>
                        Create a new link
                      </h4>
                    </ZIonText>
                    <ZIonText>
                      <h5 className='zaions__color_gray2'>
                        Create & manage your links
                      </h5>
                    </ZIonText>
                  </ZIonCol>
                  <ZIonCol className='' size='4'>
                    <ZaionsCreateShortLinkUrlInput />
                  </ZIonCol>
                </ZIonRow>
              </ZIonGrid>

              <ZIonGrid className='my-5'>
                <ZIonRow className='py-4 px-3 zaions__bg_white rounded ion-align-items-center'>
                  <ZIonCol size='4'>
                    <SearchQueryInputComponent />
                  </ZIonCol>
                  <ZIonCol className=''>
                    <div className='d-flex gap-3 justify-content-end'>
                      <Dropdown>
                        <Dropdown.Toggle
                          id='dropdown-custom-components'
                          className={`${classes.zaions__dropdown_toggle}`}
                        >
                          <ZIonButton
                            id='dropdown-basic'
                            fill='outline'
                            className='ms-auto'
                          >
                            Export data's
                          </ZIonButton>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='ms-auto'>
                          <Dropdown.Item
                            className={`${classes.zaions__dropdown_item}`}
                          >
                            Export all data's
                          </Dropdown.Item>
                          <Dropdown.Item
                            className={`${classes.zaions__dropdown_item}`}
                          >
                            Export folders data's
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <ZIonMenuToggle
                        autoHide={false}
                        // menu={ADMIN_LINK_PAGE_CONTENT_ID}
                      >
                        <ZIonButton fill='outline' className='me-3'>
                          Bulk Import
                        </ZIonButton>
                      </ZIonMenuToggle>
                      <ZIonButton
                        color='primary'
                        onClick={() =>
                          setNewShortLinkFormState((_) => ({
                            folderId: CONSTANTS.DEFAULT_VALUES.DEFAULT_FOLDER,
                            shortUrl: {
                              domain:
                                CONSTANTS.DEFAULT_VALUES.DEFAULT_CUSTOM_DOMAIN,
                            },
                            type: messengerPlatformsBlockEnum.link,
                            pixelIds: [],
                            tags: [],
                            formMode: FormMode.ADD,
                          }))
                        }
                        routerLink={
                          ZaionsRoutes.AdminPanel
                            .ZaionsAdminCreateNewLinkPageRoute
                        }
                      >
                        Create a new link
                      </ZIonButton>
                    </div>
                  </ZIonCol>
                </ZIonRow>

                <ZIonRow className='py-4 px-3 zaions__bg_white rounded ion-align-items-center mt-1'>
                  <ZIonCol className='d-flex ion-align-items-center'>
                    <ZIonText>
                      <h4 className='ion-no-margin'>
                        <ZIonText className='total_links fw-bold'>
                          {_shortLinksData?.length}
                        </ZIonText>{' '}
                        links
                      </h4>
                    </ZIonText>
                  </ZIonCol>
                  <ZIonCol className='d-flex justify-content-end' size='7'>
                    {/* Filter by days */}
                    <ZIonButton
                      fill='outline'
                      className='ms-auto me-3'
                      onClick={(event: unknown) => {
                        presentShortLinkTimeFilterModal({
                          _event: event as Event,
                          _cssClass:
                            shortLinksFilterOptions.timeFilter
                              .daysToSubtract === TimeFilterEnum.customRange
                              ? classes[
                                  'short-link-tags-filter-modal-custom-range-size'
                                ]
                              : classes['short-link-time-filter-modal-size'],
                          _dismissOnSelect: false,
                        });
                      }}
                    >
                      <ZIonIcon slot='start' icon={calendar}></ZIonIcon>
                      {shortLinksFilterOptions.timeFilter.daysToSubtract ===
                      TimeFilterEnum.allTime
                        ? 'All Times'
                        : shortLinksFilterOptions.timeFilter.daysToSubtract ===
                          TimeFilterEnum.today
                        ? 'Today'
                        : shortLinksFilterOptions.timeFilter.daysToSubtract ===
                          TimeFilterEnum.lastSevenDays
                        ? 'Last 7 days'
                        : shortLinksFilterOptions.timeFilter.daysToSubtract ===
                          TimeFilterEnum.last30days
                        ? 'Last 30 days'
                        : shortLinksFilterOptions.timeFilter.daysToSubtract ===
                          TimeFilterEnum.lastMonth
                        ? 'Last Mouth'
                        : shortLinksFilterOptions.timeFilter.daysToSubtract ===
                          TimeFilterEnum.thisMonth
                        ? 'This Month'
                        : shortLinksFilterOptions.timeFilter.daysToSubtract ===
                          TimeFilterEnum.customRange
                        ? 'Custom Range'
                        : 'All Time'}
                    </ZIonButton>

                    {/* Filter by tags */}
                    <ZIonButton
                      fill='outline'
                      className='ms-auto me-3'
                      onClick={(event: unknown) => {
                        presentShortLinkTagsFilterModal({
                          _event: event as Event,
                          _dismissOnSelect: false,
                          _cssClass:
                            classes['short-link-tags-filter-modal-size'],
                        });
                      }}
                    >
                      <ZIonIcon slot='start' icon={pricetagOutline}></ZIonIcon>
                      {shortLinksFilterOptions.tags
                        ? shortLinksFilterOptions.tags?.length === 1
                          ? shortLinksFilterOptions.tags[0]
                          : shortLinksFilterOptions.tags?.length > 1
                          ? `${shortLinksFilterOptions.tags?.length} tags`
                          : 'No values'
                        : 'No values'}
                    </ZIonButton>

                    {/* Filter by Domains */}
                    <ZIonButton
                      fill='outline'
                      className='ms-auto me-3'
                      onClick={(event: unknown) => {
                        presentShortLinkDomainsFilterModal({
                          _event: event as Event,
                          _dismissOnSelect: false,
                          _cssClass:
                            classes['short-link-tags-filter-modal-size'],
                        });
                      }}
                    >
                      <ZIonIcon slot='start' icon={businessOutline}></ZIonIcon>
                      {shortLinksFilterOptions.domains
                        ? shortLinksFilterOptions.domains?.length === 1
                          ? shortLinksFilterOptions.domains[0]
                          : shortLinksFilterOptions.domains?.length > 1
                          ? `${shortLinksFilterOptions.domains?.length} domains`
                          : 'No values'
                        : 'No values'}
                    </ZIonButton>

                    {/* Filter by Columns */}
                    <ZIonButton fill='outline' className='ms-auto me-3'>
                      <ZIonIcon slot='start' icon={menuOutline}></ZIonIcon>7
                      Columns
                    </ZIonButton>
                    <ZIonButton
                      fill='outline'
                      className='ms-auto'
                      onClick={() => {
                        void invalidedShortLinksQuery();
                      }}
                    >
                      <ZIonIcon slot='start' icon={refresh} />
                      Refetch
                    </ZIonButton>
                  </ZIonCol>
                </ZIonRow>
              </ZIonGrid>
              <ZaionsShortLinkTable />
            </ZIonCol>
          </ZIonRow>
        </ZIonGrid>
      </ZIonContent>
    </ZaionsIonPage>
  );
};

export default AdminLinksIndexPage;
