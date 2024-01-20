// Core Imports
import React from 'react';

// Packages Import
import { laptopOutline } from 'ionicons/icons';
import { useFormikContext } from 'formik';

// Custom Imports
import {
  ZIonCol,
  ZIonText,
  ZIonIcon,
  ZIonRouterLink
} from '@/components/ZIonComponents';
import ZDragAndDrop from '@/components/CustomComponents/ZDragAndDrop';

// Global Constants
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Images

// Recoil States

// Types
import { type ZaionsShortUrlOptionFieldsValuesInterface } from '@/types/AdminPanel/linksType';
import CONSTANTS from '@/utils/constants';

// Styles

const LinkFavIcon: React.FC = () => {
  const { values, setFieldValue } =
    useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();
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
          icon={laptopOutline}
          size='large'
        />
        <ZIonText className='font-bold ion-no-margin ps-2'>
          Favicon
          <ZIonRouterLink
            className='ms-1'
            routerLink={ZaionsRoutes.HomeRoute}>
            (help)
          </ZIonRouterLink>
        </ZIonText>
      </div>

      <div className='flex px-2 mt-2 ion-align-items-center ion-padding-bottom'>
        <ZDragAndDrop
          // setFieldValue={setFieldValue}
          // fieldName='favicon'
          onDrop={(acceptedFiles, fileRejection, event) => {
            if (acceptedFiles.length > 0) {
              const filePath = URL.createObjectURL(acceptedFiles[0]);
              void setFieldValue(
                'favicon',
                {
                  file: acceptedFiles[0],
                  url: filePath
                },
                false
              );
            }
          }}
          imageUrl={values?.favicon?.url}
          title='Click to upload favicon'
          className='h-[9rem]'
          testingselector={
            CONSTANTS.testingSelectors.shortLink.formPage.favicon
          }
        />
      </div>
    </ZIonCol>
  );
};

export default LinkFavIcon;
