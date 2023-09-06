// Core Imports
import React from 'react';

// Packages Imports

// Custom Imports
import { ZIonCol } from '@/components/ZIonComponents';
import ZEditor from '@/components/CustomComponents/ZEditor';
import { useFormikContext } from 'formik';
import { LinkInBioSingleBlockContentType } from '@/types/AdminPanel/linkInBioType/blockTypes';

// Styles

// Component Type

const LinkInBioIframeField: React.FC<{
	testingselector?: string;
	testingListSelector?: string;
}> = ({ testingListSelector, testingselector }) => {
	const { values, setFieldValue } =
		useFormikContext<LinkInBioSingleBlockContentType>();
	return (
		<ZIonCol size='12'>
			<div className='ion-padding-top mt-3'>
				<ZEditor
					width={'100%'}
					height={'240px'}
					placeholder='Paste you HTML code here...'
					fontSize={18}
					value={values.iframe}
					testingListSelector={testingListSelector}
					testingselector={testingselector}
					onChange={(value) => {
						setFieldValue('iframe', value, false);
					}}
				/>
			</div>
		</ZIonCol>
	);
};

export default LinkInBioIframeField;
