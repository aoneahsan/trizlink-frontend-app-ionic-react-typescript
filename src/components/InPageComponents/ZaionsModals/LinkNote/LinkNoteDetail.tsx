// Core Imports
import React from 'react';
// Packages Import
import { toggleOutline } from 'ionicons/icons';
import { useRecoilValue } from 'recoil';

// Custom Imports
import {
	ZIonCol,
	ZIonRow,
	ZIonText,
	ZIonHeader,
	ZIonContent,
	ZIonIcon,
	ZIonFooter,
	ZIonGrid,
} from '@/components/ZIonComponents';

// Global Constants

// Images

// Recoil States
import { ZaionsAppSettingsRState } from '@/ZaionsStore/zaionsAppSettings.recoil';
import { ShortLinkFormState } from '@/ZaionsStore/FormStates/shortLinkFormState';
import { ZIonButton } from '@/components/ZIonComponents';

// Types

// Styles

const ZaionsLinkNoteDetailModal: React.FC<{
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({ dismissZIonModal }) => {
	const appSettings = useRecoilValue(ZaionsAppSettingsRState);

	const shortLinkFormState = useRecoilValue(ShortLinkFormState);

	/**
	 * Handle Form Submission Function
	 * add a Api Key function
	 *  */

	// JSX Code
	return (
		<>
			{/**
			 * Header of Modal will shown if the `showActionInModalHeader` is set to `true` in  appSetting and hide if it is `false`
			 * default: false
			 *  */}
			{appSettings.appModalsSetting.actions.showActionInModalHeader && (
				<ZIonHeader>
					<ZIonRow className='ion-align-items-center'>
						<ZIonCol>
							<ZIonButton
								onClick={() => {
									// Close the Modal
									dismissZIonModal();
								}}
								color='primary'
								className='ion-text-capitalize'
								fill='outline'
							>
								Close
							</ZIonButton>
						</ZIonCol>
					</ZIonRow>
				</ZIonHeader>
			)}

			<ZIonContent className='ion-padding'>
				<div className='flex ion-text-center ion-justify-content-center flex-col ion-padding-top ion-margin-top'>
					<ZIonText className='' color={'primary'}>
						<h1
							className={`mb-0 ion-padding-top bg-primary zaions__modal_icon`}
						>
							<ZIonIcon
								icon={toggleOutline}
								className='mx-auto'
								color='light'
							></ZIonIcon>
						</h1>
					</ZIonText>
					<br />
					<ZIonText color={'dark'}>
						<h5 className='font-bold'>Link Detail 📕</h5>
					</ZIonText>
				</div>
				<ZIonGrid>
					<ZIonRow>
						<ZIonCol>
							<ZIonText>{shortLinkFormState.note}</ZIonText>
						</ZIonCol>
					</ZIonRow>
				</ZIonGrid>
			</ZIonContent>

			{/**
			 * Footer of Modal will shown if the `showActionInModalFooter` is set to `true` in      appSetting, and hide if it is `false`
			 * default: true
			 *  */}
			{appSettings.appModalsSetting.actions.showActionInModalFooter && (
				<ZIonFooter>
					<ZIonRow className=' mx-3 mt-2 ion-justify-content-between ion-align-items-center'>
						<ZIonCol>
							<ZIonButton
								fill='outline'
								size='default'
								className='ion-text-capitalize'
								onClick={() => {
									// Close The Modal
									dismissZIonModal();
								}}
							>
								Close
							</ZIonButton>
						</ZIonCol>
					</ZIonRow>
				</ZIonFooter>
			)}
		</>
	);
};

export default ZaionsLinkNoteDetailModal;
