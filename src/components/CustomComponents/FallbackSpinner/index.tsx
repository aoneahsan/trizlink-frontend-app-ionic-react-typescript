// Core Import
import { ZIonSpinner, ZIonText } from '@/components/ZIonComponents';
import React from 'react';

// Packages Import

// Type

const ZFallbackIonSpinner: React.FC = () => {
	return (
		<div className='w-100 zaions_h90vh position-relative'>
			<div
				className='position-absolute top-50 start-50 d-flex flex-column gap-2'
				style={{ transform: 'translate(-50%, -50%)' }}
			>
				<ZIonSpinner
					color='primary'
					className=''
					name='crescent'
					style={{ width: '50px', height: '50px' }}
				/>
				<ZIonText className='mt-3'>Loading...</ZIonText>
			</div>
		</div>
	);
};

export default ZFallbackIonSpinner;
