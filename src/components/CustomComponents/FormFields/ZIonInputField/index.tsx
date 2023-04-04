// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { InputChangeEventDetail, IonInput } from '@ionic/react';
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';

// Type
import { IonInputCustomEvent } from '@ionic/core/dist/types/components';
import { ZIonInputType } from '@/components/ZIonComponents/ZIonInput';

type ZIonInputFieldType = {
	inputFieldProps: ZIonInputType;
};

const ZIonInputField = React.forwardRef(
	(
		{ inputFieldProps }: ZIonInputFieldType,
		ref: React.Ref<HTMLIonInputElement>
	) => {
		return (
			<IonInput
				{...inputFieldProps}
				onIonInput={inputFieldProps.onIonChange}
				fill={inputFieldProps.fill || 'outline'}
				ref={ref}
			/>
		);
	}
);

export default ZIonInputField;
