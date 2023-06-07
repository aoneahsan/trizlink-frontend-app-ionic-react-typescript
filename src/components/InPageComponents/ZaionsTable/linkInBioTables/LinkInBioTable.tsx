// Core Imports
import React, { useEffect, useRef, useState } from 'react';

// Packages Imports
import { IonPopover } from '@ionic/react';
import {
	ellipsisVerticalOutline,
	fileTrayFullOutline,
	pencilOutline,
	trashBinOutline,
} from 'ionicons/icons';
import { useRecoilValue, useSetRecoilState } from 'recoil';

// Custom Imports
import {
	ZTable,
	ZTableHeadCol,
	ZTableRow,
	ZTableRowCol,
	ZTableTBody,
	ZTableTHead,
} from '../table-styled-components.sc';

import {
	ZIonCol,
	ZIonRow,
	ZIonText,
	ZIonContent,
	ZIonIcon,
	ZIonItem,
	ZIonList,
	ZIonCheckbox,
	ZIonTitle,
} from '@/components/ZIonComponents';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { ZIonButton } from '@/components/ZIonComponents';

// Global Constants
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import {
	createRedirectRoute,
	replaceParams,
	zConsoleError,
} from '@/utils/helpers';
import { API_URL_ENUM } from '@/utils/enums';
import {
	useZRQDeleteRequest,
	useZRQGetRequest,
} from '@/ZaionsHooks/zreactquery-hooks';
import {
	useZIonAlert,
	useZIonErrorAlert,
	useZIonLoading,
} from '@/ZaionsHooks/zionic-hooks';

// Types

// Recoil State
import { useParams } from 'react-router';
import {
	FilteredLinkInBioLinksDataSelector,
	LinkInBiosFilterOptionsRStateAtom,
	LinkInBiosRStateAtom,
} from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioState.recoil';
import {
	LinkInBioType,
	ZLinkInBioPageEnum,
	ZLinkInBioRHSComponentEnum,
} from '@/types/AdminPanel/linkInBioType';
import CONSTANTS from '@/utils/constants';
import ZCan from '@/components/Can';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
// import { LinkInBioType } from '@/types/AdminPanel/linkInBioType';

// Styles

