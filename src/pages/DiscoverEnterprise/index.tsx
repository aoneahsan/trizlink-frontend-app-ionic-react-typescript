// Core Imports
import React, { Fragment, useLayoutEffect } from 'react';

// Packages Imports

import { useMediaQuery } from 'react-responsive';
import { useRecoilState } from 'recoil';

import { Swiper, SwiperSlide } from 'swiper/react';
import { checkmarkSharp } from 'ionicons/icons';
import classNames from 'classnames';

// Custom Imports
import ZIonPage from '@/components/ZIonPage';
import ZaionsHr from '@/components/InPageComponents/Zaions_hr';
import {
	ZIonCol,
	ZIonText,
	ZIonItem,
	ZIonRow,
	ZIonGrid,
	ZIonContent,
	ZIonList,
	ZIonImg,
	ZIonIcon,
	ZIonInput,
	ZIonSelect,
	ZIonSelectOption,
	ZIonRouterLink,
	ZIonButton,
} from '@/components/ZIonComponents';
import ZaionsSecondaryHeader from '@/components/InPageComponents/ZaionsSecondaryHeader';
import InPageFooter from '@/components/InPageFooter';

// Global Constants
import {
	ZaionsDiscoverEnterpriseCompanySize,
	ZCountryData,
	ZaionsDiscoverEnterprisePrimaryUseCase,
} from '@/data/DiscoverEnterprise/index.data';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { PRODUCT_DOMAIN, PRODUCT_NAME } from '@/utils/constants';
// import {
// 	ZaionsDiscoverEnterpriseCompanySize,
// 	ZCountryData,
// 	ZaionsDiscoverEnterpriseJobTitle,
// 	ZaionsDiscoverEnterprisePrimaryUseCase,
// } from '@/data/DiscoverEnterprise/index.data';
import DEBrandData from '@/data/DiscoverEnterprise.data';

// Types
import { ZaionsHPBrandsType } from '@/types/ZionsHPBrandType';

// Recoil States
import { ZaionsHPBrandsData } from '@/ZaionsStore/ZaionsHPBrandsRecoil';

// Styles
import classes from './styles.module.css';

