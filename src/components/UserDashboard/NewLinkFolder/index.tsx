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
	ZaionsShortUrlOptionFieldsValuesInterface,
} from '@/types/AdminPanel/linksType';
import { ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';
import { folderState } from '@/types/AdminPanel/index.type';

// Styles
// import CLASSES from './styles.module.css';

const NewLinkFolder: React.FC<{
	_foldersData: FolderInterface[];
	_state: folderState;
	workspaceId: string;
}> = ({ _foldersData, _state, workspaceId }) => {
	const { values, setFieldValue } =
		useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

	const { presentZIonModal: presentFolderModal } = useZIonModal(
		ZaionsAddNewFolder,
		{
			state: _state,
			workspaceId,
		}
	);

	return (
		<>
			<ZIonCol
				sizeXl='5.7'
				sizeLg='5.6'
				sizeMd='5.6'
				sizeSm='12'
				sizeXs='12'
				className='py-3 border zaions__bg_white'
			>
				<div className='flex ion-align-items-center border-bottom ion-padding-start'>
					<ZIonIcon icon={folderOpenOutline} size={'large'}></ZIonIcon>
					<ZIonText>
						<h6 className='font-bold ion-no-margin ion-padding-start'>
							Folder{' '}
							<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
								(help)
							</ZIonRouterLink>
						</h6>
					</ZIonText>
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
				<div className='block px-4 mt-4'>
					<ZaionsRSelect
						className='ion-padding-top'
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
								'value',
								'label'
							) || []
						}
					/>
				</div>
			</ZIonCol>
		</>
	);
};

export default NewLinkFolder;
