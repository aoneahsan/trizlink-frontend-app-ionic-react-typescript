// Core Imports
import React from 'react';

// Packages Imports
import { useMediaQuery } from 'react-responsive';

import classNames from 'classnames';

// Custom Imports
import ZIonPage from '@/components/ZIonPage';
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

// Styles
import classes from './styles.module.css';

// Image
import {
	DashMin,
	deepLink,
	IntegrationsCloudMobile,
	Mobile2,
	SiteQRCodesSubSection,
	smsMin,
} from '@/assets/images';

const ZaionsMobileLinks: React.FC = () => {
	const isXlScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_XL})`,
	});
	const isMdScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_MD})`,
	});

	return (
		<ZIonPage pageTitle='Mobile Link Page'>
			{/* Page Content */}
			<ZIonContent>
				<ZaionsTopMenu />
				<ZaionsInpageHeader
					lgImg={Mobile2}
					label='Mobile Links'
					title={
						<ZIonText style={{ lineHeight: !isMdScale ? '3rem' : '' }}>
							Custom SMS Short Links
						</ZIonText>
					}
					subTitle={
						<ZIonText>
							Directly route users to the right destination from your mobile{' '}
							<br />
							communications.
						</ZIonText>
					}
					primaryBtnLinkTo={ZaionsRoutes.WhyZaions.ZaionsPricingRoute}
					seondaryBtnLinkTo={ZaionsRoutes.DiscoverEnterpriseRoute}
					primaryBtnText='Get Started'
					isSecondaryBtn={true}
					secondaryBtnText='Get a Quote'
					className={classNames({
						'mb-0': true,
						[classes.zaions__mobile_link_bg]: isXlScale,
						[classes.zaions__pb]: isXlScale,
					})}
					bottomHr={true}
					colClassName='ms-2'
				/>

				<ZaionsTwoByTwoRightCols
					title={
						<ZIonText className='mb-5 ms-4 font-extrabold'>
							SMS Messaging
						</ZIonText>
					}
					text={
						<ZIonText className='ms-4'>
							Tap into the powerful {PRODUCT_NAME} API to create thousands of
							unique SMS communications for customer support updates, order
							statuses, service delays or changes, appointment reminders,
							fundraising, and location-based promotions using short branded
							links. And, since they’re short links, save on SMS per-character
							fees.
						</ZIonText>
					}
					Btn={false}
					colRightImage={smsMin}
					bottomHr={true}
					ImgWidth='90%'
				/>

				<ZaionsTwoByTwoLeftCols
					title={
						<ZIonText className='mb-5 ms-5 font-extrabold'>
							Deep Links <br />
						</ZIonText>
					}
					text={
						<ZIonText className='ms-5'>
							Use {PRODUCT_NAME}’s mobile deep links to directly route users to
							the right place within your app or send them to the app store to
							download it. Deep links create a seamless transition to mobile,
							drive app engagement, and encourage app installs.
						</ZIonText>
					}
					Btn={false}
					colLeftImage={deepLink}
					bottomHr={true}
				/>

				<ZaionsTwoByTwoRightCols
					title={
						<ZIonText className='mb-5 ms-4 font-extrabold'>QR Codes</ZIonText>
					}
					text={
						<ZIonText className='ms-4'>
							Instantly generate a QR code for any of your {PRODUCT_NAME} links.
							Our QR Codes have all of the powerful tracking and features of our
							links and can be placed virtually anywhere—print media,
							billboards, storefronts, stickers, t-shirts, you name it—to
							connect your users back to your online experience.
						</ZIonText>
					}
					Btn={false}
					colRightImage={SiteQRCodesSubSection}
					bottomHr={true}
					ImgWidth='100%'
				/>

				<ZaionsTwoByTwoLeftCols
					title={
						<ZIonText className='mb-5 ms-5 font-extrabold'>
							Campaign Management & Analytics <br />
						</ZIonText>
					}
					text={
						<ZIonText className='ms-5'>
							A real-time, interactive dashboard gives you a full view of
							metrics like app opens and store visits across every device and
							channel—whether that’s Twitter, Facebook, email, or SMS. With{' '}
							{PRODUCT_NAME}, you can clearly see what’s working, as well as
							where and how your customers are engaging.
						</ZIonText>
					}
					Btn={false}
					colLeftImage={DashMin}
					bottomHr={true}
				/>

				<ZaionsTwoByTwoRightCols
					title={
						<ZIonText className='mb-5 ms-4' style={{ fontWeight: '800' }}>
							Integrations
						</ZIonText>
					}
					text={
						<ZIonText className='ms-4'>
							{PRODUCT_NAME} integrates into your workflow and existing tech
							stack so you don’t need to change the way you do things. Create
							mobile deep links right from the tools you’re already using, like
							Hootsuite, Sprinklr, Spredfast, Salesforce Marketing Cloud, and
							hundreds more.
						</ZIonText>
					}
					Btn={false}
					colRightImage={IntegrationsCloudMobile}
					bottomHr={true}
					ImgWidth='100%'
				/>

				<ZaionsHPBrandList />

				<InPageFooter btnText='Start for free' />
			</ZIonContent>
		</ZIonPage>
	);
};

export default ZaionsMobileLinks;
