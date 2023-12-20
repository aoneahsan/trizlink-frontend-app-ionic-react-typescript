// Core Imports
import React from 'react';

// Packages Imports
import { addOutline, appsOutline } from 'ionicons/icons';
import { FieldArray, useFormikContext } from 'formik';
import { type ItemReorderEventDetail } from '@ionic/react';

// Custom Imports
import {
  ZIonButton,
  ZIonIcon,
  ZIonReorder,
  ZIonReorderGroup
} from '@/components/ZIonComponents';
import LinkInBioLinkField from '../LinkField';
import LinkInBioUploadField from '../UploadField';
import LinkInBioTitleField from '../TitleField';
import LinkInBioDescriptionField from '../DescriptionField';

// Types
import {
  cardDisplayEnum,
  type linkInBioBlockCardItemInterface,
  type LinkInBioSingleBlockContentType
} from '@/types/AdminPanel/linkInBioType/blockTypes';
import ZCustomDeleteComponent from '@/components/CustomComponents/ZCustomDeleteComponent';
import { reportCustomError } from '@/utils/customErrorType';
import { type OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import CONSTANTS from '@/utils/constants';

// Styles

const LinkInBioCarouselCardField: React.FC = () => {
  // handle reorder function (preview panel)

  const { values, handleBlur, handleChange } =
    useFormikContext<LinkInBioSingleBlockContentType>();

  const handleCarouselCardReorder = (
    event: CustomEvent<ItemReorderEventDetail>
  ): void => {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    // eslint-disable-next-line
    event.detail.complete();
  };

  const getNewCardItemEmptyObjForCarousel: () => linkInBioBlockCardItemInterface =
    () => {
      return {
        target: {
          url: ''
        },
        imageUrl: '',
        title: '',
        text: '',
        description: '',
        isActive: true,
        cardDisplayType: cardDisplayEnum.carousel
      };
    };

  return (
    <>
      <ZIonReorderGroup
        onIonItemReorder={handleCarouselCardReorder}
        disabled={false}>
        <FieldArray name='cardItems'>
          {({ remove, push }) => {
            return (
              <>
                <ZIonButton
                  expand='block'
                  className='ion-text-capitalize'
                  testingselector={
                    CONSTANTS.testingSelectors.linkInBio.formPage.design
                      .blockForm.fields.carouselCard.addCardBtn
                  }
                  onClick={() => {
                    push(getNewCardItemEmptyObjForCarousel);
                  }}>
                  <ZIonIcon
                    icon={addOutline}
                    className='me-1'
                  />
                  add card
                </ZIonButton>
                {values.cardItems?.length != null
                  ? values.cardItems.map((_cardItem, _index) => (
                      <div
                        className='flex px-3 py-3 my-3 border rounded-md shadow-md zaions-linkInBio-block z-ion-bg-transparent ion-align-items-center'
                        key={_index}>
                        {/* <ZIonItem
                          key={_index}
                          lines='none'
                          className='py-3 my-3 border rounded-md shadow-md zaions-linkInBio-block z-ion-bg-transparent'
                          testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.carouselCard.cardItem}-${_index}`}
                          testingselector={
                            CONSTANTS.testingSelectors.linkInBio.formPage.design
                              .blockForm.fields.carouselCard.cardItem
                          }> */}
                        <ZIonReorder
                          slot='start'
                          className='me-4'>
                          <ZIonIcon
                            icon={appsOutline}
                            color='dark'
                            className='w-6 h-6'
                          />
                        </ZIonReorder>

                        <div className='w-full'>
                          <LinkInBioLinkField
                            name={`cardItems.${_index}.target.url`}
                            onIonChange={handleChange}
                            onIonBlur={handleBlur}
                            testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.carouselCard.linkInput}-${_index}`}
                            testingselector={
                              CONSTANTS.testingSelectors.linkInBio.formPage
                                .design.blockForm.fields.carouselCard.linkInput
                            }
                            value={values.cardItems?.[_index].target?.url}
                          />

                          <LinkInBioUploadField
                            className='mt-2'
                            dropdownHeight='7rem'
                            testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.carouselCard.uploadField}-${_index}`}
                            testingselector={
                              CONSTANTS.testingSelectors.linkInBio.formPage
                                .design.blockForm.fields.carouselCard
                                .uploadField
                            }
                          />

                          <LinkInBioTitleField
                            className='mt-3'
                            name={`cardItems.${_index}.title`}
                            onIonChange={handleChange}
                            onIonBlur={handleBlur}
                            value={values.cardItems?.[_index].title}
                            testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.carouselCard.titleInput}-${_index}`}
                            testingselector={
                              CONSTANTS.testingSelectors.linkInBio.formPage
                                .design.blockForm.fields.carouselCard.titleInput
                            }
                          />

                          <LinkInBioDescriptionField
                            className='mt-2  max-w-[100%]'
                            showIconInSlot={false}
                            name={`cardItems.${_index}.description`}
                            onIonChange={handleChange}
                            onIonBlur={handleBlur}
                            value={values.cardItems?.[_index].description}
                            testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.carouselCard.description}-${_index}`}
                            testingselector={
                              CONSTANTS.testingSelectors.linkInBio.formPage
                                .design.blockForm.fields.carouselCard
                                .description
                            }
                          />
                        </div>

                        {/* Delete block button */}
                        <ZCustomDeleteComponent
                          slot='end'
                          iconColor='danger'
                          className='ion-no-padding'
                          testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.carouselCard.deleteBtn}-${_index}`}
                          testingselector={
                            CONSTANTS.testingSelectors.linkInBio.formPage.design
                              .blockForm.fields.carouselCard.deleteBtn
                          }
                          deleteFn={(detail: OverlayEventDetail<unknown>) => {
                            try {
                              if (detail?.role === 'destructive') {
                                void remove(_index);
                              }
                            } catch (error) {
                              reportCustomError(error);
                            }
                          }}
                        />
                        {/* </ZIonItem> */}
                      </div>
                    ))
                  : ''}
              </>
            );
          }}
        </FieldArray>
      </ZIonReorderGroup>
    </>
  );
};

export default LinkInBioCarouselCardField;
