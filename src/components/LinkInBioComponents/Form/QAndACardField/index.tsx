// Core Imports
import React from 'react';

// Packages Imports
import { addOutline, appsOutline } from 'ionicons/icons';
import { type ItemReorderEventDetail } from '@ionic/react';
import { FieldArray, useFormikContext } from 'formik';

// Custom Imports
import ZRichTextEditor from '@/components/CustomComponents/ZTextEditor';
import LinkInBioTitleField from '../TitleField';
import {
  ZIonButton,
  ZIonIcon,
  ZIonReorder,
  ZIonReorderGroup
} from '@/components/ZIonComponents';

// Types
import {
  cardDisplayEnum,
  type linkInBioBlockCardItemInterface,
  type LinkInBioSingleBlockContentType
} from '@/types/AdminPanel/linkInBioType/blockTypes';
import ZCustomDeleteComponent from '@/components/CustomComponents/ZCustomDeleteComponent';
import { type OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { reportCustomError } from '@/utils/customErrorType';
import CONSTANTS from '@/utils/constants';

// Styles

const LinkInBioQAndACardField: React.FC = () => {
  // handle reorder function (preview panel)

  const { values, handleBlur, handleChange, setFieldValue } =
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

  const getNewCardItemEmptyObjForQAndA: () => linkInBioBlockCardItemInterface =
    () => {
      return {
        imageUrl: '',
        title: '',
        text: '',
        isActive: true,
        cardDisplayType: cardDisplayEnum.QandA
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
                  onClick={() => {
                    push(getNewCardItemEmptyObjForQAndA);
                  }}
                  testingselector={
                    CONSTANTS.testingSelectors.linkInBio.formPage.design
                      .blockForm.fields.QAndA.addCardBtn
                  }>
                  <ZIonIcon
                    icon={addOutline}
                    className='me-1'
                  />
                  add new Q&A
                </ZIonButton>
                {values.cardItems !== null && values.cardItems !== undefined
                  ? values.cardItems.map((_cardItem, _index) => (
                      <div
                        className='flex px-3 py-3 my-4 border rounded-md shadow-md ion-align-items-center zaions-linkInBio-block z-ion-bg-transparent'
                        key={_index}>
                        {/* <ZIonItem
                          key={_index}
                          lines='none'
                          className='pb-3 my-4 border rounded-md shadow-md zaions-linkInBio-block z-ion-bg-transparent'
                          testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.QAndA.cardItem}-${_index}`}
                          testingselector={
                            CONSTANTS.testingSelectors.linkInBio.formPage.design
                              .blockForm.fields.QAndA.cardItem
                          }> */}
                        <ZIonReorder
                          slot='start'
                          className='me-2'>
                          <ZIonIcon
                            icon={appsOutline}
                            color='dark'
                            className='w-6 h-6'
                          />
                        </ZIonReorder>

                        <div className='w-full'>
                          <LinkInBioTitleField
                            className='mt-3'
                            placeholder='Question'
                            name={`cardItems.${_index}.title`}
                            onIonChange={handleChange}
                            onIonBlur={handleBlur}
                            testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.QAndA.titleInput}-${_index}`}
                            testingselector={
                              CONSTANTS.testingSelectors.linkInBio.formPage
                                .design.blockForm.fields.QAndA.titleInput
                            }
                            value={values.cardItems?.[_index].title}
                          />

                          <ZRichTextEditor
                            placeholder='Answer'
                            className='mt-3'
                            testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.QAndA.textEditor}-${_index}`}
                            testingselector={
                              CONSTANTS.testingSelectors.linkInBio.formPage
                                .design.blockForm.fields.QAndA.textEditor
                            }
                            onChange={editorState => {
                              void setFieldValue(
                                `cardItems.${_index}.text`,
                                editorState,
                                false
                              );
                            }}
                          />
                        </div>

                        {/* Delete block button */}
                        <ZCustomDeleteComponent
                          slot='end'
                          iconColor='danger'
                          className='ion-no-padding ms-2'
                          testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.QAndA.deleteBtn}-${_index}`}
                          testingselector={
                            CONSTANTS.testingSelectors.linkInBio.formPage.design
                              .blockForm.fields.QAndA.deleteBtn
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

export default LinkInBioQAndACardField;
