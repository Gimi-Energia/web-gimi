import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 24px;

  position: relative;

  img {
    height: 566px;
    border: 1px solid #616161;
  }

  div {
    & + div {
      margin-left: 36px;
    }
  }

  span {
    font-size: 14px;
    font-weight: 600;
    margin-top: 16px;
    height: 36px;
    /* border: 1px solid; */
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
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
`;
