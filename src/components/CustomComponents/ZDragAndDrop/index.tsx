// Core Imports
import React from 'react';

// Packages Imports
import classNames from 'classnames';
import { fileTrayOutline } from 'ionicons/icons';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

// Custom Imports
import { ZIonIcon, ZIonImg, ZIonText } from '@/components/ZIonComponents';
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
	setFieldValue?: FormikSetFieldValueEventType;
};

const ZDragAndDrop: React.FC<ZDragAndDropType> = ({
	className,
	style,
	fieldName = '',
	imageUrl,
	title = 'Click to upload Picture or a GIF',
	setFieldValue,
}) => {
	const { presentZIonModal: presentZFileUploadModal } = useZIonModal(
		ZaionsFileUploadModal
	);

	// const [compState, setCompState] = useState<{
	//   filePath?: string;
	// }>({});

	return (
		<div
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
			style={style}
		>
			{imageUrl?.trim() ? (
				<ZIonImg src={imageUrl} className='w-full h-full' />
			) : (
				<>
					<ZIonText className='ion-no-margin'>
						<h1 className='ion-no-margin'>
							<ZIonIcon icon={fileTrayOutline} color='primary' />
						</h1>
					</ZIonText>
					<ZIonText color='primary'>{title}</ZIonText>
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
						style={{ width: '4rem' }}
					/>
				</ZIonText>
				<ZIonText color='light' className='mt-2 font-bold'>
					Upload a new Picture
				</ZIonText>
			</div>
		</div>
	);
};

export default ZDragAndDrop;
