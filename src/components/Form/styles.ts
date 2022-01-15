import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  .label-position-box {
    font-size: 14px;
    font-weight: 600;
  }

  input[type='number'] {
    border-radius: 4px;
    background: #fff;
    border: 1px solid #cccccc;
    width: 100%;
    height: 38px;
    margin: 4px 0 16px;
    padding: 2px 8px;

    &:focus {
      border-color: #4caf50;
    }

    &:disabled {
      background: ${shade(0.1, '#fff')};
    }
  }

  .checkbox-container {
    margin-bottom: 16px;

    strong {
      font-size: 14px;
    }
  }

  .input-side-container {
    margin: 4px 0 16px;

    strong {
      font-size: 14px;
    }

    label {
      display: flex;
      align-items: center;
      margin-top: 4px;
      font-size: 14px;

      & + label {
        margin-top: 8px;
      }
    }

    input[type='radio'] {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 224px;

  button {
    height: 48px;
    width: 100px;
    border: 0 solid;
    border-radius: 8px;
    background: #4caf50;
    color: #fafafa;
    font-weight: bold;
  }

  .add {
    background: #4caf50;
    &:hover,
    &:focus {
      background: ${shade(0.3, '#4caf50')};
    }
  }

  .verify {
    background: #fafafa;
    color: #4caf50;
    border: 2px solid #4caf50;

    &:hover,
    &:focus {
      background: ${shade(0.1, '#fafafa')};
    }
  }
`;
