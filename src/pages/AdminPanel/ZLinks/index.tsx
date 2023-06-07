/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { IonChip, IonRadio, IonRadioGroup } from '@ionic/react';

import {
	bookmarkOutline,
	calendarClearOutline,
	closeOutline,
	copyOutline,
	ellipsisHorizontal,
	ellipsisVertical,
	eyeOutline,
	lockClosed,
	logoTwitter,
	optionsOutline,
	pencilOutline,
	pricetagOutline,
	returnDownForwardOutline,
	statsChart,
	statsChartOutline,
	trashOutline,
} from 'ionicons/icons';
import { useRecoilState, useRecoilValue } from 'recoil';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZaionsIonPage from '@/components/ZaionsIonPage';
import ZLinkIonPanelSidebar from '@/components/UserDashboard/ZLinkdashboard/ZLDashboardSidePanel/index';
import ZLinkDashboardTopBar from '@/components/UserDashboard/ZLinkdashboard/ZLDashboardTopbar';

import {
	ZIonCol,
	ZIonText,
	ZIonRouterLink,
	ZIonItem,
	ZIonRow,
	ZIonGrid,
	ZIonContent,
	ZIonSplitPane,
	ZIonList,
	ZIonTitle,
	ZIonLabel,
	ZIonImg,
	ZIonIcon,
	ZIonCheckbox,
} from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import { PAGE_MENU } from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	LinkTargetType,
	ZLinkIonPanelSidebarActiveLinkType,
} from '@/types/AdminPanel/linksType';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { ShortLinksRStateAtom } from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkState.recoil';
import { SelectedShortLinkData } from '@/ZaionsStore/UserDashboard/ShortLinks/SelectedShortLinkData.recoil';

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
import classes from './styles.module.css';

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */
import { placeholderImage, qrCodeImage } from '@/assets/images';
import { useZIonModal, useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import { ZIonButton } from '@/components/ZIonComponents';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import ZaionsDashboardFiltersModal from '@/components/InPageComponents/ZaionsModals/DashboardFiltersModal.tsx';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be place Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const DashboardLinkEditPopoverContent: React.FC = () => {
	return (
		<>
			<ZIonList lines='none'>
				<ZIonItem>
					<ZIonIcon icon={eyeOutline} className={'me-2'} /> Hide
				</ZIonItem>
				<ZIonItem>
					<ZIonIcon icon={trashOutline} className={'me-2'} /> Delete
				</ZIonItem>
			</ZIonList>
		</>
	);
};

const DashboardLinkCopyPopoverContent: React.FC = () => {
	return (
		<>
			<ZIonList lines='none'>
				<ZIonItem>
					<ZIonIcon icon={pricetagOutline} className={'me-2'} /> Tag
				</ZIonItem>
				<ZIonItem>
					<ZIonIcon icon={logoTwitter} className={'me-2'} /> Tweet
				</ZIonItem>
			</ZIonList>
		</>
	);
};

const ZLinks: React.FC = () => {
	const [isChartVisible, setIsChartVisible] = useState<boolean>(false);

	const [selectedShortLinkData, setSelectedShortLinkData] = useRecoilState(
		SelectedShortLinkData
	);
	const shortLinksRStateAtom = useRecoilValue(ShortLinksRStateAtom);

	const { presentZIonPopover: presentCopyIonPopover } = useZIonPopover(
		DashboardLinkCopyPopoverContent
	);
	const { presentZIonPopover: presentEditIonPopover } = useZIonPopover(
		DashboardLinkEditPopoverContent
	);

	const getShortLinkData = (id: string | undefined) => {
		const updatedShortLinkData = shortLinksRStateAtom?.find(
			(el) => el.id === id
		);
		setSelectedShortLinkData({ ...updatedShortLinkData });
	};

	const { presentZIonModal: presentDashboardFiltersModal } = useZIonModal(
		ZaionsDashboardFiltersModal
	);

	return (
		<>
			<ZaionsIonPage
				pageTitle='Dashboard'
				id={CONSTANTS.MENU_IDS.DASHBOARD_SM_MENU_CONTENT_ID}
				menu={PAGE_MENU.DASHBOARD_PAGE_MENU}
			>
				<>
					<ZIonSplitPane
						when='lg'
						contentId={CONSTANTS.DEFAULT_VALUES.ZAIONS_DASHBOARD_SPLIT_PANEL}
					>
						{/* Side Bar */}
						<ZLinkIonPanelSidebar
							activeLink={ZLinkIonPanelSidebarActiveLinkType.links}
						/>

						<div
							className='ion-page zaionsPaneContent'
							id={CONSTANTS.DEFAULT_VALUES.ZAIONS_DASHBOARD_SPLIT_PANEL}
						>
							<ZLinkDashboardTopBar />
							<ZIonContent className='ion-padding-top '>
								<ZIonGrid className='mb-1 ion-padding-start'>
									<ZIonRow>
										<ZIonCol>
											<ZIonTitle className='ion-no-padding'>
												<h3 className='font-bolder'>Links</h3>
											</ZIonTitle>
											<IonRadioGroup value='strawberries'>
												<ZIonList lines='none' className='flex '>
													<ZIonItem>
														<IonRadio
															value='grapes'
															className='me-2'
														></IonRadio>
														<ZIonLabel>Date created</ZIonLabel>
													</ZIonItem>
													<ZIonItem>
														<IonRadio
															value='grapesss'
															className='me-2'
														></IonRadio>
														<ZIonLabel>Top performing</ZIonLabel>
													</ZIonItem>
												</ZIonList>
											</IonRadioGroup>
											<ZIonButton
												className='ion-text-capitalize'
												onClick={() =>
													presentDashboardFiltersModal({
														_cssClass: 'dashboard-filter-modal-size',
													})
												}
											>
												<ZIonIcon icon={optionsOutline} className='me-2' />
												Filters
											</ZIonButton>
											<ZIonButton
												className='ion-text-capitalize ms-4'
												onClick={() => {
													// Show Chart
													setIsChartVisible(!isChartVisible);
												}}
												fill='outline'
											>
												<ZIonIcon icon={statsChart} className='me-2' />
												{isChartVisible ? 'Hide ' : 'Show '}
												chart
											</ZIonButton>
										</ZIonCol>
										<ZIonCol></ZIonCol>
									</ZIonRow>
								</ZIonGrid>

								{isChartVisible && (
									<ZIonGrid className='ion-padding'>
										<ZIonTitle className='ion-text-center'>
											<h1>Don't worry! Chart goes here later...</h1>
										</ZIonTitle>
									</ZIonGrid>
								)}

								<ZIonGrid
									className={classNames(classes.zaionsEngagements, {
										'border-top ion-no-padding zaions__light_set': true,
									})}
								>
									<ZIonRow
										className={classNames(classes.zaionsEngagementsContent)}
									>
										<ZIonCol
											sizeXl='3.7'
											sizeLg='3.7'
											sizeMd='12'
											sizeXs='12'
											sizeSm='12'
											className='border-end'
										>
											<ZIonText className='ion-text-end border-bottom block py-3 pe-4'>
												Engagements all time
											</ZIonText>
											<ZIonList className='pt-0 zaions__light_set'>
												{shortLinksRStateAtom?.map((el) => {
													return (
														<ZIonItem
															className={classNames({
																'ion-no-padding zaions__cursor_pointer': true,
																zaions__bg_white:
																	el.id === selectedShortLinkData.id,
															})}
															color={
																el.id !== selectedShortLinkData.id
																	? 'light'
																	: undefined
															}
															key={el.id}
															onClick={() => getShortLinkData(el.id)}
														>
															<ZIonRow className='w-full py-3'>
																<ZIonCol className='ion-text-end'>
																	<ZIonCheckbox className='ms-auto me-2' />
																</ZIonCol>
																<ZIonCol size='8'>
																	<ZIonText className='block zaions__fs_11'>
																		{el.createdAt || CONSTANTS.NO_VALUE_FOUND}
																	</ZIonText>
																	<ZIonText className='block mb-1'>
																		{el.title || CONSTANTS.NO_VALUE_FOUND}
																	</ZIonText>
																	<ZIonText
																		className='block zaions__fs_13'
																		color='success'
																	>
																		{(el.target as LinkTargetType)?.url ||
																			(el.target as LinkTargetType)
																				?.accountId ||
																			(el.target as LinkTargetType)?.email ||
																			(el.target as LinkTargetType)?.username ||
																			(el.target as LinkTargetType)
																				?.phoneNumber ||
																			CONSTANTS.NO_VALUE_FOUND}
																	</ZIonText>
																</ZIonCol>
																<ZIonCol className='flex flex-col ion-justify-content-between ion-align-items-end'>
																	<ZIonText>
																		<ZIonIcon icon={bookmarkOutline} />
																	</ZIonText>
																	<ZIonText>
																		4 <ZIonIcon icon={statsChartOutline} />
																	</ZIonText>
																</ZIonCol>
															</ZIonRow>
														</ZIonItem>
													);
												})}
											</ZIonList>
										</ZIonCol>
										<ZIonCol sizeXl='8' className='pb-4 ps-5 pe-3'>
											<ZIonRow className='rounded zaions__bg_white py-4 px-4 mt-3'>
												<ZIonCol sizeXl='8'>
													<ZIonText>
														<h4 className='font-bold'>
															{selectedShortLinkData.title ||
																CONSTANTS.NO_VALUE_FOUND}
														</h4>
													</ZIonText>
													<ZIonText className='flex ion-align-items-center mt-2'>
														<ZIonIcon
															icon={calendarClearOutline}
															className='pe-1'
														/>
														<ZIonText>
															{selectedShortLinkData.createdAt ||
																CONSTANTS.NO_VALUE_FOUND}{' '}
															by talhairshad
														</ZIonText>
													</ZIonText>
													<ZIonText className='block mt-3'>
														<ZIonIcon icon={statsChart} className='pe-1' />
														<ZIonText>3 Total engagements</ZIonText>
													</ZIonText>
												</ZIonCol>
												<ZIonCol sizeXl='4' className='ion-text-end'>
													<ZIonButton
														className={classNames(classes.button__shadow_none, {
															'me-2 ion-text-capitalize': true,
														})}
														color='light'
														size='small'
													>
														<ZIonIcon icon={pencilOutline} className='me-1' />
														<ZIonText>Edit</ZIonText>
													</ZIonButton>
													<ZIonButton
														fill='outline'
														color='dark'
														size='small'
														className='ion-no-padding'
														onClick={(event: unknown) => {
															presentEditIonPopover({
																_event: event as Event,
															});
														}}
													>
														<ZIonIcon icon={ellipsisVertical} />
													</ZIonButton>
												</ZIonCol>
											</ZIonRow>

											<ZIonRow className='rounded zaions__bg_white py-4 px-4 mt-4'>
												<ZIonCol sizeXl='8'>
													<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
														<h4 className='font-bold'>
															{(selectedShortLinkData.target as LinkTargetType)
																?.url ||
																(selectedShortLinkData.target as LinkTargetType)
																	?.accountId ||
																(selectedShortLinkData.target as LinkTargetType)
																	?.email ||
																(selectedShortLinkData.target as LinkTargetType)
																	?.username ||
																(selectedShortLinkData.target as LinkTargetType)
																	?.phoneNumber ||
																CONSTANTS.NO_VALUE_FOUND}
														</h4>
													</ZIonRouterLink>
													<ZIonText className='flex ion-align-items-center mt-2'>
														<ZIonText>
															<ZIonText className='font-bold'>
																{selectedShortLinkData.totalClicks}
															</ZIonText>{' '}
															clicks
														</ZIonText>
													</ZIonText>
												</ZIonCol>
												<ZIonCol sizeXl='4' className='ion-text-end'>
													<ZIonButton
														className={classNames(classes.button__shadow_none, {
															'me-2 ion-text-capitalize': true,
														})}
														color='light'
														size='small'
													>
														<ZIonIcon icon={copyOutline} className='me-1' />
														<ZIonText>Copy</ZIonText>
													</ZIonButton>
													<ZIonButton
														fill='outline'
														color='dark'
														size='small'
														className='ion-no-padding'
														onClick={(event: unknown) => {
															presentCopyIonPopover({
																_event: event as Event,
															});
														}}
													>
														<ZIonIcon icon={ellipsisVertical} />
													</ZIonButton>
												</ZIonCol>

												<ZIonCol size='12'>
													<ZIonText className='mt-3 ps-0'>
														<ZIonIcon
															icon={returnDownForwardOutline}
															className='text-base'
														/>
														3
														https://github.com/MuhmmadTalhaIrshad/health_tech?utm_source...
													</ZIonText>
													<ZIonButton
														fill='clear'
														className='ion-text-capitalize ion-no-padding ms-3'
														color='dark'
														disabled
													>
														<ZIonIcon icon={lockClosed} className='text-base' />
														Redirect
													</ZIonButton>
												</ZIonCol>

												<ZIonCol className='mt-3' size='12'>
													<ZIonRow>
														<ZIonCol>
															<ZIonText className='block'>
																<h5 className='font-bold'>QR Code</h5>
															</ZIonText>
															<div className='flex'>
																<ZIonImg
																	src={qrCodeImage}
																	className='zaions__w35'
																/>
																<div className='pt-2 ms-3'>
																	<ZIonButton
																		className='ion-text-capitalize'
																		fill='outline'
																		color='medium'
																	>
																		<ZIonIcon
																			icon={statsChart}
																			className='text-base me-1'
																		/>
																		View details
																	</ZIonButton>
																	<ZIonButton
																		className='ion-text-capitalize'
																		fill='outline'
																		color='medium'
																	>
																		<ZIonIcon
																			icon={ellipsisHorizontal}
																			className='text-base'
																		/>
																	</ZIonButton>
																	<ZIonText className='block mt-3'>
																		<ZIonText className='font-bold'>0</ZIonText>
																		scans
																	</ZIonText>
																</div>
															</div>
														</ZIonCol>
														<ZIonCol className='ms-2'>
															<ZIonText className='block'>
																<h5 className='font-bold'>Link-in-bio</h5>
															</ZIonText>
															<div className='flex'>
																<ZIonImg
																	src={placeholderImage}
																	className='zaions__w35 rounded-full'
																/>
																<div className='pt-2 ms-3'>
																	<ZIonButton
																		className='ion-text-capitalize'
																		fill='outline'
																		color='medium'
																	>
																		Create a Link-in-bio
																	</ZIonButton>
																</div>
															</div>
														</ZIonCol>
													</ZIonRow>
												</ZIonCol>

												<ZIonCol className='flex ion-align-items-center mt-3 ms-2'>
													<ZIonIcon
														className='text-lg me-3'
														icon={pricetagOutline}
													/>
													<IonChip className='ion-no-padding px-2'>
														health_tech <ZIonIcon icon={closeOutline} />
													</IonChip>
													<IonChip className='ion-no-padding px-2'>
														MTI <ZIonIcon icon={closeOutline} />
													</IonChip>
													<ZIonButton fill='clear' className='ion-no-padding'>
														<ZIonIcon
															className='text-lg ms-3'
															icon={pencilOutline}
															color='dark'
														/>
													</ZIonButton>
												</ZIonCol>
											</ZIonRow>

											<ZIonRow className='rounded zaions__bg_white py-4 px-4 mt-4'>
												<ZIonCol className='' size='12'>
													<ZIonText>
														<h2 className='font-bold d-inline'>3</h2>
														<ZIonIcon
															icon={statsChart}
															className='mt-2 pt-1 ms-1'
														/>
													</ZIonText>
												</ZIonCol>
												<ZIonText className='block zaions__fs_13'>
													TOTAL ENGAGEMENTS
												</ZIonText>
											</ZIonRow>
										</ZIonCol>
									</ZIonRow>
								</ZIonGrid>

								{/* Popovers */}
							</ZIonContent>
						</div>
					</ZIonSplitPane>
				</>
			</ZaionsIonPage>
		</>
	);
};

export default ZLinks;