const ZaionsDiscoverEnterprise: React.FC = () => {
	const [loadedHPBrandsData, setLoadedHPBrandsData] =
		useRecoilState<ZaionsHPBrandsType[]>(ZaionsHPBrandsData);

	const { isSmScale, isLgScale } = useZMediaQueryScale();

	useLayoutEffect(() => {
		// Fetch Data From Database Later:-
		setLoadedHPBrandsData(DEBrandData);
	}, [setLoadedHPBrandsData]);

	return (
		<ZIonPage pageTitle='Discover Enterprise Page'>
			<ZIonContent>
				<ZaionsSecondaryHeader bottomHr={false} />

				<ZIonGrid
					className={`mt-5 mb-5 ${classes.zaions__discover_enterpise_bg}`}
				>
					<ZIonRow className='mt-3 mb-4'>
						<ZIonCol className='text-center'>
							<ZIonText className='block text-xl font-extrabold zaions__color_dark'>
								Discover the {PRODUCT_NAME} solution that’s right for you
							</ZIonText>
							<ZIonText className='mt-2 mb-2 text-md zaions__color_gray2'>
								{PRODUCT_NAME} helps you build and protect your brand so you can
								leverage it across your communication <br /> channels to drive
								powerful business results.
							</ZIonText>
						</ZIonCol>
					</ZIonRow>
					<ZIonRow>
						<ZIonCol></ZIonCol>
						<ZIonCol
							className='p-3 zaions__bg_gray'
							sizeXl='5'
							sizeLg='6'
							sizeMd='6'
							sizeSm='6.5'
							sizeXs='11.5'
						>
							<ZIonText className='block pt-4 text-xl font-extrabold ion-text-center zaions__color_dark'>
								Let's get in touch
							</ZIonText>
							{/* name */}
							<ZIonInput
								fill='outline'
								label='Name*'
								labelPlacement='floating'
								className='mt-4'
							/>

							{/* Company Name* */}
							<ZIonInput
								fill='outline'
								label='Company Name*'
								labelPlacement='floating'
								className='mt-5'
							/>

							{/* Email Address */}
							<ZIonInput
								fill='outline'
								label='Email Address*'
								labelPlacement='floating'
								className='mt-5'
								type='email'
							/>

							{/* Phone Number */}
							<ZIonInput
								fill='outline'
								label='Phone Number*'
								labelPlacement='floating'
								className='mt-5'
							/>

							{/* Job Title */}
							<ZIonInput
								fill='outline'
								label='Job Title*'
								labelPlacement='floating'
								className='mt-5'
							/>

							{/* Company Size */}
							<ZIonSelect
								fill='outline'
								label='Company Size*'
								labelPlacement='floating'
								className='mt-5'
								interface='popover'
							>
								{ZaionsDiscoverEnterpriseCompanySize.map((el, index) => {
									return (
										<ZIonSelectOption value={el} key={index}>
											{el}
										</ZIonSelectOption>
									);
								})}
							</ZIonSelect>

							{/* Primary Use Case */}
							<ZIonSelect
								fill='outline'
								label='Primary Use Case*'
								labelPlacement='floating'
								className='mt-5'
								interface='popover'
							>
								{ZaionsDiscoverEnterprisePrimaryUseCase.map((el, index) => {
									return (
										<ZIonSelectOption value={el} key={index}>
											{el}
										</ZIonSelectOption>
									);
								})}
							</ZIonSelect>

							{/* Country */}
							<ZIonSelect
								fill='outline'
								label='Country*'
								labelPlacement='floating'
								className='mt-5'
								interface='popover'
							>
								{ZCountryData.map((el, index) => {
									return (
										<ZIonSelectOption value={index} key={index}>
											{el.value}
										</ZIonSelectOption>
									);
								})}
							</ZIonSelect>

							<ZIonText className='block mt-5 ion-text-center' color='medium'>
								By clicking the 'Submit' button below, you agree to the
								{PRODUCT_NAME}
								<ZIonRouterLink
									routerLink={ZaionsRoutes.Legal.ZaionsTermsOfService}
									className='inline-block ms-1'
								>
									Terms of Service
								</ZIonRouterLink>
								,
								<ZIonRouterLink
									routerLink={ZaionsRoutes.Legal.ZaionsPrivacyPolicyRoute}
									className='inline-block ms-1'
								>
									Privacy Policy
								</ZIonRouterLink>
								, and
								<ZIonRouterLink
									routerLink={ZaionsRoutes.Legal.ZaionsAcceptableUsePolicyRoute}
									className='inline-block mx-1'
								>
									Acceptable Use Policy
								</ZIonRouterLink>
								.
							</ZIonText>

							{/* Button */}
							<ZIonButton className='mx-3 mt-5 normal-case' expand='block'>
								Apply now
							</ZIonButton>
						</ZIonCol>
						<ZIonCol></ZIonCol>
					</ZIonRow>
				</ZIonGrid>
				<ZaionsHr />

				<ZIonGrid className='pb-4 mb-5'>
					<ZIonRow>
						<ZIonCol
							sizeXl='1'
							sizeLg='0'
							sizeMd='0'
							sizeSm='0'
							sizeXs='0'
						></ZIonCol>
						<ZIonCol sizeXl='5' sizeLg='6' sizeMd='5' sizeSm='12' sizeXs='12'>
							<ZIonRow>
								<ZIonCol className='mt-2 mb-5 ion-text-center'>
									<ZIonText className='text-xl font-extrabold'>
										{PRODUCT_NAME} is trusted by the world’s most pioneering
										brands.
									</ZIonText>
								</ZIonCol>
							</ZIonRow>
							<ZIonRow className='ion-justify-content-center ion-align-items-center'>
								{isLgScale ? (
									loadedHPBrandsData.map((item) => (
										<ZIonCol
											sizeXl='3'
											sizeLg='3.5'
											sizeMd='5'
											sizeSm='12'
											sizeXs='12'
											key={item.id}
										>
											<ZIonImg src={item.image} alt='' />
										</ZIonCol>
									))
								) : !isLgScale ? (
									<Swiper className='h-[10rem]'>
										{loadedHPBrandsData.map((item) => (
											<SwiperSlide key={item.id}>
												<ZIonCol
													sizeXl='3'
													sizeLg='3.5'
													sizeMd='5'
													sizeSm='12'
													sizeXs='12'
													key={item.id}
												>
													<ZIonImg
														className='w-full h-full'
														src={item.image}
														alt=''
													/>
												</ZIonCol>
											</SwiperSlide>
										))}
									</Swiper>
								) : (
									''
								)}
							</ZIonRow>
						</ZIonCol>
						<ZIonCol sizeXl='4' sizeLg='5' sizeMd='6' sizeSm='12' sizeXs='12'>
							<ZIonList
								lines='none'
								className={classNames({
									'mt-4 pt-1 ps-3': true,
									'ms-5': !isSmScale,
								})}
							>
								<ZIonItem
									className={classNames({
										'flex ion-align-items-start': true,
										'mt-2 mb-3': !isSmScale,
									})}
								>
									<ZIonIcon
										icon={checkmarkSharp}
										className={classNames({
											'text-5xl font-extrabold me-2': true,
											'mb-4': !isSmScale,
										})}
										style={{ color: '#ee6123' }}
									/>
									<ZIonText className='text-[18px] '>
										<ZIonText className='font-bold me-1'>
											Custom Branded Domains
										</ZIonText>
										– Replace the “{PRODUCT_DOMAIN}” with your chosen domain
										name
									</ZIonText>
								</ZIonItem>

								<ZIonItem
									className={classNames({
										'flex ion-align-items-center': true,
										'mt-2 mb-3': !isSmScale,
									})}
								>
									<ZIonIcon
										icon={checkmarkSharp}
										className={classNames({
											'text-5xl font-extrabold me-1': true,
											'mb-4': !isSmScale,
										})}
										style={{ color: '#ee6123' }}
									/>
									<ZIonText className='text-[18px]'>
										<ZIonText className='font-bold'>Auto Branding</ZIonText> –
										Any link shortened in {PRODUCT_NAME} by a third-party will
										use your custom branded domain
									</ZIonText>
								</ZIonItem>

								<ZIonItem
									className={classNames({
										'flex ion-align-items-center': true,
										'mt-2 mb-3': !isSmScale,
									})}
								>
									<ZIonIcon
										icon={checkmarkSharp}
										className={classNames({
											'text-5xl font-extrabold me-1': true,
											'mb-4': !isSmScale,
										})}
										style={{ color: '#ee6123' }}
									/>
									<ZIonText className='text-[18px]'>
										<ZIonText className='font-bold me-1'>
											Unlimited Link Redirects
										</ZIonText>
										– Easily change the destination page for any of your links
									</ZIonText>
								</ZIonItem>

								<ZIonItem
									className={classNames({
										'flex ion-align-items-center': true,
										'mt-2 mb-3': !isSmScale,
									})}
								>
									<ZIonIcon
										icon={checkmarkSharp}
										className={classNames({
											'text-5xl font-extrabold me-1': true,
											'mb-4': !isSmScale,
										})}
										style={{ color: '#ee6123' }}
									/>
									<ZIonText className='text-[18px] '>
										<ZIonText className='font-bold'>
											Campaign Management & Analytics
										</ZIonText>
										– Glean insights from link-level data points
									</ZIonText>
								</ZIonItem>

								<ZIonItem
									className={classNames({
										'flex ion-align-items-center': true,
										'mt-2 mb-3': !isSmScale,
									})}
								>
									<ZIonIcon
										icon={checkmarkSharp}
										className={classNames({
											'text-5xl font-extrabold me-1': true,
											'mb-4': !isSmScale,
										})}
										style={{ color: '#ee6123' }}
									/>
									<ZIonText className='text-[18px] '>
										<ZIonText className='font-bold me-1'>
											Account Setup & Support
										</ZIonText>
										– Gain access to personalized onboarding and setup
									</ZIonText>
								</ZIonItem>
							</ZIonList>
						</ZIonCol>
						<ZIonCol
							sizeXl='1'
							sizeLg='0'
							sizeMd='0'
							sizeSm='0'
							sizeXs='0'
						></ZIonCol>
					</ZIonRow>
				</ZIonGrid>

				<InPageFooter blueSec={false} />
			</ZIonContent>
		</ZIonPage>
	);
};

export default ZaionsDiscoverEnterprise;
