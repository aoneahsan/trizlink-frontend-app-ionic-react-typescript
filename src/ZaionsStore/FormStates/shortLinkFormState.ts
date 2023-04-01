// Core Imports

// Packages Imports
import { atom } from 'recoil';

// Custom Imports

// Type
import { genericZaionsRSelectOptions } from '@/types/AdminPanel/index.type';

export const ShortLinkFormState = atom<{
  pixelAccountIds?: string[];
  note?: string | null;
}>({
  key: 'ShortLinkFormState_Key',
  default: {},
});

export const shortLinkFormPixelAccountsSectionRState =
  atom<genericZaionsRSelectOptions>({
    key: 'shortLinkFormPixelAccountsSectionRState_key',
    default: undefined,
  });

export const shortLinkFormUtmTagsTemplateSectionRState =
  atom<genericZaionsRSelectOptions>({
    key: 'shortLinkFormUtmTagsTemplateSectionRState_key',
    default: undefined,
  });

export const shortLinkFormFolderSectionRState =
  atom<genericZaionsRSelectOptions>({
    key: 'shortLinkFormFolderSectionRState_key',
    default: undefined,
  });

export const shortLinkFormCustomDomainSectionRState =
  atom<genericZaionsRSelectOptions>({
    key: 'shortLinkFormCustomDomainSectionRState_key',
    default: undefined,
  });

export const shortLinkFormLinkExpirationSectionRState =
  atom<genericZaionsRSelectOptions>({
    key: 'shortLinkFormLinkExpirationSectionRState_key',
    default: undefined,
  });

export const shortLinkFormGeoLocationSectionRState =
  atom<genericZaionsRSelectOptions>({
    key: 'shortLinkFormGeoLocationSectionRState_key',
    default: undefined,
  });
