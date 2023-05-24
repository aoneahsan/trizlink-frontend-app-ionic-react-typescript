// Core Imports
import React from 'react';

// Packages Imports

// Custom Imports
import ZaionsCarouselActions from './CarouselAction';
import ZaionsHr from '@/components/InPageComponents/Zaions_hr';
import ZaionsCarouselSlider from './CarouselSlider';

// Style

// Global Constants

const ZaionsCarousel: React.FC = () => {
	return (
		<>
			<ZaionsCarouselSlider />
			{/* <ZaionsCarouselActions /> */}
			<ZaionsHr />
		</>
	);
};

export default ZaionsCarousel;
