import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
        <div style={{position: "absolute", top: 0}} id="modal-root"/>
    </React.StrictMode>
);


