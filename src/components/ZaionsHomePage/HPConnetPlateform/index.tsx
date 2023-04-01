// Core Imports
import React, { Fragment } from 'react';

// Packages Imports
import { useRecoilValue } from 'recoil';
import Carousel from 'react-bootstrap/Carousel';
import { IonItemDivider } from '@ionic/react';
import { useMediaQuery } from 'react-responsive';

// Custom Imports
import ZaionsNewLabel from 'components/InPageComponents/ZaionsNewLable';
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
} from 'components/ZIonComponents';

// Global Constant
import { BRACKPOINT_MD, BRACKPOINT_SM, PRODUCT_NAME } from 'utils/constants';

// Recoil
import { ZaionsHpCPData } from 'ZaionsStore/ZaionsHPBCP.recoil';

// Type
import { ZaionsHpCPDataType } from 'types/ZaionsHPBCPType';
import { ZIonButton } from 'components/ZIonComponents';
import ZaionsRoutes from 'utils/constants/RoutesConstants';

const { Item: CarouselItem } = Carousel;

const ZaionsHPConnetPlateform: React.FC = () => {
  const loadedHPBCData = useRecoilValue<ZaionsHpCPDataType[]>(ZaionsHpCPData);
  const isMdSclae = useMediaQuery({ query: `(max-width: ${BRACKPOINT_MD})` });
  const ZaionsCarousel = isMdSclae ? Carousel : Fragment;
  const ZaionsCarouselItem = isMdSclae ? CarouselItem : Fragment;

  const isSmScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_SM})`,
  });

  return (
    <>
      <div className='ion-text-center ion-margin-bottom mt-4 pt-2 ion-padding-bottom'>
        <br />
        <ZIonText>
          <h2>
            <b>{PRODUCT_NAME}’s Connections Platform</b>
          </h2>
          <h5 className='zaions__color_gray2'>
            All the products you need to build brand connections, manage links
            and QR Codes, and <br /> connect with audiences everywhere, in a
            single unified platform.
          </h5>
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
              sizeXs='12'
            >
              <ZIonRow>
                <ZaionsCarousel>
                  {loadedHPBCData.map((data) => (
                    <ZaionsCarouselItem key={data.id}>
                      <ZIonCol
                        sizeXl='4'
                        sizeLg='4'
                        sizeMd='6'
                        sizeSm='6'
                        sizeXs='6'
                      >
                        <ZIonCard
                          style={{
                            border: '1px #000 solid',
                            borderRadius: '20px',
                          }}
                        >
                          <ZIonCardHeader className='mt-4'>
                            <ZIonCardTitle
                              className='d-flex ion-align-items-center'
                              style={{
                                flexDirection: !isSmScale && 'column',
                                gap: !isSmScale && '10px',
                              }}
                            >
                              <img
                                src={data.icon}
                                className='ion-padding-end'
                                alt='icon'
                              />{' '}
                              <ZIonText className='fw-bold'>
                                {data.title}
                              </ZIonText>{' '}
                              {data.extraData === 'New' ? (
                                <ZaionsNewLabel
                                  className='ms-2'
                                  title={data.extraData}
                                />
                              ) : (
                                ''
                              )}
                            </ZIonCardTitle>
                            <div className='ion-margin-start ion-margin-top ion-padding-top'>
                              <ZIonText className=''>{data.text}</ZIonText>
                            </div>
                          </ZIonCardHeader>
                          <ZIonCardContent>
                            <IonItemDivider />
                            <br />
                            <h2>{data.featureListTitle}</h2>
                            {data.featureListItem.map((item) => (
                              <ZIonText
                                className='d-flex align-items-center ion-padding-top'
                                key={item.id}
                              >
                                <ZIonIcon
                                  icon={item.featureIcon}
                                  color='primary'
                                  className='ion-padding-end'
                                  size='large'
                                ></ZIonIcon>
                                {item.fetureText}
                              </ZIonText>
                            ))}
                            <div className='ion-margin-horizontal pt-3'>
                              <ZIonRouterLink
                                routerLink={ZaionsRoutes.HomeRoute}
                              >
                                <ZIonButton expand='block'>
                                  {data.primaryBtnText}
                                </ZIonButton>
                              </ZIonRouterLink>
                            </div>
                            <div className='ion-margin-horizontal ion-margin-top'>
                              <ZIonRouterLink
                                routerLink={ZaionsRoutes.HomeRoute}
                              >
                                <ZIonButton expand='block' fill='clear'>
                                  {data.secondaryBtnText}
                                </ZIonButton>
                              </ZIonRouterLink>
                            </div>
                          </ZIonCardContent>
                        </ZIonCard>
                      </ZIonCol>
                    </ZaionsCarouselItem>
                  ))}
                </ZaionsCarousel>
              </ZIonRow>
            </ZIonCol>
            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>
      </div>{' '}
    </>
  );
};

export default ZaionsHPConnetPlateform;
