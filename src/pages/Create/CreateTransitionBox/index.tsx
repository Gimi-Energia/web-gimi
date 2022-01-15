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
  codeTransitionBox: string;
  width_transition_box: number;
  height_transition_box: number;
  depth_transition_box: number;
}

const CreateTransitionBox: React.FC = () => {
  const [boxSingleLine, setBoxSingleLine] = useState<File>();
  const [boxCubicle, setBoxCubicle] = useState<File>();
  const [boxCutView, setBoxCutView] = useState<File>();
  const [sideType, setSideType] = useState('');
  const [usingType, setUsingType] = useState(false);

  const handleSubmit = useCallback(
    async (formData: IFormData) => {
      try {
        const data = new FormData();

        // data.append('lineProduct', formData.product);
        data.append('code', formData.codeTransitionBox);
        data.append('type', sideType);
        data.append('wrapper', String(usingType));
        data.append('height', String(formData.height_transition_box));
        data.append('width', String(formData.width_transition_box));
        data.append('depth', String(formData.depth_transition_box));

        if (boxSingleLine && boxCubicle && boxCutView) {
          data.append('box_single_line', boxSingleLine);
          data.append('box_cubicle', boxCubicle);
          data.append('cut_image', boxCutView);
        }

        await api.post('transition-boxes', data);
        toast.success('Caixa de transição adicionado com sucesso 👍');
      } catch (error) {
        toast.error('Falha ao adicionar caixa de transição 😮');
      }
    },
    [boxCubicle, boxCutView, boxSingleLine, sideType, usingType],
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
        <Link to="/react/create/involucro">Invólucro</Link>
      </Header>
      <Form onSubmit={handleSubmit}>
        <ContainerInfo>
          <legend>Dados da caixa de transição</legend>
          <FieldInformation>
            <span>Linha do produto</span>
            <ContainerSelect>
              <Select name="product" id="lineProduct" options={lineProducts} />
            </ContainerSelect>
          </FieldInformation>

          <FieldInformation>
            <span>Código da caixa</span>
            <ContainerInput>
              <InputMask
                name="codeTransitionBox"
                className="code__mark"
                mask="aa.a.aa.999.99"
              />
            </ContainerInput>
          </FieldInformation>

          <FieldInformation>
            <span>Dimensões do invólucro</span>
            <ContainerInput>
              <Input
                min={0}
                type="number"
                name="width_transition_box"
                id="width_transition_box"
                placeholder="Largura"
              />
              <Input
                min={0}
                type="number"
                name="height_transition_box"
                id="height_transition_box"
                placeholder="Altura"
              />
              <Input
                min={0}
                type="number"
                name="depth_transition_box"
                id="depth_transition_box"
                placeholder="Profundidade"
              />
            </ContainerInput>
          </FieldInformation>

          <FieldInformation>
            <span>Tipo de uso</span>
            <ContainerRadio>
              <label>
                <input
                  type="radio"
                  name="type"
                  checked={!usingType}
                  onChange={() => setUsingType(!usingType)}
                />
                Abrigado
              </label>

              <label>
                <input
                  type="radio"
                  name="type"
                  checked={usingType}
                  onChange={() => setUsingType(!usingType)}
                />
                Tempo
              </label>
            </ContainerRadio>
          </FieldInformation>

          <FieldInformation>
            <span>Lado / Tipo</span>
            <ContainerRadio>
              <label>
                <input
                  type="radio"
                  name="sideType"
                  value="BL"
                  onChange={e => setSideType(e.target.value)}
                />
                Esquerda
              </label>

              <label>
                <input
                  type="radio"
                  value="BB"
                  name="sideType"
                  onChange={e => setSideType(e.target.value)}
                />
                Meio
              </label>

              <label>
                <input
                  type="radio"
                  value="BD"
                  name="sideType"
                  onChange={e => setSideType(e.target.value)}
                />
                Direita
              </label>

              <label>
                <input
                  type="radio"
                  value="IS"
                  name="sideType"
                  onChange={e => setSideType(e.target.value)}
                />
                Isolador
              </label>
            </ContainerRadio>
          </FieldInformation>
        </ContainerInfo>

        <ContainerImages>
          <legend>Imagens da caixa de transição</legend>

          <FieldInformation>
            <span>Vista em Corte</span>
            <Dropzone
              onFileUploaded={setBoxSingleLine}
              fileUploaded={boxSingleLine}
            />
          </FieldInformation>

          <FieldInformation>
            <span>Caixa no Diagrama Unifilar</span>
            <Dropzone
              onFileUploaded={setBoxCubicle}
              fileUploaded={boxCubicle}
            />
          </FieldInformation>

          <FieldInformation>
            <span>Caixa no Cubículo</span>
            <Dropzone
              onFileUploaded={setBoxCutView}
              fileUploaded={boxCutView}
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

export default CreateTransitionBox;
