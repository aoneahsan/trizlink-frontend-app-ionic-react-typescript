// Core Imports
import React from 'react';

// Packages Imports
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';

// Custom Imports
import { ZIonCol, ZIonText, ZIonImg } from 'components/ZIonComponents';

// Constant
import { BRACKPOINT_LG } from 'utils/constants';

// Types
import { ZaionsInpageColType } from 'types/InPageComponentTypes/ZaionsInpageCol.type';
import ZIonTitle from 'components/ZIonComponents/ZIonTitle';

const ZaionsInpageCol: React.FC<ZaionsInpageColType> = (props) => {
  // Medias
  const isLgScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_LG})`,
  });

  return (
    <ZIonCol
      sizeXl='3.7'
      sizeLg='3.7'
      sizeMd='12'
      sizeSm='12'
      sizeXs='12'
      className={`${classNames({
        'me-3': true,
        className: props.className,
      })}`}
      key={props.id}
    >
      <ZIonImg
        src={props.icon}
        style={{ width: '60px' }}
        className={`${
          props.isLogoCenter && props.isLogoCenter === true
            ? 'mx-auto'
            : !isLgScale
            ? 'mx-auto'
            : ''
        }`}
      ></ZIonImg>
      <ZIonTitle className='fw-bold mt-2 pt-1 ion-no-padding mb-2'>
        {props.title}
      </ZIonTitle>
      <ZIonText className='mt-1 pe-3'>{props.text}</ZIonText>
    </ZIonCol>
  );
};

export default ZaionsInpageCol;
