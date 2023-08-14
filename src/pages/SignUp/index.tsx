// Core Imports
import React from 'react';

// Package Imports

// Custom Imports
import ZIonPage from '@/components/ZIonPage';
import ZaionsSeparator from '@/components/InPageComponents/ZaionsSepatator/ZaionsSeparator';
import ZaionsSignUpOptions from '@/components/ZaionsSignUpPage/ZaionsSignUpOptions';
import ZaionsSignUpForm from '@/components/ZaionsSignUpPage/ZaionsSignUpForm';
import { ZIonContent, ZIonGrid } from '@/components/ZIonComponents';
import ZaionsSecondaryHeader from '@/components/InPageComponents/ZaionsSecondaryHeader';

const SignUp: React.FC = () => {
	return (
		<ZIonPage pageTitle='Login Page'>
			{/* Page Content */}
			<ZIonContent fullscreen>
				<ZaionsSecondaryHeader />
				<ZIonGrid>
					<ZaionsSignUpOptions />
					<ZaionsSeparator
						sizeXl='5'
						sizeLg='5.7'
						sizeMd='6.5'
						sizeSm='10'
						sizeXs='12'
					/>
					<ZaionsSignUpForm />
				</ZIonGrid>
			</ZIonContent>
		</ZIonPage>
	);
};

export default SignUp;
