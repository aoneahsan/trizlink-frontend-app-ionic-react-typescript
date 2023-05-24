// Core Import
import React from 'react';

// Package Imports
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';

// Custom Imports
import ZaionsHr from '@/components/InPageComponents/Zaions_hr';
import {
	ZIonCol,
	ZIonText,
	ZIonRouterLink,
	ZIonImg,
	ZIonGrid,
	ZIonRow,
} from '@/components/ZIonComponents';

// Global Constants
import { BRACKPOINT_LG, BRACKPOINT_MD, BRACKPOINT_XL } from '@/utils/constants';

// Styles
import classes from './styles.module.css';
import { ZIonButton } from '@/components/ZIonComponents';

const ZaionsInpageHeader: React.FC<{
	lgImg?: string;
	label?: string | JSX.Element[] | JSX.Element;
	title: string | JSX.Element[] | JSX.Element;
	subTitle?: string | JSX.Element[] | JSX.Element;
	primaryBtnText?: string | JSX.Element[] | JSX.Element;
	isPrimaryBtn?: boolean;
	secondaryBtnText?: string | JSX.Element[] | JSX.Element;
	isSecondaryBtn?: boolean;
	extraData?: string | JSX.Element[] | JSX.Element;
	primaryBtnLinkTo?: string;
	seondaryBtnLinkTo?: string;
	className?: string | string[];
	colClassName?: string | string[];
	bottomHr?: boolean;
}> = ({
	lgImg,
	label,
	title,
	subTitle,
	primaryBtnText,
	isPrimaryBtn = true,
	secondaryBtnText,
	isSecondaryBtn,
	extraData,
	primaryBtnLinkTo,
	seondaryBtnLinkTo,
	className,
	colClassName,
	bottomHr = true,
}) => {
	// Medias
	const isXlScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_XL})`,
	});
	const isLgScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_LG})`,
	});
	const isMdScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_MD})`,
	});

	//   JSX Code
	return (
		<>
			<ZIonGrid
				className={`${classNames(classes.zaions__pb, className, {
					'pt-2 pb-5': true,
				})}`}
			>
				<ZIonRow
					className={`${classNames(classes.zaions__pb, {
						'pt-5 mt-5': isXlScale,
						'mt-0': !isXlScale,
					})}`}
				>
					<ZIonCol sizeXl='.8' sizeLg='1' sizeMd='12'>
						{!isLgScale ? (
							<ZIonImg
								src={lgImg}
								className={classNames({
									'mx-auto': true,
									'w-full': !isMdScale,
									zaions__w70: isMdScale,
								})}
							></ZIonImg>
						) : (
							''
						)}
					</ZIonCol>
					<ZIonCol
						sizeXl='10'
						sizeLg='10'
						sizeMd='12'
						sizeSm='12'
						sizeXs='12'
						className={`${classNames(colClassName, {
							// 'ms-4': !!colClassName,
							// 'mx-3': true,
						})}`}
					>
						<ZIonText className='font-bold ion-no-padding block'>
							{label}
						</ZIonText>
						<ZIonText
							className={classNames({
								'zaions__page_title ion-no-padding': true,
								'text-5xl': !isXlScale,
							})}
						>
							{title}
						</ZIonText>
						<ZIonText
							className={classNames({
								'zaions__page_subtitle ion-no-padding mt-1': true,
								'text-xl': isLgScale,
							})}
						>
							{subTitle}
						</ZIonText>
						<div
							className={classNames({
								'ion-text-center mt-4 pt-2 ': true,
								'ion-text-start': !isXlScale,
								'zaions__max_content ion-text-center': isXlScale,
							})}
						>
							{isPrimaryBtn === true ? (
								<ZIonButton
									className='ion-text-capitalize ion-margin-top'
									color='primary'
									fill='solid'
									size='large'
									expand={!isLgScale ? 'block' : undefined}
									routerLink={primaryBtnLinkTo}
								>
									{primaryBtnText}
								</ZIonButton>
							) : (
								''
							)}
							{isSecondaryBtn === true ? (
								<ZIonRouterLink routerLink={seondaryBtnLinkTo}>
									<ZIonText
										className={classNames({
											'zaions__getAQuote_btn ion-text-capitalize zaions__fs_14':
												true,
											block: isLgScale,
										})}
										color='primary'
									>
										{secondaryBtnText}
									</ZIonText>
								</ZIonRouterLink>
							) : (
								''
							)}
						</div>
						{extraData ? extraData : ''}
					</ZIonCol>
				</ZIonRow>
			</ZIonGrid>
			{bottomHr !== false ? (
				<ZIonGrid>
					<ZIonRow>
						<ZIonCol></ZIonCol>
						<ZIonCol
							sizeXl='11.2'
							sizeLg='12'
							sizeMd='12'
							sizeSm='12'
							sizeXs='12'
						>
							<ZaionsHr></ZaionsHr>
						</ZIonCol>
						<ZIonCol></ZIonCol>
					</ZIonRow>
				</ZIonGrid>
			) : (
				''
			)}
		</>
	);
};

export default ZaionsInpageHeader;
