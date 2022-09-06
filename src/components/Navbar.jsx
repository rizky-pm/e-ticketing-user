import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  let activeStyle = {
    borderBottom: '.25rem solid #2569A5',
    fontWeight: '600',
  };

  return (
    <nav className='flex justify-between py-4 px-6 lg:py-10 lg:px-20  navbar-box-shadow'>
      <span className='font-bold text-lg lg:text-2xl'>Report Form</span>

      <ul className='flex space-x-12'>
        <li className='text-lg'>
          <NavLink
            to='/'
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Main
          </NavLink>
        </li>
        <li className='text-lg'>
          <NavLink
            to='/form-report'
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Create Report
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
