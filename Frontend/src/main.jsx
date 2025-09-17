import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Importa o SEU componente principal que renomeamos
import './i18n.js';
// Pega aquele <div id="root"> do seu arquivo index.html
const rootElement = document.getElementById('root');

// Cria a "raiz" do seu aplicativo React nesse elemento
const root = ReactDOM.createRoot(rootElement);

// Manda o React renderizar (desenhar) seu componente <App /> dentro da raiz
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);