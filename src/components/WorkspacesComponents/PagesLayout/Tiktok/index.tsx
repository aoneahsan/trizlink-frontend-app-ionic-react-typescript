/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { contractOutline, settingsOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonButtons,
	ZIonCol,
	ZIonIcon,
	ZIonImg,
	ZIonRouterLink,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';

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
import { ProductLogo } from '@/assets/images';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZWorkspaceTiktokPageLayout: React.FC = () => {
	// Media Query Scale
	const { isXlScale, isLgScale, isMdScale, isSmScale, isXsScale } =
		useZMediaQueryScale();

	return (
		<ZIonRow
			className={classNames({
				'mt-3 ion-justify-content-center': true,
			})}
		>
			{/*  */}

			{/*  */}
			<ZIonCol
				sizeXl='7'
				sizeLg='9.5'
				sizeMd='11'
				sizeSm='11.5'
				sizeXs='10'
				className={classNames({
					'ion-no-padding flex ion-align-items-center py-2 ps-2 mt-5': true,
				})}
			>
				<div
					className={classNames({
						'rounded-full overflow-hidden': true,
						'w-[7.2rem] h-[7.2rem]': !isLgScale,
						'w-[77px] h-[77px]': isMdScale || isSmScale || !isSmScale,
					})}
				>
					<ZIonImg
						src={ProductLogo}
						className={classNames({
							'w-full h-full': true,
						})}
					/>
				</div>

				<div
					className={classNames({
						'flex flex-col mx-2 px-1 mb-3': true,
					})}
				>
					<ZIonText className='text-lg'>
						<ZIonRouterLink
							routerLink={CONSTANTS.ExternalURL.FacebookUrl}
							target='_blank'
							color='dark'
							className='text-3xl font-bolder zaions-transition'
						>
							testing
						</ZIonRouterLink>
					</ZIonText>
					<ZIonText className='text-sm'>
						<ZIonRouterLink
							routerLink={CONSTANTS.ExternalURL.FacebookUrl}
							target='_blank'
							className='hover:underline font-bold zaions-transition'
							color='dark'
						>
							@zaions
						</ZIonRouterLink>
					</ZIonText>
				</div>
			</ZIonCol>
		</ZIonRow>
	);
};

export default ZWorkspaceTiktokPageLayout;
