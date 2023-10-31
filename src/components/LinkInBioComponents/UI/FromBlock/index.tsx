/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCheckbox,
  ZIonCol,
  ZIonFooter,
  ZIonRouterLink,
  ZIonRow,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';
import {
  LinkInBioFormFieldsEnum,
  type linkInBioFromFieldItemInterface
} from '@/types/AdminPanel/linkInBioType/blockTypes';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { type LinkInBioThemeFontEnum } from '@/types/AdminPanel/linkInBioType';
import classNames from 'classnames';
import ZIonInputField from '@/components/CustomComponents/FormFields/ZIonInputField';

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

interface ZLinkInBioFromBlockInterface {
  fromBlockData?: {
    formFields?: linkInBioFromFieldItemInterface[];
    isTermEnabled?: boolean;
    submitButtonText?: string;
    termText?: string;
    termLink?: string;
  };
  fontFamily?: LinkInBioThemeFontEnum;
}

const ZLinkInBioFormBlock: React.FC<ZLinkInBioFromBlockInterface> = ({
  fromBlockData,
  fontFamily
}) => {
  return (
    <ZIonRow className='w-full px-3 rounded ion-justify-content-between ion-padding-vertical zaions__light_bg row-gap-1-point-6-rem'>
      {/* Header */}
      {/* <ZIonHeader className='pb-2'>
        <ZIonButton
          expand='block'
          style={{ height: '40px' }}
          className={classNames(fontFamily, {
            'normal-case': true,
          })}
        >
          {fromBlockData?.submitButtonText}
        </ZIonButton>
      </ZIonHeader> */}

      {fromBlockData?.formFields?.map(element => {
        return (
          <>
            {/* Title */}
            {element.type === LinkInBioFormFieldsEnum.title && (
              <ZIonCol size='12'>
                <ZIonTitle className='ion-no-padding ion-text-center'>
                  <h5
                    className={classNames(fontFamily, {
                      'font-bold ion-no-margin': true
                    })}>
                    {element.title}
                  </h5>
                </ZIonTitle>
              </ZIonCol>
            )}

            {/* First Name */}
            {(element.type === LinkInBioFormFieldsEnum.firstName ||
              element.type === LinkInBioFormFieldsEnum.lastName ||
              element.type === LinkInBioFormFieldsEnum.email ||
              element.type === LinkInBioFormFieldsEnum.phone ||
              element.type === LinkInBioFormFieldsEnum.text ||
              element.type === LinkInBioFormFieldsEnum.website) && (
              <ZIonCol size='12'>
                <ZIonInputField
                  inputFieldProps={{
                    className: classNames(fontFamily),
                    label: element.placeholder,
                    labelPlacement: 'floating',
                    style: {
                      '--padding-start': '11px'
                    }
                  }}
                />
              </ZIonCol>
            )}

            {/* Date */}
            {element.type === LinkInBioFormFieldsEnum.date && (
              <ZIonCol size='12'>
                <ZIonInputField
                  inputFieldProps={{
                    className: classNames(fontFamily),
                    label: element.placeholder,
                    labelPlacement: 'stacked',
                    style: {
                      '--padding-start': '11px'
                    },
                    type: 'datetime-local'
                  }}
                />
              </ZIonCol>
            )}
          </>
        );
      })}
      {fromBlockData?.isTermEnabled === true && (
        <ZIonCol
          size='12'
          className='flex ion-align-items-center'>
          <div className=''>
            <ZIonCheckbox className='ion-no-margin' />
          </div>
          <ZIonRouterLink
            className='underline ms-2'
            routerLink={fromBlockData.termLink}
            target='_blank'
            color='dark'>
            <ZIonText className={classNames(fontFamily)}>
              {fromBlockData?.termText}
            </ZIonText>
          </ZIonRouterLink>
        </ZIonCol>
      )}
      {/* Footer */}
      <ZIonFooter className='pt-2'>
        <ZIonButton
          expand='block'
          style={{ height: '40px' }}
          className={classNames(fontFamily, {
            'normal-case': true
          })}>
          {fromBlockData?.submitButtonText}
        </ZIonButton>
      </ZIonFooter>
    </ZIonRow>
  );
};

export default ZLinkInBioFormBlock;
