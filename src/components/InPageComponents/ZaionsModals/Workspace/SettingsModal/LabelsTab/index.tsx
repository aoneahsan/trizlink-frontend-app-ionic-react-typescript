/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
  addOutline,
  alertCircleOutline,
  checkmark,
  closeOutline,
  createOutline,
  fileTrayOutline,
  trashBinOutline
} from 'ionicons/icons';
import { FieldArray, Formik } from 'formik';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonBadge,
  ZIonButton,
  ZIonIcon,
  ZIonInput,
  ZIonItem,
  ZIonList,
  ZIonSkeletonText,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import {
  useZGetRQCacheData,
  useZRQCreateRequest,
  useZRQDeleteRequest,
  useZRQGetRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import {
  API_URL_ENUM,
  extractInnerDataOptionsEnum,
  VALIDATION_RULE
} from '@/utils/enums';
import CONSTANTS from '@/utils/constants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { FormMode, LabelInterface } from '@/types/AdminPanel/index.type';
import { reportCustomError } from '@/utils/customErrorType';
import { ZLinkMutateApiType } from '@/types/ZaionsApis.type';
import { extractInnerData, validateField, zStringify } from '@/utils/helpers';
import {
  useZIonAlert,
  useZIonErrorAlert,
  useZIonToastSuccess
} from '@/ZaionsHooks/zionic-hooks';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import MESSAGES from '@/utils/messages';
import classNames from 'classnames';
import { showErrorNotification } from '@/utils/notification';
import ZCan from '@/components/Can';
import {
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';

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

const ZLabelsTab: React.FC<{
  workspaceId?: string; // if this is owned workspace then pass the workspaceId id so we will know its a owner
  wsShareMemberId?: string; // if this is share workspace then pass the member id so we will know its a member
  wsShareId?: string; // if this is share workspace then pass the share ws id so we will know its a member
}> = ({ workspaceId, wsShareId, wsShareMemberId }) => {
  const [compState, setCompState] = useState<{
    labelsData: LabelInterface[];
  }>({
    labelsData: []
  });
  // #region Custom hooks
  // const { isLgScale, isMdScale } = useZMediaQueryScale(); //
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  const { presentZIonToastSuccess } = useZIonToastSuccess();
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonAlert } = useZIonAlert();
  // #endregion

  //#region APIS
  // if owner then this api hit to get label for current workspace data.
  const { data: labelsData, isFetching: isLabelsDataFetching } =
    useZRQGetRequest<LabelInterface[]>({
      _url: API_URL_ENUM.label_create_list,
      _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LABEL.MAIN, workspaceId!],
      _showLoader: false,
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
      _shouldFetchWhenIdPassed: workspaceId ? false : true,
      _itemsIds: [workspaceId!]
    });

  const { data: shareWSLabelsData, isFetching: isShareWSLabelsDataFetching } =
    useZRQGetRequest<LabelInterface[]>({
      _url: API_URL_ENUM.label_sws_create_list,
      _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LABEL.SWS_MAIN, wsShareId!],
      _showLoader: false,
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
      _itemsIds: [wsShareMemberId!],
      _shouldFetchWhenIdPassed: wsShareMemberId ? false : true
    });

  // if owner then this api hit to create label for current workspace.
  const { mutateAsync: createLabelMutateAsync } = useZRQCreateRequest({
    _url: API_URL_ENUM.label_create_list,
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _itemsIds: [workspaceId!],
    _loaderMessage: MESSAGES.LABEL.CREATING_API
  });

  // if member then this api hit to create label for current share workspace.
  const { mutateAsync: createSWSLabelMutateAsync } = useZRQCreateRequest({
    _url: API_URL_ENUM.label_sws_create_list,
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _itemsIds: [wsShareMemberId!],
    _loaderMessage: MESSAGES.LABEL.CREATING_API
  });

  // if owner then this api hit to update label for current workspace.
  const { mutateAsync: updateLabelMutateAsync } = useZRQUpdateRequest({
    _url: API_URL_ENUM.label_update_delete,
    _loaderMessage: MESSAGES.LABEL.UPDATING_API
  });

  // if member then this api hit to update label for current workspace.
  const { mutateAsync: updateSWSLabelMutateAsync } = useZRQUpdateRequest({
    _url: API_URL_ENUM.label_sws_update_delete_get,
    _loaderMessage: MESSAGES.LABEL.UPDATING_API
  });

  // if owner then this api hit to delete label for current share workspace.
  const { mutateAsync: deleteLabelMutate } = useZRQDeleteRequest({
    _url: API_URL_ENUM.label_update_delete,
    _loaderMessage: MESSAGES.LABEL.DELETING_API
  });

  // if member then this api hit to delete label for current share workspace.
  const { mutateAsync: deleteSWSLabelMutate } = useZRQDeleteRequest({
    _url: API_URL_ENUM.label_sws_update_delete_get,
    _loaderMessage: MESSAGES.LABEL.DELETING_API
  });
  // #endregion

  // #region Functions.
  const FormikSubmissionHandler = async (
    _data: string,
    _mode: FormMode,
    _labelId?: string
  ) => {
    try {
      if (_data) {
        let __response;
        if (_mode === FormMode.ADD) {
          if (workspaceId) {
            __response = await createLabelMutateAsync(_data);
          } else if (wsShareMemberId) {
            __response = await createSWSLabelMutateAsync(_data);
          }
        } else if (_mode === FormMode.EDIT && _labelId?.trim()) {
          if (workspaceId) {
            __response = await updateLabelMutateAsync({
              itemIds: [workspaceId!, _labelId],
              urlDynamicParts: [
                CONSTANTS.RouteParams.workspace.workspaceId,
                CONSTANTS.RouteParams.label.labelId
              ],
              requestData: _data
            });
          } else if (wsShareMemberId) {
            __response = await updateSWSLabelMutateAsync({
              itemIds: [wsShareMemberId!, _labelId],
              urlDynamicParts: [
                CONSTANTS.RouteParams.workspace.shareWSMemberId,
                CONSTANTS.RouteParams.label.labelId
              ],
              requestData: _data
            });
          }
        }

        if ((__response as ZLinkMutateApiType<LabelInterface>).success) {
          // extract Data from _response.
          const __data = extractInnerData<LabelInterface>(
            __response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (__data && __data.id) {
            let __rqLabelsData =
              (getRQCDataHandler<LabelInterface[]>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.LABEL.MAIN,
                  workspaceId!
                ]
              }) as LabelInterface[]) || [];

            if (wsShareMemberId) {
              __rqLabelsData = getRQCDataHandler<LabelInterface[]>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.LABEL.SWS_MAIN,
                  wsShareId!
                ]
              }) as LabelInterface[];
            }

            const __oldLabels =
              extractInnerData<LabelInterface[]>(
                __rqLabelsData,
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) || [];

            if (__oldLabels) {
              if (_mode === FormMode.ADD) {
                // added shortLink to all label data in cache.
                const __updatedLabels = [...__oldLabels, __data];

                // Updating all label data in RQ cache.
                if (workspaceId) {
                  await updateRQCDataHandler<LabelInterface[] | undefined>({
                    key: [
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.LABEL.MAIN,
                      workspaceId!
                    ],
                    data: __updatedLabels as LabelInterface[],
                    id: '',
                    extractType: ZRQGetRequestExtractEnum.extractItems,
                    updateHoleData: true
                  });
                } else if (wsShareMemberId) {
                  await updateRQCDataHandler<LabelInterface[] | undefined>({
                    key: [
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.LABEL.SWS_MAIN,
                      wsShareId!
                    ],
                    data: __updatedLabels as LabelInterface[],
                    id: '',
                    extractType: ZRQGetRequestExtractEnum.extractItems,
                    updateHoleData: true
                  });
                }

                presentZIonToastSuccess(MESSAGES.LABEL.CREATED);
              } else if (_mode === FormMode.EDIT) {
                if (workspaceId) {
                  // Updating all labels data in RQ cache.
                  await updateRQCDataHandler<LabelInterface | undefined>({
                    key: [
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.LABEL.MAIN,
                      workspaceId!
                    ],
                    data: __data as LabelInterface,
                    id: __data.id
                  });
                } else if (wsShareMemberId) {
                  // Updating all labels data in RQ cache.
                  await updateRQCDataHandler<LabelInterface | undefined>({
                    key: [
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.LABEL.SWS_MAIN,
                      wsShareId!
                    ],
                    data: __data as LabelInterface,
                    id: __data.id
                  });
                }

                presentZIonToastSuccess(MESSAGES.LABEL.UPDATED);
              }
            }
          }
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  // when user won't to delete label and click on the delete button this function will fire and show the confirm alert.
  const deleteLabel = async (_labelId?: string) => {
    try {
      if (_labelId) {
        await presentZIonAlert({
          header: MESSAGES.LABEL.DELETE_ALERT.HEADER,
          subHeader: MESSAGES.LABEL.DELETE_ALERT.SUB_HEADER,
          message: MESSAGES.LABEL.DELETE_ALERT.MESSAGES,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Delete',
              cssClass: 'zaions_ion_color_danger',
              role: 'danger',
              handler: () => {
                void removeLabel(_labelId);
              }
            }
          ]
        });
      } else {
        await presentZIonErrorAlert();
      }
    } catch (error) {
      await presentZIonErrorAlert();
    }
  };

  // on the delete time slot confirm alert, when user click on delete button this function will first which will trigger delete request and delete the time slot.
  const removeLabel = async (_labelId?: string) => {
    try {
      if (_labelId) {
        let __response;
        if (workspaceId) {
          __response = await deleteLabelMutate({
            itemIds: [workspaceId!, _labelId],
            urlDynamicParts: [
              CONSTANTS.RouteParams.workspace.workspaceId,
              CONSTANTS.RouteParams.label.labelId
            ]
          });
        } else if (wsShareMemberId) {
          __response = await deleteSWSLabelMutate({
            itemIds: [wsShareMemberId!, _labelId],
            urlDynamicParts: [
              CONSTANTS.RouteParams.workspace.shareWSMemberId,
              CONSTANTS.RouteParams.label.labelId
            ]
          });
        }

        if (__response) {
          const __data = extractInnerData<{ success: boolean }>(
            __response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (__data && __data?.success) {
            let __rqLabelsData =
              (getRQCDataHandler<LabelInterface[]>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.LABEL.MAIN,
                  workspaceId!
                ]
              }) as LabelInterface[]) || [];

            if (wsShareMemberId) {
              __rqLabelsData =
                (getRQCDataHandler<LabelInterface[]>({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.LABEL.SWS_MAIN,
                    wsShareId!
                  ]
                }) as LabelInterface[]) || [];
            }

            // getting all the label from RQ cache.
            const __oldLabels =
              extractInnerData<LabelInterface[]>(
                __rqLabelsData,
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) || [];

            // removing deleted label from cache.
            const __updatedLabels = __oldLabels.filter(
              el => el.id !== _labelId
            );

            // Updating data in RQ cache.
            if (workspaceId) {
              await updateRQCDataHandler<LabelInterface[] | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.LABEL.MAIN,
                  workspaceId!
                ],
                data: __updatedLabels as LabelInterface[],
                id: '',
                extractType: ZRQGetRequestExtractEnum.extractItems,
                updateHoleData: true
              });
            } else if (wsShareMemberId) {
              await updateRQCDataHandler<LabelInterface[] | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.LABEL.SWS_MAIN,
                  wsShareId!
                ],
                data: __updatedLabels?.length === 0 ? [] : __updatedLabels,
                id: '',
                extractType: ZRQGetRequestExtractEnum.extractItems,
                updateHoleData: true
              });
            }

            presentZIonToastSuccess(MESSAGES.LABEL.DELETED);
          } else {
            showErrorNotification(MESSAGES.GENERAL.SOMETHING_WENT_WRONG);
          }
        }
      } else {
        void presentZIonErrorAlert();
      }
    } catch (error) {
      reportCustomError(error);
    }
  };
  //#endregion

  // #region useEffects.
  useEffect(() => {
    try {
      // Accounting to the member or owner getting data and storing it to component state to show in frontend.
      if (wsShareMemberId) {
        setCompState(oldValues => ({
          ...oldValues,
          labelsData: shareWSLabelsData || []
        }));
      } else if (workspaceId) {
        setCompState(oldValues => ({
          ...oldValues,
          labelsData: labelsData || []
        }));
      }
    } catch (error) {
      reportCustomError(error);
    }
  }, [shareWSLabelsData, labelsData]);
  // #endregion

  // if owner then it will watch isFetching of owner api. to show skeleton while fetching data.
  let isZFetching = isLabelsDataFetching;

  // if member then it will watch isFetching of member api. to show skeleton while fetching data.
  if (wsShareMemberId) {
    isZFetching = isShareWSLabelsDataFetching;
  }

  return (
    <Formik
      initialValues={{}}
      onSubmit={() => {}}>
      {/* <ZWorkspaceSettingPlaceholderComp
				buttonText='Create label'
				image={WorkspaceSettingsLabelPlaceholder}
				title={
					<span>
						Create labels to categorize posts and <br /> organize your campaigns
						better
					</span>
				}
			/> */}
      {() => {
        return (
          <div className='flex flex-col w-full h-full pt-6 ion-align-items-center'>
            <ZIonText className='py-2 text-xl'>
              Create and edit your labels below
            </ZIonText>

            <Formik
              initialValues={{
                enableAddLabel: false,
                title: '',

                //
                allLabels: compState.labelsData || [],

                // edit
                mode: FormMode.ADD,
                labelId: ''
              }}
              enableReinitialize={true}
              validate={values => {
                const errors: {
                  title?: string;
                } = {};

                validateField('title', values, errors, VALIDATION_RULE.string);

                return errors;
              }}
              onSubmit={async values => {
                try {
                  const __zStringifyData = zStringify({
                    title: values.title
                  });

                  await FormikSubmissionHandler(__zStringifyData, values.mode);
                } catch (error) {
                  reportCustomError(error);
                }
              }}>
              {({
                values,
                errors,
                touched,
                isValid,
                setFieldValue,
                handleChange,
                handleBlur,
                submitForm
              }) => {
                return (
                  <div className='w-[25%]'>
                    <ZCan
                      shareWSId={wsShareId}
                      permissionType={
                        wsShareId
                          ? permissionsTypeEnum.shareWSMemberPermissions
                          : permissionsTypeEnum.loggedInUserPermissions
                      }
                      havePermissions={
                        wsShareId
                          ? [shareWSPermissionEnum.create_sws_label]
                          : [permissionsEnum?.create_label]
                      }>
                      <ZIonButton
                        className='ion-no-padding'
                        size='small'
                        fill='clear'
                        disabled={values.enableAddLabel}
                        testingselector={
                          CONSTANTS.testingSelectors.workspace.settingsModal
                            .labels.addNewLabelButton
                        }
                        onClick={() => {
                          setFieldValue('enableAddLabel', true, false);
                          setFieldValue('mode', FormMode.ADD, false);
                        }}>
                        <ZIonIcon
                          icon={addOutline}
                          className='me-1'
                        />
                        <ZIonText className='text-sm pt-[2px]'>
                          Add new label
                        </ZIonText>
                      </ZIonButton>
                      <ZIonButton
                        className='ion-no-padding'
                        size='small'
                        fill='clear'
                        color='medium'
                        id='z-workspace-add-label-tooltip'
                        testingselector={
                          CONSTANTS.testingSelectors.workspace.settingsModal
                            .labels.addNewLabelInfoButton
                        }>
                        <ZIonIcon icon={alertCircleOutline} />
                      </ZIonButton>
                      <ZRTooltip
                        anchorSelect='#z-workspace-add-label-tooltip'
                        place='bottom'
                        className='z-40'>
                        <ZIonText>
                          Use labels to organize and group your posts around{' '}
                          <br />
                          campaigns, statuses or categories. A post can <br />{' '}
                          be assigned multiple labels. You can easily filter{' '}
                          <br /> down posts by labels in the Filter & sort menu.
                          {/* <br />
									<ZIonRouterLink routerLink='/'>Learn more</ZIonRouterLink> */}
                        </ZIonText>
                      </ZRTooltip>
                    </ZCan>

                    {values.enableAddLabel && (
                      <div className='flex mt-3'>
                        <ZIonInput
                          placeholder='Label name'
                          minHeight='2.3rem'
                          name='title'
                          value={values.title}
                          onIonChange={handleChange}
                          onIonBlur={handleBlur}
                          errorText={touched.title ? errors.title : undefined}
                          testingselector={
                            CONSTANTS.testingSelectors.workspace.settingsModal
                              .labels.labelNameInput
                          }
                          className={classNames({
                            z_ion_bg_white: true,
                            'ion-touched': touched.title,
                            'ion-invalid': errors.title,
                            'ion-valid': !errors.title
                          })}
                        />
                        <ZIonButton
                          height='2.3rem'
                          className='mx-1 ion-no-margin ion-no-padding'
                          size='small'
                          fill='clear'
                          testingselector={
                            CONSTANTS.testingSelectors.workspace.settingsModal
                              .labels.closedCreateModeButton
                          }
                          onClick={() => {
                            setFieldValue('enableAddLabel', false, false);
                          }}>
                          <ZIonIcon
                            icon={closeOutline}
                            color='danger'
                            className='w-5 h-5'
                          />
                        </ZIonButton>
                        <ZIonButton
                          height='2.3rem'
                          className='mx-1 ion-no-margin ion-no-padding'
                          size='small'
                          color='success'
                          fill='clear'
                          disabled={!isValid}
                          testingselector={
                            CONSTANTS.testingSelectors.workspace.settingsModal
                              .labels.closedCreateModeButton
                          }
                          onClick={() => {
                            void submitForm();
                          }}>
                          <ZIonIcon
                            icon={checkmark}
                            className='w-5 h-5'
                          />
                        </ZIonButton>
                      </div>
                    )}

                    <ZIonList
                      lines='full'
                      className='mt-1 bg-transparent'>
                      {isZFetching &&
                        [1, 2].map(el => {
                          return (
                            <ZIonItem
                              key={el}
                              minHeight='2rem'
                              className='ion-item-start-no-padding'
                              style={{
                                '--background': 'transparent',
                                '--inner-padding-end': '0px'
                              }}>
                              <ZIonBadge className='font-normal ion-no-padding px-1 max-w-[5.5rem] tracking-wider'>
                                <ZIonTitle className='text-sm ion-no-padding h-min'>
                                  <ZIonSkeletonText
                                    height='.9rem'
                                    width='3rem'
                                  />
                                </ZIonTitle>
                              </ZIonBadge>
                              <ZIonText className='mx-2 text-sm'>
                                <ZIonSkeletonText
                                  height='.9rem'
                                  width='2.5rem'
                                />
                              </ZIonText>

                              <ZIonIcon
                                slot='end'
                                icon={createOutline}
                                className='w-5 h-5'
                              />

                              <ZIonIcon
                                slot='end'
                                color='danger'
                                icon={trashBinOutline}
                                className='w-4 h-4 ms-2'
                              />
                            </ZIonItem>
                          );
                        })}

                      <FieldArray name='allLabels'>
                        {() => {
                          return (
                            <>
                              {!isZFetching &&
                                values.allLabels.map((el, index) => {
                                  return (
                                    <ZCan
                                      shareWSId={wsShareId}
                                      key={index}
                                      permissionType={
                                        wsShareId
                                          ? permissionsTypeEnum.shareWSMemberPermissions
                                          : permissionsTypeEnum.loggedInUserPermissions
                                      }
                                      havePermissions={
                                        wsShareId
                                          ? [
                                              shareWSPermissionEnum.view_sws_label
                                            ]
                                          : [permissionsEnum?.view_label]
                                      }>
                                      <ZIonItem
                                        minHeight='2rem'
                                        className='ion-item-start-no-padding'
                                        style={{
                                          '--background': 'transparent',
                                          '--inner-padding-end': '0px'
                                        }}>
                                        {!el.editMode && (
                                          <>
                                            <ZIonBadge className='font-normal ion-no-padding px-1 max-w-[5.5rem] tracking-wider'>
                                              <ZIonTitle className='text-sm ion-no-padding h-min'>
                                                {el.title}
                                              </ZIonTitle>
                                            </ZIonBadge>
                                            <ZIonText className='mx-2 text-sm'>
                                              {el.postsCount || 0} posts
                                            </ZIonText>

                                            {/* if user as a owner or member have permission to do this action then showing element */}
                                            <ZCan
                                              shareWSId={wsShareId}
                                              permissionType={
                                                wsShareId
                                                  ? permissionsTypeEnum.shareWSMemberPermissions
                                                  : permissionsTypeEnum.loggedInUserPermissions
                                              }
                                              havePermissions={
                                                wsShareId
                                                  ? [
                                                      shareWSPermissionEnum.update_sws_label
                                                    ]
                                                  : [
                                                      permissionsEnum?.update_label
                                                    ]
                                              }>
                                              <ZIonIcon
                                                slot='end'
                                                icon={createOutline}
                                                className='w-5 h-5 cursor-pointer'
                                                id={`z-workspace-add-label-edit-${index}`}
                                                testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.labels.editLabelButton}-${el.id}`}
                                                testinglistselector={
                                                  CONSTANTS.testingSelectors
                                                    .workspace.settingsModal
                                                    .labels.editLabelButton
                                                }
                                                onClick={() => {
                                                  setFieldValue(
                                                    `allLabels.${index}.editMode`,
                                                    true,
                                                    false
                                                  );

                                                  setFieldValue(
                                                    'mode',
                                                    FormMode.EDIT,
                                                    false
                                                  );
                                                }}
                                              />
                                              <ZRTooltip
                                                anchorSelect={`#z-workspace-add-label-edit-${index}`}
                                                place='left'
                                                className='z-40 h-[2rem] p-0 text-sm'>
                                                <ZIonText className='text-sm'>
                                                  Edit label
                                                </ZIonText>
                                              </ZRTooltip>
                                            </ZCan>

                                            <ZCan
                                              shareWSId={wsShareId}
                                              permissionType={
                                                wsShareId
                                                  ? permissionsTypeEnum.shareWSMemberPermissions
                                                  : permissionsTypeEnum.loggedInUserPermissions
                                              }
                                              havePermissions={
                                                wsShareId
                                                  ? [
                                                      shareWSPermissionEnum.delete_sws_label
                                                    ]
                                                  : [
                                                      permissionsEnum?.delete_label
                                                    ]
                                              }>
                                              <ZIonIcon
                                                slot='end'
                                                color='danger'
                                                icon={trashBinOutline}
                                                className='w-4 h-4 cursor-pointer ms-2'
                                                id={`z-workspace-add-label-delete-${index}`}
                                                testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.labels.deleteLabelButton}-${el.id}`}
                                                testinglistselector={
                                                  CONSTANTS.testingSelectors
                                                    .workspace.settingsModal
                                                    .labels.deleteLabelButton
                                                }
                                                onClick={async () => {
                                                  if (el.id) {
                                                    await deleteLabel(el.id);
                                                  }
                                                }}
                                              />
                                              <ZRTooltip
                                                anchorSelect={`#z-workspace-add-label-delete-${index}`}
                                                place='left'
                                                className='z-40 h-[2rem] p-0 text-sm'>
                                                <ZIonText className='text-sm'>
                                                  Delete label
                                                </ZIonText>
                                              </ZRTooltip>
                                            </ZCan>
                                          </>
                                        )}
                                        {el.editMode && (
                                          <div className='flex w-full ion-align-items-start'>
                                            <ZIonInput
                                              placeholder='Label name'
                                              minHeight='2rem'
                                              onIonChange={handleChange}
                                              onIonBlur={handleBlur}
                                              errorText={
                                                values.allLabels[
                                                  index
                                                ]?.title?.trim().length === 0
                                                  ? 'Title is required'
                                                  : undefined
                                              }
                                              name={`allLabels.${index}.title`}
                                              className={classNames({
                                                'w-full z_ion_bg_white ps-2':
                                                  true,
                                                'ion-touched':
                                                  touched.allLabels &&
                                                  touched.allLabels[index]
                                                    ?.title,
                                                'ion-invalid':
                                                  values.allLabels &&
                                                  values.allLabels[
                                                    index
                                                  ]?.title?.trim().length === 0,
                                                'ion-valid':
                                                  values.allLabels[
                                                    index
                                                  ].title?.trim().length
                                              })}
                                              value={
                                                values.allLabels[index].title
                                              }
                                              style={{
                                                '--padding-start': '12px'
                                              }}
                                            />
                                            <ZIonButton
                                              height='2.3rem'
                                              className='mx-1 ion-no-margin ion-no-padding'
                                              size='small'
                                              fill='clear'
                                              onClick={() => {
                                                setFieldValue(
                                                  `allLabels.${index}.title`,
                                                  compState?.labelsData[index]
                                                    ?.title,
                                                  false
                                                );
                                                setFieldValue(
                                                  `allLabels.${index}.editMode`,
                                                  false,
                                                  false
                                                );
                                              }}>
                                              <ZIonIcon
                                                icon={closeOutline}
                                                color='danger'
                                                className='w-5 h-5'
                                              />
                                            </ZIonButton>

                                            <div
                                              className={classNames({
                                                'h-full': true,
                                                'cursor-not-allowed':
                                                  (values.allLabels &&
                                                    values.allLabels[
                                                      index
                                                    ]?.title?.trim().length ===
                                                      0) ||
                                                  values.allLabels[
                                                    index
                                                  ]?.title?.trim() ===
                                                    compState?.labelsData[
                                                      index
                                                    ]?.title?.trim()
                                              })}>
                                              <ZIonButton
                                                height='2.3rem'
                                                className='mx-1 ion-no-margin ion-no-padding'
                                                size='small'
                                                color='success'
                                                fill='clear'
                                                disabled={
                                                  (values.allLabels &&
                                                    values.allLabels[
                                                      index
                                                    ]?.title?.trim().length ===
                                                      0) ||
                                                  values.allLabels[
                                                    index
                                                  ]?.title?.trim() ===
                                                    compState?.labelsData[
                                                      index
                                                    ]?.title?.trim()
                                                }
                                                onClick={async () => {
                                                  try {
                                                    if (
                                                      (values.allLabels &&
                                                        (values.allLabels[
                                                          index
                                                        ]?.title?.trim()
                                                          .length || 0) > 0) ||
                                                      values.allLabels[
                                                        index
                                                      ]?.title?.trim() !==
                                                        compState?.labelsData[
                                                          index
                                                        ]?.title?.trim()
                                                    ) {
                                                      const __zStringifyData =
                                                        zStringify({
                                                          title:
                                                            values.allLabels[
                                                              index
                                                            ].title
                                                        });

                                                      await FormikSubmissionHandler(
                                                        __zStringifyData,
                                                        values.mode,
                                                        el.id
                                                      );

                                                      setFieldValue(
                                                        `allLabels.${index}.editMode`,
                                                        false,
                                                        false
                                                      );

                                                      setFieldValue(
                                                        'mode',
                                                        FormMode.ADD,
                                                        false
                                                      );
                                                    }
                                                  } catch (error) {
                                                    reportCustomError(error);
                                                  }
                                                }}>
                                                <ZIonIcon
                                                  icon={checkmark}
                                                  className='w-5 h-5'
                                                />
                                              </ZIonButton>
                                            </div>
                                          </div>
                                        )}
                                      </ZIonItem>
                                    </ZCan>
                                  );
                                })}
                            </>
                          );
                        }}
                      </FieldArray>
                      {!isZFetching && values.allLabels?.length === 0 && (
                        <div className='flex flex-col mt-4 ion-align-items-center'>
                          <ZIonIcon
                            icon={fileTrayOutline}
                            color='medium'
                            className='w-7 h-7'
                          />
                          <ZIonText color='medium'>
                            No label found.
                            <ZCan
                              shareWSId={wsShareId}
                              permissionType={
                                wsShareId
                                  ? permissionsTypeEnum.shareWSMemberPermissions
                                  : permissionsTypeEnum.loggedInUserPermissions
                              }
                              havePermissions={
                                wsShareId
                                  ? [shareWSPermissionEnum.create_sws_label]
                                  : [permissionsEnum?.create_label]
                              }>
                              <ZIonText className='ms-1'>
                                please create a label
                              </ZIonText>
                            </ZCan>
                          </ZIonText>
                        </div>
                      )}
                    </ZIonList>
                  </div>
                );
              }}
            </Formik>
          </div>
        );
      }}
    </Formik>
  );
};

export default ZLabelsTab;
