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
import { ZIonCol, ZIonRow, ZIonText } from '@/components/ZIonComponents';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import classNames from 'classnames';

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

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const PageAnalyticsInfoBlocks: React.FC = () => {
	const { isXlScale } = useZMediaQueryScale();

	return (
		<ZIonRow
			className={classNames({
				'mt-4 ion-justify-content-between': true,
				'gap-y-4': !isXlScale,
			})}
		>
			{/* Click Info Block */}
			<ZIonCol
				className='border zaions__bg_white flex ion-align-items-center ion-justify-content-center py-4'
				sizeXl='2.2'
				sizeLg='2.9'
				sizeMd='3.9'
				sizeSm='5.9'
				sizeXs='12'
			>
				<ZIonText className='text-5xl'>🚀</ZIonText>
				<div className='ms-3'>
					<ZIonText className='text-lg font-bold block'>Clicks</ZIonText>
					<ZIonText className='text-xl font-bold block' color='primary'>
						1
					</ZIonText>
				</div>
			</ZIonCol>

			{/* Users Info Block */}
			<ZIonCol
				className='border zaions__bg_white flex ion-align-items-center ion-justify-content-center py-4'
				sizeXl='2.2'
				sizeLg='2.9'
				sizeMd='3.9'
				sizeSm='5.9'
				sizeXs='12'
			>
				<ZIonText className='text-5xl'>🧙‍</ZIonText>
				<div className='ms-3'>
					<ZIonText className='text-lg font-bold block'>Users</ZIonText>
					<ZIonText className='text-xl font-bold block' color='primary'>
						1
					</ZIonText>
				</div>
			</ZIonCol>

			{/* Referrers Info Block */}
			<ZIonCol
				className='border zaions__bg_white flex ion-align-items-center ion-justify-content-center py-4'
				sizeXl='2.2'
				sizeLg='2.9'
				sizeMd='3.9'
				sizeSm='5.9'
				sizeXs='12'
			>
				<ZIonText className='text-5xl'>🧭‍</ZIonText>
				<div className='ms-3'>
					<ZIonText className='text-lg font-bold block'>Referrers</ZIonText>
					<ZIonText className='text-xl font-bold block' color='primary'>
						1
					</ZIonText>
				</div>
			</ZIonCol>

			{/* Conversion Info Block */}
			<ZIonCol
				className='border zaions__bg_white flex ion-align-items-center ion-justify-content-center py-4'
				sizeXl='2.2'
				sizeLg='2.9'
				sizeMd='3.9'
				sizeSm='5.9'
				sizeXs='12'
			>
				<ZIonText className='text-5xl'>🎈‍</ZIonText>
				<div className='ms-3'>
					<ZIonText className='text-lg font-bold block'>Conversion</ZIonText>
					<ZIonText className='text-xl font-bold block' color='primary'>
						1
					</ZIonText>
				</div>
			</ZIonCol>

			{/* Conversion Info Block */}
			<ZIonCol
				className='border zaions__bg_white flex ion-align-items-center ion-justify-content-center py-4'
				sizeXl='2.2'
				sizeLg='2.9'
				sizeMd='3.9'
				sizeSm='5.9'
				sizeXs='12'
			>
				<ZIonText className='text-5xl'>🌎‍</ZIonText>
				<div className='ms-3'>
					<ZIonText className='text-lg font-bold block'>Countries</ZIonText>
					<ZIonText className='text-xl font-bold block' color='primary'>
						1
					</ZIonText>
				</div>
			</ZIonCol>
		</ZIonRow>
	);
};

export default PageAnalyticsInfoBlocks;
