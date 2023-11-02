import {
  getString,
  type RemoteConfig,
  getBoolean,
  getNumber,
  getAll
} from 'firebase/remote-config';
import { frbRemoteConfigKeysStructure } from '@/utils/constants/firebaseConstants';
import { TypeEnum } from '@/utils/enums';
import { type stringOrNumberOrBooleanOrNull } from '@/types/genericTypeDefinitions.type';
import { type FrbRemoteConfigKeysNamesType } from '@/types/firebaseTypes/index.type';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getRemoteConfigKeysData = (remoteConfig: RemoteConfig) => {
  const keys = getAll(remoteConfig);
  const _keysData: {
    [key in FrbRemoteConfigKeysNamesType]: stringOrNumberOrBooleanOrNull;
  } = {
    apiUrl: null,
    apiUrl_Prod: null,
    appTitle: null,
    cryptoSecret: null,
    defaultCountry: null,
    defaultShortUrlDomain: null,
    defaultShortUrlDomain_Prod: null,
    defaultTimeZone: null,
    googleMapsApiKey: null
  };
  for (const frbRCKey in keys) {
    const _keyStructure = frbGetRemoteConfigKeyStructure(frbRCKey);
    if (_keyStructure !== undefined) {
      let keyValue: stringOrNumberOrBooleanOrNull = null;
      if (_keyStructure.type === TypeEnum.string) {
        keyValue = getString(remoteConfig, frbRCKey);
      } else if (_keyStructure.type === TypeEnum.boolean) {
        keyValue = getBoolean(remoteConfig, frbRCKey);
      } else if (_keyStructure.type === TypeEnum.number) {
        keyValue = getNumber(remoteConfig, frbRCKey);
      }

      if (keyValue !== undefined) {
        _keysData[frbRCKey as FrbRemoteConfigKeysNamesType] = keyValue;
      }
    }
  }

  return _keysData;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const frbGetRemoteConfigKeyStructure = (key: string) => {
  const index = frbRemoteConfigKeysStructure.findIndex(el => el.key === key);
  if (index > -1) {
    return frbRemoteConfigKeysStructure[index];
  } else {
    return undefined;
  }
};
