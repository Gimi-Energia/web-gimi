import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 730px;
  margin: 60px auto;

  fieldset {
    border: none;

    & + fieldset {
      margin-top: 80px;
    }
  }

  legend {
    margin-bottom: 32px;
    font-size: 24px;
    font-weight: bold;
  }
`;

export const ContainerInfo = styled.fieldset``;

export const Header = styled.header`
  display: flex;
  margin-bottom: 16px;

    a {
      display: flex;
      align-items: center;

      background: #4caf50;
      color: #fafafa;
      text-decoration: none;
      padding: 12px;
      border-radius: 4px;

      &:hover {
        background: ${shade(0.2, '#4caf50')};
      }

      & + a {
        margin-left: 12px;
      }
    }
  }
`;

export const FieldInformation = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    right: -18px;
    top: 4px;
    padding: 0;
    background: none;
    border: none;
    transition: background-color 200ms;

    &:hover {
      color: #d11a2a;
    }
  }

  & + div {
    margin-top: 24px;
  }

  > span {
    width: 210px;
    margin-right: 17px;
  }
`;

export const ContainerSelect = styled.div`
  flex: 1;

  & + div {
    margin-left: 16px;
  }
`;

export const ContainerCheckbox = styled.div`
  display: flex;
`;

export const ContainerInput = styled.div`
  flex: 1;

  .code__mark,
  input[type='number'],
  input[type='text'] {
    border: 1px solid hsl(0deg 0% 80%);
    border-radius: 4px;
    min-height: 38px;
    height: 38px;
    padding: 11px 10px;
    width: 158px;
    color: #616161;

    & + input {
      margin-left: 12px;
    }
  }

  input[type='text'] {
    width: 100%;
  }
`;

export const ContainerRadio = styled.div`
  display: flex;

  > label {
    display: flex;
    align-items: center;
    margin-right: 25px;
    font-size: 14px;
  }

  label:first-child {
    margin-left: 10px;
  }

  input[type='radio'] {
    width: 16px;
    height: 16px;

    margin-right: 4px;
  }
`;

export const ContainerImages = styled.fieldset`
  div + div {
    margin-top: 16px;
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    margin-top: 32px;
    height: 48px;
    width: 120px;
    left: 963px;
    top: 1527px;
    border: none;
    border-radius: 8px;
    background: #4caf50;
    color: #fafafa;
    font-weight: bold;
  }
`;
