/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { alertCircleOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZWorkspaceConnectPagesCardInfoPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/ConnectPageCardInfoPopover';
import {
	ZIonCard,
	ZIonCardContent,
	ZIonIcon,
	ZIonText,
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { WorkspacePageCardInfoPopoverItemType } from '@/types/AdminPanel/workspace';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';

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

export const SingleCard: React.FC<{
	icon: string;
	title: string;
	onClick?: React.MouseEventHandler<HTMLIonCardElement>;
	showInfoIcon?: boolean;
	infoCardItems?: WorkspacePageCardInfoPopoverItemType[];
}> = ({ icon, title, onClick, showInfoIcon = false, infoCardItems }) => {
	const [compState, setCompState] = useState<{ isActive: boolean }>({
		isActive: false,
	});

	const { presentZIonPopover: presentConnectPagesCardInfoPopover } =
		useZIonPopover(ZWorkspaceConnectPagesCardInfoPopover, {
			items: infoCardItems,
		}); // popover hook to show UserInfoPopover

	return (
		<ZIonCard
			className='zaions__cursor_pointer h-full'
			onClick={onClick}
			onMouseEnter={(event: unknown) => {
				setCompState((oldValues) => ({
					...oldValues,
					isActive: true,
				}));

				// showInfoIcon &&
				// 	presentConnectPagesCardInfoPopover({
				// 		_event: event as Event,
				// 		_cssClass: 'zaions_workspaces_card_popover_size',
				// 		_dismissOnSelect: false,
				// 	});
			}}
			onMouseLeave={() => {
				setCompState((oldValues) => ({
					...oldValues,
					isActive: false,
				}));
			}}
			color={compState.isActive ? 'primary' : undefined}
		>
			<ZIonCardContent className='py-3 ion-text-center relative ion-justify-content-center h-full flex flex-col ion-align-items-center ion-justify-content-center'>
				{/*  */}
				{showInfoIcon && (
					<div
						className='absolute flex w-full top-1 start-0 zaions__cursor_pointer ps-2'
						onClick={(event: unknown) => {
							presentConnectPagesCardInfoPopover({
								_event: event as Event,
								_cssClass: 'zaions_workspaces_card_popover_size',
								_dismissOnSelect: false,
							});
						}}
					>
						<ZIonIcon
							icon={alertCircleOutline}
							className='w-7 h-7'
							color={compState.isActive ? 'light' : 'dark'}
						/>
					</div>
				)}

				{/*  */}
				<ZIonIcon icon={icon} className='w-10 h-10 mb-2' />

				{/*  */}
				<ZIonText
					className='block mt-1 text-base font-bold ion-text-center'
					color={compState.isActive ? 'light' : 'dark'}
				>
					{title}
				</ZIonText>
			</ZIonCardContent>
		</ZIonCard>
	);
};
