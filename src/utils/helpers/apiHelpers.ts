import { API_URL_ENUM } from '@/utils/enums';
import { getApiUrl, STORAGE } from '@/utils/helpers';
import {
  API_DYNAMIC_PARTS,
  uiAvatarApiDefaultParams
} from '@/utils/constants/apiConstants';
import { LOCALSTORAGE_KEYS } from '@/utils/constants';
import { type Resetter } from 'recoil';
import axios from 'axios';
import { type PageMetadata } from '@/types/ZaionsApis.type';
import { reportCustomError } from '../customErrorType';

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

export const zFetchPageMetadata = async (
  url: string
): Promise<PageMetadata> => {
  try {
    const response = await axios.get(url);
    const htmlContent: string = response.data;
    const metadata: PageMetadata = {};
    // Extract title
    const titleMatch = /<title>(.*?)<\/title>/i.exec(htmlContent);
    if (titleMatch !== null) {
      metadata.title = titleMatch[1];
    }
    // Extract meta description
    const metaDescMatch =
      /<meta\s+name=['"]description['"].*?content=['"](.*?)['"]/i.exec(
        htmlContent
      );
    if (metaDescMatch !== null) {
      metadata.meta_description = metaDescMatch[1];
    }
    // Extract meta keywords
    const metaKeywordsMatch =
      /<meta\s+name=['"]keywords['"].*?content=['"](.*?)['"]/i.exec(
        htmlContent
      );
    if (metaKeywordsMatch !== null) {
      metadata.meta_keywords = metaKeywordsMatch[1];
    }
    // Extract favicon
    const faviconMatch = /<link.*?rel=['"]icon['"].*?href=['"](.*?)['"]/i.exec(
      htmlContent
    );
    if (faviconMatch !== null) {
      metadata.favicon = faviconMatch[1];
    }
    // Extract image for social share
    const socialImageMatch =
      /<meta\s+property=['"]og:image['"].*?content=['"](.*?)['"]/i.exec(
        htmlContent
      );
    if (socialImageMatch !== null) {
      metadata.social_image = socialImageMatch[1];
    }
    return metadata;
  } catch (error) {
    reportCustomError(error);
    return {};
  }
};

export const zGetPageMetadata = async (url: string): Promise<PageMetadata> => {
  const result = await zFetchPageMetadata(url);

  return result;
  // .then(result => {
  //   console.log(result); // Output the fetched metadata
  // })
  // .catch(error => {
  //   console.error(error);
  // });
};
