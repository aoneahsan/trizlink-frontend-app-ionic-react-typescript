// Core Imports
import { useLayoutEffect } from 'react';

// Packages Imports
import Accordion from 'react-bootstrap/Accordion';
import { useRecoilState } from 'recoil';
import { chevronDownOutline } from 'ionicons/icons';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';

// Custom Imports
import {
  ZIonCol,
  ZIonText,
  ZIonIcon,
  ZIonRow,
  ZIonGrid,
} from '@/components/ZIonComponents';

// Types
import { ZaionsHPFAQType } from '@/types/ZionsHPFAQType';

// Recoil State
import { ZaionsHPFAQData } from '@/ZaionsStore/ZaionsHPFAQRecoil';

// Global Constant
import { BRACKPOINT_MD } from '@/utils/constants';

// Data
import { HPFAQData } from '@/data/HPFAQData';

// Style
import classes from './styles.module.css';
import { ZIonButton } from '@/components/ZIonComponents';

const ZaionsHPFAQuestions: React.FC<{ className?: string }> = ({
  className,
}) => {
  const [loadedHPFAQData, setLoadedHPFAQData] =
    useRecoilState<ZaionsHPFAQType[]>(ZaionsHPFAQData);

  useLayoutEffect(() => {
    // Featch Data From Database Later:-
    setLoadedHPFAQData(HPFAQData);
  }, [setLoadedHPFAQData]);

  const isMdScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_MD})`,
  });

  return (
    <>
      <div
        // className={`ion-text-center ion-margin-top ion-padding-bottom ${classValue}`}
        className={classNames(className, {
          'ion-text-center ion-margin-top ion-padding-bottom': true,
        })}
      >
        <br />
        <ZIonText>
          <h2>
            <b>Frequently asked questions</b>
          </h2>
        </ZIonText>
      </div>
      <ZIonGrid className='mb-5'>
        <ZIonRow>
          <ZIonCol></ZIonCol>
          <ZIonCol sizeXl='10' sizeLg='10' sizeMd='11' sizeSm='12' sizeXs='12'>
            {loadedHPFAQData.map((item) => (
              <Accordion key={item.id}>
                <Accordion.Item
                  eventKey={item.id}
                  className={classes.zaions__accordion_item}
                >
                  <Accordion.Header>
                    <h5
                      // className={`${
                      // 	isMdScale && 'ms-5'
                      // } d-flex align-items-center`}
                      className={classNames(className, {
                        'd-flex align-items-center': true,
                        'ms-5': isMdScale,
                      })}
                    >
                      <ZIonIcon
                        icon={chevronDownOutline}
                        className='me-3'
                      ></ZIonIcon>
                      <b>{item.title}</b>
                    </h5>
                  </Accordion.Header>
                  <Accordion.Body>
                    {item.content}
                    {item.button && (
                      <>
                        <br />
                        <br />
                        <ZIonButton className='ion-text-capitalize'>
                          {item.button}
                        </ZIonButton>
                        <br />
                      </>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}
          </ZIonCol>
          <ZIonCol></ZIonCol>
        </ZIonRow>
      </ZIonGrid>
    </>
  );
};

export default ZaionsHPFAQuestions;
