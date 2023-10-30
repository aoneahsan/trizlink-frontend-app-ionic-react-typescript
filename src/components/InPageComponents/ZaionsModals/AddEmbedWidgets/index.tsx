// Core Imports
import React from 'react';

// Packages Import
import { IonRippleEffect } from '@ionic/react';
import { Form, Formik } from 'formik';
import { airplaneOutline, logOutOutline, timeOutline } from 'ionicons/icons';
import { useRecoilState, useRecoilValue } from 'recoil';
import classNames from 'classnames';

// Custom Imports
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonGrid,
  ZIonRouterLink,
  ZIonHeader,
  ZIonNote,
  ZIonContent,
  ZIonIcon,
  ZIonInput,
  ZIonFooter,
  ZIonImg
} from '@/components/ZIonComponents';

// Global Constants
import { validateField, validateFields, zStringify } from '@/utils/helpers';
import MESSAGES from '@/utils/messages';

// Images

// Recoil States
import { ZaionsAppSettingsRState } from '@/ZaionsStore/zaionsAppSettings.recoil';
import { EmbedWidgetsFormState } from '@/ZaionsStore/FormStates/embedWidgetsFormState.recoil';

// Types
import {
  EmbedWidgetsDisplayAtEnum,
  EmbedWidgetsPositionEnum
} from '@/types/AdminPanel/linksType';
import { resetFormType } from '@/types/ZaionsFormik.type';
import {
  useZRQCreateRequest,
  useZRQUpdateRequest
} from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM, VALIDATION_RULE } from '@/utils/enums';
import { reportCustomError } from '@/utils/customErrorType';
import CONSTANTS from '@/utils/constants';
import { ZIonButton } from '@/components/ZIonComponents';
import ZIonTitle from '@/components/ZIonComponents/ZIonTitle';
import { showSuccessNotification } from '@/utils/notification';
import { FormMode } from '@/types/AdminPanel/index.type';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';
import ZEditor from '@/components/CustomComponents/ZEditor';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { ProductFavicon } from '@/assets/images';

// Styles

