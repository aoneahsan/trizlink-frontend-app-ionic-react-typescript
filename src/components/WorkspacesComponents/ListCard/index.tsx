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
	ZIonRouterLink,
	ZIonRow,
	ZIonSkeletonText,
	ZIonText,
} from '@/components/ZIonComponents';
import ZUserInfoPopover from '@/components/InPageComponents/ZaionsPopovers/UserInfoPopover';
import ZWorkspacesActionPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/ActionsPopover';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { getUiAvatarApiUrl } from '@/utils/helpers/apiHelpers';
import CONSTANTS from '@/utils/constants';
import { createRedirectRoute } from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { workspaceInterface } from '@/types/AdminPanel/workspace';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
import classes from './styles.module.css';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
import ZCan from '@/components/Can';

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
 * @type {*}
 * */

const ZWorkspacesCard: React.FC<workspaceInterface> = ({
	id,
	workspaceImage,
	workspaceName,
	createdAt,
	user,
}) => {
	//
	const { zNavigatePushRoute } = useZNavigate();

	const { presentZIonPopover: presentUserInfoPopover } = useZIonPopover(
		ZUserInfoPopover,
		{ showBadges: true, user: user }
	); // popover hook to show UserInfoPopover

	const { presentZIonPopover: presentWorkspacesActionsPopover } =
		useZIonPopover(ZWorkspacesActionPopover, {
			workspaceId: id,
		}); // popover hook to show UserInfoPopover

	return (
		<ZIonCard className='h-[13.4rem]'>
			<ZIonRow className='flex-col h-full'>
				<ZIonCol className='flex-1'>
					{/* Card header */}
					<ZIonCardHeader>
						<ZIonRow className='ion-align-items-center'>
							<ZIonCol className='flex gap-3 ion-align-items-center'>
								<div
									className={classNames({
										'w-[50px] h-[50px] rounded overflow-hidden': true,
										'flex ion-align-items-center ion-justify-content-center zaions__primary_bg':
											!workspaceImage,
									})}
								>
									<ZIonRouterLink
										routerLink={createRedirectRoute({
											url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
											params: [
												CONSTANTS.RouteParams.workspace.workspaceId,
												CONSTANTS.RouteParams
													.folderIdToGetShortLinksOrLinkInBio,
											],
											values: [id || '', 'all'],
										})}
										color='dark'
										testingSelector={`${CONSTANTS.testingSelectors.workspace.listPage.workspaceCardImg}-${id}`}
										testingListSelector={
											CONSTANTS.testingSelectors.workspace.listPage
												.workspaceCardImg
										}
									>
										<ZIonImg
											src={
												workspaceImage ||
												getUiAvatarApiUrl({
													name: workspaceName,
												})
											}
											className='rounded overflow-hidden'
										/>
									</ZIonRouterLink>
								</div>
								<div>
									{/* workspace name */}
									<ZIonRouterLink
										routerLink={createRedirectRoute({
											url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
											params: [
												CONSTANTS.RouteParams.workspace.workspaceId,
												CONSTANTS.RouteParams
													.folderIdToGetShortLinksOrLinkInBio,
											],
											values: [id || '', 'all'],
										})}
										testingSelector={`${CONSTANTS.testingSelectors.workspace.listPage.workspaceCardTitle}-${id}`}
										testingListSelector={
											CONSTANTS.testingSelectors.workspace.listPage
												.workspaceCardTitle
										}
									>
										<ZIonText
											className='block text-base font-bold'
											color='dark'
										>
											{workspaceName}
										</ZIonText>
									</ZIonRouterLink>

									{/*  */}
									<ZIonText className='block text-xs'>{createdAt}</ZIonText>
								</div>
							</ZIonCol>

							{/* Add to Favorites button col */}
							<ZIonCol className='ion-text-end me-2'>
								<ZIonButton
									fill='clear'
									className='h-auto mb-1 ion-no-padding ion-no-margin'
									testingSelector={`${CONSTANTS.testingSelectors.workspace.listPage.workspaceCardFavoritesButton}-${id}`}
									testingListSelector={
										CONSTANTS.testingSelectors.workspace.listPage
											.workspaceCardFavoritesButton
									}
								>
									<ZIonIcon icon={starOutline} />
								</ZIonButton>
							</ZIonCol>

							{/* user avatar */}
							<ZIonCol size='12' className='mt-2 ion-no-margin ion-no-padding'>
								{/* Row */}
								<ZIonRow>
									{/* Col */}
									<ZIonCol>
										<ZIonButton
											color='primary'
											fill='solid'
											testingSelector={`${CONSTANTS.testingSelectors.workspace.listPage.workspaceCardUserButton}-${id}`}
											testingListSelector={
												CONSTANTS.testingSelectors.workspace.listPage
													.workspaceCardUserButton
											}
											className={classNames(
												classes['workspace-user-avatar-button'],
												{
													relative: true,
												}
											)}
											onClick={(event: unknown) => {
												presentUserInfoPopover({
													_event: event as Event,
													_cssClass: 'zaions_user_info_popover_size',
												});
											}}
										>
											<ZIonImg
												src={
													user?.profilePitcher ||
													getUiAvatarApiUrl({ name: user?.name })
												}
												className='w-[38px] h-[40px] zaions-object-fit-cover'
											/>
										</ZIonButton>
									</ZIonCol>
								</ZIonRow>
							</ZIonCol>
						</ZIonRow>
					</ZIonCardHeader>
				</ZIonCol>

				<ZIonCol className=''>
					{/* Card body */}
					<ZIonCardContent className='flex flex-col h-full ion-justify-content-end ion-align-items-end'>
						{/* Bottom row */}
						<ZIonRow className='w-full ion-align-items-center'>
							{/* Last active */}
							<ZIonCol>
								<ZCan havePermissions={[permissionsEnum.view_workspace]}>
									<ZIonButton
										className=' normal-case'
										color='secondary'
										size='default'
										testingSelector={`${CONSTANTS.testingSelectors.workspace.listPage.viewWorkspaceButton}-${id}`}
										testingListSelector={
											CONSTANTS.testingSelectors.workspace.listPage
												.viewWorkspaceButton
										}
										onClick={() => {
											// Click on card will redirect to view workspace.
											if (id) {
												zNavigatePushRoute(
													createRedirectRoute({
														url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
														params: [
															CONSTANTS.RouteParams.workspace.workspaceId,
															CONSTANTS.RouteParams
																.folderIdToGetShortLinksOrLinkInBio,
														],
														values: [id, 'all'],
													})
												);
											}
										}}
									>
										View
									</ZIonButton>
								</ZCan>
							</ZIonCol>

							{/* actions popover button */}
							<ZIonCol className='ion-text-end'>
								<ZIonButton
									fill='clear'
									className='h-auto mb-1 ion-no-padding ion-no-margin normal-case'
									color='dark'
									testingSelector={`${CONSTANTS.testingSelectors.workspace.listPage.workspaceCardActionPopoverButton}-${id}`}
									testingListSelector={
										CONSTANTS.testingSelectors.workspace.listPage
											.workspaceCardActionPopoverButton
									}
									onClick={(event: unknown) => {
										presentWorkspacesActionsPopover({
											_event: event as Event,
											_cssClass: 'zaions_workspaces_actions_popover_size',
											_dismissOnSelect: false,
										});
									}}
								>
									<ZIonIcon icon={ellipsisHorizontalOutline} />
								</ZIonButton>
							</ZIonCol>
						</ZIonRow>
					</ZIonCardContent>
				</ZIonCol>
			</ZIonRow>
		</ZIonCard>
	);
};

