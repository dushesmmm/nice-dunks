import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from '../router/router';
import MainPage from '../components/pages/MainPage/MainPage';

const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {routes.map(route => (
          <Route
            path={route.path}
            element={route.element}
            key={route.key}
          />
        ))}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
