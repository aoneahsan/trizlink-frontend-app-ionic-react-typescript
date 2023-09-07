/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table';
import routeQueryString from 'qs';
import classNames from 'classnames';
import {
	createOutline,
	ellipsisVerticalOutline,
	fileTrayFullOutline,
	sendOutline,
	trashBinOutline,
} from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZCan from '@/components/Can';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import {
	ZIonButton,
	ZIonCheckbox,
	ZIonCol,
	ZIonIcon,
	ZIonItem,
	ZIonList,
	ZIonRow,
	ZIonSelect,
	ZIonSelectOption,
	ZIonSkeletonText,
	ZIonText,
	ZIonTitle,
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { createRedirectRoute, extractInnerData } from '@/utils/helpers';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	WSTeamMembersInterface,
	ZWSMemberListPageTableColumnsIds,
} from '@/types/AdminPanel/workspace';
import {
	useZGetRQCacheData,
	useZRQGetRequest,
	useZRQUpdateRequest,
	useZUpdateRQCacheData,
} from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import ZEmptyTable from '@/components/InPageComponents/ZEmptyTable';
import { ZTeamMemberInvitationEnum } from '@/types/AdminPanel/index.type';
import { AxiosError } from 'axios';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';
import { reportCustomError } from '@/utils/customErrorType';
import { showSuccessNotification } from '@/utils/notification';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import MESSAGES from '@/utils/messages';
import { ZLinkMutateApiType } from '@/types/ZaionsApis.type';
import dayjs from 'dayjs';

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
 * About: (table for listing workspace team members)
 * @type {*}
 * */

const ZMembersListTable: React.FC = () => {
	const { workspaceId, teamId } = useParams<{
		workspaceId: string;
		teamId: string;
	}>();

	// #region APIS.
	const { data: wsTeamMembersData, isFetching: isWSTeamMembersFetching } =
		useZRQGetRequest<WSTeamMembersInterface[]>({
			_url: API_URL_ENUM.ws_team_member_getAllInvite_list,
			_key: [
				CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
				workspaceId,
				teamId,
			],
			_itemsIds: [workspaceId, teamId],
			_urlDynamicParts: [
				CONSTANTS.RouteParams.workspace.workspaceId,
				CONSTANTS.RouteParams.workspace.teamId,
			],
		});
	// #endregion

	return (
		<>
			{isWSTeamMembersFetching && <ZaionsMembersTableSkeleton />}

			{!isWSTeamMembersFetching ? (
				wsTeamMembersData && wsTeamMembersData?.length > 0 ? (
					<ZInpageTable />
				) : (
					<div className='w-full mb-3 border rounded-lg h-max ion-padding zaions__light_bg'>
						<ZEmptyTable message='No members founds. please invite a member.' />
					</div>
				)
			) : null}
		</>
	);
};

