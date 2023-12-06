// Core Imports
import React, { useMemo } from 'react';

// Packages Imports
import { type Zaions4By4GridSysType } from '@/types/InPageComponentTypes/Zaions4By4GridSys.type';

// Custom Imports
import {
  ZIonCol,
  ZIonText,
  ZIonRouterLink,
  ZIonImg,
  ZIonCard,
  ZIonCardHeader,
  ZIonCardContent
} from '@/components/ZIonComponents';
import { isZNonEmptyString } from '@/utils/helpers';

interface ZaionsCardType {
  data: Zaions4By4GridSysType[];
  MinHeight?: string | number;
}

const ZaionsCard: React.FC<ZaionsCardType> = ({ data, MinHeight }) => {
  // #region comp constants
  const _zIonCardStyle = useMemo(
    () => ({
      minHeight: isZNonEmptyString(String(MinHeight)) ? MinHeight : '330px'
    }),
    [MinHeight]
  );
  // #endregion

  return (
    <>
      {data.map(el => {
        return (
          <ZIonCol
            sizeXl={el.size === '' ? '3' : el.size}
            sizeLg='4'
            sizeMd='6'
            sizeSm='12'
            sizeXs='12'
            key={el.id}
            className={el.className}>
            <ZIonCard style={_zIonCardStyle}>
              <ZIonCardHeader className='p-0'>
                <ZIonRouterLink routerLink={el.link}>
                  <ZIonImg src={el.image}></ZIonImg>
                </ZIonRouterLink>
              </ZIonCardHeader>
              <ZIonCardContent className='pt-3'>
                <ZIonText className='zaions__color_gray2'>{el.label}</ZIonText>
                <br />
                <ZIonRouterLink routerLink={el.link}>
                  <ZIonText>
                    <h3 className='mt-2 font-extrabold text-dark'>
                      {el.title}
                    </h3>
                  </ZIonText>
                </ZIonRouterLink>
                <ZIonText className='mt-2 text-[13px] ms-1'>{el.text}</ZIonText>
              </ZIonCardContent>
            </ZIonCard>
          </ZIonCol>
        );
      })}
    </>
  );
};

export default ZaionsCard;
