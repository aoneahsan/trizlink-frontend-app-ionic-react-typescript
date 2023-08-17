// Enums

// Interfaces
export interface UserRoleAndPermissionsInterface {
	role: string;
	permissions: string[];
	fetched?: boolean;
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
