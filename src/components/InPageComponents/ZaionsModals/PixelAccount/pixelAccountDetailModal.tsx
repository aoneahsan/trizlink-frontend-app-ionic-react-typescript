// Core Imports
import React from 'react';
// Packages Import
import { useRecoilState, useRecoilValue } from 'recoil';

// Custom Imports

// Global Constants
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonHeader,
  ZIonContent,
  ZIonFooter,
  ZIonGrid,
  ZIonImg
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
import { ProductFavicon } from '@/assets/images';

// Styles

const ZaionsPixelAccountDetail: React.FC<{
  workspaceId: string;
  shareWSMemberId: string;
  wsShareId: string;
  dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({ dismissZIonModal, workspaceId, shareWSMemberId, wsShareId }) => {
  const appSettings = useRecoilValue(ZaionsAppSettingsRState);

  //
  const [shortLinkFormState, SetShortLinkFormState] =
    useRecoilState(ShortLinkFormState);

  // If owned-workspace then this api will fetch owned-workspace-pixels data.
  const { data: __pixelAccountsData } = useZRQGetRequest<PixelAccountType[]>({
    _url: API_URL_ENUM.userPixelAccounts_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN, workspaceId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _itemsIds: [workspaceId],
    _shouldFetchWhenIdPassed: workspaceId ? false : true,
    _showLoader: false
  });

  // If share-workspace then this api will fetch share-workspace-pixels data.
  const { data: __swsPixelAccountsData } = useZRQGetRequest<PixelAccountType[]>(
    {
      _url: API_URL_ENUM.sws_pixel_account_create_list,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.SWS_MAIN,
        wsShareId
      ],
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
      _itemsIds: [shareWSMemberId],
      _shouldFetchWhenIdPassed: wsShareId && shareWSMemberId ? false : true,
      _showLoader: false
    }
  );

  /**
   * Handle Form Submission Function
   * add a Api Key function
   *  */
  const SetDefaultShortLinkFormState = () => {
    // Reset to default
    SetShortLinkFormState(oldVal => ({
      ...oldVal,
      mode: FormMode.ADD,
      ApiKey: {}
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
                fill='outline'>
                Close
              </ZIonButton>
            </ZIonCol>
          </ZIonRow>
        </ZIonHeader>
      )}

      <ZIonContent className='ion-padding'>
        <div className='flex flex-col ion-text-center ion-justify-content-center ion-padding-top ion-margin-top'>
          <div className='flex mx-auto mb-0 rounded-full w-11 h-11 ion-align-items-center ion-justify-content-enter'>
            <ZIonImg
              src={ProductFavicon}
              className='w-10 h-10 mx-auto'
            />
          </div>
          <ZIonText
            color='dark'
            className='block mt-3 text-xl font-bold ion-text-center'>
            Pixels Id's
          </ZIonText>
        </div>
        <ZIonGrid className='pt-4'>
          <ZIonRow className='flex border border-b-0 flex-nowrap zaions__light_bg'>
            <ZIonCol className='px-2 py-1 border-r ion-no-padding'>
              Plate Form
            </ZIonCol>
            <ZIonCol className='px-2 py-1 ion-no-padding'>Name</ZIonCol>
          </ZIonRow>

          {shortLinkFormState.pixelAccountIds?.map(el => {
            let pixel;
            if (workspaceId !== undefined) {
              pixel =
                __pixelAccountsData &&
                __pixelAccountsData.find(_pixel => _pixel.id === el);
            } else if (
              wsShareId !== undefined &&
              shareWSMemberId !== undefined
            ) {
              pixel =
                __swsPixelAccountsData &&
                __swsPixelAccountsData.find(_pixel => _pixel.id === el);
            }

            return (
              <ZIonRow
                key={el}
                className='flex border ion-align-items-center'>
                <ZIonCol className='px-2 py-1 border-r ion-no-padding'>
                  {pixel?.platform}
                </ZIonCol>
                <ZIonCol className='px-2 py-1 ion-no-padding'>
                  {pixel?.title}
                </ZIonCol>
              </ZIonRow>
            );
          })}
          {/* <ZIonRow>
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
                    shortLinkFormState.pixelAccountIds?.map(el => {
                      const pixel =
                        __pixelAccountsData &&
                        __pixelAccountsData.find(_pixel => _pixel.id === el);
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
          </ZIonRow> */}
        </ZIonGrid>
      </ZIonContent>

      {/**
       * Footer of Modal will shown if the `showActionInModalFooter` is set to `true` in      appSetting, and hide if it is `false`
       * default: true
       *  */}
      {appSettings.appModalsSetting.actions.showActionInModalFooter && (
        <ZIonFooter>
          <ZIonRow className='mx-3 mt-2 ion-justify-content-between ion-align-items-center'>
            <ZIonCol>
              <ZIonButton
                fill='outline'
                size='default'
                className='ion-text-capitalize'
                onClick={() => {
                  // Close The Modal
                  dismissZIonModal();
                  SetDefaultShortLinkFormState();
                }}>
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
