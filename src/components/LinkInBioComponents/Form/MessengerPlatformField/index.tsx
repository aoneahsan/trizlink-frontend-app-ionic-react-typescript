// Core Imports
import React, { useEffect } from 'react';

// Packages Imports
import { addOutline, appsOutline } from 'ionicons/icons';
import { type ItemReorderEventDetail } from '@ionic/react';
import { FieldArray, useFormikContext } from 'formik';
import { useRecoilState } from 'recoil';
import classNames from 'classnames';
import { type OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

// Custom Imports
import LinkInBioTitleField from '../TitleField';
import {
  ZIonButton,
  ZIonCol,
  ZIonIcon,
  ZIonItem,
  ZIonReorder,
  ZIonReorderGroup,
  ZIonRow
} from '@/components/ZIonComponents';
import LinkInBioLinkField from '../LinkField';
import LinkInBioPDButton from '@/components/LinkInBioComponents/UI/PerDefinedButton';
import ZRichTextEditor from '@/components/CustomComponents/ZTextEditor';
import LinkInBioPhoneNumberField from '../PhoneNumberField';
import ZCustomDeleteComponent from '@/components/CustomComponents/ZCustomDeleteComponent';
import LinkInBioEmailField from '../EmailField';
import LinkInBioObjectField from '../objectField';

import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';

// Global constant
import { API_URL_ENUM } from '@/utils/enums';
import CONSTANTS, { PRODUCT_NAME } from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';
import { ZIcons } from '@/utils/ZIcons';
import LinkInBioIconField from '../IconField';

// Types
import { messengerPlatformsBlockEnum } from '@/types/AdminPanel/index.type';
import {
  cardDisplayEnum,
  type linkInBioBlockCardItemInterface,
  type LinkInBioPredefinedPlatformInterface,
  type LinkInBioSingleBlockContentType
} from '@/types/AdminPanel/linkInBioType/blockTypes';

// Recoil states
import { LinkInBioPredefinedMessengerPlatformRState } from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioBlocksState';

// Styles

const LinkInBioMessengerPlatformCardField: React.FC = () => {
  const { values, handleBlur, handleChange, setFieldValue } =
    useFormikContext<LinkInBioSingleBlockContentType>();

  // Recoil state for storing pre-defined music platform data.
  const [
    linkInBioPredefinedMessengerPlatformState,
    setLinkInBioPredefinedMessengerPlatformState
  ] = useRecoilState(LinkInBioPredefinedMessengerPlatformRState);

  // fetch block data from api and storing it in LinkInBioBlocksData variable...
  const { data: LinkInBioPreDefinedMessengerPlatformData } = useZRQGetRequest<
    Array<LinkInBioPredefinedPlatformInterface<messengerPlatformsBlockEnum>>
  >({
    _url: API_URL_ENUM.linkInBioPreDefinedMessengerPlatform_create_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS
        .LINK_IN_BIO_PRE_DEFINED_MESSENGER_PLATFORM.MAIN
    ]
  });

  // After fetching data and storing it to LinkInBioPreDefinedMessengerPlatformData variable, setting data to setLinkInBioPredefinedMessengerPlatformState recoil state and making sure that if only the data refetch then again store the lates data in recoil state...
  useEffect(() => {
    try {
      if (
        LinkInBioPreDefinedMessengerPlatformData !== undefined &&
        LinkInBioPreDefinedMessengerPlatformData !== null
      ) {
        setLinkInBioPredefinedMessengerPlatformState(
          LinkInBioPreDefinedMessengerPlatformData
        );
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line
  }, [LinkInBioPreDefinedMessengerPlatformData]);

  // handle reorder function (preview panel)
  const handleMessengerCardReorder = (
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

  const toggleMusicPlatformCardHandler = ({
    _type,
    _title
  }: {
    _type: messengerPlatformsBlockEnum;
    _title: string;
  }): void => {
    try {
      if (_type !== undefined && _type !== null) {
        const _updateValue = values.cardItems;

        if (_updateValue !== undefined) {
          const _index = _updateValue?.findIndex(
            item => item.messengerCardType === _type
          );

          if (_index !== -1) {
            _updateValue?.splice(_index, 1);
          } else if (_index === -1) {
            const newEntry: linkInBioBlockCardItemInterface = {
              target: {
                url: ''
              },
              messengerCardType: messengerPlatformsBlockEnum[_type],
              title: _title
            };

            _updateValue?.push(newEntry);
          }

          void setFieldValue('cardItems', _updateValue, true);

          /**
           * We are setting the title below just to make formik dirty.
           * Why? when we are setting the cardItems up why we need that?
           * what I understand that cardItems is an array an we are setting the value of cardItems to an array again, as we now array is a reference type so it does not change and formik does not get dirty and we also does not see the save button in frontend as save button will show when formik is dirty. for now the way round is to set title field to make formik dirty. we will change this as we find a better solution.
           */
          void setFieldValue(
            'title',
            `${PRODUCT_NAME} music blocks = ${_updateValue.length}`,
            true
          );
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  return (
    <ZIonReorderGroup
      onIonItemReorder={handleMessengerCardReorder}
      disabled={false}>
      <FieldArray name='cardItems'>
        {({ remove, push }) => {
          return (
            <>
              {/* After getting MusicPlatform data from api and storing it to the LinkInBioPredefinedMusicPlatformsRState recoil state, looping the recoil state value to make MusicPlatforms */}
              <ZIonRow
                className={classNames({
                  'ion-padding-bottom mb-3 row-gap-1-point-6-rem w-[90%]': true
                })}>
                {linkInBioPredefinedMessengerPlatformState?.map(el => {
                  const _index = values.cardItems?.findIndex(
                    _el => _el.messengerCardType === el.type
                  ) as number;
                  return (
                    <ZIonCol
                      size='2'
                      key={el.id}
                      className='flex ion-justify-content-start'>
                      <div className='ion-text-center me-3 w-max'>
                        <LinkInBioPDButton
                          icon={
                            el.icon !== null && el.icon !== undefined
                              ? ZIcons[el.icon]
                              : ZIcons.PlaceHolder
                          }
                          testingselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.messenger.block}-${el.type}`}
                          onClick={() => {
                            toggleMusicPlatformCardHandler({
                              _type: el.type,
                              _title: el.title as string
                            });
                          }}
                          color={_index > -1 ? 'secondary' : 'light'}
                        />
                      </div>
                    </ZIonCol>
                  );
                })}
              </ZIonRow>

              <ZIonButton
                expand='block'
                className='ion-text-capitalize'
                testingselector={
                  CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm
                    .fields.messenger.addBlockBtn
                }
                onClick={() => {
                  push({
                    target: {
                      url: ''
                    },
                    title: 'Title',
                    isActive: true,
                    cardDisplayType: cardDisplayEnum.music,
                    messengerCardType: messengerPlatformsBlockEnum.default
                  });
                }}>
                <ZIonIcon
                  icon={addOutline}
                  className='me-1'
                />
                add custom element
              </ZIonButton>
              {values.cardItems?.length !== null &&
              values.cardItems?.length !== undefined
                ? values.cardItems.map((_cardItem, _index) => {
                    return (
                      <ZIonItem
                        key={_index}
                        lines='none'
                        className='pt-2 pb-3 my-4 border zaions-linkInBio-block z-ion-bg-transparent'
                        testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.messenger.cardItem}-${_index}`}
                        testingselector={
                          CONSTANTS.testingSelectors.linkInBio.formPage.design
                            .blockForm.fields.messenger.cardItem
                        }>
                        <ZIonReorder
                          slot='start'
                          className='ms-3 me-2'>
                          <ZIonIcon
                            icon={appsOutline}
                            color='dark'
                            className='w-6 h-6'
                          />
                        </ZIonReorder>

                        <div className='w-full pe-3'>
                          <LinkInBioTitleField
                            placeholder='Title'
                            name={`cardItems.${_index}.title`}
                            onIonChange={handleChange}
                            onIonBlur={handleBlur}
                            testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.messenger.titleInput}-${_index}`}
                            testingselector={
                              CONSTANTS.testingSelectors.linkInBio.formPage
                                .design.blockForm.fields.messenger.titleInput
                            }
                            value={values.cardItems?.[_index].title}
                          />

                          {(_cardItem.messengerCardType ===
                            messengerPlatformsBlockEnum.default ||
                            _cardItem.messengerCardType ===
                              messengerPlatformsBlockEnum.messenger) && (
                            <LinkInBioLinkField
                              className='mt-1'
                              name={`cardItems.${_index}.target.url`}
                              onIonChange={handleChange}
                              onIonBlur={handleBlur}
                              testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.messenger.linkInput}-${_index}`}
                              testingselector={
                                CONSTANTS.testingSelectors.linkInBio.formPage
                                  .design.blockForm.fields.messenger.linkInput
                              }
                              value={values.cardItems?.[_index].target?.url}
                            />
                          )}

                          {_cardItem.messengerCardType ===
                            messengerPlatformsBlockEnum.default && (
                            <LinkInBioIconField
                              className='mt-1'
                              name={`cardItems.${_index}.icon`}
                              onIonChange={handleChange}
                              onIonBlur={handleBlur}
                              testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.messenger.iconInput}-${_index}`}
                              testingselector={
                                CONSTANTS.testingSelectors.linkInBio.formPage
                                  .design.blockForm.fields.messenger.iconInput
                              }
                              value={values.cardItems?.[_index].icon}
                            />
                          )}

                          {_cardItem.messengerCardType ===
                            messengerPlatformsBlockEnum.email && (
                            <LinkInBioEmailField
                              className='mt-1'
                              name={`cardItems.${_index}.email`}
                              onIonChange={handleChange}
                              onIonBlur={handleBlur}
                              testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.messenger.emailInput}-${_index}`}
                              testingselector={
                                CONSTANTS.testingSelectors.linkInBio.formPage
                                  .design.blockForm.fields.messenger.emailInput
                              }
                              value={values.cardItems?.[_index].email}
                            />
                          )}

                          {(_cardItem.messengerCardType ===
                            messengerPlatformsBlockEnum.whatsapp ||
                            _cardItem.messengerCardType ===
                              messengerPlatformsBlockEnum.call ||
                            _cardItem.messengerCardType ===
                              messengerPlatformsBlockEnum.sms) && (
                            <LinkInBioPhoneNumberField
                              name={`cardItems.${_index}.phoneNumber`}
                              onIonChange={handleChange}
                              onIonBlur={handleBlur}
                              className='mt-1'
                              testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.messenger.emailInput}-${_index}`}
                              testingselector={
                                CONSTANTS.testingSelectors.linkInBio.formPage
                                  .design.blockForm.fields.messenger.emailInput
                              }
                              value={values.cardItems?.[_index].phoneNumber}
                            />
                          )}

                          {(_cardItem.messengerCardType ===
                            messengerPlatformsBlockEnum.telegram ||
                            _cardItem.messengerCardType ===
                              messengerPlatformsBlockEnum.skype ||
                            _cardItem.messengerCardType ===
                              messengerPlatformsBlockEnum.wechat ||
                            _cardItem.messengerCardType ===
                              messengerPlatformsBlockEnum.line ||
                            _cardItem.messengerCardType ===
                              messengerPlatformsBlockEnum.viber) && (
                            <LinkInBioTitleField
                              className='mt-1'
                              placeholder='Username'
                              onIonChange={handleChange}
                              onIonBlur={handleBlur}
                              name={`cardItems.${_index}.username`}
                              testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.messenger.usernameInput}-${_index}`}
                              testingselector={
                                CONSTANTS.testingSelectors.linkInBio.formPage
                                  .design.blockForm.fields.messenger
                                  .usernameInput
                              }
                              value={values.cardItems?.[_index].username}
                            />
                          )}

                          {_cardItem.messengerCardType ===
                            messengerPlatformsBlockEnum.email && (
                            <LinkInBioObjectField
                              className='mt-1'
                              onIonChange={handleChange}
                              onIonBlur={handleBlur}
                              name={`cardItems.${_index}.object`}
                              testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.messenger.objectInput}-${_index}`}
                              testingselector={
                                CONSTANTS.testingSelectors.linkInBio.formPage
                                  .design.blockForm.fields.messenger.objectInput
                              }
                              value={values.cardItems?.[_index].object}
                            />
                          )}

                          {(_cardItem.messengerCardType ===
                            messengerPlatformsBlockEnum.email ||
                            _cardItem.messengerCardType ===
                              messengerPlatformsBlockEnum.whatsapp ||
                            _cardItem.messengerCardType ===
                              messengerPlatformsBlockEnum.sms ||
                            _cardItem.messengerCardType ===
                              messengerPlatformsBlockEnum.viber) && (
                            <ZRichTextEditor
                              placeholder='Message'
                              className='pt-2'
                              testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.messenger.textInput}-${_index}`}
                              testingselector={
                                CONSTANTS.testingSelectors.linkInBio.formPage
                                  .design.blockForm.fields.messenger.textInput
                              }
                              onChange={editorState => {
                                void setFieldValue(
                                  `cardItems.${_index}.text`,
                                  editorState,
                                  false
                                );
                              }}
                            />
                          )}
                        </div>

                        {/* Delete block button */}
                        <ZCustomDeleteComponent
                          slot='end'
                          iconColor='danger'
                          className='ion-no-padding me-1 ms-2'
                          testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.messenger.deleteBtn}-${_index}`}
                          testingselector={
                            CONSTANTS.testingSelectors.linkInBio.formPage.design
                              .blockForm.fields.messenger.deleteBtn
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
                      </ZIonItem>
                    );
                  })
                : ''}
            </>
          );
        }}
      </FieldArray>
    </ZIonReorderGroup>
  );
};

export default LinkInBioMessengerPlatformCardField;
