// Core Imports
import React, { useEffect } from 'react';

// Packages Imports
import { addOutline, appsOutline } from 'ionicons/icons';
import { FieldArray, useFormikContext } from 'formik';
import { useRecoilValue, useSetRecoilState } from 'recoil';

// Custom Imports
import {
  ZIonButton,
  ZIonCol,
  ZIonIcon,
  ZIonInput,
  ZIonItem,
  ZIonLabel,
  ZIonReorder,
  ZIonReorderGroup,
  ZIonRow,
  ZIonText,
  ZIonTitle,
} from '@/components/ZIonComponents';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import ZRScrollbars from '@/components/CustomComponents/ZRScrollBar';
import LinkInBioPDButton from '@/components/LinkInBioComponents/UI/PerDefinedButton';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { ItemReorderEventDetail } from '@ionic/react';
import ZCustomDeleteComponent from '@/components/CustomComponents/ZCustomDeleteComponent';
import LinkInBioTitleField from '../TitleField';

import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';

// Global Constants Imports
import { API_URL_ENUM } from '@/utils/enums';
import { predefinedFormFieldsImages, ZIcons } from '@/utils/ZIcons';
import { reportCustomError } from '@/utils/customErrorType';
import CONSTANTS from '@/utils/constants';

// Type
import {
  LinkInBioFormFieldsEnum,
  linkInBioFromFieldItemInterface,
  LinkInBioPredefinedPlatformInterface,
  LinkInBioSingleBlockContentType,
} from '@/types/AdminPanel/linkInBioType/blockTypes';
import { FormikSetFieldValueEventType } from '@/types/ZaionsFormik.type';

// Styles

// Recoil
import { LinkInBioPredefinedFormFieldsRState } from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioBlocksState';
import { linkInBioFormFieldsDefaultData } from '@/data/UserDashboard/LinkInBio/BlockFormFields/index.data';

// Component Type