const ZaionsEmbedWidgetsModal: React.FC<{
  dismissZIonModal: (data?: string, role?: string | undefined) => void;
  formMode?: FormMode;
}> = ({ dismissZIonModal, formMode = FormMode.ADD }) => {
  const appSettings = useRecoilValue(ZaionsAppSettingsRState);

  const [embedWidgetsFormState, setEmbedWidgetsFormState] = useRecoilState(
    EmbedWidgetsFormState
  );
  const { mutate: createEmbedWidgetAccount } = useZRQCreateRequest({
    _url: API_URL_ENUM.userEmbedWidget_create_list,
    _queriesKeysToInvalidate: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.EMBED_WIDGET.MAIN
    ]
  });
  const { mutate: updateEmbedWidgetAccount } = useZRQUpdateRequest({
    _url: API_URL_ENUM.userEmbedWidget_update_delete,
    _queriesKeysToInvalidate: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.EMBED_WIDGET.MAIN
    ]
  });

  /**
   * Handle Form Submission Function
   * add a new Embed Widget function
   *  */
  const SetDefaultEmbedWidgets = () => {
    // Reset to default
    setEmbedWidgetsFormState(oldVal => ({
      ...oldVal,
      formMode: FormMode.ADD,
      id: '',
      name: '',
      animation: false,
      closingOption: false,
      delay: '',
      displayAt: EmbedWidgetsDisplayAtEnum.Landing,
      HTMLCode: '',
      jsCode: '',
      position: EmbedWidgetsPositionEnum.BottomCenter
    }));
  };

  const handleFormSubmit = (values: string, resetForm?: resetFormType) => {
    try {
      // ADD API Request to add this Embed widget to user account in DB.
      if (embedWidgetsFormState.formMode === FormMode.ADD) {
        createEmbedWidgetAccount(values);
        showSuccessNotification(
          MESSAGES.GENERAL.EMBED_WIDGET.NEW_EMBED_WIDGET_CREATED_SUCCEED_MESSAGE
        );
      } else if (embedWidgetsFormState.formMode === FormMode.EDIT) {
        embedWidgetsFormState.id &&
          updateEmbedWidgetAccount({
            itemIds: [embedWidgetsFormState.id],
            urlDynamicParts: [':embeddedId'],
            requestData: values
          });
        showSuccessNotification(
          MESSAGES.GENERAL.EMBED_WIDGET.EMBED_WIDGET_UPDATED_SUCCEED_MESSAGE
        );
      }

      // Close modal after action.
      dismissZIonModal();

      // Reset to default
      SetDefaultEmbedWidgets();

      // this will reset form
      if (resetForm) {
        resetForm();
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  // JSX Code
  return (
    <Formik
      initialValues={{
        name: embedWidgetsFormState.name || '',
        canCodeJs: true,
        jsCode: embedWidgetsFormState.jsCode || '',
        canCodeHtml: true,
        HTMLCode: embedWidgetsFormState.HTMLCode || '',
        displayAt:
          embedWidgetsFormState.displayAt || EmbedWidgetsDisplayAtEnum.Landing,
        delay: embedWidgetsFormState.delay || '',
        position:
          embedWidgetsFormState.position ||
          EmbedWidgetsPositionEnum.BottomCenter,
        animation: embedWidgetsFormState.animation || false,
        closingOption: embedWidgetsFormState.closingOption || false
      }}
      enableReinitialize={true}
      validate={values => {
        const errors: {
          name?: string;
          canCodeJs?: boolean;
          delay?: string;
          canCodeHtml?: boolean;
          jsCode?: string;
          HTMLCode?: string;
        } = {};

        validateFields(['name', 'HTMLCode', 'jsCode'], values, errors, [
          VALIDATION_RULE.string,
          VALIDATION_RULE.string,
          VALIDATION_RULE.string
        ]);

        if (values.displayAt === EmbedWidgetsDisplayAtEnum.Delay) {
          validateField('delay', values, errors);
        }

        return errors;
      }}
      onSubmit={(values, { resetForm }) => {
        const stringifyValue = zStringify({
          name: values.name,
          canCodeJs: values.canCodeJs,
          canCodeHtml: values.canCodeHtml,
          jsCode: values.jsCode,
          HTMLCode: values.HTMLCode,
          displayAt: values.displayAt,
          delay: values.delay?.toString(),
          position: values.position,
          animation: values.animation,
          closingOption: values.closingOption
        });
        void handleFormSubmit(stringifyValue, resetForm);
      }}>
      {({
        values,
        errors,
        isValid,
        isSubmitting,
        touched,
        submitForm,
        handleChange,
        handleBlur,
        setFieldValue,
        setFieldTouched
      }) => {
        return (
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
                      onClick={() => {
                        // Close the Modal
                        dismissZIonModal();
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
                      onClick={() => {
                        void submitForm();
                      }}
                      color={'primary'}
                      className='ion-text-capitalize'
                      fill='solid'>
                      {embedWidgetsFormState.formMode === FormMode.ADD
                        ? 'Create'
                        : embedWidgetsFormState.formMode === FormMode.EDIT
                        ? 'Update'
                        : ''}
                    </ZIonButton>
                  </ZIonCol>
                </ZIonRow>
                {!isValid && (
                  <ZIonRow>
                    <ZIonCol className='ion-text-center'>
                      <ZIonNote color='danger'>
                        {MESSAGES.GENERAL.FORM.INVALID}
                      </ZIonNote>
                    </ZIonCol>
                  </ZIonRow>
                )}
                {/* </IonToolbar> */}
              </ZIonHeader>
            )}

            <ZIonContent className='ion-padding'>
              <div className='flex flex-col ion-text-center ion-justify-content-center ion-padding-top ion-margin-bottom'>
                {/* Product Favicon */}
                <div className='flex mx-auto mb-0 rounded-full w-11 h-11 ion-align-items-center ion-justify-content-enter'>
                  <ZIonImg
                    src={ProductFavicon}
                    className='w-10 h-10 mx-auto'
                  />
                </div>

                <ZIonText
                  color='dark'
                  className='block mt-3 text-xl font-bold ion-text-center'>
                  {formMode === FormMode.ADD
                    ? 'Add a new embed script'
                    : formMode === FormMode.EDIT
                    ? 'Edit embed script'
                    : null}
                </ZIonText>

                <ZIonText
                  color='dark'
                  className='block mt-1 text-md ion-text-center'>
                  Embed scripts can only be activated on your custom domains
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.HomeRoute}
                    className='ms-1'>
                    (help)
                  </ZIonRouterLink>
                </ZIonText>
              </div>

              {/*  */}
              <Form className='px-2 mt-6'>
                {/*-- Name Field --*/}
                <ZIonInput
                  type='text'
                  name='name'
                  minHeight='2.3rem'
                  label='Template name*'
                  labelPlacement='stacked'
                  onIonChange={handleChange}
                  onIonBlur={handleBlur}
                  value={values.name}
                  errorText={touched.name ? errors.name : undefined}
                  className={classNames({
                    'px-2': true,
                    'ion-touched': touched.name,
                    'ion-invalid': touched.name && errors.name,
                    'ion-valid': touched.name && !errors.name
                  })}
                />

                {/*-- Custom Javascript Field --*/}
                <div className='mt-4'>
                  <ZIonRow>
                    <ZIonCol className='px-0'>
                      <ZIonTitle
                        className='p-0 mb-2 text-lg'
                        color={
                          touched.jsCode && errors.jsCode ? 'danger' : undefined
                        }>
                        Custom Javascript
                      </ZIonTitle>
                    </ZIonCol>
                    <ZIonCol className='ion-text-end'>
                      <ZRCSwitch
                        checked={values.canCodeJs}
                        defaultChecked={values.canCodeJs}
                        disabled={!values.canCodeHtml && values.canCodeJs}
                        checkedChildren='on'
                        unCheckedChildren='off'
                        onChange={val => {
                          setFieldTouched('canCodeJs', true, false);
                          setFieldValue('canCodeJs', val, true);
                        }}
                      />
                    </ZIonCol>
                  </ZIonRow>
                  {values.canCodeJs ? (
                    <>
                      <ZEditor
                        name='jsCode'
                        width='100%'
                        height='200px'
                        placeholder='Write your custom javascript Code here...'
                        fontSize={18}
                        value={values.jsCode}
                        className='border'
                        onChange={value => {
                          setFieldTouched('jsCode', true, false);
                          setFieldValue('jsCode', value, true);
                        }}
                      />
                      {errors.jsCode && touched.jsCode && (
                        <ZIonNote
                          color='danger'
                          className='ion-margin-start'>
                          {errors.jsCode}
                        </ZIonNote>
                      )}
                    </>
                  ) : (
                    <ZIonText
                      color='secondary'
                      className='block text-sm tracking-wide ms-1'>
                      Unable the Custom JavaScript option to use it.
                    </ZIonText>
                  )}
                </div>

                {/*-- Custom HTML Field --*/}
                <div className='mt-4'>
                  <ZIonRow>
                    <ZIonCol>
                      <ZIonTitle
                        className='p-0 mb-2 text-lg'
                        color={
                          touched.HTMLCode && errors.HTMLCode
                            ? 'danger'
                            : undefined
                        }>
                        Custom HTML
                      </ZIonTitle>
                    </ZIonCol>
                    <ZIonCol className='ion-text-end'>
                      <ZRCSwitch
                        defaultChecked={values.canCodeHtml}
                        disabled={values.canCodeHtml && !values.canCodeJs}
                        checkedChildren='on'
                        unCheckedChildren='off'
                        onChange={val => {
                          setFieldTouched('canCodeHtml', true, false);
                          setFieldValue('canCodeHtml', val, true);
                        }}
                      />
                    </ZIonCol>
                  </ZIonRow>
                  {values.canCodeHtml ? (
                    <>
                      <ZEditor
                        name='HTMLCode'
                        width='100%'
                        height='200px'
                        placeholder='Write your custom HTML Code here...'
                        fontSize={18}
                        value={values.HTMLCode}
                        className='border'
                        onChange={value => {
                          setFieldTouched('HTMLCode', true, false);
                          setFieldValue('HTMLCode', value, true);
                        }}
                      />
                      {errors.HTMLCode && touched.HTMLCode && (
                        <ZIonNote
                          color='danger'
                          className='ion-margin-start'>
                          {errors.HTMLCode}
                        </ZIonNote>
                      )}
                    </>
                  ) : (
                    <ZIonText
                      color='secondary'
                      className='block text-sm tracking-wide ms-1'>
                      Unable the Custom HTML option to use it.
                    </ZIonText>
                  )}
                </div>

                {/*-- Time Display Field --*/}
                <div className='mt-5'>
                  <ZIonTitle className='block p-0 mb-2 text-lg'>
                    Display after
                  </ZIonTitle>
                  <ZIonRow className='mt-4'>
                    {/* Landing */}
                    <ZIonCol className='me-3 ion-text-center ion-no-padding'>
                      {/* <ZIonIcon
                        icon={airplaneOutline}
                        size='large'
                        className={classNames({
                          'rounded-full p-3 cursor-pointer': true,
                          zaions__primary_set:
                            values.displayAt ===
                            EmbedWidgetsDisplayAtEnum.Landing,
                          zaions__medium_set:
                            values.displayAt !==
                            EmbedWidgetsDisplayAtEnum.Landing
                        })}
                        onClick={() => {
                          setFieldTouched('displayAt', true);
                          setFieldValue(
                            'displayAt',
                            EmbedWidgetsDisplayAtEnum.Landing,
                            true
                          );
                        }}
                      />
                      <ZIonText
                        className='block'
                        color={
                          !!values.displayAt &&
                          values.displayAt === EmbedWidgetsDisplayAtEnum.Landing
                            ? 'primary'
                            : 'medium'
                        }>
                        Landing
                      </ZIonText> */}

                      <ZIonButton
                        expand='block'
                        className='ion-no-margin'
                        color={
                          !!values.displayAt &&
                          values.displayAt === EmbedWidgetsDisplayAtEnum.Landing
                            ? 'primary'
                            : 'medium'
                        }
                        onClick={() => {
                          setFieldTouched('displayAt', true);
                          setFieldValue(
                            'displayAt',
                            EmbedWidgetsDisplayAtEnum.Landing,
                            true
                          );
                        }}>
                        <ZIonIcon icon={airplaneOutline} />
                        <ZIonText className='ms-1'>Landing</ZIonText>
                      </ZIonButton>
                    </ZIonCol>

                    {/* Delay */}
                    <ZIonCol className='me-3 ion-text-center ion-no-padding'>
                      {/* <ZIonIcon
                        icon={timeOutline}
                        size='large'
                        className={`rounded-full p-3 cursor-pointer ${
                          !!values.displayAt &&
                          values.displayAt === EmbedWidgetsDisplayAtEnum.Delay
                            ? 'zaions__primary_set'
                            : 'zaions__medium_set'
                        }`}
                        onClick={() => {
                          setFieldTouched('displayAt', true);
                          setFieldValue(
                            'displayAt',
                            EmbedWidgetsDisplayAtEnum.Delay,
                            true
                          );
                        }}
                      />
                      <ZIonText
                        className='block'
                        color={
                          !!values.displayAt &&
                          values.displayAt === EmbedWidgetsDisplayAtEnum.Delay
                            ? 'primary'
                            : 'medium'
                        }>
                        Delay
                      </ZIonText> */}

                      <ZIonButton
                        expand='block'
                        className='ion-no-margin'
                        color={
                          !!values.displayAt &&
                          values.displayAt === EmbedWidgetsDisplayAtEnum.Delay
                            ? 'primary'
                            : 'medium'
                        }
                        onClick={() => {
                          setFieldTouched('displayAt', true);
                          setFieldValue(
                            'displayAt',
                            EmbedWidgetsDisplayAtEnum.Delay,
                            true
                          );
                        }}>
                        <ZIonIcon icon={timeOutline} />
                        <ZIonText className='ms-1'>Delay</ZIonText>
                      </ZIonButton>
                    </ZIonCol>

                    {/* Exit */}
                    <ZIonCol className='ion-text-center ion-no-padding'>
                      {/* <ZIonIcon
                        icon={logOutOutline}
                        size='large'
                        className={`cursor-pointer rounded-full p-3 ${
                          !!values.displayAt &&
                          values.displayAt === EmbedWidgetsDisplayAtEnum.Exit
                            ? 'zaions__primary_set'
                            : 'zaions__medium_set'
                        }`}
                        onClick={() => {
                          setFieldTouched('displayAt', true);
                          setFieldValue(
                            'displayAt',
                            EmbedWidgetsDisplayAtEnum.Exit,
                            true
                          );
                        }}
                      />
                      <ZIonText
                        className='block'
                        color={
                          !!values.displayAt &&
                          values.displayAt === EmbedWidgetsDisplayAtEnum.Exit
                            ? 'primary'
                            : 'medium'
                        }>
                        Exit
                      </ZIonText> */}

                      <ZIonButton
                        expand='block'
                        className='ion-no-margin'
                        color={
                          !!values.displayAt &&
                          values.displayAt === EmbedWidgetsDisplayAtEnum.Exit
                            ? 'primary'
                            : 'medium'
                        }
                        onClick={() => {
                          setFieldTouched('displayAt', true);
                          setFieldValue(
                            'displayAt',
                            EmbedWidgetsDisplayAtEnum.Exit,
                            true
                          );
                        }}>
                        <ZIonIcon icon={logOutOutline} />
                        <ZIonText className='ms-1'>Exit</ZIonText>
                      </ZIonButton>
                    </ZIonCol>
                  </ZIonRow>
                </div>

                {!!values.displayAt &&
                  values.displayAt === EmbedWidgetsDisplayAtEnum.Delay && (
                    <ZIonInput
                      name='delay'
                      type='number'
                      label='Second'
                      minHeight='2.3rem'
                      labelPlacement='stacked'
                      value={values.delay}
                      onIonChange={handleChange}
                      onIonBlur={handleBlur}
                      errorText={touched.delay ? errors.delay : undefined}
                      className={classNames({
                        'mt-4 w-full mx-auto': true,
                        'ion-touched': touched.delay,
                        'ion-invalid': touched.delay && errors.delay,
                        'ion-valid': touched.delay && !errors.delay
                      })}
                    />
                  )}

                {/*-- Position Field --*/}
                <div className='mt-5'>
                  <ZIonTitle className='block p-0 mb-2 text-lg'>
                    Position
                  </ZIonTitle>

                  {/*  */}
                  <ZIonGrid className='ion-no-padding'>
                    <ZIonRow>
                      <ZIonCol sizeXl='7'>
                        <ZIonRow className='gap-2 mt-1'>
                          {/* Position Top Start */}
                          <ZIonCol
                            size='3.5'
                            color='medium'
                            className={classNames({
                              'ion-activatable ripple-parent cursor-pointer h-[100px]':
                                true,
                              zaions__primary_bg_opacity_point_6:
                                values.position ===
                                EmbedWidgetsPositionEnum.TopStart,
                              zaions__medium_set:
                                values.position !==
                                EmbedWidgetsPositionEnum.TopStart
                            })}
                            onClick={() => {
                              setFieldTouched('position', true);
                              setFieldValue(
                                'position',
                                EmbedWidgetsPositionEnum.TopStart,
                                true
                              );
                            }}>
                            <IonRippleEffect />
                            <div
                              className={classNames({
                                'w-[20%] h-[40%] rounded': true,
                                zaions__light_bg:
                                  values.position ===
                                  EmbedWidgetsPositionEnum.TopStart,
                                zaions__medium_set:
                                  values.position !==
                                  EmbedWidgetsPositionEnum.TopStart
                              })}></div>
                          </ZIonCol>

                          {/* Position Top Center */}
                          <ZIonCol
                            size='3.5'
                            className={classNames({
                              'ion-activatable ripple-parent cursor-pointer h-[100px]':
                                true,
                              zaions__primary_bg_opacity_point_6:
                                values.position ===
                                EmbedWidgetsPositionEnum.TopCenter,
                              zaions__medium_set:
                                values.position !==
                                EmbedWidgetsPositionEnum.TopCenter
                            })}
                            onClick={() => {
                              setFieldTouched('position', true);
                              setFieldValue(
                                'position',
                                EmbedWidgetsPositionEnum.TopCenter,
                                true
                              );
                            }}>
                            <IonRippleEffect></IonRippleEffect>
                            <div
                              className={classNames({
                                'w-[20%] h-[40%] mx-auto rounded': true,
                                zaions__light_bg:
                                  values.position ===
                                  EmbedWidgetsPositionEnum.TopCenter,
                                zaions__medium_set:
                                  values.position !==
                                  EmbedWidgetsPositionEnum.TopCenter
                              })}></div>
                          </ZIonCol>

                          {/* Position Top End */}
                          <ZIonCol
                            size='3.5'
                            className={classNames({
                              'ion-activatable ripple-parent cursor-pointer h-[100px]':
                                true,
                              zaions__primary_bg_opacity_point_6:
                                values.position ===
                                EmbedWidgetsPositionEnum.TopEnd,
                              zaions__medium_set:
                                values.position !==
                                EmbedWidgetsPositionEnum.TopEnd
                            })}
                            onClick={() => {
                              setFieldTouched('position', true);
                              setFieldValue(
                                'position',
                                EmbedWidgetsPositionEnum.TopEnd,
                                true
                              );
                            }}>
                            <IonRippleEffect></IonRippleEffect>
                            <div
                              className={classNames({
                                'w-[20%] h-[40%] ms-auto rounded': true,
                                zaions__light_bg:
                                  values.position ===
                                  EmbedWidgetsPositionEnum.TopEnd,
                                zaions__medium_set:
                                  values.position !==
                                  EmbedWidgetsPositionEnum.TopEnd
                              })}></div>
                          </ZIonCol>

                          {/* Position Center Start */}
                          <ZIonCol
                            size='3.5'
                            className={classNames({
                              'ion-activatable ripple-parent flex ion-align-items-center cursor-pointer h-[100px]':
                                true,
                              zaions__primary_bg_opacity_point_6:
                                values.position ===
                                EmbedWidgetsPositionEnum.CenterStart,
                              zaions__medium_set:
                                values.position !==
                                EmbedWidgetsPositionEnum.CenterStart
                            })}
                            onClick={() => {
                              setFieldTouched('position', true);
                              setFieldValue(
                                'position',
                                EmbedWidgetsPositionEnum.CenterStart,
                                true
                              );
                            }}>
                            <IonRippleEffect></IonRippleEffect>
                            <div
                              className={classNames({
                                'w-[20%] h-[40%] rounded': true,
                                zaions__light_bg:
                                  values.position ===
                                  EmbedWidgetsPositionEnum.CenterStart,
                                zaions__medium_set:
                                  values.position !==
                                  EmbedWidgetsPositionEnum.CenterStart
                              })}></div>
                          </ZIonCol>

                          {/* Position Center Center */}
                          <ZIonCol
                            size='3.5'
                            className={classNames({
                              'ion-activatable ripple-parent flex ion-align-items-center ion-justify-content-center cursor-pointer h-[100px]':
                                true,
                              zaions__primary_bg_opacity_point_6:
                                values.position ===
                                EmbedWidgetsPositionEnum.CenterCenter,
                              zaions__medium_set:
                                values.position !==
                                EmbedWidgetsPositionEnum.CenterCenter
                            })}
                            onClick={() => {
                              setFieldTouched('position', true);
                              setFieldValue(
                                'position',
                                EmbedWidgetsPositionEnum.CenterCenter,
                                true
                              );
                            }}>
                            <IonRippleEffect></IonRippleEffect>
                            <div
                              className={classNames({
                                'w-[20%] h-[40%] rounded': true,
                                zaions__light_bg:
                                  values.position ===
                                  EmbedWidgetsPositionEnum.CenterCenter,
                                zaions__medium_set:
                                  values.position !==
                                  EmbedWidgetsPositionEnum.CenterCenter
                              })}></div>
                          </ZIonCol>

                          {/* position Center End */}
                          <ZIonCol
                            size='3.5'
                            className={classNames({
                              'ion-activatable ripple-parent flex ion-align-items-center ion-justify-content-end cursor-pointer h-[100px]':
                                true,
                              zaions__primary_bg_opacity_point_6:
                                values.position ===
                                EmbedWidgetsPositionEnum.CenterEnd,
                              zaions__medium_set:
                                values.position !==
                                EmbedWidgetsPositionEnum.CenterEnd
                            })}
                            onClick={() => {
                              setFieldTouched('position', true);
                              setFieldValue(
                                'position',
                                EmbedWidgetsPositionEnum.CenterEnd,
                                true
                              );
                            }}>
                            <IonRippleEffect></IonRippleEffect>
                            <div
                              className={classNames({
                                'w-[20%] h-[40%] rounded': true,
                                zaions__light_bg:
                                  values.position ===
                                  EmbedWidgetsPositionEnum.CenterEnd,
                                zaions__medium_set:
                                  values.position !==
                                  EmbedWidgetsPositionEnum.CenterEnd
                              })}></div>
                          </ZIonCol>

                          {/* position Bottom Start */}
                          <ZIonCol
                            size='3.5'
                            className={classNames({
                              'ion-activatable ripple-parent flex ion-align-items-end ion-justify-content-start cursor-pointer h-[100px]':
                                true,
                              zaions__primary_bg_opacity_point_6:
                                values.position ===
                                EmbedWidgetsPositionEnum.BottomStart,
                              zaions__medium_set:
                                values.position !==
                                EmbedWidgetsPositionEnum.BottomStart
                            })}
                            onClick={() => {
                              setFieldTouched('position', true);
                              setFieldValue(
                                'position',
                                EmbedWidgetsPositionEnum.BottomStart,
                                true
                              );
                            }}>
                            <IonRippleEffect></IonRippleEffect>
                            <div
                              className={classNames({
                                'w-[20%] h-[40%] rounded': true,
                                zaions__light_bg:
                                  values.position ===
                                  EmbedWidgetsPositionEnum.BottomStart,
                                zaions__medium_set:
                                  values.position !==
                                  EmbedWidgetsPositionEnum.BottomStart
                              })}></div>
                          </ZIonCol>

                          {/* Position Bottom Center */}
                          <ZIonCol
                            size='3.5'
                            className={classNames({
                              'ion-activatable ripple-parent flex ion-align-items-end ion-justify-content-center cursor-pointer h-[100px]':
                                true,
                              zaions__primary_bg_opacity_point_6:
                                values.position ===
                                EmbedWidgetsPositionEnum.BottomCenter,
                              zaions__medium_set:
                                values.position !==
                                EmbedWidgetsPositionEnum.BottomCenter
                            })}
                            onClick={() => {
                              setFieldTouched('position', true);
                              setFieldValue(
                                'position',
                                EmbedWidgetsPositionEnum.BottomCenter,
                                true
                              );
                            }}>
                            <IonRippleEffect></IonRippleEffect>
                            <div
                              className={classNames({
                                'w-[20%] h-[40%] rounded': true,
                                zaions__light_bg:
                                  values.position ===
                                  EmbedWidgetsPositionEnum.BottomCenter,
                                zaions__medium_set:
                                  values.position !==
                                  EmbedWidgetsPositionEnum.BottomCenter
                              })}></div>
                          </ZIonCol>

                          {/* Position Bottom End */}
                          <ZIonCol
                            size='3.5'
                            className={classNames({
                              'ion-activatable ripple-parent flex ion-align-items-end ion-justify-content-end cursor-pointer h-[100px]':
                                true,
                              zaions__primary_bg_opacity_point_6:
                                values.position ===
                                EmbedWidgetsPositionEnum.BottomEnd,
                              zaions__medium_set:
                                values.position !==
                                EmbedWidgetsPositionEnum.BottomEnd
                            })}
                            onClick={() => {
                              setFieldTouched('position', true);
                              setFieldValue(
                                'position',
                                EmbedWidgetsPositionEnum.BottomEnd,
                                true
                              );
                            }}>
                            <IonRippleEffect></IonRippleEffect>
                            <div
                              className={classNames({
                                'w-[20%] h-[40%] rounded': true,
                                zaions__light_bg:
                                  values.position ===
                                  EmbedWidgetsPositionEnum.BottomEnd,
                                zaions__medium_set:
                                  values.position !==
                                  EmbedWidgetsPositionEnum.BottomEnd
                              })}></div>
                          </ZIonCol>
                        </ZIonRow>
                      </ZIonCol>
                      <ZIonCol className='flex flex-col ion-text-center ion-align-items-center ion-justify-content-center'>
                        {/*-- Animation Field --*/}
                        <div className='mt-5'>
                          <ZIonTitle className='block p-0 mb-2 text-lg'>
                            🎈 Animation
                          </ZIonTitle>
                          <div className='mt-3'>
                            <ZRCSwitch
                              onChange={val => {
                                setFieldTouched('animation', true, false);
                                setFieldValue('animation', val, true);
                              }}
                              defaultChecked={values.animation}
                              checkedChildren='on'
                              unCheckedChildren='off'
                            />

                            {/* <RBFormCheck isV /> */}
                          </div>
                        </div>

                        {/*-- Animation Field --*/}
                        <div className='mt-5'>
                          <ZIonTitle className='block p-0 mb-2 text-lg'>
                            ❌ Closing option
                          </ZIonTitle>
                          <div className='mt-3'>
                            <ZRCSwitch
                              onChange={val => {
                                setFieldTouched('closingOption', true, false);
                                setFieldValue('closingOption', val, true);
                              }}
                              defaultChecked={values.closingOption}
                              checkedChildren='on'
                              unCheckedChildren='off'
                            />
                          </div>
                        </div>
                      </ZIonCol>
                    </ZIonRow>
                  </ZIonGrid>
                </div>
              </Form>
            </ZIonContent>

            {/**
             * Footer of Modal will shown if the `showActionInModalFooter` is set to `true` in      appSetting, and hide if it is `false`
             * default: true
             *  */}
            {appSettings.appModalsSetting.actions.showActionInModalFooter && (
              <ZIonFooter>
                <ZIonRow className='mx-3 mt-2 ion-justify-content-between ion-align-items-center'>
                  <ZIonCol>
                    <ZIonButton
                      fill='outline'
                      size='default'
                      className='ion-text-capitalize'
                      onClick={() => {
                        // Close The Modal
                        dismissZIonModal();
                      }}>
                      Close
                    </ZIonButton>
                  </ZIonCol>

                  <ZIonCol className='ion-text-end'>
                    <ZIonButton
                      id='submit-button-info'
                      fill='solid'
                      size='default'
                      className='ion-text-capitalize'
                      type='submit'
                      disabled={isSubmitting || !isValid}
                      onClick={() => void submitForm()}>
                      {embedWidgetsFormState.formMode === FormMode.ADD
                        ? 'Create'
                        : embedWidgetsFormState.formMode === FormMode.EDIT
                        ? 'Update'
                        : ''}
                    </ZIonButton>
                  </ZIonCol>
                </ZIonRow>
              </ZIonFooter>
            )}
          </>
        );
      }}
    </Formik>
  );
};
export default ZaionsEmbedWidgetsModal;
