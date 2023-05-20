// Core Imports
import React from 'react';
// Packages Import
import { IonItemDivider, IonRippleEffect } from '@ionic/react';
import { Form, Formik } from 'formik';
import {
	airplaneOutline,
	logOutOutline,
	timeOutline,
	toggleOutline,
} from 'ionicons/icons';
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
	ZIonItem,
	ZIonInput,
	ZIonFooter,
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
	EmbedWidgetsPositionEnum,
} from '@/types/AdminPanel/linksType';
import { resetFormType } from '@/types/ZaionsFormik.type';
import {
	useZRQCreateRequest,
	useZRQUpdateRequest,
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
import ZIonInputField from '@/components/CustomComponents/FormFields/ZIonInputField';

// Styles

const ZaionsEmbedWidgetsModal: React.FC<{
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({ dismissZIonModal }) => {
	const appSettings = useRecoilValue(ZaionsAppSettingsRState);

	const [embedWidgetsFormState, setEmbedWidgetsFormState] = useRecoilState(
		EmbedWidgetsFormState
	);
	const { mutate: createEmbedWidgetAccount } = useZRQCreateRequest({
		_url: API_URL_ENUM.userEmbedWidget_create_list,
		_queriesKeysToInvalidate: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.EMBED_WIDGET.MAIN,
		],
	});
	const { mutate: updateEmbedWidgetAccount } = useZRQUpdateRequest({
		_url: API_URL_ENUM.userEmbedWidget_update_delete,
		_queriesKeysToInvalidate: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.EMBED_WIDGET.MAIN,
		],
	});

	/**
	 * Handle Form Submission Function
	 * add a new Embed Widget function
	 *  */

	const SetDefaultEmbedWidgets = () => {
		// Reset to default
		setEmbedWidgetsFormState((oldVal) => ({
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
			position: EmbedWidgetsPositionEnum.BottomCenter,
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
						requestData: values,
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
				closingOption: embedWidgetsFormState.closingOption || false,
			}}
			enableReinitialize={true}
			validate={(values) => {
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
					VALIDATION_RULE.string,
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
					closingOption: values.closingOption,
				});
				void handleFormSubmit(stringifyValue, resetForm);
			}}
		>
			{({
				submitForm,
				handleChange,
				values,
				errors,
				handleBlur,
				touched,
				setFieldValue,
				setFieldTouched,
				isValid,
				isSubmitting,
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
											fill='outline'
										>
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
											fill='solid'
										>
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
							<div className='flex ion-text-center ion-justify-content-center flex-col ion-padding-top ion-margin-top ion-margin-bottom'>
								<ZIonText className='' color={'primary'}>
									<h1
										className={`mb-0 ion-padding-top bg-primary zaions__modal_icon`}
									>
										<ZIonIcon
											icon={toggleOutline}
											className='mx-auto'
											color='light'
										></ZIonIcon>
									</h1>
								</ZIonText>
								<br />
								<ZIonText color={'dark'} className='mb-2'>
									<h4 className='font-bold'>Add a new embed script ⚡</h4>
								</ZIonText>
								<ZIonText color={'dark'}>
									<h6 className='font-bold'>
										Embed scripts can only be activated on your custom domains{' '}
										<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
											(help)
										</ZIonRouterLink>
									</h6>
								</ZIonText>
							</div>
							<Form className='px-2'>
								{/*-- Name Field --*/}
								<ZIonInputField
									inputFieldProps={{
										className: classNames({
											'px-2 pt-3': true,
											'ion-touched ion-invalid': touched.name && errors.name,
											'ion-touched ion-valid': touched.name && !errors.name,
										}),
										label: 'Template name*',
										labelPlacement: 'floating',
										name: 'name',
										onIonChange: handleChange,
										onIonBlur: handleBlur,
										value: values.name,
										errorText: errors.name,
										color: 'dark',
										type: 'text',
									}}
								/>

								{/*-- Custom Javascript Field --*/}
								<div className='mt-4 pt-2'>
									<ZIonRow>
										<ZIonCol>
											<ZIonTitle
												className='p-0 mb-2'
												color={
													touched.jsCode && errors.jsCode ? 'danger' : undefined
												}
											>
												<h5>⚡ Custom Javascript</h5>
											</ZIonTitle>
										</ZIonCol>
										<ZIonCol className='ion-text-end'>
											<ZRCSwitch
												onChange={(val) => {
													setFieldTouched('canCodeJs', true, false);
													setFieldValue('canCodeJs', val, true);
												}}
												checked={values.canCodeJs}
												defaultChecked={values.canCodeJs}
												disabled={!values.canCodeHtml && values.canCodeJs}
												checkedChildren='on'
												unCheckedChildren='off'
											/>
										</ZIonCol>
									</ZIonRow>
									{values.canCodeJs ? (
										<>
											<ZIonItem
												className={classNames({
													'ion-touched ion-invalid':
														touched.jsCode && errors.jsCode,
													'ion-touched ion-valid':
														touched.jsCode && !errors.jsCode,
												})}
											>
												<ZEditor
													name='jsCode'
													onChange={(value) => {
														setFieldTouched('jsCode', true, false);
														setFieldValue('jsCode', value, true);
													}}
													width={'100%'}
													height={'270px'}
													placeholder='Write your custom javascript Code here...'
													fontSize={18}
													value={values.jsCode}
												/>
												<br />
											</ZIonItem>
											{errors.jsCode && touched.jsCode && (
												<ZIonNote color='danger' className='ion-margin-start'>
													{errors.jsCode}
												</ZIonNote>
											)}
										</>
									) : (
										<ZIonText color={'secondary'} className='ms-3'>
											Unable the Custom JavaScript option to use it.
										</ZIonText>
									)}
								</div>

								{/*-- Custom HTML Field --*/}
								<div className='mt-5'>
									<ZIonRow>
										<ZIonCol>
											<ZIonTitle
												className='p-0 mb-2'
												color={
													touched.HTMLCode && errors.HTMLCode
														? 'danger'
														: undefined
												}
											>
												<h5>⚡ Custom HTML</h5>
											</ZIonTitle>
										</ZIonCol>
										<ZIonCol className='ion-text-end'>
											<ZRCSwitch
												onChange={(val) => {
													setFieldTouched('canCodeHtml', true, false);
													setFieldValue('canCodeHtml', val, true);
												}}
												defaultChecked={values.canCodeHtml}
												disabled={values.canCodeHtml && !values.canCodeJs}
												checkedChildren='on'
												unCheckedChildren='off'
											/>
										</ZIonCol>
									</ZIonRow>
									{values.canCodeHtml ? (
										<>
											<ZIonItem
												className={classNames({
													'ion-touched ion-invalid':
														touched.HTMLCode && errors.HTMLCode,
													'ion-touched ion-valid':
														touched.HTMLCode && !!errors.HTMLCode,
												})}
											>
												<ZEditor
													name='HTMLCode'
													onChange={(value) => {
														setFieldTouched('HTMLCode', true, false);
														setFieldValue('HTMLCode', value, true);
													}}
													width={'100%'}
													height={'270px'}
													placeholder='Write your custom HTML Code here...'
													fontSize={18}
													value={values.HTMLCode}
												/>
											</ZIonItem>
											{errors.HTMLCode && touched.HTMLCode && (
												<ZIonNote color='danger' className='ion-margin-start'>
													{errors.HTMLCode}
												</ZIonNote>
											)}
										</>
									) : (
										<ZIonText color={'secondary'} className='ms-3'>
											Unable the Custom HTML option to use it.
										</ZIonText>
									)}
								</div>
								<IonItemDivider className='mt-3' />

								{/*-- Time Display Field --*/}
								<div className='mt-5'>
									<ZIonTitle className='p-0 mb-2'>
										<h5>⏱ Display after</h5>
									</ZIonTitle>
									<ZIonRow className='ion-justify-content-between mt-3'>
										{/* Landing */}
										<ZIonCol className='me-3 ion-text-center'>
											<ZIonIcon
												icon={airplaneOutline}
												size='large'
												className={`rounded-full p-3 zaions__cursor_pointer ${
													!!values.displayAt &&
													values.displayAt === EmbedWidgetsDisplayAtEnum.Landing
														? 'zaions__primary_set'
														: 'zaions__medium_set'
												}`}
												onClick={() => {
													setFieldTouched('displayAt', true);
													setFieldValue(
														'displayAt',
														EmbedWidgetsDisplayAtEnum.Landing,
														true
													);
												}}
											></ZIonIcon>
											<ZIonText
												className='block'
												color={
													!!values.displayAt &&
													values.displayAt === EmbedWidgetsDisplayAtEnum.Landing
														? 'primary'
														: 'medium'
												}
											>
												Landing
											</ZIonText>
										</ZIonCol>

										{/* Delay */}
										<ZIonCol className='me-3 ion-text-center'>
											<ZIonIcon
												icon={timeOutline}
												size='large'
												className={`rounded-full p-3 zaions__cursor_pointer ${
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
												}
											>
												Delay
											</ZIonText>
										</ZIonCol>

										{/* Exit */}
										<ZIonCol className='me-3 ion-text-center'>
											<ZIonIcon
												icon={logOutOutline}
												size='large'
												className={`zaions__cursor_pointer rounded-full p-3 ${
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
												}
											>
												Exit
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</div>

								{!!values.displayAt &&
									values.displayAt === EmbedWidgetsDisplayAtEnum.Delay && (
										<ZIonInputField
											inputFieldProps={{
												className: classNames({
													'mt-4 zaions__w40 mx-auto': true,
													'ion-touched ion-invalid':
														touched.delay && errors.delay,
													'ion-touched ion-valid':
														touched.delay && !errors.delay,
												}),
												label: 'Second',
												labelPlacement: 'floating',
												name: 'delay',
												type: 'number',
												onIonChange: handleChange,
												onIonBlur: handleBlur,
												value: values.delay,
												errorText: errors.delay,
												color: 'dark',
											}}
										/>
									)}
								<IonItemDivider className='mt-3' />

								{/*-- Position Field --*/}
								<div className='mt-5'>
									<ZIonTitle className='p-0 mb-2'>
										<h5>💻 Position</h5>
									</ZIonTitle>
									<ZIonGrid>
										<ZIonRow>
											<ZIonCol sizeXl='7'>
												<ZIonRow className='mt-3 gap-2'>
													{/* Position Top Start */}
													<ZIonCol
														size='3.5'
														color={'medium'}
														className={`ion-activatable ripple-parent zaions__cursor_pointer zaions__h100px ${
															!!values.position &&
															values.position ===
																EmbedWidgetsPositionEnum.TopStart
																? 'zaions__primary_set'
																: 'zaions__medium_set'
														}`}
														onClick={() => {
															setFieldTouched('position', true);
															setFieldValue(
																'position',
																EmbedWidgetsPositionEnum.TopStart,
																true
															);
														}}
													>
														<IonRippleEffect />
														<div
															className={`zaions__w20 zaions__h40 rounded ${
																!!values.position &&
																values.position ===
																	EmbedWidgetsPositionEnum.TopStart
																	? 'zaions__bg_white'
																	: 'zaions__medium_set'
															}`}
														></div>
													</ZIonCol>

													{/* Position Top Center */}
													<ZIonCol
														size='3.5'
														className={`ion-activatable ripple-parent zaions__cursor_pointer zaions__h100px ${
															!!values.position &&
															values.position ===
																EmbedWidgetsPositionEnum.TopCenter
																? 'zaions__primary_set'
																: 'zaions__medium_set'
														}`}
														onClick={() => {
															setFieldTouched('position', true);
															setFieldValue(
																'position',
																EmbedWidgetsPositionEnum.TopCenter,
																true
															);
														}}
													>
														<IonRippleEffect></IonRippleEffect>
														<div
															className={`zaions__w20 zaions__h40 mx-auto rounded ${
																!!values.position &&
																values.position ===
																	EmbedWidgetsPositionEnum.TopCenter
																	? 'zaions__bg_white'
																	: 'zaions__medium_set'
															}`}
														></div>
													</ZIonCol>

													{/* Position Top End */}
													<ZIonCol
														size='3.5'
														className={`ion-activatable ripple-parent zaions__cursor_pointer zaions__h100px ${
															!!values.position &&
															values.position ===
																EmbedWidgetsPositionEnum.TopEnd
																? 'zaions__primary_set'
																: 'zaions__medium_set'
														}`}
														onClick={() => {
															setFieldTouched('position', true);
															setFieldValue(
																'position',
																EmbedWidgetsPositionEnum.TopEnd,
																true
															);
														}}
													>
														<IonRippleEffect></IonRippleEffect>
														<div
															className={`zaions__w20 zaions__h40 rounded ms-auto ${
																!!values.position &&
																values.position ===
																	EmbedWidgetsPositionEnum.TopEnd
																	? 'zaions__bg_white'
																	: 'zaions__medium_set'
															}`}
														></div>
													</ZIonCol>

													{/* Position Center Start */}
													<ZIonCol
														size='3.5'
														className={`ion-activatable ripple-parent zaions__cursor_pointer flex ion-align-items-center zaions__h100px ${
															!!values.position &&
															values.position ===
																EmbedWidgetsPositionEnum.CenterStart
																? 'zaions__primary_set'
																: 'zaions__medium_set'
														}`}
														onClick={() => {
															setFieldTouched('position', true);
															setFieldValue(
																'position',
																EmbedWidgetsPositionEnum.CenterStart,
																true
															);
														}}
													>
														<IonRippleEffect></IonRippleEffect>
														<div
															className={`zaions__w20 zaions__h40 rounded ${
																!!values.position &&
																values.position ===
																	EmbedWidgetsPositionEnum.CenterStart
																	? 'zaions__bg_white'
																	: 'zaions__medium_set'
															}`}
														></div>
													</ZIonCol>

													{/* Position Center Center */}
													<ZIonCol
														size='3.5'
														className={`ion-activatable ripple-parent zaions__cursor_pointer flex ion-align-items-center ion-justify-content-center zaions__h100px ${
															!!values.position &&
															values.position ===
																EmbedWidgetsPositionEnum.CenterCenter
																? 'zaions__primary_set'
																: 'zaions__medium_set'
														}`}
														onClick={() => {
															setFieldTouched('position', true);
															setFieldValue(
																'position',
																EmbedWidgetsPositionEnum.CenterCenter,
																true
															);
														}}
													>
														<IonRippleEffect></IonRippleEffect>
														<div
															className={`zaions__w20 zaions__h40 rounded ${
																!!values.position &&
																values.position ===
																	EmbedWidgetsPositionEnum.CenterCenter
																	? 'zaions__bg_white'
																	: 'zaions__medium_set'
															}`}
														></div>
													</ZIonCol>

													{/* position Center End */}
													<ZIonCol
														size='3.5'
														className={`ion-activatable ripple-parent zaions__cursor_pointer flex ion-align-items-center ion-justify-content-end zaions__h100px ${
															!!values.position &&
															values.position ===
																EmbedWidgetsPositionEnum.CenterEnd
																? 'zaions__primary_set'
																: 'zaions__medium_set'
														}`}
														onClick={() => {
															setFieldTouched('position', true);
															setFieldValue(
																'position',
																EmbedWidgetsPositionEnum.CenterEnd,
																true
															);
														}}
													>
														<IonRippleEffect></IonRippleEffect>
														<div
															className={`zaions__w20 zaions__h40 rounded ${
																!!values.position &&
																values.position ===
																	EmbedWidgetsPositionEnum.CenterEnd
																	? 'zaions__bg_white'
																	: 'zaions__medium_set'
															}`}
														></div>
													</ZIonCol>

													{/* position Bottom Start */}
													<ZIonCol
														size='3.5'
														className={`ion-activatable ripple-parent zaions__cursor_pointer flex ion-align-items-end zaions__h100px ${
															!!values.position &&
															values.position ===
																EmbedWidgetsPositionEnum.BottomStart
																? 'zaions__primary_set'
																: 'zaions__medium_set'
														}`}
														onClick={() => {
															setFieldTouched('position', true);
															setFieldValue(
																'position',
																EmbedWidgetsPositionEnum.BottomStart,
																true
															);
														}}
													>
														<IonRippleEffect></IonRippleEffect>
														<div
															className={`zaions__w20 zaions__h40 rounded ${
																!!values.position &&
																values.position ===
																	EmbedWidgetsPositionEnum.BottomStart
																	? 'zaions__bg_white'
																	: 'zaions__medium_set'
															}`}
														></div>
													</ZIonCol>

													{/* Position Bottom Center */}
													<ZIonCol
														size='3.5'
														className={`ion-activatable ripple-parent zaions__cursor_pointer flex ion-align-items-end ion-justify-content-center zaions__h100px ${
															!!values.position &&
															values.position ===
																EmbedWidgetsPositionEnum.BottomCenter
																? 'zaions__primary_set'
																: 'zaions__medium_set'
														}`}
														onClick={() => {
															setFieldTouched('position', true);
															setFieldValue(
																'position',
																EmbedWidgetsPositionEnum.BottomCenter,
																true
															);
														}}
													>
														<IonRippleEffect></IonRippleEffect>
														<div
															className={`zaions__w20 zaions__h40 rounded ${
																!!values.position &&
																values.position ===
																	EmbedWidgetsPositionEnum.BottomCenter
																	? 'zaions__bg_white'
																	: 'zaions__medium_set'
															}`}
														></div>
													</ZIonCol>

													{/* Position Bottom End */}
													<ZIonCol
														size='3.5'
														className={`ion-activatable ripple-parent zaions__cursor_pointer flex ion-align-items-end ion-justify-content-end zaions__h100px ${
															!!values.position &&
															values.position ===
																EmbedWidgetsPositionEnum.BottomEnd
																? 'zaions__primary_set'
																: 'zaions__medium_set'
														}`}
														onClick={() => {
															setFieldTouched('position', true);
															setFieldValue(
																'position',
																EmbedWidgetsPositionEnum.BottomEnd,
																true
															);
														}}
													>
														<IonRippleEffect></IonRippleEffect>
														<div
															className={`zaions__w20 zaions__h40 rounded ${
																!!values.position &&
																values.position ===
																	EmbedWidgetsPositionEnum.BottomEnd
																	? 'zaions__bg_white'
																	: 'zaions__medium_set'
															}`}
														></div>
													</ZIonCol>
												</ZIonRow>
											</ZIonCol>
											<ZIonCol className='ion-text-center'>
												{/*-- Animation Field --*/}
												<div className='mt-5'>
													<ZIonTitle className='p-0 mb-2'>
														<h5>🎈 Animation</h5>
													</ZIonTitle>
													<div className='mt-3'>
														<ZRCSwitch
															onChange={(val) => {
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
													<ZIonTitle className='p-0 mb-2'>
														<h5>❌ Closing option</h5>
													</ZIonTitle>
													<div className='mt-3'>
														<ZRCSwitch
															onChange={(val) => {
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
								<ZIonRow className=' mx-3 mt-2 ion-justify-content-between ion-align-items-center'>
									<ZIonCol>
										<ZIonButton
											fill='outline'
											size='default'
											className='ion-text-capitalize'
											onClick={() => {
												// Close The Modal
												dismissZIonModal();
											}}
										>
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
											onClick={() => void submitForm()}
										>
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
							</ZIonFooter>
						)}
					</>
				);
			}}
		</Formik>
	);
};

export default ZaionsEmbedWidgetsModal;
