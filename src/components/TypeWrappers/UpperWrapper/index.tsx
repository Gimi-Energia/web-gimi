import React from 'react';

import { Container } from './styles';

interface UpperWrapperProps {
  hasTransitionBox: boolean;
  overHeight: boolean;
  positionLast: number;
  positionStart: number;
  positionEnd: number;
}

const UpperWrapper: React.FC<UpperWrapperProps> = ({
  hasTransitionBox,
  overHeight,
  positionLast,
  positionStart,
  positionEnd,
}) => (
  <Container
    hasTransitionBox={hasTransitionBox}
    overHeight={overHeight}
    positionLast={positionLast}
    positionStart={positionStart}
    positionEnd={positionEnd}
  >
    <div className="beiralLeft" />
    <div className="beiral">
      {overHeight && <div className="barraLateralEsquerda" />}
      {overHeight && <div className="barraLateralDireita" />}
    </div>
    <div className="beiralRight" />
  </Container>
);

export default UpperWrapper;
