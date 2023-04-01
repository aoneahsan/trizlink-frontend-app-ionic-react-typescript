import { ENVS } from '@/utils/envKeys';

export const GM_CONSTANTS = {
  DEFAULT_COORS: {
    LAT: 33.6,
    LNG: -117.9,
  },
  ZOOM_LEVEL: 8,
  MAP_API_KEY: ENVS.googleMapApiKey || '',
  MAP_ID: 'zaions-google-map-default-id',
};