const ZaionsLinkInBioLinksTable = () => {
	const [compState, setCompState] = useState<{
		selectedLinkInBioLinkId?: string;
		showActionPopover: boolean;
	}>({ showActionPopover: false });

	const setLinkInBiosStateAtom = useSetRecoilState(LinkInBiosRStateAtom);

	const _FilteredLinkInBioLinksDataSelector = useRecoilValue(
		FilteredLinkInBioLinksDataSelector
	);

	const _linkInBiosFilterOptionsState = useSetRecoilState(
		LinkInBiosFilterOptionsRStateAtom
	);

	const { folderId, workspaceId } = useParams<{
		folderId: string;
		workspaceId: string;
	}>();

	const actionsPopoverRef = useRef<HTMLIonPopoverElement>(null);
	const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();
	const { presentZIonErrorAlert } = useZIonErrorAlert();
	const { presentZIonAlert } = useZIonAlert();
	const { zNavigatePushRoute } = useZNavigate();
	const { mutate: deleteLinkInBioLinkMutate } = useZRQDeleteRequest(
		API_URL_ENUM.linkInBio_update_delete,
		[CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN, workspaceId]
	);

	const { data: getLinkInBioLinkData } = useZRQGetRequest<LinkInBioType[]>({
		_url: API_URL_ENUM.linkInBio_create_list,
		_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN, workspaceId],
		_itemsIds: [workspaceId],
		_urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
	});

	useEffect(() => {
		try {
			_linkInBiosFilterOptionsState((oldState) => ({
				...oldState,
				folderId: folderId,
			}));
			if (getLinkInBioLinkData) {
				setLinkInBiosStateAtom(getLinkInBioLinkData);
			}
		} catch (error) {
			zConsoleError({
				message:
					'From ZaionsLinkInBioLinksTable -> useIonViewDidEnter -> catch',
				err: error,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [folderId, getLinkInBioLinkData]);

	const showActionsPopover = (
		_event: React.MouseEvent<HTMLIonButtonElement, MouseEvent>
	) => {
		if (actionsPopoverRef.current) {
			actionsPopoverRef.current.event = _event;
		}
	};

	const editLinkInBioDetails = async () => {
		try {
			if (compState && compState.selectedLinkInBioLinkId) {
				// was using history here.
				zNavigatePushRoute(
					createRedirectRoute({
						url: ZaionsRoutes.AdminPanel.LinkInBio.Edit,
						params: [
							CONSTANTS.RouteParams.workspace.workspaceId,
							CONSTANTS.RouteParams.linkInBio.linkInBioId,
						],
						values: [workspaceId, compState.selectedLinkInBioLinkId],
						routeSearchParams: {
							page: ZLinkInBioPageEnum.design,
							step: ZLinkInBioRHSComponentEnum.theme,
						},
					})
				);
			} else {
				await presentZIonErrorAlert();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const deleteLinkInBio = async () => {
		try {
			if (
				compState.selectedLinkInBioLinkId?.trim() &&
				_FilteredLinkInBioLinksDataSelector?.length
			) {
				const selectedLinkInBioLinkId =
					_FilteredLinkInBioLinksDataSelector?.find(
						(el) => el.id === compState.selectedLinkInBioLinkId
					);
				await presentZIonAlert({
					header: `Delete Link-in-bio "${
						selectedLinkInBioLinkId?.title || ''
					}"`,
					subHeader: 'Remove Link-in-bio from user account.',
					message: 'Are you sure you want to delete this Link-in-bio?',
					buttons: [
						{
							text: 'Cancel',
							role: 'cancel',
						},
						{
							text: 'Delete',
							role: 'danger',
							handler: () => {
								void removeLinkInBio();
							},
						},
					],
				});
			} else {
				await presentZIonErrorAlert();
			}
		} catch (error) {
			await presentZIonErrorAlert();
		}
	};

	const removeLinkInBio = async () => {
		await presentZIonLoader('Deleting Link-in-bio...');
		try {
			if (
				compState.selectedLinkInBioLinkId?.trim() &&
				_FilteredLinkInBioLinksDataSelector?.length
			) {
				if (compState.selectedLinkInBioLinkId) {
					deleteLinkInBioLinkMutate({
						itemIds: [workspaceId, compState.selectedLinkInBioLinkId],
						urlDynamicParts: [
							CONSTANTS.RouteParams.workspace.workspaceId,
							CONSTANTS.RouteParams.linkInBio.linkInBioId,
						],
					});
				}
				await dismissZIonLoader();
			} else {
				void presentZIonErrorAlert();
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<ZIonRow className='px-4 pt-4 pb-1 mt-5 zaions__bg_white ion-margin-bottom'>
				<ZIonCol>
					<ZTable>
						<ZTableTHead>
							<ZTableRow>
								<ZTableHeadCol>
									<ZIonCheckbox />
								</ZTableHeadCol>
								<ZTableHeadCol>Title</ZTableHeadCol>
								<ZTableHeadCol>Clicks</ZTableHeadCol>
								<ZTableHeadCol>Date</ZTableHeadCol>
								<ZTableHeadCol>Action</ZTableHeadCol>
							</ZTableRow>
						</ZTableTHead>
						<ZTableTBody>
							{_FilteredLinkInBioLinksDataSelector &&
								_FilteredLinkInBioLinksDataSelector?.map((el) => {
									return (
										<ZTableRow key={el.id}>
											<ZTableRowCol className='ion-text-center'>
												<ZIonCheckbox />
											</ZTableRowCol>
											<ZTableRowCol className='ion-text-center'>
												{el.title}
											</ZTableRowCol>
											<ZTableRowCol className='ion-text-center'>
												{el.totalClicks || 0}
											</ZTableRowCol>
											<ZTableRowCol className='ion-text-center'>
												{el.createdAt}
											</ZTableRowCol>
											<ZTableRowCol className='ion-text-center'>
												<ZIonButton
													fill='clear'
													color={'dark'}
													onClick={(_event) => {
														console.log({ selectedLinkInBioLinkId: el });
														setCompState((oldVal) => ({
															...oldVal,
															selectedLinkInBioLinkId: el.id,
															showActionPopover: true,
														}));
														showActionsPopover(_event);
													}}
												>
													<ZIonIcon icon={ellipsisVerticalOutline} />
												</ZIonButton>
											</ZTableRowCol>
											{/* <ZTableRowCol>
                        {(JSON.parse(el?.pixelIds as string) as string[])
                          ?.length ? (
                          <>
                            <div className='ZaionsTextEllipsis'>
                              {
                                (JSON.parse(el?.pixelIds as string) as string[])
                                  ?.length
                              }
                            </div>
                            <ZIonText
                              color='primary'
                              className='mt-1 zaions__cursor_pointer'
                              onClick={() => {
                                setLinkInBioFormState((oldVal) => ({
                                  ...oldVal,
                                  pixelAccountIds: JSON.parse(
                                    el?.pixelIds as string
                                  ) as string[],
                                }));
                                // Open The Modal
                                presentPixelAccountDetailModal({
                                  _cssClass: 'pixel-account-detail-modal-size',
                                });
                              }}
                            >
                              View Pixels
                            </ZIonText>
                          </>
                        ) : (
                          CONSTANTS.NO_VALUE_FOUND
                        )}
                      </ZTableRowCol>
                      <ZTableRowCol>
                        <div className='ZaionsTextEllipsis'>{el.notes}</div>
                        {el.notes ? (
                          <ZIonText
                            color='primary'
                            className='mt-1 zaions__cursor_pointer'
                            onClick={() => {
                              setLinkInBioFormState((oldVal) => ({
                                ...oldVal,
                                note: el.notes,
                              }));
                              // Close The Modal
                              presentPixelAccountDetailModal({
                                _cssClass: 'pixel-account-detail-modal-size',
                              });
                            }}
                          >
                            Read more
                          </ZIonText>
                        ) : (
                          CONSTANTS.NO_VALUE_FOUND
                        )}
                      </ZTableRowCol>

                      <ZTableRowCol>
                        <ZIonRouterLink
                          routerLink={ZaionsBusinessDetails.WebsiteUrl}
                        >
                          {ZaionsBusinessDetails.WebsiteUrl}
                        </ZIonRouterLink>{' '}
                      </ZTableRowCol> */}
										</ZTableRow>
									);
								})}
						</ZTableTBody>
					</ZTable>
					{!_FilteredLinkInBioLinksDataSelector?.length && (
						<ZIonCol className='ion-text-center'>
							<ZIonTitle className='mt-10'>
								<ZIonIcon
									icon={fileTrayFullOutline}
									className='mx-auto'
									size='large'
									color='medium'
								/>
							</ZIonTitle>
							<ZIonTitle color='medium'>
								No Link-in-bio's founds
								{(folderId !== null || folderId !== 'all') && ' In this Folder'}
								. please create a Link-in-bio.
							</ZIonTitle>
						</ZIonCol>
					)}
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
						<ZCan havePermission={permissionsEnum.update_shortLink}>
							<ZIonItem
								button={true}
								detail={false}
								onClick={() => {
									void editLinkInBioDetails();
								}}
							>
								<ZIonButton
									size='small'
									expand='full'
									fill='clear'
									className='mx-auto ion-text-capitalize'
								>
									<ZIonIcon
										icon={pencilOutline}
										className='me-2'
										color={'secondary'}
									/>
									<ZIonText color={'secondary'}>Edit</ZIonText>
								</ZIonButton>
							</ZIonItem>
						</ZCan>

						<ZCan havePermission={permissionsEnum.delete_shortLink}>
							<ZIonItem
								button={true}
								detail={false}
								onClick={() => void deleteLinkInBio()}
							>
								<ZIonButton
									size='small'
									expand='full'
									fill='clear'
									className='mx-auto ion-text-capitalize'
								>
									<ZIonIcon
										icon={trashBinOutline}
										className='me-2'
										color={'danger'}
									/>
									<ZIonText color={'danger'}>Delete</ZIonText>
								</ZIonButton>
							</ZIonItem>
						</ZCan>
					</ZIonList>
				</ZIonContent>
			</IonPopover>
		</>
	);
};

export default ZaionsLinkInBioLinksTable;
