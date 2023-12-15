// Core Imports
import React from 'react';

// Packages Imports

// Custom Imports
import {
  ZIonCol,
  ZIonText,
  ZIonRouterLink,
  ZIonImg,
  ZIonCard,
  ZIonCardHeader,
  ZIonCardContent,
  ZIonCardTitle
} from '@/components/ZIonComponents';

// Styles
import classes from './styles.module.css';

import { type ZaionsCardWithIconType } from '@/types/ZaionsCardWithIcon.type';

const ZaionsCardWithIcon: React.FC<{
  data: ZaionsCardWithIconType[];
  XlSize?: string;
}> = ({ data, XlSize }) => {
  return (
    <>
      {data.map(el => {
        return (
          <ZIonCol
            sizeXl={XlSize ?? '4'}
            sizeLg='4'
            sizeMd='6'
            sizeSm='12'
            sizeXs='12'
            key={el.id}>
            <ZIonRouterLink routerLink={el.routeLink}>
              <ZIonCard
                className={`ion-padding-top ion-padding-start ion-padding-bottom ${classes.ZaionsCard} h-max`}>
                <ZIonCardHeader>
                  <ZIonImg
                    className='w-[40%]'
                    src={el.icon}
                  />

                  <ZIonCardTitle className='mt-3 text-xl font-bold'>
                    {el.title}
                  </ZIonCardTitle>
                </ZIonCardHeader>

                <ZIonCardContent>
                  <ZIonText className='mb-4 pb-1 text-[15px]'>
                    {el.text}
                  </ZIonText>
                  <ZIonRouterLink
                    className={`pt-4 ${classes.ZaionsCardBtn} text-[15px]`}
                    color='dark'
                    // onMouseEnter={() => {}}
                  >
                    {el.btnText}
                  </ZIonRouterLink>
                </ZIonCardContent>
              </ZIonCard>
            </ZIonRouterLink>
          </ZIonCol>
        );
      })}
    </>
  );
};

export default ZaionsCardWithIcon;
