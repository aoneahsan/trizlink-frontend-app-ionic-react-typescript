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
} from './table-styled-components.sc';

import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonRouterLink,
  ZIonContent,
  ZIonIcon,
  ZIonItem,
  ZIonList,
  ZIonCheckbox,
  ZIonTitle,
} from 'components/ZIonComponents';
import { useZNavigate } from 'ZaionsHooks/zrouter-hooks';
import { ZIonButton } from 'components/ZIonComponents';

// Global Constants
import CONSTANTS, { ZaionsBusinessDetails } from 'utils/constants';
import ZaionsRoutes from 'utils/constants/RoutesConstants';
import { replaceParams } from 'utils/helpers';
import { API_URL_ENUM } from 'utils/enums';
import {
  useZRQDeleteRequest,
  useZRQGetRequest,
} from 'ZaionsHooks/zreactquery-hooks';
import {
  useZIonAlert,
  useZIonErrorAlert,
  useZIonLoading,
  useZIonModal,
} from 'ZaionsHooks/zionic-hooks';

// Types
import { LinkTargetType, ShortLinkType } from 'types/AdminPanel/linksType';

// Recoil State
import { ShortLinkFormState } from 'ZaionsStore/FormStates/shortLinkFormState';
import { useParams } from 'react-router';
import {
  FilteredShortLinkData,
  ShortLinksFilterOptionsRState,
  ShortLinksRState,
} from 'ZaionsStore/UserDashboard/ShortLinks/ShortLinkState.recoil';
import { reportCustomError } from 'utils/customErrorType';
import ZaionsPixelAccountDetail from '../ZaionsModals/PixelAccount/pixelAccountDetailModal';

// Styles

