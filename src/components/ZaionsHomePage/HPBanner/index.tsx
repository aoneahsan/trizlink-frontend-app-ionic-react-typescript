// Core Imports

// Packages Imports
import { HomePageHeroDesktopImage } from '@/assets/images';
import { ZIonButton } from '@/components/ZIonComponents';
import { useMediaQuery } from 'react-responsive';

// Custom Imports
import {
	ZIonCol,
	ZIonText,
	ZIonRouterLink,
	ZIonRow,
	ZIonGrid,
	ZIonImg,
} from '@/components/ZIonComponents';

// Global Constants
import { BRACKPOINT_LG, BRACKPOINT_MD, BRACKPOINT_SM } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Style
import classes from './styles.module.css';
import classNames from 'classnames';

const ZaionsHPBanner: React.FC = () => {
	const isLgScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_LG})`,
	});

	const isMdScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_MD})`,
	});

	const isSmScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_SM})`,
	});

	return (
		<>
			<ZIonGrid fixed className=''>
				<ZIonRow>
					<ZIonCol
						sizeXl='8'
						offsetXl='0'
						offsetLg='2'
						sizeLg='12'
						sizeMd='12'
						sizeSm='12'
						sizeXs='12'
						className={`${!isLgScale ? 'ion-text-center' : ''}`}
					>
						<ZIonText>
							<h1 className='text-4xl font-bold ion-padding-top ion-margin-top zaions__color_dark zaions__heading'>
								We’ve expanded! <br /> Shorten URLs. Generate QR Codes. <br />
								And now, create Link-in-bios.
							</h1>
						</ZIonText>

						<div
							className={classNames({
								// 'ion-text-center': true,
								'w-max': !isLgScale,
							})}
						>
							<ZIonRouterLink routerLink=''>
								<ZIonButton
									className='mb-3 ion-text-capitalize ion-margin-top'
									color='primary'
									fill='solid'
									// size='default'
									size={!isSmScale ? 'default' : 'large'}
									expand={!isSmScale ? 'block' : undefined}
								>
									Get Started For Free
								</ZIonButton>
							</ZIonRouterLink>
							{/* <br /> */}
							<ZIonText
								className={`${classes.zaions__bannerQuote_btn} ion-text-capitalize mt-1 block`}
								color='primary'
							>
								Get a Quote
							</ZIonText>
						</div>
					</ZIonCol>
					<ZIonCol sizeXl='4' sizeLg='12' sizeMd='12' sizeSm='12' sizeXs='12'>
						<ZIonImg
							src={HomePageHeroDesktopImage}
							style={{
								width: !isMdScale ? '100%' : '460px',
								minWidth: isLgScale ? '60%' : '100%',
							}}
							alt=''
							className='mx-auto'
						/>
					</ZIonCol>
				</ZIonRow>
			</ZIonGrid>
		</>
	);
};

export default ZaionsHPBanner;
