import { LinkInBioBlockEnum, LinkInBioBlockFromType } from './blockTypes/index';
import {
	ABTestingRotatorInterface,
	GeoLocationRotatorInterface,
	LinkExpirationInfoInterface,
	PasswordInterface,
	ShortUrlInterface,
	UTMTagInfoInterface,
} from 'types/AdminPanel/index.type';

import { FormMode } from 'types/AdminPanel/index.type';

import { ZaionsRSelectOptions } from 'types/components/CustomComponents/index.type';

/**
 * Enum's
 */
export enum LinkInBioThemeBackgroundEnum {
	solidColor = 'solidColor',
	gradient = 'gradient',
	image = 'image',
}

export enum LinkInBioButtonTypeEnum {
	inlineSquare = 'inlineSquare',
	inlineRound = 'inlineRound',
	inlineCircle = 'inlineCircle',

	inlineSquareOutline = 'inlineSquareOutline',
	inlineRoundOutline = 'inlineRoundOutline',
	inlineCircleOutline = 'inlineCircleOutline',

	inlineSquareShadow = 'inlineSquareShadow',
	inlineRoundShadow = 'inlineRoundShadow',
	inlineCircleShadow = 'inlineCircleShadow',
}

export enum LinkInBioThemeFontEnum {
	roboto = 'roboto',
	lato = 'lato',
	baybas = 'baybas',
	serif = 'serif',
	sanSerif = 'san-serif',
	newTimeArial = 'new-time-arial',
	B612 = 'B612',
	alegreya = 'Alegreya',
	titilliumWeb = 'titillium-web',
	vollkorn = 'vollkorn',
	IBMPlexSerif = 'IBM-plex-serif',
}

export enum ZLinkInBioRHSComponentEnum {
	theme = 'theme',
	blocks = 'blocks',
	settings = 'settings',
	poweredBy = 'poweredBy',
	blockForm = 'blockForm',
}

export enum ZLinkInBioPageEnum {
	design = 'design',
	shareSettings = 'shareSettings',
	pageAnalytics = 'pageAnalytics',
	lead = 'lead',
	blockAnalytics = 'blockAnalytics',
}

/**
 * Interfaces
 */
export interface LinkInBioThemeFontFamilyInterface {
	id?: string;
	fontName: LinkInBioThemeFontEnum;
}

export interface LinkInBioFormPageInterface {
	page?: ZLinkInBioPageEnum;
}

export interface LinkInBioBgGradientColorsInterface {
	startColor: string;
	endColor: string;
	direction: string | number;
}

/**
 * Types
 */
export type LinkInBioThemeBackgroundType = {
	bgType: LinkInBioThemeBackgroundEnum;
	bgSolidColor?: string;
	bgGradientColors?: LinkInBioBgGradientColorsInterface;
	bgImageUrl?: string;
	enableBgImage?: boolean;
};

export type LinkInBioPredefinedThemeType = {
	id?: string;
	background: string | LinkInBioThemeBackgroundType | undefined;
	isActive?: boolean;
	createdAt?: string;
	updatedAt?: string;
};

export type LinkInBioThemeType = {
	predefinedThemeId?: string;
	background?: LinkInBioThemeBackgroundType;
	button: {
		background?: LinkInBioThemeBackgroundType;
		type?: LinkInBioButtonTypeEnum;
		shadowColor?: string;
	};
	font?: LinkInBioThemeFontEnum;
};

export type LinkInBIoSettingType = {
	headerCode?: string;
	bodyCode?: string;
};

export type LinkInBioType = {
	id?: string;
	// Design Page Types
	designPageCurrentTab?: ZLinkInBioRHSComponentEnum;
	// theme tab - Design Page Types
	LinkInBioBlock?: LinkInBioBlockEnum; // REMOVE THIS
	theme: LinkInBioThemeType;
	settings: LinkInBIoSettingType;
	// blocks tab - Design Page Types
	// we will use relationship in backend to send back this data as well when sending the link-in-bio data
	blocks?: LinkInBioBlockFromType[];

	// form data - for creation/updating
	featureImg?: string;
	title?: string;
	linkInBioTitle?: string;
	description?: string;
	pixelIds?: ZaionsRSelectOptions[] | string[] | string;
	utmTagInfo?: UTMTagInfoInterface | string;
	shortUrl?: ShortUrlInterface | string;
	folderId?: string | number; // default if non is given
	notes?: string | null;
	tags?: string[] | string;
	abTestingRotatorLinks?: ABTestingRotatorInterface[] | string;
	geoLocationRotatorLinks?: GeoLocationRotatorInterface[] | string;
	linkExpirationInfo?: LinkExpirationInfoInterface | string;
	password?: string | PasswordInterface;
	// favicon?: {
	//   url?: string;
	//   type?: string;
	//   fileName?: string;
	//   size?: string;
	// };

	favicon?: string;

	// computed data - due to other events or calculations
	totalClicks?: number;

	// other default fields
	createdAt?: string;
	updatedAt?: string;

	// frontend form fields
	formState?: {
		submitted?: boolean;
		errorShown?: boolean;
		isValid?: boolean;
		formErrors?: unknown; // ahsan bahi ny btani hy type, aj hi pochni hy sham tak
		linkExpiration?: boolean;
		password?: boolean;
	};

	formMode?: FormMode;
};
