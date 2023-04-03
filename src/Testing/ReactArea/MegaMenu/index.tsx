// Packages Imports
import { IonToolbar, IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router';

// Custom Imports
import {
	ZIonContent,
	ZIonHeader,
	ZIonItem,
	ZIonLabel,
	ZIonList,
	ZIonMenu,
	ZIonMenuButton,
	ZIonMenuToggle,
	ZIonTitle,
} from '@/components/ZIonComponents';

const MegaMenu: React.FC = () => {
	return (
		<ZIonMenu type='overlay'>
			<ZIonHeader>
				<IonToolbar>
					<ZIonTitle>Menu</ZIonTitle>
				</IonToolbar>
			</ZIonHeader>
			<ZIonContent>
				<ZIonList>
					<ZIonMenuToggle>
						<ZIonItem>
							<ZIonLabel>Home</ZIonLabel>
						</ZIonItem>
					</ZIonMenuToggle>
					<ZIonMenuToggle>
						<ZIonItem>
							<ZIonLabel>About</ZIonLabel>
						</ZIonItem>
						<ZIonList>
							<ZIonMenuToggle>
								<ZIonItem>
									<ZIonLabel>Our Team</ZIonLabel>
								</ZIonItem>
							</ZIonMenuToggle>
							<ZIonMenuToggle>
								<ZIonItem>
									<ZIonLabel>History</ZIonLabel>
								</ZIonItem>
							</ZIonMenuToggle>
							<ZIonMenuToggle>
								<ZIonItem>
									<ZIonLabel>Mission</ZIonLabel>
								</ZIonItem>
							</ZIonMenuToggle>
						</ZIonList>
					</ZIonMenuToggle>
					<ZIonMenuToggle>
						<ZIonItem>
							<ZIonLabel>Contact</ZIonLabel>
						</ZIonItem>
					</ZIonMenuToggle>
				</ZIonList>
			</ZIonContent>
		</ZIonMenu>
	);
};

const MegaMenuApp: React.FC = () => {
	return (
		<IonApp>
			<IonReactRouter>
				<IonRouterOutlet>
					<Route path='/home' exact={true}>
						<>
							<h1>home</h1>
							<ZIonMenuButton />
						</>
					</Route>
					<Route path='/about' exact={true}>
						<>
							<h1>about</h1>
						</>
					</Route>
					<Route path='/contact'>
						<>
							<h1>contact</h1>
						</>
					</Route>
					<Route exact path='/' render={() => <Redirect to='/home' />} />
				</IonRouterOutlet>
			</IonReactRouter>
			<MegaMenu />
			<ZIonMenu />
		</IonApp>
	);
};

export const MegaMenuApp2: React.FC = () => {
	return (
		<IonApp>
			<MegaMenu />
			<IonRouterOutlet />
		</IonApp>
	);
};

export default MegaMenuApp;
