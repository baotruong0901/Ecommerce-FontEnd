import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
// import 'nprogress/nprogress.css'
// import 'react-perfect-scrollbar/dist/css/styles.css';
import App from './App';
import { ProSidebarProvider } from 'react-pro-sidebar';
import 'react-perfect-scrollbar/dist/css/styles.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        {/* <React.StrictMode> */}
        <ProSidebarProvider>
            <App />
        </ProSidebarProvider>
        {/* </React.StrictMode> */}
        {/* </PersistGate> */}
    </Provider>
);

reportWebVitals();