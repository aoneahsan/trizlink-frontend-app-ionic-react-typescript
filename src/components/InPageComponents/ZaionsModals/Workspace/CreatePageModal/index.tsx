/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { Formik } from 'formik';
import {
	ZIonButton,
	ZIonCol,
	ZIonGrid,
	ZIonHeader,
	ZIonIcon,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import { closeOutline } from 'ionicons/icons';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

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
 * About: (Info of component here...)
 * @type {*}
 * */

const ZWorkspaceCreatePageModal: React.FC<{
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({ dismissZIonModal }) => {
	return (
		<Formik
			initialValues={{}}
			validate={() => {
				const errors = {};

				return errors;
			}}
			onSubmit={() => {}}
		>
			{() => {
				return (
					<>
						<ZIonHeader>
							<ZIonGrid className='w-full'>
								{/*  */}
								<ZIonRow className='ion-align-items-center'>
									{/*  */}
									<ZIonCol className='flex ion-align-items-center ion-justify-content-center ms-3'>
										{/*  */}
										<div className='ms-2'>
											<ZIonText className='block font-bold'>
												Add pages to Talha
											</ZIonText>
										</div>

										<ZIonButton
											fill='clear'
											onClick={() => {
												dismissZIonModal();
											}}
											className='ms-auto'
										>
											<ZIonIcon
												icon={closeOutline}
												className='w-6 h-6'
												color='dark'
											/>
										</ZIonButton>
									</ZIonCol>

									{/*  */}
									{/* <ZIonCol className='ion-text-end'>
										<ZIonButton
											fill='clear'
											onClick={() => {
												dismissZIonModal();
											}}
										>
											<ZIonIcon
												icon={closeOutline}
												className='w-6 h-6'
												color='dark'
											/>
										</ZIonButton>
									</ZIonCol> */}
								</ZIonRow>
							</ZIonGrid>
						</ZIonHeader>
					</>
				);
			}}
		</Formik>
	);
};

export default ZWorkspaceCreatePageModal;
