// Core Import
import { ZIonSpinner, ZIonText } from '@/components/ZIonComponents';
import React from 'react';

// Packages Import

// Type

const ZFallbackIonSpinner: React.FC = () => {
	return (
		<div className='w-full relative'>
			<div
				className='absolute flex flex-col gap-2 top-50 start-50'
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
