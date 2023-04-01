import { atom, selector } from 'recoil';

// Data
// import { ZaionsShortLinkData } from '@/data/UserDashboard/ShortLinksData';

import {
  ShortLinkType,
  ShortLinkFilterOptionsInterface,
  TimeFilterEnum,
  LinkTargetType,
} from '@/types/AdminPanel/linksType';
import { getPrimaryDomain } from '@/utils/helpers';

export const ShortLinksRState = atom<ShortLinkType[] | undefined>({
  key: 'ShortLinksRState_key',
  default: [],
});

export const ShortLinksFilterOptionsRState =
  atom<ShortLinkFilterOptionsInterface>({
    key: 'ShortLinksFilterOptions_key',
    default: {
      timeFilter: {
        daysToSubtract: TimeFilterEnum.allTime,
        startedAt: new Date().toISOString(),
        endAt: new Date().toISOString(),
      },
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

export const FilteredShortLinkData = selector<ShortLinkType[] | undefined>({
  key: 'FilteredShortLinkData_key',
  get: ({ get }) => {
    // Variables
    const _allLinksData = get(ShortLinksRState);
    const _filterOptions = get(ShortLinksFilterOptionsRState);
    let _filterLinksData: ShortLinkType[] | undefined = _allLinksData;

    // check's
    if (_allLinksData?.length) {
      if (_filterOptions.folderId && _filterOptions.folderId !== 'all') {
        _filterLinksData = _allLinksData.filter(
          (el) => el.folderId === _filterOptions.folderId
        );
      }

      if (
        _filterOptions.timeFilter.daysToSubtract &&
        _filterOptions.timeFilter.daysToSubtract !== TimeFilterEnum.allTime
      ) {
        let endDate = new Date(
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

        if (
          _filterOptions.timeFilter.daysToSubtract ===
          TimeFilterEnum.customRange
        ) {
          startDate = new Date(_filterOptions.timeFilter.startedAt as string);
          endDate = new Date(
            new Date(_filterOptions.timeFilter.endAt as string).toLocaleString(
              'en-US',
              toLocaleStringOptions
            )
          );
        }

        const _formattedStartDate = startDate.toLocaleString(
          'en-US',
          toLocaleStringOptions
        );

        console.log({ startDate, endDate, _formattedStartDate });

        _filterLinksData = _allLinksData?.filter((el) => {
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
        _filterLinksData = _allLinksData.filter((el) => {
          return (_filterOptions.tags as string[]).every((tag) =>
            (el.tags as string[]).includes(tag)
          );
        });
      }

      if (_filterOptions.domains?.length) {
        // eslint-disable-next-line
        _filterLinksData = _allLinksData.filter((el) => {
          const _url = (JSON.parse(el.target as string) as LinkTargetType).url;
          if (_url) {
            return _filterOptions.domains?.includes(getPrimaryDomain(_url));
          }
        });
      }
      if (_filterOptions.searchQuery) {
        _filterLinksData = _allLinksData.filter((el) => {
          return (
            el.title
              ?.toLocaleLowerCase()
              ?.includes(
                (_filterOptions.searchQuery as string)?.toLocaleLowerCase()
              ) ||
            ((JSON.parse(el.target as string) as LinkTargetType).url as string)
              ?.toLocaleLowerCase()
              ?.includes(
                (_filterOptions.searchQuery as string)?.toLocaleLowerCase()
              )
          );
        });
      }
    }

    return _filterLinksData;
  },
});

// selecting (storing) all tags and domain link from all short links data
export const ShortLinksFieldsDataSelector = selector({
  key: 'ShortLinksFieldsDataSelector_key',
  get: ({ get }) => {
    const _allLinksData = get(ShortLinksRState);

    const _tagsArray = new Set<string>();

    const _domains = new Set<string>();

    _allLinksData?.forEach((el) => {
      if ((el.tags as string[])?.length) {
        (JSON.parse(el.tags as string) as string[]).forEach((tag) =>
          _tagsArray.add(tag)
        );
      }

      const _url = (JSON.parse(el.target as string) as LinkTargetType).url;
      if (_url) {
        _domains.add(getPrimaryDomain(_url));
      }
    });

    return {
      tags: Array.from(_tagsArray),
      domains: Array.from(_domains),
    };
  },
});
