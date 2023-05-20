/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { IonToolbar } from '@ionic/react';
import { useMediaQuery } from 'react-responsive';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonCol,
	ZIonRow,
	ZIonText,
	ZIonButton,
	ZIonHeader,
	ZIonGrid,
	ZIonRouterLink,
	ZIonImg,
} from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import {
	BRACKPOINT_LG,
	BRACKPOINT_MD,
	BRACKPOINT_XL,
	PRODUCT_NAME,
} from '../../utils/constants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state is a Type import
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
 * Component props type Imports go down
 * ? Like if you have a type for props it should be place Down
 * */
import ZaionsDropDown from '@/components/InPageComponents/ZaionsDropdown';
import ZIonTitle from '@/components/ZIonComponents/ZIonTitle';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Functional Component
 * About: (Custom Header of Product)
 * @type {*}
 * */
const Header: React.FC = () => {
	const is1201Scale = useMediaQuery({
		query: `(min-width: 1201px)`,
	});
	const isXlScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_XL})`,
	});
	const isLgScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_LG})`,
	});
	const isMdScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_MD})`,
	});

	return (
		<>
			<ZIonHeader className={`${classes.zaions__postion_sticky} `}>
				<IonToolbar className={`${isXlScale ? ' ion-padding-horizontal' : ''}`}>
					<ZIonGrid>
						<ZIonRow>
							<ZIonCol
								className={`${classes.zaions__nav} ${
									isXlScale ? classes.zaions_gap3 : classes.zaions_gap2
								} ion-justify-content-start ion-align-items-center`}
							>
								{/* {!isLgScale ? <ZIonMenuButton></ZIonMenuButton> : ''} */}
								<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
									<ZIonImg
										src={ProductLogo}
										alt={`${PRODUCT_NAME} Logo`}
										className={`logo ion-margin-horizontal ion-padding-horizontal ps-4 ms-5`}
									/>
								</ZIonRouterLink>
								{isLgScale && (
									<ZaionsDropDown
										title={`Why ${PRODUCT_NAME}?`}
										className='zaions__nav_item '
										items={[
											{
												id: '1',
												title: 'mamam',
												link: 'dmdmdm',
											},
										]}
									/>
								)}
								{isLgScale && (
									<ZaionsDropDown
										title='Products'
										className='zaions__nav_item'
										items={[
											{
												id: '1',
												title: 'mamam',
												link: 'dmdmdm',
											},
										]}
									/>
								)}
								{isLgScale && (
									<ZIonRouterLink
										routerLink={ZaionsRoutes.HomeRoute}
										className={`zaions__nav_item  mb-4`}
										color='dark'
									>
										<ZIonText color='danger'>Pricing</ZIonText>
									</ZIonRouterLink>
								)}

								{isLgScale && (
									<ZaionsDropDown
										title='Resources'
										className='zaions__nav_item'
										items={[
											{
												id: '1',
												title: 'mamam',
												link: 'dmdmdm',
											},
										]}
									/>
								)}
							</ZIonCol>
							<ZIonCol
								className={`${
									is1201Scale ? classes.zaions__nav_col_two_space : 'pe-5'
								} flex ion-justify-content-end ion-align-items-center`}
							>
								{isMdScale && (
									<ZIonRouterLink
										routerLink={ZaionsRoutes.LoginRoute}
										color='dark'
									>
										<ZIonTitle className={`${classes.zaions_nav_button} mb-4`}>
											Login
										</ZIonTitle>
									</ZIonRouterLink>
								)}
								{isMdScale && (
									<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
										<ZIonTitle
											className={`${classes.zaions_nav_button} ${
												isXlScale ? '' : 'ms-1 ps-1'
											} mb-4`}
										>
											Sign up Free
										</ZIonTitle>
									</ZIonRouterLink>
								)}
								{isMdScale && (
									<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
										<ZIonButton
											className={`${classes.zaions_nav_button} ion-text-capitalize ms-2 mb-4`}
										>
											Get a Quote
										</ZIonButton>
									</ZIonRouterLink>
								)}
							</ZIonCol>
						</ZIonRow>
					</ZIonGrid>
				</IonToolbar>
			</ZIonHeader>
		</>
	);
};

export default Header;
