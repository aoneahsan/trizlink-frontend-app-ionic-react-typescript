// Core Imports
import React from 'react';

// Packages Imports
import { IonToolbar } from '@ionic/react';
import { useMediaQuery } from 'react-responsive';

// Custom Imports
import {
	ZIonText,
	ZIonRouterLink,
	ZIonMenu,
	ZIonTitle,
	ZIonImg,
	ZIonContent,
	ZIonHeader,
} from '@/components/ZIonComponents';

// Global Constants
import {
	BRACKPOINT_LG,
	BRACKPOINT_MD,
	CONTENT_ID,
	PRODUCT_NAME,
} from '@/utils/constants';

import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Styles
import classes from './styles.module.css';
import { ProductLogo } from '@/assets/images';
import { PAGE_MENU_SIDE } from '@/utils/enums';
import { ZIonButton } from '@/components/ZIonComponents';

type SideBarMenuPropsType = {
	menuSide?: PAGE_MENU_SIDE;
};

// Functional Component
const SideBarMenu: React.FC<SideBarMenuPropsType> = ({ menuSide }) => {
	const isLgScale = useMediaQuery({
		query: `(max-width: ${BRACKPOINT_LG})`,
	});
	const isMdScale = useMediaQuery({
		query: `(max-width: ${BRACKPOINT_MD})`,
	});
	return (
		<>
			{isLgScale || isMdScale ? (
				<ZIonMenu
					contentId={CONTENT_ID}
					menuId='sidebarmenu'
					side={menuSide || 'start'}
				>
					<ZIonHeader>
						<IonToolbar className='py-1'>
							{/* <ZIonTitle>{PRODUCT_NAME}</ZIonTitle> */}
							<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
								<ZIonImg
									src={ProductLogo}
									className='mx-auto pe-3'
									style={{ width: '100px' }}
								/>
							</ZIonRouterLink>
						</IonToolbar>
					</ZIonHeader>
					<ZIonContent className='ion-padding'>
						<div className='pb-1 ion-margin-bottom'>
							<ZIonTitle className='mb-2 font-bold ps-0' color={'tertiary'}>
								Why {PRODUCT_NAME}?
							</ZIonTitle>

							<ZIonRouterLink routerLink='' color='dark' className='block mb-2'>
								<ZIonText className='zaions__fs_16'>
									{PRODUCT_NAME} 101
								</ZIonText>
							</ZIonRouterLink>
							<ZIonRouterLink routerLink='' color='dark' className='block mb-2'>
								<ZIonText className='zaions__fs_16'>
									Integrations & API
								</ZIonText>
							</ZIonRouterLink>
							<ZIonRouterLink routerLink='' color='dark' className='block mb-2'>
								<ZIonText className='zaions__fs_16'>Enterprise Class</ZIonText>
							</ZIonRouterLink>
							<ZIonRouterLink routerLink='' color='dark' className='block mb-2'>
								<ZIonText className='zaions__fs_16'>Pricing</ZIonText>
							</ZIonRouterLink>
						</div>

						<div className='pb-1 ion-margin-bottom'>
							<ZIonTitle className='mb-2 font-bold ps-0' color={'tertiary'}>
								Products
							</ZIonTitle>

							<ZIonRouterLink routerLink='' color='dark' className='block mb-2'>
								<ZIonText className='zaions__fs_16'>Link Management</ZIonText>
							</ZIonRouterLink>
							<ZIonRouterLink routerLink='' color='dark' className='block mb-2'>
								<ZIonText className='zaions__fs_16'>QR Codes</ZIonText>
							</ZIonRouterLink>
							<ZIonRouterLink routerLink='' color='dark' className='block mb-2'>
								<ZIonText className='zaions__fs_16'>Link-in-bio</ZIonText>
							</ZIonRouterLink>
						</div>

						<div className='pb-1 ion-margin-bottom'>
							<ZIonTitle className='mb-2 font-bold ps-0' color={'tertiary'}>
								Resources
							</ZIonTitle>

							<ZIonRouterLink
								routerLink={ZaionsRoutes.HomeRoute}
								color='dark'
								className='block mb-2'
							>
								<ZIonText className='zaions__fs_16'>Developers</ZIonText>
							</ZIonRouterLink>
							<ZIonRouterLink routerLink='' color='dark' className='block mb-2'>
								<ZIonText className='zaions__fs_16'>Resource Library</ZIonText>
							</ZIonRouterLink>
							<ZIonRouterLink routerLink='' color='dark' className='block mb-2'>
								<ZIonText className='zaions__fs_16'>Blog</ZIonText>
							</ZIonRouterLink>
							<ZIonRouterLink
								routerLink={ZaionsRoutes.HomeRoute}
								color='dark'
								className='block mb-2'
							>
								<ZIonText className='zaions__fs_16'>Support</ZIonText>
							</ZIonRouterLink>
						</div>

						{isMdScale && (
							<div className='px-1 pb-2 '>
								{isMdScale && (
									<ZIonRouterLink routerLink={ZaionsRoutes.LoginRoute}>
										{' '}
										<ZIonButton
											expand='block'
											className={`mb-4 font-bold`}
											fill='clear'
										>
											Login
										</ZIonButton>
									</ZIonRouterLink>
								)}
								{isMdScale && (
									<ZIonRouterLink routerLink=''>
										{' '}
										<ZIonButton
											expand='block'
											className={`mb-4 ${classes.zaions__sidebar_signupbtn}`}
											fill='clear'
										>
											Sign up Free
										</ZIonButton>
									</ZIonRouterLink>
								)}
								{isMdScale && (
									<ZIonButton expand='block' className={`mb-4`}>
										Get a Quote
									</ZIonButton>
								)}
							</div>
						)}
					</ZIonContent>
				</ZIonMenu>
			) : (
				''
			)}
		</>
	);
};

// Exports
export default SideBarMenu;
