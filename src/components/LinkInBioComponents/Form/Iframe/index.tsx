// Core Imports
import React from 'react';

// Packages Imports

// Custom Imports
import { ZIonCol } from '@/components/ZIonComponents';
import ZEditor from '@/components/CustomComponents/ZEditor';
import { useFormikContext } from 'formik';
import { type LinkInBioSingleBlockContentType } from '@/types/AdminPanel/linkInBioType/blockTypes';

// Styles

// Component Type

const LinkInBioIframeField: React.FC<{
  testingselector?: string;
  testinglistselector?: string;
}> = ({ testinglistselector, testingselector }) => {
  const { values, setFieldValue } =
    useFormikContext<LinkInBioSingleBlockContentType>();
  return (
    <ZIonCol size='12'>
      <div className='mt-3 ion-padding-top'>
        <ZEditor
          width={'100%'}
          height={'240px'}
          placeholder='Paste you HTML code here...'
          fontSize={18}
          value={values.iframe}
          testinglistselector={testinglistselector}
          testingselector={testingselector}
          onChange={value => {
            void setFieldValue('iframe', value, false);
          }}
        />
      </div>
    </ZIonCol>
  );
};

export default LinkInBioIframeField;
