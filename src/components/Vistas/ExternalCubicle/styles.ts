/* eslint-disable indent */
import styled, { css } from 'styled-components';

interface IContainerProps {
  overHeight: boolean;
  hasWrapper: boolean;
  hasTransitionBox: boolean;
}

interface ITransitionBoxProps {
  overHeight: boolean;
  hasWrapper: boolean;
}

export const TransitionBox = styled.div<ITransitionBoxProps>`
  ${({ hasWrapper, overHeight }) =>
    !hasWrapper &&
    css`
      padding-bottom: ${overHeight ? 25 : 125}px;
      width: 100%;
      border: 1px solid;
    `}
`;

export const Container = styled.div`
  position: relative;

  ul {
    display: grid;
    grid-template-rows: auto 125px 567px 32px;
    grid-template-columns: repeat(auto, auto);
  }
`;

export const CubicleContainer = styled.li<IContainerProps>`
  position: relative;

  height: ${props => (props.overHeight ? 667 : 567)}px;

  ${({ overHeight, hasTransitionBox }) =>
    !hasTransitionBox &&
    css`
      margin-top: ${overHeight ? 25 : 0}px;
      grid-row: ${overHeight ? 2 : 3} / 4;
    `};

  ${({ overHeight, hasTransitionBox, hasWrapper }) =>
    hasTransitionBox &&
    !hasWrapper &&
    css`
      grid-row: 2/ 4;
      .transition-box {
        padding-bottom: ${overHeight ? 25 : 125}px;
        width: 100%;
        border: 1px solid;
      }
    `};

  ${({ overHeight, hasTransitionBox, hasWrapper }) =>
    hasTransitionBox &&
    hasWrapper &&
    css`
      margin-top: ${overHeight ? 25 : 0}px;
      grid-row: ${overHeight ? 2 : 3} / 4;
    `};

  img {
    height: ${props => (props.overHeight ? 667 : 567)}px;
  }
  /* width: ${props => (props.overHeight ? 250 : 200)}px; */
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
