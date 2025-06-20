import React, { useEffect, useRef } from 'react';
import { GoogleMap } from '@capacitor/google-maps';
import { GM_CONSTANTS } from '@/utils/constants/googleMapsConstants';

interface IZCapGMapProps {
  mapId: string;
  mapSize?: {
    width?: string | number;
    height?: string | number;
  };
  coordinates?: {
    lat?: number;
    lng?: number;
  };
  zoomLevel?: number;
  mapStyles?: Record<string, unknown>;
}

const ZCapGMap: React.FC<IZCapGMapProps> = props => {
  const mapRef = useRef<HTMLElement>();

  useEffect(() => {
    void (async () => {
      if (mapRef?.current === null || mapRef?.current === undefined) return;

      await GoogleMap.create({
        id: props?.mapId ?? GM_CONSTANTS.MAP_ID,
        element: mapRef.current,
        apiKey: GM_CONSTANTS.MAP_API_KEY ?? '',
        config: {
          center: {
            lat: props?.coordinates?.lat ?? GM_CONSTANTS.DEFAULT_COORS.LAT,
            lng: props?.coordinates?.lng ?? GM_CONSTANTS.DEFAULT_COORS.LNG
          },
          zoom: props?.zoomLevel ?? GM_CONSTANTS.ZOOM_LEVEL,
          fullscreenControl: false,
          scrollwheel: false,
          panControl: false,
          zoomControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          disableDoubleClickZoom: true,
          draggable: false
        }
      });
    })();

    // eslint-disable-next-line
  }, [props?.coordinates?.lat, props?.coordinates?.lng, props?.zoomLevel]);

  // #region comp constants
  const _capacitorGoogleMap = {
    width: props?.mapSize?.width ?? '100%',
    height: props?.mapSize?.height ?? 400,
    display: 'inline-block',
    ...props?.mapStyles
  };
  // #endregion

  return (
    <capacitor-google-map
      ref={mapRef}
      style={_capacitorGoogleMap}
    />
  );
};

export default ZCapGMap;
