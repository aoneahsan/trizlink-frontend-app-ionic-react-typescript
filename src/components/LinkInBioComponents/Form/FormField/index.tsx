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
  ZIonReorder,
  ZIonReorderGroup,
  ZIonRow,
  ZIonText,
  ZIonTextareaShort,
  ZIonTitle
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
  LinkInBioSingleBlockContentType
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
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_PRE_FORM_FIELDS.MAIN]
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

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    // eslint-disable-next-line
    event.detail.complete();
  };

  return (
    <>
      <ZIonButton
        expand='block'
        className='ion-text-capitalize'
        testingselector={
          CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields
            .form.addNewFieldBtn
        }
        onClick={() => {
          presentLinkInBioFormFieldModal({
            _cssClass: 'link-in-bio-form-fields-modal-size'
          });
        }}>
        <ZIonIcon
          icon={addOutline}
          className='me-1'
        />
        Add a new field
      </ZIonButton>

      <ZIonReorderGroup
        onIonItemReorder={handleFormFieldsCardReorder}
        disabled={false}>
        <FieldArray name='formFields'>
          {({ remove }) => {
            return (
              <>
                {values.form?.formFields?.length
                  ? values.form?.formFields.map((_cardItem, _index) => {
                      return (
                        <ZIonItem
                          key={_index}
                          lines='none'
                          className='pt-3 my-4 border zaions-linkInBio-block'
                          testinglistselector={
                            CONSTANTS.testingSelectors.linkInBio.formPage.design
                              .blockForm.fields.form.cardItem
                          }
                          testingselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.form.cardItem}-${_index}`}
                          style={{
                            '--background': 'transparent'
                          }}>
                          <ZIonReorder
                            slot='start'
                            className='ms-3 me-2'>
                            <ZIonIcon
                              icon={appsOutline}
                              color='dark'
                              className='w-6 h-6'
                            />
                          </ZIonReorder>

                          <div className='w-full pe-2'>
                            {_cardItem.type ===
                              LinkInBioFormFieldsEnum.title && (
                              <LinkInBioTitleField
                                placeholder='Title'
                                name={`form.formFields.${_index}.title`}
                                onIonChange={handleChange}
                                onIonBlur={handleBlur}
                                testinglistselector={
                                  CONSTANTS.testingSelectors.linkInBio.formPage
                                    .design.blockForm.fields.form.titleInput
                                }
                                testingselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.form.titleInput}-${_index}`}
                                value={
                                  values.form?.formFields &&
                                  values.form?.formFields[_index].title
                                }
                              />
                            )}

                            {_cardItem.type !==
                              LinkInBioFormFieldsEnum.title && (
                              <LinkInBioTitleField
                                className='mt-1'
                                placeholder='placeholder'
                                showImageInSlot={true}
                                onIonChange={handleChange}
                                onIonBlur={handleBlur}
                                name={`form.formFields.${_index}.placeholder`}
                                testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.form.titleInput}-2`}
                                testingselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.form.titleInput}-2-${_index}`}
                                value={
                                  values.form?.formFields &&
                                  values.form?.formFields[_index].placeholder
                                }
                                slotImageUrl={
                                  predefinedFormFieldsImages[
                                    _cardItem.type as LinkInBioFormFieldsEnum
                                  ]
                                }
                              />
                            )}

                            {_cardItem.type !==
                              LinkInBioFormFieldsEnum.title && (
                              // <ZIonItem className='mt-1' lines='none'>
                              <ZIonTextareaShort
                                fill='outline'
                                className='px-4 mt-3'
                                label='Column Id*'
                                labelPlacement='floating'
                                name={`form.formFields.${_index}.columnId`}
                                onIonChange={handleChange}
                                onIonBlur={handleBlur}
                                placeholder='column ID'
                                style={{ '--padding-start': '16px' }}
                                testinglistselector={
                                  CONSTANTS.testingSelectors.linkInBio.formPage
                                    .design.blockForm.fields.form.textarea
                                }
                                testingselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.form.textarea}-${_index}`}
                                value={
                                  values.form?.formFields &&
                                  values.form?.formFields[_index].columnId
                                }
                              />
                            )}
                            {/* </ZIonItem> */}

                            {_cardItem.type !==
                              LinkInBioFormFieldsEnum.title && (
                              <>
                                <div className='flex ion-justify-content-between'>
                                  <ZIonItem
                                    lines='none'
                                    className='ion-item-start-no-padding'
                                    style={{
                                      '--inner-padding-end': '0'
                                    }}>
                                    <ZIonText className='font-bold text-sm'>
                                      Required
                                    </ZIonText>
                                    <ZRCSwitch
                                      className='me-auto ms-3'
                                      testinglistselector={
                                        CONSTANTS.testingSelectors.linkInBio
                                          .formPage.design.blockForm.fields.form
                                          .requiredSwitcher
                                      }
                                      testingselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.form.requiredSwitcher}-${_index}`}
                                      onChange={value => {
                                        setFieldValue(
                                          `form.formFields.${_index}.required`,
                                          value,
                                          false
                                        );
                                      }}
                                      checked={
                                        values.form?.formFields &&
                                        values.form?.formFields[_index].required
                                      }
                                    />
                                  </ZIonItem>

                                  <ZIonItem
                                    lines='none'
                                    className='ion-item-start-no-padding'
                                    style={{
                                      '--inner-padding-end': '0'
                                    }}>
                                    <ZIonText className='font-bold text-sm'>
                                      Is Active
                                    </ZIonText>
                                    <ZRCSwitch
                                      className='me-auto ms-3'
                                      testinglistselector={
                                        CONSTANTS.testingSelectors.linkInBio
                                          .formPage.design.blockForm.fields.form
                                          .activeSwitcher
                                      }
                                      testingselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.form.activeSwitcher}-${_index}`}
                                      onChange={value => {
                                        setFieldValue(
                                          `form.formFields.${_index}.isActive`,
                                          value,
                                          false
                                        );
                                      }}
                                      checked={
                                        values.form?.formFields &&
                                        values.form?.formFields[_index].isActive
                                      }
                                    />
                                  </ZIonItem>
                                </div>
                              </>
                            )}
                          </div>

                          {/* Delete block button */}
                          <ZCustomDeleteComponent
                            slot='end'
                            iconColor='danger'
                            className='ion-no-padding me-1 ms-1'
                            testinglistselector={
                              CONSTANTS.testingSelectors.linkInBio.formPage
                                .design.blockForm.fields.form.deleteBtn
                            }
                            testingselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.form.deleteBtn}-${_index}`}
                            deleteFn={(detail: OverlayEventDetail<unknown>) => {
                              try {
                                if (detail && detail.role === 'destructive') {
                                  void remove(_index);
                                }
                              } catch (error) {
                                reportCustomError(error);
                              }
                            }}
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
        linkInBioFormFieldsDefaultData[type]
      ];

      setFieldValue('form.formFields', _updatedValue, false);

      dismissZIonModal();
    } catch (error) {
      reportCustomError(error);
    }
  };
  return (
    <ZRScrollbars style={{ width: '100%', height: '100%' }}>
      <ZIonTitle className='py-3 ion-text-center border-bottom__violet'>
        Add a new field
      </ZIonTitle>
      <ZIonRow className='ion-padding ion-margin-top gap-y-4'>
        {linkInBioPredefinedFormFieldState &&
          linkInBioPredefinedFormFieldState.map(el => {
            return (
              <ZIonCol
                size='3'
                key={el.id}
                className='flex ion-justify-content-center'>
                <div className='ion-text-center me-3 w-max'>
                  <LinkInBioPDButton
                    icon={el.icon ? ZIcons[el.icon] : ZIcons.PlaceHolder}
                    onClick={() => {
                      addNewFormFieldHandler(el.type);
                    }}
                  />
                  <ZIonText
                    color='dark'
                    className='block pt-3'>
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
