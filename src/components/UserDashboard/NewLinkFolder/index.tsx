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
	ZIonSpinner,
} from '@/components/ZIonComponents';
import ZaionsAddNewFolder from '@/components/InPageComponents/ZaionsModals/AddNewFolder';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';

// Global Constants
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import CONSTANTS from '@/utils/constants';

// Images

// Recoil States

// Types
import {
	LinkFolderType,
	ZaionsShortUrlOptionFieldsValuesInterface,
} from '@/types/AdminPanel/linksType';
import { folderState } from '@/types/AdminPanel/index.type';

// Styles
// import CLASSES from './styles.module.css';

const NewLinkFolder: React.FC<{
	_foldersData: LinkFolderType[];
	_state: folderState;
	workspaceId: string;
	showSkeleton?: boolean;
}> = ({ _foldersData, _state, workspaceId, showSkeleton = false }) => {
	const { values, handleChange, handleBlur } =
		useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

	const { presentZIonModal: presentFolderModal } = useZIonModal(
		ZaionsAddNewFolder,
		{
			state: _state,
			workspaceId,
		}
	);

	if (showSkeleton) {
		return <FolderSkeleton />;
	}

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

				<ZIonIcon
					className='cursor-pointer ms-auto me-3'
					icon={addCircleOutline}
					size='large'
					color='primary'
					testingselector={
						CONSTANTS.testingSelectors.shortLink.formPage.folder.createBtn
					}
					onClick={() => {
						presentFolderModal({
							_cssClass: 'folder-modal-size',
						});
					}}
				/>
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
					testingselector={
						CONSTANTS.testingSelectors.shortLink.formPage.folder.selector
					}
				>
					<ZIonSelectOption value={CONSTANTS.DEFAULT_VALUES.DEFAULT_FOLDER}>
						default
					</ZIonSelectOption>
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

const FolderSkeleton: React.FC = React.memo(() => {
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

const FolderSkeletonOld: React.FC = React.memo(() => {
	return (
		<ZIonCol
			sizeXl='5.9'
			sizeLg='5.9'
			sizeMd='5.9'
			sizeSm='12'
			sizeXs='12'
			className='py-2 border zaions__bg_white'
		>
			<div className='flex w-full h-full ion-align-items-center ion-justify-content-center'>
				<ZIonSpinner
					color='primary'
					className=''
					name='crescent'
					style={{ width: '50px', height: '50px' }}
				/>
			</div>
		</ZIonCol>
	);
});

export default NewLinkFolder;
