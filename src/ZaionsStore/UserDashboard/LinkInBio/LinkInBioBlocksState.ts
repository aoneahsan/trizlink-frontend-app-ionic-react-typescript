// Packages Imports
import { atom } from 'recoil';
import { messengerPlatformsBlockEnum } from 'types/AdminPanel/index.type';
import {
  LinkInBioFormFieldsEnum,
  LinkInBioMusicPlatformEnum,
  LinkInBioSocialPlatformEnum,
} from 'types/AdminPanel/linkInBioType/blockTypes';

// Custom
// Type
import {
  LinkInBioPredefinedBlocksInterface,
  LinkInBioBlockFromType,
  LinkInBioBlockEnum,
  LinkInBioPredefinedPlatformInterface,
} from 'types/AdminPanel/linkInBioType/blockTypes';

// Data

// This recoil state will stored the blocks (the button blocks present in the linkInBio blocks section). the blocks data will be fetch from API and store init.
// means these are the blocks that user can add to his link in bio page, these are defined by the admin,
export const LinkInBioPredefinedBlocksRState = atom<
  LinkInBioPredefinedBlocksInterface[]
>({
  key: 'LinkInBioPredefinedBlocksRState_key',
  default: [],
});

// This recoil state will stored the review section blocks (the blocks that present in review path in linkInBio.the RHS path). when the user when user add a block it will store init.
// mean, these are the blocks which user has added to his link in bio ui, by selecting them on blocks page on link in bio edit/create page
// TODO: need to update the type of this as well, as this should store the whole data state of the block as well (button, carousel, etc), all blocks should store their own data state in them, so when user will try to edit any block, we will get the data state from selected block and will set that in a "selectedLinkInBioBlock" state and will use that to populate the fields of the block form.
export const LinkInBioBlocksRState = atom<LinkInBioBlockFromType[]>({
  key: 'LinkInBioBlocksRState_key',
  default: [],
});

export const LinkInBioSelectedBlockFromRState = atom<LinkInBioBlockFromType>({
  key: 'LinkInBioSelectedBlockFromRState_key',
  default: {
    blockType: LinkInBioBlockEnum.default,
  },
});

// This recoil state will stored the blocks pre define music platform use in music block. the pre define music platform data will be fetch from API and store init.
// means these are the pre define music platform that user can add to his link in bio page, these are defined by the admin,
export const LinkInBioPredefinedMusicPlatformRState = atom<
  LinkInBioPredefinedPlatformInterface<LinkInBioMusicPlatformEnum>[]
>({
  key: 'LinkInBioPredefinedMusicPlatformRState_key',
  default: [],
});

// This recoil state will stored the blocks pre define music platform use in music block. the pre define music platform data will be fetch from API and store init.
// means these are the pre define music platform that user can add to his link in bio page, these are defined by the admin,
export const LinkInBioPredefinedMessengerPlatformRState = atom<
  LinkInBioPredefinedPlatformInterface<messengerPlatformsBlockEnum>[]
>({
  key: 'LinkInBioPredefinedMessengerPlatformRState_key',
  default: [],
});

// This recoil state will stored the blocks pre define social platform use in social block. the pre define social platform data will be fetch from API and store init.
// means these are the pre define social platform that user can add to his link in bio page, these are defined by the admin,
export const LinkInBioPredefinedSocialPlatformRState = atom<
  LinkInBioPredefinedPlatformInterface<LinkInBioSocialPlatformEnum>[]
>({
  key: 'LinkInBioPredefinedSocialPlatformRState_key',
  default: [],
});

// This recoil state will stored the blocks pre define Form Fields platform use in Form Fields block. the pre define Form Fields platform data will be fetch from API and store init.
// means these are the pre define Form Fields platform that user can add to his link in bio page, these are defined by the admin,
export const LinkInBioPredefinedFormFieldsRState = atom<
  LinkInBioPredefinedPlatformInterface<LinkInBioFormFieldsEnum>[]
>({
  key: 'LinkInBioPredefinedFormFieldsRState_key',
  default: [],
});
