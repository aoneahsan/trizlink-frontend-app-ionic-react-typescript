import React from 'react';
import {
	useReactTable,
	createColumnHelper,
	RowModel,
	Table,
	getCoreRowModel,
	flexRender,
} from '@tanstack/react-table';
import CLASSES from './styles.module.css';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// const PRODUCTS_API_URL = 'https://fakestoreapi.com/products';

import PRODUCTS from './_data.json';
import classNames from 'classnames';
import ZIonPage from '@/components/ZIonPage';
import { ZIonContent } from '@/components/ZIonComponents';

const TestingReactTable: React.FC = () => {
	// const { isLoading, isError, data } = useQuery({
	//   queryKey: ['products'],
	//   queryFn: () => axios.get(PRODUCTS_API_URL),
	// });
	// TODO: from "https://www.youtube.com/@Steve8708/videos" check how we can get type of a object properly in TS
	const columnHelper = createColumnHelper<(typeof PRODUCTS)[0]>();
	const tableColumns = [
		// columnHelper.display({
		// 	id: 'row_count_index',
		// 	cell: (row) => <>Row Count Index</>,
		// 	enableHiding: true,
		// }),
		columnHelper.accessor('id', {
			header: 'ID (display)',
			id: '__manual-ID-For-ID-Column',
			cell: (rowInfo) => rowInfo.getValue(),
		}),
		columnHelper.accessor((itemData) => itemData.title + ' AHSAN', {
			header: 'Title',
			id: '__title__',
		}),
	];
	const rTableInstance = useReactTable({
		columns: tableColumns,
		data: PRODUCTS,
		getCoreRowModel: getCoreRowModel(),
	});

	console.count('TestingReactTable Main Rerendered count.');
	console.log({
		li: 'main log 1',
		PRODUCTS,
		idColumn: rTableInstance
			.getCoreRowModel()
			.rows[0].getVisibleCells()[0]
			.getContext()
			.getValue(),
	});

	// console.log({
	// 	li: 'main log 2',
	// 	headerGroups: rTableInstance.getHeaderGroups(),
	// });

	// show all columns
	// rTableInstance.getIsAllColumnsVisible()
	// rTableInstance.toggleAllColumnsVisible(true)

	// rTableInstance.getAllFlatColumns;  rating

	return (
		<ZIonPage>
			<ZIonContent>
				<h1>React Table</h1>
				<table border={1}>
					<thead>
						{rTableInstance
							.getHeaderGroups()
							.map((_headerGroup, _headerGroupIndex) => {
								return (
									<tr key={_headerGroupIndex}>
										<th className={classNames(CLASSES.rti__tableCell)}>
											Row Index
										</th>
										{_headerGroup.headers.map(
											(_headerCellInfo, _headerCellIndex) => {
												console.log({
													li: '_headerGroup.headers.map log 1',
													_headerCellInfo,
												});
												return (
													<th
														key={_headerCellIndex}
														className={classNames(CLASSES.rti__tableCell)}
													>
														{_headerCellInfo.column.columnDef.header?.toString()}
													</th>
												);
											}
										)}
									</tr>
								);
							})}
					</thead>

					<tbody>
						{rTableInstance
							.getCoreRowModel()
							.rows.map((_rowInfo, _rowIndex) => {
								return (
									<tr key={_rowIndex}>
										<td className={classNames(CLASSES.rti__tableCell)}>
											{1 + _rowIndex}
										</td>
										{_rowInfo.getAllCells().map((_cellInfo, _cellIndex) => {
											return (
												<td
													key={_cellIndex}
													className={classNames(CLASSES.rti__tableCell)}
												>
													{/* {_cellInfo.column.columnDef.cell?.toString()} */}
													{flexRender(
														_cellInfo.column.columnDef.cell,
														_cellInfo.getContext()
													)}
												</td>
											);
										})}
									</tr>
								);
							})}
					</tbody>

					<tfoot>
						{rTableInstance
							.getFooterGroups()
							.map((_footerGroupInfo, _footerGroupIndex) => {
								return (
									<tr key={_footerGroupIndex}>
										{_footerGroupInfo.headers.map(
											(_footerCell, _footerCellIndex) => {
												return (
													<td key={_footerCellIndex}>
														{_footerCell.column.columnDef.header?.toString()}
													</td>
												);
											}
										)}
									</tr>
								);
							})}
					</tfoot>
				</table>
			</ZIonContent>
		</ZIonPage>
	);
};

export default TestingReactTable;
