// Core Imports
import React from 'react';
// Packages Import
import { Formik, Form } from 'formik';
import { toggleOutline } from 'ionicons/icons';
import { useRecoilState, useRecoilValue } from 'recoil';
import classNames from 'classnames';

// Custom Imports
import {
	ZIonCol,
	ZIonRow,
	ZIonText,
	ZIonRouterLink,
	ZIonHeader,
	ZIonNote,
	ZIonContent,
	ZIonIcon,
	ZIonFooter,
	ZIonInput,
} from '@/components/ZIonComponents';

// Global Constants
import MESSAGES from '@/utils/messages';

// Images

// Recoil States
import { ZaionsAppSettingsRState } from '@/ZaionsStore/zaionsAppSettings.recoil';
import { UTMTagsTemplateFormState } from '@/ZaionsStore/FormStates/addUTMTagsFormState.recoil';

// Types
import { FormMode } from '@/types/AdminPanel/index.type';
import { resetFormType } from '@/types/ZaionsFormik.type';
import {
	useZRQCreateRequest,
	useZGetRQCacheData,
	useZRQUpdateRequest,
	useZUpdateRQCacheData,
} from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { extractInnerData, zStringify } from '@/utils/helpers';
import CONSTANTS from '@/utils/constants';
import { ZIonButton } from '@/components/ZIonComponents';
import { showSuccessNotification } from '@/utils/notification';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { ZLinkMutateApiType } from '@/types/ZaionsApis.type';
import { UTMTagTemplateType } from '@/types/AdminPanel/linksType';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

// Styles

