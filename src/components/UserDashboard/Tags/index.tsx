// Core Imports
import React from 'react';

// Packages Import
import { close, pricetagsOutline } from 'ionicons/icons';
import { useFormikContext } from 'formik';

// Custom Imports
import {
  ZIonCol,
  ZIonText,
  ZIonIcon,
  ZIonRouterLink,
  ZIonLabel,
  ZIonInput,
  ZIonChip
} from '@/components/ZIonComponents';

// Global Constants
import { useZIonToast } from '@/ZaionsHooks/zionic-hooks';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Images

// Recoil States

// Types
import { type ZaionsShortUrlOptionFieldsValuesInterface } from '@/types/AdminPanel/linksType';
import CONSTANTS from '@/utils/constants';

// Styles

const Tags: React.FC = () => {
  const { values, setFieldValue } =
    useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();
  const { presentZIonToast } = useZIonToast();

  const handleTagSubmit = async (_tag: string): Promise<void> => {
    try {
      if (!values?.tags?.includes(_tag)) {
        const _tags = [...values.tags];
        _tags.push(_tag);
        void setFieldValue('tags', _tags, true);
      } else {
        await presentZIonToast(`"${_tag}" Tag already exists.`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeTags = (_tag: string): void => {
    if (typeof values?.tags === typeof []) {
      if (values?.tags?.includes(_tag)) {
        const _tags = values.tags.filter(el => el !== _tag);
        void setFieldValue('tags', _tags, true);
      }
    }
  };
  return (
    <ZIonCol
      sizeXl='5.9'
      sizeLg='5.9'
      sizeMd='5.9'
      sizeSm='12'
      sizeXs='12'
      className='py-2 border zaions__bg_white'>
      <div className='flex pb-2 ion-align-items-center border-bottom ion-padding-start'>
        {/* Icon */}
        <ZIonIcon
          icon={pricetagsOutline}
          size='large'
        />

        {/* Text */}
        <ZIonText className='font-bold ion-no-margin ps-2'>
          Tags
          <ZIonRouterLink
            className='ms-1'
            routerLink={ZaionsRoutes.HomeRoute}>
            (help)
          </ZIonRouterLink>
        </ZIonText>
      </div>

      {/*  */}
      <div className='block px-4 mt-4'>
        <ZIonInput
          aria-label='Tags'
          className='ion-item-start-no-padding'
          name='tags'
          minHeight='40px'
          placeholder='Add tag'
          testingselector={
            CONSTANTS.testingSelectors.shortLink.formPage.tag.tagInput
          }
          onKeyUp={({ currentTarget, key }) => {
            if (
              currentTarget?.value !== undefined &&
              currentTarget?.value !== null &&
              key === 'Enter'
            ) {
              void handleTagSubmit(
                currentTarget?.value?.toString().toLowerCase()
              );
              currentTarget.value = '';
            }
          }}
        />
        <div className='tags'>
          {values.tags !== undefined && values.tags.length > 0
            ? values.tags.map(el => {
                return (
                  <ZIonChip
                    key={el}
                    testingselector={
                      CONSTANTS.testingSelectors.shortLink.formPage.tag
                        .singleTag
                    }
                    onClick={() => {
                      removeTags(el);
                    }}>
                    <ZIonLabel>{el}</ZIonLabel>
                    <ZIonIcon icon={close} />
                  </ZIonChip>
                );
              })
            : ''}
        </div>
      </div>
    </ZIonCol>
  );
};

export default Tags;
