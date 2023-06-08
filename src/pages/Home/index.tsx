// Core Imports
import React from 'react';

// Package Imports

// Custom Imports
import InPageFooter from '@/components/InPageFooter';
import ZaionsIonPage from '@/components/ZaionsIonPage';
import ZaionsHPBanner from '@/components/ZaionsHomePage/HPBanner';
import ZaionsHPConnectPlatform from '@/components/ZaionsHomePage/HPConnetPlateform';
import ZaionsHPGlobal from '@/components/ZaionsHomePage/HPGlobal';
import ZaionsHPBrandList from '@/components/ZaionsHomePage/HPBrandList';
import ZaionsHPFAQuestions from '@/components/ZaionsHomePage/HPQuestions';
import ZaionsHPUsersFeedBack from '@/components/ZaionsHomePage/HPFeedback';
import ZaionsTopMenu from '@/navigation/TopMenu';
import { ZIonContent } from '@/components/ZIonComponents';

// Styles
import './styles.css';

const Home: React.FC = () => {
	return (
		<ZaionsIonPage pageTitle='Home Page'>
			<ZIonContent fullscreen>
				<ZaionsTopMenu />
				<ZaionsHPBanner />
				{/* <ZaionsHPShortLink /> */}
				<ZaionsHPConnectPlatform />
				<ZaionsHPGlobal />
				{/* <ZaionsHPUsersFeedBack /> */}
				<ZaionsHPBrandList />
				<ZaionsHPFAQuestions />
				{/* Page Footer */}
				<InPageFooter
					title='More than a free link shortener'
					btnText='Get Started'
				/>
			</ZIonContent>
		</ZaionsIonPage>
	);
};

export default Home;
