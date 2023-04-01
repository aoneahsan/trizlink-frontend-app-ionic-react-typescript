// Core Imports
import React, { useEffect } from 'react';

// Packages Imports
import { addOutline, appsOutline } from 'ionicons/icons';
import { ItemReorderEventDetail } from '@ionic/react';
import { FieldArray, useFormikContext } from 'formik';
import { useRecoilState } from 'recoil';
import classNames from 'classnames';

// Custom Imports
import LinkInBioTitleField from '../TitleField';
import {
  ZIonButton,
  ZIonCol,
  ZIonIcon,
  ZIonItem,
  ZIonReorder,
  ZIonReorderGroup,
  ZIonRow,
} from '@/components/ZIonComponents';
import LinkInBioLinkField from '../LinkField';
import LinkInBioPDButton from '@/components/LinkInBioComponents/UI/PerDefinedButton';

import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';

// Global constant
import { API_URL_ENUM } from '@/utils/enums';
import CONSTANTS, { PRODUCT_NAME } from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';
import { ZIcons } from '@/utils/ZIcons';

// Types
import {
  cardDisplayEnum,
  linkInBioBlockCardItemInterface,
  LinkInBioPredefinedPlatformInterface,
  LinkInBioSingleBlockContentType,
} from '@/types/AdminPanel/linkInBioType/blockTypes';

// Recoil states
import { LinkInBioPredefinedMessengerPlatformRState } from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioBlocksState';
import LinkInBioIconField from '../IconField';
import { messengerPlatformsBlockEnum } from '@/types/AdminPanel/index.type';
import LinkInBioEmailField from '../EmailField';
import LinkInBioObjectField from '../objectField';
import ZTextEditor from '@/components/CustomComponents/ZTextEditor';
import LinkInBioPhoneNumberField from '../PhoneNumberField';
import ZCustomDeleteComponent from '@/components/CustomComponents/ZCustomDeleteComponent';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

// Styles

