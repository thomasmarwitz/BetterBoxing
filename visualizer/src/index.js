import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BinPacking } from './routes/BinPacking';
import { BinInput } from './routes/BinInput';
import { PackingReqLoading } from './routes/PackingReqLoading';
import  BoxReadingLoading from './routes/BoxReadingLoading';
import { SharedData } from './routes/SharedData';
import { Examples } from './routes/Examples';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <Provider store={store}>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="bin-input" element={<BinInput />} />
                
                <Route path="bin-packing" element={<BinPacking />} />
                
                <Route path="packing-loading" element={<PackingReqLoading />} />
                <Route path="boxes-loading" element={<BoxReadingLoading />} />
                
                <Route path="shared" element={<SharedData />} />
                
                <Route path="examples" element={<Examples />} />
            </Routes>
            </Provider>
        </React.StrictMode>
    </BrowserRouter>
);

