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
import { useFormikContext } from 'formik';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import { ZIonCol, ZIonRow, ZIonText } from '@/components/ZIonComponents';
import ZEditor from '@/components/CustomComponents/ZEditor';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { type LinkInBioType } from '@/types/AdminPanel/linkInBioType';

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
import classes from '../../styles.module.css';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZLinkInBioSettingsSection: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<LinkInBioType>();

  return (
    <ZIonCol
      sizeXl='10'
      sizeLg='11'
      sizeMd='12'
      sizeSm='12'
      sizeXs='12'
      className='ion-padding-vertical ion-margin-top ion-margin-start'
      style={{ borderTop: '2px solid #edf5fd' }}>
      <ZIonRow
        className={classNames(classes['row-gap-1-point-6-rem'], {
          'ion-margin-top pt-2 ion-padding-bottom mb-2 ': true
        })}>
        {/* Header code editor */}
        <ZIonCol size='12'>
          <ZIonText className='font-bold'>👩‍💻 Insert Header code</ZIonText>
          <div className='mt-3 ion-padding-top'>
            <ZEditor
              width='100%'
              height='240px'
              placeholder='Paste you HTML code here...'
              fontSize={18}
              onChange={value => {
                void setFieldValue('settings.headerCode', value, false);
              }}
              value={values.settings.headerCode}
            />
          </div>
        </ZIonCol>

        {/* Body code editor */}
        <ZIonCol
          size='12'
          className='mt-1 ion-padding-top'>
          <ZIonText className='font-bold'>👨‍💻 Insert Body code</ZIonText>
          <div className='mt-3 ion-padding-top'>
            <ZEditor
              width={'100%'}
              height={'240px'}
              placeholder='Paste you HTML code here...'
              fontSize={18}
              onChange={value => {
                void setFieldValue('settings.bodyCode', value, false);
              }}
              value={values.settings.bodyCode}
            />
          </div>
        </ZIonCol>
      </ZIonRow>
    </ZIonCol>
  );
};

export default ZLinkInBioSettingsSection;
