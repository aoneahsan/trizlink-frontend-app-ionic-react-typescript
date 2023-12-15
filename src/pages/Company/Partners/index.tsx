// Core Imports
import React, { useLayoutEffect } from 'react';

// Packages Imports
import { checkmarkSharp } from 'ionicons/icons';
import { useRecoilState } from 'recoil';
import { useMediaQuery } from 'react-responsive';

import classNames from 'classnames';

// Custom Imports
import ZIonPage from '@/components/ZIonPage';
import InPageFooter from '@/components/InPageFooter';
import ZaionsTopMenu from '@/navigation/TopMenu';
import ZaionsInpageHeader from '@/components/InPageComponents/ZaionsInpageHeader';
import ZaionsInpageCol from '@/components/InPageComponents/ZaionsInpageGridsys';

import {
  ZIonCol,
  ZIonText,
  ZIonRouterLink,
  ZIonItem,
  ZIonRow,
  ZIonGrid,
  ZIonContent,
  ZIonList,
  ZIonIcon,
  ZIonButton,
  ZIonInput
} from '@/components/ZIonComponents';

// Global Imports
import { BRACKPOINT_MD, BRACKPOINT_XL, PRODUCT_NAME } from '@/utils/constants';

// Types
import { type ZaionsInpageColType } from '@/types/InPageComponentTypes/ZaionsInpageCol.type';

// Recoil State
import { ZaionsInpageColState } from '@/ZaionsStore/InpageComponents/ZaionsInpageCol.recoil';

// Data
import { ZaionsPartnerProgramData } from '@/data/Company/Partners/PartnerProgram.data';

// Styles
import classes from './styles.module.css';

// Images
import { IlloMobile } from '@/assets/images';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';

