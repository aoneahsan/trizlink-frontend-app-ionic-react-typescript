import { GoogleMap } from '@capacitor/google-maps';
import { useEffect, useRef } from 'react';
import { ENVS } from '@/utils/envKeys';
import RGAutoComplete, { usePlacesWidget } from 'react-google-autocomplete';
import { ZIonInput } from '@/components/ZIonComponents';

const GoogleMapsCapacitorPackageTest: React.FC = () => {
  const mapRef = useRef<HTMLElement>();

  useEffect(() => {
    void (async () => {
      if (!mapRef.current) return;

      await GoogleMap.create({
        id: 'my-cool-map',
        element: mapRef.current,
        apiKey: ENVS.googleMapApiKey,
        config: {
          center: {
            lat: 33.6,
            lng: -117.9,
          },
          zoom: 8,
        },
      });
    })();
  }, []);

  const onLocationSelectHandler = async (
    place: google.maps.places.PlaceResult
  ) => {
    if (!mapRef.current) return;

    await GoogleMap.create({
      id: 'my-cool-map',
      element: mapRef.current,
      apiKey: ENVS.googleMapApiKey,
      config: {
        center: {
          lat: place.geometry?.location?.lat() || 33.6,
          lng: place.geometry?.location?.lng() || -117.9,
        },
        zoom: 8,
      },
    });
  };

  return (
    <div className='component-wrapper'>
      <capacitor-google-map
        ref={mapRef}
        style={{
          display: 'inline-block',
          width: '100%',
          height: 400,
        }}
      ></capacitor-google-map>
      <br />
      <RGAutoComplete
        apiKey={ENVS.googleMapApiKey}
        onPlaceSelected={onLocationSelectHandler}
      />
    </div>
  );
};

export default GoogleMapsCapacitorPackageTest;
