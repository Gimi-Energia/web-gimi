import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { ContainerDropzone } from './styles';

interface IProps {
  onFileUploaded: (file: File) => void;
  fileUploaded?: File;
}

const Dropzone: React.FC<IProps> = ({ onFileUploaded, fileUploaded }) => {
  const onDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0];

      onFileUploaded(file);
    },
    [onFileUploaded],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <ContainerDropzone {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      {fileUploaded ? (
        <p>
          {fileUploaded.name} - {Math.round(fileUploaded.size / 1024)}KB
        </p>
      ) : (
        <p>
          Solte o arquivo aqui ou <strong> selecione</strong>
        </p>
      )}
    </ContainerDropzone>
  );
};

export default Dropzone;