const ZaionsPartners: React.FC = () => {
  const [partnerProgramData, setPartnerProgramData] =
    useRecoilState<ZaionsInpageColType[]>(ZaionsInpageColState);

  useLayoutEffect(() => {
    setPartnerProgramData(ZaionsPartnerProgramData);
  }, [setPartnerProgramData]);
  const isXlScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_XL})`
  });
  const isMdScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_MD})`
  });
  return (
    <ZIonPage pageTitle='Partners Page'>
      <>
        {/* Content */}
        <ZIonContent>
          <ZaionsTopMenu />
          <ZaionsInpageHeader
            lgImg={IlloMobile}
            label={<ZIonText>Partners</ZIonText>}
            title={
              <ZIonText
                className={classNames({
                  'leading-[3rem]': !isMdScale
                })}>
                {PRODUCT_NAME} Partner Program
              </ZIonText>
            }
            subTitle={
              <p>Join our partnership program and accelerate your growth.</p>
            }
            primaryBtnText='Join Us'
            isSecondaryBtn={false}
            className={classNames({
              'mb-0': true,
              'ms-5': !isMdScale,
              [classes.zaions__patner_program_bg]: isXlScale
            })}
            bottomHr={false}
          />

          <ZIonGrid className={'mt-5 pt-5 pb-3 ion-text-center'}>
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
                className='mx-auto ion-text-center'>
                <h2 className='font-bolder zaions__color_dark text-[38px]'>
                  Join our Partner Program
                </h2>
                <p className=''>
                  At {PRODUCT_NAME}, we’re searching for partners who embrace
                  our core value of Customer First. We are fiercely committed to
                  our customer’s success and partner with best in class
                  platforms that strive to optimize engagement across every
                  digital touchpoint.
                </p>
              </ZIonCol>
              <ZIonCol
                size='1'
                sizeMd='0'
                sizeSm='0'
                sizeXs='0'></ZIonCol>
            </ZIonRow>
            <ZIonRow className='mb-4'>
              <ZIonCol
                sizeXl=''
                sizeLg='.7'
                sizeMd='0'
                sizeSm='0'
                sizeXs='0'></ZIonCol>
              <ZIonCol
                sizeXl='11.5'
                sizeLg='11.6'
                sizeMd='12'
                sizeSm='12'
                sizeXs='12'>
                <ZIonGrid>
                  <ZIonRow>
                    {partnerProgramData.map(el => {
                      return (
                        <ZaionsInpageCol
                          icon={el.icon}
                          title={el.title}
                          text={el.text}
                          key={el.id}
                          isLogoCenter={true}
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
          </ZIonGrid>

          <ZIonGrid>
            <ZIonRow>
              <ZIonCol></ZIonCol>
              <ZIonCol
                sizeXl='10.8'
                sizeLg='11.6'
                sizeMd='12'
                sizeSm='12'
                sizeXs='12'
                //   className='mx-auto'
              >
                <ZIonRow>
                  <ZIonCol
                    sizeXl='6'
                    sizeLg='6'
                    sizeMd='6'
                    sizeSm='12'
                    sizeXs='12'>
                    <div className=' w-max'>
                      <ZIonText>
                        <h2 className='font-extrabold zaions__color_dark'>
                          {PRODUCT_NAME} Partner Benefits
                        </h2>
                      </ZIonText>
                      <ZIonList className='pt-1 mt-4 ps-3'>
                        <ZIonItem className='border-none'>
                          <ZIonIcon
                            icon={checkmarkSharp}
                            className='text-3xl font-extrabold me-2'
                            color='warning'
                          />
                          <ZIonText className='text-[18px] fw-light'>
                            Co-marketing opportunities
                          </ZIonText>
                        </ZIonItem>
                        <ZIonItem className='border-none'>
                          <ZIonIcon
                            icon={checkmarkSharp}
                            className='text-3xl font-extrabold me-2'
                            color='warning'
                          />
                          <ZIonText className='text-[18px] fw-light'>
                            Eligibility for certification
                          </ZIonText>
                        </ZIonItem>
                        <ZIonItem className='border-none'>
                          <ZIonIcon
                            icon={checkmarkSharp}
                            className='text-3xl font-extrabold me-2'
                            color='warning'
                          />
                          <ZIonText className='text-[18px] fw-light'>
                            Technical guidance and flexible API usage
                          </ZIonText>
                        </ZIonItem>
                        <ZIonItem className='border-none'>
                          <ZIonIcon
                            icon={checkmarkSharp}
                            className='text-3xl font-extrabold me-2'
                            color='warning'
                          />
                          <ZIonText className='text-[18px] fw-light'>
                            Sales collaboration
                          </ZIonText>
                        </ZIonItem>
                      </ZIonList>
                    </div>
                  </ZIonCol>
                  <ZIonCol
                    sizeXl='6'
                    sizeLg='6'
                    sizeMd='6'
                    sizeSm='12'
                    sizeXs='12'>
                    <div className=' w-max'>
                      <ZIonText>
                        <h2 className='font-extrabold zaions__color_dark'>
                          Participation Criteria
                        </h2>
                      </ZIonText>
                      <ZIonList className='pt-1 mt-4 ps-3'>
                        <ZIonItem className='border-none'>
                          <ZIonIcon
                            icon={checkmarkSharp}
                            className='text-3xl font-extrabold me-2'
                            color='warning'
                          />
                          <ZIonText className='text-[18px] fw-light'>
                            A broad focus on business customers
                          </ZIonText>
                        </ZIonItem>
                        <ZIonItem className='border-none'>
                          <ZIonIcon
                            icon={checkmarkSharp}
                            className='text-3xl font-extrabold me-2'
                            color='warning'
                          />
                          <ZIonText className='text-[18px] fw-light'>
                            A current {PRODUCT_NAME} integration in good <br />{' '}
                            technical standing
                          </ZIonText>
                        </ZIonItem>
                        <ZIonItem className='border-none'>
                          <ZIonIcon
                            icon={checkmarkSharp}
                            className='text-3xl font-extrabold me-2'
                            color='warning'
                          />
                          <ZIonText className='text-[18px] fw-light'>
                            A solution complementary to {PRODUCT_NAME}’s
                            offering
                          </ZIonText>
                        </ZIonItem>
                        <ZIonItem className='border-none'>
                          <ZIonIcon
                            icon={checkmarkSharp}
                            className='text-3xl font-extrabold me-2'
                            color='warning'
                          />
                          <ZIonText className='text-[18px] fw-light'>
                            A broad focus on business customers
                          </ZIonText>
                        </ZIonItem>
                      </ZIonList>
                    </div>
                  </ZIonCol>
                </ZIonRow>
              </ZIonCol>
              <ZIonCol></ZIonCol>
            </ZIonRow>
          </ZIonGrid>

          <ZIonGrid className='pt-5 mt-5 mb-5'>
            <ZIonRow className='mt-3 mb-4'>
              <ZIonCol className='text-center'>
                <ZIonText className='block text-xl font-extrabold ion-text-center'>
                  Grow with {PRODUCT_NAME}
                </ZIonText>
                <ZIonText className='text-md zaions__color_gray2'>
                  Apply today and discover new opportunities for success.
                </ZIonText>
              </ZIonCol>
            </ZIonRow>
            <ZIonRow>
              <ZIonCol></ZIonCol>
              <ZIonCol
                className='p-3 zaions__bg_gray'
                sizeXl='5'
                sizeLg='6'
                sizeMd='6'
                sizeSm='6.5'
                sizeXs='11.5'>
                <ZIonText className='block pt-4 text-xl font-extrabold text-center zaions__color_dark'>
                  {PRODUCT_NAME} Partner Program
                </ZIonText>

                {/* First Name */}
                <ZIonInput
                  fill='outline'
                  label='First Name*'
                  labelPlacement='floating'
                  className='mt-4'
                />
                {/* Last Name* */}
                <ZIonInput
                  fill='outline'
                  label='Last Name*'
                  labelPlacement='floating'
                  className='mt-5'
                />
                {/* Email Address */}
                <ZIonInput
                  fill='outline'
                  label='Email Address*'
                  labelPlacement='floating'
                  className='mt-5'
                  type='email'
                />

                {/* Company Name */}
                <ZIonInput
                  fill='outline'
                  label='Company Name*'
                  labelPlacement='floating'
                  className='mt-5'
                />

                {/* Job Title */}
                <ZIonInput
                  fill='outline'
                  label='Job Title*'
                  labelPlacement='floating'
                  className='mt-5'
                />

                {/* Job Title */}
                <ZIonInput
                  fill='outline'
                  label='Job Title*'
                  labelPlacement='floating'
                  className='mt-5'
                />

                <div className='flex gap-2 mt-5 ion-align-items-center'>
                  <ZIonText>
                    Are you currently integrated with {PRODUCT_NAME}?*
                  </ZIonText>
                  <ZRCSwitch
                    checkedChildren='Yes'
                    unCheckedChildren='No'
                  />
                </div>

                <div className='flex gap-2 mt-5 ion-align-items-center'>
                  <ZIonText>What does your platform do?*</ZIonText>
                  <ZRCSwitch
                    checkedChildren='Yes'
                    unCheckedChildren='No'
                  />
                </div>

                <ZIonText
                  className='block mt-5 ion-text-center'
                  color='medium'>
                  By clicking the &apos;Submit&apos; button below, you agree to
                  the
                  {PRODUCT_NAME}
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.Legal.ZaionsTermsOfService}
                    className='inline-block ms-1'>
                    Terms of Service
                  </ZIonRouterLink>
                  ,
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.Legal.ZaionsPrivacyPolicyRoute}
                    className='inline-block ms-1'>
                    Privacy Policy
                  </ZIonRouterLink>
                  , and
                  <ZIonRouterLink
                    routerLink={
                      ZaionsRoutes.Legal.ZaionsAcceptableUsePolicyRoute
                    }
                    className='inline-block mx-1'>
                    Acceptable Use Policy
                  </ZIonRouterLink>
                  .
                </ZIonText>

                {/* Button */}
                <ZIonButton
                  className='mx-3 mt-5 normal-case'
                  expand='block'>
                  Apply now
                </ZIonButton>
              </ZIonCol>
              <ZIonCol></ZIonCol>
            </ZIonRow>
          </ZIonGrid>

          <InPageFooter />
        </ZIonContent>
      </>
    </ZIonPage>
  );
};

export default ZaionsPartners;
