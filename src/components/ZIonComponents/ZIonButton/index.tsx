// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonButton } from '@ionic/react';

// Type
import {
	ZIonColorType,
	ZIonModeType,
	ZIonTargetType,
} from '@/types/zaionsAppSettings.type';
import classNames from 'classnames';
import { createElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
type ZIonButtonType = {
	children?: ReactNode;
	className?: string;
	color?: ZIonColorType;
	disabled?: boolean;
	download?: string;
	expand?: 'block' | 'full';
	fill?: 'clear' | 'default' | 'outline' | 'solid';
	mode?: ZIonModeType;
	size?: 'default' | 'large' | 'small';
	type?: 'button' | 'reset' | 'submit';
	shape?: 'round';
	routerLink?: string;
	id?: string;
	slot?: 'end' | 'start' | string;
	title?: string;
	target?: ZIonTargetType;
	value?: string | number | string[] | number[];
	style?: {
		[key: string]: unknown;
	};
	href?: string;
	height?: '36px' | string;
	ref?: React.Ref<HTMLIonButtonElement>;
	onClick?: React.MouseEventHandler<HTMLIonButtonElement>;
	onMouseEnter?: React.MouseEventHandler<HTMLIonButtonElement>;
	onMouseLeave?: React.MouseEventHandler<HTMLIonButtonElement>;

	//
	testingSelector?: string;
};
const ZIonButton = (props: ZIonButtonType) => {
	const compStyle =
		props.style && props.height
			? { ...props.style, height: props.height }
			: props.style && !props.height
			? { ...props.style }
			: !props.style && props.height
			? { height: props.height }
			: {};

	return (
		<IonButton
			{...props}
			style={compStyle}
			className={classNames(props.className, { 'normal-case': true })}
			{...createElementTestingSelector(props.testingSelector || PRODUCT_NAME)}
		>
			{props.children}
		</IonButton>
	);
};
export default ZIonButton;
