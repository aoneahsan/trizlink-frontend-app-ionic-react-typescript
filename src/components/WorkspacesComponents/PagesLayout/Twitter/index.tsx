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
import { ProductLogo } from '@/assets/images';

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

const ZWorkspaceTwitterPageLayout: React.FC = () => {
	// Media Query Scale
	const { isXlScale, isLgScale, isMdScale, isSmScale } = useZMediaQueryScale();

	return (
		<ZIonRow
			className={classNames({
				'mt-4 pt-3 ion-justify-content-center': true,
			})}
		>
			<ZIonCol
				sizeXl='8.8'
				sizeLg='9'
				sizeMd='11'
				sizeSm='12'
				sizeXs='12'
				className='ion-no-padding'
			>
				<div
					className={classNames({
						'mx-auto zaions-background-set relative h-[20.1rem]': true,
					})}
					style={{
						backgroundImage: `url(https://d2b57pa8jvjkcd.cloudfront.net/xGF9qraKHpDFhkqdC/JHg2CLhHKG-tom-idea.jpg)`,
					}}
				>
					<ZIonButtons className='absolute zaions__dark_set rounded right-[1%] top-[4%]'>
						<ZIonButton className='ion-no-padding'>
							<ZIonIcon icon={settingsOutline} />
						</ZIonButton>
						<ZIonButton className='ion-no-padding'>
							<ZIonIcon icon={contractOutline} />
						</ZIonButton>
					</ZIonButtons>
				</div>
			</ZIonCol>

			{/*  */}
			<ZIonCol
				sizeXl='8.8'
				sizeLg='9'
				sizeMd='11'
				sizeSm='12'
				sizeXs='12'
				className='mx-auto pt-3 pb-2 px-2'
			>
				<div
					className={classNames({
						'rounded-full overflow-hidden border-4 border-white border-solid flex':
							true,
						'mt-[-14%] w-[10.8rem] h-[10.8rem]': isXlScale,
						'mt-[-15%] w-[9.8rem] h-[9.8rem]': !isXlScale && isLgScale,
						'mt-[-10%] w-[8.8rem] h-[8.8rem]': !isLgScale && isMdScale,
						'mt-[-10%] w-[7.8rem] h-[7.8rem]': !isMdScale && isSmScale,
						'mt-[-24%] w-[7.8rem] h-[7.8rem]': !isSmScale,
					})}
				>
					<ZIonImg src={ProductLogo} className='w-full h-full ' />
				</div>
			</ZIonCol>

			<ZIonCol
				sizeXl='8.8'
				sizeLg='9'
				sizeMd='11'
				sizeSm='12'
				sizeXs='12'
				className='ion-no-padding'
			>
				<div className='flex flex-col justify-center ms-2'>
					<ZIonText>
						<ZIonRouterLink
							routerLink=''
							color='dark'
							className='font-bold text-lg'
						>
							Zaions
						</ZIonRouterLink>
					</ZIonText>
					<ZIonText>
						<ZIonRouterLink routerLink='' color='medium' className='text-sm'>
							@zaions
						</ZIonRouterLink>
					</ZIonText>
				</div>
			</ZIonCol>
		</ZIonRow>
	);
};

export default ZWorkspaceTwitterPageLayout;
