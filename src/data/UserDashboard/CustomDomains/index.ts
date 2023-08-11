// Type
import { ENVS } from '@/utils/envKeys';
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
		id: ENVS.defaultShortUrlDomain,
		name: ENVS.defaultShortUrlDomain,
	},
];
