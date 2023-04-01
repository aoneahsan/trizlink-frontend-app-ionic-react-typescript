import { GoogleMap } from '@capacitor/google-maps';
import { useEffect, useRef } from 'react';
import { GM_CONSTANTS } from '@/utils/constants/googleMapsConstants';

interface IZCapGMapProps {
  mapSize?: {
    width?: string | number;
    height?: string | number;
  };
  coordinates?: {
    lat?: number;
    lng?: number;
  };
  zoomLevel?: number;
  mapId: string;
  mapStyles?: {
    [key: string]: unknown;
  };
}

const ZCapGMap: React.FC<IZCapGMapProps> = ({
  coordinates,
  zoomLevel,
  mapSize,
  mapId,
  mapStyles,
}) => {
  const mapRef = useRef<HTMLElement>();

  useEffect(() => {
    void (async () => {
      if (!mapRef.current) return;

      await GoogleMap.create({
        id: mapId || GM_CONSTANTS.MAP_ID,
        element: mapRef.current,
        apiKey: GM_CONSTANTS.MAP_API_KEY || '',
        config: {
          center: {
            lat: coordinates?.lat || GM_CONSTANTS.DEFAULT_COORS.LAT,
            lng: coordinates?.lng || GM_CONSTANTS.DEFAULT_COORS.LNG,
          },
          zoom: zoomLevel || GM_CONSTANTS.ZOOM_LEVEL,
        },
      });
    })();

    // eslint-disable-next-line
  }, [coordinates?.lat, coordinates?.lng, zoomLevel]);

  return (
    <>
      <capacitor-google-map
        ref={mapRef}
        style={{
          width: mapSize?.width || '100%',
          height: mapSize?.height || 400,
          display: 'inline-block',
          ...mapStyles,
        }}
      ></capacitor-google-map>
    </>
  );
};

export default ZCapGMap;
