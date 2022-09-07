import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainPage from '../Pages/MainPage';
import FormPage from '../Pages/FormPage';
import DetailTicketPage from '../Pages/DetailTicketPage';

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/form-report' element={<FormPage />} />
      <Route path='/detail/:id' element={<DetailTicketPage />} />
    </Routes>
  );
};

export default Routers;
