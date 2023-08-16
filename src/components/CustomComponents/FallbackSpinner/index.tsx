// Core Import
import { ZIonSpinner, ZIonText } from '@/components/ZIonComponents';
import React from 'react';

// Packages Import

// Type

const ZFallbackIonSpinner: React.FC = () => {
	return (
		<div className='w-full h-[90vh] relative'>
			<div
				className='absolute flex flex-col gap-2 top-1/2 start-1/2'
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

export const ZFallbackIonSpinner2: React.FC = () => {
	return (
		<div className='flex w-full h-full ion-align-items-center ion-justify-content-center'>
			<ZIonSpinner
				color='primary'
				className=''
				name='crescent'
				style={{ width: '50px', height: '50px' }}
			/>
		</div>
	);
};

export default ZFallbackIonSpinner;
