import { type WSRolesNameEnum } from '../AdminPanel/workspace';

// Enums
export enum WSRoleType {
  mainAppRole = 'mainAppRole',
  inAppWSRole = 'inAppWSRole'
}

export enum SignUpTypeEnum {
  normal = 'normal',
  admin = 'admin',
  invite = 'invite'
}

export enum USNotificationSettingFrequencyEnum {
  all = 'all',
  suggested = 'suggested',
  required = 'required'
}

// Interfaces
export interface UserRoleAndPermissionsInterface {
  role: string;
  permissions: string[];
  fetched?: boolean;
}

export interface WSRolesInterfaces {
  WSRoles: Array<{
    id: 4;
    name: WSRolesNameEnum;
    roleType: WSRoleType;
    created_at: string;
    updated_at: string;
  }>;
}

export interface EmailAddressInterface {
  id?: string;
  email: string;
  status: string;
  optExpireTime: string;
  isPrimary: boolean;
  verifiedAt: string;
}

export interface IUSNotificationSettingInner {
  inApp: boolean;
  email: boolean;
  push: boolean;
  sms: boolean;
}

export interface IUSNotificationSetting {
  id?: string;
  invitationNotification: IUSNotificationSettingInner;
  newDeviceLogin: IUSNotificationSettingInner;
  passwordReset: IUSNotificationSettingInner;
  otherNotification: IUSNotificationSettingInner;
  browser: {
    push: boolean;
    playSoundInNotification: boolean;
    playSoundInMessage: boolean;
  };
  email: {
    frequency: USNotificationSettingFrequencyEnum;
    notifications: {
      otherNotifications: boolean;
    };
  };
  sms: {
    frequency: USNotificationSettingFrequencyEnum;
  };
}

export interface IWSNotificationSetting {
  id?: string;
  notificationOnProfile: boolean;
  allowPushNotification: boolean;
}

// Type
export interface UserAccountType {
  id?: string;
  username?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  profileImage?: {
    // profileImage use to store user profile detail json, for example json containing filePath, fileUrl, etc.
    filePath?: string;
    fileUrl?: string;
  };
  avatar?: string; // avatar use to store one fileUrl so where we need just url we will get from here.
  password?: string;
  createdAt?: string;
  updatedAt?: string;
  lastSeenAt?: string;
  lastSeenAtFormatted?: string;
  email_verified_at?: string | null;
}

export interface UserAccountEmailType {
  id?: string;
  emailAddress: string;
  isPrimary?: boolean;
  isVerified?: boolean;
  makePrimary?: boolean;
}

export interface UserAccountAuthTokenType {
  token?: string;
}
export interface AuthTokenResponseType {
  plainTextToken: string;
}
