/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import NewLinkFolder from '../NewLinkFolder';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { folderState } from '@/types/AdminPanel/index.type';

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

const LinkInBioFoldersHOC: React.FC = () => {
  // const { data: getLinkInBioFoldersData } = useZRQGetRequest<LinkFolderType[]>({
  // _url: API_URL_ENUM.LinkInBio_folders_create_list,
  // _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN,
  // workspaceId,
  // folderState.linkInBio,],
  // });

  // getting current workspace id form params.
  // const { workspaceId } = useParams<{
  //   workspaceId: string;
  // }>();

  return (
    <NewLinkFolder
      _foldersData={[]}
      _state={folderState.linkInBio}
    />
  );
};

export default LinkInBioFoldersHOC;
