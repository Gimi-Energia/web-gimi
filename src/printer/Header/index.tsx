import React from 'react';
import logoGimi from '../../assets/logo.png';

import { Container, Measures, LogoImage } from './styles';

export interface IHeaderProps {
  maxHeight: number;
  totalWidth: number;
  maxDepth: number;
}

const Header: React.FC<IHeaderProps> = ({
  maxHeight,
  totalWidth,
  maxDepth,
}) => (
  <Container>
    <LogoImage src={logoGimi} />

    <Measures>
      <h2>Subestação</h2>
      <div>
        <ul>
          <li>Altura máxima:</li>
          <li>Largura total:</li>
          <li>Profundidade máxima:</li>
        </ul>
        <ul>
          <li>{maxHeight} mm</li>
          <li>{totalWidth} mm</li>
          <li>{maxDepth} mm</li>
        </ul>
      </div>
    </Measures>

    <Measures>
      <h2>Linha de Produto</h2>
      <div>
        <ul>
          <li>Altura:</li>
          <li>Largura:</li>
          <li>Profundidade:</li>
        </ul>
        <ul>
          <li>1700 mm</li>
          <li>[ L ] mm</li>
          <li>920 mm</li>
        </ul>
      </div>
    </Measures>
  </Container>
);

export default Header;
