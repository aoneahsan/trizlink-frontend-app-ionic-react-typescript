// Core Import
import React from 'react';

// Packages Import
import { ProductFaviconSmall } from '@/assets/images';
import { ZIonImg, ZIonSpinner } from '@/components/ZIonComponents';
import ZIonPage from '@/components/ZIonPage';

// Type

const ZFallbackIonSpinner: React.FC = () => {
  // #region comp constants
  const _divStyle = { transform: 'translate(-50%, -50%)' };
  const _zIonSpinnerStyle = { width: '6rem', height: '6rem' };
  // #endregion
  return (
    <ZIonPage className='relative w-full h-full'>
      <div
        className='absolute flex flex-col gap-2 top-1/2 start-1/2 ion-justify-content-center ion-align-items-center'
        style={_divStyle}>
        <ZIonImg
          src={ProductFaviconSmall}
          className='w-[6rem] mb-2'
        />
        <ZIonSpinner
          color='primary'
          className=''
          name='dots'
          style={_zIonSpinnerStyle}
        />
        {/* <ZIonText className='mt-3'>Loading...</ZIonText> */}
      </div>
    </ZIonPage>
  );
};

export const ZFallbackIonSpinner2: React.FC = () => {
  // #region comp constants
  const _zIonSpinnerStyle = { width: '50px', height: '50px' };
  // #endregion
  return (
    <div className='flex w-full h-full ion-align-items-center ion-justify-content-center'>
      <ZIonSpinner
        color='primary'
        className=''
        name='crescent'
        style={_zIonSpinnerStyle}
      />
    </div>
  );
};

export default ZFallbackIonSpinner;
