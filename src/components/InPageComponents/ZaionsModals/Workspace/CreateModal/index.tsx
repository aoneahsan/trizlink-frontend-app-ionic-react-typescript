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
import { Formik } from 'formik';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonIcon,
	ZIonInput,
	ZIonNote,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import { ZTimezoneSelector } from '@/components/CustomComponents/ZTimezone';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import {
	useZGetRQCacheData,
	useZRQCreateRequest,
	useZUpdateRQCacheData,
} from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import {
	extractInnerData,
	formatApiRequestErrorForFormikFormField,
	validateField,
	zStringify,
} from '@/utils/helpers';
import { reportCustomError, ZCustomError } from '@/utils/customErrorType';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { workspaceInterface } from '@/types/AdminPanel/workspace';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { AxiosError } from 'axios';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';
import { FormikSetErrorsType } from '@/types/ZaionsFormik.type';

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

const ZAddNewWorkspaceModal: React.FC<{
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({ dismissZIonModal }) => {
	// Custom hooks
	const { updateRQCDataHandler } = useZUpdateRQCacheData();
	const { getRQCDataHandler } = useZGetRQCacheData();

	// Create new workspace API.
	const { mutateAsync: createWorkspaceMutate, error } = useZRQCreateRequest({
		_url: API_URL_ENUM.workspace_create_list,
		_queriesKeysToInvalidate: [],
	});

	// Formik submit handler
	const formikSubmitHandler = async (
		values: string,
		setErrors: FormikSetErrorsType
	) => {
		try {
			if (values) {
				// Making an api call creating new workspace.
				const _response = await createWorkspaceMutate(values);
				console.log({ line: 101, _response, error });

				if (_response) {
					// extracting data from _response.
					const _data = extractInnerData<workspaceInterface>(
						_response,
						extractInnerDataOptionsEnum.createRequestResponseItem
					);

					if (_data && _data.id) {
						// getting all the workspace from RQ cache.
						const _oldWorkspaces =
							extractInnerData<workspaceInterface[]>(
								getRQCDataHandler<workspaceInterface[]>({
									key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN],
								}) as workspaceInterface[],
								extractInnerDataOptionsEnum.createRequestResponseItems
							) || [];

						// Adding newly created workspace data.
						const updatedWorkspaces = [..._oldWorkspaces, _data];

						// Updating data in RQ cache.
						await updateRQCDataHandler<workspaceInterface[] | undefined>({
							key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN],
							data: updatedWorkspaces as workspaceInterface[],
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
				const __apiErrors = (error.response?.data as { errors: ZGenericObject })
					?.errors;
				const __errors = formatApiRequestErrorForFormikFormField(
					['title', 'workspaceTimezone'],
					['title', 'timezone'],
					__apiErrors
				);

				setErrors(__errors);
			} else if (error instanceof ZCustomError || error instanceof Error) {
				reportCustomError(error);
			}
		}
	};

	return (
		<ZIonContent className='ion-padding'>
			{/* Close modal button */}
			<div className='ion-text-end'>
				<ZIonButton
					className='ion-no-padding ion-no-margin'
					onClick={() => {
						dismissZIonModal();
					}}
					fill='clear'
					color='dark'
				>
					<ZIonIcon icon={closeOutline} className='w-7 h-7' />
				</ZIonButton>
			</div>

			{/*  */}
			<div className='flex flex-col ion-justify-content-center'>
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
					Create a new Workspace 😊
				</ZIonText>

				<Formik
					initialValues={{
						title: '',
						workspaceTimezone: CONSTANTS.DEFAULT_VALUES.TIMEZONE_DEFAULT,
					}}
					validate={(values) => {
						const errors = {};
						validateField('title', values, errors);
						return errors;
					}}
					onSubmit={(values, { setErrors }) => {
						const zStringifyData = zStringify({
							title: values.title,
							timezone: values.workspaceTimezone,
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
							<ZIonRow className='pt-2 mt-4'>
								{/* Workspace name */}
								<ZIonCol size='12'>
									<ZIonInput
										name='title'
										label='Workspace Name'
										minHeight='40px'
										labelPlacement='stacked'
										placeholder='Workspace Name'
										onIonChange={handleChange}
										onIonBlur={handleBlur}
										value={values.title}
										errorText={touched.title ? errors.title : undefined}
										className={classNames({
											'ion-touched ion-invalid': touched.title && errors.title,
											'ion-touched ion-valid': touched.title && !errors.title,
										})}
									/>
								</ZIonCol>

								{/* Workspace timezone */}
								<ZIonCol size='12' className='mt-2'>
									<ZTimezoneSelector
										name='workspaceTimezone'
										className='mt-3'
										label='Workspace timezone (Optional)'
										labelPlacement='stacked'
										placeholder='Workspace timezone'
										value={values.workspaceTimezone}
										onIonChange={handleChange}
										onIonBlur={handleBlur}
									/>
								</ZIonCol>

								{/* create button */}
								<ZIonCol>
									<ZIonButton
										expand='block'
										className='mt-4 '
										onClick={() => void submitForm()}
										disabled={!isValid}
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

export default ZAddNewWorkspaceModal;
