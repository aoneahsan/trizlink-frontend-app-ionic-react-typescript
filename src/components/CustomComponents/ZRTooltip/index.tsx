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
	ChildrenType,
	Middleware,
	Tooltip as ReactTooltip,
} from 'react-tooltip';

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */
interface ZRTooltipInterface {
	anchorSelect?: string;
	className?: string;
	classNameArrow?: string;
	content?: string;
	place?: 'top' | 'bottom' | 'left' | 'right';
	offset?: number;
	id?: string;
	variant?: 'dark' | 'light' | 'success' | 'warning' | 'error' | 'info';
	children?: ReactNode;
	openOnClick?: boolean;
	positionStrategy?: 'absolute' | 'fixed';
	delayShow?: number;
	delayHide?: number;
	float?: boolean;
	hidden?: boolean;
	onArrow?: boolean;
	clickable?: boolean;
	closeOnEsc?: boolean;
	style?: {
		[key: string]: unknown;
	};
	position?: {
		x: number;
		y: number;
	};
	isOpen?: boolean;
	middlewares?: Middleware[];
	// wrapper?: ReactNode;
	setIsOpen?: (value: boolean) => void;
	afterHide?: () => void;
	afterShow?: () => void;
	render?: (render: {
		content: string | null;
		activeAnchor: HTMLElement | null;
	}) => ChildrenType;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */
const ZRTooltip: React.FC<ZRTooltipInterface> = (props) => {
	return <ReactTooltip {...props}>{props.children}</ReactTooltip>;
};

export default ZRTooltip;
