/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { lazy, Suspense } from 'react';
import { useParams } from 'react-router';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { type RefresherEventDetail } from '@ionic/react';
import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import {
  addOutline,
  calendar,
  createOutline,
  pricetagOutline,
  refresh
} from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZIonPage from '@/components/ZIonPage';
import {
  ZIonButton,
  ZIonButtons,
  ZIonCol,
  ZIonContent,
  ZIonGrid,
  ZIonIcon,
  ZIonInput,
  ZIonItem,
  ZIonLabel,
  ZIonList,
  ZIonRefresher,
  ZIonRefresherContent,
  ZIonRow,
  ZIonSkeletonText,
  ZIonText,
  ZIonTextareaShort,
  ZIonTitle
} from '@/components/ZIonComponents';
import ZCan from '@/components/Can';
import { ZFallbackIonSpinner2 } from '@/components/CustomComponents/FallbackSpinner';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import {
  useZInvalidateReactQueries,
  useZRQGetRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
import { reportCustomError, ZCustomError } from '@/utils/customErrorType';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { AdminPanelSidebarMenuPageEnum } from '@/types/AdminPanel/index.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import {
  WorkspaceSharingTabEnum,
  type workspaceTeamInterface
} from '@/types/AdminPanel/workspace';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { ZDashboardRState } from '@/ZaionsStore/UserDashboard/ZDashboard';
import { Formik } from 'formik';
import {
  extractInnerData,
  formatApiRequestErrorForFormikFormField,
  validateField,
  zStringify
} from '@/utils/helpers';
import { type FormikSetErrorsType } from '@/types/ZaionsFormik.type';
import { AxiosError } from 'axios';
import { type ZGenericObject } from '@/types/zaionsAppSettings.type';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import ZWorkspacesSharingModal from '@/components/InPageComponents/ZaionsModals/Workspace/SharingModal';
const AdminPanelSidebarMenu = lazy(
  () => import('@/components/AdminPanelComponents/Sidebar/ExpendableMenu')
);
const ZAdminPanelTopBar = lazy(
  () => import('@/components/AdminPanelComponents/TopBar')
);
const ZMembersListTable = lazy(
  () =>
    import(
      '@/components/InPageComponents/ZaionsTable/Workspace/Team/MembersListTable'
    )
);

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
 * About: (Workspace team view page)
 * @type {*}
 * */

