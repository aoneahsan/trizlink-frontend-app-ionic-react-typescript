import { atom } from 'recoil';
import { ShortLinkType } from 'types/AdminPanel/linksType';
import {
	FormMode,
	messengerPlatformsBlockEnum,
} from 'types/AdminPanel/index.type';

export const ShortLinksRStateAtom = atom<{
	ShortLinks: ShortLinkType[];
	mode: FormMode;
	ShortLinkFormState: ShortLinkType;
}>({
	key: 'ShortLinksRStateAtom_key',
	default: {
		ShortLinks: [
			{
				utmTagInfo: {
					templateId: '1',
					utmCampaign: 'Zaions Campaign',
					utmContent: 'Zaions Content',
					utmMedium: 'Zaions Medium',
					utmSource: 'Zaions Source',
					utmTerm: 'ZaionsTerm',
				},
				folderId: '2',
				id: '',

				// form data - for creation/updation
				type: messengerPlatformsBlockEnum.line,
				target: {
					accountId: '',
					email: '',
					message: '',
					phoneNumber: '',
					subject: '',
					url: 'https://zaions.com',
					username: '',
				},
				featureImg: '',
				title: 'Zaions (The Group Of Projects)',
				description: 'Zaions by Ahsan Mahmood.',
				pixelIds: ['1', '2'],
				shortUrl: {
					domain: '',
					url: '',
				},
				notes:
					'We Provide Best Web Services, including website development, mobile app development, website layout designing and over all 360 solutions.',
				tags: ['123', 'cwd', 'zaions', 'ahsan mahmmod', 'mti', 'aoneahsan'],
				abTestingRotatorLinks: [
					{ redirectionLink: 'https://aoneahsan.com', percentage: 100 },
				],
				geoLocationRotatorLinks: [],
				linkExpirationInfo: undefined,
				password: 'zaions',
				favicon: '',
				totalClicks: 10000,
			},
		],
		mode: FormMode.ADD,
		ShortLinkFormState: {},
	},
});
