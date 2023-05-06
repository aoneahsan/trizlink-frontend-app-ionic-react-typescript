// Core Import
import React from 'react';

// Packages Import
import { IonSpinner } from '@ionic/react';
import { ZIonColorType } from '@/types/zaionsAppSettings.type';

// Type
interface ZIonSpinnerInterface {
	color?: ZIonColorType;
	duration?: number;
	name?:
		| 'bubbles'
		| 'circles'
		| 'circular'
		| 'crescent'
		| 'dots'
		| 'lines'
		| 'lines-sharp'
		| 'lines-sharp-small'
		| 'lines-small';
	paused?: boolean;
	className?: string;
	style?: {
		[key: string]: unknown;
	};
}

const ZIonSpinner: React.FC<ZIonSpinnerInterface> = ({
	color = 'primary',
	duration,
	name = 'circles',
	paused = false,
	className,
	style,
}) => {
	return (
		<IonSpinner
			color={color}
			duration={duration}
			name={name}
			paused={paused}
			className={className}
			style={style}
		/>
	);
};

export default ZIonSpinner;
