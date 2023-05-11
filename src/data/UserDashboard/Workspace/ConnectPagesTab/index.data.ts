import {
	bagOutline,
	businessOutline,
	checkmarkOutline,
	closeOutline,
	cutOutline,
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
	megaphoneOutline,
	peopleOutline,
	personOutline,
	phonePortraitOutline,
	playCircleOutline,
} from 'ionicons/icons';

import { brandColors } from '@/utils/constants/index';
import {
	PageInfoCardItemTypeEnum,
	workspaceFormConnectPagesCardEnum,
	workspaceFormConnectPagesEnum,
	WorkspacePageCardInfoPopoverItemType,
} from '@/types/AdminPanel/workspace';

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
			infoItems?: WorkspacePageCardInfoPopoverItemType[];
			type: workspaceFormConnectPagesCardEnum;
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
				type: workspaceFormConnectPagesCardEnum.page,
			},
			{
				cardIcon: peopleOutline,
				title: 'Add Facebook groups',
				showInfoIcon: false,
				type: workspaceFormConnectPagesCardEnum.group,
			},
			{
				cardIcon: medicalOutline,
				title: 'Create a mockup page',
				showInfoIcon: true,
				infoItems: [
					{
						type: PageInfoCardItemTypeEnum.infoMessage,
						htmlContent:
							"<p>You can create a mockup Facebook page in Planable, without connecting to a live page. You can use it to draft, preview, plan and collaborate on your content, but you won't be able to publish.</p>",
					},
				],
				type: workspaceFormConnectPagesCardEnum.mockup,
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
				type: workspaceFormConnectPagesCardEnum.page,
			},
			{
				cardIcon: medicalOutline,
				title: 'Create a mockup page',
				showInfoIcon: true,
				type: workspaceFormConnectPagesCardEnum.mockup,
				infoItems: [
					{
						type: PageInfoCardItemTypeEnum.infoMessage,
						htmlContent:
							"You can create a mockup Twitter page in Planable, without connecting to a live page. You can use it to draft, preview, plan and collaborate on your content, but you won't be able to publish.",
					},
				],
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
				type: workspaceFormConnectPagesCardEnum.businessPages,
			},
			{
				cardIcon: personOutline,
				title: 'Add Instagram profiles or pages',
				type: workspaceFormConnectPagesCardEnum.page,
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
								icon: businessOutline,
								heading: 'Business Account',
								subheading: 'Direct publishing is available',
							},
							{
								icon: megaphoneOutline,
								heading: 'Creator Profile',
								subheading: 'Publish with push notifications',
							},
							{
								icon: personOutline,
								heading: 'Personal Profile',
								subheading: 'Publish with push notifications',
							},
						],
					},
					{
						type: PageInfoCardItemTypeEnum.infoMessage,
						htmlContent:
							'<p>See our <a href="constant create">help article</a> for more details.</p>',
					},
				],
			},
			{
				cardIcon: medicalOutline,
				title: 'Create a mockup page',
				type: workspaceFormConnectPagesCardEnum.mockup,
				showInfoIcon: true,
				infoItems: [
					{
						type: PageInfoCardItemTypeEnum.infoMessage,
						htmlContent:
							"You can create a mockup Instagram page in Planable, without connecting to a live page. You can use it to draft, preview, plan and collaborate on your content, but you won't be able to publish.",
					},
				],
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
				type: workspaceFormConnectPagesCardEnum.account,
				infoItems: [
					{
						type: PageInfoCardItemTypeEnum.simpleCard,
						items: [
							{
								icon: bagOutline,
								heading: 'Publish with Business Account',
								listItems: [
									{
										icon: checkmarkOutline,
										text: 'Publish directly to TikTok feed',
									},
									{
										icon: closeOutline,
										text: 'Add music to video before publishing',
									},
									{
										icon: cutOutline,
										text: 'Up to 1 minute videos',
									},
								],
							},
						],
					},
					{
						type: PageInfoCardItemTypeEnum.infoMessage,
						htmlContent:
							'<p>See our <a href="constant create">help article</a> for more details.</p>',
					},
				],
			},
			{
				cardIcon: playCircleOutline,
				title: 'Add TikTok business profile',
				showInfoIcon: true,
				type: workspaceFormConnectPagesCardEnum.businessPages,
				infoItems: [
					{
						type: PageInfoCardItemTypeEnum.simpleCard,
						items: [
							{
								icon: personOutline,
								heading: 'Publish from TikTok’s Inbox',
								listItems: [
									{
										icon: logoTiktok,
										text: 'Publish manually from TikTok’s inbox',
									},
									{
										icon: checkmarkOutline,
										text: 'Add music to video before publishing',
									},
									{
										icon: cutOutline,
										text: 'Up to 1 minute videos',
									},
								],
							},

							{
								icon: phonePortraitOutline,
								heading: 'Publish with Planable’s Mobile App',
								listItems: [
									{
										icon: phonePortraitOutline,
										text: 'Publish manually with our mobile app',
									},
									{
										icon: checkmarkOutline,
										text: 'Add music to video before publishing',
									},
									{
										icon: checkmarkOutline,
										text: 'Up to 10 minute videos',
									},
								],
							},
						],
					},
					{
						type: PageInfoCardItemTypeEnum.infoMessage,
						htmlContent:
							'<p>See our <a href="constant create">help article</a> for more details.</p>',
					},
				],
			},
			{
				cardIcon: medicalOutline,
				title: 'Create a mockup page',
				showInfoIcon: true,
				type: workspaceFormConnectPagesCardEnum.mockup,
				infoItems: [
					{
						type: PageInfoCardItemTypeEnum.infoMessage,
						htmlContent:
							"You can create a mockup TikTok page in Planable, without connecting to a live page. You can use it to draft, preview, plan and collaborate on your content, but you won't be able to publish.",
					},
				],
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
				type: workspaceFormConnectPagesCardEnum.businessPages,
			},
			{
				cardIcon: medicalOutline,
				title: 'Create a mockup page',
				showInfoIcon: true,
				type: workspaceFormConnectPagesCardEnum.mockup,
				infoItems: [
					{
						type: PageInfoCardItemTypeEnum.infoMessage,
						htmlContent:
							"You can create a mockup Google Business Profile page in Planable, without connecting to a live page. You can use it to draft, preview, plan and collaborate on your content, but you won't be able to publish.",
					},
				],
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
				type: workspaceFormConnectPagesCardEnum.companyPage,
			},
			{
				cardIcon: personOutline,
				title: 'Add Linkedin profiles',
				showInfoIcon: false,
				type: workspaceFormConnectPagesCardEnum.page,
			},
			{
				cardIcon: medicalOutline,
				title: 'Create a mockup page',
				type: workspaceFormConnectPagesCardEnum.mockup,
				showInfoIcon: true,
				infoItems: [
					{
						type: PageInfoCardItemTypeEnum.infoMessage,
						htmlContent:
							"You can create a mockup LinkedIn page in Planable, without connecting to a live page. You can use it to draft, preview, plan and collaborate on your content, but you won't be able to publish.",
					},
				],
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
				type: workspaceFormConnectPagesCardEnum.businessPages,
			},
			{
				cardIcon: medicalOutline,
				title: 'Create a mockup page',
				showInfoIcon: true,
				type: workspaceFormConnectPagesCardEnum.mockup,
				infoItems: [
					{
						type: PageInfoCardItemTypeEnum.infoMessage,
						htmlContent:
							"You can create a mockup Pinterest page in Planable, without connecting to a live page. You can use it to draft, preview, plan and collaborate on your content, but you won't be able to publish.",
					},
				],
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
				type: workspaceFormConnectPagesCardEnum.channel,
			},
			{
				cardIcon: medicalOutline,
				title: 'Create a mockup page',
				showInfoIcon: true,
				type: workspaceFormConnectPagesCardEnum.mockup,
				infoItems: [
					{
						type: PageInfoCardItemTypeEnum.infoMessage,
						htmlContent:
							"You can create a mockup YouTube page in Planable, without connecting to a live page. You can use it to draft, preview, plan and collaborate on your content, but you won't be able to publish.",
					},
				],
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
