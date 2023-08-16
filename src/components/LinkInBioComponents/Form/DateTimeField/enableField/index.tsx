// Core Imports
import React from 'react';

// Packages Imports
import { reorderTwoOutline } from 'ionicons/icons';

// Custom Imports
import { ZIonIcon, ZIonItem, ZIonText } from '@/components/ZIonComponents';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';
import { SwitchChangeEventHandler } from 'rc-switch';

// Styles

// Component Type
interface LinkInBioEnableFieldInterface {
	title?: string;
	icon?: string;
	checked?: boolean;
	testingSelector?: string;
	testingListSelector?: string;
	onChange?: SwitchChangeEventHandler;
}

const LinkInBioEnableField: React.FC<LinkInBioEnableFieldInterface> = ({
	title = 'Title',
	icon = reorderTwoOutline,
	checked,
	testingSelector,
	testingListSelector,
	onChange,
}) => {
	return (
		<ZIonItem
			lines='none'
			className='mt-3'
			testingSelector={`${testingSelector}-item`}
			testingListSelector={`${testingListSelector}-item`}
		>
			<ZIonIcon icon={icon} className='me-3' slot='start' />
			<ZIonText
				color='medium'
				testingSelector={`${testingSelector}-text`}
				testingListSelector={`${testingListSelector}-text`}
			>
				{title}
			</ZIonText>
			<ZIonText slot='end'>
				<ZRCSwitch
					onChange={onChange}
					checked={checked}
					testingSelector={testingSelector}
					testingListSelector={testingListSelector}
				/>
			</ZIonText>
		</ZIonItem>
	);
};

export default LinkInBioEnableField;
