/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import { BiDownArrow } from 'react-icons/bi';

import {
  Container,
  Dropdown,
  DropdownMenu,
  TransitionBoxImage,
} from './styles';

enum TypeOfSide {
  'meio',
  'esquerda',
  'direita',
  'isolador',
}

export type ISide = keyof typeof TypeOfSide;

interface TransitionBoxProps {
  code: string;
  width: number;
  position: number;
  boxCubicleUrl?: string;
  boxSingleLineUrl?: string;
  hasWrapper: boolean;
  handleDeleteTransitionBox?: (position: number) => void;
  handleAddTransitionBox?: (
    position: number,
    type: ISide,
    width: number,
    hasWrapper: boolean,
  ) => void;
}

const TransitionBox: React.FC<TransitionBoxProps> = ({
  code,
  width,
  position,
  boxCubicleUrl,
  boxSingleLineUrl,
  hasWrapper,
  handleAddTransitionBox,
  handleDeleteTransitionBox,
}) => (
  <Container hasImage={!!boxCubicleUrl || !!boxSingleLineUrl}>
    <span>{code}</span>
    {handleAddTransitionBox && (
      <Dropdown>
        <span>
          <BiDownArrow />
        </span>
        <DropdownMenu>
          {handleDeleteTransitionBox && (
            <button
              type="button"
              onClick={() => handleDeleteTransitionBox(position)}
            >
              SEM BARRA / ISOLADOR
            </button>
          )}
          <button
            type="button"
            onClick={() =>
              handleAddTransitionBox(position, 'meio', width, hasWrapper)
            }
          >
            BARRA PASSANTE
          </button>

          <button
            type="button"
            onClick={() =>
              handleAddTransitionBox(position, 'esquerda', width, hasWrapper)
            }
          >
            BARRA ESQUERDA
          </button>

          <button
            type="button"
            onClick={() =>
              handleAddTransitionBox(position, 'direita', width, hasWrapper)
            }
          >
            BARRA DIREITA
          </button>

          <button
            type="button"
            onClick={() =>
              handleAddTransitionBox(position, 'isolador', width, hasWrapper)
            }
          >
            ISOLADOR
          </button>
        </DropdownMenu>
      </Dropdown>
    )}

    <TransitionBoxImage src={boxCubicleUrl || boxSingleLineUrl} />
  </Container>
);

export default TransitionBox;
