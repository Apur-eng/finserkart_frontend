import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import QueryProvider from '../providers/QueryProvider';
import ThemeProvider from '../providers/ThemeProvider';
import AppRoutes from '../routes';

export const App: React.FC = () => {
  return (
    <QueryProvider>
      <ThemeProvider mode="light">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </QueryProvider>
  );
};

export default App;
