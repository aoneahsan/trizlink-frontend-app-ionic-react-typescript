import { ZRoutesRedirects } from '@/utils/constants/RoutesConstants';
import MESSAGES from '@/utils/messages';
import { IsAuthenticatedRStateSelector } from '@/ZaionsStore/UserAccount/index.recoil';
import { IonLoading } from '@ionic/react';
import { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const PrivateRoute = ({ component, ...rest }: any) => {
	return (
		<Suspense
			fallback={
				<IonLoading
					isOpen
					message={MESSAGES.GENERAL.ROUTE_FALLBACK_SUSPENSE_MESSAGE}
				/>
			}
		>
			<PrivateRouteAsync component={component} {...rest} />
		</Suspense>
	);
};

const PrivateRouteAsync = ({ component: Component, ...rest }: any) => {
	const loggedIn = useRecoilValue(IsAuthenticatedRStateSelector);

	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to /sign in page

		<Route
			{...rest}
			render={(props) =>
				loggedIn ? (
					<Component {...props} />
				) : (
					<Redirect to={ZRoutesRedirects.UNAUTHENTICATED_USER_REDIRECT} />
				)
			}
		/>
	);
};

export default PrivateRoute;
