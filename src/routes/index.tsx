import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CreateCubicle from '../pages/Create/CreateCubicle';
import CreateWrapper from '../pages/Create/CreateWrapper';
import CreateTransitionBox from '../pages/Create/CreateTransitionBox';
import Panel from '../pages/Painel';
import DashboardPrint from '../printer/DashboardPrint';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/react/" exact component={Panel} />
    <Route path="/react/create/cubiculo" component={CreateCubicle} />
    <Route path="/react/create/involucro" component={CreateWrapper} />
    <Route path="/react/create/caixa" component={CreateTransitionBox} />
    <Route path="/react/test" component={DashboardPrint} />
  </Switch>
);

export default Routes;
