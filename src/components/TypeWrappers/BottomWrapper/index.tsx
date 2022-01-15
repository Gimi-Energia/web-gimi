import React from 'react';
import { FaTrash } from 'react-icons/fa';

import { Container } from './styles';

interface BottomWrapperProps {
  code: string;
  position: number;
  positionStart: number;
  positionEnd: number;
  editable?: boolean;
  handleDeleteWrapper?: (id: number) => void;
}

const BottomWrapper: React.FC<BottomWrapperProps> = ({
  code,
  position,
  positionStart,
  positionEnd,
  editable,
  handleDeleteWrapper,
}) => (
  <Container positionStart={positionStart} positionEnd={positionEnd}>
    <span>{code}</span>

    {editable && handleDeleteWrapper && (
      <button type="button" onClick={() => handleDeleteWrapper(position)}>
        <FaTrash />
      </button>
    )}
  </Container>
);

export default BottomWrapper;
