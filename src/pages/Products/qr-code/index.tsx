// Core Import
import React from 'react';

// Package Imports
import { useMediaQuery } from 'react-responsive';

import classNames from 'classnames';

// Custom Imports
import ZaionsIonPage from '@/components/ZaionsIonPage';
import InPageFooter from '@/components/InPageFooter';
import ZaionsInpageHeader from '@/components/InPageComponents/ZaionsInpageHeader';
import ZaionsInpageBrandsList from '@/components/InPageComponents/ZaionsBrandsList';
import ZaionsHPUsersFeedBack from '@/components/ZaionsHomePage/HPFeedback';
import ZaionsInpageCol from '@/components/InPageComponents/ZaionsInpageGridsys';
import ZaionsTopMenu from '@/navigation/TopMenu';
import ZaionsHr from '@/components/InPageComponents/Zaion_hr';
import {
	ZIonCol,
	ZIonText,
	ZIonRow,
	ZIonGrid,
	ZIonContent,
	ZIonImg,
} from '@/components/ZIonComponents';

// Global Constants
import {
	BRACKPOINT_LG,
	BRACKPOINT_MD,
	BRACKPOINT_XL,
	PRODUCT_NAME,
} from '@/utils/constants';

// Styles
import classes from './styles.module.css';
import {
	analizeCampaigns2,
	chartInspect1,
	customizeColorQr,
	generateQrCode,
	increaseConversions,
	maintainConsistency,
	printedMaterial,
	ProductLogo,
	qrCodesMobile,
} from '@/assets/images';
import { ZIonButton } from '@/components/ZIonComponents';

