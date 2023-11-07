// Core Imports
import React from 'react';

// Packages Imports

// Custom Imports
import ZIonPage from '@/components/ZIonPage';
import {
  ZIonCol,
  ZIonContent,
  ZIonRow,
  ZIonSelect,
  ZIonSelectOption
} from '@/components/ZIonComponents';
import { TimeFilterEnum } from '@/types/AdminPanel/linksType';

//
const ZaionsTestPage: React.FC = () => {
  return (
    <ZIonPage>
      <ZIonContent>
        <ZIonRow>
          <ZIonCol size='4'>
            <ZIonSelect
              expandedIcon=''
              toggleIcon=''
              aria-label='Time filter'
              fill='outline'
              minHeight='2.3rem'
              color='primary'
              value={TimeFilterEnum.allTime}>
              <ZIonSelectOption value={TimeFilterEnum.allTime}>
                All time
              </ZIonSelectOption>
              <ZIonSelectOption value={TimeFilterEnum.today}>
                Today
              </ZIonSelectOption>
              <ZIonSelectOption value={TimeFilterEnum.lastSevenDays}>
                Last 7 days
              </ZIonSelectOption>
              <ZIonSelectOption value={TimeFilterEnum.last30days}>
                Last 30 days
              </ZIonSelectOption>
              <ZIonSelectOption value={TimeFilterEnum.lastMonth}>
                Last month
              </ZIonSelectOption>
            </ZIonSelect>
          </ZIonCol>
        </ZIonRow>
      </ZIonContent>
    </ZIonPage>
  );
};

export default ZaionsTestPage;
