import React from 'react';
import { FaTrash } from 'react-icons/fa';
import Image, { Shimmer } from 'react-shimmer';

import { useCubicle } from '../../../hooks/cubiclesContext';
import { useWrapper } from '../../../hooks/wrapperContext';
import { ISelectedItemProps } from '../../../pages/Painel';
import Label from '../../Label';
import TransitionBox, { ISide } from '../../TransitionBox';
import BottomWrapper from '../../TypeWrappers/BottomWrapper';
import { Description } from '../InternalCubicle/styles';

import {
  Container,
  Title,
  ButtonDelete,
  SingleLineImage,
  SingleLineContainer,
} from './styles';

interface ISingleLineDiagramProps {
  title: string;
  hasWrapper: boolean;
  selectedItems?: ISelectedItemProps[];
  panelInputPosition: 'left' | 'right';
  handleDeleteCubicle?: (id: string) => void;
  handleDeleteWrapper?: (position: number) => void;
  handleSelectCubicle?: (id: string, position: number) => void;
  handleDeleteTransitionBox?: (position: number) => void;
  handleAddTransitionBox?: (
    position: number,
    type: ISide,
    width: number,
    hasWrapper: boolean,
  ) => void;
}

const SingleLineDiagram: React.FC<ISingleLineDiagramProps> = ({
  title,
  hasWrapper,
  selectedItems,
  panelInputPosition,
  handleDeleteWrapper,
  handleDeleteCubicle,
  handleSelectCubicle,
  handleAddTransitionBox,
  handleDeleteTransitionBox,
}) => {
  const { cubicles, updateDescription } = useCubicle();
  const { wrappers } = useWrapper();

  return (
    <Container>
      <Title>{title} - DIAGRAMA UNIFILAR</Title>

      <ul>
        {cubicles.map((cubicle, index) => (
          <React.Fragment key={cubicle.id}>
            {cubicles.find(item => item.variable === 2) && (
              <TransitionBox
                width={cubicle.width_cubicle}
                code={cubicle.codeTransitionBox}
                position={index}
                boxSingleLineUrl={cubicle.box_single_line}
                handleDeleteTransitionBox={handleDeleteTransitionBox}
                handleAddTransitionBox={handleAddTransitionBox}
                hasWrapper={hasWrapper}
              />
            )}

            <SingleLineContainer>
              {handleDeleteCubicle && (
                <ButtonDelete
                  onClick={() => handleDeleteCubicle(cubicle.id)}
                  disabled={hasWrapper}
                >
                  <FaTrash />
                </ButtonDelete>
              )}

              <SingleLineImage
                isSelected={
                  selectedItems &&
                  !!selectedItems.find(item => item.id === cubicle.id)
                }
              >
                <Image
                  src={cubicle.single_line_diagram_url}
                  fallback={<Shimmer height={566} width={200} />}
                  NativeImgProps={{
                    alt: cubicle.name,
                    onClick: handleSelectCubicle
                      ? () => handleSelectCubicle(cubicle.id, index + 1)
                      : undefined,
                  }}
                />
              </SingleLineImage>

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
            </SingleLineContainer>
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

export default SingleLineDiagram;
