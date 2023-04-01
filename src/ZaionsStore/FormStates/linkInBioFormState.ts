// Core Imports

// Packages Imports
import { atom } from 'recoil';

// Custom Imports

// Type
import { genericZaionsRSelectOptions } from '@/types/AdminPanel/index.type';

export const LinkInBioFormState = atom<{
  pixelAccountIds?: string[];
  note?: string | null;
}>({
  key: 'LinkInBioFormState_Key',
  default: {},
});

export const LinkInBioFormPixelAccountsSectionRState =
  atom<genericZaionsRSelectOptions>({
    key: 'LinkInBioFormPixelAccountsSectionRState_key',
    default: undefined,
  });

export const LinkInBioFormUtmTagsTemplateSectionRState =
  atom<genericZaionsRSelectOptions>({
    key: 'LinkInBioFormUtmTagsTemplateSectionRState_key',
    default: undefined,
  });

export const LinkInBioFormFolderSectionRState =
  atom<genericZaionsRSelectOptions>({
    key: 'LinkInBioFormFolderSectionRState_key',
    default: undefined,
  });

export const LinkInBioFormCustomDomainSectionRState =
  atom<genericZaionsRSelectOptions>({
    key: 'LinkInBioFormCustomDomainSectionRState_key',
    default: undefined,
  });

export const LinkInBioFormLinkExpirationSectionRState =
  atom<genericZaionsRSelectOptions>({
    key: 'LinkInBioFormLinkExpirationSectionRState_key',
    default: undefined,
  });

export const LinkInBioFormGeoLocationSectionRState =
  atom<genericZaionsRSelectOptions>({
    key: 'LinkInBioFormGeoLocationSectionRState_key',
    default: undefined,
  });
