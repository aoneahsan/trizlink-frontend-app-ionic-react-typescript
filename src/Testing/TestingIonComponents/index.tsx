/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import ZaionsIonPage from '@/components/ZaionsIonPage';
import {
	ZIonAvatar,
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonIcon,
	ZIonImg,
	ZIonRow,
} from '@/components/ZIonComponents';
import { checkmarkCircle, closeCircle, ellipse } from 'ionicons/icons';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
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

const TestingIonComponents: React.FC = () => {
	// const [segmentButtons, setSegmentButtons] = useState([
	// 	'Button 1',
	// 	'Button 2',
	// 	'Button 3',
	// ]);

	// function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
	// 	// The `from` and `to` properties contain the index of the item
	// 	// when the drag started and ended, respectively
	// 	console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

	// 	// Finish the reorder and position the item in the DOM based on
	// 	// where the gesture ended. This method can also be called directly
	// 	// by the reorder group
	// 	event.detail.complete();
	// }

	const active = false;

	const buttonClasses = classNames('rounded-full', {
		'bg-green-500': active,
		'bg-red-500': !active,
	});

	const icon = active ? checkmarkCircle : closeCircle;
	const iconColor = active ? 'primary' : 'secondary';

	return (
		<ZaionsIonPage>
			<ZIonContent>
				<ZIonGrid>
					<ZIonRow>
						<ZIonCol>
							<ZIonAvatar className='relative cursor-pointer'>
								<ZIonIcon
									className='absolute top-0 right-0 w-5 h-5'
									icon={ellipse}
									color={active ? 'success' : 'secondary'}
								/>
								<ZIonImg src='https://ionicframework.com/docs/img/demos/avatar.svg' />
							</ZIonAvatar>
						</ZIonCol>
					</ZIonRow>
				</ZIonGrid>
			</ZIonContent>
		</ZaionsIonPage>
	);
};

export default TestingIonComponents;
