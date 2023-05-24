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
import classes from './styles.module.css';

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

const ZWorkspaceLinkedinPageLayout: React.FC = () => {
	// Media Query Scale

	return (
		<ZIonRow
			className={classNames({
				'mt-3 ion-justify-content-center': true,
			})}
		>
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
						'w-[calc(100% - 46px)] zaions-background-set relative h-[191px]':
							true,
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
				sizeXl='8.5'
				sizeLg='10.5'
				sizeMd='11'
				sizeSm='11.5'
				sizeXs='11.7'
				className={classNames({
					'border ion-no-padding flex ion-align-items-center py-2 ps-2 bg-white h-[5rem]':
						true,
				})}
			>
				<div
					className={classNames({
						'overflow-hidden translate-y-[-2.5rem] w-[7.2rem] h-[7.2rem]': true,
					})}
				>
					<ZIonImg
						src={ProductLogo}
						className={classNames(classes['linkedin-profile-img'], {
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
							className='text-lg hover:underline zaions-transition'
						>
							zaions
						</ZIonRouterLink>
					</ZIonText>
					<ZIonText className='text-sm' color='medium'>
						<ZIonRouterLink
							routerLink={CONSTANTS.ExternalURL.FacebookUrl}
							target='_blank'
							className='hover:underline zaions-transition'
						>
							@zaions
						</ZIonRouterLink>
					</ZIonText>
				</div>
			</ZIonCol>
		</ZIonRow>
	);
};

export default ZWorkspaceLinkedinPageLayout;
