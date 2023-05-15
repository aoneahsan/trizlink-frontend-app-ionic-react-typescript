import { contentStyleInterface } from '@/types/AdminPanel/workspace';
import {
	bulbOutline,
	businessOutline,
	calendarClearOutline,
	chatboxOutline,
	documentAttachOutline,
	eyeOutline,
	globeOutline,
	happyOutline,
	headsetOutline,
	logoMedium,
	logoReddit,
	logoSkype,
	logoSlack,
	logoTumblr,
	logoWhatsapp,
	logoWordpress,
	mailOpenOutline,
	megaphoneOutline,
	musicalNoteOutline,
	newspaperOutline,
	pencilOutline,
	pricetagOutline,
	settingsOutline,
} from 'ionicons/icons';

export const PlatformColorsData: { colorName?: string; colorCode?: string }[] =
	[
		{
			colorName: 'Blue Zodiac',
			colorCode: '#3c3f4f',
		},
		{
			colorName: 'Dark Pastel Green',
			colorCode: '#1eb348',
		},
		{
			colorName: 'Malibu',
			colorCode: '#55c2e0',
		},
		{
			colorName: 'Maya Blue',
			colorCode: '#6bb4f8',
		},
		{
			colorName: 'Neon Blue',
			colorCode: '#6160fc',
		},
		{
			colorName: 'Bittersweet',
			colorCode: '#ff5f5f',
		},
		{
			colorName: 'Coral',
			colorCode: '#ff8452',
		},
		{
			colorName: 'Saffron',
			colorCode: '#f0c52c',
		},
	];

export const PlatformIconsData: {
	defaultIcons: { id: string; icon: string; iconName?: string }[];
	platformIcons: { id: string; icon: string; iconName?: string }[];
} = {
	defaultIcons: [
		{ id: '1', icon: newspaperOutline, iconName: 'News paper' },
		{ id: '2', icon: musicalNoteOutline, iconName: 'Musical note' },
		{ id: '3', icon: pencilOutline, iconName: 'Pencil' },
		{ id: '4', icon: mailOpenOutline, iconName: 'Mail' },
		{ id: '5', icon: bulbOutline, iconName: 'Bulb' },
		{ id: '6', icon: chatboxOutline, iconName: 'Chatbox' },
		{ id: '7', icon: happyOutline, iconName: 'Happy' },
		{ id: '8', icon: eyeOutline, iconName: 'Eye' },
		{ id: '9', icon: headsetOutline, iconName: 'Headset' },
		{ id: '10', icon: megaphoneOutline, iconName: 'Megaphone' },
		{ id: '11', icon: calendarClearOutline, iconName: 'Calender' },
		{ id: '12', icon: globeOutline, iconName: 'Globe' },
		{ id: '13', icon: settingsOutline, iconName: 'Settings' },
		{ id: '14', icon: businessOutline, iconName: 'Business' },
		{ id: '15', icon: pricetagOutline, iconName: 'Price tag' },
		{ id: '16', icon: documentAttachOutline, iconName: 'Document attach' },
	],
	platformIcons: [
		{ id: '1', icon: logoSlack, iconName: 'Slack' },
		{ id: '2', icon: logoMedium, iconName: 'Medium' },
		{ id: '3', icon: logoWordpress, iconName: 'Wordpress' },
		{ id: '4', icon: logoTumblr, iconName: 'Tumblr' },
		{ id: '5', icon: logoSkype, iconName: 'Skype' },
		{ id: '6', icon: logoReddit, iconName: 'Reddit' },
		{ id: '7', icon: logoWhatsapp, iconName: 'Whatsapp' },
	],
};

export const ContentStyleData: {
	titleFontFamily?: string;
	textFontFamily?: string;
	titleFontWeight?: string;
	textFontWeight?: string;
	contentStyleType?: contentStyleInterface;
}[] = [
	{
		titleFontFamily: 'apple-system',
		textFontFamily: 'apple-system',
		titleFontWeight: '500',
		textFontWeight: '400',
		contentStyleType: contentStyleInterface.default,
	},

	{
		titleFontFamily: 'source-serif-pro',
		textFontFamily: 'source-serif-4',
		titleFontWeight: '600',
		textFontWeight: '400',
		contentStyleType: contentStyleInterface.classic,
	},

	{
		titleFontFamily: 'poppins',
		textFontFamily: 'roboto-slab',
		titleFontWeight: '600',
		textFontWeight: '400',
		contentStyleType: contentStyleInterface.modern,
	},

	{
		titleFontFamily: 'roboto-condensed',
		textFontFamily: 'roboto-condensed',
		titleFontWeight: '700',
		textFontWeight: '400',
		contentStyleType: contentStyleInterface.compact,
	},
];
