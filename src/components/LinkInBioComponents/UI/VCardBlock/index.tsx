/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { cardOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCol,
  ZIonIcon,
  ZIonText
} from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

interface ZLinkInBioVCardBlockInterface {
  VCardBlockData?: Record<string, unknown>;
  title?: string;
  icon?: string;
}

const ZLinkInBioVCardBlock: React.FC<ZLinkInBioVCardBlockInterface> = ({
  VCardBlockData,
  icon = cardOutline,
  title
}) => {
  return (
    <ZIonCol>
      {VCardBlockData !== undefined && (
        <ZIonButton
          expand='block'
          className={classNames({
            'normal-case font-bold text-[16px] my-0 mb-2': true
          })}
          color='success'
          style={{
            height: '3.5rem',
            '--border-radius': '0.8rem',
            borderRadius: '0.8rem'
          }}>
          <ZIonIcon
            icon={icon}
            style={{ width: '25px', height: '29px' }}
            className='me-2'
          />
          <ZIonText>
            <h5 className='ion-no-padding ion-no-margin'>{title}</h5>
          </ZIonText>
        </ZIonButton>
      )}
    </ZIonCol>
  );
};

export default ZLinkInBioVCardBlock;
