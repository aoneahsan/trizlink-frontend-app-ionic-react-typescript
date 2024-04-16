import React, { useEffect, useRef } from 'react';
import { GoogleMap } from '@capacitor/google-maps';
import { ENVS } from '@/utils/envKeys';
import RGAutoComplete from 'react-google-autocomplete';

const GoogleMapsCapacitorPackageTest: React.FC = () => {
  const mapRef = useRef<HTMLElement>();

  useEffect(() => {
    void (async () => {
      if (mapRef.current == null) return;

      await GoogleMap.create({
        id: 'my-cool-map',
        element: mapRef.current,
        apiKey: ENVS.googleApiKey,
        config: {
          center: {
            lat: 33.6,
            lng: -117.9
          },
          zoom: 8
        }
      });
    })();
  }, []);

  const onLocationSelectHandler = async (
    place: google.maps.places.PlaceResult
  ): Promise<void> => {
    if (mapRef.current == null) return;

    await GoogleMap.create({
      id: 'my-cool-map',
      element: mapRef.current,
      apiKey: ENVS.googleApiKey,
      config: {
        center: {
          lat: place.geometry?.location?.lat() ?? 33.6,
          lng: place.geometry?.location?.lng() ?? -117.9
        },
        zoom: 8
      }
    });
  };

  return (
    <div className='component-wrapper'>
      <capacitor-google-map
        ref={mapRef}
        style={{
          display: 'inline-block',
          width: '100%',
          height: 400
        }}></capacitor-google-map>
      <br />
      <RGAutoComplete
        apiKey={ENVS.googleApiKey}
        onPlaceSelected={onLocationSelectHandler}
      />
    </div>
  );
};

export default GoogleMapsCapacitorPackageTest;
