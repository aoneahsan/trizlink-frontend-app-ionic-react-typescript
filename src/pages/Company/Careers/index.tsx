// Core Import
import React, { useLayoutEffect } from 'react';

// Packages Imports
import { useRecoilState, useRecoilValue } from 'recoil';
import { useMediaQuery } from 'react-responsive';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import classNames from 'classnames';

// Custom Imports
import ZIonPage from '@/components/ZIonPage';
import InPageFooter from '@/components/InPageFooter';
import ZaionsTopMenu from '@/navigation/TopMenu';
import ZaionsInpageCol from '@/components/InPageComponents/ZaionsInpageGridsys';
import {
  ZIonCol,
  ZIonText,
  ZIonRow,
  ZIonGrid,
  ZIonContent,
  ZIonImg,
  ZIonButton
} from '@/components/ZIonComponents';

// Recoil States
import { ZaionsCareersPageGalleryState } from '@/ZaionsStore/CompanySection/Careers/Gallery.recoil';
import { ZaionsJobsState } from '@/ZaionsStore/CompanySection/Careers/AvalableJobs.recoil';
import { ZaionsInpageColState } from '@/ZaionsStore/InpageComponents/ZaionsInpageCol.recoil';

// Types
import { type ZaionsGalleryType } from '@/types/Company/CareersPage/Gallery.type';
import { type ZaionsJobsType } from '@/types/Company/CareersPage/AvalableJobs.type';
import { type ZaionsInpageColType } from '@/types/InPageComponentTypes/ZaionsInpageCol.type';

// Data
import { ZaionsEmployeeBenefitsData } from '@/data/Company/Careers/EmployeeBenefits.data';

// Global constants
import { BRACKPOINT_LG, BRACKPOINT_MD, PRODUCT_NAME } from '@/utils/constants';

// Styles
import classes from './styles.module.css';

// Images
import { Awards } from '@/assets/images';