const ZWSSettingsTeamViewPage: React.FC = () => {
  // getting current workspace id form params.
  const { workspaceId, teamId } = useParams<{
    workspaceId?: string;
    teamId?: string;
  }>();

  // #region Custom domain.
  const { is2XlScale, isMdScale, isXlScale, isLgScale } = useZMediaQueryScale();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  const { zInvalidateReactQueries } = useZInvalidateReactQueries();
  // #endregion

  // #region APIS.
  // Request for getting teams data.
  const {
    data: WSTeamsData,
    refetch: refetchWSTeamsData,
    isFetching: isWSTeamsDataFetching
  } = useZRQGetRequest<workspaceTeamInterface[]>({
    _url: API_URL_ENUM.workspace_team_create_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.TEAM,
      workspaceId ?? ''
    ],
    _itemsIds: [workspaceId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId]
  });

  const {
    data: currentWSTeamData,
    refetch: refetchCurrentWSTeamData,
    isFetching: isCurrentWSTeamDataFetching
  } = useZRQGetRequest<workspaceTeamInterface>({
    _url: API_URL_ENUM.workspace_team_update_delete,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.TEAM_GET,
      workspaceId ?? '',
      teamId ?? ''
    ],
    _urlDynamicParts: [
      CONSTANTS.RouteParams.workspace.workspaceId,
      CONSTANTS.RouteParams.workspace.teamId
    ],
    _itemsIds: [workspaceId ?? '', teamId ?? ''],
    _extractType: ZRQGetRequestExtractEnum.extractItem
  });

  // Update team API.
  const { mutateAsync: updateWSTeamMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.workspace_team_update_delete,
    // _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    // _itemsIds: [workspaceId],
    _queriesKeysToInvalidate: []
  });
  // #endregion

  // #region Recoils.
  // Recoil state that control the dashboard.
  const ZDashboardState = useRecoilValue(ZDashboardRState);
  // #endregion

  // #region Modals & popovers.
  const { presentZIonModal: presentWorkspaceSharingModal } = useZIonModal(
    ZWorkspacesSharingModal,
    {
      Tab: WorkspaceSharingTabEnum.invite,
      workspaceId
    }
  );
  // #endregion

  // #region Functions.
  const invalidedQueries = async (): Promise<void> => {
    try {
      await refetchWSTeamsData();

      await refetchCurrentWSTeamData();

      await zInvalidateReactQueries([
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
        workspaceId ?? ''
      ]);
    } catch (error) {
      reportCustomError(error);
    }
  };

  const handleRefresh = async (
    event: CustomEvent<RefresherEventDetail>
  ): Promise<void> => {
    try {
      await invalidedQueries();
      event.detail.complete();
    } catch (error) {
      reportCustomError(error);
    }
  };

  // Formik submit handler
  const formikSubmitHandler = async (
    values: string,
    setErrors: FormikSetErrorsType
  ): Promise<void> => {
    try {
      if (values?.trim()?.length > 0) {
        // Making an api call creating new workspace.
        const _response = await updateWSTeamMutate({
          itemIds: [workspaceId ?? '', teamId ?? ''],
          urlDynamicParts: [
            CONSTANTS.RouteParams.workspace.workspaceId,
            CONSTANTS.RouteParams.workspace.teamId
          ],
          requestData: values
        });

        if (_response !== undefined) {
          // extracting data from _response.
          const _data = extractInnerData<workspaceTeamInterface>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data?.id !== undefined && _data?.id !== null) {
            // Updating data in RQ cache.
            await updateRQCDataHandler<workspaceTeamInterface | undefined>({
              key: [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.TEAM,
                workspaceId ?? ''
              ],
              data: _data,
              id: teamId ?? ''
            });

            // Updating data in RQ cache.
            await updateRQCDataHandler<workspaceTeamInterface | undefined>({
              key: [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.TEAM_GET,
                workspaceId ?? '',
                teamId ?? ''
              ],
              data: _data,
              id: '',
              extractType: ZRQGetRequestExtractEnum.extractItem,
              updateHoleData: true
            });
          }
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const _error = error.response?.data as {
          errors: ZGenericObject;
          status: number;
        };

        const _apiErrors = _error?.errors;
        const _errors = formatApiRequestErrorForFormikFormField(
          ['title', 'description'],
          ['title', 'description'],
          _apiErrors
        );

        setErrors(_errors);
      } else if (error instanceof ZCustomError || error instanceof Error) {
        reportCustomError(error);
      }
    }
  };

  // #endregion

  const isZFetching = isWSTeamsDataFetching || isCurrentWSTeamDataFetching;

  return (
    <ZIonPage>
      <ZCan
        havePermissions={[permissionsEnum.view_workspaceTeam]}
        returnPermissionDeniedView={true}>
        {/* Content */}
        <ZIonContent>
          {/* IonRefresher */}
          <ZIonRefresher
            onIonRefresh={event => {
              void handleRefresh(event);
            }}>
            <ZIonRefresherContent />
          </ZIonRefresher>

          <ZIonGrid
            className={classNames({
              'h-screen ion-no-padding': true,
              'max-w-[200rem] mx-auto': false
            })}>
            {/* Row-1 */}
            <ZIonRow className='h-full'>
              {/* Col-1 Side bar */}
              <Suspense
                fallback={
                  <ZIonCol
                    size='.8'
                    className='h-full zaions__medium_bg zaions-transition'>
                    <ZFallbackIonSpinner2 />
                  </ZIonCol>
                }>
                <AdminPanelSidebarMenu
                  activePage={AdminPanelSidebarMenuPageEnum.settings}
                />
              </Suspense>

              {/* Col-2 Right-side Main Container */}
              <ZIonCol
                sizeXl={
                  ZDashboardState.dashboardMainSidebarIsCollabes.isExpand
                    ? is2XlScale
                      ? '10.5'
                      : '10'
                    : is2XlScale
                    ? '11.4'
                    : '11.2'
                }
                sizeLg={
                  ZDashboardState.dashboardMainSidebarIsCollabes.isExpand
                    ? is2XlScale
                      ? '10.5'
                      : '10'
                    : is2XlScale
                    ? '11.4'
                    : '11.2'
                }
                sizeMd='12'
                sizeSm='12'
                sizeXs='12'
                className='h-screen zaions-transition'>
                <ZIonGrid className='h-full ion-no-padding'>
                  {/* Col-2 Row-1 Top bar. */}
                  <Suspense
                    fallback={
                      <ZIonRow className='h-[4rem] px-3 zaions__light_bg'>
                        <ZFallbackIonSpinner2 />
                      </ZIonRow>
                    }>
                    <ZAdminPanelTopBar workspaceId={workspaceId} />
                  </Suspense>

                  {/* Col-2 Row-2 */}
                  <ZIonRow className='h-[calc(100%-4rem)]'>
                    <ZIonCol
                      sizeXl='2.8'
                      sizeLg='2.8'
                      sizeMd='12'
                      sizeSm='12'
                      sizeXs='12'
                      className='border-e-[1px] zaions-transition h-full shadow-[0_3px_6px_#00000029]'>
                      <ZCustomScrollable
                        className='w-full h-full ion-padding-top'
                        scrollY={true}>
                        <ZIonList
                          lines='full'
                          className='w-full'>
                          <ZIonItem
                            className='px-3 ion-no-padding'
                            lines='none'>
                            <ZIonText
                              color='dark'
                              className='block text-xl font-bold ms-1'>
                              Teams
                            </ZIonText>
                          </ZIonItem>

                          {!isZFetching &&
                            WSTeamsData?.map((el, index) => {
                              return (
                                <ZIonItem
                                  key={index}
                                  minHeight='2rem'
                                  className='w-full cursor-pointer ion-no-padding ion-activatable'>
                                  <ZIonLabel
                                    color='dark'
                                    className='block px-3 text-lg ms-1 ion-no-margin'>
                                    {el.title}
                                  </ZIonLabel>
                                </ZIonItem>
                              );
                            })}

                          {isZFetching &&
                            [...Array(3)].map((el, index) => {
                              return (
                                <ZIonItem
                                  key={index}
                                  minHeight='2rem'
                                  className='w-full cursor-pointer ion-no-padding ion-activatable'>
                                  <ZIonLabel
                                    color='dark'
                                    className='block px-3 text-lg ms-1 ion-no-margin'>
                                    <ZIonSkeletonText
                                      width='100%'
                                      height='.8rem'
                                    />
                                  </ZIonLabel>
                                </ZIonItem>
                              );
                            })}
                        </ZIonList>
                      </ZCustomScrollable>
                    </ZIonCol>

                    {/* Col-2 Row-2 col-2 Table & filters etc. */}
                    <ZIonCol
                      className='h-full zaions-transition'
                      sizeXl='9.2'
                      sizeLg='9.2'
                      sizeMd='12'
                      sizeSm='12'
                      sizeXs='12'>
                      <ZCustomScrollable
                        className='flex flex-col w-full h-full gap-10 px-3 pt-3'
                        scrollY={true}>
                        <Formik
                          initialValues={{
                            editMode: false,

                            //
                            title: currentWSTeamData?.title ?? '',
                            description: currentWSTeamData?.description ?? ''
                          }}
                          validate={values => {
                            const errors: {
                              title?: string;
                              description?: string;
                            } = {};
                            validateField('title', values, errors);

                            if (values?.title?.length > 65) {
                              errors.title =
                                'The title field must not be greater than 65 characters.';
                            }

                            if (values?.description?.length > 250) {
                              errors.description =
                                'The description field must not be greater than 250 characters.';
                            }

                            return errors;
                          }}
                          enableReinitialize={true}
                          onSubmit={async (
                            values,
                            { setErrors, setFieldValue }
                          ) => {
                            const zStringifyData = zStringify({
                              title: values.title,
                              description: values.description
                            });
                            await formikSubmitHandler(
                              zStringifyData,
                              setErrors
                            );

                            void setFieldValue('editMode', false, false);
                          }}>
                          {({
                            values,
                            errors,
                            touched,
                            isValid,
                            handleChange,
                            handleBlur,
                            submitForm,
                            setFieldValue
                          }) => {
                            return (
                              <div className='flex flex-col gap-8 ion-no-margin ion-no-padding'>
                                <ZIonRow
                                  className={classNames({
                                    'border rounded-lg zaions__light_bg ion-align-items-center ion-padding':
                                      true,
                                    'ion-hide': values.editMode
                                  })}>
                                  <ZIonCol>
                                    <div className='flex ion-align-items-center ion-justify-content-between'>
                                      {!isZFetching && (
                                        <div className='ZaionsTextEllipsis max-w-[50%!important]'>
                                          <ZIonTitle
                                            className='block text-2xl font-bold ion-no-padding'
                                            testingselector={
                                              CONSTANTS.testingSelectors
                                                .WSSettings.teamViewPage
                                                .titleText
                                            }>
                                            {currentWSTeamData?.title}
                                          </ZIonTitle>
                                        </div>
                                      )}

                                      {isZFetching && (
                                        <ZIonTitle
                                          className='block text-2xl font-bold ion-no-padding'
                                          testingselector={
                                            CONSTANTS.testingSelectors
                                              .WSSettings.teamViewPage.titleText
                                          }>
                                          <ZIonSkeletonText
                                            width='10rem'
                                            height='1.2rem'
                                          />
                                        </ZIonTitle>
                                      )}

                                      {!isZFetching && (
                                        <ZIonIcon
                                          icon={createOutline}
                                          className='w-5 h-5 cursor-pointer'
                                          testingselector={
                                            CONSTANTS.testingSelectors
                                              .WSSettings.teamViewPage
                                              .unableEditModeBtn
                                          }
                                          onClick={() => {
                                            void setFieldValue(
                                              'editMode',
                                              true,
                                              false
                                            );
                                          }}
                                        />
                                      )}

                                      {isZFetching && (
                                        <ZIonText>
                                          <ZIonSkeletonText
                                            width='1rem'
                                            height='1rem'
                                          />
                                        </ZIonText>
                                      )}
                                    </div>
                                    <div className=''>
                                      {!isZFetching && (
                                        <ZIonText
                                          className='block mt-2'
                                          testingselector={
                                            CONSTANTS.testingSelectors
                                              .WSSettings.teamViewPage
                                              .descriptionText
                                          }>
                                          {currentWSTeamData?.description}
                                        </ZIonText>
                                      )}

                                      {isZFetching && (
                                        <ZIonText
                                          className='block mt-2'
                                          testingselector={
                                            CONSTANTS.testingSelectors
                                              .WSSettings.teamViewPage
                                              .descriptionText
                                          }>
                                          <ZIonSkeletonText
                                            width='100%'
                                            height='3rem'
                                          />
                                        </ZIonText>
                                      )}
                                    </div>
                                  </ZIonCol>
                                </ZIonRow>

                                <ZIonRow
                                  className={classNames({
                                    'border rounded-lg zaions__light_bg ion-align-items-center ion-padding':
                                      true,
                                    'ion-hide': !values.editMode
                                  })}>
                                  <ZIonCol>
                                    {/* title */}
                                    <div className='flex ion-align-items-center ion-justify-content-between'>
                                      <ZIonInput
                                        name='title'
                                        label='Title*'
                                        minHeight='2.5rem'
                                        labelPlacement='stacked'
                                        onIonChange={handleChange}
                                        onIonBlur={handleBlur}
                                        value={values.title}
                                        errorText={
                                          touched?.title === true
                                            ? errors.title
                                            : undefined
                                        }
                                        testingselector={
                                          CONSTANTS.testingSelectors.WSSettings
                                            .teamViewPage.form.titleInput
                                        }
                                        className={classNames({
                                          zaions__bg_white: true,
                                          'ion-touched':
                                            touched?.title === true,
                                          'ion-invalid':
                                            touched?.title === true &&
                                            errors.title,
                                          'ion-valid':
                                            touched?.title === true &&
                                            (errors.title?.trim()?.length ===
                                              0 ||
                                              errors.title === undefined)
                                        })}
                                      />
                                    </div>

                                    {/* Description */}
                                    <div className='overflow-hidden line-clamp-3'>
                                      <ZIonTextareaShort
                                        rows={3}
                                        fill='outline'
                                        name='description'
                                        autoGrow={true}
                                        label='Description'
                                        labelPlacement='stacked'
                                        onIonChange={handleChange}
                                        onIonBlur={handleBlur}
                                        value={values.description}
                                        errorText={
                                          touched?.description === true
                                            ? errors.description
                                            : undefined
                                        }
                                        className={classNames({
                                          'mt-4 zaions__bg_white': true,
                                          'ion-touched':
                                            touched?.description === true,
                                          'ion-invalid':
                                            touched?.description === true &&
                                            errors.description,
                                          'ion-valid':
                                            touched?.description === true &&
                                            errors.description?.trim()
                                              ?.length === 0
                                        })}
                                        testingselector={
                                          CONSTANTS.testingSelectors.WSSettings
                                            .teamViewPage.form
                                            .descriptionTextarea
                                        }
                                      />
                                    </div>

                                    {/* Action buttons */}
                                    <div className='mt-3'>
                                      <ZIonButton
                                        onClick={() => {
                                          void submitForm();
                                        }}
                                        disabled={!isValid}
                                        testingselector={
                                          CONSTANTS.testingSelectors.WSSettings
                                            .teamViewPage.form.submitFormBtn
                                        }>
                                        Save
                                      </ZIonButton>
                                      <ZIonButton
                                        fill='outline'
                                        className='ms-2'
                                        testingselector={
                                          CONSTANTS.testingSelectors.WSSettings
                                            .teamViewPage.form.closeButton
                                        }
                                        onClick={() => {
                                          void setFieldValue(
                                            'editMode',
                                            false,
                                            false
                                          );
                                        }}>
                                        Cancel
                                      </ZIonButton>
                                    </div>
                                  </ZIonCol>
                                </ZIonRow>

                                {/* total teams count and filters buttons */}
                                <ZIonRow className='mt-1 border rounded-lg zaions__light_bg ion-align-items-center ion-padding'>
                                  <ZIonCol className='flex ps-1 ion-align-items-center'>
                                    <ZIonText className='text-2xl'>
                                      {!isZFetching && (
                                        <ZIonText
                                          className='font-bold total_links pe-1'
                                          testingselector={
                                            CONSTANTS.testingSelectors
                                              .WSSettings.teamListPage
                                              .teamsCount
                                          }>
                                          {/* {WSTeamsData?.length || 0} */} 0
                                        </ZIonText>
                                      )}
                                      {isZFetching && (
                                        <ZIonSkeletonText
                                          width='1rem'
                                          height='.9rem'
                                          className='inline-block pb-1 me-1'
                                        />
                                      )}
                                      Members
                                    </ZIonText>
                                  </ZIonCol>

                                  <ZIonCol
                                    className={classNames({
                                      flex: true,
                                      'justify-content-end': isXlScale,
                                      'justify-content-between mt-2': !isXlScale
                                    })}
                                    sizeXl='10'
                                    size='12'>
                                    <ZIonRow
                                      className={classNames({
                                        'w-full ion-justify-content-between':
                                          true,
                                        'gap-y-4': !isLgScale
                                      })}>
                                      <ZIonButtons
                                        className={classNames({
                                          'w-full': true,
                                          'ion-justify-content-between':
                                            !isXlScale,
                                          'ion-justify-content-end gap-3':
                                            isXlScale,
                                          block: !isMdScale
                                        })}>
                                        <ZIonButton
                                          fill='outline'
                                          color='primary'
                                          expand={
                                            !isMdScale ? 'block' : undefined
                                          }
                                          className='my-2 normal-case'
                                          height='39px'
                                          testingselector={
                                            CONSTANTS.testingSelectors
                                              .WSSettings.teamListPage
                                              .timeFilterBtn
                                          }>
                                          <ZIonIcon
                                            slot='start'
                                            icon={calendar}
                                          />{' '}
                                          All Times
                                        </ZIonButton>

                                        {/* Filter by tags */}
                                        <ZIonButton
                                          fill='outline'
                                          color='primary'
                                          expand={
                                            !isMdScale ? 'block' : undefined
                                          }
                                          className='my-2 normal-case'
                                          height='39px'
                                          testingselector={
                                            CONSTANTS.testingSelectors
                                              .WSSettings.teamListPage
                                              .tagsFilterBtn
                                          }>
                                          <ZIonIcon
                                            slot='start'
                                            icon={pricetagOutline}
                                          />{' '}
                                          No values
                                        </ZIonButton>

                                        {/* Refetch data button */}
                                        <ZIonButton
                                          color='primary'
                                          fill='outline'
                                          expand={
                                            !isMdScale ? 'block' : undefined
                                          }
                                          className='my-2 normal-case'
                                          height='39px'
                                          onClick={() => {
                                            void invalidedQueries();
                                          }}
                                          testingselector={
                                            CONSTANTS.testingSelectors
                                              .WSSettings.teamListPage
                                              .refetchBtn
                                          }>
                                          <ZIonIcon
                                            slot='start'
                                            icon={refresh}
                                          />
                                          Refetch
                                        </ZIonButton>

                                        {/* Refetch data button */}
                                        <ZIonButton
                                          color='primary'
                                          fill='solid'
                                          expand={
                                            !isMdScale ? 'block' : undefined
                                          }
                                          className='my-2 normal-case'
                                          height='39px'
                                          onClick={() => {
                                            presentWorkspaceSharingModal({
                                              _cssClass:
                                                'workspace-sharing-modal-size'
                                            });
                                          }}
                                          testingselector={
                                            CONSTANTS.testingSelectors
                                              .WSSettings.teamListPage
                                              .addMemberBtn
                                          }>
                                          <ZIonIcon
                                            slot='start'
                                            icon={addOutline}
                                          />
                                          Add Member
                                        </ZIonButton>
                                      </ZIonButtons>
                                    </ZIonRow>
                                  </ZIonCol>
                                </ZIonRow>

                                <ZCan
                                  havePermissions={[
                                    permissionsEnum.view_workspaceTeam
                                  ]}>
                                  <Suspense
                                    fallback={
                                      <ZIonRow className='h-full'>
                                        <ZFallbackIonSpinner2 />
                                      </ZIonRow>
                                    }>
                                    <ZMembersListTable />
                                  </Suspense>
                                </ZCan>
                              </div>
                            );
                          }}
                        </Formik>
                      </ZCustomScrollable>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonCol>
            </ZIonRow>
          </ZIonGrid>
        </ZIonContent>
      </ZCan>
    </ZIonPage>
  );
};

export default ZWSSettingsTeamViewPage;