const LinkInBioFormField: React.FC = () => {
  const { values, handleChange, handleBlur, setFieldValue } =
    useFormikContext<LinkInBioSingleBlockContentType>();

  // Recoil state for storing pre-defined form fields platform data.
  const setLinkInBioPredefinedFormFieldState = useSetRecoilState(
    LinkInBioPredefinedFormFieldsRState
  );

  const { presentZIonModal: presentLinkInBioFormFieldModal } = useZIonModal(
    LinkInBiosFormFieldsModal,
    { setFieldValue, formFieldValue: values.form?.formFields }
  );

  // fetch block data from api and storing it in LinkInBioPreDefinedFormFieldsData variable...
  const { data: LinkInBioPreDefinedFormFieldsData } = useZRQGetRequest<
    LinkInBioPredefinedPlatformInterface<LinkInBioFormFieldsEnum>[]
  >({
    _url: API_URL_ENUM.linkInBioPreDefinedFormFields_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_PRE_FORM_FIELDS.MAIN],
  });

  // After fetching data and storing it to LinkInBioPreDefinedFormFieldsData variable, setting data to setLinkInBioPredefinedFormFieldState recoil state and making sure that if only the data refetch then again store the lates data in recoil state...
  useEffect(() => {
    try {
      if (LinkInBioPreDefinedFormFieldsData) {
        setLinkInBioPredefinedFormFieldState(LinkInBioPreDefinedFormFieldsData);
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line
  }, [LinkInBioPreDefinedFormFieldsData]);

  // handle reorder function (preview panel)
  const handleFormFieldsCardReorder = (
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

  return (
    <>
      <ZIonButton
        className='ion-text-capitalize'
        onClick={() => {
          presentLinkInBioFormFieldModal({
            _cssClass: 'link-in-bio-form-fields-modal-size',
          });
        }}
        expand='block'
      >
        <ZIonIcon icon={addOutline} className='me-1' />
        Add a new field
      </ZIonButton>

      <ZIonReorderGroup
        onIonItemReorder={handleFormFieldsCardReorder}
        disabled={false}
      >
        <FieldArray name='formFields'>
          {({ remove }) => {
            return (
              <>
                {values.form?.formFields?.length
                  ? values.form?.formFields.map((_cardItem, _index) => {
                      return (
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
                            {_cardItem.type ===
                              LinkInBioFormFieldsEnum.title && (
                              <LinkInBioTitleField
                                name={`form.formFields.${_index}.title`}
                                onIonChange={handleChange}
                                onIonBlur={handleBlur}
                                value={
                                  values.form?.formFields &&
                                  values.form?.formFields[_index].title
                                }
                                className='mt-3'
                                placeholder='Title'
                              />
                            )}

                            {_cardItem.type !==
                              LinkInBioFormFieldsEnum.title && (
                              <LinkInBioTitleField
                                name={`form.formFields.${_index}.placeholder`}
                                onIonChange={handleChange}
                                onIonBlur={handleBlur}
                                value={
                                  values.form?.formFields &&
                                  values.form?.formFields[_index].placeholder
                                }
                                className='mt-3'
                                placeholder='placeholder'
                                showImageInSlot={true}
                                slotImageUrl={
                                  predefinedFormFieldsImages[
                                    _cardItem.type as LinkInBioFormFieldsEnum
                                  ]
                                }
                              />
                            )}

                            {_cardItem.type !==
                              LinkInBioFormFieldsEnum.title && (
                              <ZIonItem className='mt-3'>
                                <ZIonLabel position='floating'>
                                  column ID
                                </ZIonLabel>
                                <ZIonInput
                                  name={`form.formFields.${_index}.columnId`}
                                  onIonChange={handleChange}
                                  onIonBlur={handleBlur}
                                  value={
                                    values.form?.formFields &&
                                    values.form?.formFields[_index].columnId
                                  }
                                  placeholder='column ID'
                                />
                              </ZIonItem>
                            )}

                            {_cardItem.type !==
                              LinkInBioFormFieldsEnum.title && (
                              <>
                                <div className='d-flex ion-justify-content-between'>
                                  <>
                                    <ZIonItem
                                      lines='none'
                                      className='mt-3 pt-2 ion-item-start-no-padding'
                                      style={{
                                        '--inner-padding-end': '0',
                                      }}
                                    >
                                      <ZIonText className='fw-bold zaions__fs_13'>
                                        Required
                                      </ZIonText>
                                      <ZRCSwitch
                                        className='me-auto ms-3'
                                        onChange={(value) => {
                                          setFieldValue(
                                            `form.formFields.${_index}.required`,
                                            value,
                                            false
                                          );
                                        }}
                                        checked={
                                          values.form?.formFields &&
                                          values.form?.formFields[_index]
                                            .required
                                        }
                                      />
                                    </ZIonItem>
                                  </>
                                  <>
                                    <ZIonItem
                                      lines='none'
                                      className='mt-3 pt-2 ion-item-start-no-padding'
                                      style={{
                                        '--inner-padding-end': '0',
                                      }}
                                    >
                                      <ZIonText className='fw-bold zaions__fs_13'>
                                        Is Active
                                      </ZIonText>
                                      <ZRCSwitch
                                        className='me-auto ms-3'
                                        onChange={(value) => {
                                          setFieldValue(
                                            `form.formFields.${_index}.isActive`,
                                            value,
                                            false
                                          );
                                        }}
                                        checked={
                                          values.form?.formFields &&
                                          values.form?.formFields[_index]
                                            .isActive
                                        }
                                      />
                                    </ZIonItem>
                                  </>
                                </div>
                              </>
                            )}
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
                      );
                    })
                  : ''}
              </>
            );
          }}
        </FieldArray>
      </ZIonReorderGroup>
    </>
  );
};

//  formFieldValue: linkInBioFromFieldItemInterface[];
const LinkInBiosFormFieldsModal: React.FC<{
  dismissZIonModal: (data?: string, role?: string | undefined) => void;
  setFieldValue: FormikSetFieldValueEventType;
  formFieldValue: linkInBioFromFieldItemInterface[];
}> = ({ dismissZIonModal, setFieldValue, formFieldValue }) => {
  // Recoil state for storing pre-defined form fields platform data.
  const linkInBioPredefinedFormFieldState = useRecoilValue(
    LinkInBioPredefinedFormFieldsRState
  );
  const addNewFormFieldHandler = (type: LinkInBioFormFieldsEnum) => {
    try {
      const _updatedValue = [
        ...formFieldValue,
        linkInBioFormFieldsDefaultData[type],
      ];

      setFieldValue('form.formFields', _updatedValue, false);

      dismissZIonModal();
    } catch (error) {
      reportCustomError(error);
    }
  };
  return (
    <ZRScrollbars style={{ width: '100%', height: '100%' }}>
      <ZIonTitle className='ion-text-center py-3 border-bottom__violet'>
        Add a new field
      </ZIonTitle>
      <ZIonRow className='ion-padding ion-margin-top row-gap-1-rem'>
        {linkInBioPredefinedFormFieldState &&
          linkInBioPredefinedFormFieldState.map((el) => {
            return (
              <ZIonCol
                size='3'
                key={el.id}
                className='d-flex ion-justify-content-center'
              >
                <div className='ion-text-center me-3 zaions__max_content'>
                  <LinkInBioPDButton
                    icon={el.icon ? ZIcons[el.icon] : ZIcons.PlaceHolder}
                    onClick={() => {
                      addNewFormFieldHandler(el.type);
                    }}
                  />
                  <ZIonText color='dark' className='d-block pt-3'>
                    {el.title}
                  </ZIonText>
                </div>
              </ZIonCol>
            );
          })}
      </ZIonRow>
    </ZRScrollbars>
  );
};

export default LinkInBioFormField;
