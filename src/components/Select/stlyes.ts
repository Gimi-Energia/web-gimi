import styled from 'styled-components';

export const SelectBlock = styled.div`
  position: relative;

  & + div {
    margin-top: 16px;
  }

  label {
    font-weight: 600;
    font-size: 14px;
    display: block;
    margin-bottom: 4px;
  }
`;
