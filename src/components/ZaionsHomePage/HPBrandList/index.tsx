// Core Imports
import { Fragment, useLayoutEffect } from 'react';

// Packages Imports
import { useRecoilState } from 'recoil';
import { useMediaQuery } from 'react-responsive';

// Custom Imports
import ZaionsHr from '@/components/InPageComponents/Zaion_hr';
import {
	ZIonCol,
	ZIonText,
	ZIonImg,
	ZIonRow,
	ZIonGrid,
} from '@/components/ZIonComponents';

// Global Constant
import { BRACKPOINT_MD } from '@/utils/constants';

// Type
import { ZaionsHPBrandsType } from '@/types/ZionsHPBrandType';

// Recoil
import { ZaionsHPBrandsData } from '@/ZaionsStore/ZaionsHPBrandsRecoil';

// Data
import HPBrandData from '@/data/HPBrandListData';
import { Swiper, SwiperSlide } from 'swiper/react';

// const { Item: CarouselItem } = Carousel;

const ZaionsHPBrandList: React.FC = () => {
	const [loadedHPBrandsData, setLoadedHPBrandsData] =
		useRecoilState<ZaionsHPBrandsType[]>(ZaionsHPBrandsData);
	const isSMSclae = useMediaQuery({ query: `(max-width: ${BRACKPOINT_MD})` });
	const ZaionsCarousel = isSMSclae ? Swiper : Fragment;
	const ZaionsCarouselItem = isSMSclae ? SwiperSlide : Fragment;

	useLayoutEffect(() => {
		// Fetch Data From Database Later:-
		setLoadedHPBrandsData(HPBrandData);
	}, [setLoadedHPBrandsData]);

	return (
		<>
			<div className='ion-text-center ion-margin-top ion-padding-bottom'>
				<br />
				<ZIonText>
					<h2 className='font-bold'>
						Loved by big and small brands everywhere
					</h2>
				</ZIonText>
			</div>
			<div className='ion-padding-vertical'>
				<ZIonGrid>
					<ZIonRow className='ion-justify-content-center'>
						<ZaionsCarousel>
							<ZIonCol sizeLg='0' sizeMd='0' sizeSm='0' sizeXs='0'></ZIonCol>
							{loadedHPBrandsData.map((item) => (
								<ZaionsCarouselItem key={item.id}>
									<ZIonCol
										sizeXl='1.5'
										sizeLg='2.2'
										sizeMd='3.2'
										sizeSm='4.2'
										sizeXs='5.2'
										key={item.id}
									>
										<ZIonImg
											src={item.image}
											style={{ width: 'auto' }}
											alt=''
										/>
									</ZIonCol>
								</ZaionsCarouselItem>
							))}
							<ZIonCol sizeLg='0' sizeMd='0'></ZIonCol>
						</ZaionsCarousel>
					</ZIonRow>
				</ZIonGrid>
			</div>
			<ZaionsHr />
		</>
	);
};

export default ZaionsHPBrandList;
