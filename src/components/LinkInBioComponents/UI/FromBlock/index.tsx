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
import {
  ZIonButton,
  ZIonCheckbox,
  ZIonCol,
  ZIonFooter,
  ZIonInput,
  ZIonRouterLink,
  ZIonRow,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';
import {
  type LinkInBioBlockAnimationEnum,
  LinkInBioFormFieldsEnum,
  type linkInBioFromFieldItemInterface
} from '@/types/AdminPanel/linkInBioType/blockTypes';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { isZNonEmptyString } from '@/utils/helpers';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { type LinkInBioThemeFontEnum } from '@/types/AdminPanel/linkInBioType';

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
  animationType?: LinkInBioBlockAnimationEnum;
  btnStyle?: Record<string, unknown>;
  btnClassName?: string;
}

const ZLinkInBioFormBlock: React.FC<ZLinkInBioFromBlockInterface> = ({
  fromBlockData,
  fontFamily,
  animationType,
  btnStyle,
  btnClassName
}) => {
  const zIonButtonStyle = { '--padding-start': '11px' };

  return (
    <ZIonRow
      className={classNames(animationType, {
        'w-full rounded ion-justify-content-between zaions__light_bg row-gap-1-point-6-rem':
          true,
        'animated ': isZNonEmptyString(animationType)
      })}>
      {/* Header */}
      {/* <ZIonHeader className='pb-2'>
        <ZIonButton
          expand='block'
          className={classNames(fontFamily, {
            'normal-case h-[40px]': true,
          })}
        >
          {fromBlockData?.submitButtonText}
        </ZIonButton>
      </ZIonHeader> */}

      <div className='w-full px-3 ion-padding-vertical'>
        {fromBlockData?.formFields?.map(element => {
          return (
            <>
              {/* Title */}
              {element.type === LinkInBioFormFieldsEnum.title && (
                <ZIonCol size='12'>
                  <ZIonTitle
                    className={classNames(fontFamily, {
                      'font-bold ion-no-padding ion-text-center text-2xl': true
                    })}>
                    {element.title}
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
                  <ZIonInput
                    label={`${element.placeholder}${
                      element.required === true ? '*' : ''
                    }`}
                    labelPlacement='stacked'
                    className={classNames(fontFamily, {
                      'mt-2': true
                    })}
                    style={zIonButtonStyle}
                    minHeight='2.5rem'
                  />
                </ZIonCol>
              )}

              {/* Date */}
              {element.type === LinkInBioFormFieldsEnum.date && (
                <ZIonCol size='12'>
                  <ZIonInput
                    label={element.placeholder}
                    labelPlacement='stacked'
                    type='datetime-local'
                    className={classNames(fontFamily, {
                      'mt-2': true
                    })}
                    style={zIonButtonStyle}
                    minHeight='2.5rem'
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
      </div>

      {/* Footer */}
      <ZIonFooter className='px-3 pt-2 pb-1'>
        <ZIonButton
          expand='block'
          style={btnStyle}
          className={classNames(fontFamily, btnClassName, {
            'normal-case h-[40px]': true
          })}>
          {fromBlockData?.submitButtonText}
        </ZIonButton>
      </ZIonFooter>
    </ZIonRow>
  );
};

export default ZLinkInBioFormBlock;
