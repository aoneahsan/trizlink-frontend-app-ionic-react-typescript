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
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonCheckbox,
	ZIonCol,
	ZIonIcon,
	ZIonRow,
	ZIonText,
	ZIonTitle,
} from '@/components/ZIonComponents';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	workspaceTeamInterface,
	ZWSTeamListPageTableColumnsIds,
} from '@/types/AdminPanel/workspace';
import { ellipsisVerticalOutline, fileTrayFullOutline } from 'ionicons/icons';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM } from '@/utils/enums';
import { useParams } from 'react-router';

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
 * About: (ZWSSettingTeamListTable -> ZWorkspaceSettingTeamListTable is table component for listing team data.)
 * @type {*}
 * */

const ZWSSettingTeamListTable: React.FC = () => {
	const { workspaceId } = useParams<{
		workspaceId: string;
	}>();

	// #region APIS
	// Request for getting teams data.
	const { data: WSTeamsData } = useZRQGetRequest<workspaceTeamInterface[]>({
		_url: API_URL_ENUM.workspace_team_create_list,
		_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.TEAM, workspaceId],
		_itemsIds: [workspaceId],
		_urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
	});

	console.log({ WSTeamsData });
	// #endregion

	// #region Managing table data with react-table.
	const columnHelper = createColumnHelper<workspaceTeamInterface>();
	const defaultColumns = [
		columnHelper.display({
			id: ZWSTeamListPageTableColumnsIds.id,
			header: 'Select',
			footer: 'Select Column Footer',
			cell: (_) => {
				return <ZIonCheckbox />;
			},
		}),

		// Title
		columnHelper.accessor((itemData) => itemData.title, {
			header: 'Title',
			id: ZWSTeamListPageTableColumnsIds.title,
			footer: 'Title',
		}),

		// Description
		columnHelper.accessor((itemData) => itemData.description, {
			header: 'Description',
			id: ZWSTeamListPageTableColumnsIds.description,
			footer: 'Description',
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
									testingSelector={`${CONSTANTS.testingSelectors.WSSettings.teamListPage.table.description}-${row.row.original.id}`}
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
	];

	const zTeamsTable = useReactTable({
		columns: defaultColumns,
		data: WSTeamsData || [],
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		debugTable: true,
		debugHeaders: true,
		debugColumns: true,
	});
	// #endregion

	return (
		<div>
			<ZCustomScrollable
				className='w-full overflow-hidden border rounded-lg h-max ion-no-padding zaions__bg_white'
				scrollX={true}
			>
				{zTeamsTable.getHeaderGroups().map((_headerInfo, _headerIndex) => {
					return (
						<ZIonRow
							key={_headerIndex}
							className='flex flex-nowrap zaions__bg_white'
						>
							{_headerInfo.headers.map((_columnInfo, _columnIndex) => {
								return (
									<ZIonCol
										key={_columnInfo.id}
										className={classNames({
											'border-b ps-2 py-1 font-bold zaions__bg_white text-sm':
												true,
											'border-r': false,
										})}
										size={
											_columnInfo.column.id ===
												ZWSTeamListPageTableColumnsIds.id ||
											_columnInfo.column.id ===
												ZWSTeamListPageTableColumnsIds.actions
												? '1.2'
												: _columnInfo.column.id ===
												  ZWSTeamListPageTableColumnsIds.description
												? '6.5'
												: '3.5'
										}
									>
										{_columnInfo.column.columnDef.header?.toString()}
									</ZIonCol>
								);
							})}

							<ZIonCol
								size='.8'
								className={classNames({
									'border-b ps-2 py-1 font-bold zaions__bg_white text-sm': true,
									'border-r': false,
								})}
							>
								Actions
							</ZIonCol>
						</ZIonRow>
					);
				})}

				{/* Body Section */}
				<ZIonRow className='rounded-b-lg zaions__bg_white'>
					{WSTeamsData?.length ? (
						<ZIonCol size='12' className='w-full ion-no-padding'>
							{zTeamsTable.getRowModel().rows.map((_rowInfo, _rowIndex) => {
								return (
									<ZIonRow key={_rowIndex} className='flex-nowrap'>
										{_rowInfo.getAllCells().map((_cellInfo, _cellIndex) =>
											_cellInfo.column.getIsVisible() ? (
												<ZIonCol
													key={_cellIndex}
													size={
														_cellInfo.column.id ===
															ZWSTeamListPageTableColumnsIds.id ||
														_cellInfo.column.id ===
															ZWSTeamListPageTableColumnsIds.actions
															? '1.2'
															: _cellInfo.column.id ===
															  ZWSTeamListPageTableColumnsIds.description
															? '6.5'
															: '3.5'
													}
													className={classNames({
														'py-1 mt-1 border-b flex ion-align-items-center':
															true,
														'border-r': false,
														'ps-2':
															_cellInfo.column.id !==
															ZWSTeamListPageTableColumnsIds.id,
														'ps-0':
															_cellInfo.column.id ===
															ZWSTeamListPageTableColumnsIds.id,
													})}
												>
													<div
														className={classNames({
															'w-full text-sm ZaionsTextEllipsis': true,
															'ps-3':
																_cellInfo.column.id ===
																ZWSTeamListPageTableColumnsIds.id,
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
												testingSelector={
													CONSTANTS.testingSelectors.shortLink.listPage.table
														.actionPopoverBtn
												}
												testingListSelector={`${CONSTANTS.testingSelectors.shortLink.listPage.table.actionPopoverBtn}-${_rowInfo.original.id}`}
												// onClick={(_event: unknown) => {
												// 	setCompState((oldVal) => ({
												// 		...oldVal,
												// 		selectedShortLinkId: _rowInfo.original.id || '',
												// 	}));

												// 	//
												// 	presentZShortLinkActionPopover({
												// 		_event: _event as Event,
												// 		_cssClass:
												// 			'zaions_present_folder_Action_popover_width',
												// 		_dismissOnSelect: false,
												// 	});
												// }}
											>
												<ZIonIcon icon={ellipsisVerticalOutline} />
											</ZIonButton>
										</ZIonCol>
									</ZIonRow>
								);
							})}
						</ZIonCol>
					) : (
						<ZIonCol className='py-3 ion-text-center'>
							<ZIonTitle className='mt-3'>
								<ZIonIcon
									icon={fileTrayFullOutline}
									className='mx-auto'
									size='large'
									color='medium'
								/>
							</ZIonTitle>
							<ZIonTitle color='medium'>
								No teams founds. please create a team.
							</ZIonTitle>
						</ZIonCol>
					)}
				</ZIonRow>
			</ZCustomScrollable>
		</div>
	);
};

export default ZWSSettingTeamListTable;