const LinkInBioMessengerPlatformCardField: React.FC = () => {
  const { values, handleBlur, handleChange, setFieldValue } =
    useFormikContext<LinkInBioSingleBlockContentType>();

  // Recoil state for storing pre-defined music platform data.
  const [
    linkInBioPredefinedMessengerPlatformState,
    setLinkInBioPredefinedMessengerPlatformState,
  ] = useRecoilState(LinkInBioPredefinedMessengerPlatformRState);

  // fetch block data from api and storing it in LinkInBioBlocksData variable...
  const { data: LinkInBioPreDefinedMessengerPlatformData } = useZRQGetRequest<
    LinkInBioPredefinedPlatformInterface<messengerPlatformsBlockEnum>[]
  >({
    _url: API_URL_ENUM.linkInBioPreDefinedMessengerPlatform_create_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS
        .LINK_IN_BIO_PRE_DEFINED_MESSENGER_PLATFORM.MAIN,
    ],
  });

  // After fetching data and storing it to LinkInBioPreDefinedMessengerPlatformData variable, setting data to setLinkInBioPredefinedMessengerPlatformState recoil state and making sure that if only the data refetch then again store the lates data in recoil state...
  useEffect(() => {
    try {
      if (LinkInBioPreDefinedMessengerPlatformData) {
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

  const toggleMusicPlatformCardHandler = ({
    _type,
    _title,
  }: {
    _type: messengerPlatformsBlockEnum;
    _title: string;
  }) => {
    try {
      if (_type) {
        const _updateValue = values.cardItems;

        if (_updateValue) {
          const _index = _updateValue?.findIndex(
            (item) => item.messengerCardType === _type
          );

          if (_index !== -1) {
            _updateValue?.splice(_index, 1);
          } else if (_index === -1) {
            const newEntry: linkInBioBlockCardItemInterface = {
              target: {
                url: '',
              },
              messengerCardType: messengerPlatformsBlockEnum[_type],
              title: _title,
            };

            _updateValue?.push(newEntry);
          }

          setFieldValue('cardItems', _updateValue, true);

          /**
           * We are setting the title below just to make formik dirty.
           * Why? when we are setting the cardItems up why we need that?
           * what I understand that cardItems is an array an we are setting the value of cardItems to an array again, as we now array is a reference type so it does not change and formik does not get dirty and we also does not see the save button in frontend as save button will show when formik is dirty. for now the way round is to set title field to make formik dirty. we will change this as we find a better solution.
           */
          setFieldValue(
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
      disabled={false}
    >
      <FieldArray name='cardItems'>
        {({ remove, push }) => {
          return (
            <>
              {/* After getting MusicPlatform data from api and storing it to the LinkInBioPredefinedMusicPlatformsRState recoil state, looping the recoil state value to make MusicPlatforms */}
              <ZIonRow
                className={classNames({
                  'ion-margin-top pt-2 ion-padding-bottom mb-3 row-gap-1-point-6-rem zaions__w90':
                    true,
                })}
              >
                {linkInBioPredefinedMessengerPlatformState?.map((el) => {
                  const _index = values.cardItems?.findIndex(
                    (_el) => _el.messengerCardType === el.type
                  ) as number;
                  return (
                    <ZIonCol
                      size='2.4'
                      key={el.id}
                      className='d-flex ion-justify-content-center'
                    >
                      <div className='ion-text-center me-3 zaions__max_content'>
                        <LinkInBioPDButton
                          icon={el.icon ? ZIcons[el.icon] : ZIcons.PlaceHolder}
                          onClick={() => {
                            toggleMusicPlatformCardHandler({
                              _type: el.type,
                              _title: el.title as string,
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
                className='ion-text-capitalize'
                onClick={() =>
                  push({
                    target: {
                      url: '',
                    },
                    title: 'Title',
                    isActive: true,
                    cardDisplayType: cardDisplayEnum.music,
                    messengerCardType: messengerPlatformsBlockEnum.default,
                  })
                }
                expand='block'
              >
                <ZIonIcon icon={addOutline} className='me-1' />
                add custom element
              </ZIonButton>
              {values.cardItems?.length
                ? values.cardItems.map((_cardItem, _index) => {
                    console.log(_cardItem);
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
                          <LinkInBioTitleField
                            name={`cardItems.${_index}.title`}
                            onIonChange={handleChange}
                            onIonBlur={handleBlur}
                            value={
                              values.cardItems && values.cardItems[_index].title
                            }
                            className='mt-3'
                            placeholder='Title'
                          />

                          {(_cardItem.messengerCardType ===
                            messengerPlatformsBlockEnum.default ||
                            _cardItem.messengerCardType ===
                              messengerPlatformsBlockEnum.messenger) && (
                            <LinkInBioLinkField
                              name={`cardItems.${_index}.target.url`}
                              onIonChange={handleChange}
                              onIonBlur={handleBlur}
                              value={
                                values.cardItems &&
                                values.cardItems[_index].target?.url
                              }
                              className='mt-3'
                            />
                          )}

                          {_cardItem.messengerCardType ===
                            messengerPlatformsBlockEnum.default && (
                            <LinkInBioIconField
                              name={`cardItems.${_index}.icon`}
                              onIonChange={handleChange}
                              onIonBlur={handleBlur}
                              value={
                                values.cardItems &&
                                values.cardItems[_index].icon
                              }
                              className='mt-3'
                            />
                          )}

                          {_cardItem.messengerCardType ===
                            messengerPlatformsBlockEnum.email && (
                            <LinkInBioEmailField
                              name={`cardItems.${_index}.email`}
                              onIonChange={handleChange}
                              onIonBlur={handleBlur}
                              value={
                                values.cardItems &&
                                values.cardItems[_index].email
                              }
                              className='mt-3'
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
                              value={
                                values.cardItems &&
                                values.cardItems[_index].phoneNumber
                              }
                              className='mt-3'
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
                              name={`cardItems.${_index}.username`}
                              onIonChange={handleChange}
                              onIonBlur={handleBlur}
                              value={
                                values.cardItems &&
                                values.cardItems[_index].username
                              }
                              className='mt-3'
                              placeholder='Username'
                            />
                          )}

                          {_cardItem.messengerCardType ===
                            messengerPlatformsBlockEnum.email && (
                            <LinkInBioObjectField
                              name={`cardItems.${_index}.object`}
                              onIonChange={handleChange}
                              onIonBlur={handleBlur}
                              value={
                                values.cardItems &&
                                values.cardItems[_index].object
                              }
                              className='mt-3'
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
                            <ZTextEditor
                              value={
                                values.cardItems &&
                                values.cardItems[_index].text
                              }
                              onChange={(_value) => {
                                setFieldValue(
                                  `cardItems.${_index}.text`,
                                  _value,
                                  false
                                );
                              }}
                              placeholder='Message'
                              className='mt-3 pt-3'
                            />
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
  );
};

export default LinkInBioMessengerPlatformCardField;
