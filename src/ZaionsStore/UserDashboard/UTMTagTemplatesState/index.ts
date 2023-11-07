// Packages Imports
import { selector, atom } from 'recoil';

// Custom
// Type
import {
  TimeFilterEnum,
  type UTMTagTemplateType
} from '@/types/AdminPanel/linksType';
// Data
import { UTMTagTemplatesData } from '@/data/UserDashboard/UTMTagTemplatesData';
import { type IFilterOptions } from '@/types/AdminPanel/index.type';
import CONSTANTS from '@/utils/constants';

export const UTMTagsRStateAtom = atom<UTMTagTemplateType[]>({
  key: 'UTMTagsRStateAtom_key',
  default: UTMTagTemplatesData
});

// Recoil state that will store all the filter options for utm tags for example time, etc.
export const UTMTagsFilterOptionsRStateAtom = atom<IFilterOptions>({
  key: 'UTMTagsFilterOptionsRStateAtom_key',
  default: {
    timeFilter: {
      daysToSubtract: TimeFilterEnum.allTime,
      startedAt: new Date().toISOString(),
      endAt: new Date().toISOString()
    }
  }
});

// Recoil selector that will filtered utm tags (we are using this selector to list utm tags in frontend in utm tags table in utm tags list page).
export const FilteredUtmTagsDataRStateSelector = selector({
  key: 'FilteredUtmTagsDataRStateSelector_key',
  get: ({ get }) => {
    // Variables
    const utmTagsRStateAtom = get(UTMTagsRStateAtom);
    const _filterOptions = get(UTMTagsFilterOptionsRStateAtom);
    let _filterUtmTagsData: UTMTagTemplateType[] | undefined =
      utmTagsRStateAtom;

    if (utmTagsRStateAtom?.length > 0) {
      if (
        _filterOptions?.timeFilter?.daysToSubtract !== undefined &&
        _filterOptions?.timeFilter?.daysToSubtract !== TimeFilterEnum.allTime
      ) {
        let endDate = new Date(
          new Date().toLocaleString('en-US', CONSTANTS.toLocaleStringOptions)
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
              CONSTANTS.toLocaleStringOptions
            )
          );
        }

        const _formattedStartDate = startDate.toLocaleString(
          'en-US',
          CONSTANTS.toLocaleStringOptions
        );

        _filterUtmTagsData = utmTagsRStateAtom?.filter(el => {
          const _createdAt = new Date(
            new Date(el.createAt as string)
          ).toLocaleString('en-US', CONSTANTS.toLocaleStringOptions);
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
    }

    return _filterUtmTagsData;
  }
});
