// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PersistGate } from 'redux-persist/integration/react';

/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';

import { store, persistor } from 'src/store';
import ProductModal from './sections/products/ProductModal';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <Provider store={store}>
      <ThemeProvider>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
          <ProductModal />
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
}
