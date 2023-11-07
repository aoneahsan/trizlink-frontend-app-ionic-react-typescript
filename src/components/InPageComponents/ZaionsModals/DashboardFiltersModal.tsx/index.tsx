// Core Imports
import React from 'react';

// Packages Import
import { closeOutline } from 'ionicons/icons';

// Custom Imports
import {
  ZIonCol,
  ZIonItem,
  ZIonRow,
  ZIonContent,
  ZIonList,
  ZIonTitle,
  ZIonLabel,
  ZIonSelectOption,
  ZIonIcon,
  ZIonCheckbox,
  ZIonFooter,
  ZIonButton,
  ZIonSelect
} from '@/components/ZIonComponents';

// Global Constants

// Images

// Recoil States

// Types

// Styles

const ZaionsDashboardFiltersModal: React.FC<{
  dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({ dismissZIonModal }) => {
  // JSX Code
  return (
    <>
      <ZIonContent className='ion-padding-vertical '>
        <ZIonRow>
          <ZIonCol className='flex mt-3 ion-justify-content-end ion-align-items-center'>
            <ZIonTitle>
              <h3 className='font-bold'>Filters</h3>
            </ZIonTitle>
          </ZIonCol>
          <ZIonCol className='flex ion-justify-content-end ion-align-items-start ion-no-padding'>
            <ZIonButton
              fill='clear'
              className='ion-no-padding ion-no-margin me-2'
              color='dark'
              onClick={() => {
                dismissZIonModal();
              }}>
              <ZIonIcon
                icon={closeOutline}
                size='large'
              />
            </ZIonButton>
          </ZIonCol>
        </ZIonRow>
        <ZIonItem className='ion-margin-start ion-margin-end'>
          {/* Here in ZIonSelect the interface is action-sheet because first we are using popover interface but there is an issue using popover interface when we click at left side of select the popover width got smaller don't now why.  */}
          <ZIonSelect
            multiple={true}
            label='0 filters applied.'
            labelPlacement='stacked'>
            <ZIonSelectOption>Tag 1</ZIonSelectOption>
            <ZIonSelectOption>Tag 2</ZIonSelectOption>
            <ZIonSelectOption>Tag 3</ZIonSelectOption>
            <ZIonSelectOption>Tag 4</ZIonSelectOption>
          </ZIonSelect>
        </ZIonItem>
        <ZIonList lines='none'>
          <ZIonItem>
            <ZIonCheckbox
              value='grapesss'
              className='me-2'
            />
            <ZIonLabel>Hidden links only</ZIonLabel>
          </ZIonItem>
        </ZIonList>
      </ZIonContent>
      <ZIonFooter className='py-2 ion-text-end'>
        <ZIonButton className='me-4'>View links</ZIonButton>
      </ZIonFooter>
    </>
  );
};

export default ZaionsDashboardFiltersModal;
