import { type ShortLinkType } from './AdminPanel/linksType/index';
import {
  type EmbedWidgetsType,
  type PixelAccountType,
  type UTMTagTemplateType
} from '@/types/AdminPanel/linksType';
import {
  type AuthTokenResponseType,
  type UserAccountType
} from './UserAccount/index.type';
import { type ZGenericObject } from './zaionsAppSettings.type';
import { type UTMTagInfoInterface } from './AdminPanel/index.type';

// Enum's
export enum ZIonModalActionEnum {
  success = 'success'
}

export interface UserAuthData {
  data: {
    user: UserAccountType;
    token: AuthTokenResponseType;
  };
  errors: ZGenericObject;
  message: string;
  success: boolean;
  status: number;
}

export interface AxiosRequestResponseType {
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
}

export interface ZLinkMutateApiType<T> {
  data: { item: T };
  errors: ZGenericObject;
  message: string;
  status: number;
  success: boolean;
}

export interface ZLinkGetApiType<T> {
  data: { items: T };
  errors: ZGenericObject;
  message: string;
  status: number;
  success: boolean;
}

export interface ZUIAvatarApiDefaultParamsInterface {
  name?: string;
  rounded?: string;
  bold?: string;
  size?: string;
  background?: string;
  color?: string;
  fontSize?: string;
  length?: string;
}
