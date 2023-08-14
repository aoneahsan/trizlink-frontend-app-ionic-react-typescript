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
import { ZIonCol, ZIonText } from '@/components/ZIonComponents';
import { LinkInBioThemeFontEnum } from '@/types/AdminPanel/linkInBioType';
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

interface ZLinkInBioTextBlockInterface {
	children?: string;
	fontFamily?: LinkInBioThemeFontEnum;
}

const ZLinkInBioTextBlock: React.FC<ZLinkInBioTextBlockInterface> = ({
	children,
	fontFamily,
}) => {
	return (
		<ZIonCol className='overflow-hidden line-clamp-3'>
			<ZIonText
				className={classNames(fontFamily, {
					'font-bold text-[15px]': true,
				})}
				color='light'
			>
				{children ? (
					<div dangerouslySetInnerHTML={{ __html: children }} />
				) : null}
			</ZIonText>
		</ZIonCol>
	);
};

export default ZLinkInBioTextBlock;
