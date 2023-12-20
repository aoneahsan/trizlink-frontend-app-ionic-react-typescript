// Core Imports
import React, { useEffect } from 'react';

// Packages Imports
import { addOutline, appsOutline, closeOutline } from 'ionicons/icons';
import { FieldArray, useFormikContext } from 'formik';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useParams } from 'react-router';

// Custom Imports
import {
  ZIonButton,
  ZIonCol,
  ZIonContent,
  ZIonIcon,
  ZIonImg,
  ZIonInput,
  ZIonItem,
  ZIonReorder,
  ZIonReorderGroup,
  ZIonRow,
  ZIonSpinner,
  ZIonText
} from '@/components/ZIonComponents';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import LinkInBioPDButton from '@/components/LinkInBioComponents/UI/PerDefinedButton';
import { type OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { type ItemReorderEventDetail } from '@ionic/react';
import ZCustomDeleteComponent from '@/components/CustomComponents/ZCustomDeleteComponent';
import LinkInBioTitleField from '../TitleField';

import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';

// Global Constants Imports
import { API_URL_ENUM, ZWSTypeEum } from '@/utils/enums';
import { predefinedFormFieldsImages, ZIcons } from '@/utils/ZIcons';
import { reportCustomError } from '@/utils/customErrorType';
import CONSTANTS from '@/utils/constants';
import {
  _getQueryKey,
  isZNonEmptyString,
  isZNonEmptyStrings
} from '@/utils/helpers';

// Type
import {
  LinkInBioFormFieldsEnum,
  type linkInBioFromFieldItemInterface,
  type LinkInBioPredefinedPlatformInterface,
  type LinkInBioSingleBlockContentType
} from '@/types/AdminPanel/linkInBioType/blockTypes';
import { type FormikSetFieldValueEventVoidType } from '@/types/ZaionsFormik.type';

// Styles

// Recoil
import { LinkInBioPredefinedFormFieldsRState } from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioBlocksState';
import { linkInBioFormFieldsDefaultData } from '@/data/UserDashboard/LinkInBio/BlockFormFields/index.data';
import { ProductFaviconSmall } from '@/assets/images';

// Component Type

const LinkInBioFormField: React.FC = () => {
  const { linkInBioId, workspaceId, shareWSMemberId, wsShareId } = useParams<{
    linkInBioId?: string;
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();
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
  const {
    data: LinkInBioPreDefinedFormFieldsData,
    isFetching: isLibPDFormFieldsDataFetching
  } = useZRQGetRequest<
    Array<LinkInBioPredefinedPlatformInterface<LinkInBioFormFieldsEnum>>
  >({
    _url: API_URL_ENUM.linkInBioPreDefinedFormFields_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_PRE_FORM_FIELDS.MAIN],
    _itemsIds: _getQueryKey({
      keys: [
        isZNonEmptyString(workspaceId)
          ? ZWSTypeEum.personalWorkspace
          : isZNonEmptyString(wsShareId) && isZNonEmptyString(shareWSMemberId)
          ? ZWSTypeEum.shareWorkspace
          : ''
      ],
      additionalKeys: [workspaceId, shareWSMemberId]
    }),
    _urlDynamicParts: [
      CONSTANTS.RouteParams.workspace.type,
      CONSTANTS.RouteParams.workspace.workspaceId
    ],
    _shouldFetchWhenIdPassed: !(
      isZNonEmptyStrings([workspaceId, linkInBioId]) ||
      isZNonEmptyStrings([wsShareId, shareWSMemberId, linkInBioId])
    )
  });

  // After fetching data and storing it to LinkInBioPreDefinedFormFieldsData variable, setting data to setLinkInBioPredefinedFormFieldState recoil state and making sure that if only the data refetch then again store the lates data in recoil state...
  useEffect(() => {
    try {
      if (
        LinkInBioPreDefinedFormFieldsData !== undefined &&
        LinkInBioPreDefinedFormFieldsData !== null
      ) {
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
  ): void => {
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
      {isLibPDFormFieldsDataFetching && (
        <div className='flex w-full'>
          <ZIonSpinner className='w-8 h-8 mx-auto my-2' />
        </div>
      )}

      {!isLibPDFormFieldsDataFetching && (
        <ZIonButton
          expand='block'
          className='ion-text-capitalize'
          testingselector={
            CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm
              .fields.form.addNewFieldBtn
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
      )}

      <ZIonReorderGroup
        onIonItemReorder={handleFormFieldsCardReorder}
        disabled={false}>
        <FieldArray name='form.formFields'>
          {({ remove }) => {
            return (
              <>
                {values.form?.formFields?.length !== null &&
                values.form?.formFields !== undefined
                  ? values.form?.formFields.map((_cardItem, _index) => {
                      return (
                        <div
                          className='flex px-3 py-3 my-4 border rounded-md shadow-md ion-align-items-start zaions-linkInBio-block z-ion-bg-transparent'
                          key={_index}>
                          {/* <ZIonItem
                            key={_index}
                            lines='none'
                            className='pt-3 my-4 border rounded-md shadow-md zaions-linkInBio-block z-ion-bg-transparent '
                            testinglistselector={
                              CONSTANTS.testingSelectors.linkInBio.formPage
                                .design.blockForm.fields.form.cardItem
                            }
                            testingselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.form.cardItem}-${_index}`}> */}
                          <ZIonReorder
                            slot='start'
                            className='pt-3 me-3 pe-1'>
                            <ZIonIcon
                              icon={appsOutline}
                              color='dark'
                              className='w-6 h-6'
                            />
                          </ZIonReorder>

                          <div className='w-full'>
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
                                value={values.form?.formFields?.[_index].title}
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
                                  values.form?.formFields?.[_index].placeholder
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
                              <div className='pe-4'>
                                <ZIonInput
                                  className='mt-3'
                                  minHeight='38px'
                                  label='Column Id*'
                                  labelPlacement='floating'
                                  name={`form.formFields.${_index}.columnId`}
                                  onIonChange={handleChange}
                                  onIonBlur={handleBlur}
                                  placeholder='column ID'
                                  testinglistselector={
                                    CONSTANTS.testingSelectors.linkInBio
                                      .formPage.design.blockForm.fields.form
                                      .textarea
                                  }
                                  testingselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.form.textarea}-${_index}`}
                                  value={
                                    values.form?.formFields?.[_index].columnId
                                  }
                                />
                              </div>
                            )}
                            {/* </ZIonItem> */}

                            {_cardItem.type !==
                              LinkInBioFormFieldsEnum.title && (
                              <>
                                <div className='flex ion-justify-content-between'>
                                  <ZIonItem
                                    lines='none'
                                    className='ion-item-start-no-padding z-inner-padding-end-0'>
                                    <ZIonText className='text-sm font-bold'>
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
                                        void setFieldValue(
                                          `form.formFields.${_index}.required`,
                                          value,
                                          false
                                        );
                                      }}
                                      checked={
                                        values.form?.formFields !== null &&
                                        values.form?.formFields !== undefined &&
                                        values.form?.formFields[_index]
                                          ?.required
                                      }
                                    />
                                  </ZIonItem>

                                  <ZIonItem
                                    lines='none'
                                    className='ion-item-start-no-padding z-inner-padding-end-0'>
                                    <ZIonText className='text-sm font-bold'>
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
                                        void setFieldValue(
                                          `form.formFields.${_index}.isActive`,
                                          value,
                                          false
                                        );
                                      }}
                                      checked={
                                        values.form?.formFields !== null &&
                                        values.form?.formFields !== undefined &&
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
                            className='pt-1 mt-1 ion-no-padding'
                            testinglistselector={
                              CONSTANTS.testingSelectors.linkInBio.formPage
                                .design.blockForm.fields.form.deleteBtn
                            }
                            testingselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.form.deleteBtn}-${_index}`}
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
  setFieldValue: FormikSetFieldValueEventVoidType;
  formFieldValue: linkInBioFromFieldItemInterface[];
}> = ({ dismissZIonModal, setFieldValue, formFieldValue }) => {
  // Recoil state for storing pre-defined form fields platform data.
  const linkInBioPredefinedFormFieldState = useRecoilValue(
    LinkInBioPredefinedFormFieldsRState
  );
  const addNewFormFieldHandler = (type: LinkInBioFormFieldsEnum): void => {
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
    <>
      <ZIonContent className='ion-padding'>
        <div className='ion-text-end'>
          <ZIonIcon
            icon={closeOutline}
            className='w-6 h-6 cursor-pointer'
            onClick={() => {
              dismissZIonModal();
            }}
          />
        </div>

        <div className='flex flex-col ion-text-center ion-justify-content-center'>
          <div className='flex mx-auto mb-0 rounded-full w-11 h-11 ion-align-items-center ion-justify-content-enter'>
            <ZIonImg
              src={ProductFaviconSmall}
              className='mx-auto w-11 h-11'
            />
          </div>

          <ZIonText
            color='dark'
            className='block mt-3 text-xl font-bold ion-text-center'>
            Add a new field
          </ZIonText>
        </div>
        <ZIonRow className='ion-padding ion-margin-top gap-y-4'>
          {linkInBioPredefinedFormFieldState?.map(el => {
            return (
              <ZIonCol
                size='3'
                key={el.id}
                className='flex ion-justify-content-center'>
                <div className='ion-text-center me-3 w-max'>
                  <LinkInBioPDButton
                    icon={
                      el.icon !== null && el.icon !== undefined
                        ? ZIcons[el.icon]
                        : ZIcons.PlaceHolder
                    }
                    onClick={() => {
                      addNewFormFieldHandler(el.type);
                    }}
                  />
                  <ZIonText
                    color='dark'
                    className='block pt-1'>
                    {el.title}
                  </ZIonText>
                </div>
              </ZIonCol>
            );
          })}
        </ZIonRow>
      </ZIonContent>
    </>
  );
};

export default LinkInBioFormField;
