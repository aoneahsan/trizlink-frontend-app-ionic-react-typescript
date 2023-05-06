/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { ellipsisHorizontalOutline, starOutline } from 'ionicons/icons';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonCard,
	ZIonCardContent,
	ZIonCardHeader,
	ZIonCol,
	ZIonIcon,
	ZIonImg,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import ZUserInfoPopover from '@/components/InPageComponents/ZaionsPopovers/UserInfoPopover';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';

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
import classes from './styles.module.css';

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */
interface ZWorkspacesCardInterface {
	workspaceName: string;
	workspacePagesCount: string;
	userAvatar: string;
	lastActive: string;
	workspaceAvatar?: string;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZWorkspacesCard: React.FC<ZWorkspacesCardInterface> = ({
	workspaceAvatar,
	workspaceName,
	workspacePagesCount,
	userAvatar,
	lastActive,
}) => {
	// Custom Hooks
	const { presentZIonPopover: presentUserInfoPopover } = useZIonPopover(
		ZUserInfoPopover,
		{ showBadges: true }
	); // popover hook to show UserInfoPopover

	return (
		<ZIonCard className='zaions__cursor_pointer'>
			<ZIonCardHeader>
				<ZIonRow className='ion-align-items-center'>
					<ZIonCol className='d-flex gap-3 ion-align-items-center'>
						<div
							className={classNames({
								'zaions__w50px zaions__h50px rounded overflow__hidden': true,
								'd-flex ion-align-items-center ion-justify-content-center zaions__primary_bg':
									!workspaceAvatar,
							})}
						>
							{workspaceAvatar && (
								<ZIonImg
									src={workspaceAvatar}
									className='rounded overflow__hidden'
								/>
							)}
							{!workspaceAvatar && (
								<ZIonText color='light' className='fs-4'>
									{workspaceName.charAt(0)}
								</ZIonText>
							)}
						</div>
						<div>
							<ZIonText className='fw-bold d-block fs-6' color='dark'>
								{workspaceName}
							</ZIonText>
							<ZIonText className='d-block zaions__fs_11'>
								{workspacePagesCount} pages
							</ZIonText>
						</div>
					</ZIonCol>

					{/* Add to Favorites button col */}
					<ZIonCol className='ion-text-end me-2'>
						<ZIonButton
							fill='clear'
							className='ion-no-padding ion-no-margin h-auto mb-1'
						>
							<ZIonIcon icon={starOutline} />
						</ZIonButton>
					</ZIonCol>
				</ZIonRow>
			</ZIonCardHeader>

			{/* Card body */}
			<ZIonCardContent>
				<ZIonRow>
					<ZIonCol>
						<ZIonButton
							color='primary'
							fill='solid'
							className={classNames(classes['workspace-user-avatar-button'], {
								'position-relative': true,
							})}
							onMouseEnter={(event: unknown) => {
								presentUserInfoPopover({
									_event: event as Event,
									_cssClass: 'zaions_user_info_popover_size',
								});
							}}
							onClick={(event: unknown) => {
								presentUserInfoPopover({
									_event: event as Event,
									_cssClass: 'zaions_user_info_popover_size',
								});
							}}
						>
							{/* MT */}
							<ZIonImg
								src={userAvatar}
								className='w-100 h-100 zaions-object-fit-cover'
							/>
						</ZIonButton>
					</ZIonCol>
				</ZIonRow>

				{/* Bottom row */}
				<ZIonRow className='mt-5 mx-2'>
					{/* Last active */}
					<ZIonCol>
						<ZIonButton
							fill='clear'
							className='ion-no-padding ion-no-margin h-auto mb-1 text-transform-initial'
							color='dark'
						>
							{lastActive}
						</ZIonButton>
					</ZIonCol>

					{/* actions popover button */}
					<ZIonCol className='ion-text-end'>
						<ZIonButton
							fill='clear'
							className='ion-no-padding ion-no-margin h-auto mb-1 text-transform-initial'
							color='dark'
						>
							<ZIonIcon icon={ellipsisHorizontalOutline} />
						</ZIonButton>
					</ZIonCol>
				</ZIonRow>
			</ZIonCardContent>
		</ZIonCard>
	);
};

export default ZWorkspacesCard;
