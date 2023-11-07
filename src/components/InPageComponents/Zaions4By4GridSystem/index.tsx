/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {} from '@ionic/react';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonGrid,
  ZIonRouterLink,
  ZIonImg,
  ZIonCard,
  ZIonCardHeader,
  ZIonCardContent
} from '@/components/ZIonComponents';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any extarnal type import is a Type import
 * */
import { type Zaions4By4GridSysType } from '@/types/InPageComponentTypes/Zaions4By4GridSys.type';

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
 * ? Like if you have a type for props it should be place Down
 * */
interface Zaions4By4GridSysTypes {
  data: Zaions4By4GridSysType[];
  MinHeight?: string | number;
  titleBar?: true | boolean;
  BGColor?: string;
  className?: string;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */
const Zaions4By4GridSystem: React.FC<Zaions4By4GridSysTypes> = ({
  data = [],
  MinHeight,
  titleBar = true,
  BGColor = '#eff0f2',
  className
}) => {
  return (
    <>
      <ZIonGrid
        className={`${classNames(className)}`}
        style={{
          backgroundColor: BGColor
        }}>
        {titleBar && (
          <ZIonRow className='mt-3'>
            <ZIonCol
              size='12'
              className='mt-5 mb-4 ion-text-center'>
              <ZIonText>
                <h2 className='font-bold ion-margin-bottom'>
                  More for social marketers
                </h2>
              </ZIonText>
            </ZIonCol>
          </ZIonRow>
        )}
        <ZIonRow className='pb-2'>
          <ZIonCol></ZIonCol>
          <ZIonCol size='10'>
            <ZIonRow>
              {data.map(el => {
                return (
                  <ZIonCol
                    size='3'
                    key={el.id}>
                    <ZIonCard
                      style={{
                        minHeight: MinHeight !== '' ? MinHeight : '330px'
                      }}>
                      <ZIonCardHeader className='p-0'>
                        <ZIonRouterLink routerLink={el.link}>
                          <ZIonImg src={el.image}></ZIonImg>
                        </ZIonRouterLink>
                      </ZIonCardHeader>
                      <ZIonCardContent className='pt-3'>
                        <ZIonText className='zaions__color_gray2'>
                          {el.label}
                        </ZIonText>
                        <br />
                        <ZIonRouterLink routerLink={el.link}>
                          <ZIonText color={'dark'}>
                            <h2 className='mt-2 font-extrabold ion-no-padding'>
                              {el.title}
                            </h2>
                          </ZIonText>
                        </ZIonRouterLink>
                        <ZIonText className='mt-2 text-sm'>{el.text}</ZIonText>
                      </ZIonCardContent>
                    </ZIonCard>
                  </ZIonCol>
                );
              })}
            </ZIonRow>
          </ZIonCol>
          <ZIonCol></ZIonCol>
        </ZIonRow>
      </ZIonGrid>
    </>
  );
};

export default Zaions4By4GridSystem;
