// Core Imports
import React from 'react';

// Packages Imports
import { useMediaQuery } from 'react-responsive';

import classNames from 'classnames';

// Custom Imports
import ZaionsIonPage from '@/components/ZaionsIonPage';
import ZaionsTwoByTwoRightCols from '@/components/InPageComponents/Zaions2By2RightCols';
import ZaionsTwoByTwoLeftCols from '@/components/InPageComponents/Zaions2By2LeftCols';
import ZaionsTopMenu from '@/navigation/TopMenu';
import InPageFooter from '@/components/InPageFooter';
import ZaionsHPBrandList from '@/components/ZaionsHomePage/HPBrandList';
import ZaionsInpageHeader from '@/components/InPageComponents/ZaionsInpageHeader';
import { ZIonText, ZIonContent } from '@/components/ZIonComponents';

// Global Constants
import { BRACKPOINT_MD, BRACKPOINT_XL, PRODUCT_NAME } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Images
import {
	CampaignAndAnalytics,
	DashMin,
	OneViewProductMarketingImg,
	organicShares,
} from '@/assets/images';

// Styles
import classes from './styles.module.css';

const ZaionsCampaignManagementAnalytics: React.FC = () => {
	const isXlScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_XL})`,
	});
	const isMdScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_MD})`,
	});

	return (
		<ZaionsIonPage pageTitle='Campaign Management Analytics'>
			{/* Page Content */}
			<ZIonContent>
				<ZaionsTopMenu />
				<ZaionsInpageHeader
					lgImg={CampaignAndAnalytics}
					label='Campaign Management & Analytics'
					title={
						<ZIonText style={{ lineHeight: !isMdScale ? '3rem' : '' }}>
							Short links solve big problems
						</ZIonText>
					}
					subTitle={
						<ZIonText>
							Track and optimize every digital initiative using {PRODUCT_NAME}’s
							best-in-class analytics tools.
						</ZIonText>
					}
					primaryBtnLinkTo={ZaionsRoutes.WhyZaions.ZaionsPricingRoute}
					seondaryBtnLinkTo={ZaionsRoutes.DiscoverEnterpriseRoute}
					primaryBtnText='Get Started'
					isSecondaryBtn={true}
					secondaryBtnText='Get a Quote'
					className={classNames({
						'mb-0': true,
						[classes.zaions__branded_links_bg]: isXlScale,
						[classes.zaions__pb]: isXlScale,
					})}
					bottomHr={false}
					colClassName='ms-2'
				/>
				<hr className={classes.zaions__CampaignManagementAnalytics__headerHr} />

				<ZaionsTwoByTwoLeftCols
					title={
						<ZIonText className='mb-5 ms-5 font-extrabold'>
							Be done with spreadsheets <br />
						</ZIonText>
					}
					text={
						<ZIonText className='ms-5'>
							Stop hopping from one spreadsheet to the next to track the
							performance of your campaigns. With {PRODUCT_NAME}, you can easily
							track your customers’ journeys on every link and channel from a
							single, sleek dashboard.
						</ZIonText>
					}
					Btn={false}
					colLeftImage={DashMin}
					bottomHr={true}
				/>

				<ZaionsTwoByTwoRightCols
					title={
						<ZIonText className='mb-5 ms-4 font-extrabold'>
							Make Data-Driven Decisions
						</ZIonText>
					}
					text={
						<ZIonText className='ms-4'>
							Empower yourself with real-time data – all the way down to the
							local city level – on every click, tap, and swipe so you’re armed
							with the information you need to share more of the content your
							audience is most excited about.
						</ZIonText>
					}
					Btn={false}
					colRightImage={OneViewProductMarketingImg}
					bottomHr={true}
					ImgWidth='90%'
				/>

				<ZaionsTwoByTwoLeftCols
					title={
						<ZIonText className='mb-5 ms-5 font-extrabold'>
							Track organic shares <br />
						</ZIonText>
					}
					text={
						<ZIonText className='ms-5'>
							With {PRODUCT_NAME}, you can track engagement metrics on your
							content’s organic shares (links other {PRODUCT_NAME} users create
							that point to your content). This gives you a clearer picture of
							how well your content is performing, even if you’re not the one
							sharing it.
						</ZIonText>
					}
					Btn={false}
					colLeftImage={organicShares}
					bottomHr={true}
				/>

				<ZaionsHPBrandList />

				<InPageFooter btnText='Start for free' />
			</ZIonContent>
		</ZaionsIonPage>
	);
};

export default ZaionsCampaignManagementAnalytics;