const ZaionsCareers: React.FC = () => {
  const OurJobsData = useRecoilValue<ZaionsJobsType[]>(ZaionsJobsState);
  const OurGalleryData = useRecoilValue<ZaionsGalleryType[]>(
    ZaionsCareersPageGalleryState
  );
  const [employeeBenefitsData, setEmployeeBenefits] =
    useRecoilState<ZaionsInpageColType[]>(ZaionsInpageColState);

  useLayoutEffect(() => {
    setEmployeeBenefits(ZaionsEmployeeBenefitsData);
  }, [setEmployeeBenefits]);

  const isLgScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_LG})`
  });
  const isMdScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_MD})`
  });

  return (
    <ZIonPage pageTitle='Careers Page'>
      {/* Content */}
      <ZIonContent>
        <ZaionsTopMenu />

        <ZIonGrid className='zaions__bg_gray'>
          <ZIonRow className='pt-5 pb-3 my-5'>
            <ZIonCol></ZIonCol>
            <ZIonCol
              sizeXl='10'
              sizeLg='10'
              sizeMd='10'
              sizeSm='11'
              sizeXs='12'
              className={`${!isLgScale ? 'ion-text-center' : ''}`}>
              <ZIonText className='font-bold'>Careers</ZIonText>
              <ZIonText>
                <h1 className='zaions__page_title'>Join our team</h1>
              </ZIonText>
              <ZIonText className='text-xl zaions__color_gray2'>
                We have offices in New York City, San Francisco and Denver
              </ZIonText>
            </ZIonCol>
            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <ZIonGrid>
          <ZIonRow>
            <ZIonCol></ZIonCol>
            <ZIonCol
              sizeXl='10'
              sizeLg='10'
              sizeMd='11'
              sizeSm='11.5'
              sizeXs='12'
              // className={`${!isMdScale && 'ion-text-center'} mt-5 pt-4`}
              className={classNames({
                'mt-5 pt-4': true,
                'ion-text-center': !isMdScale
              })}>
              <ZIonText>
                <h2 className='font-extrabold'>Open Positions</h2>
              </ZIonText>
              <div className=''>
                <button
                  className={`${classes.zaions__position_btn} ${classes.zaions__position_btn_active} me-3`}>
                  All Positions
                </button>
                <button className={`${classes.zaions__position_btn} me-3 mt-3`}>
                  Customer Success
                </button>
                <button className={`${classes.zaions__position_btn} me-3 mt-3`}>
                  Engineering
                </button>
                <button className={`${classes.zaions__position_btn} me-3 mt-3`}>
                  Finance
                </button>
                <button className={`${classes.zaions__position_btn} me-3 mt-3`}>
                  Marketing
                </button>
                <button className={`${classes.zaions__position_btn} me-3 mt-3`}>
                  Operations
                </button>
                <button className={`${classes.zaions__position_btn} me-3 mt-3`}>
                  Partnerships
                </button>
                <button className={`${classes.zaions__position_btn} me-3 mt-3`}>
                  People Team
                </button>
                <button className={`${classes.zaions__position_btn} me-3 mt-3`}>
                  Product
                </button>
              </div>
            </ZIonCol>
            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <ZIonGrid>
          <ZIonRow>
            <ZIonCol></ZIonCol>
            <ZIonCol
              sizeXl='10'
              sizeLg='10'
              sizeMd='11'
              sizeSm='11.8'
              sizeXs='12'>
              {OurJobsData.map(el => {
                return (
                  <div key={el.id}>
                    <ZIonRow
                      className='mt-5'
                      key={el.id}>
                      <ZIonCol
                        className={classNames({
                          'mt-5 pt-4': true,
                          'ion-text-center mb-2': !isMdScale,
                          'flex ion-align-items-center ion-justify-content-between':
                            isMdScale
                        })}>
                        <div className=''>
                          <ZIonText>
                            <h2 className='font-bold zaions__color_dark_2'>
                              {el.JobTitle}
                            </h2>
                          </ZIonText>
                          <ZIonText className='text-lg zaions__color_gray2'>
                            {el.JobPlace}
                          </ZIonText>
                        </div>
                        <ZIonButton
                          className='zaions__tertiary_btn ion-text-capitalize'
                          size='large'
                          fill='clear'
                          routerLink={el.ApplyLink}>
                          Apply Here
                        </ZIonButton>
                      </ZIonCol>
                    </ZIonRow>
                    <hr className='m-0' />
                  </div>
                );
              })}
            </ZIonCol>
            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <ZIonGrid
          // className={`mt-5 pt-5 pb-3 ${!isLgScale ? 'ion-text-center' : ''}`}
          className={classNames({
            'mt-5 pt-5 pb-3': true,
            'ion-text-center': !isLgScale
          })}>
          <ZIonRow className='mb-4'>
            <ZIonCol
              size='1'
              sizeMd='0'
              sizeSm='0'
              sizeXs='0'></ZIonCol>
            <ZIonCol
              sizeXl='9.5'
              sizeLg='9.5'
              sizeMd='10'
              sizeSm='11'
              sizeXs='12'
              className={`mx-auto ${
                !isMdScale ? 'ion-text-center' : 'ion-text-left'
              }`}>
              <ZIonText>
                <h2
                  className='font-bolder zaions__color_dark'
                  style={{ fontSize: '38px' }}>
                  Employee Benefits
                </h2>
              </ZIonText>
              <ZIonText className='text-lg zaions__color_gray2'>
                We offer competitive compensation, full benefits and some great
                perks. More importantly, we offer you the chance to work with a
                team that is focused on building something impactful.
              </ZIonText>
            </ZIonCol>
            <ZIonCol
              size='1'
              sizeMd='0'
              sizeSm='0'
              sizeXs='0'></ZIonCol>
          </ZIonRow>
          <ZIonRow className='mb-4'>
            <ZIonCol
              sizeXl='1'
              sizeLg='.7'
              sizeMd='0'
              sizeSm='0'
              sizeXs='0'></ZIonCol>
            <ZIonCol
              sizeXl='11'
              sizeLg='11'
              sizeMd='12'
              sizeSm='12'
              sizeXs='12'>
              <ZIonGrid>
                <ZIonRow>
                  {employeeBenefitsData.map(el => {
                    return (
                      <ZaionsInpageCol
                        icon={el.icon}
                        title={el.title}
                        text={el.text}
                        key={el.id}
                      />
                    );
                  })}
                </ZIonRow>
              </ZIonGrid>
            </ZIonCol>
            <ZIonCol
              sizeXl='0'
              sizeLg=''
              sizeMd='0'
              sizeSm='0'
              sizeXs='0'></ZIonCol>
          </ZIonRow>
          <ZIonRow className='mb-4'>
            <ZIonCol
              size='1'
              sizeMd='0'
              sizeSm='0'
              sizeXs='0'></ZIonCol>
            <ZIonCol
              sizeXl='9.8'
              sizeLg='9.8'
              sizeMd='10.5'
              sizeSm='11.5'
              sizeXs='12'
              className={classNames({
                'mx-auto': true,
                'ion-text-center': !isMdScale,
                'ion-text-left': isMdScale
              })}>
              <ZIonText>
                <h2
                  className='font-bolder zaions__color_dark'
                  style={{ fontSize: '38px' }}>
                  Our employees love working here
                </h2>
              </ZIonText>
              <ZIonText className='pb-5 text-lg zaions__color_gray2'>
                Whether it’s through our awards or through our reviews found on
                Glassdoor, you’ll see that our employees love working at{' '}
                {PRODUCT_NAME}.
              </ZIonText>
              <ZIonImg
                src={Awards}
                // className={`mt-3 ${!isLgScale ? '' : 'ms-5'}`}
                className={classNames({
                  'mt-3': true,
                  'ms-5': isLgScale
                })}
              />
            </ZIonCol>
            <ZIonCol
              size='1'
              sizeMd='0'
              sizeSm='0'
              sizeXs='0'></ZIonCol>
          </ZIonRow>
        </ZIonGrid>
        <ZIonGrid>
          <ZIonRow>
            <ZIonCol></ZIonCol>
            <ZIonCol
              sizeXl='11.2'
              sizeLg='12'
              sizeMd='12'
              sizeSm='12'
              sizeXs='12'></ZIonCol>
            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <ZIonGrid>
          <ZIonRow>
            <ZIonCol></ZIonCol>
            <ZIonCol
              sizeXl='11'
              sizeLg='11'
              sizeMd='11'
              sizeSm='11.5'
              sizeXs='11.9'>
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 540: 1, 720: 2, 960: 3 }}>
                <Masonry gutter='10px'>
                  {OurGalleryData.map(el => (
                    <div
                      className={`${classes.zaions__gallery}`}
                      key={el.id}>
                      <ZIonImg
                        src={el.image}
                        className={`${classes.zaions__gallery_img}`}
                      />
                      <div className={classes.zaions__gallery_overlay}>
                        <div>
                          <ZIonText>{el.text}</ZIonText>
                        </div>
                      </div>
                    </div>
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            </ZIonCol>
            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <InPageFooter />
      </ZIonContent>
    </ZIonPage>
  );
};

export default ZaionsCareers;
