import { ReactNode } from 'react';

// Enum's
export enum workspaceSettingsModalTabEnum {
	timetable = 'timetable',
	labels = 'labels',
	settings = 'settings',
	approvals = 'approvals',
}

export enum workspaceFormTabEnum {
	workspaceDetailForm = 'workspaceDetailForm',
	inviteClients = 'inviteClients',
	connectPages = 'connectPages',
}

export enum workspaceFormRoleEnum {
	Contributor = 'Contributor',
	Administrator = 'Administrator',
	Writer = 'Writer',
	Approver = 'Approver',
	Guest = 'Guest',
}

export enum workspaceFormPermissionEnum {
	team = 'team',
	client = 'client',
}

export enum PageInfoCardItemTypeEnum {
	heading = 'heading',
	infoMessage = 'infoMessage',
	simpleCard = 'simpleCard',
	listCard = 'listCard',
}

export enum workspaceFormConnectPagesEnum {
	facebook = 'facebook',
	twitter = 'twitter',
	instagram = 'instagram',
	linkedin = 'linkedin',
	googleBusiness = 'googleBusiness',
	youtube = 'youtube',
	tiktok = 'tiktok',
	pinterest = 'pinterest',
	universalContent = 'universalContent',
}

// Interfaces
export interface workspaceInviteClientInterface {
	avatar?: string;
	email?: string;
	role: workspaceFormRoleEnum;
	permission: workspaceFormPermissionEnum;
}

export interface workspaceInterface {
	workspaceName?: string;
	workspaceTimezone?: string;
	clients?: workspaceInviteClientInterface[];
}

// Pages info cards items types/enums
export interface WorkspacePageCardInfoPopoverItemType {
	type: PageInfoCardItemTypeEnum;
	text?: string;
	htmlContent?: string;
	items?: PageInfoCardSingleItemType[];
}
export interface PageInfoCardSingleItemType {
	icon: string;
	heading: string;
	subheading?: string;
	listItems?: {
		icon: string;
		text: string;
	}[];
}

// Types
