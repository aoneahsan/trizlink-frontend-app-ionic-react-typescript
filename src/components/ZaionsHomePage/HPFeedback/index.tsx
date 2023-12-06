// Core Imports
import React from 'react';

// Packages Imports

// Custom Imports
import ZaionsCarousel from '@/components/InPageComponents/ZaionsCarousel';

// Style

// Global Constant
import { PRODUCT_NAME } from '@/utils/constants';
import { ZIonText } from '@/components/ZIonComponents';
import classNames from 'classnames';

const ZaionsHPUsersFeedBack: React.FC = () => {
  return (
    <>
      <div className='mt-5 ion-text-center ion-margin-bottom ion-padding-bottom'>
        <ZIonText
          color='medium'
          className={classNames({
            'text-3xl font-extrabold': true
          })}>
          What {PRODUCT_NAME} customers are saying
        </ZIonText>
      </div>
      <ZaionsCarousel />
    </>
  );
};

export default ZaionsHPUsersFeedBack;
