/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import { useParams } from 'react-router';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonCol,
	ZIonImg,
	ZIonRow,
	ZIonSkeletonText,
	ZIonText,
} from '@/components/ZIonComponents';
import ZLinkInBioAddBlockModal from '@/components/InPageComponents/ZaionsModals/LinkInBioAddBlockModal';
import LinkInBioPDButton from '@/components/LinkInBioComponents/UI/PerDefinedButton';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { reportCustomError } from '@/utils/customErrorType';
import { API_URL_ENUM } from '@/utils/enums';

import CONSTANTS from '@/utils/constants';
import { ZIcons } from '@/utils/ZIcons';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { LinkInBioType } from '@/types/AdminPanel/linkInBioType';

import {
	LinkInBioBlockEnum,
	LinkInBioPredefinedBlocksInterface,
} from '@/types/AdminPanel/linkInBioType/blockTypes';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { LinkInBioBlocksDefaultData } from '@/data/UserDashboard/LinkInBio/Blocks/index.data';

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */
import classes from '../styles.module.css';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZLinkInBioBlocksSection: React.FC = () => {
	// The formikContext to get the formik value and setFieldValue method...
	const { values, setFieldValue } = useFormikContext<LinkInBioType>();

	// Recoil state for storing Link-in-bio blocks data that will fetch from backend.
	// const [linkInBioPredefinedBlocksState, setLinkInBioPredefinedBlocksState] =
	// 	useRecoilState(LinkInBioPredefinedBlocksRState);

	// getting link-in-bio id from route (url), when user refresh the page the id from route will be get and link-in-bio blocks of that id will be fetch from backend.
	const { linkInBioId, workspaceId } = useParams<{
		linkInBioId: string;
		workspaceId: string;
	}>();

	// custom hook for presenting modal (the add block modal)
	const { presentZIonModal: presentZLinkInBioAddBlockModal } = useZIonModal(
		ZLinkInBioAddBlockModal,
		{
			_blockType: values.LinkInBioBlock, // passing values.LinkInBioBlock as blockType to ZLinkInBioAddBlockModal component.
			_blockContent:
				LinkInBioBlocksDefaultData[values.LinkInBioBlock as string],
			setFieldValue, // passing setFieldValue to ZLinkInBioAddBlockModal component.
			linkInBioId,
			workspaceId,
		}
	);

	// fetch block data from api and storing.
	const {
		data: LinkInBioPreDefinedBlocksData,
		isFetching: isLinkInBioPreDefinedBlocksDataFetching,
	} = useZRQGetRequest<LinkInBioPredefinedBlocksInterface[]>({
		_url: API_URL_ENUM.linkInBioPreDefinedBlocks_create_list,
		_key: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_PRE_DEFINED_BLOCKS.MAIN,
			workspaceId,
			linkInBioId,
		],
	});

	// the LinkInBioBlockHandler function will run then the user click on any of the blocks this will execute the presentZLinkInBioAddBlockModal function which is coming from the useZIonModal to present modal...
	const LinkInBioBlockHandler = (_type: LinkInBioBlockEnum) => {
		try {
			if (_type) {
				presentZLinkInBioAddBlockModal({
					_cssClass: 'lib-block-modal-size',
				});

				setFieldValue('LinkInBioBlock', _type, false);
			}
		} catch (error) {
			reportCustomError(error);
		}
	};

	const isZFetching = isLinkInBioPreDefinedBlocksDataFetching;

	return (
		<>
			<ZIonCol
				sizeXl='10'
				sizeLg='11'
				sizeMd='12'
				sizeSm='12'
				sizeXs='12'
				className='ion-padding-vertical ion-margin-top ion-margin-start'
				style={{ borderTop: '2px solid #edf5fd' }}
			>
				<ZIonRow
					className={classNames({
						'ion-margin-top pt-2 ion-padding-bottom mb-2 row-gap-1-point-6-rem':
							true,
					})}
				>
					{isZFetching &&
						[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => {
							return (
								<ZIonCol
									key={el}
									size='2.4'
									className='flex ion-justify-content-center'
								>
									<div className='ion-text-center me-3 w-max'>
										<ZIonButton
											size='large'
											fill='outline'
											color='medium'
											height='4.5rem'
										>
											<ZIonSkeletonText
												width='25px'
												height='25px'
												animated={true}
											/>
										</ZIonButton>
										{/*  */}
										<ZIonText
											color='dark'
											className='flex font-bold ion-justify-content-center'
										>
											<ZIonSkeletonText
												width='2.5rem'
												height='17px'
												animated={true}
											/>
										</ZIonText>
									</div>
								</ZIonCol>
							);
						})}

					{/* After getting block data from api and storing it to the LinkInBioPredefinedBlocksRState recoil state, looping the recoil state value to make blocks */}
					{LinkInBioPreDefinedBlocksData?.map((el) => {
						return (
							<ZIonCol
								size='2.4'
								key={el.id}
								className='flex ion-justify-content-center'
							>
								<div className='ion-text-center me-3 w-max'>
									<LinkInBioPDButton
										icon={el.icon ? ZIcons[el.icon] : ZIcons.PlaceHolder}
										onClick={() => {
											LinkInBioBlockHandler(LinkInBioBlockEnum[el.type]);
										}}
										onMouseEnter={() => {
											setFieldValue(
												'LinkInBioBlock',
												LinkInBioBlockEnum[el.type],
												false
											);
										}}
									/>
									<ZIonText
										color='dark'
										className={classNames(classes['zaions-block-button-text'], {
											'font-bold': false,
										})}
									>
										{el.title}
									</ZIonText>
								</div>
							</ZIonCol>
						);
					})}
				</ZIonRow>
			</ZIonCol>
		</>
	);
};

export default ZLinkInBioBlocksSection;
