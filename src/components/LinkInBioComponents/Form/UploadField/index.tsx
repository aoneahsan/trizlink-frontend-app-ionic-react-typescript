// Core Imports
import React from 'react';

// Packages Imports
import { imageOutline } from 'ionicons/icons';

// Custom Imports
import { ZIonIcon, ZIonItem } from '@/components/ZIonComponents';
import ZDragAndDrop from '@/components/CustomComponents/ZDragAndDrop';
import { FormikSetFieldValueEventType } from '@/types/ZaionsFormik.type';

// Styles

// Component Type
interface LinkInBioUploadFieldInterface {
	className?: string;
	dropdownHeight?: string;
	fieldName?: string;
	imageUrl?: string;
	testingListSelector?: string;
	testingSelector?: string;
	setFieldValue?: FormikSetFieldValueEventType;
}

const LinkInBioUploadField: React.FC<LinkInBioUploadFieldInterface> = ({
	className,
	dropdownHeight,
	fieldName,
	imageUrl,
	testingListSelector,
	testingSelector,
	setFieldValue,
}) => {
	return (
		<ZIonItem
			lines='none'
			className={className}
			testingSelector={`${testingSelector}-item`}
			testingListSelector={`${testingListSelector}-item`}
		>
			<ZIonIcon icon={imageOutline} slot='start' className='w-7 h-7 me-2' />
			<ZDragAndDrop
				fieldName={fieldName}
				imageUrl={imageUrl}
				setFieldValue={setFieldValue}
				style={{ height: dropdownHeight }}
				testingSelector={testingSelector}
				testingListSelector={testingListSelector}
			/>
		</ZIonItem>
	);
};

export default LinkInBioUploadField;
