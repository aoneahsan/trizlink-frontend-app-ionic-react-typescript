// Core Imports
import React from 'react';

// Packages Imports
import { addOutline, appsOutline } from 'ionicons/icons';
import { ItemReorderEventDetail } from '@ionic/react';
import { FieldArray, useFormikContext } from 'formik';

// Custom Imports
import ZTextEditor from '@/components/CustomComponents/ZTextEditor';
import LinkInBioTitleField from '../TitleField';
import {
  ZIonButton,
  ZIonIcon,
  ZIonItem,
  ZIonReorder,
  ZIonReorderGroup,
} from '@/components/ZIonComponents';

// Types
import {
  cardDisplayEnum,
  linkInBioBlockCardItemInterface,
  LinkInBioSingleBlockContentType,
} from '@/types/AdminPanel/linkInBioType/blockTypes';
import ZCustomDeleteComponent from '@/components/CustomComponents/ZCustomDeleteComponent';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { reportCustomError } from '@/utils/customErrorType';

// Styles

const LinkInBioQAndACardField: React.FC = () => {
  // handle reorder function (preview panel)

  const { values, handleBlur, handleChange, setFieldValue } =
    useFormikContext<LinkInBioSingleBlockContentType>();

  const handleCarouselCardReorder = (
    event: CustomEvent<ItemReorderEventDetail>
  ) => {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    // console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

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
        cardDisplayType: cardDisplayEnum.QandA,
      };
    };

  return (
    <>
      <ZIonReorderGroup
        onIonItemReorder={handleCarouselCardReorder}
        disabled={false}
      >
        <FieldArray name='cardItems'>
          {({ remove, push }) => {
            return (
              <>
                <ZIonButton
                  className='ion-text-capitalize'
                  onClick={() => push(getNewCardItemEmptyObjForQAndA)}
                  expand='block'
                >
                  <ZIonIcon icon={addOutline} className='me-1' />
                  add new Q&A
                </ZIonButton>
                {values.cardItems?.length
                  ? values.cardItems.map((_cardItem, _index) => (
                      <ZIonItem
                        className='my-4 zaions-linkInBio-block border py-3'
                        style={{
                          '--background': 'transparent',
                        }}
                        lines='none'
                        key={_index}
                      >
                        <ZIonReorder slot='start' className='ms-3'>
                          <h4 className='ion-no-margin'>
                            <ZIonIcon icon={appsOutline} color='dark' />
                          </h4>
                        </ZIonReorder>

                        <div className='zaions__w100 pe-3'>
                          <LinkInBioTitleField
                            name={`cardItems.${_index}.title`}
                            onIonChange={handleChange}
                            onIonBlur={handleBlur}
                            value={
                              values.cardItems && values.cardItems[_index].title
                            }
                            className='mt-3'
                            placeholder='Question'
                          />

                          <ZTextEditor
                            value={
                              values.cardItems && values.cardItems[_index].text
                            }
                            onChange={(_value) => {
                              setFieldValue(
                                `cardItems.${_index}.text`,
                                _value,
                                false
                              );
                            }}
                            placeholder='Answer'
                            className='mt-3'
                          />
                        </div>

                        {/* Delete block button */}
                        <ZCustomDeleteComponent
                          deleteFn={(detail: OverlayEventDetail<unknown>) => {
                            try {
                              if (detail && detail.role === 'destructive') {
                                void remove(_index);
                              }
                            } catch (error) {
                              reportCustomError(error);
                            }
                          }}
                          className='ion-no-padding me-1'
                          slot='end'
                          iconColor='danger'
                        />
                      </ZIonItem>
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
