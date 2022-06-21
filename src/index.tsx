import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './state';
import { Provider } from 'react-redux';
import App from './containers/App/App';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
