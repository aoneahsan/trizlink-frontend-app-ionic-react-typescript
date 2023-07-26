// Core Imports
import React from 'react';

// Packages Import
import { codeOutline, warningOutline } from 'ionicons/icons';
import RCSwitch from 'rc-switch';

// Custom Imports
import {
	ZIonCol,
	ZIonText,
	ZIonIcon,
	ZIonRouterLink,
	ZIonTitle,
} from '@/components/ZIonComponents';

// Global Constants

// Images

// Recoil States
import { ZIonButton } from '@/components/ZIonComponents';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import ZaionsEmbedWidgetsModal from '@/components/InPageComponents/ZaionsModals/AddEmbedWidgets';

// Types

// Styles

const EmbedWidget: React.FC = () => {
	const { presentZIonModal: presentZEmbedWidgetsModal } = useZIonModal(
		ZaionsEmbedWidgetsModal
	);

	return (
		<>
			<ZIonCol
				sizeXl='5.9'
				sizeLg='5.9'
				sizeMd='5.9'
				sizeSm='12'
				sizeXs='12'
				className='py-3 border zaions__bg_white'
			>
				<div className='flex pb-2 ion-align-items-center border-bottom ion-padding-start'>
					<ZIonIcon icon={codeOutline} size='large' />
					<ZIonText className='font-bold ion-no-margin ps-2'>
						Embed Widget
						<ZIonRouterLink
							className='ms-1'
							routerLink={ZaionsRoutes.HomeRoute}
						>
							(help)
						</ZIonRouterLink>
					</ZIonText>
					<RCSwitch
						className='ms-auto me-2'
						checked={false}
						checkedChildren='on'
						unCheckedChildren='off'
					/>
				</div>
				<div className='block px-4 mt-4'>
					<ZIonTitle
						className='block px-3 py-2 border rounded border-warning ion-align-items-center'
						color={'warning'}
						size='small'
					>
						<ZIonIcon icon={warningOutline} className='pe-2'></ZIonIcon> Use
						your own domain to activate this option{' '}
						<ZIonRouterLink
							routerLink={ZaionsRoutes.HomeRoute}
							className='underline'
							color={'warning'}
						>
							(learn more)
						</ZIonRouterLink>
					</ZIonTitle>
					<ZIonButton
						fill='clear'
						onClick={() => {
							presentZEmbedWidgetsModal({
								_cssClass: 'embed-widget-modal-size',
							});
						}}
						className='mt-3 ion-text-capitalize'
						size='small'
					>
						Add a new embed widget
					</ZIonButton>
				</div>
			</ZIonCol>
		</>
	);
};

export default EmbedWidget;
