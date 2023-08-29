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
import {
	ZIonCol,
	ZIonContent,
	ZIonImg,
	ZIonRow,
	ZIonText,
	ZIonTitle,
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

import { Z400Svg } from '@/assets/images';
/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const Z400View: React.FC = () => {
	return (
		<ZIonContent>
			<ZIonRow className='w-full h-full ion-align-items-center ion-justify-content-center'>
				<ZIonCol
					sizeXl='6'
					sizeLg='5'
					sizeMd='6'
					sizeSm='8'
					sizeXs='11'
					className='flex flex-col ion-align-items-center ion-justify-content-center'
				>
					<ZIonImg src={Z400Svg} className='w-[60%] h-[60%] pb-5' />

					<ZIonTitle className='mb-4 mt-6 md:text-5xl'>Bad Request</ZIonTitle>
					<ZIonText className='md:text-lg ion-text-center'>
						Uh-oh! Your request has hit a snag and couldn't be processed
						properly. Kindly review the data you've provided and attempt again.
						Should you encounter persistent difficulties, don't hesitate to get
						in touch with our support team for expert help.
					</ZIonText>
				</ZIonCol>
			</ZIonRow>
		</ZIonContent>
	);
};

export default Z400View;
