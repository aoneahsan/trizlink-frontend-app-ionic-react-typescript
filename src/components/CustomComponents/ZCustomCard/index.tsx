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
	ZIonCard,
	ZIonCardContent,
	ZIonCardHeader,
	ZIonCardTitle,
	ZIonCol,
	ZIonImg,
	ZIonText,
} from '@/components/ZIonComponents';
import {
	videoBlockEmptyState,
	rssWithBackground,
	audioBlockEmptyState,
	carouselPreviewBlock,
} from '@/assets/images';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { LinkInBioCardStyleEnum } from '@/types/AdminPanel/linkInBioType/blockTypes';
import { ZMediaEnum } from '@/types/zaionsAppSettings.type';
import ZReactMediaPlayer from '../ZCustomAudio';
import { useRecoilValue } from 'recoil';
import { NewLinkInBioFormState } from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioFormState.recoil';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
// import classes from './styles.module.css';

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */
interface ZCustomCardInterface {
	title?: string;
	description?: string;
	mediaLink?: string;
	type?: LinkInBioCardStyleEnum;
	mediaType?: ZMediaEnum;
	image?: string;
}

/**
 * Functional Component
 * About: Generic card...
 * @type {*}
 * */

const ZCustomCard: React.FC<ZCustomCardInterface> = ({
	title,
	description,
	mediaLink,
	type = LinkInBioCardStyleEnum.horizontal,
	mediaType = ZMediaEnum.image,
	image,
}) => {
	// getting the custom style for all the buttons from linkInBioFormState recoil.
	const linkInBioFormState = useRecoilValue(NewLinkInBioFormState);

	return (
		<ZIonCol>
			<ZIonCard
				className={classNames({
					'ion-no-padding ion-no-margin': true,
					flex:
						type === LinkInBioCardStyleEnum.thumbCircle ||
						type === LinkInBioCardStyleEnum.thumbRound ||
						type === LinkInBioCardStyleEnum.thumbStrip,
					'ion-align-items-center':
						type === LinkInBioCardStyleEnum.thumbCircle ||
						type === LinkInBioCardStyleEnum.thumbRound,
				})}
			>
				<ZIonCardHeader
					className={classNames({
						'ion-no-padding ion-no-margin flex ion-justify-content-center ion-align-items-center':
							true,

						'ion-margin':
							type === LinkInBioCardStyleEnum.thumbCircle ||
							type === LinkInBioCardStyleEnum.thumbRound,
						'border-radius__100vmax':
							type === LinkInBioCardStyleEnum.thumbCircle,
					})}
					color='primary'
					style={{
						width:
							type === LinkInBioCardStyleEnum.horizontal ||
							type === LinkInBioCardStyleEnum.vertical
								? '100%'
								: type === LinkInBioCardStyleEnum.thumbCircle ||
								  type === LinkInBioCardStyleEnum.thumbRound
								? '350px'
								: '100%',
						height:
							type === LinkInBioCardStyleEnum.horizontal
								? '160px'
								: type === LinkInBioCardStyleEnum.vertical
								? '330px'
								: type === LinkInBioCardStyleEnum.thumbStrip
								? 'auto'
								: '110px',
						position: 'relative',
						borderRadius: type === LinkInBioCardStyleEnum.thumbRound && '15px',
						overflow: 'hidden',
					}}
				>
					{/* If no image provided or get from api the default image */}
					{!mediaLink && (
						<ZIonImg
							src={
								image?.trim()
									? image
									: mediaType === ZMediaEnum.image
									? rssWithBackground
									: mediaType === ZMediaEnum.video
									? videoBlockEmptyState
									: mediaType === ZMediaEnum.audio
									? audioBlockEmptyState
									: mediaType === ZMediaEnum.carousel
									? carouselPreviewBlock
									: ''
							}
							style={{
								width:
									mediaType === ZMediaEnum.video ||
									mediaType === ZMediaEnum.audio
										? '161px'
										: '100%',
								height: '100%',
								position: 'absolute',
								objectFit: 'cover',
							}}
						/>
					)}

					{/* For Image */}
					{mediaLink && mediaType === ZMediaEnum.image && (
						<ZIonImg
							src={mediaLink}
							style={{
								width: '100%',
								height: '100%',
								position: 'absolute',
								objectFit: 'cover',
							}}
						/>
					)}

					{/* For Video */}
					{mediaLink && mediaType === ZMediaEnum.video && (
						<ZReactMediaPlayer
							playerProps={{ url: mediaLink, width: '100%', height: '100%' }}
							mediaType='video'
						/>
					)}

					{/* For audio */}
					{mediaLink && mediaType === ZMediaEnum.audio && (
						<ZReactMediaPlayer
							playerProps={{ url: mediaLink, width: '100%', height: '100%' }}
							mediaType='audio'
						/>
					)}
				</ZIonCardHeader>
				{(title || description) && (
					<ZIonCardContent
						className={classNames({
							'ion-margin-top': true,
							'ion-text-center':
								type === LinkInBioCardStyleEnum.horizontal ||
								type === LinkInBioCardStyleEnum.vertical,
							'ion-text-start':
								type === LinkInBioCardStyleEnum.thumbCircle ||
								type === LinkInBioCardStyleEnum.thumbRound ||
								type === LinkInBioCardStyleEnum.thumbStrip,
						})}
					>
						<ZIonCardTitle
							className={classNames(linkInBioFormState?.theme?.font, {
								'font-bold': true,
								'mb-2':
									type === LinkInBioCardStyleEnum.horizontal ||
									type === LinkInBioCardStyleEnum.vertical,
								'flex flex-col ion-justify-content-center':
									type === LinkInBioCardStyleEnum.thumbCircle ||
									type === LinkInBioCardStyleEnum.thumbRound ||
									type === LinkInBioCardStyleEnum.thumbStrip,
							})}
						>
							{title}
						</ZIonCardTitle>
						<ZIonText
							style={{
								width:
									type === LinkInBioCardStyleEnum.thumbCircle ||
									type === LinkInBioCardStyleEnum.thumbRound ||
									type === LinkInBioCardStyleEnum.thumbStrip
										? '200px'
										: '100%',
							}}
							className={classNames(linkInBioFormState?.theme?.font, {
								'inline-block': true,
							})}
						>
							{description}
						</ZIonText>
					</ZIonCardContent>
				)}
			</ZIonCard>
		</ZIonCol>
	);
};

export default ZCustomCard;
