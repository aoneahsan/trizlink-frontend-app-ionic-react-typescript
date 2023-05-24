/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { Formik } from 'formik';
import {
	chatbubbleEllipsesOutline,
	checkmarkCircleOutline,
	checkmarkOutline,
	ellipsisHorizontalOutline,
	eyeOffOutline,
	fileTrayFullOutline,
	logoFacebook,
	menuOutline,
	pencil,
	refreshOutline,
	searchOutline,
	timeOutline,
} from 'ionicons/icons';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZUserAvatarButton from '@/components/WorkspacesComponents/UserButton';
import {
	ZIonButton,
	ZIonButtons,
	ZIonCard,
	ZIonCardContent,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonHeader,
	ZIonIcon,
	ZIonImg,
	ZIonInput,
	ZIonRow,
	ZIonSegment,
	ZIonSegmentButton,
	ZIonSelect,
	ZIonSelectOption,
	ZIonText,
	ZIonToolbar,
} from '@/components/ZIonComponents';
import ZWorkspaceCommentBox from '@/components/WorkspacesComponents/CommentBox';
import ZWorkspaceSingleComment from '@/components/WorkspacesComponents/SingleComment';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */
import { gifIcon, imageIcon, mediaIcon, thumbnailIcon } from '@/assets/images';
import { workspacePostDetailTabEnum } from '@/types/AdminPanel/workspace';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZWorkspacePostDetailModal: React.FC = () => {
	const { isLgScale, isXlScale } = useZMediaQueryScale();

	return (
		<Formik
			initialValues={{
				modalTab: workspacePostDetailTabEnum.desktop,
			}}
			onSubmit={() => {}}
		>
			{({ values, setFieldValue }) => {
				return (
					<>
						<ZIonHeader>
							<ZIonToolbar className='px-2'>
								<ZIonRow>
									{/* Title and userInfo button */}
									<ZIonCol className='flex ion-align-items-center ion-justify-content-between'>
										{isLgScale && (
											<div className='flex ion-align-items-center'>
												<ZIonIcon icon={logoFacebook} className='w-9 h-9' />
												<ZIonText className='text-sm ms-2'>zaions</ZIonText>
											</div>
										)}

										<div className=''>
											<ZUserAvatarButton className='w-[24px!important] h-[24px!important]' />
										</div>
									</ZIonCol>

									{/*  */}
									<ZIonCol
										sizeXl='4'
										sizeLg='4'
										sizeMd='5'
										sizeSm='5'
										sizeXs='5'
									>
										<ZIonSegment
											value={values.modalTab}
											className={classNames({
												'mx-auto': true,
												'w-[50%]': isXlScale,
												'w-full': !isXlScale,
											})}
										>
											<ZIonSegmentButton
												value={workspacePostDetailTabEnum.desktop}
												className='text-transform-initial'
												onClick={() => {
													setFieldValue(
														'modalTab',
														workspacePostDetailTabEnum.desktop,
														false
													);
												}}
											>
												Desktop
											</ZIonSegmentButton>
											<ZIonSegmentButton
												value={workspacePostDetailTabEnum.mobile}
												className='text-transform-initial'
												onClick={() => {
													setFieldValue(
														'modalTab',
														workspacePostDetailTabEnum.mobile,
														false
													);
												}}
											>
												Mobile
											</ZIonSegmentButton>
										</ZIonSegment>
									</ZIonCol>

									{/*  */}
									<ZIonCol className='flex ion-align-items-center ion-justify-content-end'>
										<ZIonButton className='text-transform-initial me-3'>
											Share
										</ZIonButton>

										<ZIonButtons>
											<ZIonButton>
												<ZIonIcon icon={eyeOffOutline} />
											</ZIonButton>

											<ZIonButton>
												<ZIonIcon icon={refreshOutline} />
											</ZIonButton>

											<ZIonButton>
												<ZIonIcon icon={fileTrayFullOutline} />
											</ZIonButton>

											<ZIonButton>
												<ZIonIcon icon={ellipsisHorizontalOutline} />
											</ZIonButton>
										</ZIonButtons>
									</ZIonCol>
								</ZIonRow>
							</ZIonToolbar>
						</ZIonHeader>

						{/*  */}
						<ZIonContent color='light'>
							<ZIonGrid>
								<ZIonRow
									className={classNames({
										'ion-justify-content-center': !isLgScale,
									})}
								>
									{/* approved & published col */}
									{isLgScale && (
										<ZIonCol>
											<div
												className={classNames({
													'flex ion-align-items-center': true,
													'w-[90%] ion-justify-content-end': isXlScale,
													'w-full flex-col-reverse': !isXlScale,
												})}
											>
												<ZIonText>Not approved yet</ZIonText>
												<ZIonButton className='overflow-hidden rounded-full ms-2 ion-no-padding w-9 h-9'>
													<ZIonIcon icon={checkmarkOutline} />
												</ZIonButton>
											</div>

											<div
												className={classNames({
													'flex ion-align-items-center mt-7': true,
													'w-[90%] ion-justify-content-end ': isXlScale,
													'w-full flex-col-reverse': !isXlScale,
												})}
											>
												{/* <ZIonText>Not approved yet</ZIonText> */}
												<ZIonButton className='overflow-hidden rounded-full ms-2 ion-no-padding w-9 h-9'>
													<ZIonIcon icon={logoFacebook} />
												</ZIonButton>
											</div>
										</ZIonCol>
									)}

									{/* desktop & mobile view col */}
									<ZIonCol
										sizeXl='6'
										sizeLg='6'
										sizeMd='8'
										sizeSm='9.5'
										sizeXs='11.7'
										className='h-[650px]'
									>
										{values.modalTab === workspacePostDetailTabEnum.desktop && (
											<CardView type={workspacePostDetailTabEnum.desktop} />
										)}

										{values.modalTab === workspacePostDetailTabEnum.mobile && (
											<div className='relative'>
												{/* Mobile svg */}
												<svg
													width='500px'
													height='600px'
													viewBox='0 0 353 718'
													version='1.1'
													fill='none'
													stroke='none'
													stroke-width='1'
													className='absolute mx-auto left-1/2 translate-x-[-50%]'
												>
													<path
														d='M353,52.1 C353,23.3 329.7,0 300.9,0 L52.1,0 C23.3,7.10542736e-15 0,23.3 0,52.1 L0,665.9 C0,694.7 23.3,718 52.1,718 L300.9,718 C329.7,718 353,694.7 353,665.9 L353,52.1 Z M345,665.4 C345,690 325,710 300.4,710 L51.6,710 C27,710 7,690 7,665.4 L7,51.6 C7,27 27,7 51.6,7 L300.4,7 C325,7 345,27 345,51.6 L345,665.4 Z'
														fill='#e4e4e4'
														fill-rule='nonzero'
													/>
													<path d='M301.9,19 L273.4,19 C267.3,19 265.1,18.9 264.7,26.6 C264.3,34.6 258.8,39.1 251.4,41.4 C248.9,42.2 246.1,42 243.4,42 L238,42 L117.2,42 L111.8,42 C109.1,42 106.3,42.3 103.8,41.5 C96.4,39.2 90.8,34.5 90.5,26.5 C90.1,18.8 87.9,19 81.8,19 L53,19 C35.4,19 22,33 22,50.5 L22,663.8 C22,681.3 35.4,695 52.9,695 L301.9,695 C319.4,695 334,681.2 334,663.8 L334,50.5 C334,33 319.4,19 301.9,19 Z' />
													<path
														d='M345,51.6 C345,27 325,7 300.4,7 L51.6,7 C27,7 7,27 7,51.6 L7,665.4 C7,690 27,710 51.6,710 L300.4,710 C325,710 345,690 345,665.4 L345,51.6 Z M217.7,24.1 C217.7,26.5 215.7,28.5 213.3,28.5 C210.9,28.5 208.9,26.5 208.9,24.1 C208.9,21.7 210.9,19.7 213.3,19.7 C215.8,19.8 217.7,21.7 217.7,24.1 Z M158.2,22 L197.2,22 C198.9,22 200.2,23 200.2,24.5 C200.2,26 198.9,27 197.2,27 L158.2,27 C156.5,27 155.2,26 155.2,24.5 C155.2,23 156.6,22 158.2,22 Z M334,663.8 C334,681.3 319.4,695 301.9,695 L52.9,695 C35.4,695 22,681.2 22,663.8 L22,50.5 C22,33 35.4,19 52.9,19 L81.7,19 C87.8,19 90,18.9 90.4,26.6 C90.8,34.6 96.3,39.1 103.7,41.4 C106.2,42.2 109,42 111.7,42 L117.1,42 L237.8,42 L243.2,42 C245.9,42 248.7,42.3 251.2,41.5 C258.6,39.2 264.2,34.5 264.5,26.5 C264.9,18.8 267.1,19 273.2,19 L301.7,19 C319.2,19 333.8,33 333.8,50.5 L333.8,663.8 L334,663.8 Z'
														fill='#e4e4e4'
														fill-rule='nonzero'
													/>
												</svg>

												<CardView
													className='w-[45%!important] absolute left-1/2 top-[3rem] translate-x-[-50%]'
													type={workspacePostDetailTabEnum.mobile}
												/>
											</div>
										)}
									</ZIonCol>

									{/* sidebar */}
									{isLgScale && (
										<ZIonCol>
											<ZIonToolbar>
												<ZIonSegment value='Desktop' className='mx-auto '>
													<ZIonSegmentButton
														value='Desktop'
														className='text-transform-initial'
													>
														Comments
													</ZIonSegmentButton>
													<ZIonSegmentButton
														value='Mobile'
														className='text-transform-initial'
													>
														Activity
													</ZIonSegmentButton>
												</ZIonSegment>
											</ZIonToolbar>

											<div className='max-h-[27.1rem] overflow-y-scroll zaions_pretty_scrollbar pe-2'>
												<ZWorkspaceCommentBox className='mt-3 border' />

												<div className='flex px-2 mt-4 ion-align-items-center ion-justify-content-between'>
													<ZIonSelect
														interface='popover'
														fill='outline'
														label=''
														minHeight='30px'
														value='newest'
														className='w-[43%] ion-text-start text-sm'
													>
														<ZIonSelectOption value='newest'>
															Newest
														</ZIonSelectOption>
														<ZIonSelectOption value='oldest'>
															Oldest
														</ZIonSelectOption>
													</ZIonSelect>

													{/*  */}
													<div className='flex ion-align-items-center'>
														<ZIonButton
															fill='clear'
															color='dark'
															className='ion-no-padding ion-no-margin me-2'
														>
															<ZIonIcon icon={searchOutline} />
														</ZIonButton>

														<ZIonButton
															fill='clear'
															color='dark'
															className='text-xs ion-no-padding ion-no-margin text-transform-initial'
														>
															Show resolved
														</ZIonButton>
													</div>
												</div>

												<div className='w-full px-2 mt-2'>
													<ZIonInput
														label=''
														fill='outline'
														placeholder='Search Comments...'
														minHeight='30px'
														className='text-sm'
													/>
												</div>

												<div className='h-full px-2 py-1 mt-5'>
													<ZWorkspaceSingleComment
														avatarWidth='w-[40px!important]'
														avatarHeight='h-[31px!important]'
													/>
												</div>
											</div>
										</ZIonCol>
									)}

									{/* Comments, Approval, Schedule */}
									{!isLgScale && (
										<ZIonCol size='12' className=''>
											<ZIonRow className='bg-white border'>
												<ZIonCol className='ion-no-padding'>
													<ZIonButton
														className='ion-no-padding ion-no-margin text-transform-initial'
														expand='block'
														size='small'
														fill='clear'
													>
														<ZIonIcon
															icon={checkmarkCircleOutline}
															className='me-2'
														/>
													</ZIonButton>
												</ZIonCol>

												<ZIonCol className='ion-no-padding ion-no-margin'>
													<ZIonButton
														className='ion-no-padding ion-no-margin text-transform-initial'
														expand='block'
														size='small'
														fill='clear'
													>
														<ZIonIcon
															icon={chatbubbleEllipsesOutline}
															className='me-2'
														/>
														Comments
													</ZIonButton>
												</ZIonCol>

												<ZIonCol className='ion-no-padding ion-no-margin'>
													<ZIonButton
														className='ion-no-padding ion-no-margin text-transform-initial'
														expand='block'
														size='small'
														fill='clear'
													>
														<ZIonIcon icon={timeOutline} className='me-2' />{' '}
														Schedule
													</ZIonButton>
												</ZIonCol>
											</ZIonRow>

											{/* Comments row on smaller screen */}
											<ZIonRow className='bg-white border'>
												<ZIonCol size='12'>
													<ZWorkspaceSingleComment />
												</ZIonCol>
											</ZIonRow>
										</ZIonCol>
									)}
								</ZIonRow>
							</ZIonGrid>
						</ZIonContent>
					</>
				);
			}}
		</Formik>
	);
};

