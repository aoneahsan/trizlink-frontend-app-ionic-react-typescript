import { UserAccountType } from '@/types/UserAccount/index.type';
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

export enum AdminPanelMainSidebarMenuPageEnum {
	shortLink = 'shortLink',
	linkInBio = 'linkInBio',
	integration = 'integration',
	helpCenter = 'helpCenter',
	settings = 'settings',
	workspaces = 'workspaces',
}

//
export enum commentReplyEnum {
	comment = 'comment',
	reply = 'reply',
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

export interface ShortUrlInterface {
	domain?: string;
	url?: string;
}

export interface ZCommentInterface {
	id?: string;
	commentableId?: string;
	content: string;
	user: UserAccountType;
	replies: ZReplyInterface[];
	createdAt?: string;
	updatedAt?: string;
}

export interface ZReplyInterface {
	id?: string;
	content: string;
	user: UserAccountType;
	createdAt?: string;
	updatedAt?: string;
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
	type: AdminPanelMainSidebarMenuPageEnum;
	foldersData: LinkFolderType[];
	showFoldersSaveReorderButton?: boolean;
	handleFoldersReorder?: (
		event: IonReorderGroupCustomEvent<ItemReorderEventDetail>
	) => void;
	addNewFolderButtonOnClickHandler?: React.MouseEventHandler<HTMLIonButtonElement>;
	foldersSaveReorderButtonOnClickHandler?: React.MouseEventHandler<HTMLIonButtonElement>;
	folderActionsButtonOnClickHandler?: React.MouseEventHandler<HTMLIonButtonElement>;
}

// Types
export type genericZaionsRSelectOptions = ZaionsRSelectOptions[] | undefined;
