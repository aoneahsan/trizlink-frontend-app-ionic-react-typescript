import {
  getString,
  RemoteConfig,
  getBoolean,
  getNumber,
  getAll
} from 'firebase/remote-config';
import { frbRemoteConfigKeysStructure } from '@/utils/constants/firebaseConstants';
import { TypeEnum } from '@/utils/enums';
import { stringOrNumberOrBooleanOrNull } from '@/types/genericTypeDefinitions.type';
import { FrbRemoteConfigKeysNamesType } from '@/types/firebaseRStoreTypes/index.type';

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
    if (_keyStructure) {
      let keyValue: stringOrNumberOrBooleanOrNull = null;
      if (_keyStructure.type === TypeEnum.string) {
        keyValue = getString(remoteConfig, frbRCKey);
      } else if (_keyStructure.type === TypeEnum.boolean) {
        keyValue = getBoolean(remoteConfig, frbRCKey);
      } else if (_keyStructure.type === TypeEnum.number) {
        keyValue = getNumber(remoteConfig, frbRCKey);
      }

      if (keyValue) {
        _keysData[frbRCKey as FrbRemoteConfigKeysNamesType] = keyValue;
      }
    }
  }

  return _keysData;
};

export const frbGetRemoteConfigKeyStructure = (key: string) => {
  const index = frbRemoteConfigKeysStructure.findIndex(el => el.key === key);
  if (index > -1) {
    return frbRemoteConfigKeysStructure[index];
  } else {
    return undefined;
  }
};
