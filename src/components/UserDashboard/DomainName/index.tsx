// Core Imports
import React from 'react';

// Packages Import
import { laptopOutline } from 'ionicons/icons';
import { useRecoilValue } from 'recoil';

// Custom Imports
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonIcon,
  ZIonRouterLink,
  ZIonItem,
  ZIonLabel,
  ZIonInput,
} from 'components/ZIonComponents';

// Global Constants

// Images

// Recoil States
import { DefaultDomainsState } from 'ZaionsStore/UserDashboard/CustomDomainState';

// Types
import { ZaionsShortUrlOptionFieldsValuesInterface } from 'types/AdminPanel/linksType';
import { useFormikContext } from 'formik';
import ZaionsRSelect from 'components/CustomComponents/ZaionsRSelect';
import { formatReactSelectOption } from 'utils/helpers';
import { ZGenericObject } from 'types/zaionsAppSettings.type';
import { ZaionsRSelectOptions } from 'types/components/CustomComponents/index.type';
import ZaionsRoutes from 'utils/constants/RoutesConstants';

// Styles

const DomainName: React.FC = () => {
  const DefaultDomains = useRecoilValue(DefaultDomainsState);
  const { values, handleChange, handleBlur, setFieldValue } =
    useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

  return (
    <>
      <ZIonRow className='border-bottom mt-4 pt-2 zaions__bg_white'>
        <ZIonCol className='px-3 py-3 d-flex align-items-center '>
          <ZIonIcon icon={laptopOutline} size={'large'}></ZIonIcon>
          <ZIonText>
            <h6 className='fw-bold ion-no-margin ion-padding-start'>
              Choose domain name{' '}
              <ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
                (help)
              </ZIonRouterLink>
            </h6>
          </ZIonText>
        </ZIonCol>
      </ZIonRow>
      <ZIonRow className='zaions__bg_white px-3 pt-3 pb-3'>
        <ZIonCol>
          <ZaionsRSelect
            className='ion-padding-top mt-1'
            options={DefaultDomains?.map((el) => {
              return { value: el.id, label: el.name };
            })}
            name='shortUrl.domain'
            onChange={(_value) => {
              setFieldValue(
                'shortUrl.domain',
                (_value as ZaionsRSelectOptions)?.value,
                false
              );
            }}
            value={
              formatReactSelectOption(
                values?.shortUrl?.domain as string,
                DefaultDomains as ZGenericObject[],
                'id',
                'name'
              ) || []
            }
          />
        </ZIonCol>
        <ZIonCol>
          <ZIonItem className=''>
            <ZIonLabel position='floating'>Customize</ZIonLabel>
            <ZIonInput
              name='shortUrl.url'
              onIonChange={handleChange}
              onIonBlur={handleBlur}
              className='p-0'
              value={values.shortUrl.url}
            ></ZIonInput>
          </ZIonItem>
        </ZIonCol>
      </ZIonRow>
    </>
  );
};

export default DomainName;
