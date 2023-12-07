import { CreateAnimation } from '@ionic/react';
import ZCapGMap from '@/components/CustomComponents/GoogleMaps/ZCapGMap';
// import ZRGAutoCompleteInput from '@/components/CustomComponents/GoogleMaps/ZRGAutoCompleteInput';
import React, { useState } from 'react';
import { GM_CONSTANTS } from '@/utils/constants/googleMapsConstants';

const GoogleMapsCapacitorPackageTest: React.FC = () => {
  const [mapCoordinates] = useState({
    lat: GM_CONSTANTS.DEFAULT_COORS.LAT,
    lng: GM_CONSTANTS.DEFAULT_COORS.LNG
  });
  // const onLocationSelectHandler = (place: google.maps.places.PlaceResult) => {
  //   const _lat = place.geometry?.location?.lat() || 0;
  //   const _lng = place.geometry?.location?.lng() || 0;
  //   if (_lat || _lng) {
  //     setMapCoordinates({
  //       lat: _lat,
  //       lng: _lng,
  //     });
  //   }
  // };
  const ZCapGMapCoordinates = {
    lat: mapCoordinates.lat,
    lng: mapCoordinates.lng
  };
  return (
    <>
      <ZCapGMap
        mapId='zaions-test-google-map'
        coordinates={ZCapGMapCoordinates}
      />
      <CreateAnimation
        duration={1500}
        iterations={Infinity}
        fromTo={[
          {
            property: 'transform',
            fromValue: 'translateX(0px)',
            toValue: 'translateX(100px)'
          },
          { property: 'opacity', fromValue: '1', toValue: '0.2' }
        ]}>
        <div className='w-[600px] h-[200px] bg-red-400'>
          {/* <ZRGAutoCompleteInput
            name='zaions-google-autocomplete'
            onLocationSelectHandler={onLocationSelectHandler}
          /> */}
        </div>
      </CreateAnimation>
    </>
  );
};

export default GoogleMapsCapacitorPackageTest;
