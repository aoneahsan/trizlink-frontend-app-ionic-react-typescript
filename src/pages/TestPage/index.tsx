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
	ZIonText,
} from '@/components/ZIonComponents';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';

// Packages Imports

// Custom Imports

import {
	ZSwiperContainer,
	ZSwiperSlide,
} from '@/components/CustomComponents/ZSwiper';
import ZIonPage from '@/components/ZIonPage';
import Swiper from 'swiper';

const ZaionsTestPage: React.FC = () => {
	const swiperRef = useRef(null);
	React.useEffect(() => {
		try {
			const swiperObj = new Swiper('.zswiper-container', {
				slidesPerView: 3,
				grid: {
					rows: 3,
				},
				mousewheel: {
					forceToAxis: true,
				},
			});

			console.log({ swiperObj });
		} catch (error) {
			console.log({ error });
		}
	}, []);

	return (
		<ZIonPage>
			<ZIonContent>
				<ZIonRow className='zswiper-container'>
					<ZIonCol>
						<swiper-container
							// class={'mySwiper'}
							ref={swiperRef}
							slides-per-view={3}
							space-between={0}
							mousewheel-force-to-axis='true'
							// onSwiper={onSwiper}
							// onSlideChange={onSlideChange}
							// navigation='true'
							// pagination='true'
						>
							{[
								1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1,
								2, 3, 4, 5, 6, 7, 8, 9, 10,

								1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
							].map((el, index) => {
								return <swiper-slide key={index}>{el}</swiper-slide>;
							})}
						</swiper-container>
					</ZIonCol>
					<hr />
					<ZIonCol>
						<ZIonButton
							onClick={() => {
								try {
									if (swiperRef.current) {
										console.log(swiperRef.current);
										// swiperRef.current?.loop();
									}
								} catch (error) {
									console.error({ error });
								}
							}}
						>
							go next
						</ZIonButton>
						<ZIonButton
							onClick={() => {
								try {
									if (swiperRef.current) {
										// swiperRef.current?.slidePrev();
									}
								} catch (error) {
									console.error({ error });
								}
							}}
						>
							go back
						</ZIonButton>
					</ZIonCol>
				</ZIonRow>
			</ZIonContent>
		</ZIonPage>
	);
};

export default ZaionsTestPage;
