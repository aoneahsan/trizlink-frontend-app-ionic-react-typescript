import classNames from 'classnames';
import React from 'react';
import ReactDropzone from 'react-dropzone';
import { API_URL_ENUM } from '@/utils/enums';
import { zConsoleLog } from '@/utils/helpers';
import { useZRQCreateRequest } from '@/ZaionsHooks/zreactquery-hooks';

import CLASSES from './styles.module.css';

const TestingReactDropzone: React.FC = () => {
  const { mutateAsync: uploadSingleFile } = useZRQCreateRequest({
    _url: API_URL_ENUM.uploadSingleFile,
    _queriesKeysToInvalidate: [],
    authenticated: true,
  });
  const { mutateAsync: uploadFiles } = useZRQCreateRequest({
    _url: API_URL_ENUM.uploadFiles,
    _queriesKeysToInvalidate: [],
    authenticated: true,
  });

  const uploadFileToBackend = async (file: File) => {
    console.dir({ file });
    const formData = new FormData();
    formData.append('file', file);
    console.dir({ formData });
    const result = await uploadSingleFile(formData);
    zConsoleLog({ message: 'file uploaded', data: { result } });
    alert('single file upload done');
  };

  const uploadFilesToBackend = async (files: File[]) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.dir({ file });
      formData.append('files[]', file);
    }
    console.dir({ formData });
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
        // accept={{ '*': ['.png', '.gif', '.jpeg', '.jpg'] }} // don't pass this if you want to select any file
        autoFocus
        disabled={false}
        maxSize={1250000}
        minSize={10000}
        // noClick={false}
        maxFiles={10}
        // key={'some key or leave it if not in loop'}
        // noDrag={false}
        // onDragEnter={(event) => {
        //   zConsoleLog({
        //     message: 'ReactDropzone onDragEnter event',
        //     data: { event },
        //   });
        // }}
        // onDragLeave={(event) => {
        //   zConsoleLog({
        //     message: 'ReactDropzone onDragLeave event',
        //     data: { event },
        //   });
        // }}
        // onDragOver={(event) => {
        //   zConsoleLog({
        //     message: 'ReactDropzone onDragOver event',
        //     data: { event },
        //   });
        // }}
        onDrop={(event) => {
          zConsoleLog({
            message: 'ReactDropzone onDrop event',
            data: { event },
          });
          void uploadFileToBackend(event[0]);
        }}
        // onDropAccepted={(event) => {
        //   zConsoleLog({
        //     message: 'ReactDropzone onDropAccepted event',
        //     data: { event },
        //   });
        //   void uploadFileToBackend(event[0]);
        // }}
        onDropRejected={(event) => {
          zConsoleLog({
            message: 'ReactDropzone onDropRejected event',
            data: { event },
          });
        }}
        onError={(event) => {
          zConsoleLog({
            message: 'ReactDropzone onError event',
            data: { event },
          });
        }}
        // onFileDialogCancel={() => {
        //   zConsoleLog({
        //     message: 'ReactDropzone onFileDialogCancel event',
        //   });
        // }}
        // onFileDialogOpen={() => {
        //   zConsoleLog({
        //     message: 'ReactDropzone onFileDialogOpen event',
        //   });
        // }}
        // preventDropOnDocument={false}
        // validator={(files) => {
        //   zConsoleLog({
        //     message: 'ReactDropzone validator event, use this if we need some custom validation, can be anything',
        //     data: { files },
        //   });
        //   return null;
        // }}
      >
        {({ getRootProps, getInputProps, isDragActive, acceptedFiles }) => {
          // zConsoleLog({ message: 'acceptedFiles', data: { acceptedFiles } });
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
        // accept={{ '*': ['.png', '.gif', '.jpeg', '.jpg'] }} // don't pass this if you want to select any file
        autoFocus
        disabled={false}
        // maxSize={1250000}
        // minSize={10000}
        maxFiles={10}
        onDropAccepted={(files) => {
          zConsoleLog({
            message: 'ReactDropzone onDropAccepted event',
            data: { event: files },
          });
          void uploadFilesToBackend(files);
        }}
        onDropRejected={(fileRejections) => {
          zConsoleLog({
            message: 'ReactDropzone onDropRejected event',
            data: { event: fileRejections },
          });
        }}
        onError={(event) => {
          zConsoleLog({
            message: 'ReactDropzone onError event',
            data: { event },
          });
        }}
        // onFileDialogCancel={() => {
        //   zConsoleLog({
        //     message: 'ReactDropzone onFileDialogCancel event',
        //   });
        // }}
        // onFileDialogOpen={() => {
        //   zConsoleLog({
        //     message: 'ReactDropzone onFileDialogOpen event',
        //   });
        // }}
        // preventDropOnDocument={false}
        // validator={(files) => {
        //   zConsoleLog({
        //     message: 'ReactDropzone validator event, use this if we need some custom validation, can be anything',
        //     data: { files },
        //   });
        //   return null;
        // }}
      >
        {({ getRootProps, getInputProps, isDragActive, acceptedFiles }) => {
          // zConsoleLog({ message: 'acceptedFiles', data: { acceptedFiles } });
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
        type={'file'}
        onChange={(event) => {
          const file = event.target.files && event.target.files[0];

          if (file) {
            void uploadFileToBackend(file);
          }
        }}
      />
    </>
  );
};

export default TestingReactDropzone;
