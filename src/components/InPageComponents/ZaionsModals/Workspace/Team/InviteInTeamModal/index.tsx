/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { closeOutline } from 'ionicons/icons';
import { Formik } from 'formik';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonContent,
  ZIonIcon,
  ZIonImg,
  ZIonLabel,
  ZIonText
} from '@/components/ZIonComponents';
import ZaionsRSelect from '@/components/CustomComponents/ZaionsRSelect';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import ZInviteTab from '../../SharingModal/InviteTab';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import { API_URL_ENUM } from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { workspaceTeamInterface } from '@/types/AdminPanel/workspace';

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
import { ProductFavicon } from '@/assets/images';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */
enum EZInviteInTeamModalTab {
  teamSelectTab,
  inviteTab
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZInviteInTeamModal: React.FC<{
  dismissZIonModal: (data?: string, role?: string | undefined) => void;
  workspaceId: string;
}> = ({ dismissZIonModal, workspaceId }) => {
  const { data: WSTeamsData } = useZRQGetRequest<workspaceTeamInterface[]>({
    _url: API_URL_ENUM.workspace_team_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.TEAM, workspaceId],
    _itemsIds: [workspaceId],
    _showLoader: false,
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId]
  });

  return (
    <ZIonContent>
      {/* Close modal button */}
      <div className='ion-text-end'>
        <ZIonIcon
          icon={closeOutline}
          className='cursor-pointer w-7 h-7'
          onClick={() => {
            dismissZIonModal();
          }}
          testingselector={
            CONSTANTS.testingSelectors.topBar.teamInviteModal.closeModalBtn
          }
        />
      </div>

      <div className='flex flex-col ion-justify-content-center'>
        <div className='flex mx-auto mb-0 rounded-full w-11 h-11 ion-align-items-center ion-justify-content-enter'>
          <ZIonImg
            src={ProductFavicon}
            className='w-10 h-10 mx-auto'
          />
        </div>

        <ZIonText
          color='dark'
          className='block mt-3 text-xl font-bold ion-text-center'>
          Invite a member in team
        </ZIonText>
        <ZIonText
          color='dark'
          className='block mt-2 text-md ion-text-center'>
          Select the team where you went to invite member
        </ZIonText>
      </div>
      <Formik
        initialValues={{
          team: { label: '', value: '' },
          tab: EZInviteInTeamModalTab.teamSelectTab
        }}
        onSubmit={() => {}}>
        {({ values, errors, handleBlur, handleChange, setFieldValue }) => {
          return (
            <ZCustomScrollable
              scrollY={true}
              className='w-full h-[74%]'>
              {values.tab === EZInviteInTeamModalTab.teamSelectTab ? (
                <div className='ion-padding ion-margin-start ion-margin-end'>
                  <ZIonLabel className='text-sm'>Teams</ZIonLabel>
                  <ZaionsRSelect
                    value={values.team}
                    name='team'
                    onChange={e => {
                      setFieldValue('team', e, false);
                    }}
                    options={
                      WSTeamsData && WSTeamsData?.length > 0
                        ? WSTeamsData.map(el => {
                            return {
                              value: el.id,
                              label: el.title
                            };
                          })
                        : []
                    }
                  />

                  <ZIonButton
                    expand='block'
                    disabled={values?.team?.value?.length === 0}
                    className='mx-0 mt-5'
                    onClick={() => {
                      setFieldValue(
                        'tab',
                        EZInviteInTeamModalTab.inviteTab,
                        false
                      );
                    }}>
                    Continue
                  </ZIonButton>
                </div>
              ) : values.tab === EZInviteInTeamModalTab.inviteTab ? (
                <ZInviteTab
                  workspaceId={workspaceId}
                  dismissZIonModal={dismissZIonModal}
                />
              ) : null}
            </ZCustomScrollable>
          );
        }}
      </Formik>
    </ZIonContent>
  );
};

export default ZInviteInTeamModal;
