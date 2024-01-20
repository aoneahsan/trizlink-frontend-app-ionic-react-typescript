import { atom, atomFamily, selectorFamily } from 'recoil';
import { type workspaceInterface } from '@/types/AdminPanel/workspace';
import {
  planFeaturesEnum,
  subscriptionTimeLine
} from '@/types/AdminPanel/index.type';
import { type ZSubscriptionI } from '@/types/WhyZaions/PricingPage';
import {
  type ZUserCurrentLimitsI,
  type userServicesLimitI
} from '@/types/UserAccount/index.type';
import dayjs from 'dayjs';
import { reportCustomError } from '@/utils/customErrorType';

// Recoil state for storing workspace data.
export const WorkspaceRStateAtomFamily = atomFamily<
  workspaceInterface[],
  string
>({
  key: 'WorkspaceRStateAtomFamily_key',
  default: []
});

// Recoil state for storing workspace data.
export const WorkspacesRStateAtom = atom<string[]>({
  key: 'WorkspacesRStateAtom_key',
  default: []
});

export const ZWsServicesLimitsRStateAtom = atom<userServicesLimitI[]>({
  key: 'ZWsServicesLimitsRStateAtom_key',
  default: []
});

export const ZWsSubscriptionRStateAtom = atom<ZSubscriptionI>({
  key: 'ZWsSubscriptionRStateAtom_key',
  default: {}
});

export const ZWsLimitsRStateAtom = atom<ZUserCurrentLimitsI>({
  key: 'ZWsLimitsRStateAtom_key',
  default: {
    [planFeaturesEnum.shortLinks]: 0,
    [planFeaturesEnum.shortLinksFolder]: 0
  }
});

export const ZWsRemainingLimitsRStateSelectorFamily = selectorFamily({
  key: 'ZWsRemainingLimitsRStateSelectorFamily_key',
  get:
    (name: planFeaturesEnum) =>
    async ({ get }) => {
      try {
        const ZWsCurrentLimits = get(ZWsLimitsRStateAtom);
        const ZWsServiceLimits = get(ZWsServicesLimitsRStateAtom);
        const ZWsSubscription = get(ZWsSubscriptionRStateAtom);

        //
        if (ZWsServiceLimits !== undefined && ZWsServiceLimits !== null) {
          const _selectService = ZWsServiceLimits?.find(
            el => el?.name === name
          );

          if (_selectService !== undefined && _selectService !== null) {
            let endDate = null;

            if (ZWsSubscription.duration === subscriptionTimeLine.monthly) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              endDate = dayjs(ZWsSubscription?.startedAt).add(30, 'day');
            } else if (
              ZWsSubscription.duration === subscriptionTimeLine.yearly
            ) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              endDate = dayjs(ZWsSubscription?.startedAt).add(1, 'year');
            }

            if (
              (_selectService?.maxLimit ?? 0) > 0 &&
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              dayjs().isAfter(dayjs(ZWsSubscription?.startedAt)) &&
              dayjs().isBefore(dayjs(endDate)) &&
              (ZWsCurrentLimits[name] ?? 0) < (_selectService?.maxLimit ?? 0)
            ) {
              return true;
            }
            return false;
          }
        }
      } catch (error) {
        reportCustomError(error);
      }
    }
});
