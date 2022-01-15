import { shade } from 'polished';
import styled, { css } from 'styled-components';

export const Container = styled.div<{ hasImage: boolean }>`
  grid-row: 2;
  height: 116px;
  position: relative;

  ${({ hasImage }) =>
    !hasImage &&
    css`
      border: 1px dashed;
    `}

  @media print {
    border: 0;
  }

  > span {
    position: absolute;
    font-size: 13px;
    top: 4px;
    left: 4px;
  }

  > button {
    position: absolute;
    background: #ffacac;
    width: 24px;
    height: 24px;
    top: 4px;
    left: 170px;
    border-radius: 4px;
    border: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    @media print {
      display: none;
    }

    &:hover {
      background: ${shade(0.25, '#FFACAC')};
    }
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  display: inline-block;

  top: 2px;
  right: 4px;

  &:hover div {
    display: block;
  }

  span {
    display: flex;
    position: absolute;
    right: 4px;
    top: 4px;
    background: inherit;
    padding: 2px;
    border-radius: 4px;
    border: 1px solid #616161;

    svg {
      color: #616161;
    }

    &:hover {
      background: #4caf40;
      border-color: #4caf40;

      svg {
        color: #fafafa;
      }
    }

    @media print {
      display: none;
    }
  }
`;

export const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  top: 26px;
  right: 4px;
  background-color: #f1f1f1;
  z-index: 1;

  > button {
    color: #fafafa;
    background: #4caf50;
    height: 40px;
    width: 80px;
    border: 0;
    display: block;
    transition: background-color 200ms;

    &:first-child {
      border-radius: 4px 4px 0 0;
    }

    &:last-child {
      border-radius: 0 0 4px 4px;
    }

    &:hover {
      background: ${shade(0.25, '#4caf50')};
    }
  }
`;

export const TransitionBoxImage = styled.img`
  height: 117px;
`;
