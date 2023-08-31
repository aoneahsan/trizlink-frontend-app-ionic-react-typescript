// Core Imports
import {
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
import React, { useRef } from 'react';

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
	return (
		<ZIonPage>
			<ZIonContent>
				<ZIonGrid className='w-full h-full'>
					<div className='w-full h-full'>
						<AutoSizer>
							{({ height, width }) => {
								return (
									<List
										height={height}
										rowCount={ZCountryData.length}
										rowHeight={}
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
													<ZIonRow
														className='ion-justify-content-between'
														style={style}
													>
														<ZIonCol
															sizeXl='12'
															sizeLg='12'
															sizeMd='12'
															sizeSm='12'
															sizeXs='12'
															className='mb-2'
														>
															<ZIonInput
																minHeight='40px'
																labelPlacement='stacked'
																label='Redirection Links*'
															/>
														</ZIonCol>

														<ZIonCol
															sizeXl='5.8'
															sizeLg='5.8'
															sizeMd='5.8'
															sizeSm='12'
															sizeXs='12'
														>
															<ZIonInput
																minHeight='40px'
																labelPlacement='stacked'
																label='Redirection Links*'
															/>
														</ZIonCol>
													</ZIonRow>
												</CellMeasurer>
											);
										}}
									/>
								);
							}}
						</AutoSizer>
					</div>
				</ZIonGrid>
			</ZIonContent>
		</ZIonPage>
	);
};

export default ZaionsTestPage;
