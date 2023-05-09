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
	ZIonBadge,
	ZIonCard,
	ZIonCardContent,
	ZIonCol,
	ZIonGrid,
	ZIonIcon,
	ZIonImg,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import {
	checkmarkCircleOutline,
	checkmarkDoneCircleOutline,
	ellipseOutline,
	lockClosedOutline,
	shieldCheckmarkOutline,
	starOutline,
	timeOutline,
} from 'ionicons/icons';
import { ProductLogo } from '@/assets/images';
import ZUserAvatarInfo from '@/components/WorkspacesComponents/userButton';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';

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

const ZApprovalTab: React.FC = () => {
	return (
		<ZIonGrid>
			{/* Cards */}
			<ZIonRow className='px-4'>
				<ZIonCol>
					<ZIonCard>
						<ZIonCardContent>
							<ZIonIcon icon={ellipseOutline} className='w-8 h-8' />
							<ZIonText className='mt-2 d-block fs-5' color='dark'>
								None
							</ZIonText>
							<ZIonText className='d-block'>
								Approvals are disabled and not needed for publishing
							</ZIonText>
						</ZIonCardContent>
					</ZIonCard>
				</ZIonCol>

				<ZIonCol>
					<ZIonCard>
						<ZIonCardContent>
							<ZIonIcon icon={checkmarkCircleOutline} className='w-8 h-8' />
							<ZIonText className='mt-2 d-block fs-5' color='dark'>
								Optional
							</ZIonText>
							<ZIonText className='d-block'>
								Approvals are enabled, but not required for publishing
							</ZIonText>
						</ZIonCardContent>
					</ZIonCard>
				</ZIonCol>

				<ZIonCol>
					<ZIonCard>
						<ZIonCardContent>
							<ZIonIcon icon={checkmarkDoneCircleOutline} className='w-8 h-8' />
							<ZIonText
								className='mt-2 d-flex ion-align-items-center gap-2 fs-5'
								color='dark'
							>
								Required{' '}
								<ZIonBadge className='d-flex ion-align-items-center gap-1'>
									<ZIonIcon icon={starOutline} />{' '}
									<ZIonText className='pt-1'>Pro</ZIonText>
								</ZIonBadge>
							</ZIonText>
							<ZIonText className='d-block'>
								A member has to approve the content before publishing
							</ZIonText>
						</ZIonCardContent>
					</ZIonCard>
				</ZIonCol>

				<ZIonCol>
					<ZIonCard>
						<ZIonCardContent>
							<ZIonIcon icon={shieldCheckmarkOutline} className='w-8 h-8' />
							<ZIonText
								className='mt-2 d-flex ion-align-items-center gap-2 fs-5'
								color='dark'
							>
								Multi-level{' '}
								<ZIonBadge
									className='d-flex ion-align-items-center gap-1'
									color='warning'
								>
									<ZIonIcon icon={starOutline} color='light' />{' '}
									<ZIonText className='pt-1' color='light'>
										ENT
									</ZIonText>
								</ZIonBadge>
							</ZIonText>
							<ZIonText className='d-block'>
								2+ members need to approve content before publishing
							</ZIonText>
						</ZIonCardContent>
					</ZIonCard>
				</ZIonCol>
			</ZIonRow>

			{/*  */}
			<ZIonRow className='ion-justify-content-center mt-4'>
				<ZIonCol size='5'>
					<ZIonText className='d-block fs-4'>Who can approve content?</ZIonText>
					<ZIonRow>
						<ZIonCol
							className='d-flex ion-align-items-center gap-2 ps-0'
							size='10'
						>
							<ZUserAvatarInfo />
							<div>
								<ZIonText className='d-flex ion-align-items-center gap-1'>
									Muhammad talha Irshad (you) <ZIonBadge>Team</ZIonBadge>
								</ZIonText>
								<ZIonText className='d-block zaions__fs_14'>
									talhaarshaad5@gmail.com
								</ZIonText>
							</div>
						</ZIonCol>
						<ZIonCol className='ion-text-end'>
							<ZRCSwitch />
						</ZIonCol>
					</ZIonRow>

					{/* Schedule posts approval */}
					<ZIonRow className='mt-3 ion-align-items-center'>
						<ZIonCol
							className='d-flex ion-align-items-center gap-2 ps-0'
							size='10'
						>
							<ZIonText className='d-flex ion-align-items-center gap-1 fs-5'>
								<ZIonIcon icon={timeOutline} size='large' /> Schedule posts
								automatically on approval
							</ZIonText>
						</ZIonCol>
						<ZIonCol className='ion-text-end'>
							<ZRCSwitch />
						</ZIonCol>
					</ZIonRow>

					{/* Lock content approval */}
					<ZIonRow className='mt-3 ion-align-items-center'>
						<ZIonCol
							className='d-flex ion-align-items-center gap-2 ps-0'
							size='10'
						>
							<ZIonText className='d-flex ion-align-items-center gap-1 fs-5'>
								<ZIonIcon icon={lockClosedOutline} size='large' /> Lock content
								after approval
							</ZIonText>
						</ZIonCol>
						<ZIonCol className='ion-text-end'>
							<ZRCSwitch />
						</ZIonCol>
					</ZIonRow>
				</ZIonCol>
			</ZIonRow>
		</ZIonGrid>
	);
};

export default ZApprovalTab;
