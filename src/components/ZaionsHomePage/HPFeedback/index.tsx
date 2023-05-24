// Core Imports
import React from 'react';

// Packages Imports

// Custom Imports
import ZaionsCarousel from '@/components/InPageComponents/ZaionsCarousel';

// Style

// Global Constant
import { PRODUCT_NAME } from '@/utils/constants';
import { ZIonText } from '@/components/ZIonComponents';

const ZaionsHPUsersFeedBack: React.FC = () => {
	return (
		<>
			<div className='ion-text-center ion-margin-bottom mt-5 ion-padding-bottom'>
				<ZIonText>
					<h2
						className='text-3xl'
						style={{ fontWeight: '800', color: '#252628' }}
					>
						What {PRODUCT_NAME} customers are saying
					</h2>
				</ZIonText>
			</div>
			<ZaionsCarousel />
		</>
	);
};

export default ZaionsHPUsersFeedBack;
