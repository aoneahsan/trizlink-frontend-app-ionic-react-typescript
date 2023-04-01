//  Core Import
import React from 'react';

//  Packages Imports
import { useRecoilValue } from 'recoil';

// Custom Imports
import ZaionsIonPage from 'components/ZaionsIonPage';
import ZaionsKeyFeatures from 'components/InPageComponents/ZaionsKeyFeatures';
import ZaionsTopMenu from 'navigation/TopMenu';
import {
  ZIonCol,
  ZIonContent,
  ZIonGrid,
  ZIonRow,
} from 'components/ZIonComponents';

// Recoil State
import { ZaionsSPSMKeyFeaturesState } from 'ZaionsStore/SolutionPages/SocialMedia/ZaionsSPSM.recoil';

// Types
import { ZaionsKeyFeatureType } from 'types/InPageComponentTypes/ZaionsKeyFeature.type';

const SocialMedia: React.FC = () => {
  const keyFeaturesData = useRecoilValue<ZaionsKeyFeatureType[]>(
    ZaionsSPSMKeyFeaturesState
  );

  return (
    <ZaionsIonPage pageTitle='Social Media Page'>
      {/* Page Content */}
      <ZIonContent fullscreen>
        <ZaionsTopMenu />
        <ZIonGrid>
          {/* here */}
          <ZIonGrid>
            <ZIonRow>
              <ZIonCol
                sizeXl='1'
                sizeLg='1'
                sizeMd='0'
                sizeSm='0'
                sizeXs='0'
              ></ZIonCol>
              <ZIonCol
                size='10.5'
                sizeLg='10.5'
                sizeMd='11.8'
                sizeSm='12'
                sizeXs='12'
              >
                <ZaionsKeyFeatures data={keyFeaturesData} />
              </ZIonCol>
              <ZIonCol
                size='.5'
                sizeLg='.5'
                sizeMd='0'
                sizeSm='0'
                sizeXs='0'
              ></ZIonCol>
            </ZIonRow>
          </ZIonGrid>
        </ZIonGrid>
      </ZIonContent>
    </ZaionsIonPage>
  );
};

export default SocialMedia;
