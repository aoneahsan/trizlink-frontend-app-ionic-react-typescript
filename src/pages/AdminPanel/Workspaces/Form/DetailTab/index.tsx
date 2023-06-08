/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { Formik } from 'formik';
import { AxiosError } from 'axios';
import routeQueryString from 'qs';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import { ZTimezoneSelector } from '@/components/CustomComponents/ZTimezone';
import {
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonFooter,
	ZIonGrid,
	ZIonIcon,
	ZIonInput,
	ZIonRow,
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import {
	useZRQGetRequest,
	useZRQUpdateRequest,
} from '@/ZaionsHooks/zreactquery-hooks';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { useZValidateRequestResponse } from '@/ZaionsHooks/zapi-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { API_URL_ENUM, VALIDATION_RULE } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { showErrorNotification } from '@/utils/notification';
import { reportCustomError } from '@/utils/customErrorType';
import {
	createRedirectRoute,
	replaceRouteParams,
	validateField,
	zStringify,
} from '@/utils/helpers';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	workspaceFormPermissionEnum,
	workspaceFormRoleEnum,
	workspaceFormTabEnum,
	workspaceInterface,
} from '@/types/AdminPanel/workspace';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { arrowForward } from 'ionicons/icons';
import ZWorkspaceFooterSteps from '@/components/WorkspacesComponents/FooterSteps';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

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
 * About: (Info of component here...)
 * @type {*}
 * */

