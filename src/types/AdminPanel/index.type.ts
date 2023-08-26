import { IonReorderGroupCustomEvent } from '@ionic/core';
import { LinkFolderType } from './linksType/index';
import { ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
import { ItemReorderEventDetail } from '@ionic/react';

// Enum's
export enum FormMode {
	ADD = 'add',
	EDIT = 'edit',
}

export enum folderState {
	shortlink = 'shortlink',
	linkInBio = 'linkInBio',
}

export enum messengerPlatformsBlockEnum {
	email = 'email',
	link = 'link',
	whatsapp = 'whatsapp',
	messenger = 'messenger',
	call = 'call',
	sms = 'sms',
	telegram = 'telegram',
	skype = 'skype',
	wechat = 'wechat',
	line = 'line',
	viber = 'viber',
	default = 'default',
}

export enum AdminPanelSidebarMenuPageEnum {
	shortLink = 'shortLink',
	linkInBio = 'linkInBio',
	integration = 'integration',
	helpCenter = 'helpCenter',
	settings = 'settings',
	workspaces = 'workspaces',
}

export enum daysEnum {
	monday = 'monday',
	tuesday = 'tuesday',
	wednesday = 'wednesday',
	thursday = 'thursday',
	friday = 'friday',
	saturday = 'saturday',
	sunday = 'sunday',
	weekday = 'weekday',
	weekends = 'weekends',
	allDays = 'allDays',
}

export enum ZUserSettingTypeEnum {
	shortLinkListPageTable = 'shortLinkListPageTable',
}

export enum ZNotificationEnum {
	newDeviceLogin = 'newDeviceLogin',
	lastLogout = 'lastLogout',
	wsTeamMemberInvitation = 'wsTeamMemberInvitation',
}

// Interfaces
export interface UTMTagInfoInterface {
	templateId?: string;
	utmCampaign?: string;
	utmMedium?: string;
	utmSource?: string;
	utmTerm?: string;
	utmContent?: string;
}

export interface IZNotification {
	id?: string;
	ZLInviteeId?: string;
	zlNotificationType?: ZNotificationEnum;
	data: {
		item: {
			userId: string;
			message: string;
			inviter: string;
			inviterUserId: string;
			teamId: string;
			teamName: string;
		};
	};
}

export interface ShortUrlInterface {
	domain?: string;
	url?: string;
}

export interface TimeSlotInterface {
	id?: string;
	time: string;
	day: daysEnum;
	color: string;
	isActive?: boolean;
}

export interface LabelInterface {
	id?: string;
	title?: string;
	postsCount?: string;
	color: string;
	isActive?: boolean;

	editMode?: boolean; // just for frontend.
}

export interface ABTestingRotatorInterface {
	id?: string;
	redirectionLink?: string;
	percentage?: number;
}

export interface GeoLocationRotatorInterface {
	id?: string;
	redirectionLink?: string;
	country?: string;
}

export interface LinkExpirationInfoInterface {
	expirationDate?: string;
	timezone?: string;
	redirectionLink?: string;
	enabled?: boolean;
}

export interface PasswordInterface {
	value?: string;
	password?: string;
	enabled?: boolean;
}

export interface ZDashboardFolderMenuInterface {
	type: AdminPanelSidebarMenuPageEnum;
	foldersData: LinkFolderType[];
	showFoldersSaveReorderButton?: boolean;
	handleFoldersReorder?: (
		event: IonReorderGroupCustomEvent<ItemReorderEventDetail>
	) => void;
	addNewFolderButtonOnClickHandler?: React.MouseEventHandler<HTMLIonButtonElement>;
	foldersSaveReorderButtonOnClickHandler?: React.MouseEventHandler<HTMLIonButtonElement>;
	folderActionsButtonOnClickHandler?: React.MouseEventHandler<HTMLIonButtonElement>;
	showSkeleton?: boolean;
}

export interface ZUserSettingInterface {
	id?: string;
	type?: ZUserSettingTypeEnum;
	workspaceUniqueId?: string;
	settings: {
		shortLinkColumn: {
			id?: string;
			name: string;
			isVisible: boolean;
			orderNumber: number;
		}[];
		columnOrderIds: string[];
	};
}

// Types
export type genericZaionsRSelectOptions = ZaionsRSelectOptions[] | undefined;
