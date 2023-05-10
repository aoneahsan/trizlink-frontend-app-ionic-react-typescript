import {
	businessOutline,
	flagOutline,
	gridOutline,
	logoFacebook,
	logoGoogle,
	logoInstagram,
	logoLinkedin,
	logoPinterest,
	logoTiktok,
	logoTwitter,
	logoYoutube,
	medicalOutline,
	peopleOutline,
	personOutline,
	playCircleOutline,
} from 'ionicons/icons';

import { brandColors } from '@/utils/constants/index';
import {
	PageInfoCardItemType,
	PageInfoCardItemTypeEnum,
	workspaceFormConnectPagesEnum,
} from '@/types/AdminPanel/workspace';
import { ReactNode } from 'react';

// get data of cards by workspaceFormConnectPagesEnum to how in workspaceConnectPagesModal.
export const CardsByType: {
	[key in workspaceFormConnectPagesEnum]: {
		logo?: string;
		color: string;
		cards: {
			cardIcon: string;
			title: string;
			showInfoIcon?: boolean;
			onClick?: React.MouseEventHandler<HTMLIonCardElement>;
			infoItems?: {
				type: PageInfoCardItemTypeEnum;
				text?: string;
				htmlContent?: ReactNode;
				items?: PageInfoCardItemType[];
			}[];
		}[];
	};
} = {
	// Facebook
	[workspaceFormConnectPagesEnum.facebook]: {
		logo: logoFacebook,
		color: brandColors.facebook,
		cards: [
			{
				cardIcon: flagOutline,
				title: 'Add Facebook pages',
				showInfoIcon: false,
			},
			{
				cardIcon: peopleOutline,
				title: 'Add Facebook groups',
				showInfoIcon: false,
			},
			{
				cardIcon: medicalOutline,
				title: 'Create a mockup page',
				showInfoIcon: false,
			},
		],
	},

	// Twitter
	[workspaceFormConnectPagesEnum.twitter]: {
		logo: logoTwitter,
		color: brandColors.twitter,
		cards: [
			{
				cardIcon: personOutline,
				title: 'Add Twitter profiles',
				showInfoIcon: false,
			},
			{
				cardIcon: medicalOutline,
				title: 'Create a mockup page',
				showInfoIcon: false,
			},
		],
	},

	// Instagram
	[workspaceFormConnectPagesEnum.instagram]: {
		logo: logoInstagram,
		color: brandColors.instagram,
		cards: [
			{
				cardIcon: businessOutline,
				title: 'Add Instagram business pages',
				showInfoIcon: false,
			},
			{
				cardIcon: personOutline,
				title: 'Add Instagram profiles or pages',
				showInfoIcon: true,
				infoItems: [
					{
						type: PageInfoCardItemTypeEnum.heading,
						text: 'There are 3 different types of IG profiles:',
					},
					{
						type: PageInfoCardItemTypeEnum.simpleCard,
						items: [
							{
								icon: 'some icon',
								heading: 'some heading',
								subheading: 'sub heading text',
							},
							{
								icon: 'some icon',
								heading: 'some heading',
								subheading: 'sub heading text',
							},
							{
								icon: 'some icon',
								heading: 'some heading',
								subheading: 'sub heading text',
							},
						],
					},
					{
						type: PageInfoCardItemTypeEnum.infoMessage,
						htmlContent:
							'<>See our <a href="constant create ">help article</a> for more details.</>',
					},
				],
			},
			{
				cardIcon: medicalOutline,
				title: 'Create a mockup page',
				showInfoIcon: false,
			},
		],
	},

	// Tiktok
	[workspaceFormConnectPagesEnum.tiktok]: {
		logo: logoTiktok,
		color: brandColors.tiktok,
		cards: [
			{
				cardIcon: playCircleOutline,
				title: 'Add TikTok account',
				showInfoIcon: true,
			},
			{
				cardIcon: playCircleOutline,
				title: 'Add TikTok business profile',
				showInfoIcon: true,
			},
			{
				cardIcon: medicalOutline,
				title: 'Create a mockup page',
				showInfoIcon: false,
			},
		],
	},

	// Google Business Profile
	[workspaceFormConnectPagesEnum.googleBusiness]: {
		logo: logoGoogle,
		color: brandColors.google,
		cards: [
			{
				cardIcon: logoGoogle,
				title: 'Add Google Business Profile pages',
				showInfoIcon: false,
			},
			{
				cardIcon: medicalOutline,
				title: 'Create a mockup page',
				showInfoIcon: false,
			},
		],
	},

	// Linkedin
	[workspaceFormConnectPagesEnum.linkedin]: {
		logo: logoLinkedin,
		color: brandColors.linkedin,
		cards: [
			{
				cardIcon: businessOutline,
				title: 'Add LinkedIn company pages',
				showInfoIcon: false,
			},
			{
				cardIcon: personOutline,
				title: 'Add Linkedin profiles',
				showInfoIcon: false,
			},
			{
				cardIcon: medicalOutline,
				title: 'Create a mockup page',
				showInfoIcon: false,
			},
		],
	},

	// Pinterest
	[workspaceFormConnectPagesEnum.pinterest]: {
		logo: logoPinterest,
		color: brandColors.pinterest,
		cards: [
			{
				cardIcon: businessOutline,
				title: 'Add Pinterest business pages',
				showInfoIcon: false,
			},
			{
				cardIcon: medicalOutline,
				title: 'Create a mockup page',
				showInfoIcon: false,
			},
		],
	},

	// Youtube
	[workspaceFormConnectPagesEnum.youtube]: {
		logo: logoYoutube,
		color: brandColors.youtube,
		cards: [
			{
				cardIcon: logoYoutube,
				title: 'Add YouTube channels',
				showInfoIcon: false,
			},
			{
				cardIcon: medicalOutline,
				title: 'Create a mockup page',
				showInfoIcon: false,
			},
		],
	},

	// Universal Content
	[workspaceFormConnectPagesEnum.universalContent]: {
		logo: gridOutline,
		color: brandColors.tiktok,
		cards: [],
	},
};
