/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import { zEmptyTable } from '@/assets/images';
import { ZIonImg, ZIonText, ZIonTitle } from '@/components/ZIonComponents';
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

const ZEmptyTable: React.FC<{ message?: string }> = ({
	message = 'no data found!',
}) => {
	return (
		<div className='bg-transparent flex ion-align-items-center ion-justify-content-center w-full h-full'>
			<ZIonImg src={zEmptyTable} className='w-[15rem] mt-2' />
			<div className='max-w-[30%] min-w-[20%] ms-4'>
				<ZIonText className='text-lg inline-block max-content' color='medium'>
					{/* No short links founds. please create a short link. */}
					{message}
				</ZIonText>
			</div>
		</div>
	);
};

export default ZEmptyTable;
