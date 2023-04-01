import { ENVS } from 'utils/envKeys';

export const GM_CONSTANTS = {
  DEFAULT_COORS: {
    LAT: 33.6,
    LNG: -117.9,
  },
  ZOOM_LEVEL: 8,
  MAP_API_KEY: ENVS.REACT_APP_GOOGLE_MAP_API_KEY || '',
  MAP_ID: 'zaions-google-map-default-id',
};