const CardView: React.FC<{
	className?: string;
	type?: workspacePostDetailTabEnum;
}> = ({ className, type }) => {
	const { isXlScale } = useZMediaQueryScale();

	return (
		<ZIonCard
			className={classNames(className, {
				'mx-auto': true,
				'w-[90%]': isXlScale,
				'w-full': !isXlScale,
			})}
		>
			<ZIonCardContent>
				<div className='flex ion-align-items-center'>
					{/* <ZUserAvatarButton
						className={classNames({
							'w-[30px!important] h-[30px!important]':
								type === workspacePostDetailTabEnum.mobile,
						})}
					/> */}
					<ZUserAvatarButton
						className={classNames({
							'w-[30px!important] h-[30px!important]':
								type === workspacePostDetailTabEnum.mobile,
						})}
					/>

					<div className='ms-2'>
						<ZIonText
							className={classNames({
								block: true,
								'font-bold': type === workspacePostDetailTabEnum.desktop,
								'text-xs': type === workspacePostDetailTabEnum.mobile,
							})}
							color='dark'
						>
							zaions
						</ZIonText>

						<ZIonText
							className={classNames({
								block: true,
								'text-xs': type === workspacePostDetailTabEnum.mobile,
							})}
						>
							Select data & time
						</ZIonText>
					</div>
				</div>

				<div
					className={classNames({
						'mt-1 leading-3': type === workspacePostDetailTabEnum.mobile,
						'mt-3': type === workspacePostDetailTabEnum.desktop,
					})}
				>
					<ZIonText
						color='dark'
						className={classNames({
							'text-xs': type === workspacePostDetailTabEnum.mobile,
						})}
					>
						There are several ways to make money with Facebook without exceeding
						the limit of 150 words. One way is to become an affiliate marketer
						and promote products on Facebook. Another way is to create and sell
						your own products or services on Facebook. You can also earn money
						by creating and selling Facebook apps or by offering social media
						management services to businesses. Additionally, you can earn money
						through Facebook ads by creating and running targeted ad campaigns
						for businesses. Finally, you can also earn money by joining Facebook
						groups and participating in paid surveys or by becoming a social
						media influencer and partnering with brands for sponsored posts
					</ZIonText>
				</div>

				<div
					className={classNames({
						'mt-4': type === workspacePostDetailTabEnum.desktop,
						'mt-1': type === workspacePostDetailTabEnum.mobile,
					})}
				>
					<ZIonButton className='text-transform-initial' size='small'>
						<ZIonIcon icon={pencil} className='me-2' /> Rewrite with AI
					</ZIonButton>

					<ZIonButton className='text-transform-initial' size='small'>
						<ZIonIcon icon={menuOutline} className='me-2' />
						Continue
					</ZIonButton>
				</div>

				<div
					className={classNames({
						'mt-4': type === workspacePostDetailTabEnum.desktop,
						'mt-1': type === workspacePostDetailTabEnum.mobile,
					})}
				>
					<ZIonButtons>
						<ZIonButton className='m-0'>
							<ZIonImg src={imageIcon} />
						</ZIonButton>
						<ZIonButton className='m-0'>
							<ZIonImg src={gifIcon} />
						</ZIonButton>
						<ZIonButton className='m-0'>
							<ZIonImg src={mediaIcon} />
						</ZIonButton>
						<ZIonButton className='m-0'>
							<ZIonImg src={thumbnailIcon} />
						</ZIonButton>
					</ZIonButtons>
				</div>
			</ZIonCardContent>
		</ZIonCard>
	);
};

export default ZWorkspacePostDetailModal;
