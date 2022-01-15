/* eslint-disable indent */
import styled, { css } from 'styled-components';

interface ICubicleImage {
  hasWrapper: boolean;
  hasTransitionBox: boolean;
  cutSide: string;
  position: number;
  height: number;
}

interface ITransitionBoxImage {
  hasWrapper: boolean;
  position: number;
  cutSide: string;
}

interface IWrapperImage {
  cutSide: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  section {
    & + section {
      margin-top: 48px;
      border-top: 1px solid;
      padding-top: 48px;
    }

    > ul {
      display: flex;
      list-style: none;
      align-items: flex-end;

      > li {
        position: relative;

        & + li {
          border-left: 1px solid;
          padding-left: 48px;
          margin-left: 48px;
        }
      }
    }
  }

  @media print {
    display: block;

    section {
      & + section {
        margin-top: 0;
        border-top: none;
        padding-top: 0;
      }
    }

    .break_page {
      page-break-before: left;
      /* flex-grow: 10; */
    }

    @page {
      margin: 10mm 0 0 0;
    }
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

export const TransitionBoxImage = styled.img<ITransitionBoxImage>`
  position: absolute;
  height: 125px;
  width: 306px;
  top: -8px;
  left: 1px;

  ${({ cutSide }) =>
    cutSide === 'left' &&
    css`
      top: -9px;
      left: 130px;
      /* z-index: 1; */
    `}

  ${props =>
    props.hasWrapper &&
    props.cutSide === 'right' &&
    css`
      top: 46px;
      left: ${props.position === 0 ? 81 : 128}px;
      z-index: 1;
    `}
  ${props =>
    props.hasWrapper &&
    props.cutSide === 'left' &&
    css`
      top: 47px;
      left: ${props.position === 0 ? 143 : 190}px;
      z-index: 1;
    `}
`;

export const WrapperImage = styled.img<IWrapperImage>`
  height: 770px;
  /* z-index: 1; */
  position: relative;

  ${props =>
    props.cutSide === 'left' &&
    css`
      transform: scaleX(-1);
    `}
`;

export const CubicleImage = styled.div<ICubicleImage>`
  img {
    height: ${props => props.height}px;

    ${props =>
      props.hasTransitionBox &&
      props.height <= 567 &&
      css`
        margin-top: 117px;
      `}

    ${({ height }) =>
      height > 567 &&
      css`
        margin-top: 40px;
      `}

    ${props =>
      props.hasWrapper &&
      props.cutSide === 'right' &&
      css`
        left: ${props.position === 0 ? 80 : 128}px;
        position: absolute;
        bottom: 107px;
      `}

    ${props =>
      props.hasWrapper &&
      props.cutSide === 'left' &&
      css`
        right: 80px;
        bottom: 107px;
        position: absolute;
      `}
  }
`;
