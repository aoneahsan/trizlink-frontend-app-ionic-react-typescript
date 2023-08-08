import { LinkInBioType } from '@/types/AdminPanel/linkInBioType';
import { atom, selector, atomFamily } from 'recoil';

// Data
// import { ZaionsShortLinkData } from '@/data/UserDashboard/LinkInBiosData';

import {
	ShortLinkFilterOptionsInterface,
	TimeFilterEnum,
} from '@/types/AdminPanel/linksType';

export const LinkInBiosRStateAtom = atom<LinkInBioType[] | undefined>({
	key: 'LinkInBiosRStateAtom_key',
	default: [],
});

export const LinkInBiosFilterOptionsRStateAtom =
	atom<ShortLinkFilterOptionsInterface>({
		key: 'LinkInBiosFilterOptionsRStateAtom_key',
		default: {
			timeFilter: { daysToSubtract: TimeFilterEnum.allTime },
			tags: [],
			folderId: 'all',
		},
	});

const toLocaleStringOptions: Intl.DateTimeFormatOptions = {
	weekday: 'short',
	month: 'short',
	day: 'numeric',
	year: 'numeric',
};

export const FilteredLinkInBioLinksDataSelector = selector<
	LinkInBioType[] | undefined
>({
	key: 'FilteredLinkInBioLinksDataSelector_key',
	get: ({ get }) => {
		// Variables
		const linkInBiosStateAtom = get(LinkInBiosRStateAtom);
		const _filterOptions = get(LinkInBiosFilterOptionsRStateAtom);
		let _filterLinksData: LinkInBioType[] | undefined = linkInBiosStateAtom;
		// check's
		if (linkInBiosStateAtom?.length) {
			if (_filterOptions.folderId && _filterOptions.folderId !== 'all') {
				_filterLinksData = linkInBiosStateAtom.filter(
					(el) => el.folderId === _filterOptions.folderId
				);
			}

			if (
				_filterOptions.timeFilter.daysToSubtract &&
				_filterOptions.timeFilter.daysToSubtract !== TimeFilterEnum.allTime
			) {
				const endDate = new Date(
					new Date().toLocaleString('en-US', toLocaleStringOptions)
				);

				let startDate = new Date(
					endDate.getTime() -
						+_filterOptions.timeFilter.daysToSubtract * 24 * 60 * 60 * 1000
				);

				if (
					_filterOptions.timeFilter.daysToSubtract === TimeFilterEnum.thisMonth
				) {
					startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
				}

				const _formattedStartDate = startDate.toLocaleString(
					'en-US',
					toLocaleStringOptions
				);

				_filterLinksData = linkInBiosStateAtom?.filter((el) => {
					const _createdAt = new Date(
						new Date(el.createdAt as string)
					).toLocaleString('en-US', toLocaleStringOptions);

					if (
						new Date(_createdAt) >= new Date(_formattedStartDate) &&
						new Date(_createdAt) <= endDate
					) {
						return el;
					} else {
						return undefined;
					}
				});
			}

			if (_filterOptions.tags?.length) {
				_filterLinksData = linkInBiosStateAtom.filter((el) => {
					return (_filterOptions.tags as string[]).every((tag) =>
						(el.tags as string[]).includes(tag)
					);
				});
			}

			// if (_filterOptions.domains?.length) {
			//   _filterLinksData = _allLinksData.filter((el) => {
			//     return _filterOptions.domains?.includes(
			//       getPrimaryDomain(
			//         (JSON.parse(el.target as string) as LinkTargetType)
			//           .url as string
			//       )
			//     );
			//   });
			// }
			if (_filterOptions.searchQuery) {
				_filterLinksData = linkInBiosStateAtom.filter((el) => {
					return el.title
						?.toLocaleLowerCase()
						?.includes(
							(_filterOptions.searchQuery as string)?.toLocaleLowerCase()
						);
				});
			}
		}

		return _filterLinksData;
	},
});

// selecting (storing) all tags and domain link from all short links data
export const LinkInBiosFieldsDataRStateSelector = selector({
	key: 'LinkInBiosFieldsDataRStateSelector_key',
	get: ({ get }) => {
		const linkInBiosStateAtom = get(LinkInBiosRStateAtom);

		const _tagsArray = new Set<string>();

		// const _domains = new Set<string>();

		linkInBiosStateAtom?.forEach((el) => {
			if ((el.tags as string[])?.length) {
				(JSON.parse(el.tags as unknown as string) as string[]).forEach((tag) =>
					_tagsArray.add(tag)
				);
			}

			// const _url = (JSON.parse(el.target as string) as LinkTargetType).url;
			// if (_url) {
			//   _domains.add(getPrimaryDomain(_url));
			// }
		});

		return {
			tags: Array.from(_tagsArray),
			// domains: Array.from(_domains),
		};
	},
});

// export const LinkInBioRStateAtomFamily = atomFamily<LinkInBioType, string>({
// 	key: 'LinkInBioRStateAtomFamily_key',
// 	default: {
// 		theme: {
// 			button: {},
// 		},
// 		settings: {},
// 	},
// });
