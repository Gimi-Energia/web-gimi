import styled from 'styled-components';

export const ContainerDropzone = styled.div`
  width: 500px;
  height: 56px;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 0;
  border: 2px dashed hsl(0deg 0% 80%);

  p {
    display: flex;
    color: #616161;

    strong {
      margin-left: 4px;
    }
  }
`;
