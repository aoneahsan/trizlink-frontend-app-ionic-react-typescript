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

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import { ZIonCol, ZIonDatetime } from '@/components/ZIonComponents';
import ZRScrollbars from '@/components/CustomComponents/ZRScrollBar';
import ZTimezoneInput from '@/components/CustomComponents/ZTimezone';
import { LinkInBioThemeFontEnum } from '@/types/AdminPanel/linkInBioType';

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
interface ZLinkInBioCalendarBlockInterface {
  fontFamily?: LinkInBioThemeFontEnum;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZLinkInBioCalendarBlock: React.FC<ZLinkInBioCalendarBlockInterface> = ({
  fontFamily,
}) => {
  return (
    <ZIonCol>
      <ZRScrollbars
        style={{
          width: '100%',
          height: '500px',
        }}
      >
        <div className=' d-flex flex-column ion-align-items-center'>
          <ZIonDatetime />
          <ZTimezoneInput
            className={classNames(fontFamily, {
              'zaions__w90 ion-margin-top': true,
            })}
          />
        </div>
      </ZRScrollbars>
    </ZIonCol>
  );
};

export default ZLinkInBioCalendarBlock;
