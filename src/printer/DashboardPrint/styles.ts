import styled from 'styled-components';

export const Container = styled.div`
  display: none;
  flex-direction: column;
  margin: 40px 24px 0;

  @media print {
    display: block;

    section {
      break-before: left;
    }
  }

  section {
    display: flex;
    flex-direction: column;
    margin-left: 40px;
    align-items: flex-start;
  }
`;
