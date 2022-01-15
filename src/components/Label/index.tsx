import React, { CSSProperties } from 'react';

import { Container } from './styles';

interface ILabelProps {
  variable?: number;
  hasWrapper?: boolean;
  isSelected?: boolean;
  styles?: CSSProperties;
}

const Label: React.FC<ILabelProps> = ({
  variable,
  hasWrapper,
  isSelected,
  styles = {},
  children,
}) => (
  <Container
    variable={variable}
    hasWrapper={hasWrapper}
    isSelected={isSelected}
  >
    <span style={styles}>{children}</span>
  </Container>
);

export default Label;
