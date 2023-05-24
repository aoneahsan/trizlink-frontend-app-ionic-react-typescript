// Core Imports
import React from 'react';
// Packages Import
import { privacy } from '@/assets/images';
import { useMediaQuery } from 'react-responsive';

// Custom Imports
import {
	ZIonCol,
	ZIonRow,
	ZIonText,
	ZIonItem,
	ZIonInput,
	ZIonImg,
} from '@/components/ZIonComponents';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';

// Global Constants
import { BRACKPOINT_LG } from '@/utils/constants';
import { ZIonButton } from '@/components/ZIonComponents';

// Images

// Recoil States

// Types

// Styles

const APSettingsPrivacy: React.FC = () => {
	const isLgScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_LG})`,
	});
	return (
		<>
			<ZIonRow className='py-4 px-4 zaions__bg_white mx-4 mt-5'>
				{' '}
				<ZIonCol sizeXl='6' sizeLg='6' sizeMd='6' sizeSm='6' sizeXs='12'>
					<ZIonText className='p-0 mb-2 font-bold' color={'primary'}>
						Privacy popup
					</ZIonText>
					<ZIonText className='block mt-3' color={'medium'}>
						In order to be compliant with data-protection regulation, you can{' '}
						<br />
						add a privacy popup to let your users consent the use of cookies{' '}
						<br /> and tracking solutions.name to get links like
						links.company.com instead of hi.zaions.com.
					</ZIonText>
					<ZIonText className='block mt-3' color={'medium'}>
						Set-up your privacy Policy popup below.
					</ZIonText>
				</ZIonCol>
				<ZIonCol sizeXl='6' sizeLg='6' sizeMd='6' sizeSm='6' sizeXs='12'>
					<div className=''>
						<ZIonImg
							src={privacy}
							className={`mx-auto ${
								!isLgScale ? 'w-full mt-5' : 'zaions__w60 '
							}`}
						/>
					</div>
				</ZIonCol>
			</ZIonRow>
			<ZIonRow className='py-4 px-4 zaions__bg_white mx-4 mt-5 ion-align-items-center'>
				<ZIonCol>
					<ZIonText className='p-0 mb-2 font-bold' color={'primary'}>
						Setup your GDPR/CCPA popup
					</ZIonText>
				</ZIonCol>
				<ZIonCol className='ion-text-end'>
					<ZIonButton>Save</ZIonButton>
				</ZIonCol>
			</ZIonRow>
			<ZIonRow className='py-4 px-4 zaions__bg_white mx-4 mt-1 ion-align-items-center'>
				<ZIonCol sizeXl='4' sizeLg='5' sizeMd='6' sizeSm='8' sizeXs='12'>
					<ZIonItem>
						<ZIonInput label='Company Name' labelPlacement='floating' />
					</ZIonItem>
				</ZIonCol>
			</ZIonRow>
			<ZIonRow className='py-4 px-4 zaions__bg_white mx-4 mt-1 ion-align-items-center'>
				<ZIonCol sizeXl='4' sizeLg='5' sizeMd='6' sizeSm='8' sizeXs='12'>
					<ZIonItem>
						<ZIonInput
							label='Link to your privacy policy*'
							labelPlacement='floating'
						/>
					</ZIonItem>
				</ZIonCol>
			</ZIonRow>
			<ZIonRow className='py-4 px-4 zaions__bg_white mx-4 mt-1 ion-align-items-center mb-3'>
				<ZIonCol sizeXl='4' sizeLg='5' sizeMd='6' sizeSm='8' sizeXs='12'>
					<ZIonText className='p-0 mb-2' color={'dark'}>
						Activate on all my links with Pixels - Off
					</ZIonText>
				</ZIonCol>
				<ZIonCol className='ion-text-end'>
					<ZRCSwitch />
				</ZIonCol>
			</ZIonRow>
		</>
	);
};

export default APSettingsPrivacy;
