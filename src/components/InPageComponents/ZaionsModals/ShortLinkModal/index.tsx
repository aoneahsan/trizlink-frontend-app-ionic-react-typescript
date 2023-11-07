/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { useSetRecoilState } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZCan from '@/components/Can';
import {
  ZIonButton,
  ZIonContent,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZIonToast } from '@/ZaionsHooks/zionic-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import {
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';
import { createRedirectRoute, replaceRouteParams } from '@/utils/helpers';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  FormMode,
  messengerPlatformsBlockEnum
} from '@/types/AdminPanel/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import {
  NewShortLinkFormState,
  NewShortLinkSelectTypeOption
} from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkFormState.recoil';
import { LinkTypeOptionsData } from '@/data/UserDashboard/Links';

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

const ZShortLinkModal: React.FC<{
  dismissZIonModal: (data?: string, role?: string | undefined) => void;
  zNavigatePushRoute: (_url: string) => void;
  workspaceId: string;
  shortUrl: string;
  shareWSMemberId: string;
  wsShareId: string;
}> = ({
  dismissZIonModal,
  zNavigatePushRoute,
  workspaceId,
  shortUrl,
  shareWSMemberId,
  wsShareId
}) => {
  const { presentZIonToast } = useZIonToast();
  //
  const setNewShortLinkFormState = useSetRecoilState(NewShortLinkFormState);

  const setNewShortLinkTypeOptionDataAtom = useSetRecoilState(
    NewShortLinkSelectTypeOption
  );

  return (
    <>
      <ZIonContent className='ion-padding'>
        <div className='flex flex-col h-full ion-align-items-center ion-justify-content-center'>
          <ZIonText className='text-xl font-bold'>Well done 🧙</ZIonText>
          <ZIonText className='text-lg font-normal'>
            Your link is ready to be shared
          </ZIonText>

          {/* Copy short link to clipboard */}
          <div className='flex w-[90%] rounded-lg overflow-hidden my-5'>
            <div className='zaions__medium_bg h-[2.5rem] w-[90%] overflow-hidden line-clamp-1  flex ion-align-items-center ps-2'>
              <ZIonTitle
                className='text-sm ion-no-padding'
                color='light'>
                {shortUrl}
              </ZIonTitle>
            </div>
            <ZIonButton
              height='2.5rem'
              className='ion-no-margin'
              style={{
                '--border-radius': '0px'
              }}
              onClick={() => {
                void navigator?.clipboard?.writeText(shortUrl);

                void presentZIonToast('✨ Copied', 'tertiary');
              }}>
              Copy
            </ZIonButton>
          </div>

          {/* Buttons */}
          <div className='flex w-[90%] ion-justify-content-between'>
            <ZCan
              shareWSId={wsShareId}
              permissionType={
                workspaceId !== undefined
                  ? permissionsTypeEnum.loggedInUserPermissions
                  : permissionsTypeEnum.shareWSMemberPermissions
              }
              havePermissions={
                workspaceId !== undefined
                  ? [permissionsEnum.create_shortLink]
                  : wsShareId !== undefined && shareWSMemberId !== undefined
                  ? [shareWSPermissionEnum.create_sws_shortLink]
                  : []
              }>
              <ZIonButton
                fill='outline'
                onClick={() => {
                  dismissZIonModal();

                  setNewShortLinkFormState(oldValues => ({
                    ...oldValues,
                    folderId: CONSTANTS.DEFAULT_VALUES.DEFAULT_FOLDER,
                    shortUrl: {
                      domain: CONSTANTS.DEFAULT_VALUES.DEFAULT_CUSTOM_DOMAIN
                    },
                    type: messengerPlatformsBlockEnum.link,
                    pixelIds: [],
                    tags: [],
                    formMode: FormMode.ADD
                  }));

                  const selectedTypeOptionData = LinkTypeOptionsData.find(
                    el => el.type === messengerPlatformsBlockEnum.link
                  );

                  if (selectedTypeOptionData !== undefined) {
                    setNewShortLinkTypeOptionDataAtom(_ => ({
                      ...selectedTypeOptionData
                    }));
                  }

                  if (workspaceId !== undefined) {
                    zNavigatePushRoute(
                      createRedirectRoute({
                        url: ZaionsRoutes.AdminPanel.ShortLinks.Create,
                        params: [CONSTANTS.RouteParams.workspace.workspaceId],
                        values: [workspaceId]
                      })
                    );
                  } else if (
                    wsShareId !== undefined &&
                    shareWSMemberId !== undefined
                  ) {
                    zNavigatePushRoute(
                      createRedirectRoute({
                        url: ZaionsRoutes.AdminPanel.ShareWS.Short_link.Create,
                        params: [
                          CONSTANTS.RouteParams.workspace.wsShareId,
                          CONSTANTS.RouteParams.workspace.shareWSMemberId
                        ],
                        values: [wsShareId, shareWSMemberId]
                      })
                    );
                  }
                }}>
                Create a new link
              </ZIonButton>
            </ZCan>

            <ZIonButton
              onClick={() => {
                dismissZIonModal();

                if (workspaceId !== undefined) {
                  zNavigatePushRoute(
                    replaceRouteParams(
                      ZaionsRoutes.AdminPanel.ShortLinks.Main,
                      [
                        CONSTANTS.RouteParams.workspace.workspaceId,
                        CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                      ],
                      [workspaceId, CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE]
                    )
                  );
                } else if (
                  wsShareId !== undefined &&
                  shareWSMemberId !== undefined
                ) {
                  zNavigatePushRoute(
                    createRedirectRoute({
                      url: ZaionsRoutes.AdminPanel.ShareWS.Short_link.Main,
                      params: [
                        CONSTANTS.RouteParams.workspace.wsShareId,
                        CONSTANTS.RouteParams.workspace.shareWSMemberId,
                        CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                      ],
                      values: [
                        wsShareId,
                        shareWSMemberId,
                        CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                      ]
                    })
                  );
                }
              }}>
              Go to dashboard
            </ZIonButton>
          </div>
        </div>
      </ZIonContent>
    </>
  );
};

export default ZShortLinkModal;
