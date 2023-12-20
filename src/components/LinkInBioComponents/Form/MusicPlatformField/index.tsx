// Core Imports
import React, { useEffect } from 'react';

// Packages Imports
import { addOutline, appsOutline } from 'ionicons/icons';
import { type ItemReorderEventDetail } from '@ionic/react';
import { FieldArray, useFormikContext } from 'formik';
import { useRecoilState } from 'recoil';

// Custom Imports
import LinkInBioTitleField from '../TitleField';
import {
  ZIonButton,
  ZIonIcon,
  ZIonItem,
  ZIonReorder,
  ZIonReorderGroup,
  ZIonSpinner
} from '@/components/ZIonComponents';
import LinkInBioLinkField from '../LinkField';
import LinkInBioPDButton from '@/components/LinkInBioComponents/UI/PerDefinedButton';

import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';

// Global constant
import { API_URL_ENUM, ZWSTypeEum } from '@/utils/enums';
import CONSTANTS, { PRODUCT_NAME } from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';
import { predefinedMusicPlatformImages, ZIcons } from '@/utils/ZIcons';

// Types
import {
  cardDisplayEnum,
  type linkInBioBlockCardItemInterface,
  LinkInBioMusicPlatformEnum,
  type LinkInBioPredefinedPlatformInterface,
  type LinkInBioSingleBlockContentType
} from '@/types/AdminPanel/linkInBioType/blockTypes';

