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

const ZWorkspaceFacebookPageLayout: React.FC = () => {
	// Media Query Scale
	const { isXlScale } = useZMediaQueryScale();

	return (
		<ZIonRow
			className={classNames({
				'mt-3': true,
				'ion-justify-content-center': !isXlScale,
			})}
		>
			{isXlScale && (
				<ZIonCol size='2'>
					<div className='rounded-full overflow-hidden border-[5px] border-white border-solid w-[11rem] h-[11rem] mx-auto flex'>
						<ZIonImg src={ProductLogo} className='w-full h-full' />
					</div>
					<div className='w-[10rem] flex flex-col mx-auto mt-2'>
						<ZIonText className='text-lg '>
							<ZIonRouterLink
								routerLink={CONSTANTS.ExternalURL.FacebookUrl}
								target='_blank'
								color='dark'
								className='text-lg hover:underline zaions-transition'
							>
								zaions
							</ZIonRouterLink>
						</ZIonText>
						<ZIonText className='font-bold' color='medium'>
							<ZIonRouterLink
								routerLink={CONSTANTS.ExternalURL.FacebookUrl}
								target='_blank'
								color='medium'
								className='hover:underline zaions-transition'
							>
								@zaions
							</ZIonRouterLink>
						</ZIonText>
					</div>
				</ZIonCol>
			)}

			{/*  */}
			<ZIonCol
				sizeXl='8.5'
				sizeLg='10.5'
				sizeMd='11'
				sizeSm='11.5'
				sizeXs='11.7'
				className='ion-no-padding'
			>
				<div
					className={classNames({
						'w-[calc(100% - 46px)] zaions-background-set relative': true,
						'h-[312px]': isXlScale,
						'h-[211px]': !isXlScale,
					})}
					style={{
						backgroundImage: `url(https://d2b57pa8jvjkcd.cloudfront.net/xGF9qraKHpDFhkqdC/JHg2CLhHKG-tom-idea.jpg)`,
					}}
				>
					<ZIonButtons className='absolute zaions__dark_set rounded right-[1%] top-[2%]'>
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
			{!isXlScale && (
				<ZIonCol
					sizeXl='8.5'
					sizeLg='10.5'
					sizeMd='11'
					sizeSm='11.5'
					sizeXs='11.7'
					className={classNames({
						'border ion-no-padding': true,
						'flex ion-align-items-center py-2 ps-2 bg-white': !isXlScale,
					})}
				>
					<div
						className={classNames({
							'rounded-full overflow-hidden border-[5px] border-white border-solid':
								true,
							'w-[11rem] h-[11rem]': isXlScale,
							'w-[4.5rem] h-[4.5rem]': !isXlScale,
						})}
					>
						<ZIonImg src={ProductLogo} className='w-full h-full' />
					</div>

					<div
						className={classNames({
							'flex flex-col': true,
							'w-[10rem] mt-2 mx-auto': isXlScale,
						})}
					>
						<ZIonText className='text-lg'>
							<ZIonRouterLink
								routerLink={CONSTANTS.ExternalURL.FacebookUrl}
								target='_blank'
								color='dark'
								className='text-lg hover:underline zaions-transition'
							>
								zaions
							</ZIonRouterLink>
						</ZIonText>
						<ZIonText className='font-bold' color='medium'>
							<ZIonRouterLink
								routerLink={CONSTANTS.ExternalURL.FacebookUrl}
								target='_blank'
								color='medium'
								className='hover:underline zaions-transition'
							>
								@zaions
							</ZIonRouterLink>
						</ZIonText>
					</div>
				</ZIonCol>
			)}
		</ZIonRow>
	);
};

export default ZWorkspaceFacebookPageLayout;
