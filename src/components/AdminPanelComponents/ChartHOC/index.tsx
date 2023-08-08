/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { ReactNode } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component ZChartHOC
 * About: (Contains chart registration, so to register is one place where you went to use chart just rap the component with ZChartHOC).
 * @type {*}
 * */

const ZChartHOC: React.FC<{ children: ReactNode }> = ({ children }) => {
	ChartJS.register(
		CategoryScale,
		LinearScale,
		BarElement,
		Title,
		Tooltip,
		Legend
	);
	return <>{children}</>;
};

export default ZChartHOC;
