// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonReorderGroup, ItemReorderEventDetail } from '@ionic/react';
import { IonReorderGroupCustomEvent } from '@ionic/core/dist/types/components';

type ZIonReorderGroupType = {
  children?: ReactNode;
  className?: string;
  style?: {
    [key: string]: unknown;
  };
  disabled?: boolean;
  onIonItemReorder?: (
    event: IonReorderGroupCustomEvent<ItemReorderEventDetail>
  ) => void;
};

const ZIonReorderGroup = (props: ZIonReorderGroupType) => {
  return <IonReorderGroup {...props}>{props.children}</IonReorderGroup>;
};

export default ZIonReorderGroup;
