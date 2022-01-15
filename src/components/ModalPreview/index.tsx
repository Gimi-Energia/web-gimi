import React from 'react';
import { BiX } from 'react-icons/bi';

import { ICubicleProps } from '../../hooks/cubiclesContext';

import Modal from '../Modal';
import { Container } from './styles';

interface IModalProps {
  isOpen: boolean;
  previewCubicle: ICubicleProps;
  setIsOpen: () => void;
}

const ModalPreview: React.FC<IModalProps> = ({
  isOpen,
  previewCubicle,
  setIsOpen,
}) => (
  <Modal isOpen={isOpen} setIsOpen={setIsOpen} distanceTop="50%">
    {console.log(previewCubicle)}
    <Container>
      <button type="button" onClick={setIsOpen}>
        <BiX />
      </button>

      <div>
        <img
          src={previewCubicle.single_line_diagram_url}
          alt={previewCubicle.name}
        />
        <span>Diagrama Unifilar</span>
      </div>

      <div>
        <img src={previewCubicle.inside_view_url} alt={previewCubicle.name} />
        <span>Vista Interna</span>
      </div>
    </Container>
  </Modal>
);

export default ModalPreview;
