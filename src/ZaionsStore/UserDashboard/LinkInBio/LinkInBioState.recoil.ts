import { type LinkInBioType } from '@/types/AdminPanel/linkInBioType';
import { atom, selector } from 'recoil';

// Data
// import { ZaionsShortLinkData } from '@/data/UserDashboard/LinkInBiosData';

import {
  type ShortLinkFilterOptionsInterface,
  TimeFilterEnum
} from '@/types/AdminPanel/linksType';

export const LinkInBiosRStateAtom = atom<LinkInBioType[] | undefined>({
  key: 'LinkInBiosRStateAtom_key',
  default: []
});

export const LinkInBiosFilterOptionsRStateAtom =
  atom<ShortLinkFilterOptionsInterface>({
    key: 'LinkInBiosFilterOptionsRStateAtom_key',
    default: {
      timeFilter: { daysToSubtract: TimeFilterEnum.allTime },
      tags: [],
      folderId: 'all'
    }
  });

const toLocaleStringOptions: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric'
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
    if (
      linkInBiosStateAtom?.length !== undefined &&
      linkInBiosStateAtom?.length > 0
    ) {
      if (
        _filterOptions.folderId !== undefined &&
        _filterOptions.folderId !== 'all'
      ) {
        _filterLinksData = linkInBiosStateAtom.filter(
          el => el.folderId === _filterOptions.folderId
        );
      }

      if (
        _filterOptions.timeFilter.daysToSubtract !== undefined &&
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

        _filterLinksData = linkInBiosStateAtom?.filter(el => {
          const _createdAt = new Date(
            new Date(el.createdAt ?? '')
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

      if (_filterOptions.tags?.length !== undefined) {
        _filterLinksData = linkInBiosStateAtom.filter(el => {
          return (_filterOptions.tags ?? []).every(tag =>
            (el.tags ?? []).includes(tag)
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
      if (
        _filterOptions.searchQuery !== undefined &&
        _filterOptions?.searchQuery !== null &&
        _filterOptions?.searchQuery?.trim()?.length > 0
      ) {
        _filterLinksData = linkInBiosStateAtom.filter(el => {
          return el.title
            ?.toLocaleLowerCase()
            ?.includes((_filterOptions.searchQuery ?? '')?.toLocaleLowerCase());
        });
      }
    }

    return _filterLinksData;
  }
});

// selecting (storing) all tags and domain link from all short links data
export const LinkInBiosFieldsDataRStateSelector = selector({
  key: 'LinkInBiosFieldsDataRStateSelector_key',
  get: ({ get }) => {
    const linkInBiosStateAtom = get(LinkInBiosRStateAtom);

    const _tagsArray = new Set<string>();

    // const _domains = new Set<string>();

    linkInBiosStateAtom?.forEach(el => {
      if (typeof el?.tags === 'string') {
        if (((JSON.parse(el.tags as string) as string[]) ?? [])?.length > 0) {
          ((JSON.parse(el.tags as string) as string[]) ?? [])?.forEach(tag =>
            _tagsArray.add(tag)
          );
        }
      } else if (typeof el?.tags !== 'undefined' && Array.isArray(el?.tags)) {
        if ((el.tags ?? [])?.length > 0) {
          (el.tags ?? [])?.forEach(tag => _tagsArray.add(tag));
        }
      }

      // const _url = (JSON.parse(el.target as string) as LinkTargetType).url;
      // if (_url) {
      //   _domains.add(getPrimaryDomain(_url));
      // }
    });

    return {
      tags: Array.from(_tagsArray)
      // domains: Array.from(_domains),
    };
  }
});

// export const LinkInBioRStateAtomFamily = atomFamily<LinkInBioType, string>({
// key: 'LinkInBioRStateAtomFamily_key',
// default: {
// theme: {
// button: {},
// },
// settings: {},
// },
// });
