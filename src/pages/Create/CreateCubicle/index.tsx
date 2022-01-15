import React, { useCallback, useState } from 'react';
import InputMask from 'react-input-mask';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import { BiX } from 'react-icons/bi';
import Dropzone from '../../../components/Dropzone';
import Select from '../../../components/Select';

import {
  Container,
  ContainerButton,
  ContainerCheckbox,
  ContainerInput,
  ContainerRadio,
  ContainerSelect,
  FieldInformation,
  ContainerImages,
  ContainerInfo,
  Header,
} from '../styles';
import Checkbox from '../../../components/Checkbox';
import api from '../../../services/api';
import Input from '../../../components/Input';
import {
  classifications,
  lineProducts,
  voltages,
  currents,
} from '../../../utils/selectOptions.json';

const CreateCubicle: React.FC = () => {
  const [singleLineDiagram, setSingleLineDiagram] = useState<File>();
  const [externalView, setExternalView] = useState<File>();
  const [insideView, setInsideView] = useState<File>();
  const [baseView, setBaseView] = useState<File>();
  const [leftCut, setLeftCut] = useState<File>();
  const [rightCut, setRightCut] = useState<File>();
  const [width, setWidth] = useState(0);

  const [codeCubicle, setCodeCubicle] = useState<string[]>([
    'XX',
    '0',
    'E',
    '1',
    '0',
    '0',
    '0',
    '0',
    '0',
    '00',
  ]);
  const [composition, setComposition] = useState({
    lightningRod: false,
    capacitiveIsolator: false,
    spareCable: false,
  });
  const [inputSide, setInputSide] = useState(true);
  const handleSubmit = useCallback(
    async (formData: any) => {
      try {
        // const schema = Yup.object().shape({
        //   variable_cubicle: Yup.number().moreThan(0).lessThan(4),
        //   width_cubicle: Yup.number().moreThan(0),
        //   height_cubicle: Yup.number().moreThan(0),
        // });

        // await schema.validate(formData, {
        //   abortEarly: false,
        // });

        const data = new FormData();

        const classification = classifications.find(
          item => item.value === formData.classificationCode,
        );

        const lineProduct = lineProducts.find(
          item => item.value === formData.product,
        );

        if (!classification || !lineProduct) {
          throw Error();
        }

        data.append('name', lineProduct.title);
        data.append('initials', lineProduct.value);
        data.append('classification_name', classification.type);
        data.append('classification_code', String(classification.value));
        data.append('input_side', inputSide ? 'Esquerda' : 'Direita');
        data.append('lightning_rod', composition.lightningRod ? '1' : '0');
        data.append(
          'capacitive_isolator',
          composition.capacitiveIsolator ? '1' : '0',
        );
        data.append('spare_cable', composition.spareCable ? '1' : '0');
        data.append('voltage', formData.voltage);
        data.append('current', formData.current);
        data.append('variable', formData.variable_cubicle);
        data.append('width_cubicle', formData.width_cubicle);
        data.append('height_cubicle', formData.height_cubicle);

        if (singleLineDiagram && externalView && insideView && baseView) {
          data.append('single_line_diagram', singleLineDiagram);
          data.append('external_view', externalView);
          data.append('inside_view', insideView);
          data.append('base_view', baseView);
        }

        if (!leftCut && !rightCut) {
          throw Error();
        }

        if (leftCut) data.append('left_cut', leftCut);
        if (rightCut) data.append('right_cut', rightCut);

        await api.post('products', data, {
          onUploadProgress: (progressEvent: ProgressEvent) => {
            console.log(
              `Upload progress: ${Math.round(
                (progressEvent.loaded / progressEvent.total) * 100,
              )}%`,
            );
          },
        });

        toast.success('Cubículo adicionado com sucesso 👍');
      } catch (error) {
        toast.error('Falha ao adicionar cubículo 😮');
      }
    },
    [
      singleLineDiagram,
      externalView,
      insideView,
      baseView,
      leftCut,
      rightCut,
      inputSide,
      composition,
    ],
  );

  const handleChangeCode = useCallback(
    (event: any, position: number) => {
      if (codeCubicle.length < position) {
        setCodeCubicle(oldState => [...oldState, event.value]);
      }

      if (position === 9) {
        event.value = event.target.value.padStart(2, '0');
      }

      const newCodeCubicle = codeCubicle.slice();

      newCodeCubicle[position] = event.value;

      setCodeCubicle(newCodeCubicle);
    },
    [codeCubicle],
  );

  const changeInputSide = useCallback(() => {
    const event = {
      value: inputSide ? 'D' : 'E',
    };
    handleChangeCode(event, 2);
    setInputSide(!inputSide);
  }, [handleChangeCode, inputSide]);

  const handleChangeComposition = useCallback(
    (e: any, position: number) => {
      const { id, checked } = e.target;
      const event = {
        value: checked ? '1' : '0',
      };
      handleChangeCode(event, position);
      setComposition({ ...composition, [id]: checked });
    },
    [composition, handleChangeCode],
  );

  const handleRemoveImage = useCallback(setClean => {
    setClean();
  }, []);

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
        <Link to="/react/create/involucro">Invólucro</Link>
        <Link to="/react/create/caixa">Caixa de transição</Link>
      </Header>
      <Form onSubmit={handleSubmit}>
        <ContainerInfo>
          <legend>Dados do cubículo</legend>
          <FieldInformation>
            <span>Selecione a linha do produto*</span>
            <ContainerSelect>
              <Select
                name="product"
                id="lineProduct"
                options={lineProducts}
                onChange={e => handleChangeCode(e, 0)}
              />
            </ContainerSelect>
          </FieldInformation>

          <FieldInformation>
            <span>Selecione a classificação*</span>
            <ContainerSelect>
              <Select
                name="classificationCode"
                options={classifications}
                onChange={e => handleChangeCode(e, 1)}
              />
            </ContainerSelect>
          </FieldInformation>

          <FieldInformation>
            <span>Selecione o lado de entrada</span>
            <ContainerRadio>
              <label>
                <input
                  type="radio"
                  name="inputSideFromPanel"
                  checked={inputSide}
                  onChange={changeInputSide}
                />
                Esquerda
              </label>

              <label>
                <input
                  type="radio"
                  value="right"
                  name="inputSideFromPanel"
                  checked={!inputSide}
                  onChange={changeInputSide}
                />
                Direita
              </label>
            </ContainerRadio>
          </FieldInformation>

          <FieldInformation>
            <span>Composição</span>
            <ContainerCheckbox>
              <Checkbox
                name="lightningRod"
                label="Para-raio"
                style={{ marginLeft: 10 }}
                checked={composition.lightningRod}
                // onChange={() => setLightningRod(oldState => !oldState)}
                onChange={e => handleChangeComposition(e, 4)}
              />
              <Checkbox
                name="capacitiveIsolator"
                label="Isolador capacitivo"
                style={{ marginLeft: 25 }}
                checked={composition.capacitiveIsolator}
                onChange={e => handleChangeComposition(e, 5)}
              />
              <Checkbox
                name="spareCable"
                label="Cabo reserva"
                style={{ marginLeft: 25 }}
                checked={composition.spareCable}
                onChange={e => handleChangeComposition(e, 6)}
              />
            </ContainerCheckbox>
          </FieldInformation>

          <FieldInformation>
            <span>Leitura de tensão e corrente*</span>
            <ContainerSelect>
              <Select
                name="voltage"
                options={voltages}
                onChange={e => handleChangeCode(e, 7)}
              />
            </ContainerSelect>
            <ContainerSelect>
              <Select
                name="current"
                options={currents}
                onChange={e => handleChangeCode(e, 8)}
              />
            </ContainerSelect>
          </FieldInformation>

          <FieldInformation>
            <span>Dimensões máximas*</span>
            <ContainerInput>
              <Input
                min={0}
                type="number"
                name="width_cubicle_max"
                id="width_cubicle_max"
                placeholder="Largura"
                onChange={e => setWidth(Number(e.target.value))}
              />
              <Input
                min={0}
                type="number"
                name="height_cubicle_max"
                id="height_cubicle_max"
                placeholder="Altura"
              />
              <Input
                min={0}
                type="number"
                name="depth_cubicle_max"
                id="depth_cubicle_max"
                placeholder="Profundidade"
              />
            </ContainerInput>
          </FieldInformation>

          <FieldInformation>
            <span>Dimensões do cubículo</span>
            <ContainerInput>
              <Input
                min={0}
                type="number"
                name="width_cubicle"
                id="width_cubicle"
                placeholder="Largura"
                value={width === 0 ? '' : width}
                readOnly
              />
              <Input
                min={0}
                defaultValue={1700}
                type="number"
                name="height_cubicle"
                id="height_cubicle"
                placeholder="Altura"
                readOnly
              />
              <Input
                min={0}
                defaultValue={920}
                type="number"
                name="depth_cubicle"
                id="depth_cubicle"
                placeholder="Profundidade"
                readOnly
              />
            </ContainerInput>
          </FieldInformation>

          <FieldInformation>
            <span>Variável do cubículo*</span>
            <ContainerInput>
              <Input
                max={4}
                min={0}
                type="number"
                name="variable_cubicle"
                id="variable_cubicle"
                placeholder="Variável"
                onChange={e => handleChangeCode(e, 9)}
              />
            </ContainerInput>
          </FieldInformation>

          <FieldInformation>
            <span>Código do cubículo</span>
            <ContainerInput>
              <InputMask
                className="code__mark"
                mask="aa9-a-9-99999-99"
                value={codeCubicle.join('').toUpperCase()}
              />
            </ContainerInput>
          </FieldInformation>
        </ContainerInfo>

        <ContainerImages>
          <legend>Imagens do cubículo</legend>
          <FieldInformation>
            <span>Diagrama Unifilar*</span>
            <Dropzone
              onFileUploaded={setSingleLineDiagram}
              fileUploaded={singleLineDiagram}
            />
          </FieldInformation>
          <FieldInformation>
            <span>Vista Externa*</span>
            <Dropzone
              onFileUploaded={setExternalView}
              fileUploaded={externalView}
            />
          </FieldInformation>
          <FieldInformation>
            <span>Vista Interna*</span>
            <Dropzone
              onFileUploaded={setInsideView}
              fileUploaded={insideView}
            />
          </FieldInformation>
          <FieldInformation>
            <span>Vista da Base*</span>
            <Dropzone onFileUploaded={setBaseView} fileUploaded={baseView} />
          </FieldInformation>
          <FieldInformation>
            <span>Vista do Corte Esquerdo</span>
            <Dropzone onFileUploaded={setLeftCut} fileUploaded={leftCut} />
            {leftCut && (
              <button
                onClick={() => handleRemoveImage(setLeftCut)}
                type="button"
              >
                <BiX size={20} />
              </button>
            )}
          </FieldInformation>
          <FieldInformation>
            <span>Vista do Corte Direito</span>
            <Dropzone onFileUploaded={setRightCut} fileUploaded={rightCut} />
            {rightCut && (
              <button
                onClick={() => handleRemoveImage(setRightCut)}
                type="button"
              >
                <BiX size={20} />
              </button>
            )}
          </FieldInformation>
        </ContainerImages>
        <ContainerButton>
          <button type="submit">Adicionar</button>
        </ContainerButton>
      </Form>
    </Container>
  );
};

export default CreateCubicle;
