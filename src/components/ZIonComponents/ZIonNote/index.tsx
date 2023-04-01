// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonNote } from '@ionic/react';

// Type
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';
type ZIonNoteType = {
  children: ReactNode;
  className?: string;
  color?: ZIonColorType;
  mode?: ZIonModeType;
  slot?: 'error' | 'helper';
};

const ZIonNote = (props: ZIonNoteType) => {
  return <IonNote {...props}> {props.children}</IonNote>;
};

export default ZIonNote;
