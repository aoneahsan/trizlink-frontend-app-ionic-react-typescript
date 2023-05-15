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
	ZIonIcon,
	ZIonItem,
	ZIonRow,
} from '@/components/ZIonComponents';
import { PlatformColorsData } from '@/data/UserDashboard/Workspace/MockUpPage/index.data';
import { checkmarkOutline } from 'ionicons/icons';

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

const ZPlatformColorPopover: React.FC<{
	dismissZIonPopover: (data?: string, role?: string | undefined) => void;
	_colorCode: string;
}> = ({ _colorCode, dismissZIonPopover }) => {
	return (
		<ZIonRow className='ion-padding pt-2'>
			<ZIonCol size='12' className='mb-2'>
				<ZIonItem className='ion-no-padding'>PLATFORM COLORS</ZIonItem>
			</ZIonCol>
			{PlatformColorsData.map((el, index) => (
				<ZIonCol size='3' key={index}>
					<div
						className='w-8 h-8 rounded zaions__cursor_pointer flex ion-align-items-center ion-justify-content-center'
						style={{ backgroundColor: el.colorCode }}
						title={el.colorName}
						onClick={() => {
							dismissZIonPopover(el.colorCode, el.colorName);
						}}
					>
						{_colorCode === el.colorCode && (
							<ZIonIcon icon={checkmarkOutline} color='light' />
						)}
					</div>
				</ZIonCol>
			))}
		</ZIonRow>
	);
};

export default ZPlatformColorPopover;
