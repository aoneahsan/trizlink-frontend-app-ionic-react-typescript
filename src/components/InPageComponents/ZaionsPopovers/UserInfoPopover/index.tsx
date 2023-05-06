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
import { ZIonCol, ZIonRow, ZIonText } from '@/components/ZIonComponents';
import ZUserAvatarInfo from '@/components/WorkspacesComponents/userButton';
import { ProductLogo } from '@/assets/images';

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

const ZUserInfoPopover: React.FC = () => {
	return (
		<ZIonRow className='px-2 ion-align-items-center my-2'>
			{/* User avatar col */}
			<ZIonCol size='max-content'>
				<ZUserAvatarInfo
					className='zaions__w50px zaions__h50px'
					userAvatar={ProductLogo}
				/>
			</ZIonCol>

			{/* User info col */}
			<ZIonCol>
				<ZIonText className='d-block'>Muhammad Talha (you)</ZIonText>
				<ZIonText className='d-block zaions__fs_13'>
					talhaworking5@gmail.com
				</ZIonText>
			</ZIonCol>

			<ZIonCol size='12' className=' mt-2 py-3 px-3 border-top'>
				<ZIonText className='d-block zaions__fs_13'>
					last seen: just now
				</ZIonText>
			</ZIonCol>
		</ZIonRow>
	);
};

export default ZUserInfoPopover;
