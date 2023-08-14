// Core Import
import React from 'react';

// Package Imports
import { useMediaQuery } from 'react-responsive';

// Custom Imports
import ZIonPage from '@/components/ZIonPage';
import ZaionsInpageBrandsList from '@/components/InPageComponents/ZaionsBrandsList';
import ZaionsTopMenu from '@/navigation/TopMenu';
import ZaionsInpageHeader from '@/components/InPageComponents/ZaionsInpageHeader';
import ZaionsInpageCol from '@/components/InPageComponents/ZaionsInpageGridsys';
import InPageFooter from '@/components/InPageFooter';
import ZaionsHr from '@/components/InPageComponents/Zaions_hr';

import {
	ZIonCol,
	ZIonText,
	ZIonRow,
	ZIonGrid,
	ZIonContent,
} from '@/components/ZIonComponents';

// Global Constants
import { BRACKPOINT_LG, BRACKPOINT_MD, PRODUCT_NAME } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Styles
import classes from './styles.module.css';

// Images
import {
	enterprise02,
	iconLargeChartReviewMin,
	iconLargeClockSecurityMin,
	iconLargeCloudServersMin,
	iconLargeDatabaseMin,
	iconLargeLaptopUserMin,
	integrations,
} from '@/assets/images';
import classNames from 'classnames';

const ZaionsEnterpriseClass: React.FC = () => {
	const isLgScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_LG})`,
	});
	const isMdScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_MD})`,
	});
	return (
		<ZIonPage pageTitle='Enterprise Class Page'>
			{/* Page Content */}
			<ZIonContent fullscreen>
				<ZaionsTopMenu />
				<ZaionsInpageHeader
					lgImg={enterprise02}
					label='Enterprise Class'
					title={
						<ZIonText
							className='block'
							style={{ lineHeight: !isMdScale ? '3rem' : '' }}
						>
							The trusted, unrivaled <br /> enterprise-grade solution
						</ZIonText>
					}
					subTitle='One link management platform for all your needs.'
					primaryBtnLinkTo={ZaionsRoutes.DiscoverEnterpriseRoute}
					primaryBtnText='Get a Quote'
					isSecondaryBtn={true}
					secondaryBtnText='Watch Enterprise Demo'
					extraData={
						<ZIonText
							className={`zaions__getAQuote_btn mt-3`}
							style={{ fontSize: '15px', letterSpacing: '0px' }}
						>
							<ZIonText className='font-bold'>Talk to Sales:</ZIonText> +1 (718)
							838-9412
						</ZIonText>
					}
					className={classNames({
						[classes.zaions__enterpise_bg]: isMdScale,
					})}
				/>

				<ZIonGrid
					className={`mt-4 pb-3 ${!isLgScale ? 'ion-text-center' : ''}`}
				>
					<ZIonRow>
						<ZIonCol
							sizeXl='1'
							sizeLg='.7'
							sizeMd='0'
							sizeSm='0'
							sizeXs='0'
						></ZIonCol>
						<ZIonCol sizeXl='11' sizeLg='11' sizeMd='12'>
							<ZIonGrid>
								<ZIonRow>
									<ZaionsInpageCol
										icon={integrations}
										title='Integrate with anything'
										text={`Confidently build ${PRODUCT_NAME}-powered links into even the most complex workflows and custom solutions. Join the over 300,000 active API users and two-thirds of the Fortune 500 that trust ${PRODUCT_NAME} to support their service-critical programs.`}
									/>

									<ZaionsInpageCol
										icon={iconLargeCloudServersMin}
										title='Over 120 billion clicks per year'
										text={`${PRODUCT_NAME} knows what it takes to scale better than anyone. With an ultra-modern infrastructure capable of handling more than 10 billion clicks every month, ${PRODUCT_NAME} is simply in a class by itself.`}
									/>

									<ZaionsInpageCol
										icon={iconLargeChartReviewMin}
										title='Near-limitless speed'
										text={`The ${PRODUCT_NAME} API can generate and track thousands of unique links per minute—millions a day. Be it a massive SMS initiative, or other major program, ${PRODUCT_NAME} has the proven capacity to handle it.`}
									/>

									<ZaionsInpageCol
										icon={iconLargeDatabaseMin}
										title='Unmatched record of reliability'
										text={`While other link shorteners have come and gone, ${PRODUCT_NAME} has amassed a 12-year, 99.9% uptime record. Deep experience matters when downtime is not an option, and ${PRODUCT_NAME} provides peace of mind.
                    `}
										className='mt-5 pt-4'
									/>

									<ZaionsInpageCol
										icon={iconLargeClockSecurityMin}
										title='Setting the standard for security'
										text={`We set the bar more than a decade ago when it comes to link management security. Today, our 24 hour on-call teams continue to monitor the availability and performance of your links all day, every day. And of course our platform is fully GDPR compliant and CCPA ready.`}
										className='mt-5 pt-4'
									/>

									<ZaionsInpageCol
										icon={iconLargeLaptopUserMin}
										title='Up, running, and under your control'
										text={`Your personal success manager—included with Enterprise and Developer plans—ensures your team is ready from day one. Plus, ${PRODUCT_NAME}’s enterprise-grade admin features let you centrally set up and manage access, as well as segment activity and analytics by department, location, channel, brand or user.`}
										className='mt-5 pt-4'
									/>
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
							sizeXl='11.2'
							sizeLg='12'
							sizeMd='12'
							sizeSm='12'
							sizeXs='12'
						>
							<ZaionsHr></ZaionsHr>
						</ZIonCol>
						<ZIonCol></ZIonCol>
					</ZIonRow>
				</ZIonGrid>

				<ZaionsInpageBrandsList
					title={`The most recognized brands in the world love ${PRODUCT_NAME}`}
					className='pb-3'
				/>
				<div className='pb-5 mb-1'></div>

				{/* Page Footer */}
				<InPageFooter btnText='' />
			</ZIonContent>
		</ZIonPage>
	);
};

export default ZaionsEnterpriseClass;
