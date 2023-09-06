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
	testingselector?: string;
	setFieldValue?: FormikSetFieldValueEventType;
}

const LinkInBioUploadField: React.FC<LinkInBioUploadFieldInterface> = ({
	className,
	dropdownHeight,
	fieldName,
	imageUrl,
	testingListSelector,
	testingselector,
	setFieldValue,
}) => {
	return (
		<ZIonItem
			lines='none'
			className={className}
			testingselector={`${testingselector}-item`}
			testingListSelector={`${testingListSelector}-item`}
		>
			<ZIonIcon icon={imageOutline} slot='start' className='w-7 h-7 me-2' />
			<ZDragAndDrop
				fieldName={fieldName}
				imageUrl={imageUrl}
				setFieldValue={setFieldValue}
				style={{ height: dropdownHeight }}
				testingselector={testingselector}
				testingListSelector={testingListSelector}
			/>
		</ZIonItem>
	);
};

export default LinkInBioUploadField;
