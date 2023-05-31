// Enums

// Interfaces
export interface UserRoleAndPermissionsInterface {
	role: string;
	permissions: string[];
}

// Type
export type UserAccountType = {
	id?: string;
	username?: string;
	email?: string;
	password?: string;
	created_at?: string;
	updated_at?: string;
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
