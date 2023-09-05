// Core Imports
import React, { useEffect } from 'react';

// Packages Imports
import classNames from 'classnames';
import Swiper from 'swiper';
// import 'swiper/swiper-bundle.min.css';
// Swiper.use([Navigation, Pagination]);
// Custom Imports
import ZIonPage from '@/components/ZIonPage';
import {
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonInput,
	ZIonRow,
	ZIonSelect,
	ZIonSelectOption,
	ZIonText,
	ZIonTitle,
} from '@/components/ZIonComponents';
import {
	ZSwiperContainer,
	ZSwiperSlide,
} from '@/components/CustomComponents/ZSwiper';

//
const ZaionsTestPage: React.FC = () => {
	useEffect(() => {
		new Swiper('.mySwiper', {
			slidesPerView: 3,
			grid: {
				rows: 3,
			},
			mousewheel: {
				forceToAxis: true,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	}, []);
	return (
		<ZIonPage>
			<ZIonContent>
				<div className='swiper mySwiper'>
					<div className='swiper-wrapper'>
						<div className='swiper-slide'>Slide 1</div>
						<div className='swiper-slide'>Slide 2</div>
						<div className='swiper-slide'>Slide 3</div>
						<div className='swiper-slide'>Slide 4</div>
						<div className='swiper-slide'>Slide 5</div>
						<div className='swiper-slide'>Slide 6</div>
						<div className='swiper-slide'>Slide 7</div>
						<div className='swiper-slide'>Slide 8</div>
						<div className='swiper-slide'>Slide 9</div>
					</div>
					<div className='swiper-button-next'></div>
					<div className='swiper-button-prev'></div>
				</div>
			</ZIonContent>
		</ZIonPage>
	);
};

export default ZaionsTestPage;
