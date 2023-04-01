// Core Imports
import React from 'react';

// Packages Import
import {
  documentTextOutline,
  laptopOutline,
  locationOutline,
  megaphoneOutline,
  optionsOutline,
  pricetagOutline,
} from 'ionicons/icons';

// Custom Imports
import {
  ZIonCol,
  ZIonText,
  ZIonIcon,
  ZIonRouterLink,
  ZIonItem,
  ZIonLabel,
  ZIonInput,
  ZIonRow,
  ZIonList,
  ZIonGrid,
} from 'components/ZIonComponents';

// Global Constants
import { formatReactSelectOption } from 'utils/helpers';

// Images

// Recoil States

// Types
import { ZIonButton } from 'components/ZIonComponents';
import { useZRQGetRequest } from 'ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM } from 'utils/enums';
import CONSTANTS from 'utils/constants';
import {
  UTMTagTemplateType,
  ZaionsShortUrlOptionFieldsValuesInterface,
} from 'types/AdminPanel/linksType';
import { useFormikContext } from 'formik';
import ZaionsRSelect from 'components/CustomComponents/ZaionsRSelect';
import { ZaionsRSelectOptions } from 'types/components/CustomComponents/index.type';
import { ZGenericObject } from 'types/zaionsAppSettings.type';
import ZaionsRoutes from 'utils/constants/RoutesConstants';
import { useZIonModal } from 'ZaionsHooks/zionic-hooks';
import ZaionsAddUtmTags from 'components/InPageComponents/ZaionsModals/AddUtmTags';

// Styles

