/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { IonToolbar } from '@ionic/react';
import classNames from 'classnames';
import { caretDown, helpCircle, searchOutline } from 'ionicons/icons';
import { useMediaQuery } from 'react-responsive';
import { useRecoilState, useSetRecoilState } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import {
	ZIonCol,
	ZIonText,
	ZIonIcon,
	ZIonItem,
	ZIonInput,
	ZIonRow,
	ZIonList,
	ZIonGrid,
	ZIonImg,
	ZIonMenuButton,
} from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import ZaionsRoutes, {
	ZRoutesRedirects,
} from '@/utils/constants/RoutesConstants';
import classes from './styles.module.css';
import {
	BRACKPOINT_LG,
	BRACKPOINT_MD,
	BRACKPOINT_SM,
	LOCALSTORAGE_KEYS,
	PRODUCT_NAME,
} from '@/utils/constants';
import { API_URL_ENUM } from '@/utils/enums';
import {
	showZCapErrorDialogAlert,
	STORAGE,
	zAxiosApiRequest,
	zConsoleError,
} from '@/utils/helpers';
import { ZCustomError } from '@/utils/customErrorType';
import MESSAGES from '@/utils/messages';
import { showSuccessNotification } from '@/utils/notification';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { productSmLogo } from '@/assets/images';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import {
	ZaionsAuthTokenData,
	ZaionsUserAccountRStateAtom,
} from '@/ZaionsStore/UserAccount/index.recoil';
import { useZIonLoading, useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
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

const DashboardTopBarUserAccountModal: React.FC = ({
	zNavigatePushRoute,
}: {
	zNavigatePushRoute?: (_url: string) => void;
}) => {
	const [authTokenState, setAuthTokenState] =
		useRecoilState(ZaionsAuthTokenData);
	const setUserAccountStateAtom = useSetRecoilState(
		ZaionsUserAccountRStateAtom
	);
	const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();

	const signOutUser = async () => {
		try {
			await presentZIonLoader('Logging out. please wait a second.');
			if (authTokenState && authTokenState.token) {
				await zAxiosApiRequest({
					_url: API_URL_ENUM.logout,
					_method: 'post',
					_isAuthenticatedRequest: true,
				});

				// Removing UserData and AuthToken from Storage
				void STORAGE.REMOVE(LOCALSTORAGE_KEYS.USERDATA);
				void STORAGE.REMOVE(LOCALSTORAGE_KEYS.AUTHTOKEN);

				// Emptings recoil states of userTokeState and userAccountState
				setAuthTokenState(null);
				setUserAccountStateAtom(null);

				// Dismiss the ion loader
				await dismissZIonLoader();

				// If success then show the success notification.
				showSuccessNotification(MESSAGES.GENERAL.LOGOUT_SUCCESSFULLY);

				// Redirecting user to home page
				zNavigatePushRoute &&
					zNavigatePushRoute(ZRoutesRedirects.LOGOUT_USER_REDIRECT);
			} else {
				throw new ZCustomError();
			}
		} catch (error) {
			await dismissZIonLoader();
			showZCapErrorDialogAlert()
				.then()
				.catch((err: Error) => zConsoleError({ err }));
			// Redirecting user to home page
			zNavigatePushRoute &&
				zNavigatePushRoute(ZRoutesRedirects.LOGOUT_USER_REDIRECT);
		}
	};
	return (
		<>
			<ZIonList>
				<ZIonItem className='ion-no-padding'>
					<ZIonRow className='py-2 ion-align-items-top ion-padding-start ion-padding-end'>
						<ZIonCol size='2' className='ion-no-padding'>
							<ZIonImg
								src={productSmLogo}
								style={{
									minWidth: '100%',
									maxWidth: '100%',
								}}
								className='rounded-full me-2'
							/>
						</ZIonCol>
						<ZIonCol className='ion-no-padding ps-3'>
							<ZIonText className='block'>talhairshad</ZIonText>
							<ZIonText className='zaions__fs_14'>
								bhaiameer704@gmail.com
							</ZIonText>
						</ZIonCol>
					</ZIonRow>
				</ZIonItem>
				<ZIonItem className='ion-no-padding'>
					<ZIonRow className='w-full py-2 ion-align-items-top ion-padding-start'>
						<ZIonCol className='ion-no-padding ps-3'>
							<ZIonText className='block'>talhairshad</ZIonText>
							<ZIonText className='zaions__fs_14'>Free account</ZIonText>
						</ZIonCol>
						<ZIonCol className='ion-text-end'>
							<ZIonButton
								className='ion-text-capitalize ms-auto ion-no-margin'
								size='small'
							>
								upgrate
							</ZIonButton>
						</ZIonCol>
					</ZIonRow>
				</ZIonItem>
				<ZIonList lines='none' className='pb-0'>
					<ZIonItem routerLink={ZaionsRoutes.HomeRoute}>Support</ZIonItem>
					<ZIonItem routerLink={ZaionsRoutes.HomeRoute}>
						API documentation
					</ZIonItem>
					<ZIonItem routerLink={ZaionsRoutes.HomeRoute}>
						{PRODUCT_NAME} Terms
					</ZIonItem>
					<ZIonItem className='border-top'>
						<ZIonButton
							fill='clear'
							className='ion-no-padding ion-text-capitalize zaions__fs_15'
							mode='ios'
							color='dark'
							onClick={() => void signOutUser()}
						>
							Sign out
						</ZIonButton>
					</ZIonItem>
				</ZIonList>
			</ZIonList>
		</>
	);
};

const ZLinkDashboardTopBar: React.FC = () => {
	const { zNavigatePushRoute } = useZNavigate();
	const { presentZIonPopover } = useZIonPopover(
		DashboardTopBarUserAccountModal,
		{
			zNavigatePushRoute,
		}
	);
	const isLgScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_LG})`,
	});
	const isSmScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_SM})`,
	});
	const isMdScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_MD})`,
	});
	return (
		<>
			<IonToolbar>
				<ZIonGrid>
					<ZIonRow>
						<ZIonCol
							size='12'
							className='flex pb-2 ion-align-items-center ion-justify-content-end border-bottom'
						>
							{!isLgScale && (
								<ZIonMenuButton className='me-auto ms-2'></ZIonMenuButton>
							)}
							{isSmScale && (
								<ZIonItem
									className={classNames(classes.searchIonItem, {
										'border inline-block': true,
									})}
									lines='none'
								>
									<ZIonInput
										className='font-bold ion-no-padding'
										placeholder='Search...'
										label='🔍'
									/>
								</ZIonItem>
							)}
							<ZIonButton
								color='tertiary'
								routerLink=''
								className={classNames({
									'ion-text-capitalize my-0': true,
									'me-2 ms-3': isMdScale,
									'me-0 ms-1': !isMdScale,
								})}
								size={!isMdScale ? 'small' : 'default'}
							>
								Upgrade
							</ZIonButton>
							<ZIonButton
								fill='clear'
								color='dark'
								className={classNames({
									'ion-text-capitalize ion-no-padding my-0 me-0 ': true,
									'ms-2': isMdScale,
									'ms-1	': !isMdScale,
								})}
								size={!isMdScale ? 'small' : 'default'}
							>
								<ZIonIcon
									icon={helpCircle}
									style={{ fontSize: !isMdScale ? '2rem' : '2.5rem' }}
								/>
							</ZIonButton>
							<ZIonButton
								fill='clear'
								className={classNames({
									'ion-text-capitalize my-0': true,
									'me-2 ms-2': isMdScale,
									'me-0 ms-1 ion-no-padding': !isMdScale,
								})}
								color='dark'
								size={!isMdScale ? 'small' : 'default'}
								onClick={(event: unknown) => {
									presentZIonPopover({
										_event: event as Event,
										_cssClass: classNames({
											[classes.user_account_modal]: true,
										}),
									});
								}}
							>
								<ZIonImg
									src={productSmLogo}
									style={{
										minWidth: !isMdScale ? '20px' : '30px',
										maxWidth: !isMdScale ? '20px' : '30px',
									}}
									className='me-2'
								/>
								talhairshad
								<ZIonIcon
									icon={caretDown}
									size='small'
									className={classNames(classes.caretDownSm, {
										'ms-2': true,
									})}
								/>
							</ZIonButton>
						</ZIonCol>
					</ZIonRow>
				</ZIonGrid>
			</IonToolbar>
		</>
	);
};

export default ZLinkDashboardTopBar;
