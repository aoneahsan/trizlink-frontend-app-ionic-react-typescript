// Core Imports
import React from 'react';
import { useMediaQuery } from 'react-responsive';

// packages Imports
import classNames from 'classnames';

// Custom Imports
import { ZIonCol, ZIonGrid, ZIonRow } from '@/components/ZIonComponents';

// Global Constant
import { BRACKPOINT_LG, BRACKPOINT_MD } from '@/utils/constants';

const ZaionsHr: React.FC = () => {
	const isLgScale = useMediaQuery({
		query: `(max-width: ${BRACKPOINT_LG})`,
	});

	const isMdScale = useMediaQuery({
		query: `(max-width: ${BRACKPOINT_MD})`,
	});

	return (
		<ZIonGrid
			className={classNames({
				'ion-padding-bottom mb-1': !isMdScale,
			})}
		>
			<ZIonRow>
				{/* <ZIonCol></ZIonCol> */}
				{/* <ZIonCol sizeXl='11' sizeLg='11' sizeMd='12' sizeSm='0' sizeXs='0'>
				</ZIonCol> */}
				<ZIonCol
					sizeXl='11'
					sizeLg='12'
					sizeMd='12'
					sizeSm='12'
					sizeXs='12'
					className='px-0 mx-auto'
				>
					<div
						className={classNames({
							'mb-4': !isLgScale,
						})}
					>
						<hr
							className={`zaions_hr w-full mx-auto ${!isLgScale ? '' : 'my-0'}`}
						/>
					</div>
				</ZIonCol>
				{/* <ZIonCol></ZIonCol> */}
			</ZIonRow>
		</ZIonGrid>
	);
};

export default ZaionsHr;
