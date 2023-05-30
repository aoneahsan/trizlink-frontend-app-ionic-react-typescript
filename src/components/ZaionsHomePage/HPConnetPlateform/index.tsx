// Core Imports
import React, { Fragment } from 'react';

// Packages Imports
import { useRecoilValue } from 'recoil';
import { IonItemDivider } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Custom Imports
import ZaionsNewLabel from '@/components/InPageComponents/ZaionsNewLable';
import {
	ZIonCol,
	ZIonText,
	ZIonIcon,
	ZIonRouterLink,
	ZIonRow,
	ZIonGrid,
	ZIonCard,
	ZIonCardHeader,
	ZIonCardTitle,
	ZIonCardContent,
} from '@/components/ZIonComponents';
import { ZIonButton } from '@/components/ZIonComponents';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

// Global Constant
import { PRODUCT_NAME } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Recoil
import { ZaionsHpCPData } from '@/ZaionsStore/ZaionsHPBCP.recoil';

// Type
import { ZaionsHpCPDataType } from '@/types/ZaionsHPBCPType';

// const { Item: CarouselItem } = Carousel;

const ZaionsHPConnectPlatform: React.FC = () => {
	const loadedHPBCData = useRecoilValue<ZaionsHpCPDataType[]>(ZaionsHpCPData);

	//
	const { isSmScale, isLgScale } = useZMediaQueryScale();

	// Slider
	// TODO: add action(slider) buttons in ZaionsCarousel 24/5/2023
	const ZaionsCarousel = !isLgScale ? Swiper : Fragment;
	const ZaionsCarouselItem = !isLgScale ? SwiperSlide : Fragment;

	return (
		<>
			<div className='pt-2 mt-4 ion-text-center ion-margin-bottom ion-padding-bottom'>
				<br />
				<ZIonText className='mb-2 text-3xl font-bold d-inline-block'>
					{PRODUCT_NAME}’s Connections Platform
				</ZIonText>
				<br />
				<ZIonText>
					All the products you need to build brand connections, manage links and
					QR Codes, and <br /> connect with audiences everywhere, in a single
					unified platform.
				</ZIonText>
			</div>
			<div>
				<ZIonGrid>
					<ZIonRow>
						<ZIonCol></ZIonCol>
						<ZIonCol
							sizeXl='11'
							sizeLg='11'
							sizeMd='11'
							sizeSm='10'
							sizeXs='12'
						>
							<ZIonRow>
								<ZaionsCarousel
									spaceBetween={0}
									slidesPerView={1}
									onSlideChange={() => {}}
									onSwiper={(_) => {}}
									style={{ width: '100%' }}
								>
									{loadedHPBCData.map((data) => (
										<ZaionsCarouselItem key={data.id}>
											<ZIonCol
												sizeXl='4'
												sizeLg='4'
												sizeMd='6'
												sizeSm='6'
												sizeXs='6'
											>
												<ZIonCard
													style={{
														border: '1px #000 solid',
														borderRadius: '20px',
													}}
												>
													<ZIonCardHeader className='mt-4'>
														<ZIonCardTitle
															className='flex ion-align-items-center'
															style={{
																flexDirection: !isSmScale && 'column',
																gap: !isSmScale && '10px',
															}}
														>
															<img
																src={data.icon}
																className='ion-padding-end'
																alt='icon'
															/>{' '}
															<ZIonText className='font-bold'>
																{data.title}
															</ZIonText>{' '}
															{data.extraData === 'New' ? (
																<ZaionsNewLabel
																	className='ms-2'
																	title={data.extraData}
																/>
															) : (
																''
															)}
														</ZIonCardTitle>
														<div className='ion-margin-start ion-margin-top ion-padding-top'>
															<ZIonText className=''>{data.text}</ZIonText>
														</div>
													</ZIonCardHeader>
													<ZIonCardContent>
														<IonItemDivider />
														<br />
														<h2>{data.featureListTitle}</h2>
														{data.featureListItem.map((item) => (
															<ZIonText
																className='flex ion-align-items-center ion-padding-top'
																key={item.id}
															>
																<ZIonIcon
																	icon={item.featureIcon}
																	color='primary'
																	className='ion-padding-end'
																	size='large'
																></ZIonIcon>
																{item.fetureText}
															</ZIonText>
														))}
														<div className='pt-3 ion-margin-horizontal'>
															<ZIonRouterLink
																routerLink={ZaionsRoutes.HomeRoute}
															>
																<ZIonButton expand='block'>
																	{data.primaryBtnText}
																</ZIonButton>
															</ZIonRouterLink>
														</div>
														<div className='ion-margin-horizontal ion-margin-top'>
															<ZIonRouterLink
																routerLink={ZaionsRoutes.HomeRoute}
															>
																<ZIonButton expand='block' fill='clear'>
																	{data.secondaryBtnText}
																</ZIonButton>
															</ZIonRouterLink>
														</div>
													</ZIonCardContent>
												</ZIonCard>
											</ZIonCol>
										</ZaionsCarouselItem>
									))}
								</ZaionsCarousel>
							</ZIonRow>
						</ZIonCol>
						<ZIonCol></ZIonCol>
					</ZIonRow>
				</ZIonGrid>
			</div>
		</>
	);
};

export default ZaionsHPConnectPlatform;
