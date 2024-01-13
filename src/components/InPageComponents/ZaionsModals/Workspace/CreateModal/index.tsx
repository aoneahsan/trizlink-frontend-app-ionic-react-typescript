/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { closeOutline } from 'ionicons/icons';
import { Formik } from 'formik';
import classNames from 'classnames';
import { AxiosError } from 'axios';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonBadge,
  ZIonButton,
  ZIonCol,
  ZIonContent,
  ZIonIcon,
  ZIonImg,
  ZIonInput,
  ZIonItem,
  ZIonLabel,
  ZIonList,
  ZIonNote,
  ZIonRadio,
  ZIonRadioGroup,
  ZIonRow,
  ZIonSkeletonText,
  ZIonText
} from '@/components/ZIonComponents';
import { ZTimezoneSelector } from '@/components/CustomComponents/ZTimezone';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import {
  useZGetRQCacheData,
  useZRQCreateRequest,
  useZRQGetRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import {
  extractInnerData,
  formatApiRequestErrorForFormikFormField,
  isZNonEmptyString,
  validateField,
  zStringify
} from '@/utils/helpers';
import { reportCustomError, ZCustomError } from '@/utils/customErrorType';
import {
  API_URL_ENUM,
  VALIDATION_RULE,
  extractInnerDataOptionsEnum
} from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import { showSuccessNotification } from '@/utils/notification';
import MESSAGES from '@/utils/messages';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { type workspaceInterface } from '@/types/AdminPanel/workspace';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { type ZGenericObject } from '@/types/zaionsAppSettings.type';
import { type FormikSetErrorsType } from '@/types/ZaionsFormik.type';

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
import { ProductFaviconSmall } from '@/assets/images';
import { errorCodes } from '@/utils/constants/apiConstants';
import ZReachedLimitModal from '@/components/InPageComponents/ZaionsModals/UpgradeModals/ReachedLimit';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import { planFeaturesEnum } from '@/types/AdminPanel/index.type';
import { useSetRecoilState } from 'recoil';
import { ZUserCurrentLimitsRStateAtom } from '@/ZaionsStore/UserAccount/index.recoil';
import { ZPlansEnum, type ZaionsPricingI } from '@/types/WhyZaions/PricingPage';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 *
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZAddNewWorkspaceModal: React.FC<{
  dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({ dismissZIonModal }) => {
  // Custom hooks
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { zNavigatePushRoute } = useZNavigate();

  // Create new workspace API.
  const { mutateAsync: createWorkspaceMutate } = useZRQCreateRequest({
    _url: API_URL_ENUM.workspace_create_list,
    _showAlertOnError: false
  });

  const { data: ZPlansData, isFetching: isZPlanDataFetching } =
    useZRQGetRequest<ZaionsPricingI[]>({
      _url: API_URL_ENUM.zPlans,
      _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.PLANS.MAIN],
      _authenticated: false,
      _checkPermissions: false
    });

  const { presentZIonModal: presentZReachedLimitModal } =
    useZIonModal(ZReachedLimitModal);

  const setZUserCurrentLimitsRState = useSetRecoilState(
    ZUserCurrentLimitsRStateAtom
  );

  // Formik submit handler
  const formikSubmitHandler = async (
    values: string,
    setErrors: FormikSetErrorsType
  ): Promise<void> => {
    try {
      if (values?.trim()?.length > 0) {
        // Making an api call creating new workspace.
        const _response = await createWorkspaceMutate(values);

        if (_response !== undefined && _response !== null) {
          // extracting data from _response.
          const _data = extractInnerData<workspaceInterface>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data?.id !== undefined && _data?.id !== null) {
            // getting all the workspace from RQ cache.
            const _oldWorkspaces =
              extractInnerData<workspaceInterface[]>(
                getRQCDataHandler<workspaceInterface[]>({
                  key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN]
                }) as workspaceInterface[],
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) ?? [];

            // Adding newly created workspace data.
            const updatedWorkspaces = [..._oldWorkspaces, _data];

            // Updating data in RQ cache.
            await updateRQCDataHandler<workspaceInterface[] | undefined>({
              key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN],
              data: updatedWorkspaces,
              id: '',
              extractType: ZRQGetRequestExtractEnum.extractItems,
              updateHoleData: true
            });

            setZUserCurrentLimitsRState(oldValues => ({
              ...oldValues,
              [planFeaturesEnum.workspace]: updatedWorkspaces?.length
            }));

            showSuccessNotification(MESSAGES.WORKSPACE.CREATED);

            // After updating cache dismissing modal.
            dismissZIonModal(_data.id, 'success');
          }
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const _apiErrorsCode = error.response?.status;
        if (_apiErrorsCode === errorCodes.reachedLimit) {
          presentZReachedLimitModal({
            _cssClass: 'reached-limit-modal-size'
          });

          dismissZIonModal();
        }

        const _apiErrors = (error.response?.data as { errors: ZGenericObject })
          ?.errors;
        const _errors = formatApiRequestErrorForFormikFormField(
          ['title', 'workspaceTimezone'],
          ['title', 'timezone'],
          _apiErrors
        );

        setErrors(_errors);
      } else if (error instanceof ZCustomError || error instanceof Error) {
        reportCustomError(error);
      }
    }
  };

  const formikInitialValues = {
    title: '',
    workspaceTimezone: CONSTANTS.DEFAULT_VALUES.TIMEZONE_DEFAULT,
    plan: ZPlansEnum?.core
  };

  return (
    <ZIonContent className='ion-padding'>
      {/* Close modal button */}
      <div className='ion-text-end'>
        <ZIonButton
          className='ion-no-padding ion-no-margin'
          fill='clear'
          color='dark'
          testingselector={
            CONSTANTS.testingSelectors.workspace.createModal.closeButton
          }
          onClick={() => {
            dismissZIonModal();
          }}>
          <ZIonIcon
            icon={closeOutline}
            className='w-7 h-7'
          />
        </ZIonButton>
      </div>

      {/*  */}
      <div className='flex flex-col ion-justify-content-center'>
        <div className='flex mx-auto mb-0 rounded-full w-11 h-11 ion-align-items-center ion-justify-content-enter'>
          <ZIonImg
            src={ProductFaviconSmall}
            className='w-10 h-10 mx-auto'
          />
        </div>

        <ZIonText
          color='dark'
          className='block mt-3 text-lg font-bold ion-text-center'>
          Create a new Workspace
        </ZIonText>

        <Formik
          initialValues={formikInitialValues}
          validate={values => {
            const errors = {};
            validateField('title', values, errors, VALIDATION_RULE.string);
            validateField('plan', values, errors, VALIDATION_RULE.string);
            return errors;
          }}
          onSubmit={(values, { setErrors }) => {
            const zStringifyData = zStringify({
              title: values.title,
              timezone: values.workspaceTimezone,
              plan: values.plan
            });
            void formikSubmitHandler(zStringifyData, setErrors);
          }}>
          {({
            values,
            errors,
            touched,
            isValid,
            handleChange,
            handleBlur,
            submitForm
          }) => {
            return (
              <ZIonRow className='pt-2 mt-4'>
                {/* Workspace name */}
                <ZIonCol size='12'>
                  <ZIonInput
                    name='title'
                    label='Workspace Name*'
                    minHeight='40px'
                    labelPlacement='stacked'
                    placeholder='Workspace Name'
                    onIonChange={handleChange}
                    onIonBlur={handleBlur}
                    value={values?.title}
                    errorText={
                      touched?.title === true ? errors?.title : undefined
                    }
                    testingselector={
                      CONSTANTS.testingSelectors.workspace.createModal.nameInput
                    }
                    className={classNames({
                      'ion-touched': touched?.title === true,
                      'ion-invalid': touched?.title === true && errors.title,
                      'ion-valid':
                        touched?.title === true &&
                        (errors.title === null || errors.title === undefined)
                    })}
                  />
                </ZIonCol>

                {/* Workspace timezone */}
                <ZIonCol size='12'>
                  <ZTimezoneSelector
                    name='workspaceTimezone'
                    className='mt-2'
                    label='Workspace timezone (Optional)'
                    labelPlacement='stacked'
                    placeholder='Workspace timezone'
                    value={values.workspaceTimezone}
                    onIonChange={handleChange}
                    onIonBlur={handleBlur}
                    testingselector={
                      CONSTANTS.testingSelectors.workspace.createModal
                        .timezoneInput
                    }
                  />
                </ZIonCol>

                {/* Select Plan */}
                <ZIonCol
                  size='12'
                  className='mt-3'>
                  <div className='flex w-full ion-align-items-center ion-justify-content-between'>
                    <ZIonText className='inline-block text-xl font-medium border-b-2 z-border-color-success-point-4'>
                      Select Plan*
                    </ZIonText>

                    <ZIonText
                      color='primary'
                      className='text-sm transition-all cursor-pointer hover:border-b'
                      testingselector={
                        CONSTANTS.testingSelectors.workspace.createModal
                          .seePlansDetailsBtn
                      }
                      onClick={() => {
                        dismissZIonModal();
                        zNavigatePushRoute(
                          ZaionsRoutes.AdminPanel.Setting.UserAccount
                            .AccountPlansSettings
                        );
                      }}>
                      See plans details
                    </ZIonText>
                  </div>

                  <div className='mt-2 overflow-hidden border rounded-md shadow-md zaions__tertiary_set'>
                    <ZIonList
                      lines='none'
                      color='danger'
                      className='z-bg-transparent'
                      testingselector={`${CONSTANTS.testingSelectors.workspace.createModal.planSelector}-list`}>
                      <ZIonRadioGroup
                        name='plan'
                        value={values?.plan}
                        testingselector={`${CONSTANTS.testingSelectors.workspace.createModal.planSelector}-radio-group`}
                        onIonChange={handleChange}
                        className={classNames({
                          'ion-touched': touched?.plan === true,
                          'ion-invalid': touched?.plan === true && errors.plan,
                          'ion-valid':
                            touched?.plan === true &&
                            (errors.plan === null || errors.plan === undefined)
                        })}>
                        {!isZPlanDataFetching &&
                          ZPlansData?.map((el, index) => {
                            return (
                              <ZIonItem
                                testingselector={`${CONSTANTS.testingSelectors.workspace.createModal.planSelector}-item-${el?.id}`}
                                testinglistselector={`${CONSTANTS.testingSelectors.workspace.createModal.planSelector}-item`}
                                testingidselector={`${el?.id}`}
                                className='overflow-hidden rounded-sm z-ion-bg-transparent'
                                key={index}>
                                <ZIonRadio
                                  value={el.name}
                                  testingselector={`${CONSTANTS.testingSelectors.workspace.createModal.planSelector}-radio-${el?.id}`}
                                  testinglistselector={`${CONSTANTS.testingSelectors.workspace.createModal.planSelector}-radio`}>
                                  <ZIonLabel
                                    testingselector={`${CONSTANTS.testingSelectors.workspace.createModal.planSelector}-label-${el?.id}`}
                                    testinglistselector={`${CONSTANTS.testingSelectors.workspace.createModal.planSelector}-label`}>
                                    <ZIonText
                                      className='flex w-full gap-2 text-lg font-semibold ion-align-items-center'
                                      color='dark'
                                      testingselector={`${CONSTANTS.testingSelectors.workspace.createModal.planSelector}-text-${el?.id}`}
                                      testinglistselector={`${CONSTANTS.testingSelectors.workspace.createModal.planSelector}-text`}>
                                      {el.displayName}
                                      {el.isMostPopular ? (
                                        <ZIonBadge
                                          className='px-2 text-sm h-max font-medium min-h-max max-h-max pt-[2px] ion-no-margin ion-no-padding'
                                          testingselector={`${CONSTANTS.testingSelectors.workspace.createModal.planSelector}-badge-${el?.id}`}
                                          testinglistselector={`${CONSTANTS.testingSelectors.workspace.createModal.planSelector}-badge`}>
                                          Most Popular
                                        </ZIonBadge>
                                      ) : null}
                                    </ZIonText>
                                    <ZIonText
                                      className='block w-full overflow-hidden text-sm text-ellipsis'
                                      testingselector={`${CONSTANTS.testingSelectors.workspace.createModal.planSelector}-description-${el?.id}`}
                                      testinglistselector={`${CONSTANTS.testingSelectors.workspace.createModal.planSelector}-description`}>
                                      {el.description}
                                    </ZIonText>
                                  </ZIonLabel>
                                </ZIonRadio>
                              </ZIonItem>
                            );
                          })}

                        {isZPlanDataFetching &&
                          [...Array(4)].map((el, index) => {
                            return (
                              <ZIonItem
                                className='w-full mt-3 overflow-hidden rounded-sm z-ion-bg-transparent'
                                key={index}>
                                <div className='flex w-full gap-2 ion-align-items-center'>
                                  <div className='w-[90%]'>
                                    <ZIonText
                                      className='flex w-full gap-2 text-lg font-semibold ion-align-items-center'
                                      color='dark'>
                                      <ZIonSkeletonText className='w-20 h-5' />
                                    </ZIonText>
                                    <ZIonText className='block w-full overflow-hidden text-sm text-ellipsis'>
                                      <ZIonSkeletonText className='w-full h-4' />
                                    </ZIonText>
                                  </div>

                                  <ZIonText
                                    className='block w-[10%] ion-text-end overflow-hidden text-sm text-ellipsis'
                                    slot='end'>
                                    <ZIonSkeletonText className='w-5 h-5 rounded-full ms-auto' />
                                  </ZIonText>
                                </div>
                              </ZIonItem>
                            );
                          })}
                      </ZIonRadioGroup>
                    </ZIonList>
                  </div>
                  {touched?.plan === true &&
                    isZNonEmptyString(errors?.plan) && (
                      <ZIonNote
                        color='danger'
                        className='text-xs font-thin ms-4'>
                        {errors?.plan}
                      </ZIonNote>
                    )}
                </ZIonCol>

                {/* create button */}
                <ZIonCol size='12'>
                  <div
                    className={classNames({
                      'w-full mt-4': true,
                      'cursor-not-allowed': !isValid
                    })}>
                    <ZIonButton
                      expand='block'
                      className='ion-no-margin'
                      onClick={() => {
                        void submitForm();
                      }}
                      disabled={!isValid}
                      testingselector={
                        CONSTANTS.testingSelectors.workspace.createModal
                          .createButton
                      }>
                      Create
                    </ZIonButton>
                  </div>
                </ZIonCol>
              </ZIonRow>
            );
          }}
        </Formik>
      </div>
    </ZIonContent>
  );
};

export default ZAddNewWorkspaceModal;
