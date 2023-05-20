// Core Imports
import React from 'react';

// Packages Imports

// Custom Imports
import { ZIonCol, ZIonRow, ZIonText } from '@/components/ZIonComponents';

// Global Constants

// Style
import './styles.css';

type ZaionsSeparatorType = {
	sizeXl?: string;
	sizeLg?: string;
	sizeMd?: string;
	sizeSm?: string;
	sizeXs?: string;
};

const ZaionsSeparator: React.FC<ZaionsSeparatorType> = ({
	sizeXl = '4.2',
	sizeLg = '5',
	sizeMd = '6.2',
	sizeSm = '8.2',
	sizeXs = '11.2',
}) => {
	return (
		<>
			<ZIonRow className='ion-justify-content-center'>
				<ZIonCol
					className='ion-text-center'
					sizeXl={sizeXl}
					sizeLg={sizeLg}
					sizeMd={sizeMd}
					sizeSm={sizeSm}
					sizeXs={sizeXs}
				>
					<ZIonText className='zaions__separator block'>
						<ZIonText className='zaions__separator_OR'>OR</ZIonText>
					</ZIonText>
				</ZIonCol>
			</ZIonRow>
		</>
	);
};

export default ZaionsSeparator;
