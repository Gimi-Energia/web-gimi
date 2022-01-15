import React, { useEffect, useState } from 'react';

import ReactModal from 'react-modal';

interface IModalProps {
  children: any;
  isOpen: boolean;
  setIsOpen: () => void;
  distanceTop: string;
}

const Modal: React.FC<IModalProps> = ({
  children,
  isOpen,
  setIsOpen,
  distanceTop,
}) => {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: distanceTop,
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#F0F0F5',
          color: '#000000',
          borderRadius: '8px',
          width: 'auto',
          border: 'none',
          overflow: 'visible',
        },
        overlay: {
          backgroundColor: '#545454e6',
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
