// Core Imports
import React, { useLayoutEffect } from 'react';

// Packages Imports
import { IonSearchbar } from '@ionic/react';

// Custom Imports
import ZIonPage from '@/components/ZIonPage';
import InPageFooter from '@/components/InPageFooter';
import ZaionsTopMenu from '@/navigation/TopMenu';
import Zaions4By4GridSystem from '@/components/InPageComponents/Zaions4By4GridSystem';
import ZaionsFeatureBanner from '@/components/InPageComponents/ZaionsFeatureBanner';
import {
  ZIonCol,
  ZIonText,
  ZIonRouterLink,
  ZIonRow,
  ZIonGrid,
  ZIonContent,
  ZIonList,
  ZIonButton
} from '@/components/ZIonComponents';

// Type
import { type Zaions4By4GridSysType } from '@/types/InPageComponentTypes/Zaions4By4GridSys.type';

// Recoil
import { ZaionsSPSocialMarketersState } from '@/ZaionsStore/SolutionPages/SocialMarketers/ZaionsSPSocialMarketers.recoil';

// Data
import { RSBlogData } from '@/data/resources/blog/RSBlog.data';

// Global Imports
import { PRODUCT_NAME } from '@/utils/constants';

// Styles
import classes from './styles.module.css';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useRecoilState } from 'recoil';

