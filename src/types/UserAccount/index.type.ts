import { WSRolesNameEnum } from '../AdminPanel/workspace';

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

// Interfaces
export interface UserRoleAndPermissionsInterface {
  role: string;
  permissions: string[];
  fetched?: boolean;
}

export interface WSRolesInterfaces {
  WSRoles: {
    id: 4;
    name: WSRolesNameEnum;
    roleType: WSRoleType;
    created_at: string;
    updated_at: string;
  }[];
}

export interface EmailAddressInterface {
  id?: string;
  email: string;
  status: string;
  optExpireTime: string;
  isPrimary: boolean;
  verifiedAt: string;
}

// Type
export type UserAccountType = {
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
  email_verified_at?: string | null;
};

export type UserAccountEmailType = {
  id?: string;
  emailAddress: string;
  isPrimary?: boolean;
  isVerified?: boolean;
  makePrimary?: boolean;
};

export type UserAccountAuthTokenType = {
  token?: string;
};
export type AuthTokenResponseType = { plainTextToken: string };
