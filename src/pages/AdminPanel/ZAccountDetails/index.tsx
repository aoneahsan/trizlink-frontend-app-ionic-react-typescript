/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { IonProgressBar } from '@ionic/react';
import { useRecoilState } from 'recoil';
import classNames from 'classnames';
import { Formik } from 'formik';
import ReactSelect from 'react-select';
import { useMediaQuery } from 'react-responsive';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZaionsIonPage from '@/components/ZaionsIonPage';
import ZLinkDashboardTopBar from '@/components/UserDashboard/ZLinkdashboard/ZLDashboardTopbar';
import ZLinkIonPanelSidebar from '@/components/UserDashboard/ZLinkdashboard/ZLDashboardSidePanel/index';
import ZaionsLinkSettingPanel from '@/components/UserDashboard/ZLinkdashboard/ZLinksSettingPanel';
import {
	ZIonCol,
	ZIonText,
	ZIonItem,
	ZIonRow,
	ZIonGrid,
	ZIonContent,
	ZIonSplitPane,
	ZIonList,
	ZIonTitle,
	ZIonInput,
	ZIonNote,
} from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS, {
	BRACKPOINT_LG,
	BRACKPOINT_MD,
	BRACKPOINT_SM,
	PRODUCT_NAME,
} from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import classes from './styles.module.css';
import { formatDataForZaionsRSelectOptions } from '@/utils/helpers';
import { PAGE_MENU } from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	ZLinkIonPanelSettingsSidebarActiveLinkType,
	ZLinkIonPanelSidebarActiveLinkType,
} from '@/types/AdminPanel/linksType';
import { UserAccountEmailType } from '@/types/UserAccount/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { ZaionsUserAccountEmails } from '@/ZaionsStore/UserAccount/index.recoil';
import { useZIonToastDanger } from '@/ZaionsHooks/zionic-hooks';
import { ZIonButton } from '@/components/ZIonComponents';

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
 * ? Like if you have a type for props it should be pleace Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZAccountDetails: React.FC = () => {
	const [AccountDetailsState, setAccountDetailsState] = useState<{
		userAccountNameEditState: boolean;
		userPrimaryEmailEditState: boolean;
	}>({
		userAccountNameEditState: false,
		userPrimaryEmailEditState: false,
	});

	const [userAccountEmails, setUserAccountEmials] = useRecoilState<
		UserAccountEmailType[] | null
	>(ZaionsUserAccountEmails);

	const setPrimaryEmail = (id: string) => {
		setUserAccountEmials(
			(oldEmails) =>
				oldEmails &&
				oldEmails.map((email) =>
					email.id === id
						? { ...email, isPrimary: true }
						: { ...email, isPrimary: false }
				)
		);
	};

	// Medias Query
	const isLgScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_LG})`,
	});

	const isMdScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_MD})`,
	});

	const isSmScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_SM})`,
	});
	const { presentZIonToastDanger } = useZIonToastDanger();
	return (
		<>
			<ZaionsIonPage
				pageTitle='Setting'
				id={CONSTANTS.MENU_IDS.DASHBOARD_SM_MENU_CONTENT_ID}
				// if it in lg then the menu will appear
				menu={!isLgScale ? PAGE_MENU.DASHBOARD_PAGE_MENU : undefined}
			>
				<ZIonSplitPane
					when='lg'
					contentId={CONSTANTS.DEFAULT_VALUES.ZAIONS_DASHBOARD_SPLIT_PANEL}
				>
					{/* Side Bar */}
					<ZLinkIonPanelSidebar
						activeLink={ZLinkIonPanelSidebarActiveLinkType.settings}
					/>

					<div
						className='ion-page zaionsPaneContent'
						id={CONSTANTS.DEFAULT_VALUES.ZAIONS_DASHBOARD_SPLIT_PANEL}
					>
						{/* Top bar */}
						<ZLinkDashboardTopBar />
						<ZIonContent className='ion-padding-vertical ion-paddind-end'>
							<ZIonGrid className='me-1'>
								<ZIonRow>
									{/* If it is in md then the setting side panel will be visiable */}
									{isMdScale && (
										<ZaionsLinkSettingPanel
											activeLink={
												ZLinkIonPanelSettingsSidebarActiveLinkType.accountDetails
											}
										/>
									)}

									<ZIonCol
										className={classNames({
											'ps-4 ms-3': isMdScale,
											'px-0': !isSmScale,
										})}
									>
										<ZIonRow className='pb-3 border-bottom'>
											<ZIonCol
												className={classNames({
													'ion-text-center': !isMdScale,
													'px-0': !isSmScale,
												})}
											>
												<ZIonText>
													<h2 className='font-black'>Account details</h2>
												</ZIonText>
											</ZIonCol>
											{isMdScale && (
												<ZIonCol className='ion-text-end'>
													<ZIonButton className='ion-text-capitalize zaions__fs_18'>
														Upgrade
													</ZIonButton>
												</ZIonCol>
											)}
										</ZIonRow>

										<ZIonRow className='mt-4'>
											<ZIonCol
												className={classNames(classes.account_detail__name, {
													'ion-padding rounded zaions__medium_set': true,
													'mx-auto mb-1': !isMdScale,
												})}
												sizeXl='3.9'
												sizeLg='3.9'
												sizeMd='3.9'
												sizeSm='6.2'
												sizeXs='12'
											>
												<ZIonTitle className='ion-padding ion-text-center'>
													<h2 className='ion-text-uppercase '>
														Free <br /> Account
													</h2>
												</ZIonTitle>
											</ZIonCol>
											<ZIonCol
												size='4.4'
												sizeLg='4.4'
												sizeMd='4.4'
												sizeSm='6'
												sizeXs='9'
												className={classNames({
													'ms-5': isMdScale,
													'ms-0 ps-0': !isMdScale,
												})}
											>
												<ZIonText className='block font-bold'>
													You have all of these Free features:
												</ZIonText>
												<ZIonText
													className={classNames({
														'mt-3': true,
														block: isMdScale,
														'd-inline': !isMdScale,
													})}
												>
													50 Links
												</ZIonText>
												<ZIonText
													className={classNames({
														block: isMdScale,
														'd-inline ms-4': !isMdScale,
													})}
												>
													1 User
												</ZIonText>
											</ZIonCol>
											<ZIonCol
												className={classNames({
													'ion-text-end': true,
													'pe-0': !isMdScale,
												})}
											>
												<ZIonButton
													fill='clear'
													className={classNames({
														'ion-text-capitalize zaions__fs_16': true,
														'ion-no-padding ion-no-margin': !isMdScale,
													})}
													routerLink=''
												>
													Manage
												</ZIonButton>
											</ZIonCol>
										</ZIonRow>

										<ZIonRow className='mt-3'>
											{!AccountDetailsState.userAccountNameEditState ? (
												<ZIonCol>
													<ZIonList>
														<ZIonItem className='ion-no-padding'>
															<ZIonText
																className={classNames({
																	'mx-auto font-bold': !isMdScale,
																	'mx-auto': !isSmScale,
																})}
															>
																Account name
															</ZIonText>
														</ZIonItem>
														<ZIonItem className='ion-no-padding'>
															<ZIonRow className='w-full ion-align-items-center ion-no-padding'>
																<ZIonCol
																	sizeXl=''
																	sizeLg=''
																	sizeMd=''
																	sizeSm=''
																	sizeXs='12'
																	className={classNames({
																		'ion-no-padding': true,
																		'pt-2 ion-text-center': !isSmScale,
																	})}
																>
																	<ZIonText>talhairshad</ZIonText>
																</ZIonCol>
																<ZIonCol
																	sizeXl=''
																	sizeLg=''
																	sizeMd=''
																	sizeSm=''
																	sizeXs='12'
																	className={classNames({
																		'ion-no-padding': true,
																		'pt-2 ion-text-center': !isSmScale,
																	})}
																>
																	<ZIonText>Member since Sep 18, 2022</ZIonText>
																</ZIonCol>
																<ZIonCol
																	className={classNames({
																		'ion-no-padding': true,
																		'ion-text-center': !isSmScale,
																		'ion-text-end': isSmScale,
																	})}
																	sizeXl=''
																	sizeLg=''
																	sizeMd=''
																	sizeSm=''
																	sizeXs='12'
																>
																	<ZIonButton
																		fill='clear'
																		className='ion-text-capitalize zaions__fs_16 ion-no-padding'
																		onClick={() =>
																			setAccountDetailsState((oldVals) => ({
																				...oldVals,
																				userAccountNameEditState: true,
																			}))
																		}
																	>
																		Edit Name
																	</ZIonButton>
																</ZIonCol>
															</ZIonRow>
														</ZIonItem>
													</ZIonList>
												</ZIonCol>
											) : (
												<ZIonCol
													sizeXl='7'
													sizeLg='12'
													sizeMd='12'
													sizeSm='12'
													sizeXs='12'
													className={classNames({
														'ion-align-items-center': true,
														'my-3 flex': isMdScale,
														'my-0 px-0 border-bottom pb-3': !isMdScale,
													})}
												>
													<ZIonInput
														className={classNames({
															zaions__w70: isMdScale,
															'w-full mb-2': !isMdScale,
														})}
														placeholder='User Name'
														label='Account Name'
														labelPlacement='floating'
														helperText='Member since Sep 18, 2022'
													/>

													<ZIonButton
														className={classNames({
															'ion-no-margin ion-text-capitalize': true,
															'ms-3': isMdScale,
															'ms-0': !isSmScale,
														})}
														onClick={() => {
															setAccountDetailsState((oldVals) => ({
																...oldVals,
																userAccountNameEditState: false,
															}));

															void presentZIonToastDanger(
																`User Account Deleted`
															);
														}}
														expand={!isMdScale ? 'block' : undefined}
													>
														Save Change
													</ZIonButton>
												</ZIonCol>
											)}
										</ZIonRow>

										<ZIonRow>
											{!AccountDetailsState.userPrimaryEmailEditState ? (
												<ZIonCol>
													<ZIonList className=''>
														<ZIonItem className='ion-no-padding '>
															<ZIonRow
																className={classNames({
																	'pb-2': true,
																	'ion-text-center mt-3': !isMdScale,
																	'mb-2': !isSmScale,
																})}
															>
																<ZIonCol size='12' className='ion-no-padding'>
																	<ZIonText
																		className={classNames({
																			block: true,
																			'mb-2': !isSmScale,
																			'font-bold': !isMdScale,
																		})}
																	>
																		Account notifications
																	</ZIonText>
																</ZIonCol>
																<ZIonCol size='12' className='ion-no-padding'>
																	<ZIonText className='block'>
																		Select which verified email address you
																		would like to use to receive notifications
																		for your accounts.
																	</ZIonText>
																</ZIonCol>
															</ZIonRow>
														</ZIonItem>
														<ZIonItem className='ion-no-padding'>
															<ZIonRow className='w-full ion-align-items-center ion-no-padding'>
																<ZIonCol
																	className={classNames({
																		'ion-no-padding': true,
																		'mt-2 ion-text-center': !isSmScale,
																	})}
																	sizeXl=''
																	sizeLg=''
																	sizeMd=''
																	sizeSm=''
																	sizeXs='12'
																>
																	<ZIonText>
																		{(userAccountEmails &&
																			{
																				...userAccountEmails.filter(
																					(el) => el.isPrimary
																				),
																			}[0].emailAddress) ||
																			''}
																	</ZIonText>
																</ZIonCol>
																<ZIonCol
																	className={classNames({
																		'ion-no-padding': true,
																		'ion-text-end': isSmScale,
																		'ion-text-center': !isSmScale,
																	})}
																>
																	<ZIonButton
																		fill='clear'
																		className='ion-text-capitalize zaions__fs_16 ion-no-padding'
																		onClick={() =>
																			setAccountDetailsState((oldVals) => ({
																				...oldVals,
																				userPrimaryEmailEditState: true,
																			}))
																		}
																	>
																		Change Notification email
																	</ZIonButton>
																</ZIonCol>
															</ZIonRow>
														</ZIonItem>
													</ZIonList>
												</ZIonCol>
											) : (
												<Formik
													initialValues={{
														primaryEmail: (userAccountEmails &&
															{
																...userAccountEmails
																	.filter((el) => el.isPrimary === true)
																	.map((el) => ({
																		value: el.id,
																		label: el.emailAddress,
																	})),
															}[0]) || { value: '', label: '' },
													}}
													onSubmit={(values) => {
														try {
															if (values.primaryEmail.value) {
																setPrimaryEmail(values.primaryEmail.value);
																setAccountDetailsState((oldVals) => ({
																	...oldVals,
																	userPrimaryEmailEditState: false,
																}));
															}
														} catch (error) {
															console.error({
																log: 'From Pages - AdminPanel - ZAccountDetails - index line # 479',
																error,
															});
														}
													}}
												>
													{({ submitForm, setFieldValue, setFieldTouched }) => {
														return (
															<>
																<ZIonCol
																	sizeXl='4.6'
																	sizeLg='6.6'
																	sizeMd='12'
																	sizeSm='12'
																	sizeXs='12'
																	className={classNames({
																		'ion-align-items-end my-3': true,
																		flex: isMdScale,
																		'border-bottom pb-3 mb-0': !isMdScale,
																	})}
																>
																	<ReactSelect
																		options={formatDataForZaionsRSelectOptions(
																			userAccountEmails,
																			'id',
																			'emailAddress'
																		)}
																		className={classNames({
																			zaions__w80: isMdScale,
																			'w-full mb-3': !isMdScale,
																		})}
																		name='primaryEmail'
																		onChange={(val) => {
																			setFieldTouched(
																				'primaryEmail',
																				true,
																				false
																			);
																			setFieldValue('primaryEmail', val, true);
																		}}
																		// defaultInputValue={values.primaryEmail.value}
																		// inputValue={values.primaryEmail.value}
																		// defaultValue={values.primaryEmail.value}
																	/>
																	{/* </ZIonItem> */}
																	<ZIonButton
																		onClick={() => void submitForm()}
																		className={classNames({
																			'ion-no-margin ion-text-capitalize': true,
																			'ms-3': isMdScale,
																			'ms-0': !isMdScale,
																		})}
																		expand={!isLgScale ? 'block' : undefined}
																	>
																		Save Change
																	</ZIonButton>
																</ZIonCol>
															</>
														);
													}}
												</Formik>
											)}
										</ZIonRow>

										<ZIonRow>
											<ZIonCol size='12'>
												<ZIonList className=''>
													<ZIonItem className='ion-no-padding'>
														<ZIonText
															className={classNames({
																'mx-auto font-bold': !isMdScale,
															})}
														>
															Monthly usage
														</ZIonText>
													</ZIonItem>

													{/* Short Links */}
													<ZIonItem className='ion-no-padding'>
														<ZIonRow className='w-full ion-align-items-center ion-no-padding'>
															<ZIonCol
																className={classNames({
																	'ion-no-padding': true,
																	'ion-text-center mt-2': !isMdScale,
																})}
																sizeXl=''
																sizeLg=''
																sizeMd=''
																sizeSm='12'
																sizeXs='12'
															>
																<ZIonText
																	className={classNames({
																		'font-bold': !isMdScale,
																	})}
																>
																	Short links
																</ZIonText>
																<ZIonText className='ms-2 ion-hide-md-up'>
																	( 0 / 50 )
																</ZIonText>
															</ZIonCol>
															<ZIonCol
																sizeXl='5'
																sizeLg='5.8'
																sizeMd='5.8'
																sizeSm='12'
																sizeXs='12'
																className={classNames({
																	'ion-no-padding flex ion-align-items-center':
																		true,
																	'ion-justify-content-center mt-3 mb-2':
																		!isMdScale,
																})}
															>
																<IonProgressBar
																	className={classNames({
																		'inline-block me-2': true,
																		zaions__w80: isMdScale || !isSmScale,
																		zaions__w90: !isMdScale && isSmScale,
																	})}
																/>{' '}
																<ZIonText className='ion-hide-md-down'>
																	0 / 50
																</ZIonText>
															</ZIonCol>
															<ZIonCol
																sizeXl=''
																sizeLg=''
																sizeMd=''
																sizeSm='12'
																sizeXs='12'
																className={classNames({
																	'ion-no-padding': true,
																	'ion-text-end': isMdScale,
																	'ion-text-center': !isMdScale,
																})}
															>
																<ZIonButton
																	fill='clear'
																	className='ion-text-capitalize zaions__fs_16 ion-no-padding'
																	routerLink=''
																>
																	Need more?
																</ZIonButton>
															</ZIonCol>
														</ZIonRow>
													</ZIonItem>

													{/* Custom back-halves */}
													<ZIonItem className='ion-no-padding'>
														<ZIonRow className='w-full ion-align-items-center ion-no-padding'>
															<ZIonCol
																className={classNames({
																	'ion-no-padding': true,
																	'ion-text-center mt-2': !isMdScale,
																})}
																sizeXl=''
																sizeLg=''
																sizeMd=''
																sizeSm='12'
																sizeXs='12'
															>
																<ZIonText
																	className={classNames({
																		'font-bold': !isMdScale,
																	})}
																>
																	Custom back-halves
																</ZIonText>
																<ZIonText className='ms-2 ion-hide-md-up'>
																	( 0 / 50 )
																</ZIonText>
															</ZIonCol>
															<ZIonCol
																sizeXl='5'
																sizeLg='5.8'
																sizeMd='5.8'
																sizeSm='12'
																sizeXs='12'
																className={classNames({
																	'ion-no-padding flex ion-align-items-center':
																		true,
																	'ion-justify-content-center mt-3 mb-2':
																		!isMdScale,
																})}
															>
																<IonProgressBar
																	className={classNames({
																		'inline-block me-2': true,
																		zaions__w80: isMdScale || !isSmScale,
																		zaions__w90: !isMdScale && isSmScale,
																	})}
																/>{' '}
																<ZIonText className='ms-2 ion-hide-md-down'>
																	0 / 50
																</ZIonText>
															</ZIonCol>
															<ZIonCol
																sizeXl=''
																sizeLg=''
																sizeMd=''
																sizeSm='12'
																sizeXs='12'
																className={classNames({
																	'ion-no-padding': true,
																	'ion-text-end': isMdScale,
																	'ion-text-center': !isMdScale,
																})}
															>
																<ZIonButton
																	fill='clear'
																	className='ion-text-capitalize zaions__fs_16 ion-no-padding'
																	routerLink=''
																>
																	Need more?
																</ZIonButton>
															</ZIonCol>
														</ZIonRow>
													</ZIonItem>

													{/* zlink link redirects */}
													<ZIonItem className='ion-no-padding'>
														<ZIonRow className='w-full ion-align-items-center ion-no-padding'>
															<ZIonCol
																className={classNames({
																	'ion-no-padding': true,
																	'ion-text-center mt-2': !isMdScale,
																})}
																sizeXl=''
																sizeLg=''
																sizeMd=''
																sizeSm='12'
																sizeXs='12'
															>
																<ZIonText
																	className={classNames({
																		'font-bold': !isMdScale,
																	})}
																>
																	{PRODUCT_NAME} link redirects
																</ZIonText>{' '}
																<ZIonText className='ion-hide-md-up'>
																	( 0 / 0 )
																</ZIonText>
															</ZIonCol>
															<ZIonCol
																sizeXl='5'
																sizeLg='5.8'
																sizeMd='5.8'
																sizeSm='12'
																sizeXs='12'
																className={classNames({
																	'ion-no-padding flex ion-align-items-center':
																		true,
																	'ion-justify-content-center mt-3 mb-2':
																		!isMdScale,
																})}
															>
																<IonProgressBar
																	className={classNames({
																		'inline-block me-2': true,
																		zaions__w80: isMdScale || !isSmScale,
																		zaions__w90: !isMdScale && isSmScale,
																	})}
																/>{' '}
																<ZIonText className='ms-2 ion-hide-md-down'>
																	0 / 0
																</ZIonText>
															</ZIonCol>
															<ZIonCol
																sizeXl=''
																sizeLg=''
																sizeMd=''
																sizeSm='12'
																sizeXs='12'
																className={classNames({
																	'ion-no-padding': true,
																	'ion-text-end': isMdScale,
																	'ion-text-center': !isMdScale,
																})}
															>
																<ZIonButton
																	fill='clear'
																	className='ion-text-capitalize zaions__fs_16 ion-no-padding'
																	routerLink=''
																>
																	Need more?
																</ZIonButton>
															</ZIonCol>
														</ZIonRow>
													</ZIonItem>

													{/* Custom link redirects */}
													<ZIonItem className='ion-no-padding'>
														<ZIonRow className='w-full ion-align-items-center ion-no-padding'>
															<ZIonCol
																className={classNames({
																	'ion-no-padding': true,
																	'ion-text-center mt-2': !isMdScale,
																})}
																sizeXl=''
																sizeLg=''
																sizeMd=''
																sizeSm='12'
																sizeXs='12'
															>
																<ZIonText
																	className={classNames({
																		'font-bold': !isMdScale,
																	})}
																>
																	Custom link redirects
																</ZIonText>
																<ZIonText className='ms-2 ion-hide-md-up'>
																	( 0 / 0 )
																</ZIonText>
															</ZIonCol>
															<ZIonCol
																sizeXl='5'
																sizeLg='5.8'
																sizeMd='5.8'
																sizeSm='12'
																sizeXs='12'
																className={classNames({
																	'ion-no-padding flex ion-align-items-center':
																		true,
																	'ion-justify-content-center mt-3 mb-2':
																		!isMdScale,
																})}
															>
																<IonProgressBar
																	className={classNames({
																		'inline-block me-2': true,
																		zaions__w80: isMdScale || !isSmScale,
																		zaions__w90: !isMdScale && isSmScale,
																	})}
																/>{' '}
																<ZIonText className='ion-hide-md-down'>
																	0 / 0
																</ZIonText>
															</ZIonCol>
															<ZIonCol
																sizeXl=''
																sizeLg=''
																sizeMd=''
																sizeSm='12'
																sizeXs='12'
																className={classNames({
																	'ion-no-padding': true,
																	'ion-text-end': isMdScale,
																	'ion-text-center': !isMdScale,
																})}
															>
																<ZIonButton
																	fill='clear'
																	className='ion-text-capitalize zaions__fs_16 ion-no-padding'
																	routerLink=''
																>
																	Need more?
																</ZIonButton>
															</ZIonCol>
														</ZIonRow>
													</ZIonItem>
												</ZIonList>
											</ZIonCol>
										</ZIonRow>
									</ZIonCol>
								</ZIonRow>
							</ZIonGrid>
						</ZIonContent>
					</div>
				</ZIonSplitPane>
			</ZaionsIonPage>
		</>
	);
};

export default ZAccountDetails;