// Recoil states
import { LinkInBioPredefinedMusicPlatformRState } from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioBlocksState';
import LinkInBioIconField from '../IconField';
import ZCustomDeleteComponent from '@/components/CustomComponents/ZCustomDeleteComponent';
import { type OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { useParams } from 'react-router';
import {
  _getQueryKey,
  isZNonEmptyString,
  isZNonEmptyStrings
} from '@/utils/helpers';

// Styles

const LinkInBioMusicPlatformCardField: React.FC = () => {
  const { linkInBioId, workspaceId, shareWSMemberId, wsShareId } = useParams<{
    linkInBioId?: string;
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  const { values, handleBlur, handleChange, setFieldValue } =
    useFormikContext<LinkInBioSingleBlockContentType>();

  // Recoil state for storing pre-defined music platform data.
  const [
    linkInBioPredefinedMusicPlatformState,
    setLinkInBioPredefinedMusicPlatformState
  ] = useRecoilState(LinkInBioPredefinedMusicPlatformRState);

  // fetch block data from api and storing it in LinkInBioBlocksData variable...
  const {
    data: LinkInBioPreDefinedMusicPlatformData,
    isFetching: isLibPDMusicPlatformDataFetching
  } = useZRQGetRequest<
    Array<LinkInBioPredefinedPlatformInterface<LinkInBioMusicPlatformEnum>>
  >({
    _url: API_URL_ENUM.linkInBioPreDefinedMusicPlatform_create_list,
    _key: _getQueryKey({
      keys: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS
          .LINK_IN_BIO_PRE_DEFINED_MUSIC_PLATFORM.MAIN
      ]
      // additionalKeys: [workspaceId, wsShareId, shareWSMemberId, linkInBioId]
    }),
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

  // After fetching data and storing it to LinkInBioPreDefinedMusicPlatformData variable, setting data to setLinkInBioPredefinedMusicPlatformState recoil state and making sure that if only the data refetch then again store the lates data in recoil state...
  useEffect(() => {
    try {
      if (
        LinkInBioPreDefinedMusicPlatformData !== undefined &&
        LinkInBioPreDefinedMusicPlatformData !== null
      ) {
        setLinkInBioPredefinedMusicPlatformState(
          LinkInBioPreDefinedMusicPlatformData
        );
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line
  }, [LinkInBioPreDefinedMusicPlatformData]);

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

  const toggleMusicPlatformCardHandler = ({
    _type,
    _title
  }: {
    _type: LinkInBioMusicPlatformEnum;
    _title: string;
  }): void => {
    try {
      if (_type !== undefined) {
        const _updateValue = values.cardItems;

        if (_updateValue !== undefined) {
          const _index = _updateValue?.findIndex(
            item => item.musicCardType === _type
          );

          if (_index !== -1) {
            _updateValue?.splice(_index, 1);
          } else if (_index === -1) {
            const newEntry: linkInBioBlockCardItemInterface = {
              target: {
                url: ''
              },
              musicCardType: LinkInBioMusicPlatformEnum[_type],
              title: `Listen on ${_title}`
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
              <div className='flex flex-wrap w-full gap-2 mb-3 ion-align-items-center'>
                {isLibPDMusicPlatformDataFetching && (
                  <ZIonSpinner className='w-8 h-8 mx-auto my-2' />
                )}
                {!isLibPDMusicPlatformDataFetching &&
                  linkInBioPredefinedMusicPlatformState?.map(el => {
                    const _index = Number(
                      values.cardItems?.findIndex(
                        _el => _el.musicCardType === el.type
                      )
                    );
                    return (
                      <LinkInBioPDButton
                        key={el.id}
                        color={_index > -1 ? 'secondary' : 'light'}
                        icon={
                          el.icon !== undefined && el.icon !== null
                            ? ZIcons[el.icon]
                            : ZIcons.PlaceHolder
                        }
                        testingselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.music.block}-${el.type}`}
                        onClick={() => {
                          toggleMusicPlatformCardHandler({
                            _type: el.type,
                            _title: el.title ?? ''
                          });
                        }}
                      />
                    );
                  })}
              </div>
              {/* <ZIonRow
                testingselector={
                  CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm
                    .fields.music.blocksContainer
                }
                className={classNames({
                  'ion-padding-bottom mb-3 row-gap-1-point-6-rem w-[90%]': true
                })}>
                {linkInBioPredefinedMusicPlatformState?.map(el => {
                  const _index = values.cardItems?.findIndex(
                    _el => _el.musicCardType === el.type
                  ) as number;
                  return (
                    <ZIonCol
                      size='2'
                      key={el.id}
                      className='flex ion-justify-content-start'>
                      <div className='ion-text-center me-3 w-max'>
                        <LinkInBioPDButton
                          color={_index > -1 ? 'secondary' : 'light'}
                          icon={
                            el.icon !== undefined && el.icon !== null
                              ? ZIcons[el.icon]
                              : ZIcons.PlaceHolder
                          }
                          testingselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.music.block}-${el.type}`}
                          onClick={() => {
                            toggleMusicPlatformCardHandler({
                              _type: el.type,
                              _title: el.title as string
                            });
                          }}
                        />
                      </div>
                    </ZIonCol>
                  );
                })}
              </ZIonRow> */}

              <ZIonButton
                expand='block'
                className='ion-text-capitalize'
                testingselector={
                  CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm
                    .fields.music.addBlockBtn
                }
                onClick={() => {
                  push({
                    target: {
                      url: ''
                    },
                    title: 'Title',
                    isActive: true,
                    cardDisplayType: cardDisplayEnum.music,
                    musicCardType: LinkInBioMusicPlatformEnum.default
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
                {values.cardItems?.length !== null &&
                values.cardItems?.length !== undefined
                  ? values.cardItems.map((_cardItem, _index) => {
                      return (
                        <ZIonItem
                          key={_index}
                          lines='none'
                          className='py-3 my-3 border rounded-md shadow-md zaions-linkInBio-block z-ion-bg-transparent'
                          testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.music.cardItem}-${_index}`}
                          testingselector={
                            CONSTANTS.testingSelectors.linkInBio.formPage.design
                              .blockForm.fields.music.cardItem
                          }>
                          <ZIonReorder
                            slot='start'
                            className='ms-1 me-5'>
                            <ZIonIcon
                              icon={appsOutline}
                              color='dark'
                              className='w-6 h-6'
                            />
                          </ZIonReorder>

                          <div className='w-full ps-2'>
                            <LinkInBioTitleField
                              className='mt-1'
                              placeholder='Title'
                              showImageInSlot={true}
                              name={`cardItems.${_index}.title`}
                              onIonChange={handleChange}
                              onIonBlur={handleBlur}
                              testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.music.titleInput}-${_index}`}
                              testingselector={
                                CONSTANTS.testingSelectors.linkInBio.formPage
                                  .design.blockForm.fields.music.titleInput
                              }
                              value={values.cardItems?.[_index].title}
                              slotImageUrl={
                                predefinedMusicPlatformImages[
                                  _cardItem.musicCardType ?? ''
                                ]
                              }
                            />

                            <LinkInBioLinkField
                              className='mt-2'
                              name={`cardItems.${_index}.target.url`}
                              onIonChange={handleChange}
                              onIonBlur={handleBlur}
                              testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.music.linkInput}-${_index}`}
                              testingselector={
                                CONSTANTS.testingSelectors.linkInBio.formPage
                                  .design.blockForm.fields.music.linkInput
                              }
                              value={values.cardItems?.[_index].target?.url}
                              showRefreshBtn={false}
                            />

                            {_cardItem.musicCardType ===
                              LinkInBioMusicPlatformEnum.default && (
                              <LinkInBioIconField
                                className='mt-3'
                                name={`cardItems.${_index}.icon`}
                                onIonChange={handleChange}
                                onIonBlur={handleBlur}
                                testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.music.iconInput}-${_index}`}
                                testingselector={
                                  CONSTANTS.testingSelectors.linkInBio.formPage
                                    .design.blockForm.fields.music.iconInput
                                }
                                value={values.cardItems?.[_index].icon}
                              />
                            )}
                          </div>

                          {/* Delete block button */}
                          <ZCustomDeleteComponent
                            slot='end'
                            iconColor='danger'
                            className='ion-no-padding ms-5 me-1'
                            testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.music.deleteBtn}-${_index}`}
                            testingselector={
                              CONSTANTS.testingSelectors.linkInBio.formPage
                                .design.blockForm.fields.music.deleteBtn
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

export default LinkInBioMusicPlatformCardField;
