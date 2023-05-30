/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { checkbox, closeCircleOutline, trashBinOutline } from 'ionicons/icons';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZaionsIonPage from '@/components/ZaionsIonPage';
import ZLinkIonPanelSidebar from '@/components/UserDashboard/ZLinkdashboard/ZLDashboardSidePanel/index';
import ZLinkDashboardTopBar from '@/components/UserDashboard/ZLinkdashboard/ZLDashboardTopbar';
import AddEmailModal from '@/components/InPageComponents/ZaionsModals/EmailModal';
import DeleteUserAccountModal from '@/components/InPageComponents/ZaionsModals/DeleteUserAccountModal';
import {
	ZTable,
	ZTableTHead,
	ZTableRow,
	ZTableHeadCol,
	ZTableTBody,
	ZTableRowCol,
} from '@/components/InPageComponents/ZaionsTable/table-styled-components.sc';
import ZaionsLinkSettingPanel from '@/components/UserDashboard/ZLinkdashboard/ZLinksSettingPanel';
import {
	ZIonCol,
	ZIonText,
	ZIonItem,
	ZIonRow,
	ZIonGrid,
	ZIonContent,
	ZIonSplitPane,
	ZIonTitle,
	ZIonInput,
	ZIonIcon,
	ZIonCheckbox,
	ZIonSelectOption,
} from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS, {
	BRACKPOINT_MD,
	BRACKPOINT_SM,
	PRODUCT_NAME,
} from '@/utils/constants';
import { PAGE_MENU } from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	ZLinkIonPanelSettingsSidebarActiveLinkType,
	ZLinkIonPanelSidebarActiveLinkType,
} from '@/types/AdminPanel/linksType';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { ZaionsCountryCodeRState } from '@/ZaionsStore/zaionsAppSettings.recoil';
import {
	ZaionsUserAccountEmails,
	ZaionsUserAccountRStateAtom,
} from '@/ZaionsStore/UserAccount/index.recoil';

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
import classes from './styles.module.css';
import { useZIonAlert, useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import { ZIonButton } from '@/components/ZIonComponents';
import ZIonSelect from '@/components/ZIonComponents/ZIonSelect';

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be place Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZProfile: React.FC = () => {
	const countryCode = useRecoilValue(ZaionsCountryCodeRState);
	const isMdScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_MD})`,
	});
	const isSmScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_SM})`,
	});

	const { presentZIonAlert } = useZIonAlert();
	const { presentZIonModal: presentEmailModal } = useZIonModal(AddEmailModal);
	const { presentZIonModal: presentUserAccountDeleteModal } = useZIonModal(
		DeleteUserAccountModal
	);
	const [UserAccountEmails, setUserAccountEmails] = useRecoilState(
		ZaionsUserAccountEmails
	);
	const [userAccountState] = useRecoilState(ZaionsUserAccountRStateAtom);

	const setToPrimary = (id: string) => {
		setUserAccountEmails(
			(oldVals) =>
				oldVals &&
				oldVals.map((email) =>
					email.id === id
						? { ...email, isPrimary: true }
						: { ...email, isPrimary: false }
				)
		);
	};

	const onDeleteEmail = async (id: string, email: string) => {
		await presentZIonAlert({
			header: `Delete Email`,
			subHeader: 'Remove email from user account.',
			message: 'Are you sure you want to delete this email account?',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
				},
				{
					text: 'Delete',
					role: 'danger',
					handler: () => {
						void removeEmailAccount(id);
					},
				},
			],
		});
	};

	const removeEmailAccount = (id: string) => {
		setUserAccountEmails(
			(oldVal) => oldVal && oldVal.filter((val) => val.id !== id)
		);
	};

	return (
		<>
			<ZaionsIonPage
				pageTitle='Dashboard'
				id={CONSTANTS.MENU_IDS.DASHBOARD_SM_MENU_CONTENT_ID}
				menu={PAGE_MENU.DASHBOARD_PAGE_MENU}
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
						<ZLinkDashboardTopBar />
						<ZIonContent
							className={classNames({
								'mx-3': true,
								'ion-padding': isMdScale,
							})}
							// scrollX={true}
						>
							<ZIonGrid>
								<ZIonRow>
									{/* If it is in md then the setting side panel will be visible */}
									{isMdScale && (
										<ZaionsLinkSettingPanel
											activeLink={
												ZLinkIonPanelSettingsSidebarActiveLinkType.profile
											}
										/>
									)}
									<ZIonCol>
										<ZIonRow
											className={classNames({
												'border-bottom  px-1': true,
												'pb-3': isMdScale,
												'pb-1': !isMdScale,
											})}
										>
											<ZIonTitle
												className={classNames({
													'ion-no-padding': true,
													'ion-text-center': !isMdScale,
												})}
											>
												<h2 className='font-black'>Profile</h2>
											</ZIonTitle>
										</ZIonRow>

										<ZIonRow className='py-4 px-1'>
											<ZIonCol size='12'>
												<ZIonTitle
													className={classNames({
														'ion-no-padding block': true,
														'ion-text-center pb-1': !isMdScale,
														'pb-3': isMdScale,
													})}
												>
													<h4 className='font-bold'>Preferences</h4>
												</ZIonTitle>
											</ZIonCol>
											<ZIonCol
												sizeXl='4'
												sizeLg='4.5'
												sizeMd='12'
												sizeSm='12'
												sizeXs='12'
											>
												<ZIonItem className='zaions_item_input_bb'>
													<ZIonInput
														type='text'
														label='Display Name'
														labelPlacement='floating'
														className='ion-padding'
														placeholder='username here'
														value={
															userAccountState && userAccountState.username
														}
													/>
												</ZIonItem>
												<div
													className={classNames({
														'zaions__cursor_nodrop mt-4 ': true,
														zaions__max_content: isMdScale,
													})}
												>
													<ZIonButton
														disabled
														expand={!isMdScale ? 'block' : undefined}
														className='ion-text-capitalize mt-0'
													>
														Update display name
													</ZIonButton>
												</div>
											</ZIonCol>
										</ZIonRow>

										<ZIonRow
											className={classNames({
												'mt-2': true,
												'ms-0': !isMdScale,
											})}
										>
											<ZIonCol
												size='12'
												className={classNames({
													'ion-text-center mt-2': !isMdScale,
												})}
											>
												<ZIonTitle className='ion-no-padding'>
													<h4 className='font-bold'>Email addresses</h4>
												</ZIonTitle>
												<ZIonText className='zaions__fs_18'>
													Select or add a new email address to receive
													notifications. Only verified emails can be designated
													as the primary email address, which is used to log in.
												</ZIonText>
											</ZIonCol>

											<ZIonCol
												size='12'
												className={classNames({
													'mt-3': true,
													'ion-no-padding': !isMdScale,
												})}
											>
												<ZTable>
													<ZTableTHead>
														<ZTableRow>
															<ZTableHeadCol>Email address</ZTableHeadCol>
															<ZTableHeadCol>Status</ZTableHeadCol>
															<ZTableHeadCol>Primary</ZTableHeadCol>
															<ZTableHeadCol></ZTableHeadCol>
														</ZTableRow>
													</ZTableTHead>
													<ZTableTBody>
														{UserAccountEmails &&
															UserAccountEmails.map((el) => (
																<ZTableRow key={el.id}>
																	<ZTableRowCol className='py-2'>
																		<ZIonText
																			color='dark'
																			className='mt-1 text-base'
																		>
																			{el.emailAddress}
																		</ZIonText>
																	</ZTableRowCol>
																	<ZTableRowCol className='mt-1 py-2 flex ion-text-items-center'>
																		{el.isVarified ? (
																			<>
																				<ZIonIcon
																					icon={checkbox}
																					color='success'
																					className='text-base pt-1 me-1'
																				/>{' '}
																				<ZIonText
																					color='dark'
																					className='text-base'
																				>
																					Verified
																				</ZIonText>
																			</>
																		) : (
																			<>
																				<ZIonIcon
																					icon={closeCircleOutline}
																					color='danger'
																					className='text-base pt-1 me-1'
																				/>{' '}
																				<ZIonText
																					color='dark'
																					className='text-base'
																				>
																					Not verified
																				</ZIonText>
																			</>
																		)}
																	</ZTableRowCol>
																	<ZTableRowCol className='py-2'>
																		<ZIonCheckbox
																			className='mt-1'
																			onClick={() => {
																				setToPrimary(el.id ? el.id : '');
																			}}
																			checked={el.isPrimary}
																			color='success'
																		/>
																	</ZTableRowCol>
																	<ZTableRowCol>
																		{!el.isPrimary && (
																			<ZIonButton
																				className='ion-no-padding'
																				fill='clear'
																				onClick={() => {
																					void onDeleteEmail(
																						el.id ? el.id : '',
																						el.emailAddress
																					);
																				}}
																			>
																				<ZIonIcon
																					icon={trashBinOutline}
																					color='danger'
																				/>
																			</ZIonButton>
																		)}
																	</ZTableRowCol>
																</ZTableRow>
															))}
													</ZTableTBody>
												</ZTable>
												<ZIonButton
													fill='outline'
													className='mt-4 ion-text-capitalize'
													color='tertiary'
													onClick={() =>
														presentEmailModal({
															_cssClass: classes.email_modal_size,
														})
													}
													expand={!isMdScale ? 'block' : undefined}
												>
													Add new email
												</ZIonButton>{' '}
												<br />
												<div
													className={classNames({
														zaions__cursor_nodrop: true,
														'zaions__max_content mt-3': isMdScale,
													})}
												>
													<ZIonButton
														disabled
														className='ion-text-capitalize mt-0'
														expand={!isMdScale ? 'block' : undefined}
													>
														Update primary email
													</ZIonButton>
												</div>
											</ZIonCol>
										</ZIonRow>

										<ZIonRow>
											<ZIonCol
												size='12'
												className={classNames({
													'px-1 mt-5': true,
													'ion-text-center': !isMdScale,
												})}
											>
												<ZIonTitle className='ion-no-padding'>
													<h4 className='font-black'>
														Security & authentication
													</h4>
												</ZIonTitle>
											</ZIonCol>

											<ZIonCol
												size='12'
												className={classNames({
													'mt-1': true,
													'ion-text-center': !isMdScale,
												})}
											>
												<ZIonTitle className='ion-no-padding'>
													<h5 className='font-bold'>Change password</h5>
												</ZIonTitle>
												<ZIonText className='zaions__fs_18'>
													You will be required to login after changing your
													password
												</ZIonText>
												<ZIonItem
													className={classNames({
														zaions__w35: isMdScale,
														'w-full mx-auto px-3 mt-2': !isMdScale,
														// w-full: !isSmScale,
													})}
												>
													<ZIonInput
														label='Current password'
														labelPlacement='floating'
													/>
												</ZIonItem>
												<ZIonItem
													className={classNames({
														'mt-4': true,
														zaions__w35: isMdScale,
														'w-full mx-auto px-3': !isMdScale,
													})}
												>
													<ZIonInput
														label='New password'
														labelPlacement='floating'
													/>
												</ZIonItem>
												<ZIonItem
													className={classNames({
														'mt-4': true,
														zaions__w35: isMdScale,
														'w-full mx-auto px-3': !isMdScale,
														// w-full: !isSmScale,
													})}
												>
													<ZIonInput
														label='Confirm new password'
														labelPlacement='floating'
													/>
												</ZIonItem>
												<ZIonButton
													color='tertiary'
													className={classNames({
														'ion-text-capitalize mt-4': true,
														'mx-3 mt-5': !isMdScale,
													})}
													expand={!isMdScale ? 'block' : undefined}
												>
													Change Password
												</ZIonButton>
											</ZIonCol>

											<ZIonCol
												size='12'
												className={classNames({
													'px-1 mt-5': true,
													'ion-text-center': !isMdScale,
												})}
											>
												<ZIonTitle className='ion-no-padding'>
													<h5 className='font-bold'>2-Factor authentication</h5>
												</ZIonTitle>
												<ZIonItem
													className={classNames({
														zaions__w35: isMdScale,
														'w-full mx-auto px-3 mt-2': !isMdScale,
													})}
												>
													<ZIonSelect
														interface='popover'
														label='Country Code'
														labelPlacement='floating'
													>
														{countryCode.map((el, key) => (
															<ZIonSelectOption key={key} value={el.dial_code}>
																{el.name} ({el.dial_code})
															</ZIonSelectOption>
														))}
													</ZIonSelect>
												</ZIonItem>

												<ZIonItem
													className={classNames({
														zaions__w35: isMdScale,
														'w-full mx-auto px-3 mt-2': !isMdScale,
														// w-full: !isSmScale,
													})}
												>
													<ZIonInput
														label='Mobile number'
														labelPlacement='floating'
													/>
												</ZIonItem>
												<ZIonButton
													color='tertiary'
													className={classNames({
														'ion-text-capitalize mt-4': true,
														'mx-3 mt-5': !isMdScale,
													})}
													expand={!isMdScale ? 'block' : undefined}
												>
													Send verification code
												</ZIonButton>
											</ZIonCol>

											<ZIonCol
												size='12'
												className={classNames({
													'mt-5': true,
													'ion-text-center': !isMdScale,
												})}
											>
												<ZIonTitle className='ion-no-padding'>
													<h4 className='font-black'>Access history</h4>
												</ZIonTitle>
												<ZIonText className='zaions__fs_18 block'>
													You're viewing recent activity on your account.
													Logging out will apply to all devices currently
													connected to {PRODUCT_NAME}.
												</ZIonText>

												<ZIonButton
													color='tertiary'
													className={classNames({
														'ion-text-capitalize mt-4': true,
														'mx-3 mt-5': !isMdScale,
													})}
													expand={!isMdScale ? 'block' : undefined}
												>
													Log out all sessions
												</ZIonButton>
											</ZIonCol>

											<ZIonCol size='12' className='mt-2'>
												{[1, 2, 3, 4, 5, 6, 7, 8].map((el) => (
													<ZIonRow key={el} className='border-bottom py-3'>
														<ZIonCol
															sizeXl='8'
															sizeLg='8'
															sizeMd='8'
															sizeSm='12'
															sizeXs='12'
														>
															<ZIonText className='font-bold block'>
																Log In With Google
															</ZIonText>
															<ZIonText className='block'>
																from 180.178.188.126 (SHARP TELECOM (PRIVATE)
																LIMITED) (Pakistan, Punjab, Lahore)
															</ZIonText>
														</ZIonCol>
														<ZIonCol
															className={classNames({
																'ion-text-end': isMdScale,
																'ion-text-start': isSmScale,
															})}
														>
															<ZIonText className='block'>
																December 31, 2022 2:18 PM GMT+5
															</ZIonText>
															<ZIonText className='block'>1 week ago</ZIonText>
														</ZIonCol>
													</ZIonRow>
												))}
											</ZIonCol>

											<ZIonCol
												size='12'
												className={classNames({
													'mt-5 border-bottom pb-5': true,
													'ion-text-center': !isMdScale,
												})}
											>
												<ZIonTitle className='ion-no-padding'>
													<h4 className='font-black'>SAR Report</h4>
												</ZIonTitle>
												<ZIonText className='zaions__fs_18 block'>
													Click to request a Subject Access Request (SAR) Report
													of all your Personal Information stored by{' '}
													{PRODUCT_NAME}. Once requested, in compliance with
													your local regulations, we will reply to your request
													via email.
												</ZIonText>

												<ZIonButton
													color='tertiary'
													className={classNames({
														'ion-text-capitalize mt-4': true,
														'mx-3 mt-5': !isMdScale,
													})}
													expand={!isMdScale ? 'block' : undefined}
												>
													Request report
												</ZIonButton>
											</ZIonCol>

											<ZIonCol size='12' className='pt-4'>
												<ZIonButton
													color='danger'
													className={classNames({
														'ion-text-capitalize mt-4': true,
														'mx-3 mt-0': !isMdScale,
													})}
													expand={!isMdScale ? 'block' : undefined}
													onClick={() =>
														presentUserAccountDeleteModal({
															_cssClass: classes.delete_account_modal_size,
														})
													}
												>
													delete account
												</ZIonButton>
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

export default ZProfile;
