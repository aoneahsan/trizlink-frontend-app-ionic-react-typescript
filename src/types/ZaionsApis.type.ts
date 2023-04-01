import { ShortLinkType } from './AdminPanel/linksType/index';
import {
  EmbedWidgetsType,
  PixelAccountType,
  UTMTagTemplateType,
} from '@/types/AdminPanel/linksType';
import {
  AuthTokenResponseType,
  UserAccountType,
} from './UserAccount/index.type';
import { ZGenericObject } from './zaionsAppSettings.type';
import { UTMTagInfoInterface } from './AdminPanel/index.type';

// Enum's
export enum ZIonModalActionEnum {
  success = 'success',
}

export type UserAuthData = {
  data: {
    user: UserAccountType;
    token: AuthTokenResponseType;
  };
  errors: ZGenericObject;
  message: string;
  success: boolean;
  status: number;
};

export type AxiosRequestResponseType = {
  data:
    | UserAuthData
    | AuthTokenResponseType
    | ShortLinkType
    | UserAccountType[]
    | PixelAccountType[]
    | UTMTagTemplateType[]
    | EmbedWidgetsType[]
    | UTMTagInfoInterface[]
    | ShortLinkType[];
};

export type ZLinkMutateApiType<T> = {
  data: { item: T };
  errors: ZGenericObject;
  message: string;
  status: number;
  success: boolean;
};
