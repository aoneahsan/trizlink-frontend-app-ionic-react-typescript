import { ReactNode } from 'react';

// Enum's
export enum workspaceSettingsModalTabEnum {
	timetable = 'timetable',
	labels = 'labels',
	settings = 'settings',
	approvals = 'approvals',
}

export enum WorkspaceSharingTabEnum {
	invite = 'invite',
	members = 'members',
	permissions = 'permissions',
	notifications = 'notifications',
}

export enum workspaceFormTabEnum {
	workspaceDetailForm = 'workspaceDetailForm',
	inviteClients = 'inviteClients',
	connectPages = 'connectPages',
	Approval = 'Approval',
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

export enum workspacePostDetailTabEnum {
	desktop = 'desktop',
	mobile = 'mobile',
}

export enum workspaceFormConnectPagesCardEnum {
	page = 'page', // page or profile
	group = 'group',
	mockup = 'mockup',
	businessPages = 'businessPages',
	companyPage = 'companyPage',
	channel = 'channel',
	account = 'account',
}

export enum workspaceApprovalCardEnum {
	none = 'none',
	optional = 'optional',
	required = 'required',
	multiLevel = 'multiLevel',
}

export enum contentStyleInterface {
	default = 'default',
	classic = 'classic',
	modern = 'modern',
	compact = 'compact',
}

export enum workspaceViewNotificationsEnum {
	approvalRequests = 'approvalRequests',
	updates = 'updates',
}

export enum workspaceFilterAccordionEnum {
	approvalStatus = 'approvalStatus',
	postStatus = 'postStatus',
	feedbackAndActivity = 'feedbackAndActivity',
	labels = 'labels',
	period = 'period',
	postType = 'postType',
	content = 'content',
	author = 'author',
}

export enum workspaceFilterAccordionContentEnum {
	checkbox = 'checkbox',
	radio = 'radio',
}

// Interfaces
export interface workspaceInviteClientInterface {
	avatar?: string;
	email?: string;
	role: workspaceFormRoleEnum;
	permission: workspaceFormPermissionEnum;
}

export interface workspaceInterface {
	id?: string;
	workspaceName?: string;
	workspaceTimezone?: string;
	clients?: workspaceInviteClientInterface[];
}
export interface ApprovalCardInterface {
	icon: string;
	title: ReactNode;
	subtitle: string;
	cardType: workspaceApprovalCardEnum;
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
