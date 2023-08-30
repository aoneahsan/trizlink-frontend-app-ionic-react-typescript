// Core Imports
import React from 'react';

// Packages Imports
import { Formik } from 'formik';
import PhoneInput, {
	formatPhoneNumberIntl,
	isPossiblePhoneNumber,
} from 'react-phone-number-input';
// import PhoneInput from 'react-phone-input-2';
// Custom Imports
import {
	ZIonCol,
	ZIonNote,
	ZIonSelect,
	ZIonSelectOption,
} from '@/components/ZIonComponents';

// Global constant

import 'react-phone-number-input/style.css';
import Z404View from '@/components/Errors/404';
import Z401View from '@/components/Errors/401';
import Z400View from '@/components/Errors/400';
import Z403View from '@/components/Errors/403';
import Z500View from '@/components/Errors/500';
import { useVirtualizer } from '@tanstack/react-virtual';
import { IonSelect } from '@ionic/react';

// import 'react-phone-input-2/lib/style.css';

const ZaionsTestPage: React.FC = () => {
	const ionSelectParentRef = React.useRef(null);
	const divParentRef = React.useRef(null);

	const ionSelectRowVirtualizer = useVirtualizer({
		count: 10000,
		getScrollElement: () => ionSelectParentRef.current,
		estimateSize: () => 35,
		overscan: 5,
	});
	const divRowVirtualizer = useVirtualizer({
		count: 10000,
		getScrollElement: () => divParentRef.current,
		estimateSize: () => 35,
		overscan: 5,
	});

	return (
		<>
			<IonSelect
				ref={ionSelectParentRef}
				interface='popover'
				className='List'
				style={{
					height: `200px`,
					width: `400px`,
					overflow: 'auto',
					contain: 'strict',
				}}
			>
				<div
					style={{
						height: `${ionSelectRowVirtualizer.getTotalSize()}px`,
						width: '100%',
						position: 'relative',
					}}
				>
					{ionSelectRowVirtualizer.getVirtualItems().map((virtualRow) => {
						return (
							<ZIonSelectOption
								key={virtualRow.index}
								className={
									virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'
								}
								style={{
									position: 'absolute',
									top: 0,
									left: 0,
									width: '100%',
									height: `${virtualRow.size}px`,
									transform: `translateY(${virtualRow.start}px)`,
								}}
							>
								Row {virtualRow.index}
							</ZIonSelectOption>
						);
					})}
				</div>
			</IonSelect>

			<div
				ref={divParentRef}
				className='List'
				style={{
					height: `200px`,
					width: `400px`,
					overflow: 'auto',
				}}
			>
				<div
					style={{
						height: `${divRowVirtualizer.getTotalSize()}px`,
						width: '100%',
						position: 'relative',
					}}
				>
					{divRowVirtualizer.getVirtualItems().map((virtualRow) => (
						<div
							key={virtualRow.index}
							className={virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'}
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: `${virtualRow.size}px`,
								transform: `translateY(${virtualRow.start}px)`,
							}}
						>
							Row {virtualRow.index}
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default ZaionsTestPage;
