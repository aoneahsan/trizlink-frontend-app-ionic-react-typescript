// Core Import
import React from 'react';

// Packages Import
import { IonFab, IonFabButton, IonFabList } from '@ionic/react';
import { chevronUpOutline, homeOutline } from 'ionicons/icons';

// Custom Import
import { ZIonIcon } from '@/components/ZIonComponents';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

const TestingPackagesAndLogic: React.FC = () => {
	return (
		<>
			<IonFab vertical='bottom' horizontal='end'>
				<IonFabButton>
					<ZIonIcon icon={chevronUpOutline} />
				</IonFabButton>
				<IonFabList side='top'>
					{/* <IonFabButton
						routerLink={ZaionsRoutes.Testing.AWS_AMPLIFY.Main}
						color='success'
					>
						AWS A
					</IonFabButton> */}
					<IonFabButton
						routerLink={ZaionsRoutes.Testing.ReactCharts.Main}
						color='success'
					>
						CH
					</IonFabButton>
					<IonFabButton
						routerLink={ZaionsRoutes.AdminPanel.Setting.Main}
						color='success'
					>
						ST
					</IonFabButton>
					<IonFabButton
						routerLink={ZaionsRoutes.Testing.ReactTable.Main}
						color='success'
					>
						RT
					</IonFabButton>
					<IonFabButton
						routerLink={
							ZaionsRoutes.AdminPanel.ZaionsDashboard.DashboardInactive
						}
						color='success'
					>
						ZD
					</IonFabButton>
					<IonFabButton
						routerLink={ZaionsRoutes.Testing.GOOGLE_MAP.Main}
						color='success'
					>
						GM
					</IonFabButton>
					<IonFabButton
						routerLink={ZaionsRoutes.Testing.TestingTabs.Main}
						color='primary'
					>
						TT
					</IonFabButton>
					<IonFabButton
						routerLink={ZaionsRoutes.Testing.IonComponents.Main}
						color='primary'
					>
						IC
					</IonFabButton>
					<IonFabButton routerLink={ZaionsRoutes.HomeRoute} color='primary'>
						<ZIonIcon icon={homeOutline} />
					</IonFabButton>
				</IonFabList>
			</IonFab>
		</>
	);
};

export default TestingPackagesAndLogic;
