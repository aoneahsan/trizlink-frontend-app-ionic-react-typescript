/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { lazy, Suspense } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { useParams } from 'react-router';
import { calendar, pricetagOutline, refresh } from 'ionicons/icons';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonButtons,
	ZIonCol,
	ZIonIcon,
	ZIonRow,
	ZIonText,
	ZIonTitle,
} from '@/components/ZIonComponents';
import ZWSTeamCreateModal from '@/components/InPageComponents/ZaionsModals/Workspace/Team/CreateModal';
import ZCan from '@/components/Can';
import { ZFallbackIonSpinner2 } from '@/components/CustomComponents/FallbackSpinner';

const ZWSSettingTeamListTable = lazy(
	() =>
		import(
			'@/components/InPageComponents/ZaionsTable/Workspace/Team/TeamListTable'
		)
);

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import { API_URL_ENUM } from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { workspaceTeamInterface } from '@/types/AdminPanel/workspace';
import { reportCustomError } from '@/utils/customErrorType';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';

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
 * About: (Workspace team list page)
 * @type {*}
 * */

const ZWSSettingTeamsListPage: React.FC = () => {
	// getting current workspace id form params.
	const { workspaceId } = useParams<{
		workspaceId: string;
	}>();

	// #region Custom hooks.
	const { isSmScale, isXlScale, isLgScale, isMdScale } = useZMediaQueryScale();
	// #endregion

	// #region Popovers & Modals.
	const { presentZIonModal: presentZWSTeamCreateModal } = useZIonModal(
		ZWSTeamCreateModal,
		{
			workspaceId: workspaceId,
		}
	);
	// #endregion

	// #region APIS
	// Request for getting teams data.
	const { data: WSTeamsData } = useZRQGetRequest<workspaceTeamInterface[]>({
		_url: API_URL_ENUM.workspace_team_create_list,
		_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.TEAM, workspaceId],
		_itemsIds: [workspaceId],
		_urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
	});
	// #endregion

	// #region Functions.
	const invalidedQueries = async () => {
		try {
		} catch (error) {
			reportCustomError(error);
		}
	};
	// #endregion

	return (
		<>
			<ZIonRow className='border rounded-lg zaions__light_bg ion-align-items-center ion-padding'>
				<ZIonCol>
					<ZIonTitle className='block text-2xl font-bold ion-no-padding'>
						Account
					</ZIonTitle>

					<ZIonText className='block mt-2'>
						Add team members & manage your team
					</ZIonText>
				</ZIonCol>

				<ZIonCol className='ion-text-end'>
					<ZIonButton
						color='primary'
						fill='solid'
						className='my-2'
						height='39px'
						expand={!isSmScale ? 'block' : undefined}
						testingSelector={
							CONSTANTS.testingSelectors.WSSettings.teamListPage.createTeamBtn
						}
						onClick={() => {
							// if (!isWorkspacesDataFetching)
							presentZWSTeamCreateModal({
								_cssClass: 'create-workspace-modal-size',
							});
						}}
					>
						Create new team
					</ZIonButton>
				</ZIonCol>
			</ZIonRow>

			{/* total teams count and filters buttons */}
			<ZIonRow className='mt-1 rounded border rounded-lg zaions__light_bg ion-align-items-center ion-padding'>
				<ZIonCol className='flex ps-1 ion-align-items-center'>
					<ZIonText className='text-2xl'>
						<ZIonText
							className='font-bold total_links pe-1'
							testingSelector={
								CONSTANTS.testingSelectors.WSSettings.teamListPage.teamsCount
							}
						>
							{WSTeamsData?.length || 0}
						</ZIonText>
						teams
					</ZIonText>
				</ZIonCol>

				<ZIonCol
					className={classNames({
						flex: true,
						'justify-content-end': isXlScale,
						'justify-content-between mt-2': !isXlScale,
					})}
					sizeXl='10'
					size='12'
				>
					<ZIonRow
						className={classNames({
							'w-full ion-justify-content-between': true,
							'gap-y-4': !isLgScale,
						})}
					>
						<ZIonButtons
							className={classNames({
								'w-full': true,
								'ion-justify-content-between': !isXlScale,
								'ion-justify-content-end gap-3': isXlScale,
								block: !isMdScale,
							})}
						>
							<ZIonButton
								fill='outline'
								color='primary'
								expand={!isMdScale ? 'block' : undefined}
								className='my-2 normal-case'
								height='39px'
								testingSelector={
									CONSTANTS.testingSelectors.WSSettings.teamListPage
										.timeFilterBtn
								}
							>
								<ZIonIcon slot='start' icon={calendar} /> All Times
							</ZIonButton>

							{/* Filter by tags */}
							<ZIonButton
								fill='outline'
								color='primary'
								expand={!isMdScale ? 'block' : undefined}
								className='my-2 normal-case'
								height='39px'
								testingSelector={
									CONSTANTS.testingSelectors.WSSettings.teamListPage
										.tagsFilterBtn
								}
							>
								<ZIonIcon slot='start' icon={pricetagOutline} /> No values
							</ZIonButton>

							{/* Refetch data button */}
							<ZIonButton
								color='primary'
								fill='outline'
								expand={!isMdScale ? 'block' : undefined}
								className='my-2 normal-case'
								height='39px'
								onClick={() => {
									void invalidedQueries();
								}}
								testingSelector={
									CONSTANTS.testingSelectors.WSSettings.teamListPage.refetchBtn
								}
							>
								<ZIonIcon slot='start' icon={refresh} />
								Refetch
							</ZIonButton>
						</ZIonButtons>
					</ZIonRow>
				</ZIonCol>
			</ZIonRow>

			{/* Teams Table */}
			<ZCan havePermissions={[permissionsEnum.view_workspaceTeam]}>
				<Suspense
					fallback={
						<ZIonRow className='h-full'>
							<ZFallbackIonSpinner2 />
						</ZIonRow>
					}
				>
					<ZWSSettingTeamListTable />
				</Suspense>
			</ZCan>
		</>
	);
};

export default ZWSSettingTeamsListPage;
