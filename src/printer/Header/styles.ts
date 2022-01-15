import styled from 'styled-components';

export const Container = styled.div`
  display: none;
  align-items: center;
  margin-bottom: 40px;

  @media print {
    display: flex;
  }
`;

export const Measures = styled.div`
  padding-left: 24px;

  & + div {
    padding-right: 12px;
    border-left: 2px solid rgba(0, 0, 0, 0.3);
    margin-left: 12px;
  }

  h2 {
    font-size: 16px;
    margin-bottom: 4px;
  }

  div {
    display: flex;

    ul {
      list-style: none;
      font-size: 14px;

      & + ul {
        margin-left: 8px;

        li {
          text-align: right;
        }
      }

      li + li {
        margin-top: 4px;
      }
    }
  }
`;

export const LogoImage = styled.img``;
