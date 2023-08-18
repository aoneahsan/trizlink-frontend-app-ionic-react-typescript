/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import {
	ZIonCol,
	ZIonContent,
	ZIonIcon,
	ZIonRow,
	ZIonText,
	ZIonTitle,
} from '@/components/ZIonComponents';
import { helpCircleOutline, lockClosed } from 'ionicons/icons';
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

const Z404View: React.FC = () => {
	return (
		<ZIonContent>
			<ZIonRow className='w-full h-full ion-align-items-center ion-justify-content-center'>
				<ZIonCol
					sizeXl='4'
					sizeLg='5'
					sizeMd='6'
					sizeSm='8'
					sizeXs='11'
					className='h-[50%] zaions__medium_set rounded-md flex-col flex ion-align-items-center ion-justify-content-center gap-3 ion-text-center shadow-xl'
				>
					<ZIonIcon icon={helpCircleOutline} className='w-12 h-12 mb-2' />
					<ZIonText
						className='text-5xl font-bold ion-no-padding h-max'
						color='dark'
					>
						404
					</ZIonText>
					<ZIonText className='text-2xl ion-no-padding'>Not Found</ZIonText>
				</ZIonCol>
			</ZIonRow>
		</ZIonContent>
	);
};

export default Z404View;
