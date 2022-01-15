import styled, { css } from 'styled-components';

interface IContainerProps {
  variable?: number;
  hasWrapper?: boolean;
  isSelected?: boolean;
}

export const Container = styled.div<IContainerProps>`
  height: 40px;
  margin-top: ${props => (props.hasWrapper ? 48 : 16)}px;
  border: 1px dashed;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    flex: 1;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }

  ${props =>
    props.hasWrapper &&
    props.variable === 1 &&
    css`
      margin-top: 112px;
    `}

  ${props =>
    props.hasWrapper &&
    props.variable === 2 &&
    css`
      margin-top: 162px;
    `}

  ${props =>
    props.isSelected &&
    css`
      background: #81b71a;
    `}

  & + div {
    margin-top: 0;
    border-top: 0;
  }

  &:last-child {
    margin-bottom: 16px;
  }
`;
