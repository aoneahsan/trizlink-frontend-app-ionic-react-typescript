// Core Imports
import React, { Suspense } from 'react';

// Package Imports

// Custom Imports
import InPageFooter from '@/components/InPageFooter';
import ZIonPage from '@/components/ZIonPage';
import ZaionsHPBanner from '@/components/ZaionsHomePage/HPBanner';
import ZaionsHPConnectPlatform from '@/components/ZaionsHomePage/HPConnetPlateform';
import ZaionsHPFAQuestions from '@/components/ZaionsHomePage/HPQuestions';
import ZaionsHPUsersFeedBack from '@/components/ZaionsHomePage/HPFeedback';
import { ZIonContent } from '@/components/ZIonComponents';

// Styles
import './styles.css';
import ZFallbackIonSpinner from '@/components/CustomComponents/FallbackSpinner';
// import ZaionsTopMenu from '@/navigation/TopMenu';
const ZaionsTopMenu = React.lazy(() => import('@/navigation/TopMenu'));

const Home: React.FC = () => {
  return (
    <ZIonPage pageTitle='Home Page'>
      <Suspense fallback={<ZFallbackIonSpinner />}>
        <ZIonContent fullscreen>
          <ZaionsTopMenu />
          <ZaionsHPBanner />
          {/* <ZaionsHPShortLink /> */}
          <ZaionsHPConnectPlatform />
          {/* <ZaionsHPGlobal /> */}
          <ZaionsHPUsersFeedBack />
          {/* <ZaionsHPBrandList /> */}
          <ZaionsHPFAQuestions />
          {/* Page Footer */}
          <InPageFooter
            title='More than a free link shortener'
            btnText='Get Started'
          />
        </ZIonContent>
      </Suspense>
    </ZIonPage>
  );
};

export default Home;
