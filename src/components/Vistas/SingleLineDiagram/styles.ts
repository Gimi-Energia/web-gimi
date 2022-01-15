import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.li`
  ul {
    display: grid;
    grid-template-rows: auto auto 664px 33px;
    list-style: none;

    li {
      position: relative;
    }
  }
`;

export const SingleLineImage = styled.div<{ isSelected?: boolean }>`
  img {
    opacity: ${props => (props.isSelected ? '0.6' : '1')};
    cursor: pointer;
    height: 664px;
  }
`;

export const SingleLineContainer = styled.div`
  grid-row: 3;
  position: relative;
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
