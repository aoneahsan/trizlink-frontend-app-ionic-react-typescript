/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import {
	ZIonButton,
	ZIonContent,
	ZIonInput,
	ZIonText,
	ZIonTitle,
} from '@/components/ZIonComponents';
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { replaceParams, replaceRouteParams } from '@/utils/helpers';
import { showInfoNotification } from '@/utils/notification';
import { useZIonToast } from '@/ZaionsHooks/zionic-hooks';
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

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

const ZShortLinkModal: React.FC<{
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
	workspaceId: string;
}> = ({ dismissZIonModal, workspaceId }) => {
	const { presentZIonToast } = useZIonToast();
	return (
		<>
			<ZIonContent className='ion-padding '>
				<div className='flex flex-col h-full ion-align-items-center ion-justify-content-center'>
					<ZIonText className='text-xl font-bold'>Well done 🧙</ZIonText>
					<ZIonText className='text-lg font-normal'>
						Your link is ready to be shared
					</ZIonText>

					{/* Copy short link to clipboard */}
					<div className='flex w-[90%] rounded-lg overflow-hidden my-5'>
						<div className='zaions__medium_bg h-[2.5rem] w-[90%] overflow-hidden line-clamp-1  flex ion-align-items-center ps-2'>
							<ZIonTitle className='text-sm ion-no-padding' color='light'>
								https://generatedshortlink.com
							</ZIonTitle>
						</div>
						<ZIonButton
							height='2.5rem'
							className='ion-no-margin'
							style={{
								'--border-radius': '0px',
							}}
							onClick={() => {
								navigator.clipboard.writeText('text will go there');

								presentZIonToast('✨ Copied', 'tertiary');
							}}
						>
							Copy
						</ZIonButton>
					</div>

					{/* Buttons */}
					<div className='flex w-[90%] ion-justify-content-between'>
						<ZIonButton
							fill='outline'
							routerLink={replaceParams(
								ZaionsRoutes.AdminPanel.ShortLinks.Create,
								CONSTANTS.RouteParams.workspace.workspaceId,
								workspaceId
							)}
						>
							Create a new link
						</ZIonButton>

						<ZIonButton
							routerLink={replaceRouteParams(
								ZaionsRoutes.AdminPanel.ShortLinks.Main,
								[
									CONSTANTS.RouteParams.workspace.workspaceId,
									CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio,
								],
								[workspaceId, 'all']
							)}
						>
							Go to dashboard
						</ZIonButton>
					</div>
				</div>
			</ZIonContent>
		</>
	);
};

export default ZShortLinkModal;
