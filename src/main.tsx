import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { configureStore } from './services/store';
import { App } from '@components/app/app';

import './index.css';

// const preloadedState = {
// 	todos: [],
// }

const store = configureStore();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
);
