import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CubicleProvider } from './hooks/cubiclesContext';
import { WrapperProvider } from './hooks/wrapperContext';

import Routes from './routes';
import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <CubicleProvider>
        <WrapperProvider>
          <Routes />
        </WrapperProvider>
      </CubicleProvider>
    </BrowserRouter>
    <GlobalStyle />
  </>
);

export default App;
