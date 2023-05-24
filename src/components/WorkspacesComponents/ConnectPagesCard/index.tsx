/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
	gridOutline,
	logoFacebook,
	logoGoogle,
	logoInstagram,
	logoLinkedin,
	logoPinterest,
	logoTiktok,
	logoTwitter,
	logoYoutube,
} from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonCard,
	ZIonCardContent,
	ZIonIcon,
	ZIonText,
} from '@/components/ZIonComponents';

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
import { workspaceFormConnectPagesEnum } from '@/types/AdminPanel/workspace';
import classNames from 'classnames';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import ZWorkspaceConnectPagesModal from '@/components/InPageComponents/ZaionsModals/Workspace/ConnectPagesModal';
import { brandColors } from '@/utils/constants';
import ZWorkspaceMockupPageModal from '@/components/InPageComponents/ZaionsModals/Workspace/MockupPageModal';

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
interface ZWorkspaceFromConnectPagesCardInterface {
	title?: string;
	subTitle?: string;
	icon?: string;
	pageType?: workspaceFormConnectPagesEnum;
	activeColor?: string;
}
/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZWorkspaceFromConnectPagesCard: React.FC<
	ZWorkspaceFromConnectPagesCardInterface
> = ({ pageType, activeColor, icon, subTitle, title }) => {
	const [compState, setCompSate] = useState<{
		isActive: boolean;
		iconName?: string;
		title?: string;
		activeColor?: string;
		subTitle?: string;
	}>({
		isActive: false,
	});

	// Custom Hooks
	const { presentZIonModal: presentWorkspaceConnectPagesModal } = useZIonModal(
		ZWorkspaceConnectPagesModal,
		{
			pageType: pageType,
		}
	); // Modal hook to show workspace form modal (create/edit form)

	//
	const { presentZIonModal: presentZWorkspaceMockupPageModal } = useZIonModal(
		ZWorkspaceMockupPageModal,
		{
			pageType: workspaceFormConnectPagesEnum.universalContent,
			color: brandColors.tiktok,
			logo: gridOutline,
		}
	);

	// Setting the content of card accounting to type.
	useEffect(() => {
		switch (pageType) {
			case workspaceFormConnectPagesEnum.facebook:
				setCompSate((oldValues) => ({
					...oldValues,
					activeColor: brandColors.facebook,
					title: 'Facebook',
					subTitle: 'Page or group',
					iconName: logoFacebook,
				}));
				break;

			case workspaceFormConnectPagesEnum.instagram:
				setCompSate((oldValues) => ({
					...oldValues,
					activeColor: brandColors.instagram,
					title: 'Instagram',
					subTitle: 'Business account or profile',
					iconName: logoInstagram,
				}));
				break;

			case workspaceFormConnectPagesEnum.twitter:
				setCompSate((oldValues) => ({
					...oldValues,
					activeColor: brandColors.twitter,
					title: 'Twitter',
					subTitle: 'Profile',
					iconName: logoTwitter,
				}));
				break;

			case workspaceFormConnectPagesEnum.tiktok:
				setCompSate((oldValues) => ({
					...oldValues,
					activeColor: brandColors.tiktok,
					title: 'Tiktok',
					subTitle: 'Account',
					iconName: logoTiktok,
				}));
				break;

			case workspaceFormConnectPagesEnum.youtube:
				setCompSate((oldValues) => ({
					...oldValues,
					activeColor: brandColors.youtube,
					title: 'Youtube',
					subTitle: 'Channel',
					iconName: logoYoutube,
				}));
				break;

			case workspaceFormConnectPagesEnum.googleBusiness:
				setCompSate((oldValues) => ({
					...oldValues,
					activeColor: brandColors.google,
					title: 'Google Business Profile',
					subTitle: 'Business location',
					iconName: logoGoogle,
				}));
				break;

			case workspaceFormConnectPagesEnum.pinterest:
				setCompSate((oldValues) => ({
					...oldValues,
					activeColor: brandColors.pinterest,
					title: 'Pinterest',
					subTitle: 'Business account',
					iconName: logoPinterest,
				}));
				break;

			case workspaceFormConnectPagesEnum.linkedin:
				setCompSate((oldValues) => ({
					...oldValues,
					activeColor: brandColors.linkedin,
					title: 'Linkedin',
					subTitle: 'Company page or profile',
					iconName: logoLinkedin,
				}));
				break;

			case workspaceFormConnectPagesEnum.universalContent:
				setCompSate((oldValues) => ({
					...oldValues,
					activeColor: brandColors.tiktok,
					title: 'Universal content',
					subTitle: 'Page',
					iconName: gridOutline,
				}));
				break;

			default:
				setCompSate((oldValues) => ({
					...oldValues,
					activeColor: activeColor,
					title: title,
					subTitle: subTitle,
					iconName: icon,
				}));
				break;
		}
	}, [pageType]);

	return (
		<ZIonCard
			className='zaions__cursor_pointer h-full'
			onMouseEnter={() => {
				setCompSate((oldValues) => ({
					...oldValues,
					isActive: true,
				}));
			}}
			onMouseLeave={() => {
				setCompSate((oldValues) => ({
					...oldValues,
					isActive: false,
				}));
			}}
			style={{
				backgroundColor: compState.isActive ? compState.activeColor : '',
			}}
			onClick={() => {
				pageType === workspaceFormConnectPagesEnum.universalContent
					? presentZWorkspaceMockupPageModal({
							_cssClass: 'workspace-connect-pages-modal-size',
					  })
					: presentWorkspaceConnectPagesModal({
							_cssClass: 'workspace-connect-pages-modal-size',
					  });
			}}
		>
			<ZIonCardContent className='pt-4 pb-3 ion-text-center'>
				<ZIonIcon
					icon={icon || compState.iconName}
					className='w-10 h-10 pt-2 mt-1'
					style={{ color: compState.activeColor }}
					color={compState.isActive ? 'light' : undefined}
				/>
				{/*  */}
				<ZIonText
					className='mt-1 ion-text-center block'
					color={compState.isActive ? 'light' : 'dark'}
				>
					{title || compState.title}
				</ZIonText>

				{/*  */}
				<ZIonText
					className={classNames({
						'ion-text-center block zaions__fs_13 text-muted': true,
						'opacity-100': !compState.isActive,
						'opacity-0': compState.isActive,
					})}
					color={compState.isActive ? 'light' : 'dark'}
				>
					{subTitle || compState.subTitle}
				</ZIonText>

				{/*  */}
				<ZIonText
					className={classNames({
						'ion-text-center block': true,
						'opacity-100': compState.isActive,
						'opacity-0': !compState.isActive,
					})}
					color={compState.isActive ? 'light' : 'dark'}
				>
					CONNECT
				</ZIonText>
			</ZIonCardContent>
		</ZIonCard>
	);
};

export default ZWorkspaceFromConnectPagesCard;
