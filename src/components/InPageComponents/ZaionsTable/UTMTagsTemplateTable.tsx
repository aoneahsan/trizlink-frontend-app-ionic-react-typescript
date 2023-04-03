// Core Imports
import React, { useRef, useState } from 'react';

// Packages Import
import { IonPopover } from '@ionic/react';
import {
	ZTable,
	ZTableHeadCol,
	ZTableRow,
	ZTableRowCol,
	ZTableTBody,
	ZTableTHead,
} from './table-styled-components.sc';
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
	ZIonCol,
	ZIonRow,
	ZIonText,
	ZIonContent,
	ZIonIcon,
	ZIonItem,
	ZIonSelectOption,
	ZIonList,
	ZIonSelect,
} from '@/components/ZIonComponents';

// Global Constants
import CONSTANTS, { ZAIONS_MODALS_IDS } from '@/utils/constants';

// Images

// Recoil States
import { UTMTagsTemplateFormState } from '@/ZaionsStore/FormStates/addUTMTagsFormState.recoil';

// Types
import { UTMTagTemplateType } from '@/types/AdminPanel/linksType';
import { FormMode } from '@/types/AdminPanel/index.type';
import {
	useZIonAlert,
	useZIonErrorAlert,
	useZIonModal,
} from '@/ZaionsHooks/zionic-hooks';
import {
	useZRQDeleteRequest,
	useZRQGetRequest,
} from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM } from '@/utils/enums';
import { ZIonButton } from '@/components/ZIonComponents';
import { showSuccessNotification } from '@/utils/notification';
import MESSAGES from '@/utils/messages';
import ZaionsAddUtmTags from '../ZaionsModals/AddUtmTags';

// Styles

const ZaionsUTMTagsTemplateTable: React.FC = () => {
	const setZaionsUTMTagsFormState = useSetRecoilState(UTMTagsTemplateFormState);

	const { presentZIonModal: presentUtmTagsModal } =
		useZIonModal(ZaionsAddUtmTags);
	//
	const [compState, setCompState] = useState<{
		selectedUTMTagId: string | null;
		showActionPopover: boolean;
	}>({ selectedUTMTagId: null, showActionPopover: false });
	const actionsPopoverRef = useRef<HTMLIonPopoverElement>(null);
	const { presentZIonErrorAlert } = useZIonErrorAlert();
	const { presentZIonAlert } = useZIonAlert();

	const { data: _UTMTagsData } = useZRQGetRequest<UTMTagTemplateType[]>({
		_url: API_URL_ENUM.userAccountUtmTags_create_list,
		_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN],
	});
	const { mutate: deleteUTMTagMutate } = useZRQDeleteRequest(
		API_URL_ENUM.userAccountUtmTags_update_delete,
		[CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN]
	);

	const showActionsPopover = (
		_event: React.MouseEvent<HTMLIonButtonElement, MouseEvent>
	) => {
		if (actionsPopoverRef.current) {
			actionsPopoverRef.current.event = _event;
		}
	};

	const editUTMTagDetails = async () => {
		try {
			if (compState.selectedUTMTagId?.trim() && _UTMTagsData?.length) {
				const selectedUtmTag = _UTMTagsData?.find(
					(el) => el.id === compState.selectedUTMTagId
				);
				setZaionsUTMTagsFormState((oldVal) => ({
					...oldVal,
					formMode: FormMode.EDIT,
					id: selectedUtmTag?.id,
					templateName: selectedUtmTag?.templateName || '',
					utmCampaign: selectedUtmTag?.utmCampaign,
					utmMedium: selectedUtmTag?.utmMedium,
					utmSource: selectedUtmTag?.utmSource,
					utmTerm: selectedUtmTag?.utmTerm,
					utmContent: selectedUtmTag?.utmContent,
				}));
				presentUtmTagsModal({
					_cssClass: 'utm-tags-modal-size',
				});
			} else {
				await presentZIonErrorAlert();
			}
		} catch (error) {
			await presentZIonErrorAlert();
		}
	};

	const deleteUTMTagAccount = async () => {
		try {
			if (compState.selectedUTMTagId?.trim() && _UTMTagsData?.length) {
				const selectedUTMTag = _UTMTagsData?.find(
					(el) => el.id === compState.selectedUTMTagId
				);
				await presentZIonAlert({
					header: `Delete UTM Tag "${selectedUTMTag?.templateName || ''}"`,
					subHeader: 'Remove UTM Tag from user account.',
					message: 'Are you sure you want to delete this UTM Tag?',
					buttons: [
						{
							text: 'Cancel',
							role: 'cancel',
						},
						{
							text: 'Delete',
							role: 'danger',
							handler: () => {
								void removeUTMTag();
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

	const removeUTMTag = async () => {
		try {
			if (compState.selectedUTMTagId?.trim() && _UTMTagsData?.length) {
				const selectedUtmTag = _UTMTagsData?.find(
					(el) => el.id === compState.selectedUTMTagId
				);
				selectedUtmTag?.id &&
					deleteUTMTagMutate({
						itemIds: [selectedUtmTag?.id],
						urlDynamicParts: [':utmTagId'],
					});
				showSuccessNotification(
					MESSAGES.GENERAL.UTM_TAGS_TEMPLATE
						.UTM_TAGS_TEMPLATE_DELETED_SUCCEED_MESSAGE
				);
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
								<ZTableHeadCol>UTM Campaign</ZTableHeadCol>
								<ZTableHeadCol>UTM Medium</ZTableHeadCol>
								<ZTableHeadCol>UTM Source</ZTableHeadCol>
								<ZTableHeadCol>UTM Term</ZTableHeadCol>
								<ZTableHeadCol>UTM Content</ZTableHeadCol>
							</ZTableRow>
						</ZTableTHead>

						<ZTableTBody>
							{_UTMTagsData?.map((el) => (
								<ZTableRow key={el.id}>
									<ZTableRowCol>{el.utmCampaign}</ZTableRowCol>
									<ZTableRowCol>{el.utmMedium}</ZTableRowCol>
									<ZTableRowCol>{el.utmSource}</ZTableRowCol>
									<ZTableRowCol>{el.utmTerm}</ZTableRowCol>
									<ZTableRowCol>{el.utmContent}</ZTableRowCol>
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
													selectedUTMTagId: el.id || '',
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
							onClick={() => void editUTMTagDetails()}
							id={ZAIONS_MODALS_IDS.ADD_NEW_PIXEL_ID}
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
							onClick={() => void deleteUTMTagAccount()}
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

export default ZaionsUTMTagsTemplateTable;
