// Core Imports
import React, { useState } from 'react';
// packages Imports

// Custom Imports
import {
  ZIonCol,
  ZIonText,
  ZIonImg,
  ZIonGrid,
  ZIonRow,
  ZIonIcon
} from '@/components/ZIonComponents';

// Global Constants

// Types
import { type ZaionsKeyFeatureType } from '@/types/InPageComponentTypes/ZaionsKeyFeature.type';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import classNames from 'classnames';
interface ZaionsKeyFeaturesType {
  data: ZaionsKeyFeatureType[];
}

const ZaionsKeyFeatures: React.FC<ZaionsKeyFeaturesType> = ({ data = [] }) => {
  const { isMdScale } = useZMediaQueryScale();

  const [animationMedia, setAnimationMedia] = useState({
    key: data[0]?.id,
    media: data[0]?.animation,
    title: data[0]?.title,
    touched: false
  });

  return (
    <>
      <ZIonGrid className='mb-1 ion-padding-bottom'>
        {data.length > 0 && (
          <ZIonRow>
            <ZIonCol
              sizeXl=''
              sizeLg=''
              sizeMd='12'
              sizeSm='12'
              sizeXs='12'>
              {data.map(el => {
                return (
                  <ZIonCol
                    sizeXl='12'
                    sizeLg='12'
                    sizeMd='12'
                    sizeSm='12'
                    sizeXs='12'
                    key={el.id}
                    onMouseEnter={() => {
                      if (animationMedia.key !== el.id) {
                        setAnimationMedia({
                          key: el.id,
                          media: el.animation,
                          title: el.title,
                          touched: true
                        });
                      }
                    }}>
                    <ZIonRow
                      className={classNames({
                        'ion-no-padding': true,
                        zaions__medium_bg:
                          animationMedia.touched && animationMedia.key === el.id
                      })}>
                      <ZIonCol
                        sizeXl='1'
                        sizeLg='1'
                        sizeMd='1'
                        sizeSm='2'
                        sizeXs='2'>
                        <ZIonIcon
                          size='large'
                          className='ion-padding-end'
                          icon={el.icon}
                        />
                      </ZIonCol>
                      <ZIonCol
                        sizeXl='11'
                        sizeLg='11'
                        sizeMd='11'
                        sizeSm='11'
                        sizeXs='11'>
                        <ZIonText>
                          <ZIonText className='font-bold text-[15px]'>
                            {el.title}
                          </ZIonText>
                        </ZIonText>
                        <br />
                        <ZIonText className='text-[15px]'>{el?.text}</ZIonText>
                        <br />
                        {animationMedia.key === el.id && (
                          <ZIonText>{el?.link?.text}</ZIonText>
                        )}
                      </ZIonCol>
                    </ZIonRow>
                  </ZIonCol>
                );
              })}
            </ZIonCol>
            <ZIonCol
              sizeXl='5'
              sizeLg='5'
              sizeMd='12'
              sizeSm='12'
              sizeXs='12'
              className=''>
              <ZIonImg
                src={animationMedia.media}
                alt={animationMedia.title}
                className={classNames({
                  'w-[100%]': isMdScale,
                  'w-[90%]': !isMdScale
                })}
              />
            </ZIonCol>
          </ZIonRow>
        )}
        {data.length === 0 && (
          <ZIonRow>
            <ZIonCol sizeXl='12'>No Data Found!</ZIonCol>
          </ZIonRow>
        )}
      </ZIonGrid>
    </>
  );
};

export default ZaionsKeyFeatures;
