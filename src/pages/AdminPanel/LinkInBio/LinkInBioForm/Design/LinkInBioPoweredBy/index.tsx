/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { closeOutline, heartOutline, toggleOutline } from 'ionicons/icons';
import classNames from 'classnames';
// import { useFormikContext } from 'formik';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonIcon,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import { PRODUCT_NAME } from '@/utils/constants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
// import { LinkInBioType } from '@/types/AdminPanel/linkInBioType';

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
import classes from '../styles.module.css';
// import { useRecoilValue } from 'recoil';
// import { ZaionsAppSettingsRState } from '@/ZaionsStore/zaionsAppSettings.recoil';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZPoweredBySubscriptionModal: React.FC<{
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({ dismissZIonModal }) => {
	// const appSettings = useRecoilValue(ZaionsAppSettingsRState);
	return (
		<>
			{/**
			 * Header of Modal will shown if the `showActionInModalHeader` is set to `true` in  appSetting and hide if it is `false`
			 * default: false
			 *  */}
			{/* {appSettings.appModalsSetting.actions.showActionInModalHeader && (
        <ZIonHeader>
          <ZIonRow className='ion-align-items-center'>
            <ZIonCol>
              <ZIonButton
                onClick={() => {
                  // Close the Modal
                  dismissZIonModal();
                }}
                color='primary'
                className='ion-text-capitalize'
                fill='outline'
              >
                Close
              </ZIonButton>
            </ZIonCol>
          </ZIonRow>
        </ZIonHeader>
      )} */}

			<ZIonContent className='ion-padding'>
				<div className='ion-text-end'>
					<ZIonButton
						className='ion-no-padding ion-no-margin'
						onClick={() => {
							dismissZIonModal();
						}}
						fill='clear'
						color='dark'
					>
						<h4 className='ion-no-margin mt-1'>
							<ZIonIcon icon={closeOutline} />
						</h4>
					</ZIonButton>
				</div>
				<div className='flex ion-text-center ion-justify-content-center flex-col ion-padding-top ion-margin-top'>
					<ZIonText className='' color={'primary'}>
						<h1
							className={`mb-0 ion-padding-top bg-primary zaions__modal_icon`}
						>
							<ZIonIcon
								icon={toggleOutline}
								className='mx-auto'
								color='light'
							></ZIonIcon>
						</h1>
					</ZIonText>
					<br />
					<ZIonText color={'dark'}>
						<h5 className='font-bold'>
							To remove the {PRODUCT_NAME} logo, please <br /> increase your
							plan 😊
						</h5>
					</ZIonText>
					<ZIonText className='mt-2'>
						Choose the best plan that scale with <br /> your needs to use Zlink!
					</ZIonText>
					<ZIonButton expand='block' className='mt-3'>
						Subscribe
					</ZIonButton>
				</div>
			</ZIonContent>

			{/**
			 * Footer of Modal will shown if the `showActionInModalFooter` is set to `true` in appSetting, and hide if it is `false`
			 * default: true
			 *  */}
			{/* {appSettings.appModalsSetting.actions.showActionInModalFooter && (
        <ZIonFooter>
          <ZIonRow className=' mx-3 mt-2 ion-justify-content-between ion-align-items-center'>
            <ZIonCol>
              <ZIonButton
                fill='outline'
                size='default'
                className='ion-text-capitalize'
                onClick={() => {
                  dismissZIonModal();
                }}
              >
                Close
              </ZIonButton>
            </ZIonCol>
          </ZIonRow>
        </ZIonFooter>
      )} */}
		</>
	);
};

const ZLinkInBioPoweredBySection: React.FC = () => {
	// const { values, setFieldValue } = useFormikContext<LinkInBioType>();

	const { presentZIonModal: presentPoweredBySubscriptionModal } = useZIonModal(
		ZPoweredBySubscriptionModal
	);

	return (
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
				className={classNames(classes['row-gap-1-point-6-rem'], {
					'ion-margin-top pt-2 ion-padding-bottom mb-2 ': true,
				})}
			>
				{/*  */}
				<ZIonCol size='6' className='flex ion-align-items-center'>
					<ZIonText>
						<h4 className='ion-no-margin ion-no-padding'>
							<ZIonIcon icon={heartOutline} className='me-3' />
						</h4>
					</ZIonText>
					<ZIonText className='zaions__fs_14 mb-1'>Powered by Zlink</ZIonText>
				</ZIonCol>

				<ZIonCol size='6' className='flex ion-justify-content-end'>
					<ZRCSwitch
						checked={true}
						onChange={() => {
							presentPoweredBySubscriptionModal({
								_cssClass: classes['powered-by-subscription-modal-size'],
							});
						}}
					/>
				</ZIonCol>
			</ZIonRow>
		</ZIonCol>
	);
};

export default ZLinkInBioPoweredBySection;
