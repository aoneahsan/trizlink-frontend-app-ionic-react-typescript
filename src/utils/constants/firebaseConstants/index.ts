import { TypeEnum } from '@/utils/enums';

export const frbRemoteConfigKeysStructure = [
  // keys for frontend app use
  { key: 'appTitle', type: TypeEnum.string, haveProdValue: false },
  { key: 'cryptoSecret', type: TypeEnum.string, haveProdValue: false },
  { key: 'defaultCountry', type: TypeEnum.string, haveProdValue: false },
  { key: 'defaultShortUrlDomain', type: TypeEnum.string, haveProdValue: true },
  {
    key: 'defaultShortUrlDomain_Prod',
    type: TypeEnum.string,
    haveProdValue: false
  },
  { key: 'defaultTimeZone', type: TypeEnum.string, haveProdValue: false },

  // keys related to our own backend server
  { key: 'apiUrl', type: TypeEnum.string, haveProdValue: true },
  { key: 'apiUrl_Prod', type: TypeEnum.string, haveProdValue: false },

  // keys for third party service
  { key: 'googleMapsApiKey', type: TypeEnum.string, haveProdValue: false }
];

export const frbRemoteConfigSetting = {
  staleTimeInMilliseconds: 6 * 60 * 60 * 1000 // 6 hours
};