const ZaionsAddUtmTags: React.FC<{
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({ dismissZIonModal }) => {
	const appSettings = useRecoilValue(ZaionsAppSettingsRState);
	const [ZaionsUTMTagsTemplateFormState, setZaionsUTMTagsTemplateFormState] =
		useRecoilState(UTMTagsTemplateFormState);

	const { getRQCDataHandler } = useZGetRQCacheData();
	const { updateRQCDataHandler } = useZUpdateRQCacheData();

	const { mutateAsync: createUTMTagAsyncMutate } = useZRQCreateRequest({
		_url: API_URL_ENUM.userAccountUtmTags_create_list,
		_queriesKeysToInvalidate: [],
	});

	const { mutateAsync: updateUTMTagAsyncMutate } = useZRQUpdateRequest({
		_url: API_URL_ENUM.userAccountUtmTags_update_delete,
		_queriesKeysToInvalidate: [],
	});

	/**
	 * Handle Form Submission Function
	 * add a new UTM Tag function
	 *  */
	const handleFormSubmit = async (value: string, resetForm?: resetFormType) => {
		try {
			let __response;
			// ADD API Request to add this UTM Tag to user account in DB.
			if (ZaionsUTMTagsTemplateFormState.formMode === FormMode.ADD) {
				__response = await createUTMTagAsyncMutate(value);
			} else if (
				ZaionsUTMTagsTemplateFormState.formMode === FormMode.EDIT &&
				ZaionsUTMTagsTemplateFormState.id
			) {
				__response = await updateUTMTagAsyncMutate({
					itemIds: [ZaionsUTMTagsTemplateFormState.id],
					urlDynamicParts: [CONSTANTS.RouteParams.utmTag.utmTagId],
					requestData: value,
				});
			}

			if ((__response as ZLinkMutateApiType<UTMTagTemplateType>).success) {
				const __data = extractInnerData<UTMTagTemplateType>(
					__response,
					extractInnerDataOptionsEnum.createRequestResponseItem
				);

				if (__data && __data.id) {
					const __utmDataFromCache =
						getRQCDataHandler<UTMTagTemplateType[]>({
							key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN],
						}) || [];

					const __oldUtmData = extractInnerData<UTMTagTemplateType[]>(
						__utmDataFromCache,
						extractInnerDataOptionsEnum.createRequestResponseItems
					);
					console.log({ __utmDataFromCache, __oldUtmData, __data });

					if (__oldUtmData) {
						if (ZaionsUTMTagsTemplateFormState.formMode === FormMode.ADD) {
							const __updatedUtmTagsData = [...__oldUtmData, __data];

							await updateRQCDataHandler({
								key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN],
								data: __updatedUtmTagsData,
								id: '',
								extractType: ZRQGetRequestExtractEnum.extractItems,
								updateHoleData: true,
							});

							showSuccessNotification(
								MESSAGES.GENERAL.UTM_TAGS_TEMPLATE.CREATED
							);
						} else if (
							ZaionsUTMTagsTemplateFormState.formMode === FormMode.EDIT
						) {
							await updateRQCDataHandler({
								key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN],
								data: __data,
								id: __data.id,
								extractType: ZRQGetRequestExtractEnum.extractItems,
							});

							showSuccessNotification(
								MESSAGES.GENERAL.UTM_TAGS_TEMPLATE.UPDATED
							);
						}
					}
				}
			}
			// Close modal after action.
			dismissZIonModal();

			// Reset to Default
			SetDefaultPixelsAccountFormState();

			// this will reset form
			if (resetForm) {
				resetForm({ values: {} });
			}
		} catch (error) {
			console.error(error);
		}
	};

	const SetDefaultPixelsAccountFormState = () => {
		try {
			// Reset to default
			setZaionsUTMTagsTemplateFormState((oldVal) => ({
				...oldVal,
				id: '',
				templateName: '',
				utmCampaign: '',
				utmMedium: '',
				utmSource: '',
				utmTerm: '',
				utmContent: '',
				formMode: FormMode.ADD,
			}));
		} catch (error) {
			console.error(error);
		}
	};

	// JSX Code
	return (
		<Formik
			initialValues={{
				templateName: ZaionsUTMTagsTemplateFormState.templateName || '',
				utmCampaign: ZaionsUTMTagsTemplateFormState.utmCampaign || '',
				utmMedium: ZaionsUTMTagsTemplateFormState.utmMedium || '',
				utmSource: ZaionsUTMTagsTemplateFormState.utmSource || '',
				utmTerm: ZaionsUTMTagsTemplateFormState.utmTerm || '',
				utmContent: ZaionsUTMTagsTemplateFormState.utmContent || '',
			}}
			enableReinitialize={true}
			validate={(values) => {
				const errors: {
					templateName?: string;
					utmCampaign?: string;
					utmMedium?: string;
				} = {};

				if (!values.templateName) {
					errors.templateName = 'Template name is required.';
				}

				if (!values.utmCampaign) {
					errors.utmCampaign = 'Campaign is required.';
				}

				if (!values.utmMedium) {
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
					utmContent: values.utmContent,
				});
				void handleFormSubmit(stringifyValue, resetForm);
			}}
		>
			{({
				values,
				errors,
				isValid,
				handleSubmit,
				handleChange,
				handleBlur,
				submitForm,
				touched,
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
											CONSTANTS.testingSelectors.utmTags.formModal.closeModalBtn
										}
										onClick={() => {
											// Close The Modal
											dismissZIonModal();
											// Reset to Default
											SetDefaultPixelsAccountFormState();
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
										testingselector={
											CONSTANTS.testingSelectors.utmTags.formModal.submitFormBtn
										}
										onClick={() => {
											void submitForm();
										}}
										color={'primary'}
										className='ion-text-capitalize'
										fill='solid'
									>
										{ZaionsUTMTagsTemplateFormState.formMode === FormMode.ADD
											? 'Create'
											: ZaionsUTMTagsTemplateFormState.formMode ===
													FormMode.EDIT && 'Update'}
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
							{/* </IonToolbar> */}
						</ZIonHeader>
					)}

					<ZIonContent className='ion-padding'>
						<div className='flex flex-col ion-text-center ion-justify-content-center ion-padding-top ion-margin-top'>
							<div className='flex mx-auto mb-0 rounded-full w-11 h-11 ion-align-items-center ion-justify-content-enter zaions__primary_bg'>
								<ZIonIcon
									icon={toggleOutline}
									className='w-8 h-8 mx-auto'
									color='light'
								/>
							</div>

							<ZIonText
								color='dark'
								className='block mt-3 text-lg font-bold ion-text-center'
							>
								Create UTMs preset
								<ZIonRouterLink
									routerLink={ZaionsRoutes.HomeRoute}
									className='mx-1'
								>
									(help)
								</ZIonRouterLink>
								🎫
							</ZIonText>
						</div>
						<Form onSubmit={handleSubmit} className='px-2'>
							{/* Template Name Input */}
							<ZIonInput
								type='text'
								color='dark'
								label='Template name*'
								labelPlacement='stacked'
								name='templateName'
								placeholder='Template name'
								minHeight='2.3rem'
								onIonChange={handleChange}
								onIonBlur={handleBlur}
								value={values.templateName}
								errorText={
									touched.templateName ? errors.templateName : undefined
								}
								testingselector={
									CONSTANTS.testingSelectors.utmTags.formModal.name
								}
								className={classNames({
									'mt-5': true,
									'ion-touched': touched.templateName,
									'ion-invalid': touched.templateName && errors.templateName,
									'ion-valid': touched.templateName && !errors.templateName,
								})}
							/>

							{/* UTM Campaign Input */}
							<ZIonInput
								type='text'
								color='dark'
								minHeight='2.3rem'
								label='UTM Campaign*'
								labelPlacement='stacked'
								placeholder='UTM Campaign'
								name='utmCampaign'
								onIonChange={handleChange}
								onIonBlur={handleBlur}
								value={values.utmCampaign}
								errorText={touched.utmCampaign ? errors.utmCampaign : undefined}
								testingselector={
									CONSTANTS.testingSelectors.utmTags.formModal.campaign
								}
								className={classNames({
									'mt-6': true,
									'ion-touched': touched.utmCampaign,
									'ion-invalid': touched.utmCampaign && errors.utmCampaign,
									'ion-valid': touched.utmCampaign && !errors.utmCampaign,
								})}
							/>

							{/* UTM Medium Input */}
							<ZIonInput
								type='text'
								color='dark'
								minHeight='2.3rem'
								label='UTM Medium*'
								labelPlacement='stacked'
								name='utmMedium'
								placeholder='UTM Medium'
								onIonChange={handleChange}
								onIonBlur={handleBlur}
								value={values.utmMedium}
								errorText={touched.utmMedium ? errors.utmMedium : undefined}
								testingselector={
									CONSTANTS.testingSelectors.utmTags.formModal.medium
								}
								className={classNames({
									'mt-6': true,
									'ion-touched': touched.utmMedium,
									'ion-invalid': touched.utmMedium && errors.utmMedium,
									'ion-valid': touched.utmMedium && !errors.utmMedium,
								})}
							/>

							{/* UTM Source Input */}
							<ZIonInput
								type='text'
								color='dark'
								minHeight='2.3rem'
								className='mt-6'
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
								color='dark'
								minHeight='2.3rem'
								className='mt-6'
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
								color='dark'
								minHeight='2.3rem'
								className='mt-6'
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
											CONSTANTS.testingSelectors.utmTags.formModal.closeModalBtn
										}
										onClick={() => {
											// Close The Modal
											dismissZIonModal();
											// Reset to Default
											SetDefaultPixelsAccountFormState();
										}}
									>
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
											CONSTANTS.testingSelectors.utmTags.formModal.submitFormBtn
										}
										onClick={() => void submitForm()}
									>
										{ZaionsUTMTagsTemplateFormState.formMode === FormMode.ADD
											? 'Create'
											: ZaionsUTMTagsTemplateFormState.formMode ===
													FormMode.EDIT && 'Update'}
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
			)}
		</Formik>
	);
};

export default ZaionsAddUtmTags;