const ZaionsBlogs: React.FC = () => {
  const [BlogData, setBlogData] = useRecoilState<Zaions4By4GridSysType[]>(
    ZaionsSPSocialMarketersState
  );

  useLayoutEffect(() => {
    setBlogData(RSBlogData);
  }, [setBlogData]);
  return (
    <ZIonPage pageTitle='Link Management'>
      {/* Page Content */}
      <ZIonContent>
        <ZaionsTopMenu />
        <ZIonGrid
          className={`ion-align-items-center sticky ${classes.zaions__bg_f5f6f8}`}>
          <ZIonRow className='ion-align-items-center'>
            <ZIonCol size='1'></ZIonCol>
            <ZIonCol
              size='6'
              className='flex ion-align-items-center'>
              <ZIonList
                lines='none'
                className={`ps-0 flex ion-align-items-center py-0 ${classes.zaions__bg_f5f6f8}`}>
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.HomeRoute}
                  color={'dark'}
                  className={`${classes.zaions__bg_f5f6f8}`}>
                  <ZIonText className='inline-block me-3 pe-2 text-[15px]'>
                    Latest Articles
                  </ZIonText>
                </ZIonRouterLink>

                <ZIonRouterLink
                  routerLink={ZaionsRoutes.HomeRoute}
                  className={`${classes.zaions__bg_f5f6f8}`}>
                  <ZIonText className='inline-block me-3 pe-1 text-[15px]'>
                    Digital Marketing
                  </ZIonText>
                </ZIonRouterLink>

                <ZIonRouterLink
                  routerLink={ZaionsRoutes.HomeRoute}
                  className={`${classes.zaions__bg_f5f6f8}`}>
                  <ZIonText className='inline-block me-3 pe-1 text-[15px]'>
                    Social Media Marketing
                  </ZIonText>
                </ZIonRouterLink>

                <ZIonRouterLink
                  routerLink={ZaionsRoutes.HomeRoute}
                  color={'dark'}
                  className={`${classes.zaions__bg_f5f6f8}`}>
                  <ZIonText className='inline-block me-3 pe-1 text-[15px]'>
                    Customer Service
                  </ZIonText>
                </ZIonRouterLink>

                <ZIonRouterLink
                  routerLink={ZaionsRoutes.HomeRoute}
                  className={`${classes.zaions__bg_f5f6f8}`}>
                  <ZIonText className='inline-block me-3 pe-1 text-[15px]'>
                    Branding
                  </ZIonText>
                </ZIonRouterLink>
              </ZIonList>
            </ZIonCol>
            <ZIonCol size='4'>
              <IonSearchbar
                showClearButton='focus'
                className={classes.zaions__blog_search_input}
                value='Search Blog'
                placeholder='Search Blog'></IonSearchbar>
            </ZIonCol>
            <ZIonCol size='1'></ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <ZaionsFeatureBanner
          title={`${PRODUCT_NAME} Blog`}
          bannerLabel='Featured Article'
          bannerColTitle={
            <>
              New Plan on the Block: Why <br /> Starter Plan is Right For You
            </>
          }
          bannerText={
            <>
              Surpassed the Free plan, but not quite ready for the whole <br />
              enchilada? Good news! {PRODUCT_NAME} has a plan offering that may
              be <br /> a great match for you.
            </>
          }
          bannerImg='https://s17233.pcdn.co/blog/wp-content/uploads/2022/09/blog_starterplan_illustration@2x-1.png'
          routeLink='/'
        />

        <Zaions4By4GridSystem
          MinHeight='365px'
          data={BlogData}
          titleBar={false}
          BGColor='#fff'
          className='pb-3'
        />
        <ZIonGrid>
          <ZIonRow>
            <ZIonCol
              size='12'
              className='pb-4 mb-5 ion-text-center'>
              <ZIonButton
                className={classes.zaions__blog_fa_btn}
                fill={'clear'}
                size={'large'}>
                Load More
              </ZIonButton>
            </ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <ZIonGrid className='zaions-ion-bg-color-light'>
          <ZIonRow className='py-5'>
            <ZIonCol
              sizeXl='1'
              sizeLg='1'
              sizeMd='0'
              sizeSm='0'
              sizeXs='0'></ZIonCol>
            <ZIonCol
              sizeXl='5'
              sizeLg='5'
              sizeMd='12'
              sizeSm='12'
              sizeXs='12'>
              <ZIonText className='block text-lg font-bolder'>
                About {PRODUCT_NAME}
              </ZIonText>
              <ZIonText className='block mt-2'>
                {PRODUCT_NAME} is a leading global SaaS company offering a
                comprehensive <br /> platform designed to enable every piece of
                information shared <br /> online to connect with key audiences
                and ignite action.
              </ZIonText>
              <ZIonButton
                className='mt-3 ion-text-capitalize'
                color={'tertiary'}>
                Learn More
              </ZIonButton>
            </ZIonCol>
            <ZIonCol
              sizeXl='5'
              sizeLg='5'
              sizeMd='12'
              sizeSm='12'
              sizeXs='12'>
              <ZIonText className='text-lg font-bolder'>
                Sign up for our newsletter
              </ZIonText>{' '}
              <br />
              <ZIonText className='pb-2 mt-2'>
                Get our most popular content sent straight to your inbox from
                the <br /> team behind the scenes.
              </ZIonText>
              {/* <Form.Label htmlFor='email-url'>Email</Form.Label>
              <InputGroup className='mb-3' size='lg'>
                <Form.Control id='email-url' aria-describedby='basic-addon2' />
                <Button variant='primary' id='button-addon2'>
                  Sign up
                </Button>
              </InputGroup> */}
              <ZIonText className='mt-4 text-[13px]'>
                By submitting my email, I consent to {PRODUCT_NAME} emailing me
                marketing communications. I may opt out at any time. By signing
                up, I agree to {PRODUCT_NAME}&apos;s{' '}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Legal.ZaionsTermsOfService}>
                  Terms of Service
                </ZIonRouterLink>
                ,
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Legal.ZaionsPrivacyPolicyRoute}>
                  {' '}
                  Privacy Policy
                </ZIonRouterLink>
                , and{' '}
                <ZIonRouterLink
                  routerLink={
                    ZaionsRoutes.Legal.ZaionsAcceptableUsePolicyRoute
                  }>
                  Acceptable Use Policy
                </ZIonRouterLink>
                .
              </ZIonText>
            </ZIonCol>
            <ZIonCol
              sizeXl='1'
              sizeLg='1'
              sizeMd='0'
              sizeSm='0'
              sizeXs='0'></ZIonCol>
          </ZIonRow>
        </ZIonGrid>
        <InPageFooter
          btnText='Start for free'
          blueSec={false}
        />
      </ZIonContent>
    </ZIonPage>
  );
};

export default ZaionsBlogs;
