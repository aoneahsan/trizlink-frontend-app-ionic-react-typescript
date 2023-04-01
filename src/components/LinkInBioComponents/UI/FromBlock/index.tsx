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
  ZIonInput,
  ZIonItem,
  ZIonLabel,
  ZIonRouterLink,
  ZIonRow,
  ZIonText,
  ZIonTitle,
} from 'components/ZIonComponents';
import {
  LinkInBioFormFieldsEnum,
  linkInBioFromFieldItemInterface,
} from 'types/AdminPanel/linkInBioType/blockTypes';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { LinkInBioThemeFontEnum } from 'types/AdminPanel/linkInBioType';
import classNames from 'classnames';

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
  fontFamily,
}) => {
  return (
    <ZIonRow className='zaions__w100 ion-justify-content-between ion-padding-vertical px-3 zaions__bg_light_opacity_point5 rounded row-gap-1-point-6-rem'>
      {/* Header */}
      {/* <ZIonHeader className='pb-2'>
        <ZIonButton
          expand='block'
          style={{ height: '40px' }}
          className={classNames(fontFamily, {
            'text-transform-initial': true,
          })}
        >
          {fromBlockData?.submitButtonText}
        </ZIonButton>
      </ZIonHeader> */}

      {fromBlockData?.formFields?.map((element) => {
        return (
          <>
            {/* Title */}
            {element.type === LinkInBioFormFieldsEnum.title && (
              <ZIonCol size='12'>
                <ZIonTitle className='ion-no-padding ion-text-center'>
                  <h5
                    className={classNames(fontFamily, {
                      'fw-bold ion-no-margin': true,
                    })}
                  >
                    {element.title}
                  </h5>
                </ZIonTitle>
              </ZIonCol>
            )}

            {/* First Name */}
            {element.type === LinkInBioFormFieldsEnum.firstName && (
              <ZIonCol size='12'>
                <ZIonItem>
                  <ZIonLabel
                    position='floating'
                    className={classNames(fontFamily)}
                  >
                    {element.placeholder}
                  </ZIonLabel>
                  <ZIonInput className={classNames(fontFamily)} />
                </ZIonItem>
              </ZIonCol>
            )}

            {/* Last Name */}
            {element.type === LinkInBioFormFieldsEnum.lastName && (
              <ZIonCol size='12'>
                <ZIonItem>
                  <ZIonLabel
                    position='floating'
                    className={classNames(fontFamily)}
                  >
                    {element.placeholder}
                  </ZIonLabel>
                  <ZIonInput className={classNames(fontFamily)} />
                </ZIonItem>
              </ZIonCol>
            )}

            {/* Email Name */}
            {element.type === LinkInBioFormFieldsEnum.email && (
              <ZIonCol size='12'>
                <ZIonItem>
                  <ZIonLabel
                    position='floating'
                    className={classNames(fontFamily)}
                  >
                    {element.placeholder}
                  </ZIonLabel>
                  <ZIonInput className={classNames(fontFamily)} />
                </ZIonItem>
              </ZIonCol>
            )}

            {/* Phone Number */}
            {element.type === LinkInBioFormFieldsEnum.phone && (
              <ZIonCol size='12'>
                <ZIonItem>
                  <ZIonLabel
                    position='floating'
                    className={classNames(fontFamily)}
                  >
                    {element.placeholder}
                  </ZIonLabel>
                  <ZIonInput className={classNames(fontFamily)} />
                </ZIonItem>
              </ZIonCol>
            )}

            {/* Text */}
            {element.type === LinkInBioFormFieldsEnum.text && (
              <ZIonCol size='12'>
                <ZIonItem>
                  <ZIonLabel
                    position='floating'
                    className={classNames(fontFamily)}
                  >
                    {element.placeholder}
                  </ZIonLabel>
                  <ZIonInput className={classNames(fontFamily)} />
                </ZIonItem>
              </ZIonCol>
            )}

            {/* Date */}
            {element.type === LinkInBioFormFieldsEnum.date && (
              <ZIonCol size='12'>
                <ZIonItem>
                  <ZIonLabel
                    position='stacked'
                    className={classNames(fontFamily)}
                  >
                    {element.placeholder}
                  </ZIonLabel>
                  <ZIonInput
                    type='datetime-local'
                    className={classNames(fontFamily)}
                  />
                </ZIonItem>
                {/* <LinkInBioDateTimeField /> */}
              </ZIonCol>
            )}

            {/* Website (url) */}
            {element.type === LinkInBioFormFieldsEnum.website && (
              <ZIonCol size='12'>
                <ZIonItem>
                  <ZIonLabel
                    position='floating'
                    className={classNames(fontFamily)}
                  >
                    {element.placeholder}
                  </ZIonLabel>
                  <ZIonInput className={classNames(fontFamily)} />
                </ZIonItem>
              </ZIonCol>
            )}
          </>
        );
      })}
      {fromBlockData?.isTermEnabled && (
        <ZIonCol size='12' className='d-flex ion-align-items-center'>
          <div className=''>
            <ZIonCheckbox className='ion-no-margin' />
          </div>
          <ZIonRouterLink
            className='ms-2 zaions__underline'
            routerLink={fromBlockData.termLink}
            target='_blank'
            color='dark'
          >
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
            'text-transform-initial': true,
          })}
        >
          {fromBlockData?.submitButtonText}
        </ZIonButton>
      </ZIonFooter>
    </ZIonRow>
  );
};

export default ZLinkInBioFormBlock;
