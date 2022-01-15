import styled, { css } from 'styled-components';

interface ContainerProps {
  hasTransitionBox: boolean;
  overHeight: boolean;
  positionLast: number;
  positionStart: number;
  positionEnd: number;
}

export const Container = styled.div<ContainerProps>`
  grid-row: 1 / ${props => (props.hasTransitionBox || props.overHeight ? 2 : 3)};
  grid-column-start: ${props => props.positionStart};
  grid-column-end: ${props => props.positionEnd};
  border: 0.5px solid;
  border-bottom: 0;
  height: ${props => (props.hasTransitionBox || props.overHeight ? 45 : 170)}px;

  display: flex;
  position: relative;

  .beiral {
    width: 100%;
    margin-top: 10px;
    border-bottom: 0.5px solid;
    border-top: 0.5px solid;
    height: 33px;
  }

  .barraLateralEsquerda {
    position: absolute;
    border-left: 0.5px solid;
    top: 43px;
    left: -1px;
    height: 125px;
    z-index: 2;
  }

  .barraLateralDireita {
    position: absolute;
    border-right: 0.5px solid;
    top: 43px;
    right: -1px;
    height: 125px;
    z-index: 2;
  }

  ${props =>
    props.positionStart === 1 &&
    css`
      .beiralLeft {
        border: 0.5px solid;
        height: 12px;
        width: 17px;
        position: absolute;
        margin-top: 0px;
        left: -17px;
        top: -1px;
      }
    `}

  ${props =>
    props.positionLast + 1 === props.positionEnd &&
    css`
      .beiralRight:last-child {
        border: 0.5px solid;
        height: 12px;
        width: 17px;
        position: absolute;
        right: -17px;
        margin-top: 0px;
        top: -1px;
      }
    `}
`;
