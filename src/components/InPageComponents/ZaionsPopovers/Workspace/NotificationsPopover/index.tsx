/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { Formik } from 'formik';
import {
	fileTrayFullOutline,
	listOutline,
	logoFacebook,
	settingsOutline,
} from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZUserAvatarButton from '@/components/WorkspacesComponents/UserButton';
import {
	ZIonAvatar,
	ZIonButton,
	ZIonCol,
	ZIonContent,
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

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { getUiAvatarApiUrl } from '@/utils/helpers/apiHelpers';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { workspaceViewNotificationsEnum } from '@/types/AdminPanel/workspace';

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
import { ProductLogo } from '@/assets/images';

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
												className='normal-case ion-no-padding ion-no-margin'
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
												className='normal-case ion-no-padding ion-no-margin'
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
				className='text-sm cursor-pointer ion-activatable ion-focusable'
			>
				<ZIonRow className='w-full ion-align-items-start'>
					<ZIonCol size='max-content'>
						<ZUserAvatarButton
							className='w-[10px] h-[10px] me-1'
							userAvatar={ProductLogo}
							style={{ height: '39px', width: '39px' }}
						/>
					</ZIonCol>

					<ZIonCol>
						<div className='flex ion-justify-content-between ion-align-items-center'>
							<ZIonText className='w-3/4 text-sm'>
								A post has been published on Facebook page zaions A post has
								been published on Facebook page zaions
							</ZIonText>
							<ZIonText className='w-1/4 text-xs ion-text-end' color='medium'>
								8 hours ago
							</ZIonText>
						</div>

						<div className='flex p-1 mt-3 border rounded'>
							<div className='flex w-2/4 ion-align-items-center'>
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
							<div className='flex w-1/4 ps-3 ion-align-items-center'>
								<ZIonIcon icon={logoFacebook} className='me-1' />
								<ZIonText className='text-xs'>zaions</ZIonText>
							</div>

							{/*  */}
							<div className='w-1/4 pt-1 ion-text-end'>
								<ZIonText
									className='w-1/4 text-xs ion-text-end pe-2'
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
			<div className='flex flex-col py-5 ion-align-items-center ion-justify-content-center'>
				<ZIonIcon icon={fileTrayFullOutline} color='medium' size='large' />
				<ZIonText color='medium' className='mt-2 text-sm'>
					There are currently no posts awaiting your approval.
				</ZIonText>
			</div>
		</>
	);
};

export default ZWorkspaceNotificationPopover;
