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
  ZIonAccordion,
  ZIonAccordionGroup,
  ZIonCol,
  ZIonItem,
  ZIonLabel
} from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { type linkInBioBlockCardItemInterface } from '@/types/AdminPanel/linkInBioType/blockTypes';
import { type LinkInBioThemeFontEnum } from '@/types/AdminPanel/linkInBioType';
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

interface ZLinkInBioQAndABlockInterface {
  QAndABlockData?: linkInBioBlockCardItemInterface[];
  fontFamily?: LinkInBioThemeFontEnum;
}

const ZLinkInBioQAndABlock: React.FC<ZLinkInBioQAndABlockInterface> = ({
  QAndABlockData,
  fontFamily
}) => {
  return (
    <ZIonCol>
      {QAndABlockData?.map((element, index) => {
        const _dangerouslySetInnerHTML = { __html: element.text ?? '' };
        return (
          <ZIonAccordionGroup key={index}>
            <ZIonAccordion value={`z_q&a_accordion_${index}`}>
              <ZIonItem
                slot='header'
                color='light'>
                <ZIonLabel className={classNames(fontFamily)}>
                  {element.title}
                </ZIonLabel>
              </ZIonItem>
              <div
                className={classNames(fontFamily, {
                  'ion-padding': true
                })}
                slot='content'>
                {element.text !== null && element.text !== undefined && (
                  <div dangerouslySetInnerHTML={_dangerouslySetInnerHTML} />
                )}
              </div>
            </ZIonAccordion>
          </ZIonAccordionGroup>
        );
      })}
    </ZIonCol>
  );
};

export default ZLinkInBioQAndABlock;
