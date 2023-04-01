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
  ZIonCardTitle,
} from 'components/ZIonComponents';

// Styles
import classes from './styles.module.css';

import { ZaionsCardWithIconType } from 'types/ZaionsCardWithIcon.type';

const ZaionsCardWithIcon: React.FC<{
  data: ZaionsCardWithIconType[];
  XlSize?: string;
}> = ({ data, XlSize }) => {
  return (
    <>
      {data.map((el) => {
        return (
          <ZIonCol
            sizeXl={!XlSize || XlSize === '' ? '4' : XlSize}
            sizeLg='4'
            sizeMd='6'
            sizeSm='12'
            sizeXs='12'
            key={el.id}
          >
            <ZIonRouterLink routerLink={el.routeLink}>
              <ZIonCard
                className={`ion-padding-top ion-padding-start ion-padding-bottom ${classes.ZaionsCard}`}
                style={{ height: 'max-content' }}
              >
                <ZIonCardHeader>
                  <ZIonImg className='zaions__w40' src={el.icon} />

                  <ZIonCardTitle className='fs-4 mt-3 zaions__fw_750'>
                    {el.title}
                  </ZIonCardTitle>
                </ZIonCardHeader>

                <ZIonCardContent>
                  <ZIonText className='mb-4 pb-1 zaions__fs_15'>
                    {el.text}
                  </ZIonText>
                  <ZIonRouterLink
                    className={`pt-4 ${classes.ZaionsCardBtn} zaions__fs_15`}
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
