// Packages Imports
import { atom, selector } from 'recoil';

// Custom
// Type
import {
  type EmbedWidgetsType,
  TimeFilterEnum
} from '@/types/AdminPanel/linksType';
// Data
import { EmbedWidgetsData } from '@/data/UserDashboard/EmbedWidgets/index.data';
import { type IFilterOptions } from '@/types/AdminPanel/index.type';
import CONSTANTS from '@/utils/constants';

export const EmbedWidgetsRStateAtom = atom<EmbedWidgetsType[]>({
  key: 'EmbedWidgetsRStateAtom_key',
  default: EmbedWidgetsData
});

// Recoil state that will store all the filter options for embed widgets for example time, etc.
export const EmbedWidgetsFilterOptionsRStateAtom = atom<IFilterOptions>({
  key: 'EmbedWidgetsFilterOptionsRStateAtom_key',
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
    const embedWidgetRStateAtom = get(EmbedWidgetsRStateAtom);
    const _filterOptions = get(EmbedWidgetsFilterOptionsRStateAtom);
    let _filterEmbedWidgetsData: EmbedWidgetsType[] | undefined =
      embedWidgetRStateAtom;

    if (embedWidgetRStateAtom?.length !== 0) {
      if (
        _filterOptions.timeFilter.daysToSubtract !== undefined &&
        _filterOptions.timeFilter.daysToSubtract !== TimeFilterEnum.allTime
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

        _filterEmbedWidgetsData = embedWidgetRStateAtom?.filter(el => {
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

    return _filterEmbedWidgetsData;
  }
});
