/* eslint-disable indent */
import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1120px;
  display: flex;

  @media print {
    margin: 0;
    background: #fafafc;
  }
`;

export const Content = styled.main`
  display: flex;
  height: 100%;
`;

export const SelectGroup = styled.aside`
  display: flex;
  align-items: center;

  background: #fafafc;
  height: 100vh;
  padding: 16px 20px 16px 40px;

  margin-right: 20px;
  border-right: 1px solid #212121;

  @media print {
    display: none;
  }
`;

export const ContainerMeasures = styled.div`
  display: flex;
  margin-left: 40px;
`;

export const Measures = styled.div`
  padding-left: 12px;

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

export const ContainerDeepWrapper = styled.div`
  margin-left: 24px;
  display: flex;

  @media print {
    display: none;
  }
`;

export const ContainerButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80px;

  article {
    display: flex;

    > button {
      background: #fafafa;
      color: #4caf50;
      border: 2px solid #4caf50;
      border-radius: 4px;
      height: 40px;
      transition: background-color 250ms;

      &:hover {
        background: ${shade(0.3, '#fafafa')};
      }

      @media print {
        display: none;
      }
    }

    input {
      flex: 1;
      padding: 8px;
      border-radius: 4px;
      background: transparent;
      border: 1px solid #616161;

      &::placeholder {
        font-size: 12px;
      }

      &:focus {
        border-color: #4caf50;
      }

      @media print {
        display: none;
      }
    }

    .btnReset,
    .btnPrint {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #616161;
      background: inherit;
      width: 40px;

      svg {
        height: 20px;
        width: 20px;
        transition: color 250ms;
        color: #616161;
      }

      & + button {
        margin-left: 12px;
      }

      @media print {
        display: none;
      }
    }

    .btnReset {
      &:hover,
      &:focus {
        background: #d11a2a;
        border-color: #d11a2a;

        svg {
          color: #fafafa;
        }
      }
    }

    .btnPrint {
      &:hover,
      &:focus {
        background: #4caf50;
        border-color: #4caf50;

        svg {
          color: #fafafa;
        }
      }
    }

    .btnApply {
      background: #4caf50;
      color: #fafafa;
      width: 80px;
      margin-left: 24px !important;

      &:hover,
      &:focus {
        background: ${shade(0.25, '#4caf50')};
      }
    }
  }
`;

export const LogoImage = styled.img`
  display: none;

  /* @media print {
    display: block;
  } */
`;

export const Header = styled.header`
  @media print {
    display: none;
  }
  display: flex;
  align-items: center;
  height: 120px;
  margin-left: 40px;
  width: 60vw;
`;

export const ButtonDeepWrapper = styled.button<{ isSelected: boolean }>`
  background: ${props => (props.isSelected ? '#4caf50' : '#fafafa')};
  color: ${props => (props.isSelected ? '#fafafa' : '#181818')};

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid #4caf50;
  height: 40px;
  width: 80px;
  padding: 8px;
  transition: background-color 250ms;

  &:first-child {
    border-radius: 4px 0 0 4px;
  }

  &:last-child {
    border-radius: 0 4px 4px 0;
  }

  &:hover {
    background: ${props =>
      shade(0.15, props.isSelected ? '#4caf50' : '#fafafa')};
  }
`;

export const Views = styled.main`
  @media print {
    margin: 0;
    display: none;

    display: flex;
    flex-direction: column;
    justify-content: center;

    .tabs {
      display: none;
    }
  }
`;

export const Painel = styled.ul`
  padding: 24px 40px;
  display: flex;
  flex-direction: column;
  height: 82vh;
  background: #ffffff;
  align-items: flex-start;
  list-style: none;
  overflow: auto;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);

  scrollbar-width: thin;
  scrollbar-color: blue orange;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #616161;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 20px;
    border: 4px solid #4caf50;
  }

  @media print {
    box-shadow: none;
  }
`;
