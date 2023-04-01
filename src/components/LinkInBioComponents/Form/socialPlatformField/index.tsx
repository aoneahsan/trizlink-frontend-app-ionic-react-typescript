// Core Imports
import React, { useEffect } from 'react';

// Packages Imports
import { addOutline, appsOutline } from 'ionicons/icons';
import { ItemReorderEventDetail } from '@ionic/react';
import { FieldArray, useFormikContext } from 'formik';
import { useRecoilState } from 'recoil';
import classNames from 'classnames';

// Custom Imports
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
import { predefinedSocialImages, ZIcons } from '@/utils/ZIcons';

// Types
import {
  cardDisplayEnum,
  linkInBioBlockCardItemInterface,
  LinkInBioPredefinedPlatformInterface,
  LinkInBioSingleBlockContentType,
  LinkInBioSocialPlatformEnum,
} from '@/types/AdminPanel/linkInBioType/blockTypes';

// Recoil states
import { LinkInBioPredefinedSocialPlatformRState } from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioBlocksState';
import LinkInBioIconField from '../IconField';
import ZCustomDeleteComponent from '@/components/CustomComponents/ZCustomDeleteComponent';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

// Styles

const LinkInBioSocialPlatformCardField: React.FC = () => {
  const { values, handleBlur, handleChange, setFieldValue } =
    useFormikContext<LinkInBioSingleBlockContentType>();

  // Recoil state for storing pre-defined music platform data.
  const [
    linkInBioPredefinedSocialPlatformState,
    setLinkInBioPredefinedSocialPlatformState,
  ] = useRecoilState(LinkInBioPredefinedSocialPlatformRState);

  // fetch block data from api and storing it in LinkInBioBlocksData variable...
  const { data: LinkInBioPreDefinedSocialPlatformData } = useZRQGetRequest<
    LinkInBioPredefinedPlatformInterface<LinkInBioSocialPlatformEnum>[]
  >({
    _url: API_URL_ENUM.linkInBioPreDefinedSocialPlatform_create_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_PRE_DEFINED_SOCIAL_PLATFORM
        .MAIN,
    ],
  });

  // After fetching data and storing it to LinkInBioPreDefinedSocialPlatformData variable, setting data to setLinkInBioPredefinedSocialPlatformState recoil state and making sure that if only the data refetch then again store the lates data in recoil state...
  useEffect(() => {
    try {
      if (LinkInBioPreDefinedSocialPlatformData) {
        setLinkInBioPredefinedSocialPlatformState(
          LinkInBioPreDefinedSocialPlatformData
        );
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line
  }, [LinkInBioPreDefinedSocialPlatformData]);

  // handle reorder function (preview panel)
  const handleMusicCardReorder = (
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

  const toggleSocialPlatformCardHandler = ({
    _type,
    _title,
  }: {
    _type: LinkInBioSocialPlatformEnum;
    _title: string;
  }) => {
    try {
      if (_type) {
        const _updateValue = values.cardItems;

        if (_updateValue) {
          const _index = _updateValue?.findIndex(
            (item) => item.socialCardType === _type
          );

          if (_index !== -1) {
            _updateValue?.splice(_index, 1);
          } else if (_index === -1) {
            const newEntry: linkInBioBlockCardItemInterface = {
              target: {
                url: '',
              },
              socialCardType: LinkInBioSocialPlatformEnum[_type],
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
    <>
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
                {linkInBioPredefinedSocialPlatformState?.map((el) => {
                  const _index = values.cardItems?.findIndex(
                    (_el) => _el.socialCardType === el.type
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
                            toggleSocialPlatformCardHandler({
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
                    cardDisplayType: cardDisplayEnum.social,
                    socialCardType: LinkInBioSocialPlatformEnum.default,
                  })
                }
                expand='block'
              >
                <ZIonIcon icon={addOutline} className='me-1' />
                add custom element
              </ZIonButton>

              <ZIonReorderGroup
                onIonItemReorder={handleMusicCardReorder}
                disabled={false}
              >
                {values.cardItems?.length
                  ? values.cardItems.map((_cardItem, _index) => {
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
                            <LinkInBioLinkField
                              name={`cardItems.${_index}.target.url`}
                              onIonChange={handleChange}
                              onIonBlur={handleBlur}
                              value={
                                values.cardItems &&
                                values.cardItems[_index].target?.url
                              }
                              showImageInSlot={true}
                              slotImageUrl={
                                predefinedSocialImages[
                                  _cardItem.socialCardType as LinkInBioSocialPlatformEnum
                                ]
                              }
                            />

                            {_cardItem.socialCardType ===
                              LinkInBioSocialPlatformEnum.default && (
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
              </ZIonReorderGroup>
            </>
          );
        }}
      </FieldArray>
    </>
  );
};

export default LinkInBioSocialPlatformCardField;
