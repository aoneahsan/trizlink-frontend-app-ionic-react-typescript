// Core Imports
import {
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonInput,
	ZIonRow,
	ZIonSelect,
	ZIonSelectOption,
} from '@/components/ZIonComponents';
import ZIonPage from '@/components/ZIonPage';
import { ZCountryData } from '@/data/DiscoverEnterprise/index.data';
import React, { useRef, useState } from 'react';

// Packages Imports
import {
	List,
	AutoSizer,
	CellMeasurer,
	CellMeasurerCache,
} from 'react-virtualized';
// import PhoneInput from 'react-phone-input-2';
// Custom Imports

// Global constant

// import 'react-phone-input-2/lib/style.css';

const ZaionsTestPage: React.FC = () => {
	const cache = useRef(
		new CellMeasurerCache({
			fixedWidth: true,
			defaultHeight: 100,
		})
	);
	const [first, setfirst] = useState([...Array(10)]);

	const data = [...Array(10)];

	return (
		<ZIonPage>
			<ZIonContent>
				<ZIonGrid className='w-full h-[50%]'>
					<div className='w-full h-full'>
						<AutoSizer>
							{({ height, width }) => {
								return (
									<List
										height={height}
										rowCount={first.length}
										rowHeight={70}
										deferredMeasurementCache={cache.current}
										width={width}
										rowRenderer={({
											columnIndex,
											index,
											key,
											isVisible,
											isScrolling,
											parent,
											style,
										}) => {
											const country = ZCountryData[index];

											return (
												<CellMeasurer
													key={key}
													cache={cache.current}
													parent={parent}
													columnIndex={0}
													rowIndex={index}
												>
													<div style={{ ...style }}>
														<ZIonRow className='ion-justify-content-between'>
															<ZIonCol
																sizeXl='12'
																sizeLg='12'
																sizeMd='12'
																sizeSm='12'
																sizeXs='12'
																className='mb-0'
															>
																<ZIonInput
																	minHeight='40px'
																	labelPlacement='stacked'
																	label='Redirection Links*'
																	value={index}
																/>
															</ZIonCol>

															{/* <ZIonCol
																sizeXl='5.8'
																sizeLg='5.8'
																sizeMd='5.8'
																sizeSm='12'
																sizeXs='12'
																className='mt-0'
															>
																<ZIonInput
																	minHeight='40px'
																	labelPlacement='stacked'
																	label='Redirection Links*'
																/>
															</ZIonCol> */}
														</ZIonRow>
													</div>
												</CellMeasurer>
											);
										}}
									/>
								);
							}}
						</AutoSizer>
					</div>
				</ZIonGrid>
				<ZIonButton
					onClick={() => {
						setfirst((oldValues) => [...oldValues, 8]);
					}}
				>
					add
				</ZIonButton>
			</ZIonContent>
		</ZIonPage>
	);
};

export default ZaionsTestPage;
