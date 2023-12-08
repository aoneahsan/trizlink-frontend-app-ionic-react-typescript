/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { useSetRecoilState } from 'recoil';
import { closeOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCol,
  ZIonContent,
  ZIonFooter,
  ZIonIcon,
  ZIonImg,
  ZIonItem,
  ZIonList,
  ZIonRadio,
  ZIonRadioGroup,
  ZIonRow,
  ZIonSpinner,
  ZIonText
} from '@/components/ZIonComponents';

import {
  useZGetRQCacheData,
  useZRQCreateRequest,
  useZRQGetRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import {
  _getQueryKey,
  createRedirectRoute,
  extractInnerData,
  isZNonEmptyString,
  isZNonEmptyStrings,
  zStringify
} from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import {
  API_URL_ENUM,
  ZWSTypeEum,
  extractInnerDataOptionsEnum
} from '@/utils/enums';
import { reportCustomError } from '@/utils/customErrorType';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  ZLinkInBioPageEnum,
  ZLinkInBioRHSComponentEnum,
  addBlockModalUIEnum,
  type libFormSettingsInterface
} from '@/types/AdminPanel/linkInBioType';
import {
  LinkInBioBlockEnum,
  type LinkInBioBlockFromType,
  LinkInBioBlocksPositionEnum,
  type LinkInBioSingleBlockContentType
} from '@/types/AdminPanel/linkInBioType/blockTypes';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { LinkInBioBlocksRState } from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioBlocksState';
import { LinkInBioBlocksDefaultData } from '@/data/UserDashboard/LinkInBio/Blocks/index.data';

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */
import { ProductFaviconSmall } from '@/assets/images';
import { ZUserSettingTypeEnum } from '@/types/AdminPanel/index.type';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */
const ZLinkInBioAddBlockModal: React.FC<{
  dismissZIonModal: (data?: string, role?: string | undefined) => void;
  _blockType: LinkInBioBlockEnum;
  _blockContent: LinkInBioSingleBlockContentType;
  linkInBioId: string;
  modalHeading?: string;
  modalSubHeading?: string;
  workspaceId?: string;
  shareWSMemberId?: string;
  wsShareId?: string;
  zNavigatePushRoute?: (_url: string) => void;
}> = ({
  dismissZIonModal,
  _blockType,
  _blockContent = LinkInBioBlocksDefaultData[_blockType as string],
  linkInBioId,
  modalHeading = 'Add block 😊',
  modalSubHeading = `Would you like add this ${_blockType} block in your page?`,
  workspaceId,
  shareWSMemberId,
  wsShareId,
  zNavigatePushRoute
}) => {
  // #region Comp State
  const [compState, setCompState] = useState<{
    linkInBioBlocksPosition: LinkInBioBlocksPositionEnum;
  }>({
    linkInBioBlocksPosition: LinkInBioBlocksPositionEnum.bottom
  });
  // #endregion

  // #region Custom Hooks.
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  // #endregion

  // #region Recoil State.
  const setLinkInBioBlocksState = useSetRecoilState(LinkInBioBlocksRState);
  // #endregion

  // #region APIS.
  // API to create new block belong to this link-in-bio.
  const { mutateAsync: createLinkInBioMutate } =
    useZRQCreateRequest<LinkInBioBlockFromType>({
      _url: API_URL_ENUM.linkInBioBlock_create_list,
      _itemsIds: _getQueryKey({
        keys: [
          isZNonEmptyString(workspaceId)
            ? ZWSTypeEum.personalWorkspace
            : isZNonEmptyString(wsShareId) && isZNonEmptyString(shareWSMemberId)
            ? ZWSTypeEum.shareWorkspace
            : ''
        ],
        additionalKeys: [workspaceId, shareWSMemberId, linkInBioId]
      }),
      _urlDynamicParts: [
        CONSTANTS.RouteParams.workspace.type,
        CONSTANTS.RouteParams.workspace.workspaceId,
        CONSTANTS.RouteParams.linkInBio.linkInBioId
      ]
    });

  const {
    data: getLinkInBioFiltersData,
    isFetching: isLinkInBioFiltersDataFetching
  } = useZRQGetRequest<libFormSettingsInterface>({
    _url: API_URL_ENUM.user_setting_delete_update_get,
    _key: _getQueryKey({
      keys: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.SWS_GET,
        ZUserSettingTypeEnum.libFormSettings
      ],
      additionalKeys: [workspaceId, wsShareId, shareWSMemberId]
    }),
    _itemsIds: _getQueryKey({
      keys: [
        isZNonEmptyString(workspaceId)
          ? ZWSTypeEum.personalWorkspace
          : isZNonEmptyString(wsShareId) && isZNonEmptyString(shareWSMemberId)
          ? ZWSTypeEum.shareWorkspace
          : '',
        ZUserSettingTypeEnum.libFormSettings
      ],
      additionalKeys: [workspaceId, shareWSMemberId]
    }),
    _urlDynamicParts: [
      CONSTANTS.RouteParams.workspace.type,
      CONSTANTS.RouteParams.settings.type,
      CONSTANTS.RouteParams.workspace.workspaceId
    ],
    _extractType: ZRQGetRequestExtractEnum.extractItem,
    _shouldFetchWhenIdPassed: !(
      isZNonEmptyStrings([workspaceId]) ||
      isZNonEmptyStrings([wsShareId, shareWSMemberId])
    ),
    _showLoader: false
  });
  // #endregion

  // #region Functions.
  const addBlockHandler = async (
    _position: LinkInBioBlocksPositionEnum,
    _shouldRedirect: boolean = true
  ): Promise<void> => {
    try {
      if (_position !== undefined && _position !== null) {
        const _stringifyValue = zStringify({
          blockType: _blockType,
          blockContent: zStringify(_blockContent),
          position: _position
        });

        const _response = await createLinkInBioMutate(_stringifyValue);

        if (_response !== undefined && _response !== null) {
          const _data = extractInnerData<LinkInBioBlockFromType>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data?.id !== null && _data?.id !== undefined) {
            const _oldBlocks = extractInnerData<LinkInBioBlockFromType[]>(
              getRQCDataHandler({
                key: _getQueryKey({
                  keys: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_BLOCK.MAIN
                  ],
                  additionalKeys: [
                    workspaceId,
                    wsShareId,
                    shareWSMemberId,
                    linkInBioId
                  ]
                })
              }),
              extractInnerDataOptionsEnum.createRequestResponseItems
            );

            if (_oldBlocks !== undefined && _oldBlocks !== null) {
              let _updatedBlocks = [..._oldBlocks];

              if (_position === LinkInBioBlocksPositionEnum.top) {
                _updatedBlocks = [_data, ..._oldBlocks];

                //
                const _newLinkInBioBlock: LinkInBioBlockFromType = {
                  id: _data?.id,
                  blockType:
                    LinkInBioBlockEnum[_data?.blockType as LinkInBioBlockEnum],
                  blockContent:
                    _data?.blockContent as LinkInBioSingleBlockContentType,
                  // icon: 'string',
                  isActive: _data?.isActive,
                  orderNo: '-1' // as in API we always set orderNo from 0, so setting it, -1 mean this will have the lowest orderNo
                };

                //
                setLinkInBioBlocksState(oldValues => [
                  _newLinkInBioBlock,
                  ...oldValues
                ]);
              } else if (_position === LinkInBioBlocksPositionEnum.bottom) {
                _updatedBlocks = [..._oldBlocks, _data];

                //
                const _newLinkInBioBlock: LinkInBioBlockFromType = {
                  id: _data?.id,
                  blockType:
                    LinkInBioBlockEnum[_data?.blockType as LinkInBioBlockEnum],
                  blockContent:
                    _data?.blockContent as LinkInBioSingleBlockContentType, // icon: 'string',
                  isActive: _data?.isActive,
                  orderNo: '100000' // as in API we always set orderNo from 0, so setting it, 100000 mean this will have the highest orderNo (hopefully)
                };
                setLinkInBioBlocksState(oldValues => [
                  ...oldValues,
                  _newLinkInBioBlock
                ]);
              }

              await updateRQCDataHandler({
                id: '',
                key: _getQueryKey({
                  keys: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_BLOCK.MAIN
                  ],
                  additionalKeys: [
                    workspaceId,
                    wsShareId,
                    shareWSMemberId,
                    linkInBioId
                  ]
                }),
                data: _updatedBlocks,
                updateHoleData: true,
                extractType: ZRQGetRequestExtractEnum.extractItems
              });
            }
            // after dismissing redirecting to blockForm
            zNavigatePushRoute !== undefined &&
              _shouldRedirect &&
              zNavigatePushRoute(
                createRedirectRoute({
                  // url: ZaionsRoutes.AdminPanel.LinkInBio.Edit,
                  url: isZNonEmptyString(workspaceId)
                    ? ZaionsRoutes.AdminPanel.LinkInBio.Edit
                    : isZNonEmptyString(wsShareId) &&
                      isZNonEmptyString(shareWSMemberId)
                    ? ZaionsRoutes.AdminPanel.ShareWS.Link_in_bio.Edit
                    : '',
                  params: [
                    CONSTANTS.RouteParams.workspace.workspaceId,
                    CONSTANTS.RouteParams.linkInBio.linkInBioId
                  ],
                  values: _getQueryKey({
                    keys: [],
                    additionalKeys: [workspaceId, shareWSMemberId, linkInBioId]
                  }),
                  routeSearchParams: {
                    page: ZLinkInBioPageEnum.design,
                    step: ZLinkInBioRHSComponentEnum.blockForm,
                    blockId: _data?.id ?? ''
                  }
                })
              );
          }

          dismissZIonModal();
        }
      }
    } catch (error) {
      dismissZIonModal();
      reportCustomError(error);
    }
  };
  // #endregion

  return (
    <>
      {/**
       * Header of Modal will shown if the `showActionInModalHeader` is set to `true` in  appSetting and hide if it is `false`
       * default: false
       *  */}
      {/* {appSettings.appModalsSetting.actions.showActionInModalHeader && (
        <ZIonHeader>
          <ZIonRow className='ion-align-items-center'>
            <ZIonCol>
              <ZIonButton
                onClick={() => {
                  // Close the Modal
                  dismissZIonModal();
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
      )} */}

      <ZIonContent className='ion-padding'>
        <div className='ion-text-end'>
          <ZIonIcon
            icon={closeOutline}
            className='w-6 h-6 cursor-pointer'
            testingselector={
              CONSTANTS.testingSelectors.linkInBio.formPage.design.blocks
                .addModal.closeModalBtn
            }
            onClick={() => {
              dismissZIonModal();
            }}
          />
        </div>

        <div className='flex flex-col ion-text-center ion-justify-content-center'>
          <div className='flex mx-auto mb-0 rounded-full w-11 h-11 ion-align-items-center ion-justify-content-enter'>
            <ZIonImg
              src={ProductFaviconSmall}
              className='mx-auto w-11 h-11'
            />
          </div>

          <ZIonText
            color='dark'
            className='block mt-3 text-xl font-bold ion-text-center'>
            {modalHeading}
          </ZIonText>

          <ZIonText
            className='mt-2 mb-2'
            testingselector={
              CONSTANTS.testingSelectors.linkInBio.formPage.design.blocks
                .addModal.text
            }>
            {modalSubHeading}
          </ZIonText>
        </div>

        {getLinkInBioFiltersData?.settings?.addBlockModal?.Ui ===
          addBlockModalUIEnum.minimalistic && (
          <div className='flex flex-col ion-text-center ion-justify-content-center ion-margin-top'>
            <ZIonButton
              expand='block'
              className='mt-4'
              testingselector={
                CONSTANTS.testingSelectors.linkInBio.formPage.design.blocks
                  .addModal.topBtn
              }
              onClick={() => {
                void addBlockHandler(LinkInBioBlocksPositionEnum.top);
              }}>
              Insert at top
            </ZIonButton>
            <ZIonButton
              expand='block'
              fill='outline'
              className='mt-3'
              testingselector={
                CONSTANTS.testingSelectors.linkInBio.formPage.design.blocks
                  .addModal.bottomBtn
              }
              onClick={() => {
                void addBlockHandler(LinkInBioBlocksPositionEnum.bottom);
              }}>
              Insert at bottom
            </ZIonButton>
          </div>
        )}

        {!isLinkInBioFiltersDataFetching &&
          getLinkInBioFiltersData?.settings?.addBlockModal?.Ui ===
            addBlockModalUIEnum.advance && (
            <div className=''>
              <ZIonRadioGroup
                value={LinkInBioBlocksPositionEnum.bottom}
                onIonChange={({ target }) => {
                  setCompState(oldValues => ({
                    ...oldValues,
                    linkInBioBlocksPosition:
                      target.value as LinkInBioBlocksPositionEnum
                  }));
                }}>
                <ZIonList lines='full'>
                  <ZIonItem>
                    <ZIonRadio value={LinkInBioBlocksPositionEnum.top}>
                      Insert at top
                    </ZIonRadio>
                  </ZIonItem>
                  <ZIonItem>
                    <ZIonRadio value={LinkInBioBlocksPositionEnum.bottom}>
                      Insert at bottom
                    </ZIonRadio>
                  </ZIonItem>
                </ZIonList>
              </ZIonRadioGroup>
            </div>
          )}

        {isLinkInBioFiltersDataFetching && (
          <div className='flex w-full h-auto mt-6 ion-align-items-center ion-justify-content-center'>
            <ZIonSpinner className='w-10 h-10' />
          </div>
        )}
      </ZIonContent>

      <ZIonFooter>
        <ZIonRow className='mx-3 mt-2 ion-justify-content-between ion-align-items-center'>
          <ZIonCol>
            <ZIonButton
              fill='outline'
              size='default'
              className='ion-text-capitalize'
              onClick={() => {
                dismissZIonModal();
              }}>
              Close
            </ZIonButton>
          </ZIonCol>

          {!isLinkInBioFiltersDataFetching &&
            getLinkInBioFiltersData?.settings?.addBlockModal?.Ui ===
              addBlockModalUIEnum.advance && (
              <ZIonCol className='flex gap-2 ion-justify-content-end ion-align-items-center'>
                <ZIonButton
                  size='default'
                  className='ion-text-capitalize'
                  onClick={() => {
                    void addBlockHandler(compState.linkInBioBlocksPosition);
                  }}>
                  Add & Edit Block
                </ZIonButton>

                <ZIonButton
                  size='default'
                  className='ion-text-capitalize'
                  onClick={() => {
                    void addBlockHandler(
                      compState.linkInBioBlocksPosition,
                      false
                    );
                  }}>
                  Add Block
                </ZIonButton>
              </ZIonCol>
            )}
        </ZIonRow>
      </ZIonFooter>

      {/**
       * Footer of Modal will shown if the `showActionInModalFooter` is set to `true` in appSetting, and hide if it is `false`
       * default: true
       *  */}
      {/* {appSettings.appModalsSetting.actions.showActionInModalFooter && (
        <ZIonFooter>
          <ZIonRow className='mx-3 mt-2 ion-justify-content-between ion-align-items-center'>
            <ZIonCol>
              <ZIonButton
                fill='outline'
                size='default'
                className='ion-text-capitalize'
                onClick={() => {
                  dismissZIonModal();
                }}
              >
                Close
              </ZIonButton>
            </ZIonCol>
          </ZIonRow>
        </ZIonFooter>
      )} */}
    </>
  );
};

export default ZLinkInBioAddBlockModal;
