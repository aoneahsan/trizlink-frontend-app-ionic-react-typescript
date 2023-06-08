// Core Imports
import React from 'react';
// Packages Imports
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';

// Custom Imports
import ZaionsHr from '@/components/InPageComponents/Zaions_hr';
import {
	ZIonCol,
	ZIonText,
	ZIonRouterLink,
	ZIonRow,
	ZIonGrid,
	ZIonIcon,
	ZIonInput,
} from '@/components/ZIonComponents';

// Style
import classes from './styles.module.css';

// Images
import { vector } from '@/assets/images';

// Global Constant
import {
	BRACKPOINT_LG,
	BRACKPOINT_SM,
	BRACKPOINT_XL,
	PRODUCT_NAME,
} from '@/utils/constants';
import { ZIonButton } from '@/components/ZIonComponents';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { caretDownOutline } from 'ionicons/icons';

const ZaionsHPShortLink: React.FC = () => {
	const isXlScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_XL})`,
	});
	const isLgScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_LG})`,
	});
	const isSmScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_SM})`,
	});

	return (
		<>
			<div
				className={classNames({
					'ion-text-center ion-margin-bottom': true,
					'ion-padding-bottom': isSmScale,
				})}
			>
				<ZaionsHr />
				<ZIonText>
					Bringing us all a
					<ZIonText color='secondary' className='mx-1'>
						bit
					</ZIonText>
					closer. Discover our Connections Platform below.
					<ZIonIcon
						icon={caretDownOutline}
						className='block w-6 h-6 mx-auto'
						color='secondary'
					/>
				</ZIonText>
			</div>
			<div
				className={classNames({
					'ion-text-center': true,
					'mt-5': isSmScale,
				})}
			>
				<ZIonGrid className='px-0'>
					<ZIonRow
						className={classNames({
							'ion-align-items-start ion-padding-top ion-padding-bottom zaions_secondary_color':
								true,
							'ion-text-center': isXlScale,
						})}
					>
						<ZIonCol></ZIonCol>
						<ZIonCol
							sizeXl='6.8'
							sizeLg='8'
							sizeMd='12'
							sizeSm='12'
							sizeXs='12'
							className='ion-margin-end'
						>
							<ZIonInput
								label='Shorten your link'
								labelPlacement='floating'
								fill='solid'
								className='mt-1 ion-text-start'
							/>
							<ZIonText color='medium' style={{ fontSize: '13px' }}>
								By clicking SHORTEN, you are agreeing to {PRODUCT_NAME}'s{' '}
								<ZIonRouterLink
									routerLink=''
									className='underline'
									color='medium'
								>
									Terms of Service
								</ZIonRouterLink>
								,{' '}
								<ZIonRouterLink
									routerLink=''
									className='underline'
									color='medium'
								>
									Privacy Policy
								</ZIonRouterLink>
								, and{' '}
								<ZIonRouterLink
									routerLink=''
									className='underline'
									color='medium'
								>
									Acceptable Use Policy
								</ZIonRouterLink>
							</ZIonText>
						</ZIonCol>
						<ZIonCol
							sizeXl='2.6'
							sizeLg='3'
							sizeMd='12'
							sizeSm='12'
							sizeXs='12'
							className={`${
								!isLgScale ? '' : 'ion-padding-start'
							} ion-text-start `}
						>
							{' '}
							<ZIonRow>
								<ZIonCol
									sizeXl='12'
									sizeLg='12'
									sizeMd='3'
									sizeSm='3'
									sizeXs='12'
									className={`${!isLgScale ? 'mx-auto' : ''} my-0 py-0`}
								>
									<ZIonButton
										className={`${classes.zaions__shortlink_btn} ion-text-capitalize`}
										color='primary'
										size='large'
										expand='block'
									>
										Shorten
									</ZIonButton>
								</ZIonCol>
							</ZIonRow>
						</ZIonCol>
						<ZIonCol></ZIonCol>
					</ZIonRow>
				</ZIonGrid>
			</div>
		</>
	);
};

export default ZaionsHPShortLink;
