import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { Switch } from '@material-ui/core';
import { useReactToPrint } from 'react-to-print';

import { BiX } from 'react-icons/bi';
import Modal from '../Modal';
import { Container } from './styles';
import DashboardPrint from '../../printer/DashboardPrint';
import { IHeaderProps } from '../../printer/Header';

export interface ICubicleInfos {
  hasWrapper: boolean;
  panelInputPosition: 'left' | 'right';
  titleSubstation: string;
  variable: number;
}

interface IModalProps extends IHeaderProps, ICubicleInfos {
  isOpen: boolean;
  setIsOpen: () => void;
}

const ModalSetting: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  variable,
  hasWrapper,
  titleSubstation,
  panelInputPosition,
  maxHeight,
  totalWidth,
  maxDepth,
}) => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [isChecked, setIsChecked] = useState({
    singleLineDiagramView: true,
    wrapperView: true,
    externalView: true,
    insideView: true,
    baseView: true,
    cutView: true,
  });

  const onChangeChecked = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { id, checked } = event.target;
      setIsChecked({ ...isChecked, [id]: checked });
    },
    [isChecked],
  );

  return (
    <Modal distanceTop="50%" isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <button type="button" className="btn_close" onClick={setIsOpen}>
          <BiX />
        </button>

        <DashboardPrint
          variable={variable}
          maxDepth={maxDepth}
          maxHeight={maxHeight}
          totalWidth={totalWidth}
          hasWrapper={hasWrapper}
          cutView={isChecked.cutView}
          baseView={isChecked.baseView}
          insideView={isChecked.insideView}
          titleSubstation={titleSubstation}
          wrapperView={isChecked.wrapperView && hasWrapper}
          externalView={isChecked.externalView}
          panelInputPosition={panelInputPosition}
          singleLineDiagramView={isChecked.singleLineDiagramView}
          ref={componentRef}
        />
        <h2>Opções de impressão</h2>

        <h3>Selecione as páginas</h3>

        <section>
          <label htmlFor="singleLineDiagramView">
            Diagrama Unifilar
            <Switch
              id="singleLineDiagramView"
              checked={isChecked.singleLineDiagramView}
              onChange={e => onChangeChecked(e)}
              color="primary"
            />
          </label>

          <label htmlFor="wrapperView">
            Vista Frontal (Invólucro)
            <Switch
              id="wrapperView"
              checked={isChecked.wrapperView}
              disabled={!hasWrapper}
              onChange={e => onChangeChecked(e)}
              color="primary"
            />
          </label>

          <label htmlFor="externalView">
            Vista Externa
            <Switch
              id="externalView"
              checked={isChecked.externalView}
              onChange={e => onChangeChecked(e)}
              color="primary"
            />
          </label>
          <label htmlFor="insideView">
            Vista Interna
            <Switch
              id="insideView"
              checked={isChecked.insideView}
              onChange={e => onChangeChecked(e)}
              color="primary"
            />
          </label>

          <label htmlFor="baseView">
            Vista da Base
            <Switch
              id="baseView"
              checked={isChecked.baseView}
              onChange={e => onChangeChecked(e)}
              color="primary"
            />
          </label>

          <label htmlFor="cutView">
            Vista em Corte
            <Switch
              id="cutView"
              checked={isChecked.cutView}
              onChange={e => onChangeChecked(e)}
              color="primary"
            />
          </label>
        </section>

        <button type="button" className="btn_print" onClick={handlePrint}>
          Imprimir
        </button>
      </Container>
    </Modal>
  );
};

export default ModalSetting;
