// Core Imports
import React, { useLayoutEffect } from 'react';

// Packages Imports
import { checkmarkSharp } from 'ionicons/icons';
import { useRecoilState } from 'recoil';
import { useMediaQuery } from 'react-responsive';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import classNames from 'classnames';

// Custom Imports
import ZaionsIonPage from '@/components/ZaionsIonPage';
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
} from '@/components/ZIonComponents';

// Global Imports
import { BRACKPOINT_MD, BRACKPOINT_XL, PRODUCT_NAME } from '@/utils/constants';

// Types
import { ZaionsInpageColType } from '@/types/InPageComponentTypes/ZaionsInpageCol.type';

// Recoil State
import { ZaionsInpageColState } from '@/ZaionsStore/InpageComponents/ZaionsInpageCol.recoil';

// Data
import { ZaionsPartnerProgramData } from '@/data/Company/Partners/PartnerProgram.data';

// Styles
import classes from './styles.module.css';

// Images
import { IlloMobile } from '@/assets/images';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

const ZaionsPartners: React.FC = () => {
  const [partnerProgramData, setpartnerProgramData] =
    useRecoilState<ZaionsInpageColType[]>(ZaionsInpageColState);

  useLayoutEffect(() => {
    setpartnerProgramData(ZaionsPartnerProgramData);
  }, [setpartnerProgramData]);
  const isXlScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_XL})`,
  });
  const isMdScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_MD})`,
  });
  return (
    <ZaionsIonPage pageTitle='Partners Page'>
      <>
        {/* Content */}
        <ZIonContent>
          <ZaionsTopMenu />
          <ZaionsInpageHeader
            lgImg={IlloMobile}
            label={<ZIonText>Partners</ZIonText>}
            title={
              <ZIonText style={{ lineHeight: !isMdScale ? '3rem' : '' }}>
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
              [classes.zaions__patner_program_bg]: isXlScale,
            })}
            bottomHr={false}
          />

          <ZIonGrid className={`mt-5 pt-5 pb-3 ion-text-center`}>
            <ZIonRow className='mb-4'>
              <ZIonCol size='1' sizeMd='0' sizeSm='0' sizeXs='0'></ZIonCol>
              <ZIonCol
                sizeXl='9.5'
                sizeLg='9.5'
                sizeMd='10'
                sizeSm='11'
                sizeXs='12'
                className='mx-auto ion-text-center'
              >
                <h2
                  className='fw-bolder zaions__color_dark'
                  style={{ fontSize: '38px' }}
                >
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
              <ZIonCol size='1' sizeMd='0' sizeSm='0' sizeXs='0'></ZIonCol>
            </ZIonRow>
            <ZIonRow className='mb-4'>
              <ZIonCol
                sizeXl=''
                sizeLg='.7'
                sizeMd='0'
                sizeSm='0'
                sizeXs='0'
              ></ZIonCol>
              <ZIonCol
                sizeXl='11.5'
                sizeLg='11.6'
                sizeMd='12'
                sizeSm='12'
                sizeXs='12'
              >
                <ZIonGrid>
                  <ZIonRow>
                    {partnerProgramData.map((el) => {
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
                sizeXs='0'
              ></ZIonCol>
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
                    sizeXs='12'
                  >
                    <div className=' zaions__max_content'>
                      <ZIonText>
                        <h2 className='zaions__fw_800 zaions__color_dark'>
                          {PRODUCT_NAME} Partner Benefits
                        </h2>
                      </ZIonText>
                      <ZIonList className='mt-4 pt-1 ps-3'>
                        <ZIonItem className='border-none'>
                          <ZIonIcon
                            icon={checkmarkSharp}
                            className='fs-3 zaions__fw_800 me-2'
                            style={{ color: '#ee6123' }}
                          />
                          <ZIonText className='zaions__fs_18 fw-light'>
                            Co-marketing opportunities
                          </ZIonText>
                        </ZIonItem>
                        <ZIonItem className='border-none'>
                          <ZIonIcon
                            icon={checkmarkSharp}
                            className='fs-3 zaions__fw_800 me-2'
                            style={{ color: '#ee6123' }}
                          />
                          <ZIonText className='zaions__fs_18 fw-light'>
                            Eligibility for certification
                          </ZIonText>
                        </ZIonItem>
                        <ZIonItem className='border-none'>
                          <ZIonIcon
                            icon={checkmarkSharp}
                            className='fs-3 zaions__fw_800 me-2'
                            style={{ color: '#ee6123' }}
                          />
                          <ZIonText className='zaions__fs_18 fw-light'>
                            Technical guidance and flexible API usage
                          </ZIonText>
                        </ZIonItem>
                        <ZIonItem className='border-none'>
                          <ZIonIcon
                            icon={checkmarkSharp}
                            className='fs-3 zaions__fw_800 me-2'
                            style={{ color: '#ee6123' }}
                          />
                          <ZIonText className='zaions__fs_18 fw-light'>
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
                    sizeXs='12'
                  >
                    <div className=' zaions__max_content'>
                      <ZIonText>
                        <h2 className='zaions__fw_800 zaions__color_dark'>
                          Participation Criteria
                        </h2>
                      </ZIonText>
                      <ZIonList className='mt-4 pt-1 ps-3'>
                        <ZIonItem className='border-none'>
                          <ZIonIcon
                            icon={checkmarkSharp}
                            className='fs-3 zaions__fw_800 me-2'
                            style={{ color: '#ee6123' }}
                          />
                          <ZIonText className='zaions__fs_18 fw-light'>
                            A broad focus on business customers
                          </ZIonText>
                        </ZIonItem>
                        <ZIonItem className='border-none'>
                          <ZIonIcon
                            icon={checkmarkSharp}
                            className='fs-3 zaions__fw_800 me-2'
                            style={{ color: '#ee6123' }}
                          />
                          <ZIonText className='zaions__fs_18 fw-light'>
                            A current {PRODUCT_NAME} integration in good <br />{' '}
                            technical standing
                          </ZIonText>
                        </ZIonItem>
                        <ZIonItem className='border-none'>
                          <ZIonIcon
                            icon={checkmarkSharp}
                            className='fs-3 zaions__fw_800 me-2'
                            style={{ color: '#ee6123' }}
                          />
                          <ZIonText className='zaions__fs_18 fw-light'>
                            A solution complementary to {PRODUCT_NAME}’s
                            offering
                          </ZIonText>
                        </ZIonItem>
                        <ZIonItem className='border-none'>
                          <ZIonIcon
                            icon={checkmarkSharp}
                            className='fs-3 zaions__fw_800 me-2'
                            style={{ color: '#ee6123' }}
                          />
                          <ZIonText className='zaions__fs_18 fw-light'>
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

          <ZIonGrid className='mt-5 pt-5 mb-5'>
            <ZIonRow className='mt-3 mb-4'>
              <ZIonCol className='text-center'>
                <ZIonText>
                  <h2 className='zaions__fw_800'>Grow with {PRODUCT_NAME}</h2>
                </ZIonText>
                <ZIonText className='fs-5 zaions__color_gray2'>
                  Apply today and discover new opportunities for success.
                </ZIonText>
              </ZIonCol>
            </ZIonRow>
            <ZIonRow>
              <ZIonCol></ZIonCol>
              <ZIonCol
                className='zaions__bg_gray py-3'
                sizeXl='5'
                sizeLg='6'
                sizeMd='6'
                sizeSm='6.5'
                sizeXs='11.5'
              >
                <ZIonText>
                  <h2 className='zaions__fw_800 text-center pt-4 zaions__color_dark'>
                    {PRODUCT_NAME} Partner Program
                  </h2>
                </ZIonText>
                <Form className='px-4'>
                  <Form.Label>Name*</Form.Label>
                  <div className='mb-3 d-flex'>
                    <Form.Group className='me-2' controlId='firstName'>
                      <Form.Control type='text' size='lg' required />
                      <Form.Label className='zaions__fs_11'>
                        First Name
                      </Form.Label>
                    </Form.Group>
                    <Form.Group controlId='lastName'>
                      <Form.Control type='email' size='lg' required />
                      <Form.Label className='zaions__fs_11'>
                        Last Name
                      </Form.Label>
                    </Form.Group>
                  </div>

                  <Form.Group className='mb-3' controlId='emailAddress'>
                    <Form.Label>Email Address*</Form.Label>
                    <Form.Control type='email' size='lg' />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='companyName'>
                    <Form.Label>Company Name*</Form.Label>
                    <Form.Control type='text' size='lg' />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='jobTitle'>
                    <Form.Label>Job Title*</Form.Label>
                    <Form.Control type='text' size='lg' />
                  </Form.Group>

                  <Form.Group
                    className='mb-3'
                    controlId='integratedWithZaions?'
                  >
                    <Form.Label>
                      Are you currently integrated with {PRODUCT_NAME}?*
                    </Form.Label>{' '}
                    <br />
                    <Form.Check
                      inline
                      label='Yes'
                      name='group1'
                      type={'radio'}
                      id={`inline-Yes-1`}
                    />
                    <Form.Check
                      inline
                      label='No'
                      name='group1'
                      type='radio'
                      id={`inline-No-1`}
                    />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='plateform'>
                    <Form.Label>What does your platform do?*</Form.Label>
                    <Form.Control type='text' size='lg' />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='NatureOfIntegration'>
                    <Form.Label>
                      Nature of integration / Other notes:*
                    </Form.Label>
                    <Form.Control type='text' size='lg' />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='NatureOfIntegration'>
                    <Form.Text className='zaions__fs_11'>
                      By clicking the 'Submit' button below, you agree to the
                      {PRODUCT_NAME}
                      <ZIonRouterLink
                        routerLink={ZaionsRoutes.Legal.ZaionsTermsOfService}
                      >
                        Terms of Service
                      </ZIonRouterLink>
                      ,{' '}
                      <ZIonRouterLink
                        routerLink={ZaionsRoutes.Legal.ZaionsPrivacyPolicyRoute}
                      >
                        Privacy Policy
                      </ZIonRouterLink>
                      , and{' '}
                      <ZIonRouterLink
                        routerLink={
                          ZaionsRoutes.Legal.ZaionsAcceptableUsePolicyRoute
                        }
                      >
                        Acceptable Use Policy
                      </ZIonRouterLink>
                      .
                    </Form.Text>
                  </Form.Group>

                  <Form.Group
                    className='mb-3 d-grid'
                    controlId='NatureOfIntegration'
                  >
                    <Button
                      variant='primary zaions_primary_color'
                      type='submit'
                      size='lg'
                    >
                      Apply Now
                    </Button>
                  </Form.Group>
                </Form>
              </ZIonCol>
              <ZIonCol></ZIonCol>
            </ZIonRow>
          </ZIonGrid>

          <InPageFooter />
        </ZIonContent>
      </>
    </ZaionsIonPage>
  );
};

export default ZaionsPartners;
