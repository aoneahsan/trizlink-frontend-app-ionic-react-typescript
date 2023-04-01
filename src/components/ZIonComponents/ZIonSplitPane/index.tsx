// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonSplitPane } from '@ionic/react';
import { IonSplitPaneCustomEvent } from '@ionic/core';

// Type
type ZIonSplitPaneType = {
  children: ReactNode;
  className?: string;
  contentId?: string;
  disabled?: boolean;
  style?: {
    [key: string]: unknown;
  };
  when?: 'xl' | 'lg' | 'md' | 'sm' | 'xs' | string | boolean;
  onIonSplitPaneVisible?: (
    event: IonSplitPaneCustomEvent<{
      visible: boolean;
    }>
  ) => void;
};

const ZIonSplitPane = (props: ZIonSplitPaneType) => {
  return <IonSplitPane {...props}>{props.children}</IonSplitPane>;
};

export default ZIonSplitPane;
