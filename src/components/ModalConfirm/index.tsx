import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import Modal from '../Modal';

import {
  Container,
  ButtonContainer,
  CancelButton,
  ConfirmButton,
  Title,
} from './styles';

interface IModalConfirmProps {
  isOpen: boolean;
  setIsOpen: () => void;
  toggleModal: () => void;
  handleConfirm: () => void;
}

const ModalConfirm: React.FC<IModalConfirmProps> = ({
  isOpen,
  setIsOpen,
  toggleModal,
  handleConfirm,
}) => (
  <Modal isOpen={isOpen} setIsOpen={setIsOpen} distanceTop="15%">
    <Container>
      <Title>
        <FiAlertCircle />
        <h1>Aviso</h1>
      </Title>
      <p>Todos os cubículos serão removidos.</p>
      <ButtonContainer>
        <CancelButton type="button" onClick={toggleModal}>
          Cancelar
        </CancelButton>
        <ConfirmButton type="button" onClick={handleConfirm}>
          Tudo bem
        </ConfirmButton>
      </ButtonContainer>
    </Container>
  </Modal>
);
export default ModalConfirm;
