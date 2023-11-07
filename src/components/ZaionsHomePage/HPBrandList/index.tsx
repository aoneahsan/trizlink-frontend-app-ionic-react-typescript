// Core Imports
import React, { useLayoutEffect } from 'react';

// Packages Imports
import { useRecoilState } from 'recoil';

// Custom Imports
import ZaionsHr from '@/components/InPageComponents/Zaions_hr';
import {
  ZIonCol,
  ZIonText,
  ZIonImg,
  ZIonRow,
  ZIonGrid
} from '@/components/ZIonComponents';

// Global Constant

// Type
import { type ZaionsHPBrandsType } from '@/types/ZionsHPBrandType';

// Recoil
import { ZaionsHPBrandsData } from '@/ZaionsStore/ZaionsHPBrandsRecoil';

// Data
import HPBrandData from '@/data/HPBrandListData';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

// const { Item: CarouselItem } = Carousel;

const ZaionsHPBrandList: React.FC = () => {
  const [loadedHPBrandsData, setLoadedHPBrandsData] =
    useRecoilState<ZaionsHPBrandsType[]>(ZaionsHPBrandsData);

  //
  const { isMdScale } = useZMediaQueryScale();

  //

  useLayoutEffect(() => {
    // Fetch Data From Database Later:-
    setLoadedHPBrandsData(HPBrandData);
  }, [setLoadedHPBrandsData]);

  return (
    <>
      <div className='ion-text-center ion-margin-top ion-padding-bottom'>
        <br />
        <ZIonText>
          <h2 className='font-bold'>
            Loved by big and small brands everywhere
          </h2>
        </ZIonText>
      </div>
      <div className='ion-padding-vertical'>
        <ZIonGrid>
          <ZIonRow className='ion-justify-content-center'>
            {isMdScale ? (
              loadedHPBrandsData.map(item => (
                <ZIonCol
                  sizeXl='1.5'
                  sizeLg='2.2'
                  sizeMd='3.2'
                  sizeSm='4.2'
                  sizeXs='5.2'
                  key={item.id}>
                  <ZIonImg
                    src={item.image}
                    className={classNames({
                      'w-auto': true,
                      'w-[60%!important] mx-auto': !isMdScale
                    })}
                    alt=''
                  />
                </ZIonCol>
              ))
            ) : !isMdScale ? (
              <Swiper>
                {loadedHPBrandsData.map(item => (
                  <SwiperSlide key={item.id}>
                    <ZIonCol
                      sizeXl='1.5'
                      sizeLg='2.2'
                      sizeMd='3.2'
                      sizeSm='4.2'
                      sizeXs='5.2'>
                      <ZIonImg
                        src={item.image}
                        className={classNames({
                          'w-auto': true,
                          'w-[60%!important] mx-auto': !isMdScale
                        })}
                        alt=''
                      />
                    </ZIonCol>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              ''
            )}
          </ZIonRow>
        </ZIonGrid>
      </div>
      <ZaionsHr />
    </>
  );
};

export default ZaionsHPBrandList;
