import React, { useCallback, useState } from 'react';
import { Form } from '@unform/web';
import { toast, ToastContainer } from 'react-toastify';

import { Link } from 'react-router-dom';
import Dropzone from '../../../components/Dropzone';
import Input from '../../../components/Input';
import InputMask from '../../../components/InputMark';
import Select from '../../../components/Select';
import api from '../../../services/api';
import { lineProducts } from '../../../utils/selectOptions.json';
import {
  FieldInformation,
  Container,
  ContainerButton,
  ContainerImages,
  ContainerInfo,
  ContainerInput,
  ContainerRadio,
  ContainerSelect,
  Header,
} from '../styles';

interface IFormData {
  product: string;
  codeWrapper: string;
  width_wrapper: number;
  height_wrapper: number;
  depth_wrapper: number;
}

const CreateWrapper: React.FC = () => {
  const [wrapperFrontalView, setWrapperFrontalView] = useState<File>();
  const [wrapperCutLeft, setWrapperCutLeft] = useState<File>();
  const [wrapperCutRight, setWrapperCutRight] = useState<File>();
  const [closureForTransition, setClosureForTransition] = useState(true);

  const handleSubmit = useCallback(
    async (formData: IFormData) => {
      try {
        const data = new FormData();

        // data.append('lineProduct', formData.product);
        data.append('code', formData.codeWrapper);
        data.append('closure_for_transition', String(closureForTransition));
        data.append('height', String(formData.height_wrapper));
        data.append('width', String(formData.width_wrapper));
        data.append('depth', String(formData.depth_wrapper));

        if (wrapperFrontalView && wrapperCutRight) {
          data.append('front_wrapper_view', wrapperFrontalView);
          // data.append('box_cubicle', wrapperCutLeft);
          data.append('side_wrapper_view', wrapperCutRight);
        }

        await api.post('wrappers', data);
        toast.success('Invólucro adicionado com sucesso 👍');
      } catch (error) {
        toast.error('Falha ao adicionar invólucro 😮');
      }
    },
    [wrapperFrontalView, wrapperCutRight, closureForTransition],
  );
  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Header>
        <Link to="/react/create/cubiculo">Cubículo</Link>
        <Link to="/react/create/caixa">Caixa de transição</Link>
      </Header>

      <Form onSubmit={handleSubmit}>
        <ContainerInfo>
          <legend>Dados do invólucro</legend>
          <FieldInformation>
            <span>Linha do produto*</span>
            <ContainerSelect>
              <Select name="product" id="lineProduct" options={lineProducts} />
            </ContainerSelect>
          </FieldInformation>

          <FieldInformation>
            <span>Código do invólucro*</span>
            <ContainerInput>
              <InputMask
                name="codeWrapper"
                className="code__mark"
                mask="aa.a.aa.999.99"
              />
            </ContainerInput>
          </FieldInformation>

          <FieldInformation>
            <span>Transição de barramento</span>
            <ContainerRadio>
              <label>
                <input
                  type="radio"
                  name="closureForTransition"
                  checked={closureForTransition}
                  onChange={() =>
                    setClosureForTransition(!closureForTransition)
                  }
                />
                Com transição de barra
              </label>

              <label>
                <input
                  type="radio"
                  name="closureForTransition"
                  checked={!closureForTransition}
                  onChange={() =>
                    setClosureForTransition(!closureForTransition)
                  }
                />
                Sem transição de barra
              </label>
            </ContainerRadio>
          </FieldInformation>

          <FieldInformation>
            <span>Dimensões do invólucro*</span>
            <ContainerInput>
              <Input
                min={0}
                type="number"
                name="width_wrapper"
                id="width_wrapper"
                placeholder="Largura"
              />
              <Input
                min={0}
                type="number"
                name="height_wrapper"
                id="height_wrapper"
                placeholder="Altura"
              />
              <Input
                min={0}
                type="number"
                name="depth_wrapper"
                id="depth_wrapper"
                placeholder="Profundidade"
              />
            </ContainerInput>
          </FieldInformation>
        </ContainerInfo>

        <ContainerImages>
          <legend>Imagens do invólucro</legend>

          <FieldInformation>
            <span>Vista Frontal*</span>
            <Dropzone
              onFileUploaded={setWrapperFrontalView}
              fileUploaded={wrapperFrontalView}
            />
          </FieldInformation>

          <FieldInformation>
            <span>Vista do Corte Esquerdo*</span>
            <Dropzone
              onFileUploaded={setWrapperCutLeft}
              fileUploaded={wrapperCutLeft}
            />
          </FieldInformation>

          <FieldInformation>
            <span>Vista do Corte Direito*</span>
            <Dropzone
              onFileUploaded={setWrapperCutRight}
              fileUploaded={wrapperCutRight}
            />
          </FieldInformation>
        </ContainerImages>

        <ContainerButton>
          <button type="submit">Adicionar</button>
        </ContainerButton>
      </Form>
    </Container>
  );
};

export default CreateWrapper;
