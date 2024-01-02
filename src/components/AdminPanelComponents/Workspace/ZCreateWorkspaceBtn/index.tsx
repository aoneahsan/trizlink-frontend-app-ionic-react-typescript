/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { addOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZAddNewWorkspaceModal from '@/components/InPageComponents/ZaionsModals/Workspace/CreateModal';
import { ZIonButton, ZIonIcon } from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';

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
import { type workspaceInterface } from '@/types/AdminPanel/workspace';
import classNames from 'classnames';
import { isZNonEmptyString } from '@/utils/helpers';

/**
 * Workspace create button
 * About: (button with will open from modal to create workspace.)
 * @type {*}
 * */
const ZCreateWorkspaceBtn: React.FC<{
  className?: string;
  height?: string;
  testingselector?: string;
}> = ({ className, height, testingselector }) => {
  // Get workspaces data from backend.
  const { isFetching: isWorkspacesDataFetching } = useZRQGetRequest<
    workspaceInterface[]
  >({
    _url: API_URL_ENUM.workspace_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN]
  });

  const { presentZIonModal: presentZWorkspaceCreateModal } = useZIonModal(
    ZAddNewWorkspaceModal
  );

  return (
    <ZIonButton
      color='secondary'
      height={height}
      disabled={isWorkspacesDataFetching}
      className={classNames(className, {
        'normal-case ion-no-margin': true
      })}
      testingselector={
        isZNonEmptyString(testingselector)
          ? testingselector
          : CONSTANTS.testingSelectors.workspace.listPage.createWorkspaceButton
      }
      onClick={() => {
        if (!isWorkspacesDataFetching) {
          presentZWorkspaceCreateModal({
            _cssClass: 'create-workspace-modal-size'
          });
        }
      }}>
      <ZIonIcon
        icon={addOutline}
        className='me-1'
      />
      New workspace
    </ZIonButton>
  );
};

export default ZCreateWorkspaceBtn;
