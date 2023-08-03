import React from 'react';
import {
	ZIonCheckbox,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonRow,
} from '@/components/ZIonComponents';
import ZaionsIonPage from '@/components/ZaionsIonPage';
import PRODUCTS from './_data.json';
import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core';
import { flexRender, useReactTable } from '@tanstack/react-table';

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
			cell: (props) => <ZIonCheckbox />,
		}),

		columnHelper.accessor((itemData) => itemData.title, {
			header: 'title',
			id: '__z_title__',
		}),

		columnHelper.accessor((itemData) => itemData.price, {
			header: 'Price',
			id: '__z_price__',
		}),

		columnHelper.accessor('category', {
			header: 'Category',
			id: '__z_category__',
			cell: (row) => row.getValue(),
		}),
	];

	const zTable = useReactTable({
		columns: defaultColumns,
		data: PRODUCTS,
		getCoreRowModel: getCoreRowModel(),
	});

	console.log(zTable.getHeaderGroups(), zTable.getCoreRowModel().rows);

	return (
		<ZaionsIonPage>
			<ZIonContent>
				<ZIonGrid>
					{zTable.getHeaderGroups().map((_headerInfo, _headerIndex) => {
						return (
							<ZIonRow key={_headerIndex} className='border'>
								{_headerInfo.headers.map((_columnInfo, _columnIndex) => {
									return (
										<ZIonCol key={_columnIndex} className='border-r'>
											{_columnInfo.column.columnDef.header?.toString()}
										</ZIonCol>
									);
								})}
							</ZIonRow>
						);
					})}
					<ZIonRow className='border'>
						<ZIonCol size='12' className='ion-no-padding'>
							{zTable.getCoreRowModel().rows.map((_rowInfo, _rowIndex) => {
								return (
									<ZIonRow key={_rowIndex} className='border-b'>
										{_rowInfo.getAllCells().map((_cellInfo, _cellIndex) => {
											return (
												<ZIonCol key={_cellIndex} className='border-r'>
													{flexRender(
														_cellInfo.column.columnDef.cell,
														_cellInfo.getContext()
													)}
												</ZIonCol>
											);
										})}
									</ZIonRow>
								);
							})}
						</ZIonCol>
					</ZIonRow>
				</ZIonGrid>
			</ZIonContent>
		</ZaionsIonPage>
	);
};

export default TestingReactTable;
