// Core Imports
import React from 'react';

// Packages Import
import { alarmOutline } from 'ionicons/icons';
import classNames from 'classnames';
import { useFormikContext } from 'formik';

// Custom Imports
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonIcon,
  ZIonRouterLink,
  ZIonInput,
  ZIonGrid
} from '@/components/ZIonComponents';

// Global Constants
import CONSTANTS from '@/utils/constants';
import { zAddUrlProtocol } from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';

// Images

// Recoil States

// Types
import { type ZaionsShortUrlOptionFieldsValuesInterface } from '@/types/AdminPanel/linksType';
import { ZTimezoneSelector } from '@/components/CustomComponents/ZTimezone';

// Styles

const LinkExpiration: React.FC = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched
  } = useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

  return (
    <>
      <ZIonCol
        sizeXl='5.9'
        sizeLg='5.9'
        sizeMd='5.9'
        sizeSm='12'
        sizeXs='12'
        className='py-3 border zaions__bg_white'>
        <div className='flex pb-2 ion-align-items-center border-bottom ion-padding-start'>
          <ZIonIcon
            icon={alarmOutline}
            size='large'
          />
          <ZIonText className='font-bold ion-no-margin ps-2'>
            Link Expiration
            <ZIonRouterLink
              className='ms-1'
              routerLink={ZaionsRoutes.HomeRoute}>
              (help)
            </ZIonRouterLink>
          </ZIonText>

          <ZRCSwitch
            checkedChildren='on'
            unCheckedChildren='off'
            className='ms-auto me-2'
            checked={values.linkExpiration.enabled}
            testingselector={
              CONSTANTS.testingSelectors.shortLink.formPage.linkExpiration
                .enableBtn
            }
            onChange={value => {
              void setFieldValue('linkExpiration.enabled', value, true);
            }}
          />
        </div>
        {values.linkExpiration.enabled === true ? (
          <ZIonGrid
            className='block px-2 py-0 mt-4'
            testingselector={
              CONSTANTS.testingSelectors.shortLink.formPage.linkExpiration
                .container
            }>
            <ZIonRow className='ion-justify-content-between'>
              {/* expirationDate */}
              <ZIonCol size='5.9'>
                <ZIonInput
                  label='End at:*'
                  labelPlacement='stacked'
                  name='linkExpiration.expirationDate'
                  type='datetime-local'
                  minHeight='40px'
                  onIonChange={handleChange}
                  onIonBlur={handleBlur}
                  value={values.linkExpiration.expirationDate}
                  testingselector={
                    CONSTANTS.testingSelectors.shortLink.formPage.linkExpiration
                      .expirationDateInput
                  }
                />
              </ZIonCol>

              {/* timezone */}

              <ZIonCol size='5.9'>
                <ZTimezoneSelector
                  placeholder='timezone*'
                  name='linkExpiration.timezone'
                  value={values?.linkExpiration?.timezone}
                  onIonChange={handleChange}
                  onIonBlur={handleBlur}
                />
              </ZIonCol>
            </ZIonRow>

            {/* redirectionLink */}
            <ZIonInput
              type='url'
              minHeight='40px'
              label='Redirection Links*'
              labelPlacement='stacked'
              name='linkExpiration.redirectionLink'
              value={values.linkExpiration.redirectionLink}
              testingselector={
                CONSTANTS.testingSelectors.shortLink.formPage.linkExpiration
                  .redirectionLinkInput
              }
              errorText={
                touched.linkExpiration?.redirectionLink === true
                  ? errors.linkExpiration?.redirectionLink
                  : undefined
              }
              onIonBlur={() => {
                void setFieldTouched(
                  'linkExpiration.redirectionLink',
                  true,
                  true
                );
                const inputUrl = values?.linkExpiration?.redirectionLink;
                const formattedUrl = zAddUrlProtocol(inputUrl ?? '');
                void setFieldValue(
                  'linkExpiration.redirectionLink',
                  formattedUrl
                );
              }}
              onIonChange={event => {
                void setFieldValue(
                  'linkExpiration.redirectionLink',
                  event.target.value,
                  true
                );
              }}
              className={classNames({
                'mt-5 mx-auto': true,
                'ion-touched': touched.linkExpiration?.redirectionLink,
                'ion-invalid':
                  touched.linkExpiration?.redirectionLink === true &&
                  errors.linkExpiration?.redirectionLink,
                'ion-valid':
                  touched.linkExpiration?.redirectionLink === true &&
                  (errors.linkExpiration?.redirectionLink !== undefined ||
                    errors.linkExpiration?.redirectionLink !== null)
              })}
            />
          </ZIonGrid>
        ) : (
          <ZIonGrid
            className='mt-2 ion-padding-start'
            testingselector={
              CONSTANTS.testingSelectors.shortLink.formPage.linkExpiration
                .disabledLEText
            }>
            <ZIonText className='text-base'>
              Activate this option to change destination after expiration
              date/time
            </ZIonText>
          </ZIonGrid>
        )}
      </ZIonCol>
    </>
  );
};

export default LinkExpiration;
