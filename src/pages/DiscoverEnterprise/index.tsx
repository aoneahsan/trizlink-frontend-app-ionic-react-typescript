// Core Imports
import React, { Fragment, useLayoutEffect } from 'react';

// Packages Imports
import { Button, Carousel, CarouselItem, Form } from 'react-bootstrap';

import { useMediaQuery } from 'react-responsive';
import { useRecoilState } from 'recoil';

// Custom Imports
import ZaionsIonPage from 'components/ZaionsIonPage';
import ZaionsHr from 'components/InPageComponents/Zaion_hr';
import {
  ZIonCol,
  ZIonText,
  ZIonRouterLink,
  ZIonItem,
  ZIonRow,
  ZIonGrid,
  ZIonContent,
  ZIonList,
  ZIonImg,
  ZIonIcon,
} from 'components/ZIonComponents';
import ZaionsSecondaryHeader from 'components/InPageComponents/ZaionsSecondaryHeader';

// Global Constants
import { BRACKPOINT_MD, PRODUCT_DOMAIN, PRODUCT_NAME } from 'utils/constants';
import {
  ZaionsDiscoverEnterpriseCompanySize,
  ZaionsDiscoverEnterpriseCountry,
  ZaionsDiscoverEnterpriseJobTitle,
  ZaionsDiscoverEnterprisePrimaryUseCase,
} from 'data/DiscoverEnterprise/index.data';

// Types
import { ZaionsHPBrandsType } from 'types/ZionsHPBrandType';

// Recoil States
import { ZaionsHPBrandsData } from 'ZaionsStore/ZaionsHPBrandsRecoil';

// Styles
import classes from './styles.module.css';
import DEBrandData from 'data/DiscoverEnterprise.data';
import { checkmarkSharp } from 'ionicons/icons';
import InPageFooter from 'components/InPageFooter';
import ZaionsRoutes from 'utils/constants/RoutesConstants';

