/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { closeOutline, toggleOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonFooter,
	ZIonIcon,
	ZIonImg,
	ZIonInput,
	ZIonRow,
	ZIonText,
	ZIonTextareaShort,
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import { Formik } from 'formik';
import classNames from 'classnames';
import {
	extractInnerData,
	formatApiRequestErrorForFormikFormField,
	validateField,
	zStringify,
} from '@/utils/helpers';
import { reportCustomError, ZCustomError } from '@/utils/customErrorType';
import { AxiosError } from 'axios';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { workspaceTeamInterface } from '@/types/AdminPanel/workspace';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import {
	FormikSetErrorsType,
	FormikSetFieldTouchedEventType,
} from '@/types/ZaionsFormik.type';
import {
	useZGetRQCacheData,
	useZRQCreateRequest,
	useZUpdateRQCacheData,
} from '@/ZaionsHooks/zreactquery-hooks';
import { ProductFavicon } from '@/assets/images';

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
 * About: (team create modal.)
 * @type {*}
 * */

const ZWSTeamCreateModal: React.FC<{
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
	workspaceId: string;
}> = ({ dismissZIonModal, workspaceId }) => {
	// #region Custom hooks.
	const { updateRQCDataHandler } = useZUpdateRQCacheData();
	const { getRQCDataHandler } = useZGetRQCacheData();
	// #endregion

	// #region APIs.
	// Create new team API.
	const { mutateAsync: createWSTeamMutate } = useZRQCreateRequest({
		_url: API_URL_ENUM.workspace_team_create_list,
		_urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
		_itemsIds: [workspaceId],
		_queriesKeysToInvalidate: [],
	});
	// #endregion

	// #region Functions.
	// Formik submit handler
	const formikSubmitHandler = async (
		values: string,
		setErrors: FormikSetErrorsType
	) => {
		try {
			if (values) {
				// Making an api call creating new workspace.
				const _response = await createWSTeamMutate(values);

				if (_response) {
					// extracting data from _response.
					const _data = extractInnerData<workspaceTeamInterface>(
						_response,
						extractInnerDataOptionsEnum.createRequestResponseItem
					);

					if (_data && _data.id) {
						// getting all the workspace from RQ cache.
						const _oldWorkspaceTeams =
							extractInnerData<workspaceTeamInterface[]>(
								(getRQCDataHandler<workspaceTeamInterface[]>({
									key: [
										CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.TEAM,
										workspaceId,
									],
								}) as workspaceTeamInterface[]) || [],
								extractInnerDataOptionsEnum.createRequestResponseItems
							) || [];

						// Adding newly created workspace data.
						const updatedWorkspaceTeams = [..._oldWorkspaceTeams, _data];

						// Updating data in RQ cache.
						await updateRQCDataHandler<workspaceTeamInterface[] | undefined>({
							key: [
								CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.TEAM,
								workspaceId,
							],
							data: updatedWorkspaceTeams as workspaceTeamInterface[],
							id: '',
							extractType: ZRQGetRequestExtractEnum.extractItems,
							updateHoleData: true,
						});

						// After updating cache dismissing modal.
						dismissZIonModal(_data.id, 'success');
					}
				}
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				const _error = error.response?.data as {
					errors: ZGenericObject;
					status: number;
				};

				const __apiErrors = _error?.errors;
				const __errors = formatApiRequestErrorForFormikFormField(
					['title', 'description'],
					['title', 'description'],
					__apiErrors
				);

				setErrors(__errors);
			} else if (error instanceof ZCustomError || error instanceof Error) {
				reportCustomError(error);
			}
		}
	};
	// #endregion

	return (
		<ZIonContent className='ion-padding'>
			{/* Close modal button */}
			<div className='ion-text-end'>
				<ZIonIcon
					icon={closeOutline}
					className='w-7 h-7 cursor-pointer'
					onClick={() => {
						dismissZIonModal();
					}}
					testingselector={
						CONSTANTS.testingSelectors.WSSettings.createModal.closeButton
					}
				/>
			</div>

			<div className='flex flex-col ion-justify-content-center'>
				{/* <div className='flex mx-auto mb-0 rounded-full w-11 h-11 ion-align-items-center ion-justify-content-enter zaions__primary_bg'>
					<ZIonIcon
						icon={toggleOutline}
						className='w-8 h-8 mx-auto'
						color='light'
					/>
				</div> */}
				<div className='flex mx-auto mb-0 rounded-full w-11 h-11 ion-align-items-center ion-justify-content-enter'>
					<ZIonImg src={ProductFavicon} className='w-10 h-10 mx-auto' />
				</div>

				<ZIonText
					color='dark'
					className='block mt-3 text-xl font-bold ion-text-center'
				>
					Create a new team
				</ZIonText>

				<Formik
					initialValues={{
						title: '',
						description: '',
					}}
					validate={(values) => {
						const errors: {
							title?: string;
							description?: string;
						} = {};
						validateField('title', values, errors);

						if (values?.title?.length > 65) {
							errors.title =
								'The title field must not be greater than 65 characters.';
						}

						if (values?.description?.length > 250) {
							errors.description =
								'The description field must not be greater than 250 characters.';
						}

						return errors;
					}}
					onSubmit={(values, { setErrors }) => {
						const zStringifyData = zStringify({
							title: values.title,
							description: values.description,
						});
						void formikSubmitHandler(zStringifyData, setErrors);
					}}
				>
					{({
						values,
						errors,
						touched,
						isValid,
						handleChange,
						handleBlur,
						submitForm,
					}) => {
						return (
							<ZIonRow className='mt-5'>
								{/* Title */}
								<ZIonCol size='12'>
									<ZIonInput
										name='title'
										label='Title*'
										minHeight='40px'
										labelPlacement='stacked'
										placeholder='Title'
										onIonChange={handleChange}
										onIonBlur={handleBlur}
										value={values.title}
										errorText={touched.title ? errors.title : undefined}
										testingselector={
											CONSTANTS.testingSelectors.WSSettings.createModal
												.titleInput
										}
										className={classNames({
											'ion-touched': touched.title,
											'ion-invalid': touched.title && errors.title,
											'ion-valid':
												touched.title && errors.title?.trim()?.length === 0,
										})}
									/>
								</ZIonCol>

								{/* Description */}
								<ZIonCol size='12'>
									<ZIonTextareaShort
										rows={3}
										fill='outline'
										name='description'
										label='Description'
										labelPlacement='stacked'
										autoGrow={true}
										placeholder='Description'
										onIonChange={handleChange}
										onIonBlur={handleBlur}
										value={values.description}
										errorText={
											touched.description ? errors.description : undefined
										}
										className={classNames({
											'mt-1': false,
											'ion-touched': touched.description,
											'ion-invalid': touched.description && errors.description,
											'ion-valid':
												touched.description &&
												errors.description?.trim()?.length === 0,
										})}
										testingselector={
											CONSTANTS.testingSelectors.WSSettings.createModal
												.descriptionTextarea
										}
									/>
								</ZIonCol>

								{/* create button */}
								<ZIonCol>
									<ZIonButton
										expand='block'
										className='mt-4 '
										onClick={() => void submitForm()}
										disabled={!isValid}
										testingselector={
											CONSTANTS.testingSelectors.WSSettings.createModal
												.submitFormBtn
										}
									>
										Create
									</ZIonButton>
								</ZIonCol>
							</ZIonRow>
						);
					}}
				</Formik>
			</div>
		</ZIonContent>
	);
};

export default ZWSTeamCreateModal;
