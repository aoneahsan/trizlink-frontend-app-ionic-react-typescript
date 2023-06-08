// Core Imports
import React from 'react';

// Packages Imports
import {
	analyticsOutline,
	appsOutline,
	bookOutline,
	briefcaseOutline,
	browsersOutline,
	bulbOutline,
	callOutline,
	checkmarkCircleOutline,
	codeOutline,
	codeSlashOutline,
	codeWorkingOutline,
	earthOutline,
	eyeOutline,
	heartCircleOutline,
	homeOutline,
	informationCircleOutline,
	libraryOutline,
	link,
	lockClosedOutline,
	logoFacebook,
	logoInstagram,
	logoLinkedin,
	logoTwitter,
	newspaperOutline,
	peopleCircleOutline,
	peopleOutline,
	personAddOutline,
	phonePortraitOutline,
	pieChartOutline,
	pricetags,
	qrCode,
	tabletPortrait,
	unlinkOutline,
	videocamOutline,
} from 'ionicons/icons';
import { useMediaQuery } from 'react-responsive';

// Custom Imports
import {
	ZIonCol,
	ZIonRow,
	ZIonText,
	ZIonRouterLink,
	ZIonIcon,
	ZIonFooter,
	ZIonGrid,
	ZIonAccordionGroup,
	ZIonAccordion,
	ZIonItem,
	ZIonLabel,
} from '@/components/ZIonComponents';

// Global Constants
import { BRACKPOINT_MD, BRACKPOINT_XS, PRODUCT_NAME } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { ProductLogo } from '@/assets/images';
import { ZIonButton } from '@/components/ZIonComponents';
import classNames from 'classnames';

