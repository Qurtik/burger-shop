/* eslint-disable prettier/prettier */
// import { StrictMode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { configureStore } from './services/store';
import { App } from '@components/app/app';

import './index.css';
import { BrowserRouter } from 'react-router-dom';

// const preloadedState = {
// 	todos: [],
// }

const store = configureStore();

createRoot(document.getElementById('root')!).render(
	// <StrictMode>
	<Provider store={store}>
		<DndProvider backend={HTML5Backend}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</DndProvider>
	</Provider>
	// </StrictMode>
);
