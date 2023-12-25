/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { Pie } from 'react-chartjs-2';
import ZChartHOC from '@/components/AdminPanelComponents/ChartHOC';
import {
  type DoughnutControllerChartOptions,
  type ChartData,
  type CoreChartOptions,
  type DatasetChartOptions,
  type ElementChartOptions,
  type PluginChartOptions,
  type ScaleChartOptions
} from 'chart.js';
import { type _DeepPartialObject } from 'chart.js/dist/types/utils';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
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
interface ZRCPieI {
  options?: _DeepPartialObject<
    CoreChartOptions<'pie'> &
      ElementChartOptions<'pie'> &
      PluginChartOptions<'pie'> &
      DatasetChartOptions<'pie'> &
      ScaleChartOptions<'pie'> &
      DoughnutControllerChartOptions
  >;
  data: ChartData<'pie', number[], unknown>;
  onClick?: React.MouseEventHandler<HTMLCanvasElement>;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZRCPie: React.FC<ZRCPieI> = ({ data, options, onClick }) => {
  return (
    <ZChartHOC>
      <Pie
        options={options}
        data={data}
        onClick={onClick}
      />
    </ZChartHOC>
  );
};

export default ZRCPie;
