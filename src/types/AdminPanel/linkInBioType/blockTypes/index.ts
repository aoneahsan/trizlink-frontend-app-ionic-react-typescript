import { messengerPlatformsBlockEnum } from 'types/AdminPanel/index.type';
import { LinkInBioButtonTypeEnum, LinkInBioThemeBackgroundType } from '..';

/**
 * Enum's
 */
export enum LinkInBioBlocksPositionEnum {
	top = 'top',
	bottom = 'bottom',
}

export enum LinkInBioCardViewEnum {
	carousel = 'carousel',
	list = 'list',
	mixed = 'mixed',
}

export enum LinkInBioBlockEnum {
	button = 'button',
	text = 'text',
	countdown = 'countdown',
	card = 'card',
	carousel = 'carousel',
	RSS = 'RSS',
	audio = 'audio',
	video = 'video',
	calendar = 'calendar',
	avatar = 'avatar',
	default = 'default', //
	music = 'music',
	map = 'map',
	VCard = 'VCard',
	Iframe = 'Iframe',
	QAndA = 'QAndA',
	shopify = 'shopify',
	magento = 'magento',
	wordpress = 'wordpress',
	form = 'form',
	social = 'social',
	separator = 'separator',
	messenger = 'messenger',
	spacing = 'spacing',
}

export enum LinkInBioMusicPlatformEnum {
	spotify = 'spotify',
	soundCloud = 'soundCloud',
	googleMusic = 'googleMusic',
	napster = 'napster',
	appleMusic = 'appleMusic',
	youtube = 'youtube',
	deezer = 'deezer',
	amazonMusic = 'amazonMusic',
	default = 'default',
}

export enum LinkInBioSocialPlatformEnum {
	tiktok = 'tiktok',
	facebook = 'facebook',
	instagram = 'instagram',
	twitter = 'twitter',
	linkedin = 'linkedin',
	slack = 'slack',
	youtube = 'youtube',
	pinterest = 'pinterest',
	default = 'default',
}

export enum LinkInBioBlockAnimationEnum {
	tada = 'tada',
	shake = 'shake',
	swing = 'swing',
	wobble = 'wobble',
	jello = 'jello',
	pulse = 'pulse',
	zoom = 'zoom',
}

export enum LinkInBioFormFieldsEnum {
	title = 'title',
	firstName = 'firstName',
	lastName = 'lastName',
	email = 'email',
	phone = 'phone',
	text = 'text',
	date = 'date',
	website = 'website',
}

// Ahsan bhai said, This mush separate from short link (just to keep it separate)
export enum linkInBioBlockCardItemEnum {
	url = 'url',
	email = 'email',
	whatsapp = 'whatsapp',
	messenger = 'messenger',
	call = 'call',
	sms = 'sms',
	telegram = 'telegram',
	skype = 'skype',
	wechat = 'wechat',
	line = 'line',
	viber = 'viber',
}

export enum cardDisplayEnum {
	carousel = 'carousel',
	music = 'music',
	QandA = 'QandA',
	messenger = 'messenger',
	social = 'social',
}

export enum LinkInBioCardStyleEnum {
	vertical = 'vertical',
	horizontal = 'horizontal',
	thumbRound = 'thumbRound',
	thumbCircle = 'thumbCircle',
	thumbStrip = 'thumbStrip',
	circle = 'circle',
	square = 'square',
	album = 'album',
}

export enum SeparatorTypeEnum {
	solid = 'solid',
	dashed = 'dashed',
	dotted = 'dotted',
}

/**
 * Interfaces
 */

// "linkInBioBlockCardItemInterface": this interface defines the type of single "Card Item" used inside a link in bio block, which allows user to add/removes any number of cards
// Like: question cards, carousel cards, social cards, etc
export interface linkInBioBlockCardItemInterface {
	target?: {
		/** this is for the url field used in cards
		 * (block: calendar, purpose: link of calendar or meeting, like from (calendly.com)),
		 */
		url?: string;
	};
	imageUrl?: string;
	icon?: string;
	title?: string;
	text?: string;
	email?: string;
	phoneNumber?: string;
	username?: string;
	object?: string;
	description?: string;
	orderNo?: string;
	isActive?: boolean;
	cardDisplayType?: cardDisplayEnum;
	musicCardType?: LinkInBioMusicPlatformEnum;
	messengerCardType?: messengerPlatformsBlockEnum;
	socialCardType?: LinkInBioSocialPlatformEnum;
}

