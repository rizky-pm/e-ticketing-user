import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainPage from '../Pages/MainPage';
import FormPage from '../Pages/FormPage';

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/form-report' element={<FormPage />} />
    </Routes>
  );
};

export default Routers;
