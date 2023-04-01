// Core Import
import React from 'react';

// Packages Import
import { IonImg } from '@ionic/react';

type ZIonImgType = {
  src?: string;
  alt?: string;
  className?: string;
  style?: {
    [key: string]: unknown;
  };
  slot?: 'start' | 'end';
};

const ZIonImg = (props: ZIonImgType) => {
  return <IonImg {...props} style={props.style} />;
};

export default ZIonImg;
