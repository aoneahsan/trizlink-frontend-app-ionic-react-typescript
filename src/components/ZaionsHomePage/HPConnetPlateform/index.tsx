// Core Imports
import React, { Fragment } from 'react';

// Packages Imports
import { useRecoilValue } from 'recoil';
import classNames from 'classnames';

// Custom Imports
import ZaionsNewLabel from '@/components/InPageComponents/ZaionsNewLable';
import {
  ZIonCol,
  ZIonText,
  ZIonIcon,
  ZIonRouterLink,
  ZIonRow,
  ZIonGrid,
  ZIonCard,
  ZIonCardHeader,
  ZIonCardTitle,
  ZIonCardContent,
  ZIonItemDivider,
  ZIonButton,
  ZIonImg
} from '@/components/ZIonComponents';

// Global Constant
import {
  useZHybridDeviceIsMobile,
  useZMediaQueryScale
} from '@/ZaionsHooks/ZGenericHooks';
import { PRODUCT_NAME } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Recoil
import { ZaionsHpCPData } from '@/ZaionsStore/ZaionsHPBCP.recoil';

// Type
import { type ZaionsHpCPDataType } from '@/types/ZaionsHPBCPType';

// const { Item: CarouselItem } = Carousel;

const ZaionsHPConnectPlatform: React.FC = () => {
  const loadedHPBCData = useRecoilValue<ZaionsHpCPDataType[]>(ZaionsHpCPData);

  //
  const { isLgScale } = useZMediaQueryScale();

  // Slider

  return (
    <>
      <div className='pt-2 mt-4 ion-text-center ion-margin-bottom ion-padding-bottom'>
        <br />
        <ZIonText className='mb-2 text-3xl font-bold d-inline-block'>
          {PRODUCT_NAME}’s Connections Platform
        </ZIonText>
        <br />
        <ZIonText>
          All the products you need to build brand connections, manage links and
          QR Codes, and <br /> connect with audiences everywhere, in a single
          unified platform.
        </ZIonText>
      </div>
      <div>
        <ZIonGrid>
          <ZIonRow>
            <ZIonCol></ZIonCol>
            <ZIonCol
              sizeXl='11'
              sizeLg='11'
              sizeMd='11'
              sizeSm='10'
              sizeXs='12'>
              <ZIonRow>
                {loadedHPBCData.map(data => (
                  <ZSingleCard
                    key={data.id}
                    id={data.id}
                    icon={data.icon}
                    title={data.title}
                    text={data.text}
                    featureListTitle={data.featureListTitle}
                    featureListItem={data.featureListItem}
                    primaryBtnText={data.primaryBtnText}
                    secondaryBtnText={data.secondaryBtnText}
                  />
                ))}
              </ZIonRow>
            </ZIonCol>
            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>
      </div>
    </>
  );
};

const ZSingleCard: React.FC<ZaionsHpCPDataType> = ({
  icon,
  title,
  text,
  featureListTitle,
  featureListItem,
  primaryBtnText,
  secondaryBtnText,
  extraData
}) => {
  const { isSmScale } = useZMediaQueryScale();
  const { value: isHybridDevice } = useZHybridDeviceIsMobile();
  return (
    <ZIonCol
      sizeXl='4'
      sizeLg='6'
      sizeMd='6'
      sizeSm='12'
      size='12'
      className={classNames({
        'h-full ': true
      })}>
      <ZIonCard className='rounded-[20px] border border-black'>
        <ZIonCardHeader className='mt-4'>
          <ZIonCardTitle
            className={classNames({
              'flex ion-align-items-center': true,
              'flex-col gap-[10px]': !isSmScale
            })}>
            <ZIonImg
              src={icon}
              className='ion-padding-end'
              alt='icon'
            />
            <ZIonText className='font-bold ms-1'>{title}</ZIonText>
            {extraData === 'New' ? (
              <ZaionsNewLabel
                className='ms-2'
                title={extraData}
              />
            ) : (
              ''
            )}
          </ZIonCardTitle>
          <div className='ion-margin-start ion-margin-top ion-padding-top'>
            <ZIonText className=''>{text}</ZIonText>
          </div>
        </ZIonCardHeader>
        <ZIonCardContent>
          <ZIonItemDivider />
          <br />
          <h2>{featureListTitle}</h2>
          {featureListItem.map(item => (
            <ZIonText
              className='flex ion-align-items-center ion-padding-top'
              key={item.id}>
              <ZIonIcon
                icon={item.featureIcon}
                color='primary'
                className='ion-padding-end'
                size='large'></ZIonIcon>
              {item.fetureText}
            </ZIonText>
          ))}
          <div className='pt-3 ion-margin-horizontal'>
            <ZIonRouterLink routerLink={ZaionsRoutes.LoginRoute}>
              <ZIonButton expand='block'>{primaryBtnText}</ZIonButton>
            </ZIonRouterLink>
          </div>
          {!isHybridDevice ? (
            <div className='ion-margin-horizontal ion-margin-top'>
              <ZIonRouterLink routerLink={ZaionsRoutes.LoginRoute}>
                <ZIonButton
                  expand='block'
                  fill='clear'>
                  {secondaryBtnText}
                </ZIonButton>
              </ZIonRouterLink>
            </div>
          ) : null}
        </ZIonCardContent>
      </ZIonCard>
    </ZIonCol>
  );
};

export default ZaionsHPConnectPlatform;
