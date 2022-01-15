import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CreateCubicle from '../pages/Create/CreateCubicle';
import CreateWrapper from '../pages/Create/CreateWrapper';
import CreateTransitionBox from '../pages/Create/CreateTransitionBox';
import Panel from '../pages/Painel';
import DashboardPrint from '../printer/DashboardPrint';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Panel} />
    <Route path="/create/cubiculo" component={CreateCubicle} />
    <Route path="/create/involucro" component={CreateWrapper} />
    <Route path="/create/caixa" component={CreateTransitionBox} />
    <Route path="/test" component={DashboardPrint} />
  </Switch>
);

export default Routes;
