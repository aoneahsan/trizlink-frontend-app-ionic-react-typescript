// Packages Imports
import { atom, selector } from 'recoil';

// Custom
// Type
import { PixelAccountType, TimeFilterEnum } from '@/types/AdminPanel/linksType';
import { PixelAccountPlatformType } from '@/types/AdminPanel/linksType/index';
// Data
import {
  PixelAccountPlatformOptionsData
  // PixelAccountsData,
} from '@/data/UserDashboard/PixelAccountsData';
import { IPixelsFilterOptions } from '@/types/AdminPanel/index.type';
import CONSTANTS from '@/utils/constants';

export const PixelAccountsRStateAtom = atom<PixelAccountType[]>({
  key: 'PixelAccountsRState_key',
  default: []
});

// Recoil state that will store all the filter options for pixels for example time, etc.
export const PixelsFilterOptionsRStateAtom = atom<IPixelsFilterOptions>({
  key: 'PixelsFilterOptionsRStateAtom_key',
  default: {
    timeFilter: {
      daysToSubtract: TimeFilterEnum.allTime,
      startedAt: new Date().toISOString(),
      endAt: new Date().toISOString()
    }
  }
});

// Recoil selector that will filtered pixels (we are using this selector to list pixels in frontend in pixels table in pixels list page).
export const FilteredPixelsDataRStateSelector = selector({
  key: 'FilteredPixelsDataRStateSelector_key',
  get: ({ get }) => {
    // Variables
    const pixelsRStateAtom = get(PixelAccountsRStateAtom);
    const _filterOptions = get(PixelsFilterOptionsRStateAtom);
    let _filterPixelsData: PixelAccountType[] | undefined = pixelsRStateAtom;

    if (pixelsRStateAtom?.length) {
      if (
        _filterOptions?.timeFilter?.daysToSubtract &&
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

        _filterPixelsData = pixelsRStateAtom?.filter(el => {
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

      if (_filterOptions?.platform) {
        _filterPixelsData = _filterPixelsData?.filter(
          el => el?.platform === _filterOptions?.platform
        );
      }
    }

    return _filterPixelsData;
  }
});

export const PixelAccountPlatformOptionsRState = atom<
  PixelAccountPlatformType[]
>({
  key: 'PixelAccountPlatformOptionsRState_key',
  default: PixelAccountPlatformOptionsData
});
