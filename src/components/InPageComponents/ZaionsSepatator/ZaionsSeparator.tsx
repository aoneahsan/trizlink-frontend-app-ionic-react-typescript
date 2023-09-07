// Core Imports
import React from 'react';

// Packages Imports

// Custom Imports
import { ZIonCol, ZIonRow, ZIonText } from '@/components/ZIonComponents';

// Global Constants

// Style
import './styles.css';
import classNames from 'classnames';

type ZaionsSeparatorType = {
	sizeXl?: string;
	sizeLg?: string;
	sizeMd?: string;
	sizeSm?: string;
	sizeXs?: string;
	text?: string | React.ReactNode;
	className?: string;
};

const ZaionsSeparator: React.FC<ZaionsSeparatorType> = ({
	sizeXl = '4.2',
	sizeLg = '5',
	sizeMd = '6.2',
	sizeSm = '8.2',
	sizeXs = '11.2',
	text = 'OR',
	className,
}) => {
	return (
		<ZIonRow
			className={classNames(className, {
				'ion-justify-content-center w-full': true,
			})}
		>
			<ZIonCol
				className='ion-text-center ion-no-padding'
				sizeXl={sizeXl}
				sizeLg={sizeLg}
				sizeMd={sizeMd}
				sizeSm={sizeSm}
				sizeXs={sizeXs}
			>
				<ZIonText className='zaions__separator block'>
					<ZIonText color='medium' className='relative zaions__bg_white px-1'>
						{text}
					</ZIonText>
				</ZIonText>
			</ZIonCol>
		</ZIonRow>
	);
};

export default ZaionsSeparator;
