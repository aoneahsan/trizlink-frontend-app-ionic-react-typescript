/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { Formik } from 'formik';
import {
	checkmark,
	ellipsisHorizontalOutline,
	gridOutline,
	menuOutline,
	openOutline,
	pencil,
} from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZWorkspacePostDetailModal from '@/components/InPageComponents/ZaionsModals/Workspace/PostDetail';
import ZWorkspacePostActionsPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/PostActionsPopover';
import {
	ZIonBadge,
	ZIonButton,
	ZIonButtons,
	ZIonCol,
	ZIonGrid,
	ZIonIcon,
	ZIonImg,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZIonModal, useZIonPopover } from '@/ZaionsHooks/zionic-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { getPlatformIcon } from '@/utils/helpers';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	workspaceFormConnectPagesEnum,
	workspacePostDetailTabEnum,
} from '@/types/AdminPanel/workspace';

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
import {
	gifIcon,
	imageIcon,
	mediaIcon,
	ProductLogo,
	thumbnailIcon,
} from '@/assets/images';
import ZWorkspaceSingleComment from '@/components/WorkspacesComponents/SingleComment';
import ZWorkspaceCommentBox from '@/components/WorkspacesComponents/CommentBox';
import ZWorkspaceSinglePost from '../SinglePost';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZWorkspacePostsLayout: React.FC<{
	pageType?: workspaceFormConnectPagesEnum;
}> = ({ pageType }) => {
	const { presentZIonPopover: presentWorkspacePostActionsPopover } =
		useZIonPopover(ZWorkspacePostActionsPopover);

	const { presentZIonModal: presentWorkspacePostDetailModal } = useZIonModal(
		ZWorkspacePostDetailModal
	);

	return (
		<ZIonGrid>
			<Formik
				initialValues={{
					showCommentBox: false,
				}}
				onSubmit={() => {}}
			>
				{({ values, setFieldValue }) => {
					return (
						<>
							<ZIonRow className='mt-2'>
								{/* Approved (Checkmark) button & Published (Platform) button */}
								<ZIonCol size='max-content' className='flex flex-col'>
									<ZIonButton
										fill='clear'
										className='rounded-full overflow-hidden ion-no-padding w-[40px] h-[40px] zaions__bg_white'
										size='small'
										style={{
											boxShadow:
												'0 2px 4px rgba(0,0,0,.08), 0 0 1px rgba(50,79,58,.1)',
										}}
									>
										<ZIonIcon
											icon={checkmark}
											color='dark'
											className='w-6 h-6'
										/>
									</ZIonButton>

									<ZIonButton
										fill='clear'
										className='rounded-full overflow-hidden ion-no-padding w-[40px] h-[40px] zaions__bg_white mt-2'
										size='small'
										style={{
											boxShadow:
												'0 2px 4px rgba(0,0,0,.08), 0 0 1px rgba(50,79,58,.1)',
										}}
									>
										<ZIonIcon
											icon={
												(pageType && getPlatformIcon(pageType)) || gridOutline
											}
											color='dark'
											className='w-6 h-6'
										/>
									</ZIonButton>
								</ZIonCol>

								{/* Posts col */}
								<ZIonCol
									size='6'
									className={classNames({
										'zaions__bg_white rounded ': true,

										// Checking if the pageType is one of this type blow then show border in post. px-2 py-1
										border:
											pageType &&
											[
												workspaceFormConnectPagesEnum.facebook,
												workspaceFormConnectPagesEnum.linkedin,
												workspaceFormConnectPagesEnum.pinterest,
												workspaceFormConnectPagesEnum.youtube,
												workspaceFormConnectPagesEnum.twitter,
												workspaceFormConnectPagesEnum.googleBusiness,
												workspaceFormConnectPagesEnum.universalContent,
											].includes(pageType),

										// Checking if the pageType is instagram then show border-top in post.
										'border-b-[1px]':
											pageType === workspaceFormConnectPagesEnum.instagram,

										// Checking if the pageType is tiktok then show border in bottom of post.
										'border-t-[1px] pt-3':
											pageType === workspaceFormConnectPagesEnum.tiktok,
									})}
								>
									{/* Top bar. avatar, name & View post activity button & post action popover button */}
									{/* <ZIonRow className='ion-align-items-start'> */}
									{/* <ZIonCol
											className={classNames({
												flex: true,
												'ion-align-items-center':
													pageType &&
													[
														workspaceFormConnectPagesEnum.facebook,
														workspaceFormConnectPagesEnum.linkedin,
														workspaceFormConnectPagesEnum.pinterest,
														workspaceFormConnectPagesEnum.youtube,
														workspaceFormConnectPagesEnum.googleBusiness,
														workspaceFormConnectPagesEnum.universalContent,
														workspaceFormConnectPagesEnum.instagram,
													].includes(pageType),
												'ion-align-items-start':
													pageType === workspaceFormConnectPagesEnum.tiktok ||
													pageType === workspaceFormConnectPagesEnum.twitter,
											})}
											size='7'
										>
											<ZIonImg
												src={ProductLogo}
												className={classNames({
													'w-12 h-12': true,
													'rounded-full overflow-hidden':
														pageType ===
															workspaceFormConnectPagesEnum.facebook ||
														pageType === workspaceFormConnectPagesEnum.tiktok ||
														pageType === workspaceFormConnectPagesEnum.twitter,
												})}
											/>
											<div
												className={classNames({
													'ms-2': true,
													'flex ion-align-items-start':
														pageType === workspaceFormConnectPagesEnum.twitter,
												})}
											>
												<ZIonText
													className={classNames({
														'font-bold': true,
														block:
															pageType &&
															[
																workspaceFormConnectPagesEnum.facebook,
																workspaceFormConnectPagesEnum.linkedin,
																workspaceFormConnectPagesEnum.pinterest,
																workspaceFormConnectPagesEnum.youtube,
																workspaceFormConnectPagesEnum.googleBusiness,
																workspaceFormConnectPagesEnum.universalContent,
																workspaceFormConnectPagesEnum.instagram,
															].includes(pageType),
														'inline-block':
															pageType ===
																workspaceFormConnectPagesEnum.tiktok ||
															pageType ===
																workspaceFormConnectPagesEnum.twitter,
														'flex ion-align-items-center':
															pageType ===
															workspaceFormConnectPagesEnum.twitter,
													})}
												>
													Zaions
													{/* If pageType is tiktok then show this Badge * /}
													{pageType ===
														workspaceFormConnectPagesEnum.tiktok && (
														<ZIonBadge color='light'>tiktok</ZIonBadge>
													)}
													{/* If pageType is twitter then show this text * /}
													{pageType ===
														workspaceFormConnectPagesEnum.twitter && (
														<ZIonText color='medium' className='ms-1 text-sm'>
															@zaions
														</ZIonText>
													)}
												</ZIonText>

												<ZIonText
													className={classNames({
														'text-sm': true,
														block:
															pageType &&
															[
																workspaceFormConnectPagesEnum.facebook,
																workspaceFormConnectPagesEnum.linkedin,
																workspaceFormConnectPagesEnum.pinterest,
																workspaceFormConnectPagesEnum.youtube,
																workspaceFormConnectPagesEnum.googleBusiness,
																workspaceFormConnectPagesEnum.universalContent,
																workspaceFormConnectPagesEnum.instagram,
															].includes(pageType),
														'ms-2 inline-block':
															pageType ===
																workspaceFormConnectPagesEnum.tiktok ||
															pageType ===
																workspaceFormConnectPagesEnum.twitter,
													})}
													color='medium'
												>
													Select data & time
												</ZIonText>
											</div>
										</ZIonCol> */}

									{/* <ZIonCol className='ion-text-end'>
											<ZIonButton
												fill='default'
												className='ion-no-padding ion-no-margin me-2'
												onClick={() => {
													presentWorkspacePostDetailModal({
														_cssClass: 'workspace-post-detail-modal-size',
													});
												}}
											>
												<ZIonIcon icon={openOutline} />
											</ZIonButton>

											{/*  * /}
											<ZIonButton
												fill='default'
												className='ion-no-padding ion-no-margin'
												onClick={(event: unknown) => {
													presentWorkspacePostActionsPopover({
														_event: event as Event,
														_cssClass:
															'zaions_workspaces_import_export_popover_size',
														_dismissOnSelect: false,
													});
												}}
											>
												<ZIonIcon icon={ellipsisHorizontalOutline} />
											</ZIonButton>
										</ZIonCol> */}
									{/* </ZIonRow> */}

									{/* Message */}
									{/* <ZIonRow
										className={classNames({
											'w-[90%] ms-auto':
												pageType === workspaceFormConnectPagesEnum.tiktok ||
												pageType === workspaceFormConnectPagesEnum.twitter,
										})}
									>
										<ZIonCol
											className={classNames({
												'mt-[-1.5rem] ms-2':
													pageType === workspaceFormConnectPagesEnum.tiktok,
												'mt-[-2rem] ms-2':
													pageType === workspaceFormConnectPagesEnum.twitter,
											})}
										>
											<ZIonText className='text-sm'>
												There are several ways to make money with Facebook
												without exceeding the limit of 150 words. One way is to
												become an affiliate marketer and promote products on
												Facebook. Another way is to create and sell your own
												products or services on Facebook. You can also earn
												money by creating and selling Facebook apps or by
												offering social media management services to businesses.
												Additionally, you can earn money through Facebook ads by
												creating and running targeted ad campaigns for
												businesses. Finally, you can also earn money by joining
												Facebook groups and participating in paid surveys or by
												becoming a social media influencer and partnering with
												brands for sponsored posts.
											</ZIonText>
										</ZIonCol>
									</ZIonRow> */}

									{/* Rewrite with AI & Continue buttons */}
									{/* <ZIonRow>
										<ZIonCol size='12'>
											<ZIonButton
												className='text-transform-initial'
												size='small'
											>
												<ZIonIcon icon={pencil} className='me-2' /> Rewrite with
												AI
											</ZIonButton>

											<ZIonButton
												className='text-transform-initial'
												size='small'
											>
												<ZIonIcon icon={menuOutline} className='me-2' />
												Continue
											</ZIonButton>
										</ZIonCol>

										<ZIonCol size='12' className='mt-2'>
											<ZIonButtons>
												<ZIonButton className='m-0'>
													<ZIonImg src={imageIcon} />
												</ZIonButton>
												<ZIonButton className='m-0'>
													<ZIonImg src={gifIcon} />
												</ZIonButton>
												<ZIonButton className='m-0'>
													<ZIonImg src={mediaIcon} />
												</ZIonButton>
												<ZIonButton className='m-0'>
													<ZIonImg src={thumbnailIcon} />
												</ZIonButton>
											</ZIonButtons>
										</ZIonCol>
									</ZIonRow> */}
									<ZWorkspaceSinglePost
										className='shadow-none m-0'
										type={workspacePostDetailTabEnum.desktop}
										pageType={pageType}
									/>
								</ZIonCol>

								{/* Comments col */}
								<ZIonCol
									size='5.2'
									className='zaions__bg_white rounded border ion-no-padding ms-auto zaions_comment_box relative max-h-[412px] h-auto min-h-[150px]'
								>
									<div className='h-full relative'>
										{/* comment box pointer */}
										<div className='absolute bg-white h-[10px] left-[-5px] top-[16px] w-[10px] rotate-45'></div>

										<div className='overflow-y-scroll h-full  px-2 py-1 zaions_pretty_scrollbar'>
											{/* Single comment */}
											{[1].map((el) => (
												<ZWorkspaceSingleComment key={el} />
											))}

											{/* Comment box */}
											<ZWorkspaceCommentBox className='border-t rounded px-2 py-2 sticky mt-2 bottom-0' />
										</div>
									</div>
								</ZIonCol>
							</ZIonRow>

							{/* end col */}
							<ZIonRow>
								<ZIonCol className='ion-text-center py-14'>
									<ZIonText color='medium' className='text-sm'>
										No more posts.
									</ZIonText>
								</ZIonCol>
							</ZIonRow>
						</>
					);
				}}
			</Formik>
		</ZIonGrid>
	);
};

export default ZWorkspacePostsLayout;
