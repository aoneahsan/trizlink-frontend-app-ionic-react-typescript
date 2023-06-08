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
import routeQueryString from 'qs';
import { AxiosError } from 'axios';
import { arrowBack } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZWorkspaceFormApprovalTab from './ApprovalTab';
import {
	ZIonButton,
	ZIonCol,
	ZIonHeader,
	ZIonIcon,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import ZWorkspaceFormConnectPagesTab from '@/pages/AdminPanel/Workspaces/Form/ConnectPagesTab';
import ZaionsIonPage from '@/components/ZaionsIonPage';
import ZWorkspaceFormInviteClientsTab from './InviteClientsTab';
import ZWorkspaceFormDetailTab from './DetailTab';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import {
	useZRQGetRequest,
	useZRQUpdateRequest,
} from '@/ZaionsHooks/zreactquery-hooks';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { API_URL_ENUM } from '@/utils/enums';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import CONSTANTS from '@/utils/constants';
import { showErrorNotification } from '@/utils/notification';
import { reportCustomError } from '@/utils/customErrorType';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	workspaceFormTabEnum,
	workspaceInterface,
} from '@/types/AdminPanel/workspace';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import classNames from 'classnames';
import { replaceRouteParams } from '@/utils/helpers';

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

const ZWorkspaceForm: React.FC = () => {
	// getting search param from url with the help of 'qs' package
	const routeQSearchParams = routeQueryString.parse(location.search, {
		ignoreQueryPrefix: true,
	});

	// useZNavigate for redirection
	const { zNavigatePushRoute } = useZNavigate();

	// Media Query Scale
	const { isXlScale, isLgScale, isMdScale, isSmScale, isXsScale } =
		useZMediaQueryScale();

	// getting workspace id from route (url), when user refresh the page the id from route will be get and workspace of that id will be fetch from backend.
	const { editWorkspaceId } = useParams<{
		editWorkspaceId: string;
	}>();

	// Recoil State that hold workspaces.
	// const [workspaceState, setWorkspaceState] = useRecoilState(
	// 	WorkspaceRStateAtomFamily(editWorkspaceId)
	// );

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
	const WorkspaceGetRequestFn = useCallback(async () => {
		await refetchSelectedWorkspace();
		// eslint-disable-next-line
	}, []);

	// Refetching if the editLinkInBioId changes and if the editLinkInBioId is undefined it will redirect user to ShortLinks page.
	useEffect(() => {
		try {
			if (editWorkspaceId) {
				void WorkspaceGetRequestFn();
			}
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

	if (!selectedWorkspace) return null;

	return (
		<ZaionsIonPage pageTitle='Zaions Workspace Form Page'>
			<ZIonHeader className='ion-no-border'>
				<ZIonRow className='pt-2 pb-3 ion-justify-content-center ion-align-items-center'>
					{/*  */}
					<ZIonCol
						sizeXl='1'
						sizeLg='1'
						sizeMd='12'
						sizeSm='12'
						sizeXs='12'
						className={classNames({
							'z-50': true,
							fixed: isLgScale,
							'top-[5%] start-[1%]': isXlScale,
							'top-[2%] start-[0%]': !isXlScale && isLgScale,
							'mb-3': !isMdScale && isSmScale,
						})}
					>
						<ZIonButton
							expand={!isMdScale ? 'block' : undefined}
							className='text-transform-initial ion-no-margin ms-2'
							routerLink={ZaionsRoutes.AdminPanel.Workspaces.Main}
						>
							<ZIonIcon icon={arrowBack} className='me-2' /> Workspaces
						</ZIonButton>
					</ZIonCol>

					{/*  */}
					<ZIonCol className='ion-text-center' size='11'>
						{/* Tab Title */}
						<ZIonText className='block text-4xl'>
							{routeQSearchParams.tab ===
							workspaceFormTabEnum.workspaceDetailForm
								? 'Create a workspace'
								: routeQSearchParams.tab === workspaceFormTabEnum.inviteClients
								? 'Invite your clients'
								: routeQSearchParams.tab === workspaceFormTabEnum.connectPages
								? `Connect ${selectedWorkspace.workspaceName}'s pages`
								: routeQSearchParams.tab === workspaceFormTabEnum.Approval
								? 'Approval workflow'
								: ''}
						</ZIonText>

						{/* Tab sub title */}
						<ZIonText className='block mt-3 text-muted'>
							{routeQSearchParams.tab === workspaceFormTabEnum.inviteClients
								? 'Working with a client? Invite them in the workspace so they can approve and leave feedback on content.'
								: routeQSearchParams.tab === workspaceFormTabEnum.connectPages
								? 'Add all your brands’ content channels. You can always add more later.'
								: routeQSearchParams.tab === workspaceFormTabEnum.Approval
								? 'Choose a suitable approval workflow for this workspaces. You can change this later in the workspace settings.'
								: ''}
						</ZIonText>
					</ZIonCol>
				</ZIonRow>
			</ZIonHeader>

			{/*  */}
			{routeQSearchParams.tab === workspaceFormTabEnum.inviteClients ? (
				<ZWorkspaceFormInviteClientsTab />
			) : routeQSearchParams.tab === workspaceFormTabEnum.connectPages ? (
				<ZWorkspaceFormConnectPagesTab />
			) : routeQSearchParams.tab === workspaceFormTabEnum.Approval ? (
				<ZWorkspaceFormApprovalTab />
			) : (
				''
			)}
		</ZaionsIonPage>
	);
};

export default ZWorkspaceForm;
