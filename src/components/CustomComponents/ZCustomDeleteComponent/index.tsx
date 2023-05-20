/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { OverlayEventDetail } from '@ionic/core';
import { trashBin } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import { ZIonButton, ZIonIcon, ZIonText } from '@/components/ZIonComponents';
import { useZIonActionSheet } from '@/ZaionsHooks/zionic-hooks';

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
import { ZGenericObject, ZIonColorType } from '@/types/zaionsAppSettings.type';
import classNames from 'classnames';

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
interface ZCustomDeleteComponentInterface {
	className?: string;
	slot?: 'start' | 'end' | string;
	actionSheetHeader?: string;
	actionSheetSubHeader?: string;
	data?: ZGenericObject;
	iconColor?: ZIonColorType;
	iconName?: string;
	iconClassName?: string;
	deleteFn?: (detail: OverlayEventDetail<unknown>) => Promise<void> | void;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZCustomDeleteComponent: React.FC<ZCustomDeleteComponentInterface> = ({
	className,
	slot = '',
	actionSheetHeader,
	actionSheetSubHeader,
	data,
	iconColor,
	iconName = trashBin,
	iconClassName,
	deleteFn,
}) => {
	// IonActionSheet present went user went to delete a block.
	const { presentZIonActionSheet } = useZIonActionSheet();

	return (
		<ZIonButton
			slot={slot}
			className={className}
			fill='clear'
			size='small'
			style={{
				'--background-hover-opacity': '0',
			}}
			onClick={() =>
				void presentZIonActionSheet({
					header: actionSheetHeader,
					subHeader: actionSheetSubHeader,
					buttons: [
						{
							text: 'Delete',
							role: 'destructive',
							data: {
								action: 'delete',
								...data,
							},
						},
						{
							text: 'Cancel',
							role: 'cancel',
							data: {
								action: 'cancel',
							},
						},
					],
					mode: 'ios',
					onDidDismiss: ({ detail }) => {
						deleteFn && void deleteFn(detail);
					},
				})
			}
		>
			<ZIonText>
				<h4 className='ion-no-margin'>
					<ZIonIcon
						icon={iconName}
						color={iconColor}
						className={classNames(iconClassName, {
							'w-6 h-6': true,
						})}
					/>
				</h4>
			</ZIonText>
		</ZIonButton>
	);
};

export default ZCustomDeleteComponent;
