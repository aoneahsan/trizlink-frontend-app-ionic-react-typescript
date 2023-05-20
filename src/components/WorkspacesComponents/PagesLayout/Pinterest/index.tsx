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

const ZWorkspacePinterestPageLayout: React.FC = () => {
	// Media Query Scale
	const { isMdScale } = useZMediaQueryScale();

	return (
		<ZIonRow
			className={classNames({
				'mt-4 pt-3 ion-justify-content-center': true,
			})}
		>
			{/*  */}
			<ZIonCol
				sizeXl='5.9'
				sizeLg='6.9'
				sizeMd='7.9'
				sizeSm='11.5'
				sizeXs='11.7'
				className='ion-no-padding'
			>
				<div
					className={classNames({
						'mx-auto rounded-[32px] zaions-background-set relative h-[369px]':
							true,
						// 'w-[656px]': isMdScale,
						// 'w-full': !isMdScale,
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
				sizeXl='12'
				sizeLg='12'
				sizeMd='12'
				sizeSm='11.5'
				sizeXs='11.7'
				className='mx-auto'
			>
				<div className='rounded-full mt-[-62px] overflow-hidden border-2 border-white border-solid w-[9rem] h-[9rem] mx-auto flex'>
					<ZIonImg src={ProductLogo} className='w-full h-full' />
				</div>

				<div className='flex flex-col ion-align-items-center justify-center'>
					<ZIonText>
						<ZIonRouterLink
							routerLink=''
							color='dark'
							className='font-bold text-3xl'
						>
							Zaions
						</ZIonRouterLink>
					</ZIonText>
					<ZIonText>
						<ZIonRouterLink routerLink='' color='dark' className='text-sm'>
							custom-page-1684221127871
						</ZIonRouterLink>
					</ZIonText>
				</div>
			</ZIonCol>
		</ZIonRow>
	);
};

export default ZWorkspacePinterestPageLayout;
