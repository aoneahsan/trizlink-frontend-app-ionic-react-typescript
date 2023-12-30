/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonCol,
  ZIonImg,
  ZIonRow,
  ZIonText
} from '@/components/ZIonComponents';
import LinkInBioPageAnalyticsTable from '@/components/InPageComponents/ZaionsTable/LinkInBioTables/PageAnalyticsTable';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { type LinkInBioPageAnalyticsDataInterface } from '@/types/InPageComponentTypes/ZaionsTables.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */
interface PageAnalyticsStateBlockInterface {
  bannerTitle: string;
  imageUrl: string;
  title: string;
  subTitle: string;
  tableData?: LinkInBioPageAnalyticsDataInterface[];
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const PageAnalyticsStateBlock: React.FC<PageAnalyticsStateBlockInterface> = ({
  bannerTitle,
  imageUrl,
  subTitle,
  title,
  tableData
}) => {
  return (
    <ZIonRow className='mt-4 border zaions__bg_white'>
      <ZIonCol
        size='12'
        className='ion-padding-vertical border-bottom'>
        <ZIonText color='dark'>
          <h5 className='py-1 font-bold ion-no-margin ps-4'>{bannerTitle}</h5>
        </ZIonText>
      </ZIonCol>
      {(tableData?.length === null || tableData?.length === 0) && (
        <ZIonCol className='flex flex-col py-5 my-5 ion-justify-content-center ion-align-items-center'>
          <ZIonImg
            src={imageUrl}
            className='mt-4 mb-5 w-[120px] h-[120px]'
          />
          <ZIonText>
            <h6 className='mb-4 font-bold'>{title}</h6>
          </ZIonText>
          <ZIonText className='mb-3'>
            <h6>{subTitle}</h6>
          </ZIonText>
        </ZIonCol>
      )}
      {tableData !== undefined && tableData?.length > 0 && (
        <ZIonCol
          size='12'
          className='ion-margin-vertical'>
          <LinkInBioPageAnalyticsTable
            headColumnFirst='Countries'
            tableData={tableData}
          />
        </ZIonCol>
      )}
    </ZIonRow>
  );
};

export default PageAnalyticsStateBlock;
