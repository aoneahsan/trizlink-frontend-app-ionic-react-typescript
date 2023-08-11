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
	ZIonIcon,
	ZIonItem,
	ZIonList,
	ZIonRouterLink,
	ZIonText,
} from '@/components/ZIonComponents';
import {
	bulbOutline,
	cashOutline,
	chatboxEllipsesOutline,
	ellipse,
	giftOutline,
	helpCircleOutline,
	logoApple,
} from 'ionicons/icons';

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

const ZHelpCenterPopover: React.FC<{
	dismissZIonPopover: (data?: string, role?: string | undefined) => void;
	zNavigatePushRoute: (_url: string) => void;
}> = ({ dismissZIonPopover, zNavigatePushRoute }) => {
	return (
		<div className='px-1 py-1'>
			<ZIonText
				className='block mx-3 mt-2 mb-2 text-xs tracking-widest'
				color='medium'
			>
				APP STATUS
			</ZIonText>

			{/* All Systems Operational */}
			<ZIonItem
				lines='full'
				minHeight='2.3rem'
				className='cursor-pointer ion-activatable'
			>
				<ZIonIcon icon={ellipse} className='w-3 h-3' color='success' />
				<ZIonText className='block text-sm tracking-wide ms-2'>
					All Systems Operational
				</ZIonText>
			</ZIonItem>

			{/*  */}
			<ZIonList lines='none'>
				{/* What's new? */}
				<ZIonItem minHeight='2.3rem' className='cursor-pointer ion-activatable'>
					<ZIonIcon icon={giftOutline} className='w-5 h-5' />
					<ZIonText className='block mt-1 text-sm tracking-wide ms-2'>
						What's new?
					</ZIonText>
				</ZIonItem>

				{/* Suggest an idea */}
				<ZIonItem minHeight='2.3rem' className='cursor-pointer ion-activatable'>
					<ZIonIcon icon={bulbOutline} className='w-5 h-5' />
					<ZIonText className='block mt-1 text-sm tracking-wide ms-2'>
						Suggest an idea
					</ZIonText>
				</ZIonItem>

				{/* Help center */}
				<ZIonItem minHeight='2.3rem' className='cursor-pointer ion-activatable'>
					<ZIonIcon icon={helpCircleOutline} className='w-5 h-5' />
					<ZIonText className='block mt-1 text-sm tracking-wide ms-2'>
						Help center
					</ZIonText>
				</ZIonItem>

				{/* Price */}
				<ZIonItem minHeight='2.3rem' className='cursor-pointer ion-activatable'>
					<ZIonIcon icon={cashOutline} className='w-5 h-5' />
					<ZIonText className='block mt-1 text-sm tracking-wide ms-2'>
						Price
					</ZIonText>
				</ZIonItem>

				{/* Contact support */}
				<ZIonItem minHeight='2.3rem' className='cursor-pointer ion-activatable'>
					<ZIonIcon icon={chatboxEllipsesOutline} className='w-5 h-5' />
					<ZIonText className='block mt-1 text-sm tracking-wide ms-2'>
						Contact support
					</ZIonText>
				</ZIonItem>
			</ZIonList>

			<ZIonItem
				minHeight='.1rem'
				lines='full'
				className='cursor-pointer ion-activatable'
			/>

			{/*  */}
			<ZIonText
				className='block mx-3 mt-2 mb-2 text-xs tracking-widest'
				color='medium'
			>
				DOWNLOAD APPS
			</ZIonText>

			<div className=''>
				<ZIonRouterLink className='flex ion-align-items-center' color='dark'>
					<ZIonIcon icon={logoApple} />
					<ZIonText></ZIonText>
				</ZIonRouterLink>
			</div>
		</div>
	);
};

export default ZHelpCenterPopover;
