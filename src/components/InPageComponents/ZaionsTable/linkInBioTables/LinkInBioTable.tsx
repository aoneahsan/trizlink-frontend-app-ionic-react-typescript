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
	ZIonSkeletonText,
} from '@/components/ZIonComponents';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { ZIonButton } from '@/components/ZIonComponents';

// Global Constants
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import {
	createRedirectRoute,
	extractInnerData,
	replaceParams,
	zConsoleError,
} from '@/utils/helpers';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import {
	useZGetRQCacheData,
	useZRQDeleteRequest,
	useZRQGetRequest,
	useZUpdateRQCacheData,
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
import { reportCustomError } from '@/utils/customErrorType';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { showSuccessNotification } from '@/utils/notification';
import MESSAGES from '@/utils/messages';
// import { LinkInBioType } from '@/types/AdminPanel/linkInBioType';

// Styles

const ZaionsLinkInBioLinksTable: React.FC<{
	showSkeleton?: boolean;
}> = ({ showSkeleton = false }) => {
	const [compState, setCompState] = useState<{
		selectedLinkInBioLinkId?: string;
		showActionPopover: boolean;
	}>({ showActionPopover: false });

	const { getRQCDataHandler } = useZGetRQCacheData();
	const { updateRQCDataHandler } = useZUpdateRQCacheData();

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
	const { presentZIonErrorAlert } = useZIonErrorAlert();
	const { presentZIonAlert } = useZIonAlert();
	const { zNavigatePushRoute } = useZNavigate();
	const { mutateAsync: deleteLinkInBioLinkMutateAsync } = useZRQDeleteRequest(
		API_URL_ENUM.linkInBio_update_delete,
		[]
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
			reportCustomError(error);
		}
	};

	const deleteLinkInBio = async () => {
		try {
			if (
				compState.selectedLinkInBioLinkId?.trim() &&
				_FilteredLinkInBioLinksDataSelector?.length
			) {
				await presentZIonAlert({
					header: `Delete Link-in-bio`,
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
		try {
			if (
				compState.selectedLinkInBioLinkId?.trim() &&
				_FilteredLinkInBioLinksDataSelector?.length
			) {
				if (compState.selectedLinkInBioLinkId) {
					const _response = await deleteLinkInBioLinkMutateAsync({
						itemIds: [workspaceId, compState.selectedLinkInBioLinkId],
						urlDynamicParts: [
							CONSTANTS.RouteParams.workspace.workspaceId,
							CONSTANTS.RouteParams.linkInBio.linkInBioId,
						],
					});

					if (_response) {
						const _data = extractInnerData<{ success: boolean }>(
							_response,
							extractInnerDataOptionsEnum.createRequestResponseItem
						);

						if (_data && _data.success) {
							// getting all the LinkInBios from RQ cache.
							const _oldLinkInBios =
								extractInnerData<LinkInBioType[]>(
									getRQCDataHandler<LinkInBioType[]>({
										key: [
											CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN,
											workspaceId,
										],
									}) as LinkInBioType[],
									extractInnerDataOptionsEnum.createRequestResponseItems
								) || [];

							// removing deleted LinkInBios from cache.
							const _updatedLinkInBios = _oldLinkInBios.filter(
								(el) => el.id !== compState.selectedLinkInBioLinkId
							);

							// Updating data in RQ cache.
							await updateRQCDataHandler<LinkInBioType[] | undefined>({
								key: [
									CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN,
									workspaceId,
								],
								data: _updatedLinkInBios as LinkInBioType[],
								id: '',
								extractType: ZRQGetRequestExtractEnum.extractItems,
								updateHoleData: true,
							});

							showSuccessNotification(MESSAGES.GENERAL.LINK_IN_BIO.DELETE);
						}
					}
				}
			} else {
				void presentZIonErrorAlert();
			}
		} catch (error) {
			reportCustomError(error);
		}
	};

	return (
		<>
			{!showSkeleton && (
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
													{el.linkInBioTitle}
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
									{(folderId !== null || folderId !== 'all') &&
										' In this Folder'}
									. please create a Link-in-bio.
								</ZIonTitle>
							</ZIonCol>
						)}
					</ZIonCol>
				</ZIonRow>
			)}

			{showSkeleton && <ZaionsShortLinkTableSkeleton />}

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
						<ZCan havePermissions={[permissionsEnum.update_shortLink]}>
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

						<ZCan havePermissions={[permissionsEnum.delete_shortLink]}>
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

const ZaionsShortLinkTableSkeleton: React.FC = React.memo(() => {
	return (
		<ZIonRow className='px-4 pt-2 pb-1 mx-1 mt-5 overflow-y-scroll zaions_pretty_scrollbar ion-margin-bottom'>
			<ZIonCol>
				<ZTable>
					<ZTableTHead>
						<ZTableRow>
							<ZTableHeadCol>
								<ZIonSkeletonText width='20px' height='20px' animated={true} />
							</ZTableHeadCol>
							<ZTableHeadCol>
								<ZIonSkeletonText width='40px' height='17px' animated={true} />
							</ZTableHeadCol>
							<ZTableHeadCol>
								<ZIonSkeletonText width='40px' height='17px' animated={true} />
							</ZTableHeadCol>
							<ZTableHeadCol>
								<ZIonSkeletonText width='40px' height='17px' animated={true} />
							</ZTableHeadCol>
							<ZTableHeadCol>
								<ZIonSkeletonText width='40px' height='17px' animated={true} />
							</ZTableHeadCol>
						</ZTableRow>
					</ZTableTHead>
					<ZTableTBody>
						<ZTableRow>
							<ZTableRowCol>
								<ZIonSkeletonText width='20px' height='20px' animated={true} />
							</ZTableRowCol>
							<ZTableRowCol>
								<ZIonSkeletonText width='40px' height='17px' animated={true} />
							</ZTableRowCol>
							<ZTableRowCol>
								<ZIonSkeletonText width='40px' height='17px' animated={true} />
							</ZTableRowCol>
							<ZTableRowCol>
								<ZIonSkeletonText width='40px' height='17px' animated={true} />
							</ZTableRowCol>
							<ZTableRowCol>
								<ZIonText
									color='primary'
									className='mt-1 zaions__cursor_pointer'
								>
									<ZIonSkeletonText
										width='40px'
										height='17px'
										animated={true}
									/>
								</ZIonText>
							</ZTableRowCol>
						</ZTableRow>
					</ZTableTBody>
				</ZTable>
			</ZIonCol>
		</ZIonRow>
	);
});

export default ZaionsLinkInBioLinksTable;
