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
import { useRecoilValue } from 'recoil';
import { ZProjectBoardStatesRStateAtom } from '@/ZaionsStore/UserDashboard/Project/index.recoil';

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
	// Recoil state that hold boardStatues.
	const zProjectBoardStatesStateAtom = useRecoilValue(
		ZProjectBoardStatesRStateAtom
	);

	return (
		<ZIonList
			lines='none'
			className='py-2 border rounded-md border-[rgba(234,236,238,1)]'
		>
			{/* Default */}
			<ZIonItem className='cursor-pointer ion-activatable' minHeight='35px'>
				<ZIonIcon icon={ellipse} className='w-[0.7rem] h-[0.7rem] mb-[2px]' />

				<ZIonText className='ms-2' color='medium'>
					All
				</ZIonText>
			</ZIonItem>

			<ZIonItem className='cursor-pointer ion-activatable' minHeight='35px'>
				<ZIonIcon icon={ellipse} className='w-[0.7rem] h-[0.7rem] mb-[2px]' />

				<ZIonText className='ms-2' color='medium'>
					Not done
				</ZIonText>
			</ZIonItem>

			<ZIonItem className='cursor-pointer ion-activatable' minHeight='35px'>
				<ZIonIcon icon={ellipse} className='w-[0.7rem] h-[0.7rem] mb-[2px]' />

				<ZIonText className='ms-2' color='medium'>
					Not set
				</ZIonText>
			</ZIonItem>

			{/*  */}
			<ZIonItem minHeight='2px' lines='full' className='my-4'></ZIonItem>

			{zProjectBoardStatesStateAtom.map((el, index) => {
				return (
					<ZIonItem
						className='cursor-pointer ion-activatable'
						minHeight='35px'
						key={index}
					>
						<ZIonIcon
							icon={ellipse}
							className='w-[0.7rem] h-[0.7rem] mb-[2px]'
							style={{ color: el.color }}
						/>

						<ZIonText className='ms-2' color='medium'>
							{el.title}
						</ZIonText>
					</ZIonItem>
				);
			})}
		</ZIonList>
	);
};

export default ZProjectStatusPopover;
