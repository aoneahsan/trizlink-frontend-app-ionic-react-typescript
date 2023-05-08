// Enum's
export enum workspaceSettingsModalTabEnum {
	timetable = 'timetable',
	labels = 'labels',
	settings = 'settings',
	approvals = 'approvals',
}

export enum workspaceFormModalTabEnum {
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

// Types
