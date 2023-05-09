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
import {
	ZIonButton,
	ZIonCard,
	ZIonCardContent,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonHeader,
	ZIonIcon,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import { Formik } from 'formik';
import {
	businessOutline,
	cellularOutline,
	closeOutline,
	flagOutline,
	logoFacebook,
	logoGoogle,
	logoYoutube,
	medicalOutline,
	peopleOutline,
	personOutline,
	playCircleOutline,
} from 'ionicons/icons';
import ZWorkspaceFromConnectPagesCard from '@/components/WorkspacesComponents/ConnectPagesCard';
import { workspaceFormConnectPagesEnum } from '@/types/AdminPanel/workspace';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

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

const cardsByType: {
	[key in workspaceFormConnectPagesEnum]: {
		icon: string;
		title: string;
		onClick?: React.MouseEventHandler<HTMLIonCardElement>;
	}[];
} = {
	[workspaceFormConnectPagesEnum.facebook]: [
		{ icon: flagOutline, title: 'Add Facebook pages' },
		{ icon: peopleOutline, title: 'Add Facebook groups' },
		{ icon: medicalOutline, title: 'Create a mockup page' },
	],
	[workspaceFormConnectPagesEnum.twitter]: [
		{ icon: personOutline, title: 'Add Twitter profiles' },
		{ icon: medicalOutline, title: 'Create a mockup page' },
	],
	[workspaceFormConnectPagesEnum.instagram]: [
		{ icon: businessOutline, title: 'Add Instagram business pages' },
		{ icon: personOutline, title: 'Add Instagram profiles or pages' },
		{ icon: medicalOutline, title: 'Create a mockup page' },
	],
	//
	[workspaceFormConnectPagesEnum.tiktok]: [
		{ icon: playCircleOutline, title: 'Add TikTok account' },
		{ icon: playCircleOutline, title: 'Add TikTok business profile' },
		{ icon: medicalOutline, title: 'Create a mockup page' },
	],
	[workspaceFormConnectPagesEnum.googleBusiness]: [
		{ icon: logoGoogle, title: 'Add Google Business Profile pages' },
		{ icon: medicalOutline, title: 'Create a mockup page' },
	],
	[workspaceFormConnectPagesEnum.linkedin]: [
		{ icon: businessOutline, title: 'Add LinkedIn company pages' },
		{ icon: personOutline, title: 'Add Linkedin profiles' },
		{ icon: medicalOutline, title: 'Create a mockup page' },
	],
	[workspaceFormConnectPagesEnum.pinterest]: [
		{ icon: businessOutline, title: 'Add Pinterest business pages' },
		{ icon: medicalOutline, title: 'Create a mockup page' },
	],
	[workspaceFormConnectPagesEnum.universalContent]: [],
	[workspaceFormConnectPagesEnum.youtube]: [
		{ icon: logoYoutube, title: 'Add YouTube channels' },
		{ icon: medicalOutline, title: 'Create a mockup page' },
	],
};

const ZWorkspaceConnectPagesModal: React.FC<{
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
	pageType: workspaceFormConnectPagesEnum;
}> = ({ dismissZIonModal, pageType }) => {
	// getting the cards accounting to pageType
	const cards = cardsByType[pageType];

	return (
		<Formik
			initialValues={{}}
			validate={() => {
				const errors = {};

				return errors;
			}}
			onSubmit={() => {}}
		>
			{() => {
				return (
					<>
						<ZIonHeader>
							<ZIonGrid className='w-100'>
								{/*  */}
								<ZIonRow className='ion-align-items-center'>
									{/*  */}
									<ZIonCol className='d-flex ion-align-items-center ms-3'>
										{/*  */}
										<div className='d-flex ion-align-items-center ion-justify-content-center rounded w-10 h-10 zaions__primary_bg'>
											<ZIonIcon
												icon={logoFacebook}
												className='w-7 h-7'
												color='light'
											/>
										</div>
										{/*  */}
										<div className='ms-2'>
											<ZIonText className='d-block fw-bold'>
												Connect pages
											</ZIonText>
											<ZIonText className='d-block zaions__fs_13'>
												Select what type of pages you want to connect
											</ZIonText>
										</div>
									</ZIonCol>

									{/*  */}
									<ZIonCol className='ion-text-end'>
										<ZIonButton
											fill='clear'
											onClick={() => {
												dismissZIonModal();
											}}
										>
											<ZIonIcon
												icon={closeOutline}
												className='w-6 h-6'
												color='dark'
											/>
										</ZIonButton>
									</ZIonCol>
								</ZIonRow>
							</ZIonGrid>
						</ZIonHeader>

						<ZIonContent>
							<ZIonGrid className='h-100'>
								<ZIonRow className='h-100 ion-align-items-center ion-justify-content-center'>
									{/*  */}
									{cards.map((card, index) => {
										return (
											<ZIonCol size='3' key={index}>
												<SingleCard icon={card.icon} title={card.title} />
											</ZIonCol>
										);
									})}
								</ZIonRow>
							</ZIonGrid>
						</ZIonContent>
					</>
				);
			}}
		</Formik>
	);
};

const SingleCard: React.FC<{
	icon: string;
	title: string;
	onClick?: React.MouseEventHandler<HTMLIonCardElement>;
}> = ({ icon, title, onClick }) => {
	return (
		<ZIonCard className='zaions__cursor_pointer px-2' onClick={onClick}>
			<ZIonCardContent className='ion-text-center py-5'>
				{/*  */}
				<ZIonIcon icon={icon} className='w-10 h-10 mb-2' />

				{/*  */}
				<ZIonText
					className='ion-text-center d-block mt-1 fw-bold fs-6'
					color='dark'
				>
					{title}
				</ZIonText>
			</ZIonCardContent>
		</ZIonCard>
	);
};

export default ZWorkspaceConnectPagesModal;
