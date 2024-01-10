/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect } from 'react';
import { useParams } from 'react-router';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import { refreshCircleOutline } from 'ionicons/icons';
import { useRecoilState } from 'recoil';
import {
  type InputChangeEventDetail,
  type IonInputCustomEvent
} from '@ionic/core';
import isURL from 'validator/lib/isURL';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCol,
  ZIonGrid,
  ZIonIcon,
  ZIonInput,
  ZIonRow,
  ZIonSkeletonText,
  ZIonText,
  ZIonTextareaShort
} from '@/components/ZIonComponents';
import ZShortLinkOptionsPopover from '@/components/InPageComponents/ZaionsPopovers/ShortLinkOptionsPopover';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS, { ZaionsBusinessDetails } from '@/utils/constants';
import { API_URL_ENUM, ZWSTypeEum } from '@/utils/enums';
import { reportCustomError } from '@/utils/customErrorType';
import {
  _getQueryKey,
  isZNonEmptyString,
  isZNonEmptyStrings,
  parseZQueryString,
  zAddUrlProtocol
} from '@/utils/helpers';
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import {
  type ShortLinkType,
  type ShortUrlLinkOptionType,
  type ZaionsShortUrlOptionFieldsValuesInterface
} from '@/types/AdminPanel/linksType';
import { messengerPlatformsBlockEnum } from '@/types/AdminPanel/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { NewShortLinkSelectTypeOption } from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkFormState.recoil';
import { LinkTypeOptionsData } from '@/data/UserDashboard/Links';
import ZCPhoneNumberInput from '@/components/CustomComponents/ZPhoneNumberInput';

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZaionsShortUrlOptionFields: React.FC = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched
  } = useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

  const { isLgScale, isMdScale, isSmScale } = useZMediaQueryScale();

  const [newShortLinkTypeOptionDataAtom, setNewShortLinkTypeOptionDataAtom] =
    useRecoilState(NewShortLinkSelectTypeOption);

  // getting current workspace id Or wsShareId & shareWSMemberId form params. if workspaceId then this will be owned-workspace else if wsShareId & shareWSMemberId then this will be share-workspace
  const { editLinkId, workspaceId, wsShareId, shareWSMemberId } = useParams<{
    editLinkId?: string;
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  // fetch the current short link data.
  const { data: selectedShortLink, isFetching: isSelectedShortLinkFetching } =
    useZRQGetRequest<ShortLinkType>({
      _url: API_URL_ENUM.shortLinks_update_delete,
      _key: _getQueryKey({
        keys: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.GET],
        additionalKeys: [workspaceId, wsShareId, shareWSMemberId, editLinkId]
      }),
      _itemsIds: _getQueryKey({
        keys: [
          isZNonEmptyString(workspaceId)
            ? ZWSTypeEum.personalWorkspace
            : isZNonEmptyString(wsShareId) && isZNonEmptyString(shareWSMemberId)
            ? ZWSTypeEum.shareWorkspace
            : ''
        ],
        additionalKeys: [workspaceId, shareWSMemberId, editLinkId]
      }),
      _urlDynamicParts: [
        CONSTANTS.RouteParams.workspace.type,
        CONSTANTS.RouteParams.workspace.workspaceId,
        CONSTANTS.RouteParams.shortLink.shortLinkId
      ],
      _shouldFetchWhenIdPassed: !(
        isZNonEmptyStrings([workspaceId, editLinkId]) ||
        isZNonEmptyStrings([wsShareId, shareWSMemberId, editLinkId])
      ),
      _extractType: ZRQGetRequestExtractEnum.extractItem,
      _showLoader: false
    });

  const { presentZIonPopover: presentShortLinkOptionsPopover } = useZIonPopover(
    ZShortLinkOptionsPopover,
    {
      setFieldValue
    }
  ); // popover hook to show ZShortLinkOptionsPopover

  useEffect(() => {
    try {
      const selectedTypeOptionData = LinkTypeOptionsData.find(
        el => el.type === selectedShortLink?.type
      );

      if (
        selectedShortLink !== undefined &&
        selectedTypeOptionData?.id !== null
      ) {
        setNewShortLinkTypeOptionDataAtom(_ => ({
          // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
          ...(selectedTypeOptionData as ShortUrlLinkOptionType)
        }));
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedShortLink, workspaceId, wsShareId]);

  const ShortLinkPlaceholder = (): string | undefined => {
    if (newShortLinkTypeOptionDataAtom !== null) {
      switch (newShortLinkTypeOptionDataAtom?.type) {
        case messengerPlatformsBlockEnum.link:
          return 'https://yourlink.com';
        case messengerPlatformsBlockEnum.call:
          return 'Phone number (eg +33 6 XX XX XX XX)';

        case messengerPlatformsBlockEnum.whatsapp:
          return 'Phone number (eg +33 6 XX XX XX XX)';

        case messengerPlatformsBlockEnum.sms:
          return 'Phone number (eg +33 6 XX XX XX XX)';

        case messengerPlatformsBlockEnum.email:
          return 'johndoe@gmail.com';

        case messengerPlatformsBlockEnum.messenger:
          return 'Messenger link (https://m/me/zaions.com)';

        case messengerPlatformsBlockEnum.telegram:
          return 'Telegram username (eg: @myId)';

        case messengerPlatformsBlockEnum.skype:
          return 'Skype username';

        case messengerPlatformsBlockEnum.wechat:
          return 'WeChat ID';

        case messengerPlatformsBlockEnum.line:
          return 'Line ID';

        case messengerPlatformsBlockEnum.viber:
          return 'Viber ID';
        default:
          return ZaionsBusinessDetails.WebsiteUrl;
      }
    }
  };

  const linkInputChangeHandler = (
    event: IonInputCustomEvent<InputChangeEventDetail>
  ): void => {
    try {
      handleChange(event);

      if (isURL(event.target.value as string)) {
        const { _queryStringData } = parseZQueryString(
          zAddUrlProtocol(String(event.target.value))
        );

        // utmCampaign
        if (_queryStringData.utm_campaign !== undefined) {
          void setFieldValue(
            'UTMTags.utmCampaign',
            _queryStringData.utm_campaign,
            false
          );
        } else {
          void setFieldValue('UTMTags.utmCampaign', '', false);
        }

        // utmMedium
        if (_queryStringData.utm_medium !== undefined) {
          void setFieldValue(
            'UTMTags.utmMedium',
            _queryStringData.utm_medium,
            false
          );
        } else {
          void setFieldValue('UTMTags.utmMedium', '', false);
        }

        // utmSource
        if (_queryStringData.utm_source !== undefined) {
          void setFieldValue(
            'UTMTags.utmSource',
            _queryStringData.utm_source,
            false
          );
        } else {
          void setFieldValue('UTMTags.utmSource', '', false);
        }

        // utmTerm
        if (_queryStringData.utm_term !== undefined) {
          void setFieldValue(
            'UTMTags.utmTerm',
            _queryStringData.utm_term,
            false
          );
        } else {
          void setFieldValue('UTMTags.utmTerm', '', false);
        }

        // utmContent
        if (_queryStringData.utm_content !== undefined) {
          void setFieldValue(
            'UTMTags.utmContent',
            _queryStringData.utm_content,
            false
          );
        } else {
          void setFieldValue('UTMTags.utmContent', '', false);
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  return (
    <>
      {(isZNonEmptyString(workspaceId) ||
        isZNonEmptyStrings([wsShareId, shareWSMemberId])) &&
        !isSelectedShortLinkFetching && (
          <ZIonGrid
            className={classNames({
              'mt-2': true,
              'mx-3': isLgScale,
              'ms-2 mr-3': !isLgScale
            })}>
            <ZIonRow className='px-4 py-4 rounded zaions__bg_white ion-align-items-center'>
              <ZIonCol
                className={classNames({
                  'flex pt-2 ion-align-items-start': true,
                  'flex-col': !isMdScale
                })}>
                {/* Options Dropdown (messengerPlatformsBlockEnum)  */}
                {newShortLinkTypeOptionDataAtom !== null && (
                  <ZIonButton
                    fill={isMdScale ? 'default' : 'outline'}
                    className={classNames({
                      'flex normal-case ion-no-margin ion-align-items-center ion-justify-content-center':
                        true,
                      'mb-4': !isMdScale,
                      'w-full': !isSmScale
                    })}
                    testingselector={
                      CONSTANTS.testingSelectors.shortLink.formPage
                        .ShortUrlOptionFields.typeBtn
                    }
                    onClick={(event: unknown) => {
                      presentShortLinkOptionsPopover({
                        _event: event as Event,
                        _cssClass: 'short_link_options_popover_size',
                        _dismissOnSelect: false
                      });
                    }}
                    height='39px'>
                    {(newShortLinkTypeOptionDataAtom?.icon?.iconName).length >
                      0 && (
                      <ZIonIcon
                        icon={newShortLinkTypeOptionDataAtom.icon.iconName}
                        size={isMdScale ? 'large' : 'default'}
                        color='primary'
                      />
                    )}
                    <ZIonText
                      className={classNames({
                        'pt-[3px] ms-2 ion-padding-end': true,
                        'text-lg': isMdScale,
                        'text-md': !isMdScale
                      })}
                      color='dark'>
                      <h6 className='font-bold ion-no-margin d-inline'>
                        {newShortLinkTypeOptionDataAtom.text}
                      </h6>
                    </ZIonText>
                  </ZIonButton>
                )}
                {newShortLinkTypeOptionDataAtom === null && (
                  <>Invalid Option Type Selected.</>
                )}

                {/* Link Input */}
                {(newShortLinkTypeOptionDataAtom?.type ===
                  messengerPlatformsBlockEnum.link ||
                  newShortLinkTypeOptionDataAtom?.type ===
                    messengerPlatformsBlockEnum.messenger) && (
                  <>
                    {/* Input of every links */}
                    <ZIonInput
                      label='URL'
                      labelPlacement='stacked'
                      name='target.url'
                      minHeight='40px'
                      type='url'
                      counter={true}
                      onIonChange={linkInputChangeHandler}
                      value={values?.target?.url}
                      placeholder={ShortLinkPlaceholder()}
                      errorText={
                        touched?.target?.url === true
                          ? errors?.target?.url
                          : undefined
                      }
                      testingselector={
                        CONSTANTS.testingSelectors.shortLink.formPage
                          .ShortUrlOptionFields.linkInput
                      }
                      onIonBlur={e => {
                        handleBlur(e);
                        const inputUrl = values?.target?.url;
                        const formattedUrl = zAddUrlProtocol(inputUrl ?? '');
                        void setFieldValue('target.url', formattedUrl);
                      }}
                      className={classNames({
                        'w-full ion-margin-end ': true,
                        'ion-touched': touched?.target?.url,
                        'ion-invalid':
                          touched?.target?.url === true && errors?.target?.url,
                        'ion-valid':
                          touched?.target?.url === true &&
                          (errors?.target?.url === undefined ||
                            errors?.target?.url?.trim()?.length === 0)
                      })}
                    />
                  </>
                )}

                {/* Phone Number Input */}
                {(newShortLinkTypeOptionDataAtom?.type ===
                  messengerPlatformsBlockEnum.whatsapp ||
                  newShortLinkTypeOptionDataAtom?.type ===
                    messengerPlatformsBlockEnum.sms ||
                  newShortLinkTypeOptionDataAtom?.type ===
                    messengerPlatformsBlockEnum.call) && (
                  <>
                    <ZCPhoneNumberInput
                      placeholder={ShortLinkPlaceholder()}
                      value={String(values?.target?.phoneNumber)}
                      touched={touched?.target?.phoneNumber}
                      className={classNames({
                        'w-full ': true
                      })}
                      errorText={
                        touched?.target?.phoneNumber === true
                          ? errors?.target?.phoneNumber
                          : undefined
                      }
                      onChange={_value => {
                        void setFieldValue('target.phoneNumber', _value, true);
                      }}
                      onBlur={() => {
                        void setFieldTouched('target.phoneNumber', true, true);
                      }}
                      testingselector={
                        CONSTANTS.testingSelectors.shortLink.formPage
                          .ShortUrlOptionFields.numberInput
                      }
                    />
                    {/* Input of every Phone Number */}
                  </>
                )}

                {/* Username Input */}
                {(newShortLinkTypeOptionDataAtom?.type ===
                  messengerPlatformsBlockEnum.telegram ||
                  newShortLinkTypeOptionDataAtom?.type ===
                    messengerPlatformsBlockEnum.skype) && (
                  <>
                    {/* Input of every Username */}
                    <ZIonInput
                      label='Username'
                      labelPlacement='stacked'
                      name='target.username'
                      type='text'
                      minHeight='40px'
                      onIonChange={handleChange}
                      onIonBlur={handleBlur}
                      value={values?.target?.username}
                      placeholder={ShortLinkPlaceholder()}
                      testingselector={
                        CONSTANTS.testingSelectors.shortLink.formPage
                          .ShortUrlOptionFields.usernameInput
                      }
                      errorText={
                        touched?.target?.username === true
                          ? errors?.target?.username
                          : undefined
                      }
                      className={classNames({
                        'w-full ion-margin-end': true,
                        'ion-touched': touched?.target?.username,
                        'ion-invalid':
                          touched?.target?.username === true &&
                          errors?.target?.username,
                        'ion-valid':
                          touched?.target?.username === true &&
                          (errors?.target?.username?.trim()?.length === 0 ||
                            errors?.target?.username === undefined)
                      })}
                    />
                  </>
                )}

                {/* Account Id Input */}
                {(newShortLinkTypeOptionDataAtom?.type ===
                  messengerPlatformsBlockEnum.wechat ||
                  newShortLinkTypeOptionDataAtom?.type ===
                    messengerPlatformsBlockEnum.viber ||
                  newShortLinkTypeOptionDataAtom?.type ===
                    messengerPlatformsBlockEnum.line) && (
                  <>
                    {/* Input of every Account Id */}
                    <ZIonInput
                      label='Account Id'
                      labelPlacement='stacked'
                      name='target.accountId'
                      type='text'
                      minHeight='40px'
                      onIonChange={handleChange}
                      onIonBlur={handleBlur}
                      value={values?.target?.accountId}
                      placeholder={ShortLinkPlaceholder()}
                      testingselector={
                        CONSTANTS.testingSelectors.shortLink.formPage
                          .ShortUrlOptionFields.accountIdInput
                      }
                      errorText={
                        touched?.target?.accountId === true
                          ? errors?.target?.accountId
                          : undefined
                      }
                      className={classNames({
                        'w-full ion-margin-end': true,
                        'ion-touched': touched?.target?.accountId,
                        'ion-invalid':
                          touched?.target?.accountId === true &&
                          errors?.target?.accountId,
                        'ion-valid':
                          touched?.target?.accountId === true &&
                          (errors?.target?.accountId?.trim()?.length === 0 ||
                            errors?.target?.accountId === undefined)
                      })}
                    />
                  </>
                )}

                {/* Email Input */}
                {newShortLinkTypeOptionDataAtom?.type ===
                  messengerPlatformsBlockEnum.email && (
                  <>
                    {/* Input of every email */}
                    <ZIonInput
                      label='Email'
                      labelPlacement='stacked'
                      name='target.email'
                      type='email'
                      minHeight='40px'
                      onIonChange={handleChange}
                      onIonBlur={handleBlur}
                      value={values?.target?.email}
                      placeholder={ShortLinkPlaceholder()}
                      errorText={
                        touched?.target?.email === true
                          ? errors?.target?.email
                          : undefined
                      }
                      testingselector={
                        CONSTANTS.testingSelectors.shortLink.formPage
                          .ShortUrlOptionFields.emailInput
                      }
                      className={classNames({
                        'w-full ion-margin-end': true,
                        'ion-touched': touched?.target?.email,
                        'ion-invalid':
                          touched?.target?.email === true &&
                          errors?.target?.email,
                        'ion-valid':
                          touched?.target?.email === true &&
                          (errors?.target?.email?.trim()?.length === 0 ||
                            errors?.target?.email === undefined)
                      })}
                    />
                  </>
                )}

                <ZIonButton
                  height='39px'
                  fill={isMdScale ? 'clear' : 'solid'}
                  testingselector={
                    CONSTANTS.testingSelectors.shortLink.formPage
                      .ShortUrlOptionFields.refreshThePreviewBtn
                  }
                  className={classNames({
                    'ion-no-margin normal-case': true,
                    'mt-3': !isMdScale,
                    'w-full': !isSmScale
                  })}>
                  {!isMdScale && <ZIonText>Refresh the preview</ZIonText>}
                  <ZIonIcon
                    icon={refreshCircleOutline}
                    size='large'
                    color={isMdScale ? 'primary' : 'light'}
                  />
                </ZIonButton>
              </ZIonCol>

              {/*  */}
              <ZIonCol
                size='12'
                className=''>
                {/* Subject Input */}
                {newShortLinkTypeOptionDataAtom?.type ===
                  messengerPlatformsBlockEnum.email && (
                  <ZIonInput
                    label='Subject*'
                    labelPlacement='stacked'
                    placeholder='Something short...'
                    minHeight='40px'
                    name='target.subject'
                    onIonChange={handleChange}
                    onIonBlur={handleBlur}
                    value={values?.target?.subject}
                    errorText={
                      touched?.target?.subject === true
                        ? errors?.target?.subject
                        : undefined
                    }
                    testingselector={
                      CONSTANTS.testingSelectors.shortLink.formPage
                        .ShortUrlOptionFields.subjectInput
                    }
                    className={classNames({
                      'w-full mt-4': true,
                      'ion-touched': touched?.target?.subject,
                      'ion-invalid':
                        touched?.target?.subject === true &&
                        errors?.target?.subject,
                      'ion-valid':
                        touched?.target?.subject === true &&
                        (errors?.target?.subject?.trim()?.length === 0 ||
                          errors?.target?.subject === undefined)
                    })}
                  />
                )}

                {/* Message Textarea */}
                {(newShortLinkTypeOptionDataAtom?.type ===
                  messengerPlatformsBlockEnum.email ||
                  newShortLinkTypeOptionDataAtom?.type ===
                    messengerPlatformsBlockEnum.sms ||
                  newShortLinkTypeOptionDataAtom?.type ===
                    messengerPlatformsBlockEnum.viber ||
                  newShortLinkTypeOptionDataAtom?.type ===
                    messengerPlatformsBlockEnum.whatsapp) && (
                  <ZIonTextareaShort
                    rows={4}
                    name='target.message'
                    placeholder='Message*'
                    fill='outline'
                    onIonChange={handleChange}
                    value={values?.target?.message}
                    testingselector={
                      CONSTANTS.testingSelectors.shortLink.formPage
                        .ShortUrlOptionFields.messageTextarea
                    }
                    errorText={
                      touched?.target?.message === true
                        ? errors?.target?.message
                        : undefined
                    }
                    className={classNames({
                      'w-full ion-margin-end mt-4': true,
                      'ion-touched': touched?.target?.message,
                      'ion-invalid':
                        touched?.target?.message === true &&
                        errors?.target?.message,
                      'ion-valid':
                        touched?.target?.message === true &&
                        (errors?.target?.message?.trim()?.length === 0 ||
                          errors?.target?.message === undefined)
                    })}
                  />
                )}
              </ZIonCol>
            </ZIonRow>
          </ZIonGrid>
        )}

      {(isZNonEmptyString(workspaceId) ||
        isZNonEmptyStrings([wsShareId, shareWSMemberId])) &&
        isSelectedShortLinkFetching && <ZaionsShortUrlOptionFieldsSkeleton />}
    </>
  );
};

const ZaionsShortUrlOptionFieldsSkeleton: React.FC = () => {
  const { isMdScale, isSmScale } = useZMediaQueryScale();
  return (
    <ZIonGrid className='mx-3 mt-2'>
      <ZIonRow className='px-4 py-4 rounded zaions__bg_white ion-align-items-center'>
        <ZIonCol
          className={classNames({
            'flex pt-2 ion-align-items-start': true,
            'flex-col': !isMdScale
          })}>
          <ZIonButton
            fill='default'
            className={classNames({
              'flex normal-case ion-no-margin ion-align-items-center ion-justify-content-center':
                true,
              'mb-4': !isMdScale,
              'w-full': !isSmScale
            })}
            height='39px'>
            <ZIonSkeletonText
              animated={true}
              width='30px'
              height='20px'
            />

            {/*  */}
            <ZIonText className='pt-[3px] ms-2 text-lg ion-padding-end'>
              <ZIonSkeletonText
                animated={true}
                width='60px'
                height='20px'
              />
            </ZIonText>
          </ZIonButton>

          {/* Link Input */}
          <ZIonSkeletonText
            animated={true}
            width='100%'
            height='40px'
          />

          <ZIonButton
            fill='clear'
            className={classNames({
              'ion-no-margin normal-case': true,
              'mt-3': !isMdScale,
              'w-full': !isSmScale
            })}
            height='39px'>
            {!isMdScale && (
              <ZIonText className='me-2'>
                <ZIonSkeletonText
                  animated={true}
                  width='80px'
                  height='17px'
                />
              </ZIonText>
            )}
            <ZIonSkeletonText
              animated={true}
              width={isMdScale ? '25px' : !isMdScale ? '17px' : '25px'}
              height={isMdScale ? '25px' : !isMdScale ? '17px' : '25px'}
            />
          </ZIonButton>
        </ZIonCol>

        {/*  */}
      </ZIonRow>
    </ZIonGrid>
  );
};

export default ZaionsShortUrlOptionFields;
