import React from 'react';
<<<<<<< HEAD
import { Routes, Route, Navigate } from 'react-router-dom';
=======
import { Routes, Route } from 'react-router-dom';
>>>>>>> 61e66f90a786f08d8bde6db3da65185ed0eb6b67
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
<<<<<<< HEAD
        <Route path="*" element={<Navigate to="/404" replace />} />
=======
>>>>>>> 61e66f90a786f08d8bde6db3da65185ed0eb6b67
      </Routes>
    </div>
  );
};

<<<<<<< HEAD
export default AppRouter;
=======
export default AppRouter;
>>>>>>> 61e66f90a786f08d8bde6db3da65185ed0eb6b67
