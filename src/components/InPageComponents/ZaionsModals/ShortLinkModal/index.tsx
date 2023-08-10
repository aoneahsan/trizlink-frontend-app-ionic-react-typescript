/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import ZCan from '@/components/Can';
import {
	ZIonButton,
	ZIonContent,
	ZIonInput,
	ZIonText,
	ZIonTitle,
} from '@/components/ZIonComponents';
import { LinkTypeOptionsData } from '@/data/UserDashboard/Links';
import {
	FormMode,
	messengerPlatformsBlockEnum,
} from '@/types/AdminPanel/index.type';
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
import {
	createRedirectRoute,
	replaceParams,
	replaceRouteParams,
} from '@/utils/helpers';
import { showInfoNotification } from '@/utils/notification';
import { useZIonToast } from '@/ZaionsHooks/zionic-hooks';
import {
	NewShortLinkFormState,
	NewShortLinkSelectTypeOption,
} from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkFormState.recoil';
import React from 'react';
import { useSetRecoilState } from 'recoil';

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
	zNavigatePushRoute: (_url: string) => void;
	workspaceId: string;
	shortUrl: string;
}> = ({ dismissZIonModal, zNavigatePushRoute, workspaceId, shortUrl }) => {
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
							<ZIonTitle className='text-sm ion-no-padding' color='light'>
								{shortUrl}
							</ZIonTitle>
						</div>
						<ZIonButton
							height='2.5rem'
							className='ion-no-margin'
							style={{
								'--border-radius': '0px',
							}}
							onClick={() => {
								navigator.clipboard.writeText(shortUrl);

								presentZIonToast('✨ Copied', 'tertiary');
							}}
						>
							Copy
						</ZIonButton>
					</div>

					{/* Buttons */}
					<div className='flex w-[90%] ion-justify-content-between'>
						<ZCan havePermissions={[permissionsEnum.create_shortLink]}>
							<ZIonButton
								fill='outline'
								onClick={() => {
									dismissZIonModal();

									setNewShortLinkFormState((_) => ({
										folderId: CONSTANTS.DEFAULT_VALUES.DEFAULT_FOLDER,
										shortUrl: {
											domain: CONSTANTS.DEFAULT_VALUES.DEFAULT_CUSTOM_DOMAIN,
										},
										type: messengerPlatformsBlockEnum.link,
										pixelIds: [],
										tags: [],
										formMode: FormMode.ADD,
									}));

									const selectedTypeOptionData = LinkTypeOptionsData.find(
										(el) => el.type === messengerPlatformsBlockEnum.link
									);

									if (selectedTypeOptionData) {
										setNewShortLinkTypeOptionDataAtom((_) => ({
											...selectedTypeOptionData,
										}));
									}

									zNavigatePushRoute(
										createRedirectRoute({
											url: ZaionsRoutes.AdminPanel.ShortLinks.Create,
											params: [CONSTANTS.RouteParams.workspace.workspaceId],
											values: [workspaceId],
										})
									);
								}}
							>
								Create a new link
							</ZIonButton>
						</ZCan>

						<ZIonButton
							onClick={() => {
								dismissZIonModal();

								zNavigatePushRoute(
									replaceRouteParams(
										ZaionsRoutes.AdminPanel.ShortLinks.Main,
										[
											CONSTANTS.RouteParams.workspace.workspaceId,
											CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio,
										],
										[workspaceId, 'all']
									)
								);
							}}
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
