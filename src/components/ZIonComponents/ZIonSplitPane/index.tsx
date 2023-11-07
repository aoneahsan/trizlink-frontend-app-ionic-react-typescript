// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonSplitPane } from '@ionic/react';
import { type IonSplitPaneCustomEvent } from '@ionic/core';

// Type
interface ZIonSplitPaneType {
  children: ReactNode;
  className?: string;
  contentId?: string;
  disabled?: boolean;
  style?: Record<string, unknown>;
  when?: 'xl' | 'lg' | 'md' | 'sm' | 'xs' | string | boolean;
  onIonSplitPaneVisible?: (
    event: IonSplitPaneCustomEvent<{
      visible: boolean;
    }>
  ) => void;
}

const ZIonSplitPane: React.FC<ZIonSplitPaneType> = (
  props: ZIonSplitPaneType
) => {
  return <IonSplitPane {...props}>{props.children}</IonSplitPane>;
};

export default ZIonSplitPane;
