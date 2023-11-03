// Core Imports
import React from 'react';

// Packages Import
import { Form, Formik } from 'formik';
import { useRecoilValue } from 'recoil';
import classNames from 'classnames';

// Custom Imports
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonHeader,
  ZIonContent,
  ZIonFooter,
  ZIonSelectOption,
  ZIonInput,
  ZIonImg,
  ZIonButton,
  ZIonSelect
} from '@/components/ZIonComponents';
import ZCan from '@/components/Can';

// Custom hooks
import {
  useZGetRQCacheData,
  useZRQUpdateRequest,
  useZRQCreateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

// Global Constants
import {
  convertToTitleCase,
  extractInnerData,
  validateFields,
  validatePixelAccountID,
  zStringify
} from '@/utils/helpers';
import MESSAGES from '@/utils/messages';
import {
  API_URL_ENUM,
  extractInnerDataOptionsEnum,
  VALIDATION_RULE
} from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';
import { showSuccessNotification } from '@/utils/notification';
import {
  permissionCheckModeEnum,
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';

// Images
import { ProductFaviconSmall } from '@/assets/images';

// Recoil States
import { PixelAccountPlatformOptionsRState } from '@/ZaionsStore/UserDashboard/PixelAccountsState/index.recoil';
import { ZaionsAppSettingsRState } from '@/ZaionsStore/zaionsAppSettings.recoil';

// Types
import {
  type PixelAccountPlatformType,
  type PixelAccountType,
  PixelPlatformsEnum
} from '@/types/AdminPanel/linksType';
import { FormMode } from '@/types/AdminPanel/index.type';
import { type resetFormType } from '@/types/ZaionsFormik.type';
import { type ZLinkMutateApiType } from '@/types/ZaionsApis.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

// Styles

// Pixel Id Placeholder check
// const PIXEL_ID_PLACEHOLDER = (curSelectedPlatformType?: PixelPlatformsEnum) => {
//   switch (curSelectedPlatformType) {
//     case PixelPlatformsEnum.facebook:
//       return '1234567891234567';
//     case PixelPlatformsEnum.twitter:
//       return 'zaionsOfficial';
//     case PixelPlatformsEnum.google_analytics:
//     case PixelPlatformsEnum.google_analytics_4:
//       return 'UA-000000-0';
//     case PixelPlatformsEnum.google_ads:
//       return '123456789';
//     case PixelPlatformsEnum.google_tag_manager:
//       return 'GMT-0000AAA';
//     case PixelPlatformsEnum.quora:
//       return 'd42ba18b3f684e8fb5d68cf9c628b6d';
//     case PixelPlatformsEnum.snapchat:
//       return '7c47481d-fde8-4263-89b3-4a63367e';
//     case PixelPlatformsEnum.pinterest:
//       return '1234567891234';
//     case PixelPlatformsEnum.bing:
//     case PixelPlatformsEnum.linkedin:
//       return '1234567';
//     case PixelPlatformsEnum.adroll:
//       return 'YourAdvertiserID|YourPixelID';
//     case PixelPlatformsEnum.nexus:
//       return '';
//     case PixelPlatformsEnum.tiktok:
//       return 'ABCDEFGHIGKLMNOPQRST';
//     case PixelPlatformsEnum.vk:
//       return 'VK-ABCD-000000-ABCD';
//     default:
//       return '1234567891234567';
//   }
// };
const ZaionsAddPixelAccount: React.FC<{
  dismissZIonModal: (data?: string, role?: string | undefined) => void;
  pixelId?: string;
  selectedId?: string;
  pixelTitle?: string;
  pixelPlatform?: PixelPlatformsEnum;
  formMode?: FormMode;
  workspaceId: string;
  shareWSMemberId: string;
  wsShareId: string;
}> = ({
  dismissZIonModal,
  pixelId,
  selectedId,
  pixelTitle,
  pixelPlatform,
  formMode = FormMode.ADD,
  workspaceId,
  shareWSMemberId,
  wsShareId
}) => {
  // #region Recoil state.
  const platformData = useRecoilValue(PixelAccountPlatformOptionsRState);
  const appSettings = useRecoilValue(ZaionsAppSettingsRState);
  // #endregion

  // #region Custom Hooks.
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  const { isMdScale } = useZMediaQueryScale();
  // #endregion

  // #region Custom APIS.
  const { mutateAsync: createPixelAccount } = useZRQCreateRequest({
    _url: API_URL_ENUM.userPixelAccounts_create_list,
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _itemsIds: [workspaceId]
  });

  const { mutateAsync: createSWSPixelAccount } = useZRQCreateRequest({
    _url: API_URL_ENUM.sws_pixel_account_create_list,
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _itemsIds: [shareWSMemberId]
  });

  const { mutateAsync: updatePixelAccount } = useZRQUpdateRequest({
    _url: API_URL_ENUM.userPixelAccounts_update_delete
  });

  const { mutateAsync: updateSWSPixelAccount } = useZRQUpdateRequest({
    _url: API_URL_ENUM.sws_pixel_account_update_delete
  });
  // #endregion

  // #region Functions.
  /**
   * Handle Form Submission Function
   * add a new pixel function
   *  */
  const handleFormSubmit = async (
    _value: string,
    resetForm: resetFormType
  ): Promise<void> => {
    try {
      let _response;

      // if in from add mode then add a new pixel account
      if (formMode === FormMode.ADD) {
        if (workspaceId !== undefined) {
          _response = await createPixelAccount(_value);
        } else if (wsShareId !== undefined && shareWSMemberId !== undefined) {
          _response = await createSWSPixelAccount(_value);
        }
      } else if (formMode === FormMode.EDIT && selectedId !== undefined) {
        // if in from edit mode then edit  pixel account
        if (workspaceId !== undefined) {
          _response = await updatePixelAccount({
            itemIds: [workspaceId, selectedId],
            urlDynamicParts: [
              CONSTANTS.RouteParams.workspace.workspaceId,
              CONSTANTS.RouteParams.pixel.pixelId
            ],
            requestData: _value
          });
        } else if (wsShareId !== undefined && shareWSMemberId !== undefined) {
          _response = await updateSWSPixelAccount({
            itemIds: [shareWSMemberId, selectedId],
            urlDynamicParts: [
              CONSTANTS.RouteParams.workspace.shareWSMemberId,
              CONSTANTS.RouteParams.pixel.pixelId
            ],
            requestData: _value
          });
        }
      }

      if ((_response as ZLinkMutateApiType<PixelAccountPlatformType>).success) {
        const _data = extractInnerData<PixelAccountPlatformType>(
          _response,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );

        if (_data?.id !== null) {
          let _pixelsDataFromCache: PixelAccountPlatformType[] = [];
          if (workspaceId !== undefined) {
            _pixelsDataFromCache =
              getRQCDataHandler<PixelAccountPlatformType[]>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN,
                  workspaceId
                ]
              }) ?? [];
          } else if (wsShareId !== undefined && shareWSMemberId !== undefined) {
            _pixelsDataFromCache =
              getRQCDataHandler<PixelAccountPlatformType[]>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.SWS_MAIN,
                  wsShareId
                ]
              }) ?? [];
          }

          const _oldPixelsData = extractInnerData<PixelAccountPlatformType[]>(
            _pixelsDataFromCache,
            extractInnerDataOptionsEnum.createRequestResponseItems
          );

          if (_oldPixelsData !== undefined) {
            if (formMode === FormMode.ADD) {
              // added pixels to all pixels data in cache.
              const _updatedPixelsData = [..._oldPixelsData, _data];

              if (workspaceId !== undefined) {
                // Updating all pixels data in RQ cache.
                await updateRQCDataHandler<
                  PixelAccountPlatformType[] | undefined
                >({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN,
                    workspaceId
                  ],
                  data: _updatedPixelsData as PixelAccountPlatformType[],
                  id: '',
                  extractType: ZRQGetRequestExtractEnum.extractItems,
                  updateHoleData: true
                });
              } else if (
                wsShareId !== undefined &&
                shareWSMemberId !== undefined
              ) {
                // Updating all pixels data in RQ cache.
                await updateRQCDataHandler<
                  PixelAccountPlatformType[] | undefined
                >({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.SWS_MAIN,
                    wsShareId
                  ],
                  data: _updatedPixelsData as PixelAccountPlatformType[],
                  id: '',
                  extractType: ZRQGetRequestExtractEnum.extractItems,
                  updateHoleData: true
                });
              }

              showSuccessNotification(MESSAGES.PIXEL_ACCOUNT.CREATED);
            } else if (formMode === FormMode.EDIT) {
              if (workspaceId !== undefined) {
                // Updating all pixels data in RQ cache.
                await updateRQCDataHandler<
                  PixelAccountPlatformType | undefined
                >({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN,
                    workspaceId
                  ],
                  data: _data,
                  id: _data?.id ?? '',
                  extractType: ZRQGetRequestExtractEnum.extractItem
                });
              } else if (
                wsShareId !== undefined &&
                shareWSMemberId !== undefined
              ) {
                // Updating all pixels data in RQ cache.
                await updateRQCDataHandler<
                  PixelAccountPlatformType | undefined
                >({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.SWS_MAIN,
                    wsShareId
                  ],
                  data: _data,
                  id: _data?.id ?? '',
                  extractType: ZRQGetRequestExtractEnum.extractItem
                });
              }

              showSuccessNotification(MESSAGES.PIXEL_ACCOUNT.UPDATED);
            }
          }
        }
      }

      // Reset to default
      // SetDefaultPixelAccountFormState();

      // this will reset form
      if (resetForm !== undefined && formMode === FormMode.ADD) {
        resetForm();
      }

      // Close modal after action.
      dismissZIonModal();
    } catch (error) {
      reportCustomError(error);
    }

    // After Submit loading state end
    // setTimeout(() => {
    // void ionLoaderDismiss();
    // }, 3000);
  };
  // #endregion

  // JSX Code
  return (
    <ZCan
      shareWSId={wsShareId}
      checkMode={permissionCheckModeEnum.any}
      permissionType={
        wsShareId !== undefined
          ? permissionsTypeEnum.shareWSMemberPermissions
          : permissionsTypeEnum.loggedInUserPermissions
      }
      havePermissions={
        wsShareId !== undefined
          ? [
              shareWSPermissionEnum.create_sws_pixel,
              shareWSPermissionEnum.update_sws_pixel
            ]
          : [permissionsEnum.create_pixel, permissionsEnum.update_pixel]
      }>
      <Formik
        initialValues={{
          platform: pixelPlatform ?? PixelPlatformsEnum.facebook,
          title: pixelTitle ?? '',
          pixelId: pixelId ?? ''
        }}
        enableReinitialize={true}
        validate={values => {
          const errors: {
            platform?: string;
            title?: string;
            pixelId?: string;
          } = {};

          validateFields(['platform', 'title', 'pixelId'], values, errors, [
            VALIDATION_RULE.string,
            VALIDATION_RULE.string,
            VALIDATION_RULE.string
          ]);

          if (
            values?.platform?.trim?.length > 0 &&
            values?.pixelId?.trim?.length > 0
          ) {
            const errorMessage = validatePixelAccountID(
              values.platform,
              values.pixelId
            );
            if (errorMessage !== undefined) {
              errors.pixelId = errorMessage;
            }
          }

          return errors;
        }}
        onSubmit={(values: PixelAccountType, { resetForm }) => {
          const stringifyValue = zStringify({
            title: values.title,
            platform: values.platform,
            pixelId: values.pixelId
          });
          void handleFormSubmit(stringifyValue, resetForm);
        }}>
        {({
          errors,
          values,
          isValid,
          touched,
          handleChange,
          submitForm,
          handleSubmit,
          handleBlur
        }) => (
          <>
            {/**
             * Header of Modal will shown if the `showActionInModalHeader` is set to `true` in appSetting and hide if it is `false`
             * default: false
             *  */}
            {appSettings.appModalsSetting.actions.showActionInModalHeader && (
              <ZIonHeader>
                <ZIonRow className='ion-align-items-center'>
                  <ZIonCol>
                    <ZIonButton
                      color='primary'
                      className='ion-text-capitalize'
                      fill='outline'
                      testingselector={
                        CONSTANTS.testingSelectors.pixels.formModal.closeBtn
                      }
                      onClick={() => {
                        // Close the Modal
                        dismissZIonModal();
                        // Reset to default
                        // SetDefaultPixelAccountFormState();
                      }}>
                      Cancel
                    </ZIonButton>
                  </ZIonCol>

                  <ZIonCol className='ion-text-end'>
                    <ZIonButton
                      type='submit'
                      color={'primary'}
                      className='ion-text-capitalize'
                      fill='solid'
                      disabled={!isValid}
                      testingselector={
                        CONSTANTS.testingSelectors.pixels.formModal
                          .submitFormBtn
                      }
                      onClick={() => {
                        void submitForm();
                      }}>
                      {formMode === FormMode.ADD
                        ? 'Create'
                        : formMode === FormMode.EDIT
                        ? 'Update'
                        : ''}
                    </ZIonButton>
                  </ZIonCol>
                </ZIonRow>
              </ZIonHeader>
            )}

            <ZIonContent
              className={classNames({
                'ion-padding': isMdScale
              })}>
              <div className='flex flex-col ion-text-center ion-justify-content-center ion-padding-top ion-margin-top'>
                <div className='flex mx-auto mb-0 rounded-full w-11 h-11 ion-align-items-center ion-justify-content-enter'>
                  <ZIonImg
                    src={ProductFaviconSmall}
                    className='w-10 h-10 mx-auto'
                  />
                </div>

                <ZIonText
                  color='dark'
                  className='block mt-3 text-xl font-bold ion-text-center'>
                  {formMode === FormMode.ADD
                    ? 'Add a new Pixel ID'
                    : formMode === FormMode.EDIT
                    ? 'Edit Pixel ID'
                    : null}
                </ZIonText>
              </div>

              {/*  */}
              <Form
                onSubmit={handleSubmit}
                className={classNames({
                  'px-4': isMdScale,
                  'px-3': !isMdScale
                })}>
                {/* Pixel platform select */}
                <ZIonSelect
                  name='platform'
                  label='Select the platform*'
                  labelPlacement='stacked'
                  selectedText={convertToTitleCase(values.platform)}
                  onIonChange={handleChange}
                  fill='outline'
                  minHeight='2.3rem'
                  interface='popover'
                  errorText={
                    touched?.platform === true ? errors?.platform : undefined
                  }
                  testingselector={
                    CONSTANTS.testingSelectors.pixels.formModal.platformSelector
                  }
                  className={classNames({
                    'mt-5': true,
                    'ion-touched': touched?.platform === true,
                    'ion-invalid':
                      touched?.platform === true && errors?.platform,
                    'ion-valid':
                      touched?.platform === true &&
                      (errors.platform === undefined ||
                        errors?.platform === null)
                  })}>
                  {platformData.map(el => {
                    return (
                      <ZIonSelectOption
                        value={el.type}
                        key={el.id}>
                        {el.title}
                      </ZIonSelectOption>
                    );
                  })}
                </ZIonSelect>

                {/* Pixel Name Input */}
                <ZIonInput
                  label='Name your pixel*'
                  labelPlacement='stacked'
                  name='title'
                  value={values.title}
                  placeholder='Enter Pixel Name'
                  type='text'
                  minHeight='2.3rem'
                  onIonChange={handleChange}
                  onIonBlur={handleBlur}
                  errorText={touched.title === true ? errors.title : undefined}
                  testingselector={
                    CONSTANTS.testingSelectors.pixels.formModal.pixelNameInput
                  }
                  className={classNames({
                    'mt-6 mb-2': true,
                    'ion-touched': touched.title === true,
                    'ion-invalid': touched.title === true && errors.title,
                    'ion-valid':
                      touched.title === true &&
                      (errors.title === undefined || errors.title === null)
                  })}
                />

                {/* Pixel Id Input */}
                <ZIonInput
                  label='Pixel ID*'
                  labelPlacement='stacked'
                  name='pixelId'
                  placeholder='Enter Pixel Id'
                  type='text'
                  minHeight='2.3rem'
                  onIonChange={handleChange}
                  onIonBlur={handleBlur}
                  value={values.pixelId}
                  errorText={
                    touched?.pixelId === true ? errors.pixelId : undefined
                  }
                  testingselector={
                    CONSTANTS.testingSelectors.pixels.formModal.pixelIdInput
                  }
                  className={classNames({
                    'mt-0': true,
                    'ion-touched': touched?.pixelId === true,
                    'ion-invalid': touched?.pixelId === true && errors.pixelId,
                    'ion-valid':
                      touched?.pixelId === true &&
                      errors.pixelId === undefined &&
                      errors.pixelId === null
                  })}
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
                        CONSTANTS.testingSelectors.pixels.formModal.closeBtn
                      }
                      onClick={() => {
                        // Close the Modal
                        dismissZIonModal();
                        // Reset to default
                        // SetDefaultPixelAccountFormState();
                      }}>
                      Close
                    </ZIonButton>
                  </ZIonCol>

                  <ZIonCol className='ion-text-end'>
                    <ZIonButton
                      fill='solid'
                      size='default'
                      className='ion-text-capitalize'
                      disabled={!isValid}
                      type='submit'
                      testingselector={
                        CONSTANTS.testingSelectors.pixels.formModal
                          .submitFormBtn
                      }
                      onClick={() => {
                        void submitForm();
                      }}>
                      {formMode === FormMode.ADD
                        ? 'Create'
                        : formMode === FormMode.EDIT
                        ? 'Update'
                        : ''}
                    </ZIonButton>
                  </ZIonCol>
                </ZIonRow>
              </ZIonFooter>
            )}
          </>
        )}
      </Formik>
    </ZCan>
  );
};

export default ZaionsAddPixelAccount;
