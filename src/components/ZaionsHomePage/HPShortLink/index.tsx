// Core Imports
import React from 'react';
// Packages Imports
import Form from 'react-bootstrap/Form';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';

// Custom Imports
import ZaionsHr from '@/components/InPageComponents/Zaion_hr';
import {
  ZIonCol,
  ZIonText,
  ZIonRouterLink,
  ZIonRow,
  ZIonGrid,
} from '@/components/ZIonComponents';

// Style
import classes from './styles.module.css';

// Images
import { vector } from '@/assets/images';

// Global Constant
import {
  BRACKPOINT_LG,
  BRACKPOINT_SM,
  BRACKPOINT_XL,
  PRODUCT_NAME,
} from '@/utils/constants';
import { ZIonButton } from '@/components/ZIonComponents';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

const ZaionsHPShortLink: React.FC = () => {
  const isXlScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_XL})`,
  });
  const isLgScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_LG})`,
  });
  const isSmScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_SM})`,
  });

  return (
    <>
      <div
        className={classNames({
          'ion-text-center ion-margin-bottom': true,
          'ion-padding-bottom': isSmScale,
        })}
      >
        <ZaionsHr />
        <ZIonText>
          Bringing us all a <span style={{ color: '#ff6116' }}>bit</span>{' '}
          closer. Discover our Connections Platform below.
          <br />
          <img
            src={vector}
            alt='vector'
            style={{
              maxWidth: '100%',
            }}
          />
        </ZIonText>
      </div>
      <div
        className={classNames({
          'ion-text-center': true,
          'mt-5': isSmScale,
        })}
      >
        <ZIonGrid className='px-0'>
          <ZIonRow
            // className={`ion-align-items-start ion-padding-top ion-padding-bottom zaions_secondary_color  ${
            // 	isXlScale && 'ion-text-center'
            // }`}
            className={classNames({
              'ion-align-items-start ion-padding-top ion-padding-bottom zaions_secondary_color':
                true,
              'ion-text-center': isXlScale,
            })}
          >
            <ZIonCol></ZIonCol>
            <ZIonCol
              sizeXl='6.8'
              sizeLg='8'
              sizeMd='12'
              sizeSm='12'
              sizeXs='12'
              className='ion-margin-end'
            >
              <Form.Group
                className='mb-1 input-group-lg'
                controlId='formBasicLinkShorten'
              >
                <Form.Control
                  type='text'
                  placeholder='Shorten your link'
                  style={{ padding: '0.9rem 1rem' }}
                />
              </Form.Group>
              <ZIonText
                className='zaions__color_gray'
                style={{ fontSize: '13px' }}
              >
                By clicking SHORTEN, you are agreeing to {PRODUCT_NAME}'s{' '}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Legal.ZaionsTermsOfService}
                  className='zaions__color_gray zaions__underline'
                >
                  Terms of Service
                </ZIonRouterLink>
                ,{' '}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Legal.ZaionsPrivacyPolicyRoute}
                  className='zaions__color_gray zaions__underline'
                >
                  Privacy Policy
                </ZIonRouterLink>
                , and{' '}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Legal.ZaionsAcceptableUsePolicyRoute}
                  className='zaions__color_gray zaions__underline'
                >
                  Acceptable Use Policy
                </ZIonRouterLink>
              </ZIonText>
            </ZIonCol>
            <ZIonCol
              sizeXl='2.6'
              sizeLg='3'
              sizeMd='12'
              sizeSm='12'
              sizeXs='12'
              className={`${
                !isLgScale ? '' : 'ion-padding-start'
              } ion-text-start `}
            >
              {' '}
              <ZIonRow>
                <ZIonCol
                  sizeXl='12'
                  sizeLg='12'
                  sizeMd='3'
                  sizeSm='3'
                  sizeXs='12'
                  className={`${!isLgScale ? 'mx-auto' : ''} my-0 py-0`}
                >
                  <ZIonButton
                    className={`${classes.zaions__shortlink_btn} ion-text-capitalize ion-margin-top`}
                    color='light'
                    fill='clear'
                    size='large'
                    expand='block'
                  >
                    Shorten
                  </ZIonButton>
                </ZIonCol>
              </ZIonRow>
            </ZIonCol>
            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>
      </div>
    </>
  );
};

export default ZaionsHPShortLink;
