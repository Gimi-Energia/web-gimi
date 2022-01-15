import React, { useCallback, useMemo, useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiPrinter, BiTrash } from 'react-icons/bi';

import {
  Container,
  Content,
  SelectGroup,
  Painel,
  Views,
  Header,
  ButtonDeepWrapper,
  ContainerMeasures,
  ContainerButtons,
  Measures,
  LogoImage,
  ContainerDeepWrapper,
} from './styles';

import logoGimi from '../../assets/logo.png';

import ModalPreview from '../../components/ModalPreview';
import SingleLineDiagram from '../../components/Vistas/SingleLineDiagram';
import ExternalCubicle from '../../components/Vistas/ExternalCubicle';
import BaseCubicle from '../../components/Vistas/BaseCubicle';
import CutCubicle from '../../components/Vistas/CutCubicle';
import InternalCubicle from '../../components/Vistas/InternalCubicle';
import FormSelector from '../../components/Form';

import { IWrapperProps, useWrapper } from '../../hooks/wrapperContext';
import { ICubicleProps, useCubicle } from '../../hooks/cubiclesContext';
import api from '../../services/api';
import ModalConfirm from '../../components/ModalConfirm';
import ModalSetting from '../../components/ModalSetting';
import FrontWrapper from '../../components/Vistas/FrontWrapper';
import { ISide } from '../../components/TransitionBox';

export interface ISelectedItemProps {
  id: string;
  size_width: number;
  position: number;
}

export interface ICutViewProps {
  code: number;
  name: string;
  left_cut: string;
  right_cut: string;
  wrapperCutView?: string | null;
  transitionBoxCutUrl?: string | null;
}

