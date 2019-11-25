import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-unresolved
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-unresolved
import App from './components/main/App';

// eslint-disable-next-line import/no-unresolved
import store from './components/redux/store';

// eslint-disable-next-line react/jsx-filename-extension
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
