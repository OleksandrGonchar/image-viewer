import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Images } from './pages/Images';

import './App.scss';

import { createBrowserHistory } from 'history'
export const history = createBrowserHistory();

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Suspense fallback={<div>Download...</div>}>
          <Switch>
            <Route exact path='/' component={Images} />
          </Switch>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
