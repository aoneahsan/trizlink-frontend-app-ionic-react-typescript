// Core Imports
import React from 'react';

// Packages Imports
import { useRecoilValue } from 'recoil';
import { useMediaQuery } from 'react-responsive';

import classNames from 'classnames';

// Custom Imports
import ZaionsIonPage from '@/components/ZaionsIonPage';
import InPageFooter from '@/components/InPageFooter';
import ZaionsTopMenu from '@/navigation/TopMenu';
import ZaionsInpageHeader from '@/components/InPageComponents/ZaionsInpageHeader';
import {
	ZIonCol,
	ZIonText,
	ZIonRouterLink,
	ZIonRow,
	ZIonGrid,
	ZIonContent,
	ZIonImg,
} from '@/components/ZIonComponents';

// Global Imports
import CONSTANTS, {
	BRACKPOINT_LG,
	BRACKPOINT_MD,
	BRACKPOINT_XL,
	PRODUCT_NAME,
} from '@/utils/constants';

// Images
import { PlaceholderAvatar } from '@/assets/images';

// Types
import { ZaionsReviewType } from '@/types/Company/ReviewsPage/Review.type';

// Recoil States
import { ZaionsReviewState } from '@/ZaionsStore/CompanySection/Reviews/review.recoil';

// Styles
import classes from './styles.module.css';

const ZaionsReviews: React.FC = () => {
	const ReviewData = useRecoilValue<ZaionsReviewType[]>(ZaionsReviewState);
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
		<ZaionsIonPage pageTitle='Review Page'>
			<ZIonContent>
				<ZaionsTopMenu />
				<ZaionsInpageHeader
					title={
						<ZIonText style={{ lineHeight: !isMdScale ? '3rem' : '' }}>
							{PRODUCT_NAME} Reviews
						</ZIonText>
					}
					subTitle={
						<ZIonText>
							Interested in seeing what our customers are saying? See reviews on
							{PRODUCT_NAME} below.
						</ZIonText>
					}
					primaryBtnText='Get a Quote'
					isSecondaryBtn={false}
					className={classNames({
						'ps-5': isMdScale,
						[classes.zaions__review_bg]: isXlScale,
					})}
					bottomHr={false}
				/>

				<ZIonGrid className='mb-5 pb-4'>
					<ZIonRow>
						<ZIonCol
							sizeXl='9.6'
							sizeLg='10'
							sizeMd='11.6'
							sizeSm='12'
							sizeXs='12'
							className='mx-auto zaions__bg_gray'
						>
							<ZIonRow
								className={`${
									!isLgScale ? 'mx-1' : 'mx-5'
								} border my-0 py-4 px-3 zaions__bg_white`}
							>
								<ZIonCol size='12'>
									{ReviewData.map((el) => {
										return (
											<div key={el.id}>
												<ZIonRow className='pt-2'>
													<ZIonCol
														sizeXl='3'
														sizeLg='3.5'
														sizeMd='5'
														sizeSm='12'
														sizeXs='12'
														className={`${
															!isLgScale ? 'ion-text-center' : 'ion-text-left'
														}`}
													>
														<div className=''>
															<ZIonRouterLink
																routerLink={el.userLink}
																className={`${'flex'}  ${
																	!isLgScale ? 'ion-justify-content-center' : ''
																}`}
															>
																<ZIonImg
																	src={
																		el?.userAvater
																			? el.userAvater
																			: PlaceholderAvatar
																	}
																	className={`${classes.reviewAvater} ${
																		!isLgScale ? 'mx-auto w-full' : ''
																	}`}
																/>
															</ZIonRouterLink>
														</div>
														<div className='mt-2 ms-2'>
															<ZIonText>{el.userName}</ZIonText>
															<ZIonText
																className={` ${
																	!isLgScale
																		? 'w-full zaions__fs_15'
																		: 'zaions__w60 zaions__fs_11'
																}`}
															>
																{el?.userAbout}
															</ZIonText>
														</div>
													</ZIonCol>
													<ZIonCol className='flex'>
														<div className='my-auto'>
															<ZIonText>
																<h4>{el.title}</h4>
															</ZIonText>
															<div className='flex'>
																<ZIonImg
																	src={el.reviewStars}
																	style={{ width: '83px' }}
																/>

																<ZIonText className='ms-2 zaions__fs_15'>
																	{el.date}
																</ZIonText>
															</div>
															<div className='message fw-lighter mt-2 mb-2'>
																"{el.userMessage}"
															</div>
															<ZIonRouterLink
																routerLink={el.fullReviewLink}
																className='mt-2'
															>
																<ZIonText className={classes.reviewBtn}>
																	Read the full {PRODUCT_NAME} review
																</ZIonText>
															</ZIonRouterLink>
														</div>
													</ZIonCol>
												</ZIonRow>
												<hr className='m-0' />
											</div>
										);
									})}
								</ZIonCol>
							</ZIonRow>
						</ZIonCol>
					</ZIonRow>
					<div className='zaions__w80 mx-auto ion-text-end zaions__fs_11'>
						<ZIonRouterLink
							routerLink={CONSTANTS.ExternalURL.GenericExternalURL}
							color={'dark'}
						>
							{PRODUCT_NAME} reviews sourced by G2
						</ZIonRouterLink>
					</div>
				</ZIonGrid>

				<InPageFooter />
			</ZIonContent>
		</ZaionsIonPage>
	);
};

export default ZaionsReviews;