const ZaionsQRCode: React.FC = () => {
	const isXlScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_XL})`,
	});
	const isLgScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_LG})`,
	});
	const isMdScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_MD})`,
	});

	return (
		<ZaionsIonPage pageTitle='QR Code Page'>
			{/* Page Content */}
			<ZIonContent fullscreen>
				<ZaionsTopMenu />
				<ZaionsInpageHeader
					lgImg={qrCodesMobile}
					label='QR Codes'
					title={
						<ZIonText style={{ lineHeight: !isMdScale ? '3rem' : '' }}>
							Engage customers, <br /> one scan at a time
						</ZIonText>
					}
					subTitle={
						<ZIonText>
							No matter how simple or advanced your QR Code needs, <br />{' '}
							{PRODUCT_NAME} and our newest family member, QR Code Generator,{' '}
							<br /> have you covered.
						</ZIonText>
					}
					primaryBtnText='Explore QR Code Solutions'
					isSecondaryBtn={false}
					className={classNames({
						'mb-5': true,
						[classes.zaions__QRCode_bg]: isXlScale,
						[classes.zaions__pb]: isXlScale,
					})}
					bottomHr={false}
				/>

				<ZIonGrid
					className={`mt-4 pb-3 ${!isLgScale ? 'ion-text-center' : ''}`}
				>
					<ZIonRow className='mb-4'>
						<ZIonCol size='1' sizeMd='0' sizeSm='0' sizeXs='0'></ZIonCol>
						<ZIonCol
							size='10'
							sizeMd='12'
							sizeSm='12'
							sizeXs='12'
							className='ion-text-center'
						>
							<ZIonText>
								<h2
									className='font-bolder zaions__color_dark'
									style={{ fontSize: '38px' }}
								>
									Power your marketing and business strategy with QR Codes
								</h2>
							</ZIonText>
						</ZIonCol>
						<ZIonCol size='1' sizeMd='0' sizeSm='0' sizeXs='0'></ZIonCol>
					</ZIonRow>
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
										icon={increaseConversions}
										title='Increase conversions'
										text={`Use QR Codes to connect offline campaigns to interactive digital experiences that give customers more ways to purchase, subscribe, install apps, and more.`}
									/>

									<ZaionsInpageCol
										icon={maintainConsistency}
										title='Maintain brand consistency'
										text={`Design QR Codes that match your brand using custom colors, fonts and logos, as well as incentive scans with customized frames and calls-to-action.`}
									/>

									<ZaionsInpageCol
										icon={chartInspect1}
										title='Track & optimize campaigns'
										text={`Get scan metrics and insights to help you understand your audience and make informed decisions about which channels perform best.`}
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

				<ZIonGrid className='px-0'>
					<ZIonRow className='mb-5 mt-5 pt-3'>
						<ZIonCol size='1' sizeMd='0' sizeSm='0' sizeXs='0'></ZIonCol>
						<ZIonCol
							size='10'
							sizeMd='12'
							sizeSm='12'
							sizeXs='12'
							className='ion-text-center'
						>
							<ZIonText>
								<h2
									className='font-bolder zaions__color_dark'
									style={{ fontSize: '38px' }}
								>
									QR Code solutions to fit any need
								</h2>
							</ZIonText>
						</ZIonCol>
						<ZIonCol size='1' sizeMd='0' sizeSm='0' sizeXs='0'></ZIonCol>
					</ZIonRow>
					<ZIonRow style={{ backgroundColor: '#f5f6f7' }} className='py-5'>
						<ZIonCol
							sizeXl='1'
							sizeLg='1'
							sizeMd='0'
							sizeSm='0'
							sizeXs='0'
						></ZIonCol>
						<ZIonCol
							sizeXl=''
							sizeLg=''
							sizeMd='10'
							sizeSm='12'
							sizeXs='12'
							className='py-4 me-4'
							style={{ backgroundColor: '#fff' }}
						>
							<ZIonGrid>
								<ZIonRow>
									<ZIonCol size='12'>
										<ZIonImg
											src={ProductLogo}
											style={{ height: '60px' }}
										></ZIonImg>
										<div className='mx-auto' style={{ width: '94%' }}>
											<hr style={{ borderColor: '#999999' }} />
										</div>
									</ZIonCol>
									<ZIonCol size='11.4' className='mx-auto'>
										<ZIonText>
											Create, customize, manage and track QR Codes and links
											without leaving the {PRODUCT_NAME} Connections Platform.
										</ZIonText>
									</ZIonCol>
									<ZIonCol size='11.4' className='mx-auto mt-3'>
										<ZIonButton expand='block' color='tertiary'>
											Get Started
										</ZIonButton>
									</ZIonCol>
									<ZIonCol size='11.4' className='mx-auto mt-3'>
										<ZIonText className='font-bold'>Popular Features:</ZIonText>

										<ZIonGrid className='mt-3 pt-1'>
											<ZIonRow>
												<ZIonCol size='1.3' className='me-1 ps-0'>
													<ZIonImg
														src={generateQrCode}
														style={{ height: '50px' }}
													/>
												</ZIonCol>
												<ZIonCol size='10.5'>
													<ZIonText>
														Generate a QR Code for any {PRODUCT_NAME} link that
														scans directly to a web page
													</ZIonText>
												</ZIonCol>
											</ZIonRow>
											<ZIonRow className='mt-2 pt-1'>
												<ZIonCol size='1.3' className='me-1 ps-0'>
													<ZIonImg
														src={customizeColorQr}
														style={{ height: '50px' }}
													/>
												</ZIonCol>
												<ZIonCol size='10.5'>
													<ZIonText>
														Customize the color of the QR Code to match your
														brand elements
													</ZIonText>
												</ZIonCol>
											</ZIonRow>
											<ZIonRow className='mt-2 pt-1'>
												<ZIonCol size='1.3' className='me-1 ps-0'>
													<ZIonImg
														src={printedMaterial}
														style={{ height: '50px' }}
													/>
												</ZIonCol>
												<ZIonCol size='10.5'>
													<ZIonText>
														Extend the life of printed materials by redirecting
														links to updated content
													</ZIonText>
												</ZIonCol>
											</ZIonRow>
											<ZIonRow className='mt-2 pt-1'>
												<ZIonCol size='1.3' className='me-1 ps-0'>
													<ZIonImg
														src={analizeCampaigns2}
														style={{ height: '50px' }}
													/>
												</ZIonCol>
												<ZIonCol size='10.5'>
													<ZIonText>
														Track QR Code performance across channels, like
														email and social, to understand the customer journey
													</ZIonText>
												</ZIonCol>
											</ZIonRow>
										</ZIonGrid>
									</ZIonCol>
								</ZIonRow>
							</ZIonGrid>
						</ZIonCol>
						<ZIonCol
							sizeXl=''
							sizeLg=''
							sizeMd='10'
							sizeSm='12'
							sizeXs='12'
							className='py-4 me-4'
							style={{ backgroundColor: '#fff' }}
						>
							<ZIonGrid>
								<ZIonRow>
									<ZIonCol size='12'>
										<ZIonImg
											src={ProductLogo}
											style={{ height: '60px' }}
										></ZIonImg>
										<div className='mx-auto' style={{ width: '94%' }}>
											<hr style={{ borderColor: '#999999' }} />
										</div>
									</ZIonCol>
									<ZIonCol size='11.4' className='mx-auto'>
										<ZIonText>
											Create, customize, manage and track QR Codes and links
											without leaving the {PRODUCT_NAME} Connections Platform.
										</ZIonText>
									</ZIonCol>
									<ZIonCol size='11.4' className='mx-auto mt-3'>
										<ZIonButton expand='block' color='tertiary'>
											Get Started
										</ZIonButton>
									</ZIonCol>
									<ZIonCol size='11.4' className='mx-auto mt-3'>
										<ZIonText className='font-bold'>Popular Features:</ZIonText>

										<ZIonGrid className='mt-3 pt-1'>
											<ZIonRow>
												<ZIonCol size='1.3' className='me-1 ps-0'>
													<ZIonImg
														src={generateQrCode}
														style={{ height: '50px' }}
													/>
												</ZIonCol>
												<ZIonCol size='10.5'>
													<ZIonText>
														Generate a QR Code for any {PRODUCT_NAME} link that
														scans directly to a web page
													</ZIonText>
												</ZIonCol>
											</ZIonRow>
											<ZIonRow className='mt-2 pt-1'>
												<ZIonCol size='1.3' className='me-1 ps-0'>
													<ZIonImg
														src={customizeColorQr}
														style={{ height: '50px' }}
													/>
												</ZIonCol>
												<ZIonCol size='10.5'>
													<ZIonText>
														Customize the color of the QR Code to match your
														brand elements
													</ZIonText>
												</ZIonCol>
											</ZIonRow>
											<ZIonRow className='mt-2 pt-1'>
												<ZIonCol size='1.3' className='me-1 ps-0'>
													<ZIonImg
														src={printedMaterial}
														style={{ height: '50px' }}
													/>
												</ZIonCol>
												<ZIonCol size='10.5'>
													<ZIonText>
														Extend the life of printed materials by redirecting
														links to updated content
													</ZIonText>
												</ZIonCol>
											</ZIonRow>
											<ZIonRow className='mt-2 pt-1'>
												<ZIonCol size='1.3' className='me-1 ps-0'>
													<ZIonImg
														src={analizeCampaigns2}
														style={{ height: '50px' }}
													/>
												</ZIonCol>
												<ZIonCol size='10.5'>
													<ZIonText>
														Track QR Code performance across channels, like
														email and social, to understand the customer journey
													</ZIonText>
												</ZIonCol>
											</ZIonRow>
										</ZIonGrid>
									</ZIonCol>
								</ZIonRow>
							</ZIonGrid>
						</ZIonCol>
						<ZIonCol
							sizeXl='1'
							sizeLg='1'
							sizeMd='0'
							sizeSm='0'
							sizeXs='0'
						></ZIonCol>
					</ZIonRow>
				</ZIonGrid>

				<ZaionsHPUsersFeedBack />

				<ZaionsInpageBrandsList
					title={`The most recognized brands in the world love ${PRODUCT_NAME}`}
					className='pb-3'
				/>
				<div className='pb-5 mb-1'></div>

				{/* Page Footer */}
				<InPageFooter btnText='Start for free' />
			</ZIonContent>
		</ZaionsIonPage>
	);
};

export default ZaionsQRCode;
