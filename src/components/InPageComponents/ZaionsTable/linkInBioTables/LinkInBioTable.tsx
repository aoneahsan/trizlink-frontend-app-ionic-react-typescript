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
	FilteredLinkInBioLinksData,
	LinkInBiosFilterOptionsRState,
	LinkInBiosRState,
} from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioState.recoil';
import {
	LinkInBioType,
	ZLinkInBioPageEnum,
	ZLinkInBioRHSComponentEnum,
} from '@/types/AdminPanel/linkInBioType';
import CONSTANTS from '@/utils/constants';
// import { LinkInBioType } from '@/types/AdminPanel/linkInBioType';

// Styles

const ZaionsLinkInBioLinksTable = () => {
	const [compState, setCompState] = useState<{
		selectedLinkInBioLinkId?: string;
		showActionPopover: boolean;
	}>({ showActionPopover: false });

	const _setLinkInBiosData = useSetRecoilState(LinkInBiosRState);

	const _filteredLinkInBioLinksData = useRecoilValue(
		FilteredLinkInBioLinksData
	);

	const _linkInBiosFilterOptionsState = useSetRecoilState(
		LinkInBiosFilterOptionsRState
	);

	const { folderId } = useParams<{ folderId: string }>();
	const actionsPopoverRef = useRef<HTMLIonPopoverElement>(null);
	const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();
	const { presentZIonErrorAlert } = useZIonErrorAlert();
	const { presentZIonAlert } = useZIonAlert();
	const { zNavigatePushRoute } = useZNavigate();
	const { mutate: deleteLinkInBioLinkMutate } = useZRQDeleteRequest(
		API_URL_ENUM.linkInBio_update_delete,
		[CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN]
	);

	const { data: getLinkInBioLinkData } = useZRQGetRequest<LinkInBioType[]>({
		_url: API_URL_ENUM.linkInBio_create_list,
		_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN],
	});

	useEffect(() => {
		try {
			_linkInBiosFilterOptionsState((oldState) => ({
				...oldState,
				folderId: folderId,
			}));
			if (getLinkInBioLinkData) {
				_setLinkInBiosData(getLinkInBioLinkData);
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
						params: [CONSTANTS.RouteParams.editLinkInBioIdParam],
						values: [compState.selectedLinkInBioLinkId],
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
				_filteredLinkInBioLinksData?.length
			) {
				const selectedLinkInBioLinkId = _filteredLinkInBioLinksData?.find(
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
				_filteredLinkInBioLinksData?.length
			) {
				if (compState.selectedLinkInBioLinkId) {
					deleteLinkInBioLinkMutate({
						itemIds: [compState.selectedLinkInBioLinkId],
						urlDynamicParts: [':linkInBioId'],
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
			<ZIonRow className='pt-4 pb-1 px-4 zaions__bg_white  mt-5 ion-margin-bottom'>
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
								{/* <ZTableHeadCol>Pixels</ZTableHeadCol>
                <ZTableHeadCol>Note</ZTableHeadCol> */}
								{/* <ZTableHeadCol>Link To Share</ZTableHeadCol> */}
								<ZTableHeadCol>Action</ZTableHeadCol>
							</ZTableRow>
						</ZTableTHead>
						<ZTableTBody>
							{_filteredLinkInBioLinksData &&
								_filteredLinkInBioLinksData?.map((el) => {
									return (
										<ZTableRow key={el.id}>
											<ZTableRowCol>
												<ZIonCheckbox />
											</ZTableRowCol>
											<ZTableRowCol>{el.title}</ZTableRowCol>
											<ZTableRowCol>{el.totalClicks || 0}</ZTableRowCol>
											<ZTableRowCol>{el.createdAt}</ZTableRowCol>
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
											<ZTableRowCol>
												<ZIonButton
													fill='clear'
													color={'dark'}
													onClick={(_event) => {
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
										</ZTableRow>
									);
								})}
						</ZTableTBody>
					</ZTable>
					{!_filteredLinkInBioLinksData?.length && (
						<ZIonCol className='ion-text-center'>
							<ZIonTitle className='mt-5'>
								<ZIonIcon
									icon={fileTrayFullOutline}
									className='mx-auto'
									size='large'
									color='medium'
								/>
							</ZIonTitle>
							<ZIonTitle color='medium'>
								No Link-in-bio's founds{' '}
								{(folderId !== null || folderId !== 'all') && 'In this Folder'}.
								please create a Link-in-bio.
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
							onClick={() => void deleteLinkInBio()}
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

export default ZaionsLinkInBioLinksTable;
