// Core Imports
import React from 'react';

// Packages Imports

// Custom Imports
import ZaionsIonPage from '@/components/ZaionsIonPage';
import ZaionsHr from '@/components/InPageComponents/Zaions_hr';
import InPageFooter from '@/components/InPageFooter';
import ZaionsTopMenu from '@/navigation/TopMenu';
import {
	ZIonCol,
	ZIonText,
	ZIonRouterLink,
	ZIonRow,
	ZIonGrid,
	ZIonContent,
	ZIonImg,
	ZIonIcon,
} from '@/components/ZIonComponents';

// Images
import { MapImage } from '@/assets/images';

// Styles
import CONSTANTS, { PRODUCT_NAME } from '@/utils/constants';
import {
	logoFacebook,
	logoInstagram,
	logoLinkedin,
	logoTwitter,
} from 'ionicons/icons';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { ZIonButton } from '@/components/ZIonComponents';

const ZaionsContact: React.FC = () => {
	return (
		<ZaionsIonPage pageTitle='Contact Page'>
			<>
				<ZIonContent>
					<ZaionsTopMenu />
					<ZIonGrid className='zaions__bg_gray'>
						<ZIonRow className='my-5 pt-5 pb-5'>
							<ZIonCol></ZIonCol>
							<ZIonCol
								sizeXl='10'
								sizeLg='10'
								sizeMd='10'
								sizeSm='11'
								sizeXs='12'
							>
								<ZIonText>
									<strong>Contact</strong>
								</ZIonText>
								<ZIonText>
									<h1 className='zaions__page_title'>
										We’ll link you to the right person fast.
									</h1>
								</ZIonText>
							</ZIonCol>
							<ZIonCol></ZIonCol>
						</ZIonRow>
					</ZIonGrid>

					<ZIonGrid className=''>
						<ZIonRow className='mt-5 mb-3 pt-4'>
							<ZIonCol></ZIonCol>
							<ZIonCol
								sizeXl='10'
								sizeLg='10'
								sizeMd='10'
								sizeSm='11'
								sizeXs='12'
								className='text-center'
							>
								<ZIonText>
									<h2 className='font-extrabold zaions__color_dark '>
										Get Support
									</h2>
								</ZIonText>
								<ZIonText className='text-lg zaions__color_gray2 mb-2'>
									Browse our extensive knowledge base to find answers to all{' '}
									<br />
									your questions and help you get the most out of {PRODUCT_NAME}
									.
								</ZIonText>
								<ZIonButton
									size='large'
									className={`zaions__tertiary_btn ion-text-capitalize mt-5`}
									fill='clear'
								>
									Browse knowledge base
								</ZIonButton>
							</ZIonCol>
							<ZIonCol></ZIonCol>
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

					<ZIonGrid className=''>
						<ZIonRow className='mb-5 pb-3 pt-4'>
							<ZIonCol></ZIonCol>
							<ZIonCol
								sizeXl='5'
								sizeLg='5'
								sizeMd='5'
								sizeSm='5'
								sizeXs='12'
								className='text-center'
							>
								<ZIonText>
									<h2 className='font-extrabold zaions__color_dark '>Sales</h2>
								</ZIonText>
								<ZIonRouterLink
									routerLink={ZaionsRoutes.DiscoverEnterpriseRoute}
								>
									<ZIonText className='zaions_lh_15px mt-3'>
										Contact a representative to <br /> get started with{' '}
										{PRODUCT_NAME}
										Enterprise. →
									</ZIonText>
								</ZIonRouterLink>
							</ZIonCol>
							<ZIonCol
								sizeXl='5'
								sizeLg='5'
								sizeMd='5'
								sizeSm='5'
								sizeXs='12'
								className='text-center'
							>
								<ZIonText>
									<h2 className='font-extrabold zaions__color_dark '>
										Press inquiries
									</h2>
								</ZIonText>
								<ZIonRouterLink
									routerLink={CONSTANTS.ExternalURL.GenericExternalURL}
								>
									<ZIonText className='zaions_lh_15px mt-3'>
										Contact our press team. →
									</ZIonText>
								</ZIonRouterLink>
							</ZIonCol>
							<ZIonCol></ZIonCol>
						</ZIonRow>
					</ZIonGrid>

					<ZIonGrid>
						<ZIonRow>
							<ZIonCol className='zaions__bg_gray'>
								<div className='w-full text-center py-5'>
									<ZIonText>
										<h2 className='font-extrabold zaions__color_dark '>
											Follow us:{' '}
											<ZIonRouterLink
												routerLink={CONSTANTS.SocialLinks.twitter}
											>
												<ZIonIcon
													icon={logoFacebook}
													className='me-3 zaions__fs_3rem'
													style={{ color: '#3c5a99' }}
												/>
											</ZIonRouterLink>
											<ZIonRouterLink
												routerLink={CONSTANTS.SocialLinks.twitter}
											>
												<ZIonIcon
													icon={logoTwitter}
													className='me-3 zaions__fs_3rem zaions__fs_3rem'
													style={{ color: '#0079b0' }}
												/>
											</ZIonRouterLink>
											<ZIonRouterLink
												routerLink={CONSTANTS.SocialLinks.linkdin}
											>
												<ZIonIcon
													icon={logoLinkedin}
													className='me-3 zaions__fs_3rem zaions__fs_3rem'
													style={{ color: '#1da1f2' }}
												/>
											</ZIonRouterLink>
											<ZIonRouterLink
												routerLink={CONSTANTS.SocialLinks.instagram}
											>
												<ZIonIcon
													icon={logoInstagram}
													className='me-3 zaions__fs_3rem'
													style={{ color: '#000' }}
												/>
											</ZIonRouterLink>
										</h2>
									</ZIonText>
								</div>

								<ZIonImg src={MapImage} className='w-full' />
							</ZIonCol>
						</ZIonRow>
					</ZIonGrid>

					<ZIonGrid className=''>
						<ZIonRow className='mb-5 pb-3 pt-5'>
							<ZIonCol
								sizeXl=''
								sizeLg=''
								sizeMd='0'
								sizeSm='0'
								sizeXs='0'
							></ZIonCol>
							<ZIonCol
								sizeXl='3.3'
								sizeLg='3.8'
								sizeMd='3.8'
								sizeSm='5'
								sizeXs='12'
								className='text-start'
							>
								<ZIonText>
									<h2 className='font-extrabold zaions__color_dark '>
										New York City
									</h2>
								</ZIonText>
								<ZIonText className='mt-3 mb-0'>DPT 5006</ZIonText>
								<ZIonText className='mb-0'>
									601 W. 26th St., Suite 357 (3rd Floor)
								</ZIonText>
								<ZIonText className='mb-0'>New York, NY 10001-1101</ZIonText>
							</ZIonCol>
							<ZIonCol
								sizeXl='3.3'
								sizeLg='3.8'
								sizeMd='3.8'
								sizeSm='5'
								sizeXs='12'
								className='text-start'
							>
								<ZIonText>
									<h2 className='font-extrabold zaions__color_dark '>Denver</h2>
								</ZIonText>
								<ZIonText className='mb-0'>Suite 650</ZIonText>
								<ZIonText className='mb-0'>Denver CO, 80202</ZIonText>
							</ZIonCol>
							<ZIonCol
								sizeXl='3.3'
								sizeLg='3.8'
								sizeMd='3.8'
								sizeSm='5'
								sizeXs='12'
								className='text-start'
							>
								<ZIonText>
									<h2 className='font-extrabold zaions__color_dark '>
										San Francisco
									</h2>
								</ZIonText>
								<ZIonText className='mt-3 mb-0'>33 New Montgomery St,</ZIonText>
								<ZIonText className='mb-0'>Suite 1000 (10th Floor)</ZIonText>
								<ZIonText className='mb-0'>San Francisco, CA 94105</ZIonText>
							</ZIonCol>
							<ZIonCol
								sizeXl=''
								sizeLg=''
								sizeMd='0'
								sizeSm='0'
								sizeXs='0'
							></ZIonCol>
						</ZIonRow>
					</ZIonGrid>

					<InPageFooter />
				</ZIonContent>
			</>
		</ZaionsIonPage>
	);
};

export default ZaionsContact;
