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
import ZaionsHr from '@/components/InPageComponents/Zaion_hr';
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonButton,
  ZIonGrid,
  ZIonImg,
} from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any extarnal type import is a Type import
 * */

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
import classes from './styles.module.css';
import { useMediaQuery } from 'react-responsive';
import { BRACKPOINT_MD } from '@/utils/constants';

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be pleace Down
 * */
type ZaionsTwoByTwoLeftColsType = {
  colLeftImage: string;
  title?: string | JSX.Element | JSX.Element[];
  text: string | JSX.Element | JSX.Element[];
  Btn?: true | boolean;
  BtnText?: string | JSX.Element | JSX.Element[];
  bottomHr?: true | boolean;
  className?: string;
  ImgWidth?: string | number;
  rightColClassName?: string;
};

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */
const ZaionsTwoByTwoLeftCols: React.FC<ZaionsTwoByTwoLeftColsType> = (
  props
) => {
  const isMdScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_MD})`,
  });
  return (
    <>
      <ZIonGrid
        className={`${classNames(props.className, {
          'mt-5 pt-3': isMdScale,
        })}`}
      >
        <ZIonRow>
          <ZIonCol></ZIonCol>
          <ZIonCol sizeXl='5.5' sizeLg='5' sizeMd='12' sizeSm='12' sizeXs='12'>
            <ZIonImg
              style={{
                width:
                  !props.ImgWidth || props.ImgWidth === ''
                    ? '95%'
                    : props.ImgWidth,
              }}
              src={props.colLeftImage}
            ></ZIonImg>
          </ZIonCol>
          <ZIonCol
            sizeXl='6'
            sizeLg='5'
            sizeMd='12'
            sizeSm='12'
            sizeXs='12'
            className={props.rightColClassName}
          >
            <ZIonText>
              <h2 className='fw-bold ion-margin-bottom'>{props.title}</h2>
            </ZIonText>
            <ZIonText className=''>{props.text}</ZIonText>
            <div>
              {props.Btn === true ? (
                <ZIonButton
                  fill='clear'
                  className={`${classes.zaions__inpage_secondarybtn} mt-3`}
                  size='large'
                  expand={!isMdScale ? 'block' : undefined}
                >
                  {!props.BtnText || props.BtnText === ''
                    ? 'Learn More'
                    : props.BtnText}
                </ZIonButton>
              ) : (
                ''
              )}
            </div>
          </ZIonCol>
          <ZIonCol></ZIonCol>
        </ZIonRow>
      </ZIonGrid>
      {props.bottomHr === true ? (
        <ZIonGrid
          className={classNames({
            'ion-no-padding ion-no-margin': !isMdScale,
          })}
        >
          <ZIonRow
            className={classNames({
              'ion-no-padding ion-no-margin': !isMdScale,
            })}
          >
            <ZIonCol></ZIonCol>
            <ZIonCol
              sizeXl='11.2'
              sizeLg='12'
              sizeMd='12'
              sizeSm='12'
              sizeXs='12'
            >
              <ZaionsHr></ZaionsHr>
            </ZIonCol>
            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>
      ) : (
        ''
      )}
    </>
  );
};

export default ZaionsTwoByTwoLeftCols;
