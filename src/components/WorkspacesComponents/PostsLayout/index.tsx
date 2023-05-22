/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import {
	gifIcon,
	imageIcon,
	mediaIcon,
	ProductLogo,
	thumbnailIcon,
} from '@/assets/images';
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
import { workspaceFormConnectPagesEnum } from '@/types/AdminPanel/workspace';
import { getPlatformIcon } from '@/utils/helpers';
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import classNames from 'classnames';
import {
	checkmark,
	createOutline,
	ellipseOutline,
	ellipsisHorizontalOutline,
	gridOutline,
	happyOutline,
	logoFacebook,
	menuOutline,
	openOutline,
	pencil,
} from 'ionicons/icons';
import React from 'react';
import ZUserAvatarInfo from '../UserButton';

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

const ZWorkspacePostsLayout: React.FC<{
	pageType?: workspaceFormConnectPagesEnum;
}> = ({ pageType }) => {
	const { presentZIonPopover: presentWorkspacePostActionsPopover } =
		useZIonPopover(ZWorkspacePostActionsPopover);

	return (
		<ZIonGrid>
			<ZIonRow className='mt-2'>
				<ZIonCol size='max-content' className='flex flex-col'>
					<ZIonButton
						fill='clear'
						className='rounded-full overflow-hidden ion-no-padding w-[40px] h-[40px] zaions__bg_white'
						size='small'
						style={{
							boxShadow: '0 2px 4px rgba(0,0,0,.08), 0 0 1px rgba(50,79,58,.1)',
						}}
					>
						<ZIonIcon icon={checkmark} color='dark' className='w-6 h-6' />
					</ZIonButton>

					<ZIonButton
						fill='clear'
						className='rounded-full overflow-hidden ion-no-padding w-[40px] h-[40px] zaions__bg_white mt-2'
						size='small'
						style={{
							boxShadow: '0 2px 4px rgba(0,0,0,.08), 0 0 1px rgba(50,79,58,.1)',
						}}
					>
						<ZIonIcon
							icon={(pageType && getPlatformIcon(pageType)) || gridOutline}
							color='dark'
							className='w-6 h-6'
						/>
					</ZIonButton>
				</ZIonCol>

				{/*  */}
				<ZIonCol
					size='6'
					className={classNames({
						'zaions__bg_white rounded px-2 py-1': true,

						// Checking if the pageType is one of this type blow then show border in post.
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
					<ZIonRow className='ion-align-items-start'>
						<ZIonCol
							className={classNames({
								flex: true,
								'ion-align-items-center':
									pageType !== workspaceFormConnectPagesEnum.tiktok,
								'ion-align-items-start':
									pageType === workspaceFormConnectPagesEnum.tiktok,
							})}
							size='7'
						>
							<ZIonImg
								src={ProductLogo}
								className={classNames({
									'w-12 h-12': true,
									'rounded-full overflow-hidden':
										pageType === workspaceFormConnectPagesEnum.facebook ||
										pageType === workspaceFormConnectPagesEnum.tiktok,
								})}
							/>
							<div className='ms-2'>
								<ZIonText
									className={classNames({
										'font-bold': true,
										block: pageType !== workspaceFormConnectPagesEnum.tiktok,
									})}
								>
									Zaions
									{/* If pageType is tiktok then show this Badge */}
									{pageType === workspaceFormConnectPagesEnum.tiktok && (
										<ZIonBadge color='light'>tiktok</ZIonBadge>
									)}
								</ZIonText>

								<ZIonText
									className={classNames({
										'text-sm': true,
										block: pageType !== workspaceFormConnectPagesEnum.tiktok,
										'ms-2 inline-block':
											pageType === workspaceFormConnectPagesEnum.tiktok,
									})}
									color='medium'
								>
									Select data & time
								</ZIonText>
							</div>
						</ZIonCol>

						{/*  */}
						<ZIonCol className='ion-text-end'>
							<ZIonButton
								fill='default'
								className='ion-no-padding ion-no-margin me-2'
							>
								<ZIonIcon icon={openOutline} />
							</ZIonButton>

							{/*  */}
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
						</ZIonCol>
					</ZIonRow>

					<ZIonRow
						className={classNames({
							'w-[90%] ms-auto':
								pageType === workspaceFormConnectPagesEnum.tiktok,
						})}
					>
						<ZIonCol>
							<ZIonText className='text-sm'>
								There are several ways to make money with Facebook without
								exceeding the limit of 150 words. One way is to become an
								affiliate marketer and promote products on Facebook. Another way
								is to create and sell your own products or services on Facebook.
								You can also earn money by creating and selling Facebook apps or
								by offering social media management services to businesses.
								Additionally, you can earn money through Facebook ads by
								creating and running targeted ad campaigns for businesses.
								Finally, you can also earn money by joining Facebook groups and
								participating in paid surveys or by becoming a social media
								influencer and partnering with brands for sponsored posts.
							</ZIonText>
						</ZIonCol>
					</ZIonRow>

					<ZIonRow>
						<ZIonCol size='12'>
							<ZIonButton className='text-transform-initial' size='small'>
								<ZIonIcon icon={pencil} className='me-2' /> Rewrite with AI
							</ZIonButton>

							<ZIonButton className='text-transform-initial' size='small'>
								<ZIonIcon icon={menuOutline} className='me-2' /> Continue
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
					</ZIonRow>
				</ZIonCol>

				{/*  */}
				<ZIonCol
					size='5.2'
					className='zaions__bg_white rounded border ion-no-padding ms-auto zaions_comment_box relative max-h-[412px]'
				>
					<div className='overflow-y-scroll w-full h-full px-2 py-1 zaions_pretty_scrollbar'>
						{/* Single comment */}
						<ZIonRow className='border rounded border-transparent hover:border-slate-200'>
							<ZIonCol size='12' className='flex ion-align-items-center py-0'>
								<div className='w-max flex ion-align-items-center'>
									<ZUserAvatarInfo className='w-[24px!important] h-[24px!important]' />
									<div className='ms-2'>
										<ZIonText className='font-bold text-sm'>You</ZIonText>
										<ZIonText className='text-sm ms-2' color='medium'>
											. May 16
										</ZIonText>
									</div>
								</div>

								<div className='w-[70%] flex ion-justify-content-end'>
									<ZIonButton
										size='small'
										className='mx-1 ion-no-padding'
										fill='default'
									>
										<ZIonIcon icon={createOutline} />
									</ZIonButton>

									<ZIonButton
										size='small'
										className='mx-1 ion-no-padding'
										fill='default'
									>
										<ZIonIcon icon={happyOutline} />
									</ZIonButton>

									<ZIonButton
										size='small'
										className='mx-1 ion-no-padding'
										fill='default'
									>
										<ZIonIcon icon={ellipseOutline} />
									</ZIonButton>
								</div>
							</ZIonCol>

							<ZIonCol size='11' className='ms-auto text-sm leading-6 py-0'>
								<ZIonText>
									Hey there! I just wanted to say that I really enjoyed your
									post. Your perspective on the topic was really insightful and
									I learned a lot from reading it. I also appreciate the way you
									presented your ideas in a clear and concise manner. It's
									always refreshing to see someone who can communicate complex
									ideas in a way that is easy to understand. Keep up the great
									work and I look forward to reading more of your posts in the
									future!
								</ZIonText>

								<div className='mt-4'>
									<ZIonButton
										fill='clear'
										className='ion-no-padding ion-no-margin text-transform-initial text-xs'
										color='medium'
										size='small'
									>
										Replay
									</ZIonButton>
								</div>
							</ZIonCol>
						</ZIonRow>
					</div>
				</ZIonCol>
			</ZIonRow>

			<ZIonRow>
				<ZIonCol className='ion-text-center py-14'>
					<ZIonText color='medium' className='text-sm'>
						No more posts.
					</ZIonText>
				</ZIonCol>
			</ZIonRow>
		</ZIonGrid>
	);
};

export default ZWorkspacePostsLayout;
