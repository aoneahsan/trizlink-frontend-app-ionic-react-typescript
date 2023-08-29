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
import { Z500Svg } from '@/assets/images';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const Z500View: React.FC = () => {
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
					<ZIonImg src={Z500Svg} className='w-[60%] h-[60%] pb-4' />

					<ZIonText className='mb-3 pb-1 mt-6 md:text-5xl'>
						Something went wrong!
					</ZIonText>
					<ZIonText className='md:text-lg ion-text-center'>
						We're sorry, but something went wrong on our end. Our team has been
						notified of this issue and is working to fix it. In the meantime,
						you can try refreshing the page or coming back later. If the problem
						persists, please don't hesitate to contact our support team for
						further assistance.
					</ZIonText>
				</ZIonCol>
			</ZIonRow>
		</ZIonContent>
	);
};

export default Z500View;
