/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import { Container } from './styles';
import Header, { IHeaderProps } from '../Header';

import { ICubicleInfos } from '../../components/ModalSetting';
import ExternalCubicle from '../../components/Vistas/ExternalCubicle';
import InternalCubicle from '../../components/Vistas/InternalCubicle';
import BaseCubicle from '../../components/Vistas/BaseCubicle';
import SingleLineDiagram from '../../components/Vistas/SingleLineDiagram';
import CutCubicle from '../../components/Vistas/CutCubicle';
import FrontWrapper from '../../components/Vistas/FrontWrapper';

interface IPrintProps extends IHeaderProps, ICubicleInfos {
  cutView: boolean;
  baseView: boolean;
  insideView: boolean;
  wrapperView: boolean;
  externalView: boolean;
  singleLineDiagramView: boolean;
}

export default class DashboardPrint extends React.Component<IPrintProps> {
  render() {
    const {
      cutView,
      maxDepth,
      variable,
      baseView,
      maxHeight,
      hasWrapper,
      totalWidth,
      insideView,
      wrapperView,
      externalView,
      titleSubstation,
      panelInputPosition,
      singleLineDiagramView,
    } = this.props;
    return (
      <Container>
        {singleLineDiagramView && (
          <section>
            <Header
              maxHeight={maxHeight}
              totalWidth={totalWidth}
              maxDepth={maxDepth}
            />
            <SingleLineDiagram
              title={titleSubstation}
              hasWrapper={hasWrapper}
              panelInputPosition={panelInputPosition}
            />
          </section>
        )}

        {wrapperView && (
          <section>
            <Header
              maxHeight={maxHeight}
              totalWidth={totalWidth}
              maxDepth={maxDepth}
            />
            <FrontWrapper
              title={titleSubstation}
              // hasWrapper={hasWrapper}
              panelInputPosition={panelInputPosition}
            />
          </section>
        )}

        {externalView && (
          <section>
            <Header
              maxHeight={maxHeight}
              totalWidth={totalWidth}
              maxDepth={maxDepth}
            />
            <ExternalCubicle
              title={titleSubstation}
              hasWrapper={hasWrapper}
              panelInputPosition={panelInputPosition}
            />
          </section>
        )}

        {insideView && (
          <section>
            <Header
              maxHeight={maxHeight}
              totalWidth={totalWidth}
              maxDepth={maxDepth}
            />
            <InternalCubicle
              title={titleSubstation}
              hasWrapper={hasWrapper}
              panelInputPosition={panelInputPosition}
            />
          </section>
        )}

        {baseView && (
          <section>
            <Header
              maxHeight={maxHeight}
              totalWidth={totalWidth}
              maxDepth={maxDepth}
            />
            <BaseCubicle
              title={titleSubstation}
              hasWrapper={hasWrapper}
              panelInputPosition={panelInputPosition}
              variable={variable}
            />
          </section>
        )}

        {cutView && (
          <section>
            {/* <Header
              maxHeight={maxHeight}
              totalWidth={totalWidth}
              maxDepth={maxDepth}
            /> */}
            <CutCubicle
              maxHeight={maxHeight}
              totalWidth={totalWidth}
              maxDepth={maxDepth}
              title={titleSubstation}
            />
            {/* <CutViewPrint /> */}
          </section>
        )}
      </Container>
    );
  }
}
