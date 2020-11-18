import React from 'react';
import ReactDOM from 'react-dom';

import './style.css';

// Routing
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Register, Login } from './containers';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
      </div>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);

module.hot.accept();