/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import { arrowForward } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import { ZTimezoneSelector } from '@/components/CustomComponents/ZTimezone';
import {
	ZIonButton,
	ZIonCol,
	ZIonFooter,
	ZIonIcon,
	ZIonInput,
	ZIonRow,
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

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

const ZWorkspaceFormDetailTab: React.FC = () => {
	const { values, errors, touched, handleBlur, handleChange } =
		useFormikContext<workspaceInterface>();
	return (
		<>
			<ZIonCol className='my-5' size='11'>
				<ZIonRow className='w-4/5 w-80 mx-auto'>
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
					<ZIonCol size='12' className='mt-4'>
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
				</ZIonRow>
			</ZIonCol>

			<ZIonFooter className='flex align-items-center mt-5'>
				{/* Next button */}
				<ZIonCol size='12' className='mt-4 pt-3'>
					<div className='w-3/12 mx-auto'>
						<ZIonButton expand='block' className='text-transform-initial'>
							Next <ZIonIcon className='ms-2' icon={arrowForward} />
						</ZIonButton>
					</div>
				</ZIonCol>
			</ZIonFooter>
		</>
	);
};

export default ZWorkspaceFormDetailTab;
