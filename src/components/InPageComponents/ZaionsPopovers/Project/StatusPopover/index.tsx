/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
	ZIonIcon,
	ZIonItem,
	ZIonList,
	ZIonText,
} from '@/components/ZIonComponents';
import { ellipse } from 'ionicons/icons';

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

const ZProjectStatusPopover: React.FC = () => {
	return (
		<ZIonList
			lines='none'
			className='py-2 border rounded-md border-[rgba(234,236,238,1)]'
		>
			{/* All */}
			<ZIonItem className='cursor-pointer ion-activatable' minHeight='35px'>
				<ZIonIcon icon={ellipse} className='w-[0.7rem] h-[0.7rem] mb-[2px]' />

				<ZIonText className='ms-2' color='medium'>
					All
				</ZIonText>
			</ZIonItem>

			{/* Not Done */}
			<ZIonItem className='cursor-pointer ion-activatable' minHeight='35px'>
				<ZIonIcon icon={ellipse} className='w-[0.7rem] h-[0.7rem] mb-[2px]' />

				<ZIonText className='ms-2' color='medium'>
					Not done
				</ZIonText>
			</ZIonItem>

			{/* Not set */}
			<ZIonItem className='cursor-pointer ion-activatable' minHeight='35px'>
				<ZIonIcon icon={ellipse} className='w-[0.7rem] h-[0.7rem] mb-[2px]' />

				<ZIonText className='ms-2' color='medium'>
					Not set
				</ZIonText>
			</ZIonItem>

			{/* Done */}
			<ZIonItem className='cursor-pointer ion-activatable' minHeight='35px'>
				<ZIonIcon
					icon={ellipse}
					className='w-[0.7rem] h-[0.7rem] mb-[2px]'
					color='success'
				/>

				<ZIonText className='ms-2' color='medium'>
					Done
				</ZIonText>
			</ZIonItem>

			{/*  */}
			<ZIonItem minHeight='2px' lines='full' className='my-4'></ZIonItem>

			{/* Need your opinion */}
			<ZIonItem className='cursor-pointer ion-activatable' minHeight='35px'>
				<ZIonIcon
					icon={ellipse}
					className='w-[0.7rem] h-[0.7rem] mb-[2px]'
					color='tertiary'
				/>

				<ZIonText className='ms-2' color='medium'>
					Need your opinion
				</ZIonText>
			</ZIonItem>

			{/* Planned */}
			<ZIonItem className='cursor-pointer ion-activatable' minHeight='35px'>
				<ZIonIcon
					icon={ellipse}
					className='w-[0.7rem] h-[0.7rem] mb-[2px]'
					color='secondary'
				/>

				<ZIonText className='ms-2' color='medium'>
					Planned
				</ZIonText>
			</ZIonItem>

			{/* In progress */}
			<ZIonItem className='cursor-pointer ion-activatable' minHeight='35px'>
				<ZIonIcon
					icon={ellipse}
					className='w-[0.7rem] h-[0.7rem] mb-[2px]'
					color='success'
				/>

				<ZIonText className='ms-2' color='medium'>
					In progress
				</ZIonText>
			</ZIonItem>

			{/* Not yet */}
			<ZIonItem className='cursor-pointer ion-activatable' minHeight='35px'>
				<ZIonIcon icon={ellipse} className='w-[0.7rem] h-[0.7rem] mb-[2px]' />

				<ZIonText className='ms-2' color='medium'>
					Not yet
				</ZIonText>
			</ZIonItem>
		</ZIonList>
	);
};

export default ZProjectStatusPopover;
