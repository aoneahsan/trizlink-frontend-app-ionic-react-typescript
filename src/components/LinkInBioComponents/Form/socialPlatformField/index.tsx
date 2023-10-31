// Core Imports
import React, { useEffect } from 'react';

// Packages Imports
import { addOutline, appsOutline } from 'ionicons/icons';
import { type ItemReorderEventDetail } from '@ionic/react';
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
  ZIonRow
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
  type linkInBioBlockCardItemInterface,
  type LinkInBioPredefinedPlatformInterface,
  type LinkInBioSingleBlockContentType,
  LinkInBioSocialPlatformEnum
} from '@/types/AdminPanel/linkInBioType/blockTypes';

// Recoil states
import { LinkInBioPredefinedSocialPlatformRState } from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioBlocksState';
import LinkInBioIconField from '../IconField';
import ZCustomDeleteComponent from '@/components/CustomComponents/ZCustomDeleteComponent';
import { type OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

// Styles

const LinkInBioSocialPlatformCardField: React.FC = () => {
  const { values, handleBlur, handleChange, setFieldValue } =
    useFormikContext<LinkInBioSingleBlockContentType>();

  // Recoil state for storing pre-defined music platform data.
  const [
    linkInBioPredefinedSocialPlatformState,
    setLinkInBioPredefinedSocialPlatformState
  ] = useRecoilState(LinkInBioPredefinedSocialPlatformRState);

  // fetch block data from api and storing it in LinkInBioBlocksData variable...
  const { data: LinkInBioPreDefinedSocialPlatformData } = useZRQGetRequest<
    Array<LinkInBioPredefinedPlatformInterface<LinkInBioSocialPlatformEnum>>
  >({
    _url: API_URL_ENUM.linkInBioPreDefinedSocialPlatform_create_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_PRE_DEFINED_SOCIAL_PLATFORM
        .MAIN
    ]
  });

  // After fetching data and storing it to LinkInBioPreDefinedSocialPlatformData variable, setting data to setLinkInBioPredefinedSocialPlatformState recoil state and making sure that if only the data refetch then again store the lates data in recoil state...
  useEffect(() => {
    try {
      if (
        LinkInBioPreDefinedSocialPlatformData !== null &&
        LinkInBioPreDefinedSocialPlatformData !== undefined
      ) {
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
  ): void => {
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
    _title
  }: {
    _type: LinkInBioSocialPlatformEnum;
    _title: string;
  }): void => {
    try {
      if (_type !== undefined) {
        const _updateValue = values.cardItems;

        if (_updateValue !== undefined) {
          const _index = _updateValue?.findIndex(
            item => item.socialCardType === _type
          );

          if (_index !== -1) {
            _updateValue?.splice(_index, 1);
          } else if (_index === -1) {
            const newEntry: linkInBioBlockCardItemInterface = {
              target: {
                url: ''
              },
              socialCardType: LinkInBioSocialPlatformEnum[_type],
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
    <>
      <FieldArray name='cardItems'>
        {({ remove, push }) => {
          return (
            <>
              {/* After getting MusicPlatform data from api and storing it to the LinkInBioPredefinedMusicPlatformsRState recoil state, looping the recoil state value to make MusicPlatforms */}
              <ZIonRow
                className={classNames({
                  'ion-margin-top pt-2 ion-padding-bottom mb-3 row-gap-1-point-6-rem w-[90%]':
                    true
                })}>
                {linkInBioPredefinedSocialPlatformState?.map(el => {
                  const _index = values.cardItems?.findIndex(
                    _el => _el.socialCardType === el.type
                  ) as number;
                  return (
                    <ZIonCol
                      size='2.4'
                      key={el.id}
                      className='flex ion-justify-content-center'>
                      <div className='ion-text-center me-3 w-max'>
                        <LinkInBioPDButton
                          color={_index > -1 ? 'secondary' : 'light'}
                          icon={
                            el.icon !== undefined && el.icon !== null
                              ? ZIcons[el.icon]
                              : ZIcons.PlaceHolder
                          }
                          testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.socialPlatform.block}-${el.type}`}
                          testingselector={
                            CONSTANTS.testingSelectors.linkInBio.formPage.design
                              .blockForm.fields.socialPlatform.block
                          }
                          onClick={() => {
                            toggleSocialPlatformCardHandler({
                              _type: el.type,
                              _title: el.title as string
                            });
                          }}
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
                    .fields.socialPlatform.addBlockBtn
                }
                onClick={() => {
                  push({
                    target: {
                      url: ''
                    },
                    title: 'Title',
                    isActive: true,
                    cardDisplayType: cardDisplayEnum.social,
                    socialCardType: LinkInBioSocialPlatformEnum.default
                  });
                }}>
                <ZIonIcon
                  icon={addOutline}
                  className='me-1'
                />
                add custom element
              </ZIonButton>

              <ZIonReorderGroup
                onIonItemReorder={handleMusicCardReorder}
                disabled={false}>
                {values.cardItems !== null && values.cardItems !== undefined
                  ? values.cardItems.map((_cardItem, _index) => {
                      return (
                        <ZIonItem
                          key={_index}
                          lines='none'
                          className='py-3 my-4 border zaions-linkInBio-block'
                          testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.socialPlatform.cardItem}-${_index}`}
                          testingselector={
                            CONSTANTS.testingSelectors.linkInBio.formPage.design
                              .blockForm.fields.socialPlatform.cardItem
                          }
                          style={{
                            '--background': 'transparent'
                          }}>
                          <ZIonReorder
                            slot='start'
                            className='ms-3'>
                            <h4 className='ion-no-margin'>
                              <ZIonIcon
                                icon={appsOutline}
                                color='dark'
                              />
                            </h4>
                          </ZIonReorder>

                          <div className='w-full pe-3'>
                            <LinkInBioLinkField
                              showImageInSlot={true}
                              onIonChange={handleChange}
                              onIonBlur={handleBlur}
                              name={`cardItems.${_index}.target.url`}
                              testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.socialPlatform.linkInput}-${_index}`}
                              testingselector={
                                CONSTANTS.testingSelectors.linkInBio.formPage
                                  .design.blockForm.fields.socialPlatform
                                  .linkInput
                              }
                              value={values.cardItems?.[_index].target?.url}
                              slotImageUrl={
                                predefinedSocialImages[
                                  _cardItem.socialCardType as LinkInBioSocialPlatformEnum
                                ]
                              }
                            />

                            {_cardItem.socialCardType ===
                              LinkInBioSocialPlatformEnum.default && (
                              <LinkInBioIconField
                                className='mt-3'
                                onIonChange={handleChange}
                                onIonBlur={handleBlur}
                                name={`cardItems.${_index}.icon`}
                                testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.socialPlatform.iconInput}-${_index}`}
                                testingselector={
                                  CONSTANTS.testingSelectors.linkInBio.formPage
                                    .design.blockForm.fields.socialPlatform
                                    .iconInput
                                }
                                value={values.cardItems?.[_index].icon}
                              />
                            )}
                          </div>

                          {/* Delete block button */}
                          <ZCustomDeleteComponent
                            slot='end'
                            iconColor='danger'
                            className='ion-no-padding me-1'
                            testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.socialPlatform.deleteBtn}-${_index}`}
                            testingselector={
                              CONSTANTS.testingSelectors.linkInBio.formPage
                                .design.blockForm.fields.socialPlatform
                                .deleteBtn
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
              </ZIonReorderGroup>
            </>
          );
        }}
      </FieldArray>
    </>
  );
};

export default LinkInBioSocialPlatformCardField;