const ZaionsShortLinkTable = () => {
  const [compState, setCompState] = useState<{
    selectedShortLinkId?: string;
    showActionPopover: boolean;
  }>({ showActionPopover: false });

  const _setShortLinksData = useSetRecoilState(ShortLinksRState);

  const _filteredShortLinkData = useRecoilValue(FilteredShortLinkData);

  const _setShortLinksFilterOptions = useSetRecoilState(
    ShortLinksFilterOptionsRState
  );

  const { folderId } = useParams<{ folderId: string }>();
  const actionsPopoverRef = useRef<HTMLIonPopoverElement>(null);
  const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();
  const setShortLinkFormState = useSetRecoilState(ShortLinkFormState);
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonAlert } = useZIonAlert();
  const { zNavigatePushRoute } = useZNavigate();
  const { mutate: deleteShortLinkMutate } = useZRQDeleteRequest(
    API_URL_ENUM.shortLinks_update_delete,
    [CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.MAIN]
  );

  const { data: getShortLinksData } = useZRQGetRequest<ShortLinkType[]>({
    _url: API_URL_ENUM.shortLinks_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.MAIN],
  });

  const { presentZIonModal: presentPixelAccountDetailModal } = useZIonModal(
    ZaionsPixelAccountDetail
  );

  useEffect(() => {
    try {
      _setShortLinksFilterOptions((oldState) => ({
        ...oldState,
        folderId: folderId,
      }));
      if (getShortLinksData) {
        _setShortLinksData(getShortLinksData);
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderId, getShortLinksData]);

  const showActionsPopover = (
    _event: React.MouseEvent<HTMLIonButtonElement, MouseEvent>
  ) => {
    if (actionsPopoverRef.current) {
      actionsPopoverRef.current.event = _event;
    }
  };

  const editShortLinkDetails = async () => {
    try {
      if (compState && compState.selectedShortLinkId) {
        // was using history here.
        zNavigatePushRoute(
          replaceParams(
            ZaionsRoutes.AdminPanel.ZaionsAdminEditLinkPageRoute,
            CONSTANTS.RouteParams.editShortLinkIdParam,
            compState.selectedShortLinkId
          )
        );
      } else {
        await presentZIonErrorAlert();
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  const deleteShortLink = async () => {
    try {
      if (
        compState.selectedShortLinkId?.trim() &&
        _filteredShortLinkData?.length
      ) {
        const selectedShortLinkId = _filteredShortLinkData?.find(
          (el) => el.id === compState.selectedShortLinkId
        );
        await presentZIonAlert({
          header: `Delete Short Link "${selectedShortLinkId?.title || ''}"`,
          subHeader: 'Remove Short Link from user account.',
          message: 'Are you sure you want to delete this Short Link?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'Delete',
              role: 'danger',
              handler: () => {
                void removeShortLink();
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

  const removeShortLink = async () => {
    await presentZIonLoader('Deleting Short Link...');
    try {
      if (
        compState.selectedShortLinkId?.trim() &&
        _filteredShortLinkData?.length
      ) {
        if (compState.selectedShortLinkId) {
          deleteShortLinkMutate({
            itemIds: [compState.selectedShortLinkId],
            urlDynamicParts: [':shortLinkId'],
          });
        }
        await dismissZIonLoader();
      } else {
        void presentZIonErrorAlert();
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  return (
    <>
      <ZIonRow className='pt-4 pb-1 px-4 zaions__bg_white mx-1 mt-5 ion-margin-bottom '>
        <ZIonCol>
          <ZTable>
            <ZTableTHead>
              <ZTableRow>
                <ZTableHeadCol>
                  <ZIonCheckbox />
                </ZTableHeadCol>
                <ZTableHeadCol>Title</ZTableHeadCol>
                <ZTableHeadCol>Clicks</ZTableHeadCol>
                <ZTableHeadCol>Data</ZTableHeadCol>
                <ZTableHeadCol>Pixels</ZTableHeadCol>
                <ZTableHeadCol>Note</ZTableHeadCol>
                <ZTableHeadCol>Url</ZTableHeadCol>
                <ZTableHeadCol>Link To Share</ZTableHeadCol>
                <ZTableHeadCol>Action</ZTableHeadCol>
              </ZTableRow>
            </ZTableTHead>
            <ZTableTBody>
              {_filteredShortLinkData &&
                _filteredShortLinkData?.map((el) => (
                  <ZTableRow key={el.id}>
                    <ZTableRowCol>
                      <ZIonCheckbox />
                    </ZTableRowCol>
                    <ZTableRowCol>{el.title}</ZTableRowCol>
                    <ZTableRowCol>{el.totalClicks || 0}</ZTableRowCol>
                    <ZTableRowCol>{el.createdAt}</ZTableRowCol>
                    <ZTableRowCol>
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
                              setShortLinkFormState((oldVal) => ({
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
                            setShortLinkFormState((oldVal) => ({
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
                        {(el.target as LinkTargetType)?.url}
                      </ZIonRouterLink>
                    </ZTableRowCol>
                    <ZTableRowCol>
                      <ZIonRouterLink
                        routerLink={ZaionsBusinessDetails.WebsiteUrl}
                      >
                        {ZaionsBusinessDetails.WebsiteUrl}
                      </ZIonRouterLink>{' '}
                    </ZTableRowCol>
                    <ZTableRowCol>
                      <ZIonButton
                        fill='clear'
                        color={'dark'}
                        onClick={(_event) => {
                          setCompState((oldVal) => ({
                            ...oldVal,
                            selectedShortLinkId: el.id,
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
          {!_filteredShortLinkData?.length && (
            <ZIonCol className='ion-text-center'>
              <ZIonTitle className='mt-3'>
                <ZIonIcon
                  icon={fileTrayFullOutline}
                  className='mx-auto'
                  size='large'
                  color='medium'
                />
              </ZIonTitle>
              <ZIonTitle color='medium'>
                No short links founds{' '}
                {(folderId !== null || folderId !== 'all') && 'In this Folder'}.
                please create a short link.
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
                void editShortLinkDetails();
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
              onClick={() => void deleteShortLink()}
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

export default ZaionsShortLinkTable;
