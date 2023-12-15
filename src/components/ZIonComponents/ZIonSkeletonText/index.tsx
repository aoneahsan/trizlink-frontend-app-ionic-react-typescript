// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonSkeletonText } from '@ionic/react';

// Type
import { type ZIonModeType } from '@/types/zaionsAppSettings.type';
interface ZIonSkeletonTextType {
  children?: ReactNode;
  className?: string;
  animated?: boolean;
  mode?: ZIonModeType;
  style?: Record<string, unknown>;
  height?: string;
  width?: string;
}

const ZIonSkeletonText: React.FC<ZIonSkeletonTextType> = (
  props: ZIonSkeletonTextType
) => {
  const _style = { ...props.style, width: props.width, height: props.height };
  return (
    <IonSkeletonText
      {...props}
      animated={props.animated ?? true}
      style={_style}>
      {props.children}
    </IonSkeletonText>
  );
};

export default ZIonSkeletonText;
