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
	ZIonImg,
	ZIonText,
} from '@/components/ZIonComponents';
import { predefinedMusicPlatformImagesInWhite } from '@/utils/ZIcons';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import {
	linkInBioBlockCardItemInterface,
	LinkInBioMusicPlatformEnum,
} from '@/types/AdminPanel/linkInBioType/blockTypes';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { LinkInBioThemeFontEnum } from '@/types/AdminPanel/linkInBioType';

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

interface ZLinkInBioMusicBlockInterface {
	musicBlockData?: linkInBioBlockCardItemInterface[];
	fontFamily?: LinkInBioThemeFontEnum;
}

const ZLinkInBioMusicBlock: React.FC<ZLinkInBioMusicBlockInterface> = ({
	musicBlockData,
	fontFamily,
}) => {
	return (
		<ZIonCol>
			{musicBlockData &&
				musicBlockData.map((element, index) => {
					return (
						<ZIonButton
							expand='block'
							className={classNames({
								'ion-text-capitalize font-bold zaions__fs_16 my-0 mb-2': true,
								'mt-3': index >= 1,
							})}
							color='success'
							style={{
								height: '3.5rem',
								'--border-radius': '0.8rem',
								borderRadius: '0.8rem',
							}}
							routerLink={element.target?.url}
						>
							<ZIonImg
								src={
									predefinedMusicPlatformImagesInWhite[
										element.musicCardType as LinkInBioMusicPlatformEnum
									]
								}
								style={{ width: '25px' }}
								className='me-2'
							/>
							<ZIonText>
								<h5
									className={classNames(fontFamily, {
										'ion-no-padding ion-no-margin': true,
									})}
								>
									Listen on {element.title}
								</h5>
							</ZIonText>
						</ZIonButton>
					);
				})}
		</ZIonCol>
	);
};

export default ZLinkInBioMusicBlock;
