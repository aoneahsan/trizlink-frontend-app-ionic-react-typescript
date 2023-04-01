import {
  LinkInBioFormPageInterface,
  LinkInBioType,
} from '@/types/AdminPanel/linkInBioType';
import CONSTANTS from '@/utils/constants';
import { atom } from 'recoil';
import { FormMode } from '@/types/AdminPanel/index.type';

export const NewLinkInBioFormState = atom<LinkInBioType>({
  key: 'NewLinkInBioFormState_key',
  default: {
    theme: {
      button: {},
    },
    settings: {},
    folderId: CONSTANTS.DEFAULT_VALUES.DEFAULT_FOLDER,
    shortUrl: {
      domain: CONSTANTS.DEFAULT_VALUES.DEFAULT_CUSTOM_DOMAIN,
    },
    pixelIds: [],
    tags: [],
    formMode: FormMode.ADD,
  },
});

/**
 * Recoil state for managing the current page. for example the current page data will fetch from url (page=pageName) and store in this recoil according to that the content of page will shown. let we give you an example, suppose the page parameter is `design` this will fetch and store in this recoil state in `page` property, in link-in-bio-from page we will check in `page` is `design` then show the design page content. we can also do mush more then storing page.
 */
export const LinkInBioFromPageRState = atom<LinkInBioFormPageInterface>({
  key: 'LinkInBioFromPageState_key',
  default: {},
});
