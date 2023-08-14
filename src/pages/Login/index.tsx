// Core Imports
import React from 'react';

// Package Imports

// Custom Imports
import ZIonPage from '@/components/ZIonPage';
import ZaionsSeparator from '@/components/InPageComponents/ZaionsSepatator/ZaionsSeparator';
import ZaionsLoginOptions from '@/components/ZaionsLoginPage/ZaionsLoginOptions';
import ZaionsLoginForm from '@/components/ZaionsLoginPage/ZaionsLoginForm';
import { ZIonContent, ZIonGrid } from '@/components/ZIonComponents';
import ZaionsSecondaryHeader from '@/components/InPageComponents/ZaionsSecondaryHeader';
const Login: React.FC = () => {
	return (
		<ZIonPage pageTitle='Login Page'>
			{/* Page Content */}
			<ZIonContent fullscreen>
				<ZaionsSecondaryHeader />
				<ZIonGrid>
					<ZaionsLoginOptions />
					<ZaionsSeparator />
					<ZaionsLoginForm />
				</ZIonGrid>
			</ZIonContent>
		</ZIonPage>
	);
};

export default Login;
