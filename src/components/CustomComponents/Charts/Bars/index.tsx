/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import ZChartHOC from '@/components/AdminPanelComponents/ChartHOC';
import {
  type BarControllerChartOptions,
  type ChartData,
  type CoreChartOptions,
  type DatasetChartOptions,
  type ElementChartOptions,
  type PluginChartOptions,
  type ScaleChartOptions
} from 'chart.js';
import { type _DeepPartialObject } from 'chart.js/dist/types/utils';
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { Bar } from 'react-chartjs-2';

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
interface ZRCBarsI {
  options?: _DeepPartialObject<
    CoreChartOptions<'bar'> &
      ElementChartOptions<'bar'> &
      PluginChartOptions<'bar'> &
      DatasetChartOptions<'bar'> &
      ScaleChartOptions<'bar'> &
      BarControllerChartOptions
  >;
  data: ChartData<'bar', Array<number | [number, number] | null>, unknown>;
  onClick?: React.MouseEventHandler<HTMLCanvasElement>;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZRCBars: React.FC<ZRCBarsI> = ({ data, options, onClick }) => {
  return (
    <ZChartHOC>
      <Bar
        options={options}
        data={data}
        onClick={onClick}
      />
    </ZChartHOC>
  );
};

export default ZRCBars;
