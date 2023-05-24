/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import { ProductLogo } from '@/assets/images';
import ZUserAvatarButton from '@/components/WorkspacesComponents/UserButton';
import {
	ZIonAvatar,
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonHeader,
	ZIonIcon,
	ZIonImg,
	ZIonItem,
	ZIonLabel,
	ZIonList,
	ZIonRow,
	ZIonSegment,
	ZIonSegmentButton,
	ZIonText,
} from '@/components/ZIonComponents';
import ZIonToolbar from '@/components/ZIonComponents/ZIonToolbar';
import { workspaceViewNotificationsEnum } from '@/types/AdminPanel/workspace';
import { getUiAvatarApiUrl } from '@/utils/helpers/apiHelpers';
import { Formik } from 'formik';
import {
	fileTrayFullOutline,
	listOutline,
	logoFacebook,
	settingsOutline,
} from 'ionicons/icons';
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

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

const ZWorkspaceNotificationPopover: React.FC = () => {
	return (
		<Formik
			initialValues={{
				currentTab: workspaceViewNotificationsEnum.approvalRequests,
			}}
			onSubmit={() => {}}
		>
			{({ values, setFieldValue }) => {
				return (
					<>
						<ZIonHeader>
							<ZIonToolbar>
								<ZIonRow className='ion-align-items-center'>
									<ZIonCol className='py-0'>
										<ZIonSegment
											value={values.currentTab}
											scrollable
											className='w-2/4'
										>
											<ZIonSegmentButton
												value={workspaceViewNotificationsEnum.approvalRequests}
												className='text-transform-initial ion-no-padding ion-no-margin'
												onClick={() => {
													setFieldValue(
														'currentTab',
														workspaceViewNotificationsEnum.approvalRequests,
														false
													);
												}}
											>
												Approval requests
											</ZIonSegmentButton>

											<ZIonSegmentButton
												value={workspaceViewNotificationsEnum.updates}
												className='text-transform-initial ion-no-padding ion-no-margin'
												onClick={() => {
													setFieldValue(
														'currentTab',
														workspaceViewNotificationsEnum.updates,
														false
													);
												}}
											>
												Updates
											</ZIonSegmentButton>
										</ZIonSegment>
									</ZIonCol>

									<ZIonCol size='max-content' className='py-0'>
										<ZIonButton fill='clear' color='dark'>
											<ZIonIcon icon={listOutline} />
										</ZIonButton>

										<ZIonButton fill='clear' color='dark'>
											<ZIonIcon icon={settingsOutline} />
										</ZIonButton>
									</ZIonCol>
								</ZIonRow>
							</ZIonToolbar>
						</ZIonHeader>

						<ZIonContent>
							{values.currentTab === workspaceViewNotificationsEnum.updates ? (
								<UpdatesTab />
							) : values.currentTab ===
							  workspaceViewNotificationsEnum.approvalRequests ? (
								<ApprovalRequests />
							) : (
								''
							)}
						</ZIonContent>
					</>
				);
			}}
		</Formik>
	);
};

// Updates Tab
const UpdatesTab = () => {
	return (
		<ZIonList lines='none' className='my-2'>
			<ZIonItem
				minHeight='32px'
				className='ion-activatable ion-focusable zaions__cursor_pointer text-sm'
			>
				<ZIonRow className='ion-align-items-start w-full'>
					<ZIonCol size='max-content'>
						<ZUserAvatarButton
							className='w-[10px] h-[10px] me-1'
							userAvatar={ProductLogo}
							style={{ height: '39px', width: '39px' }}
						/>
					</ZIonCol>

					<ZIonCol>
						<div className='flex ion-justify-content-between ion-align-items-center'>
							<ZIonText className='text-sm w-3/4'>
								A post has been published on Facebook page zaions A post has
								been published on Facebook page zaions
							</ZIonText>
							<ZIonText className='text-xs w-1/4 ion-text-end' color='medium'>
								8 hours ago
							</ZIonText>
						</div>

						<div className='border p-1 rounded flex mt-3'>
							<div className='w-2/4 flex ion-align-items-center'>
								<ZIonAvatar
									style={{
										'--border-radius': '4px',
										width: '48px',
										height: '32px',
									}}
								>
									<ZIonImg src={getUiAvatarApiUrl({})} />
								</ZIonAvatar>
								<ZIonLabel className='ms-2'>
									<ZIonText className='text-xs'>
										AI, or Artificial Intelligence, refers to the development...
									</ZIonText>
								</ZIonLabel>
							</div>

							{/*  */}
							<div className='w-1/4 flex ps-3 ion-align-items-center'>
								<ZIonIcon icon={logoFacebook} className='me-1' />
								<ZIonText className='text-xs'>zaions</ZIonText>
							</div>

							{/*  */}
							<div className='w-1/4 ion-text-end pt-1'>
								<ZIonText
									className='text-xs w-1/4 ion-text-end pe-2'
									color='medium'
								>
									8 hours ago
								</ZIonText>
							</div>
						</div>
					</ZIonCol>
				</ZIonRow>
			</ZIonItem>
		</ZIonList>
	);
};

// Approval Requests Tab
const ApprovalRequests = () => {
	return (
		<>
			<div className='flex ion-align-items-center flex-col ion-justify-content-center py-5'>
				<ZIonIcon icon={fileTrayFullOutline} color='medium' size='large' />
				<ZIonText color='medium' className='text-sm mt-2'>
					There are currently no posts awaiting your approval.
				</ZIonText>
			</div>
		</>
	);
};

export default ZWorkspaceNotificationPopover;
