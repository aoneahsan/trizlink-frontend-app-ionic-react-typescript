// Core Imports
import React from 'react';

// Packages Imports
import classNames from 'classnames';

// Custom Imports
import ZIonTitle from '@/components/ZIonComponents/ZIonTitle';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { ZIonCol, ZIonText, ZIonImg } from '@/components/ZIonComponents';

// Constant
// Types
import { type ZaionsInpageColType } from '@/types/InPageComponentTypes/ZaionsInpageCol.type';

const ZaionsInpageCol: React.FC<ZaionsInpageColType> = props => {
  // Medias
  const { isLgScale } = useZMediaQueryScale();

  return (
    <ZIonCol
      sizeXl='3.7'
      sizeLg='3.7'
      sizeMd='12'
      sizeSm='12'
      sizeXs='12'
      className={`${classNames({
        'me-3': true,
        className: props.className
      })}`}
      key={props.id}>
      <ZIonImg
        src={props.icon}
        style={{ width: '60px' }}
        className={`${
          props.isLogoCenter !== undefined && props?.isLogoCenter
            ? 'mx-auto'
            : !isLgScale
            ? 'mx-auto'
            : ''
        }`}></ZIonImg>
      <ZIonTitle className='pt-1 mt-2 mb-2 font-bold ion-no-padding'>
        {props.title}
      </ZIonTitle>
      <ZIonText className='mt-1 pe-3'>{props.text}</ZIonText>
    </ZIonCol>
  );
};

export default ZaionsInpageCol;
