import styled from 'styled-components';
import { shade } from 'polished';

interface CubicleImage {
  isSelected: boolean;
}

interface IContainerProps {
  sizeGrid: number;
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  flex-direction: column;
  position: relative;

  ul {
    display: grid;
    grid-template-rows: auto auto 567px 32px;
    grid-template-columns: repeat(${props => props.sizeGrid}, auto);

    li {
      @media print {
        page-break-after: always;
      }
    }
  }
`;
export const CubicleContainer = styled.div`
  position: relative;
  grid-row: 3/4;

  .isSelected {
    opacity: 0.6;
  }
`;

export const ButtonDelete = styled.button`
  position: absolute;
  background: #ffacac;
  width: 24px;
  height: 24px;
  top: 4px;
  right: 4px;
  border-radius: 4px;
  border: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:enabled {
    background: ${shade(0.25, '#FFACAC')};
  }

  @media print {
    display: none;
  }
`;

export const CubicleImage = styled.img<CubicleImage>`
  height: 567px;
  cursor: pointer;
`;

export const Title = styled.h1`
  display: none;

  @media print {
    display: block;
    padding: 8px;
    margin-bottom: 16px;
    text-decoration: underline;
  }
`;

export const Description = styled.input`
  text-align: center;
  background: transparent;
  border: 0;
  width: 122px;

  &:hover {
    border-radius: 4px;
    background: #dfdfdf;
  }
`;
