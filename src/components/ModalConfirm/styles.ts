import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 8px;

  p {
    margin-left: 8px;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  h1 {
    font-size: 24px;
  }

  svg {
    margin-right: 8px;
    height: 24px;
    width: 24px;
  }
`;

export const ButtonContainer = styled.section`
  display: flex;
  align-content: flex-end;
  justify-content: flex-end;
  flex: 1px;
  margin-top: 24px;

  button {
    padding: 12px;
    border-radius: 4px;
    font-weight: bold;

    & + button {
      margin-left: 16px;
    }
  }
`;

export const ConfirmButton = styled.button`
  background: #4caf50;
  color: #fafafa;
  border: 1px solid #4caf50;

  &:hover {
    background: ${shade(0.2, '#4caf50')};
  }
`;

export const CancelButton = styled.button`
  background: inherit;
  color: #d11a2a;
  border: 1px solid #d11a2a;

  &:hover {
    background: ${shade(0.1, '#F0F0F5')};
  }
`;