const ZWorkspaceFormDetailTab: React.FC = () => {
	// Media Query Scale
	const { isLgScale, isMdScale } = useZMediaQueryScale();

	// getting workspace id from route (url), when user refresh the page the id from route will be get and workspace of that id will be fetch from backend.
	const { editWorkspaceId } = useParams<{
		editWorkspaceId: string;
	}>();

	// getting search param from url with the help of 'qs' package
	const routeQSearchParams = routeQueryString.parse(location.search, {
		ignoreQueryPrefix: true,
	});

	// useZNavigate for redirection
	const { zNavigatePushRoute, zNavigateGoBack } = useZNavigate();

	// validate the request. this hook will show success notification if the request->success is true and show error notification if request->success is false.
	const { validateRequestResponse } = useZValidateRequestResponse();

	// fetching link-in-bio with the editWorkspaceId data from backend.
	const { data: selectedWorkspace, refetch: refetchSelectedWorkspace } =
		useZRQGetRequest<workspaceInterface>({
			_url: API_URL_ENUM.workspace_update_delete,
			_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.GET],
			_authenticated: true,
			_itemsIds: [editWorkspaceId],
			_urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
			_shouldFetchWhenIdPassed: !editWorkspaceId ? true : false,
			_extractType: ZRQGetRequestExtractEnum.extractItem,
		});

	// Update workspace API.
	const { mutateAsync: UpdateWorkspaceMutateAsync } = useZRQUpdateRequest({
		_url: API_URL_ENUM.workspace_update_delete,
		_queriesKeysToInvalidate: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.GET,
		],
	});

	//
	// const WorkspaceGetRequestFn = useCallback(async () => {
	// 	await refetchSelectedWorkspace();
	// 	// eslint-disable-next-line
	// }, []);

	// Refetching if the editLinkInBioId changes and if the editLinkInBioId is undefined it will redirect user to ShortLinks page.
	useEffect(() => {
		try {
			// if (editWorkspaceId) {
			// 	void WorkspaceGetRequestFn();
			// }
		} catch (error) {
			if (error instanceof AxiosError) {
				zNavigatePushRoute(
					replaceRouteParams(
						ZaionsRoutes.AdminPanel.ShortLinks.Main,
						[
							CONSTANTS.RouteParams.workspace.workspaceId,
							CONSTANTS.RouteParams.folderIdToGetShortLinks,
						],
						[editWorkspaceId, 'all']
					)
				);
				showErrorNotification(error.message);
			} else {
				reportCustomError(error);
			}
		}
		// eslint-disable-next-line
	}, [editWorkspaceId]);

	const formikSubmitHn = async (reqDataStr: string) => {
		try {
			if (reqDataStr) {
				// hitting workspace update api.
				const _result = UpdateWorkspaceMutateAsync({
					itemIds: [editWorkspaceId],
					urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
					requestData: reqDataStr,
				});

				// if _result of the updateWorkspace api is success this showing success notification else not success then error notification.
				await validateRequestResponse({
					resultObj: _result,
				});
			}
		} catch (error) {
			reportCustomError(error);
		}
	};

	return (
		<>
			<ZIonButton routerLink={ZaionsRoutes.AdminPanel.Workspaces.Main}>
				go back
			</ZIonButton>
			<Formik
				initialValues={{
					workspaceName: selectedWorkspace?.workspaceName,
					workspaceTimezone: selectedWorkspace?.workspaceTimezone,
				}}
				validate={(values) => {
					const errors: {
						workspaceName?: string;
					} = {};

					validateField(
						'workspaceName',
						values,
						errors,
						VALIDATION_RULE.string
					);

					return errors;
				}}
				onSubmit={() => {}}
			>
				{({
					values,
					errors,
					touched,
					isValid,
					dirty,
					handleBlur,
					handleChange,
				}) => {
					return (
						<>
							<ZIonContent>
								<ZIonGrid className='flex h-full pb-2 mx-0 ion-align-items-center'>
									<ZIonRow className='mx-auto on-justify-content-center ion-align-items-center w-80'>
										{/* Workspace name */}
										<ZIonCol size='12'>
											<ZIonInput
												className={classNames({
													'ion-touched ion-invalid':
														touched.workspaceName && errors.workspaceName,
													'ion-touched ion-valid':
														touched.workspaceName && !errors.workspaceName,
												})}
												name='workspaceName'
												label='Workspace Name'
												labelPlacement='stacked'
												placeholder='Workspace Name'
												onIonChange={handleChange}
												onIonBlur={handleBlur}
												errorText={errors.workspaceName}
												value={values.workspaceName}
											/>
										</ZIonCol>

										{/* Workspace timezone */}
										<ZIonCol size='12' className='mt-4'>
											<ZTimezoneSelector
												name='workspaceTimezone'
												className='ion-margin-top'
												label='Workspace timezone (Optional)'
												labelPlacement='stacked'
												placeholder='Workspace timezone'
												value={values.workspaceTimezone}
												onIonChange={handleChange}
												onIonBlur={handleBlur}
											/>
										</ZIonCol>
									</ZIonRow>
								</ZIonGrid>
							</ZIonContent>

							{/* Footer */}
							<ZIonFooter
								className='flex py-3 align-items-center'
								collapse='fade'
							>
								<div
									className={classNames({
										'mx-auto': true,
										'w-4/12': !isLgScale,
										'w-5/12': !isMdScale,
									})}
								>
									<ZIonRow
										className={classNames({
											'ion-justify-content-center':
												routeQSearchParams.tab ===
												workspaceFormTabEnum.workspaceDetailForm,
										})}
									>
										<ZIonCol size='6'>
											{/* Next button */}
											<ZIonButton
												expand='block'
												className='text-transform-initial'
												disabled={!isValid}
												onClick={() => {
													if (dirty) {
														formikSubmitHn(zStringify(values));
													}

													// Navigate to workspace -> invite client
													zNavigatePushRoute(
														createRedirectRoute({
															url: ZaionsRoutes.AdminPanel.Workspaces.Edit,
															params: [
																CONSTANTS.RouteParams.workspace
																	.editWorkspaceIdParam,
															],
															values: [editWorkspaceId],
															routeSearchParams: {
																tab: workspaceFormTabEnum.inviteClients,
															},
														})
													);
												}}
											>
												Next <ZIonIcon className='ms-2' icon={arrowForward} />
											</ZIonButton>
										</ZIonCol>
									</ZIonRow>

									{/*  */}
									<ZWorkspaceFooterSteps />
								</div>
							</ZIonFooter>
						</>
					);
				}}
			</Formik>
		</>
	);
};

export default ZWorkspaceFormDetailTab;
