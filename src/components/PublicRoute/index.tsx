import { ZRoutesRedirects } from '@/utils/constants/RoutesConstants';
import MESSAGES from '@/utils/messages';
import { IsAuthenticatedRStateSelector } from '@/ZaionsStore/UserAccount/index.recoil';
import { IonLoading } from '@ionic/react';
import { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const PublicRoute = ({ component, restricted = true, ...rest }: any) => {
	return (
		// restricted = false meaning public route
		// restricted = true meaning restricted route
		<Suspense
			fallback={
				<IonLoading
					isOpen
					message={MESSAGES.GENERAL.ROUTE_FALLBACK_SUSPENSE_MESSAGE}
				/>
			}
		>
			<PublicRouteAsync
				component={component}
				restricted={restricted}
				{...rest}
			/>
		</Suspense>
	);
};
const PublicRouteAsync = ({
	component: Component,
	restricted,
	...rest
}: any) => {
	const loggedIn = useRecoilValue(IsAuthenticatedRStateSelector);

	return (
		// restricted = false meaning public route
		// restricted = true meaning restricted route
		<Route
			{...rest}
			render={(props) =>
				loggedIn && restricted ? (
					<Redirect to={ZRoutesRedirects.AUTHENTICATED_USER_REDIRECT} />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export default PublicRoute;
