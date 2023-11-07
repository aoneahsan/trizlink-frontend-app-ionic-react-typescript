// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonReorderGroup, type ItemReorderEventDetail } from '@ionic/react';
import { type IonReorderGroupCustomEvent } from '@ionic/core/dist/types/components';

interface ZIonReorderGroupType {
  children?: ReactNode;
  className?: string;
  style?: Record<string, unknown>;
  disabled?: boolean;
  onIonItemReorder?: (
    event: IonReorderGroupCustomEvent<ItemReorderEventDetail>
  ) => void;
}

const ZIonReorderGroup: React.FC<ZIonReorderGroupType> = (
  props: ZIonReorderGroupType
) => {
  return <IonReorderGroup {...props}>{props.children}</IonReorderGroup>;
};

export default ZIonReorderGroup;
