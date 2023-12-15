// Core Import
import React from 'react';

// Package Imports
import { useMediaQuery } from 'react-responsive';

// Custom Imports
import ZIonPage from '@/components/ZIonPage';
import ZaionsInpageBrandsList from '@/components/InPageComponents/ZaionsBrandsList';
import ZaionsTopMenu from '@/navigation/TopMenu';
import ZaionsInpageHeader from '@/components/InPageComponents/ZaionsInpageHeader';
import ZaionsTwoByTwoLeftCols from '@/components/InPageComponents/Zaions2By2LeftCols';
import ZaionsTwoByTwoRightCols from '@/components/InPageComponents/Zaions2By2RightCols';
import InPageFooter from '@/components/InPageFooter';

import { ZIonText, ZIonContent } from '@/components/ZIonComponents';

// Global Constants
import { BRACKPOINT_LG, PRODUCT_DOMAIN, PRODUCT_NAME } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Styles
import classes from './styles.module.css';

// Images
import {
  apiandintegrations,
  brandedlinks1,
  enterprise02,
  LinkShorteningCenterModule,
  Mobile2,
  Zaions101MobileImage
} from '@/assets/images';
import classNames from 'classnames';

const Zaions101: React.FC = () => {
  const isMdScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_LG})`
  });
  return (
    <ZIonPage pageTitle='101 Page'>
      {/* Page Content */}
      <ZIonContent fullscreen>
        <ZaionsTopMenu />
        <ZaionsInpageHeader
          lgImg={Zaions101MobileImage}
          label={`${PRODUCT_NAME} 101`}
          title={
            <ZIonText
              className={classNames({
                block: true,
                'leading-[3rem]': !isMdScale
              })}>
              World-class link management
            </ZIonText>
          }
          subTitle={
            <ZIonText className='block'>
              {PRODUCT_NAME} helps businesses shine by transforming their links
              into powerful tools for <br /> marketers and customer support
              teams.
            </ZIonText>
          }
          primaryBtnText='Get Started'
          primaryBtnLinkTo={ZaionsRoutes.WhyZaions.ZaionsPricingRoute}
          seondaryBtnLinkTo={ZaionsRoutes.DiscoverEnterpriseRoute}
          isSecondaryBtn={true}
          secondaryBtnText='Get a Quote'
          className={classNames({
            'pb-0 pt-5': true,
            [classes.zaions__101_bg]: isMdScale
          })}
        />

        <ZaionsTwoByTwoRightCols
          title={`Work smarter with ${PRODUCT_NAME}’s all-in-one platform`}
          text={`Creating, sharing and monitoring your links shouldn’t be a drag.
          ${PRODUCT_NAME} helps you work faster and more intelligently—with
          features like branded links and the ability to redirect any
          link—so you can relish the sweet taste of hitting your
          performance goals.`}
          Btn={true}
          colRightImage={LinkShorteningCenterModule}
        />

        <ZaionsTwoByTwoLeftCols
          title={'Get more clicks with custom links'}
          text={`Make your links powerful marketing assets. Custom links replace “${PRODUCT_DOMAIN}” with your chosen domain name, making your links
                consistently recognizable across channels. They’re so powerful,
                businesses that use them get more clicks.`}
          Btn={true}
          colLeftImage={brandedlinks1}
          bottomHr={true}
        />

        <ZaionsTwoByTwoRightCols
          title={'Maximize your performance using real-time analytics'}
          text={`Understand what content is resonating with your audience with
          comprehensive metrics on every link and campaign—like clicks,
          geographic data, and top referring channels. ${PRODUCT_NAME}
          takes the guesswork out of your link performance so you can
          share more of what your audience wants.`}
          Btn={true}
          colRightImage={Mobile2}
          bottomHr={true}
        />

        <ZaionsTwoByTwoLeftCols
          title={'Integrate seamlessly with the tools you love'}
          text={`${PRODUCT_NAME} integrates with nearly every social media and
          digital marketing tool, saving you time and hassle. Need to
          create links at scale? ${PRODUCT_NAME}’s got you covered. Whether
          you need 100 links or 100,000, the open and flexible
          ${PRODUCT_NAME} API makes it simple and seamless.`}
          Btn={true}
          colLeftImage={apiandintegrations}
          bottomHr={true}
        />

        <ZaionsTwoByTwoRightCols
          title={'Rest assured knowing your links are secure'}
          text={`${PRODUCT_NAME} is dedicated to ensuring your links are safe and
          reliable. Every link you create using ${PRODUCT_NAME} is encrypted with
          HTTPS to maximize protection against eavesdropping or tampering
          by third parties, keeping your content safe from the bad guys.`}
          Btn={true}
          colRightImage={enterprise02}
          bottomHr={true}
          ImgWidth='80%'
        />

        <ZaionsInpageBrandsList
          title={`The most recognized brands in the world love ${PRODUCT_NAME}`}
          className='pb-3'
        />
        <div className='pb-5 mb-1'></div>

        {/* Page Footer */}
        <InPageFooter btnText='Start for free' />
      </ZIonContent>
    </ZIonPage>
  );
};

export default Zaions101;
