// Core Imports
import {
  ZIonButton,
  ZIonCol,
  ZIonContent,
  ZIonRow
} from '@/components/ZIonComponents';
import React, { useRef } from 'react';

// Packages Imports

// Custom Imports
import ZIonPage from '@/components/ZIonPage';
import Swiper from 'swiper';
import { reportCustomError } from '@/utils/customErrorType';

const ZaionsTestPage: React.FC = () => {
  const swiperRef = useRef(null);
  React.useEffect(() => {
    try {
      new Swiper('.zswiper-container', {
        slidesPerView: 3,
        grid: {
          rows: 3
        },
        mousewheel: {
          forceToAxis: true
        }
      });
    } catch (error) {
      reportCustomError(error);
    }
  }, []);

  return (
    <ZIonPage>
      <ZIonContent>
        <ZIonRow className='zswiper-container'>
          <ZIonCol>
            <swiper-container
              ref={swiperRef}
              slides-per-view={3}
              space-between={0}
              mousewheel-force-to-axis='true'>
              {[
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1,
                2, 3, 4, 5, 6, 7, 8, 9, 10,

                1, 2, 3, 4, 5, 6, 7, 8, 9, 10
              ].map((el, index) => {
                return <swiper-slide key={index}>{el}</swiper-slide>;
              })}
            </swiper-container>
          </ZIonCol>
          <hr />
          <ZIonCol>
            <ZIonButton
              onClick={() => {
                try {
                  if (swiperRef.current) {
                    console.info(swiperRef.current);
                  }
                } catch (error) {
                  console.error({ error });
                }
              }}>
              go next
            </ZIonButton>
            <ZIonButton
              onClick={() => {
                try {
                  if (swiperRef.current) {
                    // swiperRef.current?.slidePrev();
                  }
                } catch (error) {
                  console.error({ error });
                }
              }}>
              go back
            </ZIonButton>
          </ZIonCol>
        </ZIonRow>
      </ZIonContent>
    </ZIonPage>
  );
};

export default ZaionsTestPage;
