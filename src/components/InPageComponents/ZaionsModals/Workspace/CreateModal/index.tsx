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
import { useZRQCreateRequest } from '@/ZaionsHooks/zreactquery-hooks';

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
	// Create new workspace API.
	const { mutateAsync: createWorkspaceMutate } = useZRQCreateRequest({
		_url: API_URL_ENUM.workspace_create_list,
		_queriesKeysToInvalidate: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN,
		],
	});

	//
	const formikSubmitHandler = async (values: string) => {
		try {
			if (values) {
				// Making an api call creating new workspace
				const _response = await createWorkspaceMutate(values);

				if (_response) {
					const _data = extractInnerData<workspaceInterface>(
						_response,
						extractInnerDataOptionsEnum.createRequestResponseItem
					);

					if (_data && _data.id) {
						// After api dismissing modal
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
						title: '',
						timezone: '',
					}}
					validate={(values) => {
						const errors = {};
						validateField('title', values, errors);
						return errors;
					}}
					onSubmit={(values) => {
						void formikSubmitHandler(zStringify(values));
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
											'ion-touched ion-invalid': touched.title && errors.title,
											'ion-touched ion-valid': touched.title && !errors.title,
										})}
										name='title'
										label='Workspace Name'
										labelPlacement='stacked'
										placeholder='Workspace Name'
										onIonChange={handleChange}
										onIonBlur={handleBlur}
										errorText={errors.title}
										value={values.title}
									/>
								</ZIonCol>

								{/* Workspace timezone */}
								<ZIonCol size='12' className='mt-2'>
									<ZTimezoneSelector
										name='timezone'
										className='ion-margin-top'
										label='Workspace timezone (Optional)'
										labelPlacement='stacked'
										placeholder='Workspace timezone'
										value={values.timezone}
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
