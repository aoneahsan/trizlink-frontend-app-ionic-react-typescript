/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { ZIonCol, ZIonRow } from '@/components/ZIonComponents';
import {
  ZTable,
  ZTableHeadCol,
  ZTableRow,
  ZTableRowCol,
  ZTableTBody,
  ZTableTHead,
} from '@/components/InPageComponents/ZaionsTable/table-styled-components.sc';
import { LinkInBioPageAnalyticsDataInterface } from '@/types/InPageComponentTypes/ZaionsTables.type';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

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
interface LinkInBioPageAnalyticsTableInterface {
  headColumnFirst?: string;
  tableData?: LinkInBioPageAnalyticsDataInterface[];
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const LinkInBioPageAnalyticsTable: React.FC<
  LinkInBioPageAnalyticsTableInterface
> = ({ headColumnFirst, tableData }) => {
  return (
    <ZIonRow>
      <ZIonCol>
        <ZTable>
          <ZTableTHead>
            <ZTableRow>
              <ZTableHeadCol>{headColumnFirst}</ZTableHeadCol>
              <ZTableHeadCol>Visits</ZTableHeadCol>
              <ZTableHeadCol>Unique</ZTableHeadCol>
              <ZTableHeadCol>% Visits</ZTableHeadCol>
            </ZTableRow>
          </ZTableTHead>
          <ZTableTBody>
            {tableData &&
              tableData.map((el, i) => {
                return (
                  <ZTableRow key={i}>
                    <ZTableRowCol className='ps-3'>{el.value}</ZTableRowCol>
                    <ZTableRowCol className='ps-3'>{el.visit}</ZTableRowCol>
                    <ZTableRowCol className='ps-3'>{el.unique}</ZTableRowCol>
                    <ZTableRowCol className='ps-3'>
                      {el.visitPercentage}
                    </ZTableRowCol>
                  </ZTableRow>
                );
              })}
          </ZTableTBody>
        </ZTable>
      </ZIonCol>
    </ZIonRow>
  );
};

export default LinkInBioPageAnalyticsTable;
