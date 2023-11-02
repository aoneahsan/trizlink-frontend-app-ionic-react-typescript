import { atom } from 'recoil';

import { type LinkInBioPageAnalyticsDataInterface } from '@/types/InPageComponentTypes/ZaionsTables.type';

/**
 * Recoil State to store link-in-bio page-analytics countries data
 */
export const linkInBioPageAnalyticsCountriesRState = atom<
  LinkInBioPageAnalyticsDataInterface[]
>({
  key: 'linkInBioPageAnalyticsCountriesRState_key',
  default: []
});

/**
 * Recoil State to store link-in-bio page-analytics browsers data
 */
export const linkInBioPageAnalyticsBrowsersRState = atom<
  LinkInBioPageAnalyticsDataInterface[]
>({
  key: 'linkInBioPageAnalyticsBrowsersRState_key',
  default: []
});

/**
 * Recoil State to store link-in-bio page-analytics operating system data
 */
export const linkInBioPageAnalyticsOperatingSystemRState = atom<
  LinkInBioPageAnalyticsDataInterface[]
>({
  key: 'linkInBioPageAnalyticsOperatingSystemRState_key',
  default: []
});

/**
 * Recoil State to store link-in-bio page-analytics Referers data
 */
export const linkInBioPageAnalyticsReferersRState = atom<
  LinkInBioPageAnalyticsDataInterface[]
>({
  key: 'linkInBioPageAnalyticsReferersRState_key',
  default: []
});

/**
 * Recoil State to store link-in-bio page-analytics Device data
 */
export const linkInBioPageAnalyticsDeviceRState = atom<
  LinkInBioPageAnalyticsDataInterface[]
>({
  key: 'linkInBioPageAnalyticsDeviceRState_key',
  default: []
});
