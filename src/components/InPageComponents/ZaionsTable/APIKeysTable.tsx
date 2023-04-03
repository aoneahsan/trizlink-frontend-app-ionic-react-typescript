// Core Imports
import React, { useRef, useState } from 'react';

// Packages Import
import { IonPopover } from '@ionic/react';

import {
	chevronBackOutline,
	chevronForwardOutline,
	ellipsisVerticalOutline,
	pencilOutline,
	playBackOutline,
	playForwardOutline,
	trashBinOutline,
} from 'ionicons/icons';
import { useRecoilState, useSetRecoilState } from 'recoil';

// Custom Imports
import {
	ZTable,
	ZTableHeadCol,
	ZTableRow,
	ZTableRowCol,
	ZTableTBody,
	ZTableTHead,
} from './table-styled-components.sc';
import {
	ZIonCol,
	ZIonRow,
	ZIonText,
	ZIonContent,
	ZIonIcon,
	ZIonItem,
	ZIonSelectOption,
	ZIonList,
} from '@/components/ZIonComponents';

// Global Constants

// Images
import CONSTANTS from '@/utils/constants';

// Recoil States
import { FormMode } from '@/types/AdminPanel/index.type';
import { APIKeyState } from '@/ZaionsStore/UserDashboard/APIKey';
import { APIKeyFormState } from '@/ZaionsStore/FormStates/apiKeyState.recoil';
import {
	useZIonAlert,
	useZIonErrorAlert,
	useZIonLoading,
	useZIonModal,
} from '@/ZaionsHooks/zionic-hooks';
import { ZIonButton } from '@/components/ZIonComponents';
import ZIonSelect from '@/components/ZIonComponents/ZIonSelect';
import ZaionsAddAPIKeyModal from '../ZaionsModals/AddAPIKey';

// Types

// Styles

