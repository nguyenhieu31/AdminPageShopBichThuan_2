/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable perfectionist/sort-imports */
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'src/global.css';



import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
      <ToastContainer/>
    </ThemeProvider>
  );
}
