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
import { extractInnerData, validateField, zStringify } from '@/utils/helpers';
import { reportCustomError } from '@/utils/customErrorType';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { workspaceInterface } from '@/types/AdminPanel/workspace';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

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
	const { mutateAsync: createWorkspaceMutate } = useZRQCreateRequest({
		_url: API_URL_ENUM.workspace_create_list,
		_queriesKeysToInvalidate: [],
	});

	// Formik submit handler
	const formikSubmitHandler = async (values: string) => {
		try {
			if (values) {
				// Making an api call creating new workspace.
				const _response = await createWorkspaceMutate(values);

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
			reportCustomError(error);
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
					<h4 className='mt-1 ion-no-margin'>
						<ZIonIcon icon={closeOutline} className='w-7 h-7' />
					</h4>
				</ZIonButton>
			</div>

			{/*  */}
			<div className='flex flex-col ion-justify-content-center'>
				<ZIonText className='block ion-text-center' color='primary'>
					<h1 className='mb-0 ion-padding-top bg-primary zaions__modal_icon'>
						<ZIonIcon icon={toggleOutline} className='mx-auto' color='light' />
					</h1>
				</ZIonText>

				<ZIonText color='dark' className='block mt-3 ion-text-center'>
					<h5 className='font-bold'>Create a new Workspace 😊</h5>
				</ZIonText>

				<Formik
					initialValues={{
						workspaceName: '',
						workspaceTimezone: '',
					}}
					validate={(values) => {
						const errors = {};
						validateField('workspaceName', values, errors);
						return errors;
					}}
					onSubmit={(values) => {
						const zStringifyData = zStringify({
							title: values.workspaceName,
							timezone: values.workspaceTimezone,
						});
						void formikSubmitHandler(zStringifyData);
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
										className={classNames({
											'ion-touched ion-invalid':
												touched.workspaceName && errors.workspaceName,
											'ion-touched ion-valid':
												touched.workspaceName && !errors.workspaceName,
										})}
										name='workspaceName'
										label='Workspace Name'
										labelPlacement='stacked'
										placeholder='Workspace Name'
										onIonChange={handleChange}
										onIonBlur={handleBlur}
										errorText={errors.workspaceName}
										value={values.workspaceName}
									/>
								</ZIonCol>

								{/* Workspace timezone */}
								<ZIonCol size='12' className='mt-2'>
									<ZTimezoneSelector
										name='workspaceTimezone'
										className='ion-margin-top'
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
