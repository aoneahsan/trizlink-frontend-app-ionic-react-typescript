// Core Import
import React from 'react';

// Packages Imports
import { useMediaQuery } from 'react-responsive';
import { useRecoilValue } from 'recoil';
import { cloudDownloadOutline } from 'ionicons/icons';

// Custom Imports
import ZIonPage from '@/components/ZIonPage';
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
	ZIonCard,
	ZIonCardHeader,
	ZIonCardContent,
	ZIonIcon,
} from '@/components/ZIonComponents';

// Recoil State
import { ZaionsPressState } from '@/ZaionsStore/CompanySection/Press/Press.recoil';
import { ZaionsPressProductImagesState } from '@/ZaionsStore/CompanySection/Press/ProductImages.recoil';

// Types
import { ZaionsPressType } from '@/types/Company/PressPage/Press.type';
import { ZaionsPressProductImagesType } from '@/types/Company/PressPage/ProductImages.type';

// Global Contant
import { BRACKPOINT_MD, PRODUCT_NAME } from '@/utils/constants';

// Images
import { BlogoOrange, ProductLogo } from '@/assets/images';
import { ProductImagesZip, ProductLogoEsp } from '@/assets/others';
import { ZIonButton } from '@/components/ZIonComponents';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

const ZaionsPress: React.FC = () => {
	const PressData = useRecoilValue<ZaionsPressType[]>(ZaionsPressState);
	const ProductImagesData = useRecoilValue<ZaionsPressProductImagesType[]>(
		ZaionsPressProductImagesState
	);

	const isMdScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_MD})`,
	});
	return (
		<ZIonPage pageTitle='Press Page'>
			{/* Content */}
			<ZIonContent>
				<ZaionsTopMenu />
				<ZIonGrid className='zaions__bg_gray pt-5 pb-5'>
					<ZIonRow className='my-5 pt-5 pb-3'>
						<ZIonCol></ZIonCol>
						<ZIonCol
							sizeXl='10'
							sizeLg='10'
							sizeMd='10'
							sizeSm='11'
							sizeXs='12'
						>
							<ZIonText>
								<h1 className='zaions__page_title'>
									There is always something <br /> happening here.
								</h1>
							</ZIonText>
						</ZIonCol>
						<ZIonCol></ZIonCol>
					</ZIonRow>
				</ZIonGrid>

				<ZIonGrid className='pt-5'>
					<ZIonRow className=''>
						<ZIonCol></ZIonCol>
						<ZIonCol
							sizeXl='10'
							sizeLg='11'
							sizeMd='11.5'
							sizeSm='12'
							sizeXs='12'
						>
							{PressData.map((el) => {
								return (
									<ZIonRow key={el.id}>
										{!isMdScale && (
											<ZIonCol size='12'>
												<ZIonRouterLink routerLink={el.link}>
													<ZIonImg src={el.image} style={{ width: '100%' }} />
												</ZIonRouterLink>
											</ZIonCol>
										)}
										<ZIonCol
											sizeXl='9'
											sizeLg='8'
											sizeMd='7'
											sizeSm='12'
											sizeXs='12'
										>
											<ZIonText className=''>{el.date}</ZIonText>
											<ZIonRouterLink routerLink={el.link} color={'dark'}>
												<ZIonText>
													<h3 className='font-extrabold'>{el.title}</h3>
												</ZIonText>
											</ZIonRouterLink>
											<ZIonRouterLink routerLink={el.link}>
												Read More
											</ZIonRouterLink>
										</ZIonCol>
										{isMdScale && (
											<ZIonCol>
												<ZIonRouterLink routerLink={el.link}>
													<ZIonImg
														className='ms-auto'
														src={el.image}
														style={{ width: '90%' }}
													/>
												</ZIonRouterLink>
											</ZIonCol>
										)}
									</ZIonRow>
								);
							})}
						</ZIonCol>
						<ZIonCol></ZIonCol>
					</ZIonRow>
				</ZIonGrid>

				<ZIonGrid className='pt-5 mt-5 zaions__bg_gray pb-5'>
					<ZIonRow>
						<ZIonCol
							sizeXl='10'
							sizeLg='10'
							sizeMd='11'
							sizeSm='12'
							sizeXs='12'
							className='mx-auto'
						>
							<ZIonText>
								<h4 className='font-bold text-lg'>Media Kit</h4>
							</ZIonText>
							<ZIonText>
								<h2 className='font-extrabold'>Brand Assets</h2>
							</ZIonText>
						</ZIonCol>

						<ZIonCol
							sizeXl='10'
							sizeLg='10'
							sizeMd='11'
							sizeSm='12'
							sizeXs='12'
							className='mx-auto flex'
						>
							<ZIonRow className='ion-justify-content-center'>
								<ZIonCol
									sizeXl='4'
									sizeLg='4'
									sizeMd='4'
									sizeSm='4'
									sizeXs='12'
								>
									<ZIonCard>
										<ZIonCardHeader>
											<ZIonImg src={BlogoOrange} />
										</ZIonCardHeader>
										<ZIonCardContent>
											<ZIonText
												className='font-extrabold text-lg'
												color={'dark'}
											>
												{PRODUCT_NAME} Logo
											</ZIonText>
											<div className='mt-4 flex ion-justify-content-between'>
												<ZIonButton
													fill='clear'
													className='zaions__tertiary_btn ion-text-capitalize'
													routerLink={BlogoOrange}
													download={BlogoOrange}
												>
													Download.png
												</ZIonButton>
												<ZIonButton
													fill='clear'
													className='zaions__tertiary_btn ion-text-capitalize'
													routerLink={ProductLogoEsp}
													download={ProductLogoEsp}
												>
													Download.eps
												</ZIonButton>
											</div>
										</ZIonCardContent>
									</ZIonCard>
								</ZIonCol>
								<ZIonCol sizeXl='4'>
									<ZIonCard>
										<ZIonCardHeader>
											<ZIonImg src={BlogoOrange} />
										</ZIonCardHeader>
										<ZIonCardContent>
											<ZIonText
												className='font-extrabold text-lg'
												color={'dark'}
											>
												{PRODUCT_NAME} Logo
											</ZIonText>
											<div className='mt-4 flex ion-justify-content-between'>
												<ZIonButton
													fill='clear'
													className='zaions__tertiary_btn ion-text-capitalize'
													routerLink={BlogoOrange}
													download={BlogoOrange}
												>
													Download.png
												</ZIonButton>
												<ZIonButton
													fill='clear'
													className='zaions__tertiary_btn ion-text-capitalize'
													routerLink={ProductLogo}
													download={ProductLogo}
												>
													Download.eps
												</ZIonButton>
											</div>
										</ZIonCardContent>
									</ZIonCard>
								</ZIonCol>
							</ZIonRow>
						</ZIonCol>
					</ZIonRow>

					<ZIonRow className='mt-5'>
						<ZIonCol
							className='mx-auto flex ion-justify-content-between'
							sizeXl='10'
						>
							<ZIonText>
								{' '}
								<h2 className='font-extrabold zaions__color_dark'>
									Product Images
								</h2>
							</ZIonText>
							<ZIonButton
								className='zaions_primary_color ion-text-capitalize'
								color={'light'}
								fill='clear'
								routerLink={ProductImagesZip}
								download={ProductImagesZip}
							>
								<ZIonIcon className='me-2' icon={cloudDownloadOutline} />{' '}
								Download all product images
							</ZIonButton>
						</ZIonCol>
						<ZIonCol
							className='mx-auto'
							sizeXl='10.5'
							sizeLg='11'
							sizeMd='11.5'
							sizeSm='12'
							sizeXs='12'
						>
							<ZIonRow>
								{ProductImagesData.map((el) => {
									return (
										<ZIonCol
											sizeXl='4'
											sizeLg='4'
											sizeMd='5'
											sizeSm='6'
											sizeXs='12'
											key={el.id}
										>
											<ZIonCard
												className={`${!isMdScale ? 'w-full m-0' : 'w-[88%]'}`}
											>
												<ZIonCardHeader className='px-0 pt-0'>
													<ZIonImg src={el.image} />
												</ZIonCardHeader>
												<ZIonCardContent className='pe-0'>
													<ZIonText
														className='font-extrabold text-base'
														color={'dark'}
													>
														{el.title}
													</ZIonText>
													<div className='mt-4 flex ion-justify-content-between'>
														<ZIonButton
															fill='clear'
															className='zaions__tertiary_btn ion-text-capitalize'
															target='_blank'
															routerLink={el.link}
															download={el.link}
														>
															Download Asset File
														</ZIonButton>
													</div>
												</ZIonCardContent>
											</ZIonCard>
										</ZIonCol>
									);
								})}
							</ZIonRow>
						</ZIonCol>
					</ZIonRow>
				</ZIonGrid>

				<ZIonGrid className='py-5'>
					<ZIonRow>
						<ZIonCol className='text-center'>
							<ZIonText>
								<h2 className='font-extrabold zaions__color_dark'>
									For press related inquiries, please{' '}
									<ZIonRouterLink
										routerLink={ZaionsRoutes.Company.ZaionsContactRoute}
										className='text-decoration-underline zaions__color_dark'
									>
										contact us
									</ZIonRouterLink>
									.
								</h2>
							</ZIonText>
						</ZIonCol>
					</ZIonRow>
				</ZIonGrid>

				<InPageFooter />
			</ZIonContent>
		</ZIonPage>
	);
};

export default ZaionsPress;
