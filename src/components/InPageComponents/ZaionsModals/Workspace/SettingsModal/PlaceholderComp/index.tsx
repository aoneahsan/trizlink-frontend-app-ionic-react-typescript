/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { ReactNode } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonCol,
	ZIonImg,
	ZIonText,
} from '@/components/ZIonComponents';
import { WorkspaceSettingsTimetablePlaceholder } from '@/assets/images';

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
interface ZWorkspaceSettingPlaceholderComp {
	title?: ReactNode;
	image?: string;
	buttonText?: string;
	buttonOnClick?: React.MouseEventHandler<HTMLIonButtonElement>;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZWorkspaceSettingPlaceholderComp: React.FC<
	ZWorkspaceSettingPlaceholderComp
> = ({ buttonOnClick, buttonText, image, title }) => {
	return (
		<ZIonCol className='pt-4 mt-4 flex ion-align-items-center ion-justify-content-center flex-col ion-text-center'>
			<ZIonImg src={image} />

			<ZIonText className='mt-3 text-3xl ion-text-center'>{title}</ZIonText>

			<ZIonButton
				className='mt-4 text-transform-initial'
				onClick={buttonOnClick}
			>
				{buttonText}
			</ZIonButton>
		</ZIonCol>
	);
};

export default ZWorkspaceSettingPlaceholderComp;
