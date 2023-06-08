/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';
import { useParams } from 'react-router';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { Formik } from 'formik';
import routeQueryString from 'qs';
import classNames from 'classnames';
import { lockClosedOutline, timeOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonFooter,
	ZIonGrid,
	ZIonRow,
} from '@/components/ZIonComponents';
import ZWorkspaceApprovalCards from '@/components/WorkspacesComponents/ApprovalCards';
import ZWorkspaceApprovalToggler from '@/components/WorkspacesComponents/ApprovalToggler';
import ZWorkspaceFooterSteps from '@/components/WorkspacesComponents/FooterSteps';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { createRedirectRoute } from '@/utils/helpers';
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	workspaceApprovalCardEnum,
	workspaceFormTabEnum,
} from '@/types/AdminPanel/workspace';
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

const ZWorkspaceFormApprovalTab: React.FC = () => {
	// Media Query Scale
	const { isXlScale, isLgScale, isMdScale, isSmScale, isXsScale } =
		useZMediaQueryScale();

	// getting workspace id from route (url), when user refresh the page the id from route will be get and workspace of that id will be fetch from backend.
	const { editWorkspaceId } = useParams<{
		editWorkspaceId: string;
	}>();

	// getting search param from url with the help of 'qs' package
	const routeQSearchParams = routeQueryString.parse(location.search, {
		ignoreQueryPrefix: true,
	});

	return (
		<Formik
			initialValues={{
				approval: workspaceApprovalCardEnum.required,
				schedulePostsApproval: false,
				lockContentApproval: false,
			}}
			validate={() => {
				const errors: {} = {};

				return errors;
			}}
			onSubmit={() => {}}
		>
			{({ values, setFieldValue }) => {
				return (
					<>
						<ZIonContent>
							<ZIonGrid
								className={classNames({
									'mt-3': true,
									'mx-5': isXlScale,
									'mx-3': !isXlScale && isLgScale,
									'mx-2': !isLgScale && isMdScale,
									'mx-1': !isMdScale && isSmScale,
								})}
							>
								{/* Approval Cards */}
								<ZWorkspaceApprovalCards
									type={values.approval}
									onClick={(type) => setFieldValue('approval', type, false)}
								/>

								{/* Schedule posts approval */}
								<ZIonRow className='mt-4 ion-align-items-center ion-justify-content-center'>
									<ZIonCol sizeXl='5'>
										{/* Schedule posts approval */}
										<ZWorkspaceApprovalToggler
											icon={timeOutline}
											text='Schedule posts automatically on approval'
											checked={values.schedulePostsApproval}
											onChange={(val) => {
												setFieldValue('schedulePostsApproval', val, false);
											}}
										/>

										{/* Lock content approval */}
										<ZWorkspaceApprovalToggler
											icon={lockClosedOutline}
											className='mt-2'
											text='Lock content after approval'
											checked={values.lockContentApproval}
											onChange={(val) => {
												setFieldValue('lockContentApproval', val, false);
											}}
										/>
									</ZIonCol>
								</ZIonRow>
							</ZIonGrid>
						</ZIonContent>

						{/* Footer */}
						<ZIonFooter
							className='flex py-2 align-items-center'
							collapse='fade'
						>
							<div
								className={classNames({
									'mx-auto': true,
									'w-4/12': isXlScale,
									'w-5/12': !isXlScale && isLgScale,
									'w-6/12': !isLgScale && isMdScale,
									'w-7/12': !isMdScale && isSmScale,
									'w-full': !isSmScale,
								})}
							>
								<ZIonRow
									className={classNames({
										'ion-justify-content-center':
											routeQSearchParams.tab ===
											workspaceFormTabEnum.workspaceDetailForm,
									})}
								>
									{/* Go Back button */}
									<ZIonCol
										sizeXl='6'
										sizeLg='6'
										sizeMd='6'
										sizeSm='6'
										sizeXs='12'
									>
										<ZIonButton
											expand='block'
											fill='outline'
											className='text-transform-initial'
											routerLink={createRedirectRoute({
												url: ZaionsRoutes.AdminPanel.Workspaces.Edit,
												params: [
													CONSTANTS.RouteParams.workspace.editWorkspaceIdParam,
												],
												values: [editWorkspaceId],
												routeSearchParams: {
													tab: workspaceFormTabEnum.connectPages,
												},
											})}
										>
											Go Back
										</ZIonButton>
									</ZIonCol>

									{/* Connect Later button */}
									<ZIonCol
										sizeXl='6'
										sizeLg='6'
										sizeMd='6'
										sizeSm='6'
										sizeXs='12'
									>
										<ZIonButton
											expand='block'
											className='text-transform-initial'
											routerLink={createRedirectRoute({
												url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
												params: [
													CONSTANTS.RouteParams.workspace.workspaceId,
													CONSTANTS.RouteParams.folderIdToGetShortLinks,
												],
												values: [editWorkspaceId, 'all'],
											})}
										>
											Finish
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
	);
};

export default ZWorkspaceFormApprovalTab;
