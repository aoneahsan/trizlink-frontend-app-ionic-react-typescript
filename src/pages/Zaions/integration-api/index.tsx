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

import {
	ZIonText,
	ZIonRouterLink,
	ZIonContent,
} from '@/components/ZIonComponents';

// Global Constants
import { BRACKPOINT_MD, PRODUCT_NAME } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Styles
import classes from './styles.module.css';

// Images
import {
	digitalMarketingApipage02,
	enterprise02,
	integrationsCloudMobile3,
	linkshorteningApipage02,
	Mobile2,
} from '@/assets/images';

const ZaionsIntegrationApi: React.FC = () => {
	const isMdScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_MD})`,
	});
	return (
		<ZIonPage pageTitle='Integration Api Page'>
			{/* Page Content */}
			<ZIonContent fullscreen>
				<ZaionsTopMenu />
				<ZaionsInpageHeader
					lgImg={integrationsCloudMobile3}
					label='Integrations & API'
					title={
						<ZIonText
							className='block'
							style={{ lineHeight: !isMdScale ? '3rem' : '' }}
						>
							Integrate Your Workflow
						</ZIonText>
					}
					subTitle={
						<ZIonText className='block'>
							Connect {PRODUCT_NAME} to the tools you use every day.
						</ZIonText>
					}
					primaryBtnText='Get Started'
					isSecondaryBtn={true}
					primaryBtnLinkTo={ZaionsRoutes.WhyZaions.ZaionsPricingRoute}
					seondaryBtnLinkTo={ZaionsRoutes.DiscoverEnterpriseRoute}
					secondaryBtnText='Get a Quote'
					className={`${classes.zaions__integration_api_bg} ${classes.zaions__pb}`}
				/>

				<ZaionsTwoByTwoLeftCols
					title={`Boost your productivity`}
					text={`With ${PRODUCT_NAME}, there’s no need to interrupt your workflow
          or add new technologies to the mix. Join tens of thousands of
          people who leverage the platform to integrate into the apps they
          already use – and seamlessly manage your campaigns, social
          media, and customer experience.`}
					Btn={false}
					colLeftImage={digitalMarketingApipage02}
					bottomHr={true}
				/>

				<ZaionsTwoByTwoRightCols
					title={`Shorten more links with less hassle`}
					text={`Securely shorten and manage millions of links at scale for
          maximum efficiency. Whether you want to generate links for your
          website, print, or different user accounts, you can do it with
          ${PRODUCT_NAME}`}
					Btn={false}
					colRightImage={linkshorteningApipage02}
					bottomHr={true}
				/>

				<ZaionsTwoByTwoLeftCols
					title={
						<ZIonText className='mt-5 block pt-5'>
							Stay safe and secure
						</ZIonText>
					}
					text={
						<ZIonText className='block'>
							${PRODUCT_NAME}’s enterprise-grade security lets you{' '}
							<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
								integrate with other technologies
							</ZIonRouterLink>{' '}
							with peace of mind. We follow best practices in security solutions
							to safeguard all of your personal data.
						</ZIonText>
					}
					Btn={false}
					colLeftImage={enterprise02}
					bottomHr={true}
					ImgWidth='80%'
				/>

				<ZaionsTwoByTwoRightCols
					title={`Deliver SMS short links at scale`}
					text={
						<p>
							Optimize all your large-scale SMS initiatives with the industry’s
							most trusted link shortener. {PRODUCT_NAME}’s
							<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
								{' '}
								powerful API{' '}
							</ZIonRouterLink>
							integrates with the world’s leading SMS communications platforms
							so you can deliver branded, targeted text messages at virtually
							any volume.
						</p>
					}
					Btn={false}
					colRightImage={Mobile2}
					bottomHr={true}
				/>

				<ZaionsInpageBrandsList
					title={`The most recognized brands in the world love ${PRODUCT_NAME}`}
					className='pb-3'
				/>
				<div className='pb-5 mb-1'></div>
				{/* Page Footer */}
				<InPageFooter
					title='Integrate with the tools you use'
					btnText='View Integrate'
				/>
			</ZIonContent>
		</ZIonPage>
	);
};

export default ZaionsIntegrationApi;
