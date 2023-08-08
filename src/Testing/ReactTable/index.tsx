import React, { useEffect } from 'react';
import {
	ZIonButton,
	ZIonCheckbox,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonRow,
	ZIonTitle,
} from '@/components/ZIonComponents';
import ZaionsIonPage from '@/components/ZaionsIonPage';
import PRODUCTS from './_data_copy.json';
import {
	createColumnHelper,
	getCoreRowModel,
	getPaginationRowModel,
} from '@tanstack/table-core';
import { flexRender, useReactTable } from '@tanstack/react-table';
import classNames from 'classnames';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';

const TestingReactTable: React.FC = () => {
	//
	const columnHelper = createColumnHelper<(typeof PRODUCTS)[0]>();

	const defaultColumns = [
		// columnHelper.accessor('id', {
		// 	header: 'Id',
		// 	id: '__z_id__',
		// 	cell: (row) => row.getValue(),
		// }),

		columnHelper.display({
			id: 'id',
			header: 'Select',
			footer: 'Select Column Footer',
			cell: (props) => {
				return (
					<>
						<ZIonCheckbox />
					</>
				);
			},
		}),

		columnHelper.accessor((itemData) => itemData.title, {
			header: 'title',
			id: '__z_title__',
			footer: 'Title Footer',
		}),
		// columnHelper.group({
		// 	id: 'title_parent',
		// 	header: 'title parent',
		// 	columns: [
		// 		columnHelper.display({
		// 			id: 'title_child',
		// 			header: 'title child',
		// 		}),
		// 	],
		// }),

		columnHelper.accessor((itemData) => itemData.price, {
			id: '__z_price__',
			header: 'Price',
			footer: 'Price Footer',
		}),

		columnHelper.accessor('category', {
			header: 'Category',
			id: '__z_category__',
			cell: (row) => row.getValue(),
			footer: 'Category Footer',
		}),

		columnHelper.group({
			id: 'ratingsColumn',
			header: 'Rating',
			footer: 'Rating Footer',
			columns: [
				// columnHelper.display({
				// 	id: 'ratingsColumn__rate',
				// 	header: 'rate',
				// 	footer: 'rate footer',
				// 	cell: (props) => {
				// 		return <span>rating</span>;
				// 	},
				// }),

				columnHelper.accessor((props) => props.rating.rate, {
					header: 'Rate',
					footer: 'Rate Column Footer',
				}),
				columnHelper.accessor((props) => props.rating.count, {
					header: 'Count',
					footer: 'Count Column Footer',
				}),
			],
		}),
	];

	const zTable = useReactTable({
		columns: defaultColumns,
		data: PRODUCTS,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	useEffect(() => {
		zTable.setPageIndex(0);
		zTable.setPageSize(2);
	}, []);

	return (
		<ZaionsIonPage>
			<ZIonContent>
				{/* Main Container */}
				<ZIonGrid>
					<ZIonRow>
						<ZIonCol>
							<ZIonTitle>All Columns</ZIonTitle>
							<ZRCSwitch
								checked={zTable.getIsAllColumnsVisible()}
								onChange={(isChecked) => {
									zTable.toggleAllColumnsVisible(isChecked);
								}}
							/>
							<ZIonTitle>Price Column</ZIonTitle>
							<ZRCSwitch
								checked={zTable.getColumn('__z_price__')?.getIsVisible()}
								onChange={(isChecked) => {
									zTable.getColumn('__z_price__')?.toggleVisibility(isChecked);
								}}
							/>
						</ZIonCol>
					</ZIonRow>

					<br />
					{/* Header Section */}
					{/* Header Groups test */}
					{zTable.getHeaderGroups().map((_headerInfo, _headerIndex) => {
						return (
							<ZIonRow key={_headerIndex} className='border bg-lime-500'>
								{_headerInfo.headers.map((_columnInfo, _columnIndex) => {
									return (
										<ZIonCol
											key={_columnIndex}
											className={classNames('border-r', {
												'text-red-500':
													_columnInfo.column.id === 'ratingsColumn',
											})}
										>
											{_columnInfo.column.columnDef.header?.toString()}
										</ZIonCol>
									);
								})}
							</ZIonRow>
						);
					})}
					<br />

					{/* Body Section */}
					<ZIonRow className='border'>
						<ZIonCol size='12' className='ion-no-padding'>
							{zTable.getRowModel().rows.map((_rowInfo, _rowIndex) => {
								return (
									<ZIonRow
										key={_rowIndex}
										className={classNames('border-b', {
											'bg-slate-50': _rowIndex % 2 === 0,
											'bg-slate-300': _rowIndex % 2 !== 0,
										})}
									>
										{_rowInfo.getAllCells().map((_cellInfo, _cellIndex) => {
											return (
												<React.Fragment key={_cellIndex}>
													{_cellInfo.column.getIsVisible() ? (
														<ZIonCol key={_cellIndex} className='border-r'>
															{flexRender(
																_cellInfo.column.columnDef.cell,
																_cellInfo.getContext()
															)}
														</ZIonCol>
													) : null}
												</React.Fragment>
											);
										})}
									</ZIonRow>
								);
							})}
						</ZIonCol>
					</ZIonRow>

					{/* Footer Section */}
					<br />
					{zTable.getFooterGroups().map((_footerInfo, _footerIndex) => {
						return (
							<ZIonRow key={_footerIndex} className='bg-orange-300 border'>
								{_footerInfo.headers.map((_columnInfo, _columnIndex) => {
									return (
										<ZIonCol key={_columnIndex} className='border-r'>
											{_columnInfo.column.columnDef.footer?.toString()}
										</ZIonCol>
									);
								})}
							</ZIonRow>
						);
					})}

					<div className='h-2' />
					<div className='flex items-center gap-2'>
						{/* previous and next buttons */}
						<>
							<button
								className='p-1 border rounded'
								onClick={() => zTable.setPageIndex(0)}
								disabled={!zTable.getCanPreviousPage()}
							>
								{'<<'}
							</button>
							<button
								className='p-1 border rounded'
								onClick={() => zTable.previousPage()}
								disabled={!zTable.getCanPreviousPage()}
							>
								{'<'}
							</button>
							<button
								className='p-1 border rounded'
								onClick={() => zTable.nextPage()}
								disabled={!zTable.getCanNextPage()}
							>
								{'>'}
							</button>
							<button
								className='p-1 border rounded'
								onClick={() => zTable.setPageIndex(zTable.getPageCount() - 1)}
								disabled={!zTable.getCanNextPage()}
							>
								{'>>'}
							</button>
						</>

						{/* Go to Page */}
						<>
							<span className='flex items-center gap-1'>
								<div>Page</div>
								<strong>
									{zTable.getState().pagination.pageIndex + 1} of{' '}
									{zTable.getPageCount()}
								</strong>
							</span>
							<span className='flex items-center gap-1'>
								| Go to page:
								<input
									type='number'
									defaultValue={zTable.getState().pagination.pageIndex + 1}
									onChange={(e) => {
										const page = e.target.value
											? Number(e.target.value) - 1
											: 0;
										zTable.setPageIndex(page);
									}}
									className='w-16 p-1 border rounded'
								/>
							</span>
						</>

						{/* Page Size */}
						<select
							value={zTable.getState().pagination.pageSize}
							onChange={(e) => {
								zTable.setPageSize(Number(e.target.value));
							}}
						>
							{[2, 3].map((pageSize) => (
								<option key={pageSize} value={pageSize}>
									Show {pageSize}
								</option>
							))}
						</select>
					</div>
					<div>{zTable.getRowModel().rows.length} Rows</div>
					<pre>{JSON.stringify(zTable.getState().pagination, null, 2)}</pre>
				</ZIonGrid>
			</ZIonContent>
		</ZaionsIonPage>
	);
};

export default TestingReactTable;
