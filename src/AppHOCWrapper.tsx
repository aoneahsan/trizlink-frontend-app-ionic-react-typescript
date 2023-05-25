// Core Imports
import React from 'react';

// Packages Imports
import { setupIonicReact } from '@ionic/react';
// import { IonReactRouter } from '@ionic/react-router';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

// React-toastify package css
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';

// Custom Imports
import ZaionsApp from './ZaionsApp';
import AuthenticateHOC from './HOCs/AuthenticateHOC';

// Global Constants

setupIonicReact();

const queryClientObj = new QueryClient();

// Functional Component
const AppHOCWrapper: React.FC = () => {
	return (
		<QueryClientProvider client={queryClientObj}>
			<RecoilRoot>
				<AuthenticateHOC>
					<ZaionsApp />
				</AuthenticateHOC>
			</RecoilRoot>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default AppHOCWrapper;
