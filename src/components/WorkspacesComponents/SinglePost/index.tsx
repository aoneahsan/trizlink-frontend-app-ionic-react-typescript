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
import {
	chatbubbleOutline,
	ellipsisHorizontalOutline,
	filterCircleOutline,
	menuOutline,
	openOutline,
	pencil,
	tabletLandscapeOutline,
	todayOutline,
	videocamOutline,
} from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonBadge,
	ZIonButton,
	ZIonButtons,
	ZIonCard,
	ZIonCardContent,
	ZIonIcon,
	ZIonImg,
	ZIonText,
} from '@/components/ZIonComponents';
import ZUserAvatarButton from '@/components/WorkspacesComponents/UserButton';
import ZWorkspacePostActionsPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/PostActionsPopover';
import ZWorkspacePostDetailModal from '@/components/InPageComponents/ZaionsModals/Workspace/PostDetail';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZIonModal, useZIonPopover } from '@/ZaionsHooks/zionic-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

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
import { gifIcon, imageIcon, mediaIcon, thumbnailIcon } from '@/assets/images';
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */
interface ZWorkspaceSinglePostInterface {
	className?: string;
	type?: workspacePostDetailTabEnum;
	pageType?: workspaceFormConnectPagesEnum;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZWorkspaceSinglePost: React.FC<ZWorkspaceSinglePostInterface> = ({
	className,
	type,
	pageType,
}) => {
	const { isXlScale } = useZMediaQueryScale();

	const { presentZIonPopover: presentWorkspacePostActionsPopover } =
		useZIonPopover(ZWorkspacePostActionsPopover);

	const { presentZIonModal: presentWorkspacePostDetailModal } = useZIonModal(
		ZWorkspacePostDetailModal
	);

	return (
		<ZIonCard
			className={className}
			// className={classNames(className, {
			// 	'mx-auto': true,
			// 	'w-[90%]': isXlScale,
			// 	'w-full': !isXlScale,
			// })}
		>
			<ZIonCardContent>
				<div className='flex ion-align-items-center'>
					<ZUserAvatarButton
						className={classNames({
							'w-[30px!important] h-[30px!important]':
								type === workspacePostDetailTabEnum.mobile,
						})}
						style={{
							'--border-radius':
								pageType === workspaceFormConnectPagesEnum.linkedin && '4px',
						}}
					/>

					<div className='ms-2'>
						<ZIonText
							className={classNames({
								'font-bold': true,
								'text-xs': type === workspacePostDetailTabEnum.mobile,
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
									pageType === workspaceFormConnectPagesEnum.tiktok ||
									pageType === workspaceFormConnectPagesEnum.twitter,
								'flex ion-align-items-center':
									pageType === workspaceFormConnectPagesEnum.twitter,
							})}
							color='dark'
						>
							zaions
							{/* If pageType is tiktok then show this Badge */}
							{pageType === workspaceFormConnectPagesEnum.tiktok && (
								<ZIonBadge color='light'>tiktok</ZIonBadge>
							)}
							{/* If pageType is twitter then show this text */}
							{pageType === workspaceFormConnectPagesEnum.twitter && (
								<ZIonText color='medium' className='ms-1 text-sm'>
									@zaions
								</ZIonText>
							)}
						</ZIonText>

						<ZIonText
							className={classNames({
								'text-sm': true,
								'text-xs': type === workspacePostDetailTabEnum.mobile,
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
									pageType === workspaceFormConnectPagesEnum.tiktok ||
									pageType === workspaceFormConnectPagesEnum.twitter,
							})}
							color='medium'
						>
							Select data & time
						</ZIonText>
					</div>

					<div className='ms-auto'>
						<ZIonButton
							id='view-post-activity'
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
						<ZRTooltip
							anchorSelect='#view-post-activity'
							place='top'
							content='View post activity and more options'
						/>

						<ZIonButton
							fill='default'
							className='ion-no-padding ion-no-margin'
							onClick={(event: unknown) => {
								presentWorkspacePostActionsPopover({
									_event: event as Event,
									_cssClass: 'zaions_workspaces_import_export_popover_size',
									_dismissOnSelect: false,
								});
							}}
						>
							<ZIonIcon icon={ellipsisHorizontalOutline} />
						</ZIonButton>
					</div>
				</div>

				<div
					className={classNames({
						'mt-1 leading-3': type === workspacePostDetailTabEnum.mobile,
						'mt-3': type === workspacePostDetailTabEnum.desktop,
					})}
				>
					<ZIonText
						color='dark'
						className={classNames({
							'text-xs': type === workspacePostDetailTabEnum.mobile,
						})}
					>
						There are several ways to make money with Facebook without exceeding
						the limit of 150 words. One way is to become an affiliate marketer
						and promote products on Facebook. Another way is to create and sell
						your own products or services on Facebook. You can also earn money
						by creating and selling Facebook apps or by offering social media
						management services to businesses. Additionally, you can earn money
						through Facebook ads by creating and running targeted ad campaigns
						for businesses. Finally, you can also earn money by joining Facebook
						groups and participating in paid surveys or by becoming a social
						media influencer and partnering with brands for sponsored posts
					</ZIonText>
				</div>

				<div
					className={classNames({
						'mt-4': type === workspacePostDetailTabEnum.desktop,
						'mt-1': type === workspacePostDetailTabEnum.mobile,
					})}
				>
					<ZIonButton className='text-transform-initial' size='small'>
						<ZIonIcon icon={pencil} className='me-2' /> Rewrite with AI
					</ZIonButton>

					<ZIonButton className='text-transform-initial' size='small'>
						<ZIonIcon icon={menuOutline} className='me-2' />
						Continue
					</ZIonButton>
				</div>

				<div
					className={classNames({
						'mt-4': type === workspacePostDetailTabEnum.desktop,
						'mt-1': type === workspacePostDetailTabEnum.mobile,
					})}
				>
					{pageType && (
						<ZIonButtons>
							{/* images/videos */}
							{[
								workspaceFormConnectPagesEnum.facebook,
								workspaceFormConnectPagesEnum.instagram,
								workspaceFormConnectPagesEnum.linkedin,
								workspaceFormConnectPagesEnum.pinterest,
								workspaceFormConnectPagesEnum.twitter,
								workspaceFormConnectPagesEnum.googleBusiness,
							].includes(pageType) && (
								<>
									<ZIonButton id='z-images-videos-tooltip' className='m-0'>
										<ZIonImg src={imageIcon} />
									</ZIonButton>
									<ZRTooltip
										anchorSelect='#z-images-videos-tooltip'
										place='bottom'
										content='Upload images/videos from computer'
									/>
								</>
							)}

							{/* GIF */}
							{[
								workspaceFormConnectPagesEnum.facebook,
								workspaceFormConnectPagesEnum.instagram,
								workspaceFormConnectPagesEnum.linkedin,
								workspaceFormConnectPagesEnum.twitter,
							].includes(pageType) && (
								<>
									<ZIonButton id='z-gif-tooltip' className='m-0'>
										<ZIonImg src={gifIcon} />
									</ZIonButton>
									<ZRTooltip
										anchorSelect='#z-gif-tooltip'
										place='bottom'
										content='Add a GIF'
									/>
								</>
							)}

							{/* Media Library */}
							{[
								workspaceFormConnectPagesEnum.facebook,
								workspaceFormConnectPagesEnum.instagram,
								workspaceFormConnectPagesEnum.linkedin,
								workspaceFormConnectPagesEnum.pinterest,
								workspaceFormConnectPagesEnum.tiktok,
								workspaceFormConnectPagesEnum.youtube,
								workspaceFormConnectPagesEnum.twitter,
								workspaceFormConnectPagesEnum.googleBusiness,
							].includes(pageType) && (
								<>
									<ZIonButton id='z-media-library-tooltip' className='m-0'>
										<ZIonImg src={mediaIcon} />
									</ZIonButton>
									<ZRTooltip
										anchorSelect='#z-media-library-tooltip'
										place='bottom'
										content='Add from Media Library'
									/>
								</>
							)}

							{/* thumbnail */}
							{[
								workspaceFormConnectPagesEnum.facebook,
								workspaceFormConnectPagesEnum.linkedin,
							].includes(pageType) && (
								<>
									<ZIonButton id='z-thumbnail-tooltip' className='m-0'>
										<ZIonImg src={thumbnailIcon} />
									</ZIonButton>
									<ZRTooltip
										anchorSelect='#z-thumbnail-tooltip'
										place='bottom'
										content='Add url thumbnail or carousel'
									/>
								</>
							)}

							{/* Comments */}
							{[workspaceFormConnectPagesEnum.instagram].includes(pageType) && (
								<>
									<ZIonButton id='z-comments-tooltip' className='m-0'>
										<ZIonIcon
											icon={chatbubbleOutline}
											color='dark'
											className='w-7 h-7 font-black'
										/>
									</ZIonButton>
									<ZRTooltip
										anchorSelect='#z-comments-tooltip'
										place='bottom'
										content='Include first comment'
									/>
								</>
							)}

							{/* Video */}
							{[
								workspaceFormConnectPagesEnum.tiktok,
								workspaceFormConnectPagesEnum.youtube,
							].includes(pageType) && (
								<>
									<ZIonButton id='z-video-tooltip' className='m-0'>
										<ZIonIcon
											icon={videocamOutline}
											color='dark'
											className='w-7 h-7 font-black'
										/>
									</ZIonButton>
									<ZRTooltip
										anchorSelect='#z-video-tooltip'
										place='bottom'
										content='Add video'
									/>
								</>
							)}

							{/* Offer */}
							{[workspaceFormConnectPagesEnum.googleBusiness].includes(
								pageType
							) && (
								<>
									<ZIonButton id='z-offer-tooltip' className='m-0'>
										<ZIonIcon
											icon={filterCircleOutline}
											color='dark'
											className='w-7 h-7 font-black'
										/>
									</ZIonButton>
									<ZRTooltip
										anchorSelect='#z-offer-tooltip'
										place='bottom'
										content='Add offer'
									/>
								</>
							)}

							{/* event */}
							{[workspaceFormConnectPagesEnum.googleBusiness].includes(
								pageType
							) && (
								<>
									<ZIonButton id='z-event-tooltip' className='m-0'>
										<ZIonIcon
											icon={todayOutline}
											color='dark'
											className='w-7 h-7 font-black'
										/>
									</ZIonButton>
									<ZRTooltip
										anchorSelect='#z-event-tooltip'
										place='bottom'
										content='Add event'
									/>
								</>
							)}

							{/* CTA */}
							{[workspaceFormConnectPagesEnum.googleBusiness].includes(
								pageType
							) && (
								<>
									<ZIonButton id='z-CTA-tooltip' className='m-0'>
										<ZIonIcon
											icon={tabletLandscapeOutline}
											color='dark'
											className='w-7 h-7 font-black'
										/>
									</ZIonButton>
									<ZRTooltip
										anchorSelect='#z-CTA-tooltip'
										place='bottom'
										content='Add CTA Button'
									/>
								</>
							)}
						</ZIonButtons>
					)}
				</div>
			</ZIonCardContent>
		</ZIonCard>
	);
};

export default ZWorkspaceSinglePost;
