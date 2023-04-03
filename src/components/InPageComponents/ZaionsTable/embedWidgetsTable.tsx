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
import {
	useZIonAlert,
	useZIonErrorAlert,
	useZIonModal,
} from '@/ZaionsHooks/zionic-hooks';

// Recoil States
import { EmbedWidgetsFormState } from '@/ZaionsStore/FormStates/embedWidgetsFormState.recoil';

// Types
import { EmbedWidgetsType } from '@/types/AdminPanel/linksType';
import { FormMode } from '@/types/AdminPanel/index.type';
import {
	useZRQDeleteRequest,
	useZRQGetRequest,
} from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM } from '@/utils/enums';
import { ZIonButton } from '@/components/ZIonComponents';
import ZIonSelect from '@/components/ZIonComponents/ZIonSelect';
import { showSuccessNotification } from '@/utils/notification';
import MESSAGES from '@/utils/messages';
import ZaionsEmbedWidgetsModal from '../ZaionsModals/AddEmbedWidgets';

// Styles

const EmbedWidgetsTable: React.FC = () => {
	const [compState, setCompState] = useState<{
		selectedEmbedWidgetId: string | null;
		showActionPopover: boolean;
	}>({ selectedEmbedWidgetId: null, showActionPopover: false });
	const actionsPopoverRef = useRef<HTMLIonPopoverElement>(null);

	const setEmbedWidgetsFormState = useSetRecoilState(EmbedWidgetsFormState);

	const { presentZIonErrorAlert } = useZIonErrorAlert();
	const { presentZIonAlert } = useZIonAlert();
	const { presentZIonModal: presentZEmbedWidgetsModal } = useZIonModal(
		ZaionsEmbedWidgetsModal
	);

	const { data: embedWidgetData } = useZRQGetRequest<EmbedWidgetsType[]>({
		_url: API_URL_ENUM.userEmbedWidget_create_list,
		_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.EMBED_WIDGET.MAIN],
	});

	const { mutate: deleteEmbedWidgetMutate } = useZRQDeleteRequest(
		API_URL_ENUM.userEmbedWidget_update_delete,
		[CONSTANTS.REACT_QUERY.QUERIES_KEYS.EMBED_WIDGET.MAIN]
	);

	const showActionsPopover = (
		_event: React.MouseEvent<HTMLIonButtonElement, MouseEvent>
	) => {
		if (actionsPopoverRef.current) {
			actionsPopoverRef.current.event = _event;
		}
	};
	const editEmbedWidget = async () => {
		try {
			if (compState.selectedEmbedWidgetId?.trim() && embedWidgetData?.length) {
				const selectedEmbedWidget = embedWidgetData?.find(
					(el) => el.id === compState.selectedEmbedWidgetId
				);
				setEmbedWidgetsFormState((oldVal) => ({
					...oldVal,
					formMode: FormMode.EDIT,
					id: selectedEmbedWidget?.id,
					name: selectedEmbedWidget?.name,
					animation: selectedEmbedWidget?.animation,
					closingOption: selectedEmbedWidget?.closingOption,
					delay: selectedEmbedWidget?.delay,
					HTMLCode: selectedEmbedWidget?.HTMLCode,
					jsCode: selectedEmbedWidget?.jsCode,
					displayAt: selectedEmbedWidget?.displayAt,
					createAt: selectedEmbedWidget?.createAt,
					updatedAt: selectedEmbedWidget?.updatedAt,
					position: selectedEmbedWidget?.position,
				}));
				presentZEmbedWidgetsModal({
					_cssClass: 'embed-widget-modal-size',
				});
			} else {
				await presentZIonErrorAlert();
			}
		} catch (error) {
			await presentZIonErrorAlert();
		}
	};
	const deleteEmbedWidget = async () => {
		try {
			if (compState.selectedEmbedWidgetId?.trim() && embedWidgetData?.length) {
				const selectedEmbedWidget = embedWidgetData?.find(
					(el) => el.id === compState.selectedEmbedWidgetId
				);
				await presentZIonAlert({
					header: `Delete Embed Widget "${selectedEmbedWidget?.name || ''}"`,
					subHeader: 'Remove Embed Widget from user account.',
					message: 'Are you sure you want to delete this Embed Widget?',
					buttons: [
						{
							text: 'Cancel',
							role: 'cancel',
						},
						{
							text: 'Delete',
							role: 'danger',
							handler: () => {
								void removeEmbedWidget();
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

	const removeEmbedWidget = async () => {
		try {
			if (compState.selectedEmbedWidgetId?.trim() && embedWidgetData?.length) {
				const selectedEmbedWidget = embedWidgetData?.find(
					(el) => el.id === compState.selectedEmbedWidgetId
				);
				// API call to delete account from DB
				if (selectedEmbedWidget && selectedEmbedWidget.id) {
					deleteEmbedWidgetMutate({
						itemIds: [selectedEmbedWidget.id],
						urlDynamicParts: [':embeddedId'],
					});
					showSuccessNotification(
						MESSAGES.GENERAL.EMBED_WIDGET.EMBED_WIDGET_DELETED_SUCCEED_MESSAGE
					);
				}
			} else {
				await presentZIonErrorAlert();
			}
		} catch (error) {
			console.error(error);
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
								<ZTableHeadCol>Template Name</ZTableHeadCol>
								<ZTableHeadCol>Creation date</ZTableHeadCol>
								<ZTableHeadCol>Action</ZTableHeadCol>
							</ZTableRow>
						</ZTableTHead>

						<ZTableTBody>
							{embedWidgetData &&
								embedWidgetData.map((el) => (
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
														selectedEmbedWidgetId: el.id || '',
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
							onClick={() => void editEmbedWidget()}
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
							onClick={() => void deleteEmbedWidget()}
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

export default EmbedWidgetsTable;