const Panel: React.FC = () => {
  const { addWrapper, wrappers, deleteWrapper, resetWrappers } = useWrapper();
  const {
    cubicles,
    cutViews,
    deleteCubicle,
    updateCubicles,
    updateCutViews,
  } = useCubicle();

  const [titlePanel, setTitlePanel] = useState('');
  const [selectedDeepWrapper, setSelectedDeepWrapper] = useState(1);
  const [selectedTab, setSelectedTab] = useState(5);
  const [inputSideFromPanel, setInputSideFromPanel] = useState(
    'left' || 'right',
  );

  const wrapperWidth = [600, 750, 1200, 1500, 1800, 2250];
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [settingModalOpen, setSettingModalOpen] = useState(false);

  const [selectedItems, setSelectedItems] = useState<ISelectedItemProps[]>([]);

  const [previewProduct, setPreviewProduct] = useState<ICubicleProps>();

  const updateTransitionBox = useCallback(
    (add: boolean) => {
      const newListProducts = cubicles.map(listProduct => {
        if (listProduct.codeTransitionBox) {
          return {
            ...listProduct,
            codeTransitionBox: add
              ? `${listProduct.codeTransitionBox}T`
              : listProduct.codeTransitionBox.slice(0, -1),
          };
        }
        return listProduct;
      });

      updateCubicles(newListProducts);
    },
    [cubicles, updateCubicles],
  );

  const handleChange = (event: any, newValue: number) => {
    setSelectedTab(newValue);
  };

  const toggleModal = useCallback(() => {
    setModalOpen(oldState => !oldState);
  }, []);

  const toggleConfirmModal = useCallback(() => {
    setConfirmModalOpen(oldState => !oldState);
  }, []);

  const toggleSettingModal = useCallback(() => {
    setSettingModalOpen(oldState => !oldState);
  }, []);

  const handleDeleteTransitionBox = useCallback(
    (position: number) => {
      const newListProducts = cubicles.map((itemProduct, index) => {
        if (index !== position) {
          return itemProduct;
        }

        return {
          ...itemProduct,
          box_cubicle: '',
          box_single_line: '',
          codeTransitionBox: '',
        };
      });

      const newCutViews = cutViews.map(cutView => ({
        ...cutView,
        transitionBoxCutUrl: '',
      }));

      updateCutViews(newCutViews);
      updateCubicles(newListProducts);
    },
    [cubicles, updateCubicles, cutViews, updateCutViews],
  );

  const handleAddTransitionBox = useCallback(
    async (position: number, type: ISide, width: number, hasWrapper: boolean) => {
      try {
        const response = await api.get('transition-boxes', {
          params: { type, width, hasWrapper },
        });

        const cubicle = cubicles.find((_, index) => position === index);

        const newListProducts = cubicles.map((itemProduct, index) => {
          if (index !== position) {
            return itemProduct;
          }

          return {
            ...itemProduct,
            box_cubicle: response.data.box_cubicle_url,
            box_single_line: response.data.box_single_line_url,
            codeTransitionBox: response.data.code,
          };
        });

        const newCutViews = cutViews.map(cutView => {
          if (cubicle) {
            if (cutView.cod === cubicle.cod) {
              return {
                ...cutView,
                transitionBoxCutUrl: response.data.sectional_view,
              };
            }
          }
          return cutView;
        });
        updateCutViews(newCutViews);
        updateCubicles(newListProducts);
      } catch (err) {
        toast.error('Caixa de transição indisponível.');
      }
    },
    [cubicles, cutViews, updateCutViews, updateCubicles],
  );

  const handleDeleteCubicle = useCallback(
    (id: string) => {
      deleteCubicle(id);
    },
    [deleteCubicle],
  );

  const handleSelectCubicle = useCallback(
    (id: string, position: number) => {
      const findCubicle = cubicles.find(cubicle => cubicle.id === id);

      if (!findCubicle) {
        return;
      }
      const alreadySelected = selectedItems.find(item => item.id === id);
      const alreadyWrapper = wrappers.find(wrapper =>
        wrapper.cubicle_ids.includes(id),
      );

      const selectedProduct = {
        id: findCubicle.id,
        size_width: findCubicle.width_cubicle,
        position,
      };

      if (alreadySelected) {
        const filteredItems = selectedItems.filter(
          item => item.position < position,
        );

        setSelectedItems(filteredItems);
      } else {
        const sumWidth = selectedItems.reduce(
          (accumulator, currentValue) => accumulator + currentValue.size_width,
          findCubicle.width_cubicle,
        );

        if (alreadyWrapper) {
          toast.warn('O cubículo já possui invólucro.');
          return;
        }

        if (!wrapperWidth.includes(sumWidth)) {
          toast.warn('Tamanho do invólucro indisponível.');
          return;
        }

        if (
          selectedItems.find(
            item =>
              item.position === position + 1 || item.position === position - 1,
          ) ||
          selectedItems.length === 0
        ) {
          setSelectedItems(oldState => [...oldState, selectedProduct]);
        } else {
          toast.warn('O cubículo deve ser adjacente.');
        }
      }
    },
    [selectedItems, cubicles, wrapperWidth, wrappers],
  );

  const handleAddWrapper = useCallback(async () => {
    try {
      const positionInvolucroSort = selectedItems
        .map(item => item.position)
        .sort();

      const sumWidth = selectedItems.reduce(
        (accumulator, currentValue) => accumulator + currentValue.size_width,
        0,
      );

      const response = await api.get('wrappers', {
        params: {
          depth: selectedDeepWrapper === 1 ? 1320 : 1470,
          width: sumWidth,
          closure_for_transition: false,
        },
      });
      // const response = await api.get('wrappers', {
      //   params: {
      //     width: sumWidth,
      //     depth: selectedDeepWrapper === 1 ? 1320 : 1470,
      //     closure_for_transition: hasTransitionBox,
      //   },
      // });

      const wrapper = {
        ...response.data,
        cubicle_ids: selectedItems.map(item => item.id),
        index_start: positionInvolucroSort[0],
        index_end: positionInvolucroSort[positionInvolucroSort.length - 1] + 1,
        frontal_view: response.data.front_wrapper_view_url,
      };

      const newCutViews = cutViews.map(cutView => ({
        ...cutView,
        wrapperCutUrl: response.data.side_wrapper_view_url,
      }));

      if (wrappers.length === 0) {
        updateTransitionBox(true);
      }

      updateCutViews(newCutViews);
      addWrapper(wrapper);
      setSelectedItems([]);
    } catch (err) {
      toast.error('Involucro não encontrado.');
    }
  }, [
    selectedItems,
    addWrapper,
    selectedDeepWrapper,
    cutViews,
    updateCutViews,
    updateTransitionBox,
    wrappers,
  ]);

  const handleDeleteWrapper = useCallback(
    (position: number) => {
      deleteWrapper(position);
      if (wrappers.length === 1) {
        const newCutViews = cutViews.map(cutView => ({
          ...cutView,
          wrapperCutUrl: undefined,
        }));

        updateTransitionBox(false);
        updateCutViews(newCutViews);
      }
    },
    [deleteWrapper, wrappers, cutViews, updateCutViews, updateTransitionBox],
  );

  const handleDeepWrapper = useCallback(
    async (variable: 1 | 2) => {
      try {
        const widths = wrappers.map(wrapper => wrapper.width);

        if (selectedDeepWrapper === variable) {
          return;
        }

        const response = await api.get('wrapper/get-many-wrapper', {
          params: {
            widths,
            depth: variable === 1 ? 1320 : 1470,
            // closure_for_transition: !!cubicles.find(
            //   cubicle => cubicle.variable === 2,
            // ),
          },
        });

        if (response.data.error) {
          throw Error;
        }

        const newWrappers = wrappers.map(wrapper => {
          const checkWrapper = response.data.find(
            (newCode: IWrapperProps) => wrapper.width === newCode.width,
          );

          return {
            ...wrapper,
            ...checkWrapper,
          };
        });

        const newCutViews = cutViews.map(cutView => ({
          ...cutView,
          wrapperCutUrl: response.data[0].left_cut_view,
        }));

        updateCutViews(newCutViews);
        setSelectedDeepWrapper(variable);
        addWrapper(newWrappers);
      } catch (err) {
        toast.warn('Profundidade indisponível.');
      }
    },
    [
      wrappers,
      addWrapper,
      cutViews,
      updateCutViews,
      selectedDeepWrapper,
    ],
  );

  const handleResetPanel = useCallback(() => {
    updateCubicles([]);
    resetWrappers();
    setSelectedItems([]);
    updateCutViews([]);

    toggleConfirmModal();
  }, [updateCubicles, resetWrappers, updateCutViews, toggleConfirmModal]);

  const inputSide = useMemo(
    () => (inputSideFromPanel === 'left' ? 'left' : 'right'),
    [inputSideFromPanel],
  );

  const hasWrapper = useMemo(() => wrappers.length > 0, [wrappers]);

  const widthSubstation = useMemo(
    () =>
      cubicles.reduce(
        (accumulator, currentValue) => accumulator + currentValue.width_cubicle,
        0,
      ),
    [cubicles],
  );

  const biggestHeight = useMemo(() => {
    if (hasWrapper) {
      return 2300;
    }

    return cubicles.reduce((a, b) => Math.max(a, b.height_cubicle), 0);
  }, [cubicles, hasWrapper]);

  const deepSubstation = useMemo(() => {
    if (hasWrapper && selectedDeepWrapper === 1) {
      return 1320;
    }
    if (hasWrapper && selectedDeepWrapper === 2) {
      return 1470;
    }
    if (cubicles.length > 0) {
      return 920;
    }
    return 0;
  }, [selectedDeepWrapper, hasWrapper, cubicles]);

  return (
    <Container>
      <Content>
        <ModalSetting
          maxHeight={biggestHeight}
          totalWidth={widthSubstation}
          maxDepth={deepSubstation}
          variable={selectedDeepWrapper}
          hasWrapper={hasWrapper}
          panelInputPosition={inputSide}
          titleSubstation={titlePanel}
          setIsOpen={toggleSettingModal}
          isOpen={settingModalOpen}
        />
        <SelectGroup>
          <FormSelector
            setInputSideFromPanel={setInputSideFromPanel}
            previewProduct={previewProduct}
            setPreviewProduct={setPreviewProduct}
            toggleModal={toggleModal}
          />

          {previewProduct && (
            <ModalPreview
              isOpen={modalOpen}
              setIsOpen={toggleModal}
              previewCubicle={previewProduct}
            />
          )}
        </SelectGroup>
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
        <ModalConfirm
          isOpen={confirmModalOpen}
          setIsOpen={toggleConfirmModal}
          toggleModal={toggleConfirmModal}
          handleConfirm={handleResetPanel}
        />
        <Views>
          <Header>
            <ContainerButtons>
              <article>
                <LogoImage src={logoGimi} />

                <button
                  className="btnPrint"
                  type="button"
                  onClick={toggleSettingModal}
                >
                  <BiPrinter />
                </button>

                <button
                  className="btnReset"
                  type="button"
                  onClick={toggleConfirmModal}
                >
                  <BiTrash />
                </button>
                {selectedItems.length > 0 && (
                  <button
                    className="btnApply"
                    type="button"
                    onClick={handleAddWrapper}
                  >
                    Aplicar <br /> Invólucro
                  </button>
                )}
                {wrappers.length > 0 && (
                  <ContainerDeepWrapper className="deepWrapper">
                    <ButtonDeepWrapper
                      isSelected={selectedDeepWrapper === 1}
                      type="button"
                      onClick={() => handleDeepWrapper(1)}
                    >
                      1320
                    </ButtonDeepWrapper>

                    <ButtonDeepWrapper
                      isSelected={selectedDeepWrapper === 2}
                      type="button"
                      onClick={() => handleDeepWrapper(2)}
                    >
                      1470
                    </ButtonDeepWrapper>
                  </ContainerDeepWrapper>
                )}
              </article>
              <article>
                <input
                  type="text"
                  placeholder="Digite o nome da Subestação"
                  onChange={e => setTitlePanel(e.target.value.toUpperCase())}
                  value={titlePanel}
                />
              </article>
            </ContainerButtons>
            <ContainerMeasures>
              <Measures>
                <h2>Subestação</h2>
                <div>
                  <ul>
                    <li>Altura máxima:</li>
                    <li>Largura total:</li>
                    <li>Profundidade máxima:</li>
                  </ul>
                  <ul>
                    <li>{biggestHeight} mm</li>
                    <li>{widthSubstation} mm</li>
                    <li>{deepSubstation} mm</li>
                  </ul>
                </div>
              </Measures>

              <Measures>
                <h2>Linha de Produto</h2>
                <div>
                  <ul>
                    <li>Altura:</li>
                    <li>Largura:</li>
                    <li>Profundidade:</li>
                  </ul>
                  <ul>
                    <li>1700 mm</li>
                    <li>[ L ] mm</li>
                    <li>920 mm</li>
                  </ul>
                </div>
              </Measures>
            </ContainerMeasures>
          </Header>

          <Tabs className="tabs" value={selectedTab} onChange={handleChange}>
            <Tab label="Diagrama Unifilar" />
            <Tab
              label="Vista Frontal INVÓLUCRO"
              disabled={!hasWrapper}
              style={{ width: 100, lineHeight: 1.2 }}
            />
            <Tab label="Vista Externa" />
            <Tab label="Vista Interna" />
            <Tab label="Vista da Base" />
            <Tab label="Cortes" />
          </Tabs>
          <Painel>
            {selectedTab === 0 && (
              <SingleLineDiagram
                title={titlePanel}
                hasWrapper={hasWrapper}
                selectedItems={selectedItems}
                panelInputPosition={inputSide}
                handleDeleteWrapper={handleDeleteWrapper}
                handleDeleteCubicle={handleDeleteCubicle}
                handleSelectCubicle={handleSelectCubicle}
                handleAddTransitionBox={handleAddTransitionBox}
                handleDeleteTransitionBox={handleDeleteTransitionBox}
              />
            )}

            {selectedTab === 1 && (
              <FrontWrapper title={titlePanel} panelInputPosition={inputSide} />
            )}

            {selectedTab === 2 && (
              <ExternalCubicle
                title={titlePanel}
                hasWrapper={hasWrapper}
                selectedItems={selectedItems}
                panelInputPosition={inputSide}
              />
            )}

            {selectedTab === 3 && (
              <InternalCubicle
                title={titlePanel}
                hasWrapper={hasWrapper}
                selectedItems={selectedItems}
                panelInputPosition={inputSide}
                handleDeleteCubicle={handleDeleteCubicle}
                handleDeleteWrapper={handleDeleteWrapper}
                handleSelectCubicle={handleSelectCubicle}
                handleAddTransitionBox={handleAddTransitionBox}
                handleDeleteTransitionBox={handleDeleteTransitionBox}
              />
            )}

            {selectedTab === 4 && (
              <BaseCubicle
                title={titlePanel}
                hasWrapper={hasWrapper}
                selectedItems={selectedItems}
                variable={selectedDeepWrapper}
                panelInputPosition={inputSide}
              />
            )}
            {selectedTab === 5 && <CutCubicle title={titlePanel} />}
          </Painel>
        </Views>
      </Content>
    </Container>
  );
};

export default Panel;
