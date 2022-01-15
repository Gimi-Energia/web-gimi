import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin: 8px 0;

  & + div {
    margin-top: 8px;
  }

  label {
    font-size: 14px;
    border-bottom: 4px;
  }

  input {
    margin-right: 8px;
    width: 16px;
    height: 16px;
  }
`;
