/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import { ZIonCol } from '@/components/ZIonComponents';
import ZCapGMap from '@/components/CustomComponents/GoogleMaps/ZCapGMap';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

interface ZLinkInBioMapBlockInterface {
  mapId: string;
  latitude?: number;
  longitude?: number;
}

const ZLinkInBioMapBlock: React.FC<ZLinkInBioMapBlockInterface> = ({
  mapId,
  latitude,
  longitude
}) => {
  return (
    <ZIonCol>
      <ZCapGMap
        mapId={mapId}
        coordinates={{ lat: latitude, lng: longitude }}
      />
    </ZIonCol>
  );
};

export default ZLinkInBioMapBlock;
