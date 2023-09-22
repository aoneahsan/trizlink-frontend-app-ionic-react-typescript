// Core Imports
import React, { useEffect } from 'react';

// Packages Import
import { apertureOutline } from 'ionicons/icons';
import { useRecoilState } from 'recoil';
import { useFormikContext } from 'formik';

// Custom Imports
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonIcon,
  ZIonRouterLink,
  ZIonImg,
  ZIonSkeletonText,
  ZIonButton
} from '@/components/ZIonComponents';
import ZaionsRSelect from '@/components/CustomComponents/ZaionsRSelect';
import { formatReactSelectOptionsArray } from '@/utils/helpers';
import ZaionsAddPixelAccount from '@/components/InPageComponents/ZaionsModals/AddPixelsAccount';

// Global Constants
import { API_URL_ENUM } from '@/utils/enums';
import CONSTANTS, { Platforms } from '@/utils/constants';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';

// Images

// Recoil States
import { PixelAccountsRStateAtom } from '@/ZaionsStore/UserDashboard/PixelAccountsState/index.recoil';

// Types
import {
  PixelAccountType,
  PixelPlatformsEnum,
  ZaionsShortUrlOptionFieldsValuesInterface
} from '@/types/AdminPanel/linksType';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';

// Styles

const selectOptionComponent = (_el: PixelAccountType) => {
  return (
    <div
      className='flex ion-align-items-center'
      key={_el.id}>
      <ZIonImg
        src={Platforms[_el.platform as PixelPlatformsEnum]}
        style={{ width: '30px' }}
        className='pe-3'
      />
      {_el.title}
    </div>
  );
};

const LinkPixelsAccount: React.FC<{ showSkeleton?: boolean }> = ({
  showSkeleton = false
}) => {
  const [pixelAccountsState, setPixelAccountsState] = useRecoilState(
    PixelAccountsRStateAtom
  );

  const { presentZIonModal: presentZAddPixelAccount } = useZIonModal(
    ZaionsAddPixelAccount
  );

  const {
    values: { linkPixelsAccount },
    setFieldValue
  } = useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();
  const { data: pixelAccountsData } = useZRQGetRequest<PixelAccountType[]>({
    _url: API_URL_ENUM.userPixelAccounts_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN]
  });

  useEffect(() => {
    if (pixelAccountsData) {
      setPixelAccountsState(pixelAccountsData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pixelAccountsData]);

  if (showSkeleton) {
    return <LinkPixelsAccountSkeleton />;
  }

  return (
    <>
      {/* Row-1 */}
      <ZIonRow className='pt-1 border-bottom zaions__bg_white'>
        {/* Col-1 */}
        <ZIonCol className='flex px-2 py-2 ion-align-items-center'>
          {/* Icon */}
          <ZIonIcon
            icon={apertureOutline}
            size='large'
          />

          {/* Text */}
          <ZIonText className='font-bold ms-2 ion-no-margin'>
            Add Pixels ID
            <ZIonRouterLink
              className='ms-1'
              routerLink={ZaionsRoutes.HomeRoute}>
              (help)
            </ZIonRouterLink>
          </ZIonText>
        </ZIonCol>
      </ZIonRow>

      {/* Row-2 */}
      <ZIonRow className='pb-1 zaions__bg_white'>
        {/* Col-1 */}
        <ZIonCol>
          {/* Select */}
          <ZaionsRSelect
            className='pt-0 pb-0 ion-padding'
            isMulti
            name='linkPixelsAccount'
            testingselector={
              CONSTANTS.testingSelectors.shortLink.formPage.pixelAccount
                .pixelsSelector
            }
            options={
              pixelAccountsData
                ? pixelAccountsData?.map(el => {
                    return { value: el.id, label: selectOptionComponent(el) };
                  })
                : []
            }
            onChange={_values => {
              setFieldValue(
                'linkPixelsAccount',
                _values.map(el => el.value) as string[],
                false
              );
            }}
            value={
              formatReactSelectOptionsArray(
                linkPixelsAccount,
                pixelAccountsData as ZGenericObject[],
                'id',
                'title'
              ) || []
            }
          />

          {/* add a pixel button */}
          <ZIonButton
            fill='clear'
            className='ion-text-capitalize ion-no-padding ps-1 ion-no-margin ion-margin-start'
            size='small'
            testingselector={
              CONSTANTS.testingSelectors.shortLink.formPage.pixelAccount
                .createBtn
            }
            onClick={() => {
              presentZAddPixelAccount({
                _cssClass: 'pixel-account-modal-size'
              });
            }}>
            Add a new pixel
          </ZIonButton>
        </ZIonCol>
      </ZIonRow>
    </>
  );
};

const LinkPixelsAccountSkeleton = React.memo(() => {
  return (
    <>
      {/* Row-1 */}
      <ZIonRow className='pt-1 border-bottom zaions__bg_white'>
        {/* Col-1 */}
        <ZIonCol className='flex px-2 py-2 ion-align-items-center'>
          {/* Icon */}
          <ZIonIcon
            icon={apertureOutline}
            size='large'
          />

          {/* Text */}
          <ZIonText className='font-bold ms-2 ion-no-margin'>
            Add Pixels ID
            <ZIonRouterLink
              className='ms-1'
              routerLink={ZaionsRoutes.HomeRoute}>
              (help)
            </ZIonRouterLink>
          </ZIonText>
        </ZIonCol>
      </ZIonRow>

      {/* Row-2 */}
      <ZIonRow className='pb-1 zaions__bg_white'>
        {/* Col-1 */}
        <ZIonCol>
          {/* Select */}
          <ZIonSkeletonText
            animated={true}
            width='95%'
            height='30px'
            className='mx-auto'
          />

          {/* add a pixel button */}
          <ZIonButton
            fill='clear'
            className='ion-text-capitalize ion-no-padding ps-1 ion-no-margin ion-margin-start'
            size='small'>
            <ZIonSkeletonText
              animated={true}
              width='100px'
              height='17px'
            />
          </ZIonButton>
        </ZIonCol>
      </ZIonRow>
    </>
  );
});

export default React.memo(LinkPixelsAccount);
