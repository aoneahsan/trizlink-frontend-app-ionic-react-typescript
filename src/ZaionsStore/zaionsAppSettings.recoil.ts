import {
  countryCodeData,
  ZaionsAppSettingsData,
} from '@/data/zaionsAppSettings.data';
import { atom } from 'recoil';
import {
  ZaionsAppSettingsType,
  ZaionsCountryCodeType,
} from '@/types/zaionsAppSettings.type';

export const ZaionsAppSettingsRState = atom<ZaionsAppSettingsType>({
  key: 'ZaionsAppSettingsRState_key',
  default: ZaionsAppSettingsData,
});

export const ZaionsCountryCodeRState = atom<ZaionsCountryCodeType[]>({
  key: 'ZaionsCountryCodeRState_key',
  default: countryCodeData,
});
