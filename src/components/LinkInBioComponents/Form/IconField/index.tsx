// Core Imports
import React from 'react';

// Packages Imports
import { addCircleOutline } from 'ionicons/icons';
import { InputChangeEventDetail, IonInputCustomEvent } from '@ionic/core';

// Custom Imports
import { ZIonIcon, ZIonInput, ZIonItem } from '@/components/ZIonComponents';

// Styles

// Component Type
interface LinkInBioIconFieldInterface {
  placeholder?: string;
  name?: string;
  className?: string;
  value?: string | number | null;
  onIonChange?: (event: IonInputCustomEvent<InputChangeEventDetail>) => void;
  onIonBlur?: <A extends Event>(event: A) => void;
}

const LinkInBioIconField: React.FC<LinkInBioIconFieldInterface> = ({
  placeholder = 'Icon',
  value,
  name,
  className,
  onIonChange,
  onIonBlur,
}) => {
  return (
		<ZIonItem className={className}>
			<ZIonIcon icon={addCircleOutline} slot='start' />
			<ZIonInput
				name={name}
				placeholder={placeholder}
				onIonChange={onIonChange}
				onIonBlur={onIonBlur}
				value={value}
				label=''
			/>
		</ZIonItem>
	);
};

export default LinkInBioIconField;