// Functional Component
const InPageFooter: React.FC<{
	title?: string;
	btnText?: string;
	blueSec?: boolean;
}> = ({ title, btnText, blueSec = true }) => {
	const isXmScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_XS})`,
	});
	const isMdScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_MD})`,
	});
	return (
		<>
			<ZIonFooter collapse='fade'>
				<>
					{blueSec === true ? (
						<div className='py-3' style={{ background: '#0b1736' }}>
							<div className='flex flex-col py-5 ion-text-center ion-margin-top ion-padding-bottom ion-justify-content-center ion-align-items-center'>
								<br />
								<ZIonText color='light' className='text-2xl'>
									{title === '' || title === null || title === undefined
										? 'Get closer to your audience and customers today'
										: title}
								</ZIonText>

								{/*  */}
								<ZIonButton
									size='large'
									className='ion-margin-vertical ion-text-capitalize'
									expand={!isMdScale ? 'block' : undefined}
									routerLink={ZaionsRoutes.HomeRoute}
								>
									{btnText === '' || btnText === null || btnText === undefined
										? 'Start for Free'
										: btnText}
								</ZIonButton>
							</div>
						</div>
					) : (
						''
					)}
				</>
				{isMdScale ? (
					<div className='ion-padding-vertical'>
						<ZIonGrid className='ion-padding-top ion-margin-top '>
							<ZIonRow>
								<ZIonCol
									sizeXl=''
									sizeLg='0'
									sizeMd='0'
									sizeSm='0'
									sizeXs='0'
								></ZIonCol>
								<ZIonCol
									sizeXl='2'
									sizeLg='2.8'
									sizeMd='2.9'
									sizeSm='3'
									sizeXs='12'
									className={`mb-2 ${isXmScale ? 'mb-4' : ''}`}
								>
									<b className='mb-4'>Why {PRODUCT_NAME}?</b> <br />
									<ZIonRouterLink routerLink='' color='dark'>
										<ZIonText>{PRODUCT_NAME} 101</ZIonText>
									</ZIonRouterLink>
									<br />
									<ZIonRouterLink routerLink='' color='dark'>
										<ZIonText>Integrations & API</ZIonText>
									</ZIonRouterLink>
									<br />
									<ZIonRouterLink routerLink='' color='dark'>
										<ZIonText>Enterprise Class</ZIonText>
									</ZIonRouterLink>
									<br />
									<ZIonRouterLink routerLink='' color='dark'>
										<ZIonText>Pricing</ZIonText>
									</ZIonRouterLink>
									<br /> <br />
									{/* PRODUCTS */}
									<b className='mb-4'>Products</b> <br />
									<ZIonRouterLink routerLink='' color='dark'>
										<ZIonText>Link Management</ZIonText>
									</ZIonRouterLink>
									<br />
									<ZIonRouterLink routerLink='' color='dark'>
										<ZIonText>QR Codes</ZIonText>
									</ZIonRouterLink>
									<br />
									<ZIonRouterLink routerLink='' color='dark'>
										<ZIonText>Link-in-bio</ZIonText>
									</ZIonRouterLink>
									<br />
									{isXmScale ? <hr /> : ''}
								</ZIonCol>
								<ZIonCol
									sizeXl='2'
									sizeLg='2.8'
									sizeMd='2.9'
									sizeSm='3'
									sizeXs='12'
									// className={`mb-2 ${isXmScale ? 'mb-3' : ''}`}
									className={classNames({
										'mb-2': !isXmScale,
										'mb-3': isXmScale,
									})}
								>
									<b className='mb-4'>Solutions</b> <br />
									<ZIonRouterLink routerLink='' color='dark'>
										<ZIonText>Social Media</ZIonText>
									</ZIonRouterLink>
									<br />
									<ZIonRouterLink routerLink='' color='dark'>
										<ZIonText>Digital Marketing</ZIonText>
									</ZIonRouterLink>
									<br />
									<ZIonRouterLink routerLink='' color='dark'>
										<ZIonText>Customer Service</ZIonText>
									</ZIonRouterLink>
									<br />
									<ZIonRouterLink routerLink='' color='dark'>
										<ZIonText>For Developers</ZIonText>
									</ZIonRouterLink>
									<br /> <br />
									<b className='mb-4'>Features</b> <br />
									<ZIonRouterLink routerLink='' color='dark'>
										<ZIonText>Branded Links</ZIonText>
									</ZIonRouterLink>
									<br />
									<ZIonRouterLink routerLink='' color='dark'>
										<ZIonText>Mobile Links</ZIonText>
									</ZIonRouterLink>
									<br />
									<ZIonRouterLink routerLink='' color='dark'>
										<ZIonText>
											Campaign <br /> Management & <br /> Analytics
										</ZIonText>
									</ZIonRouterLink>
									<br />
									{isXmScale ? <hr /> : ''}
								</ZIonCol>
								<ZIonCol
									sizeXl='2'
									sizeLg='2.8'
									sizeMd='2.9'
									sizeSm='3'
									sizeXs='12'
									className={`mb-2 ${isXmScale ? 'mb-3' : ''}`}
								>
									<b className='mb-4'>Resources</b> <br />
									<ZIonRouterLink routerLink='' color='dark'>
										<ZIonText>Blog</ZIonText>
									</ZIonRouterLink>
									<br />
									<ZIonRouterLink routerLink='' color='dark'>
										<ZIonText>Resource Library</ZIonText>
									</ZIonRouterLink>
									<br />
									<ZIonRouterLink
										routerLink={ZaionsRoutes.HomeRoute}
										color='dark'
									>
										<ZIonText>Developers</ZIonText>
									</ZIonRouterLink>
									<br />
									<ZIonRouterLink
										routerLink={ZaionsRoutes.HomeRoute}
										color='dark'
									>
										<ZIonText>Support</ZIonText>
									</ZIonRouterLink>
									<br />
									<ZIonRouterLink routerLink='' color='dark'>
										<ZIonText>Trust Center</ZIonText>
									</ZIonRouterLink>
									<br />
									<ZIonRouterLink routerLink='' color='dark'>
										<ZIonText>Browser Extension</ZIonText>
									</ZIonRouterLink>
									<br />
									<ZIonRouterLink routerLink='' color='dark'>
										<ZIonText>Mobile App</ZIonText>
									</ZIonRouterLink>
									<br /> <br />
									<b className='mb-4'>Legal</b> <br />
									<ZIonRouterLink routerLink='' color='dark'>
										<ZIonText>Privacy Policy</ZIonText>
									</ZIonRouterLink>
									<br />
									<ZIonRouterLink routerLink='' color='dark'>
										<ZIonText>Terms of Service</ZIonText>
									</ZIonRouterLink>
									<br />
									<ZIonRouterLink routerLink='' color='dark'>
										<ZIonText>Acceptable Use Policy</ZIonText>
									</ZIonRouterLink>
									<br />
									<ZIonRouterLink routerLink='' color='dark'>
										<ZIonText>Code of Conduct</ZIonText>
									</ZIonRouterLink>
									<br />
								</ZIonCol>
								<ZIonCol
									sizeXl='2'
									sizeLg='2.8'
									sizeMd='2.9'
									sizeSm='3'
									sizeXs='12'
									className={`mb-2 ${isXmScale ? 'mb-3' : ''}`}
								>
									<b className='mb-4'>Company</b> <br />
									<ZIonRouterLink
										routerLink={ZaionsRoutes.Company.ZaionsAboutRoute}
										color='dark'
									>
										<ZIonText>About {PRODUCT_NAME}</ZIonText>
									</ZIonRouterLink>
									<br />
									<ZIonRouterLink
										routerLink={ZaionsRoutes.Company.ZaionsCareersRoute}
										color='dark'
									>
										<ZIonText>Careers</ZIonText>
									</ZIonRouterLink>
									<br />
									<ZIonRouterLink
										routerLink={ZaionsRoutes.Company.ZaionsPartnersRoute}
										color='dark'
									>
										<ZIonText>Partners</ZIonText>
									</ZIonRouterLink>
									<br />
									<ZIonRouterLink
										routerLink={ZaionsRoutes.Company.ZaionsPressRoute}
										color='dark'
									>
										<ZIonText>Press</ZIonText>
									</ZIonRouterLink>
									<br />
									<ZIonRouterLink
										routerLink={ZaionsRoutes.Company.ZaionsContactRoute}
										color='dark'
									>
										<ZIonText>Contact</ZIonText>
									</ZIonRouterLink>
									<br />
									<ZIonRouterLink
										routerLink={ZaionsRoutes.Company.ZaionsReviewsRoute}
										color='dark'
									>
										<ZIonText>Reviews</ZIonText>
									</ZIonRouterLink>
									<br />
								</ZIonCol>
								<ZIonCol
									sizeXl='2'
									sizeLg='2.8'
									sizeMd='2.9'
									sizeSm='3'
									sizeXs='12'
									className={`mb-2 ${isXmScale ? 'mb-3' : ''}`}
								>
									<img src={ProductLogo} className='logo' alt='' />
									<br />
									<small>
										© 2022 {PRODUCT_NAME} | Handmade in San Francisco, Denver,
										New York City, Bielefeld, and all over the world.
									</small>
									<br /> <br />
									<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
										<ZIonIcon
											size='large'
											className='ion-padding-end'
											icon={logoTwitter}
											style={{ color: '#56575b' }}
										></ZIonIcon>
									</ZIonRouterLink>
									<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
										<ZIonIcon
											size='large'
											className='ion-padding-end zaions__color_gray2'
											icon={logoInstagram}
										></ZIonIcon>
									</ZIonRouterLink>
									<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
										<ZIonIcon
											size='large'
											className='ion-padding-end zaions__color_gray2'
											icon={logoLinkedin}
										></ZIonIcon>
									</ZIonRouterLink>
									<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
										<ZIonIcon
											size='large'
											icon={logoFacebook}
											className='zaions__color_gray2'
										></ZIonIcon>
									</ZIonRouterLink>
								</ZIonCol>
								<ZIonCol
									sizeXl=''
									sizeLg='0'
									sizeMd='0'
									sizeSm='0'
									sizeXs='0'
								></ZIonCol>
							</ZIonRow>
						</ZIonGrid>
					</div>
				) : (
					<ZIonAccordionGroup>
						{/* Why ZLink */}
						<ZIonAccordion value='WhyZaions'>
							<ZIonItem slot='header' color='light'>
								<ZIonLabel className='font-bold'>Why {PRODUCT_NAME}?</ZIonLabel>
							</ZIonItem>

							<div className='ion-padding' slot='content'>
								{/* 101 */}
								<ZIonRouterLink routerLink='' color='dark'>
									<ZIonRow className='pb-2 ion-align-items-start border-bottom'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon icon={bookOutline} className='text-3xl' />
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												{PRODUCT_NAME} 101
											</ZIonText>
											<ZIonText className='block text-lg'>
												an introduction to {PRODUCT_NAME}’s features
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>

								{/* Integrations & API */}
								<ZIonRouterLink routerLink='' color='dark'>
									<ZIonRow className='py-2 ion-align-items-start border-bottom'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon icon={earthOutline} className='text-3xl' />
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Integrations & API
											</ZIonText>
											<ZIonText className='block text-lg'>
												{PRODUCT_NAME} scale of the size you need
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>

								{/* Enterprise Class */}
								<ZIonRouterLink routerLink='' color='dark'>
									<ZIonRow className='py-2 ion-align-items-start border-bottom'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon icon={codeOutline} className='text-3xl' />
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Enterprise Class
											</ZIonText>
											<ZIonText className='block text-lg'>
												connest {PRODUCT_NAME} with the tool you love
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>

								{/* Pricing */}
								<ZIonRouterLink routerLink='' color='dark'>
									<ZIonRow className='py-2 ion-align-items-start'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon icon={pricetags} className='text-3xl' />
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Pricing
											</ZIonText>
											<ZIonText className='block text-lg'></ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>
							</div>
						</ZIonAccordion>

						{/* Products */}
						<ZIonAccordion value='Products'>
							<ZIonItem slot='header' color='light'>
								<ZIonLabel className='font-bold'>Product</ZIonLabel>
							</ZIonItem>
							<div className='ion-padding' slot='content'>
								{/* Link Management */}
								<ZIonRouterLink routerLink='' color='dark'>
									<ZIonRow className='py-2 ion-align-items-start border-bottom'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon icon={link} className='text-3xl' />
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Link Management
											</ZIonText>
											<ZIonText className='block text-base'>
												Customize, share, and track links
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>

								{/* QR Codes */}
								<ZIonRouterLink routerLink='' color='dark'>
									<ZIonRow className='py-2 ion-align-items-start border-bottom'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon icon={qrCode} className='text-3xl' />
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												QR Codes
											</ZIonText>
											<ZIonText className='block text-base'>
												Dynamic solutions to fit every business need
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>

								{/* Link-in-bio */}
								<ZIonRouterLink routerLink='' color='dark'>
									<ZIonRow className='py-2 ion-align-items-start'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon icon={tabletPortrait} className='text-3xl' />
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Link-in-bio
											</ZIonText>
											<ZIonText className='block text-base'>
												Curate and track links for social media profiles
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>
							</div>
						</ZIonAccordion>

						{/* Solution */}
						<ZIonAccordion value='Solutions'>
							<ZIonItem slot='header' color='light'>
								<ZIonLabel className='font-bold'>Solution</ZIonLabel>
							</ZIonItem>
							<div className='ion-padding' slot='content'>
								{/* Social Media */}
								<ZIonRouterLink routerLink='' color='dark'>
									<ZIonRow className='py-2 ion-align-items-start border-bottom'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon icon={bulbOutline} className='text-3xl' />
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Social Media
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>

								{/* Digital Marketing */}
								<ZIonRouterLink routerLink='' color='dark'>
									<ZIonRow className='py-2 ion-align-items-start border-bottom'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon icon={pieChartOutline} className='text-3xl' />
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Digital Marketing
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>

								{/* Customer Service */}
								<ZIonRouterLink routerLink='' color='dark'>
									<ZIonRow className='py-2 ion-align-items-start border-bottom'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon
												icon={peopleCircleOutline}
												className='text-3xl'
											/>
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Customer Service
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>

								{/* For Developers */}
								<ZIonRouterLink routerLink='' color='dark'>
									<ZIonRow className='py-2 ion-align-items-start'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon icon={codeSlashOutline} className='text-3xl' />
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												For Developers
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>
							</div>
						</ZIonAccordion>

						{/* Features */}
						<ZIonAccordion value='Features'>
							<ZIonItem slot='header' color='light'>
								<ZIonLabel className='font-bold'>Features</ZIonLabel>
							</ZIonItem>
							<div className='ion-padding' slot='content'>
								{/* Branded Links */}
								<ZIonRouterLink routerLink='' color='dark'>
									<ZIonRow className='py-2 ion-align-items-start border-bottom'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon icon={unlinkOutline} className='text-3xl' />
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Branded Links
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>

								{/* Mobile Links */}
								<ZIonRouterLink routerLink='' color='dark'>
									<ZIonRow className='py-2 ion-align-items-start border-bottom'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon
												icon={phonePortraitOutline}
												className='text-3xl'
											/>
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Mobile Links
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>

								{/* Campaign Management & Analytics */}
								<ZIonRouterLink routerLink='' color='dark'>
									<ZIonRow className='py-2 ion-align-items-start'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon icon={analyticsOutline} className='text-3xl' />
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Campaign Management & Analytics
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>
							</div>
						</ZIonAccordion>

						{/* Resources */}
						<ZIonAccordion value='Resources'>
							<ZIonItem slot='header' color='light'>
								<ZIonLabel className='font-bold'>Resources</ZIonLabel>
							</ZIonItem>
							<div className='ion-padding' slot='content'>
								{/* Blog */}
								<ZIonRouterLink routerLink='' color='dark'>
									<ZIonRow className='py-2 ion-align-items-start border-bottom'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon icon={videocamOutline} className='text-3xl' />
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Blog
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>

								{/* Resource Library */}
								<ZIonRouterLink routerLink='' color='dark'>
									<ZIonRow className='py-2 ion-align-items-start border-bottom'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon icon={libraryOutline} className='text-3xl' />
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Resource Library
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>

								{/* Developers */}
								<ZIonRouterLink
									routerLink={ZaionsRoutes.HomeRoute}
									color='dark'
								>
									<ZIonRow className='py-2 ion-align-items-start border-bottom'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon icon={codeOutline} className='text-3xl' />
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Developers
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>

								{/* Support */}
								<ZIonRouterLink
									routerLink={ZaionsRoutes.HomeRoute}
									color='dark'
								>
									<ZIonRow className='py-2 ion-align-items-start border-bottom'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon
												icon={informationCircleOutline}
												className='text-3xl'
											/>
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Support
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>

								{/* Trust Center */}
								<ZIonRouterLink routerLink='' color='dark'>
									<ZIonRow className='py-2 ion-align-items-start border-bottom'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon
												icon={heartCircleOutline}
												className='text-3xl'
											/>
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Trust Center
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>

								{/* Browser Extension */}
								<ZIonRouterLink routerLink='' color='dark'>
									<ZIonRow className='py-2 ion-align-items-start border-bottom'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon icon={browsersOutline} className='text-3xl' />
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Browser Extension
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>

								{/* Mobile App */}
								<ZIonRouterLink routerLink='' color='dark'>
									<ZIonRow className='py-2 ion-align-items-start'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon icon={appsOutline} className='text-3xl' />
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Mobile App
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>
							</div>
						</ZIonAccordion>

						<ZIonAccordion value='Legal'>
							<ZIonItem slot='header' color='light'>
								<ZIonLabel className='font-bold'>Legal</ZIonLabel>
							</ZIonItem>
							<div className='ion-padding' slot='content'>
								{/* Privacy Policy */}
								<ZIonRouterLink routerLink='' color='dark'>
									<ZIonRow className='py-2 ion-align-items-start border-bottom'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon icon={lockClosedOutline} className='text-3xl' />
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Privacy Policy
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>

								{/* Terms of Service */}
								<ZIonRouterLink routerLink='' color='dark'>
									<ZIonRow className='py-2 ion-align-items-start border-bottom'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon icon={peopleOutline} className='text-3xl' />
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Terms of Service
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>

								{/* Acceptable Use Policy */}
								<ZIonRouterLink routerLink='' color='dark'>
									<ZIonRow className='py-2 ion-align-items-start border-bottom'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon
												icon={checkmarkCircleOutline}
												className='text-3xl'
											/>
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Acceptable Use Policy
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>

								{/* Code of Conduct */}
								<ZIonRouterLink routerLink='' color='dark'>
									<ZIonRow className='py-2 ion-align-items-start'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon
												icon={codeWorkingOutline}
												className='text-3xl'
											/>
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Code of Conduct
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>
							</div>
						</ZIonAccordion>

						{/* Company */}
						<ZIonAccordion value='Company'>
							<ZIonItem slot='header' color='light'>
								<ZIonLabel className='font-bold'>Company</ZIonLabel>
							</ZIonItem>
							<div className='ion-padding' slot='content'>
								{/* About Product */}
								<ZIonRouterLink routerLink='' color='dark'>
									<ZIonRow className='py-2 ion-align-items-start border-bottom'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon icon={homeOutline} className='text-3xl' />
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												About {PRODUCT_NAME}
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>

								{/* Careers */}
								<ZIonRouterLink
									routerLink={ZaionsRoutes.Company.ZaionsAboutRoute}
									color='dark'
								>
									<ZIonRow className='py-2 ion-align-items-start border-bottom'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon icon={briefcaseOutline} className='text-3xl' />
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Careers
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>

								{/* Partners */}
								<ZIonRouterLink
									routerLink={ZaionsRoutes.Company.ZaionsPartnersRoute}
									color='dark'
								>
									<ZIonRow className='py-2 ion-align-items-start border-bottom'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon icon={personAddOutline} className='text-3xl' />
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Partners
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>

								{/* Press */}
								<ZIonRouterLink
									routerLink={ZaionsRoutes.Company.ZaionsPressRoute}
									color='dark'
								>
									<ZIonRow className='py-2 ion-align-items-start border-bottom'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon icon={newspaperOutline} className='text-3xl' />
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Press
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>

								{/* Contact */}
								<ZIonRouterLink
									routerLink={ZaionsRoutes.Company.ZaionsContactRoute}
									color='dark'
								>
									<ZIonRow className='py-2 ion-align-items-start border-bottom'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon icon={callOutline} className='text-3xl' />
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Contact
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>

								{/* Reviews */}
								<ZIonRouterLink
									routerLink={ZaionsRoutes.Company.ZaionsReviewsRoute}
									color='dark'
								>
									<ZIonRow className='py-2 ion-align-items-start border-bottom'>
										<ZIonCol size='1.5' className='pt-2 mt-1'>
											<ZIonIcon icon={eyeOutline} className='text-3xl' />
										</ZIonCol>
										<ZIonCol>
											<ZIonText className='block text-xl font-bold'>
												Reviews
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonRouterLink>
							</div>
						</ZIonAccordion>

						{/* ZLinks */}
						<ZIonAccordion value='Zaions'>
							<ZIonItem slot='header' color='light'>
								<ZIonLabel className='font-bold'>{PRODUCT_NAME}</ZIonLabel>
							</ZIonItem>
							<div className='ion-text-center ion-padding' slot='content'>
								<img src={ProductLogo} className='mt-3 logo' alt='' />
								<br />
								<small>
									© 2022 {PRODUCT_NAME} | Handmade in San Francisco, Denver, New
									York City, Bielefeld, and all over the world.
								</small>
								<br /> <br />
								<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
									<ZIonIcon
										size='large'
										className='ion-padding-end'
										icon={logoTwitter}
										style={{ color: '#56575b' }}
									></ZIonIcon>
								</ZIonRouterLink>
								<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
									<ZIonIcon
										size='large'
										className='ion-padding-end zaions__color_gray2'
										icon={logoInstagram}
									></ZIonIcon>
								</ZIonRouterLink>
								<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
									<ZIonIcon
										size='large'
										className='ion-padding-end zaions__color_gray2'
										icon={logoLinkedin}
									></ZIonIcon>
								</ZIonRouterLink>
								<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
									<ZIonIcon
										size='large'
										icon={logoFacebook}
										className='zaions__color_gray2'
									></ZIonIcon>
								</ZIonRouterLink>
							</div>
						</ZIonAccordion>
					</ZIonAccordionGroup>
				)}
			</ZIonFooter>
		</>
	);
};

export default InPageFooter;
