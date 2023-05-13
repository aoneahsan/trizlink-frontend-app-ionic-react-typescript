/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import routeQueryString from 'qs';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import { ZIonCol, ZIonRow } from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { workspaceFormTabEnum } from '@/types/AdminPanel/workspace';

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

const ZWorkspaceFooterSteps: React.FC = () => {
	// getting search param from url with the help of 'qs' package
	const routeQSearchParams = routeQueryString.parse(location.search, {
		ignoreQueryPrefix: true,
	});

	return (
		<ZIonRow className='gap-1 mt-3 ion-align-items-center'>
			<ZIonCol
				className={classNames({
					'h-2 p-0 m-0 rounded zaions-transition': true,
					zaions__primary_bg:
						routeQSearchParams.tab === workspaceFormTabEnum.inviteClients ||
						routeQSearchParams.tab === workspaceFormTabEnum.connectPages ||
						routeQSearchParams.tab === workspaceFormTabEnum.Approval,
					zaions__medium_bg:
						routeQSearchParams.tab === workspaceFormTabEnum.workspaceDetailForm,
				})}
			></ZIonCol>

			<ZIonCol
				className={classNames({
					'h-2 p-0 m-0 rounded zaions-transition': true,
					zaions__primary_bg:
						routeQSearchParams.tab === workspaceFormTabEnum.connectPages ||
						routeQSearchParams.tab === workspaceFormTabEnum.Approval,
					zaions__medium_bg:
						routeQSearchParams.tab ===
							workspaceFormTabEnum.workspaceDetailForm ||
						routeQSearchParams.tab === workspaceFormTabEnum.inviteClients,
				})}
			></ZIonCol>

			<ZIonCol
				className={classNames({
					'h-2 p-0 m-0 rounded zaions-transition': true,
					zaions__primary_bg:
						routeQSearchParams.tab === workspaceFormTabEnum.Approval,
					zaions__medium_bg:
						routeQSearchParams.tab ===
							workspaceFormTabEnum.workspaceDetailForm ||
						routeQSearchParams.tab === workspaceFormTabEnum.inviteClients ||
						routeQSearchParams.tab === workspaceFormTabEnum.connectPages,
				})}
			></ZIonCol>
		</ZIonRow>
	);
};

export default ZWorkspaceFooterSteps;