const ZaionsDiscoverEnterprise: React.FC = () => {
  const [loadedHPBrandsData, setLoadedHPBrandsData] =
    useRecoilState<ZaionsHPBrandsType[]>(ZaionsHPBrandsData);
  const isSMSclae = useMediaQuery({ query: `(max-width: ${BRACKPOINT_MD})` });
  const ZaionsCarousel = isSMSclae ? Carousel : Fragment;
  const ZaionsCarouselItem = isSMSclae ? CarouselItem : Fragment;

  useLayoutEffect(() => {
    // Fetch Data From Database Later:-
    setLoadedHPBrandsData(DEBrandData);
  }, [setLoadedHPBrandsData]);

  return (
    <ZaionsIonPage pageTitle='Discover Enterprise Page'>
      <ZIonContent>
        <ZaionsSecondaryHeader bottomHr={false} />

        <ZIonGrid
          className={`mt-5 pt-5 mb-5 ${classes.zaions__discover_enterpise_bg}`}
        >
          <ZIonRow className='mt-3 mb-4'>
            <ZIonCol className='text-center'>
              <ZIonText>
                <h2 className='zaions__fw_800 zaions__color_dark'>
                  Discover the {PRODUCT_NAME} solution that’s right for you
                </h2>
              </ZIonText>
              <ZIonText className='fs-5 zaions__color_gray2 mb-2'>
                {PRODUCT_NAME} helps you build and protect your brand so you can
                leverage it across your communication <br /> channels to drive
                powerful business results.
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
                  Let's get in touch
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
                    <Form.Label className='zaions__fs_11'>Last Name</Form.Label>
                  </Form.Group>
                </div>

                <Form.Group className='mb-3' controlId='companyName'>
                  <Form.Label>Company Name*</Form.Label>
                  <Form.Control type='email' size='lg' />
                </Form.Group>

                <Form.Group className='mb-3' controlId='businessEmailAddress'>
                  <Form.Label>Business Email Address*</Form.Label>
                  <Form.Control type='text' size='lg' />
                </Form.Group>

                <Form.Group className='mb-3' controlId='phoneNumber'>
                  <Form.Label>Phone Number*</Form.Label>
                  <Form.Control type='text' size='lg' />
                </Form.Group>

                <Form.Group className='mb-3 fs-6' controlId='jobTitle'>
                  <Form.Label>Job Title*</Form.Label>
                  <Form.Select id='disabledSelect' size='lg' className='fs-6'>
                    <option value=''>&nbsp;</option>
                    {ZaionsDiscoverEnterpriseJobTitle.map((el) => {
                      return (
                        <option value={el} className='fs-6'>
                          {el}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>

                <Form.Group className='mb-3' controlId='companySize'>
                  <Form.Label>Company Size*</Form.Label>
                  <Form.Select id='disabledSelect' size='lg' className='fs-6'>
                    <option value=''>&nbsp;</option>
                    {ZaionsDiscoverEnterpriseCompanySize.map((el) => {
                      return (
                        <option value={el} className='fs-6'>
                          {el}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>

                <Form.Group className='mb-3' controlId='PrimaryUseCase'>
                  <Form.Label>Primary Use Case*</Form.Label>
                  <Form.Select id='disabledSelect' size='lg' className='fs-6'>
                    <option value=''>&nbsp;</option>
                    {ZaionsDiscoverEnterprisePrimaryUseCase.map((el) => {
                      return (
                        <option value={el} className='fs-6'>
                          {el}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>

                <Form.Group className='mb-3' controlId='Country'>
                  <Form.Label>Country*</Form.Label>
                  <Form.Select id='disabledSelect' size='lg' className='fs-6'>
                    <option value=''>&nbsp;</option>
                    {ZaionsDiscoverEnterpriseCountry.map((el) => {
                      return (
                        <option value={el.value} className='fs-6'>
                          {el.label}
                        </option>
                      );
                    })}
                  </Form.Select>
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
        <ZaionsHr />

        <ZIonGrid className='mb-5 pb-4'>
          <ZIonRow>
            <ZIonCol
              sizeXl='1'
              sizeLg='0'
              sizeMd='0'
              sizeSm='0'
              sizeXs='0'
            ></ZIonCol>
            <ZIonCol sizeXl='5' sizeLg='6' sizeMd='5' sizeSm='12' sizeXs='12'>
              <ZIonRow>
                <ZIonCol className='ion-text-center mb-5 mt-2'>
                  <ZIonText>
                    <h2 className='zaions__fw_800'>
                      {PRODUCT_NAME} is trusted by the world’s most pioneering
                      brands.
                    </h2>
                  </ZIonText>
                </ZIonCol>
              </ZIonRow>
              <ZIonRow className='ion-justify-content-center ion-align-items-center'>
                <ZaionsCarousel>
                  {loadedHPBrandsData.map((item) => (
                    <ZaionsCarouselItem key={item.id}>
                      <ZIonCol
                        sizeXl='3'
                        sizeLg='3.5'
                        sizeMd='5'
                        sizeSm='12'
                        sizeXs='12'
                        key={item.id}
                      >
                        <ZIonImg src={item.image} alt='' />
                      </ZIonCol>
                    </ZaionsCarouselItem>
                  ))}
                </ZaionsCarousel>
              </ZIonRow>
            </ZIonCol>
            <ZIonCol sizeXl='4' sizeLg='5' sizeMd='6' sizeSm='12' sizeXs='12'>
              <ZIonList
                className={`mt-4 pt-1 ps-3  ${!isSMSclae ? 'ms-5' : ''}`}
              >
                <ZIonItem
                  className={`d-flex ion-align-items-center ${
                    !isSMSclae ? '' : 'mt-2 mb-3'
                  }`}
                >
                  <ZIonIcon
                    icon={checkmarkSharp}
                    className={`fs-1 zaions__fw_800 me-2  ${
                      !isSMSclae ? 'mb-4' : ''
                    }`}
                    style={{ color: '#ee6123' }}
                  />
                  <ZIonText className='zaions__fs_18 '>
                    <ZIonText className='fw-bold'>
                      Custom Branded Domains
                    </ZIonText>{' '}
                    – Replace the “{PRODUCT_DOMAIN}” with your chosen domain
                    name
                  </ZIonText>
                </ZIonItem>

                <ZIonItem
                  className={`d-flex ion-align-items-center ${
                    !isSMSclae ? '' : 'mt-2 mb-3'
                  }`}
                >
                  <ZIonIcon
                    icon={checkmarkSharp}
                    className={`fs-1 zaions__fw_800 me-2  ${
                      !isSMSclae ? 'mb-4' : ''
                    }`}
                    style={{ color: '#ee6123' }}
                  />
                  <ZIonText className='zaions__fs_18 '>
                    <ZIonText className='fw-bold'>Auto Branding</ZIonText> – Any
                    link shortened in {PRODUCT_NAME} by a third-party will use
                    your custom branded domain
                  </ZIonText>
                </ZIonItem>

                <ZIonItem
                  className={`d-flex ion-align-items-center ${
                    !isSMSclae ? '' : 'mt-2 mb-3'
                  }`}
                >
                  <ZIonIcon
                    icon={checkmarkSharp}
                    className={`fs-1 zaions__fw_800 me-2  ${
                      !isSMSclae ? 'mb-4' : ''
                    }`}
                    style={{ color: '#ee6123' }}
                  />
                  <ZIonText className='zaions__fs_18 '>
                    <ZIonText className='fw-bold'>
                      Unlimited Link Redirects
                    </ZIonText>{' '}
                    – Easily change the destination page for any of your links
                  </ZIonText>
                </ZIonItem>

                <ZIonItem
                  className={`d-flex ion-align-items-center ${
                    !isSMSclae ? '' : 'mt-2 mb-3'
                  }`}
                >
                  <ZIonIcon
                    icon={checkmarkSharp}
                    className={`fs-1 zaions__fw_800 me-2  ${
                      !isSMSclae ? 'mb-4' : ''
                    }`}
                    style={{ color: '#ee6123' }}
                  />
                  <ZIonText className='zaions__fs_18 '>
                    <ZIonText className='fw-bold'>
                      Campaign Management & Analytics
                    </ZIonText>{' '}
                    – Glean insights from link-level data points
                  </ZIonText>
                </ZIonItem>

                <ZIonItem
                  className={`d-flex ion-align-items-center ${
                    !isSMSclae ? '' : 'mt-2 mb-3'
                  }`}
                >
                  <ZIonIcon
                    icon={checkmarkSharp}
                    className={`fs-1 zaions__fw_800 me-2  ${
                      !isSMSclae ? 'mb-4' : ''
                    }`}
                    style={{ color: '#ee6123' }}
                  />
                  <ZIonText className='zaions__fs_18 '>
                    <ZIonText className='fw-bold'>
                      Account Setup & Support
                    </ZIonText>{' '}
                    – Gain access to personalized onboarding and setup
                  </ZIonText>
                </ZIonItem>
              </ZIonList>
            </ZIonCol>
            <ZIonCol
              sizeXl='1'
              sizeLg='0'
              sizeMd='0'
              sizeSm='0'
              sizeXs='0'
            ></ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <InPageFooter blueSec={false} />
      </ZIonContent>
    </ZaionsIonPage>
  );
};

export default ZaionsDiscoverEnterprise;
