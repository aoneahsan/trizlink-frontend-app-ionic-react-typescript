/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import ZUserAvatarButton from '@/components/WorkspacesComponents/UserButton';
import {
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonHeader,
	ZIonIcon,
	ZIonLabel,
	ZIonRow,
	ZIonSegment,
	ZIonSegmentButton,
	ZIonSkeletonText,
	ZIonText,
} from '@/components/ZIonComponents';
import {
	IZNotification,
	ZNotificationEnum,
} from '@/types/AdminPanel/index.type';
import CONSTANTS from '@/utils/constants';
import { API_URL_ENUM } from '@/utils/enums';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { Formik } from 'formik';
import {
	fileTrayStackedOutline,
	listCircleOutline,
	logoFacebook,
	personAdd,
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
enum ZNotificationPopoverTabsEnum {
	approvals = 'approvals',
	updates = 'updates',
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZNotificationPopover: React.FC<{ workspaceId: string }> = ({
	workspaceId,
}) => {
	return (
		<Formik
			initialValues={{
				tab: ZNotificationPopoverTabsEnum.approvals,
			}}
			onSubmit={() => {}}
		>
			{({ values, setFieldValue }) => {
				return (
					<>
						{/* Header */}
						<ZIonHeader className='px-1 pt-1'>
							{/* Header Row */}
							<ZIonRow className='ion-no-padding'>
								{/* Col-1 Segment  */}
								<ZIonCol className='ion-no-padding' size='7'>
									<ZIonSegment
										value={values.tab}
										style={{ gridAutoColumns: '1fr' }}
									>
										{/* Approval requests */}
										<ZIonSegmentButton
											className='normal-case w-max'
											value={ZNotificationPopoverTabsEnum.approvals}
											testingSelector={
												CONSTANTS.testingSelectors.topBar.notificationPopover
													.tabs.approvalRequests
											}
											onClick={() => {
												setFieldValue(
													'tab',
													ZNotificationPopoverTabsEnum.approvals,
													false
												);
											}}
											style={{
												'--padding-end': '5px',
												'--padding-start': '5px',
											}}
										>
											<ZIonLabel className='text-sm'>
												Approval requests
											</ZIonLabel>
										</ZIonSegmentButton>

										{/* Updates */}
										<ZIonSegmentButton
											className='normal-case w-max min-w-[80px]'
											value={ZNotificationPopoverTabsEnum.updates}
											testingSelector={
												CONSTANTS.testingSelectors.topBar.notificationPopover
													.tabs.updates
											}
											onClick={() => {
												setFieldValue(
													'tab',
													ZNotificationPopoverTabsEnum.updates,
													false
												);
											}}
											style={{
												'--padding-end': '5px',
												'--padding-start': '5px',
											}}
										>
											<ZIonLabel className='text-sm'>Updates</ZIonLabel>
										</ZIonSegmentButton>
									</ZIonSegment>
								</ZIonCol>

								{/* Col-2 */}
								<ZIonCol className='flex gap-2 ion-no-padding ion-align-items-center ion-justify-content-end me-2'>
									{/* Mark all as read btn */}
									{values.tab === ZNotificationPopoverTabsEnum.updates ? (
										<ZIonButton
											fill='clear'
											size='small'
											color='medium'
											className='ion-no-margin ion-no-padding'
											id='z-mark-all-as-read-btn'
											testingSelector={
												CONSTANTS.testingSelectors.topBar.notificationPopover
													.markAllAsReadBtn
											}
										>
											<ZIonIcon icon={listCircleOutline} className='w-6 h-6' />
										</ZIonButton>
									) : null}
									<ZRTooltip
										anchorSelect='#z-mark-all-as-read-btn'
										place='left'
										content='Mark all as read'
									/>

									{/* Settings btn */}
									<ZIonButton
										fill='clear'
										size='small'
										color='medium'
										className='ion-no-margin ion-no-padding'
										id='z-wnp-settings-btn'
										testingSelector={
											CONSTANTS.testingSelectors.topBar.notificationPopover
												.settingsBtn
										}
									>
										<ZIonIcon icon={settingsOutline} className='w-5 h-5' />
									</ZIonButton>
									<ZRTooltip
										anchorSelect='#z-wnp-settings-btn'
										place='bottom'
										content='Notification settings'
									/>
								</ZIonCol>
							</ZIonRow>
						</ZIonHeader>

						{/* Content */}
						<ZIonContent className='h-full'>
							<ZIonGrid className='h-full'>
								{values.tab === ZNotificationPopoverTabsEnum.approvals ? (
									<ZApprovalsTab />
								) : values.tab === ZNotificationPopoverTabsEnum.updates ? (
									<ZUpdatesTab workspaceId={workspaceId} />
								) : null}
							</ZIonGrid>
						</ZIonContent>
					</>
				);
			}}
		</Formik>
	);
};

// Approvals tab.
const ZApprovalsTab: React.FC = () => {
	return (
		<>
			<div className='flex flex-col w-full gap-2 py-7 ion-align-items-center ion-justify-content-center'>
				<ZIonIcon
					icon={fileTrayStackedOutline}
					color='medium'
					className='w-8 h-8'
				/>

				<ZIonText color='medium'>
					There are currently no posts awaiting your approval.
				</ZIonText>
			</div>
		</>
	);
};

// Update tab.
const ZUpdatesTab: React.FC<{ workspaceId: string }> = ({ workspaceId }) => {
	const {
		data: userInvitationNotificationsData,
		isFetching: isNotificationsFetching,
	} = useZRQGetRequest<IZNotification[]>({
		_url: API_URL_ENUM.user_unread_notifications_list,
		_key: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.NOTIFICATION.MAIN,
			workspaceId,
		],
		_showLoader: false,
		_checkPermissions: false,
		_itemsIds: [ZNotificationEnum.wsTeamMemberInvitation],
		_urlDynamicParts: [CONSTANTS.RouteParams.user.notification.type],
	});

	console.log({ userInvitationNotificationsData });

	if (isNotificationsFetching) {
		return <ZUpdatesTabSkeleton />;
	}

	return (
		<ZCustomScrollable className='h-full pb-10 mb-2' scrollY={true}>
			{userInvitationNotificationsData?.map((el, index) => (
				<ZIonRow
					className='pb-2 border-b cursor-pointer'
					key={index}
					testingSelector={
						CONSTANTS.testingSelectors.topBar.notificationPopover
							.singleNotification
					}
					testingListSelector={`${CONSTANTS.testingSelectors.topBar.notificationPopover.singleNotification}-${el?.id}`}
				>
					{/*  */}
					<ZIonCol size='1.5'>
						<ZUserAvatarButton
							className='w-[44px!important] h-[44px!important]'
							showStatus={true}
							statusIconColor='light'
							statusIcon={personAdd}
							statusIconPosition='bottom'
						/>
					</ZIonCol>

					{/*  */}
					<ZIonCol>
						<div className='flex w-full ion-align-items-top ion-justify-content-between'>
							<div className='overflow-hidden line-clamp-2 leading-none w-[85%]'>
								<ZIonText className='text-sm' color='medium'>
									{el?.data?.item?.message}
								</ZIonText>
							</div>

							<div className='w-[15%]'>
								<ZIonText className='text-sm' color='medium'>
									3 month
								</ZIonText>
							</div>
						</div>

						<div className='flex p-[3px] ion-align-items-center border rounded-md mt-2'>
							<div className='w-[36px] h-[36px] zaions__light_bg rounded-sm me-2'></div>

							<div className='w-[40%!important] me-1 overflow-hidden line-clamp-2 leading-none'>
								<ZIonText className='text-xs'>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Dignissimos assumenda ex dolor non maiores sequi tempore
									perspiciatis tenetur temporibus, dolores illo, inventore
									repellendus quas voluptas doloremque ratione consequuntur quis
									iure!
								</ZIonText>
							</div>

							<div className='flex ion-align-items-center ion-justify-content-between w-[47%]'>
								<div className='flex ion-align-items-center'>
									<ZIonIcon icon={logoFacebook} className='w-4 h-4' />
									<ZIonText className='text-xs mt-[1px] ms-1'>zaions</ZIonText>
								</div>

								<div className=''>
									<ZIonText className='text-xs' color='medium'>
										May 16, 11:44
									</ZIonText>
								</div>
							</div>
						</div>
					</ZIonCol>
				</ZIonRow>
			))}
		</ZCustomScrollable>
	);
};

const ZUpdatesTabSkeleton: React.FC = () => {
	return (
		<>
			{[...Array(3)].map((_, index) => {
				return (
					<ZIonRow className='pb-2 border-b cursor-pointer' key={index}>
						{/*  */}
						<ZIonCol size='1.5'>
							<ZIonSkeletonText
								className='rounded-full'
								width='44px'
								height='44px'
							/>
						</ZIonCol>

						{/*  */}
						<ZIonCol>
							<div className='flex w-full ion-align-items-top ion-justify-content-between'>
								<div className='w-[85%] me-2'>
									<ZIonText color='medium'>
										<ZIonSkeletonText width='100%' height='.8rem' />
									</ZIonText>
								</div>

								<div className='w-[15%]'>
									<ZIonText color='medium'>
										<ZIonSkeletonText width='100%' height='.8rem' />
									</ZIonText>
								</div>
							</div>

							{index === 1 && (
								<div className='flex p-[3px] ion-align-items-center border rounded-md mt-2'>
									<div className='w-[36px] h-[36px] zaions__light_bg rounded-sm me-2'></div>

									<div className='w-[40%!important] me-1 overflow-hidden line-clamp-2 leading-none'>
										<ZIonText className='text-xs'>
											<ZIonSkeletonText width='100%' height='1.4rem' />
										</ZIonText>
									</div>

									<div className='flex ion-align-items-center ion-justify-content-between w-[47%]'>
										<div className='flex ion-align-items-center'>
											<ZIonSkeletonText
												width='1rem'
												height='1rem'
												className='rounded-full'
											/>
											<ZIonText className='text-xs mt-[1px] ms-1'>
												<ZIonSkeletonText width='3rem' height='.8rem' />
											</ZIonText>
										</div>

										<div>
											<ZIonText className='text-xs' color='medium'>
												<ZIonSkeletonText width='5rem' height='.8rem' />
											</ZIonText>
										</div>
									</div>
								</div>
							)}
						</ZIonCol>
					</ZIonRow>
				);
			})}
		</>
	);
};

export default ZNotificationPopover;