const ZInpageTable: React.FC = () => {
	// #region Component state.
	const [compState, setCompState] = useState<{
		selectedMemberId?: string;
	}>({});
	// #endregion

	const { workspaceId, teamId } = useParams<{
		workspaceId: string;
		teamId: string;
	}>();

	// #region APIS.
	const { data: wsTeamMembersData, isFetching: isWSTeamMembersFetching } =
		useZRQGetRequest<WSTeamMembersInterface[]>({
			_url: API_URL_ENUM.ws_team_member_getAllInvite_list,
			_key: [
				CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
				workspaceId,
				teamId,
			],
			_itemsIds: [workspaceId, teamId],
			_urlDynamicParts: [
				CONSTANTS.RouteParams.workspace.workspaceId,
				CONSTANTS.RouteParams.workspace.teamId,
			],
		});
	// #endregion

	// #region Modal & Popovers.
	const { presentZIonPopover: presentZMemberActionPopover } = useZIonPopover(
		ZMemberActionPopover,
		{
			workspaceId: workspaceId,
			teamId: teamId,
			membersId: compState.selectedMemberId,
		}
	);
	// #endregion

	// #region Custom hooks
	const { zNavigatePushRoute } = useZNavigate();
	// getting search param from url with the help of 'qs' package.
	const routeQSearchParams = routeQueryString.parse(location.search, {
		ignoreQueryPrefix: true,
	});
	const { pageindex, pagesize } = routeQSearchParams;
	// #endregion

	// #region Managing table data with react-table.
	const columnHelper = createColumnHelper<WSTeamMembersInterface>();
	const defaultMembersColumns = [
		columnHelper.display({
			id: ZWSMemberListPageTableColumnsIds.id,
			header: 'Select',
			footer: 'Select Column Footer',
			cell: (_) => {
				return <ZIonCheckbox />;
			},
		}),

		// Email
		columnHelper.accessor((itemData) => itemData.email, {
			header: 'Email',
			id: ZWSMemberListPageTableColumnsIds.email,
			footer: 'Email',
			cell: (row) => {
				return (
					<>
						{row.getValue() ? (
							<div className='flex ion-align-items-center'>
								<div className='text-sm ZaionsTextEllipsis'>
									{row.getValue()}
								</div>
								{/* <ZIonText
									color='primary'
									className='text-sm cursor-pointer'
									testingselector={`${CONSTANTS.testingSelectors.WSSettings.teamListPage.table.description}-${row.row.original.id}`}
									testingListSelector={
										CONSTANTS.testingSelectors.WSSettings.teamListPage.table
											.description
									}
								>
									Read more
								</ZIonText> */}
							</div>
						) : (
							CONSTANTS.NO_VALUE_FOUND
						)}
					</>
				);
			},
		}),

		// Role
		columnHelper.accessor('memberRole', {
			header: 'Role',
			id: ZWSMemberListPageTableColumnsIds.role,
			cell: ({ row }) => {
				return <>{row?.original?.memberRole?.name}</>;
			},
			footer: 'Role',
		}),

		// status
		columnHelper.accessor((itemData) => itemData.accountStatus, {
			header: 'Status',
			id: ZWSMemberListPageTableColumnsIds.status,
			cell: (row) => {
				const value = row.getValue();
				return (
					<ZIonText
						color={
							value === ZTeamMemberInvitationEnum.pending
								? 'warning'
								: value === ZTeamMemberInvitationEnum.accepted
								? 'success'
								: value === ZTeamMemberInvitationEnum.rejected
								? 'danger'
								: 'dark'
						}
					>
						{row.getValue()}
					</ZIonText>
				);
			},
			footer: 'Status',
		}),

		// Invited at
		columnHelper.accessor((itemData) => itemData.invitedAt, {
			header: 'Invited at',
			id: ZWSMemberListPageTableColumnsIds.invitedAt,
			footer: 'Invited at',
		}),

		// Invited accepted at
		columnHelper.accessor((itemData) => itemData.inviteAcceptedAt, {
			header: 'Invited accepted at',
			id: ZWSMemberListPageTableColumnsIds.invitedAcceptedAt,
			cell: (row) => {
				return (
					<>{row.getValue() ? row.getValue() : CONSTANTS.NO_VALUE_FOUND}</>
				);
			},
			footer: 'Invited accepted at',
		}),
	];

	const zMembersTable = useReactTable({
		columns: defaultMembersColumns,
		data: wsTeamMembersData || [],
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		debugTable: true,
		debugHeaders: true,
		debugColumns: true,
	});
	// #endregion

	useEffect(() => {
		zMembersTable.setPageIndex(Number(pageindex) || 0);
		zMembersTable.setPageSize(Number(pagesize) || 2);
	}, [pageindex, pagesize]);
	// console.log({ d: zMembersTable?.getCanNextPage() }); // causing infinite loop
	return (
		<div>
			<ZCustomScrollable
				className='w-full overflow-hidden border rounded-lg h-max ion-no-padding zaions__light_bg'
				scrollX={true}
			>
				{zMembersTable.getHeaderGroups().map((_headerInfo, _headerIndex) => {
					return (
						<ZIonRow
							key={_headerIndex}
							className='flex flex-nowrap zaions__light_bg'
						>
							{_headerInfo.headers.map((_columnInfo, _columnIndex) => {
								return (
									<ZIonCol
										key={_columnInfo.id}
										className={classNames({
											'border-b ps-2 py-1 font-bold zaions__light_bg text-sm':
												true,
											'border-r': false,
										})}
										size={
											_columnInfo.column.id ===
												ZWSMemberListPageTableColumnsIds.id ||
											_columnInfo.column.id ===
												ZWSMemberListPageTableColumnsIds.actions
												? '1.2'
												: '2.5'
										}
									>
										{_columnInfo.column.columnDef.header?.toString()}
									</ZIonCol>
								);
							})}

							<ZIonCol
								size='.8'
								className={classNames({
									'border-b ps-2 py-1 font-bold zaions__light_bg text-sm': true,
									'border-r': false,
								})}
							>
								Actions
							</ZIonCol>
						</ZIonRow>
					);
				})}

				{/* Body Section */}
				<ZIonRow className='rounded-b-lg zaions__light_bg'>
					<ZIonCol size='12' className='w-full ion-no-padding'>
						{zMembersTable?.getRowModel().rows.map((_rowInfo, _rowIndex) => {
							return (
								<ZIonRow key={_rowIndex} className='flex-nowrap'>
									{_rowInfo.getAllCells().map((_cellInfo, _cellIndex) =>
										_cellInfo.column.getIsVisible() ? (
											<ZIonCol
												key={_cellIndex}
												size={
													_cellInfo.column.id ===
														ZWSMemberListPageTableColumnsIds.id ||
													_cellInfo.column.id ===
														ZWSMemberListPageTableColumnsIds.actions
														? '1.2'
														: '2.5'
												}
												className={classNames({
													'py-1 mt-1 border-b flex ion-align-items-center':
														true,
													'border-r': false,
													'ps-2':
														_cellInfo.column.id !==
														ZWSMemberListPageTableColumnsIds.id,
													'ps-0':
														_cellInfo.column.id ===
														ZWSMemberListPageTableColumnsIds.id,
												})}
											>
												<div
													className={classNames({
														'w-full text-sm ZaionsTextEllipsis': true,
														'ps-3':
															_cellInfo.column.id ===
															ZWSMemberListPageTableColumnsIds.id,
													})}
												>
													{flexRender(
														_cellInfo.column.columnDef.cell,
														_cellInfo.getContext()
													)}
												</div>
											</ZIonCol>
										) : null
									)}

									<ZIonCol
										size='.8'
										className={classNames({
											'py-1 mt-1 border-b ps-2 ion-justify-content-center flex ion-align-items-center':
												true,
											'border-r': false,
										})}
									>
										<ZIonButton
											fill='clear'
											color='dark'
											className='ion-no-padding ion-no-margin'
											size='small'
											testingselector={
												CONSTANTS.testingSelectors.shortLink.listPage.table
													.actionPopoverBtn
											}
											testingListSelector={`${CONSTANTS.testingSelectors.shortLink.listPage.table.actionPopoverBtn}-${_rowInfo.original.id}`}
											onClick={(_event: unknown) => {
												setCompState((oldVal) => ({
													...oldVal,
													selectedMemberId: _rowInfo.original.id || '',
												}));

												//
												presentZMemberActionPopover({
													_event: _event as Event,
													_cssClass: 'z_member_table_action_popover_width',
													_dismissOnSelect: false,
												});
											}}
										>
											<ZIonIcon icon={ellipsisVerticalOutline} />
										</ZIonButton>
									</ZIonCol>
								</ZIonRow>
							);
						})}
					</ZIonCol>
				</ZIonRow>
			</ZCustomScrollable>

			<ZIonRow className='w-full px-2 pt-1 pb-2 mt-2 overflow-hidden border rounded-lg ion-align-items-center zaions__light_bg'>
				<ZIonCol>
					{/* previous buttons */}
					<ZIonButton
						className='mr-1 ion-no-padding ion-no-margin'
						size='small'
						fill='clear'
						disabled={!zMembersTable.getCanPreviousPage()}
						testingselector={
							CONSTANTS.testingSelectors.WSSettings.teamListPage.table
								.getFirstPageButton
						}
						onClick={() => {
							if (zMembersTable.getCanPreviousPage()) {
								zNavigatePushRoute(
									createRedirectRoute({
										url: ZaionsRoutes.AdminPanel.Setting.AccountSettings
											.ViewTeam,
										params: [
											CONSTANTS.RouteParams.workspace.workspaceId,
											CONSTANTS.RouteParams.workspace.teamId,
										],
										values: [workspaceId, teamId],
										routeSearchParams: {
											pageindex: 0,
											pagesize: zMembersTable
												.getState()
												.pagination.pageSize.toString(),
										},
									})
								);

								zMembersTable.setPageIndex(0);
							}
						}}
					>
						<ZIonText className='px-1 text-xl'>{'<<'}</ZIonText>
					</ZIonButton>

					<ZIonButton
						className='mr-1 ion-no-padding ion-no-margin'
						size='small'
						fill='clear'
						disabled={!zMembersTable.getCanPreviousPage()}
						testingselector={
							CONSTANTS.testingSelectors.WSSettings.teamListPage.table
								.previousButton
						}
						onClick={() => {
							if (zMembersTable.getCanPreviousPage()) {
								zMembersTable.previousPage();

								zNavigatePushRoute(
									createRedirectRoute({
										url: ZaionsRoutes.AdminPanel.Setting.AccountSettings
											.ViewTeam,
										params: [
											CONSTANTS.RouteParams.workspace.workspaceId,
											CONSTANTS.RouteParams.workspace.teamId,
										],
										values: [workspaceId, teamId],
										routeSearchParams: {
											pageindex:
												zMembersTable.getState().pagination.pageIndex - 1,
											pagesize: zMembersTable
												.getState()
												.pagination.pageSize.toString(),
										},
									})
								);
							}
						}}
					>
						<ZIonText className='px-1 text-xl'>{'<'}</ZIonText>
					</ZIonButton>

					{/* next buttons */}
					<ZIonButton
						className='mr-1 ion-no-padding ion-no-margin'
						size='small'
						fill='clear'
						disabled={!zMembersTable?.getCanNextPage()}
						testingselector={
							CONSTANTS.testingSelectors.WSSettings.teamListPage.table
								.nextButton
						}
						onClick={() => {
							if (zMembersTable.getCanNextPage()) {
								zMembersTable.nextPage();

								zNavigatePushRoute(
									createRedirectRoute({
										url: ZaionsRoutes.AdminPanel.Setting.AccountSettings
											.ViewTeam,
										params: [
											CONSTANTS.RouteParams.workspace.workspaceId,
											CONSTANTS.RouteParams.workspace.teamId,
										],
										values: [workspaceId, teamId],
										routeSearchParams: {
											pageindex:
												zMembersTable.getState().pagination.pageIndex + 1,
											pagesize: zMembersTable
												.getState()
												.pagination.pageSize.toString(),
										},
									})
								);
							}
						}}
					>
						<ZIonText className='px-1 text-xl'>{'>'}</ZIonText>
					</ZIonButton>

					<ZIonButton
						className='mr-1 ion-no-padding ion-no-margin'
						size='small'
						fill='clear'
						disabled={!zMembersTable.getCanNextPage()}
						testingselector={
							CONSTANTS.testingSelectors.WSSettings.teamListPage.table
								.getLastPageButton
						}
						onClick={() => {
							if (zMembersTable.getCanNextPage()) {
								zMembersTable.setPageIndex(zMembersTable.getPageCount() - 1);

								zNavigatePushRoute(
									createRedirectRoute({
										url: ZaionsRoutes.AdminPanel.Setting.AccountSettings
											.ViewTeam,
										params: [
											CONSTANTS.RouteParams.workspace.workspaceId,
											CONSTANTS.RouteParams.workspace.teamId,
										],
										values: [workspaceId, teamId],
										routeSearchParams: {
											pageindex: zMembersTable.getPageCount() - 1,
											pagesize: zMembersTable
												.getState()
												.pagination.pageSize.toString(),
										},
									})
								);
							}
						}}
					>
						<ZIonText className='px-1 text-xl'>{'>>'}</ZIonText>
					</ZIonButton>
				</ZIonCol>

				{/* Col for pagination number like 1,2,3,...,n */}
				<ZIonCol></ZIonCol>

				<ZIonCol className='flex ion-align-items-center ion-justify-content-end'>
					<ZIonSelect
						minHeight='30px'
						fill='outline'
						className='bg-white w-[7rem] mt-1'
						interface='popover'
						value={zMembersTable.getState().pagination.pageSize}
						testingselector={
							CONSTANTS.testingSelectors.WSSettings.teamListPage.table
								.pageSizeInput
						}
						onIonChange={(e) => {
							zMembersTable.setPageSize(Number(e.target.value));

							zNavigatePushRoute(
								createRedirectRoute({
									url: ZaionsRoutes.AdminPanel.Setting.AccountSettings.ViewTeam,
									params: [
										CONSTANTS.RouteParams.workspace.workspaceId,
										CONSTANTS.RouteParams.workspace.teamId,
									],
									values: [workspaceId, teamId],
									routeSearchParams: {
										pageindex: zMembersTable.getPageCount() - 1,
										pagesize: Number(e.target.value),
									},
								})
							);
						}}
					>
						{[2, 3].map((pageSize) => (
							<ZIonSelectOption
								key={pageSize}
								value={pageSize}
								className='h-[2.3rem]'
							>
								Show {pageSize}
							</ZIonSelectOption>
						))}
					</ZIonSelect>
				</ZIonCol>
			</ZIonRow>
		</div>
	);
};