export const ZWorkspacesCardSkeleton: React.FC = () => {
	return (
		<ZIonCol sizeXl='4' sizeLg='6' sizeMd='6' sizeSm='6' sizeXs='12'>
			<ZIonCard className='cursor-pointer h-[13.4rem]'>
				<ZIonRow className='flex-col h-full'>
					<ZIonCol className='flex-1'>
						{/* Card header */}
						<ZIonCardHeader>
							<ZIonRow className='ion-align-items-center'>
								<ZIonCol className='flex gap-3 ion-align-items-center'>
									<div className='rounded w-[50px] h-[50px] overflow-hidden'>
										<ZIonSkeletonText
											animated={true}
											style={{ width: '100%', height: '100%' }}
										></ZIonSkeletonText>
									</div>
									<div>
										<ZIonText
											className='block text-base font-bold'
											color='dark'
										>
											<ZIonSkeletonText
												animated={true}
												style={{ width: '100px', height: '15px' }}
											></ZIonSkeletonText>
										</ZIonText>
										<ZIonText className='block text-xs'>
											<ZIonSkeletonText
												animated={true}
												style={{ width: '80px', height: '15px' }}
											></ZIonSkeletonText>
										</ZIonText>
									</div>
								</ZIonCol>

								{/* Add to Favorites button col */}
								<ZIonCol className='ion-text-end me-2'>
									<ZIonButton
										fill='clear'
										className='h-auto mb-1 ion-no-padding ion-no-margin'
									>
										<ZIonSkeletonText
											animated={true}
											style={{ width: '17px', height: '17px' }}
										></ZIonSkeletonText>
									</ZIonButton>
								</ZIonCol>

								{/* user avatar */}
								<ZIonCol
									size='12'
									className='mt-2 ion-no-margin ion-no-padding'
								>
									{/* Row */}
									<ZIonRow>
										{/* Col */}
										<ZIonCol>
											<div className='w-[38px] h-[40px] rounded-full zaions-object-fit-cover'>
												<ZIonSkeletonText
													animated={true}
													style={{ width: '100%', height: '100%' }}
												></ZIonSkeletonText>
											</div>
										</ZIonCol>
									</ZIonRow>
								</ZIonCol>
							</ZIonRow>
						</ZIonCardHeader>
					</ZIonCol>

					<ZIonCol>
						{/* Card body */}
						<ZIonCardContent className='flex flex-col h-full ion-justify-content-end ion-align-items-end'>
							{/* Bottom row */}
							<ZIonRow className='w-full ion-align-items-center'>
								{/* Last active */}
								<ZIonCol>
									<ZIonButton
										className=' normal-case'
										color='secondary'
										size='default'
									>
										<ZIonSkeletonText
											animated={true}
											style={{ width: '40px', height: '17px' }}
										></ZIonSkeletonText>
									</ZIonButton>
								</ZIonCol>

								{/* actions popover button */}
								<ZIonCol className='ion-text-end'>
									<ZIonButton
										fill='clear'
										className='h-auto mt-1 mb-1 ion-no-padding ion-no-margin normal-case'
										color='dark'
									>
										<ZIonSkeletonText
											animated={true}
											style={{ width: '30px', height: '17px' }}
										></ZIonSkeletonText>
									</ZIonButton>
								</ZIonCol>
							</ZIonRow>
						</ZIonCardContent>
					</ZIonCol>
				</ZIonRow>
			</ZIonCard>
		</ZIonCol>
	);
};

export default ZWorkspacesCard;
