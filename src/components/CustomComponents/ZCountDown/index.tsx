/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import { ZIonText, ZIonTitle } from '@/components/ZIonComponents';
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import Countdown, { CountdownRendererFn } from 'react-countdown';
import { getRemainingTimeForCountDown } from '@/utils/helpers';

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

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZCustomRender: CountdownRendererFn = ({
	days,
	hours,
	minutes,
	seconds,
	completed,
}) => {
	return (
		<div className='flex ion-justify-content-between mx-auto zaions__w80 ion-align-items-center'>
			<div className='ion-text-center'>
				<ZIonTitle className='ion-no-padding' color='light'>
					{days}
				</ZIonTitle>
				<ZIonText className='zaions__fs_11' color='light'>
					DAYS
				</ZIonText>
			</div>
			<div className='mb-2'>
				<ZIonText className='font-bold zaions__fs_18' color='light'>
					:
				</ZIonText>
			</div>

			<div className='ion-text-center'>
				<ZIonTitle className='ion-no-padding' color='light'>
					{hours}
				</ZIonTitle>
				<ZIonText className='zaions__fs_11' color='light'>
					HRS
				</ZIonText>
			</div>
			<div className='mb-2'>
				<ZIonText className='font-bold zaions__fs_18' color='light'>
					:
				</ZIonText>
			</div>

			<div className='ion-text-center'>
				<ZIonTitle className='ion-no-padding' color='light'>
					{minutes}
				</ZIonTitle>
				<ZIonText className='zaions__fs_11' color='light'>
					MIN
				</ZIonText>
			</div>
			<div className='mb-2'>
				<ZIonText className='font-bold zaions__fs_18' color='light'>
					:
				</ZIonText>
			</div>

			<div className='ion-text-center'>
				<ZIonTitle className='ion-no-padding' color='light'>
					{seconds}
				</ZIonTitle>
				<ZIonText className='zaions__fs_11' color='light'>
					SEC
				</ZIonText>
			</div>
		</div>
	);
};

const ZCountdown: React.FC<{ countDownTime?: string }> = ({
	countDownTime,
}) => {
	return (
		<Countdown
			date={getRemainingTimeForCountDown(countDownTime)}
			renderer={ZCustomRender}
		/>
	);
};

export default ZCountdown;
