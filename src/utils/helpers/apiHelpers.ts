import { API_URL_ENUM } from '@/utils/enums';
import { getApiUrl, STORAGE } from '@/utils/helpers';
import {
  API_DYNAMIC_PARTS,
  uiAvatarApiDefaultParams
} from '@/utils/constants/apiConstants';
import { LOCALSTORAGE_KEYS } from '@/utils/constants';
import { type Resetter } from 'recoil';

export const getUiAvatarApiUrl = ({
  name = uiAvatarApiDefaultParams.name,
  background = uiAvatarApiDefaultParams.background,
  bold = uiAvatarApiDefaultParams.bold,
  color = uiAvatarApiDefaultParams.color,
  fontSize = uiAvatarApiDefaultParams.fontSize,
  length = uiAvatarApiDefaultParams.length,
  rounded = uiAvatarApiDefaultParams.rounded,
  size = uiAvatarApiDefaultParams.size
}): string | undefined => {
  const _uiAvatar = API_DYNAMIC_PARTS.externalAPIs.uiAvatarAPI;
  return getApiUrl(
    API_URL_ENUM.uiAvatarAPI,
    [name, background, bold, color, fontSize, length, rounded, size],
    [
      _uiAvatar.name,
      _uiAvatar.background,
      _uiAvatar.bold,
      _uiAvatar.color,
      _uiAvatar.fontSize,
      _uiAvatar.length,
      _uiAvatar.rounded,
      _uiAvatar.size
    ],
    false,
    true
  );
};

export const clearAuthDataFromLocalStorageAndRecoil = async (
  resetUserAccountState: Resetter
): Promise<boolean> => {
  try {
    const authToken = await STORAGE.GET(LOCALSTORAGE_KEYS.AUTHTOKEN);
    if (authToken !== null || authToken !== undefined) {
      await Promise.all([
        STORAGE.REMOVE(LOCALSTORAGE_KEYS.USERDATA),
        STORAGE.REMOVE(LOCALSTORAGE_KEYS.AUTHTOKEN)
      ]);

      resetUserAccountState();
    }
    return true;
  } catch (error) {
    return false;
  }
};