export interface linkInBioFromFieldItemInterface {
	placeholder?: string;
	title?: string;
	type?: LinkInBioFormFieldsEnum;
	columnId?: string;
	required?: boolean;
	isActive?: boolean;
}

// Interface for per-defined platform use in link-in-bio-block-form or link-in-bio blocks. for example music platform, social platform etc.
export interface LinkInBioPredefinedPlatformInterface<T> {
	id?: string;
	type: T;
	icon?: string;
	isActive?: boolean;
	orderNo?: number;
	title?: string;
}

export interface LinkInBioPredefinedBlocksInterface
	extends LinkInBioPredefinedPlatformInterface<LinkInBioBlockEnum> {
	title?: string;
}

/**
 * Types
 */

// we will keep the blocks in a separate table to keep it easy while, adding, updating and deleting blocks from a link-in-bio
// when user will start editing a block he will not be able to change the tab, block etc until he/she press the save and save the changes made.
export type LinkInBioSingleBlockContentType = {
	// Ahsan bhai said, This mush separate from short link (just to keep it separate)
	target?: {
		/** this is for the url field directly in blocks
		 * (block: button, purpose: as target url of button),
		 * (block: countdown, purpose: getting meta data from url),
		 * (block: audio, purpose: as a link of audio),
		 * (block: video, purpose: as a link of video),
		 * (block: calendar, purpose: link of calendar or meeting, like from (calendly.com)),
		 */
		url?: string;

		email?: string;

		phoneNumber?: string;

		username?: string;

		accountId?: string;

		subject?: string;
		message?: string;
		type?: linkInBioBlockCardItemEnum;
	};
	vcard?: {
		firstName?: string;
		lastName?: string;
		mobile?: string;
		phone?: string;
		fax?: string;
		email?: string;
		company?: string;
		job?: string;
		street?: string;
		city?: string;
		zip?: number;
		state?: string;
		country?: string;
		website?: string;
	};
	title?: string;
	icon?: string;
	text?: string;
	description?: string;
	titleIsEnable?: boolean;
	descriptionIsEnable?: boolean;
	pictureIsEnable?: boolean;
	priceIsEnable?: boolean;
	cardIsEnable?: boolean;
	searchString?: string;
	cardNumber?: number;
	customHeight?: number;
	date?: string;
	timezone?: string;
	imageUrl?: string;
	avatarShadow?: boolean;
	cardMode?: boolean;
	iframe?: string;
	separatorType?: SeparatorTypeEnum;
	separatorColor?: string;
	separatorMargin?: number;
	spacing?: number;
	margin?: number;

	map?: {
		formattedAddress?: string;
		lat?: number;
		lng?: number;
		userEnteredAddress?: string;
	};

	customAppearance?: {
		isEnabled?: boolean;
		background?: LinkInBioThemeBackgroundType;
		color?: string;
		buttonType?: LinkInBioButtonTypeEnum;
		shadowColor?: string;
	};

	animation?: {
		isEnabled?: boolean;
		type?: LinkInBioBlockAnimationEnum;
	};

	style?: LinkInBioCardStyleEnum;

	view?: LinkInBioCardViewEnum;

	cardItems?: linkInBioBlockCardItemInterface[];

	form?: {
		formFields?: linkInBioFromFieldItemInterface[];
		isTermEnabled?: boolean;
		submitButtonText?: string;
		termText?: string;
		termLink?: string;
	};

	schedule?: {
		isEnabled?: boolean;
		startAt?: string;
		endAt?: string;
		timezone?: string;
	};
};

export type LinkInBioBlockFromType = {
	id?: string;
	linkInBioId?: string; // will store the link in bio unique id here to create the relationship of this block with the respective link-in-bio

	// The type of blocks like button, text etc. accounting to type the data will be stored
	blockType: LinkInBioBlockEnum;

	blockContent?: LinkInBioSingleBlockContentType;

	isActive?: boolean;
	orderNo?: string;
	createdAt?: Date;
	updatedAt?: Date;
};
