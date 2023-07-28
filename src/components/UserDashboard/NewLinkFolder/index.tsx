// Core Imports
import React from 'react';

// Packages Import
import { addCircleOutline, folderOpenOutline } from 'ionicons/icons';
import { useFormikContext } from 'formik';

// Custom Imports
import {
	ZIonCol,
	ZIonText,
	ZIonIcon,
	ZIonRouterLink,
	ZIonButton,
	ZIonSkeletonText,
	ZIonSelect,
	ZIonSelectOption,
} from '@/components/ZIonComponents';
import ZaionsRSelect from '@/components/CustomComponents/ZaionsRSelect';
import ZaionsAddNewFolder from '@/components/InPageComponents/ZaionsModals/AddNewFolder';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';

// Global Constants
import { formatReactSelectOption } from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Images

// Recoil States

// Types
// import ZaionsRSelect from '@/components/CustomComponents/ZaionsRSelect';
import {
	FolderInterface,
	LinkFolderType,
	ZaionsShortUrlOptionFieldsValuesInterface,
} from '@/types/AdminPanel/linksType';
import { ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';
import { folderState } from '@/types/AdminPanel/index.type';

// Styles
// import CLASSES from './styles.module.css';

const NewLinkFolder: React.FC<{
	_foldersData: LinkFolderType[];
	_state: folderState;
	workspaceId: string;
}> = ({ _foldersData, _state, workspaceId }) => {
	const { values, handleChange, handleBlur, setFieldValue } =
		useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

	const { presentZIonModal: presentFolderModal } = useZIonModal(
		ZaionsAddNewFolder,
		{
			state: _state,
			workspaceId,
		}
	);

	return (
		<ZIonCol
			sizeXl='5.9'
			sizeLg='5.9'
			sizeMd='5.9'
			sizeSm='12'
			sizeXs='12'
			className='py-2 border zaions__bg_white'
		>
			<div className='flex ion-align-items-center border-bottom ion-padding-start'>
				{/* Icon */}
				<ZIonIcon icon={folderOpenOutline} size='large' />

				{/* Text */}
				<ZIonText className='font-bold ion-no-margin ps-2'>
					Folder
					<ZIonRouterLink className='ms-1' routerLink={ZaionsRoutes.HomeRoute}>
						(help)
					</ZIonRouterLink>
				</ZIonText>

				{/* Add folder button */}
				<ZIonButton
					fill='clear'
					className='ms-auto'
					onClick={() => {
						presentFolderModal({
							_cssClass: 'folder-modal-size',
						});
					}}
				>
					<ZIonIcon icon={addCircleOutline} size='large' />
				</ZIonButton>
			</div>

			{/*  */}
			<div className='block px-4 mt-4'>
				{/* Folder select */}
				{/* <ZaionsRSelect
					className=''
					options={_foldersData as unknown as ZaionsRSelectOptions[]}
					name='folderId'
					onChange={(_value) => {
						setFieldValue(
							'folderId',
							(_value as ZaionsRSelectOptions)?.value,
							false
						);
					}}
					value={
						formatReactSelectOption(
							values?.folderId,
							_foldersData as ZGenericObject[],
							'title',
							'id'
						) || []
					}
				/> */}
				<ZIonSelect
					onIonChange={handleChange}
					onIonBlur={handleBlur}
					name='folderId'
					value={values?.folderId}
					interface='popover'
					fill='outline'
					minHeight='40px'
				>
					{_foldersData &&
						_foldersData.map((el, index) => {
							return (
								<ZIonSelectOption key={index} value={el.id}>
									{el.title}
								</ZIonSelectOption>
							);
						})}
				</ZIonSelect>
			</div>
		</ZIonCol>
	);
};

export const FolderSkeleton: React.FC = React.memo(() => {
	return (
		<ZIonCol
			sizeXl='5.9'
			sizeLg='5.9'
			sizeMd='5.9'
			sizeSm='12'
			sizeXs='12'
			className='py-2 border zaions__bg_white'
		>
			<div className='flex ion-align-items-center border-bottom ion-padding-start'>
				{/* Icon */}
				<ZIonIcon icon={folderOpenOutline} size='large' />

				{/* Text */}
				<ZIonText className='font-bold ion-no-margin ps-2'>
					Folder
					<ZIonRouterLink className='ms-1' routerLink={ZaionsRoutes.HomeRoute}>
						(help)
					</ZIonRouterLink>
				</ZIonText>

				{/* Add folder button */}
				<ZIonButton fill='clear' className='ms-auto'>
					<ZIonSkeletonText
						className='mt-3'
						width='20px'
						height='20px'
						animated={true}
					/>
				</ZIonButton>
			</div>

			{/*  */}
			<div className='block px-4 mt-4'>
				{/* Folder select */}
				<ZIonSkeletonText
					className='mt-3'
					width='100%'
					height='40px'
					animated={true}
				/>
			</div>
		</ZIonCol>
	);
});

export default NewLinkFolder;
