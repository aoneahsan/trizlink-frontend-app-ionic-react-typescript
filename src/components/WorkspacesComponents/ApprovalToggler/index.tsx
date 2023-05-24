import React from 'react';

// Packages Imports
import { timeOutline } from 'ionicons/icons';
import classNames from 'classnames';

// Custom Imports
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';
import {
	ZIonCol,
	ZIonIcon,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import { SwitchChangeEventHandler } from 'rc-switch';

const ZWorkspaceApprovalToggler: React.FC<{
	icon?: string;
	text?: string;
	className?: string;
	onChange?: SwitchChangeEventHandler;
	checked?: boolean;
}> = ({ className, icon, text, onChange, checked }) => {
	return (
		<ZIonRow
			className={classNames(className, {
				'mt-3 ion-align-items-center': true,
			})}
		>
			<ZIonCol className='flex ion-align-items-center gap-2 ps-0' size='10'>
				<ZIonText className='flex ion-align-items-center gap-1 text-lg'>
					<ZIonIcon icon={icon} size='large' /> {text}
				</ZIonText>
			</ZIonCol>
			<ZIonCol className='ion-text-end'>
				<ZRCSwitch onChange={onChange} checked={checked} />
			</ZIonCol>
		</ZIonRow>
	);
};

export default ZWorkspaceApprovalToggler;
