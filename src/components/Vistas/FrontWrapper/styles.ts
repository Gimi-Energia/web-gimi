import styled, { css } from 'styled-components';

interface IBeiralLeft {
  positionStart: number;
}

interface IBeiralRight {
  positionLast: number;
  positionEnd: number;
}

export const Container = styled.div`
  ul {
    position: relative;
    display: flex;
  }

  img {
    height: 766px;
  }
`;

export const BeiralLeft = styled.div<IBeiralLeft>`
  ${props =>
    props.positionStart === 1 &&
    css`
      border: 0.02px solid;
      border-right: 0;
      height: 11px;
      width: 17px;
      position: absolute;
      margin-top: 0px;
      left: -17px;
      top: 0;
    `}
`;
export const BeiralRight = styled.div<IBeiralRight>`
  ${props =>
    props.positionLast + 1 === props.positionEnd &&
    css`
      border: 0.02px solid;
      border-left: 0;
      height: 11px;
      width: 17px;
      position: absolute;
      right: -17px;
      margin-top: 0px;
    `}
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
