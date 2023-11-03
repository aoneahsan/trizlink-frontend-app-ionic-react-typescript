// Core Import
import React from 'react';

// Packages Import
import { ProductFaviconSmall } from '@/assets/images';
import { ZIonImg, ZIonSpinner } from '@/components/ZIonComponents';
import ZIonPage from '@/components/ZIonPage';

// Type

const ZFallbackIonSpinner: React.FC = () => {
  return (
    <ZIonPage className='relative w-full h-full'>
      <div
        className='absolute flex flex-col gap-2 top-1/2 start-1/2 ion-justify-content-center ion-align-items-center'
        style={{ transform: 'translate(-50%, -50%)' }}>
        <ZIonImg
          src={ProductFaviconSmall}
          className='w-[6rem] mb-2'
        />
        <ZIonSpinner
          color='primary'
          className=''
          name='dots'
          style={{ width: '6rem', height: '6rem' }}
        />
        {/* <ZIonText className='mt-3'>Loading...</ZIonText> */}
      </div>
    </ZIonPage>
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
