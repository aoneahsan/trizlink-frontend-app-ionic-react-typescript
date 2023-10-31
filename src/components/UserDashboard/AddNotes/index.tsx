// Core Imports
import React from 'react';

// Packages Import
import { documentTextOutline } from 'ionicons/icons';
import { useFormikContext } from 'formik';

// Custom Imports
import {
  ZIonCol,
  ZIonText,
  ZIonIcon,
  ZIonRouterLink,
  ZIonTextareaShort,
  ZIonSkeletonText
} from '@/components/ZIonComponents';

// Global Constants
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Images

// Recoil States

// Types
import { type ZaionsShortUrlOptionFieldsValuesInterface } from '@/types/AdminPanel/linksType';
import CONSTANTS from '@/utils/constants';

// Styles

const AddNotes: React.FC<{ showSkeleton?: boolean }> = ({
  showSkeleton = false
}) => {
  const { values, handleChange } =
    useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

  if (showSkeleton) {
    return <AddNotesSkeleton />;
  }

  return (
    <ZIonCol
      sizeXl='5.9'
      sizeLg='5.9'
      sizeMd='5.9'
      sizeSm='12'
      sizeXs='12'
      className='py-2 border zaions__bg_white'>
      <div className='flex pb-2 ion-align-items-center border-bottom ion-padding-start'>
        <ZIonIcon
          icon={documentTextOutline}
          size='large'
        />
        <ZIonText className='font-bold ion-no-margin ps-2'>
          Add Notes
          <ZIonRouterLink
            className='ms-1'
            routerLink={ZaionsRoutes.HomeRoute}>
            (help)
          </ZIonRouterLink>
        </ZIonText>
      </div>
      <div className='block px-4 my-1'>
        <ZIonTextareaShort
          rows={2}
          placeholder='Description for your link'
          onIonChange={handleChange}
          autoGrow={true}
          name='linkNote'
          fill='outline'
          value={values.linkNote}
          testingselector={
            CONSTANTS.testingSelectors.shortLink.formPage.notesTextarea
          }
        />
      </div>
    </ZIonCol>
  );
};

const AddNotesSkeleton: React.FC = React.memo(() => {
  return (
    <ZIonCol
      sizeXl='5.9'
      sizeLg='5.9'
      sizeMd='5.9'
      sizeSm='12'
      sizeXs='12'
      className='py-2 border zaions__bg_white'>
      <div className='flex pb-2 ion-align-items-center border-bottom ion-padding-start'>
        <ZIonIcon
          icon={documentTextOutline}
          size='large'
        />
        <ZIonText className='font-bold ion-no-margin ps-2'>
          Add Notes
          <ZIonRouterLink
            className='ms-1'
            routerLink={ZaionsRoutes.HomeRoute}>
            (help)
          </ZIonRouterLink>
        </ZIonText>
      </div>
      <div className='block px-4 my-1'>
        <ZIonSkeletonText
          className='mt-3'
          width='100%'
          height='70px'
          animated={true}
        />
      </div>
    </ZIonCol>
  );
});
AddNotesSkeleton.displayName = 'AddNotesSkeleton';

export default AddNotes;
