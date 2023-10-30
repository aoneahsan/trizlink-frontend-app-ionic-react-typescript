// Core Imports
import React from 'react';
// Packages Import
import { Formik, Form } from 'formik';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import classNames from 'classnames';

// Custom Imports
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonRouterLink,
  ZIonHeader,
  ZIonContent,
  ZIonFooter,
  ZIonInput,
  ZIonImg,
  ZIonButton
} from '@/components/ZIonComponents';
import ZCan from '@/components/Can';

// Global Constants
import MESSAGES from '@/utils/messages';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { extractInnerData, zStringify } from '@/utils/helpers';
import CONSTANTS from '@/utils/constants';
import { showSuccessNotification } from '@/utils/notification';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { reportCustomError } from '@/utils/customErrorType';
import {
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';
import {
  useZRQCreateRequest,
  useZGetRQCacheData,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';

// Images
import { ProductFavicon } from '@/assets/images';

// Recoil States
import { ZaionsAppSettingsRState } from '@/ZaionsStore/zaionsAppSettings.recoil';
import { UTMTagsTemplateFormState } from '@/ZaionsStore/FormStates/addUTMTagsFormState.recoil';

// Types
import { FormMode } from '@/types/AdminPanel/index.type';
import { type resetFormType } from '@/types/ZaionsFormik.type';
import { type ZLinkMutateApiType } from '@/types/ZaionsApis.type';
import { type UTMTagTemplateType } from '@/types/AdminPanel/linksType';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

// Styles

const ZaionsAddUtmTags: React.FC<{
  workspaceId: string;
  shareWSMemberId: string;
  wsShareId: string;
  dismissZIonModal: (data?: string, role?: string | undefined) => void;
  formMode?: FormMode;
  utmTag?: UTMTagTemplateType;
}> = ({
  dismissZIonModal,
  formMode = FormMode.ADD,
  utmTag,
  workspaceId,
  wsShareId,
  shareWSMemberId
}) => {
  // #region Recoil states.
  const appSettings = useRecoilValue(ZaionsAppSettingsRState);
  const setZaionsUTMTagsTemplateFormState = useSetRecoilState(
    UTMTagsTemplateFormState
  );
  // #endregion

  // #region Custom hooks.
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  // #endregion

  // #region APIS.
  const { mutateAsync: createUTMTagAsyncMutate } = useZRQCreateRequest({
    _url: API_URL_ENUM.userAccountUtmTags_create_list,
    _itemsIds: [workspaceId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _queriesKeysToInvalidate: []
  });

  const { mutateAsync: createSWSUTMTagAsyncMutate } = useZRQCreateRequest({
    _url: API_URL_ENUM.sws_utm_tag_create_list,
    _itemsIds: [shareWSMemberId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _queriesKeysToInvalidate: []
  });

  const { mutateAsync: updateUTMTagAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.userAccountUtmTags_update_delete
  });

  const { mutateAsync: updateSWSUTMTagAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.sws_utm_tag_update_delete
  });
  // #endregion

  // #region Functions
  /**
   * Handle Form Submission Function
   * add a new UTM Tag function
   *  */
  const handleFormSubmit = async (
    value: string,
    resetForm?: resetFormType
  ): Promise<void> => {
    try {
      let _response;
      // ADD API Request to add this UTM Tag to user account in DB.
      if (formMode === FormMode.ADD) {
        if (workspaceId !== undefined) {
          _response = await createUTMTagAsyncMutate(value);
        } else if (wsShareId !== undefined && shareWSMemberId !== undefined) {
          _response = await createSWSUTMTagAsyncMutate(value);
        }
      } else if (formMode === FormMode.EDIT && utmTag?.id !== undefined) {
        if (workspaceId !== undefined) {
          _response = await updateUTMTagAsyncMutate({
            itemIds: [workspaceId, utmTag?.id],
            urlDynamicParts: [
              CONSTANTS.RouteParams.workspace.workspaceId,
              CONSTANTS.RouteParams.utmTag.utmTagId
            ],
            requestData: value
          });
        } else if (wsShareId !== undefined && shareWSMemberId !== undefined) {
          _response = await updateSWSUTMTagAsyncMutate({
            itemIds: [shareWSMemberId, utmTag?.id],
            urlDynamicParts: [
              CONSTANTS.RouteParams.workspace.shareWSMemberId,
              CONSTANTS.RouteParams.utmTag.utmTagId
            ],
            requestData: value
          });
        }
      }

      if ((_response as ZLinkMutateApiType<UTMTagTemplateType>).success) {
        const _data = extractInnerData<UTMTagTemplateType>(
          _response,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );

        if (_data?.id !== null) {
          let _utmDataFromCache: UTMTagTemplateType[] = [];

          if (workspaceId !== undefined) {
            _utmDataFromCache =
              getRQCDataHandler<UTMTagTemplateType[]>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN,
                  workspaceId
                ]
              }) ?? [];
          } else if (wsShareId !== undefined && shareWSMemberId !== undefined) {
            _utmDataFromCache =
              getRQCDataHandler<UTMTagTemplateType[]>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.SWS_MAIN,
                  wsShareId
                ]
              }) ?? [];
          }

          const _oldUtmData = extractInnerData<UTMTagTemplateType[]>(
            _utmDataFromCache,
            extractInnerDataOptionsEnum.createRequestResponseItems
          );

          if (_oldUtmData !== undefined) {
            if (formMode === FormMode.ADD) {
              const _updatedUtmTagsData = [..._oldUtmData, _data];

              if (workspaceId !== undefined) {
                await updateRQCDataHandler({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN,
                    workspaceId
                  ],
                  data: _updatedUtmTagsData,
                  id: '',
                  extractType: ZRQGetRequestExtractEnum.extractItems,
                  updateHoleData: true
                });
              } else if (
                wsShareId !== undefined &&
                shareWSMemberId !== undefined
              ) {
                await updateRQCDataHandler({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.SWS_MAIN,
                    wsShareId
                  ],
                  data: _updatedUtmTagsData,
                  id: '',
                  extractType: ZRQGetRequestExtractEnum.extractItems,
                  updateHoleData: true
                });
              }

              showSuccessNotification(MESSAGES.UTM_TAGS_TEMPLATE.CREATED);
            } else if (formMode === FormMode.EDIT) {
              await updateRQCDataHandler({
                key:
                  workspaceId !== undefined
                    ? [
                        CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN,
                        workspaceId
                      ]
                    : wsShareId !== undefined
                    ? [
                        CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.SWS_MAIN,
                        wsShareId
                      ]
                    : [],
                data: _data,
                id: _data?.id ?? '',
                extractType: ZRQGetRequestExtractEnum.extractItems
              });

              showSuccessNotification(MESSAGES.UTM_TAGS_TEMPLATE.UPDATED);
            }
          }
        }
      }
      // Close modal after action.
      dismissZIonModal();

      // Reset to Default
      SetDefaultPixelsAccountFormState();

      // this will reset form
      if (resetForm !== undefined) {
        resetForm({ values: {} });
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  const SetDefaultPixelsAccountFormState = (): void => {
    try {
      // Reset to default
      setZaionsUTMTagsTemplateFormState(oldVal => ({
        ...oldVal,
        id: '',
        templateName: '',
        utmCampaign: '',
        utmMedium: '',
        utmSource: '',
        utmTerm: '',
        utmContent: '',
        formMode: FormMode.ADD
      }));
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  // JSX Code
  return (
    <ZCan
      shareWSId={wsShareId}
      permissionType={
        wsShareId !== undefined
          ? permissionsTypeEnum.shareWSMemberPermissions
          : permissionsTypeEnum.loggedInUserPermissions
      }
      havePermissions={
        wsShareId !== undefined
          ? [
              shareWSPermissionEnum.create_sws_utmTag,
              shareWSPermissionEnum.update_sws_utmTag
            ]
          : [permissionsEnum.create_utmTag, permissionsEnum.update_utmTag]
      }>
      <Formik
        initialValues={{
          templateName: utmTag?.templateName ?? '',
          utmCampaign: utmTag?.utmCampaign ?? '',
          utmMedium: utmTag?.utmMedium ?? '',
          utmSource: utmTag?.utmSource ?? '',
          utmTerm: utmTag?.utmTerm ?? '',
          utmContent: utmTag?.utmContent ?? ''
        }}
        enableReinitialize={true}
        validate={values => {
          const errors: {
            templateName?: string;
            utmCampaign?: string;
            utmMedium?: string;
          } = {};

          if (values?.templateName?.trim()?.length === 0) {
            errors.templateName = 'Template name is required.';
          }

          if (values?.utmCampaign?.trim()?.length === 0) {
            errors.utmCampaign = 'Campaign is required.';
          }

          if (values?.utmMedium?.trim()?.length === 0) {
            errors.utmMedium = 'Medium is required.';
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          const stringifyValue = zStringify({
            templateName: values.templateName,
            utmCampaign: values.utmCampaign,
            utmMedium: values.utmMedium,
            utmSource: values.utmSource,
            utmTerm: values.utmTerm,
            utmContent: values.utmContent
          });
          void handleFormSubmit(stringifyValue, resetForm);
        }}>
        {({
          values,
          errors,
          handleSubmit,
          handleChange,
          handleBlur,
          submitForm,
          touched
        }) => (
          <>
            {/**
             * Header of Modal will shown if the `showActionInModalHeader` is set to `true` in      appSetting and hide if it is `false`
             * default: false
             *  */}
            {appSettings.appModalsSetting.actions.showActionInModalHeader && (
              <ZIonHeader>
                <ZIonRow className='ion-align-items-center'>
                  <ZIonCol>
                    <ZIonButton
                      testingselector={
                        CONSTANTS.testingSelectors.utmTags.formModal
                          .closeModalBtn
                      }
                      onClick={() => {
                        // Close The Modal
                        dismissZIonModal();
                        // Reset to Default
                        SetDefaultPixelsAccountFormState();
                      }}
                      color='primary'
                      className='ion-text-capitalize'
                      fill='outline'>
                      Close
                    </ZIonButton>
                  </ZIonCol>

                  <ZIonCol className='ion-text-end'>
                    <ZIonButton
                      type='submit'
                      testingselector={
                        CONSTANTS.testingSelectors.utmTags.formModal
                          .submitFormBtn
                      }
                      onClick={() => {
                        void submitForm();
                      }}
                      color={'primary'}
                      className='ion-text-capitalize'
                      fill='solid'>
                      {formMode === FormMode.ADD
                        ? 'Create'
                        : formMode === FormMode.EDIT && 'Update'}
                    </ZIonButton>
                  </ZIonCol>
                </ZIonRow>
                {/* </IonToolbar> */}
              </ZIonHeader>
            )}

            <ZIonContent className='ion-padding'>
              <div className='flex flex-col ion-text-center ion-justify-content-center ion-padding-top ion-margin-top'>
                <div className='flex mx-auto mb-0 rounded-full w-11 h-11 ion-align-items-center ion-justify-content-enter'>
                  <ZIonImg
                    src={ProductFavicon}
                    className='w-10 h-10 mx-auto'
                  />
                </div>

                {/*  */}
                <ZIonText
                  color='dark'
                  className='block mt-3 text-lg font-bold ion-text-center'>
                  {formMode === FormMode.ADD
                    ? 'Create '
                    : formMode === FormMode.EDIT
                    ? 'Update '
                    : ''}
                  UTMs preset
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.HomeRoute}
                    className='mx-1'>
                    (help)
                  </ZIonRouterLink>
                </ZIonText>
              </div>

              {/*  */}
              <Form
                onSubmit={handleSubmit}
                className='px-2'>
                {/* Template Name Input */}
                <ZIonInput
                  type='text'
                  label='Template name*'
                  labelPlacement='stacked'
                  name='templateName'
                  placeholder='Template name'
                  minHeight='2.3rem'
                  onIonChange={handleChange}
                  onIonBlur={handleBlur}
                  value={values.templateName}
                  errorText={
                    touched?.templateName === true
                      ? errors?.templateName
                      : undefined
                  }
                  testingselector={
                    CONSTANTS.testingSelectors.utmTags.formModal.name
                  }
                  className={classNames({
                    'mt-5': true,
                    'ion-touched': touched?.templateName,
                    'ion-invalid':
                      touched?.templateName === true && errors?.templateName,
                    'ion-valid':
                      touched?.templateName === true &&
                      (errors?.templateName === undefined ||
                        errors?.templateName === null)
                  })}
                />

                {/* UTM Campaign Input */}
                <ZIonInput
                  type='text'
                  minHeight='2.3rem'
                  label='UTM Campaign*'
                  labelPlacement='stacked'
                  placeholder='UTM Campaign'
                  name='utmCampaign'
                  onIonChange={handleChange}
                  onIonBlur={handleBlur}
                  value={values.utmCampaign}
                  errorText={
                    touched?.utmCampaign === true
                      ? errors?.utmCampaign
                      : undefined
                  }
                  testingselector={
                    CONSTANTS.testingSelectors.utmTags.formModal.campaign
                  }
                  className={classNames({
                    'mt-3': true,
                    'ion-touched': touched?.utmCampaign === true,
                    'ion-invalid':
                      touched?.utmCampaign === true && errors?.utmCampaign,
                    'ion-valid':
                      touched?.utmCampaign === true &&
                      (errors?.utmCampaign === undefined ||
                        errors?.utmCampaign === null)
                  })}
                />

                {/* UTM Medium Input */}
                <ZIonInput
                  type='text'
                  minHeight='2.3rem'
                  label='UTM Medium*'
                  labelPlacement='stacked'
                  name='utmMedium'
                  placeholder='UTM Medium'
                  onIonChange={handleChange}
                  onIonBlur={handleBlur}
                  value={values.utmMedium}
                  errorText={
                    touched?.utmMedium === true ? errors?.utmMedium : undefined
                  }
                  testingselector={
                    CONSTANTS.testingSelectors.utmTags.formModal.medium
                  }
                  className={classNames({
                    'mt-3': true,
                    'ion-touched': touched?.utmMedium === true,
                    'ion-invalid':
                      touched?.utmMedium === true && errors?.utmMedium,
                    'ion-valid':
                      touched?.utmMedium === true &&
                      (errors?.utmMedium === undefined ||
                        errors?.utmMedium === null)
                  })}
                />

                {/* UTM Source Input */}
                <ZIonInput
                  type='text'
                  minHeight='2.3rem'
                  className='mt-3'
                  label='UTM Source*'
                  name='utmSource'
                  labelPlacement='stacked'
                  placeholder='UTM Source'
                  onIonChange={handleChange}
                  onIonBlur={handleBlur}
                  value={values.utmSource}
                  testingselector={
                    CONSTANTS.testingSelectors.utmTags.formModal.source
                  }
                />

                {/* UTM Term Input */}
                <ZIonInput
                  type='text'
                  minHeight='2.3rem'
                  className='mt-3'
                  label='UTM Term*'
                  name='utmTerm'
                  labelPlacement='stacked'
                  placeholder='UTM Term'
                  onIonChange={handleChange}
                  onIonBlur={handleBlur}
                  value={values.utmTerm}
                  testingselector={
                    CONSTANTS.testingSelectors.utmTags.formModal.term
                  }
                />

                {/* UTM Content Input */}
                <ZIonInput
                  type='text'
                  minHeight='2.3rem'
                  className='mt-3'
                  label='UTM Content*'
                  name='utmContent'
                  labelPlacement='stacked'
                  placeholder='UTM Content'
                  onIonChange={handleChange}
                  onIonBlur={handleBlur}
                  value={values.utmContent}
                  testingselector={
                    CONSTANTS.testingSelectors.utmTags.formModal.content
                  }
                />
              </Form>
            </ZIonContent>

            {/**
             * Footer of Modal will shown if the `showActionInModalFooter` is set to `true` in appSetting, and hide if it is `false`
             * default: true
             *  */}
            {appSettings.appModalsSetting.actions.showActionInModalFooter && (
              <ZIonFooter>
                <ZIonRow className='px-3 mt-1 ion-justify-content-between'>
                  <ZIonCol>
                    <ZIonButton
                      fill='outline'
                      size='default'
                      className='ion-text-capitalize'
                      testingselector={
                        CONSTANTS.testingSelectors.utmTags.formModal
                          .closeModalBtn
                      }
                      onClick={() => {
                        // Close The Modal
                        dismissZIonModal();
                        // Reset to Default
                        SetDefaultPixelsAccountFormState();
                      }}>
                      Close
                    </ZIonButton>
                  </ZIonCol>

                  <ZIonCol className='ion-text-end'>
                    <ZIonButton
                      fill='solid'
                      size='default'
                      className='ion-text-capitalize'
                      // disabled
                      type='submit'
                      testingselector={
                        CONSTANTS.testingSelectors.utmTags.formModal
                          .submitFormBtn
                      }
                      onClick={() => {
                        void submitForm();
                      }}>
                      {formMode === FormMode.ADD
                        ? 'Create'
                        : formMode === FormMode.EDIT && 'Update'}
                    </ZIonButton>
                  </ZIonCol>
                </ZIonRow>
                {/* {!isValid && (
                <ZIonRow>
                  <ZIonCol className='ion-text-center'>
                    <ZIonNote color='danger'>
                      {MESSAGES.GENERAL.FORM.INVALID}
                    </ZIonNote>
                  </ZIonCol>
                </ZIonRow>
              )} */}
              </ZIonFooter>
            )}
          </>
        )}
      </Formik>
    </ZCan>
  );
};

export default ZaionsAddUtmTags;
