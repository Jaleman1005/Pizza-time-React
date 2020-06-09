import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

/* import NotFound from '../pages/NotFound'; */
import List from '../pages/List';

function App() {
  return (
    <BrowserRouter>
        {/* <Switch> */}
          <Route exact path="/" component={List} />
          {/* <Route exact path="/badges" component={Badges} />
          <Route exact path="/badges/new" component={BadgeNew} />
          <Route exact path="/badges/:badgeId/edit" component={BadgeEdit} />
          <Route exact path="/badges/:badgeId" component={BadgeDetailsContainer} /> */}
          {/* <Route component={NotFound} />
        </Switch> */}
    </BrowserRouter>
  );
}

export default App;
