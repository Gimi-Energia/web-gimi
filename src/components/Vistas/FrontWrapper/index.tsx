import React from 'react';
import Image, { Shimmer } from 'react-shimmer';

import { useCubicle } from '../../../hooks/cubiclesContext';
import { useWrapper } from '../../../hooks/wrapperContext';
import Label from '../../Label';

import { BeiralLeft, BeiralRight, Container, Title } from './styles';

interface IFrontWrapperProps {
  title: string;
  panelInputPosition: 'left' | 'right';
}

const FrontWrapper: React.FC<IFrontWrapperProps> = ({
  title,
  panelInputPosition,
}) => {
  const { wrappers } = useWrapper();
  const { cubicles } = useCubicle();

  return (
    <Container>
      <Title>{title} - VISTA FRONTAL (INVÓLUCRO)</Title>
      <ul>
        {wrappers.map((wrapper, index) => (
          <React.Fragment key={wrapper.index_start}>
            <BeiralLeft positionStart={wrapper.index_start} />
            <li>
              <Image
                src={wrapper.frontal_view}
                fallback={<Shimmer height={766} width={200} />}
                NativeImgProps={{
                  alt: wrapper.cod,
                }}
              />

              <Label>
                INVÓLUCRO{' '}
                {panelInputPosition === 'left'
                  ? index + 1
                  : wrappers.length - index}
              </Label>

              <Label>{wrapper.cod}</Label>
              <Label>{wrapper.width} mm</Label>
            </li>
            <BeiralRight
              positionLast={cubicles.length}
              positionEnd={wrapper.index_end}
            />
          </React.Fragment>
        ))}
      </ul>
    </Container>
  );
};

export default FrontWrapper;
