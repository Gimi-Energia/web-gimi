import React from 'react';
import Image, { Shimmer } from 'react-shimmer';

import { useCubicle } from '../../../hooks/cubiclesContext';
import { useWrapper } from '../../../hooks/wrapperContext';
import { ISelectedItemProps } from '../../../pages/Painel';
import Label from '../../Label';
import BottomWrapper from '../../TypeWrappers/BottomWrapper';
import UpperWrapper from '../../TypeWrappers/UpperWrapper';

import { Container, CubicleContainer, Title } from './styles';

interface IExternalCubicleProps {
  title: string;
  hasWrapper: boolean;
  selectedItems?: ISelectedItemProps[];
  panelInputPosition: 'left' | 'right';
}

const ExternalCubicle: React.FC<IExternalCubicleProps> = ({
  title,
  hasWrapper,
  selectedItems,
  panelInputPosition,
}) => {
  const { wrappers } = useWrapper();
  const { cubicles } = useCubicle();

  return (
    <Container>
      <Title>{title} - VISTA EXTERNA</Title>
      <ul>
        {wrappers.map(wrapper => (
          <UpperWrapper
            key={wrapper.index_start}
            overHeight={
              !!cubicles.find(
                cubicle =>
                  cubicle.height_cubicle > 1700 &&
                  wrapper.cubicle_ids.includes(cubicle.id),
              )
            }
            hasTransitionBox={false}
            positionLast={cubicles.length}
            positionStart={wrapper.index_start}
            positionEnd={wrapper.index_end}
          />
        ))}

        {cubicles.map((cubicle, index) => (
          <React.Fragment key={cubicle.id}>
            <CubicleContainer
              overHeight={cubicle.height_cubicle > 1700}
              hasTransitionBox={!!cubicle.codeTransitionBox}
              hasWrapper={
                !!wrappers.find(
                  wrapper => wrapper.cubicle_ids.includes(cubicle.id),
                  // eslint-disable-next-line function-paren-newline
                )
              }
            >
              {!!cubicle.codeTransitionBox && (
                <div className="transition-box" />
              )}
              <Image
                src={cubicle.external_view_url}
                fallback={<Shimmer height={566} width={200} />}
                NativeImgProps={{
                  alt: cubicle.name,
                }}
              />

              <Label
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
                {cubicle.cod}
              </Label>

              <Label
                styles={{
                  marginTop: 0,
                  flexDirection: 'row',
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
            </CubicleContainer>
          </React.Fragment>
        ))}

        {wrappers.map((wrapper, index) => (
          <BottomWrapper
            key={wrapper.index_start}
            code={wrapper.cod}
            position={index}
            positionStart={wrapper.index_start}
            positionEnd={wrapper.index_end}
          />
        ))}
      </ul>
    </Container>
  );
};

export default ExternalCubicle;
