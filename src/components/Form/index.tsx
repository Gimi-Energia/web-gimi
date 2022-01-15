import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid_v4 } from 'uuid';
import { Form } from '@unform/web';

import { ICubicleProps, useCubicle } from '../../hooks/cubiclesContext';
import { useWrapper } from '../../hooks/wrapperContext';

import api from '../../services/api';
import Checkbox from '../Checkbox';
import Select from '../Select';
import loadingGif from '../../assets/loading.gif';
import { Container, ButtonContainer } from './styles';
import {
  classifications,
  lineProducts,
  voltages,
  currents,
} from '../../utils/selectOptions.json';

interface IFormProps {
  previewProduct: ICubicleProps | undefined;
  toggleModal: () => void;
  setInputSideFromPanel: (inputSide: string) => void;
  setPreviewProduct: (product: ICubicleProps | undefined) => void;
}

interface IClassificationProps {
  value: number;
  label: string;
  type: string;
}

const FormSelector: React.FC<IFormProps> = ({
  setInputSideFromPanel,
  previewProduct,
  setPreviewProduct,
  toggleModal,
}) => {
  const { wrappers, addWrapper } = useWrapper();
  const { addCubicle, cubicles, updateCubicles } = useCubicle();

  const [loading, setLoading] = useState(false);
  const [positionBox, setPositionBox] = useState(0);
  const [left, setLeft] = useState(true);
  const [right, setRight] = useState(false);
  const [lightningRod, setLightningRod] = useState(false);
  const [capacitiveIsolator, setCapacitiveIsolator] = useState(false);
  const [spareCable, setSpareCable] = useState(false);
  const [classificationFilter, setClassificationFilter] = useState<
    IClassificationProps[]
  >([]);
  const [aplication, setAplication] = useState([
    {
      value: '',
      label: '',
    },
  ]);

  useEffect(() => {
    const aplicationType = classifications.map(item => item.type);

    const filterAplicationType = aplicationType.filter(
      (item, index) => aplicationType.indexOf(item) === index,
    );

    const formattedAplication = filterAplicationType.map(item => ({
      value: item,
      label: item,
    }));

    setAplication(formattedAplication);
  }, []);

  const handleFilterClassification = useCallback((event: any) => {
    const filter = classifications.filter(item => item.type === event.value);
    setClassificationFilter(filter);
  }, []);

  const changeInputSideFromPanel = useCallback(() => {
    if (cubicles.length > 0) {
      toast.error(
        'Não é possível alterar o lado de entrada com cubículos inseridos.',
      );
      return;
    }

    setLeft(!left);
    setRight(!right);

    if (!left) {
      setInputSideFromPanel('left');
    } else {
      setInputSideFromPanel('right');
    }
  }, [left, right, cubicles, setInputSideFromPanel]);

  const handleAddCubicle = useCallback(() => {
    if (!previewProduct) {
      toast.error('Verifique antes de adicionar.');
      return;
    }

    const addProduct = {
      ...previewProduct,
      id: uuid_v4(),
      description: previewProduct.classification_name.toUpperCase(),
    };

    if (!left) {
      const newPositionInvolucros = wrappers.map(wrapper => ({
        ...wrapper,
        index_start: wrapper.index_start + 1,
        index_end: wrapper.index_end + 1,
      }));

      addWrapper(newPositionInvolucros);
    }

    addCubicle(addProduct, left ? 'left' : 'right');
  }, [addCubicle, addWrapper, wrappers, previewProduct, left]);

  const handleModifyCubicle = useCallback(() => {
    if (!previewProduct) {
      toast.error('Verifique antes de modificar.');

      return;
    }

    const modifyListProducts = cubicles.map((cubicle, index) => {
      const addProduct = {
        ...previewProduct,
        id: uuid_v4(),
        description: previewProduct.classification_name,
      };

      if (left) {
        if (index === positionBox - 1) {
          return addProduct;
        }
        return cubicle;
      }

      if (cubicles.length - index === positionBox) {
        return addProduct;
      }
      return cubicle;
    }) as ICubicleProps[];

    setPositionBox(0);
    updateCubicles(modifyListProducts);
  }, [positionBox, previewProduct, cubicles, updateCubicles, left]);

  const handleVerifyCubicle = useCallback(
    async (data: any) => {
      try {
        setLoading(true);
        const response = await api.get('products/product-specific', {
          params: {
            initials: data.product,
            classification_name: data.classificationName,
            classification_code: data.classificationCode,
            input_side: data.inputSide.charAt(0),
            lightning_rod: +lightningRod,
            capacitive_isolator: +capacitiveIsolator,
            spare_cable: +spareCable,
            voltage: data.voltage,
            current: data.current,
            variable: data.variable,
          },
        });

        setPreviewProduct(response.data);
        toggleModal();
      } catch (err) {
        toast.error('Cubículo não encontrado.');
      } finally {
        setLoading(false);
      }
    },
    [
      setPreviewProduct,
      toggleModal,
      lightningRod,
      capacitiveIsolator,
      spareCable,
    ],
  );

  return (
    <Container>
      <Form onSubmit={handleVerifyCubicle}>
        <section className="input-side-container">
          <strong>Lado de entrada da Subestação</strong>
          <label>
            <input
              type="radio"
              value="left"
              name="inputSideFromPanel"
              checked={left}
              onChange={changeInputSideFromPanel}
            />
            Esquerda
          </label>

          <label>
            <input
              type="radio"
              value="right"
              name="inputSideFromPanel"
              checked={right}
              onChange={changeInputSideFromPanel}
            />
            Direita
          </label>
        </section>

        <label htmlFor="positionBox" className="label-position-box">
          Cubículo que deseja alterar
        </label>
        <input
          max={cubicles.length}
          min="0"
          type="number"
          name="positionBox"
          id="positionBox"
          disabled={cubicles.length <= 2 || wrappers.length > 0}
          value={positionBox}
          onChange={e => setPositionBox(Number(e.target.value))}
        />

        <Select
          name="product"
          label="Linha de produto"
          options={lineProducts}
        />

        <Select
          name="classificationName"
          label="Aplicação"
          options={aplication}
          onChange={e => handleFilterClassification(e)}
        />

        <Select
          name="classificationCode"
          label="Classificação"
          isDisabled={classificationFilter.length === 0}
          options={classificationFilter}
        />

        <Select
          name="inputSide"
          label="Lado de entrada"
          options={[
            { value: 'Esquerda', label: 'E - Esquerda' },
            { value: 'Direita', label: 'D - Direita' },
          ]}
        />

        <section className="checkbox-container">
          <strong>Composição</strong>
          <Checkbox
            name="lightningRod"
            label="Para-raio"
            onChange={() => setLightningRod(!lightningRod)}
          />

          <Checkbox
            name="capacitiveIsolator"
            label="Isolador capacitivo"
            onChange={() => setCapacitiveIsolator(!capacitiveIsolator)}
          />

          <Checkbox
            name="spareCable"
            label="Cabo reserva"
            onChange={() => setSpareCable(!spareCable)}
          />
        </section>

        <Select name="voltage" label="Tensão" options={voltages} />

        <Select name="current" label="Corrente" options={currents} />

        <Select
          name="variable"
          label="Variável"
          options={[
            { value: 1, label: '01' },
            { value: 2, label: '02' },
            { value: 3, label: '03' },
            { value: 4, label: '04' },
          ]}
        />

        <ButtonContainer>
          {positionBox === 0 ? (
            <button type="button" className="add" onClick={handleAddCubicle}>
              Adicionar
            </button>
          ) : (
            <button type="button" onClick={handleModifyCubicle}>
              Modificar
            </button>
          )}

          <button type="submit" className="verify">
            {loading ? (
              <img
                style={{ height: 24, width: 24 }}
                src={loadingGif}
                alt="Carregando ..."
              />
            ) : (
              <span>Verificar</span>
            )}
          </button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default FormSelector;
