/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { checkmarkOutline, closeOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCol,
  ZIonContent,
  ZIonIcon,
  ZIonSkeletonText,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZIonToast } from '@/ZaionsHooks/zionic-hooks';
import {
  useZGetRQCacheData,
  useZRQGetRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { extractInnerData, zStringify } from '@/utils/helpers';
import { showSuccessNotification } from '@/utils/notification';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { ZTeamMemberInvitationEnum } from '@/types/AdminPanel/index.type';
import {
  wsShareInterface,
  WSTeamMembersInterface
} from '@/types/AdminPanel/workspace';
import { ZLinkMutateApiType } from '@/types/ZaionsApis.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import reactSelect from 'react-select';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

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
 * About: (Invitation view modal)
 * @type {*}
 * */
const ZViewInvitationModal: React.FC<{
  dismissZIonModal: (data?: string, role?: string | undefined) => void;
  workspaceId: string;
  memberInviteId: string;
}> = ({ workspaceId, memberInviteId, dismissZIonModal }) => {
  // #region Custom Hooks.
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  // #endregion

  // #region APIS.
  // api to get Invitation data
  const { data: userInvitationData, isFetching: isInvitationFetching } =
    useZRQGetRequest<WSTeamMembersInterface>({
      _url: API_URL_ENUM.ws_team_member_invite_get,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.INVITATION_GET,
        memberInviteId
      ],
      _showLoader: false,
      _checkPermissions: false,
      _itemsIds: [memberInviteId],
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.memberInviteId],
      _extractType: ZRQGetRequestExtractEnum.extractItem
    });

  // update invitation data api
  const { mutateAsync: updateInvitationAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.ws_team_member_update,
    _queriesKeysToInvalidate: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.NOTIFICATION.MAIN,
      workspaceId
    ]
  });

  // #endregion

  // #region Functions.
  const zInvitationResponseHandler = async ({
    _item
  }: {
    _item: ZTeamMemberInvitationEnum;
  }) => {
    try {
      if (_item) {
        const __response = await updateInvitationAsyncMutate({
          requestData: zStringify({
            status: _item
          }),
          itemIds: [memberInviteId],
          urlDynamicParts: [CONSTANTS.RouteParams.workspace.memberInviteId]
        });

        if (
          (__response as ZLinkMutateApiType<WSTeamMembersInterface>).success
        ) {
          const __data = extractInnerData<WSTeamMembersInterface>(
            __response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (__data && __data?.id) {
            await updateRQCDataHandler({
              key: [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.INVITATION_GET,
                memberInviteId!
              ],
              data: __data,
              id: '',
              updateHoleData: true,
              extractType: ZRQGetRequestExtractEnum.extractItem
            });

            const getWSShareWorkspaceData = getRQCDataHandler({
              key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.WS_SHARE_MAIN]
            });

            const __oldData =
              extractInnerData<wsShareInterface[]>(
                getWSShareWorkspaceData,
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) || [];

            if (_item === ZTeamMemberInvitationEnum.accepted) {
              await updateRQCDataHandler({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.WS_SHARE_MAIN
                ],
                data: {
                  ...__data.workspace,
                  id: __data?.id,
                  accountStatus: __data?.accountStatus
                },
                id: __data?.id!
              });
            } else if (_item === ZTeamMemberInvitationEnum.rejected) {
              const __updatedData = __oldData?.filter(
                el => el?.id !== __data?.id
              );

              await updateRQCDataHandler({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.WS_SHARE_MAIN
                ],
                data: __updatedData,
                id: '',
                updateHoleData: true,
                extractType: ZRQGetRequestExtractEnum.extractItems
              });
            }

            if (_item === ZTeamMemberInvitationEnum.accepted) {
              showSuccessNotification('Successfully accepted invitation.');
            } else if (_item === ZTeamMemberInvitationEnum.rejected) {
              showSuccessNotification('Successfully rejected invitation.');
            }
          }
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  const isZFetching = isInvitationFetching;

  return (
    <ZIonContent className='ion-padding'>
      {/* Close modal button */}
      <div className='ion-text-end'>
        <ZIonButton
          className='ion-no-padding ion-no-margin'
          fill='clear'
          color='dark'
          testingselector={
            CONSTANTS.testingSelectors.invitation.viewModal.closeBtn
          }
          onClick={() => {
            dismissZIonModal();
          }}>
          <ZIonIcon
            icon={closeOutline}
            className='w-7 h-7'
          />
        </ZIonButton>
      </div>

      {/* Main container */}
      <div className='flex flex-col ion-justify-content-center ion-text-center'>
        {!isZFetching && (
          <ZIonTitle className='mt-3 text-lg font-bold ion-no-padding'>
            Invitation to join Team
          </ZIonTitle>
        )}
        {isZFetching && (
          <ZIonSkeletonText
            width='12rem'
            height='.9rem'
            className='mx-auto mt-3'
          />
        )}

        {!isZFetching && (
          <ZIonText className='mt-5 text-xl'>
            You have received a invitation to join a team
          </ZIonText>
        )}
        {isZFetching && (
          <ZIonSkeletonText
            width='92%'
            height='.9rem'
            className='mx-auto mt-5'
          />
        )}

        {!isZFetching &&
        userInvitationData?.inviteAcceptedAt === null &&
        userInvitationData?.inviteRejectedAt === null ? (
          <ZIonCol
            className='w-[80%] mx-auto mt-5'
            testingselector={
              CONSTANTS.testingSelectors.invitation.viewModal.actionBtnContainer
            }>
            <ZIonButton
              color='success'
              expand='block'
              disabled={userInvitationData?.inviteAcceptedAt !== null}
              testingselector={
                CONSTANTS.testingSelectors.invitation.viewModal.acceptedBtn
              }
              onClick={() => {
                zInvitationResponseHandler({
                  _item: ZTeamMemberInvitationEnum.accepted
                });
              }}>
              <ZIonIcon icon={checkmarkOutline} /> Accept
            </ZIonButton>

            {/*  */}
            <ZIonButton
              color='danger'
              expand='block'
              className='mt-3'
              disabled={userInvitationData?.inviteRejectedAt !== null}
              testingselector={
                CONSTANTS.testingSelectors.invitation.viewModal.rejectedBtn
              }
              onClick={() => {
                zInvitationResponseHandler({
                  _item: ZTeamMemberInvitationEnum.rejected
                });
              }}>
              <ZIonIcon icon={closeOutline} /> Reject
            </ZIonButton>
          </ZIonCol>
        ) : null}

        {isZFetching && (
          <ZIonCol className='w-[80%] mx-auto mt-5'>
            <ZIonSkeletonText
              width='100%'
              height='2rem'
              className='mx-auto mt-5'
            />
            <ZIonSkeletonText
              width='100%'
              height='2rem'
              className='mx-auto mt-5'
            />
          </ZIonCol>
        )}

        {!isZFetching && (
          <ZIonCol
            testingselector={
              CONSTANTS.testingSelectors.invitation.viewModal.messageContainer
            }>
            {userInvitationData?.inviteAcceptedAt !== null ? (
              <ZIonText
                className='block text-xl mt-7'
                color='success'
                testingselector={
                  CONSTANTS.testingSelectors.invitation.viewModal.acceptedText
                }>
                You accepted this invite.
              </ZIonText>
            ) : null}
            {userInvitationData?.inviteRejectedAt !== null ? (
              <ZIonText
                className='block text-xl mt-7'
                color='danger'
                testingselector={
                  CONSTANTS.testingSelectors.invitation.viewModal.rejectedBtn
                }>
                You rejected this invite.
              </ZIonText>
            ) : null}
          </ZIonCol>
        )}
      </div>
    </ZIonContent>
  );
};

export default ZViewInvitationModal;
