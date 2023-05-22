/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { Formik } from 'formik';
import {
	ZIonButton,
	ZIonCard,
	ZIonCardContent,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonHeader,
	ZIonIcon,
	ZIonImg,
	ZIonRow,
	ZIonSegment,
	ZIonSegmentButton,
	ZIonText,
} from '@/components/ZIonComponents';
import {
	addCircleOutline,
	closeCircle,
	closeOutline,
	documentOutline,
	ellipse,
} from 'ionicons/icons';
import { workspacePagesDomeData } from '@/data/UserDashboard/Workspace/index.data';
import { getPlatformIcon } from '@/utils/helpers';
import {
	workspaceFormConnectPagesCardEnum,
	workspaceFormConnectPagesEnum,
} from '@/types/AdminPanel/workspace';
import { CardsByType } from '@/data/UserDashboard/Workspace/ConnectPagesTab/index.data';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import ZWorkspaceMockupPageModal from '../MockupPageModal';
import { SingleCard } from '@/components/WorkspacesComponents/SingleCard';
import { ProductLogo } from '@/assets/images';
import classNames from 'classnames';

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

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZWorkspaceCreatePageModal: React.FC<{
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({ dismissZIonModal }) => {
	return (
		<Formik
			initialValues={{
				pageType: workspaceFormConnectPagesEnum.facebook,
				pageId: '0',
			}}
			validate={() => {
				const errors = {};

				return errors;
			}}
			onSubmit={() => {}}
		>
			{({ values, setFieldValue }) => {
				// getting the cards accounting to pageType
				const { cards, color, logo } = CardsByType[values.pageType];

				const { presentZIonModal: presentZWorkspaceMockupPageModal } =
					useZIonModal(ZWorkspaceMockupPageModal, {
						pageType: values.pageType,
						color: color,
						logo: logo,
					});

				//
				return (
					<>
						<ZIonHeader>
							<ZIonGrid className='w-full'>
								{/*  */}
								<ZIonRow className='ion-align-items-center'>
									{/*  */}
									<ZIonCol className='flex ion-align-items-center' size='12'>
										{/*  */}
										<div className='ms-2 text-xl w-[64%] ion-text-end'>
											<ZIonText className='block font-bold'>
												Add pages to Talha
											</ZIonText>
										</div>

										<ZIonButton
											fill='clear'
											onClick={() => {
												dismissZIonModal();
											}}
											className='ms-auto'
										>
											<ZIonIcon
												icon={closeOutline}
												className='w-6 h-6'
												color='dark'
											/>
										</ZIonButton>
									</ZIonCol>

									{/*  */}
									<ZIonCol>
										<ZIonSegment
											scrollable={true}
											value={values.pageId}
											className='zaions_pretty_scrollbar'
										>
											{workspacePagesDomeData.map((el, index) => (
												<ZIonSegmentButton
													className='px-1 text-transform-initial'
													value={String(index)}
													onClick={() => {
														setFieldValue('pageType', el.type, false);
														setFieldValue('pageId', index, false);
													}}
													style={{
														'--padding-end': '9px',
														'--padding-start': '9px',
													}}
													key={index}
												>
													<ZIonIcon
														icon={getPlatformIcon(el.type)}
														className='mb-2 w-7 h-7'
													/>
													<ZIonText className='pb-2 text-xs'>
														{el.pageName}
													</ZIonText>
												</ZIonSegmentButton>
											))}
										</ZIonSegment>
									</ZIonCol>
								</ZIonRow>
							</ZIonGrid>
						</ZIonHeader>

						<ZIonContent>
							<ZIonGrid>
								<ZIonRow className='flex flex-wrap h-full ion-align-items-center'>
									{/*  */}
									{values.pageType !==
										workspaceFormConnectPagesEnum.universalContent &&
										cards.map((card, index) => {
											return (
												<ZIonCol
													sizeXl='3.5'
													sizeLg='4'
													sizeMd='5'
													sizeSm='6'
													sizeXs='12'
													key={index}
													className='h-[170px]'
												>
													<SingleCard
														icon={card.cardIcon}
														title={card.title}
														showInfoIcon={card.showInfoIcon}
														infoCardItems={card.infoItems}
														onClick={() => {
															card.type ===
																workspaceFormConnectPagesCardEnum.mockup &&
																presentZWorkspaceMockupPageModal({
																	_cssClass:
																		'workspace-connect-pages-modal-size',
																});
														}}
													/>
												</ZIonCol>
											);
										})}

									{values.pageType ===
										workspaceFormConnectPagesEnum.universalContent && (
										<ZIonCol
											sizeXl='3.5'
											sizeLg='4'
											sizeMd='5'
											sizeSm='6'
											sizeXs='12'
											className='h-[170px]'
										>
											<SingleCard
												icon={documentOutline}
												title={'Create a page for universal content'}
												showInfoIcon={false}
												onClick={() => {
													presentZWorkspaceMockupPageModal({
														_cssClass: 'workspace-connect-pages-modal-size',
													});
												}}
											/>
										</ZIonCol>
									)}
								</ZIonRow>

								<ZIonRow className='flex flex-wrap h-full ion-align-items-center mt-7 pt-4 border-t-[1px]'>
									<ZIonCol size='12'>
										<ZIonText
											className='flex ion-align-items-center gap-2 text-sm ion-text-uppercase'
											color='medium'
										>
											<ZIonIcon icon={ellipse} color='success' /> Connected
											Pages
										</ZIonText>
									</ZIonCol>

									{/*  */}
									<ZIonCol
										sizeXs='12'
										sizeSm='6'
										sizeMd='5'
										sizeLg='4'
										sizeXl='3.5'
										className='h-[11rem]'
									>
										<ZIonCard className='h-[94%]'>
											<ZIonCardContent className='pb-3 ion-text-center ion-no-padding ion-padding-horizontal py-1'>
												<div className='w-full flex ion-align-items-center ion-justify-content-between'>
													<ZIonButton
														className='ion-no-padding ion-no-margin'
														fill='default'
													>
														<ZIonIcon
															icon={addCircleOutline}
															className='w-7 h-7'
														/>
													</ZIonButton>
													<ZIonButton
														className='ion-no-padding ion-no-margin'
														fill='default'
													>
														<ZIonIcon
															icon={closeCircle}
															color='danger'
															className='w-7 h-7'
														/>
													</ZIonButton>
												</div>

												{/*  */}
												<ZIonImg
													src={ProductLogo}
													className='w-10 h-10 mx-auto'
												/>
												{/*  */}
												<ZIonText className='mt-1 ion-text-center block'>
													zaions
												</ZIonText>

												{/*  */}
												<ZIonText
													className={classNames({
														'ion-text-center block zaions__fs_13 text-muted':
															true,
													})}
												>
													@zaions
												</ZIonText>

												{/*  */}
												<ZIonText
													className={classNames({
														'ion-text-center block zaions__fs_13 text-muted ion-text-uppercase pt-2':
															true,
													})}
												>
													Mockup page
												</ZIonText>

												{/* Navigation buttons */}
												{/* <ConnectPagesCardSwiperButtons /> */}
												{/*  */}
											</ZIonCardContent>
										</ZIonCard>
									</ZIonCol>
								</ZIonRow>
							</ZIonGrid>
						</ZIonContent>
					</>
				);
			}}
		</Formik>
	);
};

export default ZWorkspaceCreatePageModal;
