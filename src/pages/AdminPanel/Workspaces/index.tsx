/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { lazy, Suspense, useEffect, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { addOutline, gitNetworkOutline, starOutline } from 'ionicons/icons';
import classNames from 'classnames';
import { RefresherEventDetail } from '@ionic/react';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZIonPage from '@/components/ZIonPage';
import {
  ZIonButton,
  ZIonCard,
  ZIonCardContent,
  ZIonCol,
  ZIonContent,
  ZIonGrid,
  ZIonIcon,
  ZIonRefresher,
  ZIonRefresherContent,
  ZIonRow,
  ZIonSkeletonText,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';
import ZWorkspacesCardSkeleton from '@/components/WorkspacesComponents/ListCard/index.skeleton';
import ZCan from '@/components/Can';
import ZAddNewWorkspaceModal from '@/components/InPageComponents/ZaionsModals/Workspace/CreateModal';
//
import { ZFallbackIonSpinner2 } from '@/components/CustomComponents/FallbackSpinner';

const ZWorkspacesCard = lazy(
  () => import('@/components/WorkspacesComponents/ListCard')
);

// const ZUserProfileButton = lazy(
// 	() => import('@/components/AdminPanelComponents/UserProfileButton')
// );

const ZAdminPanelTopBar = lazy(
  () => import('@/components/AdminPanelComponents/TopBar')
);

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import {
  useZInvalidateReactQueries,
  useZRQGetRequest
} from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { API_URL_ENUM } from '@/utils/enums';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
import CONSTANTS from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  workspaceInterface,
  wsShareInterface
} from '@/types/AdminPanel/workspace';

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
 * About: (Workspace list page.)
 * @type {*}
 * */
const ZWorkspaceListPage: React.FC = () => {
  //
  const [compState, setCompState] = useState<{
    sharedFavoriteWorkspaces: wsShareInterface[];
    ownedFavoriteWorkspaces: wsShareInterface[];
  }>({
    sharedFavoriteWorkspaces: [],
    ownedFavoriteWorkspaces: []
  });
  const { presentZIonModal: presentZWorkspaceCreateModal } = useZIonModal(
    ZAddNewWorkspaceModal
  );

  const { zInvalidateReactQueries } = useZInvalidateReactQueries();

  // Get workspaces data from backend.
  const { data: WorkspacesData, isFetching: isWorkspacesDataFetching } =
    useZRQGetRequest<workspaceInterface[]>({
      _url: API_URL_ENUM.workspace_create_list,
      _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN]
    });

  // Get workspaces data from backend.
  const { data: WSShareData, isFetching: isWSShareDataFetching } =
    useZRQGetRequest<wsShareInterface[]>({
      _url: API_URL_ENUM.ws_share_list,
      _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MAIN]
    });

  useEffect(() => {
    const _sharedFavoriteWorkspaces = WSShareData?.filter(
      el => el?.isFavorite === 1
    );

    const _ownedFavoriteWorkspaces = WorkspacesData?.filter(
      el => el?.isFavorite === 1
    );

    if (_sharedFavoriteWorkspaces) {
      setCompState(oldValues => ({
        ...oldValues,
        sharedFavoriteWorkspaces: _sharedFavoriteWorkspaces
      }));
    }

    if (_ownedFavoriteWorkspaces) {
      setCompState(oldValues => ({
        ...oldValues,
        ownedFavoriteWorkspaces: _ownedFavoriteWorkspaces
      }));
    }
  }, [WorkspacesData, WSShareData]);

  const zRefetchDataHandler = async () => {
    try {
      await zInvalidateReactQueries([
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN
      ]);

      await zInvalidateReactQueries([
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MAIN
      ]);
    } catch (error) {
      reportCustomError(error);
    }
  };

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    try {
      await zRefetchDataHandler();
      event.detail.complete();
    } catch (error) {
      reportCustomError(error);
    }
  };

  const isZFetching = isWorkspacesDataFetching && isWSShareDataFetching;

  return (
    <ZIonPage pageTitle='Zaions workspaces list page'>
      <ZCan
        havePermissions={[permissionsEnum.viewAny_workspace]}
        returnPermissionDeniedView={true}>
        <ZIonContent className='mb-5'>
          {/* IonRefresher */}
          <ZIonRefresher onIonRefresh={event => void handleRefresh(event)}>
            <ZIonRefresherContent />
          </ZIonRefresher>

          {/* Main grid */}
          <ZIonGrid className='mb-5 ion-no-padding'>
            <Suspense
              fallback={
                <ZIonRow className='h-[4rem] px-3 zaions__light_bg'>
                  <ZFallbackIonSpinner2 />
                </ZIonRow>
              }>
              <ZAdminPanelTopBar
                showRefreshBtn={true}
                refreshBtnOnClick={() => {
                  void zRefetchDataHandler();
                }}
              />
            </Suspense>

            {/* Favorite workspaces */}
            <ZIonCard className='mt-5 border rounded-lg shadow-none zaions__light_bg'>
              <ZIonRow className='px-4 py-5'>
                <ZIonCol
                  size='12'
                  className='ps-3'>
                  <ZIonTitle
                    className='font-bold tracking-wider ion-no-padding'
                    color='dark'>
                    Favorite workspaces
                  </ZIonTitle>
                </ZIonCol>

                {[
                  ...compState?.ownedFavoriteWorkspaces,
                  ...compState?.sharedFavoriteWorkspaces
                ]?.length === 0 && (
                  <ZIonCol
                    size='12'
                    className='flex flex-col py-4 mt-2 rounded-lg ion-align-items-center ion-justify-content-center'>
                    <ZIonIcon
                      icon={starOutline}
                      className='w-10 h-10'
                    />

                    <ZIonText
                      className='block mt-2 tracking-wider text-md ion-text-center'
                      color='dark'>
                      You haven't added any workspaces to your favorites yet.
                      Start by marking your most used workspaces!
                    </ZIonText>
                  </ZIonCol>
                )}

                {[
                  ...compState?.ownedFavoriteWorkspaces,
                  ...compState?.sharedFavoriteWorkspaces
                ]?.length > 0 && (
                  <>
                    {/* single card */}
                    <Suspense fallback={<ZWorkspacesCardSkeleton />}>
                      {!isZFetching &&
                        [
                          ...compState?.ownedFavoriteWorkspaces,
                          ...compState?.sharedFavoriteWorkspaces
                        ]?.map(el => (
                          <ZIonCol
                            sizeXl='3'
                            sizeLg='4'
                            sizeMd='6'
                            sizeSm='6'
                            sizeXs='12'
                            key={el.id}>
                            <ZWorkspacesCard
                              workspaceImage={el.workspaceImage}
                              workspaceName={el.workspaceName as string}
                              user={el.user}
                              workspaceId={
                                el?.accountStatus ? el.workspaceId : el.id
                              }
                              owned={el?.accountStatus ? false : true}
                              accountStatus={el?.accountStatus}
                              createdAt={el.createdAt}
                              isFavorite={el.isFavorite ? true : false}
                              memberId={el.id}
                            />
                          </ZIonCol>
                        ))}
                    </Suspense>
                  </>
                )}
              </ZIonRow>
            </ZIonCard>

            {/* Owned workspaces */}
            <ZIonCard className='mt-5 border rounded-lg shadow-none zaions__light_bg'>
              <ZIonRow className='px-4 py-5'>
                <ZIonCol
                  size='12'
                  className='ps-3'>
                  <ZIonTitle
                    className='font-bold tracking-wider ion-no-padding'
                    color='dark'>
                    Owned workspaces
                  </ZIonTitle>
                </ZIonCol>

                {WorkspacesData?.length === 0 && (
                  <ZIonCol
                    size='12'
                    className='flex flex-col py-4 mt-2 rounded-lg ion-align-items-center ion-justify-content-center'>
                    <ZIonButton
                      className='ion-no-padding ion-no-margin rounded-full overflow-hidden w-[3rem]'
                      height='3rem'
                      color='tertiary'
                      onClick={() => {
                        presentZWorkspaceCreateModal({
                          _cssClass: 'create-workspace-modal-size'
                        });
                      }}>
                      <ZIonIcon
                        icon={addOutline}
                        className='w-6 h-6'
                      />
                    </ZIonButton>

                    <ZIonText
                      className='mt-3 text-lg font-semibold'
                      color='dark'>
                      Workspaces
                    </ZIonText>

                    <ZIonText
                      className='mt-1 tracking-wider'
                      color='dark'>
                      Start by creating a new workspace and organizing your
                      content.
                    </ZIonText>
                  </ZIonCol>
                )}

                {isZFetching && <ZWorkspacesCardSkeleton />}

                {WorkspacesData && WorkspacesData?.length > 0 && (
                  <>
                    {/* single card */}
                    <Suspense fallback={<ZWorkspacesCardSkeleton />}>
                      {!isZFetching &&
                        WorkspacesData &&
                        WorkspacesData.map(el => (
                          <ZCan
                            key={el.id}
                            havePermissions={[permissionsEnum.view_workspace]}>
                            <ZIonCol
                              sizeXl='3'
                              sizeLg='4'
                              sizeMd='6'
                              sizeSm='6'
                              sizeXs='12'>
                              <ZWorkspacesCard
                                workspaceImage={el.workspaceImage}
                                workspaceName={el.workspaceName as string}
                                user={el.user}
                                workspaceId={el.id}
                                createdAt={el.createdAt}
                                isFavorite={el.isFavorite ? true : false}
                              />
                            </ZIonCol>
                          </ZCan>
                        ))}
                    </Suspense>

                    {/* add a workspace card */}
                    <ZCan havePermissions={[permissionsEnum.create_workspace]}>
                      <ZIonCol
                        sizeXl='3'
                        sizeLg='4'
                        sizeMd='6'
                        sizeSm='6'
                        sizeXs='12'>
                        {!isZFetching && (
                          <ZIonCard
                            className={classNames({
                              'h-[11.4rem] cursor-pointer': true
                            })}
                            testingselector={
                              CONSTANTS.testingSelectors.workspace.listPage
                                .createWorkspaceCardButton
                            }
                            onClick={() => {
                              presentZWorkspaceCreateModal({
                                _cssClass: 'create-workspace-modal-size'
                              });
                            }}>
                            <ZIonCardContent className='flex flex-col h-full ion-align-items-center ion-justify-content-center'>
                              <ZIonIcon
                                icon={addOutline}
                                size='large'
                              />
                              <ZIonText className='text-lg'>
                                Create a workspace
                              </ZIonText>
                            </ZIonCardContent>
                          </ZIonCard>
                        )}

                        {isZFetching && (
                          <ZIonCard
                            className={classNames({
                              'h-[11.4rem] cursor-pointer': true
                            })}>
                            <ZIonCardContent className='flex flex-col h-full ion-align-items-center ion-justify-content-center'>
                              <ZIonSkeletonText
                                width='20px'
                                height='20px'
                              />

                              <ZIonText className='text-lg'>
                                <ZIonSkeletonText
                                  width='120px'
                                  height='15px'
                                />
                              </ZIonText>
                            </ZIonCardContent>
                          </ZIonCard>
                        )}
                      </ZIonCol>
                    </ZCan>
                  </>
                )}
              </ZIonRow>
            </ZIonCard>

            {/* Shared workspaces */}
            <ZCan havePermissions={[permissionsEnum.viewAny_shareWS]}>
              <ZIonCard className='mt-5 border rounded-lg shadow-none zaions__light_bg'>
                <ZIonRow className='px-4 py-5'>
                  <ZIonCol
                    size='12'
                    className='ps-3'>
                    <ZIonTitle
                      className='font-bold tracking-wider ion-no-padding'
                      color='dark'>
                      Shared workspaces
                    </ZIonTitle>
                  </ZIonCol>

                  {isZFetching && <ZWorkspacesCardSkeleton />}

                  {WSShareData?.length === 0 && (
                    <ZIonCol
                      size='12'
                      className='flex flex-col py-4 mt-2 rounded-lg ion-align-items-center ion-justify-content-center'>
                      <ZIonIcon
                        icon={gitNetworkOutline}
                        className='w-10 h-10'
                      />

                      <ZIonText
                        className='mt-3 tracking-wider'
                        color='dark'>
                        The shared workspace board is empty!
                      </ZIonText>
                    </ZIonCol>
                  )}

                  {/* single card */}
                  <Suspense fallback={<ZWorkspacesCardSkeleton />}>
                    {!isZFetching &&
                      WSShareData &&
                      WSShareData.map(el => {
                        return (
                          <ZCan
                            key={el.id}
                            havePermissions={[permissionsEnum.view_shareWS]}>
                            <ZIonCol
                              sizeXl='3'
                              sizeLg='4'
                              sizeMd='6'
                              sizeSm='6'
                              sizeXs='12'>
                              <ZWorkspacesCard
                                workspaceImage={el.workspaceImage}
                                workspaceName={el.workspaceName as string}
                                user={el.user}
                                workspaceId={el.workspaceId} // workspaceId
                                createdAt={el.createdAt}
                                accountStatus={el.accountStatus}
                                memberId={el.id}
                                owned={false}
                                isFavorite={el.isFavorite ? true : false}
                              />
                            </ZIonCol>
                          </ZCan>
                        );
                      })}
                  </Suspense>
                </ZIonRow>
              </ZIonCard>
            </ZCan>
          </ZIonGrid>
        </ZIonContent>
      </ZCan>
    </ZIonPage>
  );
};

export default ZWorkspaceListPage;
