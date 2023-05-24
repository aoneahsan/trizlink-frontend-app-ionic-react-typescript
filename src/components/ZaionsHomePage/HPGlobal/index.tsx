// Core imports
import { useLayoutEffect } from 'react';

// Packages Imports
import { useRecoilState } from 'recoil';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';

// Custom Imports
import ZaionsHr from '@/components/InPageComponents/Zaions_hr';
import {
	ZIonCol,
	ZIonText,
	ZIonRow,
	ZIonGrid,
	ZIonImg,
} from '@/components/ZIonComponents';

// Type
import { ZaionsHPGlobalType } from '@/types/ZaionsHPGlobalType';

// Recoil State
import { ZaionsHPGlobalData } from '@/ZaionsStore/ZaionsHPGlobalRecoil';

// Global Constant
import { BRACKPOINT_LG, BRACKPOINT_MD } from '@/utils/constants';

// Data
import HPGlobalData from '@/data/HPGlobalData';

// Images
import { GlobeImage } from '@/assets/images';

const ZaionsHPGlobal: React.FC = () => {
	const [loadedHPGlobalData, setLoadedHPGlobalData] =
		useRecoilState<ZaionsHPGlobalType[]>(ZaionsHPGlobalData);

	useLayoutEffect(() => {
		// Featch Data From Database Later:-
		setLoadedHPGlobalData(HPGlobalData);
	}, [setLoadedHPGlobalData]);

	const isLgScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_LG})`,
	});

	const isMdScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_MD})`,
	});

	return (
		<>
			<ZIonGrid className='ion-margin-vertical ion-padding-top'>
				<ZIonRow className='ion-margin-top ion-padding-top'>
					<ZIonCol></ZIonCol>
					<ZIonCol sizeXl='5' sizeLg='6' sizeMd='12' sizeSm='12' sizeXs='12'>
						<ZIonImg className='w-full' src={GlobeImage} />
					</ZIonCol>
					<ZIonCol
						sizeXl='5'
						sizeLg='5'
						sizeMd='12'
						sizeSm='12'
						sizeXs='12'
						className='mt-5'
					>
						<div className='ion-margin-vertical ion-padding-top'>
							<ZIonText className='flex '>
								<ZIonGrid>
									{loadedHPGlobalData.map((item) => (
										<ZIonRow
											className={classNames({
												'ion-align-items-center': true,
												'ion-justify-content-center': !isLgScale,
											})}
											key={item.id}
										>
											<ZIonCol
												sizeXl='0'
												sizeLg='0'
												sizeMd='0'
												sizeSm='0'
												sizeXs='0'
											></ZIonCol>
											<ZIonCol
												sizeXl='4'
												sizeLg='4'
												sizeMd='3'
												sizeSm='5'
												sizeXs='12'
												className={`${
													!isMdScale ? 'ion-text-center' : 'ion-text-right'
												}`}
											>
												<ZIonText>
													<h1 style={{ fontSize: '40px', fontWeight: '800' }}>
														{item.subscribers}
													</h1>
												</ZIonText>
											</ZIonCol>
											<ZIonCol
												// className={`ps-4 ${!isMdScale && 'ion-text-center'}`}
												className={classNames({
													'ps-4': true,
													'ion-text-center': !isMdScale,
												})}
												sizeXl='7'
												sizeLg='5'
												sizeMd='5'
												sizeSm='6.5'
												sizeXs='12'
											>
												<h5>{item.text}</h5>
											</ZIonCol>
											<ZIonCol
												sizeLg='0'
												sizeXl='0'
												sizeMd='1'
												sizeSm='0'
												sizeXs='0'
											></ZIonCol>
											<div
												// className={`zaions_hr ${!isLgScale && 'w-full'}`}
												className={classNames({
													zaions_hr: true,
													'w-full': !isLgScale,
												})}
											></div>
										</ZIonRow>
									))}
								</ZIonGrid>
							</ZIonText>
						</div>
					</ZIonCol>
					<ZIonCol></ZIonCol>
				</ZIonRow>
				<ZaionsHr />
			</ZIonGrid>
		</>
	);
};

export default ZaionsHPGlobal;
