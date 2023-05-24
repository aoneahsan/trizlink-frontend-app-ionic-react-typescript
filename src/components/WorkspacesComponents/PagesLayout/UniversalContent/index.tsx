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

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonCol,
	ZIonIcon,
	ZIonImg,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { settingsOutline } from 'ionicons/icons';

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

const ZWorkspaceUniversalContentPageLayout: React.FC = () => {
	// Media Query Scale
	const { isXlScale, isLgScale, isMdScale, isSmScale } = useZMediaQueryScale();

	return (
		<ZIonRow
			className={classNames({
				'mt-3 ion-justify-content-center': true,
			})}
		>
			{/*  */}
			<ZIonCol
				sizeXl='7'
				sizeLg='9.5'
				sizeMd='11'
				sizeSm='11.5'
				sizeXs='11.8'
				className={classNames({
					'ion-no-padding flex  py-2 ps-2': true,
					'ion-align-items-start': isXlScale || isLgScale,
					'ion-align-items-center':
						(!isLgScale && isMdScale) || isSmScale || !isSmScale,
				})}
			>
				<ZIonRow
					className={classNames({
						'flex ion-align-items-center border-b-[1px] border-solid border-[#0000001a] pb-3':
							true,
						'w-[80%] mx-auto': (!isLgScale && isMdScale) || isSmScale,
						'w-[95%]': !isSmScale,
					})}
				>
					<ZIonCol
						size='2.5'
						sizeLg='2.5'
						sizeMd='max-content'
						sizeSm='max-content'
						sizeXs='max-content'
					>
						<div
							className={classNames({
								'rounded-full overflow-hidden flex justify-center': true,
								'w-[92px] h-[92px]': isXlScale || isLgScale,
								'w-[77px] h-[77px]':
									(!isLgScale && isMdScale) || isSmScale || !isSmScale,
							})}
						>
							<ZIonImg
								src='https://d2b57pa8jvjkcd.cloudfront.net/xGF9qraKHpDFhkqdC/dz5XmBCTYv-webearbearscrop.jpg'
								className={classNames({
									'w-full h-full': true,
								})}
							/>
						</div>
					</ZIonCol>
					{/*  */}
					<ZIonCol className='flex ion-align-items-center'>
						<div className='w-1/2'>
							<ZIonText
								className={classNames({
									'text-lg block font-bold': true,
								})}
							>
								MTI
							</ZIonText>

							{/*  */}
							<ZIonText className='text-base block' color='medium'>
								Universal content
							</ZIonText>
						</div>

						{/*  */}
						<div className='ion-text-end w-1/2'>
							<ZIonButton size='small'>
								<ZIonIcon icon={settingsOutline} />
							</ZIonButton>
						</div>
					</ZIonCol>
				</ZIonRow>
			</ZIonCol>
		</ZIonRow>
	);
};

export default ZWorkspaceUniversalContentPageLayout;
