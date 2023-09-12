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
import { ellipsisHorizontalOutline, star, starOutline } from 'ionicons/icons';

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
	ZIonLabel,
	ZIonRouterLink,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import ZUserInfoPopover from '@/components/InPageComponents/ZaionsPopovers/UserInfoPopover';
import ZWorkspacesActionPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/ActionsPopover';
import ZCan from '@/components/Can';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import {
	useZGetRQCacheData,
	useZRQUpdateRequest,
	useZUpdateRQCacheData,
} from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { getUiAvatarApiUrl } from '@/utils/helpers/apiHelpers';
import CONSTANTS from '@/utils/constants';
import {
	createRedirectRoute,
	extractInnerData,
	zStringify,
} from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { showSuccessNotification } from '@/utils/notification';
import { reportCustomError } from '@/utils/customErrorType';
import MESSAGES from '@/utils/messages';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	wsShareInterface,
	WSTeamMembersInterface,
} from '@/types/AdminPanel/workspace';
import { ZTeamMemberInvitationEnum } from '@/types/AdminPanel/index.type';
import { ZLinkMutateApiType } from '@/types/ZaionsApis.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { UserAccountType } from '@/types/UserAccount/index.type';

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

/**
 * Functional Component
 * @type {*}
 * */

const ZWorkspacesCard: React.FC<{
	workspaceId?: string;
	inviteId?: string;
	workspaceName?: string;
	isFavorite?: boolean;
	workspaceTimezone?: string;
	workspaceImage?: string;
	owned?: boolean;
	user: UserAccountType;
	createdAt?: string;
	updatedAt?: string;
	accountStatus?: ZTeamMemberInvitationEnum;
}> = ({
	workspaceId,
	workspaceImage,
	workspaceName,
	createdAt,
	user,
	owned = true,
	isFavorite,
	accountStatus,
	inviteId,
}) => {
	// #region Custom Hooks.
	const { updateRQCDataHandler } = useZUpdateRQCacheData();
	const { getRQCDataHandler } = useZGetRQCacheData();
	const { zNavigatePushRoute } = useZNavigate();
	// #endregion

	// #region Popover.
	const { presentZIonPopover: presentUserInfoPopover } = useZIonPopover(
		ZUserInfoPopover,
		{ showBadges: true, user: user }
	); // popover hook to show UserInfoPopover

	const { presentZIonPopover: presentWorkspacesActionsPopover } =
		useZIonPopover(ZWorkspacesActionPopover, {
			workspaceId: workspaceId,
		}); // popover hook to show UserInfoPopover
	// #endregion

	// #region APIS.
	// update invitation data api
	const { mutateAsync: updateInvitationAsyncMutate } = useZRQUpdateRequest({
		_url: API_URL_ENUM.ws_team_member_update,
		_queriesKeysToInvalidate: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.NOTIFICATION.MAIN,
			workspaceId!,
		],
	});

	// Update isFavorite of owned workspace
	const { mutateAsync: updateIsFavoriteOwnedWSAsyncMutate } =
		useZRQUpdateRequest({
			_url: API_URL_ENUM.workspace_update_is_favorite,
		});

	// Update isFavorite of share workspace
	const { mutateAsync: updateIsFavoriteShareWSAsyncMutate } =
		useZRQUpdateRequest({
			_url: API_URL_ENUM.ws_share_update_is_favorite,
		});

	// #region Functions.
	const zInvitationResponseHandler = async ({
		_item,
	}: {
		_item: ZTeamMemberInvitationEnum;
	}) => {
		try {
			if (_item) {
				const __response = await updateInvitationAsyncMutate({
					requestData: zStringify({
						status: _item,
					}),
					itemIds: [inviteId!],
					urlDynamicParts: [CONSTANTS.RouteParams.workspace.memberInviteId],
				});

				if (
					(__response as ZLinkMutateApiType<WSTeamMembersInterface>).success
				) {
					const __data = extractInnerData<WSTeamMembersInterface>(
						__response,
						extractInnerDataOptionsEnum.createRequestResponseItem
					);

					if (__data && __data?.id) {
						await updateRQCDataHandler({
							key: [
								CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.INVITATION_GET,
								inviteId!,
							],
							data: __data,
							id: '',
							updateHoleData: true,
							extractType: ZRQGetRequestExtractEnum.extractItem,
						});

						const getWSShareWorkspaceData = getRQCDataHandler({
							key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.WS_SHARE_MAIN],
						});

						const __oldData =
							extractInnerData<wsShareInterface[]>(
								getWSShareWorkspaceData,
								extractInnerDataOptionsEnum.createRequestResponseItems
							) || [];

						if (_item === ZTeamMemberInvitationEnum.accepted) {
							await updateRQCDataHandler({
								key: [
									CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.WS_SHARE_MAIN,
								],
								data: {
									...__data.workspace,
									id: __data?.id,
									accountStatus: __data?.accountStatus,
								},
								id: __data?.id!,
							});
						} else if (_item === ZTeamMemberInvitationEnum.rejected) {
							const __updatedData = __oldData?.filter(
								(el) => el?.id !== __data?.id
							);

							await updateRQCDataHandler({
								key: [
									CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.WS_SHARE_MAIN,
								],
								data: __updatedData,
								id: '',
								updateHoleData: true,
								extractType: ZRQGetRequestExtractEnum.extractItems,
							});
						}

						if (_item === ZTeamMemberInvitationEnum.accepted) {
							showSuccessNotification('Successfully accepted invitation.');
						} else if (_item === ZTeamMemberInvitationEnum.rejected) {
							showSuccessNotification('Successfully rejected invitation.');
						}
					}
				}
			}
		} catch (error) {
			reportCustomError(error);
		}
	};

	const zUpdateIsFavoriteHandler = async () => {
		try {
			let __response;
			const __zStringifyData = zStringify({
				isFavorite: !isFavorite,
			});
			if (owned) {
				__response = await updateIsFavoriteOwnedWSAsyncMutate({
					itemIds: [workspaceId!],
					urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
					requestData: __zStringifyData,
				});
			} else {
				__response = await updateIsFavoriteShareWSAsyncMutate({
					itemIds: [workspaceId!],
					urlDynamicParts: [CONSTANTS.RouteParams.workspace.wsShareId],
					requestData: __zStringifyData,
				});
			}

			if (__response) {
				const __data = extractInnerData<WSTeamMembersInterface>(
					__response,
					extractInnerDataOptionsEnum.createRequestResponseItem
				);

				if (owned) {
					await updateRQCDataHandler({
						key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN],
						data: {
							...__data,
						},
						id: __data?.id!,
						// extractType: ZRQGetRequestExtractEnum.extractItems,
					});
				} else {
					await updateRQCDataHandler({
						key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.WS_SHARE_MAIN],
						data: {
							...__data,
						},
						id: __data?.id!,
						// extractType: ZRQGetRequestExtractEnum.extractItems,
					});
				}

				if (__data?.isFavorite) {
					showSuccessNotification(
						MESSAGES.GENERAL.WORKSPACE.ADD_TO_IS_FAVORITE
					);
				} else {
					showSuccessNotification(
						MESSAGES.GENERAL.WORKSPACE.REMOVE_TO_IS_FAVORITE
					);
				}
			}
		} catch (error) {
			reportCustomError(error);
		}
	};
	// #endregion
	return (
		<ZIonCard className='h-[11.4rem]'>
			<ZIonRow className='flex-col h-full'>
				<ZIonCol className='flex-1'>
					{/* Card header */}
					<ZIonCardHeader>
						<ZIonRow className='ion-align-items-center'>
							<ZIonCol size='8' className='flex gap-3 ion-align-items-center'>
								<div
									className={classNames({
										'w-[40px] h-[40px] rounded overflow-hidden': true,
										'flex ion-align-items-center ion-justify-content-center':
											!workspaceImage,
									})}
								>
									<ZIonRouterLink
										color='dark'
										routerLink={createRedirectRoute({
											url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
											params: [
												CONSTANTS.RouteParams.workspace.workspaceId,
												CONSTANTS.RouteParams
													.folderIdToGetShortLinksOrLinkInBio,
											],
											values: [workspaceId || '', 'all'],
										})}
										testingselector={`${CONSTANTS.testingSelectors.workspace.listPage.workspaceCardImg}-${workspaceId}`}
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
											className='overflow-hidden rounded'
										/>
									</ZIonRouterLink>
								</div>
								<div>
									{/* workspace name */}
									<ZIonRouterLink
										className='block'
										color='dark'
										routerLink={createRedirectRoute({
											url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
											params: [
												CONSTANTS.RouteParams.workspace.workspaceId,
												CONSTANTS.RouteParams
													.folderIdToGetShortLinksOrLinkInBio,
											],
											values: [workspaceId || '', 'all'],
										})}
										testingselector={`${CONSTANTS.testingSelectors.workspace.listPage.workspaceCardTitle}-${workspaceId}`}
										testingListSelector={
											CONSTANTS.testingSelectors.workspace.listPage
												.workspaceCardTitle
										}
									>
										<div className='max-w-[8rem] overflow-hidden line-clamp-1'>
											<ZIonLabel
												className='block text-base font-bold'
												color='dark'
											>
												{workspaceName}
											</ZIonLabel>
										</div>
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
									testingselector={`${CONSTANTS.testingSelectors.workspace.listPage.workspaceCardFavoritesButton}-${workspaceId}`}
									testingListSelector={
										CONSTANTS.testingSelectors.workspace.listPage
											.workspaceCardFavoritesButton
									}
									onClick={() => {
										void zUpdateIsFavoriteHandler();
									}}
								>
									<ZIonIcon icon={isFavorite ? star : starOutline} />
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
											testingselector={`${CONSTANTS.testingSelectors.workspace.listPage.workspaceCardUserButton}-${workspaceId}`}
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
													getUiAvatarApiUrl({ name: user?.username })
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
							{owned || accountStatus === ZTeamMemberInvitationEnum.accepted ? (
								<>
									{/* View button */}
									<ZIonCol>
										<ZCan havePermissions={[permissionsEnum.view_workspace]}>
											<ZIonButton
												className='normal-case '
												color='secondary'
												size='default'
												testingselector={`${CONSTANTS.testingSelectors.workspace.listPage.viewWorkspaceButton}-${workspaceId}`}
												testingListSelector={
													CONSTANTS.testingSelectors.workspace.listPage
														.viewWorkspaceButton
												}
												onClick={() => {
													// Click on card will redirect to view workspace.
													if (workspaceId) {
														zNavigatePushRoute(
															createRedirectRoute({
																url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
																params: [
																	CONSTANTS.RouteParams.workspace.workspaceId,
																	CONSTANTS.RouteParams
																		.folderIdToGetShortLinksOrLinkInBio,
																],
																values: [workspaceId, 'all'],
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
											className='h-auto mb-1 normal-case ion-no-padding ion-no-margin'
											color='dark'
											testingselector={`${CONSTANTS.testingSelectors.workspace.listPage.workspaceCardActionPopoverButton}-${workspaceId}`}
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
								</>
							) : accountStatus === ZTeamMemberInvitationEnum.pending ? (
								<>
									{/* Accept invitation */}
									<ZIonCol>
										<ZCan havePermissions={[permissionsEnum.view_workspace]}>
											<ZIonButton
												className='normal-case '
												color='success'
												size='default'
												testingselector={`${CONSTANTS.testingSelectors.workspace.listPage.acceptInvitationButton}-${workspaceId}`}
												testingListSelector={
													CONSTANTS.testingSelectors.workspace.listPage
														.acceptInvitationButton
												}
												onClick={() => {
													zInvitationResponseHandler({
														_item: ZTeamMemberInvitationEnum.accepted,
													});
												}}
											>
												Accept
											</ZIonButton>
										</ZCan>
									</ZIonCol>

									{/* Reject invitation */}
									<ZIonCol className='ion-text-end'>
										<ZIonButton
											className='normal-case '
											color='danger'
											size='default'
											testingselector={`${CONSTANTS.testingSelectors.workspace.listPage.rejectInvitationButton}-${workspaceId}`}
											testingListSelector={
												CONSTANTS.testingSelectors.workspace.listPage
													.rejectInvitationButton
											}
											onClick={() => {
												zInvitationResponseHandler({
													_item: ZTeamMemberInvitationEnum.rejected,
												});
											}}
										>
											Reject
										</ZIonButton>
									</ZIonCol>
								</>
							) : null}
						</ZIonRow>
					</ZIonCardContent>
				</ZIonCol>
			</ZIonRow>
		</ZIonCard>
	);
};

export default ZWorkspacesCard;
