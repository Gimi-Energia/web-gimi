import React, { useMemo } from 'react';
import { FaTrash } from 'react-icons/fa';
import Image, { Shimmer } from 'react-shimmer';

import { useWrapper } from '../../../hooks/wrapperContext';
import { ISelectedItemProps } from '../../../pages/Painel';

import BottomWrapper from '../../TypeWrappers/BottomWrapper';
import TransitionBox, { ISide } from '../../TransitionBox';
import UpperWrapper from '../../TypeWrappers/UpperWrapper';

import {
  Container,
  CubicleContainer,
  ButtonDelete,
  Title,
  Description,
} from './styles';
import { useCubicle } from '../../../hooks/cubiclesContext';
import Label from '../../Label';

interface CubicleProps {
  title: string;
  hasWrapper: boolean;
  selectedItems?: ISelectedItemProps[];
  panelInputPosition: 'left' | 'right';

  handleDeleteCubicle?: (id: string) => void;
  handleDeleteWrapper?: (id: number) => void;
  handleSelectCubicle?: (id: string, position: number) => void;
  handleDeleteTransitionBox?: (position: number) => void;
  handleAddTransitionBox?: (
    position: number,
    type: ISide,
    width: number,
    hasWrapper: boolean,
  ) => void;
}

const InternalCubicle: React.FC<CubicleProps> = ({
  title,
  hasWrapper,
  selectedItems,
  panelInputPosition,
  handleDeleteCubicle,
  handleSelectCubicle,
  handleDeleteWrapper,
  handleAddTransitionBox,
  handleDeleteTransitionBox,
}) => {
  const { wrappers } = useWrapper();
  const { cubicles, updateDescription } = useCubicle();

  const hasTransitionBox = useMemo(
    () => !!cubicles.find(cubicle => cubicle.variable === 2),
    [cubicles],
  );

  return (
    <Container sizeGrid={cubicles.length}>
      <Title>{title} - VISTA INTERNA</Title>
      <ul>
        {wrappers.map(wrapper => (
          <UpperWrapper
            key={wrapper.index_start}
            hasTransitionBox={hasTransitionBox}
            overHeight={false}
            positionLast={cubicles.length}
            positionStart={wrapper.index_start}
            positionEnd={wrapper.index_end}
          />
        ))}

        {cubicles.map((cubicle, index) => (
          <React.Fragment key={cubicle.id}>
            {cubicles.find(cubicleItem => cubicleItem.variable === 2) && (
              <TransitionBox
                code={cubicle.codeTransitionBox}
                position={index}
                width={cubicle.width_cubicle}
                boxCubicleUrl={cubicle.box_cubicle}
                handleDeleteTransitionBox={handleDeleteTransitionBox}
                handleAddTransitionBox={handleAddTransitionBox}
                hasWrapper={hasWrapper}
              />
            )}

            <CubicleContainer>
              {handleDeleteCubicle && (
                <ButtonDelete
                  onClick={() => handleDeleteCubicle(cubicle.id)}
                  disabled={hasWrapper}
                >
                  <FaTrash />
                </ButtonDelete>
              )}

              <Image
                src={cubicle.inside_view_url}
                fallback={<Shimmer height={567} width={200} />}
                NativeImgProps={{
                  alt: cubicle.name,
                  height: 567,
                  onClick: handleSelectCubicle
                    ? () => handleSelectCubicle(cubicle.id, index + 1)
                    : undefined,
                  className:
                    selectedItems &&
                    selectedItems.find(item => item.id === cubicle.id)
                      ? 'isSelected'
                      : '',
                }}
              />

              {/* <CubicleImage
                onClick={() => handleSelectCubicle(cubicle.id, index + 1)}
                isSelected={
                  !!selectedItems.find(item => item.id === cubicle.id)
                }
                src={cubicle.inside_view}
                alt={cubicle.name}
              /> */}

              <Label
                isSelected={
                  selectedItems &&
                  !!selectedItems.find(item => item.id === cubicle.id)
                }
                hasWrapper={hasWrapper}
              >
                CUBÍCULO{' '}
                {panelInputPosition === 'left'
                  ? index + 1
                  : cubicles.length - index}{' '}
                <Description
                  type="text"
                  maxLength={16}
                  value={cubicle.description}
                  onChange={
                    e => updateDescription(e.target.value.toUpperCase(), index)
                    // eslint-disable-next-line react/jsx-curly-newline
                  }
                />
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
            editable
            handleDeleteWrapper={handleDeleteWrapper}
          />
        ))}
      </ul>
    </Container>
  );
};

export default InternalCubicle;
