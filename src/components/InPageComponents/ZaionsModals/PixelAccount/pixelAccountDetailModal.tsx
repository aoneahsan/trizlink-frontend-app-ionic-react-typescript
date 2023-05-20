// Core Imports
import React from 'react';
// Packages Import
import { toggleOutline } from 'ionicons/icons';
import { useRecoilState, useRecoilValue } from 'recoil';

// Custom Imports

import {
	ZTable,
	ZTableHeadCol,
	ZTableRow,
	ZTableRowCol,
	ZTableTBody,
	ZTableTHead,
} from '@/components/InPageComponents/ZaionsTable/table-styled-components.sc';

// Global Constants
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

// Images

// Recoil States
import { ZaionsAppSettingsRState } from '@/ZaionsStore/zaionsAppSettings.recoil';
import { ShortLinkFormState } from '@/ZaionsStore/FormStates/shortLinkFormState';

// Types
import { PixelAccountType } from '@/types/AdminPanel/linksType';
import { FormMode } from '@/types/AdminPanel/index.type';
import { ZIonButton } from '@/components/ZIonComponents';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';

// Styles

const ZaionsPixelAccountDetail: React.FC<{
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({ dismissZIonModal }) => {
	const appSettings = useRecoilValue(ZaionsAppSettingsRState);

	//
	const [shortLinkFormState, SetShortLinkFormState] =
		useRecoilState(ShortLinkFormState);

	// getting pixels
	const { data: __pixelAccountsData } = useZRQGetRequest<PixelAccountType[]>({
		_url: API_URL_ENUM.userPixelAccounts_create_list,
		_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN],
	});

	/**
	 * Handle Form Submission Function
	 * add a Api Key function
	 *  */
	const SetDefaultShortLinkFormState = () => {
		// Reset to default
		SetShortLinkFormState((oldVal) => ({
			...oldVal,
			mode: FormMode.ADD,
			ApiKey: {},
		}));
	};

	// JSX Code
	return (
		<>
			{/**
			 * Header of Modal will shown if the `showActionInModalHeader` is set to `true` in      appSetting and hide if it is `false`
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
									SetDefaultShortLinkFormState();
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
							/>
						</h1>
					</ZIonText>
					<br />
					<ZIonText color={'dark'}>
						{/* <h6 className='font-bold'>SEO Home Zaions.com</h6> */}
						<h6 className='font-bold'>Pixels Id's</h6>
					</ZIonText>
				</div>
				<ZIonGrid>
					<ZIonRow>
						<ZIonCol>
							<ZTable>
								<ZTableTHead>
									<ZTableRow>
										<ZTableHeadCol>Plate Form</ZTableHeadCol>
										<ZTableHeadCol>Name</ZTableHeadCol>
									</ZTableRow>
								</ZTableTHead>
								<ZTableTBody>
									{shortLinkFormState.pixelAccountIds?.length ? (
										shortLinkFormState.pixelAccountIds?.map((el) => {
											const pixel =
												__pixelAccountsData &&
												__pixelAccountsData.find((_pixel) => _pixel.id === el);
											return (
												<ZTableRow key={el}>
													<ZTableRowCol>{pixel?.platform}</ZTableRowCol>
													<ZTableRowCol>{pixel?.title}</ZTableRowCol>
												</ZTableRow>
											);
										})
									) : (
										<ZTableRow>
											<ZTableRowCol>-</ZTableRowCol>
											<ZTableRowCol>-</ZTableRowCol>
										</ZTableRow>
									)}
								</ZTableTBody>
							</ZTable>
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
									SetDefaultShortLinkFormState();
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

export default ZaionsPixelAccountDetail;
