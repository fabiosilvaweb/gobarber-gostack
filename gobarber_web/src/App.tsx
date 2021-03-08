import React from 'react';
import GlobalStyle from './styles/global';

import { AuthProvider } from './hooks/AuthContext';

import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