const ZMemberActionPopover: React.FC<{
	dismissZIonPopover: (data?: string, role?: string | undefined) => void;
	zNavigatePushRoute: (_url: string) => void;
	workspaceId: string;
	membersId: string;
	teamId: string;
}> = ({ dismissZIonPopover, workspaceId, membersId, teamId }) => {
	const [compState, setCompState] = useState<{
		currentMemberData?: WSTeamMembersInterface;
	}>();

	// #region custom hooks.
	const { getRQCDataHandler } = useZGetRQCacheData();
	const { updateRQCDataHandler } = useZUpdateRQCacheData();
	// #endregion

	// #region APIS.
	const { mutateAsync: resendInviteTeamMemberAsyncMutate } =
		useZRQUpdateRequest({
			_url: API_URL_ENUM.ws_team_member_resendInvite_list,
			_loaderMessage: 'Resending invitation.',
		});
	// #endregion

	useEffect(() => {
		try {
			const _allMemberRQCacheData = getRQCDataHandler({
				key: [
					CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
					workspaceId,
					teamId,
				],
			});

			const _allMember =
				extractInnerData<WSTeamMembersInterface[]>(
					_allMemberRQCacheData || [],
					extractInnerDataOptionsEnum.createRequestResponseItems
				) || [];

			const _currentMember = _allMember?.find((el) => el.id === membersId);

			setCompState((oldValues) => ({
				...oldValues,
				currentMemberData: _currentMember,
			}));
		} catch (error) {
			reportCustomError(error);
		}
	}, []);

	const ZResendInvitationHandler = async () => {
		try {
			const __response = await resendInviteTeamMemberAsyncMutate({
				urlDynamicParts: [
					CONSTANTS.RouteParams.workspace.workspaceId,
					CONSTANTS.RouteParams.workspace.teamId,
					CONSTANTS.RouteParams.workspace.invitationId,
				],
				itemIds: [workspaceId, teamId, membersId],
				requestData: '',
			});

			if ((__response as ZLinkMutateApiType<WSTeamMembersInterface>).success) {
				const __data = extractInnerData<WSTeamMembersInterface>(
					__response,
					extractInnerDataOptionsEnum.createRequestResponseItem
				);

				if (__data && __data.id) {
					await updateRQCDataHandler({
						key: [
							CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
							workspaceId,
							teamId,
						],
						data: __data,
						id: __data?.id!,
					});

					showSuccessNotification(MESSAGES.GENERAL.MEMBER.INVITE_RESEND);

					dismissZIonPopover('', '');
				}
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				const __apiErrors = (error.response?.data as { errors: ZGenericObject })
					?.errors;
			}
			reportCustomError(error);
		}
	};

	return (
		<ZIonList lines='none' className='ion-no-padding'>
			<ZCan havePermissions={[permissionsEnum.update_workspaceTeam]}>
				{/* Edit */}
				<ZIonItem
					button={true}
					detail={false}
					minHeight='2.5rem'
					testingselector={`${CONSTANTS.testingSelectors.WSSettings.teamListPage.table.editBtn}-${membersId}`}
					testingListSelector={
						CONSTANTS.testingSelectors.WSSettings.teamListPage.table.editBtn
					}
				>
					<ZIonButton
						size='small'
						expand='full'
						fill='clear'
						color='light'
						className='ion-text-capitalize'
					>
						<ZIonIcon
							icon={createOutline}
							className='w-5 h-5 me-2'
							color='secondary'
						/>
						<ZIonText color='secondary' className='text-[.9rem] pt-1'>
							Edit
						</ZIonText>
					</ZIonButton>
				</ZIonItem>

				{/* Resend invite link */}
				<ZIonItem
					button={true}
					detail={false}
					minHeight='2.5rem'
					testingselector={`${CONSTANTS.testingSelectors.WSSettings.teamListPage.table.resendInvitation}-${membersId}`}
					testingListSelector={
						CONSTANTS.testingSelectors.WSSettings.teamListPage.table
							.resendInvitation
					}
					disabled={
						compState?.currentMemberData?.resendAllowedAfter?.trim()?.length !==
							0 &&
						dayjs(compState?.currentMemberData?.resendAllowedAfter).isAfter(
							dayjs()
						)
					}
					onClick={async () => {
						if (
							compState?.currentMemberData?.resendAllowedAfter?.trim()
								?.length !== 0 &&
							dayjs(compState?.currentMemberData?.resendAllowedAfter).isBefore(
								dayjs()
							)
						) {
							console.log(
								compState?.currentMemberData?.resendAllowedAfter?.trim()
									?.length !== 0 &&
									dayjs(
										compState?.currentMemberData?.resendAllowedAfter
									).isBefore(dayjs())
							);
							await ZResendInvitationHandler();
						}
					}}
				>
					<ZIonButton
						size='small'
						expand='full'
						fill='clear'
						color='light'
						className='ion-text-capitalize'
					>
						<ZIonIcon
							icon={sendOutline}
							className='w-5 h-5 me-2'
							color='primary'
						/>
						<ZIonText color='primary' className='text-[.9rem] pt-1'>
							Resend invite link
						</ZIonText>
					</ZIonButton>
				</ZIonItem>

				{/* Delete */}
				<ZIonItem
					button={true}
					detail={false}
					minHeight='2.5rem'
					testingselector={`${CONSTANTS.testingSelectors.WSSettings.teamListPage.table.deleteBtn}-${membersId}`}
					testingListSelector={
						CONSTANTS.testingSelectors.WSSettings.teamListPage.table.deleteBtn
					}
				>
					<ZIonButton
						size='small'
						expand='full'
						fill='clear'
						color='light'
						className='ion-text-capitalize'
					>
						<ZIonIcon
							icon={trashBinOutline}
							className='w-5 h-5 me-2'
							color='danger'
						/>
						<ZIonText color='danger' className='text-[.9rem] pt-1'>
							Delete
						</ZIonText>
					</ZIonButton>
				</ZIonItem>
			</ZCan>
		</ZIonList>
	);
};

