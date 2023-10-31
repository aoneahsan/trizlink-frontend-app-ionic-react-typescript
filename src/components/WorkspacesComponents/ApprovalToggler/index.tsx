import React from 'react';

// Packages Imports
import classNames from 'classnames';

// Custom Imports
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';
import {
  ZIonCol,
  ZIonIcon,
  ZIonRow,
  ZIonText
} from '@/components/ZIonComponents';
import { type SwitchChangeEventHandler } from 'rc-switch';

const ZWorkspaceApprovalToggler: React.FC<{
  workspaceId?: string;
  icon?: string;
  text?: string;
  className?: string;
  onChange?: SwitchChangeEventHandler;
  checked?: boolean;
  testingselector?: string;
  testinglistselector?: string;
}> = ({
  className,
  icon,
  text,
  onChange,
  checked,
  workspaceId,
  testinglistselector,
  testingselector
}) => {
  return (
    <ZIonRow
      className={classNames(className, {
        'mt-3 ion-align-items-center': true
      })}>
      <ZIonCol
        className='flex gap-2 ion-align-items-center ps-0'
        size='10'>
        <ZIonText className='flex gap-1 text-lg ion-align-items-center'>
          <ZIonIcon
            icon={icon}
            size='large'
          />{' '}
          {text}
        </ZIonText>
      </ZIonCol>
      <ZIonCol className='ion-text-end'>
        <ZRCSwitch
          onChange={onChange}
          testingselector={testingselector}
          testinglistselector={testinglistselector}
          checked={checked}
        />
      </ZIonCol>
    </ZIonRow>
  );
};

export default ZWorkspaceApprovalToggler;
