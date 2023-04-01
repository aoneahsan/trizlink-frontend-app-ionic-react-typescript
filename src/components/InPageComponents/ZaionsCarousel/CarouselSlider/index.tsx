// Core Imports
import React, { useLayoutEffect } from 'react';

// Packages Imports
import { Carousel, CarouselItem } from 'react-bootstrap';

// Custom Imports
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonGrid,
  ZIonImg,
} from '@/components/ZIonComponents';

// Recoil State
import { useRecoilState } from 'recoil';
import { ZaionsUsersFeedBackCarouselState } from 'ZaionsStore/InpageComponents/ZaionsUsersFeedBack.recoil';

// Images
import { quotes, starsQuoteWidget } from '@/assets/images';

// Global Constant

// Style
import classes from './styles.module.css';

const ZaionsCarouselSlider: React.FC = () => {
  const [usersFeedBackCarouselState, setUsersFeedBackCarouselState] =
    useRecoilState(ZaionsUsersFeedBackCarouselState);

  useLayoutEffect(() => {
    setUsersFeedBackCarouselState((oldVal) => ({
      ...oldVal,
      activeIndex: 0,
      totalItemCount: 2,
      lastItemIndex: 1,
    }));
  }, [setUsersFeedBackCarouselState]);

  return (
    <>
      <ZIonGrid>
        <ZIonRow>
          <ZIonCol
            sizeXl='10'
            sizeLg='10.5'
            sizeMd='11'
            sizeSm='12'
            sizeXs='12'
            className='mx-auto'
          >
            <Carousel
              activeIndex={usersFeedBackCarouselState.activeIndex}
              defaultValue={0}
              touch={usersFeedBackCarouselState.touch}
            >
              <CarouselItem
                key={0}
                interval={usersFeedBackCarouselState.interval}
              >
                <ZIonCol></ZIonCol>
                <>
                  <ZIonCol
                    sizeXl='10.3'
                    sizeLg='10.3'
                    sizeMd='10.3'
                    sizeSm='12'
                    sizeXs='12'
                  >
                    <div className={classes.zaions__carousel}>
                      <ZIonImg
                        src={quotes}
                        className={classes.zaions__quote}
                        alt='Quotes'
                      />
                      {/* <ZIonText className={classes.zaions__quote}>
												&#8221;
											</ZIonText> */}
                      <ZIonGrid>
                        <ZIonRow className='py-4 mt-2 px-4 mx-2'>
                          <ZIonCol
                            className={`${classes.zaions__stars_box} mb-2`}
                            size='12'
                          >
                            <ZIonImg
                              src={starsQuoteWidget}
                              className={classes.zaions__stars}
                              alt='Five Stars Quote Widget'
                            />
                          </ZIonCol>
                          <ZIonCol size='12'>
                            <ZIonText>
                              <h3 className='fw-bold'>
                                Our goal was to implement a system that would
                                not interrupt the gameplay experience when a new
                                update was announced, and we found QR Codes to
                                be the perfect answer.
                              </h3>
                            </ZIonText>
                          </ZIonCol>
                          <ZIonCol size='12' className='mt-4'>
                            <ZIonText>
                              Juan Zacarias – Game Product Manager, Motive
                              Studios EA
                            </ZIonText>
                          </ZIonCol>
                        </ZIonRow>
                      </ZIonGrid>
                    </div>
                  </ZIonCol>
                  <ZIonCol></ZIonCol>
                </>
              </CarouselItem>
              <CarouselItem key={1}>
                <>
                  <ZIonCol></ZIonCol>
                  <ZIonCol
                    sizeXl='10.3'
                    sizeLg='10.3'
                    sizeMd='10.3'
                    sizeSm='12'
                    sizeXs='12'
                  >
                    <div className={classes.zaions__carousel}>
                      <ZIonImg
                        src={quotes}
                        className={classes.zaions__quote}
                        alt='Quotes'
                      />
                      <ZIonGrid>
                        <ZIonRow className='py-4 mt-2 px-4 mx-2'>
                          <ZIonCol
                            className={`${classes.zaions__stars_box} mb-2`}
                            size='12'
                          >
                            <ZIonImg
                              src={starsQuoteWidget}
                              className={classes.zaions__stars}
                              alt='Five Stars Quote Widget'
                            />
                          </ZIonCol>
                          <ZIonCol size='12'>
                            <ZIonText>
                              <h3 className='fw-bold'>
                                Our goal was to implement a system that would
                                not interrupt the gameplay experience when a new
                                update was announced, and we found QR Codes to
                                be the perfect answer.
                              </h3>
                            </ZIonText>
                          </ZIonCol>
                          <ZIonCol size='12' className='mt-4'>
                            <ZIonText>
                              Juan Zacarias – Game Product Manager, Motive
                              Studios EA
                            </ZIonText>
                          </ZIonCol>
                        </ZIonRow>
                      </ZIonGrid>
                    </div>
                  </ZIonCol>
                  <ZIonCol></ZIonCol>
                </>
              </CarouselItem>
            </Carousel>
          </ZIonCol>
        </ZIonRow>
      </ZIonGrid>
    </>
  );
};

export default ZaionsCarouselSlider;
