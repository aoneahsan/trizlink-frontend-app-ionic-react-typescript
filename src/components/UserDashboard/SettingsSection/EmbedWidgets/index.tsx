// Core Imports
import React from 'react';

// Packages Import
import { useRecoilValue } from 'recoil';

// Custom Imports
import {
	ZIonCol,
	ZIonRow,
	ZIonText,
	ZIonRouterLink,
	ZIonImg,
} from '@/components/ZIonComponents';

// Global Constants

// Images
import { noScript } from '@/assets/images';

// Recoil States
import { EmbedWidgetsState } from '@/ZaionsStore/UserDashboard/EmbedWidgetsState';

// Types

// Styles

import EmbedWidgetsTable from '@/components/InPageComponents/ZaionsTable/embedWidgetsTable';
import { ZIonButton } from '@/components/ZIonComponents';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import ZaionsEmbedWidgetsModal from '@/components/InPageComponents/ZaionsModals/AddEmbedWidgets';

const APSettingsEmbedWidgets: React.FC = () => {
	const { presentZIonModal: presentZEmbedWidgetsModal } = useZIonModal(
		ZaionsEmbedWidgetsModal
	);
	const embedWidgetsData = useRecoilValue(EmbedWidgetsState);
	return (
		<>
			<ZIonRow className='py-4 px-4 zaions__bg_white mx-4 mt-5 ion-align-items-center'>
				<ZIonCol
					sizeXl='6'
					sizeLg='6'
					sizeMd='6'
					sizeSm='6'
					sizeXs='12'
					className=''
				>
					<ZIonText className='p-0 font-bold' color={'dark'}>
						Add third-party widgets & embed scripts{' '}
						<ZIonRouterLink>(learn more)</ZIonRouterLink>
					</ZIonText>
				</ZIonCol>
				<ZIonCol
					sizeXl='6'
					sizeLg='6'
					sizeMd='6'
					sizeSm='6'
					sizeXs='12'
					className='ion-text-end'
				>
					<ZIonButton
						className='ion-text-capitalize'
						onClick={() => {
							presentZEmbedWidgetsModal({
								_cssClass: 'embed-widget-modal-size',
							});
						}}
					>
						Add
					</ZIonButton>
				</ZIonCol>
			</ZIonRow>

			{embedWidgetsData.length ? (
				<EmbedWidgetsTable />
			) : (
				<ZIonRow className='py-4 px-4 zaions__bg_white mx-4 mt-5 ion-align-items-center'>
					<ZIonCol className='ion-text-center pt-5'>
						<ZIonText
							className='p-0 font-bold inline-block mb-4'
							color={'dark'}
						>
							Integrate any embed third-party widgets on your links!
						</ZIonText>
						<br />
						<ZIonText color={'medium'}>
							For example, you can add on your links any chat widget (Intercom,{' '}
							<br />
							Crisp, Drift, etc.), quizzes (SurveyMonkey, Outgrow, Typeform
							etc), mail form <br /> (Sendinblue, Mailchimp, etc.), embed videos
							(YouTube, Vimeo, Wistia, <br /> Twitch etc.), etc. The
							possibilities are unlimited 💫
						</ZIonText>
						<br />
						<ZIonImg src={noScript} className='zaions__w50 mx-auto mt-5' />
					</ZIonCol>
				</ZIonRow>
			)}
		</>
	);
};

export default APSettingsEmbedWidgets;
