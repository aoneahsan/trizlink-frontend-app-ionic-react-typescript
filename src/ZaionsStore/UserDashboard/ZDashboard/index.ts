// Packages Imports
import { atom } from 'recoil';

// Custom
// Type
import { ZDashboardType } from '@/types/Dashboard';
// Data

export const ZDashboardRState = atom<ZDashboardType>({
	key: 'ZDashboard_key',
	default: {
		dashboardMainSidebarIsCollabes: {
			isExpand: false,
		},
	},
});
