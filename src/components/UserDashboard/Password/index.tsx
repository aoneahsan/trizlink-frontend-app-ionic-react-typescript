// Core Imports
import React from 'react';

// Packages Import
import { lockClosedOutline } from 'ionicons/icons';
import { useFormikContext } from 'formik';
import classNames from 'classnames';

// Custom Imports
import {
  ZIonCol,
  ZIonText,
  ZIonIcon,
  ZIonRouterLink,
  ZIonInput,
  ZIonGrid
} from '@/components/ZIonComponents';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';

// Global Constants
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import CONSTANTS from '@/utils/constants';

// Images

// Recoil States

// Types
import { type ZaionsShortUrlOptionFieldsValuesInterface } from '@/types/AdminPanel/linksType';

// Styles

const LinkPassword: React.FC = () => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();
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
            icon={lockClosedOutline}
            size='large'
          />
          <ZIonText className='font-bold ion-no-margin ps-2'>
            Password
            <ZIonRouterLink
              className='ms-1'
              routerLink={ZaionsRoutes.HomeRoute}>
              (help)
            </ZIonRouterLink>
          </ZIonText>

          <ZRCSwitch
            className='ms-auto me-2'
            defaultChecked={values.password.enabled}
            checkedChildren='on'
            unCheckedChildren='off'
            testingselector={
              CONSTANTS.testingSelectors.shortLink.formPage.password.enableBtn
            }
            onChange={val => {
              void setFieldValue('password.enabled', val, false);
            }}
          />
        </div>
        {values.password.enabled === true ? (
          <ZIonGrid
            className='block px-2 mt-1'
            testingselector={
              CONSTANTS.testingSelectors.shortLink.formPage.password.container
            }>
            <ZIonInput
              label='Password'
              labelPlacement='stacked'
              minHeight='40px'
              name='password.value'
              type='password'
              onIonChange={handleChange}
              onIonBlur={handleBlur}
              value={values.password.value}
              testingselector={
                CONSTANTS.testingSelectors.shortLink.formPage.password.input
              }
              errorText={
                touched.password?.value === true
                  ? errors?.password?.value
                  : undefined
              }
              className={classNames({
                'mt-5': true,
                'ion-touched': touched.password?.value,
                'ion-invalid':
                  touched.password?.value === true && errors.password?.value,
                'ion-valid':
                  touched.password?.value === true &&
                  (errors.password?.value === undefined ||
                    errors.password?.value === null)
              })}
            />
          </ZIonGrid>
        ) : (
          <ZIonGrid
            className='mt-2 ion-padding-start'
            testingselector={
              CONSTANTS.testingSelectors.shortLink.formPage.password
                .disabledPasswordText
            }>
            <ZIonText className='text-base'>
              Activate this option to protect your link with a password
            </ZIonText>
          </ZIonGrid>
        )}
      </ZIonCol>
    </>
  );
};

export default LinkPassword;
