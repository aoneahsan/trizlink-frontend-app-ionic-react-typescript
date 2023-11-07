/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonContent,
  ZIonIcon,
  ZIonText
} from '@/components/ZIonComponents';

import {
  useZGetRQCacheData,
  useZRQCreateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import {
  createRedirectRoute,
  extractInnerData,
  zStringify
} from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { reportCustomError } from '@/utils/customErrorType';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  ZLinkInBioPageEnum,
  ZLinkInBioRHSComponentEnum
} from '@/types/AdminPanel/linkInBioType';
import {
  LinkInBioBlockEnum,
  type LinkInBioBlockFromType,
  LinkInBioBlocksPositionEnum,
  type LinkInBioSingleBlockContentType
} from '@/types/AdminPanel/linkInBioType/blockTypes';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { LinkInBioBlocksRState } from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioBlocksState';
import { useSetRecoilState } from 'recoil';
import { closeOutline, toggleOutline } from 'ionicons/icons';
import { LinkInBioBlocksDefaultData } from '@/data/UserDashboard/LinkInBio/Blocks/index.data';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

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
  workspaceId: string;
  zNavigatePushRoute?: (_url: string) => void;
}> = ({
  dismissZIonModal,
  _blockType,
  _blockContent = LinkInBioBlocksDefaultData[_blockType as string],
  linkInBioId,
  modalHeading = 'Add block 😊',
  modalSubHeading = `Would you like add this ${_blockType} block in your page?`,
  workspaceId,
  zNavigatePushRoute
}) => {
  // #region Custom Hooks.
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  // #endregion

  const setLinkInBioBlocksState = useSetRecoilState(LinkInBioBlocksRState);

  // #region APIS.
  // API to create new block belong to this link-in-bio.
  const { mutateAsync: createLinkInBioMutate } =
    useZRQCreateRequest<LinkInBioBlockFromType>({
      _url: API_URL_ENUM.linkInBioBlock_create_list,
      _authenticated: true,
      _itemsIds: [workspaceId, linkInBioId],
      _urlDynamicParts: [
        CONSTANTS.RouteParams.workspace.workspaceId,
        CONSTANTS.RouteParams.linkInBio.linkInBioId
      ]
    });
  // #endregion

  const addBlockHandler = async (
    _position: LinkInBioBlocksPositionEnum
  ): Promise<void> => {
    try {
      if (_position !== undefined) {
        const _stringifyValue = zStringify({
          blockType: _blockType,
          blockContent: zStringify(_blockContent),
          position: _position
        });

        const _response = await createLinkInBioMutate(_stringifyValue);

        if (_response !== undefined) {
          const _data = extractInnerData<LinkInBioBlockFromType>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data?.id !== null) {
            const _oldBlocks = extractInnerData<LinkInBioBlockFromType[]>(
              getRQCDataHandler({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_BLOCK.MAIN,
                  workspaceId,
                  linkInBioId
                ]
              }),
              extractInnerDataOptionsEnum.createRequestResponseItems
            );

            if (_oldBlocks !== undefined) {
              let _updatedBlocks = [..._oldBlocks];

              if (_position === LinkInBioBlocksPositionEnum.top) {
                _updatedBlocks = [
                  _data as LinkInBioBlockFromType,
                  ..._oldBlocks
                ];

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
                _updatedBlocks = [
                  ..._oldBlocks,
                  _data as LinkInBioBlockFromType
                ];

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
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_BLOCK.MAIN,
                  workspaceId,
                  linkInBioId
                ],
                data: _updatedBlocks,
                updateHoleData: true,
                extractType: ZRQGetRequestExtractEnum.extractItems
              });
            }
            // after dismissing redirecting to blockForm
            zNavigatePushRoute !== undefined &&
              zNavigatePushRoute(
                createRedirectRoute({
                  url: ZaionsRoutes.AdminPanel.LinkInBio.Edit,
                  params: [
                    CONSTANTS.RouteParams.workspace.workspaceId,
                    CONSTANTS.RouteParams.linkInBio.linkInBioId
                  ],
                  values: [workspaceId, linkInBioId],
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
        <div className='flex flex-col ion-text-center ion-justify-content-center ion-margin-top'>
          <ZIonText className='mb-0 zaions__primary_bg w-[50px] h-[50px] zaions__modal_icon mx-auto ion-margin-bottom inline-block'>
            <ZIonIcon
              icon={toggleOutline}
              className='mx-auto'
              color='light'
            />
          </ZIonText>

          <ZIonText
            color='dark'
            className='mt-3 text-xl font-bold'>
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
      </ZIonContent>

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
