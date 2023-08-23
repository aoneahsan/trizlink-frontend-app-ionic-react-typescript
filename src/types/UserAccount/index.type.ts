// Enums
export enum WSRolesNameEnum {
	Administrator = 'Administrator',
	Manager = 'Manager',
	Contributor = 'Contributor',
	Writer = 'Writer',
	Approver = 'Approver',
	Commenter = 'Commenter',
	Guest = 'Guest',
}

export enum WSRoleType {
	mainAppRole = 'mainAppRole',
	inAppWSRole = 'inAppWSRole',
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

// Type
export type UserAccountType = {
	id?: string;
	username?: string;
	name?: string;
	email?: string;
	profilePitcher?: string;
	password?: string;
	createdAt?: string;
	updatedAt?: string;
	email_verified_at?: string | null;
};

export type UserAccountEmailType = {
	id?: string;
	emailAddress: string;
	isPrimary?: boolean;
	isVarified?: boolean;
	makePrimary?: boolean;
};

export type UserAccountAuthTokenType = {
	token?: string;
};
export type AuthTokenResponseType = { plainTextToken: string };
