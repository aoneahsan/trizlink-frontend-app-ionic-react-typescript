// Core Imports
import { Fragment, useLayoutEffect } from 'react';

// Packages Imports
import { useRecoilState } from 'recoil';
import classNames from 'classnames';

// Custom Imports
import {
	ZIonCol,
	ZIonRow,
	ZIonText,
	ZIonGrid,
	ZIonImg,
} from '@/components/ZIonComponents';

// Type
import { ZaionsHPBrandsType } from '@/types/ZionsHPBrandType';

// Recoil
import { ZaionsHPBrandsData } from '@/ZaionsStore/ZaionsHPBrandsRecoil';

// Global Constant

// Data
import HPBrandData from '@/data/HPBrandListData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

const ZaionsInpageBrandsList: React.FC<{
	title?: string;
	className?: string;
}> = (props) => {
	const [loadedHPBrandsData, setLoadedHPBrandsData] =
		useRecoilState<ZaionsHPBrandsType[]>(ZaionsHPBrandsData);

	const { isLgScale } = useZMediaQueryScale();

	//
	const ZaionsCarousel = !isLgScale ? Swiper : Fragment;
	const ZaionsCarouselItem = !isLgScale ? SwiperSlide : Fragment;

	//
	useLayoutEffect(() => {
		// Fetch Data From Database Later:-
		setLoadedHPBrandsData(HPBrandData);
	}, [setLoadedHPBrandsData]);

	return (
		<>
			<div
				className={`${classNames(props.className, {
					'ion-text-center ion-margin-top ion-padding-bottom': true,
				})}`}
			>
				<br />
				<ZIonText>
					<h2 className='font-bold'>{props.title}</h2>
				</ZIonText>
			</div>
			<div className='ion-padding-vertical'>
				<ZIonGrid>
					<ZIonRow className='ion-justify-content-center'>
						<ZaionsCarousel
							spaceBetween={0}
							slidesPerView={1}
							onSlideChange={() => {}}
							onSwiper={(_) => {}}
							style={{ width: '100%' }}
						>
							{loadedHPBrandsData.map((item) => (
								<ZaionsCarouselItem key={item.id}>
									<ZIonCol
										sizeXl='1.4'
										sizeLg='2.2'
										sizeMd='3.2'
										sizeSm='12'
										sizeXs='12'
										key={item.id}
									>
										<ZIonImg
											src={item.image}
											className={classNames({
												'w-[60%]': !isLgScale,
											})}
										/>
									</ZIonCol>
								</ZaionsCarouselItem>
							))}
						</ZaionsCarousel>
					</ZIonRow>
				</ZIonGrid>
			</div>
		</>
	);
};

export default ZaionsInpageBrandsList;
