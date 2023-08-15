// Core Imports
import React from 'react';

// Packages Imports
import classNames from 'classnames';
import { fileTrayOutline } from 'ionicons/icons';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

// Custom Imports
import {
	ZIonGrid,
	ZIonIcon,
	ZIonImg,
	ZIonText,
} from '@/components/ZIonComponents';
import ZaionsFileUploadModal from '@/components/InPageComponents/ZaionsModals/FileUploadModal';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';

// Types
import { ZIonModalActionEnum } from '@/types/ZaionsApis.type';
import { FormikSetFieldValueEventType } from '@/types/ZaionsFormik.type';
import { zJsonParse } from '@/utils/helpers';

// Images
import { upload_send } from '@/assets/images';

// Styles
import classes from './styles.module.css';

// Component Type
type ZDragAndDropType = {
	className?: string;
	style?: {
		[key: string]: unknown;
	};
	fieldName?: string;
	imageUrl?: string;
	title?: string;
	testingSelector?: string;
	testingListSelector?: string;
	setFieldValue?: FormikSetFieldValueEventType;
};

const ZDragAndDrop: React.FC<ZDragAndDropType> = ({
	className,
	style,
	fieldName = '',
	imageUrl,
	title = 'Click to upload Picture or a GIF',
	testingListSelector,
	testingSelector,
	setFieldValue,
}) => {
	const { presentZIonModal: presentZFileUploadModal } = useZIonModal(
		ZaionsFileUploadModal
	);

	// const [compState, setCompState] = useState<{
	//   filePath?: string;
	// }>({});

	return (
		<ZIonGrid
			style={style}
			testingSelector={testingSelector}
			testingListSelector={testingListSelector}
			className={classNames(classes['zaions-drag-and-drop'], className, {
				'flex flex-col ion-align-items-center ion-justify-content-center': true,
			})}
			onClick={() => {
				presentZFileUploadModal({
					_cssClass: 'file-upload-modal-size',
					_onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
						if (ev.detail.role === ZIonModalActionEnum.success) {
							// Getting file data from fileUploadModal and parse it.
							const fileData = zJsonParse(String(ev.detail.data)) as {
								fileUrl: string;
								filePath: string;
							};

							// Storing the filePath in component state.
							// setCompState((oldState) => ({
							//   ...oldState,
							//   filePath: fileData.filePath,
							// }));

							// setting the url in the recoil state which will be pass in props.
							setFieldValue &&
								setFieldValue(fieldName, fileData.fileUrl, false);
						}
					},
				});
			}}
		>
			{imageUrl?.trim() ? (
				<ZIonImg
					src={imageUrl}
					testingSelector={`${testingSelector}-image`}
					testingListSelector={`${testingListSelector}-image`}
					className='w-full h-full'
				/>
			) : (
				<>
					<ZIonText className='ion-no-margin'>
						<ZIonIcon
							icon={fileTrayOutline}
							color='primary'
							className='w-8 h-8'
							testingSelector={`${testingSelector}-cd-icon`}
							testingListSelector={`${testingListSelector}-cd-icon`}
						/>
					</ZIonText>
					<ZIonText
						color='primary'
						testingSelector={`${testingSelector}-cd-icon`}
						testingListSelector={`${testingListSelector}-cd-icon`}
					>
						{title}
					</ZIonText>
				</>
			)}
			<div
				className={classNames(classes['zaions-drag-and-drop__overlay'], {
					'flex flex-col ion-align-items-center ion-justify-content-center':
						true,
				})}
			>
				<ZIonText className='ion-no-margin'>
					<ZIonImg
						src={upload_send}
						alt='send icon'
						testingSelector={`${testingSelector}-od-icon`} // od -> overlay-div
						testingListSelector={`${testingListSelector}-od-icon`}
						style={{ width: '4rem' }}
					/>
				</ZIonText>
				<ZIonText
					color='light'
					className='mt-2 font-bold'
					testingSelector={`${testingSelector}-od-text`} // od -> overlay-div
					testingListSelector={`${testingListSelector}-od-text`}
				>
					Upload a new Picture
				</ZIonText>
			</div>
		</ZIonGrid>
	);
};

export default ZDragAndDrop;
