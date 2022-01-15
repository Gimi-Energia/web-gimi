import { shade } from 'polished';
import styled from 'styled-components';

interface ContainerProps {
  positionStart: number;
  positionEnd: number;
}

export const Container = styled.div<ContainerProps>`
  border: 0.5px solid;
  grid-row: 4/5;
  grid-column-start: ${props => props.positionStart};
  grid-column-end: ${props => props.positionEnd};

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  span {
    flex: 1;
    font-size: 14px;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border: 0;
    background: #ffacac;

    &:hover {
      background: ${shade(0.25, '#FFACAC')};
    }

    @media print {
      display: none;
    }
  }
`;