// Skeleton.
const ZaionsMembersTableSkeleton: React.FC = React.memo(() => {
	return (
		<div className='w-full overflow-y-hidden border rounded-lg ms-1 h-max zaions_pretty_scrollbar ion-no-padding'>
			{/* Row-1 */}
			<ZIonRow className='flex mb-2 flex-nowrap zaions__light_bg'>
				{/* Col-1 */}
				<ZIonCol
					size='.8'
					className='text-sm font-bold border-b ps-2 zaions__light_bg'
				>
					<ZIonSkeletonText width='2.3rem' height='.8rem' animated={true} />
				</ZIonCol>

				{/* Col-2 */}
				<ZIonCol
					size='3'
					className='text-sm font-bold border-b ps-2 zaions__light_bg'
				>
					<ZIonSkeletonText width='2.4rem' height='.8rem' animated={true} />
				</ZIonCol>

				{/* Col-3 */}
				<ZIonCol
					size='3'
					className='text-sm font-bold border-b ps-2 zaions__light_bg'
				>
					<ZIonSkeletonText width='2.5rem' height='.8rem' animated={true} />
				</ZIonCol>

				{/* Col-4 */}
				<ZIonCol className='text-sm font-bold border-b ps-2 zaions__light_bg'>
					<ZIonSkeletonText width='4.5rem' height='.8rem' animated={true} />
				</ZIonCol>

				{/* Col-5 */}
				<ZIonCol
					size='3'
					className='text-sm font-bold border-b ps-2 zaions__light_bg'
				>
					<ZIonSkeletonText width='4.5rem' height='.8rem' animated={true} />
				</ZIonCol>
			</ZIonRow>

			{/* Row-2 */}
			<ZIonRow className='rounded-b-lg'>
				<ZIonCol size='12' className='w-full ion-no-padding'>
					{[1, 2].map((el) => {
						return (
							<ZIonRow className='flex-nowrap' key={el}>
								{/* Row-2 Col-1 */}
								<ZIonCol
									size='.8'
									className='flex py-1 mt-1 border-b ps-4 ion-align-items-center'
								>
									<ZIonSkeletonText
										width='1rem'
										height='1rem'
										animated={true}
									/>
								</ZIonCol>

								<ZIonCol
									size='3'
									className='flex py-1 mt-1 border-b ps-2 ion-align-items-center'
								>
									<ZIonSkeletonText
										width='2.3rem'
										height='.8rem'
										animated={true}
									/>
								</ZIonCol>

								<ZIonCol
									size='3'
									className='flex py-1 mt-1 border-b ps-2 ion-align-items-center'
								>
									<ZIonSkeletonText
										width='4.3rem'
										height='.8rem'
										animated={true}
									/>
								</ZIonCol>

								<ZIonCol
									size='2.3'
									className='flex py-1 mt-1 border-b ps-2 ion-align-items-center'
								>
									<ZIonSkeletonText
										width='3.3rem'
										height='.8rem'
										animated={true}
									/>
								</ZIonCol>

								<ZIonCol
									size='3'
									className='flex py-1 mt-1 border-b ps-1 ion-align-items-center'
								>
									<ZIonSkeletonText
										width='3.3rem'
										height='.8rem'
										animated={true}
									/>
								</ZIonCol>
							</ZIonRow>
						);
					})}
				</ZIonCol>
			</ZIonRow>
		</div>
	);
});

export default React.memo(ZMembersListTable);
