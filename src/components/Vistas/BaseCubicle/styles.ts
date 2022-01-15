import styled from 'styled-components';

interface IUpperWrapperProps {
  positionEnd?: number;
  positionStart?: number;
  variable?: 1 | 2;
}

interface IBottomWrapperProps {
  positionEnd?: number;
  positionStart?: number;
  variable: number;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  img {
    height: 306px;
  }

  ul {
    display: grid;
    grid-template-rows: auto 306px 100px;
    grid-template-columns: repeat(auto, auto);
    list-style: none;

    li {
      grid-row: 2/3;
    }
  }
`;

export const UpperWrapper = styled.div<IUpperWrapperProps>`
  border-style: solid;
  border-width: 1px 1px 0;
  height: 33px;
  grid-row: 1/2;

  grid-column: ${props => props.positionStart} / ${props => props.positionEnd};

  div {
    border-style: solid;
    border-width: 1px 1px 0;
    height: 22px;
    margin: 15px 15px 0;
  }
`;

export const BottomWrapper = styled.div<IBottomWrapperProps>`
  border-style: solid;
  border-width: 0 1px 1px;
  height: ${props => (props.variable === 1 ? 100 : 150)}px;
  grid-row: 3/4;
  grid-column: ${props => props.positionStart} / ${props => props.positionEnd};
  position: relative;

  div {
    border-style: solid;
    border-width: 0 1px 1px;
    height: ${props => (props.variable === 1 ? 100 : 150) - 15}px;
    margin: 0 15px;

    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  span {
    font-size: 14px;
  }
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
