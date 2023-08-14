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
import {
	BRACKPOINT_MD,
	BRACKPOINT_XL,
	PRODUCT_DOMAIN,
	PRODUCT_NAME,
} from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Styles
import classes from './styles.module.css';

// Images
import {
	autoBrandMin,
	brandedLinksmobile,
	customizationMin1,
	domainSearch,
	smsMin,
	yourBrndBranding,
} from '@/assets/images';

const ZaionsBrandedLinks: React.FC = () => {
	const isXlScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_XL})`,
	});
	const isMdScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_MD})`,
	});

	return (
		<ZIonPage pageTitle='Branded Link Page'>
			{/* Page Content */}
			<ZIonContent>
				<ZaionsTopMenu />
				<ZaionsInpageHeader
					lgImg={brandedLinksmobile}
					label='Branded Links'
					title={
						<ZIonText style={{ lineHeight: !isMdScale ? '3rem' : '' }}>
							Replace “{PRODUCT_DOMAIN}” with <br /> your brand
						</ZIonText>
					}
					subTitle={
						<ZIonText>
							Search for, select and set up the perfect custom domain for your{' '}
							<br />
							brand—all within {PRODUCT_NAME}—in minutes.
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
				/>
				<hr className={classes.zaions__brandLinks__headerHr} />

				<ZaionsTwoByTwoLeftCols
					title={
						<ZIonText className='mb-5' style={{ fontWeight: '800' }}>
							Get more clicks <br />
						</ZIonText>
					}
					text={`Custom domains replace the “${PRODUCT_DOMAIN}” in your links with the name of your choosing so you can take total control of your content. By using your brand in your links, your audience will know they can trust them.`}
					Btn={false}
					colLeftImage={yourBrndBranding}
					bottomHr={true}
				/>

				<ZaionsTwoByTwoRightCols
					title={
						<ZIonText className='mb-5 ms-4 font-extrabold'>
							Put the perfect custom <br /> domain to work in minutes, <br />{' '}
							for free <br />
						</ZIonText>
					}
					text={
						<ZIonText className='ms-4'>
							{PRODUCT_NAME} combines custom domain setup and complete link
							management into a single brand-building platform. Start taking
							advantage of the power of branded links on day one.
						</ZIonText>
					}
					Btn={false}
					colRightImage={domainSearch}
					bottomHr={true}
					ImgWidth='100%'
				/>

				<ZaionsTwoByTwoLeftCols
					title={
						<ZIonText className='mb-5 font-extrabold'>
							Turn your links into brand assets <br />
						</ZIonText>
					}
					text={`With trust comes action. Businesses that share custom links see a boost in click-throughs. It’s simple: If your audience trusts your links and knows where they lead, they’re more likely to click on them.`}
					Btn={false}
					colLeftImage={smsMin}
					bottomHr={true}
				/>

				<ZaionsTwoByTwoRightCols
					title={
						<ZIonText className='mb-5 ms-4' style={{ fontWeight: '800' }}>
							Create recognizable links
						</ZIonText>
					}
					text={
						<ZIonText className='ms-4'>
							Take custom links a step further with custom back-halves. When you
							edit the back-half of a link you give people a preview of where
							you’re sending them, building trust and boosting click-throughs.
						</ZIonText>
					}
					Btn={false}
					colRightImage={customizationMin1}
					bottomHr={true}
					ImgWidth='100%'
				/>

				<ZaionsTwoByTwoLeftCols
					title={
						<ZIonText className='mb-5 font-extrabold'>
							Automatically brand your <br /> links—no matter who shares <br />{' '}
							them <br />
						</ZIonText>
					}
					text={`When you use auto-branding, any link shortened by a third party using ${PRODUCT_NAME} will automatically use the custom domain for that business, increasing awareness for your brand and giving you additional insight into how your content is being consumed.`}
					Btn={false}
					colLeftImage={autoBrandMin}
					bottomHr={true}
				/>

				<ZaionsHPBrandList />

				<InPageFooter btnText='Start for free' />
			</ZIonContent>
		</ZIonPage>
	);
};

export default ZaionsBrandedLinks;
