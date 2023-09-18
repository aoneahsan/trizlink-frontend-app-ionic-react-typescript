// Packages Imports
import { atom, selector } from 'recoil';

// Custom
// Type
import { TimeFilterEnum } from '@/types/AdminPanel/linksType';
import { WSTeamMembersInterface } from '@/types/AdminPanel/workspace/index';
import { IMembersFilterOptions } from '@/types/AdminPanel/index.type';

// Data

import CONSTANTS from '@/utils/constants';

export const MembersAccountsRStateAtom = atom<WSTeamMembersInterface[]>({
  key: 'MembersAccountsRStateAtom_key',
  default: []
});

// Recoil state that will store all the filter options for Members for example time, etc.
export const MembersFilterOptionsRStateAtom = atom<IMembersFilterOptions>({
  key: 'MembersFilterOptionsRStateAtom_key',
  default: {
    timeFilter: {
      daysToSubtract: TimeFilterEnum.allTime,
      startedAt: new Date().toISOString(),
      endAt: new Date().toISOString()
    }
  }
});

// Recoil selector that will filtered Members (we are using this selector to list Members in frontend in Members table in Members list page).
export const FilteredMembersDataRStateSelector = selector({
  key: 'FilteredMembersDataRStateSelector_key',
  get: ({ get }) => {
    // Variables
    const membersRStateAtom = get(MembersAccountsRStateAtom);
    const _filterOptions = get(MembersFilterOptionsRStateAtom);
    let _filterMembersData: WSTeamMembersInterface[] | undefined =
      membersRStateAtom;

    if (membersRStateAtom?.length) {
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

        _filterMembersData = membersRStateAtom?.filter(el => {
          const _createdAt = new Date(
            new Date(el.createdAt as string)
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

      if (_filterOptions?.role) {
        _filterMembersData = _filterMembersData?.filter(
          el => el?.memberRole?.name! === _filterOptions?.role
        );
      }

      if (_filterOptions?.status) {
        _filterMembersData = _filterMembersData?.filter(
          el => el?.accountStatus === _filterOptions?.status
        );
      }
    }

    return _filterMembersData;
  }
});
