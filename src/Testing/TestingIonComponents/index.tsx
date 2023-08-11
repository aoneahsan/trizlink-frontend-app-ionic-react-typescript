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
	ZIonText,
} from '@/components/ZIonComponents';
import { checkmarkCircle, closeCircle, ellipse } from 'ionicons/icons';
import classNames from 'classnames';
import ZReactMediaPlayer from '@/components/CustomComponents/ZCustomAudio';
import ReactPlayer from 'react-player';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';

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
	return (
		<ZaionsIonPage>
			<ZIonContent>
				{/* Grid-1 */}
				<ZIonGrid
					className={classNames({
						'h-screen ion-no-padding': true,
						'max-w-[200rem] mx-auto': false,
					})}
				>
					{/* Row-1 */}
					<ZIonRow className='h-full'>
						{/* Col-1 Side bar */}
						<ZIonCol size='.8' className='h-full bg-slate-700'>
							<ZCustomScrollable
								className='w-full h-full'
								scrollY={true}
								// scrollX={true}
							>
								{/* <div className='w-[20rem]'>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Accusamus a temporibus repudiandae et cupiditate. In ducimus
									qui officia inventore eos, a facere recusandae enim. Delectus
									ad velit quae repellat aut!
								</div> */}
								<ZIonText>
									Lorem ipsum dolor sit ametconsectetur adipisicing elit.
									Eveniet reiciendis nisi, esse optio pariatur, recusandae in
									tenetur saepe, quisquam iste deserunt tempore qua Lorem ipsum
									dolor sit amet consectetur adipisicing elit. Eveniet
									reiciendis nisi, esse optio pariatur
								</ZIonText>
							</ZCustomScrollable>
						</ZIonCol>

						{/* Col-2 Right-side Main Container */}
						<ZIonCol size='' className='h-auto bg-red-600'>
							<ZIonGrid className='h-full ion-no-padding'>
								<ZIonRow className='h-max'>
									<ZIonCol size='12' className='h-[5rem] bg-cyan-500'></ZIonCol>
								</ZIonRow>
								{/* Col-2 Row-1 */}
								<ZIonRow style={{ height: 'calc(100% - 4rem)' }}>
									{/* Col-2 Row-1 col-1 Folder menu */}
									<ZIonCol
										size='2.4'
										className='h-full bg-orange-400'
									></ZIonCol>

									{/* Col-2 Row-1 col-2 Table & filters etc. */}
									<ZIonCol className='h-full bg-lime-400'></ZIonCol>
								</ZIonRow>
							</ZIonGrid>
						</ZIonCol>
					</ZIonRow>
				</ZIonGrid>
			</ZIonContent>
		</ZaionsIonPage>
	);
};

export default TestingIonComponents;
