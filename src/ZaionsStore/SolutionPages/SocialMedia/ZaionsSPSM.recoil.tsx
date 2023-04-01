// Core Imports

// Packages Imports
import { atom } from 'recoil';

// Custom Imports
import { ZaionsKeyFeatureType } from 'types/InPageComponentTypes/ZaionsKeyFeature.type';
import { SPSMKeyFeaturesData } from 'data/SolutionsPages/SocialMedia/SPSMkeyFeatures.data';

export const ZaionsSPSMKeyFeaturesState = atom<ZaionsKeyFeatureType[]>({
  key: 'ZaionsSPSMKeyFeatures_Key',
  default: SPSMKeyFeaturesData,
});
