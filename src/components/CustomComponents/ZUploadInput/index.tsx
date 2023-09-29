/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { AxiosError } from 'axios';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZRQCreateRequest } from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { reportCustomError } from '@/utils/customErrorType';
import { API_URL_ENUM } from '@/utils/enums';
import MESSAGES from '@/utils/messages';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/notification';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { zAxiosApiRequestContentType } from '@/types/CustomHooks/zapi-hooks.type';
import { FormikSetFieldValueEventType } from '@/types/ZaionsFormik.type';

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
interface IZUploadInput {
  className?: string;
  multiple?: boolean;
  name?: string;
  value?: {
    filePath?: string;
    fileUrl?: string;
  };
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  setFieldValueFn?: FormikSetFieldValueEventType;
}

/**
 * Functional Component
 * About: (This component provides a file upload input that supports both single and multiple file uploads. It communicates with the backend API to handle file uploads and updates the form field value accordingly.)
 * @component
 * @param {string} className - Additional CSS class names for styling.
 * @param {boolean} multiple - Indicates if multiple files can be uploaded at once.
 * @param {string} name - The name of the form field for handling form submission.
 * @param {Function} setFieldValueFn - A function provided by Formik to update the form field value.
 * @param {Function} onChange - Event handler for when the input value changes.
 *
 * @return {JSX.Element} - The rendered file upload input element.
 * */
const ZUploadInput: React.FC<IZUploadInput> = ({
  className,
  multiple = false,
  name,
  value,
  setFieldValueFn
}) => {
  // #region APIs
  // Single file upload.
  const { mutateAsync: uploadSingleFile } = useZRQCreateRequest({
    _url: API_URL_ENUM.uploadSingleFile,
    _queriesKeysToInvalidate: [],
    _authenticated: true,
    _contentType: zAxiosApiRequestContentType.FormData
  });

  // Multi files upload.
  const { mutateAsync: uploadFiles } = useZRQCreateRequest({
    _url: API_URL_ENUM.uploadFiles,
    _queriesKeysToInvalidate: [],
    _authenticated: true,
    _contentType: zAxiosApiRequestContentType.FormData
  });
  // #endregion

  // #region functions
  const uploadFileToBackend = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const result = await uploadSingleFile(formData);

      if (result) {
        const __data = (
          result as {
            data: {
              file: object;
              fileName: object;
              filePath: string;
              fileUrl: string;
            };
          }
        )?.data;

        if (__data) {
          if (setFieldValueFn && name) {
            setFieldValueFn(name, { ...__data }, false);
          }

          // showing success message.
          showSuccessNotification(MESSAGES.GENERAL.FILE.UPLOADED);
        }
      }
    } catch (error) {
      reportCustomError(error);
      if (error instanceof AxiosError) {
        const _error = (error?.response?.data as { errors: { file: string[] } })
          ?.errors;
        const _axiosErrorMessage = error?.message;

        if (_error) {
          showErrorNotification(_error?.file[0]);
        } else {
          showErrorNotification(_axiosErrorMessage);
        }
      }
    }
  };

  const uploadFilesToBackend = async (files: FileList) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        formData.append('files[]', file);
      }

      const result = await uploadFiles(formData);
      if (result) {
        const __data = (
          result as {
            data: {
              file: object;
              fileName: object;
              filePath: string;
              fileUrl: string;
            };
          }
        )?.data;

        if (__data) {
          if (setFieldValueFn && name) {
            setFieldValueFn(name, { ...__data }, false);
          }

          // showing success message.
          showSuccessNotification(MESSAGES.GENERAL.FILE.UPLOADED);
        }
      }
    } catch (error) {
      reportCustomError(error);
      if (error instanceof AxiosError) {
        const _error = (error?.response?.data as { errors: { file: string[] } })
          ?.errors;
        const _axiosErrorMessage = error?.message;

        if (_error) {
          showErrorNotification(_error?.file[0]);
        } else {
          showErrorNotification(_axiosErrorMessage);
        }
      }
    }
  };
  // #endregion

  return (
    <input
      type='file'
      // value={value?.filePath}
      name={name}
      multiple={multiple}
      className={classNames(className, {
        'z-upload-input w-full': true
      })}
      onChange={event => {
        if (multiple) {
          const zFiles = event?.target?.files && event?.target?.files;
          zFiles && void uploadFilesToBackend(zFiles);
        } else {
          const zFile = event?.target?.files && event?.target?.files[0];

          zFile && void uploadFileToBackend(zFile);
        }
      }}
    />
  );
};

export default ZUploadInput;
