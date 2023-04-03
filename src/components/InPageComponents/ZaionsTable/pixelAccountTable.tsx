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
import { useSetRecoilState } from 'recoil';

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
import CONSTANTS from '@/utils/constants';

// Images

// Recoil States
import { PixelAccountFormState } from '@/ZaionsStore/FormStates/pixelAccountFormState.recoil';

// Types
import { PixelAccountType } from '@/types/AdminPanel/linksType';
import { FormMode } from '@/types/AdminPanel/index.type';
import {
	useZIonAlert,
	useZIonErrorAlert,
	useZIonModal,
} from '@/ZaionsHooks/zionic-hooks';
import { API_URL_ENUM } from '@/utils/enums';
import {
	useZRQDeleteRequest,
	useZRQGetRequest,
} from '@/ZaionsHooks/zreactquery-hooks';
import { reportCustomError } from '@/utils/customErrorType';
import { ZIonButton } from '@/components/ZIonComponents';
import ZIonSelect from '@/components/ZIonComponents/ZIonSelect';
import { showSuccessNotification } from '@/utils/notification';
import MESSAGES from '@/utils/messages';
import ZaionsAddPixelAccount from '../ZaionsModals/AddPixelsAccount';

// Styles

const ZaionsPixelAccountData: React.FC = () => {
	// React Hooks
	const [compState, setCompState] = useState<{
		selectedPixelId: string | null;
		showActionPopover: boolean;
	}>({ selectedPixelId: null, showActionPopover: false });
	const actionsPopoverRef = useRef<HTMLIonPopoverElement>(null);

	// Packages  Hooks
	const setPixelAccountFormState = useSetRecoilState(PixelAccountFormState);

	// Custom Hooks
	const { presentZIonErrorAlert } = useZIonErrorAlert();

	const { presentZIonModal: presentZAddPixelAccount } = useZIonModal(
		ZaionsAddPixelAccount
	);

	const { presentZIonAlert } = useZIonAlert();

	const { data: pixelAccountsData } = useZRQGetRequest<PixelAccountType[]>({
		_url: API_URL_ENUM.userPixelAccounts_create_list,
		_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN],
	});

	const { mutate: deletePixelAccountMutate } = useZRQDeleteRequest(
		API_URL_ENUM.userPixelAccounts_update_delete,
		[CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN]
	);

	const showActionsPopover = (
		_event: React.MouseEvent<HTMLIonButtonElement, MouseEvent>
	) => {
		if (actionsPopoverRef.current) {
			actionsPopoverRef.current.event = _event;
		}
	};

	/**
	 * Edit pixel account function. this function will call where user press the edit button that is present in the action column (dropdown). where user click the edit button this function will get call and it will set the pixel data in pixelAccountFormState with formMode to edit (means in edit mode), that will open the modal with edit mode.
	 */
	const editPixelAccountDetails = async () => {
		try {
			if (compState.selectedPixelId && pixelAccountsData?.length) {
				const selectedPixelAccount = pixelAccountsData?.find(
					(el) => el.id === compState.selectedPixelId
				);
				setPixelAccountFormState((oldVal) => ({
					...oldVal,
					formMode: FormMode.EDIT,
					id: selectedPixelAccount?.id,
					pixelId: selectedPixelAccount?.pixelId,
					title: selectedPixelAccount?.title,
					platform: selectedPixelAccount?.platform,
				}));
				presentZAddPixelAccount({
					_cssClass: 'pixel-account-modal-size',
				});
			} else {
				await presentZIonErrorAlert();
			}
		} catch (error) {
			reportCustomError(error);
		}
	};

	/**
	 * Deleting pixel account function this function will call where user press the delete button that is present in the 	action column (dropdown). you can find this button blow in ZTableRow -> ZTableRowCol.
	 */
	const deletePixelAccount = async () => {
		try {
			if (compState.selectedPixelId?.trim() && pixelAccountsData?.length) {
				const selectedPixelAccount = pixelAccountsData.find(
					(el) => el.id === compState.selectedPixelId
				);
				await presentZIonAlert({
					// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
					header: `Delete Pixel Account "${selectedPixelAccount?.title}"`,
					subHeader: 'Remove Pixel account from user account.',
					message: 'Are you sure you want to delete this pixel account?',
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

	/**
	 * Remove pixel account from user account function used it above function where we are deleting pixel account.
	 */
	const removePixelAccount = async () => {
		try {
			if (compState.selectedPixelId?.trim() && pixelAccountsData?.length) {
				const selectedPixelAccount = pixelAccountsData.find(
					(el) => el.id === compState.selectedPixelId
				);
				if (selectedPixelAccount && selectedPixelAccount?.id) {
					deletePixelAccountMutate({
						itemIds: [selectedPixelAccount?.id],
						urlDynamicParts: [':pixelId'],
					});
					showSuccessNotification(
						MESSAGES.GENERAL.PIXEL_ACCOUNT.PIXEL_ACCOUNT_DELETED_SUCCEED_MESSAGE
					);
				}
			} else {
				await presentZIonErrorAlert();
			}
		} catch (error) {
			await presentZIonErrorAlert();
		}
	};

	return (
		<>
			<ZIonRow className='py-4 px-4 zaions__bg_white mx-4 mt-5'>
				<ZIonCol>
					<ZTable>
						{/* Table */}
						<ZTableTHead>
							<ZTableRow>
								<ZTableHeadCol>Name</ZTableHeadCol>
								<ZTableHeadCol>Platform</ZTableHeadCol>
								<ZTableHeadCol>Value</ZTableHeadCol>
								<ZTableHeadCol>Creation date</ZTableHeadCol>
								<ZTableHeadCol>Action</ZTableHeadCol>
							</ZTableRow>
						</ZTableTHead>

						<ZTableTBody>
							{pixelAccountsData?.map((el) => (
								<ZTableRow key={el.id}>
									<ZTableRowCol>{el.title}</ZTableRowCol>
									<ZTableRowCol>{el.platform}</ZTableRowCol>
									<ZTableRowCol>{el.platform}</ZTableRowCol>
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
													selectedPixelId: el.id || '',
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
											<ZIonSelectOption value={'40'}>{'40'}</ZIonSelectOption>
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
						{/* <ZIonItem button={true} detail={false}>
							<ZIonButton
								size='small'
								expand='full'
								fill='clear'
								className='ion-text-capitalize mx-auto'
							>
								<ZIonIcon
									icon={eyeOutline}
									className='me-2 '
									color={'primary'}
								/>{' '}
								<ZIonText color={'primary'}>View</ZIonText>
							</ZIonButton>
						</ZIonItem> */}
						<ZIonItem
							button={true}
							detail={false}
							onClick={() => void editPixelAccountDetails()}
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

export default ZaionsPixelAccountData;