const UTMTagTemplates: React.FC = () => {
  const { data: _UTMTagsData } = useZRQGetRequest<UTMTagTemplateType[]>({
    _url: API_URL_ENUM.userAccountUtmTags_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN],
  });

  const { presentZIonModal: presentUtmTagsModal } =
    useZIonModal(ZaionsAddUtmTags);

  const { values, setFieldValue, handleBlur, handleChange } =
    useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

  const selectFromTemplate = (_selectedTemplateId: string) => {
    const __selectedTemp =
      _UTMTagsData &&
      _UTMTagsData.length &&
      _UTMTagsData.find(({ id }) => id === _selectedTemplateId);

    if (__selectedTemp) {
      const __selectedUtmTagInfo = {
        templateId: __selectedTemp.id,
        utmCampaign: __selectedTemp.utmCampaign,
        utmContent: __selectedTemp.utmContent,
        utmMedium: __selectedTemp.utmMedium,
        utmSource: __selectedTemp.utmSource,
        utmTerm: __selectedTemp.utmTerm,
      };
      setFieldValue('UTMTags', __selectedUtmTagInfo, true);
    }
  };

  return (
    <>
      <ZIonRow className='border-bottom zaions__bg_white mt-4'>
        <ZIonCol className='px-3 py-3 d-flex align-items-center'>
          <ZIonIcon icon={pricetagOutline} size={'large'}></ZIonIcon>
          <ZIonText>
            <h6 className='fw-bold ion-no-margin ion-padding-start'>
              Add UTMs tags{' '}
              <ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
                (help)
              </ZIonRouterLink>
            </h6>
          </ZIonText>
        </ZIonCol>
      </ZIonRow>

      <ZIonRow className='zaions__bg_white'>
        <ZIonCol>
          <ZIonList className='zaions__bg_white pb-0'>
            <ZIonGrid className='pb-0'>
              <ZIonRow className='pb-0'>
                <ZIonCol size='6'>
                  <ZIonItem className='mt-3'>
                    <ZIonLabel
                      position='floating'
                      className='d-flex ion-align-items-center'
                    >
                      <ZIonIcon
                        icon={megaphoneOutline}
                        color={'secondary'}
                        className='me-2'
                      ></ZIonIcon>{' '}
                      <ZIonText>UTM Campaign</ZIonText>
                    </ZIonLabel>
                    <ZIonInput
                      color='dark'
                      type='text'
                      name='UTMTags.utmCampaign'
                      value={values.UTMTags.utmCampaign}
                      placeholder='Enter text'
                      onIonChange={handleChange}
                      onIonBlur={handleBlur}
                    ></ZIonInput>
                  </ZIonItem>
                </ZIonCol>

                <ZIonCol size='6'>
                  <ZIonItem className='mt-3'>
                    <ZIonLabel
                      position='floating'
                      className='d-flex ion-align-items-center'
                    >
                      <ZIonIcon
                        icon={laptopOutline}
                        color={'secondary'}
                        className='me-2'
                      ></ZIonIcon>{' '}
                      <ZIonText>UTM Medium</ZIonText>
                    </ZIonLabel>
                    <ZIonInput
                      color='dark'
                      type='text'
                      placeholder='Enter text'
                      name='UTMTags.utmMedium'
                      value={values.UTMTags.utmMedium}
                      onIonChange={handleChange}
                      onIonBlur={handleBlur}
                    ></ZIonInput>
                  </ZIonItem>
                </ZIonCol>

                <ZIonCol size='6'>
                  <ZIonItem className='mt-3'>
                    <ZIonLabel position='floating'>
                      <ZIonIcon
                        icon={locationOutline}
                        color={'secondary'}
                        className='me-2'
                      ></ZIonIcon>{' '}
                      <ZIonText>UTM Source</ZIonText>
                    </ZIonLabel>
                    <ZIonInput
                      type='text'
                      placeholder='Enter text'
                      name='UTMTags.utmSource'
                      value={values.UTMTags.utmSource}
                      onIonChange={handleChange}
                      onIonBlur={handleBlur}
                    ></ZIonInput>
                  </ZIonItem>
                </ZIonCol>

                <ZIonCol size='6'>
                  <ZIonItem className='mt-3'>
                    <ZIonLabel position='floating'>
                      <ZIonIcon
                        icon={optionsOutline}
                        color={'secondary'}
                        className='me-2'
                      ></ZIonIcon>{' '}
                      <ZIonText>UTM Term</ZIonText>
                    </ZIonLabel>
                    <ZIonInput
                      type='text'
                      placeholder='Enter text'
                      name='UTMTags.utmTerm'
                      value={values.UTMTags.utmTerm}
                      onIonChange={handleChange}
                      onIonBlur={handleBlur}
                    ></ZIonInput>
                  </ZIonItem>
                </ZIonCol>

                <ZIonCol size='6'>
                  <ZIonItem className='mt-3'>
                    <ZIonLabel position='floating'>
                      <ZIonIcon
                        icon={documentTextOutline}
                        color={'secondary'}
                        className='me-2'
                      ></ZIonIcon>{' '}
                      <ZIonText>UTM Content</ZIonText>
                    </ZIonLabel>
                    <ZIonInput
                      type='text'
                      placeholder='Enter text'
                      name='UTMTags.utmContent'
                      value={values.UTMTags.utmContent}
                      onIonChange={handleChange}
                      onIonBlur={handleBlur}
                    ></ZIonInput>
                  </ZIonItem>
                </ZIonCol>

                <ZIonCol size='6' className='d-flex ion-align-items-center'>
                  <ZIonButton
                    fill='clear'
                    className='ion-text-capitalize ion-no-margin ion-margin-start mt-5'
                    size='small'
                    onClick={() => {
                      presentUtmTagsModal({
                        _cssClass: 'utm-tags-modal-size',
                      });
                    }}
                  >
                    Add a new template
                  </ZIonButton>
                </ZIonCol>
              </ZIonRow>
            </ZIonGrid>
          </ZIonList>
          <ZaionsRSelect
            className='pt-4 pb-3 zaions__w50 ps-2'
            options={
              _UTMTagsData?.map((el) => {
                return { value: el.id, label: el.templateName };
              }) as ZaionsRSelectOptions[]
            }
            name='UTMTags.templateId'
            onChange={(_value) => {
              if (_value as ZaionsRSelectOptions) {
                selectFromTemplate(
                  (_value as ZaionsRSelectOptions)?.value as string
                );
              }
            }}
            value={
              formatReactSelectOption(
                values?.UTMTags?.templateId as string,
                _UTMTagsData as ZGenericObject[],
                'id',
                'templateName'
              ) || []
            }
          />
        </ZIonCol>
      </ZIonRow>
    </>
  );
};

export default UTMTagTemplates;
