// Core Import
import React from 'react';

// Packages Import
import { IonIcon } from '@ionic/react';

// Type
import { type ZIonColorType } from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';
interface ZIonIconType {
  icon?: string;
  className?: string;
  color?: ZIonColorType;
  testingselector?: string;
  testinglistselector?: string;
  size?: 'small' | 'large' | 'default';
  style?: Record<string, unknown>;
  slot?: 'start' | 'end' | 'icon-only';
  title?: string;
  id?: string;
  onClick?: React.MouseEventHandler<HTMLIonIconElement>;
}

const ZIonIcon: React.FC<ZIonIconType> = (props: ZIonIconType) => {
  const _testinglistselector =
    props.testinglistselector !== undefined
      ? {
          ...zCreateElementTestingSelector({
            _value: props.testinglistselector,
            _key: zCreateElementTestingSelectorKeyEnum.listSelector
          })
        }
      : {};

  const _testingSelector =
    props.testingselector !== undefined
      ? {
          ...zCreateElementTestingSelector({
            _value: props.testingselector
          })
        }
      : {};
  return (
    <IonIcon
      {...props}
      {..._testingSelector}
      {..._testinglistselector}
    />
  );
};

export default ZIonIcon;
