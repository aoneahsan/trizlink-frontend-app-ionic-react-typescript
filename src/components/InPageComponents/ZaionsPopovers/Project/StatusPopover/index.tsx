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
import classNames from 'classnames';
import { ProjectBoardStatusEnum } from '@/types/AdminPanel/Project/index.type';

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

const ZProjectStatusPopover: React.FC<{
	dismissZIonPopover: (data?: string, role?: string | undefined) => void;
}> = ({ dismissZIonPopover }) => {
	// Recoil state that hold boardStatues.
	const { allStatus: _ZAllStatues, currentStatus: _ZCurrentStatus } =
		useRecoilValue(ZProjectBoardStatesRStateAtom);

	return (
		<ZIonList
			lines='none'
			className='py-2 border rounded-md border-[rgba(234,236,238,1)]'
		>
			{/* Default */}
			<ZIonItem
				className='cursor-pointer ion-activatable'
				minHeight='35px'
				onClick={() => {
					dismissZIonPopover(ProjectBoardStatusEnum.all, 'All');
				}}
			>
				<ZIonIcon icon={ellipse} className='w-[0.7rem] h-[0.7rem] mb-[2px]' />

				<ZIonText className='ms-2' color='medium'>
					All
				</ZIonText>
			</ZIonItem>

			<ZIonItem
				className='cursor-pointer ion-activatable'
				minHeight='35px'
				onClick={() => {
					dismissZIonPopover(ProjectBoardStatusEnum.notDone, 'Not done');
				}}
			>
				<ZIonIcon icon={ellipse} className='w-[0.7rem] h-[0.7rem] mb-[2px]' />

				<ZIonText className='ms-2' color='medium'>
					Not done
				</ZIonText>
			</ZIonItem>

			<ZIonItem
				className='cursor-pointer ion-activatable'
				minHeight='35px'
				onClick={() => {
					dismissZIonPopover(ProjectBoardStatusEnum.notSet, 'Not set');
				}}
			>
				<ZIonIcon icon={ellipse} className='w-[0.7rem] h-[0.7rem] mb-[2px]' />

				<ZIonText className='ms-2' color='medium'>
					Not set
				</ZIonText>
			</ZIonItem>

			{/*  */}
			<ZIonItem minHeight='2px' lines='full' className='my-4'></ZIonItem>

			{_ZAllStatues?.map((el, index) => {
				return (
					<ZIonItem
						className={classNames({
							'cursor-pointer ion-activatable': true,
							'zaions-ion-bg-color-medium_point_1':
								_ZCurrentStatus.id === el.id,
						})}
						minHeight='35px'
						key={index}
						onClick={() => {
							dismissZIonPopover(el.id, el.title);
						}}
					>
						<ZIonIcon
							icon={ellipse}
							className='w-[0.7rem] h-[0.7rem] mb-[2px]'
							style={{ color: el.color }}
						/>

						<ZIonText
							className={classNames({
								'ms-2': true,
								'font-bold': _ZCurrentStatus.id === el.id,
							})}
							color='medium'
						>
							{el.title}
						</ZIonText>
					</ZIonItem>
				);
			})}
		</ZIonList>
	);
};

export default ZProjectStatusPopover;
