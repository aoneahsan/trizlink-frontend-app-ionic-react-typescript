// Core Imports
import React from 'react';

// Packages Imports

// Custom Imports
import ZIonPage from '@/components/ZIonPage';
import {
  ZIonButton,
  ZIonCol,
  ZIonContent,
  ZIonRow,
  ZIonSelect,
  ZIonSelectOption
} from '@/components/ZIonComponents';
import { TimeFilterEnum } from '@/types/AdminPanel/linksType';
import { Geolocation } from '@capacitor/geolocation';

//
const ZaionsTestPage: React.FC = () => {
  // const coordinates = await Geolocation.getCurrentPosition();
  // console.log({ _userPosition: coordinates });
  const testingCheckPermissions = async (): Promise<void> => {
    try {
      const checkPermission = await Geolocation.getCurrentPosition();
      console.log({ checkPermission });
    } catch (error) {
      console.log(error);
    }
  };

  // const testingGlCheckP = async (): Promise<void> => {
  //   try {
  //     const glCheckP = await Geolocation.checkPermissions();
  //     console.log({ glCheckP });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const testingGlRequestP = async (): Promise<void> => {
  //   try {
  //     const glRequestP = await Geolocation.requestPermissions();
  //     console.log({ glRequestP });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const testingWatchPosition = async (): Promise<void> => {
  //   try {
  //     const id = await Geolocation.watchPosition(
  //       { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 },
  //       (position, err) => {
  //         try {
  //           console.log(position, err);
  //           if (position !== null) {
  //             console.log({ c: position?.coords });
  //           }
  //         } catch (error) {
  //           console.log({
  //             log: 'from testingClearWatchP -> Geolocation.watchPosition',
  //             error
  //           });
  //         }
  //       }
  //     );
  //     console.log({ id });
  //   } catch (error) {
  //     console.log({
  //       log: 'from testingClearWatchP',
  //       error
  //     });
  //   }
  // };

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
            {/* <ZIonButton
              onClick={() => {
                void testingWatchPosition();
              }}>
              check permissions
            </ZIonButton> */}

            <ZIonButton
              onClick={() => {
                void testingCheckPermissions();
              }}>
              Watch Position
            </ZIonButton>
          </ZIonCol>
        </ZIonRow>
      </ZIonContent>
    </ZIonPage>
  );
};

export default ZaionsTestPage;
