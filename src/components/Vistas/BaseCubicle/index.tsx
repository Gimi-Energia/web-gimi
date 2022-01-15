import React from 'react';
import Image, { Shimmer } from 'react-shimmer';

import { useCubicle } from '../../../hooks/cubiclesContext';
import { useWrapper } from '../../../hooks/wrapperContext';
import { ISelectedItemProps } from '../../../pages/Painel';
import Label from '../../Label';
import { Container, UpperWrapper, BottomWrapper, Title } from './styles';

interface IBaseCubicleProps {
  title: string;
  variable: number;
  hasWrapper: boolean;
  selectedItems?: ISelectedItemProps[];
  panelInputPosition: 'left' | 'right';
}

const BaseCubicle: React.FC<IBaseCubicleProps> = ({
  title,
  variable,
  hasWrapper,
  selectedItems,
  panelInputPosition,
}) => {
  const { wrappers } = useWrapper();
  const { cubicles } = useCubicle();

  return (
    <Container>
      <Title>{title} - VISTA DA BASE</Title>
      <ul>
        {wrappers.map(wrapper => (
          <UpperWrapper
            key={wrapper.index_start}
            positionEnd={wrapper.index_end}
            positionStart={wrapper.index_start}
          >
            <div />
          </UpperWrapper>
        ))}

        {cubicles.map((cubicle, index) => (
          <li key={cubicle.id}>
            <Image
              src={cubicle.base_view_url}
              fallback={<Shimmer height={306} width={200} />}
              NativeImgProps={{
                alt: cubicle.name,
                height: 306,
              }}
            />

            <Label
              variable={variable}
              hasWrapper={hasWrapper}
              isSelected={
                selectedItems &&
                !!selectedItems.find(item => item.id === cubicle.id)
              }
            >
              CUBÍCULO{' '}
              {panelInputPosition === 'left'
                ? index + 1
                : cubicles.length - index}{' '}
              <br /> {cubicle.description}
            </Label>

            <Label
              styles={{ marginTop: 0 }}
              isSelected={
                selectedItems &&
                !!selectedItems.find(item => item.id === cubicle.id)
              }
            >
              NP8-E-1-11000-01
            </Label>

            <Label
              styles={{
                marginTop: 0,
              }}
              isSelected={
                selectedItems &&
                !!selectedItems.find(item => item.id === cubicle.id)
              }
            >
              L = {cubicle.width_cubicle} mm | X ={' '}
              {panelInputPosition === 'left'
                ? index + 1
                : cubicles.length - index}
            </Label>
          </li>
        ))}

        {wrappers.map(wrapper => (
          <BottomWrapper
            key={wrapper.index_start}
            positionStart={wrapper.index_start}
            positionEnd={wrapper.index_end}
            variable={variable}
          >
            <div>
              <span>{wrapper.cod}</span>
            </div>
          </BottomWrapper>
        ))}
      </ul>
    </Container>
  );
};

export default BaseCubicle;
