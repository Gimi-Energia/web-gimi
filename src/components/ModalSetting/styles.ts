import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  h2 {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;

    svg {
      margin-right: 8px;
    }
  }

  section {
    display: flex;
    flex-direction: column;
    width: 400px;

    label {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .btn_close {
    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(0, 0, 0, 0.1);
    border: 0px;
    padding: 4px;
    border-radius: 4px;
    position: absolute;
    right: -56px;
    top: -12px;
    transition: background-color 250ms;

    svg {
      height: 20px;
      width: 20px;
    }

    &:hover {
      background: #d11a2a;
      border-color: #d11a2a;

      svg {
        color: #fafafa;
      }
    }
  }

  .btn_print {
    text-decoration: none;
    padding: 8px;
    width: 100%;
    height: 32px;
    color: #fafafa;
    font-size: 14px;
    font-weight: bold;
    border: none;
    margin-top: 12px;
    border-radius: 4px;
    background: #4caf50;

    &:hover,
    &:focus {
      background: ${shade(0.2, '#4caf50')};
    }
  }
`;
