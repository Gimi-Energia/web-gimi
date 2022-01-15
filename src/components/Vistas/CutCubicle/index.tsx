import React from 'react';
import Image, { Shimmer } from 'react-shimmer';

import { useCubicle } from '../../../hooks/cubiclesContext';
import Header from '../../../printer/Header';
import Label from '../../Label';

import {
  Container,
  Title,
  TransitionBoxImage,
  WrapperImage,
  CubicleImage,
} from './styles';

interface ICutCubicle {
  title: string;
  maxHeight?: number;
  totalWidth?: number;
  maxDepth?: number;
}

const CutCubicle: React.FC<ICutCubicle> = ({
  title,
  maxDepth,
  maxHeight,
  totalWidth,
}) => {
  const { cutViewsFormatted } = useCubicle();
  console.log(cutViewsFormatted);
  return (
    <Container>
      {cutViewsFormatted.map((group, index) => (
        <section
          className={(index + 1) % 2 === 0 ? 'break_page' : ''}
          key={index}
        >
          {maxDepth && maxHeight && totalWidth && (
            <Header
              maxDepth={maxDepth}
              maxHeight={maxHeight}
              totalWidth={totalWidth}
            />
          )}
          <Title>{title} - VISTA EM CORTE</Title>
          <ul>
            {group.map((cutView, position) => (
              <React.Fragment key={cutView.cutUrl}>
                {cutView.cutUrl && (
                  <li>
                    {cutView.wrapperCutUrl && (
                      <WrapperImage
                        cutSide={cutView.side}
                        src={cutView.wrapperCutUrl}
                        alt={cutView.name}
                      />
                    )}
                    <div>
                      {cutView.transitionBoxCutUrl && (
                        <TransitionBoxImage
                          position={position}
                          cutSide={cutView.side}
                          hasWrapper={!!cutView.wrapperCutUrl}
                          src={cutView.transitionBoxCutUrl}
                        />
                      )}
                      <CubicleImage
                        height={cutView.height / 3}
                        position={position}
                        cutSide={cutView.side}
                        hasWrapper={!!cutView.wrapperCutUrl}
                        hasTransitionBox={!!cutView.transitionBoxCutUrl}
                      >
                        <Image
                          src={cutView.cutUrl}
                          fallback={<Shimmer height={566} width={306} />}
                          NativeImgProps={{
                            alt: cutView.name,
                          }}
                        />
                      </CubicleImage>
                    </div>

                    <Label styles={{ marginBottom: 0 }}>
                      CUBÍCULO - {cutView.name} <br /> CORTE LADO {cutView.side}
                    </Label>
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </section>
      ))}
    </Container>
  );
};

export default CutCubicle;
