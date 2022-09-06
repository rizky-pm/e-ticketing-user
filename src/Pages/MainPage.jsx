import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TableComponent from '../components/Table/TableComponent';

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:3001/report/',
      });

      if (res.status === 200) {
        setData(res.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className='space-y-10 py-8 px-6 lg:py-10 lg:px-20'>
      {/* <p className='text-2xl font-bold'>Main Page</p> */}
      <TableComponent tableData={data} />
    </main>
  );
};

export default MainPage;
