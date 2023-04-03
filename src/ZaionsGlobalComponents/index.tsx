/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { IonAlert, IonLoading, IonToast } from '@ionic/react';
import { useRecoilValue } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

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
import {
	appWiseIonicAlertRStateAtom,
	appWiseIonicLoaderRStateAtom,
	appWiseIonicToastRStateAtom,
} from '@/ZaionsStore/AppRStates';
import CONSTANTS from '@/utils/constants';

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

const ZaionsGlobalComponent: React.FC = () => {
	const appWiseIonLoaderState = useRecoilValue(appWiseIonicLoaderRStateAtom);
	const appWiseIonAlertState = useRecoilValue(appWiseIonicAlertRStateAtom);
	const appWiseIonToastState = useRecoilValue(appWiseIonicToastRStateAtom);

	return (
		<>
			<IonLoading
				isOpen={appWiseIonLoaderState.showLoader}
				message={appWiseIonLoaderState.loaderProps.message}
				keyboardClose={appWiseIonLoaderState.loaderProps.keyboardClose}
				showBackdrop={appWiseIonLoaderState.loaderProps.showBackdrop}
			/>

			<IonAlert
				isOpen={appWiseIonAlertState.showAlert}
				header={appWiseIonAlertState.alertProps.header}
				subHeader={appWiseIonAlertState.alertProps.subHeader}
				message={appWiseIonAlertState.alertProps.message}
				buttons={appWiseIonAlertState.alertProps.buttons}
				keyboardClose={appWiseIonAlertState.alertProps.keyboardClose}
				backdropDismiss={appWiseIonAlertState.alertProps.backdropDismiss}
			/>

			<IonToast
				isOpen={appWiseIonToastState.showToast}
				message={appWiseIonToastState.message}
				color={appWiseIonToastState.color}
				position='bottom'
				animated={true}
				duration={CONSTANTS.ION_TOAST.TOAST_DURATION}
				keyboardClose={true}
			/>
		</>
	);
};

export default ZaionsGlobalComponent;
