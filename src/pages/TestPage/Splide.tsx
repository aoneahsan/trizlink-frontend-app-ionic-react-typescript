// Core Imports
import {
	ZSwiperContainer,
	ZSwiperSlide,
} from '@/components/CustomComponents/ZSwiper';
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
import ZIonPage from '@/components/ZIonPage';
import { ZCountryData } from '@/data/DiscoverEnterprise/index.data';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';

// Packages Imports
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
// import PhoneInput from 'react-phone-input-2';
// Custom Imports

// Global constant// Default theme
import '@splidejs/react-splide/css';

// or other themes
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';

// or only core styles
import '@splidejs/react-splide/css/core';

// import 'react-phone-input-2/lib/style.css';

const ZaionsTestPage: React.FC = () => {
	new Splide('.splide', {
		classes: {
			arrows: 'splide__arrows your-class-arrows',
			arrow: 'splide__arrow your-class-arrow',
			prev: 'splide__arrow--prev your-class-prev',
			next: 'splide__arrow--next your-class-next',
		},
	});
	return (
		<ZIonPage>
			<ZIonContent>
				<ZIonRow>
					<ZIonCol>
						<Splide hasTrack={false}>
							<div className='splide__arrows'>
								<button className='splide__arrow splide__arrow--prev'>
									{'<<'}
								</button>
								<button className='splide__arrow splide__arrow--next'>
									{'>>'}
								</button>
							</div>

							<SplideTrack>
								<SplideSlide>
									Lorem ipsum dolor sit, amet consectetur adipisicing elit.
									Delectus debitis dignissimos odit neque consequuntur modi, ut,
									magnam molestiae non dolor architecto! Eos vitae ab molestias
									quaerat beatae consequatur obcaecati quod?
								</SplideSlide>
								<SplideSlide>
									Lorem ipsum dolor sit, amet consectetur adipisicing elit.
									Delectus debitis dignissimos odit neque consequuntur modi, ut,
									magnam molestiae non dolor architecto! Eos vitae ab molestias
									quaerat beatae consequatur obcaecati quod?
								</SplideSlide>
							</SplideTrack>
						</Splide>
					</ZIonCol>
				</ZIonRow>
			</ZIonContent>
		</ZIonPage>
	);
};

export default ZaionsTestPage;
