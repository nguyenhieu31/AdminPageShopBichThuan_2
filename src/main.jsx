import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <HelmetProvider>
        <BrowserRouter>
            <Suspense>
                <ToastContainer closeButton={false} autoClose={2700} position='top-right' style={{ marginTop: 50, marginRight: -10 }} />
                <App />
            </Suspense>
        </BrowserRouter>
    </HelmetProvider>
);
