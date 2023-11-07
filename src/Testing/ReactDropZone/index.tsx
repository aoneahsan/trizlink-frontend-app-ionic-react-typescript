import classNames from 'classnames';
import React from 'react';
import ReactDropzone from 'react-dropzone';
import { API_URL_ENUM } from '@/utils/enums';
import { zConsoleLog } from '@/utils/helpers';
import { useZRQCreateRequest } from '@/ZaionsHooks/zreactquery-hooks';

import CLASSES from './styles.module.css';
import ZUploadInput from '@/components/CustomComponents/ZUploadInput';

const TestingReactDropzone: React.FC = () => {
  const { mutateAsync: uploadSingleFile } = useZRQCreateRequest({
    _url: API_URL_ENUM.uploadSingleFile,
    _authenticated: true
  });
  const { mutateAsync: uploadFiles } = useZRQCreateRequest({
    _url: API_URL_ENUM.uploadFiles,
    _authenticated: true
  });

  const uploadFileToBackend = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('file', file);
    const result = await uploadSingleFile(formData);
    zConsoleLog({ message: 'file uploaded', data: { result } });
    alert('single file upload done');
  };

  const uploadFilesToBackend = async (files: File[]): Promise<void> => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formData.append('files[]', file);
    }
    const result = await uploadFiles(formData);
    zConsoleLog({ message: 'files uploaded', data: { result } });
    alert('files upload done');
  };

  return (
    <>
      TestingReactDropzone
      <h1>Drag & Drop files below</h1>
      <br />
      <ReactDropzone
        multiple={false}
        autoFocus
        disabled={false}
        maxSize={1250000}
        minSize={10000}
        maxFiles={10}
        onDrop={event => {
          zConsoleLog({
            message: 'ReactDropzone onDrop event',
            data: { event }
          });
          void uploadFileToBackend(event[0]);
        }}
        onDropRejected={event => {
          zConsoleLog({
            message: 'ReactDropzone onDropRejected event',
            data: { event }
          });
        }}
        onError={event => {
          zConsoleLog({
            message: 'ReactDropzone onError event',
            data: { event }
          });
        }}>
        {({ getRootProps, getInputProps, isDragActive, acceptedFiles }) => {
          return (
            <>
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className={classNames(CLASSES.dropzone)}>
                    {isDragActive ? (
                      <h6>Drop Files here...</h6>
                    ) : (
                      <h6>Single File - Drag and drop files here</h6>
                    )}
                  </div>
                </div>
              </section>
            </>
          );
        }}
      </ReactDropzone>
      <br />
      <br />
      <ReactDropzone
        multiple={true}
        autoFocus
        disabled={false}
        maxFiles={10}
        onDropAccepted={files => {
          zConsoleLog({
            message: 'ReactDropzone onDropAccepted event',
            data: { event: files }
          });
          void uploadFilesToBackend(files);
        }}
        onDropRejected={fileRejections => {
          zConsoleLog({
            message: 'ReactDropzone onDropRejected event',
            data: { event: fileRejections }
          });
        }}
        onError={event => {
          zConsoleLog({
            message: 'ReactDropzone onError event',
            data: { event }
          });
        }}>
        {({ getRootProps, getInputProps, isDragActive, acceptedFiles }) => {
          return (
            <>
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className={classNames(CLASSES.dropzone)}>
                    {isDragActive ? (
                      <h6>Drop Files here...</h6>
                    ) : (
                      <h6>Multiple File - Drag and drop files here</h6>
                    )}
                  </div>
                </div>
              </section>
            </>
          );
        }}
      </ReactDropzone>
      <hr />
      <input
        type='file'
        onChange={event => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          event.target.files?.[0];
        }}
      />
      <ZUploadInput />
      <ReactDropzone
        multiple={false}
        autoFocus
        disabled={false}
        maxSize={1250000}
        minSize={10000}
        maxFiles={10}
        onDrop={event => {
          zConsoleLog({
            message: 'ReactDropzone onDrop event',
            data: { event }
          });
          void uploadFileToBackend(event[0]);
        }}
        onDropRejected={event => {
          zConsoleLog({
            message: 'ReactDropzone onDropRejected event',
            data: { event }
          });
        }}
        onError={event => {
          zConsoleLog({
            message: 'ReactDropzone onError event',
            data: { event }
          });
        }}>
        {({ getRootProps, getInputProps, isDragActive, acceptedFiles }) => {
          return (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div>
                {isDragActive ? (
                  <h6>Drop Files here...</h6>
                ) : (
                  <h6>Multiple File - Drag and drop files here</h6>
                )}
              </div>
            </div>
          );
        }}
      </ReactDropzone>
    </>
  );
};

export default TestingReactDropzone;
