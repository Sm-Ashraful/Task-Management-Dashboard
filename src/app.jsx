// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';

/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';

import { store } from 'src/store';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </Provider>
  );
}
