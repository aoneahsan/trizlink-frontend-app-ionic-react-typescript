// Core Imports
import React, { useLayoutEffect } from 'react';

// Packages Imports
import { useRecoilState } from 'recoil';
import { chevronDownOutline } from 'ionicons/icons';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';

// Custom Imports
import {
  ZIonCol,
  ZIonText,
  ZIonRow,
  ZIonGrid,
  ZIonAccordion,
  ZIonAccordionGroup,
  ZIonItem,
  ZIonLabel,
  ZIonButton,
  ZIonRouterLink
} from '@/components/ZIonComponents';

// Types
import { type ZaionsHPFAQType } from '@/types/ZionsHPFAQType';

// Recoil State
import { ZaionsHPFAQData } from '@/ZaionsStore/ZaionsHPFAQRecoil';

// Global Constant
import { BRACKPOINT_MD } from '@/utils/constants';

// Data
import { HPFAQData } from '@/data/HPFAQData';

// Style
import classes from './styles.module.css';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

const ZaionsHPFAQuestions: React.FC<{ className?: string }> = ({
  className
}) => {
  const [loadedHPFAQData, setLoadedHPFAQData] =
    useRecoilState<ZaionsHPFAQType[]>(ZaionsHPFAQData);

  useLayoutEffect(() => {
    // Featch Data From Database Later:-
    setLoadedHPFAQData(HPFAQData);
  }, [setLoadedHPFAQData]);

  const isMdScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_MD})`
  });

  return (
    <>
      <div
        // className={`ion-text-center ion-margin-top ion-padding-bottom ${classValue}`}
        className={classNames(className, {
          'ion-text-center ion-margin-top ion-padding-bottom': true
        })}>
        <br />
        <ZIonText className='text-3xl font-bold'>
          Frequently asked questions
        </ZIonText>
      </div>
      <ZIonGrid className='mb-5'>
        <ZIonRow>
          <ZIonCol></ZIonCol>
          <ZIonCol
            sizeXl='10'
            sizeLg='10'
            sizeMd='11'
            sizeSm='12'
            sizeXs='12'>
            {loadedHPFAQData.map(item => (
              <ZIonAccordionGroup key={item.id}>
                <ZIonAccordion
                  value={item.id}
                  className={classNames(classes.zaions__accordion_item, {
                    'mb-2': true
                  })}
                  toggleIcon={chevronDownOutline}>
                  <ZIonItem
                    slot='header'
                    color='light'>
                    <ZIonLabel>
                      <ZIonText
                        className={classNames(className, {
                          'flex ion-align-items-center': true,
                          'ms-5': isMdScale
                        })}>
                        <b>{item.title}</b>
                      </ZIonText>
                    </ZIonLabel>
                  </ZIonItem>
                  <div
                    className={classNames({
                      'ion-padding': true
                    })}
                    slot='content'>
                    {item.content}
                    {item.button !== undefined && (
                      <>
                        <br />
                        <br />
                        <ZIonRouterLink
                          routerLink={
                            ZaionsRoutes.WhyZaions.ZaionsPricingRoute
                          }>
                          <ZIonButton className='ion-text-capitalize'>
                            {item.button}
                          </ZIonButton>
                        </ZIonRouterLink>
                        <br />
                      </>
                    )}
                  </div>
                </ZIonAccordion>
              </ZIonAccordionGroup>
            ))}
          </ZIonCol>
          <ZIonCol></ZIonCol>
        </ZIonRow>
      </ZIonGrid>
    </>
  );
};

export default ZaionsHPFAQuestions;
