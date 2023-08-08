// Type
const _env = import.meta.env;
import { IdNameType } from '../../../types/AdminPanel/linksType/index';

export const DefaultDomainsData: IdNameType[] = [
	// {
	// 	id: 'zaions.com',
	// 	name: 'zaions.com',
	// },
	// {
	// 	id: 'hi.zaions.com',
	// 	name: 'hi.zaions.com',
	// },

	{
		id: _env.VITE_DEFAULT_SHORT_URL_DOMAIN,
		name: _env.VITE_DEFAULT_SHORT_URL_DOMAIN,
	},
];