const ZaionsAPIKeysTable: React.FC = () => {
	const [apiKeyData, setApiKeyData] = useRecoilState(APIKeyState);
	const setAPIKeyFormState = useSetRecoilState(APIKeyFormState);
	const [compState, setCompState] = useState<{
		selectedApiKey: string | null;
		showActionPopover: boolean;
	}>({ selectedApiKey: null, showActionPopover: false });
	const actionsPopoverRef = useRef<HTMLIonPopoverElement>(null);
	const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();
	const { presentZIonErrorAlert } = useZIonErrorAlert();
	const { presentZIonAlert } = useZIonAlert();

	const { presentZIonModal: presentZApiKeyModal } =
		useZIonModal(ZaionsAddAPIKeyModal);

	const showActionsPopover = (
		_event: React.MouseEvent<HTMLIonButtonElement, MouseEvent>
	) => {
		if (actionsPopoverRef.current) {
			actionsPopoverRef.current.event = _event;
		}
	};

	const editApiKeyDetails = async () => {
		try {
			if (compState.selectedApiKey?.trim() && apiKeyData.length) {
				const selectedApiKey = apiKeyData.find(
					(el) => el.id === compState.selectedApiKey
				);
				setAPIKeyFormState((oldVal) => ({
					...oldVal,
					formMode: FormMode.EDIT,
					id: selectedApiKey?.id,
					name: selectedApiKey?.name,
				}));
				presentZApiKeyModal({
					_cssClass: 'api-key-modal-size',
				});
			} else {
				await presentZIonErrorAlert();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const deletePixelAccount = async () => {
		try {
			if (compState.selectedApiKey?.trim() && apiKeyData.length) {
				const selectedApiKey = apiKeyData.find(
					(el) => el.id === compState.selectedApiKey
				);
				await presentZIonAlert({
					header: `Delete Api Key "${selectedApiKey?.name || ''}"`,
					subHeader: 'Remove Api Key from user account.',
					message: 'Are you sure you want to delete this Api Key?',
					buttons: [
						{
							text: 'Cancel',
							role: 'cancel',
						},
						{
							text: 'Delete',
							role: 'danger',
							handler: () => {
								void removePixelAccount();
							},
						},
					],
				});
			} else {
				await presentZIonErrorAlert();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const removePixelAccount = async () => {
		await presentZIonLoader('Deleting Api Key...');
		try {
			if (compState.selectedApiKey?.trim() && apiKeyData.length) {
				const updatedPixelAccounts = apiKeyData.filter(
					(el) => el.id !== compState.selectedApiKey
				);
				// API call to delete account from DB
				setApiKeyData(updatedPixelAccounts);
				await dismissZIonLoader();
			} else {
				await presentZIonErrorAlert();
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<ZIonRow className='pt-4 pb-1 px-4 zaions__bg_white mx-4 mt-5 ion-margin-bottom '>
				<ZIonCol>
					<ZTable>
						{/* Table */}
						<ZTableTHead>
							<ZTableRow>
								<ZTableHeadCol>Name</ZTableHeadCol>
								<ZTableHeadCol>Creation date</ZTableHeadCol>
								<ZTableHeadCol>Action</ZTableHeadCol>
							</ZTableRow>
						</ZTableTHead>

						<ZTableTBody>
							{apiKeyData.map((el) => (
								<ZTableRow key={el.id}>
									<ZTableRowCol>{el.name}</ZTableRowCol>
									<ZTableRowCol>
										{el.createAt || CONSTANTS.NO_VALUE_FOUND}
									</ZTableRowCol>
									<ZTableRowCol>
										<ZIonButton
											fill='clear'
											color={'dark'}
											onClick={(_event) => {
												setCompState((oldVal) => ({
													...oldVal,
													selectedApiKey: el.id || '',
													showActionPopover: true,
												}));
												showActionsPopover(_event);
											}}
										>
											<ZIonIcon icon={ellipsisVerticalOutline} />
										</ZIonButton>
									</ZTableRowCol>
								</ZTableRow>
							))}
						</ZTableTBody>
					</ZTable>
					{/* Bottom bar */}
					<ZIonRow className='ion-align-items-center ion-margin-top'>
						<ZIonCol></ZIonCol>
						<ZIonCol className='ion-text-end' size='7'>
							<ZIonRow className='ion-align-items-center ion-justify-content-center'>
								{/* Item Count Selector */}
								<ZIonCol>
									<ZIonItem lines='none'>
										<ZIonSelect
											interface='popover'
											value={'20'}
											label='Items per page:'
										>
											<ZIonSelectOption value={'20'}>20</ZIonSelectOption>
											<ZIonSelectOption value={'40'}>40</ZIonSelectOption>
										</ZIonSelect>
									</ZIonItem>
								</ZIonCol>
								{/* Number of pages */}
								<ZIonCol className='ion-text-center'>
									<ZIonText>1 – 2 of 2</ZIonText>
								</ZIonCol>

								{/* Pagination */}
								<ZIonCol>
									<ZIonButton fill='clear' size='small' color='medium'>
										<ZIonIcon icon={playBackOutline}></ZIonIcon>
									</ZIonButton>
									{/* <ZIonIcon icon={caretBackCircleOutline} /> */}
									<ZIonButton
										fill='clear'
										size='small'
										color='medium'
										className='m-0'
									>
										<ZIonIcon icon={chevronBackOutline} />
									</ZIonButton>
									<ZIonButton
										fill='clear'
										size='small'
										color='medium'
										className='m-0'
									>
										<ZIonIcon icon={chevronForwardOutline} />
									</ZIonButton>
									{/* <ZIonIcon icon={caretForwardCircleOutline} /> */}
									<ZIonButton
										fill='clear'
										size='small'
										color='medium'
										className='m-0'
									>
										<ZIonIcon icon={playForwardOutline} />
									</ZIonButton>
								</ZIonCol>
							</ZIonRow>
						</ZIonCol>
					</ZIonRow>
				</ZIonCol>
			</ZIonRow>

			{/* Popovers */}
			<IonPopover
				ref={actionsPopoverRef}
				isOpen={compState?.showActionPopover}
				dismissOnSelect
				showBackdrop={false}
				keepContentsMounted
				className='zaions__ion_popover'
				onDidDismiss={() =>
					setCompState((oldVal) => ({ ...oldVal, showActionPopover: false }))
				}
			>
				<ZIonContent>
					<ZIonList lines='none' className='ion-no-padding'>
						{/* Keep this incase we change our flow and need to show some info later on */}
						<ZIonItem
							button={true}
							detail={false}
							onClick={() => void editApiKeyDetails()}
						>
							<ZIonButton
								size='small'
								expand='full'
								fill='clear'
								className='ion-text-capitalize mx-auto'
							>
								<ZIonIcon
									icon={pencilOutline}
									className='me-2'
									color={'secondary'}
								/>{' '}
								<ZIonText color={'secondary'}>Edit</ZIonText>
							</ZIonButton>
						</ZIonItem>
						<ZIonItem
							button={true}
							detail={false}
							onClick={() => void deletePixelAccount()}
						>
							<ZIonButton
								size='small'
								expand='full'
								fill='clear'
								className='ion-text-capitalize mx-auto'
							>
								<ZIonIcon
									icon={trashBinOutline}
									className='me-2'
									color={'danger'}
								/>{' '}
								<ZIonText color={'danger'}>Delete</ZIonText>
							</ZIonButton>
						</ZIonItem>
					</ZIonList>
				</ZIonContent>
			</IonPopover>
		</>
	);
};

export default ZaionsAPIKeysTable;
